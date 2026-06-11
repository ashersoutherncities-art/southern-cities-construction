// Calibration file — overwrite low/high with real sub pricing.
// Source: SCC_Rehab_Cost_Schedule_Engine_v2.xlsx

export type Basis =
  | 'per_sf'
  | 'per_unit'
  | 'per_bath'
  | 'allowance'
  | 'per_addition_sf';

export type Path = 'CRITICAL_PATH' | 'PARALLEL';

export type ScopeKey =
  | 'paint'
  | 'flooring'
  | 'drywall'
  | 'windows'
  | 'kitchen_refresh'
  | 'kitchen_full'
  | 'bath_refresh'
  | 'bath_full'
  | 'roof'
  | 'hvac'
  | 'plumb_partial'
  | 'plumb_full'
  | 'elec_partial'
  | 'elec_full'
  | 'framing'
  | 'structural'
  | 'foundation'
  | 'addition'
  | 'layout'
  | 'full_gut'
  | 'fire'
  | 'water'
  | 'mold'
  | 'termite'
  | 'siding'
  | 'exterior'
  | 'landscaping'
  | 'driveway'
  | 'permit_unknown';

export interface ScopeItem {
  key: ScopeKey;
  label: string;
  section: string;
  basis: Basis;
  low: number;
  high: number;
  tierSensitive: boolean;
  durationDays: number;
  path: Path;
  prereq: string;
}

