import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import LpLeadForm from '@/components/LpLeadForm';
import RealtorPlanCTA from '@/components/RealtorPlanCTA';

// ---------------------------------------------------------------------------
// The read / report 2×2 grid (buy-now). Two axes:
//   READ (a GC opinion) vs REPORT (a committed 3-tier budget)
//   DESK (on what you already have) vs ON-SITE (a licensed inspection)
// Cells: Quick Read $299 (desk read) · GC Budget $599 (report on your
// inspection) · Inspected GC Read $649 (on-site read) · Inspection + GC Budget
// Report $899 (on-site report). Matches scripts/build-realtor-catalogue.py.
// Every Report includes the GC's commitment to do the work at the number.
// ---------------------------------------------------------------------------
const reportTiers = [
  {
    axis: 'Desk · Read',
    name: 'GC Quick Read',
    price: '$299',
    sub: '1–2 business days · same-day rush available',
    tagline: 'The fast screen — buyer or seller — before you pay for a full on-site inspection.',
    description:
      'A licensed NC GC reads your existing inspection report or the property details and tells you, in plain English: what is real, what is cosmetic, what could kill the loan, and a rough order-of-magnitude on the work — with item-by-item severity, paste-ready repair-request language, and a client-shareable PDF. Desk read — no inspector dispatched. Works buyer-side or seller-side.',
    bullets: [
      'Critical-vs-cosmetic triage + loan-killer flags',
      'Item-by-item severity on your inspection report',
      'Paste-ready repair-request language',
      'Client-shareable PDF · buyer or seller',
      'Rough order-of-magnitude cost + plain-English GC verdict',
    ],
    credit: 'Your $299 credits toward the GC Budget or the full Report.',
    cartKey: 'realtor-quick-read',
    cta: 'Get a Quick Read · $299',
    highlighted: false,
  },
  {
    axis: 'Desk · Report',
    name: 'GC Budget (on your inspection)',
    price: '$599',
    sub: '2 business days · uses the inspection you already have',
    tagline: 'The GC budget on the inspection you already have — no new inspection.',
    description:
      'A licensed NC GC turns the inspection you already have into a full 3-tier budget — MANDATORY (code + loan-killers), HIGH-ROI (2× return cosmetics), and DISCLOSE & SKIP — with paste-ready repair-request language. And the same GC commits to do the work at the budget we write.',
    bullets: [
      '3-tier budget on your existing inspection',
      'Mandatory / High-ROI / Disclose & Skip',
      'Paste-ready repair-request language',
      'We commit to do the work at the budget we write',
    ],
    credit: 'Quick Read credits in · add our inspection (+$400) to make it the full $899 Report.',
    cartKey: 'realtor-gc-budget',
    cta: 'Get the GC Budget · $599',
    highlighted: false,
  },
  {
    axis: 'On-site · Read',
    name: 'Inspected GC Read',
    price: '$649',
    sub: 'Licensed inspection + GC read · when there is no inspection yet',
    tagline: 'A licensed inspector on-site, plus a GC read on the findings — the bridge into the budget.',
    description:
      'For when there is no inspection yet: a licensed third-party inspector goes on-site and produces a full standard inspection report, then a licensed NC GC layers a GC Quick Read on the findings — real-vs-cosmetic, loan-killers, rough cost, and a clear GC call.',
    bullets: [
      'Licensed third-party inspector on-site → full report',
      'GC Quick Read layered on the findings',
      'Real-vs-cosmetic · loan-killers · rough cost · GC call',
    ],
    credit: 'Relevant fees credit forward — the $299 GC-read value credits toward the budget (the inspection is a pass-through cost).',
    cartKey: 'realtor-inspected-gc-read',
    cta: 'Get an Inspected Read · $649',
    highlighted: false,
  },
  {
    axis: 'On-site · Report',
    name: 'Inspection + GC Budget Report',
    price: '$899',
    sub: '3–5 business days · rush $1,199 (24–48 hrs)',
    tagline: 'The flagship — a licensed inspector inspects, the GC prices it, and the same GC commits to do the work at that number.',
    description:
      'A licensed inspector visits the property AND a licensed NC GC turns the findings into a 3-tier budget — MANDATORY (code + loan-killers, 5–7 day fix guarantee), HIGH-ROI (2× return cosmetics), and DISCLOSE & SKIP — with paste-ready repair-request language and a negotiation framing memo. And the same GC commits to do the work at the budget we write.',
    bullets: [
      'Licensed inspector on-site',
      '3-tier budget: Mandatory / High-ROI / Disclose & Skip',
      'Paste-ready repair-request language',
      'Negotiation framing memo',
      'We commit to do the work at the budget we write',
    ],
    credit: 'Your $899 credits toward the job if we do the work.',
    cartKey: 'gc-grade-property-inspection',
    cta: 'Order the Full Report · $899',
    highlighted: true,
    badge: 'Flagship',
  },
];

