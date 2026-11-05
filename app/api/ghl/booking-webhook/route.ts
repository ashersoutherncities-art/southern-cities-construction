import { NextRequest, NextResponse } from 'next/server';
import { PostHog } from 'posthog-node';
import { tryGetServiceClient } from '@/lib/supabase';
import { safeKeyEqual } from '@/lib/secure-compare';
import { SCC_EVENTS } from '@/lib/analytics/schema';

export const runtime = 'nodejs';

/**
 * Authoritative booking signal for the "Sales Consultation - SCC" calendar.
 * GHL calls this from a Webhook action added to the existing
 * `06b. Appointment Confirm and Reminders` workflow (trigger: Customer
 * Booked Appointment) — a new action on that workflow, nothing about the
 * workflow's existing trigger/conditions/Conversions API action changes.
 *
 * ── LIVE: the GHL workflow action has been configured and verified ──
 * Confirmed end-to-end against a real booking on 2026-10-24. The real GHL
 * payload for this trigger nests appointment data under a `calendar` key
 * (not `appointment`, which was my initial guess): `calendar.appointmentId`,
 * `calendar.id` (the calendar id, confusingly), `calendar.status`. Contact
 * id is top-level `contact_id`. The full raw payload also carries a large
 * amount of standard GHL contact/lead data (name, email, phone, address,
 * tags, LM1 fields, etc.) — none of that reaches PostHog (see
 * forwardToPostHog below, which only sends the handful of non-PII fields
 * this file actually extracts), but it does land in Supabase's
 * `scc_webhook_events.payload` column since the raw body is stored there
 * for debugging. That table is RLS-locked to the service role only.
 *
 * Setup reference, now done:
 * 1. Workflow `06b. Appointment Confirm and Reminders` → added action
 *    → Webhooks → Send webhook data.
 * 2. Method: POST. URL: https://southerncitiesconstruction.com/api/ghl/booking-webhook
 * 3. Custom header: x-scc-webhook-secret: <value of
 *    GHL_BOOKING_WEBHOOK_SECRET in this project's env>.
 * 4. Body: GHL's default "Send All Data" — this handler parses
 *    defensively and only requires an appointment id to be present
 *    somewhere recognizable in the payload.
 *
 * The field lookups below cover the variants documented/observed elsewhere
 * in this codebase's GHL integration (lib/ghl.ts), GHL's own public
 * webhook docs, AND the real confirmed payload shape above. If GHL ever
 * changes this payload shape, check `scc_webhook_events.payload` for the
 * new shape and adjust the lookups accordingly.
 */

type IncomingPayload = Record<string, unknown>;

function pick(payload: IncomingPayload, paths: string[][]): string | null {
  for (const path of paths) {
    let cur: unknown = payload;
    for (const key of path) {
      if (cur && typeof cur === 'object' && key in (cur as Record<string, unknown>)) {
        cur = (cur as Record<string, unknown>)[key];
      } else {
        cur = undefined;
        break;
      }
    }
    if (typeof cur === 'string' && cur.length > 0) return cur;
    if (typeof cur === 'number') return String(cur);
  }
  return null;
}

/**
 * Uses posthog-node (PostHog's official server-side client) rather than a
 * raw fetch() to PostHog's /capture/ endpoint, which is what this
 * originally did. That raw approach is unreliable from a Vercel serverless
 * function specifically: identical payloads sent via curl from a regular
 * machine landed in PostHog's event store within ~20 seconds every time;
 * the exact same payload sent via this route's own fetch() call — awaited,
 * 200 "Ok" response received and confirmed — never appeared, even after
 * several minutes and repeated checks against PostHog's actual event store
 * (via HogQL, not just the API's response, which is misleading either
 * way). I couldn't get Vercel's function logs to show what differed
 * further. posthog-node is PostHog's purpose-built, supported path for
 * exactly this (server-to-server event capture), and its `shutdown()` call
 * explicitly flushes before the function returns — the standard fix for
 * the serverless case this was likely hitting.
 */
