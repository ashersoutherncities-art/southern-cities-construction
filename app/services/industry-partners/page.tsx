import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import TrustStrip from '@/components/TrustStrip';

const sections = [
  {
    id: 'realtors',
    title: 'For realtors',
    intro: 'Inspection items, listing prep, and investor-buyer rehab questions slow deals down. We are the licensed NC GC behind your construction-side answers.',
    items: [
      {
        title: 'Inspection response',
        body: "Your buyer's inspection came back with a list and the seller wants a real read on cost before negotiation. We turn around an itemized scope and pricing direction within 2 business days.",
      },
      {
        title: 'Listing prep',
        body: "Your seller has 30 days before listing and a punch list to clear before photos. We coordinate or execute the work under our GC license and keep the timeline aligned with your listing date.",
      },
      {
        title: 'Pre-LOI investor reviews',
        body: 'Your buyer is an investor and the deal hinges on rehab numbers. We deliver a pre-execution rehab read they can underwrite against — backed by 15+ completed NC rehabs.',
      },
    ],
    bestWhen:
      'Inspection items, listing prep, or investor-buyer rehab numbers are pulling you off the work of selling.',
  },
  {
    id: 'contractors',
    title: 'For contractors',
    intro: 'For licensed trade businesses and small GCs, we run the office and permit lane so the field stays productive.',
    items: [
      {
        title: 'Permit administration',
        body: "You have the trades and the work; you do not have the office bandwidth for permit applications, plan-review responses, and inspection coordination. We handle that lane on a per-project or retainer basis.",
      },
      {
        title: 'Inspection scheduling support',
        body: "Chasing inspectors and rescheduling around correction items is eating a day a week. We run the inspection process so your crews stay on task.",
      },
      {
        title: 'Office follow-up on active jobs',
        body: "Draws, owner updates, change orders, and the documentation work that does not generate billable hours but eats the week. We handle it on retainer.",
      },
    ],
    bestWhen:
      'Office and permit work are eating into the time your crews should be spending in the field.',
  },
  {
    id: 'developers',
    title: 'For developers and landowners',
    intro: 'For smaller residential developments and entitled sites that need a licensed NC GC to run permits and construction execution.',
    items: [
      {
        title: 'Early project review',
        body: "You are considering a site or a build and need a real read on cost, permitting, and execution complexity before larger commitments. We deliver a written project review tied to NC permit and inspection realities.",
      },
      {
        title: 'Permit handling on entitled projects',
        body: "You have entitlements but the permit phase is dragging. We run permit administration and inspection coordination across NC jurisdictions so the project stops stalling.",
      },
      {
        title: 'Construction oversight on active builds',
        body: "You do not want to be on site every week but the project needs tighter eyes than it has now. Owner's-rep oversight engagement under our GC license.",
      },
    ],
    bestWhen:
      'The project is bigger than a renovation, smaller than a master plan, and needs a licensed GC running construction-side execution.',
  },
];

export default function IndustryPartnersPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <SiteNav variant="solid" />

      <section className="relative overflow-hidden bg-navy-900 pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#163061_0%,#10254c_100%)]" />
        <div className="relative z-10 container-pro max-w-5xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Industry partners</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            GC-side support for realtors, contractors, and developers in North Carolina.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/88 sm:text-xl">
            Southern Cities is a licensed NC general contractor — #107724, Charlotte HQ, statewide coverage, 5 years and 15+ completed projects. This page covers how we plug in when realtors need an inspection or listing-prep answer, when trade contractors need permit and office support, and when developers or landowners need a GC to run permitting and execution on a smaller residential build.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-white/88">
            <span>NC GC License #107724</span>
            <span className="text-white/40">·</span>
            <span>Statewide NC · Charlotte HQ</span>
            <span className="text-white/40">·</span>
            <span>5 yrs · 15+ projects</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#realtors" className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500">
              Realtors
            </Link>
            <Link href="#contractors" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
              Contractors
            </Link>
            <Link href="#developers" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
              Developers &amp; Landowners
            </Link>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="py-16 sm:py-20">
        <div className="container-pro space-y-10">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="rounded-[28px] border border-stone-200 bg-stone-50 p-6 sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{section.title}</p>
              <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-stone-700">{section.intro}</p>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {section.items.map((item) => (
                  <div key={item.title} className="rounded-[24px] border border-stone-200 bg-white p-5 shadow-elev-1">
                    <h3 className="text-xl font-extrabold tracking-tight text-navy">{item.title}</h3>
                    <p className="mt-4 text-[15px] leading-[1.7] text-stone-700">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-[22px] border border-orange/20 bg-orange/5 px-5 py-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Best when</p>
                <p className="mt-3 text-sm font-semibold leading-[1.6] text-navy">{section.bestWhen}</p>
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="bg-navy-950 py-16 sm:py-20 text-white">
        <div className="container-pro max-w-4xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Want to talk about a specific file?</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/85 sm:text-lg">
            Send the address and the situation — inspection report, listing prep, permit file, or active job. We respond from <a href="mailto:orders@southerncitiesconstruction.com" className="underline hover:text-orange">orders@southerncitiesconstruction.com</a> or by phone.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="tel:+12523396146" className="inline-flex items-center justify-center rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-orange-500">
              Call (252) 339-6146
            </a>
            <a href="mailto:orders@southerncitiesconstruction.com" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white/20">
              Email Orders
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
