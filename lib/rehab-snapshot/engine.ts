import { tryGetServiceClient } from '@/lib/supabase';
import {
  DEFAULT_ESTIMATE_RULES,
  DEFAULT_MARKET_TIERS,
  DEFAULT_REGION_FALLBACK,
} from '@/lib/rehab-snapshot/default-rules';
import {
  ConfidenceLevel,
  EstimateBreakdownRow,
  EstimateComputation,
  EstimateRuleRecord,
  ExecutionDifficulty,
  MarketTierRecord,
  PermitComplexity,
  ProjectCategory,
  RehabSnapshotProjectInput,
  RehabSnapshotScopeInput,
  ResolvedMarketTier,
  TargetFinishLevel,
} from '@/lib/rehab-snapshot/types';

type RuleCondition = Record<string, unknown>;

type EngineInput = {
  project: RehabSnapshotProjectInput;
  scope: RehabSnapshotScopeInput;
  hasPhotos?: boolean;
  hasWalkthroughVideo?: boolean;
};

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  cosmetic: 'Cosmetic',
  rental_turn: 'Rental Turn',
  moderate_rehab: 'Moderate Rehab',
  heavy_rehab: 'Heavy Rehab',
  full_gut: 'Full Gut',
  structural_heavy: 'Structural Heavy',
  addition: 'Addition',
  unknown: 'Unknown',
};

// GC fee applied to the raw construction cost to produce the ALL-IN price an
// investor would pay (raw trade cost + contractor overhead & profit). The
// rules in estimate_rules hold RAW cost; this is the only place margin is
// added. Set per SCC: 25%. (Reference: openclaw costs.db markup_factors lists
// 18% OH&P + 12% sub markup; 25% is SCC's blended all-in fee.)
const GC_FEE_RATE = 0.25;

// Hard backstop: maximum sane ALL-IN $/SF per category. Anchored to the
// RSMeans residential NEW-CONSTRUCTION reference (openclaw RSMeans export
// EC_REAL_Cost_RES: economy 1-story residential, Elizabeth City NC, 2026 Q1 =
// $153.35/SF all-in; ~$161/SF national). A rehab reuses the existing shell,
// foundation, and framing, so NO rehab category may exceed new construction —
// except an addition, which is net-new square footage with tie-in complexity.
// Full gut caps just at new-build; everything else scales down from there.
const PER_SF_CEILING: Record<ProjectCategory, number> = {
  cosmetic: 45,
  rental_turn: 40,
  moderate_rehab: 80,
  heavy_rehab: 110,
  full_gut: 155,
  structural_heavy: 170,
  addition: 185,
  unknown: 100,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function roundCurrency(value: number) {
  return Math.round(value / 250) * 250;
}

function pickRule(
  rules: EstimateRuleRecord[],
  category: string,
  matcher: (rule: EstimateRuleRecord) => boolean
) {
  return rules.find((rule) => rule.category === category && matcher(rule));
}

function isTruthyScopeField(scope: RehabSnapshotScopeInput, key: string) {
  return Boolean(scope[key as keyof RehabSnapshotScopeInput]);
}

function scopeCount(scope: RehabSnapshotScopeInput, key: string) {
  const value = scope[key as keyof RehabSnapshotScopeInput];
  return typeof value === 'number' ? value : value ? 1 : 0;
}

function hasAny(scope: RehabSnapshotScopeInput, fields: string[]) {
  return fields.some((field) => isTruthyScopeField(scope, field) || scopeCount(scope, field) > 0);
}

export async function loadEstimateRules(): Promise<EstimateRuleRecord[]> {
  const supabase = tryGetServiceClient();
  if (!supabase) return DEFAULT_ESTIMATE_RULES;

  try {
    const { data, error } = await supabase
      .from('estimate_rules')
      .select('rule_name, category, condition_json, low_value, high_value, unit, active')
      .eq('active', true)
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_ESTIMATE_RULES;
    }

    return data as EstimateRuleRecord[];
  } catch {
    return DEFAULT_ESTIMATE_RULES;
  }
}

export async function loadMarketTiers(): Promise<MarketTierRecord[]> {
  const supabase = tryGetServiceClient();
  if (!supabase) return DEFAULT_MARKET_TIERS;

  try {
    const { data, error } = await supabase
      .from('market_tiers')
      .select('zip_prefix, tier, label, cost_multiplier_low, cost_multiplier_high, active')
      .eq('active', true);

    if (error || !data || data.length === 0) {
      return DEFAULT_MARKET_TIERS;
    }

    return data as MarketTierRecord[];
  } catch {
    return DEFAULT_MARKET_TIERS;
  }
}

