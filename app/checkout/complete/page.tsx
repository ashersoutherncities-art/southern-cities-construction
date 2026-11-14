import Link from 'next/link';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Checkout confirmation | Southern Cities Construction',
  robots: { index: false, follow: false },
};

export default async function CheckoutComplete({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string | string[] }>;
}) {
  const { session_id } = await searchParams;
  let session: Stripe.Checkout.Session | null = null;
  if (
    typeof session_id === 'string' &&
    session_id.startsWith('cs_') &&
    process.env.STRIPE_SECRET_KEY
  ) {
    try {
      session = await new Stripe(
        process.env.STRIPE_SECRET_KEY
      ).checkout.sessions.retrieve(session_id, {
        expand: ['payment_intent.latest_charge'],
      });
    } catch {
      /* An invalid or unavailable session must not show a paid receipt. */
    }
  }
  const paid = session?.payment_status === 'paid';
  const intent = session?.payment_intent;
  const charge =
    intent && typeof intent !== 'string' ? intent.latest_charge : null;
  const refunded =
    charge && typeof charge !== 'string' ? charge.amount_refunded : 0;
  const fullyRefunded =
    !!refunded &&
    charge &&
    typeof charge !== 'string' &&
    refunded === charge.amount;
  const title = fullyRefunded
    ? 'Payment refunded'
    : refunded
      ? 'Payment partially refunded'
      : paid
        ? 'Payment received'
        : session
          ? 'Payment pending'
          : 'Unable to verify payment';
  const hub =
    process.env.HUB_BASE_URL ||
    'https://clients.southerncitiesconstruction.com';
  return (
    <main className="min-h-screen bg-cream px-6 py-16 text-navy-900">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-elev-1">
        <Link href="/" className="text-sm font-semibold">
          Southern Cities Construction
        </Link>
        <h1 className="mt-8 text-3xl font-semibold">{title}</h1>
        <p className="mt-4 text-ink/70">
          {fullyRefunded
            ? 'This payment has been refunded. Contact our team if you have questions about the order.'
            : paid
              ? 'Thank you. Your order is being prepared. For a Deal Pack purchase, check your email for portal access and project updates.'
              : session
                ? 'Your payment has not completed. No paid confirmation has been issued. You can return to your cart or contact us for help.'
                : 'We could not confirm this checkout. Contact orders@southerncitiesconstruction.com if you need help with a payment.'}
        </p>
        {paid && session?.amount_total != null && (
          <p className="mt-6 text-2xl font-semibold">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: session.currency || 'usd',
            }).format(session.amount_total / 100)}
          </p>
        )}
        {!!refunded && (
          <p className="mt-2 text-ink/70">
            Refunded:{' '}
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: session?.currency || 'usd',
            }).format(refunded / 100)}
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-4">
          {paid && (
            <a
              href={hub}
              className="rounded-xl bg-orange px-5 py-3 font-semibold text-white"
            >
              Open Client Hub
            </a>
          )}
          <Link
            href="/cart"
            className="rounded-xl border border-navy/20 px-5 py-3 font-semibold"
          >
            Return to cart
          </Link>
        </div>
        <p className="mt-8 text-sm text-ink/60">
          Questions?{' '}
          <a
            href="mailto:orders@southerncitiesconstruction.com"
            className="underline"
          >
            Contact our team
          </a>
          .
        </p>
      </div>
    </main>
  );
}
