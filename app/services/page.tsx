'use client';

import { useState } from 'react';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import CartNavLink from '@/components/CartNavLink';

const NAVY = '#132452';
const ORANGE = '#fa8c41';

type ServiceCard = {
  title: string;
  description: string;
  forWho: string;
  deliverables: string[];
  price: string;
  cta: string;
  itemKey?: string;
  ctaHref?: string;
  badge?: string;
};

const BUNDLES: ServiceCard[] = [
  {
    title: 'Pre-Listing Work',
    description: 'We handle repair and refresh work that helps a property show better before it hits the market.',
    forWho: 'For realtors and sellers who need a house cleaned up before listing.',
    deliverables: [
      'Scope review',
      'Listing-prep work plan',
      'Repair and refresh coordination',
      'Timeline built around the listing date',
    ],
    price: '$5,000-$15,000',
    cta: 'Add to Cart',
    itemKey: 'pre-listing-renovation',
  },
];

const STANDARD_PRODUCTS: ServiceCard[] = [
  {
    title: 'Permit Help',
    description: 'We handle permit paperwork, submission, follow-up, and inspection coordination.',
    forWho: 'For homeowners, contractors, and operators who need permit work pushed through without dragging the job down.',
    deliverables: [
      'Permit application support',
      'Submission and follow-up',
      'Correction response coordination',
      'Inspection scheduling support',
    ],
    price: '$1,500-$3,500 per permit',
    cta: 'Add to Cart',
    itemKey: 'permit-management-service',
  },
];

const FEE_BASED_SERVICES: ServiceCard[] = [
  {
    title: 'Home Assessment',
    description: 'We walk the property, review the work, and tell you what needs to happen next.',
    forWho: 'For homeowners who need a real starting point before taking on repairs or renovation work.',
    deliverables: [
      'Property walkthrough',
      'Scope review',
      'Condition notes',
      'Clear next-step recommendation',
    ],
    price: '$299',
    cta: 'Book an Assessment',
    itemKey: 'inspection-response-service',
  },
  {
    title: 'Inspection Response',
    description: 'We review inspection issues and help define the repair path fast.',
    forWho: 'For realtors and buyers trying to keep a deal alive after the inspection report comes back.',
    deliverables: [
      'Inspection issue review',
      'Repair-scope recommendation',
      'Fast starting assessment',
      'Next-step guidance',
    ],
    price: '$299 assessment',
    cta: 'Add to Cart',
    itemKey: 'inspection-response-service',
  },
  {
    title: 'Referral Partners',
    description: 'We work with agents who need a contractor they can keep sending people to.',
    forWho: 'For realtors who want a repeat relationship for renovation work, listing prep, and repair projects.',
    deliverables: [
      'Referral relationship setup',
      'Project handoff after intro',
      'Repeat project support',
      'Referral tracking',
    ],
    price: '5-10% referral fee',
    cta: 'Become a Partner',
    ctaHref: '/realtor',
  },
];

const PROJECT_DEPENDENT_SERVICES: ServiceCard[] = [
  {
    title: 'Construction Oversight',
    description: 'We keep the job documented, tracked, and moving when the work needs tighter control.',
    forWho: 'For owners and project leads who need more structure around progress, compliance, and project accountability.',
    deliverables: [
      'Milestone tracking',
      'Progress documentation requirements',
      'Issue escalation',
      'Inspection and compliance checkpoints',
    ],
    price: 'Custom quote',
    cta: 'Request a Quote',
    ctaHref: '#contact',
  },
  {
    title: 'Overflow Projects',
    description: 'We step in when you have more work than your current team can carry.',
    forWho: 'For general contractors who need help finishing jobs without letting quality or timelines slip.',
    deliverables: [
      'Project review before start',
      'Execution support from our team',
      'Weekly progress reporting',
      'Clear scope and coordination',
    ],
    price: '15-20% of project',
    cta: 'Request a Quote',
    ctaHref: '#contact',
  },
  {
    title: 'Renovation Quote',
    description: 'We price larger renovation work after we review the property and scope.',
    forWho: 'For homeowners planning bigger repairs, remodels, or full renovation work.',
    deliverables: [
      'Project scope review',
      'Work-plan discussion',
      'Pricing after review',
      'Next-step recommendation',
    ],
    price: 'Custom quote',
    cta: 'Request a Quote',
    ctaHref: '#contact',
  },
];

