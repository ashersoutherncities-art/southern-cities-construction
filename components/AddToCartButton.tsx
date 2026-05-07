"use client";

import { MouseEvent, useCallback } from 'react';
import { buildCartHref, parseCartParam } from '@/lib/cart';
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
  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const existingParam = getCartParamFromCookie();
      const existing = parseCartParam(existingParam);
      const nextHref = buildCartHref([...existing, { key: itemKey, quantity: 1 }]);
      const nextParam = nextHref.startsWith('/cart?cart=') ? nextHref.slice('/cart?cart='.length) : '';
      setCartParamCookie(nextParam);
      window.location.assign('/cart');
    },
    [itemKey]
  );

  return (
    <button type="button" onClick={handleClick} className={className}>
      {label}
    </button>
  );
}
