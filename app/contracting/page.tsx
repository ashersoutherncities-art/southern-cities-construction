import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import TrustStrip from '@/components/TrustStrip';

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

export default function ContractingPage() {
  return (
    <div className="min-h-screen bg-white text-navy">
      <SiteNav variant="solid" />

      <section className="relative overflow-hidden bg-navy-900 pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#163061_0%,#10254c_100%)]" />
        <div className="relative z-10 container-pro">
          <div className="max-w-4xl">
            <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              Full Contracting
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl">
              Full residential contracting with Southern Cities as the licensed GC of record.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl">
              This page is for projects that need one company carrying the work from planning through execution. Renovations, rehabs, additions, and new builds that need real coordination, permit handling, and accountable delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#contact" className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-orange-500">
                Request Full Contracting Review
              </Link>
              <Link href="/services" className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-orange hover:text-orange-200">
                Start with Project Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="border-b border-stone-200 bg-white py-14 sm:py-16">
        <div className="container-pro grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Best fit</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-stone-700">
              {fitList.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Price path</p>
            <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
              Full contracting is scoped after review. Price depends on scope, timeline, permit condition, site condition, and execution burden.
            </p>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What happens next</p>
            <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
              Send the address, scope, timeline, and current status. Southern Cities reviews fit, identifies the right next step, and tells you whether this should move forward as full contracting or a smaller support engagement first.
            </p>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Project types we take on</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-stone-700">
              {scopeList.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-14 sm:py-16">
        <div className="container-pro grid gap-6 lg:grid-cols-2">
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What is included</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-stone-700">
              {includeList.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What this is not for</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-stone-700">
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

      <section className="border-b border-stone-200 bg-white py-14 sm:py-16">
        <div className="container-pro grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Why use this page for ads</p>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700">
              This is a clean destination for people looking for a full contractor, not piecemeal support. It keeps full execution separate from the service-category pages and gives a simpler next step for ad traffic.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/#contact" className="inline-flex items-center justify-center rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-500">
                Request Full Contracting Review
              </Link>
              <a href="tel:+19804737249" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3.5 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                Call (980) 473-7249
              </a>
            </div>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Company facts</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-stone-700">
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
