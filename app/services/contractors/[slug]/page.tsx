import { permanentRedirect } from 'next/navigation';
import { getServiceBySlug } from '@/lib/services-data';

const legacySlugMap: Record<string, string> = {
  'permit-administration': 'permit-administration',
  'inspection-scheduling-support': 'inspection-scheduling-support',
  'admin-support-for-active-jobs': 'admin-support-for-active-jobs',
  'construction-oversight-support': 'construction-oversight-support',
  'permit-inspection-support-plan': 'permit-inspection-support-plan',
  'back-office-support-plan': 'back-office-support-plan',
  'contractor-office-extension-retainer': 'contractor-office-extension-retainer',
};

export function generateStaticParams() {
  return Object.keys(legacySlugMap).map((slug) => ({ slug }));
}

export default async function ContractorLegacyRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mappedSlug = legacySlugMap[slug] || slug;
  const service = getServiceBySlug('contractors', mappedSlug);

  if (!service) {
    permanentRedirect('/services/contractors');
  }

  permanentRedirect(service.detailHref);
}
