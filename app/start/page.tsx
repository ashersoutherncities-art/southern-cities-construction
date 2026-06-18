import type { Metadata } from 'next';
import Script from 'next/script';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  title: "Let's Connect | Southern Cities Construction",
  description:
    "Tell us about your project — pricing a deal, managing a build, or a licensed NC GC to run the whole thing. We'll point you to the right next step.",
  alternates: { canonical: '/start' },
  openGraph: {
    type: 'website',
    url: '/start',
    title: "Let's Connect — Southern Cities Construction",
    description:
      "Pricing a deal, managing a build, or need a licensed NC GC? Tell us about your project and we'll route you to the right next step.",
    siteName: 'Southern Cities Construction',
  },
};

export default function StartPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <SiteNav variant="solid" />

      <section className="container-pro pt-28 pb-8 lg:pt-36 lg:pb-10">
        <div className="max-w-2xl">
          <p className="eyebrow">Let&apos;s Connect</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Tell us about your project.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-stone-700">
            Pricing a deal, managing a build, or need a licensed NC GC to run the whole thing? Fill this
            out and we&apos;ll point you to the right next step — one licensed NC GC, the whole way up.
            No pressure, no spam.
          </p>
        </div>
      </section>

      <section className="container-pro pb-20 lg:pb-28">
        <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-elev-1">
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/gaXhIs0VsXmdJzbIZdbT"
            id="inline-gaXhIs0VsXmdJzbIZdbT"
            title="Southern Cities Construction — Let's Connect"
            style={{ width: '100%', height: '1341px', border: 'none', borderRadius: '8px' }}
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Form 15"
            data-height="1341"
            data-layout-iframe-id="inline-gaXhIs0VsXmdJzbIZdbT"
            data-form-id="gaXhIs0VsXmdJzbIZdbT"
          />
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-stone-500">
          Licensed in North Carolina · {SITE_CONFIG.license.formatted} · Call{' '}
          <a
            href={`tel:${SITE_CONFIG.phoneTel}`}
            className="font-semibold text-navy underline decoration-orange decoration-2 underline-offset-4"
          >
            {SITE_CONFIG.phone}
          </a>
        </p>
      </section>

      {/* Free consult booking — GHL "Schedule an Appointment" calendar */}
      <section className="container-pro pb-20 lg:pb-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-stone-200" />
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-stone-400">or</span>
            <div className="h-px flex-1 bg-stone-200" />
          </div>
          <p className="eyebrow mt-8">Book a free consult</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Grab a time directly.</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-stone-600">
            Prefer to talk it through? Pick a free consult with a licensed NC GC — straight onto the calendar.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-elev-1">
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/5rHsWSpZrV7SjTfwp99I"
            title="Book a free consult — Southern Cities Construction"
            style={{ width: '100%', minHeight: '700px', border: 'none', overflow: 'hidden' }}
            scrolling="no"
            id="5rHsWSpZrV7SjTfwp99I_start"
          />
        </div>
      </section>

      <SiteFooter />

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </div>
  );
}
