'use client';

import AvatarPageTemplate from '@/components/services/AvatarPageTemplate';
import { getAvatarPage } from '@/lib/services-data';

const baseData = getAvatarPage('investors');

export default function InvestorServicesPage() {
  if (!baseData) return null;

  const data = {
    ...baseData,
    heroTitle: 'Construction support for investors before spending, before startup, and during active work',
    heroSubtitle:
      'Southern Cities helps investors get cleaner numbers before spending, tighter startup decisions before mobilizing, better lender and draw support when funding gets messy, and stronger control when active work starts dragging on timeline, rent, and margin.',
    painPoints: [
      'You need a cleaner number before approving the job.',
      'Hiring and startup decisions feel too loose.',
      'Lender or draw support is slowing funding conversations down.',
      'The job is moving, but delay is starting to eat rent or margin.',
    ],
    outcomes: [
      'Cleaner numbers before money goes out.',
      'Better startup decisions before the job mobilizes.',
      'Stronger lender-facing support and cleaner draw communication.',
      'Tighter control when active work cannot afford to drift.',
    ],
    recurringIntro:
      'Use a monthly plan when repeated turns, lender needs, draw questions, and active-job decisions keep showing up across the portfolio.',
  };

  return <AvatarPageTemplate data={data} />;
}
