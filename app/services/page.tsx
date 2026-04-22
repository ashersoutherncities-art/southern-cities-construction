'use client';

import { useState } from 'react';
import AddToCartButton from '@/components/AddToCartButton';
import ServiceCalculator, { ServiceCalculatorConfig } from '@/components/ServiceCalculator';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

type ServiceCard = {
  title: string;
  who: string;
  problem: string;
  included: string[];
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
  title: 'For homeowners who need the project to make sense and keep moving.',
  intro:
    'Use these services when the work is real, the next step is not clear, or the paperwork and coordination side is starting to slow the job down.',
  buy: [
    {
      title: 'Home Assessment',
      who: 'For homeowners who need a clearer read on what a project requires before they keep spending time or money.',
      problem: 'Projects get expensive fast when the work is active but the scope, condition, or next step is still unclear.',
      included: ['Property walkthrough', 'Condition notes', 'Priority repair list', 'Clear next-step recommendation'],
      fit: 'This is the right entry point when you need clarity before committing to larger work.',
      purchaseType: 'buy',
      cta: 'Buy Home Assessment',
      itemKey: 'home-assessment',
    },
    {
      title: 'Owner Consultation',
      who: 'For owners who need direct guidance on a residential project, permit issue, or work path.',
      problem: 'When the job is active but the decisions are not clear, progress slows and costs start to drift.',
      included: ['Project review', 'Direct guidance', 'Risk callouts', 'Clear next-step path'],
      fit: 'This is best when the issue is not just labor, it is uncertainty.',
      purchaseType: 'buy',
      cta: 'Buy Owner Consultation',
      itemKey: 'owner-consultation',
    },
  ],
  review: [
    {
      title: 'Permit Administration',
      who: 'For homeowners who need the permit process handled more cleanly and with less confusion.',
      problem: 'Permit paperwork, corrections, and submission requirements slow projects down when nobody is managing them tightly.',
      included: ['Permit path review', 'Submission coordination', 'Correction handling', 'Inspection scheduling support'],
      fit: 'This is the right service when the permit side is becoming the bottleneck.',
      purchaseType: 'review',
      cta: 'Review Permit Pricing',
      itemKey: 'permit-management-service',
    },
  ],
  quote: [
    {
      title: 'Construction Oversight',
      who: 'For homeowners with active jobs that need tighter coordination, milestone tracking, and follow-through.',
      problem: 'A lot of projects do not fail because nobody can do the work. They fail because nobody is clearly driving the process.',
      included: ['Project review', 'Oversight scope', 'Milestone structure', 'Coordination support plan'],
      fit: 'This is the right fit when the work is underway but control is weak.',
      purchaseType: 'quote',
      cta: 'Request Oversight Support',
      ctaHref: '#contact',
    },
  ],
};

