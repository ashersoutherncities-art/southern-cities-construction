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
  // Inquiry-specific (reused for lead capture)
  'Your Message': 'XUtw0Y4pMhiF9DppQ327',
  'Services Requested': 'r9KEV34O6lk5mzslzWYl',
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

async function removeContactTags(contactId: string, tags: string[], token: string) {
  if (!contactId || !tags.length) return;
  await ghlFetch(
    `/contacts/${contactId}/tags`,
    { method: 'DELETE', body: JSON.stringify({ tags }) },
    token
  );
}

async function addContactTags(contactId: string, tags: string[], token: string) {
  if (!contactId || !tags.length) return;
  await ghlFetch(
    `/contacts/${contactId}/tags`,
    { method: 'POST', body: JSON.stringify({ tags }) },
    token
  );
}

/**
 * Upsert a contact in GHL with all order data set as custom fields and
 * tagged with the product-specific tag that triggers the workflow.
 *
 * Key behavior for repeat customers: the product tag is REMOVED then
 * RE-ADDED on every purchase, so the "tag added" event fires every
 * time — including same-product re-purchases.
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

  // Populate Services Requested with the same "Product Name — $Price" format
  // that inquiries use, so workflow merge tags work consistently across
  // inquiry + purchase flows. {{contact.services_requested}} renders properly
  // in the fulfillment workflow's email/SMS/task instead of being blank.
  const servicesRequestedValue = payload.product_name
    ? payload.amount_paid
      ? `${payload.product_name} — $${payload.amount_paid.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
      : payload.product_name
    : '';

  const customFields = [
    { id: CUSTOM_FIELD_IDS['Project Address'], field_value: payload.project_address || '' },
    { id: CUSTOM_FIELD_IDS['Last Order ID'], field_value: payload.order_id || '' },
    { id: CUSTOM_FIELD_IDS['Last Product'], field_value: payload.product_name || '' },
    { id: CUSTOM_FIELD_IDS['Last Order Amount'], field_value: String(payload.amount_paid || 0) },
    { id: CUSTOM_FIELD_IDS['Services Requested'], field_value: servicesRequestedValue },
  ].filter((field) => Boolean(field.id));

  const productTag = `purchased-${payload.product_key}`.toLowerCase();
  // Permanent tags for segmentation — never removed
  const segmentationTags = [`ever-purchased-${payload.product_key}`.toLowerCase(), 'stripe-paid'];

  // Step 1: upsert WITHOUT the firing tag — sets fields + dedupes/creates contact + adds segmentation tags
  const upsertBody = {
    locationId: creds.locationId,
    firstName,
    lastName,
    name: payload.buyer_name,
    email: payload.buyer_email,
    phone,
    source: 'Southern Cities — Stripe',
    customFields,
    tags: segmentationTags,
  };

  const upsertResult = await ghlFetch(
    '/contacts/upsert',
    { method: 'POST', body: JSON.stringify(upsertBody) },
    creds.token
  );

  const contactId =
    (typeof upsertResult.body === 'object' && upsertResult.body !== null && 'contact' in upsertResult.body
      ? (upsertResult.body as { contact: { id?: string } }).contact?.id
      : null) || null;

  if (!upsertResult.ok || !contactId) {
    return {
      ok: false,
      status: upsertResult.status,
      body: upsertResult.body,
      contactId,
      tag: productTag,
    };
  }

  // Step 2: remove the firing tag (no-op if it doesn't exist), then re-add it.
  // This guarantees the "tag added" event fires even on same-product re-purchases.
  try {
    await removeContactTags(contactId, [productTag], creds.token);
    const addResult = await ghlFetch(
      `/contacts/${contactId}/tags`,
      { method: 'POST', body: JSON.stringify({ tags: [productTag] }) },
      creds.token
    );
    return {
      ok: addResult.ok,
      status: addResult.status,
      body: addResult.body,
      contactId,
      tag: productTag,
    };
  } catch (err) {
    return {
      ok: false,
      status: 500,
      body: `tag-rotate failed: ${(err as Error).message}`,
      contactId,
      tag: productTag,
    };
  }
}

export type GhlInquiryPayload = {
  buyer_name: string;
  buyer_email: string;
  buyer_phone?: string;
  service_slug: string;
  service_name?: string;
  service_price?: string;
  message?: string;
  company?: string;
  source?: string;
};

/**
 * Forward a lead-capture form submission to GHL. Upserts the contact and adds
 * an `inquiry-<service-slug>` tag (distinct from the `purchased-<key>` tag
 * fired on order completion). GHL workflows can listen to the inquiry tag to
 * send confirmation email, internal alert, kick off a sales sequence, etc.
 *
 * Tag is NOT rotated — each inquiry submission for the same product just adds
 * the tag once (already-present is a no-op in GHL). For most lead forms a
 * single tag-add is the right behavior. If a customer submits two inquiries
 * for the same product, the second one wouldn't fire the workflow again —
 * but that's usually desired (don't double-email the same lead).
 *
 * Returns ok/failure without throwing; caller logs.
 */
