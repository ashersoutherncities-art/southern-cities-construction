/**
 * Single source of truth for Southern Cities Construction site-wide
 * business facts. Every component, page, and JSON-LD block should pull
 * from here — do NOT hardcode names, phones, addresses, or license
 * numbers in components.
 *
 * If you need to change the phone, license, or address, do it here.
 */

export const SITE_CONFIG = {
  // ---------- Brand / legal ----------
  /** Public-facing display name (use everywhere except legal copy) */
  name: 'Southern Cities Construction',
  /** Full LLC name for legal copy and JSON-LD `legalName` */
  legalName: 'Southern Cities Construction LLC',
  /** Footer legal line — keep this verbatim in the footer */
  legalLine:
    'Southern Cities Construction LLC · A Division of Southern Cities Enterprises',
  /** Short tagline used in og:description fallbacks (The Standard — belief underneath) */
  tagline: 'Built to a standard. Priced for real life.',

  // ---------- Positioning (canonical — pull from here, don't hardcode) ----------
  /**
   * Brand spine, decided 2026-07: "a construction platform, backed by a
   * licensed GC." The differentiator is the UNBUNDLING (we sell every stage of
   * a GC, not just the whole build) — NOT "we price it and build it," which is
   * table stakes for any contractor. Keep the license loud (trust + compliance).
   */
  positioning: {
    /** One-line identity — use as the top-level descriptor */
    identity: 'A construction platform, backed by a licensed general contractor.',
    /** The differentiator / loud claim — lead with this */
    differentiator: 'We unbundled the general contractor.',
    /** Philosophy line */
    philosophy:
      'Not every project needs a general contractor. Every project needs the right construction expertise at the right time.',
    /** The organizing question */
    coreQuestion: 'Where are you in the process?',
    /** Business model descriptor */
    model: 'Packaged construction solutions for every stage of a residential project.',
    /** Hero subhead (working) */
    heroSubhead:
      'Not every project needs a GC — every project needs the right construction expertise at the right time. Start with the package that fits where you are, and carry the same licensed builder all the way through.',
    /** SEO meta description */
    metaDescription:
      'Southern Cities is a construction platform backed by a licensed North Carolina general contractor. Buy packaged construction solutions for any stage — deal evaluation, budgets, scopes, oversight — or a full build. The right construction expertise at the right time.',
  },

  // ---------- Contact ----------
  /** Primary phone — must exactly match the Google Business Profile listing */
  phone: '(980) 473-7249',
  /** E.164 format for tel: hrefs */
  phoneTel: '+19804737249',
  /** General inquiries */
  emailInfo: 'info@southerncitiesconstruction.com',
  /** Order flows only (Stripe receipts, cart confirmations) */
  emailOrders: 'orders@southerncitiesconstruction.com',

  // ---------- Address ----------
  address: {
    street: '525 N Tryon St',
    city: 'Charlotte',
    state: 'NC',
    zip: '28202',
    country: 'US',
    /** Pre-formatted single-line for footer / contact blocks */
    formatted: '525 N Tryon St, Charlotte, NC 28202',
  },

  // ---------- License ----------
  /** NC General Contractor license — must appear on every marketing piece */
  license: {
    number: '107724',
    issuer: 'North Carolina General Contractor License',
    /** Pre-formatted for display: "NC GC License #107724" */
    formatted: 'NC GC License #107724',
  },

  // ---------- URLs ----------
  /** Production base URL (no trailing slash) */
  baseUrl: 'https://southerncitiesconstruction.com',
  /** Client portal lives on a subdomain */
  portalUrl: 'https://clients.southerncitiesconstruction.com',
  /** Default OG image (1200x630 recommended) */
  ogImage: '/og-default.png',

  // ---------- Stats (use these everywhere — they resolve the homepage contradiction) ----------
  stats: {
    /** Hero stat — replaces "15+ projects" contradiction */
    headline: '120+ investors & owners served',
    /** Footer stats line — replaces "5 years in business · 15+ projects completed" */
    footerLine:
      '5 years in business · Charlotte, NC · Statewide NC coverage',
    /** Years in business (for JSON-LD foundingDate computation) */
    yearsInBusiness: 5,
    /** Average review turnaround */
    reviewTurnaround: '2-day',
    /** Service area */
    areaServed: 'North Carolina',
  },

  // ---------- Brand colors (for JSON-LD theme color, social cards) ----------
  colors: {
    navy: '#132452',
    orange: '#FA8C41',
    cream: '#F8F4ED',
  },

  // ---------- Logos ----------
  /** Logo for dark/navy backgrounds (white text + orange house frame) */
  logoReversed: '/sc-construction-logo-reversed.png',
  /** Logo for white/light backgrounds (navy + orange) */
  logoLight: '/sc-construction-logo.png',
} as const;

/** Type-only export so consumers can derive narrowed types if needed */
export type SiteConfig = typeof SITE_CONFIG;

/** Convenience helper: absolute URL builder. */
export function absoluteUrl(path: string = '/'): string {
  if (path.startsWith('http')) return path;
  const trimmed = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.baseUrl}${trimmed}`;
}

/** Convenience helper: pick the correct logo for the surface. */
export function logoFor(surface: 'dark' | 'light'): string {
  return surface === 'dark' ? SITE_CONFIG.logoReversed : SITE_CONFIG.logoLight;
}
