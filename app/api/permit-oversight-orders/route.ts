import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function generateTemporaryPassword(length = 14) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

function buildOrderSummary(body: Record<string, unknown>) {
  return [
    `Service: ${body.service_name || 'Permit Administration + Construction Oversight'}`,
    `Purchaser: ${body.buyer_name || 'Not provided'}`,
    `Buyer Email: ${body.buyer_email || 'Not provided'}`,
    `Buyer Phone: ${body.buyer_phone || 'Not provided'}`,
    `Billing Address: ${body.billing_address || 'Not provided'}`,
    `Project Address: ${body.project_address || 'Not provided'}`,
    `Project Manager Role: ${body.project_manager_role || 'Not provided'}`,
    `Project Manager Name: ${body.project_manager_name || 'Not provided'}`,
    `Project Manager Email: ${body.project_manager_email || 'Not provided'}`,
    `Project Manager Phone: ${body.project_manager_phone || 'Not provided'}`,
    `Entity / Ownership Type: ${body.entity_type || 'Not provided'}`,
    `Estimated Timeline: ${body.project_timeline || 'Not provided'}`,
    `Scope Notes: ${body.scope_notes || 'Not provided'}`,
  ].join('\n');
}

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    const body = await req.json();
    const {
      buyer_name,
      buyer_email,
      buyer_phone,
      billing_address,
      project_address,
      project_manager_role,
      project_manager_name,
      project_manager_email,
      project_manager_phone,
      entity_type,
      project_timeline,
      scope_notes,
      payment_reference,
      amount_paid,
    } = body;

    if (!buyer_name || !buyer_email || !project_address || !project_manager_role) {
      return NextResponse.json(
        { error: 'Buyer name, buyer email, project address, and project manager role are required.' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    if (payment_reference) {
      const { data: existing } = await supabase
        .from('permit_oversight_orders')
        .select('id, portal_path, portal_email, temporary_password, onboarding_status, contract_status')
        .eq('payment_reference', payment_reference)
        .maybeSingle();

      if (existing) {
        return NextResponse.json({
          success: true,
          order: existing,
          workflow: {
            receipt_email_from: 'orders@southerncitiesconstruction.com',
            invoice_status: 'pending_generation',
            esign_status: 'pending_provider_setup',
            portal_login_ready: true,
          },
          deduped: true,
        });
      }
    }

    const tempPassword = generateTemporaryPassword();
    const portalPath = `/portal/${crypto.randomUUID()}`;

    const record = {
      buyer_name,
      buyer_email,
      buyer_phone: buyer_phone || null,
      billing_address: billing_address || null,
      project_address,
      project_manager_role,
      project_manager_name: project_manager_name || null,
      project_manager_email: project_manager_email || null,
      project_manager_phone: project_manager_phone || null,
      entity_type: entity_type || null,
      project_timeline: project_timeline || null,
      scope_notes: scope_notes || null,
      service_name: 'Permit Administration + Construction Oversight',
      payment_status: 'paid',
      payment_reference: payment_reference || null,
      amount_paid: amount_paid || null,
      onboarding_status: 'awaiting_contract_signature',
      contract_status: 'pending_signature',
      portal_path: portalPath,
      portal_email: buyer_email,
      temporary_password: tempPassword,
      receipt_email_from: 'orders@southerncitiesconstruction.com',
      receipt_status: 'pending_provider_setup',
      invoice_status: 'pending_generation',
      esign_provider: 'pending_selection',
      esign_status: 'pending_provider_setup',
      internal_summary: buildOrderSummary(body),
    };

    const { data, error } = await supabase
      .from('permit_oversight_orders')
      .insert(record)
      .select('id, portal_path, portal_email, temporary_password, onboarding_status, contract_status')
      .single();

    if (error) {
      console.error('permit_oversight_orders insert error:', error);
      return NextResponse.json({ error: 'Failed to create order record' }, { status: 500 });
    }

    try {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      if (botToken && chatId) {
        const text = `🔔 *New Permit Oversight Order*\n\n*Buyer:* ${buyer_name}\n*Email:* ${buyer_email}\n*Project Address:* ${project_address}\n*PM Role:* ${project_manager_role}\n*Payment Ref:* ${payment_reference || 'Not provided'}\n*Portal:* ${portalPath}\n*Contract:* pending signature\n\n_Orders inbox:_ orders@southerncitiesconstruction.com`;
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
        });
      }
    } catch (notifyErr) {
      console.error('Telegram notification failed:', notifyErr);
    }

    return NextResponse.json({
      success: true,
      order: data,
      workflow: {
        receipt_email_from: 'orders@southerncitiesconstruction.com',
        invoice_status: 'pending_generation',
        esign_status: 'pending_provider_setup',
        portal_login_ready: true,
      },
      next_steps: [
        'Send payment confirmation from orders@southerncitiesconstruction.com',
        'Generate invoice / receipt PDF',
        'Provision portal credentials',
        'Load contract and supporting documents for signature',
      ],
    });
  } catch (err) {
    console.error('permit oversight order API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
