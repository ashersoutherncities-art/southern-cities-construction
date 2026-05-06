'use client';

import { useEffect, useMemo, useState } from 'react';

const CARD_WIDTH_DESKTOP = 31.5;
const CARD_GAP_DESKTOP = 5 / 3;

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
};

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      'We were about to sink more money in before they walked us through what was actually wrong. Saved us from a bad call.',
    name: 'Madison M',
    role: 'Broker/Investor',
  },
  {
    quote:
      'We just needed help on one piece, not a full build out. They stuck to what we asked for and did not push extras.',
    name: 'Iantha M',
    role: 'Investor',
  },
  {
    quote:
      'I needed something concrete to bring back to my buyer, not a maybe. They gave me a straight read and the deal kept moving.',
    name: 'Jethro A',
    role: 'Wholesaler',
  },
  {
    quote:
      'Permits and paperwork were eating up my week. They took it off my plate and the jobs stopped stalling.',
    name: 'Taquan P',
    role: 'Wholesaler',
  },
  {
    quote:
      'They did not try to sell us a huge scope we did not need. Just told us what to do next and why.',
    name: 'Trisha W',
    role: 'Investor',
  },
  {
    quote:
      'Scope and budget were all over the place when we called. After they walked through it, the project actually felt doable again.',
    name: 'Justin R',
    role: 'Developer',
  },
  {
    quote:
      'I had no idea what was a real problem and what was not. They told me what to fix now and what could wait.',
    name: 'Yvonne W',
    role: 'Homeowner',
  },
];

function StarRow() {
  return (
    <div className="flex items-center gap-1 text-orange" aria-label="5 star review">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsCarousel({
  testimonials = DEFAULT_TESTIMONIALS,
}: {
  testimonials?: TestimonialItem[];
}) {
  const cards = useMemo(() => {
    if (testimonials.length <= 1) return testimonials;
    return [...testimonials, ...testimonials];
  }, [testimonials]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;

    let frameId = 0;
    let lastTs = performance.now();
    const speedPerSecond = 0.11;

    const tick = (ts: number) => {
      const deltaSeconds = (ts - lastTs) / 1000;
      lastTs = ts;
      setIndex((prev) => {
        const next = prev + deltaSeconds * speedPerSecond;
        return next >= testimonials.length ? next - testimonials.length : next;
      });
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [paused, testimonials.length]);

  const goPrev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setIndex((prev) => (prev + 1) % testimonials.length);

  const desktopTranslate = index * (CARD_WIDTH_DESKTOP + CARD_GAP_DESKTOP);

  return (
    <section className="bg-stone-50 py-14 sm:py-16">
      <div className="container-pro">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Reviews</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">What clients say after working with Southern Cities.</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700 sm:text-lg">
              Real feedback on project support, construction guidance, and getting the right next step before the wrong spend happens.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white text-navy transition hover:border-orange hover:text-orange"
              aria-label="Show previous review"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white text-navy transition hover:border-orange hover:text-orange"
              aria-label="Show next review"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div
          className="mt-8 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex gap-5 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${desktopTranslate}%)` }}
          >
            {cards.map((testimonial, itemIndex) => (
              <article
                key={`${testimonial.name}-${itemIndex}`}
                className="min-w-[85%] rounded-[28px] border border-stone-200 bg-white p-6 shadow-elev-1 sm:min-w-[48%] lg:min-w-[31.5%]"
              >
                <StarRow />
                <p className="mt-5 text-[15px] leading-[1.75] text-stone-700">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-stone-200 bg-orange text-lg font-extrabold text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-base font-extrabold tracking-tight text-navy">{testimonial.name}</p>
                    <p className="text-sm font-medium text-stone-600">{testimonial.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
