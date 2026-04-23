'use client';

import AddToCartButton from '@/components/AddToCartButton';
import ServiceCalculator from '@/components/ServiceCalculator';
import { ServiceCardData } from '@/lib/services-data';

export function ServiceBucket({
  title,
  text,
  cards,
}: {
  title: string;
  text: string;
  cards?: ServiceCardData[];
}) {
  if (!cards || cards.length === 0) return null;

  return (
    <div className="mt-10 first:mt-0">
      <div className="mb-6 max-w-2xl">
        <div className="inline-flex rounded-full border border-stone-300 bg-stone-50 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-navy">
          {title}
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-stone-600">{text}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {cards.map((card) => (
          <div key={card.title} className="flex w-full max-w-[420px] md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]">
            <ServiceCardView card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ServiceCardView({ card }: { card: ServiceCardData }) {
  return (
    <div className="flex h-full w-full max-w-[420px] flex-col rounded-[22px] border border-stone-200 bg-white p-6 shadow-elev-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev-3 hover:border-orange/25">
      {card.tag ? (
        <div className="mb-4 inline-flex w-fit rounded-full border border-orange/25 bg-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-orange">
          {card.tag}
        </div>
      ) : null}
      <h4 className="text-[22px] font-extrabold leading-tight tracking-tight text-navy">{card.title}</h4>

      {(card.monthlyPrice || card.monthlyLimit || card.turnaround) && (
        <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
          {card.monthlyPrice ? <p className="text-lg font-extrabold text-navy">{card.monthlyPrice}</p> : null}
          {card.monthlyLimit ? <p className="mt-2 text-sm text-stone-600">{card.monthlyLimit}</p> : null}
          {card.turnaround ? <p className="mt-1 text-sm text-stone-600">{card.turnaround}</p> : null}
        </div>
      )}

      <div className="mt-4 space-y-4 text-[14.5px] leading-relaxed text-stone-700">
        <p>{card.summary}</p>
        <ul className="space-y-2">
          {card.details.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-stone-600">{card.fit}</p>
      </div>

      <div className="mt-auto pt-6">
        {card.calculator ? (
          <ServiceCalculator config={card.calculator} />
        ) : card.itemKey ? (
          <AddToCartButton
            itemKey={card.itemKey}
            label={card.cta}
            className="inline-block w-full rounded-full bg-orange py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-500"
          />
        ) : (
          <a
            href={card.ctaHref || '#contact'}
            className="inline-block w-full rounded-full bg-navy py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-navy-700"
          >
            {card.cta}
          </a>
        )}
      </div>
    </div>
  );
}
