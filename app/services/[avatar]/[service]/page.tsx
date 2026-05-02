import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import AddToCartButton from '@/components/AddToCartButton';
import { avatarPages, getServiceBySlug } from '@/lib/services-data';
import { getServiceNextStepCopy, getServicePricingCopy } from '@/lib/service-detail-helpers';

type Params = { avatar: string; service: string };

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

  const primaryCta =
    service.purchaseType === 'fixed' && service.itemKey ? (
      <AddToCartButton
        itemKey={service.itemKey}
        label={service.cta}
        className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-orange-500"
      />
    ) : (
      <Link
        href={service.ctaHref || '#contact'}
        className={`inline-flex min-w-[220px] items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all ${
          service.purchaseType === 'review' || service.purchaseType === 'recurring'
            ? 'bg-navy hover:bg-navy-700'
            : 'bg-orange hover:bg-orange-500'
        }`}
      >
        {service.cta}
      </Link>
    );

  const servicePrice = service.monthlyPrice || service.pricingNote || 'Project-specific pricing';
  const inputsNeeded = service.inputsNeeded || ['Property address or project location', 'Photos, plans, or current scope notes', 'Any existing bids, reports, or permit information', 'Your timing and decision deadline'];
  const faqItems = [
    {
      question: 'Who is this for?',
      answer: service.fit,
    },
    {
      question: 'How fast can Southern Cities turn this around?',
      answer: service.turnaround || 'Turnaround depends on the file, but Southern Cities will confirm the next step quickly after reviewing what you send.',
    },
    {
      question: 'What happens after I buy, request pricing, or request review?',
      answer: getServiceNextStepCopy(service),
    },
  ];

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
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl">{service.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta}
              <Link href={`/services/${avatar.slug}`} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-orange hover:text-orange-200">
                Back to {avatar.eyebrow}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-14 sm:py-16">
        <div className="container-pro grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Price</p>
            <p className="mt-4 text-2xl font-extrabold tracking-tight text-navy">{servicePrice}</p>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Who this is for</p>
            <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{service.fit}</p>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What problem this solves</p>
            <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{service.pain}</p>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Turnaround time</p>
            <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{service.turnaround || 'Confirmed after file review if timing depends on project complexity.'}</p>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What is included</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-stone-700">
              {(service.included || service.details).map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What is not included</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-stone-700">
              {(service.notIncluded || ['Anything outside the defined scope for this offer.']).map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-stone-400 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-14 sm:py-16">
        <div className="container-pro grid gap-6 lg:grid-cols-3">
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What we need from you</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-stone-700">
              {inputsNeeded.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What happens next</p>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700">{getServiceNextStepCopy(service)}</p>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">How pricing works</p>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700">{getServicePricingCopy(service)}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-14 sm:py-16">
        <div className="container-pro grid gap-6 lg:grid-cols-3">
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1 lg:col-span-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">FAQ</p>
            <div className="mt-4 space-y-5">
              {faqItems.map((item) => (
                <div key={item.question}>
                  <h3 className="text-base font-bold text-navy">{item.question}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-stone-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Proof</p>
            <p className="mt-4 text-lg font-extrabold tracking-tight text-navy">{service.proofTitle || 'A clearer decision page builds trust faster.'}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{service.proofBody || 'Use real project proof, before-and-after visuals, or short verified outcomes here as the proof library gets stronger.'}</p>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white py-14 sm:py-16">
        <div className="container-pro rounded-[28px] border border-stone-200 bg-stone-50 p-8 sm:p-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Ready for the next step?</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Use the next step that fits this work.</h2>
            <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
              Some work can be bought right now. Some needs project details before pricing. Some should start with review first. This page keeps those paths clean.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {primaryCta}
              <Link href="/services" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3.5 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                Back to All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
