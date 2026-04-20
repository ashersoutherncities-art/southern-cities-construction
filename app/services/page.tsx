'use client';

import { useState } from 'react';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import CartNavLink from '@/components/CartNavLink';
import ServiceCalculator, { ServiceCalculatorConfig } from '@/components/ServiceCalculator';

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
  calculator?: ServiceCalculatorConfig;
};

type OtherClientCard = {
  title: string;
  text: string;
  link?: string;
  linkText?: string;
};

const FLAGSHIP_SERVICE: ServiceCard = {
  title: 'Permit Administration + Construction Oversight',
  description: 'We pull the permit, run the inspections, and oversee the construction as the licensed general contractor of record.',
  forWho: 'For owners and investors who need a licensed GC to take responsibility for the job end to end.',
  deliverables: [
    'Permit pulled under our license',
    'Inspection coordination and milestone tracking',
    'Progress documentation and compliance checkpoints',
    'Issue escalation when the work drifts off track',
  ],
  price: '',
  cta: 'Request a Quote',
  ctaHref: '#contact',
  badge: 'Flagship',
};

const STANDARD_PRODUCTS: ServiceCard[] = [
  {
    title: 'Permit Help',
    description: 'We handle the permit paperwork, submission, correction responses, and inspection scheduling on your behalf.',
    forWho: 'For licensed contractors who want to stay on the permit but hand off the administrative work.',
    deliverables: [
      'Permit application prep and submission',
      'Correction response coordination',
      'Inspection scheduling and follow-up',
      'Status tracking through closeout',
    ],
    price: '$1,500-$3,500 per permit',
    cta: 'Add to Cart',
    itemKey: 'permit-management-service',
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
    price: '$299',
    cta: 'Add to Cart',
    itemKey: 'inspection-response-service',
  },
  {
    title: 'Home Assessment',
    description: 'We walk the property, review the condition, and tell you what needs to happen next.',
    forWho: 'For homeowners who need a real starting point before taking on repairs or renovation work.',
    deliverables: [
      'Property walkthrough',
      'Scope review',
      'Condition notes',
      'Clear next-step recommendation',
    ],
    price: '$299',
    cta: 'Add to Cart',
    itemKey: 'home-assessment',
  },
  {
    title: 'Sub Network Access',
    description: 'We provide access to vetted subcontractor coverage and structured coordination support.',
    forWho: 'For partner contractors who need labor coverage, cleaner coordination, and better overflow support.',
    deliverables: [
      'Vetted subcontractor network access',
      'Priority overflow routing',
      'Digital coordination support',
      'Structured project communication',
    ],
    price: '$349/mo',
    cta: 'Add to Cart',
    itemKey: 'sub-network-access',
  },
];

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
  {
    title: 'Rent-Ready Turn',
    description: 'We get a vacant unit cleaned up, repaired, and ready for a new tenant.',
    forWho: 'For investors and property managers who need a unit turned fast without cutting corners.',
    deliverables: [
      'Unit walkthrough and scope',
      'Repair and refresh coordination',
      'Cleaning and punchlist closeout',
      'Turnover timeline management',
    ],
    price: 'Calculated by unit mix',
    cta: 'Add to Cart',
    calculator: {
      itemKey: 'pre-listing-renovation',
      actionLabel: 'Add to Cart',
      actionType: 'cart',
      fields: [
        { name: 'units', label: 'Number of units', type: 'number', min: 1, max: 10, defaultValue: 1 },
        {
          name: 'squareFootage',
          label: 'Approximate square footage per unit',
          type: 'select',
          defaultValue: 'under-800',
          options: [
            { value: 'under-800', label: 'Under 800' },
            { value: '800-1200', label: '800-1200' },
            { value: '1200-1600', label: '1200-1600' },
            { value: '1600-plus', label: '1600+' },
          ],
        },
        {
          name: 'condition',
          label: 'Condition',
          type: 'select',
          defaultValue: 'light-refresh',
          options: [
            { value: 'light-refresh', label: 'Light refresh' },
            { value: 'moderate', label: 'Moderate' },
            { value: 'heavy', label: 'Heavy' },
          ],
        },
      ],
      calculatePrice: (values) => {
        const units = Number(values.units);
        const squareFootage = String(values.squareFootage);
        const condition = String(values.condition);
        const conditionAdd = condition === 'heavy' ? 150000 : condition === 'moderate' ? 50000 : 0;
        const squareFootageAdd = squareFootage === '1600-plus' ? 100000 : squareFootage === '1200-1600' ? 50000 : 0;
        return units * (250000 + conditionAdd + squareFootageAdd);
      },
    },
  },
  {
    title: 'Permit + Inspection Package',
    description: 'We handle permit submission and inspection coordination together so nothing falls through the cracks.',
    forWho: 'For contractors and owners running permitted jobs who want one point of contact for the paperwork side.',
    deliverables: [
      'Permit application and submission',
      'Correction response coordination',
      'Inspection scheduling and follow-up',
      'Status tracking through closeout',
    ],
    price: 'Calculated by permit count',
    cta: 'Add to Cart',
    calculator: {
      itemKey: 'permit-management-service',
      actionLabel: 'Add to Cart',
      actionType: 'cart',
      fields: [
        { name: 'permits', label: 'Number of permits', type: 'number', min: 1, max: 5, defaultValue: 1 },
        {
          name: 'jobType',
          label: 'Job type',
          type: 'select',
          defaultValue: 'residential',
          options: [
            { value: 'residential', label: 'Residential' },
            { value: 'commercial', label: 'Commercial' },
            { value: 'mixed-use', label: 'Mixed-use' },
          ],
        },
      ],
      calculatePrice: (values) => {
        const permits = Number(values.permits);
        const jobType = String(values.jobType);
        const perPermit = jobType === 'mixed-use' ? 320000 : jobType === 'commercial' ? 280000 : 200000;
        return permits * perPermit;
      },
    },
  },
];

