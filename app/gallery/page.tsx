'use client';

import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

type GalleryProject = {
  slug: string;
  title: string;
  summary: string;
  rank: string;
  before: string;
  beforeAlt: string;
  after: string;
  afterAlt: string;
  notes: string[];
};

const galleryProjects: GalleryProject[] = [
  {
    slug: 'white-house',
    title: 'Standard builder-grade home exterior refresh',
    summary: 'A clean transformation on a standard builder-grade home, with a strong before-and-after jump that reads clearly for homeowners and investors.',
    rank: 'Top proof set',
    before: '/gallery/white-house-before.jpg',
    beforeAlt: 'Standard builder-grade two-story home exterior before renovation — dated white siding, original landscaping, plain entry',
    after: '/gallery/white-house-after.jpg',
    afterAlt: 'Same two-story home after Southern Cities Construction exterior refresh — updated paint scheme, refreshed trim and entry, improved curb appeal',
    notes: [
      'Standard builder-grade home with clear visible improvement',
      'Strong proof set for homeowner and investor-facing credibility',
      'Clean before-and-after storytelling without overexplaining the project',
    ],
  },
  {
    slug: 'farmhouse',
    title: 'Farmhouse-style siding and deck transformation',
    summary: 'A farmhouse-style exterior refresh with new siding and deck work that gives the property a stronger finished presence.',
    rank: 'Secondary proof set',
    before: '/gallery/farmhouse-before.jpg',
    beforeAlt: 'NC farmhouse-style residence before exterior renovation — original siding, weathered deck, dated facade',
    after: '/gallery/farmhouse-after.jpg',
    afterAlt: 'NC farmhouse after Southern Cities Construction renovation — new vertical siding, rebuilt covered deck, modern farmhouse facade',
    notes: [
      'Farmhouse-style exterior with upgraded siding and deck work',
      'Strong supporting gallery proof with visible curb appeal improvement',
      'Useful for showing broader residential transformation capability',
    ],
  },
  {
    slug: 'red-house',
    title: 'Historic waterfront district home exterior transformation',
    summary: 'A distinctive exterior transformation on a home located in a prominent North Carolina waterfront city within a historic district.',
    rank: 'Supporting proof set',
    before: '/gallery/red-house-before.jpg',
    beforeAlt: 'Historic NC waterfront district home before exterior transformation — faded original paint, aging trim, dated curb presentation',
    after: '/gallery/red-house-after.jpg',
    afterAlt: 'Historic NC waterfront district home after Southern Cities Construction exterior transformation — vibrant red paint, restored trim, distinctive finished character',
    notes: [
      'Located in a prominent waterfront city in a North Carolina historic district',
      'Distinctive finished look with real visual character',
      'Useful as additional proof of higher-visibility exterior work',
    ],
  },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white text-navy">
      <SiteNav variant="solid" />

      <section className="relative overflow-hidden bg-[#08111d] pt-32 pb-20 sm:pt-36 sm:pb-24">
        <div className="absolute inset-0 motion-safe:animate-[heroFloat_22s_ease-in-out_infinite] bg-[linear-gradient(125deg,#163061_0%,#10254c_50%,#143367_100%)]" style={{ backgroundSize: '180% 180%' }} aria-hidden="true" />
        <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(circle_at_30%_35%,rgba(245,130,32,0.22),transparent_55%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 container-pro">
          <p className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41] motion-safe:animate-[heroRise_900ms_ease-out]">
            <span className="block h-px w-10 bg-[#fa8c41]/80" aria-hidden="true" />
            Real project gallery
          </p>
          <h1 className="mt-6 max-w-4xl text-[2.5rem] font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-[3.5rem] lg:text-[4rem] motion-safe:animate-[heroRise_1000ms_ease-out_0.1s_both]">
            Real before and after work, <span className="text-[#fa8c41]">shown more clearly.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-[1.55] text-white/85 sm:text-xl motion-safe:animate-[heroRise_1100ms_ease-out_0.2s_both]">
            This page gives Southern Cities a cleaner place to show real project proof without forcing weak pairings into small homepage cards.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4 motion-safe:animate-[heroRise_1300ms_ease-out_0.4s_both]">
            <Link href="/#contact" className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-[#fa8c41] px-7 py-3.5 text-sm font-black uppercase tracking-[0.06em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.45)] transition-all hover:-translate-y-0.5 hover:bg-[#ffa463]">
              Request Review <span aria-hidden="true">→</span>
            </Link>
            <Link href="/services" className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/5">
              See Services
            </Link>
          </div>
        </div>
        <style>{`
@keyframes heroFloat { 0%, 100% { transform: scale(1.04) translate3d(0, 0, 0); } 50% { transform: scale(1.08) translate3d(-12px, -8px, 0); } }
@keyframes heroRise { 0% { opacity: 0; transform: translate3d(0, 24px, 0); filter: blur(4px); } 60% { filter: blur(0); } 100% { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); } }
`}</style>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-pro space-y-10">
          {galleryProjects.map((project, index) => (
            <div key={project.slug} className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-elev-1 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">{project.rank}</p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{project.title}</h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-stone-700">{project.summary}</p>
                </div>
                <div className="rounded-full border border-orange/20 bg-orange/5 px-4 py-2 text-sm font-semibold text-orange">
                  Set {index + 1}
                </div>
              </div>

              <div className="mt-8 grid gap-5 lg:grid-cols-2">
                <div className="overflow-hidden rounded-[24px] border border-stone-200 bg-stone-50">
                  <div className="relative aspect-[4/3] bg-white">
                    <Image src={project.before} alt={project.beforeAlt} fill className="object-cover" />
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">Before</p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[24px] border border-stone-200 bg-stone-50">
                  <div className="relative aspect-[4/3] bg-white">
                    <Image src={project.after} alt={project.afterAlt} fill className="object-cover" />
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">After</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-stone-200 bg-stone-50 p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Why this set matters</p>
                <ul className="mt-4 space-y-3 text-sm leading-[1.7] text-stone-700">
                  {project.notes.map((note) => (
                    <li key={note} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
