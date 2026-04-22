'use client';

import { useState } from 'react';
import AddToCartButton from '@/components/AddToCartButton';
import ServiceCalculator, { ServiceCalculatorConfig } from '@/components/ServiceCalculator';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

type ServiceCard = {
  title: string;
  summary: string;
  details: string[];
  fit: string;
  purchaseType: 'buy' | 'review' | 'quote';
  cta: string;
  itemKey?: string;
  ctaHref?: string;
  calculator?: ServiceCalculatorConfig;
};

type AvatarSection = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  buy?: ServiceCard[];
  review?: ServiceCard[];
  quote?: ServiceCard[];
};

const homeownerServices: AvatarSection = {
  id: 'homeowners',
  eyebrow: 'Homeowners',
  title: 'For homeowners who need clearer direction, better follow-through, and less confusion around an active project.',
  intro:
    'These services are for homeowners who do not want a residential job turning into a drawn-out, expensive mess. If the next step is unclear, the permit process is dragging, or the project feels harder to trust, start here.',
  buy: [
    {
      title: 'Home Assessment',
      summary: 'A straightforward review of the property, its condition, and the next step that makes the most sense.',
      details: ['Property walkthrough', 'Condition notes', 'Priority repair list', 'Clear recommendation on what to do next'],
      fit: 'A good starting point when you need clarity before committing to more work or more spend.',
      purchaseType: 'buy',
      cta: 'Buy Home Assessment',
      itemKey: 'home-assessment',
    },
    {
      title: 'Owner Consultation',
      summary: 'Direct guidance on a residential project, permit question, or work decision that needs to be made clearly.',
      details: ['Project review', 'Practical guidance', 'Risk callouts', 'Recommended next step'],
      fit: 'Useful when the issue is not just the work itself, but the decisions around it.',
      purchaseType: 'buy',
      cta: 'Buy Owner Consultation',
      itemKey: 'owner-consultation',
    },
  ],
  review: [
    {
      title: 'Permit Administration',
      summary: 'Permit support for homeowners who need the paperwork, corrections, and scheduling handled more clearly.',
      details: ['Permit review', 'Submission coordination', 'Correction handling', 'Inspection scheduling support'],
      fit: 'Best when the permit side of the project is becoming the bottleneck.',
      purchaseType: 'review',
      cta: 'Review Permit Pricing',
      itemKey: 'permit-management-service',
    },
  ],
  quote: [
    {
      title: 'Construction Oversight',
      summary: 'Oversight for active jobs that need stronger coordination, clearer milestones, and steadier follow-through.',
      details: ['Project review', 'Oversight scope', 'Milestone structure', 'Coordination support plan'],
      fit: 'Best when the work is moving, but nobody is managing it closely enough.',
      purchaseType: 'quote',
      cta: 'Request Oversight Support',
      ctaHref: '#contact',
    },
  ],
};

