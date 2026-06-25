import Link from 'next/link';

const GOOGLE_REVIEWS_URL = 'https://maps.app.goo.gl/uQ6gFGMpbZng3QL98';

type Deal = {
  location: string;
  type: string;
  featured?: boolean;
  stats: { label: string; value: string }[];
  result: string;
};

const deals: Deal[] = [
  {
    location: 'New Bern, NC',
    type: 'Builder-grade home',
    featured: true,
    stats: [
      { label: 'Under contract', value: '$130k' },
      { label: 'Wholesale assignment', value: '$202k' },
      { label: 'GC rehab budget', value: '$30k' },
      { label: 'ARV', value: '$275k' },
    ],
    result:
      'Paint, full floor replacement, and a new back deck. We did the work at the committed $30k — and the investor sold for $270k.',
  },
  {
    location: 'Havelock, NC',
    type: 'Brick home · 20 min from the beach',
    stats: [
      { label: 'Under contract', value: '$125k' },
      { label: 'Wholesale assignment', value: '$180k' },
      { label: 'GC rehab budget', value: '$35k' },
      { label: 'ARV', value: '$275k' },
    ],
    result: 'Cosmetic rehab on GC-verified numbers backed a clean $55k wholesale spread.',
  },
  {
    location: 'Lenoir, NC',
    type: 'Farmhouse',
    stats: [
      { label: 'Under contract', value: '$50k' },
      { label: 'Wholesale assignment', value: '$90k' },
      { label: 'GC rehab budget', value: '$100k' },
      { label: 'ARV', value: '$380k' },
    ],
    result: 'Under contract at $50k and assigned to a GC buyer at $90k against a $380k ARV.',
  },
];

export default function RealDeals() {
  return (
    <section className="border-y border-stone-200 bg-stone-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Real deals</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">
            Real NC deals. Real GC-verified numbers.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-stone-600">
            Actual properties we ran the numbers on and stood behind. Here&rsquo;s what each deal looked like — and what the
            work actually cost.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {deals.map((d) => (
            <article
              key={d.location}
              className={`flex flex-col rounded-2xl border bg-white p-6 ${
                d.featured ? 'border-[#fa8c41]/50 shadow-[0_18px_40px_-22px_rgba(245,130,32,0.4)]' : 'border-stone-200'
              }`}
            >
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#fa8c41]">{d.location}</p>
              <h3 className="mt-1 text-lg font-extrabold tracking-tight text-[#08111d]">{d.type}</h3>
              <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-stone-200 pt-5">
                {d.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="text-[10.5px] font-semibold uppercase tracking-wide text-stone-500">{s.label}</dt>
                    <dd className="mt-0.5 text-xl font-black tracking-tight text-[#08111d]">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 flex-1 text-[14px] leading-relaxed text-stone-600">{d.result}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-[#08111d] transition hover:border-[#fa8c41] hover:text-[#fa8c41]"
          >
            See our reviews on Google <span aria-hidden="true">→</span>
          </Link>
          <p className="max-w-md text-[12.5px] leading-relaxed text-stone-500">
            Real past projects across North Carolina. Numbers are deal-specific; results vary by property and market.
          </p>
        </div>
      </div>
    </section>
  );
}
