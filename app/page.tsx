import Link from 'next/link';
import ControlCenterNav from '@/components/ControlCenterNav';
import ControlCenterFooter from '@/components/ControlCenterFooter';

const COMPANY_MODULES = [
  {
    name: 'Southern Cities Construction',
    status: 'Live first module',
    note: 'Track demand, orders, revenue, assets, marketing links, and execution visibility in one place.',
  },
  {
    name: 'Southern Cities Realty',
    status: 'Next module',
    note: 'Add listing pipeline, inspection activity, client demand, and agent-level performance next.',
  },
  {
    name: 'Southern Cities Investors',
    status: 'Next module',
    note: 'Add investor offers, partner interest, referral traffic, and deal review demand next.',
  },
];

const EXEC_CARDS = [
  {
    title: 'Industry updates',
    detail: 'Dedicated feed for permit changes, inspection trends, material pressure, and market shifts.',
  },
  {
    title: 'AI operator panel',
    detail: 'Ready sub-agents for marketing, operations, KPI review, and partner management.',
  },
  {
    title: 'KPI dashboards',
    detail: 'At-a-glance scoreboards for each company with demand, conversion, and execution health.',
  },
  {
    title: 'Executive overview',
    detail: 'One place to see what each company has going on without digging through separate tools.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <ControlCenterNav />

      <section className="bg-navy-900 py-20 text-white">
        <div className="container-pro grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange">Executive operating system</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Southern Cities Control Center
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/78 sm:text-lg">
              A standalone Vercel app for company visibility, AI operator workflows, demand tracking, and executive dashboards. Southern Cities Construction is the first active module.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/portal/marketing-assets"
                className="inline-flex items-center justify-center rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
              >
                Open command center
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {EXEC_CARDS.map((card) => (
              <div key={card.title} className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
                <p className="text-lg font-extrabold tracking-tight">{card.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/72">{card.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-pro py-14 sm:py-18">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Company modules</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900">Built to expand across your companies</h2>
          <p className="mt-4 text-sm leading-relaxed text-stone-600 sm:text-base">
            Construction comes first. Then we layer in the other Southern Cities businesses so you can see performance, activity, and bottlenecks across the whole stack.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {COMPANY_MODULES.map((module) => (
            <div key={module.name} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{module.status}</p>
              <h3 className="mt-3 text-xl font-extrabold tracking-tight text-navy-900">{module.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{module.note}</p>
            </div>
          ))}
        </div>
      </section>

      <ControlCenterFooter />
    </main>
  );
}