export const SCOPE_ITEMS: ScopeItem[] = [
  // FINISHES & COSMETIC
  { key: 'paint', label: 'Paint reset', section: 'FINISHES & COSMETIC',
    basis: 'per_sf', low: 2.5, high: 4.5, tierSensitive: true,
    durationDays: 4, path: 'CRITICAL_PATH', prereq: 'Drywall finished; trim set' },
  { key: 'flooring', label: 'Flooring replacement', section: 'FINISHES & COSMETIC',
    basis: 'per_sf', low: 4, high: 9, tierSensitive: true,
    durationDays: 4, path: 'CRITICAL_PATH', prereq: 'Subfloor sound; paint primed' },
  { key: 'drywall', label: 'Drywall', section: 'FINISHES & COSMETIC',
    basis: 'per_sf', low: 2.5, high: 4, tierSensitive: false,
    durationDays: 7, path: 'CRITICAL_PATH', prereq: 'Rough-ins inspected; insulation in' },
  { key: 'windows', label: 'Windows', section: 'FINISHES & COSMETIC',
    basis: 'per_unit', low: 450, high: 900, tierSensitive: true,
    durationDays: 2, path: 'PARALLEL', prereq: 'Rough openings framed' },

  // KITCHEN & BATH
  { key: 'kitchen_refresh', label: 'Kitchen refresh', section: 'KITCHEN & BATH',
    basis: 'per_unit', low: 8000, high: 18000, tierSensitive: true,
    durationDays: 8, path: 'CRITICAL_PATH', prereq: 'Plumbing/electrical in place' },
  { key: 'kitchen_full', label: 'Full kitchen', section: 'KITCHEN & BATH',
    basis: 'per_unit', low: 18000, high: 45000, tierSensitive: true,
    durationDays: 15, path: 'CRITICAL_PATH', prereq: 'Rough-ins + drywall done' },
  { key: 'bath_refresh', label: 'Bathroom refresh', section: 'KITCHEN & BATH',
    basis: 'per_bath', low: 3500, high: 8000, tierSensitive: true,
    durationDays: 6, path: 'PARALLEL', prereq: 'Plumbing functional' },
  { key: 'bath_full', label: 'Full bathroom', section: 'KITCHEN & BATH',
    basis: 'per_bath', low: 9000, high: 18000, tierSensitive: true,
    durationDays: 10, path: 'CRITICAL_PATH', prereq: 'Rough-ins; waterproofing' },

  // SYSTEMS
  { key: 'roof', label: 'Roof', section: 'SYSTEMS',
    basis: 'per_sf', low: 5, high: 7.5, tierSensitive: false,
    durationDays: 3, path: 'CRITICAL_PATH', prereq: 'Deck/sheathing sound' },
  { key: 'hvac', label: 'HVAC', section: 'SYSTEMS',
    basis: 'allowance', low: 8000, high: 16000, tierSensitive: false,
    durationDays: 5, path: 'CRITICAL_PATH', prereq: 'Framing complete' },
  { key: 'plumb_partial', label: 'Partial plumbing', section: 'SYSTEMS',
    basis: 'allowance', low: 2500, high: 7000, tierSensitive: false,
    durationDays: 3, path: 'PARALLEL', prereq: 'Demo/access complete' },
  { key: 'plumb_full', label: 'Full plumbing', section: 'SYSTEMS',
    basis: 'allowance', low: 8000, high: 20000, tierSensitive: false,
    durationDays: 6, path: 'CRITICAL_PATH', prereq: 'Demo/framing complete' },
  { key: 'elec_partial', label: 'Partial electrical', section: 'SYSTEMS',
    basis: 'allowance', low: 2500, high: 6500, tierSensitive: false,
    durationDays: 3, path: 'PARALLEL', prereq: 'Demo/access complete' },
  { key: 'elec_full', label: 'Full electrical', section: 'SYSTEMS',
    basis: 'per_sf', low: 4, high: 7, tierSensitive: false,
    durationDays: 6, path: 'CRITICAL_PATH', prereq: 'Framing complete' },

  // STRUCTURE & LAYOUT
  { key: 'framing', label: 'Framing', section: 'STRUCTURE & LAYOUT',
    basis: 'per_sf', low: 3, high: 9, tierSensitive: false,
    durationDays: 6, path: 'CRITICAL_PATH', prereq: 'Demo done; structural done' },
  { key: 'structural', label: 'Structural work', section: 'STRUCTURE & LAYOUT',
    basis: 'allowance', low: 5000, high: 25000, tierSensitive: false,
    durationDays: 7, path: 'CRITICAL_PATH', prereq: 'Engineering + permit; demo' },
  { key: 'foundation', label: 'Foundation', section: 'STRUCTURE & LAYOUT',
    basis: 'allowance', low: 8000, high: 40000, tierSensitive: false,
    durationDays: 10, path: 'CRITICAL_PATH', prereq: 'Engineering + permit' },
  { key: 'addition', label: 'Addition', section: 'STRUCTURE & LAYOUT',
    basis: 'per_addition_sf', low: 150, high: 300, tierSensitive: false,
    durationDays: 45, path: 'CRITICAL_PATH', prereq: 'Foundation, framing, permits' },
  { key: 'layout', label: 'Layout changes', section: 'STRUCTURE & LAYOUT',
    basis: 'allowance', low: 4000, high: 15000, tierSensitive: false,
    durationDays: 6, path: 'CRITICAL_PATH', prereq: 'Demo; structural headers' },
  { key: 'full_gut', label: 'Full gut', section: 'STRUCTURE & LAYOUT',
    basis: 'per_sf', low: 8, high: 15, tierSensitive: false,
    durationDays: 6, path: 'CRITICAL_PATH', prereq: 'Permits; utilities safed' },

  // CONDITION RISKS
  { key: 'fire', label: 'Fire damage', section: 'CONDITION RISKS',
    basis: 'allowance', low: 10000, high: 50000, tierSensitive: false,
    durationDays: 10, path: 'CRITICAL_PATH', prereq: 'Assessment complete' },
  { key: 'water', label: 'Water damage', section: 'CONDITION RISKS',
    basis: 'allowance', low: 3000, high: 20000, tierSensitive: false,
    durationDays: 6, path: 'CRITICAL_PATH', prereq: 'Water source stopped' },
  { key: 'mold', label: 'Mold concern', section: 'CONDITION RISKS',
    basis: 'allowance', low: 2000, high: 10000, tierSensitive: false,
    durationDays: 4, path: 'CRITICAL_PATH', prereq: 'Moisture fixed; testing' },
  { key: 'termite', label: 'Termite concern', section: 'CONDITION RISKS',
    basis: 'allowance', low: 1000, high: 15000, tierSensitive: false,
    durationDays: 4, path: 'CRITICAL_PATH', prereq: 'Inspection / treatment' },

  // EXTERIOR & SITE
  { key: 'siding', label: 'Siding / cladding', section: 'EXTERIOR & SITE',
    basis: 'per_sf', low: 4, high: 8, tierSensitive: true,
    durationDays: 6, path: 'PARALLEL', prereq: 'Sheathing + WRB' },
  { key: 'exterior', label: 'Exterior work', section: 'EXTERIOR & SITE',
    basis: 'allowance', low: 2000, high: 8000, tierSensitive: false,
    durationDays: 4, path: 'PARALLEL', prereq: 'Envelope dried-in' },
  { key: 'landscaping', label: 'Landscaping', section: 'EXTERIOR & SITE',
    basis: 'allowance', low: 2000, high: 10000, tierSensitive: false,
    durationDays: 4, path: 'PARALLEL', prereq: 'Site/grading complete' },
  { key: 'driveway', label: 'Driveway / hardscape', section: 'EXTERIOR & SITE',
    basis: 'allowance', low: 3000, high: 12000, tierSensitive: false,
    durationDays: 4, path: 'PARALLEL', prereq: 'Grading complete' },

  // PERMITTING
  { key: 'permit_unknown', label: 'Permit path unknown', section: 'PERMITTING',
    basis: 'allowance', low: 500, high: 3000, tierSensitive: false,
    durationDays: 10, path: 'CRITICAL_PATH', prereq: 'Scope/plans defined' },
];

