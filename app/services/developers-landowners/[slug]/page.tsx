import { permanentRedirect } from 'next/navigation';
import { getServiceBySlug } from '@/lib/services-data';

const legacySlugMap: Record<string, string> = {
  'project-review': 'project-review',
  'budget-scope-review': 'budget-scope-review',
  'permit-administration-construction-oversight': 'permit-administration-construction-oversight',
  'project-control-plan': 'project-control-plan',
  'execution-oversight-retainer': 'execution-oversight-retainer',
};

export function generateStaticParams() {
  return Object.keys(legacySlugMap).map((slug) => ({ slug }));
}

export default async function DeveloperLegacyRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mappedSlug = legacySlugMap[slug] || slug;
  const service = getServiceBySlug('developers-landowners', mappedSlug);

  if (!service) {
    permanentRedirect('/services/developers-landowners');
  }

  permanentRedirect(service.detailHref);
}
