'use client';

import AvatarPageTemplate from '@/components/services/AvatarPageTemplate';
import { getAvatarPage } from '@/lib/services-data';

const data = getAvatarPage('realtors');

export default function RealtorServicesPage() {
  if (!data) return null;
  return <AvatarPageTemplate data={data} />;
}
