import { NextResponse } from 'next/server';

import { sendLm1Step1ToGhl } from '@/lib/ghl';

export const runtime = 'nodejs';

type LeadCaptureBody = {
  first_name?: unknown;
  last_name?: unknown;
  email?: unknown;
  phone?: unknown;
  company_name?: unknown;
  investor_type?: unknown;
  honey?: unknown;
};

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(req: Request) {
  let body: LeadCaptureBody;
  try {
    body = (await req.json()) as LeadCaptureBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  // Honeypot
  if (asString(body.honey)) {
    return NextResponse.json({ ok: true });
  }

  const first_name = asString(body.first_name);
  const last_name = asString(body.last_name);
  const email = asString(body.email);
  const phone = asString(body.phone);
  const company_name = asString(body.company_name);
  const investor_type = asString(body.investor_type) || 'flipper';

  if (!first_name || !last_name || !email) {
    return NextResponse.json(
      { error: 'first_name, last_name, and email are required.' },
      { status: 400 }
    );
  }

  // Fire-and-forget to GHL. Don't block the wizard flow.
  const ghlResult = await sendLm1Step1ToGhl({
    first_name,
    last_name,
    email,
    phone: phone || undefined,
    company_name: company_name || null,
    investor_type,
  });

  return NextResponse.json({
    ok: true,
    ghl: ghlResult.ok ? { contactId: ghlResult.contactId } : { skipped: true },
  });
}
