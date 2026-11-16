/**
 * Bundled Site Scan + Inspection cart policy.
 * Deal Pack checkout is handled by the Hub after purchase-agreement acceptance.
 * This guard avoids a standalone/duplicate scan purchase on the main SCC cart.
 */
export const BID_READY_KEY = 'deal-pack-bid-ready'
export const BUILD_READY_KEY = 'deal-pack-build-ready'
export const SITE_SCAN_KEY = 'deal-pack-site-scan'

export function validateSiteScanBundle(
  items: Array<{ key: string; quantity?: number }>
): { ok: true } | { ok: false; error: string } {
  const keys = new Set(items.filter(item => item.quantity === undefined || item.quantity > 0).map(item => item.key))
  if (!keys.has(SITE_SCAN_KEY)) return { ok: true }
  if (!keys.has(BID_READY_KEY)) {
    return {
      ok: false,
      error: 'Site Scan + Inspection is an optional add-on to Bid-Ready. Add Bid-Ready to your cart or remove the scan.',
    }
  }
  if (keys.has(BUILD_READY_KEY)) {
    return {
      ok: false,
      error: 'Build-Ready already includes a site scan and inspection. Remove the additional scan to avoid paying twice.',
    }
  }
  return { ok: true }
}
