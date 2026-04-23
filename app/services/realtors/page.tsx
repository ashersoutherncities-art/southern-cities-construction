'use client';

import AvatarPageTemplate from '@/components/services/AvatarPageTemplate';
import { getAvatarPage } from '@/lib/services-data';

const baseData = getAvatarPage('realtors');

export default function RealtorServicesPage() {
  if (!baseData) return null;

  const data = {
    ...baseData,
    recurringIntro:
      'For individual agents, the cleanest monthly fits are Deal Desk for active deals and Listing Prep Desk for repeated listing-prep questions.',
  };

  return <AvatarPageTemplate data={data} />;
}
