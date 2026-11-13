import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { hasPortalAccess } from '@/lib/portal-auth';
import { createBidPackageAction } from '@/app/portal/bid-packages/actions';
import { createContractorAction } from '@/app/portal/contractors/actions';
import { claimDeskReviewAction } from '@/app/portal/desk-reviews/actions';
import { addMarketingAssetAction } from '@/app/portal/marketing-assets/actions';

const services = vi.hoisted(() => ({ cookie: undefined as string | undefined, client: vi.fn(), create: vi.fn(), marketing: vi.fn() }));
vi.mock('next/headers', () => ({ cookies: async () => ({ get: () => services.cookie ? { value: services.cookie } : undefined }) }));
vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));
vi.mock('next/navigation', () => ({ redirect: vi.fn() }));
vi.mock('@/lib/supabase', () => ({ getServiceClient: services.client }));
vi.mock('@/lib/gc-procurement', () => ({ createBidPackage: services.create, createContractor: vi.fn(), updateContractor: vi.fn(), appendContractorDocument: vi.fn() }));
vi.mock('@/lib/marketing', () => ({ createMarketingAsset: services.marketing, createMarketingLink: vi.fn(), syncMarketingInfrastructure: vi.fn() }));
vi.mock('@/lib/construction-department/desk-reviews', () => ({ claimDeskReview: vi.fn(), saveDeskReviewNotes: vi.fn(), markDeskReviewDelivered: vi.fn() }));
vi.mock('@/lib/construction-department/members', () => ({ getMemberByEmail: vi.fn() }));
vi.mock('@/lib/construction-department/email', () => ({ sendDeskReviewDeliveredEmail: vi.fn() }));

beforeEach(() => {
  services.cookie = undefined;
  services.client.mockReset().mockReturnValue({});
  services.create.mockReset().mockResolvedValue({ id: 'test-package' });
  services.marketing.mockReset();
  vi.stubEnv('MARKETING_PORTAL_ACCESS_KEY', 'synthetic-portal-test-key');
});
afterEach(() => vi.unstubAllEnvs());

describe('async portal authorization', () => {
  it('denies a request with no cookie or a different cookie', async () => {
    expect(await hasPortalAccess('synthetic-portal-test-key')).toBe(false);
    services.cookie = 'different-test-key';
    expect(await hasPortalAccess('synthetic-portal-test-key')).toBe(false);
  });

  it('matches any configured allowed key and rejects empty keys', async () => {
    services.cookie = 'synthetic-portal-test-key';
    expect(await hasPortalAccess(undefined, '', 'synthetic-portal-test-key')).toBe(true);
    expect(await hasPortalAccess(undefined, '')).toBe(false);
  });

  it('awaits authorization before procurement or review mutations', async () => {
    const form = new FormData();
    form.set('id', 'test-row');
    form.set('reviewer_email', 'reviewer@example.test');
    form.set('company_name', 'Test Company');
    form.set('property_address', 'Test property');
    form.set('scope_summary', 'Test scope');
    await createBidPackageAction(form);
    await createContractorAction(form);
    await claimDeskReviewAction(form);
    expect(services.client).not.toHaveBeenCalled();
    expect(services.create).not.toHaveBeenCalled();
  });

  it('blocks marketing writes when the cookie is unauthorized', async () => {
    await expect(addMarketingAssetAction(new FormData())).rejects.toThrow('Invalid access key.');
    expect(services.marketing).not.toHaveBeenCalled();
  });

  it('still permits an authorized procurement action', async () => {
    services.cookie = 'synthetic-portal-test-key';
    const form = new FormData();
    form.set('property_address', 'Test property');
    form.set('scope_summary', 'Test scope');
    await createBidPackageAction(form);
    expect(services.client).toHaveBeenCalledTimes(1);
    expect(services.create).toHaveBeenCalledTimes(1);
  });
});
