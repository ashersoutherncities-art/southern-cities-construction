import { describe, expect, it } from 'vitest';
import config from '../next.config.mjs';

describe('service hub consolidation', () => {
  it('redirects exact legacy audience hubs and preserves detail and campaign routes', async () => {
    const redirects = await config.redirects!();
    for (const role of ['investors', 'realtors', 'wholesalers', 'homeowners', 'contractors', 'developers-landowners']) {
      const matches = redirects.filter((rule) => rule.source === `/services/${role}`);
      expect(matches).toEqual([{ source: `/services/${role}`, destination: '/services', permanent: false }]);
    }
    expect(redirects.some((rule) => rule.source === '/services/:role/:service')).toBe(false);
    expect(redirects.some((rule) => rule.source === '/lp/realtor-deal-pack' || rule.source === '/lp/wholesaler-deal-pack')).toBe(false);
  });

  it('keeps security headers on the global response rule', async () => {
    const headers = await config.headers!();
    expect(headers).toHaveLength(1);
    expect(headers[0]).toMatchObject({ source: '/:path*' });
    expect(headers[0].headers).toContainEqual({ key: 'X-Content-Type-Options', value: 'nosniff' });
  });
});
