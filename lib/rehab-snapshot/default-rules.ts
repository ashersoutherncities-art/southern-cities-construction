import { EstimateRuleRecord, MarketTierRecord } from '@/lib/rehab-snapshot/types';

export const DEFAULT_ESTIMATE_RULES: EstimateRuleRecord[] = [
  // ----------------------------------------------------------------------
  // Base per-SF cost by project category — STATEWIDE NC BASELINE.
  // These are deliberately set to a mid-state baseline; the market-tier
  // multiplier (see DEFAULT_MARKET_TIERS) then scales them up for metro
  // markets (Charlotte/Raleigh/Asheville) and down for rural NC. Do not
  // bake metro pricing into these — that's the tier's job.
  // ----------------------------------------------------------------------
  { rule_name: 'base-cosmetic', category: 'base_cost', condition_json: { project_category: 'cosmetic' }, low_value: 20, high_value: 40, unit: 'per_sf', active: true },
  { rule_name: 'base-rental-turn', category: 'base_cost', condition_json: { project_category: 'rental_turn' }, low_value: 18, high_value: 45, unit: 'per_sf', active: true },
  { rule_name: 'base-moderate-rehab', category: 'base_cost', condition_json: { project_category: 'moderate_rehab' }, low_value: 42, high_value: 85, unit: 'per_sf', active: true },
  { rule_name: 'base-heavy-rehab', category: 'base_cost', condition_json: { project_category: 'heavy_rehab' }, low_value: 85, high_value: 160, unit: 'per_sf', active: true },
  { rule_name: 'base-full-gut', category: 'base_cost', condition_json: { project_category: 'full_gut' }, low_value: 130, high_value: 230, unit: 'per_sf', active: true },
  { rule_name: 'base-structural-heavy', category: 'base_cost', condition_json: { project_category: 'structural_heavy' }, low_value: 160, high_value: 280, unit: 'per_sf', active: true },
  { rule_name: 'base-addition', category: 'base_cost', condition_json: { project_category: 'addition' }, low_value: 165, high_value: 325, unit: 'per_sf', active: true },
  { rule_name: 'base-unknown', category: 'base_cost', condition_json: { project_category: 'unknown' }, low_value: 48, high_value: 110, unit: 'per_sf', active: true },

  { rule_name: 'finish-rental-grade', category: 'finish_multiplier', condition_json: { target_finish_level: 'rental_grade' }, low_value: 0.9, high_value: 0.9, unit: 'multiplier', active: true },
  { rule_name: 'finish-basic-flip', category: 'finish_multiplier', condition_json: { target_finish_level: 'basic_flip' }, low_value: 1, high_value: 1, unit: 'multiplier', active: true },
  { rule_name: 'finish-mid-grade', category: 'finish_multiplier', condition_json: { target_finish_level: 'mid_grade' }, low_value: 1.15, high_value: 1.15, unit: 'multiplier', active: true },
  { rule_name: 'finish-high-end', category: 'finish_multiplier', condition_json: { target_finish_level: 'high_end' }, low_value: 1.35, high_value: 1.35, unit: 'multiplier', active: true },
  { rule_name: 'finish-luxury', category: 'finish_multiplier', condition_json: { target_finish_level: 'luxury' }, low_value: 1.75, high_value: 1.75, unit: 'multiplier', active: true },

  { rule_name: 'age-before-1940', category: 'age_multiplier', condition_json: { max_year_built: 1939 }, low_value: 1.2, high_value: 1.2, unit: 'multiplier', active: true },
  { rule_name: 'age-1940-1979', category: 'age_multiplier', condition_json: { min_year_built: 1940, max_year_built: 1979 }, low_value: 1.12, high_value: 1.12, unit: 'multiplier', active: true },
  { rule_name: 'age-1980-1999', category: 'age_multiplier', condition_json: { min_year_built: 1980, max_year_built: 1999 }, low_value: 1.06, high_value: 1.06, unit: 'multiplier', active: true },
  { rule_name: 'age-2000-plus', category: 'age_multiplier', condition_json: { min_year_built: 2000 }, low_value: 1, high_value: 1, unit: 'multiplier', active: true },

  { rule_name: 'risk-water-damage', category: 'risk_multiplier', condition_json: { field: 'water_damage', label: 'Water damage', risk_flag: 'Water damage often expands after demolition and can pull hidden framing, subfloor, and mold exposure into the job.' }, low_value: 1.08, high_value: 1.18, unit: 'multiplier', active: true },
  { rule_name: 'risk-fire-damage', category: 'risk_multiplier', condition_json: { field: 'fire_damage', label: 'Fire damage', risk_flag: 'Fire damage can move the project into hidden framing, insulation, smoke remediation, and full-system replacement territory.' }, low_value: 1.2, high_value: 1.5, unit: 'multiplier', active: true },
  { rule_name: 'risk-framing', category: 'risk_multiplier', condition_json: { field: 'framing', label: 'Framing work', risk_flag: 'Framing work usually means structure is being opened, sequencing tightens up, and the budget becomes more exposed to hidden conditions.' }, low_value: 1.08, high_value: 1.22, unit: 'multiplier', active: true },
  { rule_name: 'risk-structural', category: 'risk_multiplier', condition_json: { field: 'structural', label: 'Structural concern', risk_flag: 'Structural issues can change the scope materially once engineering, demolition, and rebuild sequencing are validated.' }, low_value: 1.2, high_value: 1.6, unit: 'multiplier', active: true },
  { rule_name: 'risk-foundation', category: 'risk_multiplier', condition_json: { field: 'foundation', label: 'Foundation concern', risk_flag: 'Foundation concerns can materially change sequencing, engineer involvement, and repair cost once exposed.' }, low_value: 1.2, high_value: 1.6, unit: 'multiplier', active: true },
  { rule_name: 'risk-electrical-full', category: 'risk_multiplier', condition_json: { field: 'electrical_full', label: 'Full electrical', risk_flag: 'Full electrical replacement adds wall-open work, panel coordination, and inspection exposure.' }, low_value: 1.08, high_value: 1.2, unit: 'multiplier', active: true },
  { rule_name: 'risk-plumbing-full', category: 'risk_multiplier', condition_json: { field: 'plumbing_full', label: 'Full plumbing', risk_flag: 'Full plumbing replacement adds access, trade coordination, and wall-close sequencing exposure.' }, low_value: 1.08, high_value: 1.2, unit: 'multiplier', active: true },
  { rule_name: 'risk-layout-changes', category: 'risk_multiplier', condition_json: { field: 'layout_changes', label: 'Layout changes', risk_flag: 'Layout changes usually move the job out of straight finish work and into coordination, framing, and permit risk.' }, low_value: 1.1, high_value: 1.25, unit: 'multiplier', active: true },
  { rule_name: 'risk-addition', category: 'risk_multiplier', condition_json: { field: 'addition', label: 'Addition', risk_flag: 'Additions increase permitting, structural integration, and schedule risk well beyond a standard rehab.' }, low_value: 1.25, high_value: 1.8, unit: 'multiplier', active: true },
  { rule_name: 'risk-permit-unknown', category: 'risk_multiplier', condition_json: { field: 'permit_required_unknown', label: 'Unknown permit complexity', risk_flag: 'Unknown permit complexity can change both cost and timeline once trade, zoning, and jurisdiction requirements are known.' }, low_value: 1.05, high_value: 1.15, unit: 'multiplier', active: true },

  { rule_name: 'allowance-roof', category: 'scope_line', condition_json: { field: 'roof', label: 'Roof replacement' }, low_value: 7500, high_value: 18000, unit: 'flat', active: true },
  { rule_name: 'allowance-hvac', category: 'scope_line', condition_json: { field: 'hvac', label: 'HVAC replacement' }, low_value: 8000, high_value: 16000, unit: 'flat', active: true },
  { rule_name: 'allowance-kitchen-full', category: 'scope_line', condition_json: { field: 'kitchen_full', label: 'Full kitchen renovation' }, low_value: 18000, high_value: 45000, unit: 'flat', active: true },
  { rule_name: 'allowance-bathroom-full', category: 'scope_line', condition_json: { field: 'bathroom_full_count', label: 'Full bathroom renovation' }, low_value: 8000, high_value: 22000, unit: 'per_item', active: true },
  { rule_name: 'allowance-windows', category: 'scope_line', condition_json: { field: 'windows', label: 'Windows', fallback_count: 10 }, low_value: 600, high_value: 1500, unit: 'per_item', active: true },
  { rule_name: 'allowance-electrical-full', category: 'scope_line', condition_json: { field: 'electrical_full', label: 'Electrical full rewire' }, low_value: 10000, high_value: 28000, unit: 'flat', active: true },
  { rule_name: 'allowance-plumbing-full', category: 'scope_line', condition_json: { field: 'plumbing_full', label: 'Plumbing full replacement' }, low_value: 10000, high_value: 28000, unit: 'flat', active: true },
  { rule_name: 'allowance-framing', category: 'scope_line', condition_json: { field: 'framing', label: 'Framing scope allowance' }, low_value: 8000, high_value: 30000, unit: 'flat', active: true },
  { rule_name: 'allowance-foundation', category: 'scope_line', condition_json: { field: 'foundation', label: 'Foundation scope allowance' }, low_value: 12000, high_value: 45000, unit: 'flat', active: true },
  { rule_name: 'allowance-siding', category: 'scope_line', condition_json: { field: 'siding', label: 'Siding' }, low_value: 10000, high_value: 30000, unit: 'flat', active: true },

  { rule_name: 'timeline-permit-high', category: 'timeline_risk', condition_json: { permit_complexity: 'high', label: 'Permit complexity high' }, low_value: 4, high_value: 12, unit: 'weeks', active: true },
  { rule_name: 'timeline-structural', category: 'timeline_risk', condition_json: { any_fields: ['framing', 'structural', 'foundation'], label: 'Framing, structural, or foundation work' }, low_value: 4, high_value: 16, unit: 'weeks', active: true },
  { rule_name: 'timeline-damage', category: 'timeline_risk', condition_json: { any_fields: ['fire_damage', 'water_damage'], label: 'Fire or water damage' }, low_value: 3, high_value: 10, unit: 'weeks', active: true },
  { rule_name: 'timeline-systems', category: 'timeline_risk', condition_json: { any_fields: ['electrical_full', 'plumbing_full', 'hvac'], label: 'Full systems replacement' }, low_value: 2, high_value: 8, unit: 'weeks', active: true },
];

