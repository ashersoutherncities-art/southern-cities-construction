'use client';

import { useState } from 'react';

/**
 * CTA for Project Setup & Pre-Construction Management ($3,500/mo). Tries the
 * subscription checkout route; if self-serve billing is not live yet (503,
 * Stripe Price ID unset) it gracefully falls back to the contact/intake flow so
 * the customer can still request setup. Mirrors RealtorPlanCTA, with a
 * contact-fallback instead of an alert.
 */
export default function ProjectSetupCTA({
  label = 'Start Project Setup — $3,500/mo →',
  className = '',
}: {
  label?: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const contactHref = '/start?service=project-setup';

  async function start() {
    setLoading(true);
    try {
      const res = await fetch('/api/project-setup/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json().catch(() => ({}));
      // Self-serve checkout live → go to Stripe. Otherwise fall back to contact.
      window.location.href = data.url || contactHref;
    } catch {
      window.location.href = contactHref;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={start}
        disabled={loading}
        className={
          className ||
          'inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-9 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5 disabled:opacity-60'
        }
      >
        {loading ? 'Starting…' : label}
      </button>
      <a
        href={contactHref}
        className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white transition hover:bg-white/10"
      >
        Request setup / talk to us →
      </a>
    </div>
  );
}
