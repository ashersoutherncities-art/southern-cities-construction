"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCartItemsFromCookie } from '@/lib/cart-client';

export default function CartNavLink({ className = '' }: { className?: string }) {
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
      Cart{count > 0 ? ` (${count})` : ''}
    </Link>
  );
}
