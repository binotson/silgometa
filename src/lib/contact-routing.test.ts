import { describe, expect, it } from "vitest";
import { enquiryTypes } from "./contact";
import { enquiryRoutes, routeForEnquiry } from "./contact-routing";
import { readSmtpConfig } from "./mailer";

const expected: Record<string, string> = {
  "Capital markets & deal structuring": "mdahmad@silgometa.com.ng",
  "Strategy & marketing consultancy": "sales@silgometa.com.ng",
  "Infrastructure & technology": "support@silgometa.com.ng",
  "Business consulting & capacity building": "fadil@silgometa.com.ng",
  Careers: "secretariat@silgometa.com.ng",
  "General enquiry": "infor@silgometa.com.ng",
};

describe("enquiry routing", () => {
  it.each(Object.entries(expected))("routes %s to %s", (type, mailbox) => {
    expect(routeForEnquiry(type)?.mailbox).toBe(mailbox);
  });

  it("covers exactly the six form enquiry types", () => {
    expect(Object.keys(enquiryRoutes).sort()).toEqual([...enquiryTypes].sort());
    expect(Object.keys(expected).sort()).toEqual([...enquiryTypes].sort());
  });

  it("returns nothing for unknown, empty or address-like values", () => {
    for (const value of ["", "Other", "attacker@example.com", "general enquiry", "toString", "__proto__"]) {
      expect(routeForEnquiry(value)).toBeUndefined();
    }
  });

  it("cannot be modified at runtime", () => {
    expect(Object.isFrozen(enquiryRoutes)).toBe(true);
  });
});

describe("readSmtpConfig", () => {
  const base = {
    SMTP_HOST: "smtp.hostinger.com",
    SMTP_PORT: "465",
    SMTP_SECURE: "true",
    SMTP_USER: "infor@silgometa.com.ng",
    SMTP_PASS: "test-only",
    CONTACT_FROM_EMAIL: "infor@silgometa.com.ng",
  };

  it("reads the Hostinger settings", () => {
    expect(readSmtpConfig(base)).toEqual({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      user: "infor@silgometa.com.ng",
      pass: "test-only",
      from: "infor@silgometa.com.ng",
      fromName: "Silgo Meta Limited",
      ehloName: "silgometa.com.ng",
    });
  });

  it("parses EMAIL_FROM and accepts SMTP_PASSWORD", () => {
    const c = readSmtpConfig({
      ...base,
      SMTP_PASS: undefined,
      CONTACT_FROM_EMAIL: undefined,
      SMTP_PASSWORD: "pw",
      EMAIL_FROM: "Silgo Meta Limited <infor@silgometa.com.ng>",
    });
    expect(c).toMatchObject({ pass: "pw", from: "infor@silgometa.com.ng", fromName: "Silgo Meta Limited" });
  });

  it("falls back to SMTP_USER when EMAIL_FROM is malformed or unsafe", () => {
    for (const bad of ["not an address", "a@b.com, c@d.com", "Evil\r\nBcc: x@y.z <infor@silgometa.com.ng>"]) {
      const c = readSmtpConfig({ ...base, CONTACT_FROM_EMAIL: undefined, EMAIL_FROM: bad });
      expect(c).toMatchObject({ from: "infor@silgometa.com.ng", fromName: "Silgo Meta Limited" });
    }
  });

  it("greets the SMTP server with the sender's domain, not [127.0.0.1]", () => {
    expect(readSmtpConfig(base)?.ehloName).toBe("silgometa.com.ng");
    expect(readSmtpConfig({ ...base, SMTP_EHLO_NAME: "mail.silgometa.com.ng" })?.ehloName).toBe(
      "mail.silgometa.com.ng",
    );
  });

  it("ignores an invalid or injected EHLO name", () => {
    for (const bad of ["bad name", "x\r\nRCPT TO:<x@y.z>", "[127.0.0.1]", "-bad.example"]) {
      expect(readSmtpConfig({ ...base, SMTP_EHLO_NAME: bad })?.ehloName).toBe("silgometa.com.ng");
    }
  });

  it("is not configured without host, user or password", () => {
    expect(readSmtpConfig({})).toBeNull();
    expect(readSmtpConfig({ ...base, SMTP_PASS: "" })).toBeNull();
    expect(readSmtpConfig({ ...base, SMTP_USER: undefined })).toBeNull();
  });

  it("defaults the sender to the SMTP user and SSL to port 465", () => {
    const c = readSmtpConfig({ ...base, CONTACT_FROM_EMAIL: "", SMTP_SECURE: undefined });
    expect(c?.from).toBe("infor@silgometa.com.ng");
    expect(c?.secure).toBe(true);
  });
});
