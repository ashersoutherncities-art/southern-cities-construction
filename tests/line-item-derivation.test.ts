import { describe, it, expect } from 'vitest';
import { deriveLineItemsFromSessionMetadata } from '@/lib/order-line-items';
import { CART_PRODUCTS } from '@/lib/cart';

const KEY = Object.keys(CART_PRODUCTS)[0];
const PRODUCT = CART_PRODUCTS[KEY];

describe('deriveLineItemsFromSessionMetadata (finding #8: preserve quantity)', () => {
  it('reads quantity from cart_summary when present', () => {
    const items = deriveLineItemsFromSessionMetadata({
      cart_summary: `${KEY}:${PRODUCT.price}:3`,
      cart_keys: KEY,
    });
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(3);
    expect(items[0].unit_amount_cents).toBe(PRODUCT.price);
    expect(items[0].total_amount_cents).toBe(PRODUCT.price * 3);
  });

  it('falls back to cart_keys (quantity 1 each) when cart_summary missing', () => {
    const items = deriveLineItemsFromSessionMetadata({ cart_keys: `${KEY},${KEY}` });
    expect(items).toHaveLength(2);
    expect(items.every((i) => i.quantity === 1)).toBe(true);
  });

  it('falls back to legacy `item` metadata for single-item purchases', () => {
    const items = deriveLineItemsFromSessionMetadata({ item: KEY });
    expect(items).toHaveLength(1);
    expect(items[0].product_key).toBe(KEY);
    expect(items[0].quantity).toBe(1);
  });

  it('returns [] for null/empty metadata', () => {
    expect(deriveLineItemsFromSessionMetadata(null)).toEqual([]);
    expect(deriveLineItemsFromSessionMetadata({})).toEqual([]);
  });

  it('server authoritatively prices each item regardless of amount in summary', () => {
    const items = deriveLineItemsFromSessionMetadata({
      cart_summary: `${KEY}:1:2`, // attacker tries 1¢
    });
    // Unit amount comes from CART_PRODUCTS, not the metadata amount.
    expect(items[0].unit_amount_cents).toBe(PRODUCT.price);
    expect(items[0].total_amount_cents).toBe(PRODUCT.price * 2);
  });
});
