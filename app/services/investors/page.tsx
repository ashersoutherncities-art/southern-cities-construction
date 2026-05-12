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
  primaryCta: 'View Details';
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
  compact?: boolean;
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
        description: 'An underwriting opinion before earnest money: scope feasibility, a rough budget range with confidence levels, and the walk-away trigger. Decision-grade, not bid-grade.',
        href: '/services/investors/investor-review',
        secondaryHref: '/services/investors/investor-review',
        primaryCta: 'View Details',
        itemKey: 'investor-deal-scope-review',
      },
      {
        name: 'Budget & Scope Review',
        price: '$599',
        description: 'Line-item audit of an existing budget — yours, an investor pro-forma, or a contractor bid. Works pre-purchase (vetting a deal) or post-purchase (before bids and draws lock in).',
        href: '/services/investors/budget-review',
        secondaryHref: '/services/investors/budget-review',
        primaryCta: 'View Details',
        itemKey: 'budget-review',
      },
      {
        name: 'Permit & Local Compliance Review',
        price: '$399',
        description: 'See permit and code issues before they turn into project drag.',
        href: '/services/investors/permit-local-compliance-review',
        secondaryHref: '/services/investors/permit-local-compliance-review',
        primaryCta: 'View Details',
        itemKey: 'permit-local-compliance-review',
      },
      {
        name: 'Contractor Fit Consultation',
        price: '$349',
        description: 'Get a quick read on contractor fit before you hire the wrong team.',
        href: '/services/investors/contractor-fit-consultation',
        secondaryHref: '/services/investors/contractor-fit-consultation',
        primaryCta: 'View Details',
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
    compact: true,
    products: [
      {
        name: 'Contractor-Grade Budget',
        price: '$1,799',
        description: 'No real budget yet? We BUILD one from scratch — full takeoffs, real trade-network unit costs, bid-ready spreadsheet. The budget a GC would put together, without hiring one.',
        href: '/services/investors/contractor-grade-budget',
        secondaryHref: '/services/investors/contractor-grade-budget',
        primaryCta: 'View Details',
        itemKey: 'contractor-grade-budget',
      },
      {
        name: 'Contractor Match & Bid Coordination',
        price: '$1,499',
        description: 'We source vetted contractors that fit your scope, run a structured bid intake, and level the bids side-by-side so the award decision is easy.',
        href: '/services/investors/bid-coordination-contractor-match',
        secondaryHref: '/services/investors/bid-coordination-contractor-match',
        primaryCta: 'View Details',
        itemKey: 'bid-coordination-contractor-match',
      },
      {
        name: 'Permit Administration',
        description: 'Permit submission, correction handling, and inspection coordination so paperwork drag does not slow the project once construction starts.',
        href: '/services/investors/permit-administration',
        secondaryHref: '/services/investors/permit-administration',
        primaryCta: 'View Details',
      },
      {
        name: 'Materials & Logistics Setup',
        description: 'Purchasing, delivery sequencing, and materials responsibility scoped before the job starts so the schedule does not slip on supply timing.',
        href: '/services/investors/materials-logistics-setup',
        secondaryHref: '/services/investors/materials-logistics-setup',
        primaryCta: 'View Details',
      },
      {
        name: 'Lender Scope & Bid Package',
        description: 'Scope-of-work and bid package built around your lender or capital partner so funding conversations and draw approvals start from cleaner support.',
        href: '/services/investors/lender-scope-bid-package',
        secondaryHref: '/services/investors/lender-scope-bid-package',
        primaryCta: 'View Details',
      },
    ],
  },
  {
    id: 'during-construction',
    stage: 'Stage 3',
    heroLabel: 'During Construction',
    title: 'During Construction',
    label: 'Choose how much support you want while the project is active.',
    cta: 'Run This Project',
    compact: true,
    products: [
      {
        name: 'Construction Oversight',
        description: 'You stay in control, and we help keep the project from drifting.',
        href: '/review/construction-oversight',
        secondaryHref: '/services/investors/construction-oversight',
        primaryCta: 'View Details',
        covers: [
          'Review progress and scope',
          'Check budgets and payments',
          'Catch issues early',
          'Keep contractors accountable',
          'We do NOT pull permits',
          'We do NOT manage contractors',
          'We do NOT run the project',
          'We do NOT act as the general contractor',
        ],
      },
      {
        name: 'GC-Backed Build Support',
        description: 'You stay close to the project while Southern Cities provides licensed GC structure, controls, and execution support.',
        href: '/services/investors/owner-controlled-construction-gc-led',
        secondaryHref: '/services/investors/owner-controlled-construction-gc-led',
        primaryCta: 'View Details',
        highlighted: true,
        covers: [
          'Owner acts as self-hired project manager',
          'GC sets standards and controls',
          'Project runs under clear structure',
          'Permits prepared and pulled under GC',
          'Stronger support than managing alone',
          'Can transition into full contracting if needed',
        ],
      },
      {
        name: 'Full Execution',
        description: 'Southern Cities takes full responsibility when the project requires full management or contracting.',
        href: '/services/investors/full-construction-management-service',
        secondaryHref: '/services/investors/full-construction-management-service',
        primaryCta: 'View Details',
        covers: [
          'Full construction management',
          'Permits prepared and pulled',
          'Full contracting available',
          'Stronger execution control',
          'End-to-end project delivery',
        ],
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
    title: 'Due Diligence Bundle',
    price: 'Starting at $1,499',
    includes: ['Deal reviewed', 'Budget checked', 'Permit path mapped', 'Contractor fit reviewed'],
    cta: 'View Details',
    href: '/lp/due-diligence-bundle',
    highlighted: false,
  },
  {
    label: 'Before You Start',
    title: 'Project Setup Bundle',
    price: 'Starting at $2,500',
    includes: ['Scope prepared', 'Timeline built', 'Permit prep', 'Bid coordination', 'Cashflow schedule'],
    cta: 'View Details',
    href: '/lp/project-setup-bundle',
    highlighted: true,
    badge: 'Most Common',
  },
  {
    label: 'During Construction',
    title: 'Execution Support Bundle',
    price: 'Custom / Starting at $3,500',
    includes: ['Bid coordination', 'Cashflow schedule', 'Draws reviewed', 'Progress monitored', 'Permit prep', 'Project oversight', 'Full contracting available'],
    cta: 'View Details',
    href: '/lp/execution-support-bundle',
    highlighted: false,
  },
];

function ProductCard({ product }: { product: Product }) {
  const primaryHref = product.secondaryHref ?? product.href;
  const primaryClass = product.highlighted
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

function StageSection({ id, stage, title, label, cta, products, compact }: Stage) {
  // Widths are computed so items + gap-5 (1.25rem) exactly fill 100%, which
  // means full rows look identical to a regular grid. justify-center only
  // affects PARTIAL last rows (e.g. 5 items in a 3-col layout) — those get
  // centered instead of left-aligned with awkward empty space.
  const itemWidthClass = compact
    ? 'w-full md:w-[calc(50%-0.625rem)] xl:w-[calc(33.333%-0.834rem)]'
    : 'w-full md:w-[calc(50%-0.625rem)] xl:w-[calc(25%-0.9375rem)]';

  return (
    <section id={id} className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-elev-1 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full border border-orange/20 bg-orange/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-orange">{title}</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{stage}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-stone-700 sm:text-lg">{label}</p>
        </div>
        <a href={`#pricing`} className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-stone-100 px-5 py-3 text-sm font-semibold text-navy transition hover:bg-stone-200">
          {cta}
        </a>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-5">
        {products.map((product) => (
          <div key={product.name} className={itemWidthClass}>
            <ProductCard product={product} />
          </div>
        ))}
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

      <section className="relative overflow-hidden bg-[#08111d] pt-32 pb-24 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 motion-safe:animate-[heroFloat_22s_ease-in-out_infinite] bg-[linear-gradient(125deg,#163061_0%,#10254c_50%,#143367_100%)]" style={{ backgroundSize: '180% 180%' }} aria-hidden="true" />
        <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(circle_at_30%_35%,rgba(245,130,32,0.22),transparent_55%)]" />
        <div className="absolute left-[-10%] top-[10%] h-72 w-72 rounded-full bg-[rgba(245,130,32,0.12)] blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[5%] h-80 w-80 rounded-full bg-[rgba(255,255,255,0.06)] blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 container-pro">
          <div className="mx-auto max-w-5xl text-center">
            <p className="flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#f58220] motion-safe:animate-[heroRise_900ms_ease-out]">
              <span className="block h-px w-10 bg-[#f58220]/80" aria-hidden="true" />
              For Investors · Licensed NC GC #107724
              <span className="block h-px w-10 bg-[#f58220]/80" aria-hidden="true" />
            </p>
            <h1 className="mt-6 text-[2.75rem] font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-[3.75rem] lg:text-[4.75rem] motion-safe:animate-[heroRise_1000ms_ease-out_0.1s_both]">
              Construction support for <span className="text-[#f58220]">investment projects.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-[1.55] text-white/85 sm:text-xl motion-safe:animate-[heroRise_1100ms_ease-out_0.2s_both]">
              Choose where you are in the project and get the right support before costs, delays, or execution problems grow.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3 motion-safe:animate-[heroRise_1200ms_ease-out_0.3s_both]">
              {investorStages.map((stage) => (
                <a
                  key={stage.id}
                  href={`#${stage.id}`}
                  className="w-full max-w-[200px] flex-1 basis-[180px] rounded-[16px] border border-white/15 bg-white/[0.06] px-4 py-4 text-left text-white transition hover:-translate-y-0.5 hover:border-[#f58220]/60 hover:bg-white/[0.1] sm:max-w-[220px]"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f58220]">{stage.stage}</p>
                  <p className="mt-2 text-base font-extrabold leading-tight">{stage.heroLabel}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
        <style>{`
@keyframes heroFloat { 0%, 100% { transform: scale(1.04) translate3d(0, 0, 0); } 50% { transform: scale(1.08) translate3d(-12px, -8px, 0); } }
@keyframes heroRise { 0% { opacity: 0; transform: translate3d(0, 24px, 0); filter: blur(4px); } 60% { filter: blur(0); } 100% { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); } }
`}</style>
      </section>

      <section className="bg-white py-8 sm:py-10">
        <div className="container-pro">
          <div className="overflow-hidden rounded-[28px] border border-[#24406b] bg-[linear-gradient(135deg,#071b3d_0%,#0b2146_50%,#081730_100%)] shadow-[0_18px_40px_rgba(4,15,34,0.22)]">
            <div className="grid gap-8 px-5 py-6 sm:px-7 sm:py-7 lg:grid-cols-[1.25fr_0.95fr] lg:items-start lg:gap-9 lg:px-8 lg:py-8">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#8b5b2a] bg-[#0b254a] px-3 py-1.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
                  <span className="text-[12px] leading-none text-orange">♛</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f2a35c]">Flagship Investor Support</span>
                </div>

                <h2 className="mt-4 max-w-xl text-[32px] font-extrabold leading-[1.02] tracking-[-0.04em] text-white sm:text-[40px] lg:text-[46px]">
                  <span className="block">GC-Backed Build</span>
                  <span className="mt-1 block text-orange">Support</span>
                </h2>

                <p className="mt-4 max-w-xl text-[16px] leading-[1.65] text-white sm:text-[17px]">
                  You stay close to the project. We provide the structure, permits, and GC backing to keep it on track.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {[
                    { title: 'You stay in control', desc: 'You act as project manager.' },
                    { title: 'GC structure', desc: 'Controls and compliance.' },
                    { title: 'Permits under GC', desc: 'Prepared and pulled.' },
                    { title: 'Built right', desc: 'Clear execution standards.' },
                    { title: 'Flexible path', desc: 'Can move to full contracting.' },
                  ].map((item) => (
                    <div key={item.title} className="rounded-[14px] border border-white/15 bg-white/[0.06] px-3 py-3">
                      <span className="block text-[16px] leading-none text-orange">◎</span>
                      <p className="mt-2 text-[12px] font-bold leading-tight text-white">{item.title}</p>
                      <p className="mt-1.5 text-[11px] leading-[1.5] text-white/90">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/services/investors/owner-controlled-construction-gc-led"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-orange px-6 py-3 text-[14px] font-semibold text-white shadow-[0_10px_20px_rgba(249,115,22,0.22)] transition hover:bg-orange-500"
                  >
                    View Details
                  </Link>
                  <Link
                    href="/services/homeowners/owner-consultation"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/28 bg-transparent px-6 py-3 text-[14px] font-semibold text-white transition hover:border-white/50 hover:bg-white/[0.04]"
                  >
                    Talk Through Your Project
                  </Link>
                </div>
              </div>

              <div className="rounded-[22px] border border-white/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.05)_100%)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_28px_rgba(3,10,24,0.24)] backdrop-blur-sm sm:px-5 sm:py-5">
                <ul className="grid gap-0">
                  {[
                    { title: 'Owner acts as project manager', desc: 'You stay involved while we provide structure and support.' },
                    { title: 'GC structure and controls in place', desc: 'Licensed GC backing brings accountability and risk protection.' },
                    { title: 'Permits prepared and pulled', desc: 'Permits are handled under GC structure when applicable.' },
                    { title: 'Clear standards for scope & contractors', desc: 'The project runs under clearer expectations.' },
                    { title: 'Can transition to full contracting', desc: 'If needed, Southern Cities can take a heavier role.' },
                  ].map((item, index) => (
                    <li key={item.title} className={`flex items-start gap-3 py-3.5 ${index < 4 ? 'border-b border-white/10' : ''}`}>
                      <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#081b3a] text-[18px] text-orange shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">◎</span>
                      <div className="min-w-0">
                        <p className="text-[14px] font-bold leading-tight text-white">{item.title}</p>
                        <p className="mt-1.5 text-[13px] leading-[1.55] text-white/95">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-[#08111d] py-14 sm:py-16">
        <div className="container-pro">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#f58220]">Pricing bundles</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">Investor Bundle Pricing</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white sm:text-lg">
              Choose the right support based on where you are in the project.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[24px] border border-white/15 bg-[linear-gradient(135deg,#071b3d_0%,#0b2146_50%,#081730_100%)] shadow-[0_18px_40px_rgba(4,15,34,0.32)]">
            <div className="grid grid-cols-[0.95fr_1fr_1fr_1fr] border-b border-white/10">
              <div className="px-4 py-4 sm:px-5" />
              {supportBundles.map((bundle) => (
                <div key={bundle.title} className={`px-4 py-4 text-center sm:px-5 ${bundle.highlighted ? 'border-x border-[#f58220]/40 bg-[#f58220]/[0.08]' : ''}`}>
                  <p className="mx-auto inline-flex rounded-full border border-[#f58220]/30 bg-[#0b1f44] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f58220]">{bundle.label}</p>
                  <h3 className="mt-2 text-lg font-extrabold tracking-tight text-white">{bundle.title}</h3>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[0.95fr_1fr_1fr_1fr] border-b border-white/10">
              <div className="px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white/85 sm:px-5">Pricing</div>
              {supportBundles.map((bundle) => (
                <div key={`${bundle.title}-price`} className={`px-4 py-3 text-center text-sm font-bold text-[#f58220] sm:px-5 ${bundle.highlighted ? 'border-x border-[#f58220]/40 bg-[#f58220]/[0.06]' : ''}`}>
                  {bundle.price}
                </div>
              ))}
            </div>

            {supportRows.map((row) => (
              <div key={row} className="grid grid-cols-[0.95fr_1fr_1fr_1fr] border-b border-white/10 last:border-b-0">
                <div className="px-4 py-2.5 text-sm font-semibold text-white sm:px-5">{row}</div>
                {supportBundles.map((bundle) => {
                  const included = bundle.includes.includes(row);
                  return (
                    <div key={`${bundle.title}-${row}`} className={`flex items-center justify-center px-4 py-2.5 sm:px-5 ${bundle.highlighted ? 'border-x border-[#f58220]/40 bg-[#f58220]/[0.06]' : ''}`}>
                      <span className={`text-base font-bold ${included ? 'text-[#f58220]' : 'text-white/25'}`}>{included ? '✔' : '—'}</span>
                    </div>
                  );
                })}
              </div>
            ))}

            <div className="grid grid-cols-[0.95fr_1fr_1fr_1fr]">
              <div className="px-4 py-4 sm:px-5" />
              {supportBundles.map((bundle) => (
                <div key={`${bundle.title}-cta`} className={`px-4 py-4 sm:px-5 ${bundle.highlighted ? 'border-x border-[#f58220]/40 bg-[#f58220]/[0.08]' : ''}`}>
                  <a href={bundle.href} className={`inline-flex min-h-[46px] w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-bold uppercase tracking-[0.06em] transition hover:-translate-y-0.5 ${bundle.highlighted ? 'bg-[#f58220] text-white shadow-[0_10px_24px_-8px_rgba(245,130,32,0.5)] hover:bg-[#ff9229]' : 'border border-white/25 text-white hover:bg-white/5'}`}>
                    View Pricing
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
