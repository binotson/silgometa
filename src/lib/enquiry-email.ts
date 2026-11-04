/**
 * SERVER-SIDE enquiry email content: reference numbers and the department
 * notification and visitor acknowledgement templates (HTML + plain text).
 *
 * Every visitor-supplied value is HTML-escaped in the HTML part. Templates use
 * inline styles only, with no images, external links or tracking, to keep them
 * readable in every mail client and free of common spam signals.
 */
import { randomBytes } from "node:crypto";
import type { ContactInput } from "./contact";
import type { EnquiryRoute } from "./contact-routing";

export const COMPANY = {
  name: "SILGO META LIMITED",
  rc: "RC No. 679305",
  phone: "+234-906-8888-488",
  website: "silgometa.com.ng",
  locations: "Abuja | Kano | Nigeria",
} as const;

// Crockford base32 without ambiguous characters (no I, L, O, U).
const REF_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

/** Enquiry reference, e.g. SM-20261104-7F3K9Q (date in Lagos time + random part). */
export function createReference(now = new Date()): string {
  const day = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(now)
    .replaceAll("-", "");
  const random = [...randomBytes(6)].map((b) => REF_ALPHABET[b % 32]).join("");
  return `SM-${day}-${random}`;
}

export const referencePattern = /^SM-\d{8}-[0-9A-HJKMNP-TV-Z]{6}$/;

