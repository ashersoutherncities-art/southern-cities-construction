import { fetchSccGoogleReviews } from "@/lib/google-reviews";

export default async function GoogleRatingBadge() {
  const summary = await fetchSccGoogleReviews();
  if (!summary || summary.userRatingCount === 0) return null;
  const rating = summary.rating.toFixed(1);
  const count = summary.userRatingCount;
  const label = `${count} Google review${count === 1 ? "" : "s"}`;
  return (
    <div className="p-trust">
      <span className="p-stars">★★★★★</span>
      <span className="p-trust-num">{rating}</span>
      <span className="p-trust-label">{label}</span>
    </div>
  );
}
