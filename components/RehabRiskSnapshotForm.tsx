'use client';

import { useState } from 'react';
import Link from 'next/link';

type MarketTier = { tier: string; label: string; matched: boolean };

type ResultState = {
  budgetRange: { low: number; high: number };
  costPerSf?: { low: number; high: number };
  marketTier?: MarketTier | null;
  highRiskBudget: number;
  confidenceLevel: string;
  confidenceScore: number;
  executionDifficulty: string;
  permitComplexity: string;
  riskFlags: string[];
  projectCategory: string;
  timelineRange: { lowWeeks: number; highWeeks: number };
  recommendedNextStep: string;
  executionSummary: string;
  assumptions: string[];
  whatCouldChangeThisNumber: string[];
  emailStatus: string;
};

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';
type WizardStep = 1 | 2 | 3;

type ContactInfo = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_name: string;
  investor_type: string;
};

type PropertyInfo = {
  property_address: string;
  city: string;
  state: string;
  zip: string;
  square_feet: string;
  year_built: string;
  stories: string;
  bedrooms: string;
  bathrooms: string;
  property_type: string;
  occupancy_status: string;
  investment_strategy: string;
  target_finish_level: string;
};

const INVESTOR_TYPES = [
  ['flipper', 'Flipper'],
  ['brrrr', 'BRRRR'],
  ['landlord', 'Landlord'],
  ['wholesaler', 'Wholesaler'],
  ['developer', 'Developer'],
  ['homeowner', 'Homeowner'],
  ['realtor', 'Realtor'],
  ['other', 'Other'],
];

const PROPERTY_TYPES = [
  ['single_family', 'Single-family'],
  ['duplex', 'Duplex'],
  ['triplex', 'Triplex'],
  ['fourplex', 'Fourplex'],
  ['multifamily', 'Multifamily'],
  ['manufactured', 'Manufactured'],
  ['mixed_use', 'Mixed-use'],
  ['other', 'Other'],
];

const STRATEGIES = [
  ['flip', 'Flip'],
  ['rental', 'Rental'],
  ['brrrr', 'BRRRR'],
  ['wholesale_eval', 'Wholesale evaluation'],
  ['owner_occupied', 'Owner-occupied'],
  ['development', 'Development'],
  ['other', 'Other'],
];

const FINISH_LEVELS = [
  ['rental_grade', 'Rental grade'],
  ['basic_flip', 'Basic flip'],
  ['mid_grade', 'Mid-grade'],
  ['high_end', 'High-end'],
  ['luxury', 'Luxury'],
];

const OCCUPANCY = [
  ['occupied', 'Occupied'],
  ['vacant', 'Vacant'],
  ['unknown', 'Unknown'],
];

// Grouped for display. Every boolean field below is also flattened into
// SCOPE_CHECK_NAMES so the final submit always posts true/false for each.
const SCOPE_GROUPS: { title: string; items: [string, string][] }[] = [
  {
    title: 'Finishes & cosmetic',
    items: [
      ['cosmetic_paint', 'Paint reset'],
      ['flooring', 'Flooring replacement'],
      ['drywall', 'Drywall'],
      ['windows', 'Windows'],
    ],
  },
  {
    title: 'Kitchen & bath',
    items: [
      ['kitchen_refresh', 'Kitchen refresh'],
      ['kitchen_full', 'Full kitchen'],
    ],
  },
  {
    title: 'Systems',
    items: [
      ['roof', 'Roof'],
      ['hvac', 'HVAC'],
      ['plumbing_partial', 'Partial plumbing'],
      ['plumbing_full', 'Full plumbing'],
      ['electrical_partial', 'Partial electrical'],
      ['electrical_full', 'Full electrical'],
    ],
  },
  {
    title: 'Structure & layout',
    items: [
      ['framing', 'Framing'],
      ['structural', 'Structural work'],
      ['foundation', 'Foundation'],
      ['addition', 'Addition'],
      ['layout_changes', 'Layout changes'],
      ['full_gut', 'Full gut'],
    ],
  },
  {
    title: 'Condition risks',
    items: [
      ['fire_damage', 'Fire damage'],
      ['water_damage', 'Water damage'],
      ['mold_concern', 'Mold concern'],
      ['termite_concern', 'Termite concern'],
    ],
  },
  {
    title: 'Exterior & site',
    items: [
      ['siding', 'Siding / cladding'],
      ['exterior_work', 'Exterior work'],
      ['landscaping', 'Landscaping'],
      ['driveway', 'Driveway / hardscape'],
    ],
  },
  {
    title: 'Permitting',
    items: [['permit_required_unknown', 'Permit path unknown']],
  },
];

