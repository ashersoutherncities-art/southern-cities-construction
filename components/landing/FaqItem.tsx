'use client';

import { useId, useState } from 'react';

/**
 * Accordion FAQ item.
 *
 * IMPORTANT: the answer is ALWAYS rendered in the DOM — visibility is
 * controlled with CSS (max-height + opacity), not conditional render —
 * so the full Q&A text ships in the server-rendered HTML. This is what
 * Google needs to qualify the page for FAQPage rich results.
 */
export default function FaqItem({
  faq,
  defaultOpen = false,
}: {
  faq: { q: string; a: string };
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const answerId = useId();

  return (
    <div className="rounded-[10px] border border-[#ece6dc] bg-white shadow-[0_6px_16px_rgba(17,24,39,0.03)] transition hover:border-[#e2d6c8]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={answerId}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left min-h-[44px]"
      >
        <p className="text-[12.5px] font-semibold text-[#111827]">{faq.q}</p>
        <span aria-hidden className="text-[17px] leading-none text-[#a0a7b1]">
          {open ? '−' : '+'}
        </span>
      </button>
      {/*
        Always render the answer in the DOM. Hide visually when closed by
        clamping max-height to 0 and opacity to 0 — Google still sees the
        text in the source HTML, but users see the collapse animation.
      */}
      <div
        id={answerId}
        role="region"
        className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!open}
      >
        <p className="px-4 pb-4 text-[12.5px] leading-[1.65] text-[#5b6470]">
          {faq.a}
        </p>
      </div>
    </div>
  );
}
