import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the SMTP transport: no network connections are made in tests.
const { sendMailMock, transportCalls } = vi.hoisted(() => ({
  sendMailMock: vi.fn(),
  transportCalls: [] as unknown[][],
}));
vi.mock("nodemailer", () => ({
  default: {
    createTransport: (...args: unknown[]) => {
      transportCalls.push(args);
      return { sendMail: sendMailMock };
    },
  },
}));

const { POST } = await import("./route");

const smtpEnv = {
  SMTP_HOST: "smtp.hostinger.com",
  SMTP_PORT: "465",
  SMTP_SECURE: "true",
  SMTP_USER: "infor@silgometa.com.ng",
  SMTP_PASS: "test-only",
  CONTACT_FROM_EMAIL: "infor@silgometa.com.ng",
};

let ipCounter = 0;
function request(body: Record<string, unknown>, init: { ip?: string; contentType?: string; raw?: string } = {}) {
  ipCounter += 1;
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "content-type": init.contentType ?? "application/json",
      "x-forwarded-for": init.ip ?? `10.0.0.${ipCounter}`,
    },
    body: init.raw ?? JSON.stringify(body),
  });
}

const valid = (overrides: Record<string, unknown> = {}) => ({
  name: "Amina Bello",
  email: `amina${ipCounter}@example.com`,
  organization: "Example Industries",
  phone: "",
  enquiryType: "General enquiry",
  message: "We would like to discuss a Commercial Paper programme.",
  consent: true,
  website: "",
  startedAt: Date.now() - 10_000,
  ...overrides,
});

const accept = () =>
  sendMailMock.mockImplementation(async (msg: { to: string }) => ({ accepted: [msg.to], rejected: [] }));

beforeEach(() => {
  sendMailMock.mockReset();
  for (const [k, v] of Object.entries(smtpEnv)) vi.stubEnv(k, v);
});

describe("POST /api/contact routing", () => {
  it.each([
    ["Capital markets & deal structuring", "mdahmad@silgometa.com.ng"],
    ["Strategy & marketing consultancy", "sales@silgometa.com.ng"],
    ["Infrastructure & technology", "support@silgometa.com.ng"],
    ["Business consulting & capacity building", "fadil@silgometa.com.ng"],
    ["Careers", "secretariat@silgometa.com.ng"],
    ["General enquiry", "infor@silgometa.com.ng"],
  ])("sends %s to %s from infor@ with the visitor as reply-to", async (enquiryType, mailbox) => {
    accept();
    const res = await POST(request(valid({ enquiryType, email: `visitor-${mailbox}` .replace("@silgometa.com.ng", "@example.com") })));
    expect(res.status).toBe(200);
    expect(sendMailMock).toHaveBeenCalledTimes(1);
    const msg = sendMailMock.mock.calls[0][0];
    expect(msg.to).toBe(mailbox);
    expect(msg.from).toEqual({ name: "SILGO META LIMITED Website", address: "infor@silgometa.com.ng" });
    expect(msg.replyTo).toMatch(/@example\.com$/);
    expect(msg.text).toContain(`Routed to:`);
    expect(msg.text).toContain(mailbox);
  });

  it("ignores any recipient fields supplied by the browser", async () => {
    accept();
    const res = await POST(
      request(valid({ to: "attacker@evil.test", cc: "x@evil.test", bcc: "y@evil.test", recipient: "z@evil.test" })),
    );
    expect(res.status).toBe(200);
    const msg = sendMailMock.mock.calls[0][0];
    expect(msg.to).toBe("infor@silgometa.com.ng");
    expect(JSON.stringify(msg)).not.toContain("evil.test");
  });

  it("rejects an unknown enquiry type without sending", async () => {
    const res = await POST(request(valid({ enquiryType: "attacker@evil.test" })));
    expect(res.status).toBe(422);
    expect(sendMailMock).not.toHaveBeenCalled();
  });
});

describe("POST /api/contact delivery results", () => {
  it("reports failure when the SMTP server rejects the recipient", async () => {
    sendMailMock.mockResolvedValue({ accepted: [], rejected: ["infor@silgometa.com.ng"] });
    const res = await POST(request(valid()));
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ ok: false, code: "send_failed" });
  });

  it("reports failure without leaking error details when SMTP throws", async () => {
    sendMailMock.mockRejectedValue(Object.assign(new Error("Invalid login: secret-detail"), { code: "EAUTH" }));
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await POST(request(valid()));
    const body = await res.json();
    expect(res.status).toBe(502);
    expect(JSON.stringify(body)).not.toContain("secret-detail");
    expect(JSON.stringify(spy.mock.calls)).not.toContain("secret-detail");
    expect(JSON.stringify(spy.mock.calls)).not.toContain("test-only");
    spy.mockRestore();
  });

  it("returns not_configured when SMTP settings are missing", async () => {
    vi.stubEnv("SMTP_PASS", "");
    const res = await POST(request(valid()));
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, code: "not_configured" });
    expect(sendMailMock).not.toHaveBeenCalled();
  });
});

