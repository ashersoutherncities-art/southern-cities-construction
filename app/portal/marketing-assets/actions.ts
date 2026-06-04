'use server';

import { revalidatePath } from 'next/cache';
import { createMarketingAsset, createMarketingLink, syncMarketingInfrastructure } from '@/lib/marketing';
import { safeKeyEqual } from '@/lib/secure-compare';

function ensureAccessKey(formData: FormData) {
  const expected = process.env.MARKETING_PORTAL_ACCESS_KEY;
  if (!expected) {
    throw new Error('MARKETING_PORTAL_ACCESS_KEY is not configured.');
  }
  const received = String(formData.get('access_key') || '');
  if (!safeKeyEqual(received, expected)) {
    throw new Error('Invalid access key.');
  }
}

export async function syncMarketingAction(formData: FormData) {
  ensureAccessKey(formData);
  await syncMarketingInfrastructure();
  revalidatePath('/portal/marketing-assets');
}

export async function addMarketingAssetAction(formData: FormData) {
  ensureAccessKey(formData);

  await createMarketingAsset({
    asset_key: String(formData.get('asset_key') || ''),
    title: String(formData.get('title') || ''),
    asset_type: String(formData.get('asset_type') || 'brand_asset'),
    channel: String(formData.get('channel') || 'website'),
    status: String(formData.get('status') || 'active'),
    source_type: 'manual',
    page_path: String(formData.get('page_path') || '') || null,
    public_url: String(formData.get('public_url') || '') || null,
    storage_path: String(formData.get('storage_path') || '') || null,
    preview_image_url: String(formData.get('preview_image_url') || '') || null,
    notes: String(formData.get('notes') || '') || null,
  });

  revalidatePath('/portal/marketing-assets');
}

export async function addMarketingLinkAction(formData: FormData) {
  ensureAccessKey(formData);

  await createMarketingLink({
    slug: String(formData.get('slug') || ''),
    label: String(formData.get('label') || ''),
    destination_url: String(formData.get('destination_url') || ''),
    channel: String(formData.get('channel') || 'website'),
    campaign: String(formData.get('campaign') || '') || null,
    medium: String(formData.get('medium') || '') || null,
    source_type: 'manual',
    asset_key: String(formData.get('asset_key') || '') || null,
    status: String(formData.get('status') || 'active'),
    notes: String(formData.get('notes') || '') || null,
  });

  revalidatePath('/portal/marketing-assets');
}
