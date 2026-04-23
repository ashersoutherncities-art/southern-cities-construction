'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import CartNavLink from '@/components/CartNavLink';

type NavLink = { href: string; label: string };
type NavGroup = { label: string; href: string; children: NavLink[] };

const SERVICES_GROUP: NavGroup = {
  label: 'Services',
  href: '/services',
  children: [
    { href: '/services', label: 'Services Overview' },
    { href: '/services/homeowners', label: 'Homeowners' },
    { href: '/services/investors', label: 'Investors' },
    { href: '/services/realtors', label: 'Realtors' },
    { href: '/services/contractors', label: 'Contractors' },
    { href: '/services/developers-landowners', label: 'Developers / Landowners' },
  ],
};

const PRIMARY_LINKS: NavLink[] = [
  { href: '/recurring-support', label: 'Support Plans' },
  { href: '/blog', label: 'Blog' },
  { href: '/resources', label: 'Resources' },
  { href: '/partners', label: 'Partners' },
];

export default function SiteNav({ variant = 'transparent' }: { variant?: 'transparent' | 'solid' }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(variant === 'solid');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (variant === 'solid') {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [variant]);

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const solid = scrolled || variant === 'solid';
  const servicesActive = pathname === '/services' || pathname.startsWith('/services/');

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
    `px-2.5 xl:px-3 py-2 rounded-lg text-[13px] xl:text-[13.5px] font-semibold transition-colors duration-200 whitespace-nowrap ${
      active ? 'text-white bg-white/12' : 'text-white/90 hover:text-white hover:bg-white/10'
    }`;

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          solid
            ? 'bg-navy-900/95 backdrop-blur-xl shadow-elev-nav border-b border-white/10'
            : 'bg-navy-900/70 backdrop-blur-md border-b border-white/10'
        }`}
      >
        <div className="container-pro">
          <div className="flex h-20 lg:h-[84px] items-center justify-between gap-6">
            <Link href="/" className="flex items-center shrink-0" aria-label="Southern Cities Construction">
              <img
                src="/sc-construction-logo.png"
                alt="Southern Cities Construction"
                className="h-9 w-auto md:h-10 lg:h-11"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              <div
                className="relative"
                onMouseEnter={openServicesMenu}
                onMouseLeave={closeServicesMenu}
              >
                <div className={`flex items-center ${linkClass(servicesActive)}`}>
                  <Link href={SERVICES_GROUP.href} className="pr-1">
                    {SERVICES_GROUP.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      if (closeTimerRef.current) {
                        clearTimeout(closeTimerRef.current);
                        closeTimerRef.current = null;
                      }
                      setServicesOpen((v) => !v);
                    }}
                    aria-label="Toggle Services menu"
                    className="rounded p-1 hover:bg-white/10"
                  >
                    <svg
                      className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {servicesOpen && (
                  <div className="absolute left-0 top-full mt-2 w-64 rounded-2xl border border-stone-200 bg-white p-3 shadow-elev-3">
                    <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-orange">Browse by role</p>
                    <div className="space-y-1">
                      {SERVICES_GROUP.children.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                              active ? 'bg-stone-100 text-navy' : 'text-stone-700 hover:bg-stone-50 hover:text-navy'
                            }`}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {PRIMARY_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} className={linkClass(active)}>
                    {link.label}
                  </Link>
                );
              })}
              <CartNavLink compact className="px-2.5 xl:px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-200 whitespace-nowrap inline-flex" />
              <a
                href="https://clients.southerncitiesconstruction.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-white/45 bg-white/10 hover:bg-white/20 hover:border-white text-white px-3.5 xl:px-4 py-2 text-[12.5px] xl:text-[13px] font-semibold transition-all duration-200 whitespace-nowrap"
              >
                Portal
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
              <Link
                href="/#contact"
                className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-orange hover:bg-orange-500 text-white px-4 xl:px-5 py-2 text-[12.5px] xl:text-[13px] font-bold shadow-glow-orange transition-all duration-200 whitespace-nowrap"
              >
                Request Quote
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden -mr-2 p-2 text-white rounded-lg hover:bg-white/5"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-navy-900/98 backdrop-blur-xl border-t border-white/5">
            <div className="container-pro py-5 space-y-1">
              <div className="rounded-lg border border-white/8 bg-white/[0.03]">
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className={`flex w-full items-center justify-between px-3 py-3 text-left text-base font-medium transition-colors ${
                    servicesActive ? 'text-white' : 'text-white/85 hover:text-orange'
                  }`}
                >
                  <span>Services</span>
                  <svg
                    className={`h-5 w-5 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                  </svg>
                </button>
                {mobileServicesOpen && (
                  <div className="space-y-1 px-2 pb-2">
                    {SERVICES_GROUP.children.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block rounded-lg px-3 py-3 text-sm transition-colors ${
                            active ? 'bg-white/10 text-white' : 'text-white/75 hover:text-orange hover:bg-white/5'
                          }`}
                        >
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
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                      active ? 'text-white bg-white/10' : 'text-white/85 hover:text-orange'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/cart"
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                  pathname === '/cart' ? 'text-white bg-white/10' : 'text-white/85 hover:text-orange'
                }`}
              >
                Cart
              </Link>
              <div className="pt-3 grid gap-2.5">
                <a
                  href="https://clients.southerncitiesconstruction.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center rounded-full bg-white/[0.08] border border-white/15 text-white px-5 py-3 font-semibold"
                >
                  Client Portal
                </a>
                <Link
                  href="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center rounded-full bg-orange text-white px-5 py-3 font-semibold"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      {variant === 'solid' && <div className="h-20 lg:h-[84px]" aria-hidden />}
    </>
  );
}
