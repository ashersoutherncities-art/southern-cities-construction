// Pure, deterministic estimator engine. No I/O. All numbers live in data.ts.
// Source of truth: SCC_Rehab_Cost_Schedule_Engine_v2.xlsx

import {
  ADDITION_PATH_BUILD_DAYS,
  CALENDAR_WEEK_BUFFER,
  CONDITION_RISK_KEYS,
  CONTINGENCY_BASE,
  CONTINGENCY_CONDITION_RISK_ADD,
  CONTINGENCY_PRE_1960_ADD,
  CONTINGENCY_PRE_1980_ADD,
  FIELD_VERIFICATION_KEYS,
  FINISH_TIER_MULTIPLIER,
  GUT_CREDIT_RATE,
  GUT_CREDIT_SCOPE,
  LENDER_KILLER_FLAGS,
  P6_INSULATION_BUFFER_DAYS,
  PHASES,
  SCOPE_ITEMS,
} from './data.ts';
import type {
  FlagSeverity,
  ProjectTier,
  ScopeItem,
  ScopeKey,
} from './data.ts';

export type FinishTier = 1 | 2 | 3;

export interface EstimateInput {
  totalSf: number;
  additionSf: number;
  bathRefreshCount: number;
  bathFullCount: number;
  finishTier: FinishTier;
  yearBuilt: number | null;
  selections: Partial<Record<ScopeKey, boolean>>;
  windowCount: number;
}

export interface ItemBreakdown {
  key: ScopeKey;
  label: string;
  section: string;
  low: number;
  high: number;
  basis: ScopeItem['basis'];
  tierApplied: boolean;
}

export interface ActivatedFlag {
  key: string;
  label: string;
  severity: FlagSeverity;
  whyLendersCare: string;
  vintageWindow: string;
}

export interface PhaseDuration {
  key: string;
  label: string;
  workingDays: number;
}

export interface EstimateResult {
  // Cost
  perItem: ItemBreakdown[];
  gutCredit: { low: number; high: number };
  rawRange: { low: number; high: number };
  contingencyRate: number;
  rangeInclContingency: { low: number; high: number };

  // Classification
  projectTier: ProjectTier;

  // Flags
  lenderKillerFlags: ActivatedFlag[];

  // Timeline
  phases: PhaseDuration[];
  interiorWorkingDays: number;
  additionWorkingDays: number;
  totalWorkingDays: number;
  calendarWeeks: number;

  // UX
  fieldVerificationRequired: boolean;
  fieldVerificationKeys: ScopeKey[];
}

function activeSelections(input: EstimateInput): Set<ScopeKey> {
  const set = new Set<ScopeKey>();
  for (const [key, on] of Object.entries(input.selections)) {
    if (on) set.add(key as ScopeKey);
  }
  if (input.bathRefreshCount > 0) set.add('bath_refresh');
  if (input.bathFullCount > 0) set.add('bath_full');
  if (input.windowCount > 0) set.add('windows');
  if (input.additionSf > 0) set.add('addition');
  return set;
}

function itemRange(
  item: ScopeItem,
  input: EstimateInput,
  active: Set<ScopeKey>
): { low: number; high: number; tierApplied: boolean } | null {
  if (!active.has(item.key)) return null;

  let low = 0;
  let high = 0;
  switch (item.basis) {
    case 'per_sf':
      low = item.low * input.totalSf;
      high = item.high * input.totalSf;
      break;
    case 'per_unit':
      if (item.key === 'windows') {
        low = item.low * input.windowCount;
        high = item.high * input.windowCount;
      } else {
        low = item.low;
        high = item.high;
      }
      break;
    case 'per_bath':
      if (item.key === 'bath_refresh') {
        low = item.low * input.bathRefreshCount;
        high = item.high * input.bathRefreshCount;
      } else if (item.key === 'bath_full') {
        low = item.low * input.bathFullCount;
        high = item.high * input.bathFullCount;
      }
      break;
    case 'allowance':
      low = item.low;
      high = item.high;
      break;
    case 'per_addition_sf':
      low = item.low * input.additionSf;
      high = item.high * input.additionSf;
      break;
  }

  let tierApplied = false;
  if (item.tierSensitive) {
    const mult = FINISH_TIER_MULTIPLIER[input.finishTier];
    low *= mult;
    high *= mult;
    tierApplied = true;
  }

  return { low, high, tierApplied };
}

