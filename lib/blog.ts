export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  audience: string;
  readTime: string;
  publishedAt: string;
  author: string;
  coverImage: string;
  content: BlogBlock[];
};

export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; title: string; text: string };

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'north-carolina-residential-permit-process',
    title: 'How a residential permit actually moves through a North Carolina jurisdiction',
    excerpt:
      'What Charlotte, Mecklenburg, Cabarrus, Union, and Gaston all expect in an application, what triggers corrections, and where most residential permits stall.',
    category: 'Permitting',
    audience: 'Owners · Investors',
    readTime: '9 min read',
    publishedAt: '2026-04-05',
    author: 'Southern Cities Construction',
    coverImage: '/project-real-1.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'A residential permit in North Carolina is not pulled. It is processed. Every jurisdiction has a front counter, a plan-review track, and an inspection track, and a residential permit sits in a real queue until a reviewer signs off. If the application does not match how the reviewer reads a file, the project stalls before trades ever load a truck.',
      },
      {
        type: 'heading',
        text: 'What every NC residential permit needs before submission',
      },
      {
        type: 'list',
        items: [
          'Parcel and address verified against the county GIS so the jurisdiction routing is correct',
          'Scope narrative that describes the actual work, not just the service type',
          'Site plan, floor plan, and elevation drawings when the scope is structural or additive',
          'Licensed contractor information when the project value exceeds $40,000 (NC GC threshold)',
          'Energy compliance documentation when the envelope is altered (2018 NCECC residential)',
          'Engineer-sealed details for load-bearing changes, foundation modifications, or retaining walls over four feet',
        ],
      },
      {
        type: 'heading',
        text: 'Plan review: where projects actually stall',
      },
      {
        type: 'paragraph',
        text: 'Plan review is the first internal review step after the permit is submitted. A residential plans examiner checks code compliance — not whether the project is a good idea. Most stalls come from four categories: missing or inconsistent drawings, scope mismatch between the narrative and the plans, stamped detail gaps when engineering is required, and zoning conflicts the applicant did not anticipate. When a plan reviewer flags corrections, the clock resets each time the project is resubmitted.',
      },
      {
        type: 'heading',
        text: 'Inspection sequencing that Charlotte and surrounding counties expect',
      },
      {
        type: 'list',
        items: [
          'Footing before concrete is poured — separate trench and reinforcement inspection in some jurisdictions',
          'Foundation and waterproofing before backfill',
          'Rough framing, rough electrical, rough plumbing, and rough mechanical before insulation is installed',
          'Insulation inspection before drywall',
          'Final framing and all final trades before certificate of occupancy or final approval',
        ],
      },
      {
        type: 'callout',
        title: 'What typically blocks the final inspection',
        text: 'Missing smoke and CO detectors wired correctly on residential projects, missing egress dimensions in bedrooms, missing handrails on required stair runs, and missing tempered glass where code requires it. Plan for these during framing, not during final.',
      },
      {
        type: 'heading',
        text: 'Why homeowners lose time on their own permit',
      },
      {
        type: 'paragraph',
        text: 'Homeowner-pulled permits are legal in most North Carolina jurisdictions for work on an owner-occupied residence, but the homeowner is then treated as the contractor of record. That means responsibility for corrections, inspections, insurance exposure, and final sign-off. In practice, we see homeowners lose four to eight weeks on sequencing issues, failed inspections for small code misses, and delays responding to corrections because they are not familiar with the local process. A licensed GC pulling the permit absorbs that entire administrative load.',
      },
      {
        type: 'heading',
        text: 'What structured permit administration actually does',
      },
      {
        type: 'paragraph',
        text: 'Permit administration is not a paper-only service. It is a controlled workflow — scoped application, submission into the correct jurisdiction, documented corrections, tracked inspection scheduling, and closeout documentation. The job of the administrator is to keep the file moving, respond to corrections in one business day, and schedule inspections as soon as the site is ready. That is the difference between a six-week permit cycle and a six-month one.',
      },
    ],
  },
  {
    slug: 'nc-general-contractor-license-basics',
    title: 'What the NC general contractor license actually covers — and where owners get it wrong',
    excerpt:
      'Limited, Intermediate, Unlimited, the $40,000 threshold, the qualifier requirement, and why an "unlicensed" scope is often not as small as owners assume.',
    category: 'Licensing',
    audience: 'Owners · Investors · Subs',
    readTime: '7 min read',
    publishedAt: '2026-04-10',
    author: 'Southern Cities Construction',
    coverImage: '/project-real-3.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'North Carolina licenses general contractors through the NC Licensing Board for General Contractors (NCLBGC). The license is split by classification, by monetary limit, and by the qualifier requirement. An owner deciding how to engage a contractor in North Carolina should understand three things: when a license is required, what the license actually permits the contractor to do, and what a qualifier is.',
      },
      {
        type: 'heading',
        text: 'When a general contractor license is legally required',
      },
      {
        type: 'paragraph',
        text: 'Under NC General Statute 87-1, a license is required for any project whose contract value is $40,000 or more, or whose cumulative scope reaches that threshold. The statute was recently updated from the older $30,000 threshold. Unlicensed contracting above the threshold is a criminal offense, and the contract is generally unenforceable if the contractor is unlicensed. This includes labor-only scopes if the total cost to the owner crosses the threshold.',
      },
      {
        type: 'heading',
        text: 'License classifications owners will see in residential work',
      },
      {
        type: 'list',
        items: [
          'Limited — projects up to $1,000,000 in value (subject to bondable working capital)',
          'Intermediate — projects up to $1,750,000 in value',
          'Unlimited — no monetary cap on project value',
          'Residential — a specific classification scope inside the above tiers',
          'Building — a broader classification that covers most vertical residential and light commercial',
        ],
      },
      {
        type: 'heading',
        text: 'The qualifier — the part most owners do not see',
      },
      {
        type: 'paragraph',
        text: 'Every licensed general contractor in North Carolina must have a qualifier. The qualifier is an individual who has passed the state exam in the relevant classification and is legally tied to the license. Southern Cities Construction holds license L.107724 with qualifier Q.108200. When you hire a general contractor in NC, the license is only valid while a qualifier is actively associated with it. If the qualifier leaves, the license cannot legally engage new contracts.',
      },
      {
        type: 'callout',
        title: 'What to verify before signing with any NC general contractor',
        text: 'Search the NCLBGC public license lookup. Verify the license number, the classification, the limit, and the qualifier. Any active license must list an active qualifier — if the status is "inactive" or the qualifier field is empty, the license cannot legally be used for new work.',
      },
      {
        type: 'heading',
        text: 'Where owners and investors run into problems',
      },
      {
        type: 'list',
        items: [
          'Splitting a single project into multiple contracts to stay under $40,000 — NCLBGC treats the cumulative scope as one project',
          'Assuming a trade license (electrical, plumbing, mechanical) covers general contracting — it does not',
          'Signing with an out-of-state contractor who is not registered in NC — not valid',
          'Accepting "we use our qualifier buddy" arrangements that are not documented',
        ],
      },
      {
        type: 'paragraph',
        text: 'For owners, the cleanest path is to hire a contractor whose license classification actually covers your scope and whose qualifier is clearly listed on the license. For investors running multiple projects, the licensing structure is more important than the hourly rate — you cannot refinance, sell, or close on a project whose permit history ties back to an unlicensed contractor.',
      },
    ],
  },
  {
    slug: 'inspection-failures-that-kill-residential-timelines',
    title: 'The six inspection failures that kill residential timelines in North Carolina',
    excerpt:
      'Why projects fail rough framing, rough mechanical, insulation, and final — and what to document before the inspector shows up.',
    category: 'Inspections',
    audience: 'Owners · Contractors',
    readTime: '6 min read',
    publishedAt: '2026-04-12',
    author: 'Southern Cities Construction',
    coverImage: '/project-real-2.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'An inspection failure is a timeline event, not a quality problem. Every failed inspection in North Carolina costs the project at least one calendar day — typically two or three — because the next inspection slot rolls to the following available window and everyone downstream has to replan. After running jobs across Mecklenburg, Cabarrus, Iredell, Union, and Gaston counties, the same six failures show up.',
      },
      {
        type: 'heading',
        text: '1. Framing not ready because blocking, straps, and connectors are not installed',
      },
      {
        type: 'paragraph',
        text: 'Rough framing inspection assumes the framer has already completed all hold-downs, straps, and connectors required by the plans or by IRC prescriptive tables. If the Simpson hardware is on the ground and not on the wall, the inspection fails. Most NC residential jurisdictions are strict on Table R602.10 bracing methods and hold-down placement at shear walls.',
      },
      {
        type: 'heading',
        text: '2. Rough mechanical failing for missing return air path',
      },
      {
        type: 'paragraph',
        text: 'NC residential mechanical code requires a return air path for every conditioned bedroom that does not have its own return. The common field miss is installing jumper ducts that are undersized or missing transfer grilles on interior walls. This is an inspection item that almost never appears on a permit drawing but is checked every time.',
      },
      {
        type: 'heading',
        text: '3. Rough plumbing failing for missing air admittance valves or improper venting',
      },
      {
        type: 'paragraph',
        text: 'North Carolina allows air admittance valves under specific conditions, but they must be sized, located, and installed per manufacturer listing. Plumbers sometimes set them below the flood level rim of the fixture, which is an automatic fail. Improper venting on kitchen islands is the other common miss.',
      },
      {
        type: 'heading',
        text: '4. Insulation failing for missing air sealing and improper baffles',
      },
      {
        type: 'paragraph',
        text: 'Under 2018 NCECC residential, air sealing must be completed before the insulation inspection — top plates sealed, penetrations foamed, attic access weather-stripped. Baffles at soffit vents must be installed before blown-in insulation. Insulation inspections fail most often because of unsealed penetrations and missing baffles, not because of R-value problems.',
      },
      {
        type: 'heading',
        text: '5. Electrical rough failing for AFCI and tamper-resistant requirements',
      },
      {
        type: 'paragraph',
        text: 'NC has adopted the NEC updates that require AFCI protection on essentially all 120-volt branch circuits in dwelling units. Tamper-resistant receptacles are required throughout. Missed AFCI breakers at laundry, garage, or finished basement circuits are the most common rough electrical fail.',
      },
      {
        type: 'heading',
        text: '6. Final inspection failing for missing smoke/CO, handrails, or egress',
      },
      {
        type: 'list',
        items: [
          'Smoke alarms missing in bedrooms or not interconnected with CO detectors',
          'Handrails missing on stair runs of four or more risers',
          'Egress windows not meeting 5.7 SF opening or 24-inch clear height',
          'Tempered glass missing in bathrooms or within 24 inches of doors',
          'Guard rails under 36 inches on elevated surfaces over 30 inches',
        ],
      },
      {
        type: 'callout',
        title: 'Pre-inspection walk is worth ninety minutes of your week',
        text: 'We walk every rough and every final the day before the scheduled inspection. Roughly 80% of failures we have tracked were avoidable with a documented pre-inspection checklist. The ninety minutes of walk time saves three calendar days of lost schedule.',
      },
    ],
  },
  {
    slug: 'owners-guide-pre-construction-scope-lock',
    title: 'How to lock scope before construction starts — an owner’s guide',
    excerpt:
      'Scope creep in residential construction is not a contractor problem. It is a documentation problem. Here is how scope should be locked before a single trade loads a truck.',
    category: 'Project Planning',
    audience: 'Owners · Developers',
    readTime: '8 min read',
    publishedAt: '2026-04-15',
    author: 'Southern Cities Construction',
    coverImage: '/airbnb-kitchen.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'Scope creep is the main reason residential projects come in over budget in North Carolina. It is not because the contractor lied. It is because the scope was never written tightly enough to hold a price. For owners and developers running renovations, new construction, or major additions, the pre-construction phase is where you either save three months and forty thousand dollars — or lose them.',
      },
      {
        type: 'heading',
        text: 'What a scope-locked project looks like',
      },
      {
        type: 'list',
        items: [
          'A written scope narrative that lists every assembly in plain language',
          'A finish schedule that names every product by manufacturer and SKU',
          'A set of permit-level drawings that agree with the scope narrative',
          'An allowance schedule that flags every open item and what it will cost if the owner picks something in the upper range',
          'A draw schedule that ties payments to documented milestones',
        ],
      },
      {
        type: 'heading',
        text: 'The allowance trap',
      },
      {
        type: 'paragraph',
        text: 'Allowances are the most common source of surprise overages in residential construction. A $3,000 flooring allowance sounds reasonable until the owner selects a $9-per-square-foot hardwood and the home has 1,800 square feet of floor. Every allowance should be sized at the midpoint of what the owner is likely to pick, not at the lowest bid-winning number.',
      },
      {
        type: 'heading',
        text: 'Change orders should be expected, not avoided',
      },
      {
        type: 'paragraph',
        text: 'Any serious contractor will tell you — change orders happen. The question is whether they are documented. A contractor who resists writing change orders is not saving you money. They are removing the paper trail. A clean project has three to seven change orders even when nothing has gone wrong, because scope clarifications are a normal part of construction. What you want is a template and a process, not a promise of "no change orders."',
      },
      {
        type: 'callout',
        title: 'The pre-construction meeting that saves the project',
        text: 'Before permit submission, sit down with the contractor, the owner, and the designer if applicable. Walk the scope narrative, the drawings, and the finish schedule line by line. Ask the contractor to flag every item that is not locked. That meeting — typically 90 minutes — resolves more disputes than any contract clause.',
      },
      {
        type: 'heading',
        text: 'When scope lock is the right moment to bring in a licensed GC',
      },
      {
        type: 'paragraph',
        text: 'For owners planning to self-manage or to hire trades directly, the pre-construction phase is still the right moment to bring in a licensed general contractor for scope review and oversight — even if the owner plans to be the day-to-day PM. Our Owner Consultation and Construction Feasibility Review services exist for exactly this phase. We walk the scope, flag the risk items, and put structure on the execution plan before anyone signs a subcontractor.',
      },
    ],
  },
  {
    slug: 'subcontractor-coordination-residential-nc',
    title: 'How residential subcontractor coordination actually works on a well-run NC project',
    excerpt:
      'Scheduling discipline, documentation, change-order flow, and the communication cadence that separates a clean project from a chaotic one.',
    category: 'Execution',
    audience: 'Contractors · Subs · Owners',
    readTime: '6 min read',
    publishedAt: '2026-04-18',
    author: 'Southern Cities Construction',
    coverImage: '/project-real-5.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'Subcontractor coordination is the single operational difference between a residential project that finishes on schedule and one that does not. The trades are not the problem. The sequencing, the handoffs, and the documentation are. After years of running residential work across North Carolina, the projects that finish clean have the same four things in place.',
      },
      {
        type: 'heading',
        text: '1. A documented sequence that every sub signs off on',
      },
      {
        type: 'paragraph',
        text: 'A clean residential project has a written sequence of operations that each trade receives before they mobilize. The sequence is not a gantt chart — it is a narrative. Framing finishes Thursday. Rough mechanical starts Friday morning. Rough electrical overlaps with rough plumbing through the following Wednesday. Insulation is scheduled for the Monday after that. Every sub sees the sequence, acknowledges it, and knows what happens if they are late.',
      },
      {
        type: 'heading',
        text: '2. A pre-trade walk with the GC and the sub',
      },
      {
        type: 'paragraph',
        text: 'Before any trade starts, the GC walks the site with the sub and confirms that the site is ready for them. This sounds obvious. It is skipped on most chaotic projects. A 20-minute walk surfaces every site issue — missed blocking, incomplete demo, unresolved scope questions — before the sub is burning hours waiting for a decision.',
      },
      {
        type: 'heading',
        text: '3. Change-order flow that protects the sub',
      },
      {
        type: 'list',
        items: [
          'Any scope change gets a written change order before the sub performs the work',
          'The change order is approved by the owner or owner rep before the work starts',
          'The sub is paid on the agreed milestone even if other trades are delayed',
          'Disputes are resolved on paper, not on the tailgate of a truck',
        ],
      },
      {
        type: 'heading',
        text: '4. A communication cadence that everyone respects',
      },
      {
        type: 'paragraph',
        text: 'The best residential projects we run have a Monday schedule check, a mid-week progress note, and a Friday look-ahead. Three scheduled touchpoints per week. Everything else is by exception. Subs who know the cadence show up prepared and leave the job site without questions. Owners who know the cadence stop calling the contractor at 10pm on Tuesday.',
      },
      {
        type: 'callout',
        title: 'Why we built a vetted subcontractor network',
        text: 'Coordination is only possible when the trades on the job already know how to work inside a documented process. Our recommended partner network exists so owners and GCs can pull from subs who already understand the cadence, the documentation expectations, and the quality bar — without starting the relationship from scratch.',
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
