import { timingSafeEqual } from 'crypto';

/**
 * Constant-time comparison of two secret strings. Avoids leaking how many
 * leading characters matched via response-timing. Returns false if either
 * value is empty or the lengths differ.
 *
 * NOTE: passing the admin key via the URL query string is still a weakness
 * (it lands in logs / referer headers). The recommended follow-up is to move
 * the portal behind a signed httpOnly cookie or Supabase Auth session. This
 * helper hardens the comparison itself in the interim.
 */
export function safeKeyEqual(a: string | undefined | null, b: string | undefined | null): boolean {
  if (!a || !b) return false;
  const ba = Buffer.from(a, 'utf8');
  const bb = Buffer.from(b, 'utf8');
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}
