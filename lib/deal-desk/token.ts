import { createHmac, timingSafeEqual } from 'crypto';

// Stateless magic-link tokens: HMAC over `email|expiry`. No DB row needed; the
// member area and the snapshot API both verify the signature + expiry. Signed
// with DEAL_DESK_LINK_SECRET, falling back to INTERNAL_API_SECRET so no new
// secret is required to ship.

const TTL_MS = 1000 * 60 * 60 * 24 * 40; // 40 days — overlaps the monthly cycle so an auto-renewed link always arrives before the old one expires

function linkSecret(): string {
  return process.env.DEAL_DESK_LINK_SECRET || process.env.INTERNAL_API_SECRET || '';
}

export function signAccessToken(email: string, expiresAt?: number): string {
  const exp = expiresAt ?? Date.now() + TTL_MS;
  const payload = `${email.trim().toLowerCase()}|${exp}`;
  const sig = createHmac('sha256', linkSecret()).update(payload).digest('base64url');
  return `${Buffer.from(payload).toString('base64url')}.${sig}`;
}

export function verifyAccessToken(token: string): { email: string } | null {
  const secret = linkSecret();
  if (!secret) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [b64, sig] = parts;

  let payload: string;
  try {
    payload = Buffer.from(b64, 'base64url').toString('utf8');
  } catch {
    return null;
  }

  const expected = createHmac('sha256', secret).update(payload).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  const [email, expStr] = payload.split('|');
  if (!email || !expStr) return null;
  if (Date.now() > Number(expStr)) return null;
  return { email };
}
