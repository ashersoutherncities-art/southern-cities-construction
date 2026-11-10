'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import posthog from 'posthog-js';
import BookingCalendarEmbed from '@/components/BookingCalendarEmbed';
import HideChatWidget from '@/components/HideChatWidget';
import SmsConsent from '@/components/SmsConsent';
import { posthogReady } from '@/components/analytics/PostHogProvider';
import { captureAttributionOnLoad, getCurrentAttribution } from '@/lib/analytics/attribution';
import { SITE_CONFIG, logoFor } from '@/lib/site-config';
import {
  EMPTY_ROADMAP_ANSWERS,
  ROADMAP_QUESTIONS,
  evaluateRoadmap,
  roadmapAnswerLabel,
  type RoadmapAnswers,
} from '@/lib/project-roadmap';

type ContactForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  honey: string;
};

const EMPTY_CONTACT: ContactForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  honey: '',
};

const arrow = (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5">
    <path d="M4 12h16m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function capture(eventName: string, data: Record<string, string | number | boolean | null> = {}) {
  if (posthogReady()) posthog.capture(eventName, { funnel: 'project-roadmap', ...data });
}

function SvgCheck({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={'h-5 w-5 ' + className}>
      <path d="m5 12 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProjectRoadmapFunnel() {
  // 0-3: questions; 4: contact capture; 5: tailored results.
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<RoadmapAnswers>(EMPTY_ROADMAP_ANSWERS);
  const [contact, setContact] = useState<ContactForm>(EMPTY_CONTACT);
  const [smsConsent, setSmsConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const viewedRef = useRef(false);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  const result = evaluateRoadmap(answers);
  const question = step < ROADMAP_QUESTIONS.length ? ROADMAP_QUESTIONS[step] : null;
  const allSteps = ROADMAP_QUESTIONS.length + 1; // plus contact capture
  const progress = step === 5 ? 100 : Math.round((step / allSteps) * 100);

  useEffect(() => {
    if (viewedRef.current) return;
    viewedRef.current = true;
    captureAttributionOnLoad();
    capture('scc_roadmap_viewed');
  }, []);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  function chooseAnswer(value: string) {
    if (!question || submitting) return;
    setAnswers((previous) => ({ ...previous, [question.id]: value }));
    capture('scc_roadmap_question_answered', {
      question: question.id,
      answer: value,
      step_number: step + 1,
    });
    if (step === ROADMAP_QUESTIONS.length - 1) capture('scc_roadmap_contact_shown');
    setStep((previous) => previous + 1);
  }

  function goBack() {
    if (submitting) return;
    setErrorMessage('');
    setStep((previous) => Math.max(0, previous - 1));
  }

  function updateContact(field: keyof ContactForm, value: string) {
    setContact((previous) => ({ ...previous, [field]: value }));
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setErrorMessage('');
    const name = (contact.firstName.trim() + ' ' + contact.lastName.trim()).trim();
    const email = contact.email.trim().toLowerCase();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Enter your name and a valid email address to continue.');
      return;
    }

    setSubmitting(true);
    try {
      const attribution = getCurrentAttribution();
      const answerSummary = ROADMAP_QUESTIONS.map((item) =>
        item.title + ': ' + roadmapAnswerLabel(item.id, answers[item.id])
      );
      const sourceSummary = [
        'Traffic source: ' + (attribution.utm_source || attribution.traffic_source || 'unknown'),
        'Campaign: ' + (attribution.utm_campaign || 'none'),
        'Campaign ID: ' + (attribution.campaign_id || 'none'),
        'Ad set ID: ' + (attribution.adset_id || 'none'),
        'Ad ID: ' + (attribution.ad_id || 'none'),
      ];

      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: contact.phone.trim(),
          audience_type: 'Investor',
          service: 'project-roadmap',
          source: 'project-roadmap',
          message: [
            'Project Readiness Assessment (self-reported)',
            ...answerSummary,
            'Rules-based recommendation: ' + result.title,
            ...sourceSummary,
          ].join('\n').slice(0, 2500),
          smsConsent: Boolean(contact.phone.trim()) && smsConsent,
          honey: contact.honey,
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || payload.success !== true) {
        throw new Error(typeof payload.error === 'string' ? payload.error : 'Unable to save your answers right now.');
      }

      capture('scc_roadmap_lead_captured', {
        recommended_service: result.code,
        location: answers.location,
        timeline: answers.timeline,
      });

      // Separate from the existing Sales Consultation booking conversion.
      // A completed quiz is a lead, never evidence of a booked appointment.
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('trackCustom', 'SCCRoadmapLead', {
          recommended_service: result.code,
          funnel: 'project-roadmap',
        });
      }
      setStep(5);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function scrollToBooking() {
    capture('scc_roadmap_booking_intent', { recommended_service: result.code });
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-navy">
      <HideChatWidget />
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" aria-label="Southern Cities Construction home">
            <Image src={logoFor('light')} alt={SITE_CONFIG.name} width={224} height={75} className="h-9 w-auto sm:h-11" priority />
          </Link>
          <Link
            href="/consultation"
            className="hidden rounded-full border border-navy/15 px-4 py-2.5 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange sm:inline-flex"
          >
            Prefer to talk? Book a call
          </Link>
          <a href={'tel:' + SITE_CONFIG.phoneTel} className="text-sm font-bold text-navy underline decoration-orange underline-offset-4 sm:hidden">
            Call us
          </a>
        </div>
      </header>

      <div className="relative isolate overflow-hidden bg-navy px-4 pb-24 pt-12 text-white sm:pb-28 sm:pt-16">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-44 h-[420px] w-[420px] rounded-full bg-orange/15 blur-[110px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-64 -left-24 h-[430px] w-[430px] rounded-full bg-blue-500/15 blur-[105px]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center rounded-full border border-orange/40 bg-orange/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-orange">
            Free · North Carolina Investor Assessment
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-[2.25rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
            Know What Your NC Deal Needs <span className="text-orange">Before You Commit.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/75 sm:text-lg">
            Get a tailored construction action plan based on your deal stage, your biggest concern, and your timeline.
            About a minute to complete. No credit card required.
          </p>
          <p className="mt-6 text-xs font-semibold text-white/55">
            {SITE_CONFIG.license.formatted} · Serving investors across North Carolina
          </p>
        </div>
      </div>

      <section className="relative z-10 mx-auto -mt-14 max-w-3xl px-4 pb-12 sm:-mt-16 sm:px-6">
        <div className="overflow-hidden rounded-[28px] border border-navy/10 bg-white shadow-[0_28px_80px_-24px_rgba(19,36,82,0.28)]">
          <div className="border-b border-stone-200 px-6 pb-5 pt-7 sm:px-10 sm:pt-9">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-navy/45">
                {step === 5 ? 'Personalized project roadmap' : step === 4 ? 'One last step' : 'Question ' + (step + 1) + ' of 4'}
              </span>
              <span className="text-sm font-black tabular-nums text-orange">{progress}%</span>
            </div>
            <div
              role="progressbar"
              aria-label="Assessment progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              className="mt-3 h-2 overflow-hidden rounded-full bg-navy/10"
            >
              <div className="h-full rounded-full bg-orange transition-all duration-300" style={{ width: progress + '%' }} />
            </div>
          </div>

          {question ? (
            <div className="px-6 pb-9 pt-8 sm:px-10 sm:pb-11">
              <p className="text-[11px] font-black uppercase tracking-[0.17em] text-orange">{question.overline}</p>
              <h2 ref={headingRef} tabIndex={-1} className="mt-3 text-2xl font-extrabold leading-tight tracking-tight outline-none sm:text-3xl">
                {question.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{question.helper}</p>
              <div className="mt-7 grid gap-3" role="group" aria-label={question.title}>
                {question.options.map((option) => {
                  const selected = answers[question.id] === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => chooseAnswer(option.value)}
                      aria-pressed={selected}
                      className={'group flex min-h-[68px] w-full items-center gap-4 rounded-2xl border-2 px-4 py-4 text-left transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/30 sm:px-5 ' +
                        (selected ? 'border-orange bg-orange/5' : 'border-[#e7e9ee] bg-white hover:border-orange/75 hover:bg-orange/5')}
                    >
                      <span className={'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ' + (selected ? 'border-orange bg-orange text-white' : 'border-navy/30 group-hover:border-orange')}>
                        {selected ? <SvgCheck className="h-4 w-4" /> : null}
                      </span>
                      <span className="flex-1 text-[15px] font-bold leading-snug sm:text-base">{option.label}</span>
                      <span aria-hidden="true" className="text-navy/30 group-hover:text-orange">{arrow}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-7 flex items-center justify-between">
                <button type="button" onClick={goBack} disabled={step === 0} className="text-sm font-semibold text-navy/60 underline-offset-4 hover:underline disabled:invisible">
                  Back
                </button>
                <p className="text-xs text-stone-500">Tap an answer to continue</p>
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="px-6 pb-9 pt-8 sm:px-10 sm:pb-11">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <SvgCheck className="h-7 w-7" />
              </div>
              <h2 ref={headingRef} tabIndex={-1} className="mt-5 text-2xl font-extrabold leading-tight tracking-tight outline-none sm:text-3xl">
                Your project roadmap is ready.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-600">
                Enter your details to view the recommended next steps for your project. Your results will appear right here.
              </p>
              <div className="mt-5 rounded-2xl border border-orange/25 bg-orange/5 p-4">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-orange">Based on your answers</p>
                <p className="mt-2 text-[15px] font-bold text-navy">{result.eyebrow}: {result.title}</p>
                <p className="mt-1 text-sm text-stone-600">See why this fits and what to do next on the results screen.</p>
              </div>
              <form onSubmit={submitContact} className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="roadmap-company-website">Leave this field empty</label>
                  <input id="roadmap-company-website" name="company-website" tabIndex={-1} autoComplete="off" value={contact.honey} onChange={(event) => updateContact('honey', event.target.value)} />
                </div>
                <label className="text-sm font-bold">
                  First name <span className="text-orange">*</span>
                  <input
                    required maxLength={80} autoComplete="given-name"
                    value={contact.firstName} onChange={(event) => updateContact('firstName', event.target.value)}
                    placeholder="First name"
                    className="mt-2 block h-12 w-full rounded-xl border border-stone-300 bg-white px-4 font-medium text-navy placeholder:text-navy/35 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"
                  />
                </label>
                <label className="text-sm font-bold">
                  Last name <span className="text-xs font-normal text-stone-500">(optional)</span>
                  <input
                    maxLength={80} autoComplete="family-name"
                    value={contact.lastName} onChange={(event) => updateContact('lastName', event.target.value)}
                    placeholder="Last name"
                    className="mt-2 block h-12 w-full rounded-xl border border-stone-300 bg-white px-4 font-medium text-navy placeholder:text-navy/35 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"
                  />
                </label>
                <label className="text-sm font-bold sm:col-span-2">
                  Email address <span className="text-orange">*</span>
                  <input
                    required type="email" maxLength={254} autoComplete="email"
                    value={contact.email} onChange={(event) => updateContact('email', event.target.value)}
                    placeholder="you@example.com"
                    className="mt-2 block h-12 w-full rounded-xl border border-stone-300 bg-white px-4 font-medium text-navy placeholder:text-navy/35 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"
                  />
                </label>
                <label className="text-sm font-bold sm:col-span-2">
                  Phone number <span className="text-xs font-normal text-stone-500">(optional)</span>
                  <input
                    type="tel" maxLength={30} autoComplete="tel" inputMode="tel"
                    value={contact.phone} onChange={(event) => updateContact('phone', event.target.value)}
                    placeholder="(980) 555-0100"
                    className="mt-2 block h-12 w-full rounded-xl border border-stone-300 bg-white px-4 font-medium text-navy placeholder:text-navy/35 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"
                  />
                </label>
                <div className="sm:col-span-2">
                  <SmsConsent checked={smsConsent} onChange={setSmsConsent} />
                </div>
                <p className="text-xs leading-relaxed text-stone-500 sm:col-span-2">
                  By submitting, you request your project-readiness assessment and agree that our team may follow up about your inquiry by email or phone. Text messaging is optional and only with the checkbox above. See our{' '}
                  <Link href="/privacy" className="font-semibold underline hover:text-orange">Privacy Policy</Link>.
                </p>
                {errorMessage ? (
                  <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">{errorMessage}</p>
                ) : null}
                <button
                  type="submit" disabled={submitting}
                  className="flex min-h-[56px] items-center justify-center gap-3 rounded-xl bg-orange px-6 py-3 text-[16px] font-black text-navy shadow-glow-orange transition hover:bg-orange-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/30 disabled:cursor-wait disabled:opacity-60 sm:col-span-2"
                >
                  {submitting ? 'Preparing your roadmap…' : 'Show My Project Roadmap'} {!submitting && arrow}
                </button>
                <button type="button" onClick={goBack} disabled={submitting} className="text-sm font-semibold text-navy/65 underline-offset-4 hover:underline disabled:opacity-50 sm:col-span-2">
                  Change my answers
                </button>
              </form>
            </div>
          ) : null}

          {step === 5 ? (
            <div className="px-6 pb-9 pt-8 sm:px-10 sm:pb-11">
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                <SvgCheck className="h-4 w-4" /> Assessment complete
              </p>
              <h2 ref={headingRef} tabIndex={-1} className="mt-5 text-3xl font-extrabold leading-tight tracking-tight outline-none sm:text-4xl">
                Here is your construction roadmap.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                Prepared from your answers. We have not inspected a property or prepared an estimate.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-navy/15">
                <div className="bg-navy px-6 py-6 text-white">
                  <p className="text-[11px] font-black uppercase tracking-[0.14em] text-orange">{result.eyebrow}</p>
                  <h3 className="mt-2 text-2xl font-black leading-tight">{result.title}</h3>
                  <p className="mt-3 text-2xl font-extrabold text-orange">{result.price}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">{result.description}</p>
                </div>
                <div className="bg-white px-6 py-6">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-navy/55">Why this fits</p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-700">{result.reason}</p>
                  <p className="mt-6 text-xs font-black uppercase tracking-[0.14em] text-navy/55">Your next steps</p>
                  <ol className="mt-3 space-y-4">
                    {result.nextSteps.map((nextStep, index) => (
                      <li key={nextStep} className="flex gap-3 text-sm leading-relaxed text-stone-700">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange/15 font-black text-orange">{index + 1}</span>
                        <span className="pt-1">{nextStep}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-6 text-xs font-black uppercase tracking-[0.14em] text-navy/55">What this service helps with</p>
                  <ul className="mt-3 space-y-3">
                    {result.whatYouGet.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-stone-700">
                        <SvgCheck className="mt-0.5 shrink-0 text-emerald-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {result.code !== 'outside-nc' ? (
                <div className="mt-7 flex flex-col gap-3">
                  <button onClick={scrollToBooking} type="button" className="flex min-h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-orange px-5 py-3 text-center text-base font-extrabold text-navy transition hover:bg-orange-300">
                    Book a Free Construction Strategy Call {arrow}
                  </button>
                  <Link href={result.productPath} onClick={() => capture('scc_roadmap_product_clicked', { recommended_service: result.code })} className="flex min-h-[50px] w-full items-center justify-center rounded-xl border-2 border-navy/15 px-5 py-3 text-center text-sm font-bold text-navy hover:border-orange">
                    Explore {result.code === 'execution' ? 'Our Construction Services' : 'Bid-Ready & Build-Ready Deliverables'}
                  </Link>
                </div>
              ) : (
                <Link href="/deal-pack" className="mt-7 flex min-h-[52px] items-center justify-center rounded-xl bg-orange px-5 py-3 text-center font-bold text-navy">
                  Explore North Carolina Services
                </Link>
              )}
            </div>
          ) : null}
        </div>

        {step === 5 && result.code !== 'outside-nc' ? (
          <section id="book" className="mt-8 scroll-mt-5 rounded-3xl border border-navy/10 bg-white p-5 shadow-elev-2 sm:p-8">
            <p className="text-center text-[11px] font-black uppercase tracking-[0.17em] text-orange">Next step</p>
            <h2 className="mt-3 text-center text-2xl font-black leading-tight text-navy sm:text-3xl">
              Talk through your project with our team.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-stone-600">
              Choose an available time to discuss your current deal, potential scope, and the right level of support.
              Booking a call is free and does not commit you to a paid service.
            </p>
            <BookingCalendarEmbed />
            <p className="mt-4 text-center text-xs text-stone-500">
              No time that works? Call <a className="font-bold underline" href={'tel:' + SITE_CONFIG.phoneTel}>{SITE_CONFIG.phone}</a>.
            </p>
          </section>
        ) : null}

        {step !== 5 ? (
          <p className="mt-5 text-center text-xs leading-relaxed text-stone-500">
            No credit card · No obligation · Assessment based on your answers
          </p>
        ) : null}
      </section>

      <section className="mx-auto grid max-w-4xl gap-5 px-5 pb-16 sm:grid-cols-3 sm:px-6">
        {[
          { title: 'Licensed in NC', body: SITE_CONFIG.license.formatted },
          { title: 'Built around the deal', body: 'Budgets, scopes, and execution support' },
          { title: 'One step at a time', body: 'Get the support you need at your stage' },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-stone-200 bg-white px-5 py-5 text-center">
            <p className="text-sm font-extrabold text-navy">{item.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-stone-600">{item.body}</p>
          </div>
        ))}
      </section>

      <footer className="border-t border-stone-200 px-4 py-7 text-center text-xs leading-relaxed text-stone-500">
        {SITE_CONFIG.legalLine} · {SITE_CONFIG.license.formatted}
        <span className="mx-2">·</span>
        <Link href="/privacy" className="underline hover:text-orange">Privacy</Link>
        <span className="mx-2">·</span>
        <Link href="/terms" className="underline hover:text-orange">Terms</Link>
      </footer>
    </main>
  );
}
