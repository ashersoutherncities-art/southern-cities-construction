import type { Metadata } from 'next';
import Image from 'next/image';
import ConfirmationPageTracker from '@/components/analytics/ConfirmationPageTracker';
import { SITE_CONFIG, logoFor } from '@/lib/site-config';

export const metadata: Metadata = {
  title: "You're Booked | Southern Cities Construction",
  robots: { index: false, follow: false },
  // Required on every page per the root layout's own warning — without this,
  // canonical + og:url silently inherit the homepage default, which breaks
  // both SEO and any tracking system (Meta Pixel, GHL attribution, etc.)
  // that reads page URL from these tags instead of window.location.
  alternates: { canonical: '/consultation/confirmed' },
  openGraph: {
    type: 'website',
    url: '/consultation/confirmed',
    title: "You're Booked",
    siteName: 'Southern Cities Construction',
  },
};

export default function ConsultationConfirmedPage() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <ConfirmationPageTracker />
      <header className="border-b border-stone-200 bg-white">
        <div className="container-pro flex items-center justify-between gap-3 py-4">
          <Image src={logoFor('light')} alt={SITE_CONFIG.name} width={220} height={85} className="h-8 w-auto shrink min-w-0 sm:h-10" priority />
          <a
            href={`tel:${SITE_CONFIG.phoneTel}`}
            className="shrink-0 whitespace-nowrap text-[13px] font-bold text-navy underline decoration-orange decoration-2 underline-offset-4"
            aria-label={`Call ${SITE_CONFIG.phone}`}
          >
            <span className="sm:hidden">Call</span>
            <span className="hidden sm:inline">{SITE_CONFIG.phone}</span>
          </a>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange shadow-elev-2">
            <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="mt-7 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            You&apos;re Booked.
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-stone-700">
            Your construction consultation is on the calendar. We&apos;ve sent a confirmation to your email with
            the details, and you&apos;ll get a reminder before the call.
          </p>

          <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-7 text-left shadow-elev-1">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">What to expect</p>
            <ul className="mt-4 space-y-4">
              {[
                'A licensed NC general contractor will call you at your scheduled time — no sales rep, no script.',
                'Have the property address handy, and any plans, inspection reports, or estimates you already have.',
                "No pressure, no obligation. We'll tell you what we see and let you decide what's next.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange/15 text-[11px] font-black text-orange">
                    ✓
                  </span>
                  <span className="text-[14.5px] leading-relaxed text-stone-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mx-auto mt-8 max-w-md text-[13.5px] leading-relaxed text-stone-500">
            Need to change the time? Use the reschedule or cancel link in your confirmation email — no need to call
            unless it&apos;s easier for you.
          </p>

          <p className="mt-6 text-[13px] text-stone-500">
            Questions in the meantime?{' '}
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="font-bold text-navy underline decoration-orange decoration-2 underline-offset-4"
            >
              {SITE_CONFIG.phone}
            </a>
          </p>

          <a
            href="/gallery"
            className="mt-10 inline-flex items-center gap-2 text-[13px] font-bold text-navy hover:text-orange"
          >
            See more of our work while you wait →
          </a>
        </div>
      </main>

      <footer className="border-t border-stone-200 bg-white py-8">
        <div className="container-pro text-center text-[12px] text-stone-500">
          <p>{SITE_CONFIG.legalLine}</p>
          <p className="mt-1">{SITE_CONFIG.license.formatted}</p>
        </div>
      </footer>
    </div>
  );
}
