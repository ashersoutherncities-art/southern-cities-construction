import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  findOrderByStripeSession,
  recordOrderEvent,
  updateOrder,
} from '@/lib/orders';
import { tryGetServiceClient } from '@/lib/supabase';

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

  const supabase = tryGetServiceClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (supabase) {
          const order = await findOrderByStripeSession(session.id, supabase);
          if (order) {
            const stripeCustomerId = typeof session.customer === 'string' ? session.customer : session.customer?.id ?? null;
            const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id ?? null;
            await updateOrder(
              order.id,
              {
                status: session.payment_status === 'paid' ? 'paid' : order.status,
                payment_status: session.payment_status,
                paid_at: session.payment_status === 'paid' ? (order.paid_at ?? new Date().toISOString()) : order.paid_at,
                amount_total_cents: typeof session.amount_total === 'number' ? session.amount_total : order.amount_total_cents,
                stripe_customer_id: stripeCustomerId ?? order.stripe_customer_id,
                stripe_payment_intent_id: paymentIntentId ?? order.stripe_payment_intent_id,
              },
              supabase
            );
            await recordOrderEvent(
              {
                order_id: order.id,
                event_type: 'stripe.checkout.session.completed',
                source: 'stripe_webhook',
                stripe_event_id: event.id,
                payload: { session_id: session.id, payment_status: session.payment_status },
              },
              supabase
            );
          }
        }

        if (session.metadata?.workflow === 'permit_oversight' && session.payment_status === 'paid') {
          const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
            expand: ['payment_intent', 'payment_intent.latest_charge'],
          });
          const paymentIntent = (fullSession.payment_intent && typeof fullSession.payment_intent !== 'string')
            ? (fullSession.payment_intent as Stripe.PaymentIntent)
            : null;
          const charge = paymentIntent?.latest_charge && typeof paymentIntent.latest_charge !== 'string'
            ? (paymentIntent.latest_charge as Stripe.Charge)
            : null;
          const stripeCustomerId = typeof fullSession.customer === 'string' ? fullSession.customer : fullSession.customer?.id ?? null;

          const orderRes = await fetch(`${baseUrl}/api/permit-oversight-orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              buyer_name: fullSession.metadata?.buyer_name || fullSession.customer_details?.name || '',
              buyer_email: fullSession.metadata?.buyer_email || fullSession.customer_details?.email || '',
              buyer_phone: fullSession.metadata?.buyer_phone || fullSession.customer_details?.phone || '',
              billing_address: fullSession.metadata?.billing_address || '',
              project_address: fullSession.metadata?.project_address || '',
              project_manager_role: fullSession.metadata?.project_manager_role || '',
              project_manager_name: fullSession.metadata?.project_manager_name || '',
              project_manager_email: fullSession.metadata?.project_manager_email || '',
              project_manager_phone: fullSession.metadata?.project_manager_phone || '',
              entity_type: fullSession.metadata?.entity_type || '',
              project_timeline: fullSession.metadata?.project_timeline || '',
              scope_notes: fullSession.metadata?.scope_notes || '',
              payment_reference: fullSession.id,
              amount_paid: typeof fullSession.amount_total === 'number' ? fullSession.amount_total / 100 : null,
              stripe_customer_id: stripeCustomerId,
              stripe_payment_intent_id: paymentIntent?.id ?? null,
              stripe_charge_id: charge?.id ?? null,
            }),
          });

          if (!orderRes.ok) {
            const text = await orderRes.text();
            throw new Error(`Order finalization failed: ${text}`);
          }
        }
        break;
      }
      case 'checkout.session.expired':
      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (supabase) {
          const order = await findOrderByStripeSession(session.id, supabase);
          if (order) {
            await updateOrder(
              order.id,
              {
                status: event.type === 'checkout.session.expired' ? 'cancelled' : 'failed',
                payment_status: session.payment_status,
                cancelled_at: event.type === 'checkout.session.expired' ? new Date().toISOString() : order.cancelled_at,
              },
              supabase
            );
            await recordOrderEvent(
              {
                order_id: order.id,
                event_type: `stripe.${event.type}`,
                source: 'stripe_webhook',
                stripe_event_id: event.id,
                payload: { session_id: session.id },
              },
              supabase
            );
          }
        }
        break;
      }
      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        if (supabase) {
          const intentId = typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id;
          if (intentId) {
            const { data: order } = await supabase
              .from('orders')
              .select('*')
              .eq('stripe_payment_intent_id', intentId)
              .maybeSingle();
            if (order) {
              await updateOrder(
                order.id as number,
                {
                  status: charge.amount_refunded === charge.amount ? 'refunded' : 'partially_refunded',
                  refunded_at: new Date().toISOString(),
                  stripe_charge_id: charge.id,
                },
                supabase
              );
              await recordOrderEvent(
                {
                  order_id: order.id as number,
                  event_type: 'stripe.charge.refunded',
                  source: 'stripe_webhook',
                  stripe_event_id: event.id,
                  message: `Refunded ${charge.amount_refunded} of ${charge.amount} ${charge.currency}`,
                  payload: { charge_id: charge.id, amount_refunded: charge.amount_refunded },
                },
                supabase
              );
            }
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
