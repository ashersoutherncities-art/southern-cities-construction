'use client';

import { useMemo, useState } from 'react';
import { computeDeal, defaultDealInputs, DealInputs, DealMode } from '@/lib/deal-desk/dealmath';

type NumericKey = { [K in keyof DealInputs]: DealInputs[K] extends number ? K : never }[keyof DealInputs];

const NAVY = '#132452';

const money = (n: number) => `$${Math.round(n).toLocaleString()}`;
const pctFmt = (n: number) => `${(n * 100).toFixed(1)}%`;
const mult = (n: number) => `${n.toFixed(2)}x`;

const VERDICT: Record<string, { label: string; color: string }> = {
  strong: { label: 'STRONG', color: '#1a7f37' },
  thin: { label: 'THIN', color: '#b7791f' },
  pass: { label: 'PASS', color: '#c0392b' },
};

const inputStyle: React.CSSProperties = {
  border: '1px solid #d1d5db', borderRadius: 8, padding: '9px 11px', fontSize: 14, width: '100%',
};
const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: NAVY, display: 'block', marginBottom: 3 };

export default function DealAnalyzer({ arv, rehab, squareFeet }: { arv: number; rehab: number; squareFeet: number }) {
  const [inputs, setInputs] = useState<DealInputs>(() => defaultDealInputs({ mode: 'rehab', arv, rehab, squareFeet }));
  const m = useMemo(() => computeDeal(inputs), [inputs]);

  function up<K extends keyof DealInputs>(key: K, value: DealInputs[K]) {
    setInputs((p) => ({ ...p, [key]: value }));
  }
  // number field bound to inputs[key]; `scale` 100 shows a fraction as a percent.
  function Num({ label, k, scale = 1, step }: { label: string; k: NumericKey; scale?: number; step?: number }) {
    const raw = inputs[k];
    return (
      <label style={{ display: 'block' }}>
        <span style={labelStyle}>{label}</span>
        <input
          type="number"
          step={step}
          value={Number.isFinite(raw) ? Math.round(raw * scale * 100) / 100 : 0}
          onChange={(e) => {
            const v = (Number(e.target.value) || 0) / scale;
            setInputs((p) => ({ ...p, [k]: v }));
          }}
          style={inputStyle}
        />
      </label>
    );
  }

  const isNew = inputs.mode === 'new_build';

  return (
    <div style={{ marginTop: 18, background: '#fff', border: '1px solid #e8dfd4', borderRadius: 16, padding: 22 }}>
      <h3 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 900 }}>Full deal analysis</h3>
      <p style={{ margin: '0 0 14px', fontSize: 12.5, color: '#6b7280' }}>
        Enter your numbers — or run a snapshot above to auto-fill ARV + rehab. Flip the toggle to <strong>New Build</strong> for ground-up deals. Everything recalculates live.
      </p>

      {/* Mode toggle */}
      <div style={{ display: 'inline-flex', background: '#f1ece4', borderRadius: 999, padding: 3, marginBottom: 16 }}>
        {(['rehab', 'new_build'] as DealMode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => up('mode', mode)}
            style={{
              border: 'none', borderRadius: 999, padding: '7px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              background: inputs.mode === mode ? NAVY : 'transparent', color: inputs.mode === mode ? '#fff' : NAVY,
            }}
          >
            {mode === 'rehab' ? 'Rehab / Flip' : 'New Build'}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
        <Num label="ARV (resale value)" k="arv" />
        <Num label="Square feet" k="squareFeet" />
        <Num label={isNew ? 'Land / lot cost' : 'Purchase price'} k="acquisition" />
        {isNew ? (
          <>
            <Num label="Hard build cost" k="buildCost" />
            <Num label="Site work" k="siteWork" />
            <Num label="Soft costs (plans/permits/fees)" k="softCosts" />
            <Num label="Contingency %" k="contingencyPct" scale={100} />
            <Num label="Builder's-risk insurance" k="builderRiskInsurance" />
          </>
        ) : (
          <Num label="Rehab cost" k="rehab" />
        )}
        <Num label="Hold (months)" k="holdMonths" />
        <Num label="Monthly carry (tax/ins/util)" k="monthlyCarry" />
        <Num label="Buy-side closing" k="buyClosing" />
        <Num label="Sell closing %" k="sellClosingPct" />
        <Num label="Brokerage %" k="brokeragePct" />
        <Num label="Target profit % of ARV" k="targetProfitPct" scale={100} />
        <Num label="Target profit floor $" k="targetProfitMin" />
      </div>

      {/* Financing */}
      <div style={{ marginTop: 12 }}>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: NAVY }}>
          <input type="checkbox" checked={inputs.financed} onChange={(e) => up('financed', e.target.checked)} />
          Financed?
        </label>
        {inputs.financed ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12, marginTop: 8 }}>
            <Num label="Loan amount" k="loanAmount" />
            <Num label="Interest rate % /yr" k="ratePct" />
            <Num label="Points %" k="pointsPct" />
          </div>
        ) : null}
      </div>

      {/* Assignment */}
      <div style={{ marginTop: 12 }}>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: NAVY }}>
          <input type="checkbox" checked={inputs.assignmentApplies} onChange={(e) => up('assignmentApplies', e.target.checked)} />
          Assignment fee applies?
        </label>
        {inputs.assignmentApplies ? (
          <div style={{ marginTop: 8, maxWidth: 200 }}>
            <Num label="Assignment fee $" k="assignmentFee" />
          </div>
        ) : null}
      </div>

      {/* Headline */}
      <div style={{ marginTop: 18, padding: 16, borderRadius: 12, background: '#f6f2ec', border: '1px solid #e8dfd4' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 900, fontSize: 16, color: VERDICT[m.verdict].color }}>{VERDICT[m.verdict].label}</span>
          <span style={{ fontSize: 13, color: '#6b7280' }}>Net Profit</span>
          <span style={{ fontSize: 28, fontWeight: 900, color: m.netProfit < 0 ? '#c0392b' : NAVY }}>{money(m.netProfit)}</span>
          <span style={{ fontSize: 13, color: '#6b7280' }}>· {pctFmt(m.netMarginPct)} net margin</span>
        </div>
        <div style={{ marginTop: 6, fontSize: 13, color: NAVY }}>
          Max Allowable Offer (for {pctFmt(m.targetProfit / (inputs.arv || 1))} / {money(m.targetProfit)} profit): <strong>{money(m.mao)}</strong>
        </div>
      </div>

      {/* Metrics grid */}
      <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
        {[
          ['Spread (ARV − const.)', `${money(m.spread)} · ${pctFmt(m.spreadPct)}`],
          ['Gross Profit', `${money(m.grossProfit)} · ${pctFmt(m.grossMarginPct)}`],
          ['Net Margin', pctFmt(m.netMarginPct)],
          ['Return on Cost', pctFmt(m.returnOnCost)],
          ['Cash-on-Cash (unlev.)', pctFmt(m.cocUnlevered)],
          ['Cash-on-Cash (levered)', inputs.financed ? pctFmt(m.cocLevered) : '— (all cash)'],
          ['Annualized return', pctFmt(m.annualizedReturn)],
          ['Real return (infl-adj.)', pctFmt(m.realReturn)],
          ['Equity multiple', mult(m.equityMultiple)],
          ['Profit / month', money(m.profitPerMonth)],
          ['Breakeven sale price', money(m.breakevenSalePrice)],
          ['Margin of safety', pctFmt(m.marginOfSafetyPct)],
          ['Total cash needed', money(inputs.financed ? m.cashInLevered : m.cashInUnlevered)],
          ...(isNew
            ? ([
                ['Build $/SF', money(m.buildPerSf)],
                ['ARV $/SF', money(m.arvPerSf)],
              ] as [string, string][])
            : ([] as [string, string][])),
        ].map(([label, val]) => (
          <div key={label} style={{ background: '#fff', border: '1px solid #f1ece4', borderRadius: 10, padding: '10px 12px' }}>
            <div style={{ fontSize: 11, color: '#6b7280' }}>{label}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: NAVY }}>{val}</div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 12, fontSize: 11, color: '#9ca3af' }}>
        Underwriting estimates, not a guarantee. Real return is inflation-adjusted. ARV is a derived estimate; an SC Realty CMA provides the finalized value. NC GC License #107724.
      </p>
    </div>
  );
}
