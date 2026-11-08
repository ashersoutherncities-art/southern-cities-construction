import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Mock Stripe before importing the route so the module-level constructor
// doesn't try to reach Stripe. We return a stub session shaped like the
// code under test expects. workflow in metadata drives the branch.
const mockRetrieve = vi.fn();

vi.mock('stripe', () => {
  return {
    default: class StripeStub {
      checkout = { sessions: { retrieve: mockRetrieve } };
      constructor() { /* ignore key */ }
    },
  };
});

// tryGetServiceClient returns null so the DB side-effects are skipped.
vi.mock('@/lib/supabase', () => ({
  tryGetServiceClient: () => null,
}));

// findOrderByStripeSession / updateOrder / recordOrderEvent should never be
// reached when supabase is null, but stub them defensively.
vi.mock('@/lib/orders', () => ({
  findOrderByStripeSession: async () => null,
  updateOrder: async () => undefined,
  recordOrderEvent: async () => undefined,
}));

import { POST } from '@/app/api/permit-oversight-checkout/complete/route';

function makeReq(body: unknown) {
  return { json: async () => body } as unknown as import('next/server').NextRequest;
}

async function parseJson(res: Response) {
  const text = await (res as unknown as { text: () => Promise<string> }).text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

beforeEach(() => {
  process.env.STRIPE_SECRET_KEY = 'sk_test_stub';
  process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000';
  process.env.INTERNAL_API_SECRET = 'test-internal-secret';
  mockRetrieve.mockReset();
});

afterEach(() => {
  mockRetrieve.mockReset();
});

describe('/api/permit-oversight-checkout/complete routing (finding #5)', () => {
  it('does NOT run permit onboarding for cart sessions (no workflow metadata)', async () => {
    mockRetrieve.mockResolvedValue({
      id: 'cs_test_cart',
      payment_status: 'paid',
      metadata: { cart_keys: 'deal-pack-bid-ready' },
      customer: null,
      payment_intent: null,
      amount_total: 59900,
    });
    const res = await POST(makeReq({ session_id: 'cs_test_cart' }));
    const body = await parseJson(res as unknown as Response);
    expect(res.status).toBe(200);
    expect(body.workflow).toBe('unspecified');
    // It should NOT have called the permit orders endpoint — if it had, the
    // fetch would surface here as a fetch error or 401 status in the body.
    expect(body.message).toMatch(/no permit oversight onboarding required/);
  });

  it('does NOT run permit onboarding for a workflow we did not set', async () => {
    mockRetrieve.mockResolvedValue({
      id: 'cs_test_other',
      payment_status: 'paid',
      metadata: { workflow: 'deal-desk' },
      customer: null,
      payment_intent: null,
      amount_total: 9900,
    });
    const res = await POST(makeReq({ session_id: 'cs_test_other' }));
    expect(res.status).toBe(200);
  });

  it('500s if INTERNAL_API_SECRET is missing and workflow is permit_oversight', async () => {
    delete (process.env as Record<string, string | undefined>).INTERNAL_API_SECRET;
    mockRetrieve.mockResolvedValue({
      id: 'cs_test_permit',
      payment_status: 'paid',
      metadata: { workflow: 'permit_oversight' },
      customer_details: {},
      payment_intent: null,
      amount_total: 100000,
    });
    const res = await POST(makeReq({ session_id: 'cs_test_permit' }));
    expect(res.status).toBe(500);
    const body = await parseJson(res as unknown as Response);
    expect(body.error).toMatch(/INTERNAL_API_SECRET/);
  });

  it('400s when checkout session is not paid', async () => {
    mockRetrieve.mockResolvedValue({
      id: 'cs_test_unpaid',
      payment_status: 'unpaid',
      metadata: { workflow: 'permit_oversight' },
    });
    const res = await POST(makeReq({ session_id: 'cs_test_unpaid' }));
    expect(res.status).toBe(400);
  });
});
