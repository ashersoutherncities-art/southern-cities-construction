'use client';

import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import { avatarOverviewCards } from '@/lib/services-data';

export default function ServicesOverviewPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SiteNav variant="solid" />

      <section className="relative overflow-hidden bg-navy-900 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#163061_0%,#10254c_100%)]" />
        <div className="relative z-10 container-pro">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" />
              Services
            </div>
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Find the right construction support for your project.
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-white sm:text-xl">
              Start with the page that fits your role. Some work can be bought now. Some can be priced from a few details.
              Some needs a real review first.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#roles" className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white">
                See Service Pages
              </a>
              <a href="/recurring-support" className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white">
                See Monthly Support
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-16 sm:py-20">
        <div className="container-pro max-w-4xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">How to buy from Southern Cities</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy">Buy Now</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
                Use this when one property, one file, or one decision needs a clear answer.
              </p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy">Priced from Simple Inputs</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
                Use this when a few project details can set pricing without a full review.
              </p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy">Needs Review</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
                Use this when the work is active, messy, larger, or too variable to price responsibly without looking first.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="roles" className="bg-white py-20 sm:py-24">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Choose your page</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Go straight to the service page that matches how you are involved.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
              Start with the role you are in now. The detail lives on the page built for that kind of project, deal, or workload.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {avatarOverviewCards.map((card) => (
              <div key={card.href} className="flex h-full flex-col rounded-[28px] border border-stone-200 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{card.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-navy">{card.title}</h3>
                <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-stone-700">
                  <p>
                    <strong className="text-navy">Main issue:</strong> {card.pain}
                  </p>
                  <p>
                    <strong className="text-navy">What gets better:</strong> {card.outcome}
                  </p>
                </div>
                <div className="mt-6 pt-2">
                  <Link href={card.href} className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                    {card.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-stone-50 py-20 sm:py-24">
        <div className="container-pro max-w-4xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Monthly support</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Monthly plans are for repeat work, not one-off jobs.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
            Use a monthly plan when the same type of delay, follow-up, or decision problem keeps coming back across deals, listings, active jobs, turns, or repeat files.
          </p>
          <div className="mt-6">
            <Link href="/recurring-support" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
              Review Monthly Support Plans
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-pro rounded-[28px] border border-stone-200 bg-stone-50 p-8 sm:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Not sure where to start?</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            You do not need to guess the perfect page before reaching out.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone-700 sm:text-lg">
            If you are not sure which page fits, start with the contact form and Southern Cities can point you to the right next step.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white">
              Request Help Choosing
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-navy-950 py-20 sm:py-24 text-white">
        <div className="container-pro max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Contact</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Need help choosing?</h2>
          <p className="mt-4 text-base leading-relaxed text-white/88 sm:text-lg">
            If you are not sure which page or purchase path fits, start here and Southern Cities can point you to the right next step.
          </p>
          <div className="mt-6">
            <Link href="/services/homeowners#contact" className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-orange hover:text-orange">
              Start with Contact Form
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