/**
 * Resolve a project ZIP to a regional cost tier. Matches on the 3-digit
 * ZIP prefix; falls back to the statewide default when nothing matches.
 */
export function resolveMarketTier(
  zip: string | null | undefined,
  tiers: MarketTierRecord[]
): ResolvedMarketTier {
  const prefix = String(zip || '').replace(/[^0-9]/g, '').slice(0, 3);
  if (prefix.length === 3) {
    const match = tiers.find((tier) => tier.zip_prefix === prefix && tier.active !== false);
    if (match) {
      return {
        tier: match.tier,
        label: match.label,
        multiplierLow: match.cost_multiplier_low,
        multiplierHigh: match.cost_multiplier_high,
        matched: true,
      };
    }
  }
  return {
    tier: DEFAULT_REGION_FALLBACK.tier,
    label: DEFAULT_REGION_FALLBACK.label,
    multiplierLow: DEFAULT_REGION_FALLBACK.cost_multiplier_low,
    multiplierHigh: DEFAULT_REGION_FALLBACK.cost_multiplier_high,
    matched: false,
  };
}

export function classifyProjectCategory(
  project: RehabSnapshotProjectInput,
  scope: RehabSnapshotScopeInput
): ProjectCategory {
  if (scope.addition) return 'addition';
  if (scope.structural || scope.foundation) return 'structural_heavy';
  if (scope.full_gut) return 'full_gut';
  if (scope.fire_damage) return 'heavy_rehab';

  const heavySignals =
    Number(scope.kitchen_full) +
    scope.bathroom_full_count +
    Number(scope.roof) +
    Number(scope.hvac) +
    Number(scope.plumbing_full) +
    Number(scope.electrical_full) +
    Number(scope.framing) +
    Number(scope.layout_changes) +
    Number(scope.water_damage);

  const cosmeticSignals =
    Number(scope.cosmetic_paint) +
    Number(scope.flooring) +
    Number(scope.kitchen_refresh) +
    scope.bathroom_refresh_count +
    Number(scope.windows) +
    Number(scope.siding) +
    Number(scope.exterior_work);

  // Heavy rehab implies a gut-adjacent scope. A kitchen + a couple baths +
  // HVAC is a substantial MODERATE rehab, not "heavy" — require 5+ heavy
  // signals (or a genuinely heavy item, handled above) before escalating.
  if (heavySignals >= 5) return 'heavy_rehab';
  if (heavySignals >= 1) return 'moderate_rehab';
  if (project.investment_strategy === 'rental' || project.target_finish_level === 'rental_grade') {
    return cosmeticSignals >= 2 ? 'rental_turn' : 'moderate_rehab';
  }
  if (cosmeticSignals >= 2) return 'cosmetic';
  return 'unknown';
}

function getBaseCostRule(rules: EstimateRuleRecord[], projectCategory: ProjectCategory) {
  return (
    pickRule(rules, 'base_cost', (rule) => rule.condition_json.project_category === projectCategory) ||
    DEFAULT_ESTIMATE_RULES.find(
      (rule) => rule.category === 'base_cost' && rule.condition_json.project_category === 'unknown'
    )!
  );
}

function getFinishMultiplier(rules: EstimateRuleRecord[], finishLevel: TargetFinishLevel) {
  return (
    pickRule(
      rules,
      'finish_multiplier',
      (rule) => rule.condition_json.target_finish_level === finishLevel
    ) || {
      rule_name: 'finish-default',
      category: 'finish_multiplier',
      condition_json: {},
      low_value: 1,
      high_value: 1,
      unit: 'multiplier' as const,
    }
  );
}

