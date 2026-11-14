import { randomUUID } from 'node:crypto';
import type { SupabaseClient } from '@supabase/supabase-js';

const LEASE_MS = 10 * 60_000;
type Claim =
  | { state: 'claimed'; token: string }
  | { state: 'completed' }
  | { state: 'busy' };
export async function claimStripeDelivery(
  client: SupabaseClient,
  eventId: string,
  eventType: string
): Promise<Claim> {
  const token = randomUUID();
  const now = new Date().toISOString();
  const lease_until = new Date(Date.now() + LEASE_MS).toISOString();
  const row = {
    event_id: eventId,
    event_type: eventType,
    status: 'processing',
    attempt_token: token,
    lease_until,
  };
  const inserted = await client.from('stripe_webhook_events').insert(row);
  if (!inserted.error) return { state: 'claimed', token };
  if (inserted.error.code !== '23505')
    throw new Error('Could not claim Stripe delivery');
  const existing = await client
    .from('stripe_webhook_events')
    .select('status,attempt_token,lease_until')
    .eq('event_id', eventId)
    .single();
  if (existing.error || !existing.data)
    throw new Error('Could not read Stripe delivery');
  if (existing.data.status === 'completed') return { state: 'completed' };
  if (Date.parse(existing.data.lease_until) > Date.now())
    return { state: 'busy' };
  const reclaimed = await client
    .from('stripe_webhook_events')
    .update(row)
    .eq('event_id', eventId)
    .eq('attempt_token', existing.data.attempt_token)
    .eq('status', 'processing')
    .lte('lease_until', now)
    .select('event_id')
    .maybeSingle();
  if (reclaimed.error) throw new Error('Could not reclaim Stripe delivery');
  return reclaimed.data ? { state: 'claimed', token } : { state: 'busy' };
}
export async function finishStripeDelivery(
  client: SupabaseClient,
  eventId: string,
  token: string,
  orderId: number | null
) {
  const result = await client
    .from('stripe_webhook_events')
    .update({
      status: 'completed',
      completed_at: new Date().toISOString(),
      order_id: orderId,
    })
    .eq('event_id', eventId)
    .eq('attempt_token', token)
    .select('event_id')
    .maybeSingle();
  if (result.error || !result.data)
    throw new Error('Could not complete Stripe delivery');
}
export async function releaseStripeDelivery(
  client: SupabaseClient,
  eventId: string,
  token: string
) {
  const result = await client
    .from('stripe_webhook_events')
    .update({ lease_until: new Date().toISOString() })
    .eq('event_id', eventId)
    .eq('attempt_token', token)
    .eq('status', 'processing');
  if (result.error) console.error('Could not release Stripe delivery lease');
}
