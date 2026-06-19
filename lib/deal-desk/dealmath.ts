// Deal underwriting math — Rehab/Flip and New Build, one engine.
// Pure functions (safe to run client-side). All money in whole dollars.

export type DealMode = 'rehab' | 'new_build';

export type DealInputs = {
  mode: DealMode;
  arv: number;
  squareFeet: number;

  // Acquisition: purchase price (rehab) OR land/lot cost (new build)
  acquisition: number;

  // Construction
  rehab: number; // rehab mode
  buildCost: number; // new build — hard cost
  siteWork: number; // new build — clearing/grading/driveway/utilities/septic
  softCosts: number; // new build — plans/permits/impact & tap fees/survey
  contingencyPct: number; // % of construction (new build), e.g. 0.10

  // Holding
  holdMonths: number;
  monthlyCarry: number; // taxes + insurance + utilities, per month

  // Financing
  financed: boolean;
  loanAmount: number;
  ratePct: number; // annual interest %, e.g. 11 => 11%
  pointsPct: number; // origination points, % of loan, e.g. 2 => 2%

  // Transaction
  buyClosing: number; // $ buy-side closing
  sellClosingPct: number; // % of ARV (title/attorney/transfer)
  brokeragePct: number; // % of ARV, default 6
  builderRiskInsurance: number; // new build, flat $
  assignmentApplies: boolean;
  assignmentFee: number;

  // Targets / context
  targetProfitPct: number; // of ARV, e.g. 0.15
  targetProfitMin: number; // dollar floor, e.g. 30000
  inflationPct: number; // annual, e.g. 0.03
};

export type DealMetrics = {
  // cost stack
  acquisition: number;
  construction: number;
  holdingCarry: number;
  financingInterest: number;
  points: number;
  buyClosing: number;
  sellingCosts: number; // brokerage + sell closing
  assignment: number;
  builderRisk: number;
  allInCost: number;

  // profit
  spread: number; // ARV − construction (the "ARV − rehab" view)
  spreadPct: number;
  grossProfit: number; // ARV − acquisition − construction
  grossMarginPct: number;
  netProfit: number; // ARV − all-in (levered)
  netMarginPct: number;

  // returns
  cashInUnlevered: number;
  cashInLevered: number;
  returnOnCost: number;
  cocUnlevered: number;
  cocLevered: number;
  annualizedReturn: number;
  realReturn: number;
  equityMultiple: number;
  profitPerMonth: number;

  // risk
  breakevenSalePrice: number;
  marginOfSafetyPct: number;

  // max offer for the target profit
  targetProfit: number;
  mao: number;

  // new build extras
  buildPerSf: number;
  arvPerSf: number;

  verdict: 'strong' | 'thin' | 'pass';
};

const pct = (n: number, d: number) => (d > 0 ? n / d : 0);

