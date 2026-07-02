/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Baseline security headers applied to every response.
  // CSP is shipped REPORT-ONLY first: it allowlists the GHL chat widget,
  // Stripe, Google Ads/Analytics, and self, and logs (does not block)
  // violations to the browser console. Review reports for ~1-2 weeks, tune
  // the allowlist, then promote this exact policy to an enforcing
  // `Content-Security-Policy` header. ('unsafe-inline'/'unsafe-eval' are
  // present because Next.js + gtag + the GHL widget use inline scripts;
  // tightening to nonces is a later step.)
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://widgets.leadconnectorhq.com https://js.stripe.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://*.leadconnectorhq.com https://*.googleadservices.com https://www.google.com",
      "frame-src 'self' https://widgets.leadconnectorhq.com https://js.stripe.com https://checkout.stripe.com https://td.doubleclick.net",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://checkout.stripe.com",
      "frame-ancestors 'none'",
    ].join('; ');
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Content-Security-Policy-Report-Only', value: csp },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Booking funnel consolidated into the universal /start intake form.
      // Every "Get Started" CTA points to /start; keep old /book links working.
      { source: '/book', destination: '/start', permanent: false },

      // Investors — legacy URL aliases to canonical services
      { source: '/services/investors/contractor-match-bid-coordination', destination: '/services/investors/bid-coordination-contractor-match', permanent: true },
      { source: '/services/investors/full-due-diligence-package', destination: '/platform/co1', permanent: true },

      // Investor Deal & Scope Review consolidated into the canonical
      // Investor Execution Review (platform stage CO1). Retire the duplicate
      // legacy catalog + LP surfaces by redirecting to the canonical product.
      { source: '/services/investors/investor-review', destination: '/platform/co1', permanent: true },
      { source: '/lp/investor-deal-review', destination: '/platform/co1', permanent: true },
      { source: '/review/investor-review', destination: '/platform/co1', permanent: true },
      { source: '/services/investors/rehab-budget-review', destination: '/services/investors/budget-review', permanent: true },
      { source: '/services/investors/lender-ready-scope-bid-package', destination: '/services/investors/lender-scope-bid-package', permanent: true },
      { source: '/services/investors/project-timeline-schedule-preparation', destination: '/services/investors/regional-investor-setup-consultation', permanent: true },
      { source: '/services/investors/schedule-of-cashflows-preparation', destination: '/services/investors/cashflow-planning', permanent: true },
      { source: '/services/investors/permit-coordination-administration', destination: '/services/investors/permit-local-compliance-review', permanent: true },
      { source: '/services/investors/construction-draw-strategy-alignment', destination: '/services/investors/draw-strategy-alignment', permanent: true },
      { source: '/services/investors/owner-controlled-construction-gc-led', destination: '/services/investors/owner-controlled-build', permanent: true },
      { source: '/services/investors/full-construction-management-service', destination: '/services/investors/full-construction-management', permanent: true },
      { source: '/services/investors/regional-investor-construction-network-development', destination: '/services/investors/regional-investor-setup-consultation', permanent: true },
      { source: '/services/investors/investor-operator-support', destination: '/services/investors/operator-support-plan', permanent: true },
      { source: '/services/investors/due-diligence-package-3-deals-month', destination: '/services/investors/due-diligence-package', permanent: true },
      { source: '/services/investors/construction-planning-package-3-deals-month', destination: '/services/investors/construction-planning-package', permanent: true },

      // Investor catalog hub retired in favor of the Investor Execution
      // Platform. Legacy /services/investors/* detail pages still resolve by
      // direct URL; only the hub entry point moves to /platform. Temporary
      // (307) while the investor migration settles — flip to permanent later.
      { source: '/services/investors', destination: '/platform', permanent: false },

      // Realtors — legacy URL alias
      { source: '/services/realtors/pre-listing-work', destination: '/services/realtors/pre-listing-budget-prep-review', permanent: true },

      // Industry-partners catch-all retired — each avatar now has its own
      // dedicated hub page. Preserve incoming links via redirect.
      { source: '/services/industry-partners', destination: '/services', permanent: true },

      // Buyer-Side Property Read retired in favor of on-site GC-Grade
      // Property Inspection. Preserve any stale ad / bookmark links.
      { source: '/lp/buyer-side-property-read', destination: '/lp/gc-grade-property-inspection', permanent: true },
      { source: '/services/realtors/buyer-side-property-read', destination: '/services/realtors/gc-grade-property-inspection', permanent: true },

      // Per-Deal Co-Pilot retired — Buyer/Listing Packages now include the
      // GC-Grade Inspection so the "bring your own inspector" niche shrank.
      // Stale links route to Buyer Package as the closest replacement.
      { source: '/lp/per-deal-copilot', destination: '/lp/buyer-transaction-package', permanent: true },
      { source: '/services/realtors/per-deal-copilot', destination: '/services/realtors/buyer-transaction-package', permanent: true },

      // Memorable short URL aliases for audience hubs
      { source: '/for-realtors', destination: '/services/realtors', permanent: false },
      { source: '/for-investors', destination: '/platform', permanent: false },
      { source: '/investor-tools/rehab-budget-snapshot', destination: '/lp/rehab-budget-range-execution-risk-snapshot', permanent: false },
      // Speakable vanity for realtor voicemail/cold-call outreach -> free Rehab Budget Snapshot tool
      { source: '/agents', destination: '/lp/rehab-budget-range-execution-risk-snapshot', permanent: false },
      { source: '/for-homeowners', destination: '/services/homeowners', permanent: false },
      { source: '/for-contractors', destination: '/services/contractors', permanent: false },
      { source: '/for-developers', destination: '/services/developers-landowners', permanent: false },
      { source: '/for-developers-landowners', destination: '/services/developers-landowners', permanent: false },
    ];
  },
};

export default nextConfig;
