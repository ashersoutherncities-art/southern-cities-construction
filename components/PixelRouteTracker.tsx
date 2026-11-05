'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires a Meta Pixel PageView on every client-side route change.
 *
 * The inline Pixel script in the root layout fires one PageView on true
 * page load (hard navigation / first load) — Next.js App Router client-side
 * navigation (<Link>, router.push) does NOT remount the root layout, so that
 * script never runs again. Without this, every page after the first one in
 * a session goes untracked. The initial mount is skipped here specifically
 * so the first load isn't double-counted against the inline script's own
 * PageView.
 *
 * useSearchParams() returns a new object instance on hash-only navigation
 * (e.g. an in-page anchor like href="#book") even though its string content
 * is unchanged — that broke reference-equality-based effect deps and fired
 * a duplicate PageView on every CTA click. Comparing the serialized
 * "pathname?search" string instead of the raw objects fixes it.
 */
export default function PixelRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;
  const lastFiredKey = useRef<string | null>(null);

  useEffect(() => {
    if (lastFiredKey.current === null) {
      lastFiredKey.current = routeKey;
      return;
    }
    if (lastFiredKey.current === routeKey) return;
    lastFiredKey.current = routeKey;

    if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
    window.fbq('track', 'PageView');
  }, [routeKey]);

  return null;
}
