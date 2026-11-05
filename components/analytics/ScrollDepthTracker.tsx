'use client';

import { useEffect, useRef } from 'react';
import posthog from 'posthog-js';
import { posthogReady } from '@/components/analytics/PostHogProvider';
import { SCC_EVENTS } from '@/lib/analytics/schema';

const MILESTONES = [25, 50, 75, 90, 100] as const;

/** Scroll-depth milestones (25/50/75/90/100%), each fired once per mount
 * the first time it's crossed. A rAF-throttled scroll listener rather than
 * IntersectionObserver — depth is a function of total scroll progress, not
 * any single element's visibility. */
export default function ScrollDepthTracker() {
  const firedRef = useRef<Set<number>>(new Set());
  const tickingRef = useRef(false);

  useEffect(() => {
    if (!posthogReady()) return;

    const checkDepth = () => {
      tickingRef.current = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) return;
      const pct = (window.scrollY / scrollable) * 100;

      for (const m of MILESTONES) {
        if (pct >= m && !firedRef.current.has(m)) {
          firedRef.current.add(m);
          posthog.capture(SCC_EVENTS.SCROLL_DEPTH, {
            depth_percent: m,
            page_path: window.location.pathname,
          });
        }
      }
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(checkDepth);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    checkDepth(); // in case the page loads already scrolled or is short enough that 100% is immediate
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
