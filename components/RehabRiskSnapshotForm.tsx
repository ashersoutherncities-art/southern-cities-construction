'use client';

import { useState } from 'react';

type ResultState = {
  budgetRange: { low: number; high: number };
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

const SCOPE_CHECKS = [
  ['cosmetic_paint', 'Paint reset'],
  ['flooring', 'Flooring replacement'],
  ['kitchen_refresh', 'Kitchen refresh'],
  ['kitchen_full', 'Full kitchen'],
  ['roof', 'Roof'],
  ['hvac', 'HVAC'],
  ['plumbing_partial', 'Partial plumbing'],
  ['plumbing_full', 'Full plumbing'],
  ['electrical_partial', 'Partial electrical'],
  ['electrical_full', 'Full electrical'],
  ['windows', 'Windows'],
  ['siding', 'Siding / cladding'],
  ['drywall', 'Drywall'],
  ['framing', 'Framing'],
  ['structural', 'Structural work'],
  ['foundation', 'Foundation'],
  ['addition', 'Addition'],
  ['layout_changes', 'Layout changes'],
  ['full_gut', 'Full gut'],
  ['fire_damage', 'Fire damage'],
  ['water_damage', 'Water damage'],
  ['mold_concern', 'Mold concern'],
  ['termite_concern', 'Termite concern'],
  ['exterior_work', 'Exterior work'],
  ['landscaping', 'Landscaping'],
  ['driveway', 'Driveway / hardscape'],
  ['permit_required_unknown', 'Permit path unknown'],
];

function currency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">{children}</label>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-white/15 bg-[#0d1830] px-4 py-3 text-[15px] text-white placeholder:text-white/35 transition-colors focus:border-orange/60 focus:outline-none focus:ring-2 focus:ring-orange/20 ${props.className || ''}`}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-2xl border border-white/15 bg-[#0d1830] px-4 py-3 text-[15px] text-white transition-colors focus:border-orange/60 focus:outline-none focus:ring-2 focus:ring-orange/20 ${props.className || ''}`}
    />
  );
}

