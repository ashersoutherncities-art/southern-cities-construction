import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

type RecurringCard = {
  name: string;
  tag: string;
  price: string;
  who: string;
  problem: string;
  includes: string[];
  limits: string;
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
      'Use these plans when turn work, budget questions, draw support, and active jobs keep coming back and you want ongoing access to defined support capacity instead of restarting from zero every time.',
    cards: [
      {
        name: 'Turn Support Plan',
        tag: 'Entry plan',
        price: '$749/mo',
        who: 'Small rental owners and operators with recurring turns.',
        problem: 'Best when vacancy drag, slow decisions, and repeated follow-up keep eating time and margin.',
        includes: [
          'Up to 2 project decision reviews each month, each covering 1 property turn, rehab file, or active project decision set',
          'Up to 2 budget or scope reviews each month, each covering 1 estimate, scope draft, or bid set',
          'Basic permit and admin guidance on active files',
          'Priority response during business hours',
        ],
        limits: 'Includes up to 2 project decision reviews per month and support across up to 3 active properties. No labor or site visits included.',
        turnaround: '1 business day response target.',
        cta: 'Review Turn Support Plan',
        href: '/services/investors/turn-support-plan',
      },
      {
        name: 'Operator Support Plan',
        tag: 'Most practical',
        price: '$1,499/mo',
        who: 'Active investors with repeated job decisions, lender needs, and draw-related help.',
        problem: 'Best when delay, weak scope clarity, funding friction, and repeated owner involvement are keeping active jobs from moving cleanly.',
        includes: [
          'Up to 4 project decision reviews each month, each covering 1 turn file, rehab file, or active project decision set',
          'Up to 4 budget or scope reviews each month, each covering 1 estimate, scope draft, or bid set',
          '1 lender scope and bid package each month, meaning 1 compiled lender-facing scope package for 1 property or project',
          '1 draw review support item each month, meaning 1 draw request review with supporting notes for 1 submission cycle',
        ],
        limits: 'Includes up to 4 project decision reviews, 1 lender package, and 1 draw-submission review each month. No open-ended project management.',
        turnaround: 'Same-day acknowledgment, 1 business day standard response.',
        cta: 'Review Operator Support Plan',
        href: '/services/investors/operator-support-plan',
      },
      {
        name: 'Project Support Retainer',
        tag: 'Higher-touch',
        price: 'Starting at $2,500/mo',
        who: 'Higher-volume operators with several active jobs that need stronger recurring control.',
        problem: 'Best when too many moving parts, repeated owner follow-up, and weak project control are making live jobs harder to manage.',
        includes: [
          'Weekly project-control touchpoint',
          'Up to 6 project decision reviews each month, each covering 1 active project issue, milestone decision, or control review',
          'Up to 6 budget or scope reviews each month, each covering 1 estimate, scope revision, or change decision',
          'Up to 2 lender or draw support items each month, each meaning either 1 lender package review or 1 draw-submission review',
        ],
        limits: 'Includes capped monthly review capacity. Site visits, field meetings, and unscoped management are separate.',
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
      'These plans are for contractors who need recurring permit, inspection, paperwork, and office support capacity without adding a full-time internal hire first.',
    cards: [
      {
        name: 'Permit & Inspection Support Plan',
        tag: 'Entry plan',
        price: '$899/mo',
        who: 'Small contractors and trade teams buried in permit follow-up and inspection handling.',
        problem: 'Best when office work keeps pulling time away from production and slowing jobs down.',
        includes: [
          'Up to 4 permit or admin requests each month, each meaning 1 permit filing task, correction response, inspection scheduling task, or status follow-up sequence',
          'Inspection scheduling support',
          'Correction follow-up support',
          'Permit status coordination on active files',
        ],
        limits: 'Includes up to 4 clearly scoped permit or admin tasks per month across up to 2 active jobs. No unlimited municipal handling.',
        turnaround: '1 business day response target.',
        cta: 'Review Permit & Inspection Plan',
        href: '/services/contractors/permit-inspection-support-plan',
      },
      {
        name: 'Back-Office Support Plan',
        tag: 'Strongest recurring fit',
        price: '$1,750/mo',
        who: 'Growing contractors who need recurring admin help across active residential jobs.',
        problem: 'Best when back-office overload is choking field production and forcing the owner to carry too much admin burden personally.',
        includes: [
          'Up to 8 support requests each month, each meaning 1 clearly scoped admin, permit, inspection, or documentation task',
          'Permit and admin support',
          'Inspection coordination',
          'Documentation and follow-up support',
        ],
        limits: 'Includes up to 8 clearly scoped support tasks per month across up to 4 active jobs. No labor or full office-manager replacement.',
        turnaround: 'Same-day acknowledgment, 1 business day standard response.',
        cta: 'Review Back-Office Plan',
        href: '/services/contractors/back-office-support-plan',
      },
      {
        name: 'Contractor Office Extension Retainer',
        tag: 'Higher-touch',
        price: 'Starting at $2,900/mo',
        who: 'Busy contractors who need steadier outside office help without building a full internal team yet.',
        problem: 'Best when hiring pressure, admin chaos, and revenue-producing field time keep getting eaten by office problems.',
        includes: [
          'Weekly check-in',
          'Up to 12 support requests each month, each meaning 1 clearly scoped admin, permit, inspection, or documentation task',
          'Priority permit and inspection coordination',
          'Documentation and follow-up support across active jobs',
        ],
        limits: 'Includes a defined active-job cap and 12 clearly scoped support tasks per month. No unlimited task volume.',
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
      'These plans are for repeat clients who need ongoing access to project-control support, milestone visibility, and clearer next decisions across active residential work.',
    cards: [
      {
        name: 'Project Control Plan',
        tag: 'Entry plan',
        price: '$1,250/mo',
        who: 'Repeat operators who need a clearer read on active projects, upcoming risks, and next decisions.',
        problem: 'Best when active projects keep needing repeated follow-up and tighter visibility to stay on track.',
        includes: [
          'Up to 2 active project reviews each month, each covering 1 project status review with milestone, risk, and next-step guidance',
          'Milestone check-ins',
          'Permit-path and job guidance',
          'Risk and next-step summaries',
        ],
        limits: 'Includes support across up to 2 active projects and up to 2 formal project-status reviews each month. No full project management included.',
        turnaround: '1 business day response target.',
        cta: 'Review Project Control Plan',
        href: '/services/developers-landowners/project-control-plan',
      },
      {
        name: 'Execution Oversight Retainer',
        tag: 'Higher-touch',
        price: 'Starting at $3,500/mo',
        who: 'Repeat operators with larger or more active residential files that need stronger recurring control.',
        problem: 'Best when weak job control and loose execution are causing expensive slippage across active files.',
        includes: [
          'Weekly oversight touchpoint',
          'Up to 4 active project reviews each month, each covering 1 project status review with milestone, risk, and next-step guidance',
          'Budget and scope review support',
          'Milestone and risk summaries',
        ],
        limits: 'Includes a defined active-project cap and up to 4 formal project-status reviews each month. Meetings and site visits are scoped separately.',
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
      'Use these plans when inspection questions, listing-prep decisions, repair questions, and other construction questions keep coming up often enough that ongoing support makes more sense than one-off help.',
    cards: [
      {
        name: 'Deal Desk',
        tag: 'Main offer',
        price: '$649/mo',
        who: 'Active agents who regularly run into inspection issues, repair-request questions, and contractor-side confusion during active transactions.',
        problem: 'Best when deals keep slowing down because nobody gives a practical construction-side answer fast enough.',
        includes: [
          'Up to 4 active deal reviews each month, each covering 1 inspection, repair, or deal-side construction decision file',
          'Inspection report review and repair-priority guidance',
          'Up to 2 pricing-direction requests each month, each meaning 1 rough repair or prep-cost opinion for 1 property',
          'Written summaries for client conversations',
        ],
        limits: 'Includes up to 4 deal files and up to 2 pricing-direction requests each month. No site visits included.',
        turnaround: '1 business day response. Same-day triage target on urgent active-deal items.',
        cta: 'Review Deal Desk',
        href: '/services/realtors/deal-desk',
      },
      {
        name: 'Listing Prep Desk',
        tag: 'Main offer',
        price: '$649/mo',
        who: 'Listing agents who repeatedly need help deciding what should be fixed, cleaned up, or left alone before going live.',
        problem: 'Best when pre-listing indecision, wasted seller spend, and slow prep decisions keep delaying listings.',
        includes: [
          'Up to 4 listing-prep reviews each month, each covering 1 property prep decision set before listing',
          'Repair vs leave-alone guidance',
          'Prep-priority and sequencing notes',
          'Up to 2 follow-up clarifications per property, meaning 2 short follow-up questions after the initial listing-prep review',
        ],
        limits: 'Includes up to 4 listing-prep files each month plus up to 2 short follow-up clarifications per property. No site visits included.',
        turnaround: '1 business day first response. 2 business day standard guidance delivery.',
        cta: 'Review Listing Prep Desk',
        href: '/services/realtors/listing-prep-desk',
      },
      {
        name: 'Agent Support Line',
        tag: 'Secondary offer',
        price: '$1,050/mo',
        who: 'High-activity solo agents who repeatedly need fast construction-side support across both listings and active deals.',
        problem: 'Best when repeated contractor chasing, slow client answers, and rebuilding the same context every week are eating too much time.',
        includes: [
          'Up to 8 support requests each month, each meaning 1 clearly scoped admin, permit, inspection, or documentation task',
          'Mixed-use support across deals and listings',
          'Up to 2 short calls each month',
          'Priority queue handling',
        ],
        limits: 'Includes up to 8 clearly scoped support tasks each month plus up to 2 short calls. Single-agent use only.',
        turnaround: 'Same business day first response. 1 business day standard turnaround.',
        cta: 'Review Agent Support Line',
        href: '/services/realtors/agent-support-line',
      },
      {
        name: 'Team Deal & Listing Desk',
        tag: 'Team plan',
        price: '$2,400/mo',
        who: 'Small teams and boutique brokerages that want shared, ongoing support for repeated deal and listing questions.',
        problem: 'Best when every agent is solving repair and prep questions alone, giving inconsistent guidance, and wasting internal time.',
        includes: [
          'Up to 15 pooled support cases each month, each covering 1 deal file, listing file, or construction question thread',
          'Shared ongoing support for up to 5 agents',
          'One monthly 30-minute team call',
          'Consistent written guidance across listing and deal questions',
        ],
        limits: 'Includes up to 15 pooled deal, listing, or construction-question files each month for up to 5 agents. No site visits included.',
        turnaround: '1 business day first response. Same-day triage for urgent active-deal items when possible.',
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
        <p className="text-sm text-stone-600">{card.limits}</p>
        <p className="text-sm text-stone-600">{card.turnaround}</p>
      </div>
      <div className="mt-6 flex flex-1 flex-col text-[15px] leading-[1.6] text-stone-700">
        <div className="space-y-6">
          <p><strong className="text-navy">Best for:</strong> {card.who}</p>
          <p><strong className="text-navy">Use this when:</strong> {card.problem}</p>
          <div>
            <p className="font-semibold text-navy">Included each month</p>
            <ul className="mt-3 mb-7 space-y-2.5 leading-[1.6]">
              {card.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
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
