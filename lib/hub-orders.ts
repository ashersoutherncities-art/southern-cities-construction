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
