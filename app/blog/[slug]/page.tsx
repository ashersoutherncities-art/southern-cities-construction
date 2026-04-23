import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { BLOG_POSTS, formatDate, getAllPostSlugs, getPostBySlug } from '@/lib/blog';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Article not found' };
  const url = `https://southerncitiesconstruction.com/blog/${post.slug}`;
  return {
    title: `${post.title} | Southern Cities Construction`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({ params }: { params: Params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <SiteNav />

      {/* Hero */}
      <article>
        <header className="relative overflow-hidden bg-navy-900 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950" />
            <div className="absolute top-1/4 -right-32 w-[520px] h-[520px] rounded-full bg-orange/[0.07] blur-[130px]" />
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
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/55 hover:text-orange transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                All articles
              </Link>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex rounded-full bg-orange/15 border border-orange/30 text-orange px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]">
                  {post.category}
                </span>
                <span className="text-[12px] text-white/55 tracking-wide">{post.audience}</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="text-[12px] text-white/55 tracking-wide">{post.readTime}</span>
              </div>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-white leading-[1.05]">
                {post.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/70 max-w-2xl">{post.excerpt}</p>
              <div className="mt-8 flex items-center gap-4 text-[13px] text-white/55">
                <span className="font-semibold text-white">{post.author}</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Cover image */}
        <div className="container-pro -mt-10 sm:-mt-14 relative z-20 mb-14">
          <div className="aspect-[16/8] rounded-[1.75rem] overflow-hidden shadow-elev-3 bg-stone-100">
            <img src={post.coverImage} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Body */}
        <div className="container-pro pb-16 sm:pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-7">
              {post.content.map((block, i) => {
                if (block.type === 'paragraph') {
                  return (
                    <p key={i} className="text-[17px] leading-[1.75] text-stone-700">
                      {block.text}
                    </p>
                  );
                }
                if (block.type === 'heading') {
                  return (
                    <h2
                      key={i}
                      className="pt-6 text-2xl sm:text-[28px] font-extrabold text-navy tracking-tight leading-tight"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === 'list') {
                  return (
                    <ul key={i} className="space-y-3">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-[16.5px] leading-relaxed text-stone-700">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === 'callout') {
                  return (
                    <aside
                      key={i}
                      className="rounded-2xl border border-orange/20 bg-orange/[0.04] p-6 sm:p-7"
                    >
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange mb-2">
                        {block.title}
                      </p>
                      <p className="text-[16px] leading-relaxed text-stone-700">{block.text}</p>
                    </aside>
                  );
                }
                return null;
              })}
            </div>

            {/* Sign off */}
            <div className="mt-14 pt-10 border-t border-stone-200">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-400 mb-3">
                Written by
              </p>
              <p className="text-navy font-bold text-lg tracking-tight">{post.author}</p>
              <p className="text-stone-500 mt-1 text-sm leading-relaxed">
                Residential project guidance, permitting insight, and construction-side decision support across North Carolina.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 bg-stone-50 border-t border-stone-200">
        <div className="container-pro">
          <div className="rounded-3xl bg-navy-900 p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-orange/[0.09] blur-[120px]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/55 mb-4">
                  <span className="w-6 h-px bg-white/30" />
                  Put structure on the project
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.08]">
                  Ready to run your project on a real workflow?
                </h3>
                <p className="mt-4 text-white/65 leading-relaxed max-w-xl">
                  Start with Permit Administration + Construction Oversight, or request a quote for scope-based work.
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

      {/* Related */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-pro">
          <div className="max-w-2xl mb-10">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
              <span className="w-6 h-px bg-orange/50" />
              Keep reading
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy tracking-tight">More on NC construction</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/blog/${other.slug}`}
                className="group flex flex-col rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-elev-1 card-hover"
              >
                <div className="aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={other.coverImage}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="inline-flex w-fit rounded-full bg-orange/10 text-orange px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] mb-3">
                    {other.category}
                  </span>
                  <h3 className="text-[17px] font-bold text-navy tracking-tight leading-snug group-hover:text-orange transition-colors">
                    {other.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-500 leading-relaxed line-clamp-3">{other.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
