import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import AddToCartButton from '@/components/AddToCartButton';

type Service = {
  title: string;
  promise: string;
  prevents: string;
  price: string;
  cta: 'Buy Now' | 'Get Pricing' | 'Request Quote' | 'Subscribe';
  href: string;
  itemKey?: string;
  flagship?: boolean;
};

const beforeYouBuy: Service[] = [
  {
    title: 'Deal & Scope Review',
    promise: 'Avoid a bad buy. A construction-side review of the deal so you know what you are actually buying before earnest money is at risk.',
    prevents: 'Hidden scope, mispriced rehab, underestimated structural risk',
    price: '$499',
    cta: 'Buy Now',
    href: '/cart?cart=investor-review',
    itemKey: 'investor-review',
  },
  {
    title: 'Permit & Local Compliance Review',
    promise: 'Reduce permit surprises. Get a local permit and compliance read before the deal closes, not after.',
    prevents: 'Buying into a property where the rehab path is illegal, blocked, or far more expensive',
    price: '$399',
    cta: 'Buy Now',
    href: '/cart?cart=permit-local-compliance-review',
    itemKey: 'permit-local-compliance-review',
  },
  {
    title: 'Budget Review',
    promise: 'Prevent underbudgeting. Get a real construction budget before the rehab math falls apart.',
    prevents: 'Underwriting with weak rehab numbers',
    price: '$599',
    cta: 'Buy Now',
    href: '/cart?cart=budget-review',
    itemKey: 'budget-review',
  },
  {
    title: 'Contractor Fit Consultation',
    promise: 'Avoid hiring the wrong contractor. Get a construction-side read on contractor fit before you hire.',
    prevents: 'Misfit hires that cause delay, cost overruns, or quality problems',
    price: '$349',
    cta: 'Buy Now',
    href: '/cart?cart=contractor-fit-consultation',
    itemKey: 'contractor-fit-consultation',
  },
  {
    title: 'Contractor Match + Bid Coordination',
    promise: 'Get real bids. Southern Cities sources, coordinates, and compares contractor bids so you are not stuck with one option.',
    prevents: 'Picking the only contractor that responded',
    price: 'Starts at $1,499 per project',
    cta: 'Get Pricing',
    href: '/#contact',
  },
  {
    title: 'Full Due Diligence Package',
    promise: 'Be certain in your investment. One package covering deal, permits, budget, and contractor decisions before you commit.',
    prevents: 'Bad buys, surprise permits, underbudgeting, contractor misfit',
    price: 'Custom packaged scope',
    cta: 'Request Quote',
    href: '/#contact',
  },
];

const beforeYouStart: Service[] = [
  {
    title: 'Project Timeline & Schedule Preparation',
    promise: 'Plan a real schedule. Get a defensible construction timeline before you commit to a date with lenders or partners.',
    prevents: 'Promising lenders or partners a date the project cannot hit',
    price: 'Project-specific pricing',
    cta: 'Get Pricing',
    href: '/#contact',
  },
  {
    title: 'Schedule of Cashflows Preparation',
    promise: 'Plan cash needs before work starts. Build a cashflow schedule that matches the construction plan.',
    prevents: 'Cash out of sequence, missed draws, costly bridge moves',
    price: 'Project-specific pricing',
    cta: 'Get Pricing',
    href: '/#contact',
  },
  {
    title: 'Material Logistics Setup',
    promise: 'Stop material delays before they start. Set up vendors, sourcing, and delivery before crews need it.',
    prevents: 'Wrong materials, late deliveries, sub-onsite-with-nothing-to-do days',
    price: 'Project-specific pricing',
    cta: 'Get Pricing',
    href: '/#contact',
  },
  {
    title: 'Permit Coordination & Administration',
    promise: 'Move permits without the drag. Southern Cities files, follows up, and handles corrections so the project keeps moving.',
    prevents: 'Mishandled filings, repeated corrections, missed inspections',
    price: 'Starts at $899 per permit',
    cta: 'Get Pricing',
    href: '/#contact',
  },
];