function getAgeMultiplier(rules: EstimateRuleRecord[], yearBuilt: number | null) {
  if (!yearBuilt) {
    return {
      rule_name: 'age-default',
      category: 'age_multiplier',
      condition_json: {},
      low_value: 1,
      high_value: 1,
      unit: 'multiplier' as const,
    };
  }

  return (
    rules.find((rule) => {
      if (rule.category !== 'age_multiplier') return false;
      const condition = rule.condition_json as RuleCondition;
      const minYear = typeof condition.min_year_built === 'number' ? condition.min_year_built : -Infinity;
      const maxYear = typeof condition.max_year_built === 'number' ? condition.max_year_built : Infinity;
      return yearBuilt >= minYear && yearBuilt <= maxYear;
    }) || {
      rule_name: 'age-default',
      category: 'age_multiplier',
      condition_json: {},
      low_value: 1,
      high_value: 1,
      unit: 'multiplier' as const,
    }
  );
}

function inferPermitComplexity(projectCategory: ProjectCategory, scope: RehabSnapshotScopeInput): PermitComplexity {
  if (scope.permit_required_unknown) return 'unknown';
  if (scope.addition || scope.structural || scope.foundation || scope.full_gut) return 'high';
  if (scope.framing) return 'moderate';
  if (
    scope.layout_changes ||
    scope.electrical_full ||
    scope.plumbing_full ||
    scope.hvac ||
    scope.roof
  ) {
    return 'moderate';
  }
  if (projectCategory === 'cosmetic' || projectCategory === 'rental_turn') return 'low';
  return 'moderate';
}

function inferExecutionDifficulty(
  projectCategory: ProjectCategory,
  scope: RehabSnapshotScopeInput
): ExecutionDifficulty {
  if (projectCategory === 'addition' || projectCategory === 'structural_heavy') return 'severe';
  if (projectCategory === 'full_gut' || projectCategory === 'heavy_rehab') return 'high';
  if (projectCategory === 'moderate_rehab' || scope.framing || scope.layout_changes || scope.electrical_full || scope.plumbing_full) {
    return 'moderate';
  }
  return 'low';
}

function buildScopeLineItems(rules: EstimateRuleRecord[], scope: RehabSnapshotScopeInput) {
  const rows: EstimateBreakdownRow[] = [];

  for (const rule of rules.filter((item) => item.category === 'scope_line')) {
    const condition = rule.condition_json as RuleCondition;
    const field = String(condition.field || '');
    if (!field) continue;

    const rawValue = scope[field as keyof RehabSnapshotScopeInput];
    if (rule.unit === 'flat' && rawValue === true) {
      rows.push({
        label: String(condition.label || rule.rule_name),
        low: rule.low_value,
        high: rule.high_value,
      });
    }

    if (rule.unit === 'per_item') {
      let count = 0;
      if (typeof rawValue === 'number' && rawValue > 0) {
        count = rawValue;
      } else if (rawValue === true) {
        count =
          typeof condition.fallback_count === 'number' && condition.fallback_count > 0
            ? Number(condition.fallback_count)
            : 1;
      }

      if (count > 0) {
        rows.push({
          label: String(condition.label || rule.rule_name),
          low: rule.low_value * count,
          high: rule.high_value * count,
          notes: `${count} item(s)`,
        });
      }
    }
  }

  return rows;
}

// Risk multipliers for systems that are already embedded in the per-SF base
// of heavy+ categories. Applying these on top of an embedded-systems base
// double-dips on the risk side and inflates the high. Genuine hidden-
// condition risks (water/fire damage, structural, foundation, permit
// uncertainty) are NOT in this list and always apply.
const EMBEDDED_SYSTEM_RISK_FIELDS = new Set(['electrical_full', 'plumbing_full', 'layout_changes']);

