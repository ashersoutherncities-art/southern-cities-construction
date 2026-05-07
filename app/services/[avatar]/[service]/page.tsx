import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import AddToCartButton from '@/components/AddToCartButton';
import { avatarPages, getServiceBySlug } from '@/lib/services-data';

type Params = { avatar: string; service: string };

const CONSULTATION_CTA_HREF = '/services/homeowners/owner-consultation';
const PRODUCT_PAGE_OVERRIDES: Record<
  string,
  {
    hero: string;
    whoFor: string[];
    included: string[];
    notIncluded: string[];
    provide: string[];
    nextSteps: string[];
    finalTitle: string;
    turnaround: string;
  }
> = {
  'investors:investor-review': {
    hero: 'A fast construction-side review for investors who want a cleaner read before more money gets committed.',
    whoFor: ['Investors evaluating a deal', 'Projects with unclear scope or budget', 'Anyone needing a second set of eyes'],
    included: ['Deal and scope review', 'Budget pressure check', 'Risk identification', 'Clear next-step recommendations'],
    notIncluded: ['Not full project management', 'Not contractor hiring', 'Not permit pulling', 'Not ongoing oversight'],
    provide: ['Property details', 'Scope or rehab plan', 'Budget if available', 'Photos or documents'],
    nextSteps: ['You submit your project info', 'We review and analyze', 'You receive clear next steps'],
    finalTitle: 'Review Your Project Before You Move Forward',
    turnaround: 'Typically delivered within 2 business days',
  },
  'investors:budget-review': {
    hero: 'A fixed-price budget review for investors who need a cleaner number before moving forward.',
    whoFor: ['Investors evaluating a deal', 'Projects with unclear scope or budget', 'Anyone needing a second set of eyes'],
    included: ['Budget analysis', 'Scope review', 'Risk identification', 'Clear next-step recommendations'],
    notIncluded: ['Not full project management', 'Not contractor hiring', 'Not permit pulling', 'Not ongoing oversight'],
    provide: ['Property details', 'Scope or rehab plan', 'Budget if available', 'Photos or documents'],
    nextSteps: ['You submit your project info', 'We review and analyze', 'You receive clear next steps'],
    finalTitle: 'Review Your Project Before You Move Forward',
    turnaround: 'Typically delivered within 2 business days',
  },
  'investors:permit-local-compliance-review': {
    hero: 'A focused permit and local compliance review before local issues turn into project drag.',
    whoFor: ['Investors evaluating a deal', 'Projects with unclear permit path', 'Anyone needing a second set of eyes'],
    included: ['Permit path review', 'Local compliance review', 'Risk identification', 'Clear next-step recommendations'],
    notIncluded: ['Not full project management', 'Not contractor hiring', 'Not permit pulling', 'Not ongoing oversight'],
    provide: ['Property details', 'Scope or rehab plan', 'Budget if available', 'Photos or documents'],
    nextSteps: ['You submit your project info', 'We review and analyze', 'You receive clear next steps'],
    finalTitle: 'Review Your Project Before You Move Forward',
    turnaround: 'Typically delivered within 2 business days',
  },
  'investors:contractor-fit-consultation': {
    hero: 'A quick consultation to pressure-test contractor fit before the wrong hire slows the job down.',
    whoFor: ['Investors evaluating a deal', 'Projects with unclear contractor setup', 'Anyone needing a second set of eyes'],
    included: ['Deal and scope review', 'Contractor fit review', 'Risk identification', 'Clear next-step recommendations'],
    notIncluded: ['Not full project management', 'Not contractor hiring', 'Not permit pulling', 'Not ongoing oversight'],
    provide: ['Property details', 'Scope or rehab plan', 'Budget if available', 'Photos or documents'],
    nextSteps: ['You submit your project info', 'We review and analyze', 'You receive clear next steps'],
    finalTitle: 'Review Your Project Before You Move Forward',
    turnaround: 'Typically delivered within 2 business days',
  },
  'investors:draw-review-support': {
    hero: 'A focused draw review to tighten support before funding friction slows the project down.',
    whoFor: ['Investors evaluating a deal', 'Projects with unclear draw support', 'Anyone needing a second set of eyes'],
    included: ['Draw package review', 'Budget analysis', 'Risk identification', 'Clear next-step recommendations'],
    notIncluded: ['Not full project management', 'Not contractor hiring', 'Not permit pulling', 'Not ongoing oversight'],
    provide: ['Property details', 'Scope or rehab plan', 'Budget if available', 'Photos or documents'],
    nextSteps: ['You submit your project info', 'We review and analyze', 'You receive clear next steps'],
    finalTitle: 'Review Your Project Before You Move Forward',
    turnaround: 'Typically delivered within 1 business day',
  },
};

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

  const override = PRODUCT_PAGE_OVERRIDES[`${params.avatar}:${params.service}`];
  const isFixed = service.purchaseType === 'fixed' && service.itemKey;
  const servicePrice = service.monthlyPrice || service.pricingNote || 'Project-specific pricing';
  const heroCopy = override?.hero || service.summary;
  const whoFor = override?.whoFor || [service.fit];
  const included = override?.included || service.included || service.details;
  const notIncluded = override?.notIncluded || service.notIncluded || ['Not full project management', 'Not ongoing oversight'];
  const provide = override?.provide || service.inputsNeeded || ['Property details', 'Scope or rehab plan', 'Budget if available', 'Photos or documents'];
  const nextSteps = override?.nextSteps || ['You submit your project info', 'We review and analyze', 'You receive clear next steps'];
  const turnaround = override?.turnaround || service.turnaround || 'Typically delivered within 2 business days';
  const finalTitle = override?.finalTitle || 'Review Your Project Before You Move Forward';

  return (
    <div className="min-h-screen bg-white text-navy">
      <SiteNav variant="solid" />

      <section className="relative overflow-hidden bg-navy-900 pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#163061_0%,#10254c_100%)]" />
        <div className="relative z-10 container-pro">
          <div className="max-w-4xl">
            <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              {avatar.eyebrow}
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl">{service.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl">{heroCopy}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {isFixed ? (
                <AddToCartButton
                  itemKey={service.itemKey!}
                  label="Add to Cart"
                  className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-orange-500"
                />
              ) : (
                <Link href={service.ctaHref || service.detailHref} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-orange-500">
                  {service.cta}
                </Link>
              )}
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
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Who this is for</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-stone-700">
              {whoFor.map((item) => (
                <li key={item} className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>{item}</span></li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What&apos;s included</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-stone-700">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-14 sm:py-16">
        <div className="container-pro grid gap-6 lg:grid-cols-3">
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What this is not</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-stone-700">
              {notIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-stone-400 flex-shrink-0" /><span>{item}</span></li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What you need to provide</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-stone-700">
              {provide.map((item) => (
                <li key={item} className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>{item}</span></li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What happens next</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-stone-700">
              {nextSteps.map((item) => (
                <li key={item} className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-14 sm:py-16">
        <div className="container-pro grid gap-6 lg:grid-cols-2">
          <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Pricing</p>
            <p className="mt-4 text-3xl font-extrabold tracking-tight text-navy">{servicePrice}</p>
            <div className="mt-6">
              {isFixed ? (
                <AddToCartButton
                  itemKey={service.itemKey!}
                  label="Add to Cart"
                  className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-orange-500"
                />
              ) : (
                <Link href={service.ctaHref || service.detailHref} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-orange-500">
                  {service.cta}
                </Link>
              )}
            </div>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Turnaround</p>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700">{turnaround}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="container-pro rounded-[28px] border border-stone-200 bg-stone-50 p-8 sm:p-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Final step</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{finalTitle}</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {isFixed ? (
                <AddToCartButton
                  itemKey={service.itemKey!}
                  label="Add to Cart"
                  className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-orange-500"
                />
              ) : (
                <Link href={service.ctaHref || service.detailHref} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-orange-500">
                  {service.cta}
                </Link>
              )}
              <Link href={CONSULTATION_CTA_HREF} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3.5 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
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
