'use client';

import AvatarPageTemplate from '@/components/services/AvatarPageTemplate';
import { getAvatarPage } from '@/lib/services-data';

const baseData = getAvatarPage('investors');

export default function InvestorServicesPage() {
  if (!baseData) return null;

  const data = {
    ...baseData,
    heroTitle: 'NC general contractor for investor rehabs, flips, and turn work — typically completed in 1 to 3 months',
    heroSubtitle:
      'Investor rehabs and flips are our strongest channel. Southern Cities runs the full GC role on single-family rehabs across NC, including permit administration, scope execution, and rehab management. NC GC License #107724. 5 years in business, 15+ projects completed, headquartered in Charlotte and licensed statewide.',
    painPoints: [
      'You need a contractor who can actually run the rehab, not just bid it.',
      'Permit administration keeps stalling the schedule.',
      'You want one licensed GC on the file, not a string of subs to manage yourself.',
      'Your lender needs scope and draw support that holds up under review.',
    ],
    outcomes: [
      'A licensed NC GC running the rehab end to end.',
      'Permit applications, plan review responses, and inspections handled in-house.',
      'Typical investor rehab completed in 1 to 3 months.',
      'Lender-facing scope and draw support backed by real project documentation.',
    ],
    recurringIntro:
      'For repeat investors running multiple files at a time, we also offer monthly support plans for turn work, draw support, and active-project oversight across the portfolio.',
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
