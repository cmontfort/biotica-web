// Lightweight in-memory sliding-window rate limiter for public API routes.
//
// NOTE (2026-06-08): this is per-instance memory. On Vercel serverless each
// cold instance starts with an empty map, so this is a DETERRENT against
// rapid-fire abuse from a single warm instance, not a hard global limit. The
// honeypot field on the form is the primary bot defense; this is secondary.
// For a hard global limit, upgrade to @upstash/ratelimit (Redis) or Vercel
// Firewall rate rules — tracked as the scale path.

type Hit = { count: number; resetAt: number };
const buckets = new Map<string, Hit>();

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const hit = buckets.get(key);

  if (!hit || now >= hit.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSec: 0 };
  }
  if (hit.count >= limit) {
    return { ok: false, retryAfterSec: Math.ceil((hit.resetAt - now) / 1000) };
  }
  hit.count += 1;
  return { ok: true, retryAfterSec: 0 };
}

// Best-effort client IP from common proxy headers (Vercel sets x-forwarded-for).
export function clientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}
