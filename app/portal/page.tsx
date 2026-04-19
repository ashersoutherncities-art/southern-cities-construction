'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const NAVY = '#132452';
const ORANGE = '#fa8c41';

const initialForm = {
  buyer_name: '',
  buyer_email: '',
  buyer_phone: '',
  billing_address: '',
  project_address: '',
  project_manager_role: '',
  project_manager_name: '',
  project_manager_email: '',
  project_manager_phone: '',
  entity_type: '',
  project_timeline: '',
  scope_notes: '',
  amount: '1500',
};

export default function PortalPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSubmitted, setLoginSubmitted] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [checkoutState, setCheckoutState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const [completionMessage, setCompletionMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('checkout');
    const sessionId = params.get('session_id');
    const item = params.get('item');
    const amount = params.get('amount');

    if (item) {
      const defaults: Record<string, { amount: string; scope_notes: string }> = {
        'permit-management-service': {
          amount: amount || '1500',
          scope_notes: 'Permit management service selected from cart.',
        },
        'sub-network-access': {
          amount: amount || '349',
          scope_notes: 'Sub network access selected from cart.',
        },
        'pre-listing-renovation': {
          amount: amount || '5000',
          scope_notes: 'Pre-listing renovation selected from cart.',
        },
        'inspection-response-service': {
          amount: amount || '299',
          scope_notes: 'Inspection response service selected from cart.',
        },
      };

      const selected = defaults[item];
      if (selected) {
        setForm((prev) => ({
          ...prev,
          amount: selected.amount,
          scope_notes: prev.scope_notes || selected.scope_notes,
        }));
      }
    }

    if (status === 'success' && sessionId) {
      fetch('/api/permit-oversight-checkout/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId }),
      })
        .then(async (res) => {
          const json = await res.json();
          if (!res.ok) throw new Error(json.error || 'Could not finalize checkout');
          return json;
        })
        .then((json) => {
          setCompletionMessage(
            `Payment confirmed. Portal workspace created, contract status is ${json?.order?.contract_status || 'pending signature'}, and onboarding is ready to move through orders@southerncitiesconstruction.com.`
          );
        })
        .catch((err: Error) => {
          setCompletionMessage(`Payment came through, but order finalization still needs a retry: ${err.message}`);
        });
    }

    if (status === 'cancelled') {
      setCompletionMessage('Checkout was cancelled before payment completed.');
    }
  }, []);

  async function startCheckout(e: React.FormEvent) {
    e.preventDefault();
    setCheckoutState('loading');
    setCheckoutMessage('');

    try {
      const res = await fetch('/api/permit-oversight-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Unable to start checkout');
      }

      if (json.url) {
        window.location.href = json.url;
        return;
      }

      throw new Error('Stripe checkout URL was not returned');
    } catch (err) {
      setCheckoutState('error');
      setCheckoutMessage(err instanceof Error ? err.message : 'Unable to start checkout');
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#f6f7fb' }}>
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <span className="inline-flex rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em]" style={{ background: 'rgba(250,140,65,0.12)', color: ORANGE }}>
              Client Portal + Checkout
            </span>
            <div className="mt-4">
              <Link href="/cart" className="text-sm font-semibold" style={{ color: NAVY }}>
                Review cart
              </Link>
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight" style={{ color: NAVY }}>
              Buy the flagship service and launch onboarding in one flow.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 max-w-2xl">
              This page now acts as the front door for Permit Administration + Construction Oversight. The buyer enters project and billing information, completes payment, and then gets routed into the portal-backed onboarding sequence.
            </p>

            {completionMessage && (
              <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5 text-sm leading-relaxed text-green-800">
                {completionMessage}
              </div>
            )}

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {[
                ['1. Buyer checkout', 'Collect project, PM, and billing details before payment.'],
                ['2. Stripe payment', 'Charge the service deposit or purchase amount.'],
                ['3. Order record created', 'The paid order is written into the permit_oversight_orders workflow.'],
                ['4. Portal + contract', 'Credentials, invoice, and contract packet flow from orders@southerncitiesconstruction.com.'],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="font-bold" style={{ color: NAVY }}>{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{copy}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-3xl p-8" style={{ background: NAVY }}>
              <h2 className="text-2xl font-bold text-white">Provider hookups still pending</h2>
              <ul className="mt-5 space-y-3 text-white/75 text-sm leading-relaxed">
                <li>- orders@southerncitiesconstruction.com live sender integration</li>
                <li>- invoice / receipt PDF generation</li>
                <li>- DocuSign API hookup and template automation</li>
                <li>- secure buyer-specific portal authentication</li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-10 shadow-xl shadow-slate-200/60">
              <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: ORANGE }}>
                Start Checkout
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight" style={{ color: NAVY }}>
                Permit Administration + Construction Oversight
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Capture the buyer&apos;s required information up front, then send them into Stripe checkout.
              </p>

              <form className="mt-8 space-y-5" onSubmit={startCheckout}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <input className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-sm outline-none" placeholder="Buyer name" value={form.buyer_name} onChange={(e) => setForm({ ...form, buyer_name: e.target.value })} required />
                  <input type="email" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-sm outline-none" placeholder="Buyer email" value={form.buyer_email} onChange={(e) => setForm({ ...form, buyer_email: e.target.value })} required />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <input className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-sm outline-none" placeholder="Buyer phone" value={form.buyer_phone} onChange={(e) => setForm({ ...form, buyer_phone: e.target.value })} />
                  <input className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-sm outline-none" placeholder="Billing address" value={form.billing_address} onChange={(e) => setForm({ ...form, billing_address: e.target.value })} />
                </div>
                <input className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-sm outline-none" placeholder="Project address" value={form.project_address} onChange={(e) => setForm({ ...form, project_address: e.target.value })} required />
                <div className="grid gap-5 sm:grid-cols-2">
                  <select className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-sm outline-none" value={form.project_manager_role} onChange={(e) => setForm({ ...form, project_manager_role: e.target.value })} required>
                    <option value="">Who is the project manager?</option>
                    <option value="Client will act as project manager">Client will act as project manager</option>
                    <option value="Third-party PM will manage the project">Third-party PM will manage the project</option>
                    <option value="Need Southern Cities guidance on structure">Need Southern Cities guidance on structure</option>
                  </select>
                  <input className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-sm outline-none" placeholder="Project manager name" value={form.project_manager_name} onChange={(e) => setForm({ ...form, project_manager_name: e.target.value })} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <input type="email" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-sm outline-none" placeholder="Project manager email" value={form.project_manager_email} onChange={(e) => setForm({ ...form, project_manager_email: e.target.value })} />
                  <input className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-sm outline-none" placeholder="Project manager phone" value={form.project_manager_phone} onChange={(e) => setForm({ ...form, project_manager_phone: e.target.value })} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <input className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-sm outline-none" placeholder="Entity / owner type" value={form.entity_type} onChange={(e) => setForm({ ...form, entity_type: e.target.value })} />
                  <input className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-sm outline-none" placeholder="Timeline" value={form.project_timeline} onChange={(e) => setForm({ ...form, project_timeline: e.target.value })} />
                </div>
                <textarea className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-sm outline-none min-h-[140px]" placeholder="Scope notes, obligations, inspection needs, and onboarding notes" value={form.scope_notes} onChange={(e) => setForm({ ...form, scope_notes: e.target.value })} />
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Initial charge amount (USD)</label>
                  <input className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-sm outline-none" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                </div>
                <button type="submit" className="w-full rounded-2xl px-5 py-4 text-base font-semibold text-white transition hover:brightness-110" style={{ background: ORANGE }} disabled={checkoutState === 'loading'}>
                  {checkoutState === 'loading' ? 'Opening checkout...' : 'Continue to Payment'}
                </button>
                {checkoutMessage && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{checkoutMessage}</div>
                )}
              </form>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-10 shadow-xl shadow-slate-200/60">
              <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: ORANGE }}>
                Portal Login
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight" style={{ color: NAVY }}>
                Existing buyer access
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Existing buyers will use credentials delivered by orders@southerncitiesconstruction.com after checkout is completed.
              </p>
              <form className="mt-8 space-y-5" onSubmit={(e) => { e.preventDefault(); setLoginSubmitted(true); }}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-sm outline-none" placeholder="buyer@email.com" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-sm outline-none" placeholder="Temporary password from email" />
                <button type="submit" className="w-full rounded-2xl px-5 py-4 text-base font-semibold text-white transition hover:brightness-110" style={{ background: NAVY }}>
                  Enter Portal
                </button>
              </form>
              {loginSubmitted && (
                <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5 text-sm text-green-800">
                  Real buyer authentication is the next provider step. The workflow now supports purchase, paid order creation, and portal-routing logic.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
