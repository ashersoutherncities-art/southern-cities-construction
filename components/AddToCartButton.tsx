"use client";

import Link from 'next/link';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
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
  const [href, setHref] = useState('/cart');

  const computeHref = useCallback(() => {
    const existingParam = getCartParamFromCookie();
    const existing = parseCartParam(existingParam);
    return buildCartHref([...existing, { key: itemKey, quantity: 1 }]);
  }, [itemKey]);

  useEffect(() => {
    setHref(computeHref());
  }, [computeHref]);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      const nextHref = computeHref();
      const nextParam = nextHref.split(`${CART_QUERY_KEY}=`)[1] || '';
      setCartParamCookie(nextParam);
      setHref(nextHref);
      window.dispatchEvent(new Event('pageshow'));
      window.dispatchEvent(new Event('focus'));
      if (nextHref !== href) {
        event.preventDefault();
        window.location.assign(nextHref);
      }
    },
    [computeHref, href]
  );

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {label}
    </Link>
  );
}
