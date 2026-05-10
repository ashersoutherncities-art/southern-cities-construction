'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/reports', label: 'Ops' },
  { href: '/portal/marketing-assets', label: 'Command Center' },
];

export default function ControlCenterNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-navy-900/95 backdrop-blur-xl">
      <div className="container-pro flex h-18 items-center justify-between gap-6 py-4">
        <Link href="/reports" className="flex flex-col">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">SCCOPS.AI</span>
          <span className="text-lg font-extrabold tracking-tight text-white">Ops</span>
        </Link>

        <div className="flex items-center gap-2">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/8 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
