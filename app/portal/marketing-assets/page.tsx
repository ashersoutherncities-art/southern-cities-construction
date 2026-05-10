import Link from 'next/link';
import ControlCenterNav from '@/components/ControlCenterNav';
import ControlCenterFooter from '@/components/ControlCenterFooter';
import {
  getTrackedLinkUrl,
  listMarketingAssets,
  listMarketingLinks,
  syncMarketingInfrastructure,
} from '@/lib/marketing';
import { formatCurrency, getControlCenterMetrics } from '@/lib/control-center';
import {
  addMarketingAssetAction,
  addMarketingLinkAction,
  syncMarketingAction,
} from './actions';

export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams?: {
    key?: string;
  };
};

const INDUSTRY_UPDATES = [
  {
    title: 'Permit and inspection delays',
    note: 'Track county backlogs, failed inspections, and correction loops. These are usually early warning signs of revenue drag.',
  },
  {
    title: 'Subcontractor capacity',
    note: 'Watch who is overloaded, who is responsive, and where bottlenecks are building before the field feels it.',
  },
  {
    title: 'Material price movement',
    note: 'Review any movement in core materials tied to active estimates, turns, and owner budgets.',
  },
  {
    title: 'Lead flow and close friction',
    note: 'Keep an eye on which offer pages are getting attention and where buyers are stalling before purchase or consultation.',
  },
];

const READY_AGENTS = [
  {
    name: 'Marketing operator',
    role: 'Campaign planning, asset cleanup, link creation, and landing-page conversion support.',
  },
  {
    name: 'Construction ops analyst',
    role: 'Project follow-up, permit bottlenecks, inspection issues, and workflow diagnosis.',
  },
  {
    name: 'KPI reviewer',
    role: 'Turn clicks, lead flow, product demand, and operating metrics into quick decisions.',
  },
  {
    name: 'Vendor and partner monitor',
    role: 'Track supplier, subcontractor, and partner communication that affects execution speed.',
  },
];

const COMPANY_SNAPSHOT = [
  {
    label: 'Southern Cities Construction',
    status: 'Primary focus',
    notes: 'Use this as the operating command center for construction marketing, product demand, and active execution visibility.',
  },
  {
    label: 'Southern Cities Realty',
    status: 'Secondary',
    notes: 'Can be added next for listing prep, inspection, and deal pipeline visibility.',
  },
  {
    label: 'Southern Cities Investors',
    status: 'Secondary',
    notes: 'Can be layered in after construction so investor funnels and partner traffic sit in the same control center.',
  },
];

const KPI_ROWS = [
  { label: 'Tracked link clicks', why: 'Shows demand by campaign, offer, and CTA placement.' },
  { label: 'Offer-page traffic', why: 'Shows which products are actually drawing attention.' },
  { label: 'Lead submissions', why: 'Separates curiosity from real buying action.' },
  { label: 'Calls booked', why: 'Shows whether traffic is turning into conversation.' },
  { label: 'Paid product checkouts', why: 'Shows which fixed-price products are selling.' },
  { label: 'Permit/inspection bottlenecks', why: 'Gives an at-a-glance operating constraint view.' },
];

function Input({ name, placeholder, defaultValue }: { name: string; placeholder: string; defaultValue?: string }) {
  return (
    <input
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-stone-400"
    />
  );
}

function StatCard({ label, value, note }: { label: string; value: string | number; note: string }) {
  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
      <p className="text-sm text-stone-500">{label}</p>
      <p className="mt-3 text-3xl font-extrabold text-navy-900">{value}</p>
      <p className="mt-2 text-sm text-stone-600">{note}</p>
    </div>
  );
}

