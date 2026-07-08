import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient, SupabaseConfigError } from '@/lib/supabase';

export const runtime = 'nodejs';

const DOC_SLOTS: { field: string; label: string }[] = [
  { field: 'license_doc', label: 'Contractor license' },
  { field: 'coi_doc', label: 'Certificate of insurance' },
  { field: 'w9_doc', label: 'W-9' },
];
const MAX_BYTES = 15 * 1024 * 1024; // 15MB per file
const OK_TYPES = /pdf|jpe?g|png|heic|webp/i;
const safe = (s: string) => s.replace(/[^a-z0-9.\-_]+/gi, '_').slice(0, 80);

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

    // Accept multipart (fields JSON in `payload` + optional files) OR legacy JSON.
    let body: Record<string, unknown> = {};
    const files: { field: string; label: string; file: File }[] = [];
    const ctype = req.headers.get('content-type') || '';
    if (ctype.includes('multipart/form-data')) {
      const form = await req.formData();
      const payload = form.get('payload');
      body = payload ? JSON.parse(String(payload)) : {};
      for (const slot of DOC_SLOTS) {
        const f = form.get(slot.field);
        if (f && f instanceof File && f.size > 0) files.push({ ...slot, file: f });
      }
    } else {
      body = await req.json();
    }

    const {
      company_name, contact_name, email, phone, website, trade, years_in_business,
      service_area, crew_size, license_type, license_number, license_state,
      insurance_carrier, insurance_limits, workers_comp, referral_source,
      project_samples, project_types, rate_notes, references_text, availability,
      notes, agreed_to_standards,
    } = body as Record<string, unknown>;

    if (!company_name || !contact_name || !email || !trade) {
      return NextResponse.json({ error: 'Company, contact name, email, and trade are required.' }, { status: 400 });
    }
    if (!agreed_to_standards) {
      return NextResponse.json({ error: 'Partner standards acknowledgement is required.' }, { status: 400 });
    }

    const projectTypesValue = Array.isArray(project_types) ? project_types : null;

    const { data: inserted, error: dbError } = await supabase
      .from('subcontractor_applications')
      .insert({
        company_name, contact_name, email,
        phone: phone || null, website: website || null, trade,
        years_in_business: years_in_business || null, service_area: service_area || null,
        crew_size: crew_size || null, license_type: license_type || null,
        license_number: license_number || null, license_state: license_state || null,
        insurance_carrier: insurance_carrier || null, insurance_limits: insurance_limits || null,
        workers_comp: workers_comp || null, referral_source: referral_source || null,
        project_samples: project_samples || null, project_types: projectTypesValue,
        rate_notes: rate_notes || null, references_text: references_text || null,
        availability: availability || null, notes: notes || null, status: 'new',
      })
      .select('id')
      .single();

    if (dbError || !inserted) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Failed to save application' }, { status: 500 });
    }
    const id = inserted.id as number;

    // Upload any documents into the private bucket under this application's id.
    const documents: { label: string; path: string; name: string; type: string }[] = [];
    for (const { file, label } of files) {
      if (file.size > MAX_BYTES || !OK_TYPES.test(file.type || file.name)) continue;
      const path = `${id}/${safe(label)}-${safe(file.name)}`;
      const bytes = new Uint8Array(await file.arrayBuffer());
      const { error: upErr } = await supabase.storage
        .from('subcontractor-docs')
        .upload(path, bytes, { contentType: file.type || 'application/octet-stream', upsert: true });
      if (!upErr) documents.push({ label, path, name: file.name, type: file.type || '' });
      else console.error('Doc upload failed:', label, upErr.message);
    }
    if (documents.length) {
      await supabase.from('subcontractor_applications').update({ documents }).eq('id', id);
    }

    try {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      if (botToken && chatId) {
        let text = `🔨 *New Subcontractor Partner Application*\n\n`;
        text += `*Company:* ${company_name}\n*Contact:* ${contact_name}\n*Trade:* ${trade}\n*Email:* ${email}\n`;
        if (phone) text += `*Phone:* ${phone}\n`;
        if (service_area) text += `*Service Area:* ${service_area}\n`;
        if (license_type || license_number) text += `*License:* ${license_type || ''} ${license_number || ''} ${license_state ? `(${license_state})` : ''}\n`;
        if (insurance_carrier) text += `*Insurance:* ${insurance_carrier}${insurance_limits ? ` — ${insurance_limits}` : ''}\n`;
        text += `*Documents:* ${documents.length ? documents.map((d) => d.label).join(', ') : 'none uploaded'}\n`;
        text += `\nReview in the platform → Vendor Partners.\n_Reply to:_ ${email}`;
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
