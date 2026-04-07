import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8790493688:AAFGItngLHo7b5bUSDJNzg87Zng276X0kSs';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '8753570909';

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const body = await req.json();

    const {
      service_type,
      realtor_name,
      email,
      phone,
      brokerage,
      property_address,
      listing_date,
      closing_date,
      client_name,
      scope_items,
      budget_range,
      inspection_items,
      priority,
      notes,
    } = body;

    if (!service_type || !realtor_name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error: dbError } = await supabase.from('realtor_inquiries').insert({
      service_type,
      realtor_name,
      email,
      phone: phone || null,
      brokerage: brokerage || null,
      property_address: property_address || null,
      listing_date: listing_date || null,
      closing_date: closing_date || null,
      client_name: client_name || null,
      scope_items: scope_items || null,
      budget_range: budget_range || null,
      inspection_items: inspection_items || null,
      priority: priority || 'standard',
      notes: notes || null,
      status: 'new',
    });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 });
    }

    // Send Telegram notification
    try {
      const isUrgent = priority === 'urgent' || priority === 'emergency';
      const prefix = isUrgent ? '🚨 *URGENT* ' : '🏘️ ';
      const serviceLabel = service_type === 'pre_listing' ? 'Pre-Listing Renovation' : 'Inspection Response';

      let text = `${prefix}*New Realtor Inquiry — ${serviceLabel}*\n\n`;
      text += `*Realtor:* ${realtor_name}\n`;
      text += `*Email:* ${email}\n`;
      if (phone) text += `*Phone:* ${phone}\n`;
      if (brokerage) text += `*Brokerage:* ${brokerage}\n`;
      if (property_address) text += `*Property:* ${property_address}\n`;

      if (service_type === 'pre_listing') {
        if (listing_date) text += `*Listing Date:* ${listing_date}\n`;
        if (scope_items?.length) text += `*Scope:* ${scope_items.join(', ')}\n`;
        if (budget_range) text += `*Budget:* ${budget_range}\n`;
        if (notes) text += `*Notes:* ${notes}\n`;
      } else {
        if (client_name) text += `*Buyer:* ${client_name}\n`;
        if (closing_date) text += `*Closing Date:* ${closing_date}\n`;
        if (priority) text += `*Priority:* ${priority.charAt(0).toUpperCase() + priority.slice(1)}\n`;
        if (inspection_items) text += `*Inspection Items:*\n${inspection_items}\n`;
      }

      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'Markdown',
        }),
      });
    } catch (notifyErr) {
      console.error('Telegram notification failed:', notifyErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
