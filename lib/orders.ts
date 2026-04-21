import { SupabaseClient } from '@supabase/supabase-js';
import { getServiceClient } from './supabase';

export type OrderRow = {
  id: number;
  workflow: string;
  product_key: string;
  product_name: string;
  buyer_name: string;
  buyer_email: string;
  status: string;
  payment_status: string | null;
  amount_total_cents: number | null;
  currency: string;
  stripe_session_id: string | null;
  stripe_customer_id: string | null;
  stripe_payment_intent_id: string | null;
  stripe_charge_id: string | null;
  metadata: Record<string, unknown>;
  related_table: string | null;
  related_id: number | null;
  paid_at: string | null;
  cancelled_at: string | null;
  refunded_at: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateOrderInput = {
  workflow: string;
  product_key: string;
  product_name: string;
  product_description?: string | null;
  buyer_name: string;
  buyer_email: string;
  buyer_phone?: string | null;
  billing_address?: string | null;
  project_address?: string | null;
  project_manager_role?: string | null;
  project_manager_name?: string | null;
  project_manager_email?: string | null;
  project_manager_phone?: string | null;
  entity_type?: string | null;
  project_timeline?: string | null;
  scope_notes?: string | null;
  amount_total_cents?: number | null;
  currency?: string;
  stripe_session_id?: string | null;
  stripe_customer_id?: string | null;
  status?: string;
  metadata?: Record<string, unknown>;
};

export type OrderEventInput = {
  order_id: number;
  event_type: string;
  source?: string;
  message?: string | null;
  stripe_event_id?: string | null;
  payload?: Record<string, unknown>;
};

export async function createOrder(
  input: CreateOrderInput,
  client?: SupabaseClient
): Promise<OrderRow | null> {
  const supabase = client ?? getServiceClient();
  const record = {
    workflow: input.workflow,
    product_key: input.product_key,
    product_name: input.product_name,
    product_description: input.product_description ?? null,
    buyer_name: input.buyer_name,
    buyer_email: input.buyer_email,
    buyer_phone: input.buyer_phone ?? null,
    billing_address: input.billing_address ?? null,
    project_address: input.project_address ?? null,
    project_manager_role: input.project_manager_role ?? null,
    project_manager_name: input.project_manager_name ?? null,
    project_manager_email: input.project_manager_email ?? null,
    project_manager_phone: input.project_manager_phone ?? null,
    entity_type: input.entity_type ?? null,
    project_timeline: input.project_timeline ?? null,
    scope_notes: input.scope_notes ?? null,
    amount_total_cents: input.amount_total_cents ?? null,
    currency: input.currency ?? 'usd',
    stripe_session_id: input.stripe_session_id ?? null,
    stripe_customer_id: input.stripe_customer_id ?? null,
    status: input.status ?? 'initiated',
    metadata: input.metadata ?? {},
  };

  const { data, error } = await supabase
    .from('orders')
    .insert(record)
    .select('*')
    .single();

  if (error) {
    console.error('orders insert error:', error);
    return null;
  }
  return data as OrderRow;
}

export async function recordOrderEvent(
  input: OrderEventInput,
  client?: SupabaseClient
): Promise<void> {
  const supabase = client ?? getServiceClient();
  const { error } = await supabase.from('order_events').insert({
    order_id: input.order_id,
    event_type: input.event_type,
    source: input.source ?? 'system',
    message: input.message ?? null,
    stripe_event_id: input.stripe_event_id ?? null,
    payload: input.payload ?? {},
  });
  if (error && !isDuplicateStripeEvent(error)) {
    console.error('order_events insert error:', error);
  }
}

function isDuplicateStripeEvent(error: { code?: string; message?: string }) {
  return error.code === '23505' && (error.message || '').includes('stripe_event_id');
}

export async function findOrderByStripeSession(
  sessionId: string,
  client?: SupabaseClient
): Promise<OrderRow | null> {
  const supabase = client ?? getServiceClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('stripe_session_id', sessionId)
    .maybeSingle();
  if (error) {
    console.error('orders lookup error:', error);
    return null;
  }
  return (data as OrderRow | null) ?? null;
}

export type UpdateOrderInput = {
  status?: string;
  payment_status?: string | null;
  amount_total_cents?: number | null;
  stripe_session_id?: string | null;
  stripe_customer_id?: string | null;
  stripe_payment_intent_id?: string | null;
  stripe_charge_id?: string | null;
  related_table?: string | null;
  related_id?: number | null;
  metadata?: Record<string, unknown>;
  paid_at?: string | null;
  cancelled_at?: string | null;
  refunded_at?: string | null;
};

export async function updateOrder(
  id: number,
  patch: UpdateOrderInput,
  client?: SupabaseClient
): Promise<OrderRow | null> {
  const supabase = client ?? getServiceClient();
  const { data, error } = await supabase
    .from('orders')
    .update(patch)
    .eq('id', id)
    .select('*')
    .single();
  if (error) {
    console.error('orders update error:', error);
    return null;
  }
  return data as OrderRow;
}

export async function upsertOrderForStripeSession(
  sessionId: string,
  fallback: CreateOrderInput,
  client?: SupabaseClient
): Promise<OrderRow | null> {
  const existing = await findOrderByStripeSession(sessionId, client);
  if (existing) return existing;
  return createOrder({ ...fallback, stripe_session_id: sessionId }, client);
}
