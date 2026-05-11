'use client';

import { useState } from 'react';

export default function FaqItem({ faq, defaultOpen = false }: { faq: { q: string; a: string }; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <button
      type="button"
      onClick={() => setOpen((value) => !value)}
      className="rounded-[10px] border border-[#ece6dc] bg-white px-4 py-3 text-left shadow-[0_6px_16px_rgba(17,24,39,0.03)] transition hover:border-[#e2d6c8]"
    >
      <div className="flex min-h-[44px] items-center justify-between gap-4">
        <p className="text-[12.5px] font-semibold text-[#111827]">{faq.q}</p>
        <span className="text-[17px] leading-none text-[#a0a7b1]">{open ? '−' : '+'}</span>
      </div>
      {open ? <p className="pb-1 text-[12.5px] leading-[1.65] text-[#5b6470]">{faq.a}</p> : null}
    </button>
  );
}