export default async function MarketingAssetsPage({ searchParams }: PageProps) {
  const expectedKey = process.env.MARKETING_PORTAL_ACCESS_KEY;
  const accessKey = searchParams?.key || '';

  if (!expectedKey) {
    return (
      <main className="min-h-screen bg-stone-50">
        <ControlCenterNav />
        <section className="container-pro py-20">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-amber-900 shadow-elev-1">
            <p className="text-sm font-bold uppercase tracking-[0.2em]">Control center unavailable</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Set MARKETING_PORTAL_ACCESS_KEY first</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed">
              Add MARKETING_PORTAL_ACCESS_KEY to the environment, then open /portal/marketing-assets?key=YOUR_KEY.
            </p>
          </div>
        </section>
        <ControlCenterFooter />
      </main>
    );
  }

  if (accessKey !== expectedKey) {
    return (
      <main className="min-h-screen bg-stone-50">
        <ControlCenterNav />
        <section className="container-pro py-20">
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-900 shadow-elev-1">
            <p className="text-sm font-bold uppercase tracking-[0.2em]">Private internal tool</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Access key required</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed">
              Open this page with the internal key in the query string. Example: /portal/marketing-assets?key=YOUR_KEY.
            </p>
          </div>
        </section>
        <ControlCenterFooter />
      </main>
    );
  }

  let assets = [] as Awaited<ReturnType<typeof listMarketingAssets>>;
  let links = [] as Awaited<ReturnType<typeof listMarketingLinks>>;
  let metrics: Awaited<ReturnType<typeof getControlCenterMetrics>> | null = null;
  let loadError = '';

  try {
    await syncMarketingInfrastructure();
    [assets, links, metrics] = await Promise.all([
      listMarketingAssets(),
      listMarketingLinks(),
      getControlCenterMetrics(),
    ]);
  } catch (err) {
    loadError = err instanceof Error ? err.message : 'Unknown control center error';
  }

  const topLink = links[0] || null;
  const totalClicks = links.reduce((sum, link) => sum + Number(link.click_count || 0), 0);
  const infraAssets = assets.filter((asset) => asset.source_type === 'infrastructure').length;
  const manualAssets = assets.filter((asset) => asset.source_type === 'manual').length;
  const landingPages = assets.filter((asset) => asset.asset_type === 'landing_page').length;
  const trackedCampaigns = new Set(links.map((link) => link.campaign).filter(Boolean)).size;
  const paidRevenue = metrics ? formatCurrency(metrics.totalRevenueCents) : '$0';

  return (
    <main className="min-h-screen bg-stone-50">
      <ControlCenterNav />

      <section className="container-pro py-12 sm:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Southern Cities Control Center</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-900">Southern Cities Construction briefing</h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone-600 sm:text-base">
              A private reports surface for Southern Cities Construction with executive metrics, operator lanes, market watch items, and tracked demand signals.
            </p>
          </div>

          <form action={syncMarketingAction}>
            <input type="hidden" name="access_key" value={accessKey} />
            <button className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy">
              Sync infrastructure registry
            </button>
          </form>
        </div>

        {loadError ? (
          <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-900 shadow-elev-1">
            <p className="font-semibold">Database setup still needs one step.</p>
            <p className="mt-2">Apply supabase/marketing_assets.sql and confirm Supabase env vars are present. Current error: {loadError}</p>
          </div>
        ) : null}

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <StatCard label="Assets in catalog" value={assets.length} note={`${infraAssets} synced from infrastructure, ${manualAssets} manual.`} />
          <StatCard label="Tracked links" value={links.length} note="Use /go/[slug] for campaigns, email, QR, and social." />
          <StatCard label="Recorded clicks" value={totalClicks} note="This is the first clean demand signal for your product links." />
          <StatCard label="Landing pages" value={landingPages} note="Shows how much of the marketing stack has direct-link destinations." />
          <StatCard label="Tracked campaigns" value={trackedCampaigns} note={topLink ? `Top link: ${topLink.label}` : 'Seed links are ready to use.'} />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <StatCard label="Service inquiries" value={metrics?.serviceInquiries || 0} note="General inbound demand from site forms." />
          <StatCard label="Realtor inquiries" value={metrics?.realtorInquiries || 0} note="Listing prep and inspection-response demand." />
          <StatCard label="Resource requests" value={metrics?.resourceRequests || 0} note="Lead magnets and paid resource interest." />
          <StatCard label="Paid orders" value={metrics?.paidOrders || 0} note={`${metrics?.totalOrders || 0} total orders recorded in the system.`} />
          <StatCard label="Revenue tracked" value={paidRevenue} note="Paid checkout revenue recorded in Supabase." />
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">Executive briefing</h2>
                  <p className="mt-2 text-sm text-stone-600">What matters most for Southern Cities Construction right now.</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Industry updates to watch</p>
                  <div className="mt-4 space-y-4">
                    {INDUSTRY_UPDATES.map((item) => (
                      <div key={item.title}>
                        <p className="font-semibold text-navy-900">{item.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-stone-600">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Ready AI operator roles</p>
                  <div className="mt-4 space-y-4">
                    {READY_AGENTS.map((agent) => (
                      <div key={agent.name}>
                        <p className="font-semibold text-navy-900">{agent.name}</p>
                        <p className="mt-1 text-sm leading-relaxed text-stone-600">{agent.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">Company stack</h2>
              <p className="mt-2 text-sm text-stone-600">Start with construction, then layer in the other Southern Cities companies into the same command view.</p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {COMPANY_SNAPSHOT.map((company) => (
                  <div key={company.label} className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{company.status}</p>
                    <p className="mt-3 text-lg font-extrabold tracking-tight text-navy-900">{company.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{company.notes}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">Asset registry</h2>
                  <p className="mt-2 text-sm text-stone-600">Core website surfaces and brand files live here as the operating catalog.</p>
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-stone-500">
                    <tr className="border-b border-stone-200">
                      <th className="px-3 py-3 font-semibold">Asset</th>
                      <th className="px-3 py-3 font-semibold">Type</th>
                      <th className="px-3 py-3 font-semibold">Source</th>
                      <th className="px-3 py-3 font-semibold">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets.map((asset) => (
                      <tr key={asset.id} className="border-b border-stone-100 align-top">
                        <td className="px-3 py-3">
                          <p className="font-semibold text-navy-900">{asset.title}</p>
                          <p className="mt-1 text-xs text-stone-500">{asset.asset_key}</p>
                        </td>
                        <td className="px-3 py-3 text-stone-700">{asset.asset_type}</td>
                        <td className="px-3 py-3">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${asset.source_type === 'infrastructure' ? 'bg-navy-100 text-navy-900' : 'bg-orange-100 text-orange-700'}`}>
                            {asset.source_type}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-stone-700">
                          {asset.public_url ? (
                            <Link className="underline underline-offset-4" href={asset.public_url} target="_blank">
                              {asset.page_path || asset.storage_path || asset.public_url}
                            </Link>
                          ) : (
                            asset.page_path || asset.storage_path || 'Internal record'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">Demand link tracking</h2>
              <p className="mt-2 text-sm text-stone-600">Use the tracked URL in ads, email, QR codes, or partner placements to centralize click counts.</p>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-stone-500">
                    <tr className="border-b border-stone-200">
                      <th className="px-3 py-3 font-semibold">Link</th>
                      <th className="px-3 py-3 font-semibold">Tracked URL</th>
                      <th className="px-3 py-3 font-semibold">Clicks</th>
                      <th className="px-3 py-3 font-semibold">Destination</th>
                    </tr>
                  </thead>
                  <tbody>
                    {links.map((link) => (
                      <tr key={link.id} className="border-b border-stone-100 align-top">
                        <td className="px-3 py-3">
                          <p className="font-semibold text-navy-900">{link.label}</p>
                          <p className="mt-1 text-xs text-stone-500">{link.slug} · {link.channel}</p>
                        </td>
                        <td className="px-3 py-3 text-stone-700">
                          <code className="rounded bg-stone-100 px-2 py-1 text-xs">{getTrackedLinkUrl(link.slug)}</code>
                        </td>
                        <td className="px-3 py-3 text-navy-900 font-semibold">{link.click_count}</td>
                        <td className="px-3 py-3 text-stone-700">
                          <Link className="underline underline-offset-4" href={link.destination_url} target="_blank">
                            {link.destination_url}
                          </Link>
                          <p className="mt-1 text-xs text-stone-500">
                            {link.campaign || 'no campaign'}{link.medium ? ` · ${link.medium}` : ''}
                            {link.last_clicked_at ? ` · last click ${new Date(link.last_clicked_at).toLocaleString('en-US')}` : ''}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">Operating scoreboard</h2>
              <p className="mt-2 text-sm text-stone-600">These are the first operating KPIs I would want visible every time you open the control center.</p>
              <div className="mt-5 space-y-3">
                {KPI_ROWS.map((row) => (
                  <div key={row.label} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                    <p className="font-semibold text-navy-900">{row.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-stone-600">{row.why}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">Add registry item</h2>
              <p className="mt-2 text-sm text-stone-600">Store campaign files, landing pages, print pieces, or other catalog items in the DB.</p>
              <form action={addMarketingAssetAction} className="mt-5 space-y-3">
                <input type="hidden" name="access_key" value={accessKey} />
                <Input name="asset_key" placeholder="asset key, for example spring-mailer-2026" />
                <Input name="title" placeholder="human title" />
                <Input name="asset_type" placeholder="asset type, for example flyer or landing_page" defaultValue="brand_asset" />
                <Input name="channel" placeholder="channel, for example website or print" defaultValue="website" />
                <Input name="page_path" placeholder="page path if relevant" />
                <Input name="public_url" placeholder="public URL if hosted" />
                <Input name="storage_path" placeholder="file path or storage key" />
                <Input name="preview_image_url" placeholder="preview image URL" />
                <textarea name="notes" placeholder="notes" className="min-h-[100px] w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-stone-400" />
                <input type="hidden" name="status" value="active" />
                <button className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500">
                  Save asset
                </button>
              </form>
            </section>

            <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">Create tracked route</h2>
              <p className="mt-2 text-sm text-stone-600">Create a reusable redirect slug, then distribute the tracked URL anywhere marketing runs.</p>
              <form action={addMarketingLinkAction} className="mt-5 space-y-3">
                <input type="hidden" name="access_key" value={accessKey} />
                <Input name="slug" placeholder="slug, for example investor-postcard" />
                <Input name="label" placeholder="label" />
                <Input name="destination_url" placeholder="https://destination.example" />
                <Input name="channel" placeholder="channel" defaultValue="website" />
                <Input name="campaign" placeholder="campaign" />
                <Input name="medium" placeholder="medium" />
                <Input name="asset_key" placeholder="related asset key, optional" />
                <textarea name="notes" placeholder="notes" className="min-h-[100px] w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-stone-400" />
                <input type="hidden" name="status" value="active" />
                <button className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500">
                  Save tracked link
                </button>
              </form>
            </section>
          </div>
        </div>
      </section>

      <ControlCenterFooter />
    </main>
  );
}