function buildRiskAdjustments(
  rules: EstimateRuleRecord[],
  input: EngineInput,
  permitComplexity: PermitComplexity,
  baseEmbedsSystems: boolean
) {
  const multipliers: EstimateRuleRecord[] = [];
  const riskFlags: string[] = [];
  const { project, scope } = input;

  for (const rule of rules.filter((item) => item.category === 'risk_multiplier')) {
    const condition = rule.condition_json as RuleCondition;
    const field = typeof condition.field === 'string' ? condition.field : null;

    // Skip embedded-system risk multipliers for heavy+ categories (the base
    // already prices those systems and their risk).
    if (baseEmbedsSystems && field && EMBEDDED_SYSTEM_RISK_FIELDS.has(field)) {
      continue;
    }

    if (field && isTruthyScopeField(scope, field)) {
      multipliers.push(rule);
      if (condition.risk_flag) riskFlags.push(String(condition.risk_flag));
      continue;
    }

    if (
      field &&
      typeof scope[field as keyof RehabSnapshotScopeInput] === 'number' &&
      Number(scope[field as keyof RehabSnapshotScopeInput]) > 0
    ) {
      multipliers.push(rule);
      if (condition.risk_flag) riskFlags.push(String(condition.risk_flag));
      continue;
    }

    if (
      typeof condition.permit_complexity === 'string' &&
      permitComplexity === condition.permit_complexity
    ) {
      multipliers.push(rule);
      if (condition.risk_flag) riskFlags.push(String(condition.risk_flag));
      continue;
    }
  }

  if (project.year_built && project.year_built < 1940) {
    riskFlags.push('Pre-1940 housing stock usually hides more trade, framing, and code-upgrade exposure than the intake can confirm.');
  } else if (project.year_built && project.year_built < 1980) {
    riskFlags.push('Older housing stock tends to carry more system-reset and code-upgrade risk once the walls open.');
  }

  if (!scope.notes.trim()) {
    riskFlags.push('Limited scope notes were provided, so the budget range is leaning more heavily on category assumptions than field-specific detail.');
  }

  return { multipliers, riskFlags: Array.from(new Set(riskFlags)) };
}

function computeConfidence(
  input: EngineInput,
  projectCategory: ProjectCategory,
  hasHighRiskFlags: boolean
) {
  const { project, scope, hasPhotos, hasWalkthroughVideo } = input;
  let score = 100;

  if (!hasPhotos) score -= 20;
  if (!hasWalkthroughVideo) score -= 15;
  if (project.year_built !== null && project.year_built < 1970) score -= 10;
  if (scope.water_damage || scope.fire_damage || scope.structural || scope.foundation) score -= 20;
  if (scope.framing) score -= 10;
  if (projectCategory === 'full_gut') score -= 10;
  if (projectCategory === 'addition') score -= 15;
  if (scope.notes.trim().length < 40) score -= 10;
  if (!project.square_feet) score -= 25;
  if (!project.year_built) score -= 10;
  if (hasHighRiskFlags) score -= 5;

  const confidenceScore = clamp(score, 0, 100);
  let confidenceLevel: ConfidenceLevel = 'low';
  if (confidenceScore >= 80) confidenceLevel = 'high';
  else if (confidenceScore >= 55) confidenceLevel = 'moderate';

  return { confidenceScore, confidenceLevel };
}

function computeTimeline(
  rules: EstimateRuleRecord[],
  projectCategory: ProjectCategory,
  scope: RehabSnapshotScopeInput,
  permitComplexity: PermitComplexity
) {
  const baseRanges: Record<ProjectCategory, { low: number; high: number }> = {
    cosmetic: { low: 2, high: 5 },
    rental_turn: { low: 2, high: 6 },
    moderate_rehab: { low: 5, high: 10 },
    heavy_rehab: { low: 10, high: 20 },
    full_gut: { low: 16, high: 32 },
    structural_heavy: { low: 20, high: 40 },
    addition: { low: 20, high: 45 },
    unknown: { low: 6, high: 12 },
  };

  let low = baseRanges[projectCategory].low;
  let high = baseRanges[projectCategory].high;

  for (const rule of rules.filter((item) => item.category === 'timeline_risk')) {
    const condition = rule.condition_json as RuleCondition;
    if (
      typeof condition.permit_complexity === 'string' &&
      permitComplexity === condition.permit_complexity
    ) {
      low += rule.low_value;
      high += rule.high_value;
      continue;
    }

    if (Array.isArray(condition.any_fields) && hasAny(scope, condition.any_fields as string[])) {
      low += rule.low_value;
      high += rule.high_value;
    }
  }

  return { low, high };
}

function buildAssumptions(
  projectCategory: ProjectCategory,
  permitComplexity: PermitComplexity
) {
  const assumptions = [
    'This is a preliminary feasibility estimate for early-stage underwriting, not a bid, proposal, or guaranteed contractor price.',
    'Figures are all-in: raw trade cost (materials + labor) plus a contingency buffer and a general-contractor fee — i.e. the price an owner would pay a GC, not bare subcontractor cost.',
    'Base pricing assumes standard investor-market procurement rather than emergency pricing or premium owner-occupant selections unless the finish level indicates otherwise.',
    'Carrying costs, financing costs, utilities, taxes, insurance, and sales costs are excluded.',
    'Hidden conditions behind walls, under floors, in crawlspaces, attics, and buried systems are not fully knowable from intake alone.',
  ];

  if (projectCategory === 'addition') {
    assumptions.push('Addition pricing assumes shell and integration complexity can widen materially after plans, engineering, and jurisdiction review.');
  }
  if (permitComplexity === 'unknown') {
    assumptions.push('Permit path is treated as uncertain and can move both cost and schedule once the jurisdiction and plan requirements are known.');
  }

  return assumptions;
}