const investorServices: AvatarSection = {
  id: 'investors',
  eyebrow: 'Investors',
  title: 'For investors and operators who need the work to move without losing time or margin.',
  intro:
    'Use these services when turnover work, permit issues, repair questions, or coordination gaps are slowing an active property or active deal.',
  buy: [
    {
      title: 'Investor Review',
      who: 'For investors who need a construction-side read on a property, scope, or decision before moving forward.',
      problem: 'Projects lose time and margin when investors are forced to make decisions off incomplete construction information.',
      included: ['Scope review', 'Execution risk notes', 'Construction-side feedback', 'Clear next-step guidance'],
      fit: 'This is best when speed matters but guesswork is expensive.',
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
  ],
  review: [
    {
      title: 'Rent-Ready Turn',
      who: 'For investors and property operators who need a vacant unit turned and put back into rentable condition.',
      problem: 'Turn work drags when scope, sequencing, and coordination are loose.',
      included: ['Unit walkthrough', 'Repair and refresh coordination', 'Punchlist closeout', 'Turn-ready handoff path'],
      fit: 'This is right when time lost equals money lost.',
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
      title: 'Permit Administration',
      who: 'For investors with projects that need permit work handled without creating unnecessary delay.',
      problem: 'Deals stall when permit requirements are unclear or poorly managed.',
      included: ['Permit path review', 'Submission coordination', 'Correction handling', 'Inspection scheduling support'],
      fit: 'This fits when the admin side is putting the project timeline at risk.',
      purchaseType: 'review',
      cta: 'Review Permit Pricing',
      itemKey: 'permit-management-service',
    },
  ],
  quote: [
    {
      title: 'Construction Oversight',
      who: 'For investors with active projects that need tighter structure and better accountability.',
      problem: 'Projects drift when there is no clear control over updates, milestones, and next actions.',
      included: ['Project review', 'Oversight scope', 'Milestone structure', 'Coordination support plan'],
      fit: 'This is best when the project exists, the risk is real, and tighter execution matters.',
      purchaseType: 'quote',
      cta: 'Request Oversight Support',
      ctaHref: '#contact',
    },
  ],
};

const realtorServices: AvatarSection = {
  id: 'realtors',
  eyebrow: 'Realtors',
  title: 'For realtors who need repair, inspection, and listing-prep issues to stop slowing the deal.',
  intro:
    'Use these services when clients need fast construction-side clarity and the deal or listing cannot afford confusion.',
  buy: [
    {
      title: 'Inspection Response',
      who: 'For buyers, sellers, and realtors dealing with inspection issues that are slowing a deal down.',
      problem: 'Inspection reports create confusion fast when nobody is separating the real issues from the noise.',
      included: ['Inspection issue review', 'Priority breakdown', 'Repair-scope guidance', 'Clear next-step response'],
      fit: 'This is right when the deal needs clarity fast.',
      purchaseType: 'buy',
      cta: 'Buy Inspection Response',
      itemKey: 'inspection-response-service',
    },
    {
      title: 'Realtor Inspection Review',
      who: 'For realtors who need a practical construction-side interpretation of inspection findings.',
      problem: 'Clients lose confidence when repair questions stay vague too long.',
      included: ['Inspection report review', 'Priority item callout', 'Repair path guidance', 'Next-step recommendation'],
      fit: 'This is the right fit when you need answers you can use with clients quickly.',
      purchaseType: 'buy',
      cta: 'Buy Inspection Review',
      itemKey: 'realtor-inspection-review',
    },
  ],
  review: [
    {
      title: 'Pre-Listing Work',
      who: 'For realtors and owners getting a property ready before it goes to market.',
      problem: 'Listing prep becomes a scramble when the work is known but the scope and sequence are still loose.',
      included: ['Scope review', 'Listing-prep work plan', 'Repair coordination', 'Timeline tied to the listing date'],
      fit: 'This is best when speed and presentation both matter.',
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
      who: 'For listings that need broader work coordination before they are ready to hit the market.',
      problem: 'Multiple moving parts create delay when nobody is clearly coordinating the prep.',
      included: ['Property review', 'Scope planning', 'Coordination plan', 'Quote path based on the actual work'],
      fit: 'This is right when the property needs more than a quick repair answer.',
      purchaseType: 'quote',
      cta: 'Request Listing Prep Quote',
      ctaHref: '#contact',
    },
  ],
};

const contractorServices: AvatarSection = {
  id: 'contractors',
  eyebrow: 'Contractors',
  title: 'For contractors whose admin side is slowing down field execution.',
  intro:
    'Use these services when your team can do the work, but permit paperwork, inspections, and coordination are eating up time and margin.',
  review: [
    {
      title: 'Permit Administration',
      who: 'For contractors and trade teams that need permit admin support without carrying the whole paperwork burden internally.',
      problem: 'Permit admin eats time, causes delay, and pulls attention away from field execution.',
      included: ['Permit application prep', 'Submission follow-up', 'Correction handling', 'Inspection scheduling support'],
      fit: 'This is best when your team can do the work but should not be bogged down by the paperwork.',
      purchaseType: 'review',
      cta: 'Review Permit Pricing',
      itemKey: 'permit-management-service',
    },
  ],
  quote: [
    {
      title: 'Construction Oversight Support',
      who: 'For contractors who need help keeping the coordination side of the job structured.',
      problem: 'Jobs lose momentum when inspections, updates, milestones, and admin follow-up are not being driven tightly enough.',
      included: ['Project review', 'Support scope', 'Milestone structure', 'Coordination support plan'],
      fit: 'This works when admin and project control are hurting production.',
      purchaseType: 'quote',
      cta: 'Request Contractor Support',
      ctaHref: '#contact',
    },
  ],
};

const developerServices: AvatarSection = {
  id: 'developers-landowners',
  eyebrow: 'Developers / Landowners',
  title: 'For larger residential projects that cannot afford drift, weak coordination, or permit friction.',
  intro:
    'Use this path when the project is important enough that structure, accountability, and next-step visibility matter from the start.',
  quote: [
    {
      title: 'Permit Administration + Construction Oversight',
      who: 'For larger residential projects that need tighter control over the permit path, job structure, and coordination.',
      problem: 'As project complexity increases, unclear ownership and weak coordination create expensive drift.',
      included: ['Project review', 'Permit path planning', 'Oversight scope', 'Support structure around execution and milestones'],
      fit: 'This is the right fit when the project is too important to run loosely.',
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
      <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] mb-4 text-orange">
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
        <h3 className="text-2xl font-bold text-navy tracking-tight">{title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-stone-600">{text}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <ServiceCardView key={card.title} card={card} />
        ))}
      </div>
    </div>
  );
}

