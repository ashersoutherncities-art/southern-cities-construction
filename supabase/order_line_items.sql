-- Authoritative per-line-item record for every cart/checkout purchase.
--
-- Rationale: `orders` stores a single `product_key` + `product_name` for the
-- whole purchase, and `cart_keys` in Stripe metadata collapses quantities
-- (3x Deal Pack and 1x Deal Pack both show as `deal-pack-bid-ready`). This
-- costs us: GHL only fired once per key, portal provisioning ran once, and
-- quantity was unrecoverable from the order record alone.
--
-- Every successful cart/pro-reorder/single-item purchase now writes one row
-- per line item here (product_key, quantity, authoritative unit price in
-- cents, line total in cents). Fulfillment loops over these rows so per-unit
-- side effects run the correct number of times.
--
-- Deployment: standalone, no destructive change. Run before the webhook code
-- that writes to this table. Legacy orders with no rows here keep working —
-- fulfillment falls back to the old single-key behavior for them.

CREATE TABLE IF NOT EXISTS public.order_line_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_key TEXT NOT NULL,
  product_name TEXT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_amount_cents INTEGER NOT NULL CHECK (unit_amount_cents >= 0),
  total_amount_cents INTEGER NOT NULL CHECK (total_amount_cents >= 0),
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS order_line_items_order_idx
  ON public.order_line_items (order_id);

CREATE INDEX IF NOT EXISTS order_line_items_product_idx
  ON public.order_line_items (product_key);

ALTER TABLE public.order_line_items ENABLE ROW LEVEL SECURITY;
