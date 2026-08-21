import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient, SupabaseConfigError } from '@/lib/supabase';
import { sendInquiryToGhl } from '@/lib/ghl';

const requestLog = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

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
    const { name, email, phone, audience_type, service, service_price, message, company, website, source, honey } = body;
    // Accept either spelling: site forms have shipped with both. A mismatch here is
    // invisible (the value just reads undefined) and silently tags a contact who DID
    // opt in as sms-consent-no, so never narrow this to a single key.
    const smsConsent = body.smsConsent === true || body.sms_consent === true;

    const normalizedAudienceType = audience_type || null;
    const normalizedService = service || null;

    if (honey) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const { error } = await supabase.from('service_inquiries').insert({
      name,
      email,
      phone: phone || null,
      audience_type: normalizedAudienceType,
      service: normalizedService,
      message: message || null,
      status: 'new',
      company: company || null,
      website: website || null,
      source: source || null,
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 });
    }

    // Send Telegram notification to Darius
    try {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      if (botToken && chatId) {
        const text = `🔔 *New Service Inquiry*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone || 'Not provided'}\n*Type:* ${normalizedAudienceType || 'Not specified'}\n*Service:* ${normalizedService || 'Not specified'}${message ? `\n*Message:* ${message}` : ''}\n\n_Reply to:_ ${email}`;
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
        });
      }
    } catch (notifyErr) {
      console.error('Telegram notification failed:', notifyErr);
    }

    // Forward to GHL as a contact upsert + inquiry tag. Fire-and-forget so
    // GHL downtime never breaks the lead capture pipeline. The
    // inquiry-<service-slug> tag fires the GHL workflow for that product's
    // lead nurture (confirmation email, internal alert, follow-up sequence).
    if (normalizedService) {
      try {
        const ghlResult = await sendInquiryToGhl({
          buyer_name: name,
          buyer_email: email,
          buyer_phone: phone || undefined,
          service_slug: normalizedService,
          service_name: normalizedService,
          service_price: typeof service_price === 'string' && service_price.trim() ? service_price.trim() : undefined,
          message: message || undefined,
          company: company || undefined,
          source: source || 'inquiry-form',
          audience_type: normalizedAudienceType || undefined,
          sms_consent: smsConsent === true,
        });
        if (!ghlResult.ok) {
          console.error('GHL inquiry forward non-ok:', ghlResult.status, ghlResult.body);
        }
      } catch (ghlErr) {
        console.error('GHL inquiry forward threw (non-fatal):', ghlErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
