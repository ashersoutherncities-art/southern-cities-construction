'use client';
import Image from 'next/image';


import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';

type Summary = Omit<BlogPost, 'content'>;
const PAGE_SIZE = 9;
export default function BlogExplorer({ posts }: { posts: Summary[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category))).sort()];
  const filtered = useMemo(() => posts.filter(p => (category === 'All' || p.category === category) &&
    `${p.title} ${p.excerpt} ${p.audience} ${(p.tags || []).join(' ')}`.toLowerCase().includes(query.trim().toLowerCase())), [posts, query, category]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  return <section className="bg-stone-50 py-16 border-t border-stone-200" id="articles">
    <div className="container-pro">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div><p className="text-orange text-xs font-bold uppercase tracking-widest">The field guide</p><h2 className="text-3xl font-extrabold text-navy mt-3">Find your next answer.</h2></div>
        <div className="w-full md:max-w-sm"><label htmlFor="blog-search" className="block text-sm font-semibold text-navy mb-2">Search articles</label><input id="blog-search" type="search" value={query} onChange={e => {setQuery(e.target.value); setPage(1);}} placeholder="Try scope, permits or rehab…" className="w-full border border-stone-300 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-orange" /></div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6" aria-label="Filter articles by topic">{categories.map(c => <button key={c} type="button" aria-pressed={c === category} onClick={() => {setCategory(c); setPage(1);}} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${c === category ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-stone-300 hover:border-orange'}`}>{c}</button>)}</div>
      <p className="text-sm text-stone-500 mb-6" role="status">{filtered.length} {filtered.length === 1 ? 'article' : 'articles'}{query ? ` matching “${query}”` : ''}</p>
      {filtered.length === 0 ? <div className="rounded-2xl border border-stone-200 bg-white p-10 text-center"><h3 className="text-xl font-bold text-navy">No articles found</h3><p className="mt-2 text-stone-600">Try a broader search or another topic.</p><button type="button" onClick={() => {setQuery(''); setCategory('All'); setPage(1);}} className="mt-5 font-semibold text-orange">Clear filters</button></div> : <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE).map(p => <Link key={p.slug} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-2xl bg-white border border-stone-200 hover:border-orange transition flex flex-col">
        <div className="relative aspect-[16/9] overflow-hidden bg-stone-200"><Image fill sizes="(min-width: 1024px) 50vw, 100vw" src={p.coverImage} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" /></div>
        <div className="p-6 flex flex-col flex-1"><div className="flex justify-between gap-2 text-xs mb-4"><span className="font-bold uppercase tracking-wider text-orange">{p.category}</span><span className="text-stone-500">{p.readTime}</span></div><h3 className="text-xl font-bold leading-snug text-navy group-hover:text-orange">{p.title}</h3><p className="mt-3 text-sm leading-relaxed text-stone-600">{p.excerpt}</p><p className="mt-auto pt-6 text-xs text-stone-500">{new Date(p.publishedAt).toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric',timeZone:'UTC'})} · {p.audience}</p></div>
      </Link>)}</div>}
      {pages > 1 && <nav aria-label="Article pages" className="flex items-center justify-center gap-5 mt-10"><button disabled={page === 1} onClick={() => setPage(p => p-1)} className="border rounded-lg px-4 py-2 disabled:opacity-40">Previous</button><span className="text-sm">Page {page} of {pages}</span><button disabled={page === pages} onClick={() => setPage(p => p+1)} className="border rounded-lg px-4 py-2 disabled:opacity-40">Next</button></nav>}
    </div>
  </section>;
}
