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
    <main className="min-h-screen bg-[#f6f2ec]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#060d20] pb-16 pt-28 text-white sm:pb-20 sm:pt-32">
        <LpHeader />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_-5%,rgba(250,140,65,0.28),transparent_38%),radial-gradient(circle_at_88%_8%,rgba(86,128,255,0.14),transparent_34%),linear-gradient(180deg,#060d20_0%,#0a1530_58%,#0d1a36_100%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/[0.10] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-orange">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" />
              For NC Wholesalers
            </p>
            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              $0 Upfront. A Licensed GC&rsquo;s <span className="text-orange">Committed Price</span> on Your Deal.
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-8 text-white/75">
              A licensed North Carolina General Contractor (#{SITE_CONFIG.license.number}) puts a committed
              rehab price on your deal &mdash; sealed with the license and transferable once to your end
              buyer &mdash; and gets paid from your assignment proceeds at closing.
              <span className="text-white font-semibold"> No close, no pay.</span>
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {TERMS.map((t) => (
                <div key={t.label} className="rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3">
                  <p className="text-sm font-black text-orange">{t.label}</p>
                  <p className="mt-1 text-[13.5px] leading-snug text-white/75">{t.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE + FORM */}
      <section className="relative z-10 mx-auto -mt-12 max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid gap-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-[0_24px_60px_-20px_rgba(8,17,29,0.15)] sm:p-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">What&rsquo;s inside</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">
              The Build-Ready Deal Pack
            </h2>
            <p className="mt-4 text-[15.5px] leading-[1.65] text-stone-700">
              Everything a serious buyer or lender needs to underwrite your assignment &mdash; produced by a
              licensed NC GC, branded with license #{SITE_CONFIG.license.number}.
            </p>
            <ul className="mt-6 space-y-2.5 text-[15px] leading-[1.55] text-stone-800">
              {BUILD_READY_CONTENTS.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-orange">▸</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl border-2 border-orange/40 bg-orange/[0.06] p-5">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">Commitment Certificate</p>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-stone-800">
                The rehab price is committed in writing, sealed with the NC GC license, and transferable once
                to your end buyer. 30-day expiry from issue. Change orders apply only to concealed or hidden
                conditions discovered during work &mdash; not the whole scope.
              </p>
            </div>
          </div>

          <div>
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
