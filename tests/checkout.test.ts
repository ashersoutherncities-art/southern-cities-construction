import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/cart-checkout/route';
import { getCartLineItems } from '@/lib/cart';

const stripe = vi.hoisted(() => ({ create: vi.fn() }));
vi.mock('stripe', () => ({ default: class Stripe {
  checkout = { sessions: { create: stripe.create } };
} }));

beforeEach(() => {
  stripe.create.mockReset().mockResolvedValue({ url: 'https://checkout.stripe.com/test-session' });
  vi.stubEnv('STRIPE_SECRET_KEY', 'synthetic-checkout-test-key');
  vi.stubEnv('NEXT_PUBLIC_BASE_URL', 'https://site.example.test');
});
afterEach(() => vi.unstubAllEnvs());

function request(body: unknown) {
  return new NextRequest('https://site.example.test/api/cart-checkout', { method: 'POST', body: JSON.stringify(body) });
}

describe('checkout boundary', () => {
  it('charges the server catalog price even when the browser supplies a lower amount', async () => {
    const result = await POST(request({ cart: [{ key: 'deal-pack-bid-ready', amount: 1 }], projectAddress: 'TEST ONLY property' }));
    expect(result.status).toBe(200);
    expect(stripe.create).toHaveBeenCalledWith(expect.objectContaining({
      line_items: [expect.objectContaining({ quantity: 1, price_data: expect.objectContaining({ unit_amount: 59900 }) })],
    }));
  });

  it('keeps quantity and isolated return navigation in the Stripe request', async () => {
    await POST(request({ cart: [{ key: 'deal-pack-bid-ready', quantity: 2 }], projectAddress: 'TEST ONLY property', isolated: true, fromLp: 'realtor-deal-pack' }));
    expect(stripe.create).toHaveBeenCalledWith(expect.objectContaining({
      line_items: [expect.objectContaining({ quantity: 2, price_data: expect.objectContaining({ unit_amount: 59900 }) })],
      cancel_url: expect.stringContaining('&lp=1&from=realtor-deal-pack'),
    }));
  });

  it.each([null, { cart: [null] }, { cart: [{ key: 'deal-pack-bid-ready', quantity: 0.5 }] }, { cart: [{ key: 'deal-pack-bid-ready', quantity: 1e100 }] }])('rejects malformed input without creating a payment session: %j', async (body) => {
    expect((await POST(request(body))).status).toBe(400);
    expect(stripe.create).not.toHaveBeenCalled();
  });

  it('rejects an unknown product without charging', async () => {
    expect((await POST(request({ cart: [{ key: 'unknown-service' }] }))).status).toBe(400);
    expect(stripe.create).not.toHaveBeenCalled();
  });

  it('does not accept object prototype names as catalog products', () => {
    expect(getCartLineItems([{ key: '__proto__' }, { key: 'constructor' }])).toEqual([]);
  });

  it('returns an error when Stripe does not provide a checkout destination', async () => {
    stripe.create.mockResolvedValue({});
    expect((await POST(request({ cart: [{ key: 'deal-pack-bid-ready' }], projectAddress: 'TEST ONLY property' }))).status).toBe(502);
  });
});

it.each([undefined, '', '   '])('requires a Deal Pack address on the server: %s', async (projectAddress) => {
 expect((await POST(request({cart:[{key:'deal-pack-bid-ready'}],projectAddress}))).status).toBe(400);
 expect(stripe.create).not.toHaveBeenCalled();
});
