import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export const metadata = {
  title: 'Privacy Policy | Southern Cities Construction',
  description:
    'How Southern Cities Construction collects, uses, and protects information from site visitors and clients.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <SiteNav variant="solid" />
      <section className="container-pro pt-14 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-3xl rounded-3xl border border-navy/[0.08] bg-white p-8 sm:p-12 shadow-elev-1">
          <p className="eyebrow">Privacy</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-navy-900">Privacy Policy</h1>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/70">
            <p>Southern Cities Construction collects contact and project information you submit through this website so we can respond to inquiries, review projects, process purchases, and manage client onboarding.</p>
            <p>We may store your name, email, phone number, project details, billing details, and related submission data in our internal systems and service providers.</p>
            <p>We do not sell your personal information. We may share information with service providers involved in payments, hosting, CRM, portal delivery, and project communication when needed to operate the business.</p>
            <p>If you opt in to receive text messages from Southern Cities Construction, we may use your phone number to send conversational and service-related SMS messages about your inquiry, scheduling, project updates, and support requests. Message and data rates may apply. Message frequency varies. Reply STOP to opt out. Reply HELP for help.</p>
            <p>SMS consent is not shared with third parties or affiliates for their marketing purposes.</p>
            <p>If you need to update or request deletion of your information, contact us through the website or email the business directly.</p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