describe("POST /api/contact Nodemailer hardening (GHSA-2x7j-588g-ccc2, GHSA-v53p-9fqp-m79j, GHSA-p6gq-j5cr-w38f)", () => {
  it("creates the transport with file and URL access disabled", async () => {
    accept();
    expect((await POST(request(valid()))).status).toBe(200);
    expect(transportCalls.length).toBeGreaterThan(0);
    const [options, defaults] = transportCalls.at(-1)!;
    expect(options).toMatchObject({ disableFileAccess: true, disableUrlAccess: true, name: "silgometa.com.ng" });
    expect(defaults).toMatchObject({ disableFileAccess: true, disableUrlAccess: true });
  });

  it("passes only plain strings to sendMail — never raw, attachments, html or address lists", async () => {
    accept();
    const res = await POST(
      request(valid({ raw: { path: "/etc/passwd" }, attachments: [{ path: "/etc/passwd" }], html: "<b>x</b>" })),
    );
    expect(res.status).toBe(200);
    const msg = sendMailMock.mock.calls[0][0];
    expect(Object.keys(msg).sort()).toEqual(["from", "replyTo", "subject", "text", "to"]);
    expect(typeof msg.to).toBe("string");
    expect(typeof msg.replyTo).toBe("string");
    expect(msg.replyTo).not.toMatch(/[,;\s<>]/);
  });

  it.each([
    ["a comma-separated address list (quadratic parser DoS)", "a@b.com,".repeat(2_000)],
    ["a long whitespace-free run with no usable @ (backtracking DoS)", "x".repeat(15_000)],
    ["a list with display names", "a, b <c@d.com>,".repeat(500)],
    ["two addresses", "visitor@example.com,attacker@evil.test"],
    ["an angle-addr", "Visitor <visitor@example.com>"],
  ])("rejects %s as the email before Nodemailer sees it", async (_label, email) => {
    const started = performance.now();
    const res = await POST(request(valid({ email })));
    expect([413, 422]).toContain(res.status);
    expect(sendMailMock).not.toHaveBeenCalled();
    expect(performance.now() - started).toBeLessThan(500);
  });
});

describe("POST /api/contact spam-drop diagnostics", () => {
  it.each([
    ["honeypot_filled", { website: "https://autofilled.example" }],
    ["missing_start_time", { startedAt: undefined }],
    ["submitted_too_fast", { startedAt: Date.now() }],
  ])("logs %s (without personal data) and sends nothing", async (reason, overrides) => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const res = await POST(request(valid(overrides)));
    expect(res.status).toBe(200);
    expect(sendMailMock).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledWith("Contact form submission dropped as spam:", reason);
    expect(JSON.stringify(warn.mock.calls)).not.toMatch(/Amina|example\.com|Commercial Paper/);
    warn.mockRestore();
  });
});

describe("POST /api/contact protections", () => {
  it("silently drops honeypot submissions", async () => {
    const res = await POST(request(valid({ website: "https://spam.test" })));
    expect(res.status).toBe(200);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it("silently drops submissions that are too fast or have no start time", async () => {
    for (const startedAt of [Date.now(), undefined, 0, "abc"]) {
      const res = await POST(request(valid({ startedAt })));
      expect(res.status).toBe(200);
    }
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it("rejects non-JSON, malformed and oversized bodies", async () => {
    expect((await POST(request({}, { contentType: "text/plain" }))).status).toBe(415);
    expect((await POST(request({}, { raw: "{not json" }))).status).toBe(400);
    expect((await POST(request(valid({ message: "x".repeat(25_000) })))).status).toBe(413);
  });

  it("returns field errors for invalid input", async () => {
    const res = await POST(request(valid({ email: "not-an-email", consent: false })));
    expect(res.status).toBe(422);
    const body = await res.json();
    expect(Object.keys(body.errors).sort()).toEqual(["consent", "email"]);
  });

  it("rate-limits repeated submissions from one IP", async () => {
    accept();
    const statuses = [];
    for (let i = 0; i < 7; i++) {
      statuses.push((await POST(request(valid({ email: `rl${i}@example.com` }), { ip: "203.0.113.9" }))).status);
    }
    expect(statuses.slice(0, 5)).toEqual([200, 200, 200, 200, 200]);
    expect(statuses.slice(5)).toEqual([429, 429]);
  });

  it("rate-limits repeated submissions from one email address across IPs", async () => {
    accept();
    const statuses = [];
    for (let i = 0; i < 6; i++) {
      statuses.push((await POST(request(valid({ email: "same@example.com" })))).status);
    }
    expect(statuses.slice(0, 5)).toEqual([200, 200, 200, 200, 200]);
    expect(statuses[5]).toBe(429);
  });
});