export async function sendInquiryToGhl(payload: GhlInquiryPayload) {
  const creds = getCreds();
  if (!creds) {
    return { ok: false, reason: 'GHL credentials not configured' as const };
  }

  const { firstName, lastName } = splitName(payload.buyer_name);
  const phone = (payload.buyer_phone || '').trim() || undefined;
  const inquiryTag = `inquiry-${payload.service_slug}`.toLowerCase();

  // Tag-routing rule: hub/general inquiries get `lead-inquiry` (catch-all
  // workflow). Product inquiries get `product-inquiry` (unified product
  // pipeline workflow). Both also get the slug-specific tag so future
  // per-product workflows are possible without server changes.
  //
  // Hub/general slugs end in `-hub-inquiry` or `-general-inquiry` by
  // convention. Anything else is treated as a product.
  const isNonProductInquiry =
    payload.service_slug.endsWith('-hub-inquiry') ||
    payload.service_slug.endsWith('-general-inquiry');
  const tags = isNonProductInquiry
    ? [inquiryTag, 'lead-inquiry']
    : [inquiryTag, 'product-inquiry'];

  // Populate custom fields so the GHL contact carries the full inquiry context
  // (message body + which product they asked about + price). The workflow's
  // task and SMS steps can then surface these inline via merge tags — no need
  // to bounce out to Telegram/Supabase or guess the price.
  //
  // services_requested format: "Product Name — $Price" when price is known,
  //   falling back to "Product Name" or just the slug. This format reads
  //   cleanly in the SMS template ({{contact.services_requested}}) so the
  //   recipient sees the price inline without a separate merge tag.
  const serviceLabel = payload.service_name || payload.service_slug;
  const servicesRequestedValue = payload.service_price
    ? `${serviceLabel} — ${payload.service_price}`
    : serviceLabel;

  const customFields = [
    { id: CUSTOM_FIELD_IDS['Your Message'], field_value: payload.message || '' },
    {
      id: CUSTOM_FIELD_IDS['Services Requested'],
      field_value: servicesRequestedValue,
    },
  ].filter((field) => Boolean(field.id) && field.field_value);

  const upsertBody = {
    locationId: creds.locationId,
    firstName,
    lastName,
    name: payload.buyer_name,
    email: payload.buyer_email,
    phone,
    source: payload.source || 'Southern Cities — Inquiry Form',
    customFields,
    tags,
  };

  const upsertResult = await ghlFetch(
    '/contacts/upsert',
    { method: 'POST', body: JSON.stringify(upsertBody) },
    creds.token
  );

  const contactId =
    (typeof upsertResult.body === 'object' && upsertResult.body !== null && 'contact' in upsertResult.body
      ? (upsertResult.body as { contact: { id?: string } }).contact?.id
      : null) || null;

  if (!upsertResult.ok || !contactId) {
    return {
      ok: false,
      status: upsertResult.status,
      body: upsertResult.body,
      contactId,
      tag: inquiryTag,
    };
  }

  return {
    ok: true,
    status: upsertResult.status,
    contactId,
    tag: inquiryTag,
  };
}

export type GhlLeadMagnetPayload = {
  buyer_name: string;
  buyer_email: string;
  buyer_phone?: string;
  /** Lead-magnet resource slug — used to construct the `lead-magnet-<slug>` tag. */
  resource_slug: string;
  resource_title?: string;
  company?: string;
  role?: string;
  source?: string;
};

export type GhlRehabSnapshotPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company_name?: string | null;
  investor_type: string;
  property_address: string;
  city: string;
  state: string;
  zip: string;
  property_type: string;
  investment_strategy: string;
  target_finish_level: string;
  project_category: string;
  estimated_low: number;
  estimated_high: number;
  confidence_level: string;
  confidence_score: number;
  timeline_low_weeks: number;
  timeline_high_weeks: number;
  risk_flags: string[];
  recommended_next_step: string;
  report_id: string;
  report_url?: string | null;
};

