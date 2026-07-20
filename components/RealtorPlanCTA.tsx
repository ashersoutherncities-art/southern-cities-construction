'use client';

import { useState } from 'react';
import type { RealtorPlanKey } from '@/lib/realtor-plans/tiers';

/**
 * Subscribe button for a Realtor Support Plan. POSTs to the checkout route and
 * redirects to Stripe. Mirrors the Deal Desk subscribe flow.
 */
export default function RealtorPlanCTA({
  planKey,
  label = 'Get started',
  highlighted = false,
}: {
  planKey: RealtorPlanKey;
  label?: string;
  highlighted?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  async function subscribe() {
    setLoading(true);
    try {
      const res = await fetch('/api/realtor-plans/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ plan: planKey }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert(data.detail || 'Checkout is not available yet — please reach out and we’ll set you up.');
    } catch {
      alert('Something went wrong starting checkout.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={subscribe}
      disabled={loading}
      className={`inline-flex min-h-[48px] w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold uppercase tracking-wider transition disabled:opacity-60 ${
        highlighted
          ? 'bg-[#fa8c41] text-white hover:bg-[#ffa463] shadow-[0_10px_24px_-8px_rgba(245,130,32,0.5)]'
          : 'border border-white/25 text-white hover:bg-white/5'
      }`}
    >
      {loading ? 'Starting…' : label}
    </button>
  );
}
