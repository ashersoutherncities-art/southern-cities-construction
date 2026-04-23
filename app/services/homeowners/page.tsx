'use client';

import AvatarPageTemplate from '@/components/services/AvatarPageTemplate';
import { getAvatarPage } from '@/lib/services-data';

const data = getAvatarPage('homeowners');

export default function HomeownerServicesPage() {
  if (!data) return null;
  return <AvatarPageTemplate data={data} />;
}
