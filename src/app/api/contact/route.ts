import {
  formatContactEmail,
  normalizeContact,
  validateContact,
} from "@/lib/contact";

/**
 * Contact form endpoint.
 *
 * Sends enquiries through the Resend email API when RESEND_API_KEY and
 * CONTACT_FROM_EMAIL are configured on the server. Without them it responds
 * with 503 `not_configured` so the form can tell the visitor honestly and
 * offer a direct email instead. Secrets are only read here, on the server.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 3000;
const MAX_BODY_BYTES = 20_000;

// Best-effort, per-instance rate limiting. Use a shared store (e.g. Upstash)
// or platform firewall rules if stronger protection is needed.
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const json = (status: number, body: Record<string, unknown>) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return json(415, { ok: false, code: "unsupported_media_type" });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return json(429, { ok: false, code: "rate_limited" });
  }

  let raw: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return json(413, { ok: false, code: "too_large" });
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    raw = parsed as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, code: "invalid_json" });
  }

  // Spam traps: a hidden honeypot field and a minimum time to complete the form.
  const startedAt = Number(raw.startedAt);
  const tooFast = Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS;
  if ((typeof raw.website === "string" && raw.website.length > 0) || tooFast) {
    // Respond as accepted so bots get no signal, but send nothing.
    return json(200, { ok: true });
  }

  const input = normalizeContact(raw);
  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return json(422, { ok: false, code: "invalid", errors });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "info@silgometa.com.ng";
  if (!apiKey || !from) {
    return json(503, { ok: false, code: "not_configured" });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        reply_to: input.email,
        subject: `Website enquiry: ${input.enquiryType} — ${input.name}`,
        text: formatContactEmail(input),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("Contact email provider error", res.status);
      return json(502, { ok: false, code: "send_failed" });
    }
  } catch (error) {
    console.error("Contact email request failed", error instanceof Error ? error.name : "unknown");
    return json(502, { ok: false, code: "send_failed" });
  }

  return json(200, { ok: true });
}
