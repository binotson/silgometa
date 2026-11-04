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
  from: string;
  /** Name announced in the SMTP EHLO greeting. */
  ehloName: string;
};

const hostnamePattern = /^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

/** Reads SMTP settings. Returns null when delivery is not configured. */
export function readSmtpConfig(env: Record<string, string | undefined> = process.env): SmtpConfig | null {
  const host = env.SMTP_HOST?.trim();
  const user = env.SMTP_USER?.trim();
  const pass = env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = Number(env.SMTP_PORT ?? 465);
  if (!Number.isInteger(port) || port <= 0) return null;
  const secure = env.SMTP_SECURE ? env.SMTP_SECURE.trim().toLowerCase() === "true" : port === 465;

  // Hostinger only accepts mail whose From address is the authenticated mailbox.
  const from = env.CONTACT_FROM_EMAIL?.trim() || user;

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

  return { host, port, secure, user, pass, from, ehloName };
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
          // Defence in depth: website mail is plain text only, so Nodemailer
          // must never read local files or fetch URLs for message content.
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

export type OutgoingMessage = { to: string; replyTo: string; subject: string; text: string };

const addressOf = (entry: unknown) =>
  (typeof entry === "string" ? entry : (entry as { address?: string })?.address ?? "").toLowerCase();

/**
 * Sends one plain-text message. Resolves true only when the SMTP server
 * accepted the recipient and rejected nothing.
 */
export async function sendMail(config: SmtpConfig, message: OutgoingMessage): Promise<boolean> {
  // Only plain strings reach Nodemailer: no `raw`, attachments, html or
  // address objects/lists. Recipient is a fixed server-side mailbox; Reply-To
  // is a single validated address (≤200 chars, no commas, spaces or brackets),
  // which keeps the address parser's input small and simple.
  const info = await transporterFor(config).sendMail({
    from: { name: "SILGO META LIMITED Website", address: config.from },
    to: message.to,
    replyTo: message.replyTo,
    subject: message.subject,
    text: message.text,
  });
  const accepted = (info.accepted ?? []).map(addressOf);
  const rejected = info.rejected ?? [];
  return rejected.length === 0 && accepted.includes(message.to.toLowerCase());
}
