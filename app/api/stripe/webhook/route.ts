import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  if (!stripeSecretKey || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe webhook is not configured' }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2026-03-25.dahlia',
  });

  const body = await req.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.metadata?.workflow === 'permit_oversight' && session.payment_status === 'paid') {
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

          if (!orderRes.ok) {
            const text = await orderRes.text();
            throw new Error(`Order finalization failed: ${text}`);
          }
        }
        break;
      }
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Stripe webhook handling error:', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
