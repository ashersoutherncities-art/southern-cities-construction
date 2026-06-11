import { redirect } from 'next/navigation';

// Permanent redirect (server-side, 308). /realtor singular is a legacy
// route that always points to the canonical /services/realtors page.
// Server-side redirect is preferred over the previous client-side
// window.location.replace so Google sees the 308 and follows it cleanly.
export default function RealtorRedirect() {
  redirect('/services/realtors');
}
