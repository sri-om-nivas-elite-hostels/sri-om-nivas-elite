/**
 * Best-effort, per-instance rate limiter (fixed window).
 *
 * IMPORTANT: this lives in process memory. On Vercel each serverless instance
 * has its own memory and instances are recycled, so this is NOT a reliable
 * production-wide limit — it only slows down bursts hitting a warm instance.
 * For a real limit, add a Vercel Firewall rate-limit rule on /api/enquiry or a
 * shared store (e.g. Upstash Redis). See README.md → "Rate limiting".
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_TRACKED_KEYS = 5000;

const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, now = Date.now()) {
  const entry = hits.get(key);

  if (!entry || entry.resetAt <= now) {
    if (hits.size >= MAX_TRACKED_KEYS) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
      if (hits.size >= MAX_TRACKED_KEYS) hits.clear();
    }
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    return { allowed: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}
