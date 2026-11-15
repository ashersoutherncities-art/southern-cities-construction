import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/cart-checkout/route';
import { getCartLineItems } from '@/lib/cart';

const stripe = vi.hoisted(() => ({ create: vi.fn() }));
const agreements=vi.hoisted(()=>({prepare:vi.fn()}));
vi.mock('@/lib/deal-pack/purchase-agreement',()=>({prepareDealPackPurchase:agreements.prepare}));
vi.mock('stripe', () => ({ default: class Stripe {
  checkout = { sessions: { create: stripe.create } };
} }));

beforeEach(() => {
  stripe.create.mockReset().mockResolvedValue({ url: 'https://checkout.stripe.com/test-session' });
  agreements.prepare.mockReset().mockResolvedValue({url:'https://hub.example.test/purchase/deal-pack/11111111-1111-4111-8111-111111111111'});
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
    expect(agreements.prepare).toHaveBeenCalledWith(expect.objectContaining({
      items: [expect.objectContaining({ quantity: 1,unitAmount:59900,key:'deal-pack-bid-ready' })],
    }));
    expect(stripe.create).not.toHaveBeenCalled();
  });

  it('keeps quantity and isolated return navigation in the Stripe request', async () => {
    await POST(request({ cart: [{ key: 'deal-pack-bid-ready', quantity: 2 }], projectAddress: 'TEST ONLY property', isolated: true, fromLp: 'realtor-deal-pack' }));
    expect(agreements.prepare).toHaveBeenCalledWith(expect.objectContaining({
      items: [expect.objectContaining({ quantity: 2, unitAmount:59900 })],
      cancelPath: expect.stringContaining('&lp=1&from=realtor-deal-pack'),
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
    expect((await POST(request({ cart: [{ key: 'renderings' }] }))).status).toBe(502);
  });
});

it.each([undefined, '', '   '])('permits a credit purchase before choosing a property: %s', async (projectAddress) => {
 expect((await POST(request({cart:[{key:'deal-pack-bid-ready'}],projectAddress}))).status).toBe(200);
 expect(stripe.create).not.toHaveBeenCalled();
});
