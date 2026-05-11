import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';

type Params = { slug: string };

type LandingPageConfig = {
  slug: string;
  productKey?: string;
  fallbackHref?: string;
  ctaLabel: string;
  price: string;
  heroHeadline: string;
  heroSubheadline: string;
  problemHeadline: string;
  problemBullets: string[];
  getBullets: string[];
  processBullets: string[];
  trustQuote: string;
  trustName: string;
  faqs: { q: string; a: string }[];
};

const LANDING_PAGES: LandingPageConfig[] = [
  {
    slug: 'investor-deal-review',
    productKey: 'investor-review',
    ctaLabel: 'Buy Review',
    price: '$499',
    heroHeadline: 'Do Not Move Forward Without Reviewing Your Deal',
    heroSubheadline: 'Get a clear investor-focused review of the scope, budget, and project risks before you commit more money.',
    problemHeadline: 'What goes wrong if you skip this',
    problemBullets: ['Underestimating rehab costs', 'Missing scope items', 'Buying into hidden risk', 'Moving forward without clear next steps'],
    getBullets: ['Clear review of your project', 'Risk identification', 'Budget and scope validation', 'Written next-step guidance'],
    processBullets: ['Submit your project', 'We review it', 'You get clear direction'],
    trustQuote: 'They gave me a straight read before I threw more money at the deal.',
    trustName: 'Investor client',
    faqs: [
      { q: 'What do you need from me?', a: 'Property address, photos, and any scope or rehab notes you already have.' },
      { q: 'How long does it take?', a: 'Typical turnaround is 2 business days.' },
      { q: 'What do I get back?', a: 'A clear review with risk callouts and next-step direction.' },
      { q: 'Is this for my type of project?', a: 'Yes, if you are evaluating a residential investor project before moving forward.' },
    ],
  },
  {
    slug: 'budget-scope-review',
    productKey: 'budget-review',
    ctaLabel: 'Start Budget Review',
    price: '$599',
    heroHeadline: 'Don’t Underestimate Your Rehab Budget',
    heroSubheadline: 'Know your real costs before you commit more money to the project.',
    problemHeadline: 'Most Investors Get This Wrong',
    problemBullets: ['Budgets miss major scope items', 'Contractor estimates don’t match reality', 'Costs grow halfway through the project', 'Profit disappears'],
    getBullets: ['Real Budget Alignment', 'Missing Costs Identified', 'High-Risk Areas Flagged', 'Clear Next Steps'],
    processBullets: ['Submit Your Project', 'We Review Everything', 'You Get Clear Direction'],
    trustQuote: 'They caught things we completely missed before we moved forward.',
    trustName: 'Investor, NC',
    faqs: [
      { q: 'What do you need from me?', a: 'Property address, photos, scope notes, and the budget or contractor numbers you want reviewed.' },
      { q: 'How long does it take?', a: 'Typical turnaround is 2 business days.' },
      { q: 'What do I get back?', a: 'A clearer read on whether the budget matches the actual scope.' },
      { q: 'Is this for my type of project?', a: 'Yes, if you are evaluating a residential rehab or investor project before moving forward.' },
    ],
  },
  {
    slug: 'permit-path-review',
    productKey: 'permit-local-compliance-review',
    ctaLabel: 'Buy Review',
    price: '$399',
    heroHeadline: 'Make Sure Your Project Can Get Permitted',
    heroSubheadline: 'Understand permit requirements and approval risks before you move deeper into planning or spend more money.',
    problemHeadline: 'What goes wrong if you skip this',
    problemBullets: ['Permit issues show up late', 'Project assumptions break', 'Local compliance gets missed', 'Time and money get wasted'],
    getBullets: ['Permit path review', 'Local compliance risk identification', 'Approval pressure callouts', 'Written next-step guidance'],
    processBullets: ['Submit your project', 'We review permit and compliance risk', 'You get clear direction'],
    trustQuote: 'This helped us see the permit side before it became an expensive surprise.',
    trustName: 'Investor client',
    faqs: [
      { q: 'What do you need from me?', a: 'Property address, photos, and a basic scope or rehab plan.' },
      { q: 'How long does it take?', a: 'Typical turnaround is 2 business days.' },
      { q: 'What do I get back?', a: 'A review of likely permit requirements, risk points, and next steps.' },
      { q: 'Is this permit filing?', a: 'No. This is a review before permit prep or submission.' },
    ],
  },
  {
    slug: 'contractor-fit',
    productKey: 'contractor-fit-consultation',
    ctaLabel: 'Buy Review',
    price: '$349',
    heroHeadline: 'Do Not Hire The Wrong Contractor For This Project',
    heroSubheadline: 'Get a cleaner read on contractor fit, bid risk, and project readiness before hiring creates delay and confusion.',
    problemHeadline: 'What goes wrong if you skip this',
    problemBullets: ['Hiring the wrong contractor', 'Choosing a weak delivery model', 'Paying against bad assumptions', 'Starting with the wrong expectations'],
    getBullets: ['Contractor fit review', 'Bid and risk guidance', 'Execution readiness review', 'Written next-step direction'],
    processBullets: ['Submit your project', 'We review contractor fit and project context', 'You get clear direction'],
    trustQuote: 'It made the contractor decision much cleaner before startup.',
    trustName: 'Investor client',
    faqs: [
      { q: 'What do you need from me?', a: 'Project address, scope notes, photos, and any contractor bids or notes you already have.' },
      { q: 'How long does it take?', a: 'Typical turnaround is a scheduled consultation.' },
      { q: 'What do I get back?', a: 'Guidance on contractor fit, risk, and the most sensible next move.' },
      { q: 'Is this contractor sourcing?', a: 'No. This is a fit consultation, not a sourcing campaign.' },
    ],
  },
  {
    slug: 'draw-review',
    productKey: 'draw-review-support',
    ctaLabel: 'Buy Review',
    price: '$399',
    heroHeadline: 'Review The Draw Before You Release The Money',
    heroSubheadline: 'Make sure payment matches actual progress before sending funds on an active project.',
    problemHeadline: 'What goes wrong if you skip this',
    problemBullets: ['Overpaying too early', 'Missing incomplete work', 'Releasing money against weak documentation', 'Losing leverage on the active job'],
    getBullets: ['Draw review', 'Progress-versus-payment check', 'Risk identification', 'Written next-step guidance'],
    processBullets: ['Submit the draw file', 'We review it', 'You get clear direction before releasing funds'],
    trustQuote: 'It helped us catch progress issues before the money went out.',
    trustName: 'Investor client',
    faqs: [
      { q: 'What do you need from me?', a: 'The draw request, photos, scope or rehab plan, and any budget or payment schedule you have.' },
      { q: 'How long does it take?', a: 'Typical turnaround is 2 business days.' },
      { q: 'What do I get back?', a: 'A review of whether the payment request matches the actual progress shown.' },
      { q: 'Is this lender approval?', a: 'No. This is an independent review before you release money.' },
    ],
  },
];

