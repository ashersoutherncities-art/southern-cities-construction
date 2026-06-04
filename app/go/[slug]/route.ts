import { NextRequest, NextResponse } from 'next/server';
import { getMarketingLinkBySlug, recordMarketingLinkClick } from '@/lib/marketing';
import { getServiceClient, SupabaseConfigError } from '@/lib/supabase';

// Open-redirect guard: a tracked link may only point to https on our own
// domains or an explicit partner allowlist. Anything else is rejected so the
// branded domain can't be weaponized as a phishing redirector.
const ALLOWED_REDIRECT_HOSTS = new Set([
  'southerncitiesconstruction.com',
  'www.southerncitiesconstruction.com',
  'clients.southerncitiesconstruction.com',
  'app.gohighlevel.com',
  'api.leadconnectorhq.com',
  'calendly.com',
]);

function isAllowedDestination(raw: string): boolean {
  try {
    const u = new URL(raw);
    if (u.protocol !== 'https:') return false;
    const host = u.hostname.toLowerCase();
    if (ALLOWED_REDIRECT_HOSTS.has(host)) return true;
    // allow any subdomain of our own apex domain
    return host === 'southerncitiesconstruction.com' || host.endsWith('.southerncitiesconstruction.com');
  } catch {
    return false;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = getServiceClient();
    const link = await getMarketingLinkBySlug(params.slug, supabase);

    if (!link) {
      return NextResponse.json({ error: 'Unknown tracked link' }, { status: 404 });
    }

    if (!isAllowedDestination(link.destination_url)) {
      console.error('blocked tracked-link redirect to disallowed destination:', link.slug);
      return NextResponse.json({ error: 'Destination not allowed' }, { status: 400 });
    }

    const forwardedFor = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null;
    await recordMarketingLinkClick(
      { id: link.id, slug: link.slug, click_count: Number(link.click_count || 0) },
      {
        referer: req.headers.get('referer'),
        userAgent: req.headers.get('user-agent'),
        ip: forwardedFor,
      },
      supabase
    );

    return NextResponse.redirect(link.destination_url, { status: 302 });
  } catch (err) {
    if (err instanceof SupabaseConfigError) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }
    console.error('tracked link redirect error:', err);
    return NextResponse.json({ error: 'Unable to process tracked link' }, { status: 500 });
  }
}
