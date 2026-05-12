'use client';

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { buildCartHref, CART_QUERY_KEY, formatPrice, getCartLineItems, parseCartParam, type CartSelection } from '@/lib/cart';
import { getCartParamFromCookie, setCartParamCookie } from '@/lib/cart-client';

const CART_SYNC_EVENT = 'scc:cart-sync';

function CartPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryCart = searchParams.get(CART_QUERY_KEY);
  const cancelled = searchParams.get('checkout') === 'cancelled';
  const [cookieCart, setCookieCart] = useState('');
  const [items, setItems] = useState<CartSelection[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [checkoutState, setCheckoutState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [checkoutError, setCheckoutError] = useState('');

  useEffect(() => {
    const sync = () => setCookieCart(getCartParamFromCookie());
    sync();
    window.addEventListener('focus', sync);
    window.addEventListener('pageshow', sync);
    window.addEventListener(CART_SYNC_EVENT, sync);
    return () => {
      window.removeEventListener('focus', sync);
      window.removeEventListener('pageshow', sync);
      window.removeEventListener(CART_SYNC_EVENT, sync);
    };
  }, []);

  // Initialize items from URL query (if present) or cookie. URL wins on first
  // load so deep links work; subsequent changes are local state and sync back
  // to the cookie.
  useEffect(() => {
    const queryItems = parseCartParam(queryCart);
    const cookieItems = parseCartParam(cookieCart);
    setItems(queryItems.length ? queryItems : cookieItems);
    setHydrated(true);
  }, [queryCart, cookieCart]);

  const lineItems = useMemo(() => getCartLineItems(items), [items]);

  const subtotal = useMemo(
    () => lineItems.reduce((sum, item) => sum + item.amount, 0),
    [lineItems]
  );

  // Isolated mode: when the URL has ?cart=... the cart is acting as an
  // LP-funnel single-product view. Do NOT sync to cookie so the customer's
  // broader-site cart stays untouched. They are checking out for one LP
  // product, not modifying their global cart.
  const isIsolatedMode = Boolean(queryCart);

  // Sync items state back to the cookie (and notify the nav pill). Skips on
  // the initial pre-hydration pass so we do not stomp the cookie with [],
  // and skips in isolated mode (see comment above).
  useEffect(() => {
    if (!hydrated || isIsolatedMode) return;
    const nextHref = buildCartHref(items);
    const nextParam = nextHref.split(`${CART_QUERY_KEY}=`)[1] || '';
    setCartParamCookie(nextParam);
    window.dispatchEvent(new Event(CART_SYNC_EVENT));
  }, [items, hydrated, isIsolatedMode]);

  const removeItem = useCallback(
    (key: string) => {
      setItems((prev) => prev.filter((item) => item.key !== key));
      // Drop the cart query param so a refresh does not resurrect the item.
      if (queryCart) router.replace('/cart');
    },
    [queryCart, router]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    if (queryCart) router.replace('/cart');
  }, [queryCart, router]);

  async function startCheckout() {
    if (!lineItems.length) return;
    setCheckoutState('loading');
    setCheckoutError('');
    try {
      const res = await fetch('/api/cart-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: items }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) {
        throw new Error(json.error || 'Could not start checkout');
      }
      window.location.href = json.url;
    } catch (err) {
      setCheckoutState('error');
      setCheckoutError(err instanceof Error ? err.message : 'Checkout failed');
    }
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {isIsolatedMode ? (
        // LP isolation: no global nav. Show a minimal branded header that
        // matches the LP visual language — wordmark only, no menu, no
        // back-to-main-site link. The customer is in a focused checkout
        // funnel; they came from an LP, they go to Stripe next.
        <header className="border-b border-stone-200 bg-white">
          <div className="container-pro flex h-16 items-center justify-center sm:h-20">
            {/* Non-linked wordmark — LP isolation means no clickable path back to main site */}
            <div className="text-center">
              <p className="text-base font-black tracking-[-0.02em] text-navy-900 sm:text-lg">
                Southern Cities Construction
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange">
                Licensed NC General Contractor
              </p>
            </div>
          </div>
        </header>
      ) : (
        <SiteNav variant="solid" />
      )}

      <section className="container-pro pt-14 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-3xl">
          <p className="eyebrow">Cart</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-navy-900">
            Review your selected services
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/65">
            Purchasable services route into the portal checkout flow with the selected offer preloaded. Quote-based work is handled separately through the services request form.
          </p>
        </div>

        {!lineItems.length ? (
          <div className="mt-12 rounded-3xl border border-navy/[0.08] bg-white p-12 text-center shadow-elev-1">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-stone-100">
              <svg className="h-6 w-6 text-navy/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-navy-900">Your cart is empty</h2>
            <p className="mx-auto mt-3 max-w-md text-ink/60">
              {isIsolatedMode
                ? 'Use your browser’s back button to return to where you were, or contact us if you need help.'
                : 'Browse the services catalog and add a purchasable item to start checkout, or request a quote for scope-based work.'}
            </p>
            {!isIsolatedMode ? (
              <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full bg-orange hover:bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-glow-orange transition-colors"
                >
                  Browse Services
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-full border border-navy/15 bg-white hover:bg-stone-50 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors"
                >
                  Request a Quote
                </Link>
              </div>
            ) : (
              <div className="mt-7 flex flex-col items-center gap-3">
                <a
                  href="mailto:info@southerncitiesconstruction.com"
                  className="inline-flex items-center justify-center rounded-full border border-navy/15 bg-white hover:bg-stone-50 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors"
                >
                  Email us about this product
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-navy/65">
                  {lineItems.length} {lineItems.length === 1 ? 'item' : 'items'} in cart
                </p>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-sm font-semibold text-navy/55 hover:text-red-600 transition-colors underline-offset-4 hover:underline"
                >
                  Clear cart
                </button>
              </div>

              {lineItems.map((lineItem) => (
                <div
                  key={lineItem.key}
                  className="relative rounded-3xl border border-navy/[0.08] bg-white p-7 sm:p-9 shadow-elev-1"
                >
                  <button
                    type="button"
                    onClick={() => removeItem(lineItem.key)}
                    aria-label={`Remove ${lineItem.product.name} from cart`}
                    className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-navy/[0.08] bg-white text-navy/45 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between pr-10">
                    <div className="min-w-0">
                      <h2 className="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight">
                        {lineItem.product.name}
                      </h2>
                      <p className="mt-2 text-ink/65 leading-relaxed">
                        {lineItem.product.description}
                      </p>
                      {lineItem.quantity > 1 && (
                        <p className="mt-3 text-sm font-semibold text-orange">
                          Quantity: {lineItem.quantity}
                        </p>
                      )}
                      {lineItem.key === 'permit-management-service' && (
                        <p className="mt-3 text-sm leading-relaxed text-ink/55">
                          Job variables for Permit Administration are collected on the next page before checkout.
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={() => removeItem(lineItem.key)}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy/55 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Remove
                      </button>
                    </div>
                    <div className="shrink-0 text-left sm:text-right">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-navy/45">
                        Checkout
                      </p>
                      <p className="mt-1 text-2xl font-extrabold text-orange">
                        {formatPrice(lineItem.amount)}
                      </p>
                      {lineItem.quantity > 1 && (
                        <p className="mt-1 text-xs text-ink/55">
                          {formatPrice(lineItem.amount / lineItem.quantity)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* "Back to services" goes to the main site — hide in isolated LP-funnel mode. */}
              {!isIsolatedMode ? (
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-orange transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Back to services
                </Link>
              ) : null}
            </div>

            <div className="h-fit rounded-3xl border border-navy/[0.08] bg-white p-7 sm:p-8 shadow-elev-1">
              <p className="eyebrow">Summary</p>
              <h3 className="mt-3 text-xl font-bold text-navy-900">Line items</h3>

              <div className="mt-6 space-y-4">
                {lineItems.map((lineItem) => (
                  <div
                    key={lineItem.key}
                    className="flex items-start justify-between gap-4 border-b border-navy/[0.06] pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-navy-900 text-[15px]">
                        {lineItem.product.shortName}{lineItem.quantity > 1 ? ` x${lineItem.quantity}` : ''}
                      </p>
                      <p className="mt-0.5 text-xs text-ink/55 line-clamp-2">
                        {lineItem.product.description}
                      </p>
                    </div>
                    <p className="shrink-0 font-bold text-navy-900">
                      {formatPrice(lineItem.amount)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-navy/[0.08] space-y-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-navy/65">Subtotal</span>
                  <span className="text-base font-semibold text-navy-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-navy/65">Tax</span>
                  <span className="text-sm text-navy/55">Calculated at checkout</span>
                </div>
                <div className="pt-3 border-t border-navy/[0.08] flex items-baseline justify-between">
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-navy/55">Total before tax</span>
                  <span className="text-2xl font-extrabold text-navy-900">{formatPrice(subtotal)}</span>
                </div>
              </div>

              {cancelled ? (
                <p className="mt-5 text-xs leading-relaxed text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
                  Checkout was cancelled. Your cart is saved — review and try again when ready.
                </p>
              ) : null}

              {checkoutError ? (
                <p className="mt-5 text-xs leading-relaxed text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
                  {checkoutError}
                </p>
              ) : null}

              <button
                type="button"
                onClick={startCheckout}
                disabled={checkoutState === 'loading'}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange hover:bg-orange-500 px-6 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-glow-orange transition-colors disabled:opacity-60 disabled:cursor-wait"
              >
                {checkoutState === 'loading' ? 'Opening secure checkout…' : 'Continue to Checkout'}
                {checkoutState !== 'loading' ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                ) : null}
              </button>

              <p className="mt-4 text-[11px] leading-relaxed text-ink/55 text-center">
                Secure checkout powered by Stripe. Billing address, phone, and payment details are collected on the next page. Sales tax (if applicable) is calculated from your billing address.
              </p>

              <p className="mt-3 text-[11px] leading-relaxed text-ink/55">
                Final project price may change after scope review when scope-based work is involved. Some services, including Permit Administration, collect job variables on the next page before the checkout amount is finalized.
              </p>
            </div>
          </div>
        )}
      </section>

      {isIsolatedMode ? (
        // Minimal footer in isolated mode — trust signals only, no nav links.
        <footer className="border-t border-stone-200 bg-white py-8">
          <div className="container-pro flex flex-col items-center gap-2 text-center text-xs text-ink/55">
            <p>
              Secure checkout via Stripe · SSL encrypted · No subscription · Licensed NC GC #107724
            </p>
            <p>
              Questions? Email <a href="mailto:info@southerncitiesconstruction.com" className="font-semibold text-navy-900 hover:text-orange">info@southerncitiesconstruction.com</a> · Call <a href="tel:+19804737249" className="font-semibold text-navy-900 hover:text-orange">(980) 473-7249</a>
            </p>
          </div>
        </footer>
      ) : (
        <SiteFooter />
      )}
    </main>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50" />}>
      <CartPageContent />
    </Suspense>
  );
}