// Items in the Finishes + Kitchen/Bath subtotal used by the gut-overlap credit
// (sections FINISHES & COSMETIC and KITCHEN & BATH). Siding is exterior and is
// excluded on purpose.
export const GUT_CREDIT_SCOPE: ReadonlySet<ScopeKey> = new Set<ScopeKey>([
  'paint', 'flooring', 'drywall', 'windows',
  'kitchen_refresh', 'kitchen_full', 'bath_refresh', 'bath_full',
]);

export const GUT_CREDIT_RATE = 0.08;

// Finish-tier multiplier — applied only to tierSensitive items.
export const FINISH_TIER_MULTIPLIER: Record<1 | 2 | 3, number> = {
  1: 0.90, // Lender-Pass
  2: 1.00, // Market-Standard
  3: 1.25, // Premium
};

export const FINISH_TIER_LABEL: Record<1 | 2 | 3, string> = {
  1: 'Lender-Pass',
  2: 'Market-Standard',
  3: 'Premium',
};

// Contingency
export const CONTINGENCY_BASE = 0.10;
export const CONTINGENCY_PRE_1980_ADD = 0.03;
export const CONTINGENCY_PRE_1960_ADD = 0.05; // not cumulative with pre-1980; pre-1960 wins
export const CONTINGENCY_CONDITION_RISK_ADD = 0.05; // when any CONDITION RISKS item is selected

export const CONDITION_RISK_KEYS: ReadonlySet<ScopeKey> = new Set<ScopeKey>([
  'fire', 'water', 'mold', 'termite',
]);

// Allowance-class items that surface a FIELD VERIFICATION REQUIRED banner
// when selected (per spec: foundation, structural, addition, fire, water,
// mold, termite).
export const FIELD_VERIFICATION_KEYS: ReadonlySet<ScopeKey> = new Set<ScopeKey>([
  'foundation', 'structural', 'addition', 'fire', 'water', 'mold', 'termite',
]);

// Project tier classification:
// full_gut OR foundation OR structural OR addition  → 'Full Gut / Heavy'
// else kitchen_full OR bath_full > 0 OR plumb_full OR elec_full OR hvac OR roof → 'Light Major'
// else 'Cosmetic'
export type ProjectTier = 'Cosmetic' | 'Light Major' | 'Full Gut / Heavy';

// ===================== Lender-Killer Flags ============================
export type FlagSeverity = 'FLAG' | 'CHECK';

export interface LenderKillerFlag {
  key: string;
  label: string;
  /** Inclusive lower year bound; null = no lower bound. */
  minYear: number | null;
  /** Inclusive upper year bound; null = no upper bound. */
  maxYear: number | null;
  severity: FlagSeverity;
  whyLendersCare: string;
}

