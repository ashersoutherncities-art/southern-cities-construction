/**
 * GoHighLevel (GHL) integration for post-purchase fulfillment workflows.
 *
 * Strategy: instead of using GHL's premium Inbound Webhook trigger, we
 * use the REST API to upsert the contact + add a product-specific tag.
 * GHL workflows then listen for the "Contact Tag Added" event (free)
 * and run the rest of the fulfillment automation.
 *
 * Env vars required:
 *   GHL_API_TOKEN     — Private Integration Access Token (pit-...)
 *   GHL_LOCATION_ID   — Sub-account / location id
 */

const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

// Contact custom field IDs in the SCC location. Looked up once and
// hardcoded here so we don't pay an extra API call on every order.
// If you rename or recreate fields in GHL, update these IDs.
const CUSTOM_FIELD_IDS: Record<string, string> = {
  'Project Address': 'pDLG9Iq7RQnJQ6We5YQP',
  'Last Order ID': 'uD5vImab1B7UW4Ln0vE8',
  'Last Product': 'WqO1udEOoeC2WkpLpNjo',
  'Last Order Amount': 'GbRey1pJmXh8C83N3EvW',
};

export type GhlOrderPayload = {
  buyer_name: string;
  buyer_email: string;
  buyer_phone?: string;
  product_key: string;
  product_name: string;
  amount_paid: number;
  project_address?: string;
  order_id: string;
  stripe_session_id: string;
  stripe_payment_intent_id?: string | null;
  purchased_at: string;
};

function getCreds() {
  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) return null;
  return { token, locationId };
}

function splitName(fullName: string) {
  const trimmed = (fullName || '').trim();
  if (!trimmed) return { firstName: '', lastName: '' };
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}

async function ghlFetch(path: string, init: RequestInit, token: string) {
  const res = await fetch(`${GHL_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Version: GHL_VERSION,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    /* keep raw text */
  }
  return { ok: res.ok, status: res.status, body: json ?? text };
}

/**
 * Upsert a contact in GHL with all order data set as custom fields and
 * tagged with the product-specific tag that triggers the workflow.
 *
 * Returns { ok: true } on success. Failures are returned, not thrown,
 * so the caller (Stripe webhook) can log and continue without breaking
 * the order pipeline.
 */
export async function sendOrderToGhl(payload: GhlOrderPayload) {
  const creds = getCreds();
  if (!creds) {
    return { ok: false, reason: 'GHL credentials not configured' as const };
  }

  const { firstName, lastName } = splitName(payload.buyer_name);
  const phone = (payload.buyer_phone || '').trim() || undefined;

  const customFields = [
    { id: CUSTOM_FIELD_IDS['Project Address'], field_value: payload.project_address || '' },
    { id: CUSTOM_FIELD_IDS['Last Order ID'], field_value: payload.order_id || '' },
    { id: CUSTOM_FIELD_IDS['Last Product'], field_value: payload.product_name || '' },
    { id: CUSTOM_FIELD_IDS['Last Order Amount'], field_value: String(payload.amount_paid || 0) },
  ].filter((field) => Boolean(field.id));

  const tag = `purchased-${payload.product_key}`.toLowerCase();

  const body = {
    locationId: creds.locationId,
    firstName,
    lastName,
    name: payload.buyer_name,
    email: payload.buyer_email,
    phone,
    source: 'Southern Cities — Stripe',
    customFields,
    tags: [tag, 'stripe-paid'],
  };

  // /contacts/upsert: dedupes by email + phone, creates if new, updates if existing
  const result = await ghlFetch(
    '/contacts/upsert',
    { method: 'POST', body: JSON.stringify(body) },
    creds.token
  );

  return {
    ok: result.ok,
    status: result.status,
    body: result.body,
    contactId:
      (typeof result.body === 'object' && result.body !== null && 'contact' in result.body
        ? (result.body as { contact: { id?: string } }).contact?.id
        : null) || null,
    tag,
  };
}
