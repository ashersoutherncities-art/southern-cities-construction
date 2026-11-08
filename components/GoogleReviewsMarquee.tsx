"use client";

import Image from "next/image";
import { useMemo } from "react";
import type { GoogleReview } from "@/lib/google-reviews";

type Theme = "light" | "dark";

function Stars({ rating, theme }: { rating: number; theme: Theme }) {
  const full = Math.round(rating);
  const empty = theme === "dark" ? "text-white/25" : "text-stone-300";
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating.toFixed(1)} star review`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < full ? "text-orange" : empty}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleG({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <path fill="#4285F4" d="M24 9.5c3.3 0 6.3 1.1 8.6 3.3l6.4-6.4C35.3 2.7 29.9.5 24 .5 14.6.5 6.5 5.8 2.6 13.5l7.5 5.8C11.9 13.6 17.4 9.5 24 9.5z" />
      <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 2.8-2.1 5.1-4.5 6.7l7 5.4c4.1-3.8 6.3-9.3 6.3-16.6z" />
      <path fill="#FBBC05" d="M10.1 28.7c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-7.5-5.8C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.5l7.5-5.8z" />
      <path fill="#EA4335" d="M24 47.5c6 0 11-2 14.7-5.4l-7-5.4c-2 1.3-4.5 2.1-7.7 2.1-6.6 0-12.1-4.1-14.1-10l-7.5 5.8C6.5 42.2 14.6 47.5 24 47.5z" />
    </svg>
  );
}

function ReviewCard({ r, theme }: { r: GoogleReview; theme: Theme }) {
  const isDark = theme === "dark";
  const card = isDark
    ? "border-white/10 bg-white/[0.04] backdrop-blur-sm"
    : "border-stone-200 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)]";
  const nameColor = isDark ? "text-white" : "text-navy";
  const metaColor = isDark ? "text-white/55" : "text-stone-500";
  const textColor = isDark ? "text-white/85" : "text-stone-800";
  const fallbackAvatar = isDark
    ? "bg-gradient-to-br from-orange-400 to-[#fa8c41] text-white"
    : "bg-navy text-white";
  return (
    <article
      className={`flex h-full w-[340px] shrink-0 flex-col rounded-2xl border p-6 sm:w-[380px] ${card}`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {r.authorPhoto ? (
            <Image
              src={r.authorPhoto}
              alt=""
              width={40}
              height={40}
              unoptimized
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${fallbackAvatar}`}>
              {r.author.charAt(0)}
            </div>
          )}
          <div>
            <div className={`text-sm font-semibold ${nameColor}`}>{r.author}</div>
            <div className={`text-[11px] uppercase tracking-wider ${metaColor}`}>{r.relativeTime}</div>
          </div>
        </div>
        <GoogleG className="h-5 w-5" />
      </div>
      <Stars rating={r.rating} theme={theme} />
      <p className={`mt-4 whitespace-pre-line text-[14.5px] leading-relaxed ${textColor}`}>
        {r.text}
      </p>
    </article>
  );
}

interface Props {
  reviews: GoogleReview[];
  theme: Theme;
}

export default function GoogleReviewsMarquee({ reviews, theme }: Props) {
  const track = useMemo(() => {
    if (reviews.length === 0) return [];
    const minItems = 8;
    const copies = Math.max(2, Math.ceil(minItems / reviews.length));
    const out: Array<GoogleReview & { _key: string }> = [];
    for (let i = 0; i < copies; i++) {
      reviews.forEach((r, j) => out.push({ ...r, _key: `${i}-${j}-${r.author}` }));
    }
    return out;
  }, [reviews]);

  const isDark = theme === "dark";
  const fadeFromA = isDark ? "from-[#08111d]" : "from-white";

  if (track.length === 0) return null;

  const halfLen = track.length / 2;
  const seconds = Math.max(40, halfLen * 9);

  return (
    <div
      className="relative mt-8 overflow-hidden"
      style={{ maskImage: "linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)" }}
    >
      <div
        className="reviews-marquee-track flex gap-4 py-2"
        style={{ animationDuration: `${seconds}s` }}
      >
        {track.map((r) => (
          <ReviewCard key={r._key} r={r} theme={theme} />
        ))}
      </div>
      <div className={`pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r ${fadeFromA} to-transparent`} aria-hidden />
      <div className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l ${fadeFromA} to-transparent`} aria-hidden />
    </div>
  );
}
