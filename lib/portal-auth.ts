import { cookies } from 'next/headers';

/**
 * Portal session auth. The admin key is exchanged ONCE (via `?key=` →
 * middleware) for an httpOnly, Secure, SameSite=Strict cookie, then stripped
 * from the URL. After that, portal access rides on the cookie — never the
 * query string — so the secret no longer lands in browser history, referer
 * headers, or server/CDN access logs.
 *
 * The cookie value is the matched key itself, but it is never exposed to
 * client JS (httpOnly) and never appears in a URL. Comparison is constant-time.
 */
export const PORTAL_COOKIE = 'sc_portal';

/** Constant-time string comparison (runtime-agnostic; also used in middleware). */
export function ctEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

/**
 * True if the request's portal cookie authorizes ANY of the supplied expected
 * keys (lets a portal accept either its own key or a master key). Server
 * Components and Server Actions only.
 */
export function hasPortalAccess(...expectedKeys: Array<string | undefined | null>): boolean {
  const cookie = cookies().get(PORTAL_COOKIE)?.value;
  if (!cookie) return false;
  return expectedKeys.some((k) => !!k && ctEqual(cookie, k));
}
