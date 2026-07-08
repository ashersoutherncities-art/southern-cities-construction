import Image from 'next/image';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/site-config';

const YEAR = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-navy-900">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-orange/[0.06] blur-[120px]" />
      </div>
      <div className="relative container-pro pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Image src={SITE_CONFIG.logoReversed} alt={SITE_CONFIG.name} width={260} height={101} className="mb-5 h-12 w-auto" />
            <div className="space-y-3 text-sm leading-relaxed text-white/65 max-w-sm">
              <p>{SITE_CONFIG.name}</p>
              <p>A construction platform, backed by a licensed North Carolina general contractor. Buy packaged construction expertise for any stage of a residential project — or a full build — all from one accountable licensed builder.</p>
              <p>By the stage: deal evaluation · budgets · scopes of work · permits · oversight · owner representation · on-call expertise</p>
              <p>Full build: renovations · rehabs · additions · new builds</p>
              <p>Licensed NC General Contractor · {SITE_CONFIG.license.formatted}</p>
              <p>{SITE_CONFIG.stats.footerLine}</p>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-wide text-white">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-sm text-white/50 transition-colors hover:text-orange">Services Overview</Link></li>
              <li><Link href="/services/all" className="text-sm text-white/50 transition-colors hover:text-orange">All Services &amp; Pricing</Link></li>
              <li><Link href="/services/homeowners" className="text-sm text-white/50 transition-colors hover:text-orange">For Homeowners</Link></li>
              <li><Link href="/platform" className="text-sm text-white/50 transition-colors hover:text-orange">For Investors — Execution Platform</Link></li>
              <li><Link href="/deal-pack" className="text-sm text-white/50 transition-colors hover:text-orange">Deal Pack — Wholesalers</Link></li>
              <li><Link href="/deal-desk" className="text-sm text-white/50 transition-colors hover:text-orange">Deal Desk Membership</Link></li>
              <li><Link href="/services/realtors" className="text-sm text-white/50 transition-colors hover:text-orange">For Realtors</Link></li>
              <li><Link href="/services/contractors" className="text-sm text-white/50 transition-colors hover:text-orange">For Contractors</Link></li>
              <li><Link href="/gallery" className="text-sm text-white/50 transition-colors hover:text-orange">Project Gallery</Link></li>
              <li><Link href="/contracting" className="text-sm text-white/50 transition-colors hover:text-orange">Contracting</Link></li>
              <li><Link href="/recurring-support" className="text-sm text-white/50 transition-colors hover:text-orange">Support Plans</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-wide text-white">Learn & Apply</h4>
            <ul className="space-y-3">
              <li><Link href="/blog" className="text-sm text-white/50 transition-colors hover:text-orange">NC Construction Blog</Link></li>
              <li><Link href="/resources" className="text-sm text-white/50 transition-colors hover:text-orange">Resources & Playbooks</Link></li>
              <li><Link href="/partners" className="text-sm text-white/50 transition-colors hover:text-orange">Become a Subcontractor Partner</Link></li>
              <li><a href={SITE_CONFIG.portalUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 transition-colors hover:text-orange">Client Portal</a></li>
              <li><Link href="/cart" className="text-sm text-white/50 transition-colors hover:text-orange">Cart</Link></li>
              <li><Link href="/start" className="text-sm text-white/50 transition-colors hover:text-orange">Get Started</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-wide text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li><a href={`tel:${SITE_CONFIG.phoneTel}`} className="transition-colors hover:text-orange">{SITE_CONFIG.phone}</a></li>
              <li><a href={`mailto:${SITE_CONFIG.emailInfo}`} className="break-all transition-colors hover:text-orange">{SITE_CONFIG.emailInfo}</a></li>
              <li><a href={`mailto:${SITE_CONFIG.emailOrders}`} className="break-all transition-colors hover:text-orange">{SITE_CONFIG.emailOrders}</a></li>
              <li>{SITE_CONFIG.address.formatted}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs tracking-wide text-white/30">© {YEAR} {SITE_CONFIG.legalLine}</p>
        </div>
      </div>
    </footer>
  );
}
