import { ServiceCalculatorConfig } from '@/components/ServiceCalculator';

export type ServiceCardData = {
  title: string;
  summary: string;
  details: string[];
  fit: string;
  purchaseType: 'buy' | 'review' | 'quote';
  cta: string;
  itemKey?: string;
  ctaHref?: string;
  calculator?: ServiceCalculatorConfig;
  monthlyPrice?: string;
  monthlyLimit?: string;
  turnaround?: string;
  tag?: string;
};

export type AvatarPageData = {
  slug: string;
  eyebrow: string;
  shortLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  painPoints: string[];
  outcomes: string[];
  buy?: ServiceCardData[];
  review?: ServiceCardData[];
  quote?: ServiceCardData[];
  ongoingSupport?: ServiceCardData[];
  recurringIntro?: string;
};

const homeownerServices: AvatarPageData = {
  slug: 'homeowners',
  eyebrow: 'Homeowners',
  shortLabel: 'For Homeowners',
  heroTitle: 'Construction help for homeowners who need a clearer path',
  heroSubtitle:
    'Southern Cities helps homeowners make sense of project decisions, budget questions, permit steps, and active work that needs stronger oversight.',
  painPoints: [
    'The next step is unclear.',
    'Budget uncertainty is making decisions harder.',
    'The permit side feels confusing or slow.',
    'The work feels hard to trust or loosely managed.',
  ],
  outcomes: [
    'Clearer direction on what to do next.',
    'Better budget visibility before the job gets more expensive.',
    'Cleaner permit path and better follow-through.',
    'Stronger oversight when the project needs tighter control.',
  ],
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
    {
      title: 'Budget Estimate',
      summary: 'A clear budget estimate for homeowners who need a better number before deciding how to move forward.',
      details: ['Project scope review', 'Written budget estimate', 'Visible-condition assumptions', 'Clear summary of likely cost range'],
      fit: 'Useful when you need pricing clarity before the project gets more expensive or more confusing.',
      purchaseType: 'buy',
      cta: 'Request Budget Estimate',
      ctaHref: '#contact',
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
    {
      title: 'Permit Path Review',
      summary: 'A clearer read on what the permit path looks like before the project loses more time to uncertainty.',
      details: ['Permit requirements review', 'Likely approval path', 'Known risk points', 'Recommended next step'],
      fit: 'Useful when you are not sure what permitting will require or how it may affect timing.',
      purchaseType: 'review',
      cta: 'Review Permit Path Pricing',
      ctaHref: '#contact',
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

const investorServices: AvatarPageData = {
  slug: 'investors',
  eyebrow: 'Investors',
  shortLabel: 'For Investors',
  heroTitle: 'Construction support for investors who need clearer numbers and fewer expensive delays',
  heroSubtitle:
    'Southern Cities helps investors reduce delay, tighten scope, improve budget clarity, support lender conversations, and keep active work from dragging on timeline, rent, and margin.',
  painPoints: [
    'Scope is unclear and budget confidence is weak.',
    'Lender and draw support is messy or incomplete.',
    'Turns and active work are dragging on timeline and margin.',
    'The project needs tighter control before delay gets expensive.',
  ],
  outcomes: [
    'Clearer numbers and better scope confidence.',
    'Stronger lender-facing support and cleaner draw communication.',
    'Faster decisions on turns and active work.',
    'Better oversight when the project cannot afford to drift.',
  ],
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
  recurringIntro:
    'If the same type of project-support problem keeps coming back, Southern Cities also offers capped monthly support plans for repeated investor and operator pain.',
  ongoingSupport: [
    {
      title: 'Turn Support Plan',
      tag: 'Entry plan',
      summary: 'Monthly support for owners with recurring turns and routine project decisions that keep pulling attention away from the rest of the business.',
      details: ['Up to 2 turn or project reviews each month', 'Up to 2 budget or scope reviews each month', 'Basic permit and admin guidance on active files', 'Priority response during business hours'],
      fit: 'They are paying monthly to avoid vacancy drag, slow decisions, and repeated project babysitting on routine work.',
      purchaseType: 'review',
      cta: 'Review Turn Support Plan',
      ctaHref: '/recurring-support#investors',
      monthlyPrice: '$749/mo',
      monthlyLimit: 'Up to 2 reviews and up to 3 active properties',
      turnaround: '1 business day response target',
    },
    {
      title: 'Operator Support Plan',
      tag: 'Most practical',
      summary: 'A stronger recurring support plan for investors who need more frequent scope clarity, pricing help, lender-facing support, and cleaner execution follow-through.',
      details: ['Up to 4 project or turn reviews each month', 'Up to 4 budget or scope reviews each month', '1 lender scope and bid package each month', '1 draw review support item each month'],
      fit: 'They are paying monthly to avoid delay, weak scope clarity, funding friction, and repeated operator involvement in jobs that should move faster.',
      purchaseType: 'review',
      cta: 'Review Operator Support Plan',
      ctaHref: '/recurring-support#investors',
      monthlyPrice: '$1,499/mo',
      monthlyLimit: '4 reviews, 1 lender package, 1 draw item',
      turnaround: 'Same-day acknowledgment, 1 business day standard response',
    },
    {
      title: 'Project Support Retainer',
      tag: 'Higher-touch',
      summary: 'A retainer for higher-volume operators who need weekly control, repeated construction-side review, and a stronger lane for active project oversight.',
      details: ['Weekly project-control touchpoint', 'Up to 6 project reviews monthly', 'Up to 6 budget or scope items monthly', 'Up to 2 lender or draw support items monthly'],
      fit: 'They are paying monthly to avoid too many active moving parts, too much owner babysitting, and weak control across live jobs.',
      purchaseType: 'quote',
      cta: 'Request Retainer Review',
      ctaHref: '/recurring-support#investors',
      monthlyPrice: 'Starting at $2,500/mo',
      monthlyLimit: 'Capped support volume, site visits separate',
      turnaround: 'Priority 24-hour response target',
    },
  ],
};

const realtorServices: AvatarPageData = {
  slug: 'realtors',
  eyebrow: 'Realtors',
  shortLabel: 'For Realtors',
  heroTitle: 'Construction-side support for realtors when inspection issues and listing prep start slowing the deal',
  heroSubtitle:
    'Southern Cities helps realtors get faster repair direction, clearer listing-prep answers, and practical construction guidance before deals, listings, and client confidence start slipping.',
  painPoints: [
    'Inspection reports are creating confusion.',
    'Repair questions are delaying client decisions.',
    'Listing prep needs clearer scope and timing.',
    'Client confidence drops when no one can explain the work simply.',
  ],
  outcomes: [
    'Faster construction-side answers.',
    'Clearer repair path and listing prep direction.',
    'Stronger client confidence.',
    'Better transaction and listing momentum.',
  ],
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
  recurringIntro:
    'If inspection questions, listing-prep indecision, and repeated client repair questions keep eating time, these monthly plans give you a defined way to get answers faster without starting from scratch every time.',
  ongoingSupport: [
    {
      title: 'Deal Desk',
      tag: 'Main offer',
      summary: 'Recurring support for active deals that need faster repair direction and inspection answers before the deal starts dragging.',
      details: ['Up to 4 active deal reviews each month', 'Inspection report review and repair-priority guidance', 'Up to 2 rough pricing-direction requests each month', 'Written summaries the agent can use in client conversations'],
      fit: 'Best when inspection issues and repair questions keep slowing deals down and making client conversations harder than they should be.',
      purchaseType: 'review',
      cta: 'Review Deal Desk',
      ctaHref: '/recurring-support#realtors',
      monthlyPrice: '$649/mo',
      monthlyLimit: '4 deal cases and 2 pricing-direction requests',
      turnaround: '1 business day response, same-day triage target on urgent active-deal items',
    },
    {
      title: 'Listing Prep Desk',
      tag: 'Main offer',
      summary: 'Monthly support for agents who repeatedly need better pre-listing repair direction before seller indecision turns into delay.',
      details: ['Up to 4 listing-prep reviews each month', 'Repair vs leave-alone guidance', 'Prep-priority and sequencing notes', 'Up to 2 follow-up clarifications per property'],
      fit: 'Best when sellers keep getting stuck on what to fix, what to skip, and what is worth spending money on before the listing goes live.',
      purchaseType: 'review',
      cta: 'Review Listing Prep Desk',
      ctaHref: '/recurring-support#realtors',
      monthlyPrice: '$649/mo',
      monthlyLimit: '4 listing-prep reviews, 2 clarifications per property',
      turnaround: '1 business day first response, 2 business day standard guidance delivery',
    },
    {
      title: 'Agent Support Line',
      tag: 'Secondary offer',
      summary: 'A broader recurring support plan for high-activity agents who need faster answers across listings, repair questions, and active deals.',
      details: ['Up to 8 support requests each month', 'Mixed-use support across deals and listings', 'Up to 2 short calls per month', 'Priority queue handling for submitted requests'],
      fit: 'Best when repeated contractor chasing, slow client answers, and constant re-explaining are eating too much time every week.',
      purchaseType: 'review',
      cta: 'Review Agent Support Line',
      ctaHref: '/recurring-support#realtors',
      monthlyPrice: '$1,050/mo',
      monthlyLimit: '8 support requests and 2 short calls',
      turnaround: 'Same business day first response, 1 business day standard turnaround',
    },
    {
      title: 'Team Deal & Listing Desk',
      tag: 'Team plan',
      summary: 'Pooled recurring support for small teams and boutique brokerages that want one place to send recurring deal and listing questions.',
      details: ['Up to 15 pooled support cases each month', 'Shared support lane for up to 5 agents', 'One monthly 30-minute team call', 'Consistent written guidance across listing and deal questions'],
      fit: 'Best when too many agents are solving repair and prep questions alone, wasting time, and giving clients inconsistent answers.',
      purchaseType: 'quote',
      cta: 'Request Team Plan',
      ctaHref: '/recurring-support#realtors',
      monthlyPrice: '$2,400/mo',
      monthlyLimit: '15 pooled cases, up to 5 covered agents',
      turnaround: '1 business day first response, same-day triage for urgent active-deal items when possible',
    },
  ],
};

const contractorServices: AvatarPageData = {
  slug: 'contractors',
  eyebrow: 'Contractors',
  shortLabel: 'For Contractors',
  heroTitle: 'Permit and back-office support for contractors who need field time back',
  heroSubtitle:
    'Southern Cities helps contractors reduce paperwork drag, inspection delays, correction follow-up, and coordination burden without hiring full-time office staff.',
  painPoints: [
    'Permit paperwork keeps slowing production down.',
    'Inspection follow-up keeps pulling attention off the field.',
    'Correction handling gets dropped or delayed.',
    'The office side is too thin for the job load.',
  ],
  outcomes: [
    'More field focus and less paperwork drag.',
    'Cleaner permit handling and better inspection follow-through.',
    'More office support without full-time payroll.',
    'Better coordination when active jobs start feeling stretched.',
  ],
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
    {
      title: 'Inspection Scheduling Support',
      summary: 'Support for contractors who need inspections lined up, tracked, and followed through without extra back-and-forth.',
      details: ['Inspection scheduling', 'Follow-up coordination', 'Correction tracking', 'Status updates'],
      fit: 'Useful when inspection handling keeps pulling attention off production.',
      purchaseType: 'review',
      cta: 'Review Inspection Support Pricing',
      ctaHref: '#contact',
    },
    {
      title: 'Admin Support for Active Jobs',
      summary: 'Back-office support for contractors who need help with paperwork, follow-up, and coordination on live residential work.',
      details: ['Admin task review', 'Coordination support', 'Documentation follow-up', 'Clear next-step support'],
      fit: 'Useful when the job load is outgrowing the office support behind it.',
      purchaseType: 'review',
      cta: 'Review Admin Support Pricing',
      ctaHref: '#contact',
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
  recurringIntro:
    'For contractors, recurring support is one of the strongest fits. If the same permit, inspection, and admin pain keeps coming back, the monthly plans below are the cleaner path.',
  ongoingSupport: [
    {
      title: 'Permit & Inspection Support Plan',
      tag: 'Entry plan',
      summary: 'Monthly support for contractors who need permit follow-up, inspection scheduling, and correction handling taken off their plate.',
      details: ['Up to 4 permit or admin requests each month', 'Inspection scheduling support', 'Correction follow-up support', 'Permit status coordination on active files'],
      fit: 'They are paying monthly to avoid office work pulling time away from production and slowing jobs down.',
      purchaseType: 'review',
      cta: 'Review Permit & Inspection Plan',
      ctaHref: '/recurring-support#contractors',
      monthlyPrice: '$899/mo',
      monthlyLimit: '4 requests and up to 2 active jobs',
      turnaround: '1 business day response target',
    },
    {
      title: 'Back-Office Support Plan',
      tag: 'Strongest recurring fit',
      summary: 'A broader monthly support plan for contractors who need recurring help with admin, follow-up, documentation, and coordination across active residential jobs.',
      details: ['Up to 8 support requests each month', 'Permit and admin support', 'Inspection coordination', 'Documentation and follow-up support'],
      fit: 'They are paying monthly to avoid back-office overload that is choking field production and forcing the owner to carry too much admin burden personally.',
      purchaseType: 'review',
      cta: 'Review Back-Office Plan',
      ctaHref: '/recurring-support#contractors',
      monthlyPrice: '$1,750/mo',
      monthlyLimit: '8 requests and up to 4 active jobs',
      turnaround: 'Same-day acknowledgment, 1 business day standard response',
    },
    {
      title: 'Contractor Office Extension Retainer',
      tag: 'Higher-touch',
      summary: 'A retainer for busy contractors who need a steadier outside office-support lane without building a full internal admin team yet.',
      details: ['Weekly check-in', 'Up to 12 support requests each month', 'Priority permit and inspection coordination', 'Documentation and follow-up support across active jobs'],
      fit: 'They are paying monthly to avoid hiring pressure, admin chaos, and revenue-producing field time getting eaten by office problems.',
      purchaseType: 'quote',
      cta: 'Request Retainer Review',
      ctaHref: '/recurring-support#contractors',
      monthlyPrice: 'Starting at $2,900/mo',
      monthlyLimit: 'Defined active-job cap, no unlimited request volume',
      turnaround: 'Priority 24-hour response target',
    },
  ],
};

const developerServices: AvatarPageData = {
  slug: 'developers-landowners',
  eyebrow: 'Developers / Landowners',
  shortLabel: 'For Developers / Landowners',
  heroTitle: 'Project support for larger residential work where delay and drift get expensive fast',
  heroSubtitle:
    'Southern Cities helps developers and landowners reduce permit uncertainty, scope drift, and execution slippage before bigger money gets committed in the wrong direction.',
  painPoints: [
    'Permit path and next steps are not clear enough.',
    'Scope and cost uncertainty is still too high.',
    'Coordination is weak for the size of the project.',
    'Milestone discipline and execution control need to tighten up.',
  ],
  outcomes: [
    'Clearer path before bigger money gets committed.',
    'Stronger scope and budget visibility.',
    'Better coordination and steadier oversight.',
    'Less drift on active residential work.',
  ],
  review: [
    {
      title: 'Project Review',
      summary: 'An early review for larger residential projects that need clearer scope, permit visibility, and execution planning.',
      details: ['Project review', 'Permit-path observations', 'Risk notes', 'Recommended next step'],
      fit: 'Useful when you need an informed read before the project gets further into motion.',
      purchaseType: 'review',
      cta: 'Review Project Pricing',
      ctaHref: '#contact',
    },
    {
      title: 'Budget & Scope Review',
      summary: 'A clearer look at likely scope and cost before larger residential work starts drifting financially.',
      details: ['Scope review', 'Budget observations', 'Visible assumptions', 'Cost-risk notes'],
      fit: 'Useful when you need better early visibility into scope and cost.',
      purchaseType: 'review',
      cta: 'Review Budget & Scope Pricing',
      ctaHref: '#contact',
    },
  ],
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
  recurringIntro:
    'For repeat operators, monthly support makes sense when delay, drift, and repeated follow-up keep showing up across multiple files.',
  ongoingSupport: [
    {
      title: 'Project Control Plan',
      tag: 'Entry plan',
      summary: 'Monthly support for repeat operators who need a clearer read on active projects, upcoming risks, and the next decision that matters.',
      details: ['Up to 2 active project reviews each month', 'Milestone check-ins', 'Permit-path and coordination guidance', 'Risk and next-step summaries'],
      fit: 'They are paying monthly to avoid project drift, weak accountability, and poor visibility into what needs to happen next.',
      purchaseType: 'review',
      cta: 'Review Project Control Plan',
      ctaHref: '/recurring-support#developers',
      monthlyPrice: '$1,250/mo',
      monthlyLimit: '2 active projects and 2 formal reviews',
      turnaround: '1 business day response target',
    },
    {
      title: 'Execution Oversight Retainer',
      tag: 'Higher-touch',
      summary: 'A retainer for repeat operators who need weekly oversight structure, better coordination, and stronger control across larger or more active residential projects.',
      details: ['Weekly oversight touchpoint', 'Up to 4 project reviews each month', 'Budget and scope review support', 'Milestone and risk summaries'],
      fit: 'They are paying monthly to avoid loss of control across active files, weak coordination, and expensive slippage caused by loose project structure.',
      purchaseType: 'quote',
      cta: 'Request Oversight Retainer Review',
      ctaHref: '/recurring-support#developers',
      monthlyPrice: 'Starting at $3,500/mo',
      monthlyLimit: 'Defined project cap, meetings and site visits scoped separately',
      turnaround: 'Priority 24-hour response target',
    },
  ],
};

export const avatarPages: AvatarPageData[] = [
  homeownerServices,
  investorServices,
  realtorServices,
  contractorServices,
  developerServices,
];

export const avatarOverviewCards = avatarPages.map((page) => ({
  href: `/services/${page.slug}`,
  eyebrow: page.eyebrow,
  title: page.heroTitle,
  pain: page.painPoints[0],
  outcome: page.outcomes[0],
  cta: `See ${page.eyebrow} Services`,
}));

export function getAvatarPage(slug: string) {
  return avatarPages.find((page) => page.slug === slug);
}
