'use client';

import Link from 'next/link';
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
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">
        {cards.map((card, index) => {
          const totalCards = cards.length;
          const remainder = totalCards % 3;
          const lastRowStart = totalCards - remainder;
          const isTailCard = remainder !== 0 && index >= lastRowStart;

          let tailClass = 'xl:col-span-2';
          if (remainder === 1 && isTailCard) tailClass = 'xl:col-start-3 xl:col-span-2';
          if (remainder === 2) {
            if (index === lastRowStart) tailClass = 'xl:col-start-2 xl:col-span-2';
            if (index === lastRowStart + 1) tailClass = 'xl:col-start-4 xl:col-span-2';
          }

          return (
            <div key={card.title} className={`${tailClass} flex justify-center`}>
              <ServiceCardView card={card} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getPrimaryCta(card: ServiceCardData) {
  const href = card.purchaseType === 'fixed' ? card.detailHref : (card.ctaHref || card.detailHref);

  return (
    <Link
      href={href}
      className={`inline-flex w-full items-center justify-center rounded-full py-3 text-center text-sm font-semibold text-white transition-all duration-300 ${
        card.purchaseType === 'review' || card.purchaseType === 'recurring'
          ? 'bg-navy hover:bg-navy-700'
          : 'bg-orange hover:bg-orange-500'
      }`}
    >
      {card.cta}
    </Link>
  );
}

export function ServiceCardView({ card }: { card: ServiceCardData }) {
  const detailCount = card.details.length;
  const detailListClass =
    detailCount >= 5
      ? 'space-y-2'
      : detailCount === 4
        ? 'space-y-2.5'
        : 'space-y-3';
  const priceLabel =
    card.purchaseType === 'fixed'
      ? 'Price'
      : card.purchaseType === 'recurring'
        ? 'Monthly price'
        : card.purchaseType === 'priced'
          ? 'Price'
          : null;
  const visiblePrice = card.monthlyPrice || (card.purchaseType === 'priced' ? card.pricingNote : null);

  return (
    <div className="service-card flex h-full min-h-[100%] w-full max-w-[420px] flex-col rounded-[22px] border border-stone-200 bg-white px-6 py-7 sm:px-7 sm:py-8 shadow-elev-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev-3 hover:border-orange/25">
      <div className="flex items-start justify-between gap-3">
        <div>
          {card.tag ? (
            <div className="mb-4 inline-flex w-fit rounded-full border border-orange/25 bg-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-orange">
              {card.tag}
            </div>
          ) : null}
          <h4 className="text-[22px] font-extrabold leading-tight tracking-tight text-navy">{card.title}</h4>
        </div>
        <div className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-600">
          {card.purchaseType === 'fixed'
            ? 'Buy now'
            : card.purchaseType === 'priced'
              ? 'Get pricing'
              : card.purchaseType === 'review'
                ? 'Request review'
                : 'Monthly support'}
        </div>
      </div>

      {(visiblePrice || card.monthlyLimit || card.turnaround) && (
        <div className="mt-6 space-y-2">
          {priceLabel && visiblePrice ? <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">{priceLabel}</p> : null}
          {visiblePrice ? <p className="text-[1.2rem] font-extrabold tracking-tight text-orange">{visiblePrice}</p> : null}
          {card.monthlyLimit ? <p className="text-sm text-stone-600">{card.monthlyLimit}</p> : null}
          {card.turnaround ? <p className="text-sm text-stone-600">{card.turnaround}</p> : null}
        </div>
      )}

      <div className="mt-6 flex flex-1 flex-col text-[14.5px] leading-[1.6] text-stone-700">
        <div className="space-y-6">
          <p className="font-semibold text-navy">{card.pain}</p>
          <p>{card.summary}</p>
          <p className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 text-sm font-semibold text-navy">{card.outcome}</p>
          <ul className={`${detailListClass} mb-7 leading-[1.6]`}>
            {card.details.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-stone-600">{card.fit}</p>
        </div>
      </div>

      <div className="mt-9 space-y-3 pb-1">
        {getPrimaryCta(card)}
        <Link
          href={card.detailHref}
          className="inline-flex w-full items-center justify-center rounded-full border border-stone-300 bg-white py-3 text-center text-sm font-semibold text-navy transition-all duration-300 hover:border-orange hover:text-orange"
        >
          See Details
        </Link>
      </div>
    </div>
  );
}
