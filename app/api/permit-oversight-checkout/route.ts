import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CART_PRODUCTS } from '@/lib/cart';

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
        workflow: 'permit_oversight',
        item: selectedProduct.key,
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

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Permit oversight checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
