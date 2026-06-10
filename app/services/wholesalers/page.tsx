import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import FounderStory from '@/components/FounderStory';

export const metadata = {
  title: 'For Wholesalers — GC-Verified Deal Packages | Southern Cities Construction',
  description:
    'For NC wholesalers: stop selling option contracts. Sell GC-Verified Deal Packs and consistently close $25–40K+ assignments to real end-investors. From a licensed NC General Contractor (#107724).',
};

type FeaturedProduct = {
  name: string;
  tagline: string;
  description: string;
  href: string;
  primaryCta: string;
  priceLine: string;
  highlighted?: boolean;
};

const PRODUCTS: FeaturedProduct[] = [
  {
    name: 'Deal Pack Series',
    tagline: 'Per-deal · Branded packages for your assignments',
    description:
      'GC-Verified Deal Packs you attach to wholesale assignments. Four tiers: free SF-based ballpark, Bid-Ready (budget + scope + risks), Build-Ready (plans + designs + sub quotes + closing sweep — and we commit to do the work at the price we write, 3–4 day turnaround), and the Site Scan + As-Built add-on for properties without existing plans. Branded with NC GC License #107724.',
    href: '/deal-pack',
    primaryCta: 'See the Deal Pack tiers →',
    priceLine: 'From free · Bid-Ready · Build-Ready · Site Scan add-on',
    highlighted: true,
  },
  {
    name: 'Deal Pack Pro (Subscription)',
    tagline: 'Monthly · For wholesalers doing 2+ deals/month',
    description:
      '2 Bid-Ready Deal Pack credits per month, 25% off Build-Ready upgrades, priority 2-day turnaround on every request (faster than one-off Build-Ready), and a "GC-Verified by Southern Cities" co-marketing badge for every assignment listing. Cancel anytime.',
    href: '/deal-pack#tiers',
    primaryCta: 'See Pro details →',
    priceLine: 'Monthly subscription',
  },
];

const FREE_PLAYBOOKS = [
  {
    name: 'The $25–40K Assignment Playbook',
    pages: 12,
    description:
      'How NC wholesalers are consistently closing $25–40K+ assignments to real end-investors — without becoming flippers. The buyer-pool problem, the 5-question rehab validation framework, and an anonymized excerpt of a real Bid-Ready Deal Pack that closed a $32K assignment in 9 days.',
    href: '/guide/consistent-assignment-wholesaler',
  },
  {
    name: 'From $10K to $104K in 9 Months',
    pages: 14,
    description:
      'Real 9-month case study of an NC wholesaler who kept his deal instead of assigning it. Full disclosed P&L on the $104K flip, the 5-rule decision framework for keep-vs-assign, and the honest math on capital, credit, and risk.',
    href: '/guide/wholesale-to-flip-9-month',
  },
];

const COMING_SOON = [
  {
    name: 'Build Desk for Wholesalers',
    timing: 'Q3 2026',
    description:
      'A licensed NC GC on retainer for your wholesale portfolio. Monthly project intelligence on every active deal, on-demand reviews of scopes / sub-quotes / change-orders / pre-closing sweeps. Subscription model.',
  },
  {
    name: 'Wholesaler-to-Flipper Path',
    timing: 'Open today',
    description:
      'For wholesalers ready to keep their best deals: an Execution Review before you buy, and Active Oversight during the build. Southern Cities owns construction execution while you own the deal. See the 9-month transformation case study.',
  },
];

