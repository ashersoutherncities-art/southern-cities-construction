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
        <div className="relative z-10 container-pro max-w-5xl">
          <p className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#f58220] motion-safe:animate-[heroRise_900ms_ease-out]">
            <span className="block h-px w-10 bg-[#f58220]/80" aria-hidden="true" />
            Industry partners
          </p>
          <h1 className="mt-6 text-[2.75rem] font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-[3.75rem] lg:text-[4.5rem] motion-safe:animate-[heroRise_1000ms_ease-out_0.1s_both]">
            Practical construction support for <span className="text-[#f58220]">realtors, contractors, and developers.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-[1.55] text-white/85 sm:text-xl motion-safe:animate-[heroRise_1100ms_ease-out_0.2s_both]">
            Southern Cities helps industry partners buy the right support at the right stage, from inspection response, listing prep, and permit administration to project-control help, recurring support, and full contracting when the scope calls for licensed execution.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-white/80 motion-safe:animate-[heroRise_1200ms_ease-out_0.3s_both]">
            <span>NC GC License #107724</span>
            <span className="text-white/30">·</span>
            <span>Statewide NC · Charlotte HQ</span>
            <span className="text-white/30">·</span>
            <span>5 yrs · 15+ projects</span>
          </div>
          <div className="mt-9 flex flex-wrap gap-3 motion-safe:animate-[heroRise_1300ms_ease-out_0.4s_both]">
            <Link href="#realtors" className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-[#f58220] px-7 py-3.5 text-sm font-black uppercase tracking-[0.06em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.45)] transition-all hover:-translate-y-0.5 hover:bg-[#ff9229]">
              Realtors <span aria-hidden="true">→</span>
            </Link>
            <Link href="#contractors" className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/5">
              Contractors
            </Link>
            <Link href="#developers" className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/5">
              Developers &amp; Landowners
            </Link>
          </div>
        </div>
        <style>{`
@keyframes heroFloat { 0%, 100% { transform: scale(1.04) translate3d(0, 0, 0); } 50% { transform: scale(1.08) translate3d(-12px, -8px, 0); } }
@keyframes heroRise { 0% { opacity: 0; transform: translate3d(0, 24px, 0); filter: blur(4px); } 60% { filter: blur(0); } 100% { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); } }
`}</style>
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
