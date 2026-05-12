import Image from 'next/image';
import Link from 'next/link';

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
            <Image src="/sc-construction-logo.png" alt="Southern Cities Construction" width={176} height={44} className="mb-5 h-11 w-auto" />
            <div className="space-y-3 text-sm leading-relaxed text-white/65 max-w-sm">
              <p>Southern Cities Construction LLC</p>
              <p>Residential construction made easier in North Carolina. Two clear ways to work with us: focused project support on a specific piece, or full licensed contracting when one company should run the whole project.</p>
              <p>Project support: planning · permits · budgets · contractor fit · coordination · oversight · support plans</p>
              <p>Full contracting: renovations · rehabs · additions · new builds</p>
              <p>Licensed NC General Contractor · NC GC License #107724</p>
              <p>5 years in business · 15+ projects completed · Charlotte, NC · Statewide NC coverage</p>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-wide text-white">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-sm text-white/50 transition-colors hover:text-orange">Pricing Overview</Link></li>
              <li><Link href="/services/homeowners" className="text-sm text-white/50 transition-colors hover:text-orange">For Homeowners</Link></li>
              <li><Link href="/services/investors" className="text-sm text-white/50 transition-colors hover:text-orange">For Investors</Link></li>
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
              <li><Link href="/partners" className="text-sm text-white/50 transition-colors hover:text-orange">Partner With Us</Link></li>
              <li><a href="https://clients.southerncitiesconstruction.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 transition-colors hover:text-orange">Client Portal</a></li>
              <li><Link href="/cart" className="text-sm text-white/50 transition-colors hover:text-orange">Cart</Link></li>
              <li><Link href="/services/homeowners/owner-consultation" className="text-sm text-white/50 transition-colors hover:text-orange">Book a Project Call</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-wide text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li><a href="tel:+19804737249" className="transition-colors hover:text-orange">(980) 473-7249</a></li>
              <li><a href="mailto:orders@southerncitiesconstruction.com" className="break-all transition-colors hover:text-orange">orders@southerncitiesconstruction.com</a></li>
              <li><a href="mailto:info@southerncitiesconstruction.com" className="break-all transition-colors hover:text-orange">info@southerncitiesconstruction.com</a></li>
              <li>Charlotte, NC</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs tracking-wide text-white/30">© {YEAR} Southern Cities Construction LLC · A Division of Southern Cities Enterprises</p>
        </div>
      </div>
    </footer>
  );
}