function ServiceCardView({ card }: { card: ServiceCard }) {
  return (
    <div className="flex h-full flex-col rounded-[22px] border border-stone-200 bg-white p-6 shadow-elev-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev-3 hover:border-orange/25">
      <h4 className="text-[22px] font-extrabold text-navy tracking-tight leading-tight">{card.title}</h4>

      <div className="mt-5 space-y-4 text-[14.5px] leading-relaxed text-stone-700">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">Who it is for</p>
          <p className="mt-2">{card.who}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">What problem it solves</p>
          <p className="mt-2">{card.problem}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">What happens / what is included</p>
          <ul className="mt-2 space-y-2">
            {card.included.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 bg-orange" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">Why this is the right fit</p>
          <p className="mt-2">{card.fit}</p>
        </div>
      </div>

      <div className="mt-auto pt-6">
        {card.calculator ? (
          <ServiceCalculator config={card.calculator} />
        ) : card.itemKey ? (
          <AddToCartButton
            itemKey={card.itemKey}
            label={card.cta}
            className="inline-block w-full rounded-full bg-orange hover:bg-orange-500 py-3 text-center text-sm font-semibold text-white transition-all duration-300"
          />
        ) : (
          <a
            href={card.ctaHref || '#contact'}
            className="inline-block w-full rounded-full bg-navy hover:bg-navy-700 py-3 text-center text-sm font-semibold text-white transition-all duration-300"
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
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950" />
          <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-orange/[0.07] blur-[120px]" />
          <div className="absolute -bottom-32 -left-40 w-[420px] h-[420px] rounded-full bg-blue-500/[0.06] blur-[100px]" />
        </div>
        <div className="relative z-10 container-pro">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                Services & Pricing
              </div>
              <h1 className="mb-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Choose the service based on the problem you need solved.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-white/80 sm:text-xl">
                Some services are fixed and ready to buy now. Some need a few project details before pricing is shown. Larger or less defined work should start with a quote request. Start with the group that matches your role, then choose the service that fits the bottleneck you are dealing with right now.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/55 mb-5">How to use this page</p>
              <div className="space-y-5 text-sm leading-relaxed text-white/78">
                <div>
                  <p className="font-semibold text-white">Buy Now</p>
                  <p className="text-white/65">Use this when the service has a fixed scope and you already know what you need.</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Review Price</p>
                  <p className="text-white/65">Use this when a few project details affect the final price.</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Request a Quote</p>
                  <p className="text-white/65">Use this when the work is larger, less defined, or needs real review before pricing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {avatarSections.map((section, index) => (
        <section key={section.id} id={section.id} className={index % 2 === 0 ? 'py-20 sm:py-24 bg-white' : 'py-20 sm:py-24 bg-stone-50 border-y border-stone-200'}>
          <div className="container-pro">
            <SectionHeader eyebrow={section.eyebrow} title={section.title} text={section.intro} />
            <PurchaseTypeBlock title="Buy Now" text="Use these when the scope is simple, the answer is clear, and you want the fastest path forward." cards={section.buy} />
            <PurchaseTypeBlock title="Review Price" text="Use these when a few project details set the pricing before you move ahead." cards={section.review} />
            <PurchaseTypeBlock title="Request a Quote" text="Use these when the work needs review, planning, or a larger scope conversation first." cards={section.quote} />
          </div>
        </section>
      ))}

      <section id="contact" className="bg-navy-950 py-20 sm:py-24 text-white">
        <div className="container-pro">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] mb-4 text-orange">
                <span className="w-6 h-px bg-orange/50" />
                Contact
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl leading-tight">Use the form when the work is larger, unclear, or needs real review.</h2>
              <div className="mt-6 space-y-4 text-white/78 text-[15px] leading-relaxed">
                <p><strong className="text-white">Buy a service now</strong> when the problem is already defined and the page gives you a direct purchase path.</p>
                <p><strong className="text-white">Review pricing first</strong> when a few details affect scope and price.</p>
                <p><strong className="text-white">Use this form</strong> when the project is larger, less defined, or you need Southern Cities to review the situation before the next step is clear.</p>
                <p><strong className="text-white">What happens next:</strong> once submitted, Southern Cities reviews the request, identifies the right path, and follows up with the next step for pricing, scoping, or project support.</p>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 sm:p-8">
              {submitted ? (
                <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-100">
                  Your request was sent. Southern Cities will review it and follow up with the next step.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input name="name" value={formData.name} onChange={handleChange} required placeholder="Name" className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-orange focus:outline-none" />
                    <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-orange focus:outline-none" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-orange focus:outline-none" />
                    <select name="audience_type" value={formData.audience_type} onChange={handleChange} className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white focus:border-orange focus:outline-none">
                      <option value="">Who are you?</option>
                      <option value="Homeowner">Homeowner</option>
                      <option value="Investor">Investor</option>
                      <option value="Realtor">Realtor</option>
                      <option value="Contractor">Contractor</option>
                      <option value="Developer / Landowner">Developer / Landowner</option>
                    </select>
                  </div>
                  <input name="service" value={formData.service} onChange={handleChange} placeholder="What service or issue are you reaching out about?" className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-orange focus:outline-none" />
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="What is happening right now, what is stuck, and what do you need help moving forward?" className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-orange focus:outline-none" />
                  {error && <p className="text-sm text-red-300">{error}</p>}
                  <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-all hover:-translate-y-0.5 hover:bg-orange-500 disabled:opacity-60">
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
