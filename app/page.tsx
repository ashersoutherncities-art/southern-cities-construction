import { redirect } from 'next/navigation';

export default function HomePage() {
  const key = process.env.MARKETING_PORTAL_ACCESS_KEY;
  if (!key) {
    return null;
  }

  redirect(`/portal/marketing-assets?key=${encodeURIComponent(key)}`);
}
