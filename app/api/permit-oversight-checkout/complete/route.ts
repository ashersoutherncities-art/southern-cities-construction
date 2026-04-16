import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    if (!stripeSecretKey) {
      return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { session_id } = body;

    if (!session_id) {
      return NextResponse.json({ error: 'session_id is required' }, { status: 400 });
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2026-03-25.dahlia',
    });

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session || session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Checkout session is not paid' }, { status: 400 });
    }

    const orderRes = await fetch(`${baseUrl}/api/permit-oversight-orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        buyer_name: session.metadata?.buyer_name || session.customer_details?.name || '',
        buyer_email: session.metadata?.buyer_email || session.customer_details?.email || '',
        buyer_phone: session.metadata?.buyer_phone || session.customer_details?.phone || '',
        billing_address: session.metadata?.billing_address || '',
        project_address: session.metadata?.project_address || '',
        project_manager_role: session.metadata?.project_manager_role || '',
        project_manager_name: session.metadata?.project_manager_name || '',
        project_manager_email: session.metadata?.project_manager_email || '',
        project_manager_phone: session.metadata?.project_manager_phone || '',
        entity_type: session.metadata?.entity_type || '',
        project_timeline: session.metadata?.project_timeline || '',
        scope_notes: session.metadata?.scope_notes || '',
        payment_reference: session.id,
        amount_paid: typeof session.amount_total === 'number' ? session.amount_total / 100 : null,
      }),
    });

    const orderJson = await orderRes.json();

    if (!orderRes.ok) {
      return NextResponse.json({ error: orderJson.error || 'Failed to create order after checkout' }, { status: 500 });
    }

    return NextResponse.json({ success: true, order: orderJson.order, workflow: orderJson.workflow });
  } catch (error) {
    console.error('Permit oversight checkout completion error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