/**
 * Statewide-default market tier table (fallback when the Supabase
 * `market_tiers` table is unavailable). Maps NC 3-digit ZIP prefixes to a
 * regional cost tier + base-cost multiplier.
 *
 *   Tier A — high-cost metros (Charlotte, Triangle, Asheville/mountains)
 *   Tier B — mid-cost (Triad, Wilmington, Hickory)
 *   Tier C — lower-cost rural / eastern NC
 *
 * Multipliers scale the per-SF BASE cost only.
 */
export const DEFAULT_MARKET_TIERS: MarketTierRecord[] = [
  // Tier A — high-cost metros
  { zip_prefix: '275', tier: 'A', label: 'Raleigh', cost_multiplier_low: 1.10, cost_multiplier_high: 1.18, active: true },
  { zip_prefix: '276', tier: 'A', label: 'Raleigh–Durham', cost_multiplier_low: 1.10, cost_multiplier_high: 1.18, active: true },
  { zip_prefix: '277', tier: 'A', label: 'Durham', cost_multiplier_low: 1.10, cost_multiplier_high: 1.18, active: true },
  { zip_prefix: '280', tier: 'A', label: 'Charlotte Metro (Gastonia)', cost_multiplier_low: 1.10, cost_multiplier_high: 1.18, active: true },
  { zip_prefix: '281', tier: 'A', label: 'Charlotte Metro', cost_multiplier_low: 1.10, cost_multiplier_high: 1.18, active: true },
  { zip_prefix: '282', tier: 'A', label: 'Charlotte', cost_multiplier_low: 1.12, cost_multiplier_high: 1.20, active: true },
  { zip_prefix: '287', tier: 'A', label: 'Asheville Area', cost_multiplier_low: 1.10, cost_multiplier_high: 1.18, active: true },
  { zip_prefix: '288', tier: 'A', label: 'Asheville', cost_multiplier_low: 1.10, cost_multiplier_high: 1.18, active: true },
  { zip_prefix: '289', tier: 'A', label: 'Western NC Mountains', cost_multiplier_low: 1.08, cost_multiplier_high: 1.16, active: true },
  // Tier B — mid-cost
  { zip_prefix: '270', tier: 'B', label: 'Greensboro', cost_multiplier_low: 1.00, cost_multiplier_high: 1.05, active: true },
  { zip_prefix: '271', tier: 'B', label: 'Winston-Salem', cost_multiplier_low: 1.00, cost_multiplier_high: 1.05, active: true },
  { zip_prefix: '272', tier: 'B', label: 'Greensboro', cost_multiplier_low: 1.00, cost_multiplier_high: 1.05, active: true },
  { zip_prefix: '273', tier: 'B', label: 'Triad', cost_multiplier_low: 1.00, cost_multiplier_high: 1.05, active: true },
  { zip_prefix: '274', tier: 'B', label: 'High Point', cost_multiplier_low: 1.00, cost_multiplier_high: 1.05, active: true },
  { zip_prefix: '284', tier: 'B', label: 'Wilmington', cost_multiplier_low: 1.02, cost_multiplier_high: 1.08, active: true },
  { zip_prefix: '286', tier: 'B', label: 'Hickory', cost_multiplier_low: 0.98, cost_multiplier_high: 1.04, active: true },
  // Tier C — lower-cost rural / eastern NC
  { zip_prefix: '278', tier: 'C', label: 'Rocky Mount', cost_multiplier_low: 0.90, cost_multiplier_high: 0.96, active: true },
  { zip_prefix: '279', tier: 'C', label: 'Elizabeth City', cost_multiplier_low: 0.90, cost_multiplier_high: 0.96, active: true },
  { zip_prefix: '283', tier: 'C', label: 'Fayetteville', cost_multiplier_low: 0.92, cost_multiplier_high: 0.98, active: true },
  { zip_prefix: '285', tier: 'C', label: 'Kinston / Goldsboro', cost_multiplier_low: 0.90, cost_multiplier_high: 0.96, active: true },
];

/**
 * Applied when the ZIP doesn't match a known NC prefix (or is out of state).
 * Slight high-side buffer to stay conservative on unknown markets.
 */
export const DEFAULT_REGION_FALLBACK = {
  tier: 'NC',
  label: 'Statewide NC (default)',
  cost_multiplier_low: 1.0,
  cost_multiplier_high: 1.05,
};
