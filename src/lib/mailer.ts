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
};

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
  return { host, port, secure, user, pass, from };
}

let cached: { key: string; transporter: Transporter } | undefined;

function transporterFor(config: SmtpConfig) {
  const key = [config.host, config.port, config.secure, config.user, config.pass].join("\u0000");
  if (cached?.key !== key) {
    cached = {
      key,
      transporter: nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: { user: config.user, pass: config.pass },
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 15_000,
      }),
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
