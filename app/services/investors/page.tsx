import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';

type Product = {
  name: string;
  description: string;
  price?: string;
  href: string;
  secondaryHref?: string;
  primaryCta: 'Add to Cart' | 'Get Pricing' | 'Request Review' | 'Request Support';
  secondaryCta?: 'Learn More';
  itemKey?: string;
  covers?: string[];
  highlighted?: boolean;
};

type Stage = {
  id: string;
  stage: string;
  heroLabel: string;
  title: string;
  label: string;
  cta: string;
  products: Product[];
};

const investorStages: Stage[] = [
  {
    id: 'before-you-commit',
    stage: 'Stage 1',
    heroLabel: 'Before You Commit',
    title: 'Before You Commit',
    label: 'Before you commit more time or money',
    cta: 'Review Your Project',
    products: [
      {
        name: 'Investor Deal & Scope Review',
        price: '$499',
        description: 'Get a fast construction-side read before you put more money at risk.',
        href: '/pricing/investor-deal-scope-review',
        secondaryHref: '/services/investors/investor-review',
        primaryCta: 'Add to Cart',
        secondaryCta: 'Learn More',
        itemKey: 'investor-deal-scope-review',
      },
      {
        name: 'Budget Review',
        price: '$599',
        description: 'Pressure-test the budget before weak numbers become a bad decision.',
        href: '/pricing/rehab-budget-review',
        secondaryHref: '/services/investors/budget-review',
        primaryCta: 'Add to Cart',
        secondaryCta: 'Learn More',
        itemKey: 'rehab-budget-review',
      },
      {
        name: 'Permit & Local Compliance Review',
        price: '$399',
        description: 'See permit and code issues before they turn into project drag.',
        href: '/pricing/permit-local-compliance-review',
        secondaryHref: '/services/investors/permit-local-compliance-review',
        primaryCta: 'Add to Cart',
        secondaryCta: 'Learn More',
        itemKey: 'permit-local-compliance-review',
      },
      {
        name: 'Contractor Fit Consultation',
        price: '$349',
        description: 'Get a quick read on contractor fit before you hire the wrong team.',
        href: '/pricing/contractor-fit-consultation',
        secondaryHref: '/services/investors/contractor-fit-consultation',
        primaryCta: 'Add to Cart',
        secondaryCta: 'Learn More',
        itemKey: 'contractor-fit-consultation',
      },
    ],
  },
  {
    id: 'before-you-start',
    stage: 'Stage 2',
    heroLabel: 'Before You Start',
    title: 'Before You Start',
    label: 'Before construction begins',
    cta: 'Plan This Project',
    products: [
      {
        name: 'Rehab Budget Review',
        description: 'Tighten rehab numbers before the project starts slipping.',
        href: '/pricing/rehab-budget-review',
        secondaryHref: '/services/investors/budget-review',
        primaryCta: 'Get Pricing',
        secondaryCta: 'Learn More',
      },
      {
        name: 'Bid Coordination / Contractor Match',
        description: 'Get comparable bids and a clearer contractor decision path.',
        href: '/review/bid-coordination-contractor-match',
        secondaryHref: '/services/investors/contractor-match-bid-coordination',
        primaryCta: 'Get Pricing',
        secondaryCta: 'Learn More',
      },
      {
        name: 'Materials & Logistics Setup',
        description: 'Set up sourcing and logistics before avoidable delays show up.',
        href: '/review/material-logistics-setup',
        secondaryHref: '/services/investors/material-logistics-setup',
        primaryCta: 'Get Pricing',
        secondaryCta: 'Learn More',
      },
      {
        name: 'Lender Scope & Bid Package',
        description: 'Prepare a cleaner scope and bid package before funding pressure builds.',
        href: '/review/lender-ready-scope-bid-package',
        secondaryHref: '/services/investors/lender-ready-scope-bid-package',
        primaryCta: 'Get Pricing',
        secondaryCta: 'Learn More',
      },
      {
        name: 'Regional Investor Setup Consultation',
        description: 'Plan your local operating setup before you try to scale the wrong way.',
        href: '/services/investors/regional-investor-construction-network-development',
        secondaryHref: '/services/investors/regional-investor-construction-network-development',
        primaryCta: 'Request Review',
        secondaryCta: 'Learn More',
      },
    ],
  },
  {
    id: 'funding-and-draws',
    stage: 'Stage 3',
    heroLabel: 'Funding & Draws',
    title: 'Funding & Draws',
    label: 'Before and during funding',
    cta: 'Set Up Draws',
    products: [
      {
        name: 'Draw Review Support',
        price: '$399',
        description: 'Review draw submissions before they slow down your cashflow.',
        href: '/pricing/draw-review-support',
        secondaryHref: '/services/investors/draw-review-support',
        primaryCta: 'Add to Cart',
        secondaryCta: 'Learn More',
        itemKey: 'draw-review-support',
      },
      {
        name: 'Construction Draw Strategy & Alignment',
        description: 'Set up the draw process so lender and project timing stay aligned.',
        href: '/review/construction-draw-strategy-alignment',
        secondaryHref: '/services/investors/construction-draw-strategy-alignment',
        primaryCta: 'Get Pricing',
        secondaryCta: 'Learn More',
      },
      {
        name: 'Schedule of Cashflows Preparation',
        description: 'Map funding timing before execution gets ahead of available cash.',
        href: '/review/schedule-of-cashflows-preparation',
        secondaryHref: '/services/investors/schedule-of-cashflows-preparation',
        primaryCta: 'Get Pricing',
        secondaryCta: 'Learn More',
      },
      {
        name: 'Lender-Ready Scope & Bid Package',
        description: 'Give lenders a clearer package that supports faster approvals.',
        href: '/review/lender-ready-scope-bid-package',
        secondaryHref: '/services/investors/lender-ready-scope-bid-package',
        primaryCta: 'Get Pricing',
        secondaryCta: 'Learn More',
      },
    ],
  },
  {
    id: 'during-construction',
    stage: 'Stage 4',
    heroLabel: 'During Construction',
    title: 'During Construction',
    label: 'When the project is active',
    cta: 'Run This Project',
    products: [
      {
        name: 'Stay in Control (With Support)',
        description: 'Keep your project moving with oversight and coordination support',
        href: '/review/construction-oversight',
        primaryCta: 'Request Support',
        covers: ['Construction Oversight', 'Project Coordination'],
      },
      {
        name: 'Owner-Controlled Build (GC-Led)',
        description: 'Run your project with licensed GC backing',
        href: '/services/investors/owner-controlled-construction-gc-led',
        primaryCta: 'Request Review',
        highlighted: true,
      },
      {
        name: 'Full Execution',
        description: 'Hand off the project for full management or contracting',
        href: '/services/investors/full-construction-management-service',
        secondaryHref: '/contracting',
        primaryCta: 'Get Pricing',
        covers: ['Full Construction Management', 'Full Contracting'],
      },
    ],
  },
  {
    id: 'repeat-and-scale',
    stage: 'Stage 5',
    heroLabel: 'Repeat & Scale',
    title: 'Repeat & Scale',
    label: 'For ongoing operations',
    cta: 'See Support Plans',
    products: [
      {
        name: 'Turn Support Plan',
        description: 'Use recurring support for smaller but constant project decisions.',
        href: '/recurring-support#investors',
        secondaryHref: '/recurring-support#investors',
        primaryCta: 'Get Pricing',
        secondaryCta: 'Learn More',
      },
      {
        name: 'Operator Support Plan',
        description: 'Get ongoing support across multiple active investor projects.',
        href: '/recurring-support#investors',
        secondaryHref: '/recurring-support#investors',
        primaryCta: 'Get Pricing',
        secondaryCta: 'Learn More',
      },
      {
        name: 'Project Support Retainer',
        description: 'Hold review capacity when you have multiple active jobs at once.',
        href: '/recurring-support#investors',
        secondaryHref: '/recurring-support#investors',
        primaryCta: 'Get Pricing',
        secondaryCta: 'Learn More',
      },
      {
        name: 'Due Diligence Package, 3 deals/month',
        description: 'Create a repeatable monthly review lane for active acquisitions.',
        href: '/services/investors/full-due-diligence-package',
        secondaryHref: '/services/investors/full-due-diligence-package',
        primaryCta: 'Request Review',
        secondaryCta: 'Learn More',
      },
      {
        name: 'Construction Planning Package, 3 deals/month',
        description: 'Get a recurring planning lane for projects moving toward execution.',
        href: '/recurring-support#investors',
        secondaryHref: '/recurring-support#investors',
        primaryCta: 'Request Review',
        secondaryCta: 'Learn More',
      },
    ],
  },
];

