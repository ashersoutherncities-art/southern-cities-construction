'use client';

import { useState } from 'react';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { RESOURCES, Resource } from '@/lib/resources';

type RequestState = 'idle' | 'loading' | 'success' | 'error';

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] ${
        light ? 'text-white/55' : 'text-orange'
      }`}
    >
      <span className={`w-6 h-px ${light ? 'bg-white/30' : 'bg-orange/50'}`} />
      {children}
    </span>
  );
}

function ResourceCard({
  resource,
  onRequest,
}: {
  resource: Resource;
  onRequest: (resource: Resource) => void;
}) {
  const isPaid = resource.kind === 'paid';
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-stone-200 bg-white shadow-elev-1 card-hover overflow-hidden">
      <div
        className={`relative px-6 pt-6 pb-5 ${
          isPaid ? 'bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950' : 'bg-stone-50 border-b border-stone-200'
        }`}
      >
        {isPaid && (
          <div className="absolute -top-20 -right-20 w-[240px] h-[240px] rounded-full bg-orange/[0.1] blur-[80px]" />
        )}
        <div className="relative flex items-center justify-between gap-3">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
              isPaid ? 'bg-orange text-white shadow-glow-orange' : 'bg-orange/10 text-orange'
            }`}
          >
            {isPaid ? 'Paid' : 'Free'}
          </span>
          <span className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${isPaid ? 'text-white/55' : 'text-stone-400'}`}>
            {resource.category}
          </span>
        </div>
        <h3 className={`relative mt-5 text-[22px] font-extrabold tracking-tight leading-tight ${isPaid ? 'text-white' : 'text-navy'}`}>
          {resource.title}
        </h3>
        {isPaid && resource.price ? (
          <div className="relative mt-5 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">{resource.price}</span>
            {resource.priceNote && <span className="text-[12px] text-white/50">{resource.priceNote}</span>}
          </div>
        ) : (
          <p className={`relative mt-4 text-[13px] ${isPaid ? 'text-white/60' : 'text-stone-500'}`}>
            {resource.format}
            {resource.pages ? ` · ${resource.pages} pages` : ''}
          </p>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-4 text-[14px] text-stone-400 font-semibold uppercase tracking-[0.14em]">
          {resource.audience}
        </p>
        <p className="text-[14.5px] leading-relaxed text-stone-600 mb-5">{resource.summary}</p>

        <ul className="space-y-2.5 mb-5">
          {resource.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[13.5px] text-stone-600">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-orange" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <div className="rounded-xl bg-stone-50 border border-stone-200 px-4 py-3 mb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1">Best for</p>
            <p className="text-[13px] text-stone-600 leading-relaxed">{resource.bestFor}</p>
          </div>

          <button
            onClick={() => onRequest(resource)}
            className={`w-full rounded-full py-3 text-sm font-semibold transition-all duration-300 ${
              isPaid
                ? 'bg-navy hover:bg-navy-700 text-white'
                : 'bg-orange hover:bg-orange-500 text-white shadow-glow-orange'
            }`}
          >
            {isPaid ? `Purchase · ${resource.price}` : 'Get the Free Download'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  const [active, setActive] = useState<Resource | null>(null);
  const [formState, setFormState] = useState<RequestState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', role: '' });

  const freeResources = RESOURCES.filter((r) => r.kind === 'free');
  const paidResources = RESOURCES.filter((r) => r.kind === 'paid');

  const openRequest = (resource: Resource) => {
    setActive(resource);
    setFormState('idle');
    setErrorMsg('');
  };

  const closeRequest = () => {
    setActive(null);
    setFormState('idle');
    setErrorMsg('');
    setFormData({ name: '', email: '', phone: '', company: '', role: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!active) return;
    setFormState('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/resource-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resource_slug: active.slug,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          role: formData.role,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong.');
      }
      setFormState('success');
    } catch (err) {
      setFormState('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
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
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
              Resources for North Carolina Projects
            </div>
            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-[64px] font-extrabold tracking-tight text-white leading-[1.05]">
              The same checklists, templates, and playbooks we run on our own projects.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-white/65">
              Free guides for owners getting ready to file a permit, and paid playbooks for investors and GCs who want the full operational standard we use across active residential work.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3.5">
              <a
                href="#free"
                className="btn-glow inline-flex items-center justify-center gap-2 rounded-full bg-orange hover:bg-orange-500 px-8 py-4 text-[15px] font-semibold text-white shadow-glow-orange transition-all hover:-translate-y-0.5"
              >
                Free Resources
              </a>
              <a
                href="#paid"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-8 py-4 text-[15px] font-medium text-white transition-all hover:bg-white/[0.12] hover:-translate-y-0.5"
              >
                Paid Playbooks
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Free */}
      <section id="free" className="py-20 sm:py-24">
        <div className="container-pro">
          <div className="max-w-2xl mb-12">
            <Eyebrow>Free resources</Eyebrow>
            <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-[1.08]">
              Checklists and worksheets built from real NC residential projects
            </h2>
            <p className="mt-4 text-stone-500 leading-relaxed">
              Request a free download — we send the file within one business day and keep your email only for future resource releases.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {freeResources.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} onRequest={openRequest} />
            ))}
          </div>
        </div>
      </section>

      {/* Paid */}
      <section id="paid" className="py-20 sm:py-24 bg-stone-50 border-y border-stone-200">
        <div className="container-pro">
          <div className="max-w-2xl mb-12">
            <Eyebrow>Paid playbooks</Eyebrow>
            <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-[1.08]">
              Operational playbooks and templates for investors, GCs, and PMs
            </h2>
            <p className="mt-4 text-stone-500 leading-relaxed">
              These are the documents and workflows we run on our own projects. Each purchase is sent by email with invoice and signed update notifications for one year.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paidResources.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} onRequest={openRequest} />
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <p className="eyebrow">Custom playbook work</p>
                <h3 className="mt-3 text-2xl font-bold text-navy tracking-tight">
                  Need a custom workflow for your team?
                </h3>
                <p className="mt-3 text-stone-500 leading-relaxed max-w-xl">
                  We build custom permit, onboarding, and coordination workflows for general contractors and investors running five or more residential projects per year. Tell us what the team is doing and we will quote the build.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-col gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange hover:bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-glow-orange transition-colors"
                >
                  Request a Custom Quote
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/15 bg-white hover:bg-stone-50 px-6 py-3 text-sm font-semibold text-navy transition-colors"
                >
                  Browse Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-16 bg-white">
        <div className="container-pro">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                eyebrow: 'Written from active projects',
                title: 'Not generic',
                text: 'Every template comes from active NC residential work — Mecklenburg, Cabarrus, Iredell, Union, and Gaston counties.',
              },
              {
                eyebrow: 'Built from active project work',
                title: 'Used in real residential jobs',
                text: 'These documents come from active residential project work and real client coordination, not generic templates.',
              },
              {
                eyebrow: 'One-time delivery',
                title: 'Email delivery with invoice',
                text: 'Paid resources are delivered by email after checkout coordination. Free resources arrive within one business day.',
              },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange mb-2">{card.eyebrow}</p>
                <h3 className="text-lg font-bold text-navy tracking-tight">{card.title}</h3>
                <p className="mt-2 text-[14px] text-stone-600 leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* Request modal */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 overflow-y-auto">
          <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" onClick={closeRequest} />
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto">
            <div className="relative p-7 sm:p-9 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950">
              <div className="absolute -top-20 -right-20 w-[240px] h-[240px] rounded-full bg-orange/[0.1] blur-[80px]" />
              <div className="relative">
                <button
                  onClick={closeRequest}
                  aria-label="Close"
                  className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
                    active.kind === 'paid' ? 'bg-orange text-white' : 'bg-orange/15 text-orange'
                  }`}
                >
                  {active.kind === 'paid' ? `Purchase · ${active.price}` : 'Free Download'}
                </span>
                <h3 className="mt-4 text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                  {active.title}
                </h3>
                <p className="mt-3 text-[14px] text-white/60 leading-relaxed">
                  {active.kind === 'paid'
                    ? 'Tell us where to send the invoice and delivery. We reply within one business day with payment and delivery details.'
                    : 'Tell us where to send the file. We reply within one business day with the download.'}
                </p>
              </div>
            </div>

            <div className="p-7 sm:p-9">
              {formState === 'success' ? (
                <div className="text-center py-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-orange/15 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-navy tracking-tight">Request received.</h4>
                  <p className="mt-2 text-stone-500 leading-relaxed">
                    We&apos;ll {active.kind === 'paid' ? 'reply with invoice and delivery' : 'send the file'} within one business day — look for an email from orders@southerncitiesconstruction.com.
                  </p>
                  <button
                    onClick={closeRequest}
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-navy hover:bg-navy-700 text-white px-6 py-3 text-sm font-semibold transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-navy font-semibold text-[12px] uppercase tracking-[0.14em] mb-1.5">
                      Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-[15px]"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-navy font-semibold text-[12px] uppercase tracking-[0.14em] mb-1.5">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-[15px]"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-navy font-semibold text-[12px] uppercase tracking-[0.14em] mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-[15px]"
                        placeholder="(704) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-navy font-semibold text-[12px] uppercase tracking-[0.14em] mb-1.5">
                        Role
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-[15px]"
                      >
                        <option value="">Select one</option>
                        <option value="Investor">Investor</option>
                        <option value="General Contractor">General Contractor</option>
                        <option value="Subcontractor">Subcontractor</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Owner">Homeowner / Owner</option>
                        <option value="Realtor">Realtor</option>
                        <option value="Developer">Developer</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-navy font-semibold text-[12px] uppercase tracking-[0.14em] mb-1.5">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-[15px]"
                      placeholder="Optional"
                    />
                  </div>

                  {formState === 'error' && (
                    <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
                      {errorMsg || 'Something went wrong. Please try again.'}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="w-full rounded-full bg-orange hover:bg-orange-500 disabled:opacity-60 text-white px-6 py-3.5 text-[15px] font-semibold shadow-glow-orange transition-colors"
                  >
                    {formState === 'loading'
                      ? 'Sending...'
                      : active.kind === 'paid'
                      ? `Request Purchase · ${active.price}`
                      : 'Send Me the Download'}
                  </button>
                  <p className="text-center text-[12px] text-stone-400 leading-relaxed">
                    By submitting, you agree to receive the requested resource and related updates. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
