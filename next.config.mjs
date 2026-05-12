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
    ];
  },
};

export default nextConfig;
