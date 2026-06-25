import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { getAvatarPage } from '@/lib/services-data';

export const metadata: Metadata = {
  title: 'For Homeowners — Renovations & Home Builds Done to a Standard | Southern Cities Construction',
  description:
    'A licensed NC General Contractor (#107724) for homeowners — honest budgets, clean permits, and quality work on the home you actually live in. Built to a standard. Priced for real life.',
  alternates: { canonical: '/services/homeowners' },
};

const pillars = [
  { title: 'Held to a standard', detail: 'Real process, planning, and management on every job — not a half-finished flip thrown back on the market.' },
  { title: 'Homes, not units', detail: 'This is the place you live your life. We treat it that way, and we make it great — every time, to the best of our ability.' },
  { title: 'Quality, fairly priced', detail: 'Not janky shortcuts. Not unaffordable “luxury.” Real work on a home you can actually live in, at a price that makes sense.' },
  { title: 'Do right and do well', detail: 'Build it right and keep it fair. It isn’t either/or — your home and your budget both matter.' },
];

const steps = [
  { n: '1', title: 'Tell us about your project', detail: 'Share what you want to do with your home. We listen first — no pressure, no hard sell.' },
  { n: '2', title: 'Get a real plan and budget', detail: 'A licensed GC reviews the work and gives you honest numbers and a clear path — not a guess that balloons later.' },
  { n: '3', title: 'We handle permits and build', detail: 'Clean paperwork, the right trades, and quality work managed from start to finish, held to the standard.' },
  { n: '4', title: 'Stay in the loop the whole way', detail: 'You always know where the project stands, what’s next, and what it costs. No surprises.' },
];

const gallery = [
  { title: 'Builder-grade home exterior refresh', image: '/gallery/white-house-after.jpg' },
  { title: 'Farmhouse-style siding and deck transformation', image: '/gallery/farmhouse-after.jpg' },
  { title: 'Historic waterfront district home transformation', image: '/gallery/red-house-after.jpg' },
];

const trust = ['Licensed NC GC #107724', 'Fully insured', 'Charlotte HQ · statewide NC', '5 years in business', '120+ projects', '4.9★ client rating'];

type HomeService = {
  slug: string;
  title: string;
  summary: string;
  purchaseType: string;
  monthlyPrice?: string;
  detailHref: string;
  ctaHref?: string;
  cta: string;
};

