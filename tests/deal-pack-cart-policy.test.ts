import { describe, expect, it } from 'vitest';
import { validateSiteScanBundle } from '@/lib/deal-pack-cart-policy';

describe('Bid-Ready Site Scan + Inspection cart add-on', () => {
  it('allows Bid Ready alone or with the optional scan', () => {
    expect(validateSiteScanBundle([{key: 'deal-pack-bid-ready'}])).toEqual({ok: true});
    expect(validateSiteScanBundle([
      {key: 'deal-pack-bid-ready', quantity: 1},
      {key: 'deal-pack-site-scan', quantity: 1},
    ])).toEqual({ok: true});
  });
  it('rejects standalone Site Scan checkout', () => {
    const result=validateSiteScanBundle([{key: 'deal-pack-site-scan'}]);
    expect(result.ok).toBe(false);
  });
  it('prevents accidentally buying a duplicate scan with Build Ready', () => {
    const result=validateSiteScanBundle([
      {key: 'deal-pack-bid-ready'},
      {key: 'deal-pack-build-ready'},
      {key: 'deal-pack-site-scan'},
    ]);
    expect(result).toMatchObject({ok: false});
    expect(result.ok === false && result.error).toMatch(/already includes/i);
  });
  it('requires Bid Ready rather than a Build Ready-only bundle', () => {
    expect(validateSiteScanBundle([
      {key: 'deal-pack-build-ready'},
      {key: 'deal-pack-site-scan'},
    ]).ok).toBe(false);
  });
});
