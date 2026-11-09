import { describe, it, expect, beforeEach } from 'vitest';
import { POST } from '@/app/api/permit-oversight-orders/route';

function makeReq(opts: { headers?: Record<string, string>; body?: unknown } = {}) {
  const headers = new Map<string, string>(Object.entries(opts.headers ?? {}));
  return {
    headers: {
      get: (k: string) => headers.get(k.toLowerCase()) ?? headers.get(k) ?? null,
    },
    json: async () => opts.body ?? {},
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

describe('POST /api/permit-oversight-orders auth (finding #2)', () => {
  beforeEach(() => {
    process.env.INTERNAL_API_SECRET = 'test-internal-secret';
  });

  it('401s unauthenticated POST', async () => {
    const res = await POST(makeReq({ body: { buyer_email: 'x@example.com' } }));
    expect(res.status).toBe(401);
  });

  it('401s POST with wrong x-internal-secret', async () => {
    const res = await POST(
      makeReq({
        headers: { 'x-internal-secret': 'nope' },
        body: { buyer_email: 'x@example.com' },
      })
    );
    expect(res.status).toBe(401);
  });

  it('fail-closes if INTERNAL_API_SECRET is unset (401 even with any header)', async () => {
    delete (process.env as Record<string, string | undefined>).INTERNAL_API_SECRET;
    const res = await POST(
      makeReq({
        headers: { 'x-internal-secret': 'anything' },
        body: { buyer_email: 'x@example.com' },
      })
    );
    expect(res.status).toBe(401);
  });

  it('passes the auth gate with a matching header (then fails later due to missing Supabase in tests)', async () => {
    process.env.INTERNAL_API_SECRET = 'test-internal-secret';
    const res = await POST(
      makeReq({
        headers: { 'x-internal-secret': 'test-internal-secret' },
        // Minimal body — downstream Supabase call fails in tests, which is
        // fine. The status proves we got past the auth gate (not 401).
        body: {
          buyer_name: 'A',
          buyer_email: 'a@example.com',
          project_address: '123 Test',
          project_manager_role: 'Owner',
        },
      })
    );
    expect(res.status).not.toBe(401);
  });
});
