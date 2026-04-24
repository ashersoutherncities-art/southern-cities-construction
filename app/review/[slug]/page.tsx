import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { getAllServices } from '@/lib/services-data';
import { getServiceNextStepCopy, getServicePricingCopy, getServiceRequestIntro, getServiceSubmitLabel } from '@/lib/service-detail-helpers';

export function generateStaticParams() {
  return getAllServices()
    .filter((service) => service.purchaseType === 'review' || service.purchaseType === 'recurring')
    .map((service) => ({ slug: service.slug }));
}

export default function ReviewPage({ params }: { params: { slug: string } }) {
  const service = getAllServices().find(
    (entry) => entry.slug === params.slug && (entry.purchaseType === 'review' || entry.purchaseType === 'recurring')
  );

  if (!service) notFound();

  return (
    <div className="min-h-screen bg-white text-navy">
      <SiteNav variant="solid" />

      <section className="relative overflow-hidden bg-navy-900 pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#163061_0%,#10254c_100%)]" />
        <div className="relative z-10 container-pro">
          <div className="max-w-4xl">
            <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              {service.purchaseType === 'recurring' ? 'Review Plan Fit' : 'Request Review'}
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl">{service.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={service.detailHref} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-orange-500">
                See Service Details
              </Link>
              <Link href={`/services/${service.avatar}`} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-orange hover:text-orange-200">
                Back to {service.avatarLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-14 sm:py-16">
        <div className="container-pro grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Why this starts with review</p>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700">{service.pain}</p>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What you are trying to get to</p>
            <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{service.outcome}</p>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">How pricing works</p>
            <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{getServicePricingCopy(service)}</p>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Start here</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{getServiceRequestIntro(service)}</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone-700 sm:text-lg">
              This is where Southern Cities looks at the real file before anyone pretends the scope is simple.
            </p>

            <form className="mt-8 grid gap-4 sm:grid-cols-2">
              <input className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700" placeholder="Name" />
              <input className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700" placeholder="Email" />
              <input className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700" placeholder="Phone" />
              <input className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700" placeholder="Property or project address" />
              <input className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 sm:col-span-2" placeholder="What do you need reviewed?" defaultValue={service.title} />
              <textarea className="min-h-[180px] w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 sm:col-span-2" placeholder="What is happening right now, what has already been done, and what do you need help deciding or cleaning up next?" />
              <div className="sm:col-span-2 flex flex-wrap gap-3">
                <button type="button" className="inline-flex items-center justify-center rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-700">
                  {getServiceSubmitLabel(service)}
                </button>
                <Link href={service.detailHref} className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3.5 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                  Back to service details
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-14 sm:py-16">
        <div className="container-pro grid gap-6 lg:grid-cols-3">
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What Southern Cities reviews first</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-stone-700">
              {service.details.map((item) => (
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
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Proof</p>
            <p className="mt-4 text-lg font-extrabold tracking-tight text-navy">{service.proofTitle || 'Some work needs real review before anyone should quote it casually.'}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{service.proofBody}</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
