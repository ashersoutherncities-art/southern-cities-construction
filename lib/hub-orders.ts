import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Mirrors a completed order into the Client Hub's `orders` table (a SEPARATE
// Supabase project — clients.southerncitiesconstruction.com) so the hub's
// Orders tab shows real purchases. Required writes throw on failure so Stripe
// can retry; the unique stripe_session_id absorbs concurrent inserts.

type MirrorInput = {
  buyer_email: string;
  product_name: string;
  amount_total_cents: number | null;
  stripe_session_id: string;
  order_id: number;
  status?: string;
};

let hubClient: SupabaseClient | null = null;

function getHubClient(): SupabaseClient | null {
  const url = process.env.HUB_SUPABASE_URL;
  const key = process.env.HUB_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (!hubClient)
    hubClient = createClient(url, key, { auth: { persistSession: false } });
  return hubClient;
}

// Realtor "review" products (cart keys) → the hub's realtor_reviews.review_type.
// When a realtor buys one of these, we log an inspection review in their hub.
const REVIEW_PRODUCT_MAP: Record<string, string> = {
  // 'realtor-quick-read' was retired 2026-08-04, folded into
  // 'realtor-inspection-review' (lib/cart.ts:324-327) — this key was never
  // updated to match, so $299 purchases silently stopped logging a review row.
  'realtor-inspection-review': 'quick_read',
  'realtor-gc-budget': 'gc_budget',
  'realtor-inspected-gc-read': 'full_report',
  'gc-grade-property-inspection': 'full_report',
  'gc-grade-property-inspection-rush': 'full_report',
  'pre-listing-construction-valuation': 'pre_listing_audit',
};

export function reviewTypeForProduct(productKey: string): string | null {
  return REVIEW_PRODUCT_MAP[productKey] ?? null;
}

// Log a realtor inspection review in the hub when a review product is purchased.
// Idempotent per (stripe_session_id, review_type); non-fatal.
export async function mirrorRealtorReviewToHub(input: {
  buyer_email: string;
  buyer_name?: string;
  review_type: string;
  property_address?: string | null;
  stripe_session_id: string;
}): Promise<void> {
  const client = getHubClient();
  const email = input.buyer_email?.trim().toLowerCase();
  if (!client || !email) return;
  try {
    const { data: existing } = await client
      .from('realtor_reviews')
      .select('id')
      .eq('stripe_session_id', input.stripe_session_id)
      .eq('review_type', input.review_type)
      .maybeSingle();
    if (existing) return;
    await client.from('realtor_reviews').insert({
      client_email: email,
      property_address: input.property_address ?? null,
      review_type: input.review_type,
      status: 'submitted',
      submitted_by_name: input.buyer_name ?? null,
      submitted_by_email: email,
      stripe_session_id: input.stripe_session_id,
    });
  } catch (err) {
    console.error('mirrorRealtorReviewToHub failed (non-fatal):', err);
  }
}

// Deal Pack (either tier) gets the client's portal opened immediately on
// purchase, instead of waiting for a staff member to notice the sale and
// manually create the client via the PM portal's New Deal panel. Calls a
// dedicated client-hub endpoint (not a raw Supabase write, unlike the
// mirror functions above) so the real provisioning logic -- client record,
// milestone track, default access grants, the invite email -- lives in one
// place and can't drift between the two repos. Failures propagate so a delivery
// is completed only after required Hub provisioning succeeds.
const DEAL_PACK_PRODUCT_KEYS = new Set([
  'deal-pack-bid-ready',
  'deal-pack-build-ready',
]);

export function isDealPackProduct(productKey: string): boolean {
  return DEAL_PACK_PRODUCT_KEYS.has(productKey);
}

export async function provisionDealPackPortal(input: {
  buyer_email: string;
  buyer_name: string;
  project_address: string;
  product_key: string;
  amount_total_cents: number | null;
  stripe_session_id: string;
}): Promise<void> {
  const base = process.env.HUB_BASE_URL;
  const secret = process.env.DEAL_PACK_WEBHOOK_SECRET;
  const email = input.buyer_email?.trim().toLowerCase();
  if (!base || !secret || !email || !input.project_address)
    throw new Error(
      'Deal Pack portal provisioning is not configured or missing purchase details'
    );
  try {
    const res = await fetch(
      `${base.replace(/\/$/, '')}/api/webhooks/deal-pack-purchase`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify({
          clientEmail: email,
          clientName: input.buyer_name || undefined,
          address: input.project_address,
          productKey: input.product_key,
          amountPaidCents: input.amount_total_cents,
          stripeSessionId: input.stripe_session_id,
        }),
      }
    );
    if (!res.ok) {
      throw new Error(`Deal Pack portal provisioning failed: ${res.status}`);
    }
  } catch (err) {
    console.error('provisionDealPackPortal failed:', err);
    throw err;
  }
}

export async function mirrorOrderToHub(input: MirrorInput): Promise<void> {
  const client = getHubClient();
  const email = input.buyer_email?.trim().toLowerCase();
  if (!client || !email)
    throw new Error('Hub order storage is not configured or missing buyer');
  const existing = await client
    .from('orders')
    .select('id')
    .eq('stripe_session_id', input.stripe_session_id)
    .maybeSingle();
  if (existing.error) throw new Error('Hub order lookup failed');
  if (existing.data) {
    if (input.status) {
      const updated = await client
        .from('orders')
        .update({ status: input.status })
        .eq('id', existing.data.id);
      if (updated.error) throw new Error('Hub order status update failed');
    }
    return;
  }
  const inserted = await client
    .from('orders')
    .insert({
      client_email: email,
      order_number: `SCC-${input.order_id}`,
      item: input.product_name || 'Order',
      amount_cents: input.amount_total_cents ?? 0,
      status: input.status ?? 'paid',
      stripe_session_id: input.stripe_session_id,
    });
  if (inserted.error && inserted.error.code !== '23505')
    throw new Error('Hub order insert failed');
}
