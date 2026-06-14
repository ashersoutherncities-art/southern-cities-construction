import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Book a Project Call | Southern Cities Construction',
  description:
    'Book a project call with Southern Cities Construction. Pick the path that fits your role — homeowner, investor, wholesaler, or realtor — and get on the calendar with a licensed NC GC.',
  alternates: { canonical: '/book' },
  openGraph: {
    type: 'website',
    url: '/book',
    title: 'Book a Project Call',
    description:
      'Pick the path that fits your role — homeowner, investor, wholesaler, or realtor — and get on the calendar with a licensed NC GC.',
    siteName: 'Southern Cities Construction',
  },
};

type BookingPath = {
  role: 'Homeowner' | 'Investor' | 'Wholesaler' | 'Realtor';
  description: string;
  href: string;
  whoFor: string;
};

const PATHS: BookingPath[] = [
  {
    role: 'Homeowner',
    description: 'Renovation, addition, rehab, or new build — get a clear next step before you spend more.',
    href: '/services/homeowners/owner-consultation',
    whoFor: 'You own (or are buying) the house and want a licensed NC GC behind the project.',
  },
  {
    role: 'Investor',
    description: 'Deal review, execution oversight, draws, and full contracting across your portfolio.',
    href: '/platform',
    whoFor: 'You buy residential property to rent, flip, or hold — and want construction made buyable.',
  },
  {
    role: 'Wholesaler',
    description: 'GC-verified Deal Packs that let you close $25–40K+ assignments instead of $5K chops.',
    href: '/deal-pack',
    whoFor: 'You source residential deals in NC and want a builder behind your number at the closing table.',
  },
  {
    role: 'Realtor',
    description: 'Inspection response, pre-offer reads, listing prep, and monthly support for active agents.',
    href: '/services/realtors',
    whoFor: 'You sell residential property in NC and want a GC partner who answers the construction questions.',
  },
];

export default function BookPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <SiteNav variant="solid" />

      <section className="container-pro pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="max-w-3xl">
          <p className="eyebrow">Book a Project Call</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Pick the path that fits you.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-stone-700">
            One licensed NC GC, four ways to work together. Tap the role that matches you and we&apos;ll route you to the right consultation.
          </p>
        </div>
      </section>

      <section className="container-pro pb-24 lg:pb-32">
        <div className="grid gap-5 sm:grid-cols-2">
          {PATHS.map((path) => (
            <Link
              key={path.role}
              href={path.href}
              className="group rounded-2xl border border-stone-200 bg-white p-7 shadow-elev-1 transition-all hover:border-navy/30 hover:shadow-elev-2"
            >
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">For {path.role}s</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-navy">{path.role}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{path.description}</p>
              <p className="mt-4 text-[13px] leading-relaxed text-stone-500">
                <span className="font-semibold text-stone-600">Who this is for:</span> {path.whoFor}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-navy group-hover:text-orange">
                Continue
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-7 text-center shadow-elev-1">
          <p className="text-sm text-stone-700">
            Not sure which one fits? Call us at{' '}
            <a href={`tel:${SITE_CONFIG.phoneTel}`} className="font-bold text-navy underline decoration-orange decoration-2 underline-offset-4">
              {SITE_CONFIG.phone}
            </a>{' '}
            or email{' '}
            <a href={`mailto:${SITE_CONFIG.emailInfo}`} className="font-bold text-navy underline decoration-orange decoration-2 underline-offset-4">
              {SITE_CONFIG.emailInfo}
            </a>
            .
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
