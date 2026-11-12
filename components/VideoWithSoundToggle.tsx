'use client';

import { useEffect, useRef, useState } from 'react';
import posthog from 'posthog-js';
import { posthogReady } from '@/components/analytics/PostHogProvider';
import { SCC_EVENTS } from '@/lib/analytics/schema';

type Props = {
  src: string;
  poster: string;
  /** Stable id for this video across analytics events — see schema.ts. */
  videoId: string;
  /** 'cover' fills the box and crops overflow; 'contain' letterboxes the
   * whole frame in view — use 'contain' when the container's aspect ratio
   * doesn't match the source video's (e.g. a portrait source in a
   * landscape box). Defaults to 'cover'. */
  fit?: 'cover' | 'contain';
  /** Set false for a secondary video on a page with multiple players (e.g.
   * several VSLs stacked together) — avoids every video fetching and
   * playing at once. Shows the poster with a tap-to-play/unmute overlay
   * instead; clicking it both starts playback and turns on sound, since
   * there's no autoplay state to unmute from. Defaults to true. */
  autoPlay?: boolean;
};

const PCT_MILESTONES = [25, 50, 75, 90, 100] as const;
const TIME_MILESTONES = [3, 10, 30] as const;
const CHECKPOINT_INTERVAL_SECONDS = 10;

/**
 * Autoplays muted (the only way autoplay works in any browser), with a
 * large, obvious overlay button to turn sound on — clicking it is a direct
 * user gesture, so the browser allows audible playback from that point on.
 *
 * Also instruments real watch-time analytics. The core metric is "unique
 * watched seconds" — merged, deduplicated playhead ranges actually covered
 * by continuous playback — NOT raw playhead position. That's what powers
 * both the percentage milestones (25/50/75/90/100%) and the time
 * checkpoints (3s/10s/30s): seeking from 5% to 75% only gives you ~5
 * watched seconds at the start, so the 75% milestone correctly does not
 * fire just because the playhead jumped there. See schema.ts for the full
 * event contract.
 */
