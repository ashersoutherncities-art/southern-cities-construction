'use client';

import AvatarPageTemplate from '@/components/services/AvatarPageTemplate';
import { getAvatarPage } from '@/lib/services-data';

const data = getAvatarPage('investors');

export default function InvestorServicesPage() {
  if (!data) return null;
  return <AvatarPageTemplate data={data} />;
}