const fundingAndDraw: Service[] = [
  {
    title: 'Lender-Ready Scope & Bid Package',
    promise: 'Get lender-ready documentation. A clean package that funds faster and answers lender questions before they ask.',
    prevents: 'Funding delays, lender bounce-backs, draw friction',
    price: 'Scope-dependent pricing',
    cta: 'Get Pricing',
    href: '/#contact',
  },
  {
    title: 'Construction Draw Strategy & Alignment',
    promise: 'Reduce draw mistakes. Lock in the draw strategy before the lender sets the rules.',
    prevents: 'Mismatched draws, slow lender turnarounds, broken cashflow',
    price: 'Project-specific pricing',
    cta: 'Get Pricing',
    href: '/#contact',
  },
  {
    title: 'Draw Review Support',
    promise: 'Submit cleaner draws. Per-draw review so you stop fighting the lender for funds you already earned.',
    prevents: 'Late funds, denied draws, broken cashflow',
    price: '$399 per draw',
    cta: 'Buy Now',
    href: '/cart?cart=draw-review-support',
    itemKey: 'draw-review-support',
  },
];

const duringConstruction: Service[] = [
  {
    title: 'Owner-Controlled Construction, GC-Led',
    promise: 'Owner control, contractor execution. Southern Cities runs the project as licensed GC while you stay in the owner seat.',
    prevents: 'Execution drift, scope creep, mismanagement, missed milestones',
    price: '8% to 15% of construction cost, project-dependent',
    cta: 'Request Quote',
    href: '/#contact',
    flagship: true,
  },
  {
    title: 'Project Coordination & Control',
    promise: 'Stop execution drift. Real coordination on the active job without becoming the project manager yourself.',
    prevents: 'Owner-as-PM burnout, missed deadlines, vendor misalignment',
    price: '$1,499/month per active project',
    cta: 'Subscribe',
    href: '/#contact',
  },
  {
    title: 'Full Construction Management Service',
    promise: 'Hand off construction. Full project management from kickoff to closeout.',
    prevents: 'Spreading yourself across operations',
    price: '12% to 18% of total project cost',
    cta: 'Request Quote',
    href: '/#contact',
  },
];

const regionalRepeat: Service[] = [
  {
    title: 'Investor Operator Support',
    promise: 'Operate at scale. Construction-side help across every active deal, on a monthly basis.',
    prevents: 'Per-deal friction',
    price: '$1,799 / $2,999 / $4,999 per month',
    cta: 'Subscribe',
    href: '/#contact',
  },
  {
    title: 'Due Diligence Package, 3 deals/month',
    promise: 'Vet 3 deals a month. Packaged due diligence on a monthly basis so you move faster than the market.',
    prevents: 'Slow deal vetting, missed windows',
    price: '$2,499/month',
    cta: 'Subscribe',
    href: '/#contact',
  },
  {
    title: 'Construction Planning Package, 3 deals/month',
    promise: 'Launch 3 projects a month. Construction planning packaged on a monthly cadence.',
    prevents: 'Slow project starts, late lender setup',
    price: '$2,999/month',
    cta: 'Subscribe',
    href: '/#contact',
  },
  {
    title: 'Regional Investor Construction Network Development',
    promise: 'Build a repeatable regional network. Southern Cities sets up the construction operating layer for your target market.',
    prevents: 'Per-deal vendor scrambles, inconsistent sub quality',
    price: '$7,500 setup + $1,499/month operating retainer',
    cta: 'Request Quote',
    href: '/#contact',
  },
];

