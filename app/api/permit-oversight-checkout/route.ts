import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CART_PRODUCTS } from '@/lib/cart';
import { createOrder, recordOrderEvent, updateOrder } from '@/lib/orders';
import { tryGetServiceClient } from '@/lib/supabase';

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
}

export async function POST(request: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2026-03-25.dahlia',
    });

    const body = await request.json();
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
      item,
    } = body;

    if (!buyer_name || !buyer_email || !project_address || !project_manager_role) {
      return NextResponse.json(
        { error: 'Buyer name, buyer email, project address, and project manager role are required.' },
        { status: 400 }
      );
    }

    const selectedProduct = CART_PRODUCTS[item] ?? CART_PRODUCTS['flagship-permit-oversight'];
    const unitAmount = selectedProduct.price;
    const workflow =
      selectedProduct.key === 'flagship-permit-oversight' || selectedProduct.key === 'permit-management-service'
        ? 'permit_oversight'
        : 'general';

    const supabase = tryGetServiceClient();
    const initialOrder = supabase
      ? await createOrder(
          {
            workflow,
            product_key: selectedProduct.key,
            product_name: selectedProduct.name,
            product_description: selectedProduct.description,
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
            amount_total_cents: unitAmount,
            status: 'initiated',
          },
          supabase
        )
      : null;

    if (initialOrder && supabase) {
      await recordOrderEvent(
        {
          order_id: initialOrder.id,
          event_type: 'order.initiated',
          source: 'checkout_api',
          message: `Checkout started for ${selectedProduct.name}`,
        },
        supabase
      );
    }

    const customers = await stripe.customers.list({ email: buyer_email, limit: 1 });
    let customerId = customers.data[0]?.id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: buyer_email,
        name: buyer_name,
        phone: buyer_phone,
        address: billing_address
          ? {
              line1: billing_address,
            }
          : undefined,
        metadata: {
          service: 'permit_oversight',
          project_address,
        },
      });
      customerId = customer.id;
    }

    const baseUrl = getBaseUrl();
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedProduct.name,
              description: selectedProduct.description,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/portal?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/portal?checkout=cancelled`,
      metadata: {
        workflow,
        item: selectedProduct.key,
        order_id: initialOrder ? String(initialOrder.id) : '',
        buyer_name,
        buyer_email,
        buyer_phone: buyer_phone || '',
        billing_address: billing_address || '',
        project_address,
        project_manager_role,
        project_manager_name: project_manager_name || '',
        project_manager_email: project_manager_email || '',
        project_manager_phone: project_manager_phone || '',
        entity_type: entity_type || '',
        project_timeline: project_timeline || '',
        scope_notes: scope_notes || '',
      },
    });

    if (initialOrder && supabase) {
      await updateOrder(
        initialOrder.id,
        {
          stripe_session_id: session.id,
          stripe_customer_id: customerId,
        },
        supabase
      );
      await recordOrderEvent(
        {
          order_id: initialOrder.id,
          event_type: 'stripe.session.created',
          source: 'checkout_api',
          message: `Stripe checkout session created (${session.id})`,
          payload: { session_id: session.id, customer_id: customerId },
        },
        supabase
      );
    }

    return NextResponse.json({ sessionId: session.id, url: session.url, order_id: initialOrder?.id ?? null });
  } catch (error) {
    console.error('Permit oversight checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
