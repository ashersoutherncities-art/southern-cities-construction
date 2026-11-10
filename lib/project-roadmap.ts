/**
 * Project Readiness Roadmap: transparent, rules-based recommendations.
 * This is NOT a building inspection, quote, loan approval, or risk diagnosis.
 * Keep answers and routing here so the result and CRM message always agree.
 */

export type RoadmapQuestionId = 'location' | 'stage' | 'challenge' | 'timeline';
export type RoadmapAnswers = Record<RoadmapQuestionId, string>;

export type RoadmapQuestion = {
  id: RoadmapQuestionId;
  overline: string;
  title: string;
  helper: string;
  options: { value: string; label: string }[];
};

export const ROADMAP_QUESTIONS: RoadmapQuestion[] = [
  {
    id: 'location',
    overline: '01 · Property location',
    title: 'Where is your investment property?',
    helper: 'We currently serve residential projects throughout North Carolina.',
    options: [
      { value: 'nc-property', label: 'My property is in North Carolina' },
      { value: 'nc-buying', label: 'Actively buying in North Carolina' },
      { value: 'nc-exploring', label: 'Exploring properties in North Carolina' },
      { value: 'outside-nc', label: 'My property is outside North Carolina' },
    ],
  },
  {
    id: 'stage',
    overline: '02 · Project stage',
    title: 'Where are you in the process?',
    helper: 'The right construction support depends on where you are today.',
    options: [
      { value: 'evaluating', label: 'Evaluating a deal' },
      { value: 'under-contract', label: 'Under contract / closing soon' },
      { value: 'own-property', label: 'Own it, preparing to renovate' },
      { value: 'underway', label: 'Construction is already underway' },
    ],
  },
  {
    id: 'challenge',
    overline: '03 · Biggest concern',
    title: "What's your biggest challenge?",
    helper: 'Choose the issue you would most like to resolve first.',
    options: [
      { value: 'costs', label: 'Uncertain renovation costs' },
      { value: 'scope-bids', label: 'Need a detailed scope and bids' },
      { value: 'contractors', label: 'Contractors, delays, or quality problems' },
      { value: 'hands-off', label: 'Want someone to manage everything' },
    ],
  },
  {
    id: 'timeline',
    overline: '04 · Timeline',
    title: 'When do you plan to move forward?',
    helper: 'This helps us prioritize the next step in your roadmap.',
    options: [
      { value: 'within-30', label: 'Immediately / within 30 days' },
      { value: 'one-to-three', label: 'In 1–3 months' },
      { value: 'later', label: 'More than 3 months' },
      { value: 'exploring', label: 'Just exploring' },
    ],
  },
];

export const EMPTY_ROADMAP_ANSWERS: RoadmapAnswers = {
  location: '',
  stage: '',
  challenge: '',
  timeline: '',
};

export function isCompleteRoadmap(answers: RoadmapAnswers): boolean {
  return ROADMAP_QUESTIONS.every((question) =>
    question.options.some((option) => option.value === answers[question.id])
  );
}

export function roadmapAnswerLabel(questionId: RoadmapQuestionId, value: string): string {
  const question = ROADMAP_QUESTIONS.find((item) => item.id === questionId);
  return question?.options.find((option) => option.value === value)?.label || 'Not provided';
}

export type RoadmapResult = {
  code: 'bid-ready' | 'build-ready' | 'execution' | 'outside-nc';
  eyebrow: string;
  title: string;
  price: string;
  description: string;
  reason: string;
  nextSteps: string[];
  whatYouGet: string[];
  productPath: string;
};

/**
 * Answer-based guidance only: never claim a property was inspected,
 * issues "detected," a budget calculated, or a price guaranteed.
 */
export function evaluateRoadmap(answers: RoadmapAnswers): RoadmapResult {
  if (answers.location === 'outside-nc') {
    return {
      code: 'outside-nc',
      eyebrow: 'Service-area match',
      title: 'Your project is outside our current service area',
      price: 'North Carolina projects',
      description: 'Southern Cities Construction currently provides project planning and construction services for properties located in North Carolina.',
      reason: 'You indicated the project is outside North Carolina. Our recommendations and service availability are specific to NC.',
      nextSteps: [
        'Confirm the location of any North Carolina property you are considering.',
        'Use a properly licensed local professional for construction work outside our service area.',
        'Explore our services if you plan to invest in North Carolina.',
      ],
      whatYouGet: ['North Carolina investor resources', 'A clear service-area match'],
      productPath: '/deal-pack',
    };
  }

  if (
    answers.stage === 'underway' ||
    answers.challenge === 'contractors' ||
    answers.challenge === 'hands-off'
  ) {
    return {
      code: 'execution',
      eyebrow: 'Recommended starting point',
      title: 'Project Oversight & Construction Execution',
      price: 'Scoped to your project',
      description: 'Get the right level of contractor coordination, active oversight, or general-contractor execution for your North Carolina property.',
      reason: 'You identified on-the-ground execution, contractor performance, or hands-off management as the most immediate concern.',
      nextSteps: [
        'Identify the project stage, committed scope, and remaining work.',
        'Review contractor responsibilities, permitting, cost exposure, and schedule.',
        'Discuss whether oversight or full general contracting is the appropriate next step.',
      ],
      whatYouGet: [
        'A conversation about your present execution needs',
        'Service options matched to your responsibilities',
        'A path toward documented scope and accountability',
      ],
      productPath: '/consultation',
    };
  }

  if (answers.challenge === 'scope-bids') {
    return {
      code: 'build-ready',
      eyebrow: 'Recommended starting point',
      title: 'Build-Ready Deal Pack',
      price: '$1,997',
      description: 'A more comprehensive preconstruction path for investors who need a clearer scope, execution plan, and coordinated next steps before construction.',
      reason: 'You said your priority is defining the work and aligning bids before proceeding.',
      nextSteps: [
        'Collect property photos, available plans, inspection findings, and existing bids.',
        'Clarify included versus excluded work, specifications, and verification needs.',
        'Review the Build-Ready deliverables and how Bid-Ready can be credited toward an upgrade.',
      ],
      whatYouGet: [
        'More comprehensive construction due diligence',
        'Scope, execution planning, and coordination needs addressed',
        'A documented path toward the next decision',
      ],
      productPath: '/deal-pack',
    };
  }

  return {
    code: 'bid-ready',
    eyebrow: 'Recommended starting point',
    title: 'Bid-Ready Deal Pack',
    price: '$599',
    description: 'Get a written rehab scope and an itemized budget range so you can evaluate the deal before committing to construction.',
    reason: 'You are evaluating an NC investment and identified uncertain renovation costs as your primary obstacle.',
    nextSteps: [
      'Gather any listing photos, inspection findings, measurements, and planned repairs.',
      'Identify what is included in the renovation scope, room by room and system by system.',
      'Use a line-item budget range and a review of unverified conditions to inform your offer and due diligence.',
    ],
    whatYouGet: [
      'Written scope of work and line-item budget range',
      'Assumptions and potential execution issues flagged for verification',
      'Bid-Ready credit toward Build-Ready if you upgrade',
    ],
    productPath: '/deal-pack',
  };
}
