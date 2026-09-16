'use client';

import { useEffect } from 'react';

/**
 * Site-wide scroll-triggered reveal.
 *
 * Any element tagged with the class `p-reveal` starts translated + faded
 * (see .p-reveal in app/globals.css). When it enters the viewport, this
 * component adds `.is-in` and it eases into place. Sections cascade with
 * an optional `data-reveal-delay="N"` (0–5) to stagger.
 *
 * Reduced-motion users bypass the animation entirely (CSS handles that).
 * Also skips if IntersectionObserver isn't available.
 */
export default function ClientReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (typeof IntersectionObserver === 'undefined') return;

    const reveal = (el: Element) => {
      const delay = Number((el as HTMLElement).dataset.revealDelay ?? '0') || 0;
      const px = Math.min(Math.max(delay, 0), 5) * 80;
      (el as HTMLElement).style.transitionDelay = `${px}ms`;
      el.classList.add('is-in');
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    const scan = (root: ParentNode = document) => {
      root.querySelectorAll('.p-reveal:not(.is-in)').forEach((el) => io.observe(el));
    };
    scan();

    // Route changes / lazy-loaded content: watch for new .p-reveal nodes.
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (!(n instanceof Element)) return;
          if (n.classList?.contains('p-reveal') && !n.classList.contains('is-in')) {
            io.observe(n);
          }
          scan(n);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
