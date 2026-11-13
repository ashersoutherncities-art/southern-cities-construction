import "server-only";
import { cache } from "react";

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

export const fetchSccGoogleReviews = cache(async (): Promise<PlaceSummary | null> => {
  const key =
    process.env.GOOGLE_PLACES_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) return null;

  const url = `https://places.googleapis.com/v1/places/${SCC_PLACE_ID}?languageCode=en`;
  try {
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask":
          "id,displayName,rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: 21600 },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return null;
    const data = (await res.json()) as PlacesApiResponse;

    const reviews: GoogleReview[] = (data.reviews ?? []).map((r) => ({
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
  } catch {
    // A transient Google/network failure must not take the marketing page down.
    return null;
  }
});
