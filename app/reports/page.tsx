import Link from 'next/link';
import ControlCenterNav from '@/components/ControlCenterNav';
import ControlCenterFooter from '@/components/ControlCenterFooter';
import {
  getSouthernCitiesConstructionInventory,
  summarizeInventory,
  KIND_TREATMENT,
  type InventoryKind,
  type InventoryLink,
} from '@/lib/link-inventory';

export default function ReportsPage() {
  const items = getSouthernCitiesConstructionInventory();
  const summary = summarizeInventory(items);
  const grouped: Record<InventoryKind, InventoryLink[]> = {
    core: items.filter((item) => item.kind === 'core'),
    avatar: items.filter((item) => item.kind === 'avatar'),
    service: items.filter((item) => item.kind === 'service'),
    landing_page: items.filter((item) => item.kind === 'landing_page'),
  };

  const sectionsOrder: InventoryKind[] = ['landing_page', 'service', 'avatar', 'core'];

  return (
    <main className="min-h-screen bg-stone-50">
      <ControlCenterNav />

      <section className="border-b border-stone-200 bg-white">
        <div className="container-pro py-12 sm:py-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">SCCOPS.AI</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-900">
            Southern Cities Construction site inventory
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone-600 sm:text-base">
            Every live URL on southerncitiesconstruction.com — with name, category, icon, and description so the dashboard
            always reflects the real current state of the site.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {(
              [
                { label: 'Direct-link landing pages', value: summary.landingPages, kind: 'landing_page' as const },
                { label: 'Service pages', value: summary.services, kind: 'service' as const },
                { label: 'Audience pages', value: summary.avatars, kind: 'avatar' as const },
                { label: 'Core website pages', value: summary.core, kind: 'core' as const },
              ]
            ).map((stat) => {
              const treatment = KIND_TREATMENT[stat.kind];
              return (
                <div
                  key={stat.kind}
                  className={`rounded-3xl border bg-stone-50 p-6 ${treatment.badge}`}
                >
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span className="text-base">{treatment.icon}</span>
                    <span>{stat.label}</span>
                  </div>
                  <p className="mt-3 text-3xl font-extrabold text-navy-900">{stat.value}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600">
            <span className="font-semibold text-navy-900">{summary.total}</span>
            <span>tracked URLs across {Object.keys(grouped).length} categories</span>
          </div>
        </div>
      </section>

      <section className="container-pro space-y-8 py-10">
        {sectionsOrder.map((kind) => {
          const list = grouped[kind];
          if (!list.length) return null;
          const treatment = KIND_TREATMENT[kind];
          return (
            <section
              key={kind}
              className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-elev-1"
            >
              <header className={`flex items-center gap-3 px-6 py-4 ${treatment.accent}`}>
                <span className="text-2xl leading-none">{treatment.icon}</span>
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight">{treatment.label}</h2>
                  <p className="text-xs opacity-80">{list.length} entries</p>
                </div>
              </header>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-stone-500">
                    <tr className="border-b border-stone-200 bg-stone-50">
                      <th className="px-3 py-3 font-semibold">Name</th>
                      <th className="px-3 py-3 font-semibold">Description</th>
                      <th className="px-3 py-3 font-semibold">Path</th>
                      <th className="px-3 py-3 font-semibold">Audience</th>
                      <th className="px-3 py-3 font-semibold">Open</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((item) => (
                      <tr key={item.path} className="border-b border-stone-100 align-top last:border-b-0">
                        <td className="px-3 py-4">
                          <div className="flex items-start gap-3">
                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg ${treatment.badge}`}
                              aria-hidden="true"
                            >
                              {item.icon}
                            </span>
                            <div>
                              <p className="font-semibold text-navy-900">{item.title}</p>
                              {item.hidden ? (
                                <p className="mt-1 text-xs font-semibold text-orange">Hidden from normal browsing</p>
                              ) : null}
                            </div>
                          </div>
                        </td>
                        <td className="max-w-md px-3 py-4 text-stone-600">
                          <p className="leading-relaxed">{item.description}</p>
                        </td>
                        <td className="px-3 py-4 text-stone-700">
                          <code className="rounded bg-stone-100 px-2 py-1 text-xs">{item.path}</code>
                        </td>
                        <td className="px-3 py-4 text-stone-700">{item.audience || '—'}</td>
                        <td className="px-3 py-4 text-stone-700">
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
          );
        })}
      </section>

      <ControlCenterFooter />
    </main>
  );
}
