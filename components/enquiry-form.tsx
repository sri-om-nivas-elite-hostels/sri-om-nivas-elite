"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, Phone } from "lucide-react";
import {
  LIMITS,
  normalizeEnquiry,
  validateEnquiry,
  type EnquiryField,
  type EnquiryResponse,
  type FieldErrors,
} from "@/lib/enquiry";
import { roomTypeOptions } from "@/lib/rooms";
import { site, telHref } from "@/lib/site";
import { buttonClass } from "./ui";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

const fieldOrder: EnquiryField[] = ["fullName", "phone", "email", "roomType", "moveInDate", "message", "consent"];

const inputClass =
  "mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 transition focus:border-forest-600 focus:outline-none focus:ring-4 focus:ring-forest-600/15 aria-[invalid=true]:border-red-700";

/** Reads `?room=` so "Enquire" buttons on room cards preselect the room type. */
export function EnquiryFormWithRoomParam() {
  const room = useSearchParams().get("room");
  const initialRoom = roomTypeOptions.some((o) => o.value === room) ? room! : "";
  return <EnquiryForm key={initialRoom} initialRoom={initialRoom} />;
}

export function EnquiryForm({ initialRoom = "" }: { initialRoom?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const submitting = status.state === "submitting";

  // Time the form became usable, for the server's minimum-fill-time spam check.
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const focusFirstError = (errs: FieldErrors) => {
    const first = fieldOrder.find((f) => errs[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = new FormData(event.currentTarget);
    const raw = {
      fullName: form.get("fullName"),
      phone: form.get("phone"),
      email: form.get("email"),
      roomType: form.get("roomType"),
      moveInDate: form.get("moveInDate"),
      message: form.get("message"),
      consent: form.get("consent") === "yes",
    };
    const enquiry = normalizeEnquiry(raw);
    const clientErrors = validateEnquiry(enquiry);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      setStatus({ state: "idle" });
      focusFirstError(clientErrors);
      return;
    }

    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...enquiry, website: form.get("website") ?? "", startedAt: startedAt.current }),
      });
      const data = (await res.json().catch(() => null)) as EnquiryResponse | null;

      // Only a 2xx response with { ok: true } counts as success.
      if (res.ok && data?.ok === true) {
        setStatus({ state: "success" });
        formRef.current?.reset();
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }

      if (data && !data.ok && data.fieldErrors) {
        setErrors(data.fieldErrors);
        focusFirstError(data.fieldErrors);
      }
      setStatus({
        state: "error",
        message: data && !data.ok ? data.message : "Something went wrong while sending your enquiry.",
      });
    } catch {
      setStatus({
        state: "error",
        message: "We couldn't reach the server. Please check your connection and try again.",
      });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const errorCount = Object.keys(errors).length;

  if (status.state === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-3xl border border-forest-600/30 bg-forest-50 p-8 text-center"
      >
        <CheckCircle2 aria-hidden="true" className="mx-auto size-10 text-forest-700" />
        <h3 className="mt-4 text-2xl font-semibold text-forest-800">Thank you — your enquiry has been sent</h3>
        <p className="mt-3 text-muted">
          Management will get back to you. For anything urgent, please call{" "}
          <a href={telHref} className="font-semibold text-forest-700 underline underline-offset-4">
            {site.phone.display}
          </a>
          .
        </p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className={buttonClass("secondary", "mt-6")}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="form-note" className="space-y-5">
      <div ref={statusRef} tabIndex={-1} className="outline-none" aria-live="polite">
        {status.state === "error" && (
          <div role="alert" className="flex gap-3 rounded-2xl border border-red-700/30 bg-red-50 p-4 text-red-900">
            <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-semibold">Your enquiry was not sent.</p>
              <p className="mt-1">{status.message}</p>
              <a href={telHref} className="mt-2 inline-flex items-center gap-1.5 font-semibold underline underline-offset-4">
                <Phone aria-hidden="true" className="size-4" />
                Call {site.phone.display}
              </a>
            </div>
          </div>
        )}
        {status.state === "idle" && errorCount > 0 && (
          <p role="alert" className="rounded-2xl border border-red-700/30 bg-red-50 p-4 font-medium text-red-900">
            Please correct {errorCount === 1 ? "1 field" : `${errorCount} fields`} below.
          </p>
        )}
      </div>

      <p id="form-note" className="text-sm text-muted">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="fullName" label="Full name" required error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={inputClass}
          />
        </Field>

        <Field name="phone" label="Phone number" required error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LIMITS.phone}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClass}
          />
        </Field>

        <Field name="email" label="Email" hint="Optional" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
          />
        </Field>

        <Field name="roomType" label="Preferred room type" required error={errors.roomType}>
          <select
            id="roomType"
            name="roomType"
            required
            aria-required="true"
            defaultValue={initialRoom}
            aria-invalid={Boolean(errors.roomType)}
            aria-describedby={errors.roomType ? "roomType-error" : undefined}
            className={inputClass}
          >
            <option value="" disabled>
              Select a room type
            </option>
            {roomTypeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field name="moveInDate" label="Expected move-in date" hint="Optional" error={errors.moveInDate}>
          <input
            id="moveInDate"
            name="moveInDate"
            type="date"
            aria-invalid={Boolean(errors.moveInDate)}
            aria-describedby={errors.moveInDate ? "moveInDate-error" : undefined}
            className={inputClass}
          />
        </Field>
      </div>

      <Field name="message" label="Message" hint="Optional" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={LIMITS.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputClass}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            value="yes"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 size-5 shrink-0 rounded accent-forest-700"
          />
          <label htmlFor="consent" className="text-sm leading-relaxed text-ink">
            I agree that {site.name} may use the details above to contact me about this enquiry.{" "}
            <span aria-hidden="true" className="text-terracotta-700">
              *
            </span>
          </label>
        </div>
        {errors.consent && <FieldError id="consent-error">{errors.consent}</FieldError>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        aria-disabled={submitting}
        className={buttonClass("primary", "w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto")}
      >
        {submitting ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Send enquiry"
        )}
      </button>
      <p className="sr-only" aria-live="polite">
        {submitting ? "Sending your enquiry" : ""}
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  required,
  hint,
  error,
  children,
}: {
  name: EnquiryField;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="flex items-baseline gap-2 font-medium text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="text-terracotta-700">
            *
          </span>
        )}
        {hint && <span className="text-sm font-normal text-muted">({hint})</span>}
      </label>
      {children}
      {error && <FieldError id={`${name}-error`}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-red-800">
      <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
      {children}
    </p>
  );
}
