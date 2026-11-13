import { NextRequest } from 'next/server';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/stripe/webhook/route';

const services = vi.hoisted(() => ({ signature: null as string | null, construct: vi.fn(), processed: vi.fn(), create: vi.fn(), notify: vi.fn() }));
vi.mock('next/headers', () => ({ headers: async () => new Headers(services.signature ? { 'stripe-signature': services.signature } : {}) }));
vi.mock('stripe', () => ({ default: class Stripe { webhooks = { constructEvent: services.construct }; } }));
vi.mock('@/lib/orders', () => ({ createOrder: services.create, findOrderByStripeSession: vi.fn(), hasProcessedStripeEvent: services.processed, recordOrderEvent: vi.fn(), updateOrder: vi.fn() }));
vi.mock('@/lib/supabase', () => ({ tryGetServiceClient: () => ({}) }));
vi.mock('@/lib/ghl', () => ({ sendOrderToGhl: services.notify, tagMembershipInGhl: vi.fn() }));
vi.mock('@/lib/hub-orders', () => ({ isDealPackProduct: vi.fn(), mirrorOrderToHub: vi.fn(), mirrorRealtorReviewToHub: vi.fn(), provisionDealPackPortal: vi.fn(), reviewTypeForProduct: vi.fn() }));

beforeEach(() => {
  vi.stubEnv('STRIPE_SECRET_KEY', 'synthetic-stripe-test-key');
  vi.stubEnv('STRIPE_WEBHOOK_SECRET', 'synthetic-webhook-test-key');
  services.signature = null;
  services.construct.mockReset().mockReturnValue({ id: 'test-event', type: 'checkout.session.completed', data: { object: { id: 'test-session' } } });
  services.processed.mockReset().mockResolvedValue(true);
  services.create.mockReset();
  services.notify.mockReset();
});
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });
const request = () => new NextRequest('https://site.example.test/api/stripe/webhook', { method: 'POST', body: '{}' });

it('rejects a missing signature after reading async request headers', async () => {
  expect((await POST(request())).status).toBe(400);
  expect(services.construct).not.toHaveBeenCalled();
});

it('rejects an invalid signature before fulfillment', async () => {
  services.signature = 'synthetic-invalid-signature';
  services.construct.mockImplementation(() => { throw new Error('Invalid test signature'); });
  vi.spyOn(console, 'error').mockImplementation(() => {});
  expect((await POST(request())).status).toBe(400);
  expect(services.processed).not.toHaveBeenCalled();
  expect(services.create).not.toHaveBeenCalled();
});

it('acknowledges a previously processed event without another order or customer message', async () => {
  services.signature = 'synthetic-valid-signature';
  const result = await POST(request());
  expect(await result.json()).toEqual({ received: true, deduped: true });
  expect(services.processed).toHaveBeenCalledWith('test-event', expect.anything());
  expect(services.create).not.toHaveBeenCalled();
  expect(services.notify).not.toHaveBeenCalled();
});
