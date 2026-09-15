'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SITE_CONFIG } from '@/lib/site-config';

interface SplashProps {
  onReveal?: () => void;
}

export function SplashCurtain({ onReveal }: SplashProps) {
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  const dismiss = () => {
    if (exiting) return;
    setExiting(true);
    onReveal?.();
    window.setTimeout(() => setGone(true), 720);
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onReveal?.();
      setGone(true);
      return;
    }
    const revealTimer = window.setTimeout(() => {
      setExiting(true);
      onReveal?.();
    }, 950);
    const removeTimer = window.setTimeout(() => setGone(true), 1750);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(removeTimer);
    };
  }, [onReveal]);

  if (gone) return null;

  return (
    <div
      role="presentation"
      onClick={dismiss}
      onTouchStart={dismiss}
      className={`splash-curtain fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0C1627] text-white cursor-pointer ${
        exiting ? 'splash-curtain-exit pointer-events-none' : ''
      }`}
    >
      <div className="splash-logo flex flex-col items-center px-6 text-center select-none">
        {/* Official SCC wordmark — reversed variant for dark ground */}
        <Image
          src={SITE_CONFIG.logoReversed}
          alt={SITE_CONFIG.name}
          width={720}
          height={280}
          priority
          className="h-auto w-[280px] sm:w-[420px] md:w-[500px]"
        />

        {/* Architectural Divider */}
        <span className="splash-rule mt-8 block h-px w-40 bg-white/30" aria-hidden="true" />

        {/* Credential line */}
        <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.28em] text-white/70 sm:text-xs">
          Licensed NC General Contractor · Charlotte, NC
        </p>
      </div>
    </div>
  );
}

export default SplashCurtain;
