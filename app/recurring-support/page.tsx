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
  oneCreditMeans: string[];
  notIncluded: string[];
  overage: string;
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
        creditSummary: 'Includes 2 monthly investor review credits.',
        creditUses: ['Deal & Scope Review', 'Rehab Budget Review', 'Turn Scope Review', 'Permit & Local Compliance Review'],
        oneCreditMeans: ['one property or one project file', 'one submitted file set, estimate set, or scope request', 'one written review or response', 'one clarification round'],
        notIncluded: ['site visits unless stated', 'full project management', 'contractor labor', 'permit fees', 'third-party fees', 'unlimited revisions', 'multiple properties under one credit'],
        overage: 'If you need more than 2 credits in a month, Southern Cities can move the extra work into an added one-time review or step you up to a larger plan.',
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
        creditSummary: 'Includes 4 monthly investor review credits, plus 1 lender package credit and 1 draw review credit.',
        creditUses: ['Deal & Scope Review', 'Rehab Budget Review', 'Permit & Local Compliance Review', 'Contractor Fit Review', 'Draw Review Support'],
        oneCreditMeans: ['one property or one draw package', 'one submitted file set, bid set, or draw request package', 'one written review or response', 'one clarification round'],
        notIncluded: ['site visits unless stated', 'full project management', 'contractor labor', 'permit fees', 'third-party fees', 'unlimited revisions', 'multiple properties under one credit'],
        overage: 'If you use all included credits, Southern Cities can add one-time review work at the current service rate or move you into a retainer with more capacity.',
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
        creditSummary: 'Includes 6 monthly investor review credits, plus 2 lender or draw support credits.',
        creditUses: ['Project Control Review', 'Budget & Scope Review', 'Change Decision Review', 'Lender Package Review', 'Draw Review Support'],
        oneCreditMeans: ['one property, one active project issue, or one draw/lender package', 'one submitted file set, milestone package, or review request', 'one written review or response', 'one clarification round'],
        notIncluded: ['site visits unless stated', 'full project management', 'contractor labor', 'permit fees', 'third-party fees', 'unlimited revisions', 'multiple properties under one credit'],
        overage: 'If monthly credit use runs past the included amount, Southern Cities can price the overflow separately or expand the retainer scope.',
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
        creditSummary: 'Includes 4 monthly permit/admin support credits.',
        creditUses: ['Permit Packet Prep', 'Inspection Scheduling', 'Correction Follow-Up', 'Permit Status Follow-Up'],
        oneCreditMeans: ['one project', 'one permit/admin task, one submission, or one follow-up cycle', 'one written status response or update', 'one clarification round when needed'],
        notIncluded: ['site visits unless stated', 'full project management', 'contractor labor', 'permit fees', 'third-party fees', 'unlimited revisions', 'multiple projects under one credit'],
        overage: 'If you need more than 4 credits in a month, Southern Cities can add one-time permit/admin support or move you into a higher-capacity plan.',
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
        creditSummary: 'Includes 8 monthly contractor support credits.',
        creditUses: ['Permit Packet Prep', 'Inspection Scheduling', 'Correction Follow-Up', 'Admin Support for Active Jobs', 'Documentation Follow-Up'],
        oneCreditMeans: ['one project', 'one clearly scoped admin, permit, inspection, or documentation task', 'one written response or status update', 'one clarification round when needed'],
        notIncluded: ['site visits unless stated', 'full project management', 'contractor labor', 'permit fees', 'third-party fees', 'unlimited revisions', 'multiple projects under one credit'],
        overage: 'If monthly support demand exceeds 8 credits, Southern Cities can price the extra work separately or move you into the retainer tier.',
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
        creditSummary: 'Includes 12 monthly contractor support credits.',
        creditUses: ['Permit Packet Prep', 'Inspection Scheduling', 'Correction Follow-Up', 'Admin Support for Active Jobs', 'Documentation Follow-Up'],
        oneCreditMeans: ['one project', 'one clearly scoped admin, permit, inspection, or documentation task', 'one written response or status update', 'one clarification round when needed'],
        notIncluded: ['site visits unless stated', 'full project management', 'contractor labor', 'permit fees', 'third-party fees', 'unlimited revisions', 'multiple projects under one credit'],
        overage: 'If the team needs more than the included credits, Southern Cities can expand the retainer or quote overflow support separately.',
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
        creditSummary: 'Includes 2 monthly project-control review credits.',
        creditUses: ['Project Review', 'Budget & Scope Review', 'Permit Path Review', 'Milestone Review', 'Draw / Progress Review'],
        oneCreditMeans: ['one project', 'one submitted file set or milestone package', 'one written review or response', 'one clarification round'],
        notIncluded: ['site visits unless stated', 'full project management', 'contractor labor', 'permit fees', 'third-party fees', 'unlimited revisions', 'multiple projects under one credit'],
        overage: 'If more than 2 credits are needed in a month, Southern Cities can add one-time review work or move you into the higher-touch retainer.',
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
        creditSummary: 'Includes 4 monthly project-control review credits.',
        creditUses: ['Project Review', 'Budget & Scope Review', 'Permit Path Review', 'Milestone Review', 'Draw / Progress Review'],
        oneCreditMeans: ['one project', 'one submitted file set or milestone package', 'one written review or response', 'one clarification round'],
        notIncluded: ['site visits unless stated', 'full project management', 'contractor labor', 'permit fees', 'third-party fees', 'unlimited revisions', 'multiple projects under one credit'],
        overage: 'If the project load needs more than 4 credits in a month, Southern Cities can expand the retainer or quote overflow review work separately.',
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
        creditSummary: 'Includes 4 monthly realtor review credits, plus 2 monthly pricing-direction credits.',
        creditUses: ['Inspection Response Review', 'Repair Scope Review', 'Repair Request Response Review', 'Listing Readiness Review'],
        oneCreditMeans: ['one property', 'one inspection report, repair request set, or property question file', 'one written review or response', 'one clarification round'],
        notIncluded: ['site visits unless stated', 'full project management', 'contractor labor', 'permit fees', 'third-party fees', 'unlimited revisions', 'multiple properties under one credit'],
        overage: 'If the month needs more than the included credits, Southern Cities can add one-time review work or move the agent into a larger support plan.',
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
        creditSummary: 'Includes 4 monthly realtor review credits.',
        creditUses: ['Pre-Listing Prep Review', 'Repair Scope Review', 'Listing Readiness Review', 'Budget Direction Review'],
        oneCreditMeans: ['one property', 'one listing-prep request, photo set, or repair decision file', 'one written review or response', 'one clarification round'],
        notIncluded: ['site visits unless stated', 'full project management', 'contractor labor', 'permit fees', 'third-party fees', 'unlimited revisions', 'multiple properties under one credit'],
        overage: 'If the agent needs more than 4 credits in a month, Southern Cities can add one-time review work or move the account into a larger support tier.',
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
        creditSummary: 'Includes 8 monthly realtor support credits.',
        creditUses: ['Inspection Response Review', 'Pre-Listing Prep Review', 'Repair Scope Review', 'Listing Readiness Review', 'Deal Question Support'],
        oneCreditMeans: ['one property', 'one submitted file, question thread, or support request', 'one written review or response', 'one clarification round'],
        notIncluded: ['site visits unless stated', 'full project management', 'contractor labor', 'permit fees', 'third-party fees', 'unlimited revisions', 'multiple properties under one credit'],
        overage: 'If support demand goes past 8 credits in a month, Southern Cities can add overflow review work or move the client into the team plan.',
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
        creditSummary: 'Includes 15 monthly pooled realtor support credits for up to 5 agents.',
        creditUses: ['Inspection Response Review', 'Pre-Listing Prep Review', 'Repair Scope Review', 'Listing Readiness Review', 'Deal Question Support'],
        oneCreditMeans: ['one property', 'one submitted file, question thread, or support request', 'one written review or response', 'one clarification round'],
        notIncluded: ['site visits unless stated', 'full project management', 'contractor labor', 'permit fees', 'third-party fees', 'unlimited revisions', 'multiple properties under one credit'],
        overage: 'If the team burns through the pooled credits, Southern Cities can add overflow work separately or expand the shared support plan.',
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
          <div>
            <p className="font-semibold text-navy">One credit means</p>
            <ul className="mt-3 space-y-2.5 leading-[1.6]">
              {card.oneCreditMeans.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-navy">Not included</p>
            <ul className="mt-3 space-y-2.5 leading-[1.6]">
              {card.notIncluded.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p><strong className="text-navy">If you need more:</strong> {card.overage}</p>
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
