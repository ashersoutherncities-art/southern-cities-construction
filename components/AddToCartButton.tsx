"use client";

import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { buildCartHref, CART_PRODUCTS, parseCartParam } from '@/lib/cart';
import { getCartParamFromCookie, setCartParamCookie } from '@/lib/cart-client';

const CART_SYNC_EVENT = 'scc:cart-sync';
const CART_ADDED_EVENT = 'scc:cart-added';

type AddToCartButtonProps = {
  itemKey: string;
  label?: string;
  className?: string;
  /**
   * 'continue' (default) — add to cart, stay on the current page, show toast + inline confirmation.
   * 'checkout' — add to cart and immediately navigate to /cart (kept for landing pages
   * where the CTA semantically reads "Buy Now").
   */
  mode?: 'continue' | 'checkout';
};

export default function AddToCartButton({
  itemKey,
  label = 'Add to Cart',
  className,
  mode = 'continue',
}: AddToCartButtonProps) {
  const [justAdded, setJustAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const existingParam = getCartParamFromCookie();
      const existing = parseCartParam(existingParam);
      const next = [...existing, { key: itemKey, quantity: 1 }];
      const nextHref = buildCartHref(next);
      const nextParam = nextHref.startsWith('/cart?cart=')
        ? nextHref.slice('/cart?cart='.length)
        : '';
      setCartParamCookie(nextParam);

      if (typeof window !== 'undefined') {
        // Tell every CartNavLink / FloatingCart / cart page to refresh
        window.dispatchEvent(new CustomEvent(CART_SYNC_EVENT));
        // Tell the global CartToast to show a confirmation
        const product = CART_PRODUCTS[itemKey];
        window.dispatchEvent(
          new CustomEvent(CART_ADDED_EVENT, {
            detail: {
              itemKey,
              productName: product?.shortName || product?.name || 'Item',
              priceLabel: product?.priceLabel || '',
              count: next.length,
            },
          })
        );
      }

      if (mode === 'checkout') {
        window.location.assign('/cart');
        return;
      }

      // Stay on page, show inline confirmation briefly
      setJustAdded(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setJustAdded(false), 1800);
    },
    [itemKey, mode]
  );

  return (
    <button type="button" onClick={handleClick} className={className} aria-live="polite">
      {justAdded ? (
        <span className="inline-flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Added!
        </span>
      ) : (
        label
      )}
    </button>
  );
}
