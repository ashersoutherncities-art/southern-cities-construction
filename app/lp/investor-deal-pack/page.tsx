import Image from 'next/image';
import Link from 'next/link';
import LpLeadForm from '@/components/LpLeadForm';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata = {
  title: 'Know the Real Number Before You Buy — Build-Ready Deal Pack ($1,997) | Southern Cities Construction',
  description:
    'For NC investors: a licensed NC GC (#107724) puts a committed rehab price on your deal, sealed and transferable — before you buy it. Protect your capital.',
  alternates: { canonical: '/lp/investor-deal-pack' },
  openGraph: {
    type: 'website',
    url: '/lp/investor-deal-pack',
    title: 'Know the Real Number Before You Buy — Build-Ready Deal Pack ($1,997)',
    description:
      'A licensed NC GC puts a committed rehab price on your deal, sealed with the license, before you buy it. $1,997.',
    siteName: 'Southern Cities Construction',
  },
};

const BUILD_READY_CONTENTS = [
  'Committed rehab price in writing, sealed with the NC GC license',
  'Trade-by-trade dollarized scope of work',
  'As-built floor plan + future-state renovation plan',
  '3 photoreal renderings of the finished home',
  'Market study — finishes and fixtures in demand (6 months of comps)',
  'Initial materials list with quantities',
  'Vendor list with drive time to the project',
  'Permit memo — which permits, which jurisdiction, timeline',
  'Execution risk report',
];

const CAPITAL_POINTS = [
  { title: 'Protect the capital', body: 'A licensed GC signs off on the real number before you commit. No pro-forma rehab budgets that miss by 40%.' },
  { title: 'A price you can inherit', body: 'The Commitment Certificate is transferable once — if you later sell to another investor, the GC and the price go with it.' },
  { title: 'Concealed conditions only', body: 'Change orders apply only to concealed or hidden conditions found during work. Not renegotiation of the whole scope.' },
];

function LpHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={SITE_CONFIG.name}>
          <Image src={SITE_CONFIG.logoReversed} alt={SITE_CONFIG.name} width={220} height={56} className="h-9 w-auto sm:h-10" priority />
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/75 sm:inline-flex">
            NC GC #{SITE_CONFIG.license.number}
          </span>
          <a href={`tel:${SITE_CONFIG.phoneTel}`} className="text-[13px] font-bold text-white/85 transition-colors hover:text-orange">
            {SITE_CONFIG.phone}
          </a>
        </div>
      </div>
    </header>
  );
}

function LpFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#070d1d] py-10 text-white/55">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Image src={SITE_CONFIG.logoReversed} alt={SITE_CONFIG.name} width={200} height={50} className="h-9 w-auto" />
          <div className="text-[12.5px] leading-relaxed">
            <p className="font-semibold text-white/75">{SITE_CONFIG.name}</p>
            <p>Licensed NC General Contractor · {SITE_CONFIG.license.formatted}</p>
            <p>
              {SITE_CONFIG.address.formatted} ·{' '}
              <a href={`tel:${SITE_CONFIG.phoneTel}`} className="hover:text-orange">
                {SITE_CONFIG.phone}
              </a>
            </p>
          </div>
        </div>
        <p className="mt-8 border-t border-white/10 pt-6 text-[11.5px] leading-relaxed text-white/40">
          © {new Date().getFullYear()} {SITE_CONFIG.legalLine}
        </p>
      </div>
    </footer>
  );
}

export default function InvestorDealPackPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--paper)' }}>
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32" style={{ background: 'var(--shell)', color: '#f2efe7' }}>
        <LpHeader />
        <div className="relative im-container">
          <div className="max-w-3xl">
            <p className="im-eyebrow im-eyebrow--on-dark">
              For NC investors &mdash; fix-and-flip · buy-and-hold · wholesalers · #{SITE_CONFIG.license.number}
            </p>
            <h1 className="im-display im-display--on-dark mt-6 text-[2.75rem] sm:text-[4rem] lg:text-[5rem]">
              Know the <span style={{ color: 'var(--accent)' }}>real rehab number</span> before you buy.
            </h1>
            <p className="im-body im-body--on-dark mt-8 max-w-2xl text-lg">
              Most GCs won&rsquo;t review a deal you don&rsquo;t own yet.
              <span className="text-white font-semibold"> We will.</span> A licensed NC General Contractor puts
              a <span style={{ color: 'var(--accent)' }}>committed rehab price</span> on the deal in writing,
              sealed with the license, before you commit your capital &mdash; whether you&rsquo;re holding it,
              flipping it, or assigning it as a wholesaler.
            </p>
            <p className="mt-4 im-mono text-[12px] uppercase tracking-[0.14em]" style={{ color: 'rgba(242,239,231,0.55)' }}>
              Wholesaler? Same pack, <a href="/lp/wholesaler-deal-pack" className="underline underline-offset-4" style={{ color: 'var(--accent)' }}>$0-upfront terms &rarr;</a>
            </p>
            <div className="mt-10">
              <a href="#form" className="im-btn im-btn--primary">
                Get my deal packed &mdash; $1,997 &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="im-container py-16 sm:py-20">
        <div className="grid gap-0 sm:grid-cols-3 border" style={{ borderColor: 'var(--line-1)' }}>
          {CAPITAL_POINTS.map((p, i) => (
            <div
              key={p.title}
              className={`bg-white p-8 ${i > 0 ? 'border-t sm:border-t-0 sm:border-l' : ''}`}
              style={{ borderColor: 'var(--line-1)' }}
            >
              <p className="im-eyebrow">{p.title}</p>
              <p className="mt-4 text-[15px] leading-[1.65]" style={{ color: 'var(--ink-mid)' }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTENTS + FORM */}
      <section id="form" className="im-container pb-24">
        <div className="grid gap-0 border lg:grid-cols-[1.1fr_1fr]" style={{ borderColor: 'var(--line-1)', background: '#ffffff' }}>
          <div className="p-8 sm:p-10 border-b lg:border-b-0 lg:border-r" style={{ borderColor: 'var(--line-1)' }}>
            <p className="im-eyebrow">What&rsquo;s inside · $1,997</p>
            <h2 className="im-h2 mt-3 text-[2rem] sm:text-[2.5rem]">
              The Build-Ready Deal Pack
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.65]" style={{ color: 'var(--ink-mid)' }}>
              A licensed NC GC produces the full pre-construction package on your deal. Everything you need
              to underwrite it, price it, and know what the rehab will actually cost.
            </p>
            <ul className="mt-6 space-y-3 text-[15px] leading-[1.55]" style={{ color: 'var(--ink-mid)' }}>
              {BUILD_READY_CONTENTS.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="im-tick mt-0.5">/</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-l-4 p-5" style={{ borderColor: 'var(--accent)', background: 'var(--paper-2)' }}>
              <p className="im-eyebrow">Commitment Certificate</p>
              <p className="mt-2 text-[14.5px] leading-[1.6]" style={{ color: 'var(--ink-mid)' }}>
                Rehab price is committed in writing, sealed with NC GC license #{SITE_CONFIG.license.number},
                and transferable once. 30-day expiry from issue. Change orders apply only to concealed or
                hidden conditions discovered during work.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <LpLeadForm
              serviceSlug="investor-deal-pack"
              serviceName="Investor Deal Pack — $1,997"
              source="lp-investor-deal-pack"
              headline="Get the real number."
              subhead="Send the property address and what you know so far. A licensed NC GC will confirm scope and turnaround on a short call."
              submitLabel="Order Build-Ready · $1,997"
              variant="light"
            />
          </div>
        </div>
      </section>

      <LpFooter />
    </main>
  );
}
