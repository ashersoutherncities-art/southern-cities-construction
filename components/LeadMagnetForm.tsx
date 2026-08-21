'use client';

import { useState } from 'react';
import SmsConsent from '@/components/SmsConsent';

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

type Props = {
  /** Lead-magnet resource slug (must match an entry in lib/resources.ts with leadMagnet:true). */
  resourceSlug: string;
  /** Human-readable name of the lead magnet — shown in success state. */
  resourceTitle: string;
  /** Path to the downloadable PDF, revealed after successful form submit. */
  downloadUrl: string;
  /** Optional source label for GHL attribution (e.g., 'lp-pre-listing-checklist'). */
  source?: string;
  /** Submit button label. Defaults to 'Get the Checklist'. */
  submitLabel?: string;
};

export default function LeadMagnetForm({
  resourceSlug,
  resourceTitle,
  downloadUrl,
  source = 'lead-magnet-lp',
  submitLabel = 'Get the Checklist',
}: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', honey: '' });
  const [smsConsent, setSmsConsent] = useState(false);
  const [state, setState] = useState<SubmissionState>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.honey) return;
    setState('loading');
    setError('');
    try {
      const res = await fetch('/api/resource-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resource_slug: resourceSlug,
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          smsConsent,
          honey: form.honey,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || 'Submission failed. Please try again.');
        setState('error');
        return;
      }
      setState('success');
    } catch {
      setError('Network error. Please try again.');
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/25 text-emerald-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Your download is ready.</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-white/75">
              Click below to get <strong className="text-white">{resourceTitle}</strong>. We also sent a copy to <strong className="text-white">{form.email}</strong> for later reference.
            </p>
            <a
              href={downloadUrl}
              download
              className="mt-5 inline-flex items-center justify-center rounded-full bg-orange px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-glow-orange transition-all hover:bg-orange-500 hover:-translate-y-0.5"
            >
              Download the PDF ↓
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3.5 rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7">
      <input
        type="text"
        name="hp"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        value={form.honey}
        onChange={(e) => setForm((f) => ({ ...f, honey: e.target.value }))}
        className="hidden"
      />
      <div>
        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
          Name *
        </label>
        <input
          required
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full rounded-xl border border-white/15 bg-[#0a1428] px-4 py-3 text-[15px] text-white placeholder:text-white/35 focus:border-orange/60 focus:outline-none focus:ring-2 focus:ring-orange/30 transition-colors"
          placeholder="Your full name"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
          Email *
        </label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full rounded-xl border border-white/15 bg-[#0a1428] px-4 py-3 text-[15px] text-white placeholder:text-white/35 focus:border-orange/60 focus:outline-none focus:ring-2 focus:ring-orange/30 transition-colors"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
          Phone <span className="text-white/40">(optional)</span>
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="w-full rounded-xl border border-white/15 bg-[#0a1428] px-4 py-3 text-[15px] text-white placeholder:text-white/35 focus:border-orange/60 focus:outline-none focus:ring-2 focus:ring-orange/30 transition-colors"
          placeholder="(555) 555-5555"
        />
      </div>
      <SmsConsent checked={smsConsent} onChange={setSmsConsent} tone="dark" />
      <button
        type="submit"
        disabled={state === 'loading'}
        className="mt-1 inline-flex w-full min-h-[56px] items-center justify-center gap-2 rounded-full bg-orange py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-glow-orange transition-all hover:-translate-y-0.5 hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === 'loading' ? 'Sending…' : `${submitLabel} ↓`}
      </button>
      {state === 'error' && (
        <p className="text-center text-[13px] text-rose-400">{error}</p>
      )}
      <p className="text-center text-[11px] leading-relaxed text-white/45">
        Instant download · No spam · Unsubscribe anytime
      </p>
      {/* source field omitted from POST body — using default endpoint behavior */}
      <input type="hidden" name="source" value={source} />
    </form>
  );
}
