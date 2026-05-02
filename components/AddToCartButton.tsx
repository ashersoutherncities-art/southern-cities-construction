"use client";

import Link from 'next/link';
import { MouseEvent } from 'react';
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
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const existingParam = getCartParamFromCookie();
    const existing = parseCartParam(existingParam);
    const next = [...existing, { key: itemKey, quantity: 1 }];
    const nextHref = buildCartHref(next);
    const nextParam = nextHref.split(`${CART_QUERY_KEY}=`)[1] || '';
    setCartParamCookie(nextParam);
    window.dispatchEvent(new Event('pageshow'));
    window.dispatchEvent(new Event('focus'));
  };

  return (
    <Link href="/cart" onClick={handleClick} className={className}>
      {label}
    </Link>
  );
}
