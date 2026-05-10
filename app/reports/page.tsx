import Link from 'next/link';
import ControlCenterNav from '@/components/ControlCenterNav';
import ControlCenterFooter from '@/components/ControlCenterFooter';
import { getSouthernCitiesConstructionInventory, summarizeInventory } from '@/lib/link-inventory';

export default function ReportsPage() {
  const items = getSouthernCitiesConstructionInventory();
  const summary = summarizeInventory(items);
  const grouped = {
    core: items.filter((item) => item.kind === 'core'),
    avatars: items.filter((item) => item.kind === 'avatar'),
    services: items.filter((item) => item.kind === 'service'),
    landingPages: items.filter((item) => item.kind === 'landing_page'),
  };

  const sections: Array<{ label: string; list: typeof items }> = [
    { label: 'Direct-link landing pages', list: grouped.landingPages },
    { label: 'Service pages', list: grouped.services },
    { label: 'Audience pages', list: grouped.avatars },
    { label: 'Core website pages', list: grouped.core },
  ];

  return (
    <main className="min-h-screen bg-stone-50">
      <ControlCenterNav />

      <section className="border-b border-stone-200 bg-white">
        <div className="container-pro py-12 sm:py-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">SCCOPS.AI</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-900">Southern Cities Construction site inventory</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone-600 sm:text-base">
            One place to see the live website links, service pages, and direct-link landing pages tied to Southern Cities Construction.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6">
              <p className="text-sm text-stone-500">Total tracked links</p>
              <p className="mt-3 text-3xl font-extrabold text-navy-900">{summary.total}</p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6">
              <p className="text-sm text-stone-500">Core website pages</p>
              <p className="mt-3 text-3xl font-extrabold text-navy-900">{summary.core}</p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6">
              <p className="text-sm text-stone-500">Service pages</p>
              <p className="mt-3 text-3xl font-extrabold text-navy-900">{summary.services}</p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6">
              <p className="text-sm text-stone-500">Direct-link landing pages</p>
              <p className="mt-3 text-3xl font-extrabold text-navy-900">{summary.landingPages}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-pro py-10 space-y-8">
        {sections.map(({ label, list }) => (
          <section key={label} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
            <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">{label}</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-stone-500">
                  <tr className="border-b border-stone-200">
                    <th className="px-3 py-3 font-semibold">Title</th>
                    <th className="px-3 py-3 font-semibold">Path</th>
                    <th className="px-3 py-3 font-semibold">Audience</th>
                    <th className="px-3 py-3 font-semibold">Open</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item) => (
                    <tr key={item.path} className="border-b border-stone-100 align-top">
                      <td className="px-3 py-3">
                        <p className="font-semibold text-navy-900">{item.title}</p>
                        {item.hidden ? <p className="mt-1 text-xs text-orange">Hidden from normal browsing</p> : null}
                      </td>
                      <td className="px-3 py-3 text-stone-700">
                        <code className="rounded bg-stone-100 px-2 py-1 text-xs">{item.path}</code>
                      </td>
                      <td className="px-3 py-3 text-stone-700">{item.audience || '—'}</td>
                      <td className="px-3 py-3 text-stone-700">
                        <Link className="font-semibold text-orange hover:text-orange-500" href={item.url} target="_blank">
                          Open link
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </section>

      <ControlCenterFooter />
    </main>
  );
}
