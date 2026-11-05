'use client';

import { useEffect, useRef } from 'react';
import posthog from 'posthog-js';
import { posthogReady } from '@/components/analytics/PostHogProvider';
import { SCC_EVENTS } from '@/lib/analytics/schema';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires Meta Pixel CalendarViewed once per page visit when the booking
 * section (#book) is at least 50% visible for one continuous second —
 * true regardless of whether the visitor scrolled manually or clicked a
 * CTA that jumps to #book. Does not fire on iframe load alone; it only
 * watches the container's viewport visibility, never anything inside the
 * cross-origin GHL iframe.
 */
export default function CalendarViewTracker() {
  const firedRef = useRef(false);

  useEffect(() => {
    const target = document.getElementById('book');
    if (!target) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const clearTimer = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (firedRef.current) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (timer === null) {
            timer = setTimeout(() => {
              if (firedRef.current) return;
              firedRef.current = true;
              if (typeof window.fbq === 'function') {
                window.fbq('trackCustom', 'CalendarViewed', {
                  calendar: 'Sales Consultation - SCC',
                  page_path: window.location.pathname,
                });
              }
              if (posthogReady()) {
                // Diagnostic copy of the same signal for PostHog funnel
                // reporting — NOT configured as a Meta optimization event,
                // this is purely internal.
                posthog.capture(SCC_EVENTS.CALENDAR_VIEWED, {
                  calendar: 'Sales Consultation - SCC',
                  page_path: window.location.pathname,
                });
              }
              observer.disconnect();
            }, 1000);
          }
        } else {
          clearTimer();
        }
      },
      { threshold: [0, 0.5, 1] },
    );

    observer.observe(target);

    return () => {
      clearTimer();
      observer.disconnect();
    };
  }, []);

  return null;
}