function classifyTier(active: Set<ScopeKey>, bathFullCount: number): ProjectTier {
  if (
    active.has('full_gut') ||
    active.has('foundation') ||
    active.has('structural') ||
    active.has('addition')
  ) {
    return 'Full Gut / Heavy';
  }
  if (
    active.has('kitchen_full') ||
    bathFullCount > 0 ||
    active.has('plumb_full') ||
    active.has('elec_full') ||
    active.has('hvac') ||
    active.has('roof')
  ) {
    return 'Light Major';
  }
  return 'Cosmetic';
}

function computeContingency(yearBuilt: number | null, active: Set<ScopeKey>): number {
  let rate = CONTINGENCY_BASE;
  if (yearBuilt !== null) {
    // pre-1960 wins over pre-1980 (not cumulative).
    if (yearBuilt < 1960) rate += CONTINGENCY_PRE_1960_ADD;
    else if (yearBuilt < 1980) rate += CONTINGENCY_PRE_1980_ADD;
  }
  let conditionRiskHit = false;
  CONDITION_RISK_KEYS.forEach((k) => {
    if (active.has(k)) conditionRiskHit = true;
  });
  if (conditionRiskHit) rate += CONTINGENCY_CONDITION_RISK_ADD;
  return rate;
}

function yearInWindow(year: number, minYear: number | null, maxYear: number | null): boolean {
  if (minYear !== null && year < minYear) return false;
  if (maxYear !== null && year > maxYear) return false;
  return true;
}

function formatVintage(minYear: number | null, maxYear: number | null): string {
  if (minYear === null && maxYear !== null) return `pre-${maxYear + 1}`;
  if (minYear !== null && maxYear === null) return `${minYear}+`;
  if (minYear !== null && maxYear !== null) return `${minYear}–${maxYear}`;
  return 'any year';
}

function computeFlags(yearBuilt: number | null): ActivatedFlag[] {
  if (yearBuilt === null) return [];
  const out: ActivatedFlag[] = [];
  for (const f of LENDER_KILLER_FLAGS) {
    if (yearInWindow(yearBuilt, f.minYear, f.maxYear)) {
      out.push({
        key: f.key,
        label: f.label,
        severity: f.severity,
        whyLendersCare: f.whyLendersCare,
        vintageWindow: formatVintage(f.minYear, f.maxYear),
      });
    }
  }
  return out;
}

function computePhases(
  active: Set<ScopeKey>,
  bathRefreshCount: number,
  bathFullCount: number,
  windowCount: number,
  additionSf: number
): { phases: PhaseDuration[]; interiorDays: number } {
  const itemMap = new Map<ScopeKey, ScopeItem>();
  for (const item of SCOPE_ITEMS) itemMap.set(item.key, item);

  const phases: PhaseDuration[] = [];
  let interiorDays = 0;

  for (const phase of PHASES) {
    const durations: number[] = [];
    for (const key of phase.items) {
      // Addition is NOT part of the interior path; it has its own track.
      if (key === 'addition') continue;
      if (!active.has(key)) continue;
      const item = itemMap.get(key);
      if (!item) continue;
      // Skip parallel items in the critical-path roll-up; they overlap and
      // do not extend the spine.
      if (item.path === 'PARALLEL') continue;
      durations.push(item.durationDays);
    }

    let phaseDays = phase.baselineDays;
    if (durations.length > 0) {
      const aggregated =
        phase.aggregation === 'MAX'
          ? Math.max(...durations)
          : durations.reduce((a, b) => a + b, 0);
      phaseDays = Math.max(phaseDays, aggregated);
    }

    // P6 implicit insulation buffer when drywall or full_gut is in play.
    if (phase.key === 'P6' && (active.has('drywall') || active.has('full_gut'))) {
      phaseDays += P6_INSULATION_BUFFER_DAYS;
    }

    phases.push({ key: phase.key, label: phase.label, workingDays: phaseDays });
    interiorDays += phaseDays;
  }

  // Silence unused-param warnings for inputs reserved for future calibration.
  void bathRefreshCount; void bathFullCount; void windowCount; void additionSf;

  return { phases, interiorDays };
}