export default function VideoWithSoundToggle({ src, poster, videoId, fit = 'cover', autoPlay = true }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);

  const unmute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.muted = false;
    el.volume = 1;
    el.play().catch(() => {});
    setMuted(false);
  };

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;
    if (!posthogReady()) return;

    const pathPath = () => window.location.pathname;
    const capture = (event: string, extra: Record<string, unknown>) => {
      posthog.capture(event, {
        video_id: videoId,
        video_duration_seconds: video.duration || null,
        page_path: pathPath(),
        ...extra,
      });
    };

    // ---- watched-seconds accounting ----
    // Merged [start, end] ranges of playhead actually covered by
    // continuous playback (not seeked-over). duration-agnostic: works
    // whether or not metadata has loaded yet.
    const watchedRanges: Array<[number, number]> = [];
    let currentRangeStart: number | null = null;
    let lastPlayhead = 0;
    let lastWallTime = 0;
    let playbackRate = 1;

    const uniqueWatchedSeconds = (): number => {
      // ranges are built append-only and non-overlapping by construction
      // (each new range starts only after a seek/pause break), so a plain
      // sum is correct without a separate merge pass.
      let total = 0;
      for (const [s, e] of watchedRanges) total += Math.max(0, e - s);
      if (currentRangeStart !== null) total += Math.max(0, lastPlayhead - currentRangeStart);
      return total;
    };

    const closeCurrentRange = () => {
      if (currentRangeStart !== null) {
        watchedRanges.push([currentRangeStart, lastPlayhead]);
        currentRangeStart = null;
      }
    };

    // ---- visibility (scc_video_visible) ----
    let visibleFired = false;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (visibleFired) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          visibleFired = true;
          capture(SCC_EVENTS.VIDEO_VISIBLE, {});
          visibilityObserver.disconnect();
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    visibilityObserver.observe(container);

    // ---- playback state ----
    let startFired = false;
    let completedFired = false;
    const milestonesFired = new Set<number>();
    const timeMilestonesFired = new Set<number>();
    let lastCheckpointBucket = 0;
    let pauseResumeThrottleUntil = 0;
    let tabHidden = document.visibilityState === 'hidden';

    const evaluateMilestones = () => {
      const duration = video.duration;
      if (!duration || !isFinite(duration)) return;
      const watched = uniqueWatchedSeconds();

      for (const t of TIME_MILESTONES) {
        if (watched >= t && !timeMilestonesFired.has(t)) {
          timeMilestonesFired.add(t);
          capture(SCC_EVENTS.VIDEO_PROGRESS, {
            kind: 'time_milestone',
            watched_seconds: Math.round(watched * 10) / 10,
            playhead_seconds: Math.round(video.currentTime * 10) / 10,
          });
        }
      }

      const pct = (watched / duration) * 100;
      for (const m of PCT_MILESTONES) {
        if (pct >= m && !milestonesFired.has(m)) {
          milestonesFired.add(m);
          capture(SCC_EVENTS.VIDEO_PROGRESS, {
            kind: 'percent_milestone',
            progress_percentage: m,
            watched_seconds: Math.round(watched * 10) / 10,
            playhead_seconds: Math.round(video.currentTime * 10) / 10,
          });
        }
      }

      const bucket = Math.floor(watched / CHECKPOINT_INTERVAL_SECONDS);
      if (bucket > lastCheckpointBucket) {
        lastCheckpointBucket = bucket;
        capture(SCC_EVENTS.VIDEO_PROGRESS, {
          kind: 'checkpoint',
          watched_seconds: Math.round(watched * 10) / 10,
          // unique_watched_seconds intentionally NOT clamped — for a
          // looping video, watching through it twice really is 2x
          // duration of genuine watched time, and that's a real, useful
          // signal (engaged viewer vs. someone who left the tab open).
          unique_watched_seconds: Math.round(watched * 10) / 10,
          // progress_percentage IS clamped to 100 — "percent of the video
          // reached" has no sensible meaning past full completion, and an
          // unclamped value (359% after ~3.4 loops) reads as broken data
          // rather than a real metric.
          progress_percentage: Math.round(Math.min(pct, 100)),
          playhead_seconds: Math.round(video.currentTime * 10) / 10,
        });
      }

      // loop=true means the element never fires a real `ended` event — a
      // wraparound (large backward jump landing near 0 right after being
      // near the end) is the only signal we get for a real completion.
      if (!completedFired && pct >= 99.5) {
        completedFired = true;
        capture(SCC_EVENTS.VIDEO_COMPLETED, {
          watched_seconds: Math.round(watched * 10) / 10,
        });
      }
    };

    const onPlay = () => {
      if (tabHidden) return;
      lastPlayhead = video.currentTime;
      lastWallTime = performance.now();
      playbackRate = video.playbackRate || 1;
      if (currentRangeStart === null) currentRangeStart = video.currentTime;

      if (!startFired) {
        startFired = true;
        capture(SCC_EVENTS.VIDEO_STARTED, { autoplay: !video.paused && video.muted });
      } else if (performance.now() > pauseResumeThrottleUntil) {
        pauseResumeThrottleUntil = performance.now() + 300;
        capture(SCC_EVENTS.VIDEO_RESUMED, { playhead_seconds: Math.round(video.currentTime * 10) / 10 });
      }
    };

    const onPause = () => {
      closeCurrentRange();
      if (startFired && performance.now() > pauseResumeThrottleUntil) {
        pauseResumeThrottleUntil = performance.now() + 300;
        capture(SCC_EVENTS.VIDEO_PAUSED, { playhead_seconds: Math.round(video.currentTime * 10) / 10 });
      }
      evaluateMilestones();
    };

    // A seek can be discovered from either `seeked` or an intervening
    // `timeupdate` that lands between `seeking` and `seeked` with the
    // post-seek position already in effect (browsers don't guarantee
    // `video.seeking` is still true at that point) — whichever notices
    // first reports it, this guard stops the other from double-reporting
    // the same jump.
    let lastReportedSeekTo: number | null = null;
    const reportSeekIfNew = (from: number, to: number) => {
      if (Math.abs(to - from) <= 1.5) return;
      if (lastReportedSeekTo === to) return;
      lastReportedSeekTo = to;
      capture(SCC_EVENTS.VIDEO_SEEKED, {
        from_seconds: Math.round(from * 10) / 10,
        to_seconds: Math.round(to * 10) / 10,
      });
    };

    const onTimeUpdate = () => {
      if (video.paused || video.seeking || tabHidden) return;
      const now = performance.now();
      const wallDelta = (now - lastWallTime) / 1000;
      const playheadDelta = video.currentTime - lastPlayhead;
      const expected = wallDelta * playbackRate;

      // Real continuous playback: playhead moved forward roughly in step
      // with wall-clock time (generous tolerance for timeupdate's own
      // irregular firing — browsers fire it a few times a second, not on
      // a fixed clock). A delta wildly out of that range means a seek
      // slipped through without a `seeked` event, or a stall/jump — treat
      // either as a break rather than silently counting it as watched.
      if (playheadDelta >= -0.25 && playheadDelta <= Math.max(2, expected * 3)) {
        if (currentRangeStart === null) currentRangeStart = lastPlayhead;
      } else {
        closeCurrentRange();
        reportSeekIfNew(lastPlayhead, video.currentTime);
        currentRangeStart = video.currentTime;
      }

      lastPlayhead = video.currentTime;
      lastWallTime = now;
      playbackRate = video.playbackRate || 1;
      evaluateMilestones();
    };

    const onSeeking = () => {
      closeCurrentRange();
    };

    const onSeeked = () => {
      const from = lastPlayhead;
      const to = video.currentTime;
      reportSeekIfNew(from, to);
      lastPlayhead = to;
      lastWallTime = performance.now();
      // leave currentRangeStart null — onPlay/onTimeUpdate reopens a range
      // from here if playback is actually continuing.
    };

    const onVisibilityChange = () => {
      tabHidden = document.visibilityState === 'hidden';
      if (tabHidden) {
        closeCurrentRange();
        evaluateMilestones();
      } else if (!video.paused) {
        lastPlayhead = video.currentTime;
        lastWallTime = performance.now();
        currentRangeStart = video.currentTime;
      }
    };

    const flush = () => {
      closeCurrentRange();
      evaluateMilestones();
    };

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('seeking', onSeeking);
    video.addEventListener('seeked', onSeeked);
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pagehide', flush);

    return () => {
      flush();
      visibilityObserver.disconnect();
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('seeking', onSeeking);
      video.removeEventListener('seeked', onSeeked);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pagehide', flush);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <video
        ref={videoRef}
        controls
        autoPlay={autoPlay}
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
      >
        <source src={src} type="video/mp4" />
      </video>

      {muted && (
        <button
          type="button"
          onClick={unmute}
          aria-label="Turn on sound"
          className="group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/25 transition hover:bg-black/35"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-orange shadow-xl transition group-hover:scale-105 group-hover:bg-orange-bright">
            <svg className="ml-1.5 h-9 w-9 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7-11-7z" />
            </svg>
          </span>
          <span className="rounded-full bg-black/60 px-4 py-1.5 text-[13px] font-black text-white">
            Tap for sound
          </span>
        </button>
      )}
    </div>
  );
}
