import { EstimateRuleRecord, MarketTierRecord } from '@/lib/rehab-snapshot/types';

export const DEFAULT_ESTIMATE_RULES: EstimateRuleRecord[] = [
  // ----------------------------------------------------------------------
  // Base per-SF cost by project category — STATEWIDE NC BASELINE, anchored
  // to the reality that contractor-grade NEW construction in NC is ~$125/SF.
  // A rehab keeps the shell/foundation/framing/roof structure, so it should
  // cost a FRACTION of new-build for most categories. Only a full gut (to
  // the studs), structural-heavy, or an addition (net-new square footage)
  // should approach or exceed new-build cost per SF.
  //
  // These bases represent a basic-flip finish, newer build, average market
  // (all multipliers = 1.0). The finish / age / market-tier multipliers
  // then scale up from here. After the full multiplier stack + contingency,
  // effective $/SF should land roughly:
  //   cosmetic $15-40 · moderate $40-90 · heavy $70-125 ·
  //   full gut $110-175 · structural $120-190 · addition $135-210.
  // ----------------------------------------------------------------------
  // RAW $/SF (a 25% GC fee is added later in the engine to get all-in). Values
  // represent a BASIC-FLIP finish, typical mid-century age, average NC market
  // (all multipliers = 1.0). Anchored to real SCC jobs: a comprehensive full
  // reno (full systems + kitchen + finishes) ran ~$55/SF raw → that's the
  // heavy_rehab center; a light systems-reset reno ran ~$22/SF raw → rental_turn.
  { rule_name: 'base-cosmetic', category: 'base_cost', condition_json: { project_category: 'cosmetic' }, low_value: 12, high_value: 24, unit: 'per_sf', active: true },
  { rule_name: 'base-rental-turn', category: 'base_cost', condition_json: { project_category: 'rental_turn' }, low_value: 15, high_value: 28, unit: 'per_sf', active: true },
  { rule_name: 'base-moderate-rehab', category: 'base_cost', condition_json: { project_category: 'moderate_rehab' }, low_value: 28, high_value: 46, unit: 'per_sf', active: true },
  { rule_name: 'base-heavy-rehab', category: 'base_cost', condition_json: { project_category: 'heavy_rehab' }, low_value: 40, high_value: 58, unit: 'per_sf', active: true },
  { rule_name: 'base-full-gut', category: 'base_cost', condition_json: { project_category: 'full_gut' }, low_value: 58, high_value: 85, unit: 'per_sf', active: true },
  { rule_name: 'base-structural-heavy', category: 'base_cost', condition_json: { project_category: 'structural_heavy' }, low_value: 78, high_value: 115, unit: 'per_sf', active: true },
  { rule_name: 'base-addition', category: 'base_cost', condition_json: { project_category: 'addition' }, low_value: 70, high_value: 105, unit: 'per_sf', active: true },
  { rule_name: 'base-unknown', category: 'base_cost', condition_json: { project_category: 'unknown' }, low_value: 28, high_value: 52, unit: 'per_sf', active: true },

  // Finish multipliers CENTERED on basic_flip = 1.0 (the common investor case).
  // A typical flip should not be inflated; only above/below basic adjusts.
  { rule_name: 'finish-rental-grade', category: 'finish_multiplier', condition_json: { target_finish_level: 'rental_grade' }, low_value: 0.88, high_value: 0.88, unit: 'multiplier', active: true },
  { rule_name: 'finish-basic-flip', category: 'finish_multiplier', condition_json: { target_finish_level: 'basic_flip' }, low_value: 1, high_value: 1, unit: 'multiplier', active: true },
  { rule_name: 'finish-mid-grade', category: 'finish_multiplier', condition_json: { target_finish_level: 'mid_grade' }, low_value: 1.12, high_value: 1.12, unit: 'multiplier', active: true },
  { rule_name: 'finish-high-end', category: 'finish_multiplier', condition_json: { target_finish_level: 'high_end' }, low_value: 1.3, high_value: 1.3, unit: 'multiplier', active: true },
  { rule_name: 'finish-luxury', category: 'finish_multiplier', condition_json: { target_finish_level: 'luxury' }, low_value: 1.6, high_value: 1.6, unit: 'multiplier', active: true },

  // Age multipliers CENTERED on typical mid-century (1940–79) = 1.0. Older
  // stock carries modest extra exposure; newer is slightly cheaper.
  { rule_name: 'age-before-1940', category: 'age_multiplier', condition_json: { max_year_built: 1939 }, low_value: 1.08, high_value: 1.08, unit: 'multiplier', active: true },
  { rule_name: 'age-1940-1979', category: 'age_multiplier', condition_json: { min_year_built: 1940, max_year_built: 1979 }, low_value: 1.0, high_value: 1.0, unit: 'multiplier', active: true },
  { rule_name: 'age-1980-1999', category: 'age_multiplier', condition_json: { min_year_built: 1980, max_year_built: 1999 }, low_value: 0.97, high_value: 0.97, unit: 'multiplier', active: true },
  { rule_name: 'age-2000-plus', category: 'age_multiplier', condition_json: { min_year_built: 2000 }, low_value: 0.95, high_value: 0.95, unit: 'multiplier', active: true },

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

  // Flat allowances reflect NC basic-flip / investor-grade pricing (not
  // high-end-finish). These apply ONLY to lighter categories (cosmetic /
  // rental_turn / moderate / unknown); heavy+ categories already embed these
  // systems in their per-SF base (see engine double-count suppression).
  { rule_name: 'allowance-roof', category: 'scope_line', condition_json: { field: 'roof', label: 'Roof replacement' }, low_value: 6000, high_value: 14000, unit: 'flat', active: true },
  { rule_name: 'allowance-hvac', category: 'scope_line', condition_json: { field: 'hvac', label: 'HVAC replacement' }, low_value: 6000, high_value: 12000, unit: 'flat', active: true },
  { rule_name: 'allowance-kitchen-full', category: 'scope_line', condition_json: { field: 'kitchen_full', label: 'Full kitchen renovation' }, low_value: 12000, high_value: 28000, unit: 'flat', active: true },
  { rule_name: 'allowance-bathroom-full', category: 'scope_line', condition_json: { field: 'bathroom_full_count', label: 'Full bathroom renovation' }, low_value: 6000, high_value: 14000, unit: 'per_item', active: true },
  { rule_name: 'allowance-windows', category: 'scope_line', condition_json: { field: 'windows', label: 'Windows', fallback_count: 10 }, low_value: 500, high_value: 1000, unit: 'per_item', active: true },
  { rule_name: 'allowance-electrical-full', category: 'scope_line', condition_json: { field: 'electrical_full', label: 'Electrical full rewire' }, low_value: 8000, high_value: 18000, unit: 'flat', active: true },
  { rule_name: 'allowance-plumbing-full', category: 'scope_line', condition_json: { field: 'plumbing_full', label: 'Plumbing full replacement' }, low_value: 8000, high_value: 18000, unit: 'flat', active: true },
  { rule_name: 'allowance-framing', category: 'scope_line', condition_json: { field: 'framing', label: 'Framing scope allowance' }, low_value: 6000, high_value: 20000, unit: 'flat', active: true },
  { rule_name: 'allowance-foundation', category: 'scope_line', condition_json: { field: 'foundation', label: 'Foundation scope allowance' }, low_value: 10000, high_value: 35000, unit: 'flat', active: true },
  { rule_name: 'allowance-siding', category: 'scope_line', condition_json: { field: 'siding', label: 'Siding' }, low_value: 8000, high_value: 22000, unit: 'flat', active: true },

  { rule_name: 'timeline-permit-high', category: 'timeline_risk', condition_json: { permit_complexity: 'high', label: 'Permit complexity high' }, low_value: 4, high_value: 12, unit: 'weeks', active: true },
  { rule_name: 'timeline-structural', category: 'timeline_risk', condition_json: { any_fields: ['framing', 'structural', 'foundation'], label: 'Framing, structural, or foundation work' }, low_value: 4, high_value: 16, unit: 'weeks', active: true },
  { rule_name: 'timeline-damage', category: 'timeline_risk', condition_json: { any_fields: ['fire_damage', 'water_damage'], label: 'Fire or water damage' }, low_value: 3, high_value: 10, unit: 'weeks', active: true },
  { rule_name: 'timeline-systems', category: 'timeline_risk', condition_json: { any_fields: ['electrical_full', 'plumbing_full', 'hvac'], label: 'Full systems replacement' }, low_value: 2, high_value: 8, unit: 'weeks', active: true },
];

