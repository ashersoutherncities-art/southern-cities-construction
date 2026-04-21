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

    const {
      company_name,
      contact_name,
      email,
      phone,
      website,
      trade,
      years_in_business,
      service_area,
      crew_size,
      license_type,
      license_number,
      license_state,
      insurance_carrier,
      insurance_limits,
      workers_comp,
      referral_source,
      project_samples,
      project_types,
      rate_notes,
      references_text,
      availability,
      notes,
      agreed_to_standards,
    } = body;

    if (!company_name || !contact_name || !email || !trade) {
      return NextResponse.json(
        { error: 'Company, contact name, email, and trade are required.' },
        { status: 400 }
      );
    }

    if (!agreed_to_standards) {
      return NextResponse.json(
        { error: 'Partner standards acknowledgement is required.' },
        { status: 400 }
      );
    }

    const projectTypesValue = Array.isArray(project_types) ? project_types : null;

    const { error: dbError } = await supabase.from('subcontractor_applications').insert({
      company_name,
      contact_name,
      email,
      phone: phone || null,
      website: website || null,
      trade,
      years_in_business: years_in_business || null,
      service_area: service_area || null,
      crew_size: crew_size || null,
      license_type: license_type || null,
      license_number: license_number || null,
      license_state: license_state || null,
      insurance_carrier: insurance_carrier || null,
      insurance_limits: insurance_limits || null,
      workers_comp: workers_comp || null,
      referral_source: referral_source || null,
      project_samples: project_samples || null,
      project_types: projectTypesValue,
      rate_notes: rate_notes || null,
      references_text: references_text || null,
      availability: availability || null,
      notes: notes || null,
      status: 'new',
    });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Failed to save application' }, { status: 500 });
    }

    try {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      if (botToken && chatId) {
        let text = `🔨 *New Subcontractor Partner Application*\n\n`;
        text += `*Company:* ${company_name}\n`;
        text += `*Contact:* ${contact_name}\n`;
        text += `*Trade:* ${trade}\n`;
        text += `*Email:* ${email}\n`;
        if (phone) text += `*Phone:* ${phone}\n`;
        if (website) text += `*Website:* ${website}\n`;
        if (service_area) text += `*Service Area:* ${service_area}\n`;
        if (years_in_business) text += `*Years in Business:* ${years_in_business}\n`;
        if (crew_size) text += `*Crew Size:* ${crew_size}\n`;
        if (license_type || license_number) {
          text += `*License:* ${license_type || ''} ${license_number || ''} ${license_state ? `(${license_state})` : ''}\n`;
        }
        if (insurance_carrier) text += `*Insurance:* ${insurance_carrier}`;
        if (insurance_limits) text += ` — ${insurance_limits}`;
        if (insurance_carrier || insurance_limits) text += '\n';
        if (workers_comp) text += `*Workers Comp:* ${workers_comp}\n`;
        if (projectTypesValue?.length) text += `*Project Types:* ${projectTypesValue.join(', ')}\n`;
        if (availability) text += `*Availability:* ${availability}\n`;
        if (rate_notes) text += `*Rate Notes:* ${rate_notes}\n`;
        if (references_text) text += `*References:*\n${references_text}\n`;
        if (project_samples) text += `*Project Samples:* ${project_samples}\n`;
        if (referral_source) text += `*Referred By:* ${referral_source}\n`;
        if (notes) text += `\n*Notes:* ${notes}\n`;
        text += `\n_Reply to:_ ${email}`;

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
    console.error('Subcontractor application error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
