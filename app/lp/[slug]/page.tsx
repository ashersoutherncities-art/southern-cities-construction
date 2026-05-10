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
    ctaLabel: 'Buy Review',
    price: '$599',
    heroHeadline: 'Know Your Real Rehab Budget Before You Start',
    heroSubheadline: 'Make sure your budget actually matches the scope before startup, lender conversations, or contractor decisions move further.',
    problemHeadline: 'What goes wrong if you skip this',
    problemBullets: ['Underbudgeting key work', 'Missing expensive scope items', 'Approving weak contractor numbers', 'Starting with unrealistic assumptions'],
    getBullets: ['Clear budget review', 'Scope gap identification', 'Cost pressure callouts', 'Written next-step guidance'],
    processBullets: ['Submit your project', 'We review the budget against the scope', 'You get a clearer cost direction'],
    trustQuote: 'It helped us catch the weak spots in the budget before startup.',
    trustName: 'Investor client',
    faqs: [
      { q: 'What do you need from me?', a: 'Property address, photos, scope notes, and the budget or contractor numbers you want reviewed.' },
      { q: 'How long does it take?', a: 'Typical turnaround is 2 business days.' },
      { q: 'What do I get back?', a: 'A clearer read on whether the budget matches the actual scope.' },
      { q: 'Is this a contractor bid?', a: 'No. This is a review product, not a contractor bid.' },
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

function PrimaryCta({ config }: { config: LandingPageConfig }) {
  if (config.productKey) {
    return (
      <AddToCartButton
        itemKey={config.productKey}
        label={config.ctaLabel}
        className="inline-flex min-h-[58px] min-w-[220px] items-center justify-center rounded-full bg-orange px-8 py-4 text-base font-bold text-white transition hover:bg-orange-500"
      />
    );
  }

  return (
    <Link
      href={config.fallbackHref || '/cart'}
      className="inline-flex min-h-[58px] min-w-[220px] items-center justify-center rounded-full bg-orange px-8 py-4 text-base font-bold text-white transition hover:bg-orange-500"
    >
      {config.ctaLabel}
    </Link>
  );
}

function BulletSection({ title, bullets, tone = 'dark' }: { title: string; bullets: string[]; tone?: 'dark' | 'light' }) {
  return (
    <section className={`rounded-[28px] border p-7 sm:p-8 ${tone === 'light' ? 'border-white/12 bg-white/6 text-white' : 'border-stone-200 bg-white text-navy-900 shadow-elev-1'}`}>
      <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
      <ul className={`mt-5 space-y-3 text-[15px] leading-relaxed ${tone === 'light' ? 'text-white/84' : 'text-stone-700'}`}>
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

export default function LandingPage({ params }: { params: Params }) {
  const config = getConfig(params.slug);
  if (!config) notFound();

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
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {config.heroHeadline}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/86">
              {config.heroSubheadline}
            </p>
            <div className="mt-8">
              <PrimaryCta config={config} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <BulletSection title={config.problemHeadline} bullets={config.problemBullets} />
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
            <PrimaryCta config={config} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <BulletSection title="What Happens Next" bullets={config.processBullets} />
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
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/82">
            Direct decision product. Clear scope. Fast next step.
          </p>
          <div className="mt-7">
            <PrimaryCta config={config} />
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
            <PrimaryCta config={config} />
          </div>
        </div>
      </section>
    </main>
  );
}
