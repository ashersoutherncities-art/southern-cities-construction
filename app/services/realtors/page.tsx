'use client';

import AvatarPageTemplate from '@/components/services/AvatarPageTemplate';
import { getAvatarPage } from '@/lib/services-data';

const baseData = getAvatarPage('realtors');

const teamPlan = {
  title: 'Team Deal & Listing Desk',
  price: '$2,400/mo',
  summary:
    'A separate team plan for small teams and boutique brokerages that want one place to send recurring deal and listing questions.',
  details: [
    'Up to 15 pooled support cases each month',
    'Shared support lane for up to 5 agents',
    'One monthly 30-minute team call',
    'Consistent written guidance across listing and deal questions',
  ],
  fit:
    'Best when too many agents are solving repair and prep questions alone, wasting time, and giving clients inconsistent answers.',
  limits: '15 pooled cases, up to 5 covered agents',
  turnaround: '1 business day first response, same-day triage for urgent active-deal items when possible',
};

export default function RealtorServicesPage() {
  if (!baseData) return null;

  const data = {
    ...baseData,
    recurringIntro:
      'For individual agents, the main monthly fits are Deal Desk and Listing Prep Desk. Team support belongs in its own brokerage plan below.',
  };

  return (
    <>
      <AvatarPageTemplate data={data} />
      <section className="border-t border-stone-200 bg-stone-50 py-16 sm:py-20">
        <div className="container-pro">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">For teams and brokerages</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Team support belongs in a separate plan.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
              If multiple agents keep running into the same inspection, repair, and listing-prep questions, use a pooled team plan instead of trying to force team demand into an individual agent support offer.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="flex h-full w-full max-w-[520px] flex-col rounded-[22px] border border-stone-200 bg-white p-6 shadow-elev-1">
              <div className="mb-4 inline-flex w-fit rounded-full border border-orange/25 bg-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-orange">
                Team plan
              </div>
              <h3 className="text-[24px] font-extrabold leading-tight tracking-tight text-navy">{teamPlan.title}</h3>
              <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                <p className="text-lg font-extrabold text-navy">{teamPlan.price}</p>
                <p className="mt-2 text-sm text-stone-600">{teamPlan.limits}</p>
                <p className="mt-1 text-sm text-stone-600">{teamPlan.turnaround}</p>
              </div>
              <div className="mt-4 space-y-4 text-[14.5px] leading-relaxed text-stone-700">
                <p>{teamPlan.summary}</p>
                <ul className="space-y-2">
                  {teamPlan.details.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-stone-600">{teamPlan.fit}</p>
              </div>
              <div className="mt-auto pt-6">
                <a
                  href="/recurring-support#realtors"
                  className="inline-block w-full rounded-full bg-navy py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-navy-700"
                >
                  Request Team Plan
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
