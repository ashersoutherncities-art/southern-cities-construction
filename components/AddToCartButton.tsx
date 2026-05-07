"use client";

import Link from 'next/link';
import { useMemo } from 'react';
import { buildCartHref, CART_QUERY_KEY, parseCartParam } from '@/lib/cart';
import { getCartParamFromCookie, setCartParamCookie } from '@/lib/cart-client';

export default function AddToCartButton({
  itemKey,
  label = 'Add to Cart',
  className,
}: {
  itemKey: string;
  label?: string;
  className?: string;
}) {
  const href = useMemo(() => {
    if (typeof window === 'undefined') return '/cart';
    const existingParam = getCartParamFromCookie();
    const existing = parseCartParam(existingParam);
    return buildCartHref([...existing, { key: itemKey, quantity: 1 }]);
  }, [itemKey]);

  return (
    <Link
      href={href}
      onClick={() => {
        const nextParam = href.split(`${CART_QUERY_KEY}=`)[1] || '';
        setCartParamCookie(nextParam);
        window.dispatchEvent(new Event('pageshow'));
        window.dispatchEvent(new Event('focus'));
      }}
      className={className}
    >
      {label}
    </Link>
  );
}
