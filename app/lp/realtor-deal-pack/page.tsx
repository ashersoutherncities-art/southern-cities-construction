import Image from 'next/image';
import Link from 'next/link';
import LpLeadForm from '@/components/LpLeadForm';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata = {
  title: 'Move Listings That Need Work — Committed Rehab Price + Renderings | Southern Cities Construction',
  description:
    'For NC realtors: attach a licensed NC GC (#107724) committed rehab price and photoreal renderings of the finished home to your rehab-needed listing.',
  alternates: { canonical: '/lp/realtor-deal-pack' },
  openGraph: {
    type: 'website',
    url: '/lp/realtor-deal-pack',
    title: 'Move Listings That Need Work — Committed Rehab Price + Renderings',
    description:
      'Attach a licensed NC GC committed rehab price and renderings of the finished home to your rehab-needed listing.',
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

const REALTOR_BENEFITS = [
  { title: 'A number buyers can act on', body: 'Instead of "needs work," your listing carries a licensed NC GC\'s committed rehab price on paper.' },
  { title: 'Visuals that sell the finish', body: 'Three photoreal renderings of the finished home — attach to your listing photos and buyer packet.' },
  { title: 'A GC your buyer can inherit', body: 'The Commitment Certificate transfers once to the buyer at closing. They inherit the price and the GC.' },
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

export default function RealtorDealPackPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--paper)' }}>
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32" style={{ background: 'var(--shell)', color: '#f2efe7' }}>
        <LpHeader />
        <div className="relative im-container">
          <div className="max-w-3xl">
            <p className="im-eyebrow im-eyebrow--on-dark">For NC Realtors · #{SITE_CONFIG.license.number}</p>
            <h1 className="im-display im-display--on-dark mt-6 text-[2.75rem] sm:text-[4rem] lg:text-[5rem]">
              $0 upfront. Move listings that <span style={{ color: 'var(--accent)' }}>need work.</span>
            </h1>
            <p className="im-body im-body--on-dark mt-8 max-w-2xl text-lg">
              Attach a licensed NC GC&rsquo;s <span className="text-white font-semibold">committed rehab
              price</span> plus three photoreal renderings of the finished home to your listing. Sealed with
              license #{SITE_CONFIG.license.number} and transferable once at closing.
              <span className="text-white font-semibold"> $1,997 &mdash; paid at closing out of your
              commission.</span> Nothing due today.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#form" className="im-btn im-btn--primary">
                Pack a listing &mdash; $0 upfront &rarr;
              </a>
              <span className="im-mono text-[11.5px] uppercase tracking-[0.14em]" style={{ color: 'rgba(242,239,231,0.6)' }}>
                No close, no pay
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="im-container py-16 sm:py-20">
        <div className="grid gap-0 sm:grid-cols-3 border" style={{ borderColor: 'var(--line-1)' }}>
          {REALTOR_BENEFITS.map((p, i) => (
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
            <p className="im-eyebrow">What&rsquo;s inside · $1,997 at closing</p>
            <h2 className="im-h2 mt-3 text-[2rem] sm:text-[2.5rem]">
              Build-Ready Deal Pack for your listing
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.65]" style={{ color: 'var(--ink-mid)' }}>
              A licensed NC GC produces the full pre-construction package on the listing. Attach it to MLS,
              your buyer packet, or your open-house materials. <span className="font-semibold" style={{ color: 'var(--ink-hi)' }}>$0 upfront &mdash; the $1,997 fee is paid at closing out of your commission.</span> No close, no pay.
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
                and transferable once from you to the buyer at closing. 30-day expiry from issue. Change
                orders apply only to concealed or hidden conditions discovered during work.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <LpLeadForm
              serviceSlug="realtor-deal-pack"
              serviceName="Realtor Deal Pack — $0 upfront · $1,997 at closing"
              source="lp-realtor-deal-pack"
              headline="Pack your listing."
              subhead="Send the property address and where the listing stands. A licensed NC GC will confirm scope + closing-payout terms on a short call — nothing due today."
              submitLabel="Send my listing — $0 upfront"
              variant="light"
            />
          </div>
        </div>
      </section>

      <LpFooter />
    </main>
  );
}
