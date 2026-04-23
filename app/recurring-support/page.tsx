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
    title: 'Monthly support for operators who do not want to babysit every project decision.',
    intro:
      'These plans are for recurring turn work, repeated budget and scope questions, lender-facing support, and active jobs that keep eating operator attention.',
    cards: [
      {
        name: 'Turn Support Plan',
        tag: 'Entry plan',
        price: '$749/mo',
        who: 'Small rental owners and operators with recurring turns.',
        problem: 'They are paying monthly to avoid vacancy drag, slow decisions, and routine project babysitting.',
        includes: [
          'Up to 2 turn or project reviews each month',
          'Up to 2 budget or scope reviews each month',
          'Basic permit and admin guidance on active files',
          'Priority response during business hours',
        ],
        limits: 'Up to 2 reviews and up to 3 active properties. No labor or site visits included.',
        turnaround: '1 business day response target.',
        cta: 'Review Turn Support Plan',
      },
      {
        name: 'Operator Support Plan',
        tag: 'Most practical',
        price: '$1,499/mo',
        who: 'Active investors with repeated construction-side decisions, lender needs, and draw-related support.',
        problem: 'They are paying monthly to avoid delay, weak scope clarity, funding friction, and repeated operator involvement in jobs that should move faster.',
        includes: [
          'Up to 4 project or turn reviews each month',
          'Up to 4 budget or scope reviews each month',
          '1 lender scope and bid package each month',
          '1 draw review support item each month',
        ],
        limits: '4 reviews, 1 lender package, 1 draw item. No undefined project management.',
        turnaround: 'Same-day acknowledgment, 1 business day standard response.',
        cta: 'Review Operator Support Plan',
      },
      {
        name: 'Project Support Retainer',
        tag: 'Higher-touch',
        price: 'Starting at $2,500/mo',
        who: 'Higher-volume operators with several active jobs that need stronger recurring control.',
        problem: 'They are paying monthly to avoid too many moving parts, too much owner babysitting, and weak project control across live jobs.',
        includes: [
          'Weekly project-control touchpoint',
          'Up to 6 project reviews monthly',
          'Up to 6 budget or scope items monthly',
          'Up to 2 lender or draw support items monthly',
        ],
        limits: 'Capped support volume. Site visits and meetings scoped separately.',
        turnaround: 'Priority 24-hour response target.',
        cta: 'Request Retainer Review',
      },
    ],
  },
  {
    id: 'contractors',
    eyebrow: 'Contractors',
    title: 'Back-office and permit support for contractors who need field time back.',
    intro:
      'These plans are for contractors who do not need more labor. They need less paperwork drag, faster inspection handling, and more office capacity without making a full-time hire.',
    cards: [
      {
        name: 'Permit & Inspection Support Plan',
        tag: 'Entry plan',
        price: '$899/mo',
        who: 'Small contractors and trade teams buried in permit follow-up and inspection handling.',
        problem: 'They are paying monthly to avoid office work pulling time away from production and slowing jobs down.',
        includes: [
          'Up to 4 permit or admin requests each month',
          'Inspection scheduling support',
          'Correction follow-up support',
          'Permit status coordination on active files',
        ],
        limits: '4 requests and up to 2 active jobs. No unlimited municipal handling.',
        turnaround: '1 business day response target.',
        cta: 'Review Permit & Inspection Plan',
      },
      {
        name: 'Back-Office Support Plan',
        tag: 'Strongest recurring fit',
        price: '$1,750/mo',
        who: 'Growing contractors who need recurring admin help across active residential jobs.',
        problem: 'They are paying monthly to avoid back-office overload that is choking field production and forcing the owner to carry too much admin burden personally.',
        includes: [
          'Up to 8 support requests each month',
          'Permit and admin support',
          'Inspection coordination',
          'Documentation and follow-up support',
        ],
        limits: '8 requests and up to 4 active jobs. No labor or full office-manager replacement.',
        turnaround: 'Same-day acknowledgment, 1 business day standard response.',
        cta: 'Review Back-Office Plan',
      },
      {
        name: 'Contractor Office Extension Retainer',
        tag: 'Higher-touch',
        price: 'Starting at $2,900/mo',
        who: 'Busy contractors who need steadier outside office support without building a full internal team yet.',
        problem: 'They are paying monthly to avoid hiring pressure, admin chaos, and revenue-producing field time getting eaten by office problems.',
        includes: [
          'Weekly check-in',
          'Up to 12 support requests each month',
          'Priority permit and inspection coordination',
          'Documentation and follow-up support across active jobs',
        ],
        limits: 'Defined active-job cap. No unlimited request volume.',
        turnaround: 'Priority 24-hour response target.',
        cta: 'Request Retainer Review',
      },
    ],
  },
  {
    id: 'developers',
    eyebrow: 'Developers / Repeat Operators',
    title: 'Recurring project-control support for repeat residential operators.',
    intro:
      'These retainers are for repeat operators who need stronger structure, milestone discipline, permit-path visibility, and clearer oversight across active residential work.',
    cards: [
      {
        name: 'Project Control Plan',
        tag: 'Entry plan',
        price: '$1,250/mo',
        who: 'Repeat operators who need a clearer read on active projects, upcoming risks, and next decisions.',
        problem: 'They are paying monthly to avoid project drift, weak accountability, and poor visibility into what needs to happen next.',
        includes: [
          'Up to 2 active project reviews each month',
          'Milestone check-ins',
          'Permit-path and coordination guidance',
          'Risk and next-step summaries',
        ],
        limits: '2 active projects and 2 formal reviews. No full project management included.',
        turnaround: '1 business day response target.',
        cta: 'Review Project Control Plan',
      },
      {
        name: 'Execution Oversight Retainer',
        tag: 'Higher-touch',
        price: 'Starting at $3,500/mo',
        who: 'Repeat operators with larger or more active residential files that need stronger recurring control.',
        problem: 'They are paying monthly to avoid loss of control across active files, weak coordination, and expensive slippage caused by loose project structure.',
        includes: [
          'Weekly oversight touchpoint',
          'Up to 4 project reviews each month',
          'Budget and scope review support',
          'Milestone and risk summaries',
        ],
        limits: 'Defined project cap. Meetings and site visits scoped separately.',
        turnaround: 'Priority 24-hour response target.',
        cta: 'Request Oversight Retainer Review',
      },
    ],
  },
  {
    id: 'realtors',
    eyebrow: 'Realtors',
    title: 'Recurring transaction and listing support for agents who need construction-side answers faster.',
    intro:
      'These plans are built around distinct recurring realtor pain: active-deal repair confusion, pre-listing indecision, repeated need for faster answers, and pooled team support.',
    cards: [
      {
        name: 'Deal Desk',
        tag: 'Main offer',
        price: '$649/mo',
        who: 'Active agents who regularly run into inspection issues, repair-request questions, and contractor-side confusion during active transactions.',
        problem: 'They are paying monthly to avoid deals slowing down because nobody gives a practical construction-side answer fast enough.',
        includes: [
          'Up to 4 active deal reviews each month',
          'Inspection report review and repair-priority guidance',
          'Up to 2 rough pricing-direction requests each month',
          'Written summaries for client conversations',
        ],
        limits: '4 deal cases, 2 pricing-direction requests, no site visits included.',
        turnaround: '1 business day response. Same-day triage target on urgent active-deal items.',
        cta: 'Review Deal Desk',
      },
      {
        name: 'Listing Prep Desk',
        tag: 'Main offer',
        price: '$649/mo',
        who: 'Listing agents who repeatedly need help deciding what should be fixed, cleaned up, or left alone before going live.',
        problem: 'They are paying monthly to avoid pre-listing indecision, wasted seller spend, and delays caused by unclear prep direction.',
        includes: [
          'Up to 4 listing-prep reviews each month',
          'Repair vs leave-alone guidance',
          'Prep-priority and sequencing notes',
          'Up to 2 follow-up clarifications per property',
        ],
        limits: '4 listing-prep reviews, 2 clarifications per property, no site visits included.',
        turnaround: '1 business day first response. 2 business day standard guidance delivery.',
        cta: 'Review Listing Prep Desk',
      },
      {
        name: 'Agent Support Line',
        tag: 'Secondary offer',
        price: '$1,050/mo',
        who: 'High-activity solo agents who repeatedly need fast construction-side support across both listings and active deals.',
        problem: 'They are paying monthly to avoid repeated contractor chasing, slow client answers, and rebuilding the same construction context every week.',
        includes: [
          'Up to 8 support requests each month',
          'Mixed-use support across deals and listings',
          'Up to 2 short calls each month',
          'Priority queue handling',
        ],
        limits: '8 support requests, 2 short calls, single-agent use only.',
        turnaround: 'Same business day first response. 1 business day standard turnaround.',
        cta: 'Review Agent Support Line',
      },
      {
        name: 'Team Deal & Listing Desk',
        tag: 'Team plan',
        price: '$2,400/mo',
        who: 'Small teams and boutique brokerages that want a pooled support lane for repeated deal and listing questions.',
        problem: 'They are paying monthly to avoid every agent solving repair and prep questions alone, with inconsistent guidance and wasted internal time.',
        includes: [
          'Up to 15 pooled support cases each month',
          'Shared support lane for up to 5 agents',
          'One monthly 30-minute team call',
          'Consistent written guidance across listing and deal questions',
        ],
        limits: '15 pooled cases, up to 5 agents, no site visits included.',
        turnaround: '1 business day first response. Same-day triage for urgent active-deal items when possible.',
        cta: 'Request Team Plan',
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
    <div className="flex h-full w-full max-w-[420px] flex-col rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
      <div className="mb-4 inline-flex w-fit rounded-full border border-orange/25 bg-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-orange">
        {card.tag}
      </div>
      <h3 className="text-2xl font-extrabold tracking-tight text-navy">{card.name}</h3>
      <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
        <p className="text-xl font-extrabold text-navy">{card.price}</p>
        <p className="mt-2 text-sm text-stone-600">{card.limits}</p>
        <p className="mt-1 text-sm text-stone-600">{card.turnaround}</p>
      </div>
      <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-stone-700">
        <p><strong className="text-navy">Best for:</strong> {card.who}</p>
        <p><strong className="text-navy">Monthly problem avoided:</strong> {card.problem}</p>
        <div>
          <p className="font-semibold text-navy">Included each month</p>
          <ul className="mt-3 space-y-2">
            {card.includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <a href="/services#contact" className="mt-auto inline-flex w-full items-center justify-center rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-700">
        {card.cta}
      </a>
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
              Monthly construction-side support for repeat operational pain.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/88 sm:text-xl">
              These are not vague memberships. They are capped support plans and retainers for repeated construction-side problems, admin drag, project babysitting, permit friction, inspection coordination, and weak project control.
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
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What this page is for</p>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-stone-700">
              <p><strong className="text-navy">Use these plans</strong> when the same type of construction-side problem keeps coming back each month.</p>
              <p><strong className="text-navy">Do not use these plans</strong> for custom labor, undefined site work, or open-ended project execution.</p>
              <p><strong className="text-navy">Every plan is capped</strong> so support stays clear, usable, and operationally clean.</p>
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
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-6">
              {section.cards.map((card, index) => {
                const isLast = index === section.cards.length - 1;
                const isSecondToLast = index === section.cards.length - 2;
                const tailClass = section.cards.length % 3 === 2 && (isSecondToLast || isLast) ? 'xl:col-span-3' : 'xl:col-span-2';

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
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">If the recurring fit is real, Southern Cities can help define the right lane.</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              If your volume, job mix, or coordination burden does not fit one of these plans cleanly, start with a review. Southern Cities can point you to the right plan, the right retainer, or the right one-time service instead of forcing the wrong structure.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/12 bg-white/[0.05] p-7">
            <div className="space-y-4 text-sm leading-relaxed text-white/82">
              <p><strong className="text-white">Good recurring fit:</strong> repeated need, repeated project friction, repeated admin burden, repeated support requests.</p>
              <p><strong className="text-white">Bad recurring fit:</strong> one custom project, undefined labor, open-ended field execution, or one-time scoping with no repeat need.</p>
            </div>
            <Link href="/services#contact" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white">
              Request Plan Review
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
