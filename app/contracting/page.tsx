import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import TrustStrip from '@/components/TrustStrip';

export const metadata = {
  title: 'Full Contracting — Licensed NC General Contractor | Southern Cities Construction',
  description:
    'Full residential general contracting in North Carolina — renovations, investor rehabs, additions, and ground-up builds. One company, one point of accountability, structured planning and oversight. NC GC License #107724.',
  alternates: { canonical: '/contracting' },
  openGraph: {
    type: 'website',
    url: '/contracting',
    title: 'Full Contracting — Licensed NC General Contractor',
    description:
      'Renovations, investor rehabs, additions, and ground-up residential builds across NC — one company running the whole project.',
    siteName: 'Southern Cities Construction',
  },
};

const scopeList = [
  'Full home renovations',
  'Investor rehabs and turn projects',
  'Home additions and structural scope',
  'Ground-up residential builds',
  'Permit-heavy residential projects that need a licensed GC of record',
];

const includeList = [
  'Project review before final start',
  'GC-led planning, scheduling, and sequencing',
  'Permit coordination and inspection handling',
  'Subcontractor coordination and field oversight',
  'Budget, timeline, and milestone follow-through',
  'Single point of accountability from Southern Cities',
];

const notFitList = [
  'Very small handyman-style one-off tasks',
  'Loose quote shopping with no real project scope yet',
  'Projects that only need one small advisory answer instead of full execution',
];

const fitList = [
  'Homeowners who want one licensed company running the work',
  'Investors who need a GC to carry execution instead of managing the job themselves',
  'Developers or landowners who need tighter construction delivery on residential scope',
];

const engagementModels = [
  {
    name: 'Cost-Plus',
    tag: 'Transparency & flexibility',
    how: 'You pay the actual cost of labor, materials, and subs — plus one agreed, transparent fee. Fully open-book the whole way through.',
    bestWhen: [
      'Scope is still evolving or likely to change',
      'Renovations and rehabs where conditions are unknown until walls open',
      'Custom or higher-end work where decisions happen as you go',
      'You want to see every real number and start moving fast',
    ],
    likelyUser:
      'Investors and homeowners who value full transparency, want to start before every detail is locked, and are comfortable trading a fixed final price for flexibility.',
    tradeoff: 'The final price isn’t guaranteed up front — you carry the cost if scope grows.',
  },
  {
    name: 'GMP',
    fullName: 'Guaranteed Maximum Price',
    tag: 'Cost certainty with a ceiling',
    how: 'The same open-book cost-plus model — but we guarantee a maximum price. Costs above the cap are on us, not you. Come in under it, and the savings are yours.',
    bestWhen: [
      'Scope and plans are reasonably defined before we start',
      'A lender or fixed budget requires a hard ceiling',
      'Ground-up builds and larger, planned renovations',
      'You want transparency and a guaranteed cap',
    ],
    likelyUser:
      'Developers, investors working to a fixed budget, and owners financing the project — anyone who needs a firm ceiling for lender approval or peace of mind while still seeing the real numbers.',
    tradeoff: 'Setting the cap needs a defined scope first, so there’s more planning before we break ground.',
  },
];