/**
 * NC regional cost multipliers, sourced from the openclaw cost-analyzer
 * skill's `nc-region-multipliers.json` (RSMeans-derived NC metro/micropolitan
 * city cost indexes), mapped to 3-digit ZIP prefixes. The real NC spread is
 * TIGHT — roughly ±5% from the statewide average, not the ±20% that was
 * guessed previously. The multiplier is a single point value per region
 * (applied equally to low and high) because regional cost shifts the LEVEL,
 * not the spread. tier letter is display-only (A >1.0, B ~1.0, C <0.98).
 */
export const DEFAULT_MARKET_TIERS: MarketTierRecord[] = [
  // Triangle (Raleigh-Cary 1.04, Durham-Chapel Hill 1.04)
  { zip_prefix: '275', tier: 'A', label: 'Raleigh', cost_multiplier_low: 1.04, cost_multiplier_high: 1.04, active: true },
  { zip_prefix: '276', tier: 'A', label: 'Raleigh–Durham', cost_multiplier_low: 1.04, cost_multiplier_high: 1.04, active: true },
  { zip_prefix: '277', tier: 'A', label: 'Durham', cost_multiplier_low: 1.04, cost_multiplier_high: 1.04, active: true },
  // Charlotte-Concord-Gastonia 1.03
  { zip_prefix: '280', tier: 'A', label: 'Charlotte Metro (Gastonia)', cost_multiplier_low: 1.03, cost_multiplier_high: 1.03, active: true },
  { zip_prefix: '281', tier: 'A', label: 'Charlotte Metro', cost_multiplier_low: 1.03, cost_multiplier_high: 1.03, active: true },
  { zip_prefix: '282', tier: 'A', label: 'Charlotte', cost_multiplier_low: 1.03, cost_multiplier_high: 1.03, active: true },
  // Asheville 1.02, Wilmington 1.01
  { zip_prefix: '287', tier: 'A', label: 'Asheville Area', cost_multiplier_low: 1.02, cost_multiplier_high: 1.02, active: true },
  { zip_prefix: '288', tier: 'A', label: 'Asheville', cost_multiplier_low: 1.02, cost_multiplier_high: 1.02, active: true },
  { zip_prefix: '289', tier: 'A', label: 'Western NC Mountains', cost_multiplier_low: 1.02, cost_multiplier_high: 1.02, active: true },
  { zip_prefix: '284', tier: 'A', label: 'Wilmington', cost_multiplier_low: 1.01, cost_multiplier_high: 1.01, active: true },
  // Triad (Greensboro-High Point 0.98, Winston-Salem 0.98)
  { zip_prefix: '270', tier: 'B', label: 'Greensboro', cost_multiplier_low: 0.98, cost_multiplier_high: 0.98, active: true },
  { zip_prefix: '271', tier: 'B', label: 'Winston-Salem', cost_multiplier_low: 0.98, cost_multiplier_high: 0.98, active: true },
  { zip_prefix: '272', tier: 'B', label: 'Greensboro', cost_multiplier_low: 0.98, cost_multiplier_high: 0.98, active: true },
  { zip_prefix: '273', tier: 'B', label: 'Triad', cost_multiplier_low: 0.98, cost_multiplier_high: 0.98, active: true },
  { zip_prefix: '274', tier: 'B', label: 'High Point', cost_multiplier_low: 0.98, cost_multiplier_high: 0.98, active: true },
  // Fayetteville 0.97, Hickory-Lenoir-Morganton 0.97
  { zip_prefix: '283', tier: 'C', label: 'Fayetteville', cost_multiplier_low: 0.97, cost_multiplier_high: 0.97, active: true },
  { zip_prefix: '286', tier: 'C', label: 'Hickory', cost_multiplier_low: 0.97, cost_multiplier_high: 0.97, active: true },
  // Rocky Mount 0.95, Goldsboro 0.96, Kinston 0.94, Elizabeth City 0.95
  { zip_prefix: '278', tier: 'C', label: 'Rocky Mount', cost_multiplier_low: 0.95, cost_multiplier_high: 0.95, active: true },
  { zip_prefix: '279', tier: 'C', label: 'Elizabeth City', cost_multiplier_low: 0.95, cost_multiplier_high: 0.95, active: true },
  { zip_prefix: '285', tier: 'C', label: 'Kinston / Goldsboro', cost_multiplier_low: 0.95, cost_multiplier_high: 0.95, active: true },
];

/**
 * Applied when the ZIP doesn't match a known NC prefix (or is out of state).
 * RSMeans NC "default" index is 1.00 — no high-side guessing.
 */
export const DEFAULT_REGION_FALLBACK = {
  tier: 'NC',
  label: 'Statewide NC (default)',
  cost_multiplier_low: 1.0,
  cost_multiplier_high: 1.0,
};
