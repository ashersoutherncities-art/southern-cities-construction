const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://southerncitiesconstruction.com';

export type MarketingAssetSeed = {
  asset_key: string;
  title: string;
  asset_type: string;
  channel: string;
  status: string;
  source_type: 'infrastructure' | 'manual';
  page_path?: string | null;
  public_url?: string | null;
  storage_path?: string | null;
  preview_image_url?: string | null;
  notes?: string | null;
  metadata?: Record<string, unknown>;
};

export type MarketingLinkSeed = {
  slug: string;
  label: string;
  destination_url: string;
  channel: string;
  campaign?: string | null;
  medium?: string | null;
  source_type: 'infrastructure' | 'manual';
  asset_key?: string | null;
  status: string;
  notes?: string | null;
  metadata?: Record<string, unknown>;
};

export const INFRASTRUCTURE_MARKETING_ASSETS: MarketingAssetSeed[] = [
  {
    asset_key: 'homepage-primary',
    title: 'Homepage',
    asset_type: 'landing_page',
    channel: 'website',
    status: 'active',
    source_type: 'infrastructure',
    page_path: '/',
    public_url: SITE_URL,
    notes: 'Primary website entry point and highest-traffic marketing surface.',
  },
  {
    asset_key: 'services-hub',
    title: 'Services hub',
    asset_type: 'landing_page',
    channel: 'website',
    status: 'active',
    source_type: 'infrastructure',
    page_path: '/services',
    public_url: `${SITE_URL}/services`,
    notes: 'Overview page for all audience-specific service paths.',
  },
  {
    asset_key: 'gallery-page',
    title: 'Project gallery',
    asset_type: 'portfolio_page',
    channel: 'website',
    status: 'active',
    source_type: 'infrastructure',
    page_path: '/gallery',
    public_url: `${SITE_URL}/gallery`,
    notes: 'Portfolio-style page for before/after and project visuals.',
  },
  {
    asset_key: 'resources-page',
    title: 'Resources page',
    asset_type: 'resource_hub',
    channel: 'website',
    status: 'active',
    source_type: 'infrastructure',
    page_path: '/resources',
    public_url: `${SITE_URL}/resources`,
    notes: 'Lead generation and educational content hub.',
  },
  {
    asset_key: 'portal-onboarding',
    title: 'Portal onboarding page',
    asset_type: 'checkout_page',
    channel: 'website',
    status: 'active',
    source_type: 'infrastructure',
    page_path: '/portal',
    public_url: `${SITE_URL}/portal`,
    notes: 'Customer onboarding and checkout flow entry.',
  },
  {
    asset_key: 'brand-logo-primary',
    title: 'Primary brand logo',
    asset_type: 'brand_asset',
    channel: 'website',
    status: 'active',
    source_type: 'infrastructure',
    storage_path: '/public/sc-construction-logo.png',
    public_url: `${SITE_URL}/sc-construction-logo.png`,
    preview_image_url: `${SITE_URL}/sc-construction-logo.png`,
    notes: 'Primary Southern Cities Construction logo used across site and ads.',
  },
  {
    asset_key: 'brand-mark-minimal',
    title: 'Minimal brand mark',
    asset_type: 'brand_asset',
    channel: 'website',
    status: 'active',
    source_type: 'infrastructure',
    storage_path: '/public/sc-construction-minimal.png',
    public_url: `${SITE_URL}/sc-construction-minimal.png`,
    preview_image_url: `${SITE_URL}/sc-construction-minimal.png`,
    notes: 'Alternate brand mark for hero sections and lightweight placements.',
  },
  {
    asset_key: 'chat-avatar',
    title: 'Chat avatar',
    asset_type: 'brand_asset',
    channel: 'website',
    status: 'active',
    source_type: 'infrastructure',
    storage_path: '/public/chat-avatar.jpg',
    public_url: `${SITE_URL}/chat-avatar.jpg`,
    preview_image_url: `${SITE_URL}/chat-avatar.jpg`,
    notes: 'Avatar used by the site chat widget.',
  },
];

export const INFRASTRUCTURE_MARKETING_LINKS: MarketingLinkSeed[] = [
  {
    slug: 'book-project-call',
    label: 'Book project call',
    destination_url: `${SITE_URL}/services/homeowners/owner-consultation`,
    channel: 'website',
    campaign: 'core-site',
    medium: 'cta',
    source_type: 'infrastructure',
    asset_key: 'homepage-primary',
    status: 'active',
    notes: 'Primary site CTA used for project consultation bookings.',
  },
  {
    slug: 'view-project-gallery',
    label: 'View project gallery',
    destination_url: `${SITE_URL}/gallery`,
    channel: 'website',
    campaign: 'core-site',
    medium: 'portfolio',
    source_type: 'infrastructure',
    asset_key: 'gallery-page',
    status: 'active',
    notes: 'Trackable gallery CTA for outbound campaign references.',
  },
  {
    slug: 'download-resources',
    label: 'Browse resources',
    destination_url: `${SITE_URL}/resources`,
    channel: 'website',
    campaign: 'lead-generation',
    medium: 'resource-hub',
    source_type: 'infrastructure',
    asset_key: 'resources-page',
    status: 'active',
    notes: 'Resource hub CTA for organic, email, and social placements.',
  },
  {
    slug: 'verify-nc-license',
    label: 'Verify NC GC license',
    destination_url: 'https://portal.nclbgc.org/Public/Search',
    channel: 'trust',
    campaign: 'brand-proof',
    medium: 'external',
    source_type: 'infrastructure',
    status: 'active',
    notes: 'External trust link to the North Carolina licensing board search.',
  },
];