/** Submission time in West Africa Time, e.g. "Wednesday, 4 November 2026, 21:01 WAT". */
export function formatSubmittedAt(now = new Date()): string {
  const s = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
  return `${s.replace(" at ", ", ")} WAT`;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Escaped text with line breaks preserved. */
const multiline = (value: string) => escapeHtml(value).replace(/\r?\n/g, "<br>");

type Rendered = { subject: string; text: string; html: string };

const NAVY = "#10243A";
const GOLD = "#AD7E3A";
const GOLD_TEXT = "#7A5A26";
const INK = "#1D2733";
const MUTED = "#5B6573";
const LINE = "#DFE3E8";
const PAPER = "#FAF9F6";

function layout({ preheader, title, body }: { preheader: string; title: string; body: string }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PAPER};">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;background:#FFFFFF;border:1px solid ${LINE};">
<tr><td style="background:${NAVY};padding:22px 28px;border-bottom:3px solid ${GOLD};">
<div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:bold;letter-spacing:3px;color:#FFFFFF;">SILGO META</div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:5px;color:#ADAAB5;margin-top:2px;">LIMITED</div>
</td></tr>
${body}
<tr><td style="padding:18px 28px;background:${PAPER};border-top:1px solid ${LINE};font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:${MUTED};">
${COMPANY.name} &middot; ${COMPANY.rc}<br>${COMPANY.locations} &middot; ${COMPANY.website}
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

const row = (label: string, valueHtml: string) =>
  `<tr><td style="padding:9px 0;border-bottom:1px solid ${LINE};font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${MUTED};width:150px;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:9px 0;border-bottom:1px solid ${LINE};font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${INK};vertical-align:top;">${valueHtml}</td></tr>`;

/** Notification to the department mailbox. Reply-To is the visitor. */
export function renderDepartmentEmail(input: ContactInput, route: EnquiryRoute, reference: string, submittedAt: string): Rendered {
  const subject = `New Website Enquiry – ${route.department} – ${COMPANY.name} [${reference}]`;
  const instruction = `Please reply to the enquirer within one business day. Use Reply in your email application: replies go directly to ${input.email} from your own company mailbox.`;

  const fields: [string, string][] = [
    ["Reference", reference],
    ["Department", `${route.department} (${route.mailbox})`],
    ["Enquiry category", input.enquiryType],
    ["Submitted", submittedAt],
    ["Full name", input.name],
    ["Email", input.email],
    ["Phone", input.phone || "Not provided"],
    ["Company", input.organization || "Not provided"],
  ];

  const text = [
    `NEW WEBSITE ENQUIRY – ${route.department.toUpperCase()}`,
    `${COMPANY.name}`,
    "",
    ...fields.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    input.message,
    "",
    "----",
    `Action required: ${instruction}`,
    "",
    `Sent from the enquiry form at ${COMPANY.website}. The enquirer consented to being contacted about this enquiry.`,
  ].join("\n");

  const body = `
<tr><td style="padding:26px 28px 6px;">
<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:2px;color:${GOLD_TEXT};text-transform:uppercase;">New website enquiry</div>
<div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;color:${NAVY};margin-top:6px;">${escapeHtml(route.department)}</div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${MUTED};margin-top:6px;">Reference <strong style="color:${INK};">${escapeHtml(reference)}</strong> &middot; ${escapeHtml(submittedAt)}</div>
</td></tr>
<tr><td style="padding:12px 28px;">
<div style="background:#FBF6EE;border-left:3px solid ${GOLD};padding:12px 14px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:${INK};"><strong>Action required:</strong> ${escapeHtml(instruction)}</div>
</td></tr>
<tr><td style="padding:6px 28px 4px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${row("Full name", escapeHtml(input.name))}
${row("Email", `<a href="mailto:${escapeHtml(input.email)}" style="color:${NAVY};">${escapeHtml(input.email)}</a>`)}
${row("Phone", escapeHtml(input.phone || "Not provided"))}
${row("Company", escapeHtml(input.organization || "Not provided"))}
${row("Enquiry category", escapeHtml(input.enquiryType))}
${row("Department", `${escapeHtml(route.department)}<br><span style="color:${MUTED};font-size:12px;">${escapeHtml(route.mailbox)}</span>`)}
${row("Reference", escapeHtml(reference))}
${row("Submitted", escapeHtml(submittedAt))}
</table>
</td></tr>
<tr><td style="padding:18px 28px 26px;">
<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:2px;color:${GOLD_TEXT};text-transform:uppercase;">Message</div>
<div style="margin-top:8px;padding:14px 16px;background:${PAPER};border:1px solid ${LINE};font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:${INK};">${multiline(input.message)}</div>
<div style="margin-top:14px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:${MUTED};">Sent from the enquiry form at ${COMPANY.website}. The enquirer consented to being contacted about this enquiry.</div>
</td></tr>`;

  return { subject, text, html: layout({ preheader: `${route.department} enquiry ${reference}`, title: subject, body }) };
}

/**
 * Acknowledgement to the visitor. Contains NO visitor-supplied text (no name or
 * message), only server-controlled values, so the form cannot be abused to send
 * arbitrary content from the company mailbox to third parties.
 */
export function renderAcknowledgementEmail(route: EnquiryRoute, reference: string, submittedAt: string): Rendered {
  const subject = `We have received your enquiry – ${COMPANY.name} [${reference}]`;
  const text = [
    "Thank you for contacting SILGO META LIMITED.",
    "",
    `We have received your enquiry and passed it to our ${route.department} team.`,
    "A member of the team will review it and respond to you by email.",
    "",
    `Reference: ${reference}`,
    `Department: ${route.department}`,
    `Received: ${submittedAt}`,
    "",
    "Please quote your reference in any correspondence about this enquiry.",
    "Please do not send confidential transaction documents until we have arranged a conversation.",
    "",
    `If you did not submit this enquiry, please disregard this email. You may also call us on ${COMPANY.phone}.`,
    "",
    "Kind regards,",
    COMPANY.name,
    `${COMPANY.rc} · ${COMPANY.locations}`,
  ].join("\n");

  const body = `
<tr><td style="padding:28px 28px 8px;">
<div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;color:${NAVY};">Thank you for your enquiry</div>
<p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:23px;color:${INK};margin:14px 0 0;">We have received your enquiry and passed it to our <strong>${escapeHtml(route.department)}</strong> team. A member of the team will review it and respond to you by email.</p>
</td></tr>
<tr><td style="padding:14px 28px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${row("Reference", `<strong>${escapeHtml(reference)}</strong>`)}
${row("Department", escapeHtml(route.department))}
${row("Received", escapeHtml(submittedAt))}
</table>
</td></tr>
<tr><td style="padding:8px 28px 28px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:${INK};">
<p style="margin:0;">Please quote your reference in any correspondence about this enquiry. Please do not send confidential transaction documents until we have arranged a conversation.</p>
<p style="margin:14px 0 0;color:${MUTED};font-size:13px;line-height:20px;">If you did not submit this enquiry, please disregard this email. You may also call us on ${escapeHtml(COMPANY.phone)}.</p>
<p style="margin:18px 0 0;">Kind regards,<br><strong>${COMPANY.name}</strong></p>
</td></tr>`;

  return { subject, text, html: layout({ preheader: `Your reference is ${reference}`, title: subject, body }) };
}
