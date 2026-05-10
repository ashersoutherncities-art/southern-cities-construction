import { NextRequest, NextResponse } from 'next/server';
import { getMarketingLinkBySlug, recordMarketingLinkClick } from '@/lib/marketing';
import { getServiceClient, SupabaseConfigError } from '@/lib/supabase';

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
