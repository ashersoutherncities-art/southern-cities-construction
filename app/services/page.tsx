'use client';

import { useState } from 'react';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import CartNavLink from '@/components/CartNavLink';

const NAVY = '#132452';
const ORANGE = '#fa8c41';

type ServiceCard = {
  title: string;
  price: string;
  summary: string;
  bullets: string[];
  cta: string;
  itemKey?: string;
  ctaHref?: string;
  badge?: string;
};

const START_HERE_CARDS: ServiceCard[] = [
  {
    title: 'Permit Administration',
    price: '$1,500-$3,500 per permit',
    summary: 'Best when you need help getting plans, submissions, corrections, and inspections across the line.',
    bullets: [
      'Permit application and submission support',
      'Correction handling and follow-up',
      'Inspection coordination',
      'Clear path into checkout and onboarding',
    ],
    cta: 'Add to Cart',
    itemKey: 'permit-management-service',
    badge: 'Buy Now',
  },
  {
    title: 'Home Assessment',
    price: '$299',
    summary: 'Best first step when you need scope clarity before deciding on repairs or renovation work.',
    bullets: [
      'Property walkthrough',
      'Scope and condition review',
      'Clear next-step recommendation',
      'Useful before quoting larger work',
    ],
    cta: 'Add to Cart',
    itemKey: 'inspection-response-service',
    badge: 'Best First Step',
  },
  {
    title: 'Custom Project Quote',
    price: 'Custom pricing',
    summary: 'Best when the project is larger, more variable, or needs review before a real number can be given.',
    bullets: [
      'Renovations and larger scopes',
      'Ground-up or major residential work',
      'Overflow project execution',
      'Use the form below to start',
    ],
    cta: 'Request a Quote',
    ctaHref: '#contact',
    badge: 'Custom Scope',
  },
];

const CORE_SERVICES: ServiceCard[] = [
  {
    title: 'Permit Administration',
    price: '$1,500-$3,500 per permit',
    summary: 'For owners, contractors, and operators who need permit handling done correctly and pushed through.',
    bullets: [
      'Application prep and submission',
      'Municipal follow-up',
      'Correction response coordination',
      'Inspection scheduling support',
    ],
    cta: 'Add to Cart',
    itemKey: 'permit-management-service',
  },
  {
    title: 'Construction Oversight',
    price: 'Custom scope',
    summary: 'For projects that need more structure, milestone control, documentation, and issue escalation.',
    bullets: [
      'Milestone tracking',
      'Project compliance checkpoints',
      'Progress documentation expectations',
      'Oversight tied to signed project obligations',
    ],
    cta: 'Request Oversight Plan',
    ctaHref: '#contact',
  },
  {
    title: 'Overflow Project Partner',
    price: '15-20% of project',
    summary: 'For general contractors who need help carrying overflow work without dropping execution quality.',
    bullets: [
      'Overflow capacity support',
      'Southern Cities execution layer',
      'Weekly progress reporting',
      'Custom review before onboarding',
    ],
    cta: 'Let\'s Talk',
    ctaHref: '#contact',
  },
];

const AUDIENCE_PATHS = [
  {
    title: 'General Contractors',
    text: 'Start with Permit Administration if the main problem is permitting. Use Overflow Project Partner if the problem is capacity.',
  },
  {
    title: 'Homeowners',
    text: 'Start with Home Assessment if you need clarity first. Use the quote form if you already know the project is bigger.',
  },
  {
    title: 'Realtors',
    text: 'Use inspection-response or listing-prep style services when deals are slowing down because of repair scope.',
  },
  {
    title: 'Subcontractors',
    text: 'The right path is network membership and structured workflow participation, not retail checkout.',
  },
  {
    title: 'Investors',
    text: 'If you need deal review, operator guidance, or acquisition-side support, go to Southern Cities Investors.',
  },
];

