import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export const metadata = {
  title: 'Terms of Use | Southern Cities Construction',
  description:
    'Terms of use for the Southern Cities Construction website and digital products.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <SiteNav variant="solid" />
      <section className="container-pro pt-14 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-3xl rounded-3xl border border-navy/[0.08] bg-white p-8 sm:p-12 shadow-elev-1">
          <p className="eyebrow">Terms</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-navy-900">Terms of Use</h1>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/70">
            <p>Information on this website is provided for general business and service information. Submission of a form, application, or purchase request does not by itself create a contractor-client relationship for a full project scope.</p>
            <p>Project scopes, pricing, timelines, and contract obligations are finalized only through direct review, written approval, and executed project documents where required.</p>
            <p>Digital resources, consultations, and paid services sold through this website are subject to the specific scope and delivery terms attached to that service.</p>
            <p>By opting in through a website form, you agree that Southern Cities Construction may contact you by phone or SMS about your inquiry, scheduling, service updates, and related project communication. Message and data rates may apply. Message frequency varies. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase.</p>
            <p>Southern Cities Construction may update website content, pricing, offerings, and availability without notice.</p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
