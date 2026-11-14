import { NextRequest } from 'next/server';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/stripe/webhook/route';
const s = vi.hoisted(() => ({
  construct: vi.fn(),
  processed: vi.fn(),
  create: vi.fn(),
  find: vi.fn(),
  update: vi.fn(),
  notify: vi.fn(),
  mirror: vi.fn(),
  provision: vi.fn(),
  claim: vi.fn(),
  finish: vi.fn(),
  release: vi.fn(),
  lines: vi.fn(),
  refundOrder: null as Record<string, unknown> | null,
  dbEnabled: true,
}));
vi.mock('next/headers', () => ({
  headers: async () => new Headers({ 'stripe-signature': 'synthetic' }),
}));
vi.mock('stripe', () => ({
  default: class {
    webhooks = { constructEvent: s.construct };
    checkout = { sessions: { listLineItems: s.lines } };
  },
}));
vi.mock('@/lib/orders', () => ({
  createOrder: s.create,
  findOrderByStripeSession: s.find,
  hasProcessedStripeEvent: s.processed,
  recordOrderEvent: vi.fn(),
  updateOrder: s.update,
}));
vi.mock('@/lib/supabase', () => ({
  tryGetServiceClient: () =>
    s.dbEnabled
      ? {
          from: () => ({
            select: () => ({
              eq: () => ({
                maybeSingle: async () => ({ data: s.refundOrder }),
              }),
            }),
          }),
        }
      : null,
}));
vi.mock('@/lib/stripe-delivery', () => ({
  claimStripeDelivery: s.claim,
  finishStripeDelivery: s.finish,
  releaseStripeDelivery: s.release,
}));
vi.mock('@/lib/ghl', () => ({
  sendOrderToGhl: s.notify,
  tagMembershipInGhl: vi.fn(),
}));
vi.mock('@/lib/hub-orders', () => ({
  isDealPackProduct: (key: string) => key === 'deal-pack-bid-ready',
  mirrorOrderToHub: s.mirror,
  mirrorRealtorReviewToHub: vi.fn(),
  provisionDealPackPortal: s.provision,
  reviewTypeForProduct: () => null,
}));
const order = {
  id: 91,
  buyer_email: 'buyer@example.test',
  buyer_name: 'Sandbox Buyer',
  product_name: 'Bid-Ready Deal Pack',
  amount_total_cents: 59900,
  stripe_session_id: 'synthetic-session',
  status: 'initiated',
  payment_status: null,
  paid_at: null,
};
const paid = {
  id: 'synthetic-event',
  type: 'checkout.session.completed',
  data: {
    object: {
      id: 'synthetic-session',
      payment_status: 'paid',
      amount_total: 59900,
      metadata: {
        cart_keys: 'deal-pack-bid-ready',
        project_address: 'TEST ONLY property',
      },
    },
  },
};
const request = () =>
  new NextRequest('https://site.example.test/api/stripe/webhook', {
    method: 'POST',
    body: '{}',
  });
beforeEach(() => {
  vi.stubEnv('STRIPE_SECRET_KEY', 'synthetic-key');
  vi.stubEnv('STRIPE_WEBHOOK_SECRET', 'synthetic-secret');
  for (const value of Object.values(s))
    if (vi.isMockFunction(value)) value.mockReset();
  s.dbEnabled = true;
  s.refundOrder = { ...order };
  s.construct.mockReturnValue(structuredClone(paid));
  s.processed.mockResolvedValue(false);
  s.claim.mockResolvedValue({ state: 'claimed', token: 'attempt' });
  s.find.mockResolvedValue({ ...order });
  s.create.mockResolvedValue({ ...order });
  s.update.mockImplementation(async (_id, patch) => ({ ...order, ...patch }));
  s.notify.mockResolvedValue({ ok: true, tag: 'purchased-fixture' });
  s.mirror.mockResolvedValue(undefined);
  s.provision.mockResolvedValue(undefined);
  s.lines.mockResolvedValue({
    data: [
      {
        amount_total: 59900,
        price: {
          product: { metadata: { product_key: 'deal-pack-bid-ready' } },
        },
      },
    ],
  });
  vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});
