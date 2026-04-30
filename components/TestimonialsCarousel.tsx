'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  image: string;
};

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      'Southern Cities gave us a much clearer path before we spent more money. The review was straightforward, practical, and saved us from making a bad decision too early.',
    name: 'Marcus T.',
    role: 'Investor',
    image: '/gallery/farmhouse-after.jpg',
  },
  {
    quote:
      'We needed real answers on scope, budget, and what to do next. They made the project feel manageable again instead of confusing.',
    name: 'Angela R.',
    role: 'Homeowner',
    image: '/gallery/red-house-after.jpg',
  },
  {
    quote:
      'The construction guidance helped keep the deal moving. Instead of vague opinions, we got a clear read we could actually use with the client.',
    name: 'Daniel P.',
    role: 'Realtor',
    image: '/gallery/white-house-after.jpg',
  },
  {
    quote:
      'Permit and admin follow-up were dragging our jobs down. The support was practical, responsive, and took real pressure off the team.',
    name: 'Chris W.',
    role: 'Contractor',
    image: '/gallery/farmhouse-after.jpg',
  },
  {
    quote:
      'What stood out was how grounded the advice was. They were not trying to oversell a giant scope. They helped us buy the right next step.',
    name: 'Lauren S.',
    role: 'Developer / Landowner',
    image: '/gallery/red-house-after.jpg',
  },
  {
    quote:
      'The project support model makes sense. We got the specific help we needed without getting pushed into a bigger construction relationship too early.',
    name: 'Kevin M.',
    role: 'Investor',
    image: '/gallery/white-house-after.jpg',
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
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [paused, testimonials.length]);

  const goPrev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setIndex((prev) => (prev + 1) % testimonials.length);

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
            className="flex gap-5 transition-transform duration-700 ease-out"
            style={{ transform: `translateX(calc(-${index * 100}% / 1))` }}
          >
            {cards.map((testimonial, itemIndex) => (
              <article
                key={`${testimonial.name}-${itemIndex}`}
                className="min-w-[85%] rounded-[28px] border border-stone-200 bg-white p-6 shadow-elev-1 sm:min-w-[48%] lg:min-w-[31.5%]"
              >
                <StarRow />
                <p className="mt-5 text-[15px] leading-[1.75] text-stone-700">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border border-stone-200 bg-stone-100">
                    <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
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
