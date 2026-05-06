import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

type Stage = {
  stage: string;
  label: string;
  cta: string;
  href: string;
  products: string[];
};

const investorStages: Stage[] = [
  {
    stage: 'Stage 1',
    label: 'Before you commit more time or money',
    cta: 'Review Your Project',
    href: '/services/investors/investor-review',
    products: [
      'Investor Deal & Scope Review - $499',
      'Budget Review - $599',
      'Permit & Local Compliance Review - $399',
      'Contractor Fit Consultation - $349',
    ],
  },
  {
    stage: 'Stage 2',
    label: 'Before construction begins',
    cta: 'Plan This Project',
    href: '/services/investors/project-timeline-schedule-preparation',
    products: [
      'Rehab Budget Review',
      'Bid Coordination / Contractor Match',
      'Lender Scope & Bid Package',
      'Materials & Logistics Setup',
      'Regional Investor Setup Consultation',
    ],
  },
  {
    stage: 'Stage 3',
    label: 'Before and during funding',
    cta: 'Set Up Draws',
    href: '/services/investors/draw-review-support',
    products: [
      'Draw Review Support - $399',
      'Construction Draw Strategy & Alignment',
      'Schedule of Cashflows Preparation',
      'Lender-Ready Scope & Bid Package',
    ],
  },
  {
    stage: 'Stage 4',
    label: 'When the project is active',
    cta: 'Run This Project',
    href: '/services/investors/owner-controlled-construction-gc-led',
    products: [
      'Construction Oversight',
      'Project Coordination & Control',
      'Owner-Controlled Construction, GC-Led',
      'Full Construction Management Service',
      'Full Contracting',
    ],
  },
  {
    stage: 'Stage 5',
    label: 'For ongoing operations',
    cta: 'See Support Plans',
    href: '/recurring-support#investors',
    products: [
      'Turn Support Plan',
      'Operator Support Plan',
      'Project Support Retainer',
      'Due Diligence Package (3 deals/month)',
      'Construction Planning Package (3 deals/month)',
    ],
  },
];

const investorTestimonials = [
  {
    quote: 'They helped us catch scope and budget issues before we got too far in.',
    by: 'Investor client',
  },
  {
    quote: 'The draw and construction support kept the project moving when things could have stalled.',
    by: 'Repeat operator',
  },
  {
    quote: 'It felt like having a clear construction decision path instead of guessing every step.',
    by: 'North Carolina investor',
  },
];

function StageSection({ stage, label, cta, href, products }: Stage) {
  return (
    <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-elev-1 sm:p-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{stage}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{label}</h2>
      <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-stone-700">
        {products.map((product) => (
          <li key={product} className="flex items-start gap-3">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange" />
            <span>{product}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link
          href={href}
          className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
        >
          {cta}
        </Link>
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
              Construction Support for Investment Projects
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl">
              Know your deal, set it up right, and keep it moving.
            </p>
            <div className="mt-8">
              <a href="#investor-stages" className="inline-flex items-center justify-center rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-orange-500">
                Review Your Project
              </a>
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

      <section className="bg-white py-10">
        <div className="container-pro">
          <p className="text-center text-sm font-semibold text-navy-900 sm:text-base">
            Projects across North Carolina. Investors supported from deal to execution.
          </p>
        </div>
      </section>

      <section className="bg-stone-50 py-14 sm:py-16">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Testimonials</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Investor feedback</h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {investorTestimonials.map((item) => (
              <div key={item.quote} className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
                <p className="text-[15px] leading-relaxed text-stone-700">&ldquo;{item.quote}&rdquo;</p>
                <p className="mt-4 text-sm font-semibold text-navy-900">{item.by}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