it('deduplicates a completed delivery without repeating fulfillment', async () => {
  s.claim.mockResolvedValue({ state: 'completed' });
  expect(await (await POST(request())).json()).toEqual({
    received: true,
    deduped: true,
  });
  expect(s.mirror).not.toHaveBeenCalled();
});
it('asks Stripe to retry while another worker owns the delivery', async () => {
  s.claim.mockResolvedValue({ state: 'busy' });
  expect((await POST(request())).status).toBe(503);
  expect(s.provision).not.toHaveBeenCalled();
});
it('does not acknowledge payment without order storage', async () => {
  s.dbEnabled = false;
  expect((await POST(request())).status).toBe(503);
  expect(s.notify).not.toHaveBeenCalled();
});
it('leaves a failed order insert retryable', async () => {
  s.find.mockResolvedValue(null);
  s.create.mockResolvedValue(null);
  expect((await POST(request())).status).toBe(500);
  expect(s.release).toHaveBeenCalled();
  expect(s.finish).not.toHaveBeenCalled();
});
it('leaves a failed paid-status write retryable', async () => {
  s.update.mockResolvedValue(null);
  expect((await POST(request())).status).toBe(500);
  expect(s.provision).not.toHaveBeenCalled();
  expect(s.finish).not.toHaveBeenCalled();
});
it('retries failed Hub provisioning instead of permanently acknowledging it', async () => {
  s.provision.mockRejectedValueOnce(Error('Hub unavailable'));
  expect((await POST(request())).status).toBe(500);
  expect(s.release).toHaveBeenCalled();
  expect(s.finish).not.toHaveBeenCalled();
  expect((await POST(request())).status).toBe(200);
  expect(s.provision).toHaveBeenCalledTimes(2);
  expect(s.finish).toHaveBeenCalledOnce();
});
it('does not complete a delivery if Hub mirroring fails', async () => {
  s.mirror.mockRejectedValue(Error('Hub unavailable'));
  expect((await POST(request())).status).toBe(500);
  expect(s.finish).not.toHaveBeenCalled();
});
it('uses paid Stripe line totals for quantities', async () => {
  s.lines.mockResolvedValue({
    data: [
      {
        amount_total: 119800,
        price: {
          product: { metadata: { product_key: 'deal-pack-bid-ready' } },
        },
      },
    ],
  });
  expect((await POST(request())).status).toBe(200);
  expect(s.provision).toHaveBeenCalledWith(
    expect.objectContaining({ amount_total_cents: 119800 })
  );
  expect(s.notify).toHaveBeenCalledWith(
    expect.objectContaining({ amount_paid: 1198 })
  );
});
it('fulfills a delayed successful payment', async () => {
  s.construct.mockReturnValue({
    ...structuredClone(paid),
    type: 'checkout.session.async_payment_succeeded',
  });
  expect((await POST(request())).status).toBe(200);
  expect(s.provision).toHaveBeenCalledOnce();
});
it('does not fulfill unpaid completion', async () => {
  const event = structuredClone(paid);
  event.data.object.payment_status = 'unpaid';
  s.construct.mockReturnValue(event);
  expect((await POST(request())).status).toBe(200);
  expect(s.provision).not.toHaveBeenCalled();
  expect(s.mirror).not.toHaveBeenCalled();
});
it('does not regress a paid order on a late unpaid completion', async () => {
  s.find.mockResolvedValue({
    ...order,
    status: 'paid',
    payment_status: 'paid',
  });
  const event = structuredClone(paid);
  event.data.object.payment_status = 'unpaid';
  s.construct.mockReturnValue(event);
  expect((await POST(request())).status).toBe(200);
  expect(s.update).not.toHaveBeenCalled();
});
it('synchronizes refund status to Hub', async () => {
  s.construct.mockReturnValue({
    id: 'refund-event',
    type: 'charge.refunded',
    data: {
      object: {
        id: 'synthetic-charge',
        payment_intent: 'synthetic-intent',
        amount: 59900,
        amount_refunded: 59900,
      },
    },
  });
  expect((await POST(request())).status).toBe(200);
  expect(s.mirror).toHaveBeenCalledWith(
    expect.objectContaining({
      status: 'refunded',
      stripe_session_id: 'synthetic-session',
    })
  );
});
it('does not regress a full refund on an older partial refund', async () => {
  s.refundOrder = { ...order, status: 'refunded' };
  s.construct.mockReturnValue({
    id: 'refund-event',
    type: 'charge.refunded',
    data: {
      object: {
        payment_intent: 'synthetic-intent',
        amount: 59900,
        amount_refunded: 100,
      },
    },
  });
  expect((await POST(request())).status).toBe(200);
  expect(s.update).not.toHaveBeenCalled();
});
it('does not reprovision a fully refunded purchase', async () => {
  s.find.mockResolvedValue({
    ...order,
    status: 'refunded',
    payment_status: 'paid',
  });
  expect((await POST(request())).status).toBe(200);
  expect(s.provision).not.toHaveBeenCalled();
});
