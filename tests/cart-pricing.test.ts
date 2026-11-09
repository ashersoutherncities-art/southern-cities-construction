import { describe, it, expect } from 'vitest';
import { getCartLineItems, parseCartSummary, CART_PRODUCTS } from '@/lib/cart';

// Pick a known product key for assertions. The specific key doesn't matter;
// we're asserting the server authoritatively prices it from the catalog.
const SAMPLE_KEY = Object.keys(CART_PRODUCTS)[0];
const SAMPLE_PRODUCT = CART_PRODUCTS[SAMPLE_KEY];

describe('cart pricing is server-authoritative (finding #3)', () => {
  it('ignores a client-supplied amount and prices from the catalog', () => {
    // Attacker submits a 1¢ amount for a paid product; the server MUST use
    // the catalog price, never the client amount.
    const tampered = [{ key: SAMPLE_KEY, amount: 1, quantity: 1 }];
    const [line] = getCartLineItems(tampered);
    expect(line.amount).toBe(SAMPLE_PRODUCT.price);
    expect(line.product.price).toBe(SAMPLE_PRODUCT.price);
  });

  it('respects quantity when computing the authoritative line amount', () => {
    const line = getCartLineItems([{ key: SAMPLE_KEY, amount: 1, quantity: 4 }])[0];
    expect(line.quantity).toBe(4);
    expect(line.amount).toBe(SAMPLE_PRODUCT.price * 4);
  });

  it('drops line items for unknown product keys', () => {
    const items = getCartLineItems([
      { key: 'definitely-not-a-product', amount: 1, quantity: 1 },
      { key: SAMPLE_KEY, amount: 1, quantity: 1 },
    ]);
    expect(items).toHaveLength(1);
    expect(items[0].key).toBe(SAMPLE_KEY);
  });
});

describe('parseCartSummary (quantity carrier)', () => {
  it('parses key:amount:quantity tuples', () => {
    const parsed = parseCartSummary(`${SAMPLE_KEY}:${SAMPLE_PRODUCT.price}:3`);
    expect(parsed).toEqual([{ key: SAMPLE_KEY, amountCents: SAMPLE_PRODUCT.price, quantity: 3 }]);
  });

  it('drops tuples with unknown product keys', () => {
    expect(parseCartSummary(`not-a-product:100:1`)).toEqual([]);
  });

  it('drops tuples with non-positive quantities or bad numbers', () => {
    expect(parseCartSummary(`${SAMPLE_KEY}:100:0`)).toEqual([]);
    expect(parseCartSummary(`${SAMPLE_KEY}:100:-1`)).toEqual([]);
    expect(parseCartSummary(`${SAMPLE_KEY}:abc:1`)).toEqual([]);
  });

  it('returns [] for empty or missing input', () => {
    expect(parseCartSummary('')).toEqual([]);
    expect(parseCartSummary(null)).toEqual([]);
    expect(parseCartSummary(undefined)).toEqual([]);
  });

  it('supports multiple items', () => {
    const keys = Object.keys(CART_PRODUCTS).slice(0, 2);
    if (keys.length < 2) return;
    const raw = keys.map((k, i) => `${k}:${CART_PRODUCTS[k].price}:${i + 1}`).join(',');
    const parsed = parseCartSummary(raw);
    expect(parsed).toHaveLength(2);
    expect(parsed[0].quantity).toBe(1);
    expect(parsed[1].quantity).toBe(2);
  });
});
