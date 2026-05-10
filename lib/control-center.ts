import { getServiceClient } from '@/lib/supabase';
import { listMarketingAssets, listMarketingLinks } from '@/lib/marketing';

export type ControlCenterMetrics = {
  serviceInquiries: number;
  realtorInquiries: number;
  resourceRequests: number;
  totalOrders: number;
  paidOrders: number;
  totalRevenueCents: number;
  activeMarketingAssets: number;
  trackedLinks: number;
  totalTrackedClicks: number;
  campaignsTracked: number;
};

export async function getControlCenterMetrics(): Promise<ControlCenterMetrics> {
  const supabase = getServiceClient();

  const [
    serviceInquiriesResult,
    realtorInquiriesResult,
    resourceRequestsResult,
    totalOrdersResult,
    paidOrdersResult,
    paidRevenueResult,
    marketingAssets,
    marketingLinks,
  ] = await Promise.all([
    supabase.from('service_inquiries').select('*', { count: 'exact', head: true }),
    supabase.from('realtor_inquiries').select('*', { count: 'exact', head: true }),
    supabase.from('resource_requests').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('payment_status', 'paid'),
    supabase.from('orders').select('amount_total_cents').eq('payment_status', 'paid'),
    listMarketingAssets(supabase),
    listMarketingLinks(supabase),
  ]);

  const errors = [
    serviceInquiriesResult.error,
    realtorInquiriesResult.error,
    resourceRequestsResult.error,
    totalOrdersResult.error,
    paidOrdersResult.error,
    paidRevenueResult.error,
  ].filter(Boolean);

  if (errors.length > 0) {
    throw errors[0];
  }

  const totalRevenueCents = (paidRevenueResult.data || []).reduce(
    (sum, row) => sum + Number(row.amount_total_cents || 0),
    0
  );

  const totalTrackedClicks = marketingLinks.reduce(
    (sum, link) => sum + Number(link.click_count || 0),
    0
  );

  return {
    serviceInquiries: serviceInquiriesResult.count || 0,
    realtorInquiries: realtorInquiriesResult.count || 0,
    resourceRequests: resourceRequestsResult.count || 0,
    totalOrders: totalOrdersResult.count || 0,
    paidOrders: paidOrdersResult.count || 0,
    totalRevenueCents,
    activeMarketingAssets: marketingAssets.filter((asset) => asset.status === 'active').length,
    trackedLinks: marketingLinks.length,
    totalTrackedClicks,
    campaignsTracked: new Set(marketingLinks.map((link) => link.campaign).filter(Boolean)).size,
  };
}

export function formatCurrency(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format((cents || 0) / 100);
}