const FEE_BASED_SERVICES: ServiceCard[] = [
  {
    title: 'Investor Review',
    description: 'We review project scope, execution risk, and what it will take to get the job moving.',
    forWho: 'For investors who need a paid review before committing to repairs, repositioning, or construction work.',
    deliverables: [
      'Scope and execution review',
      'Risk notes and next-step guidance',
      'Construction-side feedback',
      'Direct referral to investor platform when needed',
    ],
    price: 'Calculated by property count',
    cta: 'Add to Cart',
    calculator: {
      itemKey: 'investor-review',
      actionLabel: 'Add to Cart',
      actionType: 'cart',
      fields: [
        { name: 'properties', label: 'Number of properties', type: 'number', min: 1, max: 10, defaultValue: 1 },
        {
          name: 'projectType',
          label: 'Project type',
          type: 'select',
          defaultValue: 'rehab',
          options: [
            { value: 'rehab', label: 'Rehab' },
            { value: 'ground-up', label: 'Ground-up' },
            { value: 'reposition', label: 'Reposition' },
          ],
        },
      ],
      calculatePrice: (values) => {
        const properties = Number(values.properties);
        const projectType = String(values.projectType);
        const perProperty = projectType === 'ground-up' ? 75000 : projectType === 'reposition' ? 65000 : 50000;
        return properties * perProperty;
      },
    },
  },
  {
    title: 'Realtor Inspection Review',
    description: 'We review inspection findings and give you a clear repair path to keep the deal moving.',
    forWho: 'For realtors who need fast construction-side guidance after an inspection report.',
    deliverables: [
      'Inspection report review',
      'Repair-scope recommendation',
      'Timeline and cost range estimate',
      'Next-step guidance',
    ],
    price: '$299',
    cta: 'Add to Cart',
    itemKey: 'realtor-inspection-review',
  },
  {
    title: 'Owner Consultation',
    description: 'We sit down with you, review the project, and help you figure out the right plan before you spend money.',
    forWho: 'For property owners who want construction-side guidance before committing to a scope or contractor.',
    deliverables: [
      'Project review and discussion',
      'Scope and budget guidance',
      'Risk and timeline notes',
      'Written next-step recommendation',
    ],
    price: 'Calculated by project size',
    cta: 'Add to Cart',
    calculator: {
      itemKey: 'owner-consultation',
      actionLabel: 'Add to Cart',
      actionType: 'cart',
      fields: [
        {
          name: 'projectType',
          label: 'Project type',
          type: 'select',
          defaultValue: 'renovation',
          options: [
            { value: 'renovation', label: 'Renovation' },
            { value: 'new-build', label: 'New build' },
            { value: 'addition', label: 'Addition' },
            { value: 'other', label: 'Other' },
          ],
        },
        {
          name: 'projectSize',
          label: 'Estimated project size',
          type: 'select',
          defaultValue: 'under-50k',
          options: [
            { value: 'under-50k', label: 'Under $50k' },
            { value: '50k-150k', label: '$50k-$150k' },
            { value: '150k-500k', label: '$150k-$500k' },
            { value: '500k-plus', label: '$500k+' },
          ],
        },
      ],
      calculatePrice: (values) => {
        const projectSize = String(values.projectSize);
        if (projectSize === '500k-plus') return 100000;
        if (projectSize === '150k-500k') return 75000;
        if (projectSize === '50k-150k') return 50000;
        return 35000;
      },
    },
  },
  {
    title: 'Construction Feasibility Review',
    description: 'We review the property, the numbers, and the scope to tell you whether the project makes sense before you start.',
    forWho: 'For investors, developers, and owners evaluating whether a project is worth pursuing.',
    deliverables: [
      'Property and scope review',
      'Budget feasibility assessment',
      'Risk and timeline notes',
      'Go / no-go recommendation',
    ],
    price: '',
    cta: 'Request a Quote',
    ctaHref: '#contact',
  },
];

