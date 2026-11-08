import { describe, it, expect, beforeEach } from 'vitest';
import { POST } from '@/app/api/deal-pack/pro-reorder/route';
import { signAccessToken } from '@/lib/construction-department/token';

// Minimal NextRequest shim — the route only reads req.json().
function makeReq(body: unknown) {
  return {
    json: async () => body,
  } as unknown as import('next/server').NextRequest;
}

async function parseJson(res: Response) {
  const text = await (res as unknown as { text: () => Promise<string> }).text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

describe('/api/deal-pack/pro-reorder identity gating (finding #6)', () => {
  beforeEach(() => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_stub';
    process.env.CD_LINK_SECRET = 'test-link-secret';
  });

  it('rejects with 401 when no token is supplied', async () => {
    const res = await POST(makeReq({ email: 'member@example.com', quantity: 1 }));
    expect(res.status).toBe(401);
    const body = await parseJson(res as unknown as Response);
    expect(body.error).toBe('unverified_identity');
  });

  it('rejects with 401 on token that does not match the submitted email', async () => {
    const token = signAccessToken('real-member@example.com');
    const res = await POST(makeReq({ email: 'attacker@example.com', quantity: 1, token }));
    expect(res.status).toBe(401);
    const body = await parseJson(res as unknown as Response);
    expect(body.error).toBe('unverified_identity');
  });

  it('passes identity check when token matches, then fails at Stripe lookup (no real Stripe)', async () => {
    const token = signAccessToken('member@example.com');
    const res = await POST(makeReq({ email: 'member@example.com', quantity: 1, token }));
    // Proves we moved past the identity gate (no 401). Beyond this point the
    // route needs a live Stripe to confirm membership; without one it returns
    // 502 or 503 — both indicate the identity check passed.
    expect([502, 503]).toContain(res.status);
  });
});
