'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { buildCartHref, buildDirectCheckoutHref, CART_QUERY_KEY, formatPrice, getCartLineItems, parseCartParam } from '@/lib/cart';

const CART_SYNC_EVENT = 'scc:cart-sync';

function getCheckoutLabel(itemKey: string) {
  if (itemKey === 'permit-management-service') {
    return 'Continue to setup';
  }
  return 'Continue to checkout';
}
import { getCartParamFromCookie, setCartParamCookie } from '@/lib/cart-client';

function CartPageContent() {
  const searchParams = useSearchParams();
  const queryCart = searchParams.get(CART_QUERY_KEY);
  const [cookieCart, setCookieCart] = useState('');

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

  const items = useMemo(() => {
    const queryItems = parseCartParam(queryCart);
    if (queryItems.length) return queryItems;
    return parseCartParam(cookieCart);
  }, [cookieCart, queryCart]);
  const lineItems = useMemo(() => getCartLineItems(items), [items]);

  const subtotal = useMemo(
    () => lineItems.reduce((sum, item) => sum + item.amount, 0),
    [lineItems]
  );

  useEffect(() => {
    if (!lineItems.length) {
      return;
    }
    const nextHref = buildCartHref(items);
    const nextParam = nextHref.split(`${CART_QUERY_KEY}=`)[1] || '';
    setCartParamCookie(nextParam);
  }, [items, lineItems]);

  return (
    <main className="min-h-screen bg-stone-50">
      <SiteNav variant="solid" />

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
              Browse the services catalog and add a purchasable item to start checkout, or request a quote for scope-based work.
            </p>
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
          </div>
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="space-y-5">
              {lineItems.map((lineItem) => (
                <div
                  key={lineItem.key}
                  className="rounded-3xl border border-navy/[0.08] bg-white p-7 sm:p-9 shadow-elev-1"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
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
                  <Link
                    href={buildDirectCheckoutHref({ key: lineItem.key, amount: lineItem.amount })}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy-900 hover:bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors"
                  >
                    {getCheckoutLabel(lineItem.key)}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              ))}

              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-orange transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to services
              </Link>
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

              <div className="mt-6 pt-5 border-t border-navy/[0.08] flex items-baseline justify-between">
                <span className="text-sm font-semibold uppercase tracking-[0.14em] text-navy/55">
                  Subtotal
                </span>
                <span className="text-2xl font-extrabold text-navy-900">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-ink/55">
                Final project price may change after scope review when scope-based work is involved. Some services, including Permit Administration, collect job variables on the next page before the checkout amount is finalized.
              </p>
            </div>
          </div>
        )}
      </section>

      <SiteFooter />
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
