import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

type RecurringCard = {
  name: string;
  tag: string;
  price: string;
  who: string;
  problem: string;
  creditSummary: string;
  creditUses: string[];
  simpleFlow: string;
  turnaround: string;
  cta: string;
  href: string;
};

type RecurringSection = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  cards: RecurringCard[];
};

const recurringSections: RecurringSection[] = [
  {
    id: 'investors',
    eyebrow: 'Investors / Operators',
    title: 'Ongoing construction support for investors with repeat project needs.',
    intro:
      'Simple monthly support for repeat investor work.',
    cards: [
      {
        name: 'Turn Support Plan',
        tag: 'Entry plan',
        price: '$749/mo',
        who: 'Small rental owners and operators with recurring turns.',
        problem: 'Best when repeat project questions keep slowing things down.',
        creditSummary: 'Includes up to 2 reviews each month.',
        creditUses: ['deal reviews', 'budget reviews', 'permit questions', 'turn scope questions'],
        simpleFlow: 'Send it, we review it, you get clear next steps.',
        turnaround: '1 business day response target.',
        cta: 'Review Turn Support Plan',
        href: '/services/investors/turn-support-plan',
      },
      {
        name: 'Operator Support Plan',
        tag: 'Most practical',
        price: '$1,499/mo',
        who: 'Active investors with repeat job decisions and draw-related help.',
        problem: 'Best when active jobs need more ongoing review support.',
        creditSummary: 'Includes up to 4 reviews each month.',
        creditUses: ['deal reviews', 'budget reviews', 'permit questions', 'contractor decisions', 'draw reviews'],
        simpleFlow: 'Send it, we review it, you get clear next steps.',
        turnaround: 'Same-day acknowledgment, 1 business day standard response.',
        cta: 'Review Operator Support Plan',
        href: '/services/investors/operator-support-plan',
      },
      {
        name: 'Project Support Retainer',
        tag: 'Higher-touch',
        price: 'Starting at $2,500/mo',
        who: 'Higher-volume operators with several active jobs.',
        problem: 'Best when you need more ongoing review capacity every month.',
        creditSummary: 'Includes up to 6 reviews each month.',
        creditUses: ['project questions', 'budget reviews', 'change decisions', 'lender questions', 'draw reviews'],
        simpleFlow: 'Send it, we review it, you get clear next steps.',
        turnaround: 'Priority 24-hour response target.',
        cta: 'Request Retainer Review',
        href: '/services/investors/project-support-retainer',
      },
    ],
  },
  {
    id: 'contractors',
    eyebrow: 'Contractors',
    title: 'Ongoing support capacity for contractors who need more field focus.',
    intro:
      'Simple monthly support for repeat permit, inspection, and admin work.',
    cards: [
      {
        name: 'Permit & Inspection Support Plan',
        tag: 'Entry plan',
        price: '$899/mo',
        who: 'Small contractors and trade teams.',
        problem: 'Best when permit and inspection tasks keep slowing jobs down.',
        creditSummary: 'Includes up to 4 reviews each month.',
        creditUses: ['permit questions', 'inspection scheduling help', 'correction follow-up', 'status questions'],
        simpleFlow: 'Send it, we review it, you get clear next steps.',
        turnaround: '1 business day response target.',
        cta: 'Review Permit & Inspection Plan',
        href: '/services/contractors/permit-inspection-support-plan',
      },
      {
        name: 'Back-Office Support Plan',
        tag: 'Strongest recurring fit',
        price: '$1,750/mo',
        who: 'Growing contractors with active jobs.',
        problem: 'Best when back-office work keeps pulling time away from the field.',
        creditSummary: 'Includes up to 8 reviews each month.',
        creditUses: ['permit questions', 'inspection scheduling help', 'correction follow-up', 'admin questions', 'documentation follow-up'],
        simpleFlow: 'Send it, we review it, you get clear next steps.',
        turnaround: 'Same-day acknowledgment, 1 business day standard response.',
        cta: 'Review Back-Office Plan',
        href: '/services/contractors/back-office-support-plan',
      },
      {
        name: 'Contractor Office Extension Retainer',
        tag: 'Higher-touch',
        price: 'Starting at $2,900/mo',
        who: 'Busy contractors who need steadier support.',
        problem: 'Best when you need more support capacity every month.',
        creditSummary: 'Includes up to 12 reviews each month.',
        creditUses: ['permit questions', 'inspection scheduling help', 'correction follow-up', 'admin questions', 'documentation follow-up'],
        simpleFlow: 'Send it, we review it, you get clear next steps.',
        turnaround: 'Priority 24-hour response target.',
        cta: 'Request Retainer Review',
        href: '/services/contractors/contractor-office-extension-retainer',
      },
    ],
  },
  {
    id: 'developers',
    eyebrow: 'Developers / Repeat Operators',
    title: 'Ongoing project-control support for repeat operators.',
    intro:
      'Simple monthly support for repeat project-control work.',
    cards: [
      {
        name: 'Project Control Plan',
        tag: 'Entry plan',
        price: '$1,250/mo',
        who: 'Repeat operators with active projects.',
        problem: 'Best when projects need regular check-ins and reviews.',
        creditSummary: 'Includes up to 2 reviews each month.',
        creditUses: ['project reviews', 'budget reviews', 'permit questions', 'milestone reviews', 'draw reviews'],
        simpleFlow: 'Send it, we review it, you get clear next steps.',
        turnaround: '1 business day response target.',
        cta: 'Review Project Control Plan',
        href: '/services/developers-landowners/project-control-plan',
      },
      {
        name: 'Execution Oversight Retainer',
        tag: 'Higher-touch',
        price: 'Starting at $3,500/mo',
        who: 'Repeat operators with larger or more active files.',
        problem: 'Best when you need more ongoing project-control support.',
        creditSummary: 'Includes up to 4 reviews each month.',
        creditUses: ['project reviews', 'budget reviews', 'permit questions', 'milestone reviews', 'draw reviews'],
        simpleFlow: 'Send it, we review it, you get clear next steps.',
        turnaround: 'Priority 24-hour response target.',
        cta: 'Request Oversight Retainer Review',
        href: '/services/developers-landowners/execution-oversight-retainer',
      },
    ],
  },
  {
    id: 'realtors',
    eyebrow: 'Realtors',
    title: 'Ongoing support for agents with repeat deal and listing questions.',
    intro:
      'Simple monthly support for repeat deal and listing questions.',
    cards: [
      {
        name: 'Deal Desk',
        tag: 'Main offer',
        price: '$649/mo',
        who: 'Active agents with repeat deal questions.',
        problem: 'Best when deals keep slowing down because repair questions need faster answers.',
        creditSummary: 'Includes up to 4 reviews each month.',
        creditUses: ['deal reviews', 'inspection reviews', 'repair questions', 'listing readiness questions'],
        simpleFlow: 'Send it, we review it, you get clear next steps.',
        turnaround: '1 business day response. Same-day triage target on urgent items.',
        cta: 'Review Deal Desk',
        href: '/services/realtors/deal-desk',
      },
      {
        name: 'Listing Prep Desk',
        tag: 'Main offer',
        price: '$649/mo',
        who: 'Listing agents with repeat prep questions.',
        problem: 'Best when listing-prep decisions keep delaying listings.',
        creditSummary: 'Includes up to 4 reviews each month.',
        creditUses: ['pre-listing prep reviews', 'repair questions', 'listing readiness questions', 'budget questions'],
        simpleFlow: 'Send it, we review it, you get clear next steps.',
        turnaround: '1 business day first response. 2 business day standard guidance delivery.',
        cta: 'Review Listing Prep Desk',
        href: '/services/realtors/listing-prep-desk',
      },
      {
        name: 'Agent Support Line',
        tag: 'Secondary offer',
        price: '$1,050/mo',
        who: 'High-activity solo agents.',
        problem: 'Best when you need more ongoing support across deals and listings.',
        creditSummary: 'Includes up to 8 reviews each month.',
        creditUses: ['deal reviews', 'inspection reviews', 'pre-listing prep reviews', 'repair questions', 'listing readiness questions'],
        simpleFlow: 'Send it, we review it, you get clear next steps.',
        turnaround: 'Same business day first response. 1 business day standard turnaround.',
        cta: 'Review Agent Support Line',
        href: '/services/realtors/agent-support-line',
      },
      {
        name: 'Team Deal & Listing Desk',
        tag: 'Team plan',
        price: '$2,400/mo',
        who: 'Small teams and boutique brokerages.',
        problem: 'Best when the team needs shared support for repeat questions.',
        creditSummary: 'Includes up to 15 reviews each month.',
        creditUses: ['deal reviews', 'inspection reviews', 'pre-listing prep reviews', 'repair questions', 'listing readiness questions'],
        simpleFlow: 'Send it, we review it, you get clear next steps.',
        turnaround: '1 business day first response. Same-day triage for urgent items when possible.',
        cta: 'Request Team Plan',
        href: '/services/realtors/team-deal-listing-desk',
      },
    ],
  },
];

function SectionHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">{intro}</p>
    </div>
  );
}

function RecurringCardView({ card }: { card: RecurringCard }) {
  return (
    <div className="flex h-full w-full max-w-[420px] flex-col rounded-[24px] border border-stone-200 bg-white px-6 py-7 sm:px-7 sm:py-8 shadow-elev-1">
      <div className="mb-4 inline-flex w-fit rounded-full border border-orange/25 bg-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-orange">
        {card.tag}
      </div>
      <h3 className="text-2xl font-extrabold tracking-tight text-navy">{card.name}</h3>
      <div className="mt-6 space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">Monthly price</p>
        <p className="text-[1.2rem] font-extrabold tracking-tight text-orange">{card.price}</p>
        <p className="text-sm font-semibold text-navy">{card.creditSummary}</p>
        <p className="text-sm text-stone-600">{card.turnaround}</p>
      </div>
      <div className="mt-6 flex flex-1 flex-col text-[15px] leading-[1.6] text-stone-700">
        <div className="space-y-6">
          <p><strong className="text-navy">Best for:</strong> {card.who}</p>
          <p><strong className="text-navy">Use this when:</strong> {card.problem}</p>
          <div>
            <p className="font-semibold text-navy">Credits can be used for</p>
            <ul className="mt-3 space-y-2.5 leading-[1.6]">
              {card.creditUses.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p><strong className="text-navy">How it works:</strong> {card.simpleFlow}</p>
        </div>
      </div>
      <div className="mt-10 pt-1">
        <Link href={card.href} className="inline-flex w-full items-center justify-center rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-700">
          {card.cta}
        </Link>
      </div>
    </div>
  );
}

export default function RecurringSupportPage() {
  return (
    <div className="min-h-screen bg-white text-navy">
      <SiteNav variant="solid" />

      <section className="border-b border-stone-200 bg-navy-900 py-20 sm:py-24">
        <div className="container-pro grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-4xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Recurring Support</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl">
              Ongoing construction support for repeat needs.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white sm:text-xl">
              These plans give repeat clients ongoing access to specific support capacity for permits, inspections, listing prep, budgeting, project coordination, and active-job decisions without starting from scratch each time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/services" className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white">
                See One-Time Services
              </Link>
              <a href="#plans" className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white">
                Review Plans
              </a>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/12 bg-white p-7 shadow-elev-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">When ongoing help makes sense</p>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-stone-700">
              <p><strong className="text-navy">Use these plans</strong> when permit, inspection, coordination, or project questions keep coming back.</p>
              <p><strong className="text-navy">Do not use these plans</strong> for custom labor, undefined site work, or open-ended project execution.</p>
              <p><strong className="text-navy">Every plan has clear limits</strong> so you know what is included and how to use it.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="plans" className="border-b border-stone-200 bg-stone-50 py-8">
        <div className="container-pro flex flex-wrap gap-3">
          {recurringSections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-navy transition hover:border-orange hover:text-orange">
              {section.eyebrow}
            </a>
          ))}
        </div>
      </section>

      {recurringSections.map((section, index) => (
        <section key={section.id} id={section.id} className={index % 2 === 0 ? 'bg-white py-20 sm:py-24' : 'border-y border-stone-200 bg-stone-50 py-20 sm:py-24'}>
          <div className="container-pro">
            <SectionHeader eyebrow={section.eyebrow} title={section.title} intro={section.intro} />
            <div className={`mt-10 grid gap-6 md:grid-cols-2 ${section.id === 'realtors' ? 'xl:grid-cols-2' : 'xl:grid-cols-6'}`}>
              {section.cards.map((card, index) => {
                if (section.id === 'realtors') {
                  return (
                    <div key={card.name} className="flex justify-center">
                      <RecurringCardView card={card} />
                    </div>
                  );
                }

                const isLast = index === section.cards.length - 1;
                const isSecondToLast = index === section.cards.length - 2;

                let tailClass = 'xl:col-span-2';

                if (section.cards.length % 3 === 1 && isLast) {
                  tailClass = 'xl:col-start-3 xl:col-span-2';
                } else if (section.cards.length % 3 === 2 && (isSecondToLast || isLast)) {
                  tailClass = 'xl:col-span-3';
                }

                return (
                  <div key={card.name} className={`${tailClass} flex justify-center`}>
                    <RecurringCardView card={card} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-navy-950 py-20 text-white sm:py-24">
        <div className="container-pro grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Need custom support?</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">If you need ongoing help but none of these plans fit cleanly, start here.</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              If your workload, project mix, or repeat needs do not fit one of these plans cleanly, start with a review. Southern Cities can help you choose the right ongoing plan, the right retainer, or the right one-time service.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/12 bg-white/[0.05] p-7">
            <div className="space-y-4 text-sm leading-relaxed text-white/82">
              <p><strong className="text-white">Good fit:</strong> repeat permit questions, repeat inspection follow-up, repeat project decisions, repeat admin burden, repeat support tasks.</p>
              <p><strong className="text-white">Bad fit:</strong> one custom project, undefined labor, open-ended field execution, or one-time scoping with no repeat need.</p>
            </div>
            <Link href="/services" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white">
              See Support Options
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
