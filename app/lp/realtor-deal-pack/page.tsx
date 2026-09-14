import Image from 'next/image';
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

export default function RealtorDealPackPage() {
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
              For NC Realtors
            </p>
            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Move listings that <span className="text-orange">need work</span> with a committed price and renderings of the finished home.
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-8 text-white/75">
              Attach a licensed NC GC&rsquo;s <span className="text-white font-semibold">committed rehab price</span>
              &nbsp;plus three photoreal renderings of the finished property to your listing. The buyer sees
              what it becomes and what it costs to get there &mdash; sealed with NC GC license
              #{SITE_CONFIG.license.number} and transferable once at closing.
            </p>
            <div className="mt-8">
              <a href="#form" className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5">
                Pack a listing &mdash; $1,997 &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-3">
          {REALTOR_BENEFITS.map((p) => (
            <div key={p.title} className="rounded-3xl border border-stone-200 bg-white p-6">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">{p.title}</p>
              <p className="mt-3 text-[15px] leading-[1.65] text-stone-700">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTENTS + FORM */}
      <section id="form" className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid gap-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-[0_24px_60px_-20px_rgba(8,17,29,0.15)] sm:p-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">What&rsquo;s inside · $1,997</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">
              Build-Ready Deal Pack for your listing
            </h2>
            <p className="mt-4 text-[15.5px] leading-[1.65] text-stone-700">
              A licensed NC GC produces the full pre-construction package on the listing. Attach it to MLS,
              your buyer packet, or your open-house materials.
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
                Rehab price is committed in writing, sealed with NC GC license #{SITE_CONFIG.license.number},
                and transferable once from you to the buyer at closing. 30-day expiry from issue. Change
                orders apply only to concealed or hidden conditions discovered during work.
              </p>
            </div>
          </div>

          <div>
            <LpLeadForm
              serviceSlug="realtor-deal-pack"
              serviceName="Realtor Deal Pack — $1,997"
              source="lp-realtor-deal-pack"
              headline="Pack your listing."
              subhead="Send the property address and where the listing stands. A licensed NC GC will confirm scope and turnaround on a short call."
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
