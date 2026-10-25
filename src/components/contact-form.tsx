"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import {
  buildMailtoFallback,
  enquiryTypes,
  limits,
  normalizeContact,
  validateContact,
  type ContactErrors,
  type ContactInput,
} from "@/lib/contact";
import { cn } from "@/components/ui";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "unavailable"; mailto: string }
  | { kind: "error"; message: string; mailto?: string };

const fieldOrder: (keyof ContactInput)[] = ["name", "email", "organization", "phone", "enquiryType", "message", "consent"];

const inputClass =
  "mt-2 block w-full rounded-sm border bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/60";

export function ContactForm({ to }: { to: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  // Time the form was shown, used server-side as a simple anti-bot check.
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const describedBy = (field: keyof ContactInput, hint?: string) =>
    [hint, errors[field] ? `${field}-error` : undefined].filter(Boolean).join(" ") || undefined;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const raw = Object.fromEntries(data.entries()) as Record<string, unknown>;
    raw.consent = data.get("consent") === "on";

    const input = normalizeContact(raw);
    const found = validateContact(input);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus({ kind: "idle" });
      const first = fieldOrder.find((f) => found[f]);
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ kind: "submitting" });
    const mailto = buildMailtoFallback(to, input);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, website: raw.website ?? "", startedAt: startedAt.current }),
      });
      const body = (await res.json().catch(() => ({}))) as { code?: string; errors?: ContactErrors };

      if (res.ok) {
        setStatus({ kind: "success" });
        form.reset();
        return;
      }
      if (res.status === 422 && body.errors) {
        setErrors(body.errors);
        setStatus({ kind: "idle" });
        return;
      }
      if (body.code === "not_configured") {
        setStatus({ kind: "unavailable", mailto });
        return;
      }
      if (res.status === 429) {
        setStatus({
          kind: "error",
          message: "Too many messages have been sent from your connection. Please try again later or email us directly.",
          mailto,
        });
        return;
      }
      setStatus({
        kind: "error",
        message: "Your message could not be sent. Please try again, or email us directly.",
        mailto,
      });
    } catch {
      setStatus({
        kind: "error",
        message: "We could not reach the server. Please check your connection and try again, or email us directly.",
        mailto,
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div role="status" className="rounded-sm border border-emerald-700/30 bg-emerald-700/5 p-8">
        <CheckCircle2 aria-hidden className="size-8 text-emerald-700" />
        <h3 className="mt-4 font-serif text-2xl font-semibold text-navy-900">Thank you — your message has been sent</h3>
        <p className="mt-3 text-base leading-relaxed text-slate">
          A member of our team will review your enquiry and respond to the email address you provided.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-6 font-semibold text-navy-900 underline decoration-gold-500 underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";
  const errorCount = Object.keys(errors).length;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby="form-note" className="space-y-6">
      <p id="form-note" className="text-sm text-muted">
        Fields marked <span aria-hidden>*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div aria-live="polite" className="empty:hidden">
        {errorCount > 0 && (
          <p className="flex gap-3 rounded-sm border border-red-700/30 bg-red-50 p-4 text-base text-red-800">
            <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0" />
            Please correct {errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`} and
            try again.
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and assistive tech, often filled by bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" name="name" required error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={limits.name}
            required
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            className={cn(inputClass, errors.name ? "border-red-700" : "border-line")}
          />
        </Field>
        <Field label="Email address" name="email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={limits.email}
            required
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            className={cn(inputClass, errors.email ? "border-red-700" : "border-line")}
          />
        </Field>
        <Field label="Organization" name="organization" error={errors.organization}>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            maxLength={limits.organization}
            aria-invalid={!!errors.organization}
            aria-describedby={describedBy("organization")}
            className={cn(inputClass, errors.organization ? "border-red-700" : "border-line")}
          />
        </Field>
        <Field label="Telephone" name="phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={limits.phone}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
            className={cn(inputClass, errors.phone ? "border-red-700" : "border-line")}
          />
        </Field>
      </div>

      <Field label="Type of enquiry" name="enquiryType" required error={errors.enquiryType}>
        <select
          id="enquiryType"
          name="enquiryType"
          required
          defaultValue=""
          aria-invalid={!!errors.enquiryType}
          aria-describedby={describedBy("enquiryType")}
          className={cn(inputClass, "appearance-auto", errors.enquiryType ? "border-red-700" : "border-line")}
        >
          <option value="" disabled>
            Select an option
          </option>
          {enquiryTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <Field label="How can we help?" name="message" required error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={limits.message}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message", "message-hint")}
          className={cn(inputClass, "resize-y", errors.message ? "border-red-700" : "border-line")}
        />
        <p id="message-hint" className="mt-2 text-sm text-muted">
          Please avoid sharing confidential transaction details until we have arranged a conversation.
        </p>
      </Field>

      <div>
        <div className="flex gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            aria-invalid={!!errors.consent}
            aria-describedby={describedBy("consent")}
            className="mt-1 size-5 shrink-0 accent-navy-900"
          />
          <label htmlFor="consent" className="text-base text-slate">
            I agree that Silgo Meta Limited may use these details to respond to my enquiry, as described in the{" "}
            <Link href="/privacy" className="font-medium text-navy-900 underline decoration-gold-500 underline-offset-4">
              privacy notice
            </Link>
            . <span aria-hidden>*</span>
          </label>
        </div>
        {errors.consent && <FieldError id="consent-error">{errors.consent}</FieldError>}
      </div>

      <div aria-live="polite">
        {status.kind === "unavailable" && (
          <div className="rounded-sm border border-gold-500/50 bg-gold-300/15 p-5 text-base text-navy-900">
            <p className="font-semibold">Online sending is not yet enabled on this website.</p>
            <p className="mt-2 text-slate">
              Your message has not been sent. Please send it by email instead — we have prepared it for you.
            </p>
            <a
              href={status.mailto}
              className="mt-4 inline-flex min-h-11 items-center rounded-sm bg-primary px-5 font-semibold text-on-primary hover:bg-primary-hover"
            >
              Open in my email app
            </a>
            <p className="mt-3 text-sm text-muted">
              Or write to <a href={`mailto:${to}`} className="underline">{to}</a>.
            </p>
          </div>
        )}
        {status.kind === "error" && (
          <div role="alert" className="rounded-sm border border-red-700/30 bg-red-50 p-5 text-base text-red-800">
            <p className="flex gap-3">
              <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0" />
              {status.message}
            </p>
            {status.mailto && (
              <a href={status.mailto} className="mt-3 inline-block font-semibold underline underline-offset-4">
                Send by email instead
              </a>
            )}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-primary px-8 font-semibold text-on-primary transition-colors hover:bg-primary-hover disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {submitting && <Loader2 aria-hidden className="size-4 animate-spin" />}
        {submitting ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  error,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-base font-medium text-navy-900">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      {children}
      {error && <FieldError id={`${name}-error`}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-sm font-medium text-red-700">
      <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
      {children}
    </p>
  );
}
