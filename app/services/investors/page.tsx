'use client';

import AvatarPageTemplate from '@/components/services/AvatarPageTemplate';
import { getAvatarPage } from '@/lib/services-data';

const baseData = getAvatarPage('investors');

export default function InvestorServicesPage() {
  if (!baseData) return null;

  const data = {
    ...baseData,
    heroSubtitle:
      'Southern Cities helps investors get cleaner numbers before spending, tighter startup decisions before mobilizing, and better control when active work starts dragging on timeline, rent, and margin.',
    recurringIntro:
      'Use a monthly plan when repeated turns, lender needs, draw questions, and active-job decisions keep showing up across the portfolio.',
  };

  return <AvatarPageTemplate data={data} />;
}
