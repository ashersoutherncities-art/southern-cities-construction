'use client';

import { useEffect, useState } from 'react';
import posthog from 'posthog-js';
import { getStoredConsent, setConsent } from '@/lib/analytics/consent';
import { posthogReady } from '@/components/analytics/PostHogProvider';

/** Small, dismissible banner gating session replay only — see consent.ts
 * for why core anonymous analytics isn't gated behind it. Shows once per
 * browser until a choice is made. */
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return; // nothing to consent to
    setVisible(getStoredConsent() === null);
  }, []);

  if (!visible) return null;

  const accept = () => {
    setConsent('accepted');
    if (posthogReady()) posthog.startSessionRecording();
    setVisible(false);
  };

  const decline = () => {
    setConsent('declined');
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white px-4 py-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] leading-relaxed text-stone-600">
          We use anonymous analytics to understand how visitors use this site, and may record
          anonymized session playback to improve it. No personal information is collected.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={decline}
            className="rounded-lg border border-stone-300 px-4 py-2 text-[13px] font-bold text-stone-600 hover:bg-stone-50"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-lg bg-orange px-4 py-2 text-[13px] font-black text-white hover:bg-orange-bright"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
