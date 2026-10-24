/** Contact form schema and validation, shared by the client and the API route. */

export const enquiryTypes = [
  "Capital markets & deal structuring",
  "Strategy & marketing consultancy",
  "Infrastructure & technology",
  "Business consulting & capacity building",
  "Careers",
  "General enquiry",
] as const;

export type ContactInput = {
  name: string;
  email: string;
  organization: string;
  phone: string;
  enquiryType: string;
  message: string;
  consent: boolean;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const limits = {
  name: 120,
  email: 200,
  organization: 160,
  phone: 40,
  messageMin: 20,
  message: 5000,
} as const;

const emailPattern = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;
const phonePattern = /^[+()\-.\s\d]{7,40}$/;
const controlChars = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Trim, strip control characters and collapse line breaks for single-line fields. */
const clean = (value: unknown, singleLine = true) => {
  if (typeof value !== "string") return "";
  const stripped = value.replace(controlChars, "");
  return (singleLine ? stripped.replace(/[\r\n]+/g, " ") : stripped).trim();
};

export function normalizeContact(raw: Record<string, unknown>): ContactInput {
  return {
    name: clean(raw.name),
    email: clean(raw.email).toLowerCase(),
    organization: clean(raw.organization),
    phone: clean(raw.phone),
    enquiryType: clean(raw.enquiryType),
    message: clean(raw.message, false),
    consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
  };
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};

  if (!input.name) errors.name = "Please enter your name.";
  else if (input.name.length > limits.name) errors.name = "Name is too long.";

  if (!input.email) errors.email = "Please enter your email address.";
  else if (input.email.length > limits.email || !emailPattern.test(input.email))
    errors.email = "Please enter a valid email address, for example name@company.com.";

  if (input.organization.length > limits.organization)
    errors.organization = "Organization name is too long.";

  if (input.phone && !phonePattern.test(input.phone))
    errors.phone = "Please enter a valid phone number, or leave this field blank.";

  if (!(enquiryTypes as readonly string[]).includes(input.enquiryType))
    errors.enquiryType = "Please choose the type of enquiry.";

  if (!input.message) errors.message = "Please tell us about your enquiry.";
  else if (input.message.length < limits.messageMin)
    errors.message = `Please provide a little more detail (at least ${limits.messageMin} characters).`;
  else if (input.message.length > limits.message)
    errors.message = `Please keep your message under ${limits.message} characters.`;

  if (!input.consent)
    errors.consent = "Please confirm that we may use these details to respond to you.";

  return errors;
}

/** Plain-text email body. Sent as text only, so no HTML injection is possible. */
export function formatContactEmail(input: ContactInput) {
  return [
    `New website enquiry — ${input.enquiryType}`,
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Organization: ${input.organization || "—"}`,
    `Phone: ${input.phone || "—"}`,
    "",
    "Message:",
    input.message,
  ].join("\n");
}

/** Builds a mailto: link so visitors can send their message by email when online submission is unavailable. */
export function buildMailtoFallback(to: string, input: ContactInput) {
  const subject = `Website enquiry: ${input.enquiryType || "General enquiry"}`;
  const body = formatContactEmail(input);
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
