'use client';

import { useEffect, useState } from 'react';

const NAVY = '#132452';
const ORANGE = '#fa8c41';
const CREAM = '#f6f2ec';

const SCOPE_ITEMS: { key: string; label: string }[] = [
  { key: 'cosmetic_paint', label: 'Paint' },
  { key: 'flooring', label: 'Flooring' },
  { key: 'kitchen_refresh', label: 'Kitchen refresh' },
  { key: 'kitchen_full', label: 'Kitchen full' },
  { key: 'roof', label: 'Roof' },
  { key: 'hvac', label: 'HVAC' },
  { key: 'plumbing_partial', label: 'Plumbing (partial)' },
  { key: 'plumbing_full', label: 'Plumbing (full)' },
  { key: 'electrical_partial', label: 'Electrical (partial)' },
  { key: 'electrical_full', label: 'Electrical (full)' },
  { key: 'windows', label: 'Windows' },
  { key: 'siding', label: 'Siding' },
  { key: 'drywall', label: 'Drywall' },
  { key: 'structural', label: 'Structural' },
  { key: 'foundation', label: 'Foundation' },
  { key: 'layout_changes', label: 'Layout changes' },
  { key: 'full_gut', label: 'Full gut' },
  { key: 'water_damage', label: 'Water damage' },
  { key: 'mold_concern', label: 'Mold concern' },
  { key: 'exterior_work', label: 'Exterior work' },
];

const VERDICT: Record<string, { label: string; color: string }> = {
  strong: { label: 'STRONG — healthy spread', color: '#1a7f37' },
  thin: { label: 'THIN — tight margin', color: '#b7791f' },
  pass: { label: 'PASS — no room at this ARV', color: '#c0392b' },
};

type MaoResult = {
  arv: number;
  rehab: number;
  buyerProfit: number;
  holdingClosing: number;
  assignmentFee: number;
  mao: number;
  maoRuleOfThumb: number;
  verdict: 'strong' | 'thin' | 'pass';
  confidence: string;
  recommendCma: boolean;
};

