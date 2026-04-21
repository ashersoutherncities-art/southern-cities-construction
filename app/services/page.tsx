'use client';

import { useState } from 'react';
import AddToCartButton from '@/components/AddToCartButton';
import ServiceCalculator, { ServiceCalculatorConfig } from '@/components/ServiceCalculator';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

type ServiceCard = {
  title: string;
  description: string;
  forWho: string;
  deliverables: string[];
  price: string;
  cta: string;
  audience?: string;
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

type ServiceSectionIntro = {
  eyebrow: string;
  title: string;
  text: string;
};

const FLAGSHIP_SERVICE: ServiceCard = {
  title: 'Permit Administration + Construction Oversight',
  description: 'We pull the permit under our license, coordinate inspections, and stay on the job as the general contractor of record from permit through closeout.',
  forWho: 'For owners and investors who need a licensed GC to take responsibility for a permitted job and want an estimated price before submitting the project.',
  deliverables: [
    'Permit pulled under our license',
    'Inspection coordination and milestone tracking',
    'Progress oversight and documentation',
    'Issue escalation when the work drifts off track',
  ],
  price: 'Calculated by square footage and county',
  cta: 'Review Estimated Price',
  badge: 'Flagship',
  audience: 'Owners / Investors',
  calculator: {
    itemKey: 'flagship-permit-oversight',
    actionLabel: 'Add to Cart',
    actionType: 'cart',
    fields: [
      {
        name: 'address',
        label: 'Project address',
        type: 'select',
        defaultValue: 'mecklenburg-charlotte',
        options: [
          { value: 'mecklenburg-charlotte', label: 'Charlotte / Mecklenburg County' },
          { value: 'cabarrus-concord', label: 'Concord / Cabarrus County' },
          { value: 'iredell-mooresville', label: 'Mooresville / Iredell County' },
          { value: 'union-matthews', label: 'Matthews / Union County' },
          { value: 'gaston-gastonia', label: 'Gastonia / Gaston County' },
          { value: 'other-county', label: 'Other county in North Carolina' },
        ],
      },
      {
        name: 'squareFootage',
        label: 'Approximate heated square footage',
        type: 'select',
        defaultValue: 'under-1500',
        options: [
          { value: 'under-1500', label: 'Under 1,500 SF' },
          { value: '1500-2500', label: '1,500 to 2,500 SF' },
          { value: '2500-4000', label: '2,500 to 4,000 SF' },
          { value: '4000-plus', label: '4,000+ SF' },
        ],
      },
      {
        name: 'projectType',
        label: 'Project type',
        type: 'select',
        defaultValue: 'renovation',
        options: [
          { value: 'renovation', label: 'Renovation / remodel' },
          { value: 'addition', label: 'Addition' },
          { value: 'new-build', label: 'New build' },
        ],
      },
    ],
    calculatePrice: (values) => {
      const county = String(values.address);
      const squareFootage = String(values.squareFootage);
      const projectType = String(values.projectType);
      const base = projectType === 'new-build' ? 850000 : projectType === 'addition' ? 650000 : 450000;
      const sfAdd = squareFootage === '4000-plus' ? 300000 : squareFootage === '2500-4000' ? 180000 : squareFootage === '1500-2500' ? 90000 : 0;
      const countyAdd = county === 'other-county' ? 125000 : county === 'union-matthews' || county === 'cabarrus-concord' ? 75000 : county === 'iredell-mooresville' || county === 'gaston-gastonia' ? 50000 : 0;
      return base + sfAdd + countyAdd;
    },
  },
};

const SUBSCRIPTIONS: ServiceCard[] = [
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
    audience: 'Contractors',
    itemKey: 'sub-network-access',
  },
  {
    title: 'Contractor Permit Desk',
    description: 'We act as your permit desk for repeat permit submission, follow-up, corrections, and inspection scheduling.',
    forWho: 'For general contractors and trade contractors pulling permits regularly and wanting a steady administrative partner.',
    deliverables: [
      'Ongoing permit submission support',
      'Correction response coordination',
      'Inspection scheduling workflow',
      'Permit status tracking across active jobs',
    ],
    price: '$750/mo',
    cta: 'Request a Quote',
    audience: 'Contractors',
    ctaHref: '#contact',
  },
  {
    title: 'Investor Turn Support',
    description: 'We stay available for repeat turns, repair scopes, and construction-side review as units and projects come up.',
    forWho: 'For investors and small operators who need repeat help getting units, listings, and repair decisions moving.',
    deliverables: [
      'Recurring project intake',
      'Repair scope and turnover coordination',
      'Priority review for active jobs',
      'Construction-side planning support',
    ],
    price: '$1,250/mo',
    cta: 'Request a Quote',
    audience: 'Investors',
    ctaHref: '#contact',
  },
  {
    title: 'Realtor Repair Desk',
    description: 'We become the repeat construction contact for inspection issues, listing prep, and repair questions tied to active deals.',
    forWho: 'For realtors and teams who want a repeat contractor relationship instead of starting from scratch on every deal.',
    deliverables: [
      'Inspection-response support',
      'Pre-listing repair planning',
      'Fast construction-side guidance',
      'Repeat coordination for active deals',
    ],
    price: '$500/mo',
    cta: 'Request a Quote',
    audience: 'Realtors',
    ctaHref: '#contact',
  },
];

