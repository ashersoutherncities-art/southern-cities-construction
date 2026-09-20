import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import FounderStory from '@/components/FounderStory';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata = {
  title: 'About | Southern Cities Construction',
  description:
    'Southern Cities Construction is a licensed North Carolina General Contractor (#107724) operating as the outsourced construction department for real estate investors, wholesalers, and realtors — from deal screening through the build.',
  alternates: { canonical: '/about' },
};

const JOURNEY = [
  { n: '01', label: 'SCREEN', body: 'Run any NC property through the free rehab budget tool for an instant range and risk read.' },
  { n: '02', label: 'ANALYZE', body: 'A licensed GC reviews the deal directly — the Construction Desk Review most GCs won’t do before you own it.' },
  { n: '03', label: 'PLAN', body: 'The Build-Ready Deal Pack turns the analysis into a committed, sealed rehab price and a real scope of work.' },
  { n: '04', label: 'PROCURE', body: 'That scope goes out to vetted local contractors as a real Bid Package, and every proposal — including our own — is compared transparently.' },
  { n: '05', label: 'BUILD', body: 'Southern Cities executes, or the investor takes the vetted, compared bids to the contractor of their choice.' },
];

export default function AboutPage() {
  return (
    <>
      <SiteNav variant="solid" />
      <div className="min-h-screen" style={{ background: 'var(--paper)', color: 'var(--ink-mid)' }}>
        <section className="im-shell">
          <div className="im-container pt-40 pb-20">
            <p className="im-eyebrow im-eyebrow--on-dark">About Southern Cities Construction</p>
            <h1 className="im-display im-display--on-dark mt-4 text-[2.4rem] sm:text-[3.5rem] max-w-3xl">
              Your construction department for real estate investing.
            </h1>
            <p className="im-body im-body--on-dark mt-6 max-w-2xl text-lg">
              Southern Cities Construction is a licensed North Carolina General Contractor
              &mdash; License {SITE_CONFIG.license.formatted} &mdash; built to sit inside an
              investor&rsquo;s deal flow, not outside it: screening a property before you buy
              it, pricing the rehab before you close, and getting the work actually bid and
              built once you own it.
            </p>
          </div>
        </section>

        <section className="im-paper">
          <div className="im-container im-section">
            <p className="im-eyebrow">The journey</p>
            <h2 className="im-h2 mt-4 text-[2rem] sm:text-[2.75rem] max-w-2xl">
              SCREEN. ANALYZE. PLAN. PROCURE. BUILD.
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {JOURNEY.map((step) => (
                <div key={step.n} className="im-card">
                  <span className="im-mono text-[11px]" style={{ color: 'var(--accent)' }}>{step.n}</span>
                  <p className="mt-2 text-[13px] font-black uppercase tracking-[0.14em]" style={{ color: 'var(--ink-hi)' }}>{step.label}</p>
                  <p className="im-body mt-3 text-[14px] leading-[1.6]">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="im-band">
          <div className="im-container im-section">
            <FounderStory
              theme="light"
              productName="the Construction Department"
              wedge="review a deal you don’t own yet"
              cta={{ label: 'Analyze a deal →', href: '/lp/rehab-budget-range-execution-risk-snapshot' }}
            />
          </div>
        </section>

        <section className="im-paper">
          <div className="im-container im-section text-center">
            <p className="im-body max-w-2xl mx-auto text-lg">
              Have a project already in motion?{' '}
              <Link href="/start" className="underline underline-offset-4 hover:text-orange" style={{ color: 'var(--ink-hi)' }}>
                Talk to Southern Cities &rarr;
              </Link>
            </p>
          </div>
        </section>
      </div>
      <SiteFooter />
    </>
  );
}