const money = (n: number) => `$${Math.round(n).toLocaleString()}`;
const inputStyle: React.CSSProperties = { border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 12px', fontSize: 14, width: '100%' };

export default function DealDeskApp() {
  const [token, setToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ mao: MaoResult; remaining: number | null; delivered: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('token');
    setToken(t);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) return;
    setSubmitting(true);
    setError(null);
    setResult(null);

    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? '');
    const project = {
      property_address: get('property_address'),
      city: get('city'),
      state: get('state') || 'NC',
      zip: get('zip'),
      property_type: get('property_type') || 'single_family',
      square_feet: Number(get('square_feet') || 0),
      year_built: get('year_built') ? Number(get('year_built')) : null,
      bedrooms: get('bedrooms') ? Number(get('bedrooms')) : null,
      bathrooms: get('bathrooms') ? Number(get('bathrooms')) : null,
      occupancy_status: 'vacant',
      investment_strategy: 'wholesale_eval',
      target_finish_level: get('target_finish_level') || 'basic_flip',
    };
    const scope: Record<string, unknown> = {};
    for (const it of SCOPE_ITEMS) scope[it.key] = fd.get(it.key) === 'on';
    scope.bathroom_refresh_count = Number(get('bathroom_refresh_count') || 0);
    scope.bathroom_full_count = Number(get('bathroom_full_count') || 0);
    scope.notes = get('notes');
    const arvRaw = get('arv');

    try {
      const res = await fetch('/api/deal-desk/snapshot', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          token,
          first_name: get('first_name'),
          last_name: get('last_name'),
          project,
          scope,
          arv: arvRaw ? Number(arvRaw) : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        const map: Record<string, string> = {
          limit_reached: "You've used all your snapshots for this billing period. Upgrade or wait for your next renewal.",
          expired: 'Your membership period has lapsed. Please check your billing.',
          inactive: 'Your membership is not active.',
          not_found: 'No active membership found for your link.',
          invalid_or_expired_link: 'This link is invalid or expired. Request a fresh one from the Deal Desk page.',
          valuation_unavailable: 'No automated value came back for that address. Try the ARV override or order a CMA.',
        };
        setError(map[data.reason] || map[data.error] || data.detail || 'Something went wrong.');
      } else {
        setResult(data);
      }
    } catch {
      setError('Network error — please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (token === null) {
    return (
      <main style={{ background: CREAM, color: NAVY, minHeight: '100vh', padding: '64px 20px' }}>
        <div style={{ maxWidth: 520, margin: '0 auto', background: '#fff', border: '1px solid #e8dfd4', borderRadius: 16, padding: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Open from your access link</h1>
          <p style={{ fontSize: 15, lineHeight: 1.6 }}>
            This page needs your private link. Go to the Deal Desk page and enter your email to get one.
          </p>
          <a href="/deal-desk#member" style={{ color: ORANGE, fontWeight: 700 }}>Get my link →</a>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: CREAM, color: NAVY, minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <p style={{ color: ORANGE, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: 12 }}>Deal Desk</p>
        <h1 style={{ fontSize: 28, fontWeight: 900, margin: '6px 0 6px' }}>Run a deal</h1>
        <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 18px' }}>
          You&apos;re signed in by your private link — no password needed. It refreshes automatically each billing cycle.
        </p>

        <form onSubmit={onSubmit} style={{ background: '#fff', border: '1px solid #e8dfd4', borderRadius: 16, padding: 22 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <input name="first_name" placeholder="First name" style={inputStyle} />
            <input name="last_name" placeholder="Last name" style={inputStyle} />
            <input name="property_address" placeholder="Property address" required style={{ ...inputStyle, gridColumn: '1 / -1' }} />
            <input name="city" placeholder="City" style={inputStyle} />
            <input name="zip" placeholder="ZIP (NC)" required style={inputStyle} />
            <input name="square_feet" type="number" placeholder="Square feet" required style={inputStyle} />
            <input name="year_built" type="number" placeholder="Year built" style={inputStyle} />
            <input name="bedrooms" type="number" placeholder="Beds" style={inputStyle} />
            <input name="bathrooms" type="number" placeholder="Baths" style={inputStyle} />
            <select name="property_type" style={inputStyle} defaultValue="single_family">
              <option value="single_family">Single family</option>
              <option value="duplex">Duplex</option>
              <option value="triplex">Triplex</option>
              <option value="fourplex">Fourplex</option>
              <option value="multifamily">Multifamily</option>
            </select>
            <select name="target_finish_level" style={inputStyle} defaultValue="basic_flip">
              <option value="rental_grade">Rental grade</option>
              <option value="basic_flip">Basic flip</option>
              <option value="mid_grade">Mid grade</option>
              <option value="high_end">High end</option>
            </select>
            <input name="arv" type="number" placeholder="ARV override (optional)" style={inputStyle} />
          </div>

          <h3 style={{ fontSize: 14, fontWeight: 800, margin: '18px 0 8px' }}>Scope of work</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 6 }}>
            {SCOPE_ITEMS.map((it) => (
              <label key={it.key} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                <input type="checkbox" name={it.key} /> {it.label}
              </label>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
            <input name="bathroom_refresh_count" type="number" placeholder="Baths to refresh" style={inputStyle} />
            <input name="bathroom_full_count" type="number" placeholder="Baths to gut" style={inputStyle} />
          </div>
          <textarea name="notes" placeholder="Notes (optional)" style={{ ...inputStyle, marginTop: 12, minHeight: 60 }} />

          <button
            type="submit"
            disabled={submitting}
            style={{ marginTop: 16, background: ORANGE, color: NAVY, fontWeight: 800, border: 'none', borderRadius: 10, padding: '14px 22px', fontSize: 15, cursor: 'pointer' }}
          >
            {submitting ? 'Running…' : 'Get rehab + Max Allowable Offer'}
          </button>
        </form>

        {error ? (
          <div style={{ marginTop: 18, background: '#fde8e8', border: '1px solid #f5b5b5', borderRadius: 12, padding: 16, color: '#c0392b', fontSize: 14 }}>
            {error}
          </div>
        ) : null}

        {result ? (
          <div style={{ marginTop: 18, background: '#fff', border: '1px solid #e8dfd4', borderRadius: 16, padding: 22 }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: VERDICT[result.mao.verdict].color }}>
              {VERDICT[result.mao.verdict].label}
            </div>
            <div style={{ fontSize: 40, fontWeight: 900, margin: '8px 0' }}>{money(result.mao.mao)}</div>
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>
              Max Allowable Offer · rule-of-thumb cross-check {money(result.mao.maoRuleOfThumb)} · confidence {result.mao.confidence.toUpperCase()}
            </div>
            {[
              ['After-Repair Value (ARV)', money(result.mao.arv)],
              ['Less: estimated rehab', `- ${money(result.mao.rehab)}`],
              ['Less: buyer profit', `- ${money(result.mao.buyerProfit)}`],
              ['Less: holding + closing', `- ${money(result.mao.holdingClosing)}`],
              ['Less: assignment fee', `- ${money(result.mao.assignmentFee)}`],
            ].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '4px 0', borderBottom: '1px solid #f1ece4' }}>
                <span>{l}</span>
                <span>{v}</span>
              </div>
            ))}
            {result.mao.recommendCma ? (
              <p style={{ marginTop: 12, color: '#c0392b', fontSize: 13 }}>
                Automated values diverged or were low-confidence — order a Southern Cities Realty CMA to finalize the ARV before offering.
              </p>
            ) : null}
            <p style={{ marginTop: 12, fontSize: 13, color: '#6b7280' }}>
              {result.delivered ? 'A full PDF was emailed to you. ' : ''}
              {result.remaining == null ? 'Unlimited snapshots remaining.' : `${result.remaining} snapshot${result.remaining === 1 ? '' : 's'} left this period.`}
            </p>
            <p style={{ marginTop: 8, fontSize: 11, color: '#9ca3af' }}>
              Underwriting guide, not an appraisal. ARV is a derived estimate; an SC Realty CMA provides the finalized value. NC GC License #107724.
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
}
