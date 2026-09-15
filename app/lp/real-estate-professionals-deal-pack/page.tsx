import Image from 'next/image';
import LpLeadForm from '@/components/LpLeadForm';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata = {
  title: 'For NC Realtors, Lenders + Brokers — Committed GC Rehab Price + Renderings | Southern Cities Construction',
  description:
    'For real estate professionals: attach a licensed NC GC (#107724) committed rehab price and finished-home renderings to your client’s transaction. Realtors · Lenders · Brokers.',
  alternates: { canonical: '/lp/real-estate-professionals-deal-pack' },
  openGraph: {
    type: 'website',
    url: '/lp/real-estate-professionals-deal-pack',
    title: 'For NC Realtors, Lenders + Brokers — Committed GC Rehab Price + Renderings',
    description:
      'Attach a licensed NC GC committed rehab price and renderings of the finished home to any client transaction that involves rehab.',
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

const ROLE_ANGLES = [
  {
    role: 'Realtors',
    title: 'Move listings that need work.',
    body: 'Attach the committed price + renderings to your listing. Buyers see the finished product and what it costs to get there — before they walk.',
  },
  {
    role: 'Lenders',
    title: 'Underwrite the rehab, not a hope.',
    body: 'A GC-sealed number for the construction line. Draw schedule template + permit memo + pre-closing sweep — the file arrives underwriteable.',
  },
  {
    role: 'Brokers',
    title: 'Close deals other brokers can’t.',
    body: 'Rehab-needed inventory becomes sellable when there is a real construction number behind it. Attach the pack to your BOV, your buyer packet, or your CRE proposal.',
  },
];

function LpHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <Image src={SITE_CONFIG.logoReversed} alt={SITE_CONFIG.name} width={220} height={56} className="h-9 w-auto sm:h-10" priority />
        </div>
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

export default function RealEstateProfessionalsDealPackPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--paper)' }}>
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32" style={{ background: 'var(--shell)', color: '#f2efe7' }}>
        <LpHeader />
        <div className="relative im-container">
          <div className="max-w-3xl">
            <p className="im-eyebrow im-eyebrow--on-dark">
              For NC Realtors · Lenders · Brokers · #{SITE_CONFIG.license.number}
            </p>
            <h1 className="im-display im-display--on-dark mt-6 text-[2.5rem] sm:text-[3.75rem] lg:text-[4.5rem]">
              Attach a licensed <span style={{ color: 'var(--accent)' }}>GC&rsquo;s number</span> to your client&rsquo;s deal.
            </h1>
            <p className="im-body im-body--on-dark mt-8 max-w-2xl text-lg">
              Committed rehab price sealed with NC GC license #{SITE_CONFIG.license.number}, plus three photoreal
              renderings of the finished home, plans, a permit memo, and a market study. The file that moves
              rehab-needed inventory, underwrites cleaner, and lets a buyer see what it becomes and what it
              costs to get there.
            </p>
            <div className="mt-10">
              <a href="#form" className="im-btn im-btn--primary">
                Pack a deal &mdash; $1,997 &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ROLE-BY-ROLE ANGLE */}
      <section className="im-container py-16 sm:py-20">
        <p className="im-eyebrow">One pack. Three ways in.</p>
        <h2 className="im-h2 mt-4 text-[2rem] sm:text-[2.75rem] max-w-3xl">
          Realtors, lenders, brokers &mdash; same pack, different attach point.
        </h2>
        <div className="grid gap-0 sm:grid-cols-3 border mt-10" style={{ borderColor: 'var(--line-1)' }}>
          {ROLE_ANGLES.map((r, i) => (
            <div
              key={r.role}
              className={`bg-white p-8 ${i > 0 ? 'border-t sm:border-t-0 sm:border-l' : ''}`}
              style={{ borderColor: 'var(--line-1)' }}
            >
              <p className="im-eyebrow">{r.role}</p>
              <p className="mt-3 font-black text-[1.15rem] leading-snug tracking-[-0.01em]" style={{ color: 'var(--ink-hi)' }}>{r.title}</p>
              <p className="mt-3 text-[14.5px] leading-[1.65]" style={{ color: 'var(--ink-mid)' }}>{r.body}</p>
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
              A licensed NC GC produces the full pre-construction package on the deal. Attach it to MLS, a
              buyer packet, a loan file, or an open-house handout.
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
                and transferable once from your client to the end buyer at closing. 30-day expiry from issue.
                Change orders apply only to concealed or hidden conditions discovered during work.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <LpLeadForm
              serviceSlug="real-estate-professionals-deal-pack"
              serviceName="Real Estate Professionals Deal Pack — $1,997"
              source="lp-real-estate-professionals-deal-pack"
              headline="Pack the deal."
              subhead="Send the property address, your role (realtor / lender / broker), and where the deal is. A licensed NC GC will confirm scope and turnaround on a short call."
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
