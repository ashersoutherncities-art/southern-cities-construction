'use client';

import AvatarPageTemplate from '@/components/services/AvatarPageTemplate';
import { getAvatarPage } from '@/lib/services-data';

const data = getAvatarPage('contractors');

export default function ContractorServicesPage() {
  if (!data) return null;
  return <AvatarPageTemplate data={data} />;
}
