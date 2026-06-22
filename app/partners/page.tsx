'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

const TRADES = [
  'General / Framing',
  'Roofing',
  'Siding / Exterior',
  'Windows & Doors',
  'Drywall / Painting',
  'Flooring',
  'Tile / Stone',
  'Kitchen & Bath / Cabinetry',
  'Electrical',
  'Plumbing',
  'Mechanical / HVAC',
  'Foundation / Concrete',
  'Masonry',
  'Insulation / Weatherization',
  'Demolition',
  'Landscape / Site',
  'Cleaning / Turnover',
  'Other',
];

const PROJECT_TYPES = [
  'Residential renovation',
  'Ground-up residential',
  'Additions',
  'Historic / older-home work',
  'Multi-unit / small residential',
  'Turnover / rent-ready',
  'Commercial / light commercial',
];

const inputCls =
  'w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-[14.5px] text-ink placeholder:text-stone-400 focus:border-orange/60 transition-colors';

const labelCls = 'mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-navy/60';

type FormState = {
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  sms_consent: boolean;
  website: string;
  trade: string;
  years_in_business: string;
  service_area: string;
  crew_size: string;
  license_type: string;
  license_number: string;
  license_state: string;
  insurance_carrier: string;
  insurance_limits: string;
  workers_comp: string;
  referral_source: string;
  project_samples: string;
  project_types: string[];
  rate_notes: string;
  references_text: string;
  availability: string;
  notes: string;
  agreed_to_standards: boolean;
};

const initial: FormState = {
  company_name: '',
  contact_name: '',
  email: '',
  phone: '',
  sms_consent: false,
  website: '',
  trade: '',
  years_in_business: '',
  service_area: '',
  crew_size: '',
  license_type: '',
  license_number: '',
  license_state: 'NC',
  insurance_carrier: '',
  insurance_limits: '',
  workers_comp: '',
  referral_source: '',
  project_samples: '',
  project_types: [],
  rate_notes: '',
  references_text: '',
  availability: '',
  notes: '',
  agreed_to_standards: false,
};

