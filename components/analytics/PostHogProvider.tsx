'use client';

import posthog from 'posthog-js';
import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { hasAnalyticsConsent } from '@/lib/analytics/consent';

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

let initialized = false;

/** True once posthog.init() has actually run — every capture call site
 * should no-op when this is false instead of crashing or queuing silently
 * forever, so analytics being unconfigured never breaks the page. */
export function posthogReady(): boolean {
  return initialized;
}

function initPostHogOnce() {
  if (initialized) return;
  if (typeof window === 'undefined') return;
  if (!POSTHOG_KEY) return; // not configured — no-op, nothing breaks
  if (process.env.NODE_ENV !== 'production') return; // no analytics noise from local dev

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    // We fire $pageview manually (see PostHogRouteTracker) so SPA route
    // changes are tracked correctly — same dedup problem the Meta pixel
    // route tracker solves, same fix (string-compared route key, not
    // relying on hook object identity).
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
    // Session replay never auto-starts; ConsentBanner calls
    // posthog.startSessionRecording() only after explicit opt-in.
    disable_session_recording: true,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: '[data-ph-mask]',
    },
    persistence: 'localStorage+cookie',
    loaded: (ph) => {
      if (hasAnalyticsConsent()) {
        ph.startSessionRecording();
      }
    },
  });
  initialized = true;
}

// Runs at module-evaluation time, not inside a component effect. Every
// other analytics component (LandingPageTracker, ScrollDepthTracker,
// ConsultationCTA, CalendarViewTracker, VideoWithSoundToggle) checks
// posthogReady() synchronously in its own first effect — if init instead
// happened inside PostHogProvider's own useEffect, there's no guarantee
// that effect fires before a sibling component's effect deeper in the
// tree (confirmed empirically: it doesn't — React's effect order across
// separate subtrees isn't "this leaf's effect before that subtree's
// effects" here). Module evaluation happens during the render/import
// phase, strictly before ANY component's effects can run, so this is the
// one ordering guarantee that's actually reliable.
if (typeof window !== 'undefined') {
  initPostHogOnce();
}

function PostHogRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;
  const lastCapturedKey = useRef<string | null>(null);

  useEffect(() => {
    if (!initialized) return;
    if (lastCapturedKey.current === routeKey) return;
    lastCapturedKey.current = routeKey;
    posthog.capture('$pageview');
  }, [routeKey]);

  return null;
}

export default function PostHogProvider() {
  return <PostHogRouteTracker />;
}