const REALTOR_SERVICES: ServiceCard[] = [
  {
    title: 'Pre-Listing Renovation',
    price: '$5,000-$15,000',
    summary: 'For agents and owners who need a property cleaned up before going to market.',
    bullets: [
      'Paint, flooring, bath, and kitchen refresh scope',
      'Fast-turn listing prep',
      'Coordinated around listing timeline',
      'Quote required before full start',
    ],
    cta: 'Add to Cart',
    itemKey: 'pre-listing-renovation',
  },
  {
    title: 'Inspection Response Service',
    price: '$299 assessment',
    summary: 'For deals where inspection items are threatening close probability and someone needs a fast read.',
    bullets: [
      'Inspection issue review',
      'Repair-path recommendation',
      'Useful before committing to full repair scope',
      'Fast-turn starting point',
    ],
    cta: 'Add to Cart',
    itemKey: 'inspection-response-service',
  },
  {
    title: 'Referral Partner Program',
    price: '5-10% referral fee',
    summary: 'For agents who want a repeat referral relationship with renovation and project support behind it.',
    bullets: [
      'Referral-based relationship',
      'We handle project execution after intro',
      'Best for agents with repeat renovation needs',
      'Relationship setup required',
    ],
    cta: 'Become a Partner',
    ctaHref: '/realtor',
  },
];

function Card({ card }: { card: ServiceCard }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm" style={{ borderTop: `4px solid ${NAVY}` }}>
      {card.badge && (
        <span className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: ORANGE }}>
          {card.badge}
        </span>
      )}

      <div className="flex flex-1 flex-col p-8">
        <h3 className="mb-2 text-2xl font-extrabold" style={{ color: NAVY }}>{card.title}</h3>
        <p className="mb-4 text-2xl font-bold" style={{ color: ORANGE }}>{card.price}</p>
        <p className="mb-6 text-sm leading-relaxed text-gray-600">{card.summary}</p>

        <ul className="mb-8 flex-1 space-y-3">
          {card.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2 text-[15px] text-gray-600">
              <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: ORANGE }} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {card.itemKey ? (
          <AddToCartButton
            itemKey={card.itemKey}
            label={card.cta}
            className="inline-block w-full rounded-full py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:opacity-90"
          />
        ) : (
          <a
            href={card.ctaHref || '#contact'}
            className="inline-block w-full rounded-full py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: ORANGE }}
          >
            {card.cta}
          </a>
        )}
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text: string; light?: boolean }) {
  return (
    <div className="mb-12 max-w-3xl">
      <p className="mb-3 text-sm font-bold uppercase tracking-widest" style={{ color: ORANGE }}>{eyebrow}</p>
      <h2 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ color: light ? '#fff' : NAVY }}>{title}</h2>
      <p className="text-lg leading-relaxed" style={{ color: light ? 'rgba(255,255,255,0.7)' : '#6b7280' }}>{text}</p>
    </div>
  );
}

