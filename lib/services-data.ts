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
  heroTitle: 'Construction help for homeowners when the project starts feeling expensive, confusing, or hard to trust',
  heroSubtitle:
    'Southern Cities helps homeowners with project decisions, budget questions, permit steps, and active jobs that need tighter follow-through before problems get more expensive.',
  painPoints: [
    'You are not sure what the next step should be.',
    'Budget uncertainty is making decisions harder.',
    'Permit questions are slowing things down.',
    'The work feels loose, unclear, or hard to trust.',
  ],
  outcomes: [
    'A clearer next step.',
    'Fewer budget surprises before the job gets more expensive.',
    'Less permit friction and better follow-through.',
    'Tighter handling when the project starts drifting.',
  ],
  buy: [
    {
      title: 'Home Assessment',
      summary: 'A straightforward review of the property, its condition, and the next step that makes the most sense before you spend more money.',
      details: ['Property walkthrough', 'Condition notes', 'Priority repair list', 'Clear recommendation on what to do next'],
      fit: 'A good starting point when you need a clearer next step before committing to more work or more money.',
      purchaseType: 'buy',
      cta: 'Buy Home Assessment',
      itemKey: 'home-assessment',
    },
    {
      title: 'Owner Consultation',
      summary: 'Direct guidance on a residential project, permit question, or work decision that needs a clear answer.',
      details: ['Project review', 'Practical guidance', 'Risk callouts', 'Recommended next step'],
      fit: 'Useful when the issue is not just the work itself, but the decisions around it.',
      purchaseType: 'buy',
      cta: 'Book Consultation',
      itemKey: 'owner-consultation',
    },
    {
      title: 'Permit Path Review',
      summary: 'A clearer read on what the permit path looks like before the project loses more time to confusion and delay.',
      details: ['Permit requirements review', 'Likely approval path', 'Known risk points', 'Recommended next step'],
      fit: 'Useful when you are not sure what permitting will require or how it may affect timing.',
      purchaseType: 'buy',
      cta: 'Buy Permit Path Review',
      ctaHref: '#contact',
    },
  ],
  review: [
    {
      title: 'Home Project Budget Review',
      summary: 'A clearer budget range for one residential project when you need pricing direction before deciding what to do next.',
      details: ['Project type review', 'Budget range based on simple project inputs', 'Visible-condition assumptions', 'Clear summary of likely cost range'],
      fit: 'Useful when you need pricing direction before the project gets more expensive or more confusing.',
      purchaseType: 'review',
      cta: 'Enter Project Details',
      ctaHref: '#contact',
    },
    {
      title: 'Permit Administration',
      summary: 'Permit help for homeowners who need the paperwork, corrections, and scheduling handled with less confusion and back-and-forth.',
      details: ['Permit review', 'Submission coordination', 'Correction handling', 'Inspection scheduling support'],
      fit: 'Best when the permit side of the project is becoming the bottleneck.',
      purchaseType: 'review',
      cta: 'Request Permit Review',
      itemKey: 'permit-management-service',
    },
  ],
  quote: [
    {
      title: 'Construction Oversight',
      summary: 'Help for active jobs that need tighter coordination, clearer milestones, and steadier follow-through.',
      details: ['Project review', 'Oversight scope', 'Milestone structure', 'Coordination support plan'],
      fit: 'Best when the work is moving, but nobody is managing it closely enough.',
      purchaseType: 'quote',
      cta: 'Request Oversight Review',
      ctaHref: '#contact',
    },
  ],
};