const SCOPE_CHECK_NAMES = SCOPE_GROUPS.flatMap((group) => group.items.map(([name]) => name));

function currency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function investorTypeLabel(value: string): string {
  const match = INVESTOR_TYPES.find(([v]) => v === value);
  return match ? match[1] : value;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
      {children}
    </label>
  );
}

const inputClass =
  'w-full rounded-xl border border-white/12 bg-[#0c172e] px-4 py-3 text-[15px] text-white placeholder:text-white/30 transition-colors focus:border-orange/60 focus:outline-none focus:ring-2 focus:ring-orange/20';

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className || ''}`} />;
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputClass} ${props.className || ''}`} />;
}

function ProgressHeader({ step }: { step: WizardStep }) {
  const steps = ['Contact', 'Property', 'Scope'];
  return (
    <div className="mb-7">
      <div className="flex items-center gap-2">
        {steps.map((label, idx) => {
          const n = (idx + 1) as WizardStep;
          const done = step > n;
          const active = step === n;
          return (
            <div key={label} className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-black transition-colors ${
                    done
                      ? 'bg-emerald-400 text-[#06210f]'
                      : active
                        ? 'bg-orange text-white'
                        : 'bg-white/10 text-white/45'
                  }`}
                >
                  {done ? '✓' : n}
                </span>
                <span
                  className={`text-[12px] font-bold uppercase tracking-[0.12em] ${
                    active ? 'text-white' : done ? 'text-white/65' : 'text-white/35'
                  }`}
                >
                  {label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`h-[2px] flex-1 rounded-full ${done ? 'bg-emerald-400/60' : 'bg-white/10'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const primaryBtn =
  'inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-full bg-orange px-6 py-4 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_18px_45px_-18px_rgba(250,140,65,0.8)] transition hover:-translate-y-0.5 hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60';

const ghostBtn =
  'inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/20 px-6 py-4 text-sm font-bold text-white/80 transition hover:border-white/45 hover:text-white';

export default function RehabRiskSnapshotForm() {
  const [step, setStep] = useState<WizardStep>(1);
  const [contact, setContact] = useState<ContactInfo>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company_name: '',
    investor_type: 'flipper',
  });
  const [property, setProperty] = useState<PropertyInfo>({
    property_address: '',
    city: '',
    state: 'NC',
    zip: '',
    square_feet: '',
    year_built: '',
    stories: '',
    bedrooms: '',
    bathrooms: '',
    property_type: 'single_family',
    occupancy_status: 'vacant',
    investment_strategy: 'flip',
    target_finish_level: 'basic_flip',
  });
  const [state, setState] = useState<SubmissionState>('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState<ResultState | null>(null);

  function scrollFormTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: window.scrollY - 120, behavior: 'smooth' });
    }
  }

  function onStep1Submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const next: ContactInfo = {
      first_name: String(fd.get('first_name') ?? '').trim(),
      last_name: String(fd.get('last_name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      phone: String(fd.get('phone') ?? '').trim(),
      company_name: String(fd.get('company_name') ?? '').trim(),
      investor_type: String(fd.get('investor_type') ?? 'flipper'),
    };
    if (!next.first_name || !next.last_name || !next.email) {
      setError('First name, last name, and email are required.');
      return;
    }
    setError('');
    setContact(next);
    setStep(2);

    // Fire-and-forget partial-lead capture so we keep them even if they bail.
    void fetch('/api/rehab-budget-snapshots/lead-capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...next, honey: '' }),
      keepalive: true,
    }).catch(() => {});

    scrollFormTop();
  }

  function onStep2Submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const next: PropertyInfo = {
      property_address: String(fd.get('property_address') ?? '').trim(),
      city: String(fd.get('city') ?? '').trim(),
      state: String(fd.get('state') ?? 'NC').trim(),
      zip: String(fd.get('zip') ?? '').trim(),
      square_feet: String(fd.get('square_feet') ?? '').trim(),
      year_built: String(fd.get('year_built') ?? '').trim(),
      stories: String(fd.get('stories') ?? '').trim(),
      bedrooms: String(fd.get('bedrooms') ?? '').trim(),
      bathrooms: String(fd.get('bathrooms') ?? '').trim(),
      property_type: String(fd.get('property_type') ?? 'single_family'),
      occupancy_status: String(fd.get('occupancy_status') ?? 'vacant'),
      investment_strategy: String(fd.get('investment_strategy') ?? 'flip'),
      target_finish_level: String(fd.get('target_finish_level') ?? 'basic_flip'),
    };
    if (!next.property_address || !next.square_feet || Number(next.square_feet) <= 0) {
      setError('Property address and a valid square footage are required.');
      return;
    }
    setError('');
    setProperty(next);
    setStep(3);
    scrollFormTop();
  }

  async function onStep3Submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('loading');
    setError('');
    setResult(null);

    const formData = new FormData(event.currentTarget);

    // Contact (from step 1)
    Object.entries(contact).forEach(([k, v]) => formData.set(k, v));
    // Property (from step 2)
    Object.entries(property).forEach(([k, v]) => formData.set(k, v));
    // Normalize every scope checkbox to explicit true/false
    for (const name of SCOPE_CHECK_NAMES) {
      formData.set(name, formData.has(name) ? 'true' : 'false');
    }
    formData.set('honey', '');

    try {
      const response = await fetch('/api/rehab-budget-snapshots', { method: 'POST', body: formData });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        setState('error');
        setError(body.error || 'Submission failed. Please try again.');
        return;
      }
      setResult(body.result || null);
      setState('success');
      scrollFormTop();
    } catch {
      setState('error');
      setError('Network error. Please try again.');
    }
  }

  const formCard =
    'rounded-[28px] border border-white/10 bg-[#0a142b] p-6 shadow-[0_40px_100px_-50px_rgba(6,13,32,0.95)] sm:p-8';

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      {/* ============== LEFT: WIZARD ============== */}
      <div className={formCard}>
        <ProgressHeader step={step} />

        {step === 1 && (
          <form onSubmit={onStep1Submit} className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white">Where should we send your snapshot?</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-white/60">
                One quick step. Property and scope come next — the whole thing takes about two minutes.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel>First name *</FieldLabel>
                <Input name="first_name" required placeholder="Darius" defaultValue={contact.first_name} />
              </div>
              <div>
                <FieldLabel>Last name *</FieldLabel>
                <Input name="last_name" required placeholder="Walton" defaultValue={contact.last_name} />
              </div>
              <div>
                <FieldLabel>Email *</FieldLabel>
                <Input name="email" required type="email" placeholder="you@example.com" defaultValue={contact.email} />
              </div>
              <div>
                <FieldLabel>Phone</FieldLabel>
                <Input name="phone" type="tel" placeholder="(704) 555-1212" defaultValue={contact.phone} />
              </div>
              <div>
                <FieldLabel>Company</FieldLabel>
                <Input name="company_name" placeholder="Optional" defaultValue={contact.company_name} />
              </div>
              <div>
                <FieldLabel>Investor type *</FieldLabel>
                <Select name="investor_type" required defaultValue={contact.investor_type}>
                  {INVESTOR_TYPES.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            {error && <p className="text-sm text-rose-300">{error}</p>}
            <button type="submit" className={primaryBtn}>
              Continue → Property
            </button>
            <p className="text-xs text-white/40">
              Fields marked <span className="font-bold text-orange">*</span> are required. The snapshot is free.
            </p>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={onStep2Submit} className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-white">The property</h2>
                <p className="mt-2 text-[14px] leading-relaxed text-white/60">
                  ZIP sets the regional cost tier. Square footage drives the per-SF range.
                </p>
              </div>
              <button type="button" onClick={() => setStep(1)} className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange hover:text-orange-400">
                ← Back
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <FieldLabel>Property address *</FieldLabel>
                <Input name="property_address" required placeholder="123 Main St" defaultValue={property.property_address} />
              </div>
              <div>
                <FieldLabel>City</FieldLabel>
                <Input name="city" placeholder="Charlotte" defaultValue={property.city} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel>State</FieldLabel>
                  <Input name="state" defaultValue={property.state} />
                </div>
                <div>
                  <FieldLabel>ZIP</FieldLabel>
                  <Input name="zip" placeholder="28205" defaultValue={property.zip} inputMode="numeric" />
                </div>
              </div>
              <div>
                <FieldLabel>Square feet *</FieldLabel>
                <Input name="square_feet" required type="number" min={300} placeholder="1650" defaultValue={property.square_feet} />
              </div>
              <div>
                <FieldLabel>Year built</FieldLabel>
                <Input name="year_built" type="number" placeholder="1968" defaultValue={property.year_built} />
              </div>
              <div className="grid grid-cols-3 gap-3 sm:col-span-2">
                <div>
                  <FieldLabel>Stories</FieldLabel>
                  <Input name="stories" type="number" placeholder="1" defaultValue={property.stories} />
                </div>
                <div>
                  <FieldLabel>Beds</FieldLabel>
                  <Input name="bedrooms" type="number" placeholder="3" defaultValue={property.bedrooms} />
                </div>
                <div>
                  <FieldLabel>Baths</FieldLabel>
                  <Input name="bathrooms" type="number" step="0.5" placeholder="2" defaultValue={property.bathrooms} />
                </div>
              </div>
              <div>
                <FieldLabel>Property type *</FieldLabel>
                <Select name="property_type" required defaultValue={property.property_type}>
                  {PROPERTY_TYPES.map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </Select>
              </div>
              <div>
                <FieldLabel>Occupancy</FieldLabel>
                <Select name="occupancy_status" defaultValue={property.occupancy_status}>
                  {OCCUPANCY.map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </Select>
              </div>
              <div>
                <FieldLabel>Strategy *</FieldLabel>
                <Select name="investment_strategy" required defaultValue={property.investment_strategy}>
                  {STRATEGIES.map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </Select>
              </div>
              <div>
                <FieldLabel>Finish target *</FieldLabel>
                <Select name="target_finish_level" required defaultValue={property.target_finish_level}>
                  {FINISH_LEVELS.map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </Select>
              </div>
            </div>
            {error && <p className="text-sm text-rose-300">{error}</p>}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => setStep(1)} className={`${ghostBtn} sm:w-auto`}>
                ← Back
              </button>
              <button type="submit" className={primaryBtn}>
                Continue → Scope
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={onStep3Submit} className="space-y-7">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-white">Mark the scope</h2>
                <p className="mt-2 text-[14px] leading-relaxed text-white/60">
                  Check what&apos;s likely in play. More detail tightens the range and raises confidence.
                </p>
              </div>
              <button type="button" onClick={() => setStep(2)} className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange hover:text-orange-400">
                ← Back
              </button>
            </div>

            {SCOPE_GROUPS.map((group) => (
              <fieldset key={group.title} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <legend className="px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-orange">{group.title}</legend>
                <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
                  {group.items.map(([name, label]) => (
                    <label key={name} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white/85 transition-colors hover:border-orange/30 hover:bg-orange/[0.04]">
                      <input type="checkbox" name={name} value="true" className="h-4 w-4 rounded border-white/25 bg-transparent text-orange focus:ring-orange focus:ring-offset-0" />
                      <span>{label}</span>
                    </label>
                  ))}
                  {group.title === 'Kitchen & bath' && (
                    <>
                      <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3.5 py-2">
                        <FieldLabel>Bathroom refreshes</FieldLabel>
                        <Input name="bathroom_refresh_count" type="number" min={0} defaultValue={0} className="py-2" />
                      </div>
                      <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3.5 py-2">
                        <FieldLabel>Full bathrooms</FieldLabel>
                        <Input name="bathroom_full_count" type="number" min={0} defaultValue={0} className="py-2" />
                      </div>
                    </>
                  )}
                </div>
              </fieldset>
            ))}

            <div className="space-y-4">
              <div>
                <FieldLabel>Notes (what you already know)</FieldLabel>
                <textarea
                  name="notes"
                  rows={4}
                  placeholder="e.g. 1960s brick ranch, full kitchen, two baths, older panel, possible roof soon, water stains in rear bedroom, aiming for mid-grade flip."
                  className={inputClass}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel>Project photos</FieldLabel>
                  <Input name="project_photos" type="file" accept="image/*,.pdf" multiple className="file:mr-3 file:rounded-full file:border-0 file:bg-orange file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white" />
                </div>
                <div>
                  <FieldLabel>Inspection / budget file</FieldLabel>
                  <Input name="existing_budget_file" type="file" accept=".pdf,.xlsx,.xls,.csv,.doc,.docx,image/*" className="file:mr-3 file:rounded-full file:border-0 file:bg-white/15 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white" />
                </div>
              </div>
            </div>

            {error && <p className="text-sm text-rose-300">{error}</p>}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => setStep(2)} className={`${ghostBtn} sm:w-auto`}>
                ← Back
              </button>
              <button type="submit" disabled={state === 'loading'} className={primaryBtn}>
                {state === 'loading' ? 'Building your snapshot…' : 'Get my rehab snapshot →'}
              </button>
            </div>
            <p className="text-xs leading-relaxed text-white/40">
              Preliminary feasibility estimate — not a quote, bid, or guaranteed price. Final pricing requires scope validation and a formal agreement.
            </p>
          </form>
        )}
      </div>

      {/* ============== RIGHT: RESULT / VALUE ============== */}
      <div className="lg:sticky lg:top-6">
        {result ? (
          <ResultPanel result={result} />
        ) : (
          <ValuePanel contact={contact} property={property} step={step} />
        )}
      </div>
    </div>
  );
}

function ValuePanel({ contact, property, step }: { contact: ContactInfo; property: PropertyInfo; step: WizardStep }) {
  return (
    <div className="space-y-5">
      <div className="rounded-[28px] border border-[#e8ddcd] bg-white p-6 shadow-[0_30px_80px_-50px_rgba(19,36,82,0.5)] sm:p-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">What you get</p>
        <h3 className="mt-2 text-2xl font-extrabold text-navy-900">An underwriting read before execution eats the deal</h3>
        <div className="mt-5 grid gap-2.5">
          {[
            'Market-adjusted budget range + cost per square foot',
            'Confidence score based on intake completeness',
            'Likely project category + execution timeline',
            'Execution risk flags that move budget and schedule',
            'A clear recommended next step',
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm font-medium text-stone-700">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange/15 text-[12px] font-black text-orange">✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {(step > 1 || contact.first_name) && (
        <div className="rounded-[28px] border border-white/10 bg-[#0a142b] p-6 text-white sm:p-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">In progress</p>
          <div className="mt-3 space-y-1.5 text-sm text-white/80">
            {contact.first_name && (
              <p><span className="text-white/45">For:</span> {contact.first_name} {contact.last_name} · {investorTypeLabel(contact.investor_type)}</p>
            )}
            {property.property_address && (
              <p><span className="text-white/45">Property:</span> {property.property_address}{property.city ? `, ${property.city}` : ''} {property.state}</p>
            )}
            {property.square_feet && (
              <p><span className="text-white/45">Size:</span> {Number(property.square_feet).toLocaleString()} sq ft</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ResultPanel({ result }: { result: ResultState }) {
  const confidence = Math.max(0, Math.min(100, result.confidenceScore));
  const confidenceColor =
    confidence >= 80 ? 'bg-emerald-400' : confidence >= 55 ? 'bg-amber-400' : 'bg-rose-400';

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0a142b] text-white shadow-[0_40px_100px_-50px_rgba(6,13,32,0.95)]">
        {/* Hero budget */}
        <div className="border-b border-white/10 bg-gradient-to-br from-orange/[0.14] to-transparent p-6 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">Preliminary budget range</p>
            {result.marketTier && (
              <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white/70">
                {result.marketTier.label}{result.marketTier.tier?.length === 1 ? ` · Tier ${result.marketTier.tier}` : ''}
              </span>
            )}
          </div>
          <p className="mt-3 text-[2.1rem] font-black leading-none tracking-tight sm:text-[2.6rem]">
            {currency(result.budgetRange.low)} – {currency(result.budgetRange.high)}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-white/65">
            {result.costPerSf && result.costPerSf.high > 0 && (
              <span>{currency(result.costPerSf.low)}–{currency(result.costPerSf.high)} / sq ft</span>
            )}
            <span>Likely: {result.projectCategory}</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-5 p-6 sm:p-7">
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
              <span>Confidence</span>
              <span className="text-white/80">{result.confidenceLevel.toUpperCase()} · {confidence}/100</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div className={`h-full rounded-full ${confidenceColor}`} style={{ width: `${confidence}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Metric label="Timeline" value={`${result.timelineRange.lowWeeks}–${result.timelineRange.highWeeks} wks`} />
            <Metric label="High-risk scenario" value={currency(result.highRiskBudget)} />
            <Metric label="Execution" value={cap(result.executionDifficulty)} />
            <Metric label="Permit" value={cap(result.permitComplexity)} />
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">Execution read</p>
            <p className="mt-2 text-sm leading-7 text-white/78">{result.executionSummary}</p>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">Risk flags</p>
            <div className="mt-2.5 space-y-2">
              {result.riskFlags.length ? (
                result.riskFlags.map((flag) => (
                  <div key={flag} className="rounded-xl border border-orange/20 bg-orange/[0.07] px-4 py-2.5 text-[13px] leading-6 text-white/85">
                    {flag}
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[13px] leading-6 text-white/70">
                  No major execution flags surfaced beyond normal rehab variance from this intake.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.07] p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-200">Recommended next step</p>
            <p className="mt-2 text-[13.5px] leading-7 text-white/85">{result.recommendedNextStep}</p>
            <Link
              href="/book"
              className="mt-4 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 text-[13px] font-black uppercase tracking-[0.06em] text-white transition hover:-translate-y-0.5 hover:bg-orange-500"
            >
              Book an execution review →
            </Link>
          </div>

          <p className="text-[11.5px] leading-relaxed text-white/40">
            {result.emailStatus === 'sent'
              ? 'A branded PDF copy has been emailed to you.'
              : 'Your snapshot was saved. A team member will follow up; email delivery depends on provider configuration.'}
          </p>
        </div>
      </div>

      <details className="rounded-[24px] border border-stone-200 bg-white p-5 text-sm text-stone-600 shadow-[0_24px_60px_-45px_rgba(19,36,82,0.45)]">
        <summary className="cursor-pointer text-[12px] font-bold uppercase tracking-[0.16em] text-orange">Assumptions & what could change the number</summary>
        <div className="mt-4 space-y-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone-400">Assumptions used</p>
            <ul className="mt-2 space-y-1.5 text-[13.5px] leading-6">
              {result.assumptions.map((a) => <li key={a} className="flex gap-2"><span className="text-orange">·</span>{a}</li>)}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone-400">What could change this number</p>
            <ul className="mt-2 space-y-1.5 text-[13.5px] leading-6">
              {result.whatCouldChangeThisNumber.map((a) => <li key={a} className="flex gap-2"><span className="text-orange">·</span>{a}</li>)}
            </ul>
          </div>
        </div>
      </details>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
      <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/45">{label}</p>
      <p className="mt-1.5 text-lg font-extrabold text-white">{value}</p>
    </div>
  );
}

function cap(value: string) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}