/**
 * Forward a lead-magnet download capture to GHL. Upserts the contact with:
 *   - `lead-magnet-<resource-slug>` (which magnet they grabbed — for tracking)
 *   - `lead-inquiry` (so the existing catch-all Lead Inquiry workflow fires)
 *
 * Populates `Services Requested` with the resource title so the workflow's
 * email/SMS templates can reference what was downloaded.
 */
export async function sendLeadMagnetToGhl(payload: GhlLeadMagnetPayload) {
  const creds = getCreds();
  if (!creds) {
    return { ok: false, reason: 'GHL credentials not configured' as const };
  }

  const { firstName, lastName } = splitName(payload.buyer_name);
  const phone = (payload.buyer_phone || '').trim() || undefined;
  const magnetTag = `lead-magnet-${payload.resource_slug}`.toLowerCase();
  const tags = [magnetTag, 'lead-inquiry'];

  const servicesRequestedValue = payload.resource_title || payload.resource_slug;
  const customFields = [
    { id: CUSTOM_FIELD_IDS['Services Requested'], field_value: servicesRequestedValue },
  ].filter((field) => Boolean(field.id) && field.field_value);

  const upsertBody = {
    locationId: creds.locationId,
    firstName,
    lastName,
    name: payload.buyer_name,
    email: payload.buyer_email,
    phone,
    source: payload.source || 'Southern Cities — Lead Magnet',
    customFields,
    tags,
  };

  const upsertResult = await ghlFetch(
    '/contacts/upsert',
    { method: 'POST', body: JSON.stringify(upsertBody) },
    creds.token
  );

  const contactId =
    (typeof upsertResult.body === 'object' && upsertResult.body !== null && 'contact' in upsertResult.body
      ? (upsertResult.body as { contact: { id?: string } }).contact?.id
      : null) || null;

  return {
    ok: upsertResult.ok && !!contactId,
    status: upsertResult.status,
    contactId,
    tag: magnetTag,
  };
}

export async function sendRehabSnapshotToGhl(payload: GhlRehabSnapshotPayload) {
  const creds = getCreds();
  if (!creds) {
    return { ok: false, reason: 'GHL credentials not configured' as const };
  }

  const fullName = [payload.first_name, payload.last_name].filter(Boolean).join(' ').trim();
  const phone = (payload.phone || '').trim() || undefined;
  const tags = [
    'lead-inquiry',
    'product-inquiry',
    'rehab-budget-snapshot',
    `investor-type-${payload.investor_type}`,
    `snapshot-confidence-${payload.confidence_level}`,
    `snapshot-category-${payload.project_category}`,
  ].map((item) => item.toLowerCase());

  const customFields = [
    { id: CUSTOM_FIELD_IDS['Project Address'], field_value: payload.property_address },
    {
      id: CUSTOM_FIELD_IDS['Services Requested'],
      field_value: `Rehab Budget Range & Execution Risk Snapshot — ${payload.project_category} — ${payload.confidence_level} confidence`,
    },
    {
      id: CUSTOM_FIELD_IDS['Your Message'],
      field_value: `Range ${payload.estimated_low}-${payload.estimated_high}; timeline ${payload.timeline_low_weeks}-${payload.timeline_high_weeks} weeks; next step: ${payload.recommended_next_step}`,
    },
  ].filter((field) => Boolean(field.id));

  const upsertBody = {
    locationId: creds.locationId,
    firstName: payload.first_name,
    lastName: payload.last_name,
    name: fullName,
    email: payload.email,
    phone,
    source: 'Southern Cities — Rehab Budget Snapshot',
    customFields,
    tags,
  };

  const upsertResult = await ghlFetch(
    '/contacts/upsert',
    { method: 'POST', body: JSON.stringify(upsertBody) },
    creds.token
  );

  const contactId =
    (typeof upsertResult.body === 'object' && upsertResult.body !== null && 'contact' in upsertResult.body
      ? (upsertResult.body as { contact: { id?: string } }).contact?.id
      : null) || null;

  const webhookUrl = process.env.GHL_REHAB_SNAPSHOT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'rehab-budget-snapshot',
          contactId,
          ...payload,
        }),
      });
    } catch (error) {
      console.error('GHL snapshot webhook failed (non-fatal):', error);
    }
  }

  return {
    ok: upsertResult.ok && !!contactId,
    status: upsertResult.status,
    contactId,
    tag: 'rehab-budget-snapshot',
  };
}

// Re-export for callers that want to manage tags directly
export { addContactTags, removeContactTags };
