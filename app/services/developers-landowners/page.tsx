'use client';

import AvatarPageTemplate from '@/components/services/AvatarPageTemplate';
import { getAvatarPage } from '@/lib/services-data';

const data = getAvatarPage('developers-landowners');

export default function DeveloperServicesPage() {
  if (!data) return null;
  return <AvatarPageTemplate data={data} />;
}