const FEE_BASED_FIXED: ServiceCard[] = [
  {
    title: 'Permit Help',
    description: 'We manage permit administration, jurisdiction coordination, correction responses, and inspection scheduling for licensed contractors who remain on the permit.',
    forWho: 'For licensed contractors who need a more formal back-office permit partner while keeping permit responsibility in their own name.',
    deliverables: [
      'Permit application preparation and submission',
      'Jurisdiction follow-up and correction response handling',
      'Inspection scheduling and status coordination',
      'Permit tracking through final approval or closeout',
    ],
    price: '$1,500-$3,500 per permit',
    cta: 'Add to Cart',
    audience: 'Contractors',
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
    audience: 'Realtors / Buyers',
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
    audience: 'Homeowners',
    itemKey: 'home-assessment',
  },
];

const FEE_BASED_CALCULATED: ServiceCard[] = [
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
    audience: 'Realtors / Sellers',
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
    audience: 'Investors / Property Managers',
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
    audience: 'Contractors / Owners',
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

const PROJECT_SUPPORT_SERVICES: ServiceCard[] = [
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
    audience: 'Investors',
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
    audience: 'Realtors',
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
    audience: 'Homeowners',
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
    audience: 'Investors / Developers / Owners',
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

const SECTION_INTROS: Record<'subscriptions' | 'fixed' | 'calculated' | 'project', ServiceSectionIntro> = {
  subscriptions: {
    eyebrow: 'Subscriptions',
    title: 'Recurring support for repeat operators',
    text: 'These are ongoing services for clients who need repeat access, repeat coordination, or overflow support.',
  },
  fixed: {
    eyebrow: 'Fee Based Fixed',
    title: 'Straightforward services with fixed pricing',
    text: 'Use these when the scope is simple, the price is clear, and you want direct cart checkout.',
  },
  calculated: {
    eyebrow: 'Fee Based Calculated',
    title: 'Services that need job details before pricing',
    text: 'Use the form fields first, review the estimated price, then add the service to cart once the job details are in place.',
  },
  project: {
    eyebrow: 'Project Based',
    title: 'Custom quote work for full jobs and larger scopes',
    text: 'Use this when the project is a full renovation, new build, or larger scope that needs a real review before price is discussed.',
  },
};

function SectionHeader({ title, text, light = false, eyebrow }: { title: string; text: string; light?: boolean; eyebrow?: string }) {
  return (
    <div className="mb-12 max-w-3xl">
      {eyebrow && (
        <span className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] mb-4 ${light ? 'text-white/55' : 'text-orange'}`}>
          <span className={`w-6 h-px ${light ? 'bg-white/30' : 'bg-orange/50'}`} />
          {eyebrow}
        </span>
      )}
      <h2 className={`text-4xl font-extrabold tracking-tight sm:text-5xl leading-[1.08] mb-4 ${light ? 'text-white' : 'text-navy'}`}>{title}</h2>
      <p className={`text-base leading-relaxed sm:text-lg ${light ? 'text-white/65' : 'text-stone-500'}`}>{text}</p>
    </div>
  );
}

function FlagshipCard({ card }: { card: ServiceCard }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 p-8 sm:p-10 lg:p-12 shadow-2xl bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950">
      <div className="absolute -top-20 -right-20 w-[340px] h-[340px] rounded-full bg-orange/[0.1] blur-[100px]" />
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-glow-orange">
          {card.badge || 'Flagship'}
        </span>
      </div>
      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <h2 className="max-w-3xl text-3xl font-extrabold leading-[1.06] text-white sm:text-[42px] tracking-tight">{card.title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{card.description}</p>
          <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-white/55 sm:text-[15px]">{card.forWho}</p>
          <a
            href={card.ctaHref || '#contact'}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-all hover:-translate-y-0.5 hover:bg-orange-500"
          >
            {card.cta}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
        <div className="rounded-[1.75rem] border border-stone-200 bg-white p-7 sm:p-8 text-left shadow-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">What you get</p>
          <ul className="mt-5 space-y-4">
            {card.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[14.5px] leading-relaxed text-stone-700">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-orange/10 text-orange flex items-center justify-center">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href={card.ctaHref || '#contact'}
            className="mt-7 inline-block w-full rounded-full bg-navy hover:bg-navy-700 py-3.5 text-center text-sm font-semibold text-white transition-all duration-300"
          >
            {card.cta}
          </a>
        </div>
      </div>
    </div>
  );
}

function Card({ card }: { card: ServiceCard }) {
  const hasStartingPrice = card.price && (card.price.includes('-') || card.price.toLowerCase().includes('calculated'));
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-stone-200 bg-white shadow-elev-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev-3 hover:border-orange/25">
      <div className="absolute top-0 left-0 right-0 h-1 bg-navy group-hover:bg-orange transition-colors duration-300" />
      {card.badge && (
        <span className="absolute right-4 top-5 rounded-full bg-orange px-3 py-1 text-[10px] tracking-[0.16em] font-bold uppercase text-white">
          {card.badge}
        </span>
      )}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="mb-3 text-[22px] font-extrabold text-navy tracking-tight leading-tight">{card.title}</h3>
        {card.audience && (
          <p className="mb-3 inline-flex w-fit rounded-full border border-orange/20 bg-orange/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-orange">
            {card.audience}
          </p>
        )}
        <p className="mb-3 text-[14.5px] leading-relaxed text-stone-600">{card.description}</p>
        <p className="mb-5 text-[13.5px] leading-relaxed text-stone-500 italic">{card.forWho}</p>
        <ul className="mb-5 flex-1 space-y-2.5">
          {card.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[14px] text-stone-600">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 bg-orange" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {card.price && (
          <div className="mb-5 text-left">
            {hasStartingPrice && (
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Starting price</p>
            )}
            <p className={`${hasStartingPrice ? 'mt-1.5' : ''} text-[26px] sm:text-[30px] font-extrabold leading-[1.05] tracking-tight text-orange break-words`}>{card.price}</p>
          </div>
        )}
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950" />
          <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-orange/[0.07] blur-[120px]" />
          <div className="absolute -bottom-32 -left-40 w-[420px] h-[420px] rounded-full bg-blue-500/[0.06] blur-[100px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '42px 42px' }} />

        <div className="relative z-10 container-pro">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                Services & Pricing
              </div>
              <h1 className="mb-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Construction support that gets the job moving and keeps it under control.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-white/65 sm:text-xl">
                Use Southern Cities when you need permit administration, construction oversight, repair planning, listing prep, or a cleaner path to pricing and execution.
              </p>
              <div className="mt-10 flex flex-col gap-3.5 sm:flex-row">
                <a href="#flagship" className="btn-glow inline-flex items-center justify-center gap-2 rounded-full bg-orange hover:bg-orange-500 px-8 py-4 text-[15px] font-semibold text-white shadow-glow-orange transition-all hover:-translate-y-0.5">
                  See Flagship Service
                </a>
                <a href="#services" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-8 py-4 text-[15px] font-medium text-white transition-all hover:bg-white/[0.12] hover:-translate-y-0.5">
                  Browse All Services
                </a>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/45 mb-5">How this page works</p>
              <div className="space-y-5 text-sm leading-relaxed text-white/72">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange/15 border border-orange/30 text-orange flex items-center justify-center text-[11px] font-bold">1</span>
                  <div>
                    <p className="font-semibold text-white">Buy Now</p>
                    <p className="text-white/55">Fixed-price services, simple scope, direct checkout.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange/15 border border-orange/30 text-orange flex items-center justify-center text-[11px] font-bold">2</span>
                  <div>
                    <p className="font-semibold text-white">Price It First</p>
                    <p className="text-white/55">Standard service, price varies with a few job details.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange/15 border border-orange/30 text-orange flex items-center justify-center text-[11px] font-bold">3</span>
                  <div>
                    <p className="font-semibold text-white">Send the Job</p>
                    <p className="text-white/55">Work that needs review, planning, or a custom proposal.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship */}
      <section id="services" className="py-20 sm:py-24">
        <div className="container-pro">
          <SectionHeader
            eyebrow={SECTION_INTROS.subscriptions.eyebrow}
            title={SECTION_INTROS.subscriptions.title}
            text={SECTION_INTROS.subscriptions.text}
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {SUBSCRIPTIONS.map((card) => (
              <Card key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-stone-50 border-y border-stone-200">
        <div className="container-pro">
          <SectionHeader
            eyebrow={SECTION_INTROS.fixed.eyebrow}
            title={SECTION_INTROS.fixed.title}
            text={SECTION_INTROS.fixed.text}
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[...FEE_BASED_FIXED, PROJECT_SUPPORT_SERVICES[1]].map((card) => (
              <Card key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section id="flagship" className="py-20 sm:py-24">
        <div className="container-pro">
          <SectionHeader
            eyebrow={SECTION_INTROS.calculated.eyebrow}
            title={SECTION_INTROS.calculated.title}
            text={SECTION_INTROS.calculated.text}
          />
          <div className="mb-8">
            <FlagshipCard card={FLAGSHIP_SERVICE} />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {[FEE_BASED_CALCULATED[0], FEE_BASED_CALCULATED[1], PROJECT_SUPPORT_SERVICES[0], PROJECT_SUPPORT_SERVICES[2]].map((card) => (
              <Card key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-stone-50 border-y border-stone-200">
        <div className="container-pro">
          <SectionHeader
            eyebrow={SECTION_INTROS.project.eyebrow}
            title={SECTION_INTROS.project.title}
            text={SECTION_INTROS.project.text}
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[PROJECT_SUPPORT_SERVICES[3], ...PROJECT_DEPENDENT_SERVICES].map((card) => (
              <Card key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* Other Clients */}
      <section className="py-20 sm:py-24 bg-stone-50 border-t border-stone-200">
        <div className="container-pro">
          <SectionHeader
            title="Other clients"
            text="If you work with Southern Cities in a repeat relationship, start here."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {OTHER_CLIENTS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-stone-200 bg-white p-7 shadow-elev-1 card-hover">
                <h3 className="mb-2 text-2xl font-extrabold text-navy tracking-tight">{item.title}</h3>
                <p className="mb-4 text-[14.5px] leading-relaxed text-stone-600">{item.text}</p>
                {item.link && (
                  <a href={item.link} className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange hover:text-orange-500 transition-colors">
                    {item.linkText || 'Learn More'}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section id="contact" className="relative overflow-hidden bg-navy-900 py-24 sm:py-28">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-orange/[0.05] blur-[120px]" />
        <div className="container-pro relative z-10 max-w-3xl">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/55 mb-4">
              <span className="w-6 h-px bg-white/30" />
              Get a quote
              <span className="w-6 h-px bg-white/30" />
            </span>
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl leading-[1.08]">Tell us about the project</h2>
            <p className="text-lg text-white/60 leading-relaxed">Tell us what the project is, what stage it is in, and what kind of help you need.</p>
          </div>

          {submitted ? (
            <div className="rounded-3xl border border-orange/40 bg-white/[0.05] p-10 text-center backdrop-blur-sm">
              <div className="mx-auto w-12 h-12 rounded-full bg-orange/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">We received your request.</h3>
              <p className="text-white/60">We will review the project and follow up with the next step within one business day.</p>
              <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-semibold text-orange hover:text-orange-200 underline">Submit another request</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-10 backdrop-blur-sm">
              <div>
                <label className="mb-2 block text-[13px] font-semibold text-white/80">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[15px] text-white placeholder:text-white/35 focus:outline-none" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[13px] font-semibold text-white/80">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@email.com" className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[15px] text-white placeholder:text-white/35 focus:outline-none" />
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-semibold text-white/80">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(704) 000-0000" className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[15px] text-white placeholder:text-white/35 focus:outline-none" />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[13px] font-semibold text-white/80">I am a...</label>
                  <select name="audience_type" value={formData.audience_type} onChange={handleChange} className="w-full cursor-pointer appearance-none rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[15px] text-white focus:outline-none">
                    <option value="" style={{ color: '#000' }}>Select one...</option>
                    <option value="General Contractor" style={{ color: '#000' }}>General Contractor</option>
                    <option value="Investor" style={{ color: '#000' }}>Investor</option>
                    <option value="Subcontractor" style={{ color: '#000' }}>Subcontractor</option>
                    <option value="Homeowner" style={{ color: '#000' }}>Homeowner</option>
                    <option value="Realtor" style={{ color: '#000' }}>Realtor</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-semibold text-white/80">Service</label>
                  <input type="text" name="service" value={formData.service} onChange={handleChange} placeholder="Permit help, oversight, renovation quote..." className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[15px] text-white placeholder:text-white/35 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-white/80">Project details</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Tell us what the project is and what kind of help you need..." className="w-full resize-none rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[15px] text-white placeholder:text-white/35 focus:outline-none" />
              </div>

              {error && <p className="text-center text-sm text-red-400">{error}</p>}

              <button type="submit" disabled={submitting} className="btn-glow w-full rounded-full bg-orange hover:bg-orange-500 py-4 text-[15px] font-semibold text-white shadow-glow-orange transition-all duration-300 disabled:opacity-60">
                {submitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