// Two more ways a GC helps on the deal — the diagnosis rung (find the true
// cause on big-swing items) and the fulfillment rung (we do the repairs).
const dealAddOns = [
  {
    name: 'Diagnosis',
    price: 'from $199',
    sub: '+ test cost · GC coordinates the right test',
    description:
      'A symptom — a ceiling stain, a musty smell, a sloping floor — can have several causes and several repair bills. A licensed NC GC scopes which test the symptom needs, coordinates the vetted specialist or sub (inspection port + borescope, sewer scope, moisture/thermal, or a licensed PE structural eval), and translates the finding into your budget. You pay for GC judgment; the third-party test cost is billed separately and does not credit.',
    cta: 'Start a Diagnosis · from $199',
    href: '/cart?cart=realtor-diagnosis',
    isCart: true,
  },
  {
    name: 'Repair Execution — we do the repairs',
    price: 'Scoped from the Report',
    sub: 'Mandatory fixes first · licensed crew + vetted subs',
    description:
      'The GC actually does the work — at the number we wrote. SCC’s licensed crew and vetted subs execute the repair list, Mandatory fixes prioritized (5–7 day speed guarantee), permits pulled where required, with repair-verification + photo documentation and a ready-to-list / ready-to-close handoff. Your Quick Read / Report fees credit toward the work.',
    cta: 'Scope the repairs →',
    href: '#realtor-inquiry',
    isCart: false,
  },
];

// ---------------------------------------------------------------------------
// What "we commit to the number" means — included with every Full Report,
// NOT a separate package. The work is the budget in the Report; the GC who
// scoped it commits to do it at that price.
// ---------------------------------------------------------------------------
const commitmentPoints = [
  {
    title: 'No price drift',
    body: 'The same licensed NC GC who wrote your budget commits to do the work at that price — not an estimate that creeps once the work starts.',
  },
  {
    title: 'The work is the Report',
    body: 'There is no separate price to negotiate. The work is the budget already in your Report — and your $899 Report fee credits toward the job.',
  },
  {
    title: 'Your client closes with certainty',
    body: 'Buyers stop walking on un-scoped repairs and sellers stop bleeding credits. The work is priced, committed, and on a clock before anyone signs.',
  },
];

// ---------------------------------------------------------------------------
// Monthly support subscriptions — seat ladder (solo → team → brokerage)
// ---------------------------------------------------------------------------
const supportTiers = [
  {
    label: 'For solo agents',
    title: 'Realtor Solo',
    planKey: 'solo' as const,
    price: '$299/mo',
    includes: [
      'GC Support Specialist on call for quick contracting & pricing questions',
      '3 inspection or listing reviews / mo',
      '24-hour response SLA',
      'Unused reviews bank up to 2',
    ],
    cta: 'Review Plan',
    href: '/services/realtors/realtor-solo',
    highlighted: false,
  },
  {
    label: 'For small teams · Most common',
    title: 'Realtor Team',
    planKey: 'team' as const,
    price: '$649/mo',
    includes: [
      'GC Support Specialist on call for quick contracting & pricing questions',
      '10 inspection / listing reviews / mo',
      'Same-day triage on urgent items',
      'Written deal-support summaries',
      'Shared team access (3–10 agents)',
    ],
    cta: 'Review Plan',
    href: '/services/realtors/realtor-team',
    highlighted: true,
    badge: 'Most Common',
  },
  {
    label: 'For brokerages (10+ agents)',
    title: 'Brokerage Pro',
    planKey: 'brokerage' as const,
    price: '$2,499/mo',
    includes: [
      'Unlimited reviews',
      'Your own dedicated GC Support Specialist (contracting + pricing questions anytime)',
      '4-hour urgent SLA',
      'Quarterly business review',
      'White-label client briefings',
      'Agency-wide access (10+ agents)',
    ],
    cta: 'Review Plan',
    href: '/services/realtors/realtor-brokerage-pro',
    highlighted: false,
  },
];

