'use client';

import AvatarPageTemplate from '@/components/services/AvatarPageTemplate';
import { getAvatarPage } from '@/lib/services-data';

const baseData = getAvatarPage('developers-landowners');

export default function DevelopersLandownersServicesPage() {
  if (!baseData) return null;

  const data = {
    ...baseData,
    heroTitle: 'Construction help for developers and landowners — clearer reads before commitment and tighter execution control during the build',
    heroSubtitle:
      'Southern Cities helps developers and landowners buy the right construction support at the right stage — pre-decision project review, planning, permit administration, oversight, and full execution when the project calls for it. NC GC License #107724.',
    painPoints: [
      'You need a clearer construction read before committing more capital.',
      'Project scope and budget feel too loose to confidently move forward.',
      'Permit and inspection drag could stall the build at the wrong moment.',
      'Execution oversight is thin and the project needs stronger control.',
    ],
    outcomes: [
      'A construction-side opinion before deal or project commitments lock in.',
      'Cleaner scope, budget, and timeline before execution starts.',
      'Permit and inspection handled by people who do this every week.',
      'Tighter execution control without giving up project ownership.',
    ],
  };

  return <AvatarPageTemplate data={data} />;
}
