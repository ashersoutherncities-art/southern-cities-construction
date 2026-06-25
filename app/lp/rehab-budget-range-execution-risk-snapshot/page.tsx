import Image from 'next/image';
import RehabRiskSnapshotForm from '@/components/RehabRiskSnapshotForm';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata = {
  title: 'Rehab Budget Range & Execution Risk Snapshot | Southern Cities Construction',
  description:
    'Free per-square-foot rehab budget range for NC investors. Enter the property and scope, get a directional construction budget, market-adjusted cost/SF, execution risk flags, timeline, and next step — instantly.',
  alternates: { canonical: '/lp/rehab-budget-range-execution-risk-snapshot' },
  // Standalone paid-ad landing page — keep it out of the main nav/footer
  // and let it be reached by direct/ad URL. Still indexable (canonical self).
  openGraph: {
    type: 'website',
    url: '/lp/rehab-budget-range-execution-risk-snapshot',
    title: 'Rehab Budget Range & Execution Risk Snapshot',
    description:
      'Per-SF rehab budget range for NC investors — market-adjusted, with execution risk flags and timeline. Free.',
    siteName: 'Southern Cities Construction',
  },
};

const TRUST_POINTS = [
  { stat: 'Per-SF', label: 'NC market-tiered cost model' },
  { stat: '#107724', label: 'Licensed NC General Contractor' },
  { stat: 'Instant', label: 'Range + risk flags on submit' },
];

const HOW_IT_WORKS = [
  {
    n: '01',
    title: 'Tell us the property',
    body: 'Address, square footage, year built, and the strategy you are underwriting. ZIP sets the regional cost tier.',
  },
  {
    n: '02',
    title: 'Mark the scope',
    body: 'Check what is likely in play — finishes, systems, structure, and condition risks. More detail tightens the range.',
  },
  {
    n: '03',
    title: 'Get the snapshot',
    body: 'A market-adjusted budget range, cost/SF, confidence score, execution risk flags, a timeline range, and a clear next step.',
  },
];

const DISCLAIMERS = [
  'A preliminary, GC-calibrated feasibility estimate — not a site inspection, contractor bid, proposal, or guaranteed price.',
  'Use it to screen and underwrite a deal, not to set a final budget.',
  'Actual cost depends on a scope walk, hidden conditions, finish selections, permitting, and current trade-labor and material pricing. A firm, GC-committed number comes from a Southern Cities Deal Pack.',
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
        <div className="mt-8 space-y-2 border-t border-white/10 pt-6 text-[11.5px] leading-relaxed text-white/40">
          {DISCLAIMERS.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p className="pt-2">© {new Date().getFullYear()} {SITE_CONFIG.legalLine}</p>
        </div>
      </div>
    </footer>
  );
}

export default function RehabBudgetRangeExecutionRiskSnapshotPage() {
  return (
    <main className="min-h-screen bg-[#f6f2ec]">
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-[#060d20] pb-16 pt-28 text-white sm:pb-20 sm:pt-32">
        <LpHeader />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_-5%,rgba(250,140,65,0.28),transparent_38%),radial-gradient(circle_at_88%_8%,rgba(86,128,255,0.16),transparent_34%),linear-gradient(180deg,#060d20_0%,#0a1530_58%,#0d1a36_100%)]" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse at 50% 0%, black 35%, transparent 78%)',
              WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 35%, transparent 78%)',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/[0.08] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-orange">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" />
              Free tool · NC investors
            </p>
            <h1 className="mt-5 text-4xl font-black leading-[1.03] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Know the rehab number{' '}
              <span className="text-orange">before</span> execution eats the deal.
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-8 text-white/72">
              Most deals don&apos;t fail at purchase — they fail during execution. Get a fast,
              per-square-foot construction budget range built on a North Carolina market-tiered cost
              model, plus the execution risks that move the number. Built and stood behind by a
              licensed NC General Contractor.
            </p>

            <div className="mt-9 grid max-w-2xl grid-cols-3 gap-3">
              {TRUST_POINTS.map((point) => (
                <div
                  key={point.label}
                  className="rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3.5"
                >
                  <p className="text-lg font-black tracking-tight text-white sm:text-xl">{point.stat}</p>
                  <p className="mt-1 text-[11.5px] leading-snug text-white/55">{point.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FORM ===================== */}
      <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-5 pb-16 sm:px-8 sm:pb-20">
        <RehabRiskSnapshotForm />
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="border-y border-[#e7ddcf] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">How it works</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">
            Three inputs. One underwriting read.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.n} className="rounded-3xl border border-stone-200 bg-stone-50 p-7">
                <p className="text-3xl font-black tracking-tight text-orange/90">{step.n}</p>
                <h3 className="mt-4 text-xl font-extrabold text-navy-900">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-stone-600">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LpFooter />
    </main>
  );
}
