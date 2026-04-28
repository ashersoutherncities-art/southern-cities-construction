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

  const label = count > 0 ? `Cart, ${count} item${count === 1 ? '' : 's'}` : 'Cart';

  if (compact) {
    return (
      <Link href="/cart" aria-label={label} title={label} className={`relative ${className}`}>
        <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        {count > 0 && (
          <span className="absolute right-1 top-1.5 h-1.5 w-1.5 rounded-full bg-orange" aria-hidden />
        )}
      </Link>
    );
  }

  return (
    <Link href="/cart" className={className}>
      Cart{count > 0 ? ` (${count})` : ''}
    </Link>
  );
}
