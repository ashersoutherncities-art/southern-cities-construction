import {
  AvmEstimate,
  MaoConfig,
  MaoResult,
  ReconciledValuation,
} from '@/lib/avm/types';

// ──────────────────────────────────────────────────────────────────────────
// MAO business assumptions — TUNE THESE to SCC's actual buyer network.
// These are NOT universal constants; they encode what your cash buyers expect.
//   MAO = ARV − Rehab − BuyerProfit − Holding/Closing − AssignmentFee
// Env vars override the defaults without a code change.
// ──────────────────────────────────────────────────────────────────────────
export const DEFAULT_MAO_CONFIG: MaoConfig = {
  buyerProfitPct: Number(process.env.MAO_BUYER_PROFIT_PCT ?? 0.15), // buyer's net profit, % of ARV
  holdingClosingPct: Number(process.env.MAO_HOLDING_CLOSING_PCT ?? 0.1), // closing+holding+finance, % of ARV
  assignmentFee: Number(process.env.MAO_ASSIGNMENT_FEE ?? 10000), // wholesaler's flat cut
  ruleOfThumbPct: Number(process.env.MAO_RULE_OF_THUMB_PCT ?? 0.7), // classic "70% rule" cross-check
};

// Spread above which two AVMs are considered to disagree -> recommend a CMA.
const DIVERGENCE_THRESHOLD = Number(process.env.MAO_DIVERGENCE_THRESHOLD ?? 0.07);

// Reconcile 1-2 AVM estimates into a single ARV.
// Strategy: with both sources, weight HouseCanary higher (premium AVM). If they
// diverge beyond the threshold, fall back to the more CONSERVATIVE (lower) value
// and flag for a CMA so we never hand out an aggressive offer on shaky data.
export function reconcileValuation(estimates: AvmEstimate[]): ReconciledValuation | null {
  const valid = estimates.filter((e) => e && e.value > 0);
  if (valid.length === 0) return null;

  const notes: string[] = [];

  if (valid.length === 1) {
    const only = valid[0];
    const conf = only.confidence == null ? 'moderate' : only.confidence >= 0.7 ? 'moderate' : 'low';
    notes.push(`Single AVM source (${only.source}); no cross-check available.`);
    return {
      arv: only.value,
      sources: valid,
      confidence: conf, // one source is never "high" on its own
      divergence: null,
      recommendCma: true, // one source -> always recommend a CMA before offering
      notes,
    };
  }

  const rc = valid.find((e) => e.source === 'rentcast');
  const hc = valid.find((e) => e.source === 'housecanary');
  const a = valid[0].value;
  const b = valid[1].value;
  const avg = (a + b) / 2;
  const divergence = Math.abs(a - b) / avg;

  let arv: number;
  let confidence: ReconciledValuation['confidence'];
  let recommendCma: boolean;

  if (divergence <= DIVERGENCE_THRESHOLD) {
    // Agreement: weight HouseCanary 60/40 when present, else simple average.
    arv = rc && hc ? hc.value * 0.6 + rc.value * 0.4 : avg;
    confidence = 'high';
    recommendCma = false;
    notes.push(`AVMs agree within ${(divergence * 100).toFixed(1)}% — high confidence.`);
  } else {
    arv = Math.min(a, b); // conservative
    confidence = 'low';
    recommendCma = true;
    notes.push(
      `AVMs disagree by ${(divergence * 100).toFixed(1)}% — using the conservative value and recommending an SC Realty CMA.`
    );
  }

  return { arv: Math.round(arv), sources: valid, confidence, divergence, recommendCma, notes };
}

// Compute the MAO from a reconciled ARV + the SCC engine's all-in rehab number.
export function computeMao(
  valuation: ReconciledValuation,
  rehab: number,
  config: MaoConfig = DEFAULT_MAO_CONFIG
): MaoResult {
  const { arv, confidence, recommendCma, notes } = valuation;

  const buyerProfit = Math.round(arv * config.buyerProfitPct);
  const holdingClosing = Math.round(arv * config.holdingClosingPct);
  const mao = Math.round(arv - rehab - buyerProfit - holdingClosing - config.assignmentFee);
  const maoRuleOfThumb = Math.round(arv * config.ruleOfThumbPct - rehab - config.assignmentFee);

  // The MAO already bakes in the target profit + selling costs, so any MAO above
  // $0 is a viable, profitable offer. PASS only when rehab exceeds the spread
  // (no profitable price exists). THIN flags rehab-heavy deals (more execution
  // risk), STRONG is a clean spread.
  const rehabRatio = arv > 0 ? rehab / arv : 1;
  let verdict: MaoResult['verdict'];
  if (mao <= 0) verdict = 'pass'; // 🔴 rehab exceeds the spread — no profitable offer
  else if (rehabRatio > 0.5) verdict = 'thin'; // 🟡 rehab-heavy — execution risk
  else verdict = 'strong'; // 🟢 clean spread

  return {
    arv,
    rehab,
    buyerProfit,
    holdingClosing,
    assignmentFee: config.assignmentFee,
    mao,
    maoRuleOfThumb,
    verdict,
    confidence,
    recommendCma,
    config,
    notes: [...notes],
  };
}