const investorTestimonials = [
  {
    quote:
      'We were about to sink more money in before they walked us through what was actually wrong. Saved us from a bad call.',
    name: 'Madison M',
    role: 'Broker/Investor',
  },
  {
    quote:
      'We just needed help on one piece, not a full build out. They stuck to what we asked for and did not push extras.',
    name: 'Iantha M',
    role: 'Investor',
  },
  {
    quote:
      'I needed something concrete to bring back to my buyer, not a maybe. They gave me a straight read and the deal kept moving.',
    name: 'Jethro A',
    role: 'Wholesaler',
  },
  {
    quote:
      'Permits and paperwork were eating up my week. They took it off my plate and the jobs stopped stalling.',
    name: 'Taquan P',
    role: 'Wholesaler',
  },
  {
    quote:
      'They did not try to sell us a huge scope we did not need. Just told us what to do next and why.',
    name: 'Trisha W',
    role: 'Investor',
  },
  {
    quote:
      'Scope and budget were all over the place when we called. After they walked through it, the project actually felt doable again.',
    name: 'Justin R',
    role: 'Developer',
  },
];

const supportRows = [
  'Deal reviewed',
  'Budget checked',
  'Permit path mapped',
  'Contractor fit reviewed',
  'Scope prepared',
  'Timeline built',
  'Permit prep',
  'Bid coordination',
  'Cashflow schedule',
  'Draws reviewed',
  'Progress monitored',
  'Project oversight',
  'Full contracting available',
];