const OTHER_CLIENTS = [
  {
    title: 'Subcontractors',
    text: 'Subcontractors who want repeat work can contact us about network participation and upcoming jobs.',
  },
  {
    title: 'Investors',
    text: 'Investors who need deal review, operator guidance, or acquisition support should use Southern Cities Investors.',
  },
];

function SectionHeader({ title, text, light = false }: { title: string; text: string; light?: boolean }) {
  return (
    <div className="mb-12 max-w-3xl">
      <h2 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ color: light ? '#fff' : NAVY }}>{title}</h2>
      <p className="text-lg leading-relaxed" style={{ color: light ? 'rgba(255,255,255,0.7)' : '#6b7280' }}>{text}</p>
    </div>
  );
}

function Card({ card }: { card: ServiceCard }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm" style={{ borderTop: `4px solid ${NAVY}` }}>
      {card.badge && (
        <span className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: ORANGE }}>
          {card.badge}
        </span>
      )}
      <div className="flex flex-1 flex-col p-8">
        <h3 className="mb-3 text-2xl font-extrabold" style={{ color: NAVY }}>{card.title}</h3>
        <p className="mb-3 text-sm leading-relaxed text-gray-700">{card.description}</p>
        <p className="mb-5 text-sm leading-relaxed text-gray-600">{card.forWho}</p>
        <ul className="mb-6 flex-1 space-y-3">
          {card.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[15px] text-gray-600">
              <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: ORANGE }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mb-6 text-xl font-bold" style={{ color: ORANGE }}>{card.price}</p>
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
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            We pull permits, manage oversight, and keep residential projects moving.
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-white/65 sm:text-xl">
            Southern Cities Construction works with homeowners, general contractors, realtors, and investors who need clear pricing, real execution, and a direct way to get started.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a href="#contact" className="rounded-full px-8 py-4 text-base font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: ORANGE }}>
              Request a Quote
            </a>
            <a href="#services" className="rounded-full border border-white/15 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10">
              View Services
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionHeader
            title="Bundles"
            text="These are packaged scopes of work with a defined service package and starting price."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {BUNDLES.map((card) => (
              <Card key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionHeader
            title="Standard Products"
            text="These are fixed services with a clear starting price and a direct way to buy."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {STANDARD_PRODUCTS.map((card) => (
              <Card key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionHeader
            title="Fee-Based Services"
            text="These are paid services where you are paying for review, assessment, or referral-based support."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {FEE_BASED_SERVICES.map((card) => (
              <Card key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionHeader
            title="Project-Dependent Services"
            text="These jobs need project review before pricing because the scope can change based on size, condition, and timeline."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {PROJECT_DEPENDENT_SERVICES.map((card) => (
              <Card key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionHeader
            title="Other Clients"
            text="Some work starts outside standard checkout. Reach out directly if you fit one of these groups."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {OTHER_CLIENTS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-2xl font-extrabold" style={{ color: NAVY }}>{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 sm:py-28" style={{ backgroundColor: NAVY }}>
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Get a Quote</h2>
            <p className="text-lg text-white/60">Tell us what the project is, what stage it is in, and what kind of help you need.</p>
          </div>

          {submitted ? (
            <div className="rounded-2xl p-10 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: `1px solid ${ORANGE}` }}>
              <h3 className="mb-2 text-2xl font-bold text-white">We received your request.</h3>
              <p className="text-white/60">We will review the project and follow up with the next step.</p>
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
                  <input type="text" name="service" value={formData.service} onChange={handleChange} placeholder="Permit help, oversight, renovation quote..." className="w-full rounded-xl px-4 py-3 text-[15px] text-white focus:outline-none" style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-white/80">Project details</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Tell us what the project is and what kind of help you need..." className="w-full resize-none rounded-xl px-4 py-3 text-[15px] text-white focus:outline-none" style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
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
        <p className="mt-1 text-xs text-white/20">Charlotte, NC · Licensed General Contractor · Powered by Southern Cities Enterprises</p>
      </footer>
    </div>
  );
}
