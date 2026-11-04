import { formatContactEmail, normalizeContact, validateContact } from "@/lib/contact";
import { routeForEnquiry } from "@/lib/contact-routing";
import { readSmtpConfig, sendMail } from "@/lib/mailer";

/**
 * Contact form endpoint.
 *
 * Delivers enquiries through Hostinger SMTP (Nodemailer), sending from the
 * configured mailbox (CONTACT_FROM_EMAIL / SMTP_USER) to the department
 * mailbox chosen on the server from the enquiry type (src/lib/contact-routing.ts).
 * The visitor's address is used as Reply-To. Without SMTP settings it responds
 * with 503 `not_configured` so the form can tell the visitor honestly and offer
 * a direct email instead. Secrets are only read here, on the server.
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
    return json(503, { ok: false, code: "not_configured" });
  }

  if (rateLimited(`email:${input.email}`, MAX_PER_WINDOW)) {
    return json(429, { ok: false, code: "rate_limited" });
  }

  try {
    const accepted = await sendMail(smtp, {
      to: route.mailbox,
      replyTo: input.email,
      subject: `Website enquiry: ${input.enquiryType} — ${input.name}`,
      text: formatContactEmail(input, `${route.department} <${route.mailbox}>`),
    });
    if (!accepted) {
      console.error("Contact email was not accepted by the SMTP server");
      return json(502, { ok: false, code: "send_failed" });
    }
  } catch (error) {
    const code = (error as { code?: unknown })?.code;
    console.error("Contact email delivery failed", typeof code === "string" ? code : "unknown");
    return json(502, { ok: false, code: "send_failed" });
  }

  return json(200, { ok: true });
}
