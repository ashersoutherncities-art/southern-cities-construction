'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import CartNavLink from '@/components/CartNavLink';
import { SITE_CONFIG } from '@/lib/site-config';
import { useBrowserSnapshot } from '@/lib/use-browser-snapshot';

function subscribeScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

type NavLink = { href: string; label: string };
type NavGroup = { label: string; href: string; children: NavLink[] };

// Organize the shared offer by the work a visitor needs done.
const SERVICES_GROUP: NavGroup = {
  label: 'Services',
  href: '/services',
  children: [
    { href: '/services', label: 'Services overview' },
    { href: '/lp/rehab-budget-range-execution-risk-snapshot', label: 'Screen · Free rehab tool' },
    { href: '/deal-pack', label: 'Plan · Deal Pack' },
    { href: '/construction', label: 'Build · Construction' },
    { href: '/services/all', label: 'All services & pricing' },
  ],
};

// Primary nav: the two-offer path — Deal Pack (the committed price) into
// Construction (the execution hub). Construction Department + the
// investor recurring-support plans are archived (2026-11-05) — code and
// routes still exist, reachable by direct URL, but are no longer linked
// from nav, footer, or the homepage funnel.
const PRIMARY_LINKS: NavLink[] = [
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/deal-pack', label: 'Deal Pack' },
  { href: '/construction', label: 'Construction' },
  { href: '/gallery', label: 'Projects' },
  { href: '/about', label: 'About' },
];

