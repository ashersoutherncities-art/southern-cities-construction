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
  P9_SYSTEM_KEYS,
  PHASE_DAYS,
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

// Faithful translation of the workbook Timeline Model formulas. Within a phase
// trades overlap (MAX); across phases gates are sequential (SUM). Uses the exact
// per-phase durations in PHASE_DAYS (which differ from items' Schedule durations).
function p0Days(active: Set<ScopeKey>): number {
  return active.has('permit_unknown') ? PHASE_DAYS.p0Permit : PHASE_DAYS.p0Baseline;
}

function computePhases(
  active: Set<ScopeKey>,
  bathRefreshCount: number,
  bathFullCount: number,
  windowCount: number
): { phases: PhaseDuration[]; interiorDays: number } {
  const d = PHASE_DAYS;
  const has = (k: ScopeKey) => active.has(k);

  const p0 = p0Days(active);
  const p1 = Math.max(has('full_gut') ? d.p1FullGut : 0, has('layout') ? d.p1Layout : 0);
  const p2 = Math.max(
    has('fire') ? d.p2Fire : 0,
    has('water') ? d.p2Water : 0,
    has('mold') ? d.p2Mold : 0,
    has('termite') ? d.p2Termite : 0
  );
  const p3 =
    (has('foundation') ? d.p3Foundation : 0) +
    (has('structural') ? d.p3Structural : 0) +
    (has('framing') ? d.p3Framing : 0) +
    (has('layout') ? d.p3Layout : 0);
  const p4 = has('roof') ? d.p4Roof : 0;
  const p5 = Math.max(
    has('plumb_full') ? d.p5PlumbFull : 0,
    has('elec_full') ? d.p5ElecFull : 0,
    has('hvac') ? d.p5Hvac : 0,
    has('plumb_partial') ? d.p5PlumbPartial : 0,
    has('elec_partial') ? d.p5ElecPartial : 0
  );
  const p6 = has('drywall') ? d.p6Drywall : 0;
  const p7 = Math.max(
    has('kitchen_full') ? d.p7KitchenFull : 0,
    has('kitchen_refresh') ? d.p7KitchenRefresh : 0,
    bathFullCount > 0 ? d.p7BathFull : 0,
    bathRefreshCount > 0 ? d.p7BathRefresh : 0
  );
  const p8 =
    (has('paint') ? d.p8Paint : 0) +
    (has('flooring') ? d.p8Flooring : 0) +
    (windowCount > 0 ? d.p8Windows : 0);
  const systemsPresent = P9_SYSTEM_KEYS.some((k) => has(k));
  const p9 = systemsPresent ? d.p9WithSystems : d.p9Baseline;

  const phases: PhaseDuration[] = [
    { key: 'P0', label: 'Permits & mobilization', workingDays: p0 },
    { key: 'P1', label: 'Demo / gut', workingDays: p1 },
    { key: 'P2', label: 'Remediation', workingDays: p2 },
    { key: 'P3', label: 'Foundation → structural → framing', workingDays: p3 },
    { key: 'P4', label: 'Roof dry-in', workingDays: p4 },
    { key: 'P5', label: 'MEP rough-ins', workingDays: p5 },
    { key: 'P6', label: 'Insulation + drywall', workingDays: p6 },
    { key: 'P7', label: 'Wet-area finishes', workingDays: p7 },
    { key: 'P8', label: 'General finishes', workingDays: p8 },
    { key: 'P9', label: 'MEP trim + punch', workingDays: p9 },
  ];
  const interiorDays = phases.reduce((s, p) => s + p.workingDays, 0);
  return { phases, interiorDays };
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
    input.windowCount
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
