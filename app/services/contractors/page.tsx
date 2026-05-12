'use client';

import AvatarPageTemplate from '@/components/services/AvatarPageTemplate';
import { getAvatarPage } from '@/lib/services-data';

const baseData = getAvatarPage('contractors');

export default function ContractorsServicesPage() {
  if (!baseData) return null;

  const data = {
    ...baseData,
    heroTitle: 'Permit and back-office support for contractors — cleaner setup, less admin drag, more time in the field',
    heroSubtitle:
      'Southern Cities helps licensed contractors reduce paperwork drag, inspection delays, correction follow-up, and coordination burden — without hiring full-time office staff. NC GC License #107724.',
    painPoints: [
      'Permit paperwork keeps slowing production down.',
      'Inspection follow-up keeps pulling attention off the field.',
      'Correction handling gets dropped or delayed.',
      'The office side is too thin for the job load.',
    ],
    outcomes: [
      'Less paperwork drag and more time for production.',
      'Cleaner permit handling and better inspection follow-through.',
      'More office support without full-time payroll.',
      'Better coordination when active jobs start feeling stretched.',
    ],
  };

  return <AvatarPageTemplate data={data} />;
}