const investorServices: AvatarPageData = {
  slug: 'investors',
  eyebrow: 'Investors',
  shortLabel: 'For Investors',
  heroTitle: 'Construction support for investors who need fewer delays, fewer surprises, and better numbers before spending more money',
  heroSubtitle:
    'Southern Cities helps investors reduce delay, tighten up scope, get a better read on budget, support lender conversations, and keep active work from dragging on timeline, rent, and margin.',
  painPoints: [
    'Scope is still unclear and the budget is not solid enough yet.',
    'Lender and draw support is messy or incomplete.',
    'Turns and active work are dragging on timeline and margin.',
    'Too much is still loose before the delay gets more expensive.',
  ],
  outcomes: [
    'A better read on budget before you move further.',
    'Cleaner lender support and better draw communication.',
    'Faster decisions on turns and active work.',
    'Tighter follow-through when the project cannot afford to drift.',
  ],
  review: [
    {
      title: 'Investor Project Review',
      summary: 'A pre-execution review for investors who need a better read on one property, one project, or one decision before moving forward.',
      details: ['Scope review', 'Execution risk notes', 'Construction and setup feedback', 'Recommended next step'],
      fit: 'Useful when speed matters, but making the wrong call will cost more than slowing down for a better read.',
      purchaseType: 'review',
      cta: 'Enter Project Details',
      calculator: {
        itemKey: 'investor-review',
        actionLabel: 'Add to Cart',
        actionType: 'cart',
        fields: [
          { name: 'properties', label: 'Number of properties', type: 'number', min: 1, max: 4, defaultValue: 1 },
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
          const perProperty = projectType === 'ground-up' ? 59500 : projectType === 'reposition' ? 42500 : 29500;
          return properties * perProperty;
        },
      },
    },
    {
      title: 'Rehab Budget Review',
      summary: 'A clearer budget range for one rehab when you need a better number before making the next decision.',
      details: ['Project type review', 'Budget range based on simple project inputs', 'Visible-condition assumptions', 'Clear summary of likely cost range'],
      fit: 'Useful when you need a cleaner number on one rehab before moving further into bids, lender conversations, or startup decisions.',
      purchaseType: 'review',
      cta: 'Get Budget Pricing',
      ctaHref: '#contact',
    },
    {
      title: 'Turn Budget Review',
      summary: 'A clearer cost range for a vacant unit or turn before delay, rent loss, and scope creep get worse.',
      details: ['Unit count review', 'Condition-based budget range', 'Size and complexity assumptions', 'Clear summary of likely turn budget range'],
      fit: 'Best when you need a cleaner number on a turn before deciding how fast to move, what to approve, or how to price the next step.',
      purchaseType: 'review',
      cta: 'Enter Unit Details',
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
          const base = condition === 'heavy' ? 59500 : condition === 'moderate' ? 39500 : 25000;
          const squareFootageAdd = squareFootage === '1600-plus' ? 20000 : squareFootage === '1200-1600' ? 10000 : 0;
          return units * (base + squareFootageAdd);
        },
      },
    },
    {
      title: 'Contractor Fit Review',
      summary: 'A review for investors who need to decide what kind of contractor setup fits the project before hiring gets expensive.',
      details: ['Project and scope review', 'Contractor model fit guidance', 'Payment expectation review', 'Permit and admin capability review'],
      fit: 'Best when choosing the wrong contractor setup will create avoidable delay, confusion, or startup friction after closing.',
      purchaseType: 'review',
      cta: 'Book Contractor Fit Review',
      ctaHref: '#contact',
    },
    {
      title: 'Bid Coordination & Contractor Match',
      summary: 'Bid coordination for investors who need better proposals from better-fit contractors before awarding the job.',
      details: ['Project review for bid targeting', 'Contractor-fit targeting', 'Bid intake and comparison', 'Fit, gap, and risk notes'],
      fit: 'Best when you need more than random bids and want a cleaner way to compare contractors before startup.',
      purchaseType: 'review',
      cta: 'Request Bid Coordination Review',
      ctaHref: '#contact',
    },
    {
      title: 'Materials Setup Review',
      summary: 'A setup service for investors who need purchasing, delivery timing, and material responsibility handled more cleanly before the job starts.',
      details: ['Materials responsibility review', 'Supplier and delivery flow planning', 'Ordering sequence guidance', 'Procurement workflow notes'],
      fit: 'Best when materials confusion, bad delivery timing, or weak purchasing structure could slow the job down fast.',
      purchaseType: 'review',
      cta: 'Request Materials Setup Review',
      ctaHref: '#contact',
    },
    {
      title: 'Lender Scope & Bid Package',
      summary: 'A scope-of-work and bid package for investors who need numbers they can submit with confidence to a lender or capital partner.',
      details: ['Property and scope review', 'Written scope of work', 'Bid package Southern Cities can stand behind', 'Clear note that pricing is based on visible conditions unless major hidden issues are uncovered'],
      fit: 'Best when you need a lender-ready package that is practical, documented, and tied to what can actually be verified at the property.',
      purchaseType: 'review',
      cta: 'Request Lender Package Review',
      ctaHref: '#contact',
    },
    {
      title: 'Draw Review Support',
      summary: 'Support for investors who need progress, scope, and budget packaged more clearly for draw requests or funding conversations.',
      details: ['Current work review', 'Budget and progress alignment', 'Draw support notes', 'Clear summary of what has been completed and what remains'],
      fit: 'Useful when you need cleaner documentation around progress, budget, and remaining scope.',
      purchaseType: 'review',
      cta: 'Request Draw Review',
      ctaHref: '#contact',
    },
  ],
  quote: [
    {
      title: 'Regional Setup Review',
      summary: 'A broader setup review for investors entering or scaling in a region who want fewer early mistakes before projects start moving.',
      details: ['Regional setup review', 'Contractor ecosystem considerations', 'Permit and process considerations', 'Mobilization-readiness guidance'],
      fit: 'Best when you are entering a region or tightening a repeat model and want fewer early execution mistakes after closing.',
      purchaseType: 'quote',
      cta: 'Request Setup Review',
      ctaHref: '#contact',
    },
    {
      title: 'Construction Oversight',
      summary: 'Help for active projects that need tighter communication, better follow-through, and better accountability.',
      details: ['Project review', 'Oversight scope', 'Milestone structure', 'Coordination support plan'],
      fit: 'Best when the project is active, the risk is real, and tighter execution matters.',
      purchaseType: 'quote',
      cta: 'Request Oversight Review',
      ctaHref: '#contact',
    },
  ],
  recurringIntro:
    'If the same delays, follow-up problems, and budget questions keep coming back, Southern Cities also offers capped monthly plans for repeat investor work.',
  ongoingSupport: [
    {
      title: 'Turn Support Plan',
      tag: 'Entry plan',
      summary: 'Monthly support for owners with recurring turns and routine project decisions that keep pulling attention away from the rest of the business.',
      details: ['Up to 2 turn or project reviews each month', 'Up to 2 budget or scope reviews each month', 'Basic permit and admin guidance on active files', 'Priority response during business hours'],
      fit: 'Best when vacancy drag, slow decisions, and repeated follow-up keep eating time and margin across recurring turns.',
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
      summary: 'A stronger recurring support plan for investors who need more frequent pricing help, lender support, and better follow-through on active work.',
      details: ['Up to 4 project or turn reviews each month', 'Up to 4 budget or scope reviews each month', '1 lender scope and bid package each month', '1 draw review support item each month'],
      fit: 'Best when delay, weak scope clarity, funding friction, and repeated owner follow-up are keeping active jobs from moving cleanly.',
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
      summary: 'A retainer for higher-volume operators who need weekly oversight, repeated project review, and a stronger lane for active job follow-through.',
      details: ['Weekly project-control touchpoint', 'Up to 6 project reviews monthly', 'Up to 6 budget or scope items monthly', 'Up to 2 lender or draw support items monthly'],
      fit: 'Best when too many active files, repeated owner involvement, and weak control are making live jobs harder to manage.',
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
  heroTitle: 'Help for realtors when inspection issues and listing prep start slowing the deal down',
  heroSubtitle:
    'Southern Cities helps realtors get faster repair direction, clearer listing-prep answers, and practical construction guidance before deals, listings, and client confidence start slipping.',
  painPoints: [
    'Inspection reports are creating confusion.',
    'Repair questions are delaying client decisions.',
    'Listing prep needs clearer scope and timing.',
    'Client confidence drops when no one can explain the work simply.',
  ],
  outcomes: [
    'Faster answers on repair and construction questions.',
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
  ],
  review: [
    {
      title: 'Pre-Listing Budget & Prep Review',
      summary: 'A clearer read on what should be fixed, what can be skipped, and what likely prep budget range makes sense before a listing goes live.',
      details: ['Scope review', 'Prep-priority guidance', 'Likely budget range', 'Timeline notes tied to listing goals'],
      fit: 'Useful when presentation and timing both matter, but you need cleaner direction before anyone starts coordinating work.',
      purchaseType: 'review',
      cta: 'Enter Property Details',
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
          const base = condition === 'heavy' ? 59500 : condition === 'standard' ? 39500 : 25000;
          const sizeAdd = propertySize === '2500-plus' ? 20000 : propertySize === '1500-2500' ? 10000 : 0;
          const occupancyAdd = occupancy === 'occupied' ? 5000 : 0;
          return base + sizeAdd + occupancyAdd;
        },
      },
    },
  ],
  quote: [
    {
      title: 'Listing Prep Coordination Review',
      summary: 'Review-first help for listings that need broader prep coordination before they are ready to go live.',
      details: ['Property review', 'Scope planning', 'Coordination plan', 'Quote path based on the work involved'],
      fit: 'Best when the property needs more than a quick repair answer and real coordination will likely be needed.',
      purchaseType: 'quote',
      cta: 'Request Listing Prep Review',
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
  ],
};

