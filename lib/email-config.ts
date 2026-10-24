import "server-only";
import { isValidEmail } from "./enquiry";

/**
 * Reads Resend configuration from server-side environment variables.
 * Email delivery stays disabled (returns null) until every value is present
 * and well-formed. Never import this from client components.
 */
export type EmailConfig = { apiKey: string; to: string; from: string };

// Accepts "sender@domain" or "Display Name <sender@domain>".
const senderAddress = (from: string) => from.match(/<([^>]+)>\s*$/)?.[1] ?? from;

export function getEmailConfig(): EmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !apiKey.startsWith("re_")) return null;
  if (!to || !isValidEmail(to)) return null;
  if (!from || !isValidEmail(senderAddress(from))) return null;

  return { apiKey, to, from };
}
