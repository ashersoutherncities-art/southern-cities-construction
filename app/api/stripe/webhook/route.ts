import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CART_PRODUCTS } from '@/lib/cart';
import { sendOrderToGhl, tagMembershipInGhl } from '@/lib/ghl';
import {
  createOrder,
  findOrderByStripeSession,
  recordOrderEvent,
  updateOrder,
  type OrderRow,
} from '@/lib/orders';
import { tryGetServiceClient } from '@/lib/supabase';
import { isDealPackProduct, mirrorOrderToHub, mirrorRealtorReviewToHub, provisionDealPackPortal, reviewTypeForProduct } from '@/lib/hub-orders';
import {
  beginStripeWebhookEvent,
  markStripeWebhookEventProcessed,
  recordStripeWebhookEventError,
} from '@/lib/stripe-webhook-events';
import {
  deriveLineItemsFromSessionMetadata,
  upsertOrderLineItems,
  type OrderLineItemInput,
} from '@/lib/order-line-items';

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

  // Durable, concurrency-safe idempotency. Claim the event up front (row
  // with processed_at = NULL). Only at the very end — after every
  // fulfillment step returns — do we mark it processed. If the handler
  // throws, processed_at stays NULL and Stripe's retry can re-enter. This
  // replaces the earlier `order_events.stripe_event_id` dedup which was
  // written BEFORE fulfillment and poisoned the retry path.
  if (supabase) {
    const claim = await beginStripeWebhookEvent(supabase, { id: event.id, type: event.type });
    if (claim.status === 'already_processed') {
      return NextResponse.json({ received: true, deduped: true });
    }
    if (claim.status === 'in_progress') {
      // Another delivery is actively processing this event. Return 409 so
      // Stripe retries after its usual backoff instead of racing us.
      return NextResponse.json({ received: false, in_progress: true }, { status: 409 });
    }
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        let order: OrderRow | null = null;

        // Derive authoritative line items ONCE from session metadata — all
        // per-unit fulfillment below iterates these, not the deduped
        // `cart_keys` list. This is the fix for finding #8 (lost quantities).
        const lineItems: OrderLineItemInput[] = deriveLineItemsFromSessionMetadata(
          session.metadata as Record<string, string | null | undefined> | null
        );

        if (supabase) {
          order = await findOrderByStripeSession(session.id, supabase);

          // The multi-item cart checkout (/api/cart-checkout) never pre-creates
          // an order row the way permit-oversight-checkout does -- it has no
          // pre-payment identity form, so there's nothing to create until
          // Stripe hands back customer_details here. Create it now from the
          // session itself so Hub Orders, GHL, and order history all get a
          // real row instead of silently no-op'ing.
          if (!order && (lineItems.length > 0 || session.metadata?.cart_keys)) {
            const firstItem = lineItems[0];
            const firstKey = firstItem?.product_key ?? '';
            const firstProduct = firstKey ? (CART_PRODUCTS[firstKey] ?? null) : null;
            const productNames = lineItems
              .map((li) => (li.quantity > 1 ? `${li.quantity}× ${li.product_name ?? li.product_key}` : li.product_name ?? li.product_key))
              .filter(Boolean)
              .join(' + ');
            const billing = session.customer_details?.address;
            const billingAddress = billing
              ? [billing.line1, billing.line2, billing.city, billing.state, billing.postal_code].filter(Boolean).join(', ')
              : null;

            order = await createOrder(
              {
                workflow: session.metadata?.flow === 'deal-pack-pro-reorder' ? 'deal-pack-pro-reorder' : 'cart',
                product_key: firstKey,
                product_name: productNames || firstProduct?.name || 'Cart order',
                buyer_name: session.customer_details?.name || '',
                buyer_email: session.customer_details?.email || session.metadata?.member_email || '',
                buyer_phone: session.customer_details?.phone || null,
                billing_address: billingAddress,
                project_address: session.metadata?.project_address || null,
                amount_total_cents: typeof session.amount_total === 'number' ? session.amount_total : null,
                stripe_session_id: session.id,
                status: 'initiated',
                metadata: {
                  cart_keys: session.metadata?.cart_keys ?? '',
                  cart_summary: session.metadata?.cart_summary ?? '',
                  flow: session.metadata?.flow ?? null,
                },
              },
              supabase
            );
            if (order) {
              await recordOrderEvent(
                {
                  order_id: order.id,
                  event_type: 'order.created_from_webhook',
                  source: 'stripe_webhook',
                  message: 'Order row created from the completed session — cart-checkout has no pre-payment order to find.',
                  payload: { session_id: session.id },
                },
                supabase
              );
            }
          }

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
                payload: { session_id: session.id, payment_status: session.payment_status },
              },
              supabase
            );

            // Persist per-line-item records once per order. Idempotent — this
            // is a no-op if the order already has rows.
            if (lineItems.length > 0) {
              await upsertOrderLineItems(supabase, order.id, lineItems);
            }

            // Mirror the paid order into the Client Hub's orders table so it
            // shows in the client's Orders tab. Non-fatal, idempotent.
            if (session.payment_status === 'paid') {
              await mirrorOrderToHub({
                buyer_email: order.buyer_email,
                product_name: order.product_name,
                amount_total_cents: typeof session.amount_total === 'number' ? session.amount_total : order.amount_total_cents,
                stripe_session_id: session.id,
                order_id: order.id,
              });
            }
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
            headers: {
              'Content-Type': 'application/json',
              'x-internal-secret': process.env.INTERNAL_API_SECRET || '',
            },
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

        // Realtor Support Plan subscription — tag the membership in GHL so it
        // enters owned-product segmentation. Fire-and-forget.
        if (session.metadata?.realtor_plan) {
          try {
            await tagMembershipInGhl({
              email: session.customer_details?.email || '',
              name: session.customer_details?.name || '',
              productKey: `realtor-${session.metadata.realtor_plan}`,
              productName: `Realtor Support Plan — ${session.metadata.realtor_plan}`,
            });
          } catch (err) {
            console.error('GHL realtor-plan tag failed (non-fatal):', err);
          }
        }

        // Per-unit fulfillment. One iteration per unit purchased, not per
        // distinct product key — Deal Pack × 3 provisions the portal three
        // times, fires three GHL contact events, mirrors three reviews, etc.
        // This is the fix for finding #8.
        if (session.payment_status === 'paid' && lineItems.length > 0) {
          try {
            const buyerEmail =
              session.metadata?.buyer_email ||
              session.customer_details?.email ||
              session.metadata?.member_email ||
              '';
            const buyerName =
              session.metadata?.buyer_name || session.customer_details?.name || '';
            const buyerPhone =
              session.metadata?.buyer_phone || session.customer_details?.phone || '';
            const projectAddress = session.metadata?.project_address || '';
            const propertyAddress = session.metadata?.property_address || null;

            for (const line of lineItems) {
              for (let unitIdx = 0; unitIdx < line.quantity; unitIdx++) {
                const productKey = line.product_key;
                const product = CART_PRODUCTS[productKey] ?? null;

                if (isDealPackProduct(productKey)) {
                  await provisionDealPackPortal({
                    buyer_email: buyerEmail,
                    buyer_name: buyerName,
                    project_address: projectAddress,
                    product_key: productKey,
                    amount_total_cents: line.unit_amount_cents,
                    stripe_session_id: `${session.id}:${productKey}:${unitIdx + 1}`,
                  });
                }

                const reviewType = reviewTypeForProduct(productKey);
                if (reviewType) {
                  await mirrorRealtorReviewToHub({
                    buyer_email: buyerEmail,
                    buyer_name: buyerName,
                    review_type: reviewType,
                    property_address: projectAddress || propertyAddress,
                    stripe_session_id: `${session.id}:${productKey}:${unitIdx + 1}`,
                  });
                }

                const ghlResult = await sendOrderToGhl({
                  buyer_name: buyerName,
                  buyer_email: buyerEmail,
                  buyer_phone: buyerPhone,
                  product_key: productKey,
                  product_name: product?.name || line.product_name || '',
                  amount_paid: line.unit_amount_cents / 100,
                  project_address: projectAddress,
                  order_id: order ? String(order.id) : '',
                  stripe_session_id: session.id,
                  stripe_payment_intent_id:
                    typeof session.payment_intent === 'string'
                      ? session.payment_intent
                      : session.payment_intent?.id ?? null,
                  purchased_at: new Date().toISOString(),
                });

                if (supabase && order) {
                  await recordOrderEvent(
                    {
                      order_id: order.id,
                      event_type: ghlResult.ok ? 'ghl.contact.upserted' : 'ghl.forward.failed',
                      source: 'stripe_webhook',
                      message: ghlResult.ok
                        ? `Forwarded ${productKey} (unit ${unitIdx + 1}/${line.quantity}) to GHL with tag ${ghlResult.tag}`
                        : `GHL forward failed for ${productKey}: ${JSON.stringify(ghlResult.body).slice(0, 200)}`,
                      payload: {
                        contactId: ghlResult.contactId,
                        tag: ghlResult.tag,
                        status: ghlResult.status,
                        productKey,
                        unit: unitIdx + 1,
                        quantity: line.quantity,
                      },
                    },
                    supabase
                  );
                }

                if (!ghlResult.ok) {
                  console.error('GHL forward returned non-ok for', productKey, ':', ghlResult.status, ghlResult.body);
                }
              }
            }
          } catch (ghlErr) {
            console.error('Per-unit fulfillment threw (non-fatal):', ghlErr);
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

    // Commit idempotency: only reached if every handler step above returned
    // without throwing. If anything above threw, we skip this and Stripe's
    // next retry re-enters the handler.
    if (supabase) {
      await markStripeWebhookEventProcessed(supabase, event.id);
    }
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Stripe webhook handling error:', err);
    if (supabase) {
      await recordStripeWebhookEventError(supabase, event.id, err);
    }
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