function buildWhatCouldChangeThisNumber(projectCategory: ProjectCategory, permitComplexity: PermitComplexity) {
  const items = [
    'Hidden structural, moisture, termite, or foundation conditions found after demolition.',
    'Trade pricing, labor availability, and contractor-market tightness at the time of execution.',
    'Scope changes after inspection, walkthrough, or lender / partner review.',
    'Finish selections that move beyond the selected finish tier.',
  ];

  if (projectCategory === 'full_gut' || projectCategory === 'structural_heavy' || projectCategory === 'addition') {
    items.push('Engineering, plan revisions, and sequencing changes triggered by structure-heavy scope.');
  }
  if (permitComplexity !== 'low') {
    items.push('Permit corrections, plan requirements, and jurisdiction-specific code upgrades.');
  }

  return items;
}

function buildRecommendation() {
  return 'Your preliminary range gives you a starting point. The next step is validating whether this budget is actually executable in the current contractor market. Book an Investor Execution Review to refine the scope, pressure-test the budget, review permit risks, and identify execution pitfalls before you commit more capital.';
}

function buildSummary(
  projectCategory: ProjectCategory,
  executionDifficulty: ExecutionDifficulty,
  confidenceLevel: ConfidenceLevel,
  permitComplexity: PermitComplexity
) {
  return `This project currently fits the ${CATEGORY_LABELS[projectCategory]} bucket with ${executionDifficulty} execution difficulty, ${permitComplexity} permit complexity, and ${confidenceLevel} confidence based on the intake detail provided.`;
}

export function formatProjectCategoryLabel(projectCategory: ProjectCategory | string) {
  return CATEGORY_LABELS[(projectCategory as ProjectCategory) || 'unknown'] || 'Unknown';
}

