'use client';

import { useState } from 'react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { CD_TIERS, CdTierKey } from '@/lib/construction-department/tiers';

const NAVY = '#132452';
const ORANGE = '#fa8c41';
const CREAM = '#f6f2ec';

const ORDER: CdTierKey[] = ['starter', 'investor', 'operator'];

export default function ConstructionDepartmentPage() {
  const [loading, setLoading] = useState<CdTierKey | null>(null);
  const [email, setEmail] = useState('');
  const [linkSent, setLinkSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function subscribe(tier: CdTierKey) {
    setLoading(tier);
    try {
      const res = await fetch('/api/deal-desk/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ tier }),
      });
      const data = await res.json();
      if (data.url) window.location.assign(data.url);
      else alert(data.detail || 'Checkout is not available yet.');
    } catch {
      alert('Something went wrong starting checkout.');
    } finally {
      setLoading(null);
    }
  }

  async function requestLink(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('/api/deal-desk/access', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setLinkSent(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <SiteNav variant="solid" />
      <main style={{ background: CREAM, color: NAVY, minHeight: '100vh', padding: '120px 20px 56px' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <p style={{ color: ORANGE, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: 12 }}>
          Southern Cities Construction · Construction Department
        </p>
        <h1 style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.05, margin: '10px 0 8px' }}>
          Build your real estate business without building your own construction department.
        </h1>
        <p style={{ fontSize: 17, maxWidth: 680, lineHeight: 1.6 }}>
          Screen every deal for free. Get allocated access to a licensed GC&apos;s Construction Desk Review,
          preferred Deal Pack pricing, and vetted GC quote procurement — all through one membership.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18, marginTop: 32 }}>
          {ORDER.map((key) => {
            const tier = CD_TIERS[key];
            const popular = key === 'investor';
            return (
              <div
                key={key}
                style={{
                  background: '#fff',
                  border: `2px solid ${popular ? ORANGE : '#e8dfd4'}`,
                  borderRadius: 18,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {popular ? (
                  <span style={{ alignSelf: 'flex-start', background: ORANGE, color: NAVY, fontWeight: 700, fontSize: 11, padding: '4px 10px', borderRadius: 999, marginBottom: 10 }}>
                    MOST POPULAR
                  </span>
                ) : null}
                <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>{tier.name}</h2>
                <div style={{ fontSize: 36, fontWeight: 900, margin: '8px 0' }}>
                  ${tier.priceUsd}
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#6b7280' }}>/mo</span>
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: '#6b7280', marginTop: -4, marginBottom: 4 }}>+ $99 one-time setup</div>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: '#374151', minHeight: 66 }}>{tier.blurb}</p>
                <ul style={{ fontSize: 13, lineHeight: 1.7, paddingLeft: 18, margin: '4px 0 18px' }}>
                  <li>Unlimited property screening — run as many deals as you want</li>
                  <li>{tier.deskReviewsPerMonth > 0 ? `${tier.deskReviewsPerMonth} Construction Desk Review${tier.deskReviewsPerMonth > 1 ? 's' : ''} / mo` : 'Construction Desk Reviews available as add-on'}</li>
                  <li>{tier.dealPackDiscountPct ? `${tier.dealPackDiscountPct}% preferred Deal Pack pricing` : 'Standard Deal Pack pricing'}</li>
                  <li>{tier.gcProcurementIncludedPerYear > 0 ? `${tier.gcProcurementIncludedPerYear} GC procurement${tier.gcProcurementIncludedPerYear > 1 ? 's' : ''} / yr` : 'GC procurement available as add-on'}</li>
                  {tier.cmaCreditsPerMonth > 0 ? <li>{tier.cmaCreditsPerMonth} SC Realty CMA credit{tier.cmaCreditsPerMonth > 1 ? 's' : ''} / mo</li> : null}
                  {tier.strategyCallsPerMonth > 0 ? <li>{tier.strategyCallsPerMonth} monthly strategy call</li> : null}
                  {tier.siteVisitCreditsPerYear > 0 ? <li>{tier.siteVisitCreditsPerYear} site-visit credit / yr</li> : null}
                  {tier.priorityQueue ? <li>Priority queue on every request</li> : null}
                </ul>
                <button
                  onClick={() => subscribe(key)}
                  disabled={loading !== null}
                  style={{
                    marginTop: 'auto',
                    background: popular ? ORANGE : NAVY,
                    color: popular ? NAVY : '#fff',
                    fontWeight: 700,
                    border: 'none',
                    borderRadius: 10,
                    padding: '13px 18px',
                    cursor: loading ? 'default' : 'pointer',
                    opacity: loading && loading !== key ? 0.6 : 1,
                  }}
                >
                  {loading === key ? 'Starting…' : `Start ${tier.name}`}
                </button>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 40, background: '#fff', border: '1px solid #e8dfd4', borderRadius: 16, padding: 24, maxWidth: 760 }}>
          <h3 style={{ margin: '0 0 10px', fontSize: 18, fontWeight: 800 }}>How your access works — no passwords</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, fontSize: 14, lineHeight: 1.55, color: '#374151' }}>
            <div><strong style={{ color: NAVY }}>1. Subscribe</strong><br />Pick a plan and check out. We instantly email you a private link to your Construction Department.</div>
            <div><strong style={{ color: NAVY }}>2. Click your link</strong><br />The link <em>is</em> your login — no password to set or remember. Bookmark the page it opens.</div>
            <div><strong style={{ color: NAVY }}>3. It renews itself</strong><br />Every billing cycle we email you a fresh link automatically, with your allocations reset for the new month.</div>
          </div>
          <p style={{ margin: '16px 0 0', fontSize: 13.5, color: NAVY, fontWeight: 600, lineHeight: 1.55 }}>
            Property screening is unlimited on every plan. Construction Desk Reviews, GC procurement, strategy calls,
            and site visits are allocated per tier — need more before your cycle resets? Extra Desk Reviews and GC
            procurements are billed individually to the card on file, no upgrade required.
          </p>
          <p style={{ margin: '10px 0 0', fontSize: 13, color: '#6b7280' }}>
            Your link is private to your membership and tied to your allocations — don&apos;t share it. Need a fresh one anytime? Enter your email below.
          </p>
        </div>

        <div id="member" style={{ marginTop: 18, background: '#fff', border: '1px solid #e8dfd4', borderRadius: 16, padding: 24, maxWidth: 520 }}>
          <h3 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 800 }}>Already a member? Get your link</h3>
          {linkSent ? (
            <p style={{ margin: 0, color: '#1a7f37', fontSize: 15 }}>
              If that email has an active membership, your private Construction Department link is on its way. Check your inbox.
            </p>
          ) : (
            <form onSubmit={requestLink} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                style={{ flex: 1, minWidth: 200, border: '1px solid #d1d5db', borderRadius: 10, padding: '12px 14px', fontSize: 15 }}
              />
              <button
                type="submit"
                disabled={sending}
                style={{ background: NAVY, color: '#fff', fontWeight: 700, border: 'none', borderRadius: 10, padding: '12px 18px', cursor: 'pointer' }}
              >
                {sending ? 'Sending…' : 'Email my link'}
              </button>
            </form>
          )}
        </div>

        <p style={{ marginTop: 28, fontSize: 12, color: '#6b7280' }}>
          Southern Cities Construction · NC GC License #107724. SCREEN results are underwriting tools, not appraisals,
          engineering opinions, or committed construction pricing. Property values shown are derived estimates; a
          Southern Cities Realty CMA provides the finalized valuation. Committed construction pricing is only
          represented as such once Southern Cities has completed the appropriate preconstruction process and actually
          offered it.
        </p>
      </div>
      </main>
      <SiteFooter />
    </>
  );
}
