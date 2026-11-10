import { getServiceClient } from '@/lib/supabase';
import { authorized, dayInZone, shiftDay, validDay } from '@/lib/marketing/model.mjs';
import { dashboard } from '@/lib/marketing/dashboard.mjs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const headers = {
  'Cache-Control': 'private, no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};

export async function GET(request: Request) {
  const password = process.env.MARKETING_ADMIN_PASSWORD;
  if (!password || password.length < 32) {
    return new Response('Dashboard unavailable', { status: 503, headers });
  }
  const expected = 'Basic ' + Buffer.from('marketing:' + password).toString('base64');
  if (!authorized(request.headers.get('authorization'), expected)) {
    return new Response('Admin sign-in required', {
      status: 401, headers: { ...headers, 'WWW-Authenticate': 'Basic realm="SCC marketing", charset="UTF-8"' },
    });
  }

  try {
    const db = getServiceClient();
    const latest = await db.from('scc_marketing_daily').select('day').order('day', { ascending: false }).limit(1);
    if (latest.error) throw latest.error;
    const url = new URL(request.url);
    const to = url.searchParams.get('to') ?? latest.data[0]?.day ?? shiftDay(dayInZone(new Date(), 'UTC'), -1);
    if (!validDay(to)) return new Response('Invalid end date', { status: 400, headers });
    const from = url.searchParams.get('from') ?? shiftDay(to, -29);
    if (!validDay(from) || from > to || from < shiftDay(to, -89)) {
      return new Response('Choose a valid date range of up to 90 days', { status: 400, headers });
    }
    const { data, error } = await db.from('scc_marketing_daily')
      .select('day,snapshot,synced_at').gte('day', from).lte('day', to).order('day');
    if (error) throw error;
    const expectedDays = 1 + (Date.parse(to) - Date.parse(from)) / 86_400_000;
    return new Response(dashboard(data, from, to, expectedDays), {
      headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8',
        'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'" },
    });
  } catch {
    return new Response('Marketing data unavailable', { status: 503, headers });
  }
}