const contractorServices: AvatarPageData = {
  slug: 'contractors',
  eyebrow: 'Contractors',
  shortLabel: 'For Contractors',
  heroTitle: 'Permit and back-office help for contractors who need less paperwork and fewer delays',
  heroSubtitle:
    'Southern Cities helps contractors reduce paperwork drag, inspection delays, correction follow-up, and coordination burden without hiring full-time office staff.',
  painPoints: [
    'Permit paperwork keeps slowing production down.',
    'Inspection follow-up keeps pulling attention off the field.',
    'Correction handling gets dropped or delayed.',
    'The office side is too thin for the job load.',
  ],
  outcomes: [
    'Less paperwork drag and more time for production.',
    'Cleaner permit handling and better inspection follow-through.',
    'More office support without full-time payroll.',
    'Better coordination when active jobs start feeling stretched.',
  ],
  review: [
    {
      title: 'Permit Administration',
      summary: 'Permit help for contractors and trade teams that want the paperwork handled more cleanly.',
      details: ['Permit application prep', 'Submission follow-up', 'Correction handling', 'Inspection scheduling support'],
      fit: 'Useful when your team should be focused on the field, not stuck in paperwork.',
      purchaseType: 'review',
      cta: 'Request Permit Review',
      itemKey: 'permit-management-service',
    },
    {
      title: 'Inspection Scheduling Support',
      summary: 'Support for contractors who need inspections lined up, tracked, and followed through without extra back-and-forth.',
      details: ['Inspection scheduling', 'Follow-up coordination', 'Correction tracking', 'Status updates'],
      fit: 'Useful when inspection handling keeps pulling attention off production.',
      purchaseType: 'review',
      cta: 'Get Inspection Support Pricing',
      ctaHref: '#contact',
    },
    {
      title: 'Active Job Admin Triage',
      summary: 'Back-office review support for contractors who need help sorting paperwork, follow-up, and coordination gaps on live residential work.',
      details: ['Admin task review', 'Coordination support', 'Documentation follow-up', 'Clear next-step support'],
      fit: 'Useful when the job load is outgrowing the office support behind it and you need a cleaner reset before more work stacks up.',
      purchaseType: 'review',
      cta: 'Request Admin Review',
      ctaHref: '#contact',
    },
  ],
  quote: [
    {
      title: 'Construction Oversight Support',
      summary: 'Help for contractors who need tighter coordination around milestones, updates, and project follow-through.',
      details: ['Project review', 'Support scope', 'Milestone structure', 'Coordination support plan'],
      fit: 'Best when project control issues are starting to affect production.',
      purchaseType: 'quote',
      cta: 'Request Oversight Review',
      ctaHref: '#contact',
    },
  ],
  recurringIntro:
    'For contractors, monthly support makes sense when the same permit, inspection, and paperwork problems keep coming back across active jobs.',
  ongoingSupport: [
    {
      title: 'Permit & Inspection Support Plan',
      tag: 'Entry plan',
      summary: 'Monthly support for contractors who need permit follow-up, inspection scheduling, and correction handling taken off their plate.',
      details: ['Up to 4 permit or admin requests each month', 'Inspection scheduling support', 'Correction follow-up support', 'Permit status coordination on active files'],
      fit: 'Best when office work keeps pulling time away from production and slowing jobs down.',
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
      fit: 'Best when back-office overload is choking field production and forcing the owner to carry too much admin personally.',
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
      summary: 'A retainer for busy contractors who need steadier outside office help without building a full internal admin team yet.',
      details: ['Weekly check-in', 'Up to 12 support requests each month', 'Priority permit and inspection coordination', 'Documentation and follow-up support across active jobs'],
      fit: 'Best when hiring pressure, admin chaos, and revenue-producing field time are all getting squeezed by office problems.',
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
  heroTitle: 'Project help for larger residential work where delay and drift get expensive fast',
  heroSubtitle:
    'Southern Cities helps developers and landowners reduce permit uncertainty, scope drift, and execution slippage before bigger money gets committed in the wrong direction.',
  painPoints: [
    'Permit path and next steps are still too unclear.',
    'Scope and cost uncertainty is still too high.',
    'Coordination is weak for the size of the project.',
    'Follow-through is not tight enough for a project this important.',
  ],
  outcomes: [
    'A clearer next step before bigger money gets committed.',
    'A better early read on scope and budget.',
    'Better coordination and steadier follow-through.',
    'Less drift on active residential work.',
  ],
  review: [
    {
      title: 'Early Project Review',
      summary: 'An early review for larger residential projects that need a clearer read on scope, permits, and execution before moving further.',
      details: ['Project review', 'Permit-path observations', 'Risk notes', 'Recommended next step'],
      fit: 'Useful when you need an informed read before the project gets further into motion.',
      purchaseType: 'review',
      cta: 'Request Project Review',
      ctaHref: '#contact',
    },
    {
      title: 'Early Budget & Scope Review',
      summary: 'A clearer look at likely scope and cost before larger residential work starts getting more expensive than it should be.',
      details: ['Scope review', 'Budget observations', 'Visible assumptions', 'Cost-risk notes'],
      fit: 'Useful when you need better early visibility into scope and cost.',
      purchaseType: 'review',
      cta: 'Request Budget Review',
      ctaHref: '#contact',
    },
  ],
  quote: [
    {
      title: 'Permit Administration + Construction Oversight',
      summary: 'Help for larger residential projects that need tighter permit handling, job follow-through, and execution.',
      details: ['Project review', 'Permit path planning', 'Oversight scope', 'Execution support around milestones and coordination'],
      fit: 'Best when the project is too important to run loosely.',
      purchaseType: 'quote',
      cta: 'Request Project Review',
      ctaHref: '#contact',
    },
  ],
  recurringIntro:
    'For repeat operators, monthly support makes sense when delay, drift, and repeated follow-up keep showing up across multiple projects.',
  ongoingSupport: [
    {
      title: 'Project Control Plan',
      tag: 'Entry plan',
      summary: 'Monthly support for repeat operators who need a better read on active projects, upcoming risks, and the next decision that matters.',
      details: ['Up to 2 active project reviews each month', 'Milestone check-ins', 'Permit-path and coordination guidance', 'Risk and next-step summaries'],
      fit: 'Best when project drift, weak accountability, and poor visibility keep forcing repeated follow-up and late decisions.',
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
      summary: 'A retainer for repeat operators who need weekly oversight, better coordination, and tighter follow-through across larger or more active residential projects.',
      details: ['Weekly oversight touchpoint', 'Up to 4 project reviews each month', 'Budget and scope review support', 'Milestone and risk summaries'],
      fit: 'Best when weak coordination and loose project structure are causing expensive slippage across active files.',
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
