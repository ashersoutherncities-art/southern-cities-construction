import { createHash } from 'crypto';
import { SupabaseClient } from '@supabase/supabase-js';
import { getServiceClient } from '@/lib/supabase';
import {
  INFRASTRUCTURE_MARKETING_ASSETS,
  INFRASTRUCTURE_MARKETING_LINKS,
  MarketingAssetSeed,
  MarketingLinkSeed,
} from '@/lib/marketing-registry';

export type MarketingAssetRow = {
  id: number;
  asset_key: string;
  title: string;
  asset_type: string;
  channel: string;
  status: string;
  source_type: string;
  page_path: string | null;
  public_url: string | null;
  storage_path: string | null;
  preview_image_url: string | null;
  notes: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
};

export type MarketingLinkRow = {
  id: number;
  slug: string;
  label: string;
  destination_url: string;
  channel: string;
  campaign: string | null;
  medium: string | null;
  source_type: string;
  asset_key: string | null;
  status: string;
  click_count: number;
  last_clicked_at: string | null;
  notes: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
};

function getClient(client?: SupabaseClient) {
  return client ?? getServiceClient();
}

function normalizeAsset(input: MarketingAssetSeed) {
  return {
    asset_key: input.asset_key.trim(),
    title: input.title.trim(),
    asset_type: input.asset_type.trim(),
    channel: input.channel.trim(),
    status: input.status.trim(),
    source_type: input.source_type,
    page_path: input.page_path?.trim() || null,
    public_url: input.public_url?.trim() || null,
    storage_path: input.storage_path?.trim() || null,
    preview_image_url: input.preview_image_url?.trim() || null,
    notes: input.notes?.trim() || null,
    metadata: input.metadata ?? {},
  };
}

function normalizeLink(input: MarketingLinkSeed) {
  return {
    slug: input.slug.trim(),
    label: input.label.trim(),
    destination_url: input.destination_url.trim(),
    channel: input.channel.trim(),
    campaign: input.campaign?.trim() || null,
    medium: input.medium?.trim() || null,
    source_type: input.source_type,
    asset_key: input.asset_key?.trim() || null,
    status: input.status.trim(),
    notes: input.notes?.trim() || null,
    metadata: input.metadata ?? {},
  };
}

export async function syncMarketingInfrastructure(client?: SupabaseClient) {
  const supabase = getClient(client);

  const assetPayload = INFRASTRUCTURE_MARKETING_ASSETS.map(normalizeAsset);
  const linkPayload = INFRASTRUCTURE_MARKETING_LINKS.map(normalizeLink);

  const [{ error: assetError }, { error: linkError }] = await Promise.all([
    supabase.from('marketing_assets').upsert(assetPayload, { onConflict: 'asset_key' }),
    supabase.from('marketing_links').upsert(linkPayload, { onConflict: 'slug' }),
  ]);

  if (assetError) throw assetError;
  if (linkError) throw linkError;

  return {
    assetsSynced: assetPayload.length,
    linksSynced: linkPayload.length,
    syncedAt: new Date().toISOString(),
  };
}

export async function listMarketingAssets(client?: SupabaseClient) {
  const supabase = getClient(client);
  const { data, error } = await supabase
    .from('marketing_assets')
    .select('*')
    .order('source_type', { ascending: true })
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as MarketingAssetRow[];
}

export async function listMarketingLinks(client?: SupabaseClient) {
  const supabase = getClient(client);
  const { data, error } = await supabase
    .from('marketing_links')
    .select('*')
    .order('click_count', { ascending: false })
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as MarketingLinkRow[];
}

export async function createMarketingAsset(input: MarketingAssetSeed, client?: SupabaseClient) {
  const supabase = getClient(client);
  const payload = normalizeAsset({ ...input, source_type: input.source_type ?? 'manual' });
  const { data, error } = await supabase
    .from('marketing_assets')
    .insert(payload)
    .select('*')
    .single();

  if (error) throw error;
  return data as MarketingAssetRow;
}

export async function createMarketingLink(input: MarketingLinkSeed, client?: SupabaseClient) {
  const supabase = getClient(client);
  const payload = normalizeLink({ ...input, source_type: input.source_type ?? 'manual' });
  const { data, error } = await supabase
    .from('marketing_links')
    .insert(payload)
    .select('*')
    .single();

  if (error) throw error;
  return data as MarketingLinkRow;
}

export async function getMarketingLinkBySlug(slug: string, client?: SupabaseClient) {
  const supabase = getClient(client);
  const { data, error } = await supabase
    .from('marketing_links')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .maybeSingle();

  if (error) throw error;
  return (data as MarketingLinkRow | null) ?? null;
}

export async function recordMarketingLinkClick(
  link: Pick<MarketingLinkRow, 'id' | 'slug' | 'click_count'>,
  details: { referer?: string | null; userAgent?: string | null; ip?: string | null },
  client?: SupabaseClient
) {
  const supabase = getClient(client);
  const ipHash = details.ip
    ? createHash('sha256').update(details.ip).digest('hex').slice(0, 16)
    : null;

  const [{ error: updateError }, { error: insertError }] = await Promise.all([
    supabase
      .from('marketing_links')
      .update({
        click_count: (link.click_count || 0) + 1,
        last_clicked_at: new Date().toISOString(),
      })
      .eq('id', link.id),
    supabase.from('marketing_link_events').insert({
      marketing_link_id: link.id,
      slug: link.slug,
      referer: details.referer || null,
      user_agent: details.userAgent || null,
      ip_hash: ipHash,
    }),
  ]);

  if (updateError) throw updateError;
  if (insertError) throw insertError;
}

export function getTrackedLinkUrl(slug: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://southerncitiesconstruction.com';
  return `${siteUrl}/go/${slug}`;
}