async function forwardToPostHog(params: {
  appointmentId: string;
  calendarId: string | null;
  status: string | null;
  campaignId: string | null;
  visitorId: string | null;
}): Promise<void> {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return; // analytics not configured — webhook still succeeds, just doesn't forward

  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
  const distinctId = params.visitorId || `appointment:${params.appointmentId}`;

  const client = new PostHog(key, { host });
  try {
    client.capture({
      distinctId,
      event: SCC_EVENTS.APPOINTMENT_BOOKED,
      properties: {
        appointment_id: params.appointmentId,
        calendar_id: params.calendarId,
        status: params.status || 'booked',
        campaign_id: params.campaignId,
        $lib: 'scc-ghl-webhook',
      },
    });
    await client.shutdown();
  } catch (err) {
    // best-effort — a PostHog outage shouldn't make the webhook fail/retry
    console.error('PostHog forward from GHL booking webhook failed (non-fatal):', err);
  }
}

export async function POST(req: NextRequest) {
  const expectedSecret = process.env.GHL_BOOKING_WEBHOOK_SECRET;
  if (!expectedSecret) {
    return NextResponse.json({ error: 'webhook not configured' }, { status: 500 });
  }

  const providedSecret = req.headers.get('x-scc-webhook-secret');
  if (!safeKeyEqual(providedSecret, expectedSecret)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let payload: IncomingPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid json body' }, { status: 400 });
  }

  const appointmentId = pick(payload, [
    ['appointment', 'id'],
    ['appointmentId'],
    ['id'],
    ['calendar', 'appointmentId'],
  ]);
  if (!appointmentId) {
    return NextResponse.json({ error: 'no appointment id in payload' }, { status: 400 });
  }

  const calendarId = pick(payload, [
    ['appointment', 'calendarId'],
    ['calendarId'],
    ['calendar', 'id'],
  ]);
  const contactId = pick(payload, [
    ['contact_id'],
    ['appointment', 'contactId'],
    ['contactId'],
    ['contact', 'id'],
  ]);
  // Confirmed against a real delivery (2026-10-24): GHL nests the actual
  // appointment status under `calendar.status` — it also sends a
  // `calendar.appoinmentStatus` field (GHL's own typo, not ours) with
  // similar but not identical values ("confirmed" vs "booked" on the same
  // payload). `calendar.status` is checked first as the more standard name.
  const status = pick(payload, [
    ['calendar', 'status'],
    ['calendar', 'appoinmentStatus'],
    ['appointment', 'status'],
    ['status'],
  ]);
  // Only populated once a matching custom field exists in GHL that carries
  // the posthog distinct_id through the booking flow — see
  // lib/analytics/attribution.ts. Falls back to an appointment-keyed id
  // when absent, which is still unique and dedup-safe, just not stitched
  // to the visitor's earlier browsing session.
  const visitorId = pick(payload, [['customData', 'scc_visitor_id'], ['scc_visitor_id']]);
  const campaignId = pick(payload, [['customData', 'campaign_id'], ['campaign_id']]);

  const supabase = tryGetServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: 'storage not configured' }, { status: 500 });
  }

  const { error: insertError } = await supabase
    .from('scc_webhook_events')
    .insert({
      appointment_id: appointmentId,
      calendar_id: calendarId,
      contact_id: contactId,
      status,
      payload,
    });

  if (insertError) {
    // 23505 = unique_violation — we've already processed this appointment
    // id (GHL retried the delivery, or sent it twice). Treat as success,
    // just don't forward a second event.
    if (insertError.code === '23505') {
      return NextResponse.json({ received: true, duplicate: true });
    }
    console.error('GHL booking webhook insert failed:', insertError);
    return NextResponse.json({ error: 'storage error' }, { status: 500 });
  }

  await forwardToPostHog({ appointmentId, calendarId, status, campaignId, visitorId });

  return NextResponse.json({ received: true, duplicate: false });
}
