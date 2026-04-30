import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import TrustStrip from '@/components/TrustStrip';

const sections = [
  {
    id: 'realtors',
    title: 'For realtors',
    intro: 'Southern Cities helps realtors buy practical construction support for inspection issues, listing prep, repair decisions, and investor-buyer questions so deals and listings keep moving with clearer answers.',
    items: [
      {
        title: 'Inspection response',
        body: 'Use this when an inspection report needs a clearer construction read, repair priorities, or pricing direction before negotiation moves forward.',
      },
      {
        title: 'Listing prep',
        body: 'Use this when a seller needs help deciding what to fix, what to leave alone, and how to sequence prep work before the listing goes live.',
      },
      {
        title: 'Pre-LOI investor reviews',
        body: 'Use this when an investor-buyer needs a better rehab read before deciding how to price the opportunity or move further into the file.',
      },
    ],
    bestWhen:
      'You need faster, more practical construction answers without turning every deal or listing into a full contractor relationship.',
  },
  {
    id: 'contractors',
    title: 'For contractors',
    intro: 'Southern Cities gives contractors extra support capacity for permit administration, inspection coordination, paperwork follow-through, and recurring office help so more time stays focused on field production.',
    items: [
      {
        title: 'Permit administration',
        body: 'Use this when permit applications, plan-review responses, and municipal follow-up need to move forward without building more internal office load.',
      },
      {
        title: 'Inspection scheduling support',
        body: 'Use this when inspection coordination, correction follow-up, and rescheduling need tighter handling so the job can keep moving cleanly.',
      },
      {
        title: 'Office follow-up on active jobs',
        body: 'Use this when active projects need steadier help with documentation, owner follow-up, change-order handling, and recurring paperwork support.',
      },
    ],
    bestWhen:
      'You need back-office and project-support leverage without hiring a full internal office team first.',
  },
  {
    id: 'developers',
    title: 'For developers and landowners',
    intro: 'Southern Cities helps developers and landowners get earlier clarity on feasibility, budget, permit path, and project-control support for larger residential work, with full contracting available when the scope calls for it.',
    items: [
      {
        title: 'Early project review',
        body: 'Use this when you need a better read on cost, permit path, and execution complexity before larger commitments get made.',
      },
      {
        title: 'Permit handling on entitled projects',
        body: 'Use this when permit administration, submissions, and inspection coordination need stronger follow-through to keep the project moving.',
      },
      {
        title: 'Construction oversight on active builds',
        body: 'Use this when active residential work needs clearer milestone visibility, project-control support, and steadier execution follow-through.',
      },
    ],
    bestWhen:
      'You need the right support for a larger residential file before moving into deeper execution or full contracting.',
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
            Practical construction support for realtors, contractors, and developers.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/88 sm:text-xl">
            Southern Cities helps industry partners buy the right support at the right stage, from inspection response, listing prep, and permit administration to project-control help, recurring support, and full contracting when the scope calls for licensed execution.
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
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Need help choosing the right support?</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/85 sm:text-lg">
            Send the address and the situation, whether that is an inspection report, listing prep question, permit file, or active project. We will point you to the right support piece, review path, or quote path from <a href="mailto:orders@southerncitiesconstruction.com" className="underline hover:text-orange">orders@southerncitiesconstruction.com</a> or by phone.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="tel:+19804737249" className="inline-flex items-center justify-center rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-orange-500">
              Call (980) 473-7249
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
