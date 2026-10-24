import { Resend } from "resend";
import { getEmailConfig } from "@/lib/email-config";
import {
  LIMITS,
  normalizeEnquiry,
  roomTypeLabel,
  validateEnquiry,
  type EnquiryInput,
  type EnquiryResponse,
} from "@/lib/enquiry";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

const json = (body: EnquiryResponse, status: number, headers?: HeadersInit) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

const invalid = (message = "We couldn't read that request. Please refresh the page and try again.") =>
  json({ ok: false, code: "INVALID_REQUEST", message }, 400);

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

// Reject cross-site form posts: the Origin host must match the request host.
function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function buildEmailText(e: EnquiryInput) {
  return [
    `New enquiry from the ${site.name} website`,
    "",
    `Name: ${e.fullName}`,
    `Phone: ${e.phone}`,
    `Email: ${e.email || "Not provided"}`,
    `Preferred room type: ${roomTypeLabel(e.roomType)}`,
    `Expected move-in date: ${e.moveInDate || "Not provided"}`,
    "",
    "Message:",
    e.message || "(none)",
    "",
    "The enquirer consented to be contacted about this enquiry.",
  ].join("\n");
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return invalid();
  }
  if (!isSameOrigin(request)) {
    return invalid();
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > LIMITS.body) {
    return json({ ok: false, code: "INVALID_REQUEST", message: "That enquiry is too large." }, 413);
  }

  const limit = rateLimit(clientKey(request));
  if (!limit.allowed) {
    return json(
      {
        ok: false,
        code: "RATE_LIMITED",
        message: "Too many enquiries from this connection. Please wait a few minutes or call us instead.",
      },
      429,
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  // Read the body ourselves so the size limit also applies without a Content-Length header.
  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).length > LIMITS.body) {
    return json({ ok: false, code: "INVALID_REQUEST", message: "That enquiry is too large." }, 413);
  }

  let raw: unknown;
  try {
    raw = JSON.parse(rawBody);
  } catch {
    return invalid();
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return invalid();
  }
  const body = raw as Record<string, unknown>;

  // Spam checks: hidden honeypot field must stay empty, and the form must not be
  // submitted implausibly fast. Bots get a generic error, never a fake success.
  const startedAt = Number(body.startedAt);
  if (
    (typeof body.website === "string" && body.website.length > 0) ||
    !Number.isFinite(startedAt) ||
    Date.now() - startedAt < LIMITS.minFillMs
  ) {
    return invalid("Your enquiry could not be sent. Please try again, or call us directly.");
  }

  const enquiry = normalizeEnquiry(body);
  const fieldErrors = validateEnquiry(enquiry);
  if (Object.keys(fieldErrors).length > 0) {
    return json(
      { ok: false, code: "VALIDATION_FAILED", message: "Please correct the highlighted fields.", fieldErrors },
      422,
    );
  }

  const config = getEmailConfig();
  if (!config) {
    return json(
      {
        ok: false,
        code: "EMAIL_NOT_CONFIGURED",
        message: "Online enquiries aren't switched on yet. Please call or email us directly.",
      },
      503,
    );
  }

  try {
    const resend = new Resend(config.apiKey);
    const { data, error } = await resend.emails.send({
      from: config.from,
      to: config.to,
      subject: `Website enquiry: ${roomTypeLabel(enquiry.roomType)} — ${enquiry.fullName}`,
      text: buildEmailText(enquiry),
      ...(enquiry.email ? { replyTo: enquiry.email } : {}),
    });

    if (error || !data?.id) {
      // Log only the provider error name — never the enquirer's details.
      console.error("[enquiry] Resend delivery failed:", error?.name ?? "no message id returned");
      return json(
        {
          ok: false,
          code: "DELIVERY_FAILED",
          message: "We couldn't send your enquiry right now. Please try again shortly, or call us directly.",
        },
        502,
      );
    }
  } catch (err) {
    console.error("[enquiry] Resend request threw:", err instanceof Error ? err.name : "unknown error");
    return json(
      {
        ok: false,
        code: "DELIVERY_FAILED",
        message: "We couldn't send your enquiry right now. Please try again shortly, or call us directly.",
      },
      502,
    );
  }

  return json({ ok: true }, 200);
}
