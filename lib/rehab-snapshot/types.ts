export const INVESTOR_TYPES = [
  'flipper',
  'brrrr',
  'landlord',
  'wholesaler',
  'developer',
  'homeowner',
  'realtor',
  'other',
] as const;

export const LEAD_STATUSES = [
  'new',
  'report_sent',
  'follow_up_needed',
  'booked_call',
  'converted',
  'closed_lost',
] as const;

export const PROPERTY_TYPES = [
  'single_family',
  'duplex',
  'triplex',
  'fourplex',
  'multifamily',
  'manufactured',
  'mixed_use',
  'other',
] as const;

export const OCCUPANCY_STATUSES = ['occupied', 'vacant', 'unknown'] as const;

export const INVESTMENT_STRATEGIES = [
  'flip',
  'rental',
  'brrrr',
  'wholesale_eval',
  'owner_occupied',
  'development',
  'other',
] as const;

export const TARGET_FINISH_LEVELS = [
  'rental_grade',
  'basic_flip',
  'mid_grade',
  'high_end',
  'luxury',
] as const;

export const PROJECT_CATEGORIES = [
  'cosmetic',
  'rental_turn',
  'moderate_rehab',
  'heavy_rehab',
  'full_gut',
  'structural_heavy',
  'addition',
  'unknown',
] as const;

export const CONFIDENCE_LEVELS = ['high', 'moderate', 'low'] as const;
export const EXECUTION_DIFFICULTIES = ['low', 'moderate', 'high', 'severe'] as const;
export const PERMIT_COMPLEXITIES = ['low', 'moderate', 'high', 'unknown'] as const;
export const REPORT_DELIVERY_STATUSES = ['pending', 'sent', 'failed', 'skipped'] as const;

export type InvestorType = (typeof INVESTOR_TYPES)[number];
export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type PropertyType = (typeof PROPERTY_TYPES)[number];
export type OccupancyStatus = (typeof OCCUPANCY_STATUSES)[number];
export type InvestmentStrategy = (typeof INVESTMENT_STRATEGIES)[number];
export type TargetFinishLevel = (typeof TARGET_FINISH_LEVELS)[number];
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type ConfidenceLevel = (typeof CONFIDENCE_LEVELS)[number];
export type ExecutionDifficulty = (typeof EXECUTION_DIFFICULTIES)[number];
export type PermitComplexity = (typeof PERMIT_COMPLEXITIES)[number];
export type ReportDeliveryStatus = (typeof REPORT_DELIVERY_STATUSES)[number];

export type RehabSnapshotScopeInput = {
  cosmetic_paint: boolean;
  flooring: boolean;
  kitchen_refresh: boolean;
  kitchen_full: boolean;
  bathroom_refresh_count: number;
  bathroom_full_count: number;
  roof: boolean;
  hvac: boolean;
  plumbing_partial: boolean;
  plumbing_full: boolean;
  electrical_partial: boolean;
  electrical_full: boolean;
  windows: boolean;
  siding: boolean;
  drywall: boolean;
  framing: boolean;
  structural: boolean;
  foundation: boolean;
  addition: boolean;
  layout_changes: boolean;
  full_gut: boolean;
  fire_damage: boolean;
  water_damage: boolean;
  mold_concern: boolean;
  termite_concern: boolean;
  exterior_work: boolean;
  landscaping: boolean;
  driveway: boolean;
  permit_required_unknown: boolean;
  notes: string;
};

export type RehabSnapshotProjectInput = {
  property_address: string;
  city: string;
  state: string;
  zip: string;
  property_type: PropertyType;
  square_feet: number;
  year_built: number | null;
  stories: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  occupancy_status: OccupancyStatus;
  investment_strategy: InvestmentStrategy;
  target_finish_level: TargetFinishLevel;
};

export type RehabSnapshotLeadInput = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_name: string | null;
  investor_type: InvestorType;
  source: string;
};

export type EstimateRuleRecord = {
  id?: string;
  rule_name: string;
  category: string;
  condition_json: Record<string, unknown>;
  low_value: number;
  high_value: number;
  unit: 'per_sf' | 'flat' | 'per_item' | 'multiplier' | 'weeks';
  active?: boolean;
};

export type EstimateBreakdownRow = {
  label: string;
  low: number;
  high: number;
  notes?: string;
};

export type EstimateComputation = {
  projectCategory: ProjectCategory;
  estimatedLow: number;
  estimatedHigh: number;
  highRiskEstimate: number;
  timelineLowWeeks: number;
  timelineHighWeeks: number;
  confidenceLevel: ConfidenceLevel;
  confidenceScore: number;
  executionDifficulty: ExecutionDifficulty;
  permitComplexity: PermitComplexity;
  riskFlags: string[];
  assumptions: string[];
  whatCouldChangeThisNumber: string[];
  recommendedNextStep: string;
  executionSummary: string;
  breakdown: EstimateBreakdownRow[];
};

export type StoredUpload = {
  bucket: string;
  path: string;
  label: string;
  mimeType: string;
  sizeBytes: number;
};

export type PersistedSnapshot = {
  leadId: string;
  projectId: string;
  estimateId: string;
  reportId: string;
  ghlContactId: string | null;
};