export const metadata = {
  title: 'For Realtors | Southern Cities Construction',
  description:
    'Put a licensed NC GC on your deal: an Inspection + GC Budget Report (buy now) — a licensed inspector inspects, the GC prices it, and the same GC commits to do the work at the number — plus monthly support plans for solo agents, teams, and brokerages.',
  alternates: { canonical: '/services/realtors' },
  openGraph: {
    type: 'website',
    url: '/services/realtors',
    title: 'Construction Help for NC Realtors',
    description:
      'An Inspection + GC Budget Report (buy now) — a licensed inspector inspects, the GC prices it — with the same GC committing to do the work at the number, plus monthly support plans for solo agents, teams, and brokerages.',
    siteName: 'Southern Cities Construction',
  },
};

export default function RealtorsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SiteNav variant="solid" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#08111d] pt-32 pb-20 sm:pt-36 sm:pb-24">
        <div className="absolute inset-0 motion-safe:animate-[heroFloat_22s_ease-in-out_infinite] bg-[linear-gradient(125deg,#163061_0%,#10254c_50%,#143367_100%)]" style={{ backgroundSize: '180% 180%' }} aria-hidden="true" />
        <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(circle_at_30%_35%,rgba(245,130,32,0.22),transparent_55%)]" />
        <div className="relative container-pro">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-orange/40 bg-orange/15 px-4 py-2 text-[12px] font-black uppercase tracking-[0.18em] text-orange">The Contractor for Realtors · NC GC #107724</p>
            <h1 className="mt-6 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Put a licensed NC GC on your deal.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
              Get the real construction number with an Inspection + GC Budget Report — a licensed inspector inspects, the GC prices it, and the same GC <strong className="text-white">commits to do the work at that number.</strong> Buy the Report now; if we do the job, your Report fee credits in. When the same questions keep coming up, add a monthly plan.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#report" className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-orange px-7 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-8px_rgba(245,130,32,0.5)] transition hover:bg-orange-500">
                Get the Report
              </a>
              <a href="#pricing" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                See Monthly Plans
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGE 1 — GC INSPECTION & BUDGET REPORT */}
      <section id="report" className="bg-stone-50 py-16 sm:py-20">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Buy now · no quote, no call</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#08111d] sm:text-4xl">The read / report grid</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-stone-700 sm:text-lg">
              Two questions decide which one you need. Do you want a <span className="font-semibold text-[#08111d]">READ</span> (a licensed GC opinion) or a <span className="font-semibold text-[#08111d]">REPORT</span> (a committed 3-tier budget)? And should it work off what you already have — a <span className="font-semibold text-[#08111d]">DESK</span> read — or include a licensed <span className="font-semibold text-[#08111d]">ON-SITE</span> inspection? Pick the cell that fits, and check out. Every Report includes the same GC&rsquo;s commitment to do the work at the number.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[0.14em]">
              <span className="inline-flex items-center rounded-full border border-stone-300 bg-white px-3 py-1 text-stone-600">Desk · Read → $299</span>
              <span className="inline-flex items-center rounded-full border border-stone-300 bg-white px-3 py-1 text-stone-600">Desk · Report → $599</span>
              <span className="inline-flex items-center rounded-full border border-stone-300 bg-white px-3 py-1 text-stone-600">On-site · Read → $649</span>
              <span className="inline-flex items-center rounded-full border border-[#fa8c41]/50 bg-[#fa8c41]/10 px-3 py-1 text-[#08111d]">On-site · Report → $899</span>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {reportTiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex h-full flex-col rounded-[28px] border p-7 sm:p-8 shadow-elev-1 ${tier.highlighted ? 'border-[#fa8c41]/60 bg-white ring-1 ring-[#fa8c41]/20' : 'border-stone-200 bg-white'}`}
              >
                <span className="inline-flex w-fit items-center rounded-full border border-stone-300 bg-stone-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.16em] text-stone-500">{tier.axis}</span>
                <div className="mt-3 flex items-center gap-3">
                  <h3 className="text-2xl font-extrabold tracking-tight text-[#08111d]">{tier.name}</h3>
                  {tier.badge ? (
                    <span className="inline-flex rounded-full bg-[#fa8c41] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">{tier.badge}</span>
                  ) : null}
                </div>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="text-4xl font-black tracking-[-0.02em] text-[#08111d]">{tier.price}</p>
                  <p className="text-[13px] font-semibold text-stone-500">{tier.sub}</p>
                </div>
                <p className="mt-4 text-[15px] font-semibold text-[#08111d]">{tier.tagline}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-stone-700">{tier.description}</p>
                <ul className="mt-5 space-y-2.5 text-[14px] leading-relaxed text-stone-800">
                  {tier.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#fa8c41]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 rounded-2xl bg-[#fa8c41]/10 px-4 py-3 text-[13.5px] font-semibold text-[#08111d]">
                  ↳ {tier.credit}
                </p>
                <div className="mt-auto pt-6">
                  <Link
                    href={`/cart?cart=${tier.cartKey}`}
                    className={`inline-flex min-h-[52px] w-full items-center justify-center rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] transition hover:-translate-y-0.5 ${tier.highlighted ? 'bg-[#fa8c41] text-white shadow-[0_12px_28px_-8px_rgba(245,130,32,0.55)] hover:bg-[#ffa463]' : 'border border-stone-300 bg-white text-[#08111d] hover:border-[#fa8c41] hover:text-[#fa8c41]'}`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* DIAGNOSIS + REPAIR EXECUTION — the cause-finding rung and the do-the-work rung */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {dealAddOns.map((addon) => (
              <div key={addon.name} className="flex h-full flex-col rounded-[28px] border border-stone-200 bg-white p-7 sm:p-8 shadow-elev-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-2xl font-extrabold tracking-tight text-[#08111d]">{addon.name}</h3>
                </div>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="text-2xl font-black tracking-[-0.02em] text-[#fa8c41]">{addon.price}</p>
                  <p className="text-[13px] font-semibold text-stone-500">{addon.sub}</p>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-stone-700">{addon.description}</p>
                <div className="mt-auto pt-6">
                  <Link
                    href={addon.href}
                    className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-[#08111d] transition hover:-translate-y-0.5 hover:border-[#fa8c41] hover:text-[#fa8c41]"
                  >
                    {addon.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITMENT — included with every Full Report (not a separate package) */}
      <section id="commitment" className="relative overflow-hidden bg-[#0d1a2f] py-16 sm:py-20">
        <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-[#fa8c41]/[0.15] blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full bg-[#fa8c41]/[0.08] blur-[120px]" />
        <div className="container-pro relative z-10">
          <div className="mx-auto max-w-5xl rounded-[28px] border border-[#fa8c41]/40 bg-gradient-to-br from-[#0a1428] via-[#0e1f3e] to-[#0a1428] p-8 sm:p-12 shadow-[0_14px_34px_-18px_rgba(8,17,29,0.4)]">
            <span className="inline-flex rounded-full bg-[#fa8c41] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">Included with every Full Report</span>
            <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              We commit to do the work at the number we write.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/85">
              Most inspections hand your client a problem. An Inspection + GC Budget Report hands them a price — a licensed inspector inspects, the GC prices it, and because the same licensed NC GC stands behind it, we&rsquo;ll do the work at that price. No second estimate, no drift. The work is the budget already in your Report, and the $899 Report fee credits toward the job.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {commitmentPoints.map((point) => (
                <div key={point.title} className="rounded-2xl border border-white/12 bg-white/[0.04] p-5">
                  <p className="text-[15px] font-extrabold text-white">{point.title}</p>
                  <p className="mt-2 text-[14px] leading-[1.5] text-white/80">{point.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#report"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#fa8c41] px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-[0_12px_28px_-8px_rgba(245,130,32,0.55)] transition hover:-translate-y-0.5 hover:bg-[#ffa463]"
              >
                ↑ Order a Full Report · $899
              </a>
              <a
                href="#realtor-inquiry"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-white/5"
              >
                Questions? Talk to us →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DEAL PACK FOR LISTINGS — listing-agent cross-sell */}
      <section className="bg-gradient-to-br from-[#0a1428] via-[#0d1a30] to-[#0a1428] py-14 sm:py-18 border-t border-white/8">
        <div className="container-pro">
          <div className="mx-auto max-w-5xl rounded-[28px] border-2 border-[#fa8c41]/40 bg-gradient-to-br from-[#fa8c41]/[0.08] via-[#fa8c41]/[0.02] to-transparent p-8 sm:p-12 shadow-[0_14px_34px_-18px_rgba(8,17,29,0.4)]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full bg-[#fa8c41] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">For listing agents</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">Rehab-needed listings · investor-buyer pools</span>
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
              Attach a GC-Verified Deal Pack to your listing.<br />
              <span className="text-[#fa8c41]">Attract the investor-buyers who actually pay top of market.</span>
            </h2>
            <p className="mt-5 text-lg leading-[1.55] text-white/85">
              For rehab-needed or investor-grade listings: a licensed NC GC delivers a branded Deal Pack — verified rehab budget, scope, and risk callouts (Bid-Ready) or full plans + designs + a mood board + a materials &amp; furniture report + a local market report + sub quotes + a local vendor list + closing sweep (Build-Ready, and we commit to do the work at the price we write). Attach it to your MLS marketing and disclosure packet. Investor-buyers stop passing on un-scoped properties because they no longer have to bring their own GC.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/deal-pack"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#fa8c41] px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-[0_12px_28px_-8px_rgba(245,130,32,0.55)] transition hover:-translate-y-0.5 hover:bg-[#ffa463]"
              >
                See Deal Pack Tiers →
              </Link>
              <Link
                href="/guide/consistent-assignment-wholesaler"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/25 px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-white/5"
              >
                Free Deal Pack Playbook (PDF) →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MONTHLY SUPPORT TIERS */}
      <section id="pricing" className="bg-[#08111d] py-14 sm:py-18">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Monthly support · seat ladder</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">Realtor Subscription Plans</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/80 sm:text-lg">
              When the same construction questions keep coming up across your active deals, a monthly plan puts a <span className="font-semibold text-white">GC Support Specialist</span> on call — your go-to for quick contracting and pricing questions, backed by a licensed NC GC who stands behind the numbers — plus defined monthly review capacity, sized to whether you are a solo agent, a team, or a full brokerage.
            </p>
          </div>

          {/* What a "review" actually is */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#fa8c41]">Inspection review · buyer side</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/80">
                You send the home-inspection report on a deal you&apos;re working; a licensed NC GC reads it back — what&apos;s real, what&apos;s cosmetic, what could kill the loan, and what the fixes actually cost — so you negotiate off a real construction number instead of a contractor&apos;s guess.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#fa8c41]">Listing review · seller side</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/80">
                You send a property you&apos;re about to list; a GC tells you what to fix, what to disclose, and what to leave alone before it goes live — with a prep-spend budget — so you price it right and don&apos;t bleed credits to repairs after the buyer&apos;s inspection.
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-[13.5px] leading-relaxed text-white/55">
            A review is a desk read — you send the report or listing details, a licensed NC GC reads it back within your plan&apos;s SLA; nobody is dispatched to the property. (When you want a licensed inspector physically on-site, that is the Full Report above.) Quick one-off &ldquo;what would this cost / how should I price this?&rdquo; questions don&apos;t count against your reviews — they go straight to your on-call <span className="text-white/75">GC Support Specialist</span>.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {supportTiers.map((tier) => (
              <div key={tier.title} className={`flex h-full flex-col rounded-3xl border p-7 sm:p-8 ${tier.highlighted ? 'border-[#fa8c41]/60 bg-gradient-to-br from-[#0e1c30] via-[#142840] to-[#0e1c30] shadow-[0_14px_34px_-18px_rgba(8,17,29,0.4)]' : 'border-white/10 bg-white/[0.03]'}`}>
                <div className="flex h-6 items-center">
                  {tier.badge ? (
                    <span className="inline-flex rounded-full bg-[#fa8c41] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">{tier.badge}</span>
                  ) : null}
                </div>
                <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#fa8c41]">{tier.label}</p>
                <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white">{tier.title}</h3>
                <p className="mt-3 text-3xl font-black tracking-[-0.02em] text-white">{tier.price}</p>
                <p className="mt-1 text-xs font-semibold text-white/50">+ $75 one-time setup</p>
                <ul className="mt-6 space-y-2.5 text-[14px] leading-relaxed text-white/85">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#fa8c41]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <RealtorPlanCTA planKey={tier.planKey} label="Get started" highlighted={tier.highlighted} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREE GC-CERTIFIED CHECKLISTS (lead magnets) */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-pro max-w-5xl">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#fa8c41]">
              <span className="w-6 h-px bg-[#fa8c41]/50" />
              Free GC-Certified Resources
              <span className="w-6 h-px bg-[#fa8c41]/50" />
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#08111d]">
              Free checklists — built by a licensed NC GC
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-stone-600 leading-relaxed">
              Two single-document references your sellers and buyers can use directly.
              GC-certified, no fluff, instantly downloadable. We just need your contact info to send the file.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Link
              href="/resources#gc-certified-pre-listing-checklist"
              className="group rounded-2xl border border-stone-200 bg-stone-50 p-6 transition-all hover:border-[#fa8c41]/50 hover:bg-white hover:shadow-elev-1"
            >
              <span className="inline-flex rounded-full bg-[#fa8c41]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#fa8c41]">
                For Sellers
              </span>
              <h3 className="mt-4 text-xl font-extrabold tracking-tight text-[#08111d]">
                Pre-Listing Construction Checklist
              </h3>
              <p className="mt-3 text-[14px] text-stone-600 leading-relaxed">
                What sellers should fix, disclose, or leave alone before listing — with prep-spend
                budget ranges by price tier. Use this before the listing goes live.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] text-[#fa8c41] group-hover:gap-3 transition-all">
                Get the Checklist <span aria-hidden="true">→</span>
              </span>
            </Link>
            <Link
              href="/resources#gc-certified-pre-offer-checklist"
              className="group rounded-2xl border border-stone-200 bg-stone-50 p-6 transition-all hover:border-[#fa8c41]/50 hover:bg-white hover:shadow-elev-1"
            >
              <span className="inline-flex rounded-full bg-[#fa8c41]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#fa8c41]">
                For Buyers
              </span>
              <h3 className="mt-4 text-xl font-extrabold tracking-tight text-[#08111d]">
                Pre-Offer Construction Checklist
              </h3>
              <p className="mt-3 text-[14px] text-stone-600 leading-relaxed">
                What buyers should look for at the showing — age-based red flags by system,
                replacement-cost ranges, and walk-away triggers. Use this BEFORE writing the offer.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] text-[#fa8c41] group-hover:gap-3 transition-all">
                Get the Checklist <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section className="bg-stone-50 py-16 sm:py-20">
        <div className="container-pro max-w-4xl">
          <LpLeadForm
            id="realtor-inquiry"
            serviceSlug="realtors-hub-inquiry"
            serviceName="Realtor hub — general inquiry"
            source="hub-realtors"
            headline="Not sure which fits — or ready to get the work done?"
            subhead="Tell us about the deal or listing — property address, what stage it is in, what you are trying to figure out — and a licensed NC GC will point you to the right path or scope the work off your Report. Response within 1 business day."
            submitLabel="Get a Recommendation"
            variant="dark"
          />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
