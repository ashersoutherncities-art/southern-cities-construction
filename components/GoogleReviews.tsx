import Image from "next/image";
import {
  fetchSccGoogleReviews,
  SCC_GOOGLE_MAPS_URL,
  type GoogleReview,
} from "@/lib/google-reviews";

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <div
      className="flex items-center gap-0.5 text-orange"
      aria-label={`${rating.toFixed(1)} star review`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill={i < full ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={i < full ? 0 : 1.2}
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleG({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#4285F4"
        d="M24 9.5c3.3 0 6.3 1.1 8.6 3.3l6.4-6.4C35.3 2.7 29.9.5 24 .5 14.6.5 6.5 5.8 2.6 13.5l7.5 5.8C11.9 13.6 17.4 9.5 24 9.5z"
      />
      <path
        fill="#34A853"
        d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 2.8-2.1 5.1-4.5 6.7l7 5.4c4.1-3.8 6.3-9.3 6.3-16.6z"
      />
      <path
        fill="#FBBC05"
        d="M10.1 28.7c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-7.5-5.8C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.5l7.5-5.8z"
      />
      <path
        fill="#EA4335"
        d="M24 47.5c6 0 11-2 14.7-5.4l-7-5.4c-2 1.3-4.5 2.1-7.7 2.1-6.6 0-12.1-4.1-14.1-10l-7.5 5.8C6.5 42.2 14.6 47.5 24 47.5z"
      />
    </svg>
  );
}

function ReviewCard({ r }: { r: GoogleReview }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.04)] transition hover:border-stone-300 hover:shadow-md">
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
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
              {r.author.charAt(0)}
            </div>
          )}
          <div>
            <div className="text-sm font-semibold text-navy">{r.author}</div>
            <div className="text-[11px] uppercase tracking-wider text-stone-500">
              {r.relativeTime}
            </div>
          </div>
        </div>
        <GoogleG className="h-5 w-5" />
      </div>
      <Stars rating={r.rating} />
      <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-stone-800">
        {r.text}
      </p>
    </article>
  );
}

export default async function GoogleReviews() {
  const summary = await fetchSccGoogleReviews();
  if (!summary || summary.reviews.length === 0) return null;

  const url = summary.googleMapsUri || SCC_GOOGLE_MAPS_URL;
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="container-pro">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
              Google Reviews
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              What NC investors say on Google.
            </h2>
            <div className="mt-4 flex items-center gap-3">
              <Stars rating={summary.rating} />
              <span className="text-sm font-semibold text-navy">
                {summary.rating.toFixed(1)}
              </span>
              <span className="text-sm text-stone-600">
                from {summary.userRatingCount} Google review
                {summary.userRatingCount === 1 ? "" : "s"}
              </span>
              <GoogleG />
            </div>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-navy/40"
          >
            Leave a review on Google
            <span aria-hidden>&rarr;</span>
          </a>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {summary.reviews.map((r) => (
            <ReviewCard key={`${r.author}-${r.publishedAt}`} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
