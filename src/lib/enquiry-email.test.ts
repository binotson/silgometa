import { describe, expect, it } from "vitest";
import { enquiryRoutes } from "./contact-routing";
import {
  createReference,
  escapeHtml,
  formatSubmittedAt,
  referencePattern,
  renderAcknowledgementEmail,
  renderDepartmentEmail,
} from "./enquiry-email";

const route = enquiryRoutes["Capital markets & deal structuring"];
const input = {
  name: "Amina Bello",
  email: "amina@example.com",
  organization: "",
  phone: "",
  enquiryType: "Capital markets & deal structuring",
  message: "Line one\nLine two with enough detail.",
  consent: true,
};

describe("createReference", () => {
  it("uses the Lagos date and a 6-character unambiguous random part", () => {
    const ref = createReference(new Date("2026-11-04T23:30:00Z")); // 00:30 on 5 Nov in Lagos
    expect(ref).toMatch(referencePattern);
    expect(ref.startsWith("SM-20261105-")).toBe(true);
  });

  it("is effectively unique", () => {
    const refs = new Set(Array.from({ length: 2000 }, () => createReference()));
    expect(refs.size).toBe(2000);
  });
});

describe("formatSubmittedAt", () => {
  it("formats in West Africa Time", () => {
    expect(formatSubmittedAt(new Date("2026-11-04T20:01:00Z"))).toBe("Wednesday, 4 November 2026, 21:01 WAT");
  });
});

describe("escapeHtml", () => {
  it("escapes all HTML-significant characters", () => {
    expect(escapeHtml(`<a href="x" onclick='y'>&</a>`)).toBe("&lt;a href=&quot;x&quot; onclick=&#39;y&#39;&gt;&amp;&lt;/a&gt;");
  });
});

describe("renderDepartmentEmail", () => {
  const r = renderDepartmentEmail(input, route, "SM-20261104-ABCDEF", "Wednesday, 4 November 2026, 21:01 WAT");

  it("uses the requested subject format", () => {
    expect(r.subject).toBe("New Website Enquiry – Capital Markets – SILGO META LIMITED [SM-20261104-ABCDEF]");
  });

  it("marks optional fields that were not supplied", () => {
    expect(r.text).toContain("Phone: Not provided");
    expect(r.text).toContain("Company: Not provided");
  });

  it("keeps message line breaks in HTML", () => {
    expect(r.html).toContain("Line one<br>Line two");
  });

  it("contains no images, scripts or external links", () => {
    expect(r.html).not.toMatch(/<img|<script|https?:\/\//i);
  });
});

describe("renderAcknowledgementEmail", () => {
  const r = renderAcknowledgementEmail(route, "SM-20261104-ABCDEF", "Wednesday, 4 November 2026, 21:01 WAT");

  it("confirms the reference and department", () => {
    expect(r.subject).toBe("We have received your enquiry – SILGO META LIMITED [SM-20261104-ABCDEF]");
    expect(r.text).toContain("Capital Markets");
    expect(r.text).toContain("SM-20261104-ABCDEF");
  });

  it("contains no images, scripts or external links", () => {
    expect(r.html).not.toMatch(/<img|<script|https?:\/\//i);
  });
});
