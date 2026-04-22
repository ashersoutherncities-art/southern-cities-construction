"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCartItemsFromCookie } from '@/lib/cart-client';

export default function CartNavLink({ className = '', compact = false }: { className?: string; compact?: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(getCartItemsFromCookie().length);
    sync();
    window.addEventListener('focus', sync);
    window.addEventListener('pageshow', sync);
    return () => {
      window.removeEventListener('focus', sync);
      window.removeEventListener('pageshow', sync);
    };
  }, []);

  return (
    <Link href="/cart" className={className}>
      {compact ? (
        <span className="inline-flex items-center gap-2">
          <span>Cart</span>
          {count > 0 ? (
            <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-white/12 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white">
              {count}
            </span>
          ) : null}
        </span>
      ) : (
        <>Cart{count > 0 ? ` (${count})` : ''}</>
      )}
    </Link>
  );
}