export default function RehabRiskSnapshotForm() {
  const [state, setState] = useState<SubmissionState>('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState<ResultState | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('loading');
    setError('');
    setResult(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    for (const key of SCOPE_CHECKS.map(([name]) => name)) {
      if (!formData.has(key)) {
        formData.set(key, 'false');
      } else {
        formData.set(key, 'true');
      }
    }

    try {
      const response = await fetch('/api/rehab-budget-snapshots', {
        method: 'POST',
        body: formData,
      });

      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        setState('error');
        setError(body.error || 'Submission failed. Please try again.');
        return;
      }

      setResult(body.result || null);
      setState('success');
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch {
      setState('error');
      setError('Network error. Please try again.');
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={onSubmit} className="space-y-8 rounded-[30px] border border-white/12 bg-navy-900/85 p-6 shadow-[0_35px_90px_-40px_rgba(6,13,32,0.95)] backdrop-blur md:p-8">
        <input type="hidden" name="honey" value="" readOnly />

        <section>
          <div className="mb-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Investor intake</p>
            <h3 className="mt-2 text-2xl font-extrabold text-white">Tell us who is underwriting the deal</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>First name *</FieldLabel>
              <Input name="first_name" required placeholder="Darius" />
            </div>
            <div>
              <FieldLabel>Last name *</FieldLabel>
              <Input name="last_name" required placeholder="Walton" />
            </div>
            <div>
              <FieldLabel>Email *</FieldLabel>
              <Input name="email" required type="email" placeholder="you@example.com" />
            </div>
            <div>
              <FieldLabel>Phone *</FieldLabel>
              <Input name="phone" required type="tel" placeholder="(704) 555-1212" />
            </div>
            <div>
              <FieldLabel>Company</FieldLabel>
              <Input name="company_name" placeholder="Southern Cities" />
            </div>
            <div>
              <FieldLabel>Investor type *</FieldLabel>
              <Select name="investor_type" required defaultValue="flipper">
                {INVESTOR_TYPES.map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </Select>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Property profile</p>
            <h3 className="mt-2 text-2xl font-extrabold text-white">Set the underwriting frame</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <FieldLabel>Property address *</FieldLabel>
              <Input name="property_address" required placeholder="123 Main St" />
            </div>
            <div>
              <FieldLabel>City *</FieldLabel>
              <Input name="city" required placeholder="Charlotte" />
            </div>
            <div>
              <FieldLabel>State *</FieldLabel>
              <Input name="state" required defaultValue="NC" />
            </div>
            <div>
              <FieldLabel>ZIP *</FieldLabel>
              <Input name="zip" required placeholder="28205" />
            </div>
            <div>
              <FieldLabel>Square feet *</FieldLabel>
              <Input name="square_feet" required type="number" min={400} placeholder="1650" />
            </div>
            <div>
              <FieldLabel>Year built</FieldLabel>
              <Input name="year_built" type="number" placeholder="1968" />
            </div>
            <div>
              <FieldLabel>Stories</FieldLabel>
              <Input name="stories" type="number" placeholder="1" />
            </div>
            <div>
              <FieldLabel>Bedrooms</FieldLabel>
              <Input name="bedrooms" type="number" placeholder="3" />
            </div>
            <div>
              <FieldLabel>Bathrooms</FieldLabel>
              <Input name="bathrooms" type="number" step="0.5" placeholder="2" />
            </div>
            <div>
              <FieldLabel>Property type *</FieldLabel>
              <Select name="property_type" required defaultValue="single_family">
                {PROPERTY_TYPES.map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </Select>
            </div>
            <div>
              <FieldLabel>Occupancy *</FieldLabel>
              <Select name="occupancy_status" required defaultValue="vacant">
                {OCCUPANCY.map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </Select>
            </div>
            <div>
              <FieldLabel>Strategy *</FieldLabel>
              <Select name="investment_strategy" required defaultValue="flip">
                {STRATEGIES.map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </Select>
            </div>
            <div>
              <FieldLabel>Finish target *</FieldLabel>
              <Select name="target_finish_level" required defaultValue="basic_flip">
                {FINISH_LEVELS.map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </Select>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Scope signals</p>
            <h3 className="mt-2 text-2xl font-extrabold text-white">Mark what is likely in play</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {SCOPE_CHECKS.map(([name, label]) => (
              <label key={name} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/88">
                <input type="checkbox" name={name} value="true" className="h-4 w-4 rounded border-white/20 bg-transparent text-orange focus:ring-orange" />
                <span>{label}</span>
              </label>
            ))}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Bathroom refresh count</FieldLabel>
              <Input name="bathroom_refresh_count" type="number" min={0} defaultValue={0} />
            </div>
            <div>
              <FieldLabel>Bathroom full count</FieldLabel>
              <Input name="bathroom_full_count" type="number" min={0} defaultValue={0} />
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Context that moves the number</p>
            <h3 className="mt-2 text-2xl font-extrabold text-white">Upload context and explain what you know</h3>
          </div>
          <div className="grid gap-4">
            <div>
              <FieldLabel>Project photos</FieldLabel>
              <Input name="project_photos" type="file" accept="image/*,.pdf" multiple className="file:mr-4 file:rounded-full file:border-0 file:bg-orange file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-orange-500" />
            </div>
            <div>
              <FieldLabel>Existing budget / inspection / scope file</FieldLabel>
              <Input name="existing_budget_file" type="file" accept=".pdf,.xlsx,.xls,.csv,.doc,.docx,image/*" className="file:mr-4 file:rounded-full file:border-0 file:bg-white/15 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-white/20" />
            </div>
            <div>
              <FieldLabel>Notes *</FieldLabel>
              <textarea
                name="notes"
                required
                rows={5}
                placeholder="Tell us what you think is going on. Example: 1960s brick ranch, likely full kitchen, two baths, older panel, possible roof soon, water stains in rear bedroom, aiming for mid-grade flip."
                className="w-full rounded-2xl border border-white/15 bg-[#0d1830] px-4 py-3 text-[15px] text-white placeholder:text-white/35 transition-colors focus:border-orange/60 focus:outline-none focus:ring-2 focus:ring-orange/20"
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={state === 'loading'}
          className="inline-flex min-h-[58px] w-full items-center justify-center rounded-full bg-orange px-6 py-4 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_18px_45px_-18px_rgba(250,140,65,0.8)] transition hover:-translate-y-0.5 hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-65"
        >
          {state === 'loading' ? 'Building Snapshot...' : 'Get My Rehab Snapshot'}
        </button>

        {state === 'error' ? <p className="text-sm text-rose-300">{error}</p> : null}

        <p className="text-xs leading-relaxed text-white/48">
          This is a preliminary feasibility estimate. It is not a quote, bid, proposal, or guaranteed price. Final pricing requires scope validation, site conditions review, contractor/vendor pricing, and formal agreement.
        </p>
      </form>

      <div className="space-y-6">
        <div className="rounded-[30px] border border-[#eadfd1] bg-white p-6 shadow-[0_30px_80px_-45px_rgba(19,36,82,0.55)] md:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What you get</p>
          <h3 className="mt-2 text-3xl font-extrabold text-navy-900">A fast underwriting read before execution eats the deal</h3>
          <div className="mt-6 space-y-4 text-[15px] leading-7 text-stone-600">
            <p>Most deals do not fail at purchase. They fail during execution. Budget uncertainty wrecks MAO, financing, timeline, holding cost, profit, and exit strategy.</p>
            <p>This tool does not pretend to be a contractor quote. It classifies the job into the right execution cost bucket, surfaces the risks that can move the number, and gives you a realistic next step.</p>
          </div>
          <div className="mt-6 grid gap-3">
            {[
              'Preliminary budget range for early-stage underwriting',
              'Confidence level based on intake completeness and hidden-condition exposure',
              'Likely project category and execution timeline range',
              'Risk flags that can blow up budget, scope, or schedule',
              'Branded PDF and email delivery for your file and team',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-700">{item}</div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-white/10 bg-[#08111d] p-6 text-white shadow-[0_28px_70px_-40px_rgba(6,13,32,0.95)] md:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Snapshot result</p>
          {result ? (
            <div className="mt-4 space-y-5">
              <div className="rounded-3xl bg-white/[0.04] p-5">
                <p className="text-sm text-white/60">Budget range</p>
                <p className="mt-2 text-4xl font-extrabold text-white">{currency(result.budgetRange.low)} - {currency(result.budgetRange.high)}</p>
                <p className="mt-2 text-sm text-white/60">Likely category: {result.projectCategory}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">Confidence</p>
                  <p className="mt-2 text-2xl font-extrabold">{result.confidenceLevel.toUpperCase()} ({result.confidenceScore}/100)</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">Timeline</p>
                  <p className="mt-2 text-2xl font-extrabold">{result.timelineRange.lowWeeks}-{result.timelineRange.highWeeks} weeks</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">High-risk scenario</p>
                  <p className="mt-2 text-2xl font-extrabold">{currency(result.highRiskBudget)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">Execution / permit</p>
                  <p className="mt-2 text-lg font-extrabold">{result.executionDifficulty} / {result.permitComplexity}</p>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">Execution read</p>
                <p className="mt-2 text-sm leading-7 text-white/78">{result.executionSummary}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">Risk flags</p>
                <div className="mt-3 space-y-2">
                  {result.riskFlags.length ? (
                    result.riskFlags.map((flag) => (
                      <div key={flag} className="rounded-2xl border border-orange/20 bg-orange/[0.08] px-4 py-3 text-sm leading-6 text-white/86">{flag}</div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white/78">
                      No major execution flags were surfaced beyond normal rehab variance from the current intake.
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-200">Recommended next step</p>
                <p className="mt-2 text-sm leading-7 text-white/84">{result.recommendedNextStep}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">Assumptions used</p>
                <div className="mt-3 space-y-2">
                  {result.assumptions.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white/78">{item}</div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">What could change this number</p>
                <div className="mt-3 space-y-2">
                  {result.whatCouldChangeThisNumber.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white/78">{item}</div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-white/48">
                {result.emailStatus === 'sent'
                  ? 'A branded PDF copy has been emailed to you.'
                  : 'The snapshot was saved internally. Email delivery depends on live provider configuration.'}
              </p>
            </div>
          ) : (
            <div className="mt-4 rounded-3xl border border-dashed border-white/12 bg-white/[0.03] p-6">
              <p className="text-sm leading-7 text-white/68">Submit the intake to generate a directional budget range, confidence level, risk flags, likely category, timeline range, and recommended next step.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
