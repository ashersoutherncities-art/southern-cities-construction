# Google reviews refresh

The site reads the SCC Google Place through the existing Places API configuration.
The rating, total count, and Google-selected review excerpts use a six-hour Next.js
server cache. After the cache expires, incoming traffic triggers revalidation;
this is not a real-time push subscription or a promise of exact six-hour delivery.
Google's own publication/moderation delay also applies.

Homepage interactive content accepts server-rendered review/rating slots. The
Places helper is marked server-only to catch accidental client imports at build.
Network timeouts and API failures do not crash the surrounding marketing page.

Google Places returns at most five review excerpts, selected by Google, not every
review or necessarily the newest. The existing Google link is the full source.
No new subscription or provider was added, and the existing fetch interval is
unchanged.

Check with `node scripts/check-google-reviews.cjs`, `npm run lint`,
`npx tsc --noEmit`, and `npm run build`. Production must have the existing
`GOOGLE_PLACES_API_KEY` or legacy `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` available.
Do not print credential values in logs.
