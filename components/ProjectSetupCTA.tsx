import Link from 'next/link';

/**
 * CTA for Project Setup & Pre-Construction Management — a one-time $3,500 fee.
 * Buys through the standard cart → /api/cart-checkout one-time flow (cart key
 * `project-setup`, no pre-created Stripe Price needed). Secondary link routes to
 * the contact/intake flow for anyone who'd rather talk first.
 */
export default function ProjectSetupCTA({
  label = 'Start Project Setup — $3,500 →',
  className = '',
}: {
  label?: string;
  className?: string;
}) {
  const contactHref = '/start?service=project-setup';

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Link
        href="/cart?cart=project-setup"
        className={
          className ||
          'inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-9 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5'
        }
      >
        {label}
      </Link>
      <a
        href={contactHref}
        className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white transition hover:bg-white/10"
      >
        Request setup / talk to us →
      </a>
    </div>
  );
}