export default function HomeownersPage() {
  const data = getAvatarPage('homeowners');
  const services = [...(data?.fixed || []), ...(data?.priced || []), ...(data?.review || [])] as HomeService[];
  const find = (slug: string) => services.find((s) => s.slug === slug);
  const priceOf = (s: HomeService) =>
    s.monthlyPrice || (s.purchaseType === 'priced' ? 'Quoted after a quick review' : s.purchaseType === 'review' ? 'Custom quote' : '');
  const hrefOf = (s: HomeService) => (s.purchaseType === 'fixed' ? s.detailHref : s.ctaHref || s.detailHref);

  return (
    <>
      <SiteNav variant="solid" />
      <main className="bg-white text-[#08111d]">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#08111d] pt-28 pb-20 sm:pt-32 sm:pb-24">
          <Image src="/gallery/white-house-after.jpg" alt="" fill className="object-cover object-center opacity-[0.28]" priority />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(6,13,24,0.97)_0%,rgba(7,15,27,0.9)_45%,rgba(7,15,27,0.66)_100%)]" />
          <div className="relative z-10 container-pro">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#fa8c41]">
                <span className="block h-px w-10 bg-[#fa8c41]/80" aria-hidden="true" />
                The Contractor for Homeowners · NC GC #107724
              </p>
              <h1 className="mt-6 text-4xl font-black leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
                The home you live in deserves a <span className="text-[#fa8c41]">standard.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
                Southern Cities is a licensed NC General Contractor for homeowners — honest budgets, clean permits, and
                quality work on the place you actually live. No janky half-fixes. No unaffordable “luxury.” Just done
                right, and priced for real life.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/start"
                  className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-[#fa8c41] px-8 py-4 text-[15px] font-black uppercase tracking-[0.06em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.45)] transition-all hover:-translate-y-0.5 hover:bg-[#ffa463]"
                >
                  Tell us about your project <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/5"
                >
                  See our work
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="border-b border-stone-200 bg-stone-50">
          <div className="container-pro flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 text-center">
            {trust.map((t) => (
              <span key={t} className="text-[13px] font-bold uppercase tracking-[0.08em] text-stone-600">
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* THE STANDARD */}
        <section className="bg-white py-20 sm:py-24">
          <div className="container-pro">
            <div className="max-w-3xl">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Our Standard</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-[2.75rem]">
                A home is where someone lives their life. That deserves a standard.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-700">
                The standard isn’t fancy — it’s process, planning, execution, and management, done right. We hold
                ourselves to it on every home, whether it’s a single repair, a full renovation, or a ground-up build.
              </p>
              <p className="mt-4 text-base font-bold text-[#08111d]">Built to a standard. Priced for real life.</p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((p) => (
                <div key={p.title} className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                  <h3 className="text-lg font-extrabold tracking-tight text-[#08111d]">{p.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-stone-600">{p.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="border-y border-stone-200 bg-stone-50 py-20 sm:py-24">
          <div className="container-pro">
            <div className="max-w-3xl">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">How it works</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">
                Working with a GC, made simple.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-stone-600">
                You don’t need to know construction. You just need someone who does, on your side, from the first
                conversation to the last walkthrough.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div key={s.n} className="rounded-2xl border border-stone-200 bg-white p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fa8c41] text-lg font-black text-white">
                    {s.n}
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold leading-tight tracking-tight text-[#08111d]">{s.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-stone-600">{s.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/start"
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-[#08111d] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#0d1a2f]"
              >
                Start with a conversation <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* WAYS WE HELP — services by stage */}
        {data?.stageGroups?.length ? (
          <section className="bg-white py-20 sm:py-24">
            <div className="container-pro">
              <div className="max-w-3xl">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Ways we help</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">
                  Start where your project is.
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-stone-600">
                  Not every home project needs a full build. Start with the smallest step that fits what you’re deciding
                  right now — we’ll tell you honestly what you do and don’t need.
                </p>
              </div>
              <div className="mt-12 space-y-12">
                {data.stageGroups.map((group) => {
                  const cards = group.serviceSlugs.map(find).filter(Boolean) as HomeService[];
                  if (!cards.length) return null;
                  return (
                    <div key={group.title} className="border-t border-stone-200 pt-10 first:border-t-0 first:pt-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#fa8c41]">{group.title}</p>
                      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-stone-600">{group.intro}</p>
                      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {cards.map((s) => (
                          <div key={s.slug} className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-[0_8px_24px_-14px_rgba(8,17,29,0.12)]">
                            <h3 className="text-lg font-extrabold tracking-tight text-[#08111d]">{s.title}</h3>
                            <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-stone-600">{s.summary}</p>
                            {priceOf(s) ? <p className="mt-4 text-[15px] font-extrabold text-[#fa8c41]">{priceOf(s)}</p> : null}
                            <Link
                              href={hrefOf(s)}
                              className="mt-5 inline-flex w-fit items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#08111d] transition hover:border-[#fa8c41] hover:text-[#fa8c41]"
                            >
                              {s.cta} <span aria-hidden="true" className="ml-1">→</span>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        {/* OUR WORK */}
        <section className="border-y border-stone-200 bg-stone-50 py-20 sm:py-24">
          <div className="container-pro">
            <div className="max-w-3xl">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Our work</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">
                Real homes, done to the standard.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((g) => (
                <div key={g.image} className="group overflow-hidden rounded-2xl border border-stone-200 bg-white">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={g.image}
                      alt={g.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <p className="px-5 py-4 text-[14.5px] font-semibold text-[#08111d]">{g.title}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/gallery"
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-7 py-3.5 text-sm font-semibold text-[#08111d] transition hover:border-[#fa8c41] hover:text-[#fa8c41]"
              >
                See the full gallery <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-[#08111d] py-20 text-white sm:py-24">
          <div className="container-pro max-w-3xl text-center">
            <h2 className="text-4xl font-black tracking-[-0.03em] sm:text-5xl">Ready to talk about your home?</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/85">
              Tell us what you’re thinking about — a repair, a renovation, or a brand-new build. A licensed NC GC will
              help you figure out the right next step, honestly.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href="/start"
                className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-[#fa8c41] px-8 py-4 text-[15px] font-black uppercase tracking-[0.06em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.45)] transition-all hover:-translate-y-0.5 hover:bg-[#ffa463]"
              >
                Tell us about your project <span aria-hidden="true">→</span>
              </Link>
            </div>
            <p className="mt-8 text-[12px] text-white/55">Southern Cities Construction · NC GC License #107724 · Charlotte HQ, serving North Carolina</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
