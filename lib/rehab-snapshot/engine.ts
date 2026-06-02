import { tryGetServiceClient } from '@/lib/supabase';
import { DEFAULT_ESTIMATE_RULES } from '@/lib/rehab-snapshot/default-rules';
import {
  ConfidenceLevel,
  EstimateBreakdownRow,
  EstimateComputation,
  EstimateRuleRecord,
  ExecutionDifficulty,
  PermitComplexity,
  ProjectCategory,
  RehabSnapshotProjectInput,
  RehabSnapshotScopeInput,
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

  if (heavySignals >= 4) return 'heavy_rehab';
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

function buildRiskAdjustments(
  rules: EstimateRuleRecord[],
  input: EngineInput,
  permitComplexity: PermitComplexity
) {
  const multipliers: EstimateRuleRecord[] = [];
  const riskFlags: string[] = [];
  const { project, scope } = input;

  for (const rule of rules.filter((item) => item.category === 'risk_multiplier')) {
    const condition = rule.condition_json as RuleCondition;
    const field = typeof condition.field === 'string' ? condition.field : null;

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
  rules: EstimateRuleRecord[]
): EstimateComputation {
  const projectCategory = classifyProjectCategory(input.project, input.scope);
  const baseCostRule = getBaseCostRule(rules, projectCategory);
  const finishMultiplier = getFinishMultiplier(rules, input.project.target_finish_level);
  const ageMultiplier = getAgeMultiplier(rules, input.project.year_built);
  const permitComplexity = inferPermitComplexity(projectCategory, input.scope);
  const executionDifficulty = inferExecutionDifficulty(projectCategory, input.scope);

  const baseLow =
    input.project.square_feet * baseCostRule.low_value * finishMultiplier.low_value * ageMultiplier.low_value;
  const baseHigh =
    input.project.square_feet * baseCostRule.high_value * finishMultiplier.high_value * ageMultiplier.high_value;

  const breakdown: EstimateBreakdownRow[] = [
    {
      label: 'Base category pricing',
      low: baseLow,
      high: baseHigh,
      notes: `${formatProjectCategoryLabel(projectCategory)} at ${input.project.target_finish_level.replace(/_/g, ' ')} finish level`,
    },
  ];

  const scopeRows = buildScopeLineItems(rules, input.scope);
  breakdown.push(...scopeRows);

  let subtotalLow = breakdown.reduce((sum, row) => sum + row.low, 0);
  let subtotalHigh = breakdown.reduce((sum, row) => sum + row.high, 0);

  const { multipliers, riskFlags } = buildRiskAdjustments(rules, input, permitComplexity);
  for (const multiplier of multipliers) {
    subtotalLow *= multiplier.low_value;
    subtotalHigh *= multiplier.high_value;
  }

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

  return {
    projectCategory,
    estimatedLow: roundCurrency(subtotalLow),
    estimatedHigh: roundCurrency(subtotalHigh),
    highRiskEstimate,
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