function ServiceCard({ service }: { service: Service }) {
  const ctaClass =
    service.cta === 'Buy Now'
      ? 'bg-orange text-white hover:bg-orange-500'
      : service.cta === 'Subscribe'
        ? 'bg-navy text-white hover:bg-navy-900'
        : 'border border-stone-300 bg-white text-navy hover:border-orange hover:text-orange';

  return (
    <div
      className={`flex h-full flex-col rounded-[24px] border p-6 shadow-elev-1 ${
        service.flagship ? 'border-orange/40 bg-orange/[0.04]' : 'border-stone-200 bg-white'
      }`}
    >
      {service.flagship ? (
        <p className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-orange px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
          Flagship
        </p>
      ) : null}
      <h3 className="text-xl font-extrabold tracking-tight text-navy">{service.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{service.promise}</p>
      <p className="mt-3 text-sm font-semibold text-orange">Prevents: <span className="font-normal text-stone-700">{service.prevents}</span></p>
      <div className="mt-auto pt-5">
        <p className="text-sm font-bold text-navy">{service.price}</p>
        {service.cta === 'Buy Now' && service.itemKey ? (
          <AddToCartButton
            itemKey={service.itemKey}
            label={service.cta}
            className={`mt-3 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${ctaClass}`}
          />
        ) : (
          <Link
            href={service.href}
            className={`mt-3 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${ctaClass}`}
          >
            {service.cta}
          </Link>
        )}
      </div>
    </div>
  );
}

function StageSection({
  number,
  title,
  intro,
  services,
}: {
  number: string;
  title: string;
  intro: string;
  services: Service[];
}) {
  return (
    <section className="border-b border-stone-200 bg-white py-16 sm:py-20">
      <div className="container-pro">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Stage {number}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">{intro}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export const metadata = {
  title: 'For Investors | Southern Cities Construction',
  description:
    'Construction made buyable for investors. Buy the exact construction support you need at the right stage, from due diligence to draws, execution, and repeat operations.',
};

export default function InvestorsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SiteNav variant="solid" />

      <section className="relative overflow-hidden bg-navy-900 pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#163061_0%,#10254c_100%)]" />
        <div className="relative z-10 container-pro">
          <div className="max-w-4xl">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">For Investors · Licensed NC General Contractor #107724</p>
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Construction made buyable. From the deal to the resale.
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl">
              Buy the exact construction support you need at the right stage. Before you buy, before you start, during funding, during execution, and across multiple deals.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#stage-1" className="inline-flex items-center justify-center rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-orange-500">
                See Investor Pricing
              </a>
              <Link href="/#contact" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white/14">
                Talk to Southern Cities
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-12 sm:py-16">
        <div className="container-pro">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">The investor operating system</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Five clear stages. One licensed company.</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone-700 sm:text-lg">
            Most investors buy the wrong thing at the wrong time, or buy nothing and absorb the cost themselves. Southern Cities organizes construction support around the five stages where investors actually need help, with clear products at each stage.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ['1', 'Before You Buy'],
              ['2', 'Before You Start'],
              ['3', 'Funding & Draw Setup'],
              ['4', 'During Construction'],
              ['5', 'Regional / Repeat Ops'],
            ].map(([num, label]) => (
              <a
                key={num}
                href={`#stage-${num}`}
                className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange"
              >
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange text-white">{num}</span>
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div id="stage-1" />
      <StageSection
        number="1"
        title="Before You Buy"
        intro="Vet the deal, the permit path, the budget, and the contractor before earnest money is at risk."
        services={beforeYouBuy}
      />

      <div id="stage-2" />
      <StageSection
        number="2"
        title="Before You Start"
        intro="Get the project ready to start. Real schedule, real cashflow, real material plan, and a real permit path."
        services={beforeYouStart}
      />

      <div id="stage-3" />
      <StageSection
        number="3"
        title="Funding & Draw Setup"
        intro="Get lender-ready and draw-ready before the project funds, so you stop fighting the lender for funds you already earned."
        services={fundingAndDraw}
      />

      <div id="stage-4" />
      <StageSection
        number="4"
        title="During Construction"
        intro="Keep the project on track. Owner-Controlled Construction, GC-Led is our flagship for investors who want execution-grade GC support without losing owner control."
        services={duringConstruction}
      />

      <div id="stage-5" />
      <StageSection
        number="5"
        title="Regional / Repeat Operations"
        intro="Operate at scale. Subscriptions and packages built for investors running multiple deals or expanding into a new region."
        services={regionalRepeat}
      />

      <section className="bg-navy-950 py-14 sm:py-16 text-white">
        <div className="container-pro grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Talk to Southern Cities</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Tell us about the deal.</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/85">
              Send the address, scope, lender info if applicable, and where you are in the project. We will respond with a clear next step on pricing, a packaged purchase, or a quote on Owner-Controlled Construction or full management.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/#contact" className="inline-flex items-center justify-center rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-orange-500">
                Talk to Southern Cities
              </Link>
              <a href="#stage-1" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white/14">
                See Investor Pricing
              </a>
            </div>
          </div>
          <div className="rounded-[24px] border border-white/15 bg-white/[0.06] p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Why investors hire Southern Cities</p>
            <ul className="mt-4 space-y-3 text-sm leading-[1.6] text-white/85">
              <li>Licensed NC GC #107724, fully insured, statewide NC coverage</li>
              <li>Construction-side judgment from real residential project experience</li>
              <li>Lender-ready documentation that funds faster</li>
              <li>Owner-Controlled Construction lets you stay in the owner seat with GC-grade execution</li>
              <li>Subscriptions and packages built for repeat operators, not one-off jobs</li>
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