const PROJECT_DEPENDENT_SERVICES: ServiceCard[] = [
  {
    title: 'Full Renovation',
    description: 'We manage full renovation projects from scope through completion.',
    forWho: 'For homeowners planning bigger repairs, remodels, or full renovation work.',
    deliverables: [
      'Project scope and planning',
      'Subcontractor coordination',
      'Progress tracking and reporting',
      'Inspection and closeout management',
    ],
    price: '',
    cta: 'Request a Quote',
    ctaHref: '#contact',
  },
  {
    title: 'Addition / Major Remodel',
    description: 'We handle additions and major remodel projects that require permits, engineering, and phased execution.',
    forWho: 'For homeowners adding square footage or making structural changes to the property.',
    deliverables: [
      'Scope development and planning',
      'Permit and engineering coordination',
      'Phased construction management',
      'Final inspection and closeout',
    ],
    price: '',
    cta: 'Request a Quote',
    ctaHref: '#contact',
  },
  {
    title: 'Ground-Up Residential',
    description: 'We build new residential construction from site prep through certificate of occupancy.',
    forWho: 'For developers and landowners building new homes or small residential projects.',
    deliverables: [
      'Pre-construction planning',
      'Permit and compliance coordination',
      'Full construction management',
      'Final inspection and CO delivery',
    ],
    price: '',
    cta: 'Request a Quote',
    ctaHref: '#contact',
  },
  {
    title: 'Overflow Project Support',
    description: 'We step in when you have more work than your current team can carry.',
    forWho: 'For general contractors who need help finishing jobs without letting quality or timelines slip.',
    deliverables: [
      'Project review before start',
      'Execution support from our team',
      'Weekly progress reporting',
      'Clear scope and coordination',
    ],
    price: '',
    cta: 'Request a Quote',
    ctaHref: '#contact',
  },
  {
    title: 'Owner Rep / Oversight',
    description: 'We represent the owner on the job site and make sure the work matches the plan.',
    forWho: 'For property owners and developers who want an independent set of eyes on the project.',
    deliverables: [
      'Regular site visits and reporting',
      'Progress verification against scope',
      'Issue identification and escalation',
      'Draw and payment review support',
    ],
    price: '',
    cta: 'Request a Quote',
    ctaHref: '#contact',
  },
];

const OTHER_CLIENTS: OtherClientCard[] = [
  {
    title: 'Subcontractors',
    text: 'Subcontractors who want repeat work can contact us about network participation and upcoming jobs.',
    link: '#contact',
    linkText: 'Request a Quote',
  },
  {
    title: 'Referral Partners',
    text: 'Realtors and real estate professionals who want a repeat contractor relationship for repair, listing prep, and renovation work.',
    link: '/realtor',
    linkText: 'Become a Partner',
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
        {card.price && (
          <div className="mb-6 rounded-2xl border px-4 py-4 text-center" style={{ borderColor: 'rgba(250,140,65,0.25)', backgroundColor: 'rgba(250,140,65,0.08)' }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500">Starting Price</p>
            <p className="mt-2 text-3xl font-extrabold leading-none" style={{ color: ORANGE }}>{card.price}</p>
          </div>
        )}
        {card.calculator ? (
          <ServiceCalculator config={card.calculator} />
        ) : card.itemKey ? (
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
        const data = (await res.json()) as { error?: string };
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
            title="Add to Cart"
            text="These services have a fixed price and can be added to cart right now."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {[...STANDARD_PRODUCTS, BUNDLES[0], FEE_BASED_SERVICES[1]].map((card) => (
              <Card key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionHeader
            title="Calculated Price"
            text="These services need a few project details first. Enter the details, get the price, then add them to cart."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {[BUNDLES[1], BUNDLES[2], FEE_BASED_SERVICES[0], FEE_BASED_SERVICES[2]].map((card) => (
              <Card key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionHeader
            title="Request a Quote"
            text="These jobs need a project review before pricing. Send the details and we will scope the next step."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {[FLAGSHIP_SERVICE, FEE_BASED_SERVICES[3], ...PROJECT_DEPENDENT_SERVICES].map((card) => (
              <Card key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionHeader
            title="Other Clients"
            text="Reach out directly if you fit one of these groups."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {OTHER_CLIENTS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-2xl font-extrabold" style={{ color: NAVY }}>{item.title}</h3>
                <p className="mb-3 text-sm leading-relaxed text-gray-600">{item.text}</p>
                {item.link && (
                  <a href={item.link} className="text-sm font-semibold" style={{ color: ORANGE }}>{item.linkText || 'Learn More'}</a>
                )}
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
