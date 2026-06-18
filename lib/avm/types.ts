// AVM (Automated Valuation Model) layer for the Deal Desk MAO feature.
//
// Two providers feed a single reconciled ARV used to compute the wholesaler's
// Max Allowable Offer (MAO):
//   - RentCast   — cheap screening AVM + comps, run on EVERY deal
//   - HouseCanary — premium AVM, run only on screened/serious deals
// When both run and disagree beyond a threshold, we flag the deal for a
// realtor-backed SC Realty CMA (the human, licensed top of the ladder).

export type AvmSource = 'rentcast' | 'housecanary';

export type AvmEstimate = {
  source: AvmSource;
  value: number; // point estimate (ARV)
  low: number | null; // provider's low end of the range
  high: number | null; // provider's high end of the range
  // Provider confidence, normalized 0..1 (1 = most confident). For HouseCanary
  // this is derived from FSD; RentCast has no native score so we infer it from
  // the range width.
  confidence: number | null;
  compCount: number | null;
  raw?: unknown; // original provider payload, for debugging/storage
};

export type PropertyValueQuery = {
  address: string; // street line, e.g. "123 Main St"
  city?: string;
  state?: string;
  zipcode: string;
  // Optional hints that improve accuracy when available:
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
};

// Result of reconciling 1-2 AVMs into a single ARV the MAO can use.
export type ReconciledValuation = {
  arv: number; // the value we'll underwrite against
  sources: AvmEstimate[]; // every AVM that returned a value
  confidence: 'high' | 'moderate' | 'low';
  // Relative spread between the two AVMs (|a-b| / avg). null if <2 sources.
  divergence: number | null;
  // True when the operator should order an SC Realty CMA before relying on the
  // MAO: AVMs disagreed, only one (or zero) source returned, or low confidence.
  recommendCma: boolean;
  notes: string[];
};

// Business assumptions behind the MAO. Defaults live in mao.ts and can be
// overridden per-call or via env vars — these are DARIUS'S numbers to tune to
// his buyer network, not universal constants.
export type MaoConfig = {
  buyerProfitPct: number; // buyer's required net profit, as a fraction of ARV
  holdingClosingPct: number; // buy+sell closing, holding, financing, as fraction of ARV
  assignmentFee: number; // the wholesaler's flat cut (what THEY make)
  ruleOfThumbPct: number; // classic "X% rule" multiplier for the cross-check view
};

export type MaoResult = {
  arv: number;
  rehab: number; // all-in rehab from the SCC snapshot engine
  buyerProfit: number;
  holdingClosing: number;
  assignmentFee: number;
  mao: number; // the detailed-subtraction Max Allowable Offer
  maoRuleOfThumb: number; // (ARV * ruleOfThumbPct) - rehab - assignmentFee, sanity view
  verdict: 'strong' | 'thin' | 'pass'; // 🟢/🟡/🔴 for the snapshot
  confidence: ReconciledValuation['confidence'];
  recommendCma: boolean;
  config: MaoConfig;
  notes: string[];
};
