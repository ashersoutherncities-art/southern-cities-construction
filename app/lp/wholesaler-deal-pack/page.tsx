import Image from 'next/image';
import LpLeadForm from '@/components/LpLeadForm';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata = {
  title: '$0 Upfront. A Licensed GC’s Committed Price on Your Deal. | Southern Cities Construction',
  description:
    'For NC wholesalers: $0 upfront, paid at closing, no close no pay. A licensed NC GC (#107724) puts a committed rehab price on your deal, sealed and transferable to your end buyer.',
  alternates: { canonical: '/lp/wholesaler-deal-pack' },
  openGraph: {
    type: 'website',
    url: '/lp/wholesaler-deal-pack',
    title: '$0 Upfront. A Licensed GC’s Committed Price on Your Deal.',
    description:
      'NC wholesalers: pay nothing upfront. A licensed NC GC puts a committed rehab price on the deal — paid from your assignment proceeds at closing.',
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

const TERMS = [
  { label: '$0 upfront', detail: 'Nothing due when we produce the pack.' },
  { label: 'Paid at closing', detail: 'The fee comes out of your assignment proceeds.' },
  { label: 'No close, no pay', detail: 'If the deal doesn’t close, nothing is owed.' },
  { label: 'Transferable', detail: 'Certificate transfers once from you to your end buyer.' },
];

function LpHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <Image
            src={SITE_CONFIG.logoReversed}
            alt={SITE_CONFIG.name}
            width={220}
            height={56}
            className="h-9 w-auto sm:h-10"
            priority
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/75 sm:inline-flex">
            NC GC #{SITE_CONFIG.license.number}
          </span>
          <a
            href={`tel:${SITE_CONFIG.phoneTel}`}
            className="text-[13px] font-bold text-white/85 transition-colors hover:text-orange"
          >
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
          <Image
            src={SITE_CONFIG.logoReversed}
            alt={SITE_CONFIG.name}
            width={200}
            height={50}
            className="h-9 w-auto"
          />
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

export default function WholesalerDealPackPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--paper)' }}>
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32" style={{ background: 'var(--shell)', color: '#f2efe7' }}>
        <LpHeader />
        <div className="relative im-container">
          <div className="max-w-3xl">
            <p className="im-eyebrow im-eyebrow--on-dark">For NC Wholesalers · #{SITE_CONFIG.license.number}</p>
            <h1 className="im-display im-display--on-dark mt-6 text-[2.75rem] sm:text-[4rem] lg:text-[5rem]">
              $0 Upfront.<br />
              A <span style={{ color: 'var(--accent)' }}>committed rehab price</span> on your deal.
            </h1>
            <p className="im-body im-body--on-dark mt-8 max-w-2xl text-lg">
              A licensed North Carolina General Contractor puts a committed rehab price on your deal &mdash;
              sealed with the license and transferable once to your end buyer &mdash; and gets paid from your
              assignment proceeds at closing.
              <span className="text-white font-semibold"> No close, no pay.</span>
            </p>

            <div className="mt-10 grid gap-0 sm:grid-cols-2 border" style={{ borderColor: 'rgba(255,255,255,0.14)' }}>
              {TERMS.map((t, i) => (
                <div
                  key={t.label}
                  className={`p-5 ${i > 1 ? 'border-t' : ''} ${i % 2 === 1 ? 'sm:border-l' : ''} ${i === 0 || i === 1 ? 'border-b sm:border-b-0' : ''}`}
                  style={{ borderColor: 'rgba(255,255,255,0.14)', background: 'var(--shell-2)' }}
                >
                  <p className="im-mono text-[13px] font-bold uppercase tracking-[0.14em]" style={{ color: 'var(--accent)' }}>{t.label}</p>
                  <p className="mt-2 text-[13.5px] leading-snug" style={{ color: 'rgba(242,239,231,0.75)' }}>{t.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE + FORM */}
      <section className="im-container pb-24 pt-20">
        <div className="grid gap-0 border lg:grid-cols-[1.1fr_1fr]" style={{ borderColor: 'var(--line-1)', background: '#ffffff' }}>
          <div className="p-8 sm:p-10 border-b lg:border-b-0 lg:border-r" style={{ borderColor: 'var(--line-1)' }}>
            <p className="im-eyebrow">What&rsquo;s inside</p>
            <h2 className="im-h2 mt-3 text-[2rem] sm:text-[2.5rem]">
              The Build-Ready Deal Pack
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.65]" style={{ color: 'var(--ink-mid)' }}>
              Everything a serious buyer or lender needs to underwrite your assignment &mdash; produced by a
              licensed NC GC, branded with license #{SITE_CONFIG.license.number}.
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
                The rehab price is committed in writing, sealed with the NC GC license, and transferable once
                to your end buyer. 30-day expiry from issue. Change orders apply only to concealed or hidden
                conditions discovered during work &mdash; not the whole scope.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <LpLeadForm
              serviceSlug="wholesaler-deal-pack"
              serviceName="Wholesaler Deal Pack — $0 upfront"
              source="lp-wholesaler-deal-pack"
              headline="Get the deal packed."
              subhead="Send the address, contract price, and how you have it under contract. A licensed NC GC will confirm the scope and the pay-at-closing fee on a short call — usually same day."
              submitLabel="Send my deal"
              variant="light"
            />
          </div>
        </div>
      </section>

      <LpFooter />
    </main>
  );
}
