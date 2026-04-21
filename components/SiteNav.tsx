'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import CartNavLink from '@/components/CartNavLink';

type NavLink = { href: string; label: string };

const PRIMARY_LINKS: NavLink[] = [
  { href: '/services#flagship', label: 'Permit + Oversight' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/resources', label: 'Resources' },
  { href: '/partners', label: 'Partners' },
  { href: '/realtor', label: 'Realtors' },
];

export default function SiteNav({ variant = 'transparent' }: { variant?: 'transparent' | 'solid' }) {
  const [scrolled, setScrolled] = useState(variant === 'solid');
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const solid = scrolled || variant === 'solid';

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? 'bg-navy-900/92 backdrop-blur-xl shadow-elev-nav border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container-pro">
          <div className="flex h-20 lg:h-[84px] items-center justify-between gap-6">
            <Link href="/" className="flex items-center shrink-0" aria-label="Southern Cities Construction">
              <img
                src="/sc-construction-logo.png"
                alt="Southern Cities Construction"
                className="h-10 w-auto md:h-11 lg:h-12"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {PRIMARY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-2.5 xl:px-3 py-2 rounded-lg text-[13px] xl:text-[14px] font-medium text-white/75 hover:text-white transition-colors duration-200 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
              <CartNavLink className="px-2.5 xl:px-3 py-2 rounded-lg text-[13px] xl:text-[14px] font-medium text-white/75 hover:text-white transition-colors duration-200 whitespace-nowrap inline-flex" />
              <a
                href="https://clients.southerncitiesconstruction.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/12 text-white px-3.5 xl:px-4 py-2 text-[12.5px] xl:text-[13px] font-semibold transition-all duration-200 whitespace-nowrap"
              >
                Portal
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
              <Link
                href="/#contact"
                className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-orange hover:bg-orange-500 text-white px-4 xl:px-5 py-2 text-[12.5px] xl:text-[13px] font-semibold shadow-glow-orange transition-all duration-200 whitespace-nowrap"
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
              {PRIMARY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-white/85 hover:text-orange px-3 py-3 rounded-lg text-base font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/cart"
                onClick={() => setMobileOpen(false)}
                className="block text-white/85 hover:text-orange px-3 py-3 rounded-lg text-base font-medium transition-colors"
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
      {/* Spacer for solid variant so content doesn't hide behind fixed nav */}
      {variant === 'solid' && <div className="h-20 lg:h-[84px]" aria-hidden />}
    </>
  );
}