export function computeDeal(i: DealInputs): DealMetrics {
  const construction =
    i.mode === 'rehab'
      ? i.rehab
      : i.buildCost + i.siteWork + i.softCosts + (i.buildCost + i.siteWork) * i.contingencyPct;

  const holdingCarry = i.monthlyCarry * i.holdMonths;
  const financingInterest = i.financed ? (i.loanAmount * (i.ratePct / 100)) / 12 * i.holdMonths : 0;
  const points = i.financed ? i.loanAmount * (i.pointsPct / 100) : 0;
  const builderRisk = i.mode === 'new_build' ? i.builderRiskInsurance : 0;
  const sellPct = i.brokeragePct / 100 + i.sellClosingPct / 100;
  const sellingCosts = i.arv * sellPct;
  const assignment = i.assignmentApplies ? i.assignmentFee : 0;

  // Costs that are paid in regardless of leverage (exclude selling costs, which net from the sale).
  const baseCosts =
    i.acquisition + construction + holdingCarry + i.buyClosing + assignment + builderRisk;

  const allInCost = baseCosts + financingInterest + points + sellingCosts;

  // Profit views
  const spread = i.arv - construction;
  const grossProfit = i.arv - i.acquisition - construction;
  const netProfit = i.arv - allInCost; // levered (includes interest + points)
  const netProfitUnlevered = i.arv - (baseCosts + sellingCosts); // no financing cost

  // Cash invested
  const cashInUnlevered = baseCosts; // all-cash: you fund everything up front
  const cashInLevered = Math.max(0, baseCosts - i.loanAmount) + (i.financed ? points : 0);

  // Returns
  const returnOnCost = pct(netProfit, allInCost);
  const cocUnlevered = pct(netProfitUnlevered, cashInUnlevered);
  const cocLevered = pct(netProfit, cashInLevered);
  const annualizedReturn = i.holdMonths > 0 ? cocLevered * (12 / i.holdMonths) : 0;
  const realReturn = (1 + annualizedReturn) / (1 + i.inflationPct) - 1;
  const equityMultiple = cashInLevered > 0 ? (cashInLevered + netProfit) / cashInLevered : 0;
  const profitPerMonth = i.holdMonths > 0 ? netProfit / i.holdMonths : 0;

  // Risk: breakeven ARV (selling costs scale with sale price, so solve for it)
  const fixedCosts = baseCosts + financingInterest + points;
  const breakevenSalePrice = sellPct < 1 ? fixedCosts / (1 - sellPct) : fixedCosts;
  const marginOfSafetyPct = pct(i.arv - breakevenSalePrice, i.arv);

  // Max Allowable Offer: highest acquisition price that still nets the target profit.
  const targetProfit = Math.max(i.arv * i.targetProfitPct, i.targetProfitMin);
  const mao =
    i.arv * (1 - sellPct) -
    (construction + holdingCarry + financingInterest + points + i.buyClosing + assignment + builderRisk) -
    targetProfit;

  const buildPerSf = pct(construction, i.squareFeet);
  const arvPerSf = pct(i.arv, i.squareFeet);

  const netMarginPct = pct(netProfit, i.arv);
  const verdict: DealMetrics['verdict'] =
    netProfit <= 0 || netMarginPct < 0.06 ? 'pass' : netMarginPct < 0.12 ? 'thin' : 'strong';

  return {
    acquisition: i.acquisition,
    construction,
    holdingCarry,
    financingInterest,
    points,
    buyClosing: i.buyClosing,
    sellingCosts,
    assignment,
    builderRisk,
    allInCost,
    spread,
    spreadPct: pct(spread, i.arv),
    grossProfit,
    grossMarginPct: pct(grossProfit, i.arv),
    netProfit,
    netMarginPct,
    cashInUnlevered,
    cashInLevered,
    returnOnCost,
    cocUnlevered,
    cocLevered,
    annualizedReturn,
    realReturn,
    equityMultiple,
    profitPerMonth,
    breakevenSalePrice,
    marginOfSafetyPct,
    targetProfit,
    mao,
    buildPerSf,
    arvPerSf,
    verdict,
  };
}

// Sensible starting inputs, pre-filled from a snapshot's ARV + rehab.
export function defaultDealInputs(args: {
  mode: DealMode;
  arv: number;
  rehab: number;
  squareFeet: number;
}): DealInputs {
  return {
    mode: args.mode,
    arv: args.arv,
    squareFeet: args.squareFeet || 0,
    acquisition: 0,
    rehab: args.rehab,
    buildCost: 0,
    siteWork: 0,
    softCosts: 0,
    contingencyPct: 0.1,
    holdMonths: args.mode === 'new_build' ? 9 : 4,
    monthlyCarry: 0,
    financed: false,
    loanAmount: 0,
    ratePct: 11,
    pointsPct: 2,
    buyClosing: 0,
    sellClosingPct: 1,
    brokeragePct: 6,
    builderRiskInsurance: 0,
    assignmentApplies: false,
    assignmentFee: 0,
    targetProfitPct: 0.15,
    targetProfitMin: 30000,
    inflationPct: 0.03,
  };
}
