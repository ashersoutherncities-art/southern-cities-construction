import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { avatarOverviewCards } from '@/lib/services-data';

export default function ServicesOverviewPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SiteNav variant="solid" />

      <section className="relative overflow-hidden bg-navy-900 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#163061_0%,#10254c_100%)]" />
        <div className="relative z-10 container-pro">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-4xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                Services
              </div>
              <h1 className="mb-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Find the right construction support for your project.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-white sm:text-xl">
                Southern Cities helps residential projects move with clearer planning, better coordination, permit support, and stronger oversight. Start with the page that fits your role.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#roles" className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white">
                  Explore by Role
                </a>
                <Link href="/recurring-support" className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white">
                  View Recurring Support
                </Link>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-white/15 bg-white p-7 text-navy shadow-[0_24px_60px_rgba(6,18,43,0.28)]">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">How to use this page</p>
              <div className="space-y-5 text-sm leading-relaxed text-stone-700">
                <div>
                  <p className="font-semibold text-navy">Start with your role</p>
                  <p>Choose the page that matches the kind of project, deal, or support you are dealing with.</p>
                </div>
                <div>
                  <p className="font-semibold text-navy">Use one-time services when the need is specific</p>
                  <p>If you already know the file or project that needs help, start with that page’s one-time services.</p>
                </div>
                <div>
                  <p className="font-semibold text-navy">Use recurring support when the same problem keeps coming back</p>
                  <p>If the support need repeats across active work, recurring plans may be the better fit.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="roles" className="bg-white py-20 sm:py-24">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Choose your page</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Go straight to the service page that matches how you are involved.</h2>
            <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
              The overview stops here on purpose. The real detail lives on the role-specific pages below.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-6">
            {avatarOverviewCards.map((card) => (
              <div key={card.href} className="flex w-full md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]">
                <div className="flex h-full w-full flex-col rounded-[22px] border border-stone-200 bg-white p-6 shadow-elev-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{card.eyebrow}</p>
                  <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-navy">{card.title}</h3>
                  <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-stone-700">
                    <p><strong className="text-navy">Main pain:</strong> {card.pain}</p>
                    <p><strong className="text-navy">What Southern Cities helps create:</strong> {card.outcome}</p>
                  </div>
                  <Link href={card.href} className="mt-auto inline-flex items-center justify-center rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-700">
                    {card.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-stone-50 py-16 sm:py-20">
        <div className="container-pro grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Not sure where you fit?</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">You do not need to guess the perfect lane before reaching out.</h2>
            <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-stone-700">
              <p>If you own the house and need project help, start with Homeowners.</p>
              <p>If this is rental or investment property, start with Investors.</p>
              <p>If you are protecting a listing or transaction, start with Realtors.</p>
              <p>If you are doing the work and need office, permit, or inspection help, start with Contractors.</p>
              <p>If you are planning or managing larger residential work, start with Developers / Landowners.</p>
            </div>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-white p-7 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Need help choosing?</p>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700">
              If you are not sure which page fits, use the contact form below and Southern Cities can point you to the right next step.
            </p>
            <a href="#contact" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white">
              Request Help Choosing
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-pro rounded-[28px] border border-stone-200 bg-stone-50 p-8 sm:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Recurring support</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Some clients need one-time help. Others need monthly support.</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone-700 sm:text-lg">
            Southern Cities also offers recurring support plans for repeat construction-side pain like permit drag, inspection coordination, budget questions, project babysitting, and weak control across active work.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/recurring-support" className="inline-flex items-center justify-center rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-700">
              Explore Recurring Support Plans
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-navy-950 py-20 sm:py-24 text-white">
        <div className="container-pro max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Contact</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Not sure where to start?</h2>
          <p className="mt-4 text-base leading-relaxed text-white/82 sm:text-lg">
            Tell Southern Cities what is happening and the right next step can be identified without forcing you through the wrong page first.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/services/homeowners" className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white">
              Start with Homeowners
            </Link>
            <Link href="/services/investors" className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white">
              Start with Investors
            </Link>
            <Link href="/recurring-support" className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
