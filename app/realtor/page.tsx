'use client';

import { useState, useRef, useEffect } from 'react';

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

  // Auto-select service from URL query param
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
    <div className="min-h-screen" style={{ background: '#f8f9fb' }}>

      {/* Nav */}
      <nav className="bg-navy px-6 py-4 shadow-lg" style={{ background: '#132452' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/sc-construction-logo.png" alt="Southern Cities Construction" className="h-10 w-auto" />
          </a>
          <div className="flex items-center gap-6">
            <a href="/" className="text-white/70 hover:text-white text-sm transition-colors hidden sm:inline">← Back to Site</a>
            <a
              href="mailto:asher@developthesouth.com"
              className="text-sm font-semibold px-4 py-2 rounded-full text-white transition-opacity hover:opacity-90"
              style={{ background: '#fa8c41' }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28" style={{ background: '#132452' }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '36px 36px' }} />
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-[120px]" style={{ background: 'rgba(250,140,65,0.08)' }} />
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-8 text-sm font-medium border" style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#fa8c41' }} />
            Licensed General Contractor — Serving North Carolina
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-5">
            Realtor Services<br />
            <span style={{ color: '#fa8c41' }}>Get Started</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Pre-Listing Renovations &amp; Inspection Response. Fast turnaround, licensed &amp; insured.
          </p>
        </div>
      </section>

      {/* Service Selector + Forms */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-20">

        {/* Success banners */}
        {submitted === 'pre_listing' && (
          <div className="mb-8 rounded-2xl p-6 border flex items-start gap-4" style={{ background: '#f0fdf4', borderColor: '#86efac' }}>
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-bold text-green-800 mb-1">Pre-Listing Request Received!</p>
              <p className="text-green-700 text-sm">We&apos;ll review your request and reach out within 24 hours to schedule a walkthrough and provide a detailed estimate.</p>
            </div>
          </div>
        )}
        {submitted === 'inspection_response' && (
          <div className="mb-8 rounded-2xl p-6 border flex items-start gap-4" style={{ background: '#f0fdf4', borderColor: '#86efac' }}>
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-bold text-green-800 mb-1">Inspection Response Request Received!</p>
              <p className="text-green-700 text-sm">Our team has been notified. Please email your inspection report to <strong>asher@developthesouth.com</strong> with subject <strong>Inspection Response - [address]</strong> and we&apos;ll follow up promptly.</p>
            </div>
          </div>
        )}

        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: '#132452' }}>
            What Do You Need?
          </h2>
          <p className="text-gray-500">Select a service below to get started. Click a card to expand the form.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-2" ref={formRef}>

          {/* Card A: Pre-Listing */}
          <div className="rounded-2xl overflow-hidden shadow-sm border transition-all duration-200" style={{ borderColor: selected === 'pre_listing' ? '#fa8c41' : 'rgba(255,255,255,0.1)', borderWidth: selected === 'pre_listing' ? '2px' : '1px', backgroundColor: '#132452' }}>
            <button
              onClick={() => handleSelectService('pre_listing')}
              className="w-full text-left p-6 transition-all duration-200 hover:brightness-110"
              style={{ backgroundColor: 'transparent' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#fa8c41' }}>
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15v-6H9v6H3.75A.75.75 0 013 21V9.75z" /></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[16px] text-white">Pre-Listing Renovation</p>
                    <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>Prepare the property before it hits the market</p>
                  </div>
                </div>
                <span className="text-2xl font-light transition-transform duration-200 ml-4 flex-shrink-0" style={{ color: '#fa8c41', transform: selected === 'pre_listing' ? 'rotate(45deg)' : 'none' }}>+</span>
              </div>
            </button>

            {selected === 'pre_listing' && (
              <div className="border-t border-white/10 bg-white px-6 pb-6 pt-4">
                <form onSubmit={handlePreSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: '#132452' }}>Realtor Name *</label>
                      <input
                        required
                        type="text"
                        value={preForm.realtor_name}
                        onChange={(e) => setPreForm({ ...preForm, realtor_name: e.target.value })}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: '#132452' }}>Email *</label>
                      <input
                        required
                        type="email"
                        value={preForm.email}
                        onChange={(e) => setPreForm({ ...preForm, email: e.target.value })}
                        placeholder="jane@brokerage.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: '#132452' }}>Phone</label>
                      <input
                        type="tel"
                        value={preForm.phone}
                        onChange={(e) => setPreForm({ ...preForm, phone: e.target.value })}
                        placeholder="(704) 555-0100"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: '#132452' }}>Brokerage</label>
                      <input
                        type="text"
                        value={preForm.brokerage}
                        onChange={(e) => setPreForm({ ...preForm, brokerage: e.target.value })}
                        placeholder="Keller Williams, EXP, etc."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#132452' }}>Property Address</label>
                    <input
                      type="text"
                      value={preForm.property_address}
                      onChange={(e) => setPreForm({ ...preForm, property_address: e.target.value })}
                      placeholder="123 Main St, Charlotte, NC 28202"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#132452' }}>Target Listing Date</label>
                    <input
                      type="date"
                      value={preForm.listing_date}
                      onChange={(e) => setPreForm({ ...preForm, listing_date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#132452' }}>Scope of Work Needed</label>
                    <div className="grid grid-cols-2 gap-2">
                      {SCOPE_OPTIONS.map((item) => (
                        <label key={item} className="flex items-center gap-2.5 cursor-pointer group">
                          <div
                            onClick={() => toggleScope(item)}
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${
                              preForm.scope_items.includes(item) ? 'border-orange-400' : 'border-gray-300 bg-white'
                            }`}
                            style={preForm.scope_items.includes(item) ? { background: '#fa8c41', borderColor: '#fa8c41' } : {}}
                          >
                            {preForm.scope_items.includes(item) && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors select-none" onClick={() => toggleScope(item)}>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#132452' }}>Estimated Budget Range</label>
                    <select
                      value={preForm.budget_range}
                      onChange={(e) => setPreForm({ ...preForm, budget_range: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white text-sm transition-all appearance-none"
                    >
                      <option value="">Select a range...</option>
                      {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#132452' }}>Additional Notes</label>
                    <textarea
                      value={preForm.notes}
                      onChange={(e) => setPreForm({ ...preForm, notes: e.target.value })}
                      rows={3}
                      placeholder="Any other details about the property or work needed..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white text-sm transition-all resize-none"
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ background: '#132452' }}
                  >
                    {submitting ? 'Submitting...' : 'Submit Pre-Listing Request'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Card B: Inspection Response */}
          <div className="rounded-2xl overflow-hidden shadow-sm border transition-all duration-200" style={{ borderColor: selected === 'inspection_response' ? '#fa8c41' : 'rgba(255,255,255,0.1)', borderWidth: selected === 'inspection_response' ? '2px' : '1px', backgroundColor: '#132452' }}>
            <button
              onClick={() => handleSelectService('inspection_response')}
              className="w-full text-left p-6 transition-all duration-200 hover:brightness-110"
              style={{ backgroundColor: 'transparent' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#fa8c41' }}>
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" /></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[16px] text-white">Inspection Response</p>
                    <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>Address inspection items before closing</p>
                  </div>
                </div>
                <span className="text-2xl font-light transition-transform duration-200 ml-4 flex-shrink-0" style={{ color: '#fa8c41', transform: selected === 'inspection_response' ? 'rotate(45deg)' : 'none' }}>+</span>
              </div>
            </button>

            {selected === 'inspection_response' && (
              <div className="border-t border-white/10 bg-white px-6 pb-6 pt-4">
                <form onSubmit={handleInspSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: '#132452' }}>Realtor Name *</label>
                      <input
                        required
                        type="text"
                        value={inspForm.realtor_name}
                        onChange={(e) => setInspForm({ ...inspForm, realtor_name: e.target.value })}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: '#132452' }}>Email *</label>
                      <input
                        required
                        type="email"
                        value={inspForm.email}
                        onChange={(e) => setInspForm({ ...inspForm, email: e.target.value })}
                        placeholder="jane@brokerage.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: '#132452' }}>Phone</label>
                      <input
                        type="tel"
                        value={inspForm.phone}
                        onChange={(e) => setInspForm({ ...inspForm, phone: e.target.value })}
                        placeholder="(704) 555-0100"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: '#132452' }}>Brokerage</label>
                      <input
                        type="text"
                        value={inspForm.brokerage}
                        onChange={(e) => setInspForm({ ...inspForm, brokerage: e.target.value })}
                        placeholder="Keller Williams, EXP, etc."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#132452' }}>Property Address</label>
                    <input
                      type="text"
                      value={inspForm.property_address}
                      onChange={(e) => setInspForm({ ...inspForm, property_address: e.target.value })}
                      placeholder="123 Main St, Charlotte, NC 28202"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#132452' }}>Buyer / Client Name</label>
                    <input
                      type="text"
                      value={inspForm.client_name}
                      onChange={(e) => setInspForm({ ...inspForm, client_name: e.target.value })}
                      placeholder="Buyer's name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#132452' }}>
                      Closing Date <span className="font-normal text-red-400">(urgent!)</span>
                    </label>
                    <input
                      type="date"
                      value={inspForm.closing_date}
                      onChange={(e) => setInspForm({ ...inspForm, closing_date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white text-sm transition-all"
                    />
                  </div>

                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm">
                    <p className="font-semibold text-blue-800 mb-1">Inspection Report PDF</p>
                    <p className="text-blue-700">
                      Email inspection report to{' '}
                      <a href="mailto:asher@developthesouth.com" className="font-semibold underline">
                        asher@developthesouth.com
                      </a>{' '}
                      with subject:{' '}
                      <span className="font-mono bg-blue-100 px-1 rounded">
                        Inspection Response - {inspForm.property_address || '[address]'}
                      </span>
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#132452' }}>Inspection Items to Address</label>
                    <textarea
                      value={inspForm.inspection_items}
                      onChange={(e) => setInspForm({ ...inspForm, inspection_items: e.target.value })}
                      rows={5}
                      placeholder="Paste the inspection items here (from your report or agreed repairs list)..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white text-sm transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#132452' }}>Priority Level</label>
                    <div className="space-y-2.5">
                      {[
                        { value: 'standard', label: 'Standard', sub: '48hr response' },
                        { value: 'urgent', label: 'Urgent', sub: 'Closing within 7 days' },
                        { value: 'emergency', label: 'Emergency', sub: 'Closing within 3 days' },
                      ].map((opt) => (
                        <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                          <div
                            onClick={() => setInspForm({ ...inspForm, priority: opt.value })}
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 cursor-pointer transition-all ${
                              inspForm.priority === opt.value ? '' : 'border-gray-300 bg-white'
                            }`}
                            style={inspForm.priority === opt.value ? { borderColor: '#fa8c41', background: '#fa8c41' } : {}}
                          >
                            {inspForm.priority === opt.value && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <div onClick={() => setInspForm({ ...inspForm, priority: opt.value })} className="select-none">
                            <span className="font-semibold text-sm" style={{ color: '#132452' }}>{opt.label}</span>
                            <span className="text-gray-400 text-sm ml-2">— {opt.sub}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ background: inspForm.priority !== 'standard' ? '#dc2626' : '#132452' }}
                  >
                    {submitting ? 'Submitting...' : inspForm.priority !== 'standard' ? 'Submit Urgent Request' : 'Submit Inspection Request'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <footer className="border-t border-gray-200 bg-white py-8 px-6 text-center">
        <p className="text-sm text-gray-400">
          Questions? Email us at{' '}
          <a href="mailto:asher@developthesouth.com" className="font-semibold" style={{ color: '#fa8c41' }}>
            asher@developthesouth.com
          </a>
          {' '}— Southern Cities Construction LLC · North Carolina · Fully Licensed & Insured
        </p>
      </footer>
    </div>
  );
}
