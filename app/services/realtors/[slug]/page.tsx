import { permanentRedirect } from 'next/navigation';
import { getServiceBySlug } from '@/lib/services-data';

const legacySlugMap: Record<string, string> = {
  'pre-listing-work': 'pre-listing-budget-prep-review',
  'listing-prep-coordination': 'listing-prep-coordination',
  'deal-desk': 'deal-desk',
  'listing-prep-desk': 'listing-prep-desk',
};

export function generateStaticParams() {
  return Object.keys(legacySlugMap).map((slug) => ({ slug }));
}

export default async function RealtorLegacyRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mappedSlug = legacySlugMap[slug] || slug;
  const service = getServiceBySlug('realtors', mappedSlug);

  if (!service) {
    permanentRedirect('/services/realtors');
  }

  permanentRedirect(service.detailHref);
}
