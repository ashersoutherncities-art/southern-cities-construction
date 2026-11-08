import type { SupabaseClient } from '@supabase/supabase-js';
import { CART_PRODUCTS, parseCartSummary } from '@/lib/cart';

export interface OrderLineItemInput {
  product_key: string;
  product_name: string | null;
  quantity: number;
  unit_amount_cents: number;
  total_amount_cents: number;
  metadata?: Record<string, unknown>;
}

export interface OrderLineItemRow extends OrderLineItemInput {
  id: number;
  order_id: number;
  created_at: string;
}

// Persist per-line-item rows for a completed order. Idempotent-ish: if we
// already have rows for this order, don't re-insert. (We never update them
// in place either; line items are immutable once written.)
export async function upsertOrderLineItems(
  client: SupabaseClient,
  orderId: number,
  items: OrderLineItemInput[]
): Promise<OrderLineItemRow[]> {
  if (!orderId || items.length === 0) return [];
  const { data: existing } = await client
    .from('order_line_items')
    .select('id, product_key, quantity, unit_amount_cents, total_amount_cents, product_name, metadata, order_id, created_at')
    .eq('order_id', orderId);
  if (existing && existing.length > 0) {
    return existing as OrderLineItemRow[];
  }
  const rows = items.map((i) => ({ ...i, order_id: orderId }));
  const { data, error } = await client
    .from('order_line_items')
    .insert(rows)
    .select('id, order_id, product_key, product_name, quantity, unit_amount_cents, total_amount_cents, metadata, created_at');
  if (error) {
    console.error('upsertOrderLineItems error:', error);
    return [];
  }
  return (data ?? []) as OrderLineItemRow[];
}

export async function listOrderLineItems(
  client: SupabaseClient,
  orderId: number
): Promise<OrderLineItemRow[]> {
  const { data } = await client
    .from('order_line_items')
    .select('id, order_id, product_key, product_name, quantity, unit_amount_cents, total_amount_cents, metadata, created_at')
    .eq('order_id', orderId);
  return (data ?? []) as OrderLineItemRow[];
}

// Derive authoritative line items from the two canonical sources of truth on
// a Stripe session's metadata: `cart_summary` (key:amount:quantity[,...]) when
// present (set by /api/cart-checkout), otherwise fall back to splitting
// `cart_keys` 1x each. Both read server-side CART_PRODUCTS for the unit price
// — the Stripe amount is used as a sanity check but the server catalog is
// authoritative.
export function deriveLineItemsFromSessionMetadata(
  metadata: Record<string, string | null | undefined> | null | undefined
): OrderLineItemInput[] {
  if (!metadata) return [];
  const summary = parseCartSummary(metadata.cart_summary ?? '');
  if (summary.length > 0) {
    return summary.map((s) => {
      const product = CART_PRODUCTS[s.key];
      const unit = product?.price ?? 0;
      const qty = Math.max(1, Math.floor(s.quantity || 1));
      return {
        product_key: s.key,
        product_name: product?.name ?? null,
        quantity: qty,
        unit_amount_cents: unit,
        total_amount_cents: unit * qty,
      };
    });
  }
  const cartKeys = (metadata.cart_keys || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (cartKeys.length > 0) {
    return cartKeys.map((key) => {
      const product = CART_PRODUCTS[key];
      const unit = product?.price ?? 0;
      return {
        product_key: key,
        product_name: product?.name ?? null,
        quantity: 1,
        unit_amount_cents: unit,
        total_amount_cents: unit,
      };
    });
  }
  const single = metadata.item;
  if (single) {
    const product = CART_PRODUCTS[single];
    const unit = product?.price ?? 0;
    return [
      {
        product_key: single,
        product_name: product?.name ?? null,
        quantity: 1,
        unit_amount_cents: unit,
        total_amount_cents: unit,
      },
    ];
  }
  return [];
}
