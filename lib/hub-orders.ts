import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Mirrors a completed order into the Client Hub's `orders` table (a SEPARATE
// Supabase project — clients.southerncitiesconstruction.com) so the hub's
// Orders tab shows real purchases. Fire-and-forget: never breaks the Stripe
// pipeline. Idempotent via a stripe_session_id existence check.

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
  if (!hubClient) hubClient = createClient(url, key, { auth: { persistSession: false } });
  return hubClient;
}

// Realtor "review" products (cart keys) → the hub's realtor_reviews.review_type.
// When a realtor buys one of these, we log an inspection review in their hub.
const REVIEW_PRODUCT_MAP: Record<string, string> = {
  'realtor-quick-read': 'quick_read',
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

export async function mirrorOrderToHub(input: MirrorInput): Promise<void> {
  const client = getHubClient();
  const email = input.buyer_email?.trim().toLowerCase();
  if (!client || !email) return;
  try {
    const { data: existing } = await client
      .from('orders')
      .select('id')
      .eq('stripe_session_id', input.stripe_session_id)
      .maybeSingle();
    if (existing) return; // already mirrored
    await client.from('orders').insert({
      client_email: email,
      order_number: `SCC-${input.order_id}`,
      item: input.product_name || 'Order',
      amount_cents: input.amount_total_cents ?? 0,
      status: input.status ?? 'paid',
      stripe_session_id: input.stripe_session_id,
    });
  } catch (err) {
    console.error('mirrorOrderToHub failed (non-fatal):', err);
  }
}