export default function PartnersPage() {
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleType = (item: string) =>
    setForm((prev) => ({
      ...prev,
      project_types: prev.project_types.includes(item)
        ? prev.project_types.filter((x) => x !== item)
        : [...prev.project_types, item],
    }));

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/subcontractor-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || 'Unable to submit application.');
      }
      setSubmitted(true);
      setForm(initial);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit application.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <SiteNav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950" />
          <div className="absolute top-1/4 -right-32 w-[520px] h-[520px] rounded-full bg-orange/[0.07] blur-[130px]" />
          <div className="absolute -bottom-32 -left-40 w-[420px] h-[420px] rounded-full bg-blue-500/[0.06] blur-[100px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '42px 42px',
          }}
        />

        <div className="relative z-10 container-pro">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                Recommended Partner Application
              </div>
              <h1 className="mb-6 text-4xl sm:text-5xl lg:text-[64px] font-extrabold tracking-tight text-white leading-[1.05]">
                Apply to become a recommended subcontractor partner.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-white/65">
                Southern Cities is a Charlotte-headquartered NC general contractor (License #107724) running investor rehabs, homeowner renovations, and permit-administration work statewide. We hire a small bench of licensed, insured NC trades for repeat residential work — most rehabs run on a 1 to 3 month schedule. Apply below; our team reviews every application personally.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3.5">
                <button
                  onClick={scrollToForm}
                  className="btn-glow inline-flex items-center justify-center gap-2 rounded-full bg-orange hover:bg-orange-500 px-8 py-4 text-[15px] font-semibold text-white shadow-glow-orange transition-all hover:-translate-y-0.5"
                >
                  Start the Application
                </button>
                <a
                  href="#what-we-look-for"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-8 py-4 text-[15px] font-medium text-white transition-all hover:bg-white/[0.12] hover:-translate-y-0.5"
                >
                  What we look for
                </a>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/45 mb-5">
                Network standards
              </p>
              <div className="space-y-5 text-sm leading-relaxed text-white/75">
                {[
                  { n: '01', t: 'Licensed where required', s: 'Active NC trade or GC license for any scope that requires one.' },
                  { n: '02', t: 'Insured with current COI', s: 'Active GL (minimum $1M), workers comp where applicable.' },
                  { n: '03', t: 'Runs on documentation', s: 'Written scope, written change orders, photo updates at milestones.' },
                  { n: '04', t: 'Respects the cadence', s: 'Shows up on the scheduled day, flags issues early, closes out punch cleanly.' },
                ].map((item) => (
                  <div key={item.n} className="flex gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange/15 border border-orange/30 text-orange flex items-center justify-center text-[11px] font-bold">
                      {item.n}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{item.t}</p>
                      <p className="text-white/55">{item.s}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we look for */}
      <section id="what-we-look-for" className="py-20 sm:py-24">
        <div className="container-pro">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange mb-4">
                <span className="w-6 h-px bg-orange/50" />
                Why we are selective
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-[1.08]">
                We run residential projects on a documented workflow. Our subcontractors do too.
              </h2>
              <p className="mt-5 text-stone-600 leading-relaxed">
                We are not trying to build a directory. We maintain a small working bench of trades who can match our pace, our documentation, and our quality bar on active residential jobs across the Charlotte metro and greater North Carolina.
              </p>
              <p className="mt-4 text-stone-500 leading-relaxed">
                If you run a licensed, insured trade business and want a repeat general contractor relationship instead of chasing new leads every week, the application below is the first step.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                {
                  t: 'Trade licensing where required',
                  s: 'Electrical, plumbing, mechanical, and GC-classification scopes require active NC licensing. We verify licenses on the NCLBGC or NC trade-board public lookups before any job.',
                },
                {
                  t: 'Insurance verified annually',
                  s: 'General liability certificate of insurance and workers comp where statutorily required. We request the COI on file before the first job and reverify each year.',
                },
                {
                  t: 'Documentation-first operators',
                  s: 'Written scope before work starts, written change orders for anything outside scope, progress photos at milestones, and a real invoice at each payment event.',
                },
                {
                  t: 'Clean communication cadence',
                  s: 'Monday schedule check, mid-week progress note, Friday look-ahead. Calls returned same-day. Issues flagged before they become schedule events.',
                },
              ].map((item) => (
                <div
                  key={item.t}
                  className="rounded-2xl border border-stone-200 bg-stone-50 p-6"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-orange/15 text-orange flex items-center justify-center">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-bold text-navy text-[15px] tracking-tight">{item.t}</p>
                      <p className="mt-1 text-[14px] text-stone-600 leading-relaxed">{item.s}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-stone-50 border-y border-stone-200">
        <div className="container-pro">
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange mb-4">
              <span className="w-6 h-px bg-orange/50" />
              Application process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-[1.08]">
              From application to first project
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {[
              { n: '01', t: 'Apply', s: 'Fill out the partner application. We review every submission personally.' },
              { n: '02', t: 'Verification', s: 'We verify license status, insurance on file, and call your references.' },
              { n: '03', t: 'Intro call', s: '20-minute conversation about scope coverage, rate structure, and availability.' },
              { n: '04', t: 'First job', s: 'Paper-trailed first project. If both sides like it, you become a repeat partner.' },
            ].map((step) => (
              <div key={step.n} className="rounded-2xl bg-white border border-stone-200 p-6 shadow-elev-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange to-orange-600 flex items-center justify-center shadow-glow-orange mb-4">
                  <span className="text-[15px] font-extrabold text-white">{step.n}</span>
                </div>
                <h3 className="text-[16px] font-bold text-navy tracking-tight mb-1.5">{step.t}</h3>
                <p className="text-[13.5px] text-stone-500 leading-relaxed">{step.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 sm:py-24 bg-white" ref={formRef}>
        <div className="container-pro max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange mb-4">
              <span className="w-6 h-px bg-orange/50" />
              Partner application
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-[1.08]">
              Tell us about your company and the work you do.
            </h2>
            <p className="mt-4 text-stone-500 leading-relaxed">
              Every field helps us decide whether there is a clean fit. Applications typically receive a response within three business days.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-3xl border border-orange/30 bg-orange/[0.04] p-10 text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-orange/15 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-navy tracking-tight">Application received.</h3>
              <p className="mt-3 text-stone-600 leading-relaxed max-w-xl mx-auto">
                Our team reviews every application personally. Expect a response within three business days from orders@southerncitiesconstruction.com. If we need additional documentation, we will ask for it in the reply.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full bg-orange hover:bg-orange-500 text-white px-6 py-3 text-sm font-semibold shadow-glow-orange transition-colors"
                >
                  Back to Services
                </Link>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center justify-center rounded-full border border-navy/15 bg-white hover:bg-stone-50 text-navy px-6 py-3 text-sm font-semibold transition-colors"
                >
                  Submit Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-3xl border border-stone-200 bg-stone-50 p-7 sm:p-10 space-y-8">
              {/* Company */}
              <fieldset className="space-y-5">
                <legend className="text-[12px] font-bold uppercase tracking-[0.22em] text-orange mb-1">
                  Company
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Company name *</label>
                    <input required type="text" value={form.company_name} onChange={(e) => update('company_name', e.target.value)} className={inputCls} placeholder="Your company legal name" />
                  </div>
                  <div>
                    <label className={labelCls}>Contact name *</label>
                    <input required type="text" value={form.contact_name} onChange={(e) => update('contact_name', e.target.value)} className={inputCls} placeholder="Primary contact" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Email *</label>
                    <input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputCls} placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputCls} placeholder="(704) 000-0000" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Website or online presence</label>
                    <input type="text" value={form.website} onChange={(e) => update('website', e.target.value)} className={inputCls} placeholder="Website, Google Business, or portfolio link" />
                  </div>
                  <div>
                    <label className={labelCls}>How did you hear about us?</label>
                    <input type="text" value={form.referral_source} onChange={(e) => update('referral_source', e.target.value)} className={inputCls} placeholder="Referral, search, past project, etc." />
                  </div>
                </div>
              </fieldset>

              <div className="h-px bg-stone-200" />

              {/* Trade */}
              <fieldset className="space-y-5">
                <legend className="text-[12px] font-bold uppercase tracking-[0.22em] text-orange mb-1">
                  Trade & capacity
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Primary trade *</label>
                    <select required value={form.trade} onChange={(e) => update('trade', e.target.value)} className={`${inputCls} appearance-none cursor-pointer`}>
                      <option value="">Select primary trade</option>
                      {TRADES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Years in business</label>
                    <select value={form.years_in_business} onChange={(e) => update('years_in_business', e.target.value)} className={`${inputCls} appearance-none cursor-pointer`}>
                      <option value="">Select</option>
                      <option value="Under 1 year">Under 1 year</option>
                      <option value="1-3 years">1–3 years</option>
                      <option value="3-5 years">3–5 years</option>
                      <option value="5-10 years">5–10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Service area in NC</label>
                    <input type="text" value={form.service_area} onChange={(e) => update('service_area', e.target.value)} className={inputCls} placeholder="Charlotte metro, greater Mecklenburg, etc." />
                  </div>
                  <div>
                    <label className={labelCls}>Crew size</label>
                    <select value={form.crew_size} onChange={(e) => update('crew_size', e.target.value)} className={`${inputCls} appearance-none cursor-pointer`}>
                      <option value="">Select</option>
                      <option value="Solo operator">Solo operator</option>
                      <option value="2-3">2–3</option>
                      <option value="4-6">4–6</option>
                      <option value="7-10">7–10</option>
                      <option value="10+">10+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Project types you cover</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PROJECT_TYPES.map((type) => {
                      const active = form.project_types.includes(type);
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => toggleType(type)}
                          className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left text-[13.5px] transition-all ${
                            active
                              ? 'border-orange bg-orange/[0.08] text-navy'
                              : 'border-stone-200 bg-white text-stone-600 hover:border-navy/20'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              active ? 'border-orange bg-orange' : 'border-navy/25 bg-white'
                            }`}
                          >
                            {active && (
                              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </span>
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </fieldset>

              <div className="h-px bg-stone-200" />

              {/* License & insurance */}
              <fieldset className="space-y-5">
                <legend className="text-[12px] font-bold uppercase tracking-[0.22em] text-orange mb-1">
                  License & insurance
                </legend>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className={labelCls}>License type</label>
                    <input type="text" value={form.license_type} onChange={(e) => update('license_type', e.target.value)} className={inputCls} placeholder="GC, Electrical, Plumbing, HVAC, N/A" />
                  </div>
                  <div>
                    <label className={labelCls}>License number</label>
                    <input type="text" value={form.license_number} onChange={(e) => update('license_number', e.target.value)} className={inputCls} placeholder="If applicable" />
                  </div>
                  <div>
                    <label className={labelCls}>License state</label>
                    <input type="text" value={form.license_state} onChange={(e) => update('license_state', e.target.value)} className={inputCls} placeholder="NC" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>General liability carrier</label>
                    <input type="text" value={form.insurance_carrier} onChange={(e) => update('insurance_carrier', e.target.value)} className={inputCls} placeholder="Carrier name" />
                  </div>
                  <div>
                    <label className={labelCls}>GL limits</label>
                    <input type="text" value={form.insurance_limits} onChange={(e) => update('insurance_limits', e.target.value)} className={inputCls} placeholder="$1M / $2M, etc." />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Workers compensation status</label>
                  <select value={form.workers_comp} onChange={(e) => update('workers_comp', e.target.value)} className={`${inputCls} appearance-none cursor-pointer`}>
                    <option value="">Select</option>
                    <option value="Active with carrier">Active with carrier</option>
                    <option value="Owner exempt (sole operator)">Owner exempt (sole operator)</option>
                    <option value="Not required by scope">Not required by scope</option>
                    <option value="Not currently carried">Not currently carried</option>
                  </select>
                </div>
              </fieldset>

              <div className="h-px bg-stone-200" />

              {/* Work */}
              <fieldset className="space-y-5">
                <legend className="text-[12px] font-bold uppercase tracking-[0.22em] text-orange mb-1">
                  Work history & references
                </legend>
                <div>
                  <label className={labelCls}>Project samples or portfolio links</label>
                  <textarea rows={3} value={form.project_samples} onChange={(e) => update('project_samples', e.target.value)} className={`${inputCls} resize-none`} placeholder="Links to recent project photos, Google Drive folders, Instagram, or short description of three recent jobs." />
                </div>
                <div>
                  <label className={labelCls}>References (two minimum — GC, builder, or repeat client)</label>
                  <textarea rows={4} value={form.references_text} onChange={(e) => update('references_text', e.target.value)} className={`${inputCls} resize-none`} placeholder="Reference 1 — name, company, phone, email. Reference 2 — name, company, phone, email." />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Availability</label>
                    <select value={form.availability} onChange={(e) => update('availability', e.target.value)} className={`${inputCls} appearance-none cursor-pointer`}>
                      <option value="">Select</option>
                      <option value="Immediate / can start within 1 week">Immediate / can start within 1 week</option>
                      <option value="Within 2-4 weeks">Within 2–4 weeks</option>
                      <option value="Booked but open for future work">Booked but open for future work</option>
                      <option value="Overflow / occasional only">Overflow / occasional only</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Rate structure</label>
                    <input type="text" value={form.rate_notes} onChange={(e) => update('rate_notes', e.target.value)} className={inputCls} placeholder="Hourly, per-unit, bid-per-scope, etc." />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Anything else we should know</label>
                  <textarea rows={3} value={form.notes} onChange={(e) => update('notes', e.target.value)} className={`${inputCls} resize-none`} placeholder="Specialty work, capacity notes, restrictions, or what you are looking for in a GC relationship." />
                </div>
              </fieldset>

              {/* Standards acknowledgement */}
              <div className="rounded-2xl border border-orange/25 bg-orange/[0.04] p-5 sm:p-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <span
                    className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      form.agreed_to_standards ? 'border-orange bg-orange' : 'border-navy/30 bg-white'
                    }`}
                    onClick={() => update('agreed_to_standards', !form.agreed_to_standards)}
                  >
                    {form.agreed_to_standards && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <input
                    type="checkbox"
                    checked={form.agreed_to_standards}
                    onChange={(e) => update('agreed_to_standards', e.target.checked)}
                    className="sr-only"
                    aria-label="Agree to partner standards"
                  />
                  <span className="text-[13.5px] text-stone-700 leading-relaxed">
                    I understand the Southern Cities partner standard: active license where required, current certificate of insurance on file, written scope and change orders, photo documentation at milestones, and consistent communication cadence on every job we accept. *
                  </span>
                </label>
              </div>

              {/* SMS consent */}
              <label className="flex items-start gap-3 cursor-pointer px-1">
                <input
                  type="checkbox"
                  checked={form.sms_consent}
                  onChange={(e) => update('sms_consent', e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-stone-300 text-orange focus:ring-orange"
                />
                <span className="text-[12.5px] text-stone-600 leading-relaxed">
                  I agree to receive calls and texts from Southern Cities Construction about my application and partner
                  coordination. Msg &amp; data rates may apply. Message frequency varies. Reply STOP to opt out, HELP for help.
                  Consent is not a condition of approval. See our{' '}
                  <a href="/terms" className="underline hover:text-orange">Terms</a> and{' '}
                  <a href="/privacy" className="underline hover:text-orange">Privacy Policy</a>.
                </span>
              </label>

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-glow w-full rounded-full bg-orange hover:bg-orange-500 disabled:opacity-60 text-white px-8 py-4 text-[15px] font-semibold shadow-glow-orange transition-all duration-300"
              >
                {submitting ? 'Submitting Application...' : 'Submit Partner Application'}
              </button>
              <p className="text-center text-[12px] text-stone-400 leading-relaxed">
                Applications are reviewed by our team. By submitting, you consent to license verification and reference outreach.
              </p>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
