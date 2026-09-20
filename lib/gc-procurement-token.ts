import { createHmac, timingSafeEqual } from 'crypto';

// Stateless magic-link token for the client-facing /bid-comparison/[token]
// view — signs a bid_package_id rather than an email (there's no member
// concept here; the investor who owns the property gets a link, same
// pattern as lib/construction-department/token.ts but scoped differently).

const TTL_MS = 1000 * 60 * 60 * 24 * 90; // 90 days — a bid package's comparison window can run long

function linkSecret(): string {
  return process.env.CD_LINK_SECRET || process.env.INTERNAL_API_SECRET || '';
}

export function signBidComparisonToken(bidPackageId: string, expiresAt?: number): string {
  const exp = expiresAt ?? Date.now() + TTL_MS;
  const payload = `${bidPackageId}|${exp}`;
  const sig = createHmac('sha256', linkSecret()).update(payload).digest('base64url');
  return `${Buffer.from(payload).toString('base64url')}.${sig}`;
}

export function verifyBidComparisonToken(token: string): { bidPackageId: string } | null {
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

  const [bidPackageId, expStr] = payload.split('|');
  if (!bidPackageId || !expStr) return null;
  if (Date.now() > Number(expStr)) return null;
  return { bidPackageId };
}
