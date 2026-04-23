'use client';

import AvatarPageTemplate from '@/components/services/AvatarPageTemplate';
import { getAvatarPage } from '@/lib/services-data';

const baseData = getAvatarPage('realtors');

export default function RealtorServicesPage() {
  if (!baseData) return null;

  const data = {
    ...baseData,
    recurringIntro:
      'For individual agents, the main monthly fits are Deal Desk and Listing Prep Desk.',
  };

  return <AvatarPageTemplate data={data} />;
}
