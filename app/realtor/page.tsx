'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

const SCOPE_OPTIONS = [
  'Kitchen refresh',
  'Bathroom update',
  'Paint (interior)',
  'Paint (exterior)',
  'Flooring',
  'Curb appeal / landscaping',
  'Other',
];

const BUDGET_OPTIONS = [
  'Under $5K',
  '$5K–$10K',
  '$10K–$15K',
  '$15K+',
];

type ServiceType = 'pre_listing' | 'inspection_response' | null;

interface PreListingForm {
  realtor_name: string;
  email: string;
  phone: string;
  brokerage: string;
  property_address: string;
  listing_date: string;
  scope_items: string[];
  budget_range: string;
  notes: string;
}

interface InspectionForm {
  realtor_name: string;
  email: string;
  phone: string;
  brokerage: string;
  property_address: string;
  client_name: string;
  closing_date: string;
  inspection_items: string;
  priority: string;
}

const inputCls =
  'w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-orange/60 transition-colors';

function CheckCircle({ className = 'w-6 h-6 text-green-600' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function RealtorPage() {
  const [selected, setSelected] = useState<ServiceType>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<ServiceType>(null);
  const [error, setError] = useState('');

  const formRef = useRef<HTMLDivElement>(null);

  const [preForm, setPreForm] = useState<PreListingForm>({
    realtor_name: '',
    email: '',
    phone: '',
    brokerage: '',
    property_address: '',
    listing_date: '',
    scope_items: [],
    budget_range: '',
    notes: '',
  });

  const [inspForm, setInspForm] = useState<InspectionForm>({
    realtor_name: '',
    email: '',
    phone: '',
    brokerage: '',
    property_address: '',
    client_name: '',
    closing_date: '',
    inspection_items: '',
    priority: 'standard',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const service = params.get('service');
      if (service === 'pre_listing') setSelected('pre_listing');
      else if (service === 'inspection_response') setSelected('inspection_response');
    }
  }, []);

  useEffect(() => {
    if (selected && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [selected]);

  const toggleScope = (item: string) => {
    setPreForm((prev) => ({
      ...prev,
      scope_items: prev.scope_items.includes(item)
        ? prev.scope_items.filter((s) => s !== item)
        : [...prev.scope_items, item],
    }));
  };

  const handleSelectService = (type: ServiceType) => {
    if (selected === type) {
      setSelected(null);
    } else {
      setSelected(type);
      setSubmitted(null);
      setError('');
    }
  };

  const handlePreSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/realtor-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service_type: 'pre_listing', ...preForm }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || 'Something went wrong. Please try again.');
      } else {
        setSubmitted('pre_listing');
        setSelected(null);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInspSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/realtor-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service_type: 'inspection_response', ...inspForm }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || 'Something went wrong. Please try again.');
      } else {
        setSubmitted('inspection_response');
        setSelected(null);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50">
      <SiteNav variant="transparent" />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24 bg-navy-900">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '36px 36px' }}
        />
        <div className="absolute top-1/4 right-0 w-[32rem] h-[32rem] rounded-full bg-orange/[0.08] blur-[140px]" />
        <div className="relative container-pro text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-[13px] font-medium text-white/75">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
            Licensed General Contractor · Serving North Carolina
          </div>
          <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
            Realtor services
            <br />
            <span className="gradient-text">built to keep deals moving</span>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-white/65">
            Use Southern Cities Construction when listing prep, inspection items, or renovation scope is threatening price, timeline, or close probability.
          </p>
        </div>
      </section>

      {/* Service Selector + Forms */}
      <section className="container-pro py-16 sm:py-20">
        {/* Success banners */}
        {submitted === 'pre_listing' && (
          <div className="mb-10 rounded-2xl border border-green-200 bg-green-50 p-6 flex items-start gap-4 shadow-elev-1">
            <CheckCircle />
            <div>
              <p className="font-bold text-green-800">Pre-Listing request received.</p>
              <p className="mt-1 text-sm leading-relaxed text-green-700">
                We&apos;ll review your request and reach out within 24 hours to schedule a walkthrough and provide a detailed estimate.
              </p>
            </div>
          </div>
        )}
        {submitted === 'inspection_response' && (
          <div className="mb-10 rounded-2xl border border-green-200 bg-green-50 p-6 flex items-start gap-4 shadow-elev-1">
            <CheckCircle />
            <div>
              <p className="font-bold text-green-800">Inspection Response request received.</p>
              <p className="mt-1 text-sm leading-relaxed text-green-700">
                Our team has been notified. Please email your inspection report to{' '}
                <strong>info@southerncitiesconstruction.com</strong> with subject{' '}
                <strong>Inspection Response - [address]</strong> and we&apos;ll follow up promptly.
              </p>
            </div>
          </div>
        )}

        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="eyebrow">Select a service</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
            What do you need?
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Choose the service that matches the deal problem, then submit details so we can evaluate the fastest next step.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2" ref={formRef}>
          {/* Card A: Pre-Listing */}
          <div
            className={`rounded-3xl overflow-hidden border transition-all duration-300 ${
              selected === 'pre_listing'
                ? 'border-orange/70 shadow-elev-3'
                : 'border-navy/[0.1] shadow-elev-1 hover:shadow-elev-2'
            } bg-navy-900`}
          >
            <button
              onClick={() => handleSelectService('pre_listing')}
              className="w-full text-left p-7 transition-colors hover:bg-white/[0.02]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange shadow-glow-orange">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15v-6H9v6H3.75A.75.75 0 013 21V9.75z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[17px] text-white">Pre-Listing Renovation</p>
                    <p className="mt-1 text-sm text-white/60">
                      Use this when the house needs work before photos, showings, or list-date launch.
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {[
                        'Paint, flooring, kitchen & bath updates',
                        'Fast turnaround to meet your listing date',
                        'Detailed written estimate within 48 hours',
                        'No upfront cost — bill-at-closing available',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-white/55">
                          <svg className="w-3.5 h-3.5 text-orange shrink-0 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <span
                  className="shrink-0 text-2xl font-light text-orange transition-transform duration-300"
                  style={{ transform: selected === 'pre_listing' ? 'rotate(45deg)' : 'none' }}
                >
                  +
                </span>
              </div>
            </button>

            {selected === 'pre_listing' && (
              <div className="border-t border-white/10 bg-white px-7 py-7">
                <form onSubmit={handlePreSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">Realtor name *</label>
                      <input required type="text" value={preForm.realtor_name} onChange={(e) => setPreForm({ ...preForm, realtor_name: e.target.value })} placeholder="Jane Smith" className={inputCls} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">Email *</label>
                      <input required type="email" value={preForm.email} onChange={(e) => setPreForm({ ...preForm, email: e.target.value })} placeholder="jane@brokerage.com" className={inputCls} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">Phone</label>
                      <input type="tel" value={preForm.phone} onChange={(e) => setPreForm({ ...preForm, phone: e.target.value })} placeholder="(704) 555-0100" className={inputCls} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">Brokerage</label>
                      <input type="text" value={preForm.brokerage} onChange={(e) => setPreForm({ ...preForm, brokerage: e.target.value })} placeholder="Keller Williams, EXP, etc." className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">Property address</label>
                    <input type="text" value={preForm.property_address} onChange={(e) => setPreForm({ ...preForm, property_address: e.target.value })} placeholder="123 Main St, Charlotte, NC 28202" className={inputCls} />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">Target listing date</label>
                    <input type="date" value={preForm.listing_date} onChange={(e) => setPreForm({ ...preForm, listing_date: e.target.value })} className={inputCls} />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">Scope of work needed</label>
                    <div className="grid grid-cols-2 gap-2">
                      {SCOPE_OPTIONS.map((item) => {
                        const active = preForm.scope_items.includes(item);
                        return (
                          <label key={item} className="flex items-center gap-2.5 cursor-pointer group" onClick={() => toggleScope(item)}>
                            <div
                              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                active ? 'border-orange bg-orange' : 'border-navy/25 bg-white'
                              }`}
                            >
                              {active && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className="text-sm text-ink/75 group-hover:text-ink transition-colors select-none">{item}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">Estimated budget range</label>
                    <select value={preForm.budget_range} onChange={(e) => setPreForm({ ...preForm, budget_range: e.target.value })} className={`${inputCls} appearance-none`}>
                      <option value="">Select a range…</option>
                      {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">Additional notes</label>
                    <textarea value={preForm.notes} onChange={(e) => setPreForm({ ...preForm, notes: e.target.value })} rows={3} placeholder="Any other details about the property or work needed…" className={`${inputCls} resize-none`} />
                  </div>

                  {error && <p className="text-red-600 text-sm">{error}</p>}

                  <button type="submit" disabled={submitting} className="w-full rounded-full bg-navy-900 hover:bg-navy px-5 py-3.5 text-sm font-semibold text-white transition-colors disabled:opacity-60">
                    {submitting ? 'Submitting…' : 'Submit Pre-Listing Request'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Card B: Inspection Response */}
          <div
            className={`rounded-3xl overflow-hidden border transition-all duration-300 ${
              selected === 'inspection_response'
                ? 'border-orange/70 shadow-elev-3'
                : 'border-navy/[0.1] shadow-elev-1 hover:shadow-elev-2'
            } bg-navy-900`}
          >
            <button
              onClick={() => handleSelectService('inspection_response')}
              className="w-full text-left p-7 transition-colors hover:bg-white/[0.02]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange shadow-glow-orange">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[17px] text-white">Inspection Response</p>
                    <p className="mt-1 text-sm text-white/60">
                      Address inspection items before closing.
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {[
                        'Structural, electrical, plumbing & more',
                        'Prioritized repair list with pricing',
                        'Work completed before your closing date',
                        'Licensed, insured — lender-approvable',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-white/55">
                          <svg className="w-3.5 h-3.5 text-orange shrink-0 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <span
                  className="shrink-0 text-2xl font-light text-orange transition-transform duration-300"
                  style={{ transform: selected === 'inspection_response' ? 'rotate(45deg)' : 'none' }}
                >
                  +
                </span>
              </div>
            </button>

            {selected === 'inspection_response' && (
              <div className="border-t border-white/10 bg-white px-7 py-7">
                <form onSubmit={handleInspSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">Realtor name *</label>
                      <input required type="text" value={inspForm.realtor_name} onChange={(e) => setInspForm({ ...inspForm, realtor_name: e.target.value })} placeholder="Jane Smith" className={inputCls} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">Email *</label>
                      <input required type="email" value={inspForm.email} onChange={(e) => setInspForm({ ...inspForm, email: e.target.value })} placeholder="jane@brokerage.com" className={inputCls} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">Phone</label>
                      <input type="tel" value={inspForm.phone} onChange={(e) => setInspForm({ ...inspForm, phone: e.target.value })} placeholder="(704) 555-0100" className={inputCls} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">Brokerage</label>
                      <input type="text" value={inspForm.brokerage} onChange={(e) => setInspForm({ ...inspForm, brokerage: e.target.value })} placeholder="Keller Williams, EXP, etc." className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">Property address</label>
                    <input type="text" value={inspForm.property_address} onChange={(e) => setInspForm({ ...inspForm, property_address: e.target.value })} placeholder="123 Main St, Charlotte, NC 28202" className={inputCls} />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">Buyer / client name</label>
                    <input type="text" value={inspForm.client_name} onChange={(e) => setInspForm({ ...inspForm, client_name: e.target.value })} placeholder="Buyer's name" className={inputCls} />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">
                      Closing date <span className="normal-case tracking-normal font-normal text-red-500">(urgent!)</span>
                    </label>
                    <input type="date" value={inspForm.closing_date} onChange={(e) => setInspForm({ ...inspForm, closing_date: e.target.value })} className={inputCls} />
                  </div>

                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm">
                    <p className="font-semibold text-blue-900">Inspection Report PDF</p>
                    <p className="mt-1 text-blue-800 leading-relaxed">
                      Email inspection report to{' '}
                      <a href="mailto:info@southerncitiesconstruction.com" className="font-semibold underline">
                        info@southerncitiesconstruction.com
                      </a>{' '}
                      with subject:{' '}
                      <span className="font-mono bg-blue-100 px-1.5 py-0.5 rounded text-[12px]">
                        Inspection Response - {inspForm.property_address || '[address]'}
                      </span>
                    </p>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">Inspection items to address</label>
                    <textarea value={inspForm.inspection_items} onChange={(e) => setInspForm({ ...inspForm, inspection_items: e.target.value })} rows={5} placeholder="Paste the inspection items here (from your report or agreed repairs list)…" className={`${inputCls} resize-none`} />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">Priority level</label>
                    <div className="space-y-2">
                      {[
                        { value: 'standard', label: 'Standard', sub: '48hr response' },
                        { value: 'urgent', label: 'Urgent', sub: 'Closing within 7 days' },
                        { value: 'emergency', label: 'Emergency', sub: 'Closing within 3 days' },
                      ].map((opt) => {
                        const active = inspForm.priority === opt.value;
                        return (
                          <label
                            key={opt.value}
                            onClick={() => setInspForm({ ...inspForm, priority: opt.value })}
                            className={`flex items-center gap-3 cursor-pointer group rounded-xl border p-3.5 transition-all ${
                              active ? 'border-orange bg-orange/5' : 'border-navy/12 hover:border-navy/25'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                active ? 'border-orange bg-orange' : 'border-navy/25 bg-white'
                              }`}
                            >
                              {active && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <div className="select-none">
                              <span className="font-semibold text-sm text-navy-900">{opt.label}</span>
                              <span className="text-ink/55 text-sm ml-2">— {opt.sub}</span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {error && <p className="text-red-600 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full rounded-full px-5 py-3.5 text-sm font-semibold text-white transition-colors disabled:opacity-60 ${
                      inspForm.priority !== 'standard'
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-navy-900 hover:bg-navy'
                    }`}
                  >
                    {submitting ? 'Submitting…' : inspForm.priority !== 'standard' ? 'Submit Urgent Request' : 'Submit Inspection Request'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Helper strip */}
        <div className="mt-16 rounded-3xl border border-navy/[0.08] bg-white p-8 sm:p-10 shadow-elev-1">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="eyebrow">Not sure which to choose?</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-navy-900">
                We&apos;ll help you route the deal correctly.
              </h3>
              <p className="mt-3 text-ink/65 leading-relaxed max-w-xl">
                Email our team or submit a direct request. If urgency is high, note the closing date and we&apos;ll prioritize the response.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <a
                href="mailto:info@southerncitiesconstruction.com"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange hover:bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-glow-orange transition-colors"
              >
                Email the team
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/15 bg-white hover:bg-stone-50 px-5 py-3 text-sm font-semibold text-navy-900 transition-colors"
              >
                Request a quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
