import { permanentRedirect } from 'next/navigation';
import { getServiceBySlug } from '@/lib/services-data';

const legacySlugMap: Record<string, string> = {
  'contractor-match-bid-coordination': 'bid-coordination-contractor-match',
  'full-due-diligence-package': 'investor-review',
  'project-timeline-schedule-preparation': 'regional-investor-setup-consultation',
  'schedule-of-cashflows-preparation': 'regional-investor-setup-consultation',
  'permit-coordination-administration': 'permit-local-compliance-review',
  'lender-ready-scope-bid-package': 'lender-scope-bid-package',
  'construction-draw-strategy-alignment': 'draw-review-support',
  'owner-controlled-construction-gc-led': 'construction-oversight',
  'full-construction-management-service': 'construction-oversight',
  'regional-investor-construction-network-development': 'project-support-retainer',
  'project-coordination-control': 'turn-support-plan',
  'investor-operator-support': 'operator-support-plan',
  'due-diligence-package-3-deals-month': 'operator-support-plan',
  'construction-planning-package-3-deals-month': 'project-support-retainer',
};

export function generateStaticParams() {
  return Object.keys(legacySlugMap).map((slug) => ({ slug }));
}

export default async function InvestorLegacyRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mappedSlug = legacySlugMap[slug] || slug;
  const service = getServiceBySlug('investors', mappedSlug);

  if (!service) {
    permanentRedirect('/services/investors');
  }

  permanentRedirect(service.detailHref);
}
