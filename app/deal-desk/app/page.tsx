'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import DealAnalyzer from './DealAnalyzer';

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

type HistoryItem = {
  id: string;
  property_address: string | null;
  mao: number | null;
  verdict: string | null;
  recommend_cma: boolean | null;
  created_at: string;
};

const money = (n: number) => `$${Math.round(n).toLocaleString()}`;
const inputStyle: React.CSSProperties = { border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 12px', fontSize: 14, width: '100%' };

// --- Google Places address verification (new Places API; off until a key is set) ---
type NewAddressComponent = { longText: string; shortText: string; types: string[] };
type NewPlace = {
  formattedAddress?: string;
  addressComponents?: NewAddressComponent[];
  fetchFields: (opts: { fields: string[] }) => Promise<unknown>;
};
type NewSuggestion = { placePrediction: { text: { text: string }; toPlace: () => NewPlace } };
type PlacesNS = {
  AutocompleteSuggestion?: {
    fetchAutocompleteSuggestions: (req: {
      input: string;
      includedRegionCodes?: string[];
      locationRestriction?: unknown;
      sessionToken?: unknown;
    }) => Promise<{ suggestions: NewSuggestion[] }>;
  };
  AutocompleteSessionToken?: new () => unknown;
};
type GoogleNS = { maps?: { places?: PlacesNS } };

function loadGoogleMaps(key: string): Promise<GoogleNS | null> {
  return new Promise((resolve) => {
    const w = window as unknown as { google?: GoogleNS };
    if (w.google?.maps?.places) return resolve(w.google);
    const done = () => resolve((window as unknown as { google?: GoogleNS }).google ?? null);
    const existing = document.getElementById('gmaps-places') as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', done);
      existing.addEventListener('error', () => resolve(null));
      return;
    }
    const s = document.createElement('script');
    s.id = 'gmaps-places';
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=places&v=weekly`;
    s.async = true;
    s.onload = done;
    s.onerror = () => resolve(null);
    document.head.appendChild(s);
  });
}

function addrPart(place: NewPlace, type: string, short = false): string | undefined {
  const c = place.addressComponents?.find((x) => x.types.includes(type));
  return c ? (short ? c.shortText : c.longText) : undefined;
}

export default function DealDeskApp() {
  const [token, setToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ mao: MaoResult; remaining: number | null; delivered: boolean; address: string; squareFeet: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [lookupMsg, setLookupMsg] = useState<string | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [cmaLoading, setCmaLoading] = useState(false);
  const [cmaMsg, setCmaMsg] = useState<string | null>(null);
  const [cmaOrdered, setCmaOrdered] = useState(false);
  const [googleOn, setGoogleOn] = useState(false);
  const [addressValidated, setAddressValidated] = useState(false);
  const [suggestions, setSuggestions] = useState<NewSuggestion[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const googleInitedRef = useRef(false);
  const placesNsRef = useRef<PlacesNS | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionTokenRef = useRef<unknown>(null);

  const loadHistory = useCallback(async (t: string) => {
    try {
      const res = await fetch('/api/deal-desk/history', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token: t }),
      });
      const data = await res.json();
      if (Array.isArray(data.snapshots)) setHistory(data.snapshots);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('token');
    if (params.get('cma') === 'ordered') setCmaOrdered(true);
    setToken(t);
    if (t) loadHistory(t);
  }, [loadHistory]);

  // Load the new Google Places API — only activates if a key is configured.
  useEffect(() => {
    if (token === null || googleInitedRef.current) return;
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!key) return;
    googleInitedRef.current = true;
    loadGoogleMaps(key).then((g) => {
      if (g?.maps?.places?.AutocompleteSuggestion) {
        placesNsRef.current = g.maps.places;
        setGoogleOn(true);
      }
    });
  }, [token]);

  // Debounced address-suggestion fetch (new Places API).
  function onAddressChange(value: string) {
    setAddressValidated(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const ns = placesNsRef.current;
    if (!ns?.AutocompleteSuggestion || value.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        if (!sessionTokenRef.current && ns.AutocompleteSessionToken) {
          sessionTokenRef.current = new ns.AutocompleteSessionToken();
        }
        const res = await ns.AutocompleteSuggestion!.fetchAutocompleteSuggestions({
          input: value.trim(),
          includedRegionCodes: ['us'],
          // HARD-restrict to the North Carolina bounding box so out-of-state
          // matches (e.g. "7 Tanglewood Dr" in Yarmouth, MA) can't appear at
          // all — only NC addresses are suggested.
          locationRestriction: { north: 36.59, south: 33.75, east: -75.4, west: -84.4 },
          sessionToken: sessionTokenRef.current,
        });
        setSuggestions((res.suggestions || []).slice(0, 5));
      } catch {
        setSuggestions([]);
      }
    }, 300);
  }

  // Member picked a suggestion → fill the form + mark verified.
  async function onSelectSuggestion(s: NewSuggestion) {
    setSuggestions([]);
    try {
      const place = s.placePrediction.toPlace();
      await place.fetchFields({ fields: ['formattedAddress', 'addressComponents'] });
      const street = [addrPart(place, 'street_number'), addrPart(place, 'route')].filter(Boolean).join(' ');
      setField('property_address', street || place.formattedAddress || s.placePrediction.text.text);
      setField('city', addrPart(place, 'locality') || addrPart(place, 'sublocality') || '');
      setField('zip', addrPart(place, 'postal_code') || '');
      setField('state', addrPart(place, 'administrative_area_level_1', true) || 'NC');
    } catch {
      setField('property_address', s.placePrediction.text.text);
    }
    setAddressValidated(true);
    sessionTokenRef.current = null;
  }

  function setField(name: string, value: string | number | undefined) {
    if (value === undefined || value === null || value === '') return;
    const el = formRef.current?.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;
    if (el) el.value = String(value);
  }

  function addressValue(): string {
    const el = formRef.current?.elements.namedItem('property_address') as HTMLInputElement | null;
    return (el?.value || '').trim();
  }

  async function onLookup() {
    if (!token) return;
    const address = addressValue();
    if (!address) {
      setLookupMsg('Enter an address first.');
      return;
    }
    setLookupLoading(true);
    setLookupMsg(null);
    try {
      const res = await fetch('/api/deal-desk/property-lookup', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token, address }),
      });
      const data = await res.json();
      if (data.found && data.property) {
        const p = data.property;
        setField('city', p.city);
        setField('zip', p.zip);
        setField('square_feet', p.squareFeet);
        setField('year_built', p.yearBuilt);
        setField('bedrooms', p.bedrooms);
        setField('bathrooms', p.bathrooms);
        setField('property_type', p.propertyType);
        setLookupMsg('Property details filled in — review and add your scope.');
      } else {
        setLookupMsg("Couldn't find public records for that address — enter the details manually.");
      }
    } catch {
      setLookupMsg('Lookup failed — enter details manually.');
    } finally {
      setLookupLoading(false);
    }
  }

  async function onOrderCma() {
    if (!token) return;
    const address = addressValue() || result?.address || '';
    if (!address) {
      setCmaMsg('Enter the property address first.');
      return;
    }
    setCmaLoading(true);
    setCmaMsg(null);
    try {
      const res = await fetch('/api/deal-desk/cma-checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token, address }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else if (data.free) setCmaMsg(data.message);
      else setCmaMsg(data.detail || 'Could not start the CMA order.');
    } catch {
      setCmaMsg('Something went wrong starting the CMA order.');
    } finally {
      setCmaLoading(false);
    }
  }

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
          valuation_unavailable: "We couldn't pull a market value for that address. Try the ARV override or order a CMA.",
        };
        setError(map[data.reason] || map[data.error] || data.detail || 'Something went wrong.');
      } else {
        setResult({ ...data, address: project.property_address, squareFeet: project.square_feet });
        loadHistory(token);
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
    <main style={{ background: CREAM, color: NAVY, minHeight: '100vh', padding: '32px 20px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: 22, alignItems: 'start' }}>
        {/* Main column */}
        <div>
          <p style={{ color: ORANGE, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: 12 }}>Deal Desk</p>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: '6px 0 6px' }}>Run a deal</h1>
          <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 16px' }}>
            You&apos;re signed in by your private link — no password needed. It refreshes automatically each billing cycle.
          </p>

          {cmaOrdered ? (
            <div style={{ marginBottom: 16, background: '#e7f6ec', border: '1px solid #b6e0c2', borderRadius: 12, padding: 14, color: '#1a7f37', fontSize: 14 }}>
              CMA ordered — a licensed Southern Cities Realty broker will prepare it and follow up by email.
            </div>
          ) : null}

          <form ref={formRef} onSubmit={onSubmit} style={{ background: '#fff', border: '1px solid #e8dfd4', borderRadius: 16, padding: 22 }}>
            {/* Address + look-up */}
            <div style={{ position: 'relative', marginBottom: 6 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  ref={addressInputRef}
                  name="property_address"
                  placeholder={googleOn ? 'Start typing the address…' : 'Property address'}
                  required
                  autoComplete="off"
                  onChange={(e) => onAddressChange(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                />
                <button
                  type="button"
                  onClick={onLookup}
                  disabled={lookupLoading}
                  style={{ whiteSpace: 'nowrap', background: NAVY, color: '#fff', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0 16px', cursor: lookupLoading ? 'default' : 'pointer' }}
                >
                  {lookupLoading ? 'Looking…' : 'Look up'}
                </button>
              </div>
              {suggestions.length > 0 ? (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 90, zIndex: 50, background: '#fff', border: '1px solid #e8dfd4', borderRadius: 8, marginTop: 4, boxShadow: '0 10px 28px rgba(19,36,82,0.14)', overflow: 'hidden' }}>
                  {suggestions.map((s, i) => (
                    <div
                      key={i}
                      onMouseDown={(e) => { e.preventDefault(); onSelectSuggestion(s); }}
                      style={{ padding: '10px 12px', fontSize: 14, cursor: 'pointer', borderBottom: i < suggestions.length - 1 ? '1px solid #f1ece4' : 'none' }}
                    >
                      {s.placePrediction.text.text}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            {googleOn ? (
              <p style={{ margin: '0 0 10px', fontSize: 12, color: addressValidated ? '#1a7f37' : '#6b7280' }}>
                {addressValidated
                  ? '✓ Address verified — Look up to auto-fill property details.'
                  : 'Pick a Google suggestion to verify — or just type the full address and hit Look up.'}
              </p>
            ) : null}
            {lookupMsg ? <p style={{ margin: '0 0 10px', fontSize: 12.5, color: '#6b7280' }}>{lookupMsg}</p> : null}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input name="first_name" placeholder="First name" style={inputStyle} />
              <input name="last_name" placeholder="Last name" style={inputStyle} />
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
                <option value="manufactured">Manufactured</option>
              </select>
              <select name="target_finish_level" style={inputStyle} defaultValue="basic_flip">
                <option value="rental_grade">Rental grade</option>
                <option value="basic_flip">Basic flip</option>
                <option value="mid_grade">Mid grade</option>
                <option value="high_end">High end</option>
              </select>
              <input name="arv" type="number" placeholder="ARV override (optional)" style={{ ...inputStyle, gridColumn: '1 / -1' }} />
            </div>

            <h3 style={{ fontSize: 14, fontWeight: 800, margin: '18px 0 8px' }}>Scope of work</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 6 }}>
              {SCOPE_ITEMS.map((it) => (
                <label key={it.key} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                  <input type="checkbox" name={it.key} /> {it.label}
                </label>
              ))}
            </div>

            <h3 style={{ fontSize: 14, fontWeight: 800, margin: '18px 0 4px' }}>Bathrooms — how many get each level?</h3>
            <p style={{ margin: '0 0 10px', fontSize: 12.5, color: '#6b7280', lineHeight: 1.5 }}>
              Each bathroom counts once — it&apos;s either a refresh <em>or</em> a gut, not both. <strong>Refresh</strong> = cosmetic, plumbing stays (vanity, faucet, toilet, light, paint, re-glaze tub) ≈ $3–7k. <strong>Full gut</strong> = down to the studs, all-new plumbing, tile &amp; tub ≈ $12–20k+. <em>Example: a 2-bath house where you fully redo the master and just freshen the guest bath → 1 gut, 1 refresh.</em>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: NAVY }}>
                Bathrooms getting a cosmetic refresh
                <input name="bathroom_refresh_count" type="number" min={0} defaultValue={0} style={{ ...inputStyle, marginTop: 4 }} />
              </label>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: NAVY }}>
                Bathrooms getting a full gut
                <input name="bathroom_full_count" type="number" min={0} defaultValue={0} style={{ ...inputStyle, marginTop: 4 }} />
              </label>
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

              {/* CMA order */}
              <div style={{ marginTop: 14, padding: 14, borderRadius: 12, background: result.mao.recommendCma ? '#fdeee2' : '#f6f2ec', border: `1px solid ${result.mao.recommendCma ? '#f3c89f' : '#e8dfd4'}` }}>
                {result.mao.recommendCma ? (
                  <p style={{ margin: '0 0 8px', color: '#b7791f', fontSize: 13, fontWeight: 600 }}>
                    Our valuation came back uncertain on this one — finalize the ARV with a licensed-broker CMA before you offer.
                  </p>
                ) : (
                  <p style={{ margin: '0 0 8px', fontSize: 13, color: '#374151' }}>
                    Want a licensed-broker valuation you can stand behind? Order a CMA on this property.
                  </p>
                )}
                <button
                  type="button"
                  onClick={onOrderCma}
                  disabled={cmaLoading}
                  style={{ background: NAVY, color: '#fff', fontWeight: 700, border: 'none', borderRadius: 10, padding: '11px 18px', fontSize: 14, cursor: 'pointer' }}
                >
                  {cmaLoading ? 'Starting…' : 'Order a Broker CMA'}
                </button>
                <span style={{ marginLeft: 10, fontSize: 12.5, color: '#6b7280' }}>$99 for members · Pro includes 1/mo free</span>
                {cmaMsg ? <p style={{ margin: '10px 0 0', fontSize: 13, color: NAVY }}>{cmaMsg}</p> : null}
              </div>

              <p style={{ marginTop: 12, fontSize: 13, color: '#6b7280' }}>
                {result.delivered ? 'A full PDF was emailed to you. ' : ''}
                {result.remaining == null ? 'Unlimited snapshots remaining.' : `${result.remaining} snapshot${result.remaining === 1 ? '' : 's'} left this period.`}
              </p>
              <p style={{ marginTop: 8, fontSize: 11, color: '#9ca3af' }}>
                Underwriting guide, not an appraisal. ARV is a derived estimate; an SC Realty CMA provides the finalized value. NC GC License #107724.
              </p>
            </div>
          ) : null}

          <DealAnalyzer
            key={result ? `${result.address}-${Math.round(result.mao.arv)}` : 'blank'}
            arv={result?.mao.arv ?? 0}
            rehab={result?.mao.rehab ?? 0}
            squareFeet={result?.squareFeet ?? 0}
          />
        </div>

        {/* History sidebar */}
        <aside style={{ background: '#fff', border: '1px solid #e8dfd4', borderRadius: 16, padding: 16, position: 'sticky', top: 24 }}>
          <h3 style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 800 }}>Your past runs</h3>
          {history.length === 0 ? (
            <p style={{ margin: 0, fontSize: 13, color: '#9ca3af' }}>No runs yet. Your snapshots will show here.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {history.map((h) => (
                <div key={h.id} style={{ borderBottom: '1px solid #f1ece4', paddingBottom: 8 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: NAVY, lineHeight: 1.3 }}>
                    {h.property_address || 'Property'}
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280', margin: '2px 0 4px' }}>
                    {h.mao != null ? `MAO ${money(h.mao)}` : '—'}
                    {h.verdict ? ` · ${h.verdict}` : ''}
                    {' · '}
                    {new Date(h.created_at).toLocaleDateString()}
                  </div>
                  <a
                    href={`/api/deal-desk/snapshot-pdf?token=${encodeURIComponent(token)}&id=${h.id}`}
                    style={{ fontSize: 12.5, fontWeight: 700, color: ORANGE, textDecoration: 'none' }}
                  >
                    ↓ Download PDF
                  </a>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
