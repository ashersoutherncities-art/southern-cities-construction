import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { actionRoutes } from '../routes';

export function generateStaticParams() {
  return actionRoutes.map((route) => ({ slug: route.slug }));
}

export default function RealtorActionPage({ params }: { params: { slug: string } }) {
  const route = actionRoutes.find((entry) => entry.slug === params.slug);
  if (!route) notFound();

  return (
    <div className="min-h-screen bg-white text-navy">
      <SiteNav variant="solid" />

      <section className="relative overflow-hidden bg-navy-900 pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#163061_0%,#10254c_100%)]" />
        <div className="relative z-10 container-pro">
          <div className="max-w-4xl">
            <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              {route.eyebrow}
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl">{route.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl">{route.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={route.primaryHref} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-orange-500">
                {route.cta}
              </Link>
              {route.secondaryHref ? (
                <Link href={route.secondaryHref} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-orange hover:text-orange-200">
                  {route.secondaryLabel || 'Back to Services'}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-14 sm:py-16">
        <div className="container-pro grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Price path</p>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700">{route.priceLabel}</p>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Best fit</p>
            <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{route.fit}</p>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What happens next</p>
            <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{route.nextStep}</p>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What this includes</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-stone-700">
              {route.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={route.primaryHref} className="inline-flex items-center justify-center rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500">
                {route.cta}
              </Link>
              <Link href="/services/industry-partners#realtors" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                Realtor Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
