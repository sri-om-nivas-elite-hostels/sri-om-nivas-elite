/**
 * Enquiry form validation, shared by the client form and the API route so
 * both apply the same rules. The server always re-validates.
 */
import { roomTypeOptions } from "./rooms";

export const LIMITS = {
  name: 100,
  phone: 20,
  email: 254,
  message: 1000,
  /** Max accepted request body, in bytes. */
  body: 8 * 1024,
  /** Submissions faster than this after the form renders are treated as bots. */
  minFillMs: 3000,
} as const;

export type EnquiryInput = {
  fullName: string;
  phone: string;
  email: string;
  roomType: string;
  moveInDate: string;
  message: string;
  consent: boolean;
};

export type EnquiryField = keyof EnquiryInput;
export type FieldErrors = Partial<Record<EnquiryField, string>>;

const validRoomTypes = new Set<string>(roomTypeOptions.map((o) => o.value));

// Strip control characters (keeps newlines/tabs for the message) and trim.
const clean = (value: unknown, multiline = false): string => {
  if (typeof value !== "string") return "";
  const pattern = multiline
    ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
    : /[\u0000-\u001F\u007F]/g;
  return value.replace(pattern, "").trim();
};

export function normalizeEnquiry(raw: Record<string, unknown>): EnquiryInput {
  return {
    fullName: clean(raw.fullName).replace(/\s+/g, " "),
    phone: clean(raw.phone),
    email: clean(raw.email).toLowerCase(),
    roomType: clean(raw.roomType),
    moveInDate: clean(raw.moveInDate),
    message: clean(raw.message, true),
    consent: raw.consent === true,
  };
}

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function isValidEmail(value: string) {
  return value.length <= LIMITS.email && EMAIL_RE.test(value);
}

export function validateEnquiry(input: EnquiryInput): FieldErrors {
  const errors: FieldErrors = {};

  if (input.fullName.length < 2) {
    errors.fullName = "Please enter your full name.";
  } else if (input.fullName.length > LIMITS.name) {
    errors.fullName = `Name must be ${LIMITS.name} characters or fewer.`;
  }

  const digits = input.phone.replace(/\D/g, "");
  if (!input.phone) {
    errors.phone = "Please enter a phone number we can call you on.";
  } else if (
    input.phone.length > LIMITS.phone ||
    !/^\+?[\d\s-]+$/.test(input.phone) ||
    digits.length < 10 ||
    digits.length > 13
  ) {
    errors.phone = "Please enter a valid phone number (10 digits, optionally with country code).";
  }

  if (input.email && !isValidEmail(input.email)) {
    errors.email = "Please enter a valid email address, or leave this blank.";
  }

  if (!input.roomType) {
    errors.roomType = "Please choose a preferred room type.";
  } else if (!validRoomTypes.has(input.roomType)) {
    errors.roomType = "Please choose a room type from the list.";
  }

  if (input.moveInDate) {
    const parsed = new Date(`${input.moveInDate}T00:00:00Z`);
    if (
      !DATE_RE.test(input.moveInDate) ||
      Number.isNaN(parsed.getTime()) ||
      parsed.toISOString().slice(0, 10) !== input.moveInDate
    ) {
      errors.moveInDate = "Please enter a valid date.";
    }
  }

  if (input.message.length > LIMITS.message) {
    errors.message = `Message must be ${LIMITS.message} characters or fewer.`;
  }

  if (!input.consent) {
    errors.consent = "Please confirm you agree to be contacted about your enquiry.";
  }

  return errors;
}

export const roomTypeLabel = (value: string) =>
  roomTypeOptions.find((o) => o.value === value)?.label ?? value;

/** Shape of every response from POST /api/enquiry. */
export type EnquiryResponse =
  | { ok: true }
  | {
      ok: false;
      code:
        | "INVALID_REQUEST"
        | "VALIDATION_FAILED"
        | "RATE_LIMITED"
        | "EMAIL_NOT_CONFIGURED"
        | "DELIVERY_FAILED";
      message: string;
      fieldErrors?: FieldErrors;
    };
