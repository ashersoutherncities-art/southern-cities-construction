import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import AddToCartButton from '@/components/AddToCartButton';
import { avatarPages, getServiceBySlug } from '@/lib/services-data';

type Params = { avatar: string; service: string };

type DecisionPageConfig = {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  whenToUse: string[];
  whatThisDoes: string[];
  included: string[];
  notIncluded: string[];
  provide: string[];
  nextSteps: string[];
  testimonial?: { quote: string; name: string };
};

const CONSULTATION_CTA_HREF = '/services/homeowners/owner-consultation';

const DECISION_PAGE_CONFIGS: Record<string, DecisionPageConfig> = {
  'investors:investor-review': {
    headline: 'Review Your Deal Before You Commit',
    subheadline: 'Know if the scope, budget, and risks actually make sense before you move forward.',
    whenToUse: ['Before buying a deal', 'When numbers feel uncertain', 'When scope is unclear', 'Before committing more money'],
    whatThisDoes: ['Identifies scope gaps', 'Flags hidden risks', 'Checks budget assumptions', 'Provides clear next steps'],
    included: ['Deal and scope review', 'Budget sanity check', 'Permit path consideration', 'Risk identification', 'Written recommendation'],
    notIncluded: ['Not a full estimate', 'Not contractor hiring', 'Not permit pulling', 'Not project management'],
    provide: ['Address', 'Photos', 'Scope or rehab plan', 'Budget (if available)'],
    nextSteps: ['Submit project details', 'We review and analyze', 'You receive clear feedback'],
    testimonial: {
      quote: 'They gave me a straight read before I threw more money at the deal.',
      name: 'Investor client',
    },
  },
  'investors:budget-review': {
    headline: 'Know Your Real Project Cost',
    subheadline: 'Make sure your budget actually matches the scope before you move forward.',
    whenToUse: ['When budget feels off', 'Before construction', 'Reviewing contractor numbers'],
    whatThisDoes: ['Identifies underbudgeted items', 'Aligns scope with cost', 'Flags unrealistic assumptions'],
    included: ['Budget review', 'Scope gap analysis', 'Cost risk identification', 'Recommendations'],
    notIncluded: ['Not guaranteed pricing', 'Not contractor bids', 'Not full takeoff'],
    provide: ['Address', 'Photos', 'Scope or rehab plan', 'Budget or contractor numbers'],
    nextSteps: ['Submit project details', 'We review budget against scope', 'You receive a clearer cost read'],
    testimonial: {
      quote: 'It helped us catch the weak spots in the budget before startup.',
      name: 'Investor client',
    },
  },
  'investors:permit-local-compliance-review': {
    headline: 'Know If Your Project Can Get Approved',
    subheadline: 'Understand permit requirements and risks before you move forward.',
    whenToUse: ['Before buying', 'Before planning', 'When unsure about permits'],
    whatThisDoes: ['Identifies permit requirements', 'Flags approval risks', 'Assesses local workability'],
    included: ['Permit path review', 'Local requirement overview', 'Risk identification', 'Next-step guidance'],
    notIncluded: ['Not permit prep', 'Not permit submission', 'Not permit pulling'],
    provide: ['Address', 'Photos', 'Scope or rehab plan'],
    nextSteps: ['Submit project details', 'We review local permit risk', 'You receive permit-path guidance'],
  },
  'investors:contractor-fit-consultation': {
    headline: 'Know What Kinds of Contractors This Project Actually Needs',
    subheadline: 'Which contractors fit, and why — before hiring conversations start.',
    whenToUse: ['Before any hiring conversations', 'When unsure if you need a GC, subs, or handyman', 'When the contractor mix is unclear', 'Before bidding starts'],
    whatThisDoes: ['Determines the contractor mix this project needs', 'Explains WHY each contractor type fits', 'Flags wrong-fit setups to avoid', 'Gives hiring direction for each role'],
    included: ['Project review for contractor-mix fit', 'Recommended mix (kinds, license levels, specialties)', 'Written reasoning per role', 'Wrong-fit callouts'],
    notIncluded: ['Not comparing specific named contractors', 'Not bid review', 'Not contractor sourcing', 'Not project management'],
    provide: ['Address', 'Photos', 'Scope or rehab plan', 'Project context'],
    nextSteps: ['Submit project details', 'We assess the contractor mix', 'You get a recommendation with reasoning per role'],
  },
  'investors:draw-review-support': {
    headline: 'Review Your Draw Before You Send It',
    subheadline: 'Make sure payments match actual work before releasing funds.',
    whenToUse: ['Before submitting a draw', 'When unsure about progress vs payment'],
    whatThisDoes: ['Matches work to payment', 'Flags overbilling', 'Identifies missing work'],
    included: ['Draw review', 'Progress vs cost analysis', 'Risk flags', 'Recommendation'],
    notIncluded: ['Not lender approval', 'Not site management', 'Not unlimited revisions'],
    provide: ['Draw request', 'Photos', 'Scope or rehab plan', 'Budget or payment schedule'],
    nextSteps: ['Submit the draw file', 'We compare work to payment', 'You get a recommendation before sending'],
  },
  'realtors:realtor-inspection-review': {
    headline: 'Handle Inspection Issues Before They Kill the Deal',
    subheadline: 'Get clear direction on what matters and what does not.',
    whenToUse: ['When inspection items are causing confusion', 'Before clients overreact', 'When you need a cleaner repair read fast'],
    whatThisDoes: ['Clarifies what matters', 'Flags likely repair concerns', 'Helps explain the next move'],
    included: ['Inspection review', 'Repair-path notes', 'Risk flags', 'Recommendation'],
    notIncluded: ['Not contractor management', 'Not repair coordination', 'Not listing prep management'],
    provide: ['Inspection report', 'Property address', 'Photos if available'],
    nextSteps: ['Send the report and details', 'We review the issues', 'You get a clear response path'],
  },
  'realtors:inspection-response': {
    headline: 'Get a Clear Plan for Inspection Repairs',
    subheadline: 'Know exactly what to fix and how to move forward.',
    whenToUse: ['When the repair list is slowing the deal', 'When buyers or sellers need direction', 'When you need a practical next step fast'],
    whatThisDoes: ['Breaks down repair priorities', 'Clarifies likely scope', 'Makes the next move easier'],
    included: ['Inspection review', 'Priority notes', 'Response-path guidance'],
    notIncluded: ['Not full repair coordination', 'Not project management', 'Not listing prep management'],
    provide: ['Inspection report', 'Property address', 'Photos if available'],
    nextSteps: ['Send the inspection details', 'We review the repair items', 'You get a clear plan forward'],
  },
};