export default function ServicesPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    audience_type: '',
    service: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', audience_type: '', service: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <nav className="sticky top-0 z-50 border-b border-white/10" style={{ backgroundColor: NAVY }}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/">
            <img src="/sc-construction-logo.png" alt="Southern Cities Construction" className="h-11 w-auto" />
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="hidden text-sm font-medium text-white/70 transition-colors hover:text-white sm:block">Home</Link>
            <Link href="/services" className="border-b-2 pb-0.5 text-sm font-semibold text-white" style={{ borderColor: ORANGE }}>Services</Link>
            <CartNavLink className="hidden text-sm font-medium text-white/70 transition-colors hover:text-white sm:block" />
            <a href="https://clients.southerncitiesconstruction.com" target="_blank" rel="noopener noreferrer" className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: ORANGE }}>Client Portal</a>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden py-24 sm:py-32" style={{ backgroundColor: NAVY }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-8">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest" style={{ color: ORANGE }}>Construction Services</p>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Clear services, clear starting points, clear next step
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-white/65 sm:text-xl">
            This page should help someone understand what Southern Cities Construction actually sells, what can be bought now, and what needs a custom quote.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 p-6 text-left" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
              <p className="mb-2 font-semibold text-white">Buy now</p>
              <p className="text-sm leading-relaxed text-white/65">Use cart checkout for fixed-entry services with a defined starting price.</p>
            </div>
            <div className="rounded-2xl border border-white/10 p-6 text-left" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
              <p className="mb-2 font-semibold text-white">Request a quote</p>
              <p className="text-sm leading-relaxed text-white/65">Use the form for larger or variable-scope work that needs review first.</p>
            </div>
            <div className="rounded-2xl border border-white/10 p-6 text-left" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
              <p className="mb-2 font-semibold text-white">Need investor help?</p>
              <p className="text-sm leading-relaxed text-white/65">Acquisition and operator advisory work belongs on Southern Cities Investors, not here.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionHeader
            eyebrow="Start Here"
            title="Most visitors only need one of these three paths"
            text="Instead of sorting through five different audience lanes first, start with the service type that matches the actual job to be done."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {START_HERE_CARDS.map((card) => (
              <Card key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionHeader
            eyebrow="Core Services"
            title="What Southern Cities Construction is actually offering"
            text="These are the main service buckets. Some have a defined checkout path. Others need custom review before pricing and onboarding."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {CORE_SERVICES.map((card) => (
              <Card key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionHeader
            eyebrow="Audience Guide"
            title="If you still want to sort by audience, use this"
            text="This keeps the audience guidance short and useful instead of forcing the whole page to be organized around role labels."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {AUDIENCE_PATHS.map((path) => (
              <div key={path.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="mb-2 text-lg font-bold" style={{ color: NAVY }}>{path.title}</p>
                <p className="text-sm leading-relaxed text-gray-600">{path.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionHeader
            eyebrow="Realtor Services"
            title="Useful when a deal is slowing down because of condition, repairs, or listing readiness"
            text="These are the clearest agent-facing services on the construction side."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {REALTOR_SERVICES.map((card) => (
              <Card key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 sm:p-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest" style={{ color: ORANGE }}>Simple Rule</p>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: NAVY }}>If you can buy it now, we show a starting price. If not, we ask for the project first.</h2>
            <p className="max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
              That is the cleanest way to understand this page. Fixed-entry services go through cart and portal checkout. Bigger scopes, renovations, and oversight-heavy work go through project review first.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 sm:py-28" style={{ backgroundColor: NAVY }}>
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest" style={{ color: ORANGE }}>Request a Quote</p>
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Tell us about the project</h2>
            <p className="text-lg text-white/60">Use this for custom pricing, larger scopes, oversight requests, or anything that does not fit a simple buy-now path.</p>
          </div>

          {submitted ? (
            <div className="rounded-2xl p-10 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: `1px solid ${ORANGE}` }}>
              <h3 className="mb-2 text-2xl font-bold text-white">We received your request.</h3>
              <p className="text-white/60">We will review the project and follow up with the right next step.</p>
              <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-semibold underline" style={{ color: ORANGE }}>Submit another request</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl p-8 sm:p-10" style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/80">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" className="w-full rounded-xl px-4 py-3 text-[15px] text-white focus:outline-none" style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@email.com" className="w-full rounded-xl px-4 py-3 text-[15px] text-white focus:outline-none" style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(704) 000-0000" className="w-full rounded-xl px-4 py-3 text-[15px] text-white focus:outline-none" style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">I am a...</label>
                  <select name="audience_type" value={formData.audience_type} onChange={handleChange} className="w-full cursor-pointer appearance-none rounded-xl px-4 py-3 text-[15px] text-white focus:outline-none" style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <option value="" style={{ color: '#000' }}>Select one...</option>
                    <option value="General Contractor" style={{ color: '#000' }}>General Contractor</option>
                    <option value="Investor" style={{ color: '#000' }}>Investor</option>
                    <option value="Subcontractor" style={{ color: '#000' }}>Subcontractor</option>
                    <option value="Homeowner" style={{ color: '#000' }}>Homeowner</option>
                    <option value="Realtor" style={{ color: '#000' }}>Realtor</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">Service</label>
                  <input type="text" name="service" value={formData.service} onChange={handleChange} placeholder="Permit help, oversight, renovation quote, listing prep..." className="w-full rounded-xl px-4 py-3 text-[15px] text-white focus:outline-none" style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-white/80">Project details</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Tell us what the project is, where it stands, and what kind of help you need..." className="w-full resize-none rounded-xl px-4 py-3 text-[15px] text-white focus:outline-none" style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
              </div>

              {error && <p className="text-center text-sm text-red-400">{error}</p>}

              <button type="submit" disabled={submitting} className="w-full rounded-full py-4 text-lg font-bold text-white transition-all duration-300 hover:opacity-90 disabled:opacity-60" style={{ backgroundColor: ORANGE }}>
                {submitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 text-center" style={{ backgroundColor: NAVY }}>
        <p className="text-sm text-white/30">© {new Date().getFullYear()} Southern Cities Construction LLC</p>
        <p className="mt-1 text-xs text-white/20">North Carolina · Licensed & Insured · Powered by Southern Cities Enterprises</p>
      </footer>
    </div>
  );
}
