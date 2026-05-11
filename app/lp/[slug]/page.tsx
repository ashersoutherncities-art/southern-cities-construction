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
  const classes = `inline-flex min-h-[50px] items-center justify-center rounded-[4px] bg-[#f58220] px-6 py-3 text-[13px] font-extrabold uppercase tracking-[0.04em] text-white shadow-[0_10px_24px_rgba(245,130,32,0.24)] transition hover:bg-[#ff932f] ${className}`;

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
  return (
    <main className="min-h-screen bg-white text-[#091528]">
      <section className="relative overflow-hidden bg-[#08111d]">
        <div className="absolute inset-0">
          <Image src="/lp-budget-hero-bg.jpg" alt="Construction plans and project budgeting" fill className="object-cover object-center" priority />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,15,27,0.92)_0%,rgba(9,22,41,0.88)_36%,rgba(8,17,29,0.44)_70%,rgba(8,17,29,0.34)_100%)]" />
        <div className="relative z-10 mx-auto max-w-[1180px] px-6 pb-14 pt-5 sm:px-8 sm:pb-16 lg:px-10">
          <div className="flex items-center justify-between">
            <Image src="/sc-construction-logo.png" alt="Southern Cities Construction" width={128} height={32} className="h-8 w-auto" priority />
            <div className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/88 sm:flex">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/35 text-[9px]">✓</span>
              Licensed NC General Contractor
            </div>
          </div>

          <div className="mt-10 max-w-[430px] sm:mt-14 lg:mt-12">
            <h1 className="text-[2.65rem] font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-[3.25rem] lg:text-[3.9rem]">
              Don’t Underestimate Your Rehab <span className="text-[#f58220]">Budget</span>
            </h1>
            <p className="mt-5 max-w-[360px] text-[1.08rem] leading-[1.6] text-white/86">
              Know your real costs before you commit more money to the project.
            </p>
            <div className="mt-7">
              <PrimaryCta config={config} className="min-w-[215px]" />
            </div>
            <div className="mt-4 flex items-center gap-2 text-[11px] font-medium text-white/76">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/35 text-[9px]">✓</span>
              Trusted by investors across North Carolina
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#efe7da] bg-white px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-[1080px]">
          <p className="text-center text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#f58220]">The Problem</p>
          <h2 className="mt-2 text-center text-[2rem] font-black tracking-[-0.03em] text-[#111827]">Most Investors Get This Wrong</h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '△', title: 'Budgets miss major scope items', body: 'Important work gets overlooked and costs more later.' },
              { icon: '⌗', title: 'Contractor estimates don’t match reality', body: 'Numbers look good until the work actually starts.' },
              { icon: '⌁', title: 'Costs grow halfway through the project', body: 'Unidentified issues turn into expensive surprises.' },
              { icon: '$', title: 'Profit disappears', body: 'The deal on paper does not work in reality.' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center text-[1.55rem] font-light text-[#d9a56c]">{item.icon}</div>
                <h3 className="mt-3 text-[1.1rem] font-extrabold leading-[1.28] text-[#111827]">{item.title}</h3>
                <p className="mx-auto mt-3 max-w-[220px] text-[13px] leading-[1.7] text-[#4b5563]">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-[3px] bg-[#f6e6d7] px-6 py-3 text-[13px] font-semibold text-[#6b4b2b]">
              <span className="text-[#f58220]">✦</span>
              That’s how deals go bad.
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#081a2f] px-6 py-12 sm:px-8 lg:px-10 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_56%)]" />
        <div className="mx-auto max-w-[1080px]">
          <p className="text-center text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#f58220]">The Solution</p>
          <h2 className="mt-2 text-center text-[2rem] font-black tracking-[-0.03em] text-white">What You Get</h2>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '◎', title: 'Real Budget Alignment', body: 'Your budget actually matches the scope.' },
              { icon: '◫', title: 'Missing Costs Identified', body: 'No more surprise expenses mid-project.' },
              { icon: '◯', title: 'High-Risk Areas Flagged', body: 'Know what can blow up your numbers.' },
              { icon: '↗', title: 'Clear Next Steps', body: 'You know exactly what to fix or change.' },
            ].map((item) => (
              <div key={item.title} className="rounded-[3px] border border-white/14 bg-[rgba(8,17,29,0.22)] px-5 py-6 text-center text-white/94">
                <div className="mx-auto flex h-11 w-11 items-center justify-center text-[1.5rem] text-[#f58220]">{item.icon}</div>
                <h3 className="mt-4 text-[1.1rem] font-extrabold leading-[1.26]">{item.title}</h3>
                <p className="mt-3 text-[13px] leading-[1.7] text-white/72">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <PrimaryCta config={config} className="min-w-[215px]" />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-12 sm:px-8 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-[1080px]">
          <p className="text-center text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#f58220]">The Process</p>
          <h2 className="mt-2 text-center text-[2rem] font-black tracking-[-0.03em] text-[#111827]">How It Works</h2>

          <div className="mt-10 grid gap-8 lg:grid-cols-3 lg:items-start">
            {[
              { num: '1', title: 'Submit Your Project', body: 'Send us your scope, budget, and any relevant details.' },
              { num: '2', title: 'We Review Everything', body: 'We analyze your scope, budget, and potential risk.' },
              { num: '3', title: 'You Get Clear Direction', body: 'Receive a written review with insights and recommended next steps.' },
            ].map((step, index) => (
              <div key={step.num} className="relative text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0c1530] text-base font-black text-white">{step.num}</div>
                {index < 2 ? <div className="absolute left-[64%] top-6 hidden h-px w-[72%] bg-[#e5ddd0] lg:block" /> : null}
                <h3 className="mt-5 text-[1.08rem] font-extrabold text-[#111827]">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-[250px] text-[13px] leading-[1.7] text-[#4b5563]">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="rounded-[3px] border border-[#1c304d] bg-[#091729] p-6 text-white shadow-[0_16px_38px_rgba(6,18,35,0.18)]">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#f58220]">Why Trust Southern Cities</p>
              <ul className="mt-5 space-y-3 text-[14px] leading-[1.65] text-white/88">
                <li className="flex items-start gap-3"><span className="text-[#f58220]">◉</span><span>Licensed NC General Contractor</span></li>
                <li className="flex items-start gap-3"><span className="text-[#f58220]">◉</span><span>Investor-focused construction support</span></li>
                <li className="flex items-start gap-3"><span className="text-[#f58220]">◉</span><span>Projects reviewed across North Carolina</span></li>
              </ul>
              <div className="mt-6 rounded-[3px] border border-white/12 bg-[rgba(255,255,255,0.04)] p-4">
                <p className="text-[13px] leading-[1.65] text-white/82">“They caught things we completely missed before we moved forward.”</p>
                <p className="mt-3 text-[12px] font-semibold text-white">- Investor, NC</p>
              </div>
            </div>

            <div className="rounded-[3px] border border-[#ece7dd] bg-[#fbfaf7] p-6 shadow-[0_10px_28px_rgba(17,24,39,0.05)]">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#f58220]">What This Is Not</p>
              <ul className="mt-5 space-y-3 text-[14px] leading-[1.65] text-[#374151]">
                <li className="flex items-start gap-3"><span>⊗</span><span>Not a contractor bid</span></li>
                <li className="flex items-start gap-3"><span>⊗</span><span>Not full estimating</span></li>
                <li className="flex items-start gap-3"><span>⊗</span><span>Not project management</span></li>
                <li className="flex items-start gap-3"><span>⊗</span><span>Not permit pulling</span></li>
              </ul>
              <p className="mt-7 text-[13px] leading-[1.7] text-[#4b5563]">This is a decision tool, not a full service.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#fbfaf7_0%,#f6f0e7_100%)] px-6 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1080px] rounded-[3px] bg-transparent">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#f58220]">Budget & Scope Review</p>
              <p className="mt-2 text-[3.4rem] font-black leading-none tracking-[-0.05em] text-[#111827]">$599</p>
              <p className="mt-2 text-[13px] text-[#4b5563]">One flat fee. Clear answers.</p>
            </div>
            <div className="flex flex-col items-start lg:items-center lg:justify-center">
              <PrimaryCta config={config} className="min-w-[250px]" />
              <div className="mt-4 flex items-center gap-2 text-[11px] text-[#8b6c49]">
                <span className="text-[#f58220]">✓</span>
                Secure. Confidential. No obligation.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 pb-10 pt-8 sm:px-8 lg:px-10 lg:pb-14">
        <div className="mx-auto max-w-[1080px]">
          <p className="text-center text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#f58220]">FAQ</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {config.faqs.map((faq) => (
              <div key={faq.q} className="flex items-center justify-between rounded-[3px] border border-[#ece7dd] bg-white px-4 py-3 shadow-[0_8px_20px_rgba(17,24,39,0.03)]">
                <div>
                  <p className="text-[13px] font-semibold text-[#111827]">{faq.q}</p>
                </div>
                <span className="text-[18px] leading-none text-[#9ca3af]">+</span>
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