export default function ContractingPage() {
  return (
    <div className="min-h-screen bg-white text-navy">
      <SiteNav variant="solid" />

      <section className="relative overflow-hidden bg-[#08111d] pt-32 pb-24 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 motion-safe:animate-[heroFloat_22s_ease-in-out_infinite] bg-[linear-gradient(125deg,#163061_0%,#10254c_50%,#143367_100%)]" style={{ backgroundSize: '180% 180%' }} aria-hidden="true" />
        <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(circle_at_30%_35%,rgba(245,130,32,0.22),transparent_55%)]" />
        <div className="absolute left-[-10%] top-[10%] h-72 w-72 rounded-full bg-[rgba(245,130,32,0.12)] blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 container-pro">
          <div className="max-w-4xl">
            <p className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41] motion-safe:animate-[heroRise_900ms_ease-out]">
              <span className="block h-px w-10 bg-[#fa8c41]/80" aria-hidden="true" />
              Full Contracting
            </p>
            <h1 className="mt-6 text-[2.75rem] font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-[3.75rem] lg:text-[4.5rem] motion-safe:animate-[heroRise_1000ms_ease-out_0.1s_both]">
              Full residential contracting with <span className="text-[#fa8c41]">Southern Cities</span> as the licensed GC of record.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-[1.55] text-white/85 sm:text-xl motion-safe:animate-[heroRise_1100ms_ease-out_0.2s_both]">
              For projects that need one company carrying the work from planning through execution. Renovations, rehabs, additions, and new builds that need real coordination, permit handling, and accountable delivery.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4 motion-safe:animate-[heroRise_1300ms_ease-out_0.4s_both]">
              <Link href="/#contact" className="inline-flex min-h-[56px] min-w-[240px] items-center justify-center gap-2 rounded-full bg-[#fa8c41] px-7 py-3.5 text-sm font-black uppercase tracking-[0.06em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.45)] transition-all hover:-translate-y-0.5 hover:bg-[#ffa463]">
                Request Full Contracting Review <span aria-hidden="true">→</span>
              </Link>
              <Link href="/services" className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/5">
                Start with Project Support
              </Link>
            </div>
          </div>
        </div>
        <style>{`
@keyframes heroFloat { 0%, 100% { transform: scale(1.04) translate3d(0, 0, 0); } 50% { transform: scale(1.08) translate3d(-12px, -8px, 0); } }
@keyframes heroRise { 0% { opacity: 0; transform: translate3d(0, 24px, 0); filter: blur(4px); } 60% { filter: blur(0); } 100% { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); } }
`}</style>
      </section>

      <TrustStrip />

      {/* WHAT WE TAKE ON + WHO IT'S FOR */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-pro">
          <div className="max-w-2xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Full contracting</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-navy sm:text-4xl">
              One licensed company, carrying the whole build.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-600">
              When you need permits, scope, subs, schedule, and delivery owned by a single accountable GC — this is the front door.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-7">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Project types we take on</p>
              <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-stone-700">
                {scopeList.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-7">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Best fit</p>
              <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-stone-700">
                {fitList.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE CONTRACT — Cost-Plus vs GMP */}
      <section className="relative overflow-hidden bg-[#08111d] py-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at top, black 35%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at top, black 35%, transparent 80%)',
          }}
          aria-hidden="true"
        />
        <div className="relative container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">How we contract</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
              Two ways to build with us.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/75">
              Every full-contracting project runs on one of two agreement structures. Both are open-book — you always see the real numbers. The difference is who carries the risk on the final cost.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {engagementModels.map((model) => (
              <div
                key={model.name}
                className="flex flex-col rounded-[24px] border border-white/10 bg-white/[0.04] p-7 transition-all hover:-translate-y-0.5 hover:border-[#fa8c41]/40"
              >
                <div className="flex items-baseline gap-3">
                  <h3 className="text-2xl font-black tracking-tight text-white">{model.name}</h3>
                  {model.fullName ? (
                    <span className="text-sm font-semibold text-white/55">{model.fullName}</span>
                  ) : null}
                </div>
                <p className="mt-1 text-[11px] font-black uppercase tracking-[0.18em] text-[#fa8c41]">{model.tag}</p>

                <p className="mt-5 text-[15px] leading-relaxed text-white/80">{model.how}</p>

                <p className="mt-6 text-[11px] font-black uppercase tracking-[0.22em] text-white/45">Best when</p>
                <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-white/75">
                  {model.bestWhen.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#fa8c41] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Who likely uses it</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/75">{model.likelyUser}</p>
                </div>

                <p className="mt-5 text-[13px] leading-relaxed text-white/55">
                  <span className="font-bold text-white/75">The trade-off:</span> {model.tradeoff}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[20px] border border-[#fa8c41]/30 bg-[#fa8c41]/[0.08] p-6 sm:p-7">
            <p className="text-[15px] leading-relaxed text-white/85 sm:text-base">
              <span className="font-black text-[#fa8c41]">Quick rule:</span> Scope still evolving, or you want maximum flexibility and full transparency? Start with{' '}
              <span className="font-bold text-white">Cost-Plus.</span> Need a guaranteed ceiling — or your lender does? Go{' '}
              <span className="font-bold text-white">GMP.</span> Not sure which fits? We&rsquo;ll recommend the right structure on your review call.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED + NOT FOR */}
      <section className="bg-stone-50 py-16 sm:py-20">
        <div className="container-pro grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[24px] border border-stone-200 bg-white p-7 shadow-elev-1">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">What every engagement includes</p>
            <ul className="mt-5 grid gap-x-8 gap-y-3 text-[15px] leading-relaxed text-stone-700 sm:grid-cols-2">
              {includeList.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-white p-7 shadow-elev-1">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-stone-500">What this is not for</p>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-stone-700">
              {notFitList.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-stone-400 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* NEXT STEP + COMPANY FACTS */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-pro grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[24px] border border-stone-200 bg-white p-7 shadow-elev-1">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">What happens next</p>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700">
              Send the address, scope, timeline, and current status. We review fit, identify the right next step, and tell you whether this should move forward as full contracting &mdash; and on which structure &mdash; or start as a smaller support engagement first.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/#contact" className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-orange px-6 py-3.5 text-sm font-black uppercase tracking-[0.06em] text-white transition hover:-translate-y-0.5 hover:bg-orange-500">
                Request Full Contracting Review
              </Link>
              <a href="tel:+19804737249" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3.5 text-sm font-bold text-navy transition hover:border-orange hover:text-orange">
                Call (980) 473-7249
              </a>
            </div>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-7 shadow-elev-1">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Company facts</p>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-stone-700">
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>NC GC License #107724</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>Fully insured</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>5 years in business</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>15+ completed projects</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>Charlotte HQ, statewide North Carolina coverage</span></li>
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
