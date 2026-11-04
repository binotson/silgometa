/**
 * SERVER-SIDE email delivery through Hostinger SMTP (Nodemailer).
 * Imported only by the contact API route. Credentials are read from server
 * environment variables at request time and are never sent to the browser,
 * logged or returned to visitors.
 */
import nodemailer, { type Transporter } from "nodemailer";

export type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  /** Sender address (the authenticated mailbox). */
  from: string;
  /** Sender display name. */
  fromName: string;
  /** Name announced in the SMTP EHLO greeting. */
  ehloName: string;
};

const DEFAULT_FROM_NAME = "Silgo Meta Limited";
const hostnamePattern = /^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;
const plainAddress = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;
const safeDisplayName = /^[\p{L}\p{N} .&'()-]{1,80}$/u;

/** Parses `Name <address>` or `address`. Returns null if it is not a single valid address. */
export function parseSender(value: string): { name?: string; address: string } | null {
  const v = value.trim();
  const m = v.match(/^(.*?)\s*<([^<>]+)>$/);
  const name = m ? m[1].trim().replace(/^"(.*)"$/, "$1").trim() : undefined;
  const address = (m ? m[2] : v).trim();
  if (!plainAddress.test(address)) return null;
  if (name !== undefined && name !== "" && !safeDisplayName.test(name)) return null;
  return { name: name || undefined, address };
}

/**
 * Reads SMTP settings. Returns null when delivery is not configured.
 * Accepts SMTP_PASSWORD or SMTP_PASS, and EMAIL_FROM ("Name <address>") or
 * CONTACT_FROM_EMAIL ("address"), so either naming style works on the host.
 */
export function readSmtpConfig(env: Record<string, string | undefined> = process.env): SmtpConfig | null {
  const host = env.SMTP_HOST?.trim();
  const user = env.SMTP_USER?.trim();
  const pass = env.SMTP_PASSWORD || env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = Number(env.SMTP_PORT ?? 465);
  if (!Number.isInteger(port) || port <= 0) return null;
  const secure = env.SMTP_SECURE ? env.SMTP_SECURE.trim().toLowerCase() === "true" : port === 465;

  // Hostinger only accepts mail whose From address is the authenticated mailbox.
  const sender = parseSender(env.EMAIL_FROM || env.CONTACT_FROM_EMAIL || user) ?? { address: user };
  const from = sender.address;
  const fromName = sender.name ?? DEFAULT_FROM_NAME;

  // Without this, Nodemailer greets the SMTP server as "[127.0.0.1]" when the
  // machine has no fully-qualified hostname, which spam filters penalise. Use
  // SMTP_EHLO_NAME if set, otherwise the sender's domain (e.g. silgometa.com.ng).
  const fromDomain = from.split("@")[1]?.trim().toLowerCase() ?? "";
  const ehloCandidate = env.SMTP_EHLO_NAME?.trim().toLowerCase() || fromDomain;
  const ehloName = hostnamePattern.test(ehloCandidate)
    ? ehloCandidate
    : hostnamePattern.test(fromDomain)
      ? fromDomain
      : "localhost";

  return { host, port, secure, user, pass, from, fromName, ehloName };
}

let cached: { key: string; transporter: Transporter } | undefined;

function transporterFor(config: SmtpConfig) {
  const key = [config.host, config.port, config.secure, config.user, config.pass, config.ehloName].join("\u0000");
  if (cached?.key !== key) {
    cached = {
      key,
      transporter: nodemailer.createTransport(
        {
          host: config.host,
          port: config.port,
          secure: config.secure,
          name: config.ehloName,
          auth: { user: config.user, pass: config.pass },
          connectionTimeout: 10_000,
          greetingTimeout: 10_000,
          socketTimeout: 15_000,
          // Defence in depth: website mail is generated text/HTML only, so
          // Nodemailer must never read local files or fetch URLs for content.
          disableFileAccess: true,
          disableUrlAccess: true,
        },
        // Message defaults, also applied to every message.
        { disableFileAccess: true, disableUrlAccess: true },
      ),
    };
  }
  return cached.transporter;
}

export type OutgoingMessage = {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
  /** Extra headers, e.g. X-Enquiry-Reference. Values must be server-generated. */
  headers?: Record<string, string>;
};

export type SendResult = {
  /** True only when the SMTP server accepted the recipient and rejected nothing. */
  accepted: boolean;
  /** SMTP server's final response line, e.g. "250 2.0.0 Ok: queued as …". */
  response: string;
  messageId: string;
};

const addressOf = (entry: unknown) =>
  (typeof entry === "string" ? entry : (entry as { address?: string })?.address ?? "").toLowerCase();

/** Errors that happen before the SMTP session starts: nothing has been sent yet. */
const CONNECTION_ERRORS = new Set(["ETIMEDOUT", "ECONNECTION", "ESOCKET", "EDNS"]);

export function isConnectionPhaseError(error: unknown) {
  const e = error as { code?: unknown; command?: unknown };
  return typeof e?.code === "string" && CONNECTION_ERRORS.has(e.code) && (e.command === undefined || e.command === "CONN");
}

/**
 * Sends one message, retrying once if the connection to the SMTP server could
 * not be established (transient network failure). Failures after the session
 * has started (authentication, rejected recipient) are never retried, so a
 * message can never be delivered twice.
 */
export async function sendMail(config: SmtpConfig, message: OutgoingMessage): Promise<SendResult> {
  try {
    return await sendMailOnce(config, message);
  } catch (error) {
    if (!isConnectionPhaseError(error)) throw error;
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    return sendMailOnce(config, message);
  }
}

export const RETRY_DELAY_MS = 1_500;

async function sendMailOnce(config: SmtpConfig, message: OutgoingMessage): Promise<SendResult> {
  // Only generated strings reach Nodemailer: no `raw`, attachments, file paths,
  // URLs or address lists. The recipient is a fixed server-side mailbox (or, for
  // acknowledgements, the single validated visitor address); Reply-To is a single
  // validated address (≤200 chars, no commas, spaces or brackets).
  const info = await transporterFor(config).sendMail({
    from: { name: config.fromName, address: config.from },
    to: message.to,
    replyTo: message.replyTo,
    subject: message.subject,
    text: message.text,
    html: message.html,
    headers: message.headers,
  });
  const accepted = (info.accepted ?? []).map(addressOf);
  const rejected = info.rejected ?? [];
  return {
    accepted: rejected.length === 0 && accepted.includes(message.to.toLowerCase()),
    response: String(info.response ?? ""),
    messageId: String(info.messageId ?? ""),
  };
}
