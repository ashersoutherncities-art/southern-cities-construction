'use client';

import AvatarPageTemplate from '@/components/services/AvatarPageTemplate';
import { getAvatarPage } from '@/lib/services-data';

const baseData = getAvatarPage('homeowners');

export default function HomeownerServicesPage() {
  if (!baseData) return null;

  const data = {
    ...baseData,
    heroTitle: 'Residential project help before you overcommit',
    heroSubtitle:
      'Southern Cities helps homeowners buy the right support at the right stage, from clearer next steps and permit-path review to budget direction, project support, and full contracting when the project calls for that level of execution. NC GC License #107724. 5 years in business, 120+ investors & owners served, Charlotte HQ, statewide NC.',
    painPoints: [
      'You need a clearer next step before spending more money.',
      'Permit questions and paperwork are creating hesitation around what to do next.',
      'Budget and scope still feel too loose to move forward casually.',
      'The project needs stronger follow-through without jumping straight into the wrong construction relationship.',
    ],
    outcomes: [
      'A clearer next step before commitment.',
      'Better permit-path clarity and less paperwork confusion.',
      'More realistic budget direction before the wrong spend happens.',
      'Stronger support during active work, with full contracting available when it is the right fit.',
    ],
  };

  return <AvatarPageTemplate data={data} />;
}
