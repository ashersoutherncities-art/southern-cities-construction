'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

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

const inputBase =
  'w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-orange/60 focus:bg-white transition-colors';

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
        'flagship-permit-oversight': {
          amount: amount || '4500',
          scope_notes: 'Permit administration and construction oversight selected from cart.',
        },
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
        'home-assessment': {
          amount: amount || '299',
          scope_notes: 'Home assessment selected from cart.',
        },
        'realtor-inspection-review': {
          amount: amount || '299',
          scope_notes: 'Realtor inspection review selected from cart.',
        },
        'investor-review': {
          amount: amount || '500',
          scope_notes: 'Investor review selected from cart.',
        },
        'owner-consultation': {
          amount: amount || '350',
          scope_notes: 'Owner consultation selected from cart.',
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
            `Payment confirmed. Your portal workspace is being prepared and contract status is ${json?.order?.contract_status || 'pending signature'}. Onboarding next steps will arrive from orders@southerncitiesconstruction.com.`
          );
        })
        .catch((err: Error) => {
          setCompletionMessage(`Payment came through, but order finalization needs a retry: ${err.message}`);
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

  const STEPS: Array<[string, string, string]> = [
    ['01', 'Buyer information', 'Project, project manager, and billing details before payment.'],
    ['02', 'Secure payment', 'Stripe handles the service deposit or purchase amount.'],
    ['03', 'Order creation', 'Your paid order is recorded and the onboarding workflow begins.'],
    ['04', 'Portal + contract', 'Workspace access, invoice, and contract packet arrive from orders@southerncitiesconstruction.com.'],
  ];

  return (
    <main className="min-h-screen bg-stone-50">
      <SiteNav variant="solid" />

      <section className="container-pro pt-14 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16 items-start">
          <div>
            <p className="eyebrow">Onboarding</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-navy-900 leading-[1.05]">
              Start your project and unlock the client portal.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink/65 max-w-xl">
              Submit project information, complete payment, and the portal-backed onboarding flow takes over. Contract, invoice, and workspace access arrive right after checkout.
            </p>

            {completionMessage && (
              <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5 text-sm leading-relaxed text-green-800 flex items-start gap-3">
                <svg className="w-5 h-5 shrink-0 mt-0.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{completionMessage}</span>
              </div>
            )}

            <div className="mt-10 space-y-3">
              {STEPS.map(([num, title, copy]) => (
                <div
                  key={num}
                  className="flex items-start gap-4 rounded-2xl border border-navy/[0.08] bg-white p-5 shadow-elev-1"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange/10 text-[12px] font-bold text-orange tracking-widest">
                    {num}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-navy-900">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/60">{copy}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-navy/[0.08] bg-white p-6">
              <p className="text-sm font-semibold text-navy-900">Already have portal access?</p>
              <p className="mt-1 text-sm text-ink/60">
                Use the{' '}
                <a
                  href="https://clients.southerncitiesconstruction.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-orange hover:text-orange-500"
                >
                  live client portal
                </a>{' '}
                to view your project status, documents, and invoices.
              </p>
              <div className="mt-3 text-xs text-ink/50">
                Need to review items first?{' '}
                <Link href="/cart" className="font-semibold text-navy-900 hover:text-orange">
                  Go to cart
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-8 lg:sticky lg:top-28">
            <div className="rounded-3xl border border-navy/[0.08] bg-white p-7 sm:p-10 shadow-elev-2">
              <p className="eyebrow">Start Checkout</p>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-navy-900">
                Permit Administration + Construction Oversight
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                Capture the buyer&apos;s required information up front, then proceed to secure Stripe checkout.
              </p>

              <form className="mt-8 space-y-4" onSubmit={startCheckout}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={inputBase} placeholder="Buyer name" value={form.buyer_name} onChange={(e) => setForm({ ...form, buyer_name: e.target.value })} required />
                  <input type="email" className={inputBase} placeholder="Buyer email" value={form.buyer_email} onChange={(e) => setForm({ ...form, buyer_email: e.target.value })} required />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={inputBase} placeholder="Buyer phone" value={form.buyer_phone} onChange={(e) => setForm({ ...form, buyer_phone: e.target.value })} />
                  <input className={inputBase} placeholder="Billing address" value={form.billing_address} onChange={(e) => setForm({ ...form, billing_address: e.target.value })} />
                </div>
                <input className={inputBase} placeholder="Project address" value={form.project_address} onChange={(e) => setForm({ ...form, project_address: e.target.value })} required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <select className={inputBase} value={form.project_manager_role} onChange={(e) => setForm({ ...form, project_manager_role: e.target.value })} required>
                    <option value="">Who is the project manager?</option>
                    <option value="Client will act as project manager">Client will act as project manager</option>
                    <option value="Third-party PM will manage the project">Third-party PM will manage the project</option>
                    <option value="Need Southern Cities guidance on structure">Need Southern Cities guidance on structure</option>
                  </select>
                  <input className={inputBase} placeholder="Project manager name" value={form.project_manager_name} onChange={(e) => setForm({ ...form, project_manager_name: e.target.value })} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input type="email" className={inputBase} placeholder="Project manager email" value={form.project_manager_email} onChange={(e) => setForm({ ...form, project_manager_email: e.target.value })} />
                  <input className={inputBase} placeholder="Project manager phone" value={form.project_manager_phone} onChange={(e) => setForm({ ...form, project_manager_phone: e.target.value })} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={inputBase} placeholder="Entity / owner type" value={form.entity_type} onChange={(e) => setForm({ ...form, entity_type: e.target.value })} />
                  <input className={inputBase} placeholder="Timeline" value={form.project_timeline} onChange={(e) => setForm({ ...form, project_timeline: e.target.value })} />
                </div>
                <textarea className={`${inputBase} min-h-[140px] resize-y`} placeholder="Scope notes, obligations, inspection needs, and onboarding notes" value={form.scope_notes} onChange={(e) => setForm({ ...form, scope_notes: e.target.value })} />
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-navy/60">Initial charge amount (USD)</label>
                  <input className={inputBase} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-orange hover:bg-orange-500 px-5 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-colors disabled:opacity-60"
                  disabled={checkoutState === 'loading'}
                >
                  {checkoutState === 'loading' ? 'Opening checkout…' : 'Continue to Secure Payment'}
                </button>
                {checkoutMessage && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{checkoutMessage}</div>
                )}
              </form>
            </div>

            <div className="rounded-3xl border border-navy/[0.08] bg-white p-7 sm:p-10 shadow-elev-1">
              <p className="eyebrow">Existing Buyer</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy-900">
                Portal access
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                Use the credentials delivered by orders@southerncitiesconstruction.com after your checkout was completed.
              </p>
              <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setLoginSubmitted(true); }}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputBase} placeholder="buyer@email.com" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputBase} placeholder="Temporary password from email" />
                <button
                  type="submit"
                  className="w-full rounded-full bg-navy-900 hover:bg-navy px-5 py-3.5 text-sm font-semibold text-white transition-colors"
                >
                  Enter Portal
                </button>
              </form>
              {loginSubmitted && (
                <div className="mt-5 rounded-xl border border-navy/[0.08] bg-stone-50 p-4 text-sm leading-relaxed text-ink/70">
                  For live portal access, use{' '}
                  <a
                    href="https://clients.southerncitiesconstruction.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-orange hover:text-orange-500"
                  >
                    clients.southerncitiesconstruction.com
                  </a>{' '}
                  or contact our team at{' '}
                  <a href="mailto:orders@southerncitiesconstruction.com" className="font-semibold text-navy-900 hover:text-orange">
                    orders@southerncitiesconstruction.com
                  </a>.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