export function computeEstimate(
  input: EngineInput,
  rules: EstimateRuleRecord[],
  marketTiers: MarketTierRecord[] = DEFAULT_MARKET_TIERS
): EstimateComputation {
  const projectCategory = classifyProjectCategory(input.project, input.scope);
  const baseCostRule = getBaseCostRule(rules, projectCategory);
  const finishMultiplier = getFinishMultiplier(rules, input.project.target_finish_level);
  const ageMultiplier = getAgeMultiplier(rules, input.project.year_built);
  const marketTier = resolveMarketTier(input.project.zip, marketTiers);
  const permitComplexity = inferPermitComplexity(projectCategory, input.scope);
  const executionDifficulty = inferExecutionDifficulty(projectCategory, input.scope);

  const baseLow =
    input.project.square_feet *
    baseCostRule.low_value *
    finishMultiplier.low_value *
    ageMultiplier.low_value *
    marketTier.multiplierLow;
  const baseHigh =
    input.project.square_feet *
    baseCostRule.high_value *
    finishMultiplier.high_value *
    ageMultiplier.high_value *
    marketTier.multiplierHigh;

  const breakdown: EstimateBreakdownRow[] = [
    {
      label: 'Base category pricing',
      low: baseLow,
      high: baseHigh,
      notes: `${formatProjectCategoryLabel(projectCategory)} at ${input.project.target_finish_level.replace(/_/g, ' ')} finish level · ${marketTier.label} market`,
    },
  ];

  // Avoid double-counting: heavy / gut / structural / addition per-SF bases
  // already embed major systems (kitchen, baths, roof, HVAC, electrical,
  // plumbing). Adding the flat scope allowances on top of those bases — and
  // then multiplying by finish/age/region — produced implausibly high tops.
  // Only add discrete flat allowances for the lighter categories where the
  // per-SF base does NOT already include that work.
  const baseEmbedsSystems =
    projectCategory === 'heavy_rehab' ||
    projectCategory === 'full_gut' ||
    projectCategory === 'structural_heavy' ||
    projectCategory === 'addition';
  const scopeRows = baseEmbedsSystems ? [] : buildScopeLineItems(rules, input.scope);
  breakdown.push(...scopeRows);

  let subtotalLow = breakdown.reduce((sum, row) => sum + row.low, 0);
  let subtotalHigh = breakdown.reduce((sum, row) => sum + row.high, 0);

  const { multipliers, riskFlags } = buildRiskAdjustments(rules, input, permitComplexity, baseEmbedsSystems);

  // Additive, CAPPED risk premium. Multiplying every risk multiplier together
  // let a handful of checked boxes explode the estimate (6 risks ≈ 10×, which
  // produced $2,000+/SF). Instead, sum each risk's premium over 1.0 and cap
  // the total so risk meaningfully widens the range but can never run away.
  const riskDeltaLow = multipliers.reduce((sum, m) => sum + Math.max(0, m.low_value - 1), 0);
  const riskDeltaHigh = multipliers.reduce((sum, m) => sum + Math.max(0, m.high_value - 1), 0);
  subtotalLow *= 1 + Math.min(riskDeltaLow, 0.4);
  subtotalHigh *= 1 + Math.min(riskDeltaHigh, 0.9);

  const hasHighRiskFlags =
    input.scope.water_damage ||
    input.scope.fire_damage ||
    input.scope.framing ||
    input.scope.structural ||
    input.scope.foundation ||
    input.scope.addition;

  const contingencyLow = subtotalLow * 0.05;
  const contingencyHigh = subtotalHigh * 0.12;
  breakdown.push({
    label: 'Execution contingency',
    low: contingencyLow,
    high: contingencyHigh,
    notes: 'Directional buffer for hidden conditions, sequencing drag, and scope clarification',
  });
  subtotalLow += contingencyLow;
  subtotalHigh += contingencyHigh;

  // Apply GC fee — converts raw construction cost into the all-in price an
  // investor would pay SCC. This is the last cost addition before the ceiling.
  const gcFeeLow = subtotalLow * GC_FEE_RATE;
  const gcFeeHigh = subtotalHigh * GC_FEE_RATE;
  breakdown.push({
    label: `GC fee (${Math.round(GC_FEE_RATE * 100)}%)`,
    low: gcFeeLow,
    high: gcFeeHigh,
    notes: 'Contractor overhead & profit — produces the all-in price',
  });
  subtotalLow += gcFeeLow;
  subtotalHigh += gcFeeHigh;

  // Hard backstop: clamp all-in $/SF to a sane per-category ceiling so no
  // multiplier combination can yield an absurd number.
  const sf = input.project.square_feet || 0;
  if (sf > 0) {
    const ceiling = PER_SF_CEILING[projectCategory] * sf;
    subtotalHigh = Math.min(subtotalHigh, ceiling);
    subtotalLow = Math.min(subtotalLow, subtotalHigh);
  }

  const { confidenceScore, confidenceLevel } = computeConfidence(input, projectCategory, hasHighRiskFlags);
  const timeline = computeTimeline(rules, projectCategory, input.scope, permitComplexity);
  const highRiskEstimate = roundCurrency(
    subtotalHigh *
      (executionDifficulty === 'severe'
        ? 1.2
        : executionDifficulty === 'high'
          ? 1.15
          : executionDifficulty === 'moderate'
            ? 1.1
            : 1.06)
  );

  const finalLow = roundCurrency(subtotalLow);
  const finalHigh = roundCurrency(subtotalHigh);

  return {
    projectCategory,
    estimatedLow: finalLow,
    estimatedHigh: finalHigh,
    highRiskEstimate,
    costPerSfLow: sf > 0 ? Math.round(finalLow / sf) : 0,
    costPerSfHigh: sf > 0 ? Math.round(finalHigh / sf) : 0,
    marketTier,
    timelineLowWeeks: timeline.low,
    timelineHighWeeks: timeline.high,
    confidenceLevel,
    confidenceScore,
    executionDifficulty,
    permitComplexity,
    riskFlags,
    assumptions: buildAssumptions(projectCategory, permitComplexity),
    whatCouldChangeThisNumber: buildWhatCouldChangeThisNumber(projectCategory, permitComplexity),
    recommendedNextStep: buildRecommendation(),
    executionSummary: buildSummary(projectCategory, executionDifficulty, confidenceLevel, permitComplexity),
    breakdown: breakdown.map((row) => ({
      ...row,
      low: roundCurrency(row.low),
      high: roundCurrency(row.high),
    })),
  };
}
