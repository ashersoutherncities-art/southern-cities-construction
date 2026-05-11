'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { buildCartHref, parseCartParam } from '@/lib/cart';
import { getCartParamFromCookie } from '@/lib/cart-client';

const CART_SYNC_EVENT = 'scc:cart-sync';
const CART_ADDED_EVENT = 'scc:cart-added';

/**
 * Floating cart access pill for pages without a global nav (e.g. /lp/* landing pages).
 * Only appears when the cart has items so it doesn't add noise to a first-time visit.
 */
export default function CartFloatingPill({ position = 'top-right' }: { position?: 'top-right' | 'bottom-right' }) {
  const [count, setCount] = useState(0);
  const [href, setHref] = useState('/cart');

  useEffect(() => {
    const sync = () => {
      const param = getCartParamFromCookie();
      const selections = parseCartParam(param);
      setCount(selections.reduce((sum, item) => sum + (item.quantity ?? 1), 0));
      setHref(selections.length ? buildCartHref(selections) : '/cart');
    };
    sync();
    window.addEventListener('focus', sync);
    window.addEventListener('pageshow', sync);
    window.addEventListener(CART_SYNC_EVENT, sync);
    window.addEventListener(CART_ADDED_EVENT, sync);
    return () => {
      window.removeEventListener('focus', sync);
      window.removeEventListener('pageshow', sync);
      window.removeEventListener(CART_SYNC_EVENT, sync);
      window.removeEventListener(CART_ADDED_EVENT, sync);
    };
  }, []);

  if (count === 0) return null;

  const positionClasses =
    position === 'bottom-right'
      ? 'bottom-24 right-4 sm:bottom-6 sm:right-6'
      : 'top-4 right-4 sm:top-6 sm:right-6';

  return (
    <Link
      href={href}
      aria-label={`Cart, ${count} item${count === 1 ? '' : 's'} — go to checkout`}
      className={`fixed ${positionClasses} z-40 inline-flex items-center gap-2 rounded-full bg-[#08111d] px-4 py-2.5 text-sm font-black uppercase tracking-[0.06em] text-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] ring-2 ring-[#f58220]/70 transition hover:-translate-y-0.5 hover:bg-[#0e1a30]`}
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
      </span>
      <span className="hidden sm:inline">View cart</span>
      <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#f58220] px-1.5 text-[11px] font-black text-white">
        {count}
      </span>
    </Link>
  );
}
