import { ServiceCardData } from '@/lib/services-data';

export function getPurchaseTypeLabel(service: ServiceCardData) {
  if (service.purchaseType === 'fixed') return 'Buy now';
  if (service.purchaseType === 'priced') return 'Get pricing';
  if (service.purchaseType === 'review') return 'Request review';
  return 'Monthly support';
}

export function getServicePricingCopy(service: ServiceCardData) {
  if (service.purchaseType === 'fixed') {
    return 'This is a fixed-price offer with a defined deliverable. If this is the right fit, you can buy it directly.';
  }

  if (service.purchaseType === 'priced') {
    return service.pricingNote || 'This offer uses project inputs to determine pricing. Start with a short pricing form instead of checkout.';
  }

  if (service.purchaseType === 'review') {
    return 'This offer should start with review, not checkout. Scope depends on the project, file condition, and the actual support needed.';
  }

  return 'This is a recurring support offer with defined monthly caps. Higher-touch support plans still begin with review before approval.';
}

export function getServiceNextStepCopy(service: ServiceCardData) {
  if (service.purchaseType === 'fixed') {
    return 'After purchase, Southern Cities confirms the job details, handles the defined deliverable, and follows up with the next recommended step if more support is needed.';
  }

  if (service.purchaseType === 'priced') {
    return 'After you submit the project details, Southern Cities reviews the inputs, sets pricing direction, and tells you whether the work should stay in pricing or move into deeper review.';
  }

  if (service.purchaseType === 'review') {
    return 'After you request review, Southern Cities looks at the project, clarifies what support is actually needed, and then recommends the right next step before pricing is finalized.';
  }

  return 'After plan review, Southern Cities confirms plan fit, usage expectations, and whether the selected plan is enough or whether a higher-touch retainer is the better fit.';
}

export function getServiceRequestIntro(service: ServiceCardData) {
  if (service.purchaseType === 'priced') {
    return 'Share a few project details so Southern Cities can price this the honest way.';
  }

  if (service.purchaseType === 'review') {
    return 'Share the project details so Southern Cities can review the file before quoting or scoping the work.';
  }

  return 'Share a few details so Southern Cities can confirm fit and the right next step.';
}

export function getServiceSubmitLabel(service: ServiceCardData) {
  if (service.purchaseType === 'priced') {
    return 'Get Pricing';
  }

  if (service.purchaseType === 'review') {
    return 'Request Review';
  }

  if (service.purchaseType === 'recurring') {
    return 'Review Plan';
  }

  return service.cta;
}
