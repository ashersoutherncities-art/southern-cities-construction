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
  after: string;
  notes: string[];
};

const galleryProjects: GalleryProject[] = [
  {
    slug: 'white-house',
    title: 'Standard builder-grade home exterior refresh',
    summary: 'A clean transformation on a standard builder-grade home, with a strong before-and-after jump that reads clearly for homeowners and investors.',
    rank: 'Top proof set',
    before: '/gallery/white-house-before.jpg',
    after: '/gallery/white-house-after.jpg',
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
    after: '/gallery/farmhouse-after.jpg',
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
    after: '/gallery/red-house-after.jpg',
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

      <section className="bg-navy-900 pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="container-pro">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Real project gallery</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Real before and after work, shown more clearly.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/82">
            This page gives Southern Cities a cleaner place to show real project proof without forcing weak pairings into small homepage cards.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#contact" className="inline-flex items-center justify-center rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500">
              Request Review
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
              See Services
            </Link>
          </div>
        </div>
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
                    <Image src={project.before} alt={`${project.title} before`} fill className="object-cover" />
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">Before</p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[24px] border border-stone-200 bg-stone-50">
                  <div className="relative aspect-[4/3] bg-white">
                    <Image src={project.after} alt={`${project.title} after`} fill className="object-cover" />
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
