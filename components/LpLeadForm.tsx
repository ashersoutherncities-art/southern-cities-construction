'use client';

import { useState } from 'react';

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

type Props = {
  /** Slug used as the `service` field — drives GHL inquiry-<slug> tag. */
  serviceSlug: string;
  /** Human-readable product/bundle name shown in the form headline. */
  serviceName: string;
  /** Optional product price (e.g., "$499", "Starting at $2,500"). When set,
   *  flows through to GHL custom field `services_requested` so the SMS to
   *  the owner shows the price inline — instant qualification at a glance. */
  servicePrice?: string;
  /** Optional source label used by GHL for lead attribution. Defaults to 'lp'. */
  source?: string;
  /** Override the default headline ('Request a custom quote'). */
  headline?: string;
  /** Override the default subhead. */
  subhead?: string;
  /** Override the submit button label. Defaults to 'Request Custom Quote'. */
  submitLabel?: string;
  /** Optional id for in-page anchor scrolling (e.g., 'quote-form'). */
  id?: string;
  /** Visual variant — 'dark' for navy-on-dark sections, 'light' for white bg. */
  variant?: 'dark' | 'light';
};

export default function LpLeadForm({
  serviceSlug,
  serviceName,
  servicePrice,
  source = 'lp',
  headline,
  subhead,
  submitLabel = 'Request Custom Quote',
  id,
  variant = 'dark',
}: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    honey: '',
  });
  const [state, setState] = useState<SubmissionState>('idle');
  const [error, setError] = useState('');

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setState('loading');
    setError('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          message: form.message || `Inquiry about ${serviceName}.`,
          service: serviceSlug,
          service_price: servicePrice,
          source,
          honey: form.honey,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Submission failed');
      setState('success');
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Submission failed');
    }
  }

  const isDark = variant === 'dark';
  const wrapperClass = isDark
    ? 'rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e1c30] via-[#142840] to-[#0e1c30] p-8 sm:p-12 shadow-[0_30px_60px_-20px_rgba(8,17,29,0.4)]'
    : 'rounded-3xl border border-stone-200 bg-white p-8 sm:p-12 shadow-elev-1';
  const labelClass = isDark ? 'text-white/70' : 'text-navy/65';
  const inputClass = isDark
    ? 'mt-2 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder-white/30 focus:border-[#fa8c41] focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#fa8c41]/30'
    : 'mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-navy placeholder-navy/30 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/30';
  const headlineClass = isDark ? 'text-white' : 'text-navy';
  const subheadClass = isDark ? 'text-white/75' : 'text-navy/70';

  if (state === 'success') {
    return (
      <div id={id} className={wrapperClass}>
        <div className={`flex flex-col items-center text-center ${isDark ? 'text-white' : 'text-navy'}`}>
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5L20 7" />
            </svg>
          </div>
          <h3 className={`text-2xl font-black tracking-tight ${headlineClass}`}>Got it. We&rsquo;ll be in touch.</h3>
          <p className={`mt-3 max-w-md text-[15px] leading-relaxed ${subheadClass}`}>
            Your inquiry for <span className="font-semibold">{serviceName}</span> is in. Expect a response within 1 business day from{' '}
            <span className="font-semibold">orders@southerncitiesconstruction.com</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id={id} className={wrapperClass}>
      <p className={`text-[11px] font-black uppercase tracking-[0.22em] ${isDark ? 'text-[#fa8c41]' : 'text-orange'}`}>{serviceName}</p>
      <h3 className={`mt-3 text-3xl font-black tracking-[-0.03em] sm:text-4xl ${headlineClass}`}>
        {headline || 'Request a custom quote'}
      </h3>
      <p className={`mt-4 text-[15px] leading-relaxed sm:text-base ${subheadClass}`}>
        {subhead ||
          `Send a few details about your project and we'll come back within 1 business day with scope, pricing, and next steps.`}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
        {/* Honeypot — hidden from users, catches bots */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            name="honey"
            value={form.honey}
            onChange={update('honey')}
          />
        </div>

        <label className="text-sm font-semibold sm:col-span-1">
          <span className={labelClass}>Name</span>
          <input
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={update('name')}
            className={inputClass}
            placeholder="Asher Smith"
          />
        </label>

        <label className="text-sm font-semibold sm:col-span-1">
          <span className={labelClass}>Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={update('email')}
            className={inputClass}
            placeholder="you@example.com"
          />
        </label>

        <label className="text-sm font-semibold sm:col-span-1">
          <span className={labelClass}>Phone</span>
          <input
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={update('phone')}
            className={inputClass}
            placeholder="(980) 555-0100"
          />
        </label>

        <label className="text-sm font-semibold sm:col-span-1">
          <span className={labelClass}>Company (optional)</span>
          <input
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={update('company')}
            className={inputClass}
            placeholder="Your company"
          />
        </label>

        <label className="text-sm font-semibold sm:col-span-2">
          <span className={labelClass}>Project details</span>
          <textarea
            value={form.message}
            onChange={update('message')}
            rows={4}
            className={inputClass}
            placeholder="Tell us about the property, scope, timeline, and any context we should know."
          />
        </label>

        <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className={`text-xs ${isDark ? 'text-white/50' : 'text-navy/50'}`}>
            We never share your info. Response in 1 business day.
          </p>
          <button
            type="submit"
            disabled={state === 'loading'}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#fa8c41] px-7 py-3 text-sm font-black uppercase tracking-[0.06em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.45)] transition hover:-translate-y-0.5 hover:bg-[#ffa463] disabled:cursor-wait disabled:opacity-60"
          >
            {state === 'loading' ? 'Sending…' : submitLabel}
            {state !== 'loading' ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            ) : null}
          </button>
        </div>

        {error ? (
          <p className="sm:col-span-2 rounded-xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        ) : null}
      </form>
    </div>
  );
}
