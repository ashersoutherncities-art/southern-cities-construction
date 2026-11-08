export const SCC_PLACE_ID = "ChIJsYjxs8qhVogRPORmsSZR3q0";
export const SCC_GOOGLE_MAPS_URL = "https://maps.google.com/?cid=12528540440018215996";

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

  // Sort newest-first. The Places API (new) Place Details endpoint does not
  // accept a reviews sort parameter — it always returns up to 5 by Google's
  // own ranking. Google has 6+ reviews total; which 5 we get is up to Google,
  // but we can guarantee the 5 we show are rendered most-recent-first so new
  // reviews appear immediately when the cache revalidates.
  const reviews: GoogleReview[] = (data.reviews ?? [])
    .slice()
    .sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime())
    .map((r) => ({
      author: r.authorAttribution.displayName,
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
