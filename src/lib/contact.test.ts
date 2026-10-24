import { describe, expect, it } from "vitest";
import { buildMailtoFallback, formatContactEmail, normalizeContact, validateContact } from "./contact";

const valid = {
  name: "Amina Bello",
  email: "Amina@Example.com ",
  organization: "Example Industries",
  phone: "+234 800 000 0000",
  enquiryType: "General enquiry",
  message: "We would like to discuss a Commercial Paper programme.",
  consent: true,
};

describe("normalizeContact", () => {
  it("trims and lower-cases email", () => {
    expect(normalizeContact(valid).email).toBe("amina@example.com");
  });

  it("removes line breaks from single-line fields to prevent header injection", () => {
    const n = normalizeContact({ ...valid, name: "Amina\r\nBcc: x@y.com" });
    expect(n.name).not.toMatch(/[\r\n]/);
  });

  it("keeps line breaks in the message but strips control characters", () => {
    const n = normalizeContact({ ...valid, message: "Line one\nLine two\u0007 with enough detail" });
    expect(n.message).toBe("Line one\nLine two with enough detail");
  });

  it("treats non-string values as empty", () => {
    const n = normalizeContact({ name: 42, email: { a: 1 } });
    expect(n.name).toBe("");
    expect(n.email).toBe("");
    expect(n.consent).toBe(false);
  });
});

describe("validateContact", () => {
  it("accepts a valid enquiry", () => {
    expect(validateContact(normalizeContact(valid))).toEqual({});
  });

  it("requires name, email, enquiry type, message and consent", () => {
    const errors = validateContact(normalizeContact({}));
    expect(Object.keys(errors).sort()).toEqual(["consent", "email", "enquiryType", "message", "name"]);
  });

  it("rejects malformed email addresses", () => {
    for (const email of ["no-at-sign", "a@b", "a b@c.com", "<x>@y.com"]) {
      expect(validateContact(normalizeContact({ ...valid, email })).email).toBeDefined();
    }
  });

  it("rejects unknown enquiry types", () => {
    expect(validateContact(normalizeContact({ ...valid, enquiryType: "Other" })).enquiryType).toBeDefined();
  });

  it("rejects too-short and too-long messages", () => {
    expect(validateContact(normalizeContact({ ...valid, message: "Hi" })).message).toBeDefined();
    expect(validateContact(normalizeContact({ ...valid, message: "x".repeat(5001) })).message).toBeDefined();
  });

  it("allows an empty phone but rejects letters", () => {
    expect(validateContact(normalizeContact({ ...valid, phone: "" })).phone).toBeUndefined();
    expect(validateContact(normalizeContact({ ...valid, phone: "call me" })).phone).toBeDefined();
  });
});

describe("email formatting", () => {
  it("includes all submitted fields", () => {
    const text = formatContactEmail(normalizeContact(valid));
    expect(text).toContain("Amina Bello");
    expect(text).toContain("amina@example.com");
    expect(text).toContain("Commercial Paper");
  });

  it("builds an encoded mailto fallback", () => {
    const link = buildMailtoFallback("info@silgometa.com.ng", normalizeContact(valid));
    expect(link.startsWith("mailto:info@silgometa.com.ng?subject=")).toBe(true);
    expect(link).not.toContain(" ");
  });
});