const investorServices: AvatarSection = {
  id: 'investors',
  eyebrow: 'Investors',
  title: 'For investors who need active work to move faster, hold together better, and create less drag on the deal.',
  intro:
    'These services are for investors dealing with scope questions, lender requirements, draw support, turn work, or project drift that is starting to cost time and money.',
  buy: [
    {
      title: 'Investor Review',
      summary: 'A construction-side review for investors who need a clearer read on a property, project, or decision before moving forward.',
      details: ['Scope review', 'Execution risk notes', 'Construction-side feedback', 'Recommended next step'],
      fit: 'Useful when speed matters, but making the wrong call will cost more than slowing down for a better read.',
      purchaseType: 'buy',
      cta: 'Buy Investor Review',
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
      title: 'Budget Estimate',
      summary: 'A straightforward budget estimate for a single project when you need a cleaner number before deciding what to do next.',
      details: ['Project scope review', 'Written budget estimate', 'Notes on visible assumptions', 'Clear summary of likely cost range based on observed conditions'],
      fit: 'Useful when you need an individual budget estimate without buying a broader review package first.',
      purchaseType: 'buy',
      cta: 'Buy Budget Estimate',
      ctaHref: '#contact',
    },
  ],
  review: [
    {
      title: 'Lender Scope & Bid Package',
      summary: 'A scope-of-work and bid package for investors who need numbers they can submit with confidence to a lender or capital partner.',
      details: ['Property and scope review', 'Written scope of work', 'Bid package Southern Cities can stand behind', 'Clear note that pricing is based on visible conditions unless major hidden issues are uncovered'],
      fit: 'Best when you need a lender-ready package that is practical, documented, and tied to what can actually be verified at the property.',
      purchaseType: 'review',
      cta: 'Review Lender Package Pricing',
      ctaHref: '#contact',
    },
    {
      title: 'Rent-Ready Turn',
      summary: 'Turn support for vacant units that need to get back into rentable condition without unnecessary delay.',
      details: ['Unit walkthrough', 'Repair and refresh coordination', 'Punchlist closeout', 'Turn-ready handoff path'],
      fit: 'Best when time lost is directly affecting rent, occupancy, or holding cost.',
      purchaseType: 'review',
      cta: 'Review Turn Pricing',
      calculator: {
        itemKey: 'rent-ready-turn',
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
      title: 'Draw Review Support',
      summary: 'Support for investors who need progress, scope, and budget packaged more clearly for draw requests or funding conversations.',
      details: ['Current work review', 'Budget and progress alignment', 'Draw support notes', 'Clear summary of what has been completed and what remains'],
      fit: 'Useful when you need cleaner documentation around progress, budget, and remaining scope.',
      purchaseType: 'review',
      cta: 'Review Draw Support Pricing',
      ctaHref: '#contact',
    },
  ],
  quote: [
    {
      title: 'Construction Oversight',
      summary: 'Oversight for active projects that need stronger structure, cleaner communication, and better accountability.',
      details: ['Project review', 'Oversight scope', 'Milestone structure', 'Coordination support plan'],
      fit: 'Best when the project is active, the risk is real, and tighter execution matters.',
      purchaseType: 'quote',
      cta: 'Request Oversight Support',
      ctaHref: '#contact',
    },
  ],
};

const realtorServices: AvatarSection = {
  id: 'realtors',
  eyebrow: 'Realtors',
  title: 'For realtors who need repair questions, listing prep, and inspection items handled clearly and quickly.',
  intro:
    'These services are for realtors trying to protect the transaction, protect the timeline, and give clients a clearer sense of what comes next.',
  buy: [
    {
      title: 'Inspection Response',
      summary: 'A fast review of inspection items so the real issues, likely scope, and next step are easier to understand.',
      details: ['Inspection issue review', 'Priority breakdown', 'Repair-scope guidance', 'Clear response path'],
      fit: 'Useful when the deal needs clearer construction guidance quickly.',
      purchaseType: 'buy',
      cta: 'Buy Inspection Response',
      itemKey: 'inspection-response-service',
    },
    {
      title: 'Realtor Inspection Review',
      summary: 'A construction-side read on inspection findings for realtors who need to advise clients with more confidence.',
      details: ['Inspection report review', 'Priority item callout', 'Repair path guidance', 'Recommended next step'],
      fit: 'Best when your client needs practical answers, not more uncertainty.',
      purchaseType: 'buy',
      cta: 'Buy Inspection Review',
      itemKey: 'realtor-inspection-review',
    },
  ],
  review: [
    {
      title: 'Pre-Listing Work',
      summary: 'Scope and coordination support for getting a property ready before it goes to market.',
      details: ['Scope review', 'Listing-prep work plan', 'Repair coordination', 'Timeline tied to listing goals'],
      fit: 'Useful when presentation and timing both matter.',
      purchaseType: 'review',
      cta: 'Review Pre-Listing Pricing',
      calculator: {
        itemKey: 'pre-listing-renovation',
        actionLabel: 'Add to Cart',
        actionType: 'cart',
        fields: [
          {
            name: 'propertySize',
            label: 'Property size',
            type: 'select',
            defaultValue: 'under-1500',
            options: [
              { value: 'under-1500', label: 'Under 1,500 SF' },
              { value: '1500-2500', label: '1,500 to 2,500 SF' },
              { value: '2500-plus', label: '2,500+ SF' },
            ],
          },
          {
            name: 'condition',
            label: 'Work level',
            type: 'select',
            defaultValue: 'light',
            options: [
              { value: 'light', label: 'Light prep' },
              { value: 'standard', label: 'Standard prep' },
              { value: 'heavy', label: 'Heavy prep' },
            ],
          },
          {
            name: 'occupancy',
            label: 'Property status',
            type: 'select',
            defaultValue: 'vacant',
            options: [
              { value: 'vacant', label: 'Vacant' },
              { value: 'occupied', label: 'Occupied' },
            ],
          },
        ],
        calculatePrice: (values) => {
          const propertySize = String(values.propertySize);
          const condition = String(values.condition);
          const occupancy = String(values.occupancy);
          const base = condition === 'heavy' ? 899900 : condition === 'standard' ? 699900 : 499900;
          const sizeAdd = propertySize === '2500-plus' ? 200000 : propertySize === '1500-2500' ? 100000 : 0;
          const occupancyAdd = occupancy === 'occupied' ? 50000 : 0;
          return base + sizeAdd + occupancyAdd;
        },
      },
    },
  ],
  quote: [
    {
      title: 'Listing Prep Coordination',
      summary: 'Coordination support for listings that need broader prep work before they are ready to go live.',
      details: ['Property review', 'Scope planning', 'Coordination plan', 'Quote path based on the work involved'],
      fit: 'Best when the property needs more than a quick repair answer.',
      purchaseType: 'quote',
      cta: 'Request Listing Prep Quote',
      ctaHref: '#contact',
    },
  ],
};

const contractorServices: AvatarSection = {
  id: 'contractors',
  eyebrow: 'Contractors',
  title: 'For contractors who need permit and coordination support without carrying all of the administrative burden internally.',
  intro:
    'These services are for contractors who can do the work, but need help keeping permits, inspections, and project administration from slowing the business down.',
  review: [
    {
      title: 'Permit Administration',
      summary: 'Permit support for contractors and trade teams that want the paperwork handled more cleanly.',
      details: ['Permit application prep', 'Submission follow-up', 'Correction handling', 'Inspection scheduling support'],
      fit: 'Useful when your team should be focused on the field, not stuck in paperwork.',
      purchaseType: 'review',
      cta: 'Review Permit Pricing',
      itemKey: 'permit-management-service',
    },
  ],
  quote: [
    {
      title: 'Construction Oversight Support',
      summary: 'Support for contractors who need tighter coordination around milestones, updates, and project follow-through.',
      details: ['Project review', 'Support scope', 'Milestone structure', 'Coordination support plan'],
      fit: 'Best when project control issues are starting to affect production.',
      purchaseType: 'quote',
      cta: 'Request Contractor Support',
      ctaHref: '#contact',
    },
  ],
};

const developerServices: AvatarSection = {
  id: 'developers-landowners',
  eyebrow: 'Developers / Landowners',
  title: 'For larger residential projects that need a clearer permit path, stronger coordination, and steadier oversight.',
  intro:
    'These services are for developers and landowners who need more structure around a project before drift, delay, or poor coordination creates bigger problems.',
  quote: [
    {
      title: 'Permit Administration + Construction Oversight',
      summary: 'Support for larger residential projects that need closer control over permit work, job structure, and execution.',
      details: ['Project review', 'Permit path planning', 'Oversight scope', 'Execution support around milestones and coordination'],
      fit: 'Best when the project is too important to run loosely.',
      purchaseType: 'quote',
      cta: 'Request Project Quote',
      ctaHref: '#contact',
    },
  ],
};

const avatarSections = [homeownerServices, investorServices, realtorServices, contractorServices, developerServices];

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
        <span className="w-6 h-px bg-orange/50" />
        {eyebrow}
      </span>
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-navy leading-tight">{title}</h2>
      <p className="mt-4 text-base leading-relaxed sm:text-lg text-stone-700">{text}</p>
    </div>
  );
}

