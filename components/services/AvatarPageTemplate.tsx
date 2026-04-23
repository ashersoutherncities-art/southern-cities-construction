'use client';

import { useState } from 'react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { ServiceBucket } from '@/components/services/ServiceBucket';
import { AvatarPageData } from '@/lib/services-data';

export default function AvatarPageTemplate({ data }: { data: AvatarPageData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    audience_type: data.eyebrow,
    service: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const result = (await res.json()) as { error?: string };
        throw new Error(result.error || 'Failed to submit');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', audience_type: data.eyebrow, service: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SiteNav variant="solid" />

      <section className="relative overflow-hidden bg-navy-900 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#163061_0%,#10254c_100%)]" />
        <div className="relative z-10 container-pro">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" />
              {data.eyebrow}
            </div>
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {data.heroTitle}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-white sm:text-xl">{data.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#buy-now" className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white">
                {data.buy?.[0]?.cta || data.review?.[0]?.cta || 'See Services'}
              </a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white">
                {data.quote?.[0]?.cta || 'Request Review'}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-16 sm:py-20">
        <div className="container-pro grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What keeps slowing this down</p>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-stone-700">
              {data.painPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What gets better when this is handled right</p>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-stone-700">
              {data.outcomes.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="buy-now" className="bg-white py-20 sm:py-24">
        <div className="container-pro">
          <ServiceBucket title="Buy Now" text="Use this when one property, one file, or one decision needs a clear answer." cards={data.buy} />
          <ServiceBucket title="Priced from Simple Inputs" text="Use this when a few project details can set pricing without a full review." cards={data.review} />
          <ServiceBucket title="Needs Review" text="Use this when the work is active, messy, larger, or too variable to price responsibly without looking first." cards={data.quote} />
        </div>
      </section>

      {data.ongoingSupport?.length ? (
        <section className="border-y border-stone-200 bg-stone-50 py-20 sm:py-24">
          <div className="container-pro">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Monthly support</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">When the same problem keeps eating time, use a monthly plan.</h2>
              <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
                {data.recurringIntro || 'Use a monthly plan when the same kind of delay, follow-up, or decision problem keeps coming back and you do not want to restart from scratch every time.'}
              </p>
            </div>
            <ServiceBucket title="Monthly Support Plans" text="Use this when the same kind of delay, follow-up, or decision problem keeps coming back and you need a standing lane for it." cards={data.ongoingSupport} />
            <div className="mt-8">
              <a href="/recurring-support" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                See All Recurring Support Plans
              </a>
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white py-16 sm:py-20">
        <div className="container-pro rounded-[28px] border border-stone-200 bg-stone-50 p-8 sm:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Need help choosing?</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">If you are not sure whether to buy now, price from inputs, or request review, start here.</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone-700 sm:text-lg">
            Southern Cities can help you choose the right next step before you lose more time or spend money in the wrong place.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/services" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
              Back to All Services
            </a>
            {data.ongoingSupport?.length ? (
              <a href="/recurring-support" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                Review Monthly Support Plans
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-navy-950 py-20 sm:py-24 text-white">
        <div className="container-pro grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Contact</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Need us to review the job first?</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/88">
              <p><strong className="text-white">Buy Now</strong> when one property, one file, or one decision already has a clear deliverable.</p>
              <p><strong className="text-white">Price from inputs</strong> when a few project details can set pricing without a full review.</p>
              <p><strong className="text-white">Use this form</strong> when the project is larger, less defined, or needs review before anyone can price it responsibly.</p>
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-7 sm:p-8">
            {submitted ? (
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-100">
                Your request was sent. Southern Cities will review it and follow up with the next step.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="name" value={formData.name} onChange={handleChange} required placeholder="Name" className="w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-orange focus:outline-none" />
                  <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-orange focus:outline-none" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-orange focus:outline-none" />
                  <input name="service" value={formData.service} onChange={handleChange} placeholder="What service or issue are you reaching out about?" className="w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-orange focus:outline-none" />
                </div>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="What is happening right now, what is stuck, and what do you need help moving forward?" className="w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-orange focus:outline-none" />
                {error && <p className="text-sm text-red-300">{error}</p>}
                <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-all hover:bg-orange-500 disabled:opacity-60">
                  {submitting ? 'Sending...' : 'Request Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