function p0Days(active: Set<ScopeKey>): number {
  // P0 uses permit_unknown duration if selected, else baseline.
  const p0 = PHASES.find((p) => p.key === 'P0')!;
  let days = p0.baselineDays;
  if (active.has('permit_unknown')) {
    const item = SCOPE_ITEMS.find((i) => i.key === 'permit_unknown')!;
    days = Math.max(days, item.durationDays);
  }
  return days;
}

export function estimate(input: EstimateInput): EstimateResult {
  const active = activeSelections(input);
  const itemMap = new Map<ScopeKey, ScopeItem>();
  for (const item of SCOPE_ITEMS) itemMap.set(item.key, item);

  // -------- per-item ranges --------
  const perItem: ItemBreakdown[] = [];
  for (const item of SCOPE_ITEMS) {
    const r = itemRange(item, input, active);
    if (!r) continue;
    perItem.push({
      key: item.key,
      label: item.label,
      section: item.section,
      low: r.low,
      high: r.high,
      basis: item.basis,
      tierApplied: r.tierApplied,
    });
  }

  // -------- raw subtotal --------
  let rawLow = perItem.reduce((sum, r) => sum + r.low, 0);
  let rawHigh = perItem.reduce((sum, r) => sum + r.high, 0);

  // -------- gut overlap credit --------
  let gutLow = 0;
  let gutHigh = 0;
  if (active.has('full_gut')) {
    let creditBaseLow = 0;
    let creditBaseHigh = 0;
    for (const row of perItem) {
      if (GUT_CREDIT_SCOPE.has(row.key)) {
        creditBaseLow += row.low;
        creditBaseHigh += row.high;
      }
    }
    gutLow = -creditBaseLow * GUT_CREDIT_RATE;
    gutHigh = -creditBaseHigh * GUT_CREDIT_RATE;
  }
  rawLow += gutLow;
  rawHigh += gutHigh;

  // -------- contingency --------
  const contingencyRate = computeContingency(input.yearBuilt, active);
  const rangeInclLow = rawLow * (1 + contingencyRate);
  const rangeInclHigh = rawHigh * (1 + contingencyRate);

  // -------- classification & flags --------
  const projectTier = classifyTier(active, input.bathFullCount);
  const lenderKillerFlags = computeFlags(input.yearBuilt);

  // -------- timeline --------
  const { phases, interiorDays } = computePhases(
    active,
    input.bathRefreshCount,
    input.bathFullCount,
    input.windowCount,
    input.additionSf
  );

  const additionDays = active.has('addition')
    ? p0Days(active) + ADDITION_PATH_BUILD_DAYS
    : 0;
  const totalWorkingDays = Math.max(interiorDays, additionDays);
  const calendarWeeks =
    Math.round(((totalWorkingDays / 5) * CALENDAR_WEEK_BUFFER) * 10) / 10;

  // -------- field-verification banner --------
  const fvKeys: ScopeKey[] = [];
  FIELD_VERIFICATION_KEYS.forEach((k) => {
    if (active.has(k)) fvKeys.push(k);
  });

  return {
    perItem,
    gutCredit: { low: gutLow, high: gutHigh },
    rawRange: { low: rawLow, high: rawHigh },
    contingencyRate,
    rangeInclContingency: { low: rangeInclLow, high: rangeInclHigh },
    projectTier,
    lenderKillerFlags,
    phases,
    interiorWorkingDays: interiorDays,
    additionWorkingDays: additionDays,
    totalWorkingDays,
    calendarWeeks,
    fieldVerificationRequired: fvKeys.length > 0,
    fieldVerificationKeys: fvKeys,
  };
}