function PurchaseTypeBlock({
  title,
  text,
  cards,
}: {
  title: string;
  text: string;
  cards?: ServiceCard[];
}) {
  if (!cards || cards.length === 0) return null;

  return (
    <div className="mt-10 first:mt-0">
      <div className="mb-6 max-w-2xl">
        <div className="inline-flex rounded-full border border-stone-300 bg-stone-50 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-navy">
          {title}
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-stone-600">{text}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex w-full max-w-[420px] md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]"
          >
            <ServiceCardView card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceCardView({ card }: { card: ServiceCard }) {
  return (
    <div className="flex h-full w-full max-w-[420px] flex-col rounded-[22px] border border-stone-200 bg-white p-6 shadow-elev-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev-3 hover:border-orange/25">
      <h4 className="text-[22px] font-extrabold leading-tight tracking-tight text-navy">{card.title}</h4>

      <div className="mt-4 space-y-4 text-[14.5px] leading-relaxed text-stone-700">
        <p>{card.summary}</p>
        <ul className="space-y-2">
          {card.details.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-stone-600">{card.fit}</p>
      </div>

      <div className="mt-auto pt-6">
        {card.calculator ? (
          <ServiceCalculator config={card.calculator} />
        ) : card.itemKey ? (
          <AddToCartButton
            itemKey={card.itemKey}
            label={card.cta}
            className="inline-block w-full rounded-full bg-orange py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-500"
          />
        ) : (
          <a
            href={card.ctaHref || '#contact'}
            className="inline-block w-full rounded-full bg-navy py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-navy-700"
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
      <SiteNav />

      <section className="relative overflow-hidden bg-navy-900 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#163061_0%,#10254c_100%)]" />
        <div className="relative z-10 container-pro">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-4xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                Services & Pricing
              </div>
              <h1 className="mb-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Services for residential projects that need clearer structure.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-white sm:text-xl">
                Southern Cities helps when permits, inspections, coordination, unclear next steps, or missing scope clarity are making the job harder to manage. Start with the role that matches yours, then choose the buying path that fits the service.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/15 bg-white p-7 text-navy shadow-[0_24px_60px_rgba(6,18,43,0.28)]">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">How to use this page</p>
              <div className="space-y-5 text-sm leading-relaxed text-stone-700">
                <div>
                  <p className="font-semibold text-navy">Buy Now</p>
                  <p>Use this when the service has a fixed scope and you already know what you need.</p>
                </div>
                <div>
                  <p className="font-semibold text-navy">Priced After Review</p>
                  <p>Use this when a few project details affect the final price.</p>
                </div>
                <div>
                  <p className="font-semibold text-navy">Request Quote</p>
                  <p>Use this when the work is larger, less defined, or needs review before pricing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-8">
        <div className="container-pro">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Choose your role</p>
              <p className="mt-2 text-[15px] leading-relaxed text-stone-700">
                Go straight to the section that best matches the kind of project, deal, or support you need.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {avatarSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-navy transition-all hover:border-orange hover:text-orange hover:-translate-y-0.5"
                >
                  {section.eyebrow}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {avatarSections.map((section, index) => (
        <section key={section.id} id={section.id} className={index % 2 === 0 ? 'bg-white py-20 sm:py-24' : 'border-y border-stone-200 bg-stone-50 py-20 sm:py-24'}>
          <div className="container-pro">
            <SectionHeader eyebrow={section.eyebrow} title={section.title} text={section.intro} />
            <PurchaseTypeBlock title="Buy Now" text="Use this when the service is fixed-scope and you want the fastest path forward." cards={section.buy} />
            <PurchaseTypeBlock title="Priced After Review" text="Use this when pricing depends on a few project details." cards={section.review} />
            <PurchaseTypeBlock title="Request Quote" text="Use this when the work needs review before scope and pricing are finalized." cards={section.quote} />
          </div>
        </section>
      ))}

      <section id="contact" className="bg-navy-950 py-20 sm:py-24 text-white">
        <div className="container-pro">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
                <span className="w-6 h-px bg-orange/50" />
                Contact
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl leading-tight">Need us to review the job first?</h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/88">
                <p><strong className="text-white">Buy Now</strong> when the service is already clear.</p>
                <p><strong className="text-white">Priced After Review</strong> when a few details affect cost.</p>
                <p><strong className="text-white">Use this form</strong> when the project is larger, less defined, or needs a closer look before the next step is clear.</p>
                <p><strong className="text-white">What happens next:</strong> Southern Cities reviews the request and follows up with the right next step for pricing, scoping, or project support.</p>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-7 sm:p-8">
              {submitted ? (
                <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-100">
                  Your request was sent. Southern Cities will review it and follow up with the next step.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input name="name" value={formData.name} onChange={handleChange} required placeholder="Name" className="w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-orange focus:outline-none" />
                    <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-orange focus:outline-none" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-orange focus:outline-none" />
                    <select name="audience_type" value={formData.audience_type} onChange={handleChange} className="w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white focus:border-orange focus:outline-none">
                      <option value="">Who are you?</option>
                      <option value="Homeowner">Homeowner</option>
                      <option value="Investor">Investor</option>
                      <option value="Realtor">Realtor</option>
                      <option value="Contractor">Contractor</option>
                      <option value="Developer / Landowner">Developer / Landowner</option>
                    </select>
                  </div>
                  <input name="service" value={formData.service} onChange={handleChange} placeholder="What service or issue are you reaching out about?" className="w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-orange focus:outline-none" />
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="What is happening right now, what is stuck, and what do you need help moving forward?" className="w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-orange focus:outline-none" />
                  {error && <p className="text-sm text-red-300">{error}</p>}
                  <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-all hover:bg-orange-500 disabled:opacity-60">
                    {submitting ? 'Sending...' : 'Request a Quote'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
