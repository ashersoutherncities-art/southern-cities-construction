'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const CART_ADDED_EVENT = 'scc:cart-added';

type ToastDetail = {
  itemKey: string;
  productName: string;
  priceLabel?: string;
  count: number;
};

export default function CartToast() {
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState<ToastDetail | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      const ce = event as CustomEvent<ToastDetail>;
      if (!ce.detail) return;
      setDetail(ce.detail);
      setVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setVisible(false), 4200);
    };
    window.addEventListener(CART_ADDED_EVENT, handler);
    return () => {
      window.removeEventListener(CART_ADDED_EVENT, handler);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!detail) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-4 z-[100] flex justify-center px-4 transition-all duration-300 sm:right-6 sm:left-auto sm:top-6 sm:justify-end sm:px-0 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#08111d] text-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.55)]">
        <div className="flex items-start gap-3 p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-300">Added to cart</p>
            <p className="mt-1 truncate text-sm font-bold text-white">{detail.productName}</p>
            {detail.priceLabel ? (
              <p className="mt-0.5 text-xs text-white/65">{detail.priceLabel}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/55 transition hover:bg-white/5 hover:text-white"
            aria-label="Dismiss"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
          <span className="font-semibold text-white/75">
            {detail.count} item{detail.count === 1 ? '' : 's'} in cart
          </span>
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#fa8c41] px-4 py-1.5 text-xs font-black uppercase tracking-[0.08em] text-white shadow-[0_8px_20px_-6px_rgba(245,130,32,0.45)] transition hover:bg-[#ffa463]"
          >
            View cart <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
