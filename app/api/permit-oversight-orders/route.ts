import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient, SupabaseConfigError } from '@/lib/supabase';
import {
  createOrder,
  findOrderByStripeSession,
  recordOrderEvent,
  updateOrder,
} from '@/lib/orders';

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
    let supabase;
    try {
      supabase = getServiceClient();
    } catch (err) {
      if (err instanceof SupabaseConfigError) {
        return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
      }
      throw err;
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
      stripe_customer_id,
      stripe_payment_intent_id,
      stripe_charge_id,
    } = body;

    if (!buyer_name || !buyer_email || !project_address || !project_manager_role) {
      return NextResponse.json(
        { error: 'Buyer name, buyer email, project address, and project manager role are required.' },
        { status: 400 }
      );
    }

    const stripeSessionId: string | null = payment_reference || null;

    if (stripeSessionId) {
      const { data: existing } = await supabase
        .from('permit_oversight_orders')
        .select('id, portal_path, portal_email, temporary_password, onboarding_status, contract_status, order_id')
        .eq('payment_reference', stripeSessionId)
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
    const amountCents =
      typeof amount_paid === 'number' ? Math.round(amount_paid * 100) : null;

    let canonicalOrder = stripeSessionId
      ? await findOrderByStripeSession(stripeSessionId, supabase)
      : null;

    if (!canonicalOrder) {
      canonicalOrder = await createOrder(
        {
          workflow: 'permit_oversight',
          product_key: 'flagship-permit-oversight',
          product_name: 'Permit Administration + Construction Oversight',
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
          amount_total_cents: amountCents,
          stripe_session_id: stripeSessionId,
          stripe_customer_id: stripe_customer_id || null,
          status: 'paid',
        },
        supabase
      );
    }

    if (canonicalOrder) {
      await updateOrder(
        canonicalOrder.id,
        {
          status: 'paid',
          payment_status: 'paid',
          paid_at: new Date().toISOString(),
          amount_total_cents: amountCents ?? canonicalOrder.amount_total_cents,
          stripe_payment_intent_id: stripe_payment_intent_id || null,
          stripe_charge_id: stripe_charge_id || null,
          stripe_customer_id: stripe_customer_id || canonicalOrder.stripe_customer_id,
        },
        supabase
      );
      await recordOrderEvent(
        {
          order_id: canonicalOrder.id,
          event_type: 'order.paid',
          source: 'permit_oversight_orders_api',
          message: 'Permit oversight onboarding record created',
          payload: { stripe_session_id: stripeSessionId },
        },
        supabase
      );
    }

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
      payment_reference: stripeSessionId,
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
      stripe_session_id: stripeSessionId,
      stripe_customer_id: stripe_customer_id || null,
      stripe_payment_intent_id: stripe_payment_intent_id || null,
      stripe_charge_id: stripe_charge_id || null,
      order_id: canonicalOrder?.id ?? null,
    };

    const { data, error } = await supabase
      .from('permit_oversight_orders')
      .insert(record)
      .select('id, portal_path, portal_email, temporary_password, onboarding_status, contract_status, order_id')
      .single();

    if (error) {
      console.error('permit_oversight_orders insert error:', error);
      return NextResponse.json({ error: 'Failed to create order record' }, { status: 500 });
    }

    if (canonicalOrder && data?.id) {
      await updateOrder(
        canonicalOrder.id,
        {
          related_table: 'permit_oversight_orders',
          related_id: data.id,
        },
        supabase
      );
    }

    try {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      if (botToken && chatId) {
        const text = `🔔 *New Permit Oversight Order*\n\n*Buyer:* ${buyer_name}\n*Email:* ${buyer_email}\n*Project Address:* ${project_address}\n*PM Role:* ${project_manager_role}\n*Payment Ref:* ${stripeSessionId || 'Not provided'}\n*Portal:* ${portalPath}\n*Contract:* pending signature\n\n_Orders inbox:_ orders@southerncitiesconstruction.com`;
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
      canonical_order_id: canonicalOrder?.id ?? null,
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
