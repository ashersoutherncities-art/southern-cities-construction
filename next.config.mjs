/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Investors — legacy URL aliases to canonical services
      { source: '/services/investors/contractor-match-bid-coordination', destination: '/services/investors/bid-coordination-contractor-match', permanent: true },
      { source: '/services/investors/full-due-diligence-package', destination: '/services/investors/investor-review', permanent: true },
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
      { source: '/for-investors', destination: '/services/investors', permanent: false },
      { source: '/for-homeowners', destination: '/services/homeowners', permanent: false },
      { source: '/for-contractors', destination: '/services/contractors', permanent: false },
      { source: '/for-developers', destination: '/services/developers-landowners', permanent: false },
      { source: '/for-developers-landowners', destination: '/services/developers-landowners', permanent: false },
    ];
  },
};

export default nextConfig;
