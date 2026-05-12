import { redirect } from 'next/navigation';

// Retired catch-all hub. Each avatar now has its own dedicated page:
// /services/realtors, /services/contractors, /services/developers-landowners.
// next.config.mjs has a permanent redirect to /services; this is the
// fallback in case the config-level redirect ever gets bypassed.
export default function IndustryPartnersRedirectPage() {
  redirect('/services');
}
