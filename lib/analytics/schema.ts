/**
 * SCC Investor Consultation Funnel — PostHog event schema.
 *
 * This is the single source of truth for event names. Every event this
 * codebase sends to PostHog is listed here with what triggers it, where it
 * fires from, and how duplication is prevented. Keep this file in sync with
 * reality — if you add a capture call anywhere, add it here too.
 *
 * ──────────────────────────────────────────────────────────────────────
 * scc_landing_viewed            client · /consultation mount
 *   One per page load (hard nav or client-side route entry). Carries the
 *   attribution snapshot (see attribution.ts): UTMs, campaign/adset/ad IDs,
 *   referrer, device/browser category, new-vs-returning. Fired by
 *   LandingPageTracker. Dedup: a per-mount ref guards against React
 *   StrictMode double-invoke in dev; in production a component only mounts
 *   once per navigation.
 *
 * scc_video_visible             client · VideoWithSoundToggle
 *   IntersectionObserver on the video element crosses 50% visible. Fires
 *   once per mount via a fired-ref guard. Independent of autoplay — this is
 *   "the video entered the viewport," not "playback began."
 *
 * scc_video_started             client · VideoWithSoundToggle
 *   First real `play` with playback actually advancing (verified on the
 *   next `timeupdate`, so a play() call that immediately stalls doesn't
 *   count). Autoplay counts once it's confirmed to actually be advancing
 *   the playhead, same as an intentional play — the `autoplay` property
 *   on the event records which it was. Fires once per mount.
 *
 * scc_video_progress            client · VideoWithSoundToggle
 *   Two kinds, both deduped so each only ever fires once per mount per
 *   value: (a) time checkpoints at 3s, 10s, 30s of verified watched time
 *   (not playhead position — see watched-seconds logic below), and
 *   (b) percentage milestones at 25/50/75/90/100% of duration, computed
 *   from watched *unique* seconds, not raw playhead — seeking from 5% to
 *   75% does not count as having watched 25%/50%.
 *
 * scc_video_paused / scc_video_resumed   client · VideoWithSoundToggle
 *   Raw `pause`/`play` events after the initial start, throttled to avoid
 *   spam from rapid scrubbing (coalesced if they fire within 300ms).
 *
 * scc_video_seeked              client · VideoWithSoundToggle
 *   A `seeked` event where the jump is larger than 1.5s. Carries from/to
 *   playhead position so skipped ranges are identifiable.
 *
 * scc_video_completed           client · VideoWithSoundToggle
 *   Playhead reaches >= duration - 0.5s, OR (since the element loops and
 *   never fires a real `ended` event) the playhead wraps from near-duration
 *   back near zero. Fires once per mount.
 *
 * scc_scroll_depth              client · ScrollDepthTracker (mounted on
 *   /consultation)
 *   Milestones 25/50/75/90/100% of document scroll height, each fired once
 *   per mount the first time it's crossed.
 *
 * scc_schedule_cta_clicked      client · ConsultationCTA
 *   Every CTA click, with a `location` property (hero / after_video /
 *   middle / bottom — whatever string the call site passes). Not deduped —
 *   multiple real clicks are multiple real signals. Mirrors the existing
 *   Meta `ScheduleConsultationClick` custom event; this is the PostHog-side
 *   copy of the same user action, not a new behavior.
 *
 * scc_calendar_viewed           client · CalendarViewTracker (mounted
 *   inside the #book section)
 *   #book is >=50% visible for one continuous second, via
 *   IntersectionObserver — true whether the visitor scrolled manually or a
 *   CTA scrolled them there. Fires once per mount. Mirrors the existing
 *   Meta `CalendarViewed` custom event (same trigger, same component).
 *
 * scc_calendar_date_selected / scc_calendar_time_selected /
 * scc_booking_form_viewed
 *   NOT IMPLEMENTED. Investigated via live postMessage capture from the
 *   embedded GHL widget: the only messages it emits during date/time
 *   selection and the form-advance transition are generic
 *   `[iFrameSizer]...mutationObserver` resize signals — the exact same
 *   message type fires on every internal DOM mutation, with no way to
 *   distinguish "a date was picked" from "the form just appeared" from any
 *   other UI change inside the iframe. GHL exposes no documented, reliable
 *   signal for these steps. Implementing them anyway would mean guessing a
 *   trigger with no real signal behind it, which produces fabricated data,
 *   not a measurement.
 *
 * scc_confirmation_page_viewed  client · /consultation/confirmed mount
 *   Fires once per load of the confirmation page. This is a page-view
 *   proxy only — it does NOT mean a booking was verified by GHL (a visitor
 *   could reach this URL directly without booking). Kept deliberately
 *   separate from scc_appointment_booked for that reason.
 *
 * scc_appointment_booked        SERVER · app/api/ghl/booking-webhook
 *   Fires only when GHL's "Customer Booked Appointment" trigger (workflow
 *   `06b. Appointment Confirm and Reminders`) calls our webhook with a real
 *   appointment payload. This is the authoritative booking event — the
 *   thing that actually answers "how many consultations did GHL book,"
 *   as opposed to "how many people reached the confirmation URL."
 *   Deduplicated server-side on GHL's appointment ID via a Supabase unique
 *   constraint (see supabase/scc_analytics_events.sql) — a retried/
 *   duplicate webhook delivery for the same appointment is a no-op.
 * ──────────────────────────────────────────────────────────────────────
 */

export const SCC_EVENTS = {
  LANDING_VIEWED: 'scc_landing_viewed',
  VIDEO_VISIBLE: 'scc_video_visible',
  VIDEO_STARTED: 'scc_video_started',
  VIDEO_PROGRESS: 'scc_video_progress',
  VIDEO_PAUSED: 'scc_video_paused',
  VIDEO_RESUMED: 'scc_video_resumed',
  VIDEO_SEEKED: 'scc_video_seeked',
  VIDEO_COMPLETED: 'scc_video_completed',
  SCROLL_DEPTH: 'scc_scroll_depth',
  SCHEDULE_CTA_CLICKED: 'scc_schedule_cta_clicked',
  CALENDAR_VIEWED: 'scc_calendar_viewed',
  CONFIRMATION_PAGE_VIEWED: 'scc_confirmation_page_viewed',
  APPOINTMENT_BOOKED: 'scc_appointment_booked',
} as const;

export type SccEventName = (typeof SCC_EVENTS)[keyof typeof SCC_EVENTS];