export const LENDER_KILLER_FLAGS: LenderKillerFlag[] = [
  { key: 'knob_and_tube', label: 'Knob-and-tube wiring',
    minYear: null, maxYear: 1949, severity: 'FLAG',
    whyLendersCare: 'Uninsurable for many carriers; hard-money + DSCR underwriters reject.' },
  { key: 'galvanized_supply', label: 'Galvanized supply piping',
    minYear: null, maxYear: 1959, severity: 'FLAG',
    whyLendersCare: 'Corrosion/pressure failures; inspection-report killer.' },
  { key: 'aluminum_branch_wiring', label: 'Aluminum branch wiring',
    minYear: 1965, maxYear: 1973, severity: 'FLAG',
    whyLendersCare: 'Fire risk; insurers require pigtailing or rewire.' },
  { key: 'cast_iron_dwv', label: 'Cast iron DWV',
    minYear: null, maxYear: 1974, severity: 'FLAG',
    whyLendersCare: 'Bellied/cracked drains; sewer-scope surprise that kills closings.' },
  { key: 'lead_based_paint', label: 'Lead-based paint',
    minYear: null, maxYear: 1977, severity: 'FLAG',
    whyLendersCare: 'Disclosure + RRP rules; matters for FHA-bound end buyers.' },
  { key: 'asbestos_era', label: 'Asbestos-era materials',
    minYear: null, maxYear: 1979, severity: 'FLAG',
    whyLendersCare: 'Abatement cost on disturbance; bids jump on gut scopes.' },
  { key: 'polybutylene_supply', label: 'Polybutylene supply',
    minYear: 1978, maxYear: 1995, severity: 'FLAG',
    whyLendersCare: 'Insurers refuse; full re-pipe usually mandatory — your #1 NC flag.' },
  { key: 'fpe_zinsco', label: 'FPE / Zinsco panel era',
    minYear: 1950, maxYear: 1990, severity: 'CHECK',
    whyLendersCare: 'Breaker failure history; most lenders/insurers want replacement.' },
  { key: 'orangeburg_sewer', label: 'Orangeburg sewer lateral',
    minYear: 1945, maxYear: 1972, severity: 'CHECK',
    whyLendersCare: 'Collapsing fiber pipe; scope the lateral before the buyer does.' },
];

// ===================== Timeline phase mapping =========================
// Within a phase: MAX (trades overlap) unless explicitly SUM (sequential).
// Across phases: SUM (gates are sequential).
// Source: workbook Timeline Model + Sequence Map.

export type PhaseKey =
  | 'P0' | 'P1' | 'P2' | 'P3' | 'P4'
  | 'P5' | 'P6' | 'P7' | 'P8' | 'P9';

export type PhaseAggregation = 'MAX' | 'SUM';

export interface Phase {
  key: PhaseKey;
  label: string;
  items: ScopeKey[];
  aggregation: PhaseAggregation;
  /** Working days that always apply when the project runs at all. */
  baselineDays: number;
}

export const PHASES: Phase[] = [
  { key: 'P0', label: 'Permits & mobilization',
    items: ['permit_unknown'], aggregation: 'MAX', baselineDays: 3 },
  { key: 'P1', label: 'Demo / gut',
    items: ['full_gut'], aggregation: 'MAX', baselineDays: 0 },
  { key: 'P2', label: 'Remediation',
    items: ['fire', 'water', 'mold', 'termite'], aggregation: 'MAX', baselineDays: 0 },
  { key: 'P3', label: 'Foundation / structural / framing',
    items: ['foundation', 'structural', 'framing', 'layout'], aggregation: 'SUM', baselineDays: 0 },
  { key: 'P4', label: 'Roof dry-in',
    items: ['roof'], aggregation: 'MAX', baselineDays: 0 },
  { key: 'P5', label: 'MEP rough-ins',
    items: ['plumb_full', 'plumb_partial', 'elec_full', 'elec_partial', 'hvac'],
    aggregation: 'MAX', baselineDays: 0 },
  // P6 carries an implicit +2 day insulation buffer when drywall or full_gut
  // is selected — see engine.ts.
  { key: 'P6', label: 'Insulation + drywall',
    items: ['drywall'], aggregation: 'MAX', baselineDays: 0 },
  { key: 'P7', label: 'Wet-area finishes',
    items: ['kitchen_full', 'kitchen_refresh', 'bath_full', 'bath_refresh'],
    aggregation: 'MAX', baselineDays: 0 },
  // P8: paint then flooring is sequential per Sequence Map.
  { key: 'P8', label: 'General finishes',
    items: ['paint', 'flooring'], aggregation: 'SUM', baselineDays: 0 },
  { key: 'P9', label: 'MEP trim + punch',
    items: [], aggregation: 'MAX', baselineDays: 3 },
];

export const P6_INSULATION_BUFFER_DAYS = 2;
export const ADDITION_PATH_BUILD_DAYS = 45;
export const CALENDAR_WEEK_BUFFER = 1.15;
