'use client';

import { useEffect, useRef } from 'react';
import posthog from 'posthog-js';
import { posthogReady } from '@/components/analytics/PostHogProvider';
import { getCurrentAttribution } from '@/lib/analytics/attribution';
import { SCC_EVENTS } from '@/lib/analytics/schema';

/** Fires scc_confirmation_page_viewed once on /consultation/confirmed
 * mount. This is a page-view proxy ONLY — it does not mean GHL actually
 * created an appointment (see scc_appointment_booked, fired server-side
 * from the GHL webhook, for the authoritative signal). Kept separate on
 * purpose: a visitor could land on this URL without having booked. */
export default function ConfirmationPageTracker() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    if (!posthogReady()) return;

    const attr = getCurrentAttribution();
    posthog.capture(SCC_EVENTS.CONFIRMATION_PAGE_VIEWED, {
      page_path: window.location.pathname,
      utm_campaign: attr.utm_campaign || null,
      campaign_id: attr.campaign_id || null,
    });
  }, []);

  return null;
}