export default function WholesalersHubPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-navy">
      <SiteNav variant="solid" />

      <div className="h-20 lg:h-[84px]" aria-hidden="true" />

      {/* HERO */}
      <section className="bg-navy text-white">
        <div className="container-pro py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl">
            <span className="inline-flex items-center rounded-full border border-orange/55 bg-orange/15 px-4 py-1.5 text-[12px] font-black uppercase tracking-[0.18em] text-orange">
              FOR NC WHOLESALERS · NC GC LICENSE #107724
            </span>
            <h1 className="mt-6 text-3xl font-black leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.5rem]">
              Stop attracting other wholesalers.<br />
              <span className="text-orange">Attach a licensed GC&apos;s verification to your next assignment.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-[1.55] text-white/85 sm:text-xl">
              Southern Cities Construction is a licensed NC General Contractor building the verification infrastructure wholesalers need to consistently close $25–40K+ assignments to real end-investors — not chain-assignments to other wholesalers or lowball flippers. Same deals. Different buyer pool.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/deal-pack"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
              >
                See Deal Pack tiers →
              </Link>
              <Link
                href="/guide/consistent-assignment-wholesaler"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white transition hover:bg-white/20"
              >
                Free $25–40K Playbook →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-b border-stone-200 bg-gradient-to-r from-orange/[0.04] via-orange/[0.08] to-orange/[0.04]">
        <div className="container-pro py-10 sm:py-12">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-black tracking-tight text-orange sm:text-4xl">2–4×</div>
              <div className="mt-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-navy sm:text-[11px]">typical fee uplift</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black tracking-tight text-orange sm:text-4xl">5–9</div>
              <div className="mt-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-navy sm:text-[11px]">days to close</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black tracking-tight text-orange sm:text-4xl">$0</div>
              <div className="mt-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-navy sm:text-[11px]">to start (free SF ballpark)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black tracking-tight text-orange sm:text-4xl">#107724</div>
              <div className="mt-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-navy sm:text-[11px]">NC GC license stamp</div>
            </div>
          </div>
        </div>
      </section>

      {/* THE TWO-LAYER PROBLEM */}
      <section className="bg-white py-16 sm:py-20 border-b border-stone-200">
        <div className="container-pro max-w-5xl">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">The Wholesaler Reality</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-navy sm:text-4xl">
            Your assignment fee is capped by your buyer pool — not your deals.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-stone-200 bg-stone-50 p-7">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">Layer 1 · Spread Cap</p>
              <h3 className="mt-3 text-xl font-black tracking-tight text-navy">You keep 15–25% of the total spread.</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-stone-700">
                You assign for $10K. Your buyer flips the same property for $80K. You did 80% of the work and captured 15% of the value. The other 75% goes to whoever does the construction execution.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-orange/40 bg-orange/[0.04] p-7">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">Layer 2 · Buyer Pool (the real one)</p>
              <h3 className="mt-3 text-xl font-black tracking-tight text-navy">Real investors won&apos;t touch unverified deals.</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-stone-700">
                DSCR and hard-money lenders require verified scope. Out-of-state capital partners require license-backed packages. Without verification, you can only sell to other wholesalers and low-tier flippers — the pool that pays the least.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CURRENT PRODUCTS */}
      <section className="bg-stone-50 py-16 sm:py-20 border-b border-stone-200">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Available Now</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-navy sm:text-4xl">
              Products built for NC wholesalers.
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.65] text-stone-700 sm:text-base">
              Every product carries a licensed NC General Contractor&apos;s verification stamp. Same execution infrastructure whether you order per-deal or subscribe.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {PRODUCTS.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                className={`group flex flex-col rounded-2xl p-7 border-2 transition-all ${
                  product.highlighted
                    ? 'border-orange/40 bg-white shadow-[0_12px_36px_-12px_rgba(245,130,32,0.18)] hover:border-orange/70 hover:shadow-[0_20px_48px_-12px_rgba(245,130,32,0.28)]'
                    : 'border-stone-200 bg-white hover:border-orange/40 hover:shadow-[0_12px_36px_-12px_rgba(19,36,82,0.12)]'
                }`}
              >
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">{product.tagline}</p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-navy">{product.name}</h3>
                <p className="mt-2 text-[13px] uppercase tracking-[0.1em] text-stone-500 font-semibold">{product.priceLine}</p>
                <p className="mt-4 text-[15px] leading-[1.6] text-stone-700">{product.description}</p>
                <span className="mt-auto pt-6 inline-flex items-center font-black uppercase tracking-[0.08em] text-orange group-hover:gap-2 transition-all">
                  {product.primaryCta}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FREE PLAYBOOKS */}
      <section className="bg-white py-16 sm:py-20 border-b border-stone-200">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Free Playbooks</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-navy sm:text-4xl">
              Two free PDFs. Two NC wholesaler paths.
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.65] text-stone-700 sm:text-base">
              Email-gated. Written by a licensed NC General Contractor. Decide which path matches where you are right now.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {FREE_PLAYBOOKS.map((playbook, idx) => {
              const coverImage = idx === 0
                ? '/product-mockups/consistent-assignment-wholesaler-cover.jpg'
                : '/product-mockups/wholesale-to-flip-9-month-cover.jpg';
              return (
                <Link
                  key={playbook.name}
                  href={playbook.href}
                  className="group flex flex-col gap-6 sm:flex-row sm:items-start rounded-2xl border-2 border-stone-200 bg-stone-50 p-6 transition-all hover:border-orange/40 hover:bg-white hover:shadow-[0_20px_44px_-12px_rgba(245,130,32,0.20)]"
                >
                  <div className="shrink-0 self-center sm:self-start">
                    <Image
                      src={coverImage}
                      alt={`${playbook.name} PDF cover`}
                      width={120}
                      height={155}
                      className={`rounded-lg shadow-[0_12px_24px_-8px_rgba(19,36,82,0.25)] border border-stone-300 transition-transform group-hover:scale-105 ${idx === 0 ? 'group-hover:-rotate-2' : 'group-hover:rotate-2'}`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">FREE · {playbook.pages} PAGES</p>
                    <h3 className="mt-2 text-lg font-black tracking-tight text-navy group-hover:text-orange sm:text-xl">{playbook.name}</h3>
                    <p className="mt-2 text-[14px] leading-[1.55] text-stone-700">{playbook.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 font-black uppercase tracking-[0.08em] text-orange text-[12px] group-hover:gap-2 transition-all">
                      Get the free PDF →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMING SOON / NEXT */}
      <section className="bg-stone-50 py-16 sm:py-20 border-b border-stone-200">
        <div className="container-pro max-w-5xl">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">What&apos;s Next</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-navy sm:text-4xl">
            The full wholesaler stack we&apos;re building.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {COMING_SOON.map((item) => (
              <div key={item.name} className="rounded-2xl border-2 border-stone-200 bg-white p-7">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-stone-500">{item.timing}</p>
                <h3 className="mt-3 text-xl font-black tracking-tight text-navy">{item.name}</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-stone-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-white py-16 sm:py-20 border-b border-stone-200">
        <div className="container-pro">
          <FounderStory
            theme="light"
            productName="the Deal Pack series"
            cta={{ label: 'See Deal Pack tiers →', href: '/deal-pack' }}
          />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
