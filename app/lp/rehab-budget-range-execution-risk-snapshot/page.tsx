import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import RehabRiskSnapshotForm from '@/components/RehabRiskSnapshotForm';

const PRESSURE_POINTS = [
  'Your MAO is only as good as the execution budget behind it.',
  'Bad budget assumptions distort financing, draw schedules, and hold time.',
  'Underestimated execution risk does not show up until the project is already expensive to unwind.',
];

const DISCLAIMERS = [
  'This is a preliminary feasibility estimate.',
  'It is not a quote, bid, proposal, or guaranteed construction price.',
  'Final pricing requires scope validation, site conditions review, contractor/vendor pricing, and formal agreement.',
  'Hidden conditions, permitting, market labor conditions, finish selections, and scope changes can materially affect cost.',
];

export const metadata = {
  title: 'Rehab Budget Range & Execution Risk Snapshot | Southern Cities Construction',
  description:
    'Fast preliminary construction budget range for investors underwriting residential deals. Get a directional budget bucket, confidence level, execution risks, timeline range, and next step.',
  alternates: { canonical: '/lp/rehab-budget-range-execution-risk-snapshot' },
  openGraph: {
    type: 'website',
    url: '/lp/rehab-budget-range-execution-risk-snapshot',
    title: 'Rehab Budget Range & Execution Risk Snapshot',
    description:
      'Fast preliminary budget bucket + execution risks + timeline range for investors underwriting NC residential deals.',
    siteName: 'Southern Cities Construction',
  },
};

export default function RehabBudgetRangeExecutionRiskSnapshotPage() {
  return (
    <main className="min-h-screen bg-[#f6f2ec]">
      <SiteNav />

      <section className="relative overflow-hidden bg-navy-950 pt-32 pb-20 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,140,65,0.24),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.08),transparent_18%),linear-gradient(180deg,#060d20_0%,#0a1530_60%,#101b33_100%)]" />
          <div className="absolute -right-20 top-20 h-72 w-72 rounded-full border border-white/10 bg-white/[0.02]" />
        </div>

        <div className="relative container-pro">
          <div className="max-w-4xl">
            <p className="eyebrow">Free tool for NC investors</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
              Rehab Budget Range & <span className="text-orange">Execution Risk Snapshot</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/74">
              Most deals do not fail at purchase. They fail during execution. This tool gives investors a fast preliminary construction budget range for early-stage underwriting, built to be roughly 80% directionally useful by classifying the project into the right execution cost bucket.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PRESSURE_POINTS.map((item) => (
              <div key={item} className="rounded-[28px] border border-white/12 bg-white/[0.04] p-5 shadow-[0_20px_60px_-40px_rgba(6,13,32,0.95)]">
                <p className="text-sm leading-7 text-white/78">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-pro -mt-10 pb-20">
        <RehabRiskSnapshotForm />
      </section>

      <section className="border-y border-stone-200 bg-white py-16">
        <div className="container-pro grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Important disclaimer</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-900">Directional underwriting tool. Not a bid.</h2>
          </div>
          <div className="grid gap-3">
            {DISCLAIMERS.map((item) => (
              <div key={item} className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 text-sm leading-7 text-stone-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
