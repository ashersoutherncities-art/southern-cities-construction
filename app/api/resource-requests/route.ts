import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient, SupabaseConfigError } from '@/lib/supabase';
import { getResourceBySlug } from '@/lib/resources';
import { sendLeadMagnetToGhl } from '@/lib/ghl';

const requestLog = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 6;

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    let supabase;
    try {
      supabase = getServiceClient();
    } catch (err) {
      if (err instanceof SupabaseConfigError) {
        return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
      }
      throw err;
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });
    }

    const body = await req.json();
    const { resource_slug, name, email, phone, company, role, message, honey } = body;

    if (honey) {
      return NextResponse.json({ success: true });
    }

    if (!resource_slug || !name || !email) {
      return NextResponse.json(
        { error: 'resource_slug, name, and email are required.' },
        { status: 400 }
      );
    }

    const resource = getResourceBySlug(resource_slug);
    if (!resource) {
      return NextResponse.json({ error: 'Unknown resource' }, { status: 400 });
    }

    const { error } = await supabase.from('resource_requests').insert({
      resource_slug: resource.slug,
      resource_title: resource.title,
      resource_kind: resource.kind,
      resource_format: resource.format || null,
      resource_price: resource.price || null,
      name,
      email,
      phone: phone || null,
      company: company || null,
      role: role || null,
      message: message || null,
      fulfillment_status: 'pending_send',
      delivery_email: 'orders@southerncitiesconstruction.com',
    });

    if (error) {
      console.error('resource_requests insert error:', error);
      return NextResponse.json({ error: 'Failed to save resource request' }, { status: 500 });
    }

    // For lead magnets, push the capture to GHL so the contact gets tagged
    // (`lead-magnet-<slug>` + `lead-inquiry`) and the catch-all Lead Inquiry
    // workflow fires automatically (welcome email + internal SMS).
    if (resource.leadMagnet) {
      try {
        const ghlResult = await sendLeadMagnetToGhl({
          buyer_name: name,
          buyer_email: email,
          buyer_phone: phone,
          resource_slug: resource.slug,
          resource_title: resource.title,
          company: company || undefined,
          role: role || undefined,
        });
        if (!ghlResult.ok) {
          console.error('GHL lead-magnet forwarding failed:', ghlResult);
        }
      } catch (ghlErr) {
        console.error('GHL lead-magnet forwarding error:', ghlErr);
      }
    }

    try {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      if (botToken && chatId) {
        const kindLabel = resource.kind === 'paid' ? 'Purchase request' : 'Free download request';
        const text = `📚 *New Resource ${resource.kind === 'paid' ? 'Purchase' : 'Download'}*\n\n*Resource:* ${resource.title}${resource.price ? ` (${resource.price})` : ''}\n*Type:* ${kindLabel}\n*Name:* ${name}\n*Email:* ${email}${phone ? `\n*Phone:* ${phone}` : ''}${company ? `\n*Company:* ${company}` : ''}${role ? `\n*Role:* ${role}` : ''}${message ? `\n*Notes:* ${message}` : ''}\n\n_Reply to:_ ${email}`;
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
        });
      }
    } catch (notifyErr) {
      console.error('Telegram notification failed:', notifyErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('resource-requests API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
