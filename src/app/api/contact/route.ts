import { after } from "next/server";
import { normalizeContact, validateContact } from "@/lib/contact";
import { routeForEnquiry } from "@/lib/contact-routing";
import { createReference, formatSubmittedAt, renderAcknowledgementEmail, renderDepartmentEmail } from "@/lib/enquiry-email";
import { readSmtpConfig, sendMail } from "@/lib/mailer";

/**
 * Contact form endpoint.
 *
 * Delivers enquiries through Hostinger SMTP (Nodemailer), sending from the
 * authenticated mailbox (EMAIL_FROM / SMTP_USER) to the department mailbox
 * chosen on the server from the enquiry type (src/lib/contact-routing.ts),
 * with the visitor's address as Reply-To. Responds 200 with an enquiry
 * reference only after the SMTP server accepts the department email, then
 * sends the visitor an acknowledgement after the response.
 * Without SMTP settings it responds 503 `not_configured` so the form can tell
 * the visitor honestly and offer a direct email instead.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
/** Ceiling across all senders, protecting the mailbox if per-IP keys are spoofed. */
const MAX_GLOBAL_PER_WINDOW = 60;
const MIN_FILL_MS = 3000;
const MAX_BODY_BYTES = 20_000;

// Best-effort, per-instance rate limiting. Use a shared store or platform
// firewall rules if stronger protection is needed.
const hits = new Map<string, number[]>();

function rateLimited(key: string, max: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > max;
}

const json = (status: number, body: Record<string, unknown>) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return json(415, { ok: false, code: "unsupported_media_type" });
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return json(413, { ok: false, code: "too_large" });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(`ip:${ip}`, MAX_PER_WINDOW) || rateLimited("global", MAX_GLOBAL_PER_WINDOW)) {
    return json(429, { ok: false, code: "rate_limited" });
  }

  let raw: Record<string, unknown>;
  try {
    const text = await request.text();
    if (Buffer.byteLength(text, "utf8") > MAX_BODY_BYTES) return json(413, { ok: false, code: "too_large" });
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    raw = parsed as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, code: "invalid_json" });
  }

  // Spam traps: a hidden honeypot field and a minimum time to complete the form.
  // A missing or invalid start time is treated as automated.
  const startedAt = Number(raw.startedAt);
  const dropReason =
    typeof raw.website === "string" && raw.website.length > 0
      ? "honeypot_filled"
      : !Number.isFinite(startedAt) || startedAt <= 0
        ? "missing_start_time"
        : Date.now() - startedAt < MIN_FILL_MS
          ? "submitted_too_fast"
          : null;
  if (dropReason) {
    // Respond as accepted so bots get no signal, but send nothing. The reason
    // is logged (no personal data) so genuine visitors being dropped can be diagnosed.
    console.warn("Contact form submission dropped as spam:", dropReason);
    return json(200, { ok: true });
  }

  const input = normalizeContact(raw);
  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return json(422, { ok: false, code: "invalid", errors });
  }

  // Recipient is decided here from the validated enquiry type only.
  const route = routeForEnquiry(input.enquiryType);
  if (!route) {
    return json(422, { ok: false, code: "invalid", errors: { enquiryType: "Please choose the type of enquiry." } });
  }

  const smtp = readSmtpConfig();
  if (!smtp) {
    console.error("Contact form: SMTP is not configured (SMTP_HOST, SMTP_USER and SMTP_PASSWORD are required)");
    return json(503, { ok: false, code: "not_configured" });
  }

  if (rateLimited(`email:${input.email}`, MAX_PER_WINDOW)) {
    return json(429, { ok: false, code: "rate_limited" });
  }

  const now = new Date();
  const reference = createReference(now);
  const submittedAt = formatSubmittedAt(now);
  const notification = renderDepartmentEmail(input, route, reference, submittedAt);
  const target = `${route.department} <${route.mailbox}>`;

  // Logs carry the reference, department mailbox and SMTP status only: no
  // visitor personal data and never the SMTP credentials.
  try {
    const result = await sendMail(smtp, {
      to: route.mailbox,
      replyTo: input.email,
      subject: notification.subject,
      text: notification.text,
      html: notification.html,
      headers: { "X-Enquiry-Reference": reference },
    });
    if (!result.accepted) {
      console.error(`Enquiry ${reference}: department mailbox ${target} was NOT accepted by the SMTP server: ${smtpLine(result.response)}`);
      return json(502, { ok: false, code: "send_failed" });
    }
    console.info(`Enquiry ${reference}: delivered to ${target}, SMTP accepted: ${smtpLine(result.response)}`);
  } catch (error) {
    console.error(`Enquiry ${reference}: delivery to ${target} failed: ${describeSmtpError(error)}`);
    return json(502, { ok: false, code: "send_failed" });
  }

  // The enquiry is delivered. Acknowledge the visitor after the response is
  // sent, so a slow or failed acknowledgement never delays or fails the enquiry.
  if (acknowledgementsEnabled()) {
    after(async () => {
      const ack = renderAcknowledgementEmail(route, reference, submittedAt);
      try {
        const result = await sendMail(smtp, {
          to: input.email,
          replyTo: route.mailbox,
          subject: ack.subject,
          text: ack.text,
          html: ack.html,
          headers: { "X-Enquiry-Reference": reference, "Auto-Submitted": "auto-replied" },
        });
        if (result.accepted) console.info(`Enquiry ${reference}: acknowledgement accepted by SMTP: ${smtpLine(result.response)}`);
        else console.warn(`Enquiry ${reference}: acknowledgement NOT accepted by SMTP: ${smtpLine(result.response)}`);
      } catch (error) {
        console.warn(`Enquiry ${reference}: acknowledgement failed: ${describeSmtpError(error)}`);
      }
    });
  }

  return json(200, { ok: true, reference });
}

/** Acknowledgements are on unless CONTACT_SEND_ACKNOWLEDGEMENT is "false". */
function acknowledgementsEnabled() {
  return process.env.CONTACT_SEND_ACKNOWLEDGEMENT?.trim().toLowerCase() !== "false";
}

/** First line of an SMTP response, trimmed, for logs. */
function smtpLine(response: string) {
  return response.split(/\r?\n/)[0].slice(0, 200) || "(no response text)";
}

/** Error code and SMTP status for logs; never the message body or credentials. */
function describeSmtpError(error: unknown) {
  const e = error as { code?: unknown; responseCode?: unknown; command?: unknown };
  const parts = [
    typeof e?.code === "string" ? e.code : "unknown",
    typeof e?.responseCode === "number" ? `SMTP ${e.responseCode}` : "",
    typeof e?.command === "string" ? `during ${e.command}` : "",
  ].filter(Boolean);
  const hint =
    e?.code === "EAUTH"
      ? " (check SMTP_USER and SMTP_PASSWORD)"
      : e?.code === "EENVELOPE"
        ? " (a mailbox address was rejected: check that it exists)"
        : e?.code === "ETIMEDOUT" || e?.code === "ECONNECTION"
          ? " (could not reach the SMTP server)"
          : "";
  return parts.join(", ") + hint;
}