function getConfig(slug: string) {
  return LANDING_PAGES.find((page) => page.slug === slug) || null;
}

function PrimaryCta({ config, className = '' }: { config: LandingPageConfig; className?: string }) {
  const classes = `inline-flex min-h-[48px] items-center justify-center rounded-[2px] bg-[#f58220] px-6 py-3 text-[12px] font-black uppercase tracking-[0.05em] text-white shadow-[0_10px_20px_rgba(245,130,32,0.28)] transition hover:bg-[#ff9229] ${className}`;

  if (config.productKey) {
    return <AddToCartButton itemKey={config.productKey} label={`${config.ctaLabel} →`} className={classes} />;
  }

  return (
    <Link href={config.fallbackHref || '/cart'} className={classes}>
      {config.ctaLabel} →
    </Link>
  );
}

function BudgetScopePage({ config }: { config: LandingPageConfig }) {
  const problemCards = [
    { icon: '△', title: 'Budgets miss major scope items', body: 'Important work gets overlooked and costs more later.' },
    { icon: '⌗', title: 'Contractor estimates don’t match reality', body: 'Numbers look good until the work actually starts.' },
    { icon: '⌁', title: 'Costs grow halfway through the project', body: 'Unidentified issues turn into expensive surprises.' },
    { icon: '$', title: 'Profit disappears', body: 'The deal on paper does not work in reality.' },
  ];

  const solutionCards = [
    { icon: '◎', title: 'Real Budget Alignment', body: 'Your budget actually matches the scope.' },
    { icon: '◫', title: 'Missing Costs Identified', body: 'No more surprise expenses mid-project.' },
    { icon: '◯', title: 'High-Risk Areas Flagged', body: 'Know what can blow up your numbers.' },
    { icon: '↗', title: 'Clear Next Steps', body: 'You know exactly what to fix or change.' },
  ];

  const steps = [
    { num: '1', title: 'Submit Your Project', body: 'Send us your scope, budget, and any relevant details.' },
    { num: '2', title: 'We Review Everything', body: 'We analyze your scope, budget, and potential risk.' },
    { num: '3', title: 'You Get Clear Direction', body: 'Receive a written review with insights and recommended next steps.' },
  ];

  return (
    <main className="min-h-screen bg-white text-[#0c1627]">
      <section className="relative overflow-hidden bg-[#08111d]">
        <div className="absolute inset-0">
          <Image src="/lp-budget-hero-bg.jpg" alt="Construction plans and project budgeting" fill className="object-cover object-right" priority />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,12,22,0.90)_0%,rgba(6,15,27,0.82)_34%,rgba(7,15,27,0.48)_62%,rgba(7,15,27,0.18)_100%)]" />
        <div className="relative z-10 mx-auto max-w-[1080px] px-6 pb-8 pt-4 sm:px-8 sm:pb-10 lg:px-8">
          <div className="flex items-start justify-between">
            <Image src="/sc-construction-logo.png" alt="Southern Cities Construction" width={122} height={30} className="h-7 w-auto" priority />
            <div className="hidden items-center gap-2 pt-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/86 sm:flex">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/35 text-[8px]">✓</span>
              Licensed NC General Contractor
            </div>
          </div>

          <div className="mt-9 max-w-[350px] sm:mt-12 lg:mt-10">
            <h1 className="text-[2.35rem] font-black leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.02rem] lg:text-[3.6rem]">
              Don’t Underestimate Your Rehab <span className="text-[#f58220]">Budget</span>
            </h1>
            <p className="mt-4 max-w-[280px] text-[0.98rem] leading-[1.62] text-white/84 sm:text-[1.02rem]">
              Know your real costs before you commit more money to the project.
            </p>
            <div className="mt-5">
              <PrimaryCta config={config} className="min-w-[178px]" />
            </div>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-medium text-white/76">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/35 text-[8px]">✓</span>
              Trusted by investors across North Carolina
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-9 sm:px-8 lg:px-8 lg:py-11">
        <div className="mx-auto max-w-[1080px]">
          <p className="text-center text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#f58220]">The Problem</p>
          <h2 className="mt-2 text-center text-[2rem] font-black tracking-[-0.03em] text-[#111827]">Most Investors Get This Wrong</h2>

          <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {problemCards.map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center text-[2.2rem] font-light text-[#d5aa74]">{item.icon}</div>
                <h3 className="mx-auto mt-3 max-w-[178px] text-[1rem] font-extrabold leading-[1.26] text-[#111827]">{item.title}</h3>
                <p className="mx-auto mt-2 max-w-[180px] text-[12px] leading-[1.6] text-[#525b69]">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex justify-center">
            <div className="inline-flex min-w-[210px] items-center justify-center gap-2 rounded-[2px] bg-[#f6e7d7] px-6 py-[11px] text-[12px] font-semibold text-[#77552f]">
              <span className="text-[#f58220]">✦</span>
              That’s how deals go bad.
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#09192d] px-6 py-11 sm:px-8 lg:px-8 lg:py-13">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)]" />
        <div className="relative mx-auto max-w-[1080px]">
          <p className="text-center text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#f58220]">The Solution</p>
          <h2 className="mt-2 text-center text-[2rem] font-black tracking-[-0.03em] text-white">What You Get</h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solutionCards.map((item) => (
              <div key={item.title} className="min-h-[178px] rounded-[2px] border border-white/14 bg-[rgba(7,15,27,0.18)] px-5 py-5 text-center text-white">
                <div className="mx-auto flex h-13 w-13 items-center justify-center text-[2rem] text-[#f58220]">{item.icon}</div>
                <h3 className="mx-auto mt-4 max-w-[150px] text-[1rem] font-extrabold leading-[1.24]">{item.title}</h3>
                <p className="mx-auto mt-2 max-w-[160px] text-[12px] leading-[1.6] text-white/72">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex justify-center">
            <PrimaryCta config={config} className="min-w-[178px]" />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-11 sm:px-8 lg:px-8 lg:py-13">
        <div className="mx-auto max-w-[1080px]">
          <p className="text-center text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#f58220]">The Process</p>
          <h2 className="mt-2 text-center text-[2rem] font-black tracking-[-0.03em] text-[#111827]">How It Works</h2>

          <div className="mt-9 grid gap-7 lg:grid-cols-3 lg:items-start">
            {steps.map((step, index) => (
              <div key={step.num} className="relative text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#0b1430] text-[13px] font-black text-white">{step.num}</div>
                {index < 2 ? <div className="absolute left-[67%] top-[20px] hidden h-px w-[66%] bg-[#e9e1d5] lg:block" /> : null}
                <h3 className="mt-4 text-[0.98rem] font-extrabold text-[#111827]">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-[210px] text-[12px] leading-[1.62] text-[#59616d]">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <div className="rounded-[2px] border border-[#22344b] bg-[#091729] p-5 text-white shadow-[0_14px_34px_rgba(7,15,27,0.14)] min-h-[260px]">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#f58220]">Why Trust Southern Cities</p>
              <ul className="mt-5 space-y-3 text-[13px] leading-[1.65] text-white/88">
                <li className="flex items-start gap-3"><span className="text-[#f58220]">◉</span><span>Licensed NC General Contractor</span></li>
                <li className="flex items-start gap-3"><span className="text-[#f58220]">◉</span><span>Investor-focused construction support</span></li>
                <li className="flex items-start gap-3"><span className="text-[#f58220]">◉</span><span>Projects reviewed across North Carolina</span></li>
              </ul>
              <div className="mt-6 rounded-[2px] border border-white/14 bg-[rgba(255,255,255,0.03)] p-4">
                <p className="text-[12.5px] leading-[1.65] text-white/82">“They caught things we completely missed before we moved forward.”</p>
                <p className="mt-3 text-[12px] font-semibold text-white">- Investor, NC</p>
              </div>
            </div>

            <div className="rounded-[2px] border border-[#ece6dc] bg-[#fcfaf7] p-5 shadow-[0_10px_24px_rgba(17,24,39,0.04)] min-h-[260px]">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#f58220]">What This Is Not</p>
              <ul className="mt-5 space-y-3 text-[13px] leading-[1.65] text-[#3e4856]">
                <li className="flex items-start gap-3"><span>⊗</span><span>Not a contractor bid</span></li>
                <li className="flex items-start gap-3"><span>⊗</span><span>Not full estimating</span></li>
                <li className="flex items-start gap-3"><span>⊗</span><span>Not project management</span></li>
                <li className="flex items-start gap-3"><span>⊗</span><span>Not permit pulling</span></li>
              </ul>
              <p className="mt-7 text-[12.5px] leading-[1.68] text-[#5d6672]">This is a decision tool, not a full service.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#faf7f1_0%,#f4ece2_100%)] px-6 py-6 sm:px-8 lg:px-8">
        <div className="mx-auto max-w-[1080px]">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#f58220]">Budget & Scope Review</p>
              <p className="mt-2 text-[3rem] font-black leading-none tracking-[-0.05em] text-[#111827]">$599</p>
              <p className="mt-2 text-[12.5px] text-[#59616d]">One flat fee. Clear answers.</p>
            </div>
            <div className="flex flex-col items-start lg:items-center lg:justify-center">
              <PrimaryCta config={config} className="min-w-[235px]" />
              <div className="mt-4 flex items-center gap-2 text-[10px] text-[#8a6a46]">
                <span className="text-[#f58220]">✓</span>
                Secure. Confidential. No obligation.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 pb-10 pt-7 sm:px-8 lg:px-8 lg:pb-12">
        <div className="mx-auto max-w-[1080px]">
          <p className="text-center text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#f58220]">FAQ</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {config.faqs.map((faq) => (
              <div key={faq.q} className="flex min-h-[46px] items-center justify-between rounded-[2px] border border-[#ece6dc] bg-white px-4 py-3 shadow-[0_6px_16px_rgba(17,24,39,0.03)]">
                <p className="text-[12.5px] font-semibold text-[#111827]">{faq.q}</p>
                <span className="text-[17px] leading-none text-[#a0a7b1]">+</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function DefaultLandingPage({ config }: { config: LandingPageConfig }) {
  return (
    <main className="min-h-screen bg-stone-50 text-navy-900">
      <section className="relative overflow-hidden bg-navy-900">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#163061_0%,#10254c_100%)]" />
        <div className="relative z-10 mx-auto max-w-6xl px-5 py-6 sm:px-8">
          <div className="flex items-center justify-center sm:justify-start">
            <Image src="/sc-construction-logo.png" alt="Southern Cities Construction" width={176} height={44} className="h-10 w-auto" priority />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-10">
          <div className="max-w-4xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Southern Cities Construction</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">{config.heroHeadline}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/86">{config.heroSubheadline}</p>
            <div className="mt-8">
              <PrimaryCta config={config} className="min-w-[220px]" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="rounded-[28px] border border-stone-200 bg-white p-7 shadow-elev-1 sm:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">{config.problemHeadline}</h2>
          <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-stone-700">
            {config.problemBullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-2 sm:px-8 sm:py-3">
        <div className="rounded-[28px] border border-stone-200 bg-white p-7 shadow-elev-1 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">What You Get</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-stone-700">
                {config.getBullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <PrimaryCta config={config} className="min-w-[220px]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[28px] border border-stone-200 bg-white p-7 shadow-elev-1 sm:p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">What Happens Next</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-stone-700">
              {config.processBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-[28px] border border-stone-200 bg-white p-7 shadow-elev-1 sm:p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">Trust</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-stone-700">
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange" /><span>Licensed NC General Contractor</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange" /><span>Investor-focused</span></li>
            </ul>
            <div className="mt-6 rounded-[22px] border border-stone-200 bg-stone-50 p-5">
              <p className="text-[15px] leading-relaxed text-stone-700">“{config.trustQuote}”</p>
              <p className="mt-3 text-sm font-semibold text-navy-900">{config.trustName}</p>
            </div>
          </section>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-2 sm:px-8 sm:py-3">
        <div className="rounded-[28px] border border-navy-900 bg-navy-900 p-7 text-white shadow-elev-2 sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Pricing</p>
          <p className="mt-4 text-4xl font-extrabold tracking-tight">{config.price}</p>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/82">Direct decision product. Clear scope. Fast next step.</p>
          <div className="mt-7">
            <PrimaryCta config={config} className="min-w-[220px]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="rounded-[28px] border border-stone-200 bg-white p-7 shadow-elev-1 sm:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">FAQ</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {config.faqs.map((faq) => (
              <div key={faq.q} className="rounded-[22px] border border-stone-200 bg-stone-50 p-5">
                <p className="font-semibold text-navy-900">{faq.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone-700">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <PrimaryCta config={config} className="min-w-[220px]" />
          </div>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

export default function LandingPage({ params }: { params: Params }) {
  const config = getConfig(params.slug);
  if (!config) notFound();

  if (params.slug === 'budget-scope-review') {
    return <BudgetScopePage config={config} />;
  }

  return <DefaultLandingPage config={config} />;
}
