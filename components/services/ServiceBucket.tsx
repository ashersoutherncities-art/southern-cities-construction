'use client';

import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
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
  if (card.purchaseType === 'fixed' && card.itemKey) {
    return (
      <AddToCartButton
        itemKey={card.itemKey}
        label={card.cta}
        className="inline-flex w-full items-center justify-center rounded-full bg-orange py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-500"
      />
    );
  }

  return (
    <Link
      href={card.ctaHref || card.detailHref}
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
  return (
    <div className="flex h-full w-full max-w-[420px] flex-col rounded-[22px] border border-stone-200 bg-white p-6 shadow-elev-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev-3 hover:border-orange/25">
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

      {(card.monthlyPrice || card.monthlyLimit || card.turnaround || card.pricingNote) && (
        <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
          {card.monthlyPrice ? <p className="text-lg font-extrabold text-navy">{card.monthlyPrice}</p> : null}
          {card.monthlyLimit ? <p className="mt-2 text-sm text-stone-600">{card.monthlyLimit}</p> : null}
          {card.turnaround ? <p className="mt-1 text-sm text-stone-600">{card.turnaround}</p> : null}
          {card.pricingNote ? <p className="mt-1 text-sm text-stone-600">{card.pricingNote}</p> : null}
        </div>
      )}

      <div className="mt-4 space-y-4 text-[14.5px] leading-relaxed text-stone-700">
        <p className="font-semibold text-navy">{card.pain}</p>
        <p>{card.summary}</p>
        <p className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-semibold text-navy">{card.outcome}</p>
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

      <div className="mt-auto pt-6 space-y-3">
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
