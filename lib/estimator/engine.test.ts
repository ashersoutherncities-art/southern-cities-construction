import assert from 'node:assert/strict';
import { test } from 'node:test';

import { estimate } from './engine.ts';
import type { EstimateInput, FinishTier } from './engine.ts';
import type { ScopeKey } from './data.ts';

const ROUND_TOLERANCE = 1;

function nearly(a: number, b: number, tol = ROUND_TOLERANCE) {
  return Math.abs(a - b) <= tol;
}

function selections(...keys: ScopeKey[]): Partial<Record<ScopeKey, boolean>> {
  return Object.fromEntries(keys.map((k) => [k, true]));
}

function baseInput(over: Partial<EstimateInput> = {}): EstimateInput {
  return {
    totalSf: 1500,
    additionSf: 0,
    bathRefreshCount: 0,
    bathFullCount: 0,
    finishTier: 2 as FinishTier,
    yearBuilt: 1965,
    selections: {},
    windowCount: 0,
    ...over,
  };
}

test('1965 verification scenario — exact workbook reproduction', () => {
  const r = estimate(
    baseInput({
      selections: selections(
        'paint',
        'flooring',
        'drywall',
        'kitchen_full',
        'roof',
        'hvac',
        'plumb_full',
        'elec_full',
        'full_gut',
        'siding'
      ),
    })
  );

  assert.ok(nearly(r.gutCredit.low, -2520), `gut credit low ${r.gutCredit.low}`);
  assert.ok(nearly(r.gutCredit.high, -5700), `gut credit high ${r.gutCredit.high}`);

  assert.ok(nearly(r.rawRange.low, 76480), `raw low ${r.rawRange.low}`);
  assert.ok(nearly(r.rawRange.high, 157800), `raw high ${r.rawRange.high}`);

  assert.equal(Math.round(r.contingencyRate * 1000) / 1000, 0.13);

  assert.ok(nearly(r.rangeInclContingency.low, 86422), `incl low ${r.rangeInclContingency.low}`);
  assert.ok(nearly(r.rangeInclContingency.high, 178314), `incl high ${r.rangeInclContingency.high}`);

  assert.equal(r.projectTier, 'Full Gut / Heavy');

  assert.equal(r.totalWorkingDays, 53, `total ${r.totalWorkingDays}`);
  assert.equal(r.calendarWeeks, 12.2);

  // 1965 flags: aluminum wiring, cast iron DWV, lead paint, asbestos era as FLAG;
  // FPE/Zinsco and Orangeburg as CHECK. Knob-and-tube, galvanized, polybutylene
  // out of window.
  const present = (label: string) => r.lenderKillerFlags.find((f) => f.label === label);
  assert.equal(present('Aluminum branch wiring')?.severity, 'FLAG');
  assert.equal(present('Cast iron DWV')?.severity, 'FLAG');
  assert.equal(present('Lead-based paint')?.severity, 'FLAG');
  assert.equal(present('Asbestos-era materials')?.severity, 'FLAG');
  assert.equal(present('FPE / Zinsco panel era')?.severity, 'CHECK');
  assert.equal(present('Orangeburg sewer lateral')?.severity, 'CHECK');
  assert.equal(present('Knob-and-tube wiring'), undefined);
  assert.equal(present('Galvanized supply piping'), undefined);
  assert.equal(present('Polybutylene supply'), undefined);
});

test('pure-cosmetic post-1995 build — Cosmetic tier, no flags', () => {
  const r = estimate(
    baseInput({
      totalSf: 1500,
      finishTier: 2,
      yearBuilt: 2000,
      selections: selections('paint', 'flooring'),
    })
  );

  assert.equal(r.projectTier, 'Cosmetic');
  assert.equal(r.lenderKillerFlags.length, 0);
  // Contingency: 10% base, post-1980 no add, no condition-risk.
  assert.equal(Math.round(r.contingencyRate * 100) / 100, 0.10);
  assert.equal(r.gutCredit.low, 0);
  assert.equal(r.gutCredit.high, 0);
});

test('addition-driven job — addition path governs total working days', () => {
  const r = estimate(
    baseInput({
      totalSf: 1200,
      additionSf: 400,
      finishTier: 2,
      yearBuilt: 1990,
      // Light interior scope so addition path is the longer one.
      selections: selections('paint', 'flooring'),
    })
  );

  assert.equal(r.projectTier, 'Full Gut / Heavy');
  // Addition path = P0 days + 45. With no permit_unknown, P0 = 3 → 48.
  assert.equal(r.additionWorkingDays, 48);
  assert.equal(r.totalWorkingDays, Math.max(r.interiorWorkingDays, 48));
  assert.ok(r.totalWorkingDays >= 48);
  assert.ok(r.fieldVerificationRequired, 'addition must trigger field-verification banner');
  assert.ok(r.fieldVerificationKeys.includes('addition'));
});

test('timeline — systems WITHOUT drywall: P9=5, P6=0 (catches the offsetting-bug)', () => {
  // HVAC + full plumbing, no drywall. Workbook: P0 3 + P5 max(6,4)=6 + P9 5 = 14.
  // (P5 = max(plumb_full 6, hvac 4) = 6.)
  const r = estimate(
    baseInput({ yearBuilt: 2000, selections: selections('hvac', 'plumb_full') })
  );
  const phase = (k: string) => r.phases.find((p) => p.key === k)?.workingDays;
  assert.equal(phase('P6'), 0, 'P6 must be 0 with no drywall (no fictional insulation buffer)');
  assert.equal(phase('P9'), 5, 'P9 must be 5 when systems are present');
  assert.equal(r.interiorWorkingDays, 14, `interior ${r.interiorWorkingDays}`);
});

test('timeline — drywall WITHOUT systems: P6=7, P9=3', () => {
  // Drywall + paint, no systems. Workbook: P0 3 + P6 7 + P8 4 + P9 3 = 17.
  const r = estimate(
    baseInput({ yearBuilt: 2000, selections: selections('drywall', 'paint') })
  );
  const phase = (k: string) => r.phases.find((p) => p.key === k)?.workingDays;
  assert.equal(phase('P6'), 7, 'P6 = drywall 7, no extra buffer');
  assert.equal(phase('P9'), 3, 'P9 = 3 with no systems');
  assert.equal(r.interiorWorkingDays, 17, `interior ${r.interiorWorkingDays}`);
});

test('condition-risk job — +5% contingency adder applies', () => {
  const r = estimate(
    baseInput({
      totalSf: 1500,
      finishTier: 2,
      yearBuilt: 1990, // post-1980 base only
      selections: selections('paint', 'flooring', 'mold'),
    })
  );

  // 10% base + 0 vintage + 5% condition risk = 15%
  assert.equal(Math.round(r.contingencyRate * 100) / 100, 0.15);
  assert.ok(r.fieldVerificationRequired);
  assert.ok(r.fieldVerificationKeys.includes('mold'));
});
