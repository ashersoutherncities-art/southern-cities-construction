import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import Page from '@/app/checkout/complete/page';
import { POST } from '@/app/api/permit-oversight-checkout/complete/route';
import { NextRequest } from 'next/server';
const s = vi.hoisted(() => ({ retrieve: vi.fn(), db: vi.fn() }));
vi.mock('stripe', () => ({
  default: class {
    checkout = { sessions: { retrieve: s.retrieve } };
  },
}));
vi.mock('@/lib/supabase', () => ({ tryGetServiceClient: s.db }));
beforeEach(() => {
  s.retrieve.mockReset();
  s.db.mockReset();
  vi.stubEnv('STRIPE_SECRET_KEY', 'synthetic-key');
});
afterEach(() => vi.unstubAllEnvs());
it('renders a verified paid cart receipt without permit contracts', async () => {
  s.retrieve.mockResolvedValue({
    payment_status: 'paid',
    amount_total: 59900,
    currency: 'usd',
  });
  const html = renderToStaticMarkup(
    await Page({
      searchParams: Promise.resolve({ session_id: 'cs_test_synthetic' }),
    })
  );
  expect(html).toContain('Payment received');
  expect(html).toContain('$599.00');
  expect(html).not.toContain('pending signature');
  expect(s.db).not.toHaveBeenCalled();
});
it('does not show a paid receipt for pending payment', async () => {
  s.retrieve.mockResolvedValue({ payment_status: 'unpaid' });
  const html = renderToStaticMarkup(
    await Page({
      searchParams: Promise.resolve({ session_id: 'cs_test_synthetic' }),
    })
  );
  expect(html).toContain('Payment pending');
  expect(html).not.toContain('Payment received');
});
it('does not trust a missing or invalid receipt id', async () => {
  const html = renderToStaticMarkup(
    await Page({ searchParams: Promise.resolve({ session_id: 'invalid' }) })
  );
  expect(html).toContain('Unable to verify payment');
  expect(s.retrieve).not.toHaveBeenCalled();
});
it.each([{ flow: 'multi-item-cart' }, { workflow: 'cart' }])(
  'does not finalize a cart as a permit order: %j',
  async (metadata) => {
    s.retrieve.mockResolvedValue({
      id: 'cs_test_synthetic',
      payment_status: 'paid',
      metadata,
    });
    const r = await POST(
      new NextRequest(
        'https://site.example.test/api/permit-oversight-checkout/complete',
        {
          method: 'POST',
          body: JSON.stringify({ session_id: 'cs_test_synthetic' }),
        }
      )
    );
    expect(r.status).toBe(200);
    expect(s.db).not.toHaveBeenCalled();
  }
);

it('shows a verified refund on a revisited receipt', async () => {
  s.retrieve.mockResolvedValue({
    payment_status: 'paid',
    amount_total: 59900,
    currency: 'usd',
    payment_intent: {
      latest_charge: { amount: 59900, amount_refunded: 59900 },
    },
  });
  const html = renderToStaticMarkup(
    await Page({
      searchParams: Promise.resolve({ session_id: 'cs_test_synthetic' }),
    })
  );
  expect(html).toContain('Payment refunded');
  expect(html).toContain('Refunded:');
});
