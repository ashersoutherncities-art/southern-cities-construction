'use client';

import { useEffect, useRef } from 'react';
import posthog from 'posthog-js';
import { posthogReady } from '@/components/analytics/PostHogProvider';
import {
  captureAttributionOnLoad,
  classifyDeviceCategory,
  classifyBrowserCategory,
} from '@/lib/analytics/attribution';
import { SCC_EVENTS } from '@/lib/analytics/schema';

/** Mount once on /consultation. Fires scc_landing_viewed exactly once with
 * the full attribution snapshot — see schema.ts for the property list. */
export default function LandingPageTracker() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    if (!posthogReady()) return;

    const { firstTouch, lastTouch, isReturning } = captureAttributionOnLoad();

    posthog.capture(SCC_EVENTS.LANDING_VIEWED, {
      page_url: window.location.href,
      page_path: window.location.pathname,
      referrer: lastTouch.referrer || null,
      traffic_source: lastTouch.traffic_source,
      utm_source: lastTouch.utm_source || null,
      utm_medium: lastTouch.utm_medium || null,
      utm_campaign: lastTouch.utm_campaign || null,
      utm_content: lastTouch.utm_content || null,
      utm_term: lastTouch.utm_term || null,
      campaign_id: lastTouch.campaign_id || null,
      adset_id: lastTouch.adset_id || null,
      ad_id: lastTouch.ad_id || null,
      first_touch_source: firstTouch.utm_source || firstTouch.traffic_source || null,
      first_touch_campaign: firstTouch.utm_campaign || null,
      device_category: classifyDeviceCategory(),
      browser_category: classifyBrowserCategory(),
      is_returning_visitor: isReturning,
    });
  }, []);

  return null;
}
