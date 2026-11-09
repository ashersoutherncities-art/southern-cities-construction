import { describe, it, expect, vi, beforeEach } from 'vitest';

// Simulate an unauthenticated server-action caller by returning no cookie.
const cookieMap = new Map<string, string>();
vi.mock('next/headers', () => ({
  cookies: () => ({ get: (k: string) => (cookieMap.has(k) ? { value: cookieMap.get(k)! } : undefined) }),
}));

// Avoid revalidatePath side effects.
vi.mock('next/cache', () => ({ revalidatePath: () => undefined }));

// We don't want Supabase in these tests.
vi.mock('@/lib/supabase', () => ({
  getServiceClient: () => { throw new Error('getServiceClient should not be called in auth-only test'); },
  tryGetServiceClient: () => null,
}));

import { generateComparisonLinkAction } from '@/app/portal/bid-packages/[id]/actions';

beforeEach(() => {
  cookieMap.clear();
  process.env.CD_PROCUREMENT_ADMIN_KEY = 'procurement-admin';
  process.env.MARKETING_PORTAL_ACCESS_KEY = 'marketing-admin';
  process.env.CD_LINK_SECRET = 'link-secret';
  process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000';
});

describe('generateComparisonLinkAction (finding #1: unauthorized bid links)', () => {
  it('throws unauthorized when no portal cookie is present', async () => {
    await expect(generateComparisonLinkAction('pkg-abc')).rejects.toThrow('unauthorized');
  });

  it('throws unauthorized when the cookie does not match any accepted key', async () => {
    cookieMap.set('sc_portal', 'wrong-value');
    await expect(generateComparisonLinkAction('pkg-abc')).rejects.toThrow('unauthorized');
  });

  it('rejects an empty bidPackageId even when authorized', async () => {
    cookieMap.set('sc_portal', 'procurement-admin');
    await expect(generateComparisonLinkAction('')).rejects.toThrow();
  });
});
