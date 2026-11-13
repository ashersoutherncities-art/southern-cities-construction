'use client';

import { useBrowserSnapshot } from '@/lib/use-browser-snapshot';
import CalendarViewTracker from '@/components/CalendarViewTracker';
import { buildGhlAttributionQueryString } from '@/lib/analytics/attribution';

const BASE_SRC = 'https://api.leadconnectorhq.com/widget/bookings/potential-client-intro-appoint';

/**
 * Wraps the GHL booking iframe so its src can carry the visitor's UTM/
 * campaign params as query string params — GHL's calendar widget supports
 * prefilling matching custom fields from query params with the same key,
 * so this is the safe, verifiable-by-us half of passing attribution into
 * GHL. Whether it actually lands on the resulting contact still depends on
 * matching custom fields existing in GHL — see the attribution.ts doc
 * comment and the analytics implementation report for the exact field
 * keys this needs.
 *
 * Rendered client-side (rather than a static src in the server page) only
 * because the attribution data comes from window.location, which isn't
 * available at server-render time.
 */
export default function BookingCalendarEmbed() {
  // Starts null (no iframe rendered at all, matching SSR) rather than
  // defaulting to BASE_SRC and correcting it after mount — if the iframe
  // existed from the first render, changing its src attribute afterward
  // would make it load twice (once unparameterized, once with the
  // attribution query string). Rendering the iframe for the first time
  // only once the final src is known means exactly one load.
  const qs = useBrowserSnapshot<string | null>(buildGhlAttributionQueryString, null);
  const src = qs === null ? null : qs ? `${BASE_SRC}?${qs}` : BASE_SRC;

  return (
    <div className="mx-auto mt-5 max-w-3xl overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-elev-1">
      <CalendarViewTracker />
      {src && (
        <iframe
          src={src}
          title="Sales Consultation — Southern Cities Construction"
          // scrolling is intentionally NOT "no" here. GHL's own resize
          // script keeps the iframe's height matched to its content, so
          // under normal conditions it never needs to scroll internally —
          // but on iOS Safari specifically, focusing a text input inside a
          // cross-origin iframe is a well-documented WebKit bug: the
          // on-screen keyboard appears and Safari doesn't reliably scroll
          // the focused field into view above it, because that auto-scroll
          // targets the scrollable ancestor containing the input, and with
          // scrolling="no" that's nobody — the iframe can't scroll itself,
          // and the parent page's scroll container is one hop too far away
          // across the iframe boundary for Safari's focus-scroll to reach.
          // Letting the iframe scroll internally gives Safari a direct,
          // correct target to use as a fallback when the keyboard shrinks
          // the visible viewport out from under GHL's resize calculation.
          style={{ width: '100%', minHeight: '700px', border: 'none', overflow: 'auto' }}
          id="potential-client-intro-appoint_consultation"
        />
      )}
    </div>
  );
}
