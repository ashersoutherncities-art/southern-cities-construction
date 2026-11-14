import { beforeEach, afterEach, expect, it, vi } from 'vitest';
const s = vi.hoisted(() => ({
  lookup: vi.fn(),
  insert: vi.fn(),
  update: vi.fn(),
}));
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: () => ({
      select: () => ({ eq: () => ({ maybeSingle: s.lookup }) }),
      insert: s.insert,
      update: (patch: unknown) => {
        s.update(patch);
        return { eq: async () => ({ error: null }) };
      },
    }),
  }),
}));
import { mirrorOrderToHub, provisionDealPackPortal } from '@/lib/hub-orders';
const input = {
  buyer_email: 'fixture@example.test',
  product_name: 'Fixture',
  amount_total_cents: 59900,
  stripe_session_id: 'synthetic-session',
  order_id: 91,
};
beforeEach(() => {
  vi.stubEnv('HUB_SUPABASE_URL', 'https://example.supabase.co');
  vi.stubEnv('HUB_SUPABASE_SERVICE_ROLE_KEY', 'synthetic');
  vi.stubEnv('HUB_BASE_URL', 'https://hub.example.test');
  vi.stubEnv('DEAL_PACK_WEBHOOK_SECRET', 'synthetic');
  s.lookup.mockReset().mockResolvedValue({ data: null, error: null });
  s.insert.mockReset().mockResolvedValue({ error: null });
  s.update.mockReset();
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
it('propagates Hub lookup failure to Stripe retry handling', async () => {
  s.lookup.mockResolvedValue({ error: { message: 'fixture outage' } });
  await expect(mirrorOrderToHub(input)).rejects.toThrow('lookup failed');
});
it('propagates Hub insert failure', async () => {
  s.insert.mockResolvedValue({ error: { code: 'synthetic-failure' } });
  await expect(mirrorOrderToHub(input)).rejects.toThrow('insert failed');
});
it('absorbs a concurrent duplicate insert', async () => {
  s.insert.mockResolvedValue({ error: { code: '23505' } });
  await expect(mirrorOrderToHub(input)).resolves.toBeUndefined();
});
it('updates the existing mirrored order on refund', async () => {
  s.lookup.mockResolvedValue({ data: { id: 'fixture-id' }, error: null });
  await mirrorOrderToHub({ ...input, status: 'refunded' });
  expect(s.update).toHaveBeenCalledWith({ status: 'refunded' });
  expect(s.insert).not.toHaveBeenCalled();
});
it('makes a failed portal provision retryable', async () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));
  await expect(
    provisionDealPackPortal({
      ...input,
      buyer_name: 'Fixture',
      project_address: 'TEST ONLY',
      product_key: 'deal-pack-bid-ready',
    })
  ).rejects.toThrow('503');
  vi.restoreAllMocks();
});
