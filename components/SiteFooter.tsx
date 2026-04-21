import Link from 'next/link';

const YEAR = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <footer className="relative bg-navy-900 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-orange/[0.06] blur-[120px]" />
      </div>
      <div className="relative container-pro pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <img
              src="/sc-construction-logo.png"
              alt="Southern Cities Construction"
              className="h-11 w-auto mb-5"
            />
            <p className="text-white/55 text-sm leading-relaxed mb-4 max-w-sm">
              Licensed general contracting, permit administration, and construction oversight for owners, investors, and operators across North Carolina.
            </p>
            <p className="text-white/35 text-xs leading-relaxed">
              NC General Contractor License L.107724 · Qualifier Q.108200
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-5">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/#flagship-service" className="text-white/50 hover:text-orange text-sm transition-colors">Flagship Service</Link></li>
              <li><Link href="/services" className="text-white/50 hover:text-orange text-sm transition-colors">All Services</Link></li>
              <li><Link href="/#process" className="text-white/50 hover:text-orange text-sm transition-colors">Process</Link></li>
              <li><Link href="/#projects" className="text-white/50 hover:text-orange text-sm transition-colors">Projects</Link></li>
              <li><Link href="/realtor" className="text-white/50 hover:text-orange text-sm transition-colors">For Realtors</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-5">Client Access</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://clients.southerncitiesconstruction.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-orange text-sm transition-colors">
                  Client Portal
                </a>
              </li>
              <li><Link href="/cart" className="text-white/50 hover:text-orange text-sm transition-colors">Cart</Link></li>
              <li><Link href="/portal" className="text-white/50 hover:text-orange text-sm transition-colors">Start Onboarding</Link></li>
              <li><Link href="/#contact" className="text-white/50 hover:text-orange text-sm transition-colors">Request a Quote</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-5">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+12523396146" className="text-white/50 hover:text-orange text-sm transition-colors">
                  (252) 339-6146
                </a>
              </li>
              <li>
                <a href="mailto:orders@southerncitiesconstruction.com" className="text-white/50 hover:text-orange text-sm transition-colors break-all">
                  orders@southerncitiesconstruction.com
                </a>
              </li>
              <li>
                <a href="mailto:info@southerncitiesconstruction.com" className="text-white/50 hover:text-orange text-sm transition-colors break-all">
                  info@southerncitiesconstruction.com
                </a>
              </li>
              <li className="text-white/50 text-sm">Charlotte, NC · Serving North Carolina</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-7 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-white/30 text-xs tracking-wide">
            © {YEAR} Southern Cities Construction LLC · A Division of Southern Cities Enterprises
          </p>
          <p className="text-white/25 text-xs tracking-wide">
            Licensed · Bonded · Insured
          </p>
        </div>
      </div>
    </footer>
  );
}