export default function SiteNav({ variant = 'transparent' }: { variant?: 'transparent' | 'solid' }) {
  const pathname = usePathname();
  const scrolled = useBrowserSnapshot(() => window.scrollY > 32, false, subscribeScroll);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [previousPath, setPreviousPath] = useState(pathname);
  if (previousPath !== pathname) {
    setPreviousPath(pathname);
    setServicesOpen(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const solid = scrolled || variant === 'solid';
  const servicesActive = pathname === '/services' || pathname.startsWith('/services/') || pathname === '/recurring-support';

  const openServicesMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setServicesOpen(true);
  };

  const closeServicesMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setServicesOpen(false);
      closeTimerRef.current = null;
    }, 180);
  };

  const linkClass = (active: boolean) =>
    `px-2 xl:px-2.5 py-2 text-[11px] xl:text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200 whitespace-nowrap ${
      active ? 'text-white' : 'text-white/70 hover:text-white'
    }`;

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          solid
            ? 'bg-[#08111d] p-nav-soft'
            : 'bg-[#08111d]/85 backdrop-blur-md p-nav-soft'
        }`}
      >
        <div className="container-pro">
          <div className="flex h-20 lg:h-[84px] items-center gap-6">
            <Link href="/" className="flex items-center shrink-0" aria-label={SITE_CONFIG.name}>
              <Image src={SITE_CONFIG.logoReversed} alt={SITE_CONFIG.name} width={360} height={140} className="h-12 w-auto md:h-14 lg:h-[60px]" priority />
            </Link>

            {/* Centered primary tabs */}
            <div className="hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-2.5">
              {PRIMARY_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} className={linkClass(active)}>
                    {link.label}
                  </Link>
                );
              })}
              <div className="relative" onMouseEnter={openServicesMenu} onMouseLeave={closeServicesMenu}
                onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false); }}
                onKeyDown={(event) => { if (event.key === 'Escape') setServicesOpen(false); }}>
                <div className={`flex items-center ${linkClass(servicesActive)}`}>
                  <Link href={SERVICES_GROUP.href} className="pr-1">
                    {SERVICES_GROUP.label}
                  </Link>
                  <button
                    type="button"
                    onClick={(event) => {
                      if (closeTimerRef.current) {
                        clearTimeout(closeTimerRef.current);
                        closeTimerRef.current = null;
                      }
                      setServicesOpen(event.detail === 0 ? !servicesOpen : true);
                    }}
                    aria-label="Toggle Services menu"
                    aria-expanded={servicesOpen}
                    aria-controls="services-menu"
                    className="rounded p-1 hover:bg-white/10"
                  >
                    <svg className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {servicesOpen && (
                  <div id="services-menu" className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 border border-white/12 bg-[#08111d] p-2" style={{ borderRadius: '2px' }}>
                    <p className="px-3 pb-2 pt-2 text-[10.5px] font-bold uppercase tracking-[0.22em] text-orange">Services</p>
                    <div className="space-y-0">
                      {SERVICES_GROUP.children.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <Link key={item.href} href={item.href} className={`block px-3 py-2.5 text-[13px] font-medium transition ${active ? 'bg-white/10 text-white' : 'text-white/75 hover:bg-white/5 hover:text-white'}`}>
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right-aligned actions */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
              <CartNavLink compact className="px-2.5 xl:px-3 py-2 text-[12px] uppercase tracking-[0.14em] text-white/70 hover:text-white transition-colors duration-200 whitespace-nowrap inline-flex" />
              <a
                href={SITE_CONFIG.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-white/30 px-3.5 xl:px-4 py-2 text-[11.5px] xl:text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 whitespace-nowrap hover:border-white hover:bg-white/5"
                style={{ borderRadius: '2px' }}
              >
                Portal
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
              <Link href="/lp/rehab-budget-range-execution-risk-snapshot" className="inline-flex items-center gap-2 bg-orange px-5 xl:px-6 py-2.5 text-[11.5px] xl:text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-200 whitespace-nowrap hover:bg-orange-500" style={{ borderRadius: '2px' }}>
                Analyze a Deal
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <button onClick={() => setMobileOpen((v) => !v)} className="lg:hidden ml-auto -mr-2 rounded-lg p-2 text-white hover:bg-white/5" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} aria-controls="mobile-navigation">
              {mobileOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div id="mobile-navigation" className="lg:hidden border-t border-white/12 bg-[#08111d]">
            <div className="container-pro space-y-1 py-5">
              <div className="border border-white/12 bg-white/[0.03]" style={{ borderRadius: '2px' }}>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  aria-expanded={mobileServicesOpen}
                  aria-controls="mobile-services"
                  className={`flex w-full items-center justify-between px-3 py-3 text-left text-base font-medium transition-colors ${servicesActive ? 'text-white' : 'text-white/85 hover:text-orange'}`}
                >
                  <span>Services</span>
                  <svg className={`h-5 w-5 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                  </svg>
                </button>
                {mobileServicesOpen && (
                  <div id="mobile-services" className="space-y-1 px-2 pb-2">
                    {SERVICES_GROUP.children.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`block rounded-lg px-3 py-3 text-sm transition-colors ${active ? 'bg-white/10 text-white' : 'text-white/75 hover:text-orange hover:bg-white/5'}`}>
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {PRIMARY_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={`block rounded-lg px-3 py-3 text-base font-medium transition-colors ${active ? 'bg-white/10 text-white' : 'text-white/85 hover:text-orange'}`}>
                    {link.label}
                  </Link>
                );
              })}

              <Link href="/cart" onClick={() => setMobileOpen(false)} className={`block rounded-lg px-3 py-3 text-base font-medium transition-colors ${pathname === '/cart' ? 'bg-white/10 text-white' : 'text-white/85 hover:text-orange'}`}>
                Cart
              </Link>
              <a href={SITE_CONFIG.portalUrl} target="_blank" rel="noopener noreferrer" className="block rounded-lg px-3 py-3 text-base font-medium text-white/85 transition-colors hover:text-orange">
                Portal
              </a>
              <Link href="/lp/rehab-budget-range-execution-risk-snapshot" onClick={() => setMobileOpen(false)} className="mt-3 block bg-orange px-5 py-3.5 text-center text-[13px] font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-orange-500" style={{ borderRadius: '2px' }}>
                Analyze a Deal &rarr;
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
