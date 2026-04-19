'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CART_PRODUCTS, CART_QUERY_KEY, formatPrice, parseCartParam } from '@/lib/cart';

const NAVY = '#132452';
const ORANGE = '#fa8c41';

function CartPageContent() {
  const searchParams = useSearchParams();
  const items = useMemo(() => parseCartParam(searchParams.get(CART_QUERY_KEY)), [searchParams]);
  const products = items.map((key) => CART_PRODUCTS[key]).filter(Boolean);

  return (
    <div className="min-h-screen" style={{ background: '#f6f7fb' }}>
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: ORANGE }}>
              Construction Cart
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight" style={{ color: NAVY }}>
              Review purchasable items before checkout
            </h1>
            <p className="mt-4 max-w-2xl text-gray-600">
              Construction uses a lighter cart than Investors. Purchasable services route into the portal checkout flow with the selected offer preloaded.
            </p>
          </div>
          <Link href="/services" className="text-sm font-semibold" style={{ color: NAVY }}>
            Back to services
          </Link>
        </div>

        {!products.length ? (
          <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold" style={{ color: NAVY }}>Your cart is empty</h2>
            <p className="mt-3 text-gray-600">Add a purchasable construction service first, then come back here to start checkout.</p>
            <Link href="/services" className="mt-6 inline-flex rounded-full px-6 py-3 font-semibold text-white" style={{ background: ORANGE }}>
              Browse services
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-5">
              {products.map((product) => (
                <div key={product.key} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold" style={{ color: NAVY }}>{product.name}</h2>
                      <p className="mt-2 text-gray-600">{product.description}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-sm uppercase tracking-[0.18em] text-gray-400">Starting price</p>
                      <p className="mt-1 text-2xl font-bold" style={{ color: ORANGE }}>{product.priceLabel}</p>
                    </div>
                  </div>
                  <Link
                    href={`/portal?item=${product.key}&amount=${encodeURIComponent(product.checkoutAmount)}`}
                    className="mt-6 inline-flex rounded-full px-6 py-3 font-semibold text-white"
                    style={{ background: ORANGE }}
                  >
                    Continue to checkout
                  </Link>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm h-fit">
              <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: ORANGE }}>Cart summary</p>
              <div className="mt-6 space-y-4">
                {products.map((product) => (
                  <div key={product.key} className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                      <p className="font-semibold" style={{ color: NAVY }}>{product.shortName}</p>
                      <p className="text-sm text-gray-500">{product.description}</p>
                    </div>
                    <p className="font-semibold" style={{ color: ORANGE }}>{formatPrice(product.price)}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-gray-500">
                Final project price may change after scope review. The cart gets the buyer into the right checkout and onboarding flow.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: '#f6f7fb' }} />}>
      <CartPageContent />
    </Suspense>
  );
}
