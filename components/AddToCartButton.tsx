"use client";

import Link from 'next/link';
import { MouseEvent } from 'react';
import { buildCartHref } from '@/lib/cart';
import { getCartItemsFromCookie, setCartItemsCookie } from '@/lib/cart-client';

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
    const existing = getCartItemsFromCookie();
    const next = Array.from(new Set([...existing, itemKey]));
    setCartItemsCookie(next);
    event.currentTarget.href = buildCartHref(next);
  };

  return (
    <Link href={buildCartHref([itemKey])} onClick={handleClick} className={className}>
      {label}
    </Link>
  );
}
