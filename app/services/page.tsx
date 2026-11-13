import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export const metadata = {
  title: 'Construction Services — Screen, Plan & Build | Southern Cities Construction',
  description: 'Start with a free rehab budget screen, get a defined scope and GC-backed Deal Pack, or move into construction with Southern Cities.',
  alternates: { canonical: '/services' },
};

const stages = [
  {
    label: '01 · Screen', title: 'Check the project before you go further.',
    description: 'Use the free rehab tool for a directional budget range and execution risks. This is a starting screen, not a committed construction price.',
    price: 'Free', detail: 'No login required',
    href: '/lp/rehab-budget-range-execution-risk-snapshot', cta: 'Screen a project',
  },
  {
    label: '02 · Plan', title: 'Get the scope and the real rehab number.',
    description: 'Compare Bid-Ready and Build-Ready. Choose the budget detail, plans, and documentation you need before committing to a purchase or construction.',
    price: 'From $599', detail: 'Bid-Ready $599 · Build-Ready $1,997',
    href: '/deal-pack', cta: 'Compare Deal Packs',
  },
  {
    label: '03 · Build', title: 'Put the plan to work.',
    description: 'Bring a defined project into construction, procurement, and delivery with an accountable licensed North Carolina general contractor.',
    price: 'Scoped per project', detail: 'Based on the work, property, and timing',
    href: '/construction', cta: 'Explore construction',
  },
];

export default function ServicesOverviewPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen overflow-x-hidden" style={{ background: 'var(--paper)', color: 'var(--ink-mid)' }}>
        <section className="p-hero">
          <div className="p-hero-bg" aria-hidden="true" />
          <div className="p-hero-grid" aria-hidden="true" />
          <div className="im-container pt-32 sm:pt-40 pb-20 sm:pb-24 relative">
            <span className="p-eyebrow-pill"><span className="p-eyebrow-dot" aria-hidden="true" />Construction services</span>
            <h1 className="im-display im-display--on-dark mt-8 text-[2.5rem] sm:text-[3.75rem] lg:text-[4.75rem] max-w-4xl">
              Start with your project. <span className="p-gradient-text">Screen. Plan. Build.</span>
            </h1>
            <p className="im-body im-body--on-dark mt-6 max-w-2xl text-lg">
              One service path, backed by a licensed North Carolina general contractor. Choose what you need done and where you are in the process.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/deal-pack" className="im-btn im-btn--primary">Compare Deal Packs &rarr;</Link>
              <a href="#services" className="im-btn im-btn--ghost-on-dark">Explore the steps &darr;</a>
            </div>
          </div>
        </section>
        <section id="services" className="im-paper scroll-mt-24">
          <div className="im-container im-section">
            <p className="im-eyebrow">Choose your next step</p>
            <h2 className="im-h2 mt-4 text-[2.25rem] sm:text-[3rem] max-w-3xl">The right construction help at the right stage.</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {stages.map((stage) => (
                <Link key={stage.href} href={stage.href} className="im-door flex flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange">
                  <span className="im-door__label">{stage.label}</span>
                  <h3 className="im-door__title mt-3">{stage.title}</h3>
                  <p className="im-door__meta">{stage.description}</p>
                  <div className="mt-auto pt-6">
                    <p className="text-xl font-bold" style={{ color: 'var(--ink-hi)' }}>{stage.price}</p>
                    <p className="mt-2 text-sm">{stage.detail}</p>
                    <span className="im-door__cta mt-4">{stage.cta} &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="im-band">
          <div className="im-container im-section">
            <h2 className="im-h2 text-3xl">Need help choosing?</h2>
            <p className="im-body mt-4 max-w-2xl">Tell us the property, the work you are considering, and your timing. We will help identify the next step and confirm the scope and payment terms.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/start" className="im-btn im-btn--primary">Discuss your project &rarr;</Link>
              <Link href="/services/all" className="im-btn">View all services &amp; pricing &rarr;</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
