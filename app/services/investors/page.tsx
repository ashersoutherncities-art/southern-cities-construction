'use client';

import AvatarPageTemplate from '@/components/services/AvatarPageTemplate';
import { getAvatarPage } from '@/lib/services-data';

const baseData = getAvatarPage('investors');

export default function InvestorServicesPage() {
  if (!baseData) return null;

  const data = {
    ...baseData,
    heroTitle: 'Construction help for investors at every project stage',
    heroSubtitle:
      'Southern Cities helps investors buy the right support before buying, before startup, during lender and draw setup, during active execution, and across repeat projects, with full contracting available when the scope calls for licensed execution. NC GC License #107724. 5 years in business, 15+ projects completed, headquartered in Charlotte and licensed statewide.',
    painPoints: [
      'The numbers still are not solid enough yet.',
      'Contractor setup, permit-path, or startup decisions still feel too loose.',
      'Lender, draw, and bid support need to get cleaner before the file moves forward well.',
      'Active work needs stronger oversight, coordination, or repeat support capacity.',
    ],
    outcomes: [
      'A better read before money goes out.',
      'Cleaner startup decisions and better contractor fit.',
      'Stronger lender-facing and draw support.',
      'Better execution support during active work, with full contracting available when needed.',
    ],
    recurringIntro:
      'For repeat investors running multiple files at a time, we also offer recurring support plans for turn work, draw support, project oversight, and operator support across the portfolio.',
    stageGroups: baseData.stageGroups?.map((group) =>
      group.title === 'During lender and draw setup'
        ? {
            ...group,
            intro:
              'Use these when lender-facing scope support, bid backup, draw support, or submission material needs to get cleaner before the file slows down more.',
          }
        : group.title === 'During active execution'
          ? {
              ...group,
              intro:
                'Use these when the project is already moving and delay, weak follow-through, or loose coordination is starting to threaten time or margin.',
            }
          : group
    ),
  };

  return <AvatarPageTemplate data={data} />;
}
