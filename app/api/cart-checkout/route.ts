import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getCartLineItems, type CartSelection } from '@/lib/cart';

export const runtime = 'nodejs';

/**
 * Multi-item cart checkout. Takes the cart payload from /cart, builds one
 * Stripe Checkout session with one line_item per cart entry, enables
 * automatic_tax (Stripe Tax computes per billing address), and returns
 * the Stripe-hosted checkout URL. Stripe handles billing address, phone,
 * and email collection on its own page.
 *
 * Requires Stripe Tax to be enabled in the Stripe Dashboard. If it is not,
 * the session.create call will return an error and we surface it to the
 * client.
 */
export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  if (!stripeSecretKey) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });
  }

  let body: { cart?: CartSelection[]; isolated?: boolean; fromLp?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const cartItems = Array.isArray(body.cart) ? body.cart : [];
  const lineItems = getCartLineItems(cartItems);
  const isolated = body.isolated === true;
  const fromLp = typeof body.fromLp === 'string' && body.fromLp.length > 0 ? body.fromLp : null;

  if (!lineItems.length) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2026-03-25.dahlia',
  });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems.map((line) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: line.product.name,
            description: line.product.description.slice(0, 500),
            metadata: { product_key: line.key },
          },
          unit_amount: Math.round(line.amount / line.quantity),
          tax_behavior: 'exclusive',
        },
        quantity: line.quantity,
      })),
      automatic_tax: { enabled: true },
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      success_url: `${baseUrl}/portal?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      // Preserve the cart param on cancel so the customer returns to the
      // ISOLATED cart view (no main-site nav), not the global cart. Without
      // this param the cart page falls back to non-isolated chrome and
      // breaks the LP-funnel isolation we just plugged.
      cancel_url: `${baseUrl}/cart?cart=${encodeURIComponent(
        lineItems
          .map((line) =>
            line.quantity > 1 ? `${line.key}::${line.quantity}` : line.key
          )
          .join(',')
      )}${isolated ? '&lp=1' : ''}${fromLp ? `&from=${encodeURIComponent(fromLp)}` : ''}&checkout=cancelled`,
      metadata: {
        cart_keys: lineItems.map((l) => l.key).join(','),
        cart_summary: lineItems
          .map((l) => `${l.key}:${l.amount}:${l.quantity}`)
          .join(','),
        flow: 'multi-item-cart',
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Stripe did not return a checkout URL' }, { status: 502 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe checkout failed';
    const isTaxError = message.toLowerCase().includes('tax');
    console.error('cart-checkout error:', message);
    return NextResponse.json(
      {
        error: message,
        hint: isTaxError
          ? 'Stripe Tax must be enabled in your Stripe Dashboard at Settings > Tax. After enabling, retry checkout.'
          : undefined,
      },
      { status: 500 }
    );
  }
}