function BulletList({ items, tone = 'orange' }: { items: string[]; tone?: 'orange' | 'stone' }) {
  const dotClass = tone === 'orange' ? 'bg-orange' : 'bg-stone-400';
  return (
    <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-stone-700">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className={`mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full ${dotClass}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PrimaryAction({ isFixed, itemKey, href, label }: { isFixed: boolean; itemKey?: string; href: string; label: string }) {
  if (isFixed && itemKey) {
    return (
      <AddToCartButton
        itemKey={itemKey}
        label={label}
        className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-orange-500"
      />
    );
  }

  return (
    <Link href={href} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-orange-500">
      {label}
    </Link>
  );
}

export function generateStaticParams() {
  return avatarPages.flatMap((avatar) => {
    const services = [...(avatar.fixed || []), ...(avatar.priced || []), ...(avatar.review || []), ...(avatar.recurring || [])];
    return services.map((service) => ({ avatar: avatar.slug, service: service.slug }));
  });
}

export default function ServiceDetailPage({ params }: { params: Params }) {
  const service = getServiceBySlug(params.avatar, params.service);
  const avatar = avatarPages.find((page) => page.slug === params.avatar);

  if (!service || !avatar) notFound();

  const config = DECISION_PAGE_CONFIGS[`${params.avatar}:${params.service}`];
  const isFixed = service.purchaseType === 'fixed' && !!service.itemKey;
  const servicePrice = service.monthlyPrice || service.pricingNote || 'Project-specific pricing';

  if (!config) {
    const fallbackTitle = service.title;
    const fallbackSummary = service.summary;
    return (
      <div className="min-h-screen bg-white text-navy">
        <SiteNav variant="solid" />
        <section className="relative overflow-hidden bg-navy-900 pt-32 pb-20 sm:pt-40 sm:pb-24">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#163061_0%,#10254c_100%)]" />
          <div className="relative z-10 container-pro max-w-4xl">
            <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">{avatar.eyebrow}</div>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl">{fallbackTitle}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl">{fallbackSummary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryAction isFixed={isFixed} itemKey={service.itemKey} href={service.ctaHref || service.detailHref} label={isFixed ? 'Add to Cart' : service.cta} />
              <Link href={CONSULTATION_CTA_HREF} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-orange hover:text-orange-200">Book a Project Call</Link>
            </div>
          </div>
        </section>
        <section className="bg-white py-14 sm:py-16">
          <div className="container-pro grid gap-6 lg:grid-cols-2">
            <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What this does</p>
              <BulletList items={service.details} />
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Pricing</p>
              <p className="mt-4 text-3xl font-extrabold tracking-tight text-navy">{servicePrice}</p>
            </div>
          </div>
        </section>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-navy">
      <SiteNav variant="solid" />

      <section className="relative overflow-hidden bg-navy-900 pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#163061_0%,#10254c_100%)]" />
        <div className="relative z-10 container-pro">
          <div className="max-w-4xl">
            <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              {config.eyebrow || avatar.eyebrow}
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl">{config.headline}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl">{config.subheadline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryAction isFixed={isFixed} itemKey={service.itemKey} href={service.ctaHref || service.detailHref} label="Add to Cart" />
              <Link href={CONSULTATION_CTA_HREF} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-orange hover:text-orange-200">
                Book a Project Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-14 sm:py-16">
        <div className="container-pro grid gap-6 lg:grid-cols-2">
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">When to use this</p>
            <BulletList items={config.whenToUse} />
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What this does</p>
            <BulletList items={config.whatThisDoes} />
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-14 sm:py-16">
        <div className="container-pro grid gap-6 lg:grid-cols-2">
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What&apos;s included</p>
            <BulletList items={config.included} />
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What this is not</p>
            <BulletList items={config.notIncluded} tone="stone" />
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-14 sm:py-16">
        <div className="container-pro grid gap-6 lg:grid-cols-2">
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What you need to provide</p>
            <BulletList items={config.provide} />
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What happens next</p>
            <BulletList items={config.nextSteps} />
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-14 sm:py-16">
        <div className="container-pro grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Pricing</p>
            <p className="mt-4 text-3xl font-extrabold tracking-tight text-navy">{servicePrice}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-stone-700">Fast decision product. Clear boundaries. Easy next step.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryAction isFixed={isFixed} itemKey={service.itemKey} href={service.ctaHref || service.detailHref} label="Add to Cart" />
              <Link href={CONSULTATION_CTA_HREF} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3.5 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                Book a Project Call
              </Link>
            </div>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Turnaround</p>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700">{service.turnaround || 'Typical turnaround: 2 business days'}</p>
            {config.testimonial ? (
              <div className="mt-8 rounded-[20px] border border-stone-200 bg-stone-50 p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Client note</p>
                <p className="mt-3 text-[15px] leading-relaxed text-stone-700">“{config.testimonial.quote}”</p>
                <p className="mt-3 text-sm font-semibold text-navy">{config.testimonial.name}</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
