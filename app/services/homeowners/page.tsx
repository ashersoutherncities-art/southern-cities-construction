'use client';

import AvatarPageTemplate from '@/components/services/AvatarPageTemplate';
import { getAvatarPage } from '@/lib/services-data';

const baseData = getAvatarPage('homeowners');

export default function HomeownerServicesPage() {
  if (!baseData) return null;

  const data = {
    ...baseData,
    heroTitle: 'Licensed NC general contractor for renovations, additions, and exterior work',
    heroSubtitle:
      'Southern Cities is your licensed GC of record for owner-occupied renovations across North Carolina. We handle full general contracting, permit administration, and inspection coordination under one license — NC GC #107724. 5 years in business, 15+ completed projects, Charlotte HQ, statewide NC.',
    painPoints: [
      'You want a licensed GC running the project, not a referral chain.',
      'Permit applications and plan-review responses keep stalling the start.',
      'You need a real budget conversation, not a sticker-shock estimate.',
      'You want one point of contact through the build, not a moving roster.',
    ],
    outcomes: [
      'One licensed GC accountable for scope, schedule, and quality.',
      'Permit administration and inspection coordination handled for you.',
      'Honest budget direction before the design and scope lock in.',
      'Steady communication while the work is in the field.',
    ],
  };

  return <AvatarPageTemplate data={data} />;
}
