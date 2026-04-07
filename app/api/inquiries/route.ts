import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();
    const { name, email, phone, audience_type, service, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const { error } = await supabase.from('service_inquiries').insert({
      name,
      email,
      phone: phone || null,
      audience_type: audience_type || null,
      service: service || null,
      message: message || null,
      status: 'new',
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
        const text = `🔔 *New Service Inquiry*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone || 'Not provided'}\n*Type:* ${audience_type || 'Not specified'}\n*Service:* ${service || 'Not specified'}${message ? `\n*Message:* ${message}` : ''}\n\n_Reply to:_ ${email}`;
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
    console.error('API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
