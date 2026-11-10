import { getServiceClient } from '@/lib/supabase';
import { authorized, dayInZone, shiftDay, validDay } from '@/lib/marketing/model.mjs';
import { collectDay, config, metaAccount } from '@/lib/marketing/sources.mjs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const headers = { 'Cache-Control': 'no-store' };
  if (!secret || !authorized(request.headers.get('authorization'), 'Bearer ' + secret)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401, headers });
  }
  const requested = new URL(request.url).searchParams.get('day');
  if (requested !== null && !validDay(requested)) {
    return Response.json({ error: 'Use a valid YYYY-MM-DD date' }, { status: 400, headers });
  }
  try {
    const cfg = config(process.env);
    const db = getServiceClient();
    const account = await metaAccount(cfg);
    const today = dayInZone(new Date(), account.zone);
    if (requested && requested >= today) {
      return Response.json({ error: 'Select a completed account day' }, { status: 400, headers });
    }
    const days = requested ? [requested] : [1, 2, 3].map(offset => shiftDay(today, -offset));
    const synced: string[] = [];
    const failed: string[] = [];
    for (const day of days) {
      const started = new Date().toISOString();
      try {
        const snapshot = await collectDay(cfg, account, day, async (start, end) => {
          const events = [];
          for (let offset = 0; offset < 10_000; offset += 250) {
            const { data, error } = await db.from('scc_webhook_events')
              .select('appointment_id,contact_id,status,payload')
              .eq('calendar_id', cfg.calendar).gte('received_at', start).lt('received_at', end)
              .order('received_at').order('appointment_id').range(offset, offset + 249);
            if (error) throw new Error('Booking ledger read failed');
            events.push(...data);
            if (data.length < 250) return events;
          }
          throw new Error('Booking ledger pagination incomplete');
        });
        const { error } = await db.rpc('scc_save_marketing_day', {
          report_day: day, report_snapshot: snapshot, sync_started: started,
        });
        if (error) throw new Error('Marketing snapshot save failed');
        synced.push(day);
      } catch (error) {
        // Provider error bodies can contain credentials or customer details.
        const message = error instanceof Error ? error.message : '';
        console.error('Marketing sync failed', day,
          /^(Meta|GoHighLevel|PostHog) HTTP \d{3}$/.test(message) ? message : 'source or database error');
        failed.push(day);
      }
    }
    return Response.json({ synced, failed }, { status: failed.length ? 502 : 200, headers });
  } catch {
    console.error('Marketing sync initialization failed');
    return Response.json({ error: 'Marketing sync configuration or account lookup failed' }, { status: 503, headers });
  }
}
