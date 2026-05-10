import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import {
  getTrackedLinkUrl,
  listMarketingAssets,
  listMarketingLinks,
  syncMarketingInfrastructure,
} from '@/lib/marketing';
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

export default async function MarketingAssetsPage({ searchParams }: PageProps) {
  const expectedKey = process.env.MARKETING_PORTAL_ACCESS_KEY;
  const accessKey = searchParams?.key || '';

  if (!expectedKey) {
    return (
      <main className="min-h-screen bg-stone-50">
        <SiteNav variant="solid" />
        <section className="container-pro py-20">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-amber-900 shadow-elev-1">
            <p className="text-sm font-bold uppercase tracking-[0.2em]">Marketing portal unavailable</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Set MARKETING_PORTAL_ACCESS_KEY first</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed">
              This MVP ships with a lightweight internal access gate. Add MARKETING_PORTAL_ACCESS_KEY to your environment,
              then visit /portal/marketing-assets?key=YOUR_KEY.
            </p>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  if (accessKey !== expectedKey) {
    return (
      <main className="min-h-screen bg-stone-50">
        <SiteNav variant="solid" />
        <section className="container-pro py-20">
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-900 shadow-elev-1">
            <p className="text-sm font-bold uppercase tracking-[0.2em]">Private internal tool</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Access key required</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed">
              Open this page with the internal key in the query string. Example: /portal/marketing-assets?key=YOUR_KEY.
            </p>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  let assets = [] as Awaited<ReturnType<typeof listMarketingAssets>>;
  let links = [] as Awaited<ReturnType<typeof listMarketingLinks>>;
  let loadError = '';

  try {
    await syncMarketingInfrastructure();
    [assets, links] = await Promise.all([listMarketingAssets(), listMarketingLinks()]);
  } catch (err) {
    loadError = err instanceof Error ? err.message : 'Unknown marketing portal error';
  }

  const topLink = links[0] || null;
  const totalClicks = links.reduce((sum, link) => sum + Number(link.click_count || 0), 0);
  const infraAssets = assets.filter((asset) => asset.source_type === 'infrastructure').length;
  const manualAssets = assets.filter((asset) => asset.source_type === 'manual').length;

  return (
    <main className="min-h-screen bg-stone-50">
      <SiteNav variant="solid" />

      <section className="container-pro py-12 sm:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Internal marketing ops</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-900">Marketing asset management platform</h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone-600 sm:text-base">
              Database-backed inventory for Southern Cities marketing pages, brand assets, and tracked links. Infrastructure-owned
              entries sync from code so website changes can refresh the database instead of drifting away from it.
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

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-sm text-stone-500">Assets in catalog</p>
            <p className="mt-3 text-3xl font-extrabold text-navy-900">{assets.length}</p>
            <p className="mt-2 text-sm text-stone-600">{infraAssets} synced from infrastructure, {manualAssets} manual.</p>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-sm text-stone-500">Tracked links</p>
            <p className="mt-3 text-3xl font-extrabold text-navy-900">{links.length}</p>
            <p className="mt-2 text-sm text-stone-600">Every link can route through /go/[slug].</p>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-sm text-stone-500">Total recorded clicks</p>
            <p className="mt-3 text-3xl font-extrabold text-navy-900">{totalClicks}</p>
            <p className="mt-2 text-sm text-stone-600">Click counts update on tracked redirect usage.</p>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-sm text-stone-500">Top tracked link</p>
            <p className="mt-3 text-lg font-extrabold text-navy-900">{topLink?.label || 'No clicks yet'}</p>
            <p className="mt-2 text-sm text-stone-600">{topLink ? `${topLink.click_count} clicks` : 'Seed links are ready to use.'}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">Asset inventory</h2>
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
              <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">Link analytics</h2>
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
              <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">Add asset</h2>
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
              <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">Add tracked link</h2>
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

      <SiteFooter />
    </main>
  );
}
