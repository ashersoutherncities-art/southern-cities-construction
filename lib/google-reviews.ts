export const SCC_PLACE_ID = "ChIJsYjxs8qhVogRPORmsSZR3q0";
export const SCC_GOOGLE_MAPS_URL = "https://maps.google.com/?cid=12528540440018215996";

// Last-name privacy mask applied to every Google reviewer name before it
// reaches the UI. Mirrors the convention their own Google Business snippet
// often shows: full first name, last-name initial + period. Single-token
// names (handles, first-name-only reviewers) pass through unchanged so we
// never fabricate an initial they didn't give.
export function abbreviateAuthorName(raw: string): string {
  const name = (raw ?? "").trim().replace(/\s+/g, " ");
  if (!name) return "";
  const tokens = name.split(" ");
  if (tokens.length === 1) return tokens[0];
  const first = tokens[0];
  const lastInitial = tokens[tokens.length - 1].charAt(0).toUpperCase();
  if (!lastInitial) return first;
  return `${first} ${lastInitial}.`;
}

export interface GoogleReview {
  author: string;
  authorPhoto?: string;
  authorProfileUrl?: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishedAt: string;
}

export interface PlaceSummary {
  name: string;
  rating: number;
  userRatingCount: number;
  googleMapsUri: string;
  reviews: GoogleReview[];
}

interface PlacesApiReview {
  rating: number;
  relativePublishTimeDescription: string;
  publishTime: string;
  text?: { text: string };
  originalText?: { text: string };
  authorAttribution: {
    displayName: string;
    uri?: string;
    photoUri?: string;
  };
}

interface PlacesApiResponse {
  displayName?: { text: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesApiReview[];
}

export async function fetchSccGoogleReviews(): Promise<PlaceSummary | null> {
  const key =
    process.env.GOOGLE_PLACES_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) return null;

  const url = `https://places.googleapis.com/v1/places/${SCC_PLACE_ID}?languageCode=en`;
  const res = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask":
        "id,displayName,rating,userRatingCount,googleMapsUri,reviews",
    },
    next: { revalidate: 21600 },
  });

  if (!res.ok) return null;
  const data = (await res.json()) as PlacesApiResponse;

  // Sort newest-first AND mask reviewer surnames. The Places API (new) Place
  // Details endpoint returns up to 5 reviews in Google's own order (no sort
  // parameter exists), so we sort client-side to guarantee the most recent
  // appear first whichever 5 Google picks. abbreviateAuthorName applies the
  // first-name + last-initial privacy convention across every surface.
  const reviews: GoogleReview[] = (data.reviews ?? [])
    .slice()
    .sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime())
    .map((r) => ({
      author: abbreviateAuthorName(r.authorAttribution.displayName),
      authorPhoto: r.authorAttribution.photoUri,
      authorProfileUrl: r.authorAttribution.uri,
      rating: r.rating,
      text: r.text?.text ?? r.originalText?.text ?? "",
      relativeTime: r.relativePublishTimeDescription,
      publishedAt: r.publishTime,
    }));

  return {
    name: data.displayName?.text ?? "Southern Cities Construction",
    rating: data.rating ?? 0,
    userRatingCount: data.userRatingCount ?? 0,
    googleMapsUri: data.googleMapsUri ?? SCC_GOOGLE_MAPS_URL,
    reviews,
  };
}
