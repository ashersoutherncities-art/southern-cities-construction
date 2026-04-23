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
    title: 'Recurring support for agents with steady listing and deal volume.',
    intro:
      'This is a tighter, secondary recurring offer for agents who repeatedly need faster inspection-response support and listing-prep clarity.',
    cards: [
      {
        name: 'Listing Support Plan',
        tag: 'Secondary offer',
        price: '$599/mo',
        who: 'Active listing agents and teams with recurring repair, inspection, and listing-prep questions.',
        problem: 'They are paying monthly to avoid deals and listings slowing down because repair questions stay vague too long.',
        includes: [
          'Up to 3 inspection or listing-prep reviews each month',
          'Priority support on active listing questions',
          'Pricing and repair guidance',
          '1 rush item each month',
        ],
        limits: '3 reviews and 1 rush item. Best for teams or repeat volume.',
        turnaround: '1 business day standard response.',
        cta: 'Review Listing Support Plan',
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
    <div className="flex h-full flex-col rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
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
            <div className="mt-10 flex flex-wrap gap-6">
              {section.cards.map((card) => (
                <div key={card.name} className="flex w-full md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]">
                  <RecurringCardView card={card} />
                </div>
              ))}
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
