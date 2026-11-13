import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import BlogExplorer from '@/components/BlogExplorer';
import { getPublishedPosts, formatDate } from '@/lib/blog';

export const revalidate = 300;

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
  const posts = getPublishedPosts();
  const featured = posts[0];


  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-white overflow-x-hidden">

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
              Build smarter. Rehab with a plan.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-white/65">
              Practical field guides for North Carolina investors, owners and builders. Get clearer scopes, stronger budgets and fewer surprises, from your first walkthrough to the final punch list.
            </p>
            <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold"><a href="#articles" className="text-orange">Explore the library ↓</a><a href="/blog/feed.xml" className="text-white/70 hover:text-white">RSS feed</a></div>
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

      <BlogExplorer posts={posts.map(({ content: _content, ...summary }) => summary)} />

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
                  Turn the reading into a clearer scope, budget and execution plan. Explore our construction support or talk through your North Carolina project.
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
    </>
  );
}
