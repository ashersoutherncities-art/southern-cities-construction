import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { BLOG_POSTS, formatDate } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog | North Carolina Construction Education — Southern Cities Construction',
  description:
    'Plain-language construction education for North Carolina owners, investors, and subcontractors — permitting, inspections, licensing, scope lock, and project execution.',
  alternates: { canonical: 'https://southerncitiesconstruction.com/blog' },
  openGraph: {
    type: 'website',
    url: 'https://southerncitiesconstruction.com/blog',
    title: 'Blog | North Carolina Construction Education',
    description:
      'Permit process, inspection failures, NC general contractor licensing, scope lock, and subcontractor coordination — written for real residential projects.',
  },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
      <span className="w-6 h-px bg-orange/50" />
      {children}
    </span>
  );
}

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <SiteNav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950" />
          <div className="absolute top-1/4 -right-32 w-[520px] h-[520px] rounded-full bg-orange/[0.07] blur-[130px]" />
          <div className="absolute -bottom-32 -left-40 w-[420px] h-[420px] rounded-full bg-blue-500/[0.06] blur-[100px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '42px 42px',
          }}
        />

        <div className="relative z-10 container-pro">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
              Education for NC Construction
            </div>
            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-[64px] font-extrabold tracking-tight text-white leading-[1.05]">
              Construction writing for owners, investors, and trades working in North Carolina.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-white/65">
              Practical, specific writing on permits, inspections, licensing, and execution — the things that actually move a residential project from idea to certificate of occupancy.
            </p>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16 sm:py-20">
        <div className="container-pro">
          <Eyebrow>Featured article</Eyebrow>
          <Link
            href={`/blog/${featured.slug}`}
            className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center rounded-[2rem] border border-stone-200 bg-white p-7 sm:p-10 shadow-elev-1 card-hover group"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex rounded-full bg-orange/10 text-orange px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]">
                  {featured.category}
                </span>
                <span className="text-[12px] text-stone-400 tracking-wide">{featured.readTime}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-[1.1] group-hover:text-orange transition-colors">
                {featured.title}
              </h2>
              <p className="mt-5 text-stone-600 leading-relaxed text-[15.5px]">{featured.excerpt}</p>
              <div className="mt-7 flex items-center gap-4 text-[13px] text-stone-500">
                <span className="font-semibold text-navy">{featured.author}</span>
                <span className="w-1 h-1 rounded-full bg-stone-300" />
                <span>{formatDate(featured.publishedAt)}</span>
                <span className="w-1 h-1 rounded-full bg-stone-300" />
                <span>{featured.audience}</span>
              </div>
              <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-orange">
                Read the article
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100">
              <img
                src={featured.coverImage}
                alt=""
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent" />
            </div>
          </Link>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 sm:py-20 bg-stone-50 border-t border-stone-200">
        <div className="container-pro">
          <div className="max-w-2xl mb-12">
            <Eyebrow>Latest</Eyebrow>
            <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              More writing on North Carolina construction
            </h2>
            <p className="mt-4 text-stone-500 leading-relaxed">
              Each article is written from active residential project work — Charlotte metro, greater Mecklenburg, and surrounding counties.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-elev-1 card-hover"
              >
                <div className="aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={post.coverImage}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex rounded-full bg-orange/10 text-orange px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-stone-400 tracking-wide">{post.readTime}</span>
                  </div>
                  <h3 className="text-[19px] font-bold text-navy tracking-tight leading-snug group-hover:text-orange transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] text-stone-500 leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="mt-auto pt-5 flex items-center gap-3 text-[12px] text-stone-400">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="w-1 h-1 rounded-full bg-stone-300" />
                    <span>{post.audience}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container-pro">
          <div className="rounded-3xl bg-navy-900 p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-orange/[0.09] blur-[120px]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/55 mb-4">
                  <span className="w-6 h-px bg-white/30" />
                  Ready to price a project
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.08]">
                  Reading only gets the project so far.
                </h3>
                <p className="mt-4 text-white/65 leading-relaxed max-w-xl">
                  If you are ready to put structure on a real project, start with Permit Administration + Construction Oversight or browse the full services catalog.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:items-stretch">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange hover:bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-colors"
                >
                  Browse Services
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-6 py-3.5 text-sm font-semibold text-white transition-colors"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
