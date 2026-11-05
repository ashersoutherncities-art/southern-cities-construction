'use client';

import posthog from 'posthog-js';
import { posthogReady } from '@/components/analytics/PostHogProvider';
import { SCC_EVENTS } from '@/lib/analytics/schema';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type Props = {
  children: React.ReactNode;
  className?: string;
  eventLabel: string;
};

/** CTA button that scrolls to the booking section and fires a Meta Pixel
 * custom event so CTA-click volume is measurable separately from actual
 * bookings (which fire inside the GHL iframe, outside our control).
 *
 * preventDefault + manual scrollIntoView instead of a native href="#book"
 * jump: Next.js App Router intercepts same-page hash anchors for its own
 * scroll/history bookkeeping, which calls the History API — and Meta's
 * fbevents.js has built-in SPA tracking that patches pushState/replaceState
 * and listens for popstate to auto-fire its own PageView, with no fbq()
 * call in our code involved at all. That produced a second PageView (with
 * the #book hash in the URL) on every CTA click. Skipping the native hash
 * navigation entirely avoids triggering either mechanism. href is kept so
 * the link still works with JS disabled and supports middle-click/open-in-
 * new-tab. */
export default function ConsultationCTA({ children, className, eventLabel }: Props) {
  return (
    <a
      href="#book"
      onClick={(e) => {
        e.preventDefault();
        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
          window.fbq('trackCustom', 'ScheduleConsultationClick', { location: eventLabel });
        }
        if (posthogReady()) {
          posthog.capture(SCC_EVENTS.SCHEDULE_CTA_CLICKED, { location: eventLabel });
        }
        document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
      className={className}
    >
      {children}
    </a>
  );
}