const supportBundles = [
  {
    label: 'Before You Commit',
    title: 'Due Diligence Pricing',
    price: 'Starting at $1,499',
    includes: ['Deal reviewed', 'Budget checked', 'Permit path mapped', 'Contractor fit reviewed'],
    cta: 'View Pricing',
    href: '#before-you-commit',
    highlighted: false,
  },
  {
    label: 'Before You Start',
    title: 'Project Setup Pricing',
    price: 'Starting at $2,500',
    includes: ['Scope prepared', 'Timeline built', 'Permit prep', 'Bid coordination', 'Cashflow schedule'],
    cta: 'View Pricing',
    href: '#before-you-start',
    highlighted: true,
    badge: 'Most Common',
  },
  {
    label: 'During Construction',
    title: 'Execution Support Pricing',
    price: 'Custom / Starting at $3,500',
    includes: ['Draws reviewed', 'Progress monitored', 'Permit prep', 'Project oversight', 'Full contracting available'],
    cta: 'View Pricing',
    href: '#during-construction',
    highlighted: false,
  },
];

function ProductCard({ product }: { product: Product }) {
  const primaryHref = product.itemKey ? `/cart?add=${product.itemKey}` : product.href;
  const primaryClass =
    product.primaryCta === 'Add to Cart' || product.highlighted
      ? 'bg-orange text-white hover:bg-orange-500'
      : 'border border-stone-300 bg-white text-navy hover:border-orange hover:text-orange';

  return (
    <div className={`flex h-full flex-col rounded-[24px] border p-5 shadow-elev-1 ${product.highlighted ? 'border-orange bg-orange/[0.05]' : 'border-stone-200 bg-white'}`}>
      <div>
        <h3 className="text-xl font-extrabold tracking-tight text-navy">{product.name}</h3>
        {product.price ? <p className="mt-2 text-sm font-bold text-orange">{product.price}</p> : null}
        <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{product.description}</p>
        {product.covers?.length ? (
          <div className="mt-4 space-y-2">
            {product.covers.map((item) => (
              <div key={item} className="rounded-2xl bg-stone-50 px-3 py-2 text-sm font-semibold text-navy-900">
                {item}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="mt-auto pt-6 space-y-3">
        <Link
          href={primaryHref}
          className={`inline-flex min-h-[50px] w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${primaryClass}`}
        >
          {product.primaryCta}
        </Link>
      </div>
    </div>
  );
}

function StageSection({ id, stage, title, label, cta, products }: Stage) {
  const useFiveAcross = ['before-you-start', 'repeat-and-scale'].includes(id);

  return (
    <section id={id} className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-elev-1 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{stage}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{title}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-stone-700 sm:text-lg">{label}</p>
        </div>
        <a href={`#${id}`} className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-stone-100 px-5 py-3 text-sm font-semibold text-navy transition hover:bg-stone-200">
          {cta}
        </a>
      </div>

      {id === 'during-construction' ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      ) : useFiveAcross ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      )}
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
              Construction Support for Investment Projects
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl">
              Choose where you are in the project and get the right support before costs, delays, or execution problems grow.
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {investorStages.map((stage) => (
                <a
                  key={stage.id}
                  href={`#${stage.id}`}
                  className="rounded-[22px] border border-white/14 bg-white/8 px-4 py-4 text-left text-white transition hover:border-orange hover:bg-white/12"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">{stage.stage}</p>
                  <p className="mt-2 text-base font-extrabold leading-tight">{stage.heroLabel}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="container-pro">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Investor Pricing</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700 sm:text-lg">
              Choose the right support based on where you are in the project.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-elev-1">
            <div className="grid grid-cols-[1.05fr_1fr_1fr_1fr] border-b border-stone-200 bg-stone-50">
              <div className="px-4 py-5 sm:px-6" />
              {supportBundles.map((bundle) => (
                <div
                  key={bundle.title}
                  className={`px-4 py-5 text-center sm:px-6 ${bundle.highlighted ? 'border-x border-orange/30 bg-orange/[0.05]' : ''}`}
                >
                  <p className="mx-auto inline-flex rounded-full border border-orange/20 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-orange">{bundle.label}</p>
                  <h3 className="mt-3 text-xl font-extrabold tracking-tight text-navy">{bundle.title}</h3>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[1.05fr_1fr_1fr_1fr] border-b border-stone-200">
              <div className="px-4 py-3 text-sm font-semibold text-stone-600 sm:px-6">Bundle</div>
              {supportBundles.map((bundle) => (
                <div
                  key={`${bundle.title}-price`}
                  className={`px-4 py-3 text-center text-sm font-bold text-orange sm:px-6 ${bundle.highlighted ? 'border-x border-orange/30 bg-orange/[0.03]' : ''}`}
                >
                  {bundle.price}
                </div>
              ))}
            </div>

            {supportRows.map((row) => (
              <div key={row} className="grid grid-cols-[1.05fr_1fr_1fr_1fr] border-b border-stone-200 last:border-b-0">
                <div className="px-4 py-3 text-sm font-semibold text-navy-900 sm:px-6">{row}</div>
                {supportBundles.map((bundle) => {
                  const included = bundle.includes.includes(row);
                  return (
                    <div
                      key={`${bundle.title}-${row}`}
                      className={`flex items-center justify-center px-4 py-3 sm:px-6 ${bundle.highlighted ? 'border-x border-orange/30 bg-orange/[0.03]' : ''}`}
                    >
                      <span className={`text-lg font-bold ${included ? 'text-orange' : 'text-stone-300'}`}>
                        {included ? '✔' : '—'}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}

            <div className="grid grid-cols-[1.05fr_1fr_1fr_1fr] bg-stone-50">
              <div className="px-4 py-5 sm:px-6" />
              {supportBundles.map((bundle) => (
                <div
                  key={`${bundle.title}-cta`}
                  className={`px-4 py-5 sm:px-6 ${bundle.highlighted ? 'border-x border-orange/30 bg-orange/[0.05]' : ''}`}
                >
                  <a
                    href={bundle.href}
                    className={`inline-flex min-h-[52px] w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${bundle.highlighted ? 'bg-orange text-white hover:bg-orange-500' : 'bg-navy text-white hover:bg-navy-900'}`}
                  >
                    {bundle.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="investor-stages" className="bg-stone-50 py-14 sm:py-18">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Where are you in your project?</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Choose the stage that fits where you are now.</h2>
          </div>

          <div className="mt-10 grid gap-5">
            {investorStages.map((stage) => (
              <StageSection key={stage.stage} {...stage} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-10">
        <div className="container-pro">
          <p className="text-center text-sm font-semibold text-navy-900 sm:text-base">
            Projects across North Carolina. Investors supported from deal to execution.
          </p>
        </div>
      </section>

      <TestimonialsCarousel testimonials={investorTestimonials} />

      <section className="bg-navy-950 py-14 text-white sm:py-16">
        <div className="container-pro">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Not sure where you are?</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/82 sm:text-lg">
              Talk through your project and get direction on what to do next.
            </p>
            <div className="mt-8 flex items-center justify-center">
              <Link href="/services/homeowners/owner-consultation" className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-orange-500">
                Book a Project Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
