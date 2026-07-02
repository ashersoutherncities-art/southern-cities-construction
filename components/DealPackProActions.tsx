'use client';

import { useState } from 'react';

/**
 * Deal Pack Pro panel actions:
 *  - Subscribe → starts a real recurring subscription checkout.
 *  - Member reorder → verifies an active Pro subscription by email (server-side)
 *    and, if valid, sends the member to a $399 additional-Bid-Ready checkout.
 *    The discounted price is never a public link or code.
 */
export default function DealPackProActions() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [reordering, setReordering] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function subscribe() {
    setLoading(true);
    try {
      const res = await fetch('/api/deal-pack/pro-checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert(data.detail || 'Checkout is not available yet.');
    } catch {
      alert('Something went wrong starting checkout.');
    } finally {
      setLoading(false);
    }
  }

  async function reorder(e: React.FormEvent) {
    e.preventDefault();
    setReordering(true);
    setMsg(null);
    try {
      const res = await fetch('/api/deal-pack/pro-reorder', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setMsg(data.detail || 'We couldn’t verify an active Pro membership for that email.');
    } catch {
      setMsg('Something went wrong. Please try again.');
    } finally {
      setReordering(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={subscribe}
        disabled={loading}
        className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-orange px-6 py-3 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:-translate-y-0.5 hover:bg-orange-500 disabled:opacity-60"
      >
        {loading ? 'Starting…' : 'Subscribe to Pro · $897/mo →'}
      </button>

      <div className="mt-5 rounded-2xl border border-white/12 bg-white/[0.03] p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-orange">Already a Pro member?</p>
        <p className="mt-1.5 text-[13px] leading-snug text-white/65">
          Used your 2 included Bid-Readys this month? Reorder at your $399 member rate — enter the email on your membership.
        </p>
        <form onSubmit={reorder} className="mt-3 flex flex-col gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            aria-label="Membership email"
            className="min-h-[44px] rounded-lg border border-white/20 bg-white/[0.06] px-3.5 text-[14px] text-white placeholder:text-white/40 focus:border-orange focus:outline-none"
          />
          <button
            type="submit"
            disabled={reordering}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-orange/50 bg-orange/15 px-5 text-[13px] font-black uppercase tracking-[0.08em] text-orange transition hover:bg-orange/25 disabled:opacity-60"
          >
            {reordering ? 'Checking…' : 'Reorder a Bid-Ready · $399'}
          </button>
        </form>
        {msg ? <p className="mt-2 text-[12.5px] leading-snug text-white/70">{msg}</p> : null}
      </div>
    </div>
  );
}
