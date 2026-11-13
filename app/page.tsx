import HomeContent from '@/components/HomeContent';
import GoogleReviews from '@/components/GoogleReviews';
import GoogleRatingBadge from '@/components/GoogleRatingBadge';

// Keep Google Places requests on the server. Interactive content receives
// rendered slots rather than importing async Server Components into its bundle.
export const revalidate = 21600;

export default function Home() {
  return <HomeContent reviews={<GoogleReviews />} ratingBadge={<GoogleRatingBadge />} />;
}
