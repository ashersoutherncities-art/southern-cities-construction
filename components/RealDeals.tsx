import Link from 'next/link';

const GOOGLE_REVIEWS_URL = 'https://share.google/veMNoYTwMniCKYDD4';

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
      { label: 'Contract price', value: '$130k' },
      { label: 'Assignment (buyer) price', value: '$202k' },
      { label: 'Rehab budget', value: '$30k' },
      { label: 'ARV', value: '$275k' },
    ],
    result:
      'Paint, full floor replacement, and a new back deck. We did the work at the committed $30k — and the investor sold for $270k.',
  },
  {
    location: 'Havelock, NC',
    type: 'Brick home · 20 min from the beach',
    stats: [
      { label: 'Contract price', value: '$125k' },
      { label: 'Assignment (buyer) price', value: '$180k' },
      { label: 'Rehab budget', value: '$35k' },
      { label: 'ARV', value: '$275k' },
    ],
    result: 'Cosmetic rehab on a committed rehab price backed a clean $55k wholesale spread.',
  },
  {
    location: 'Lenoir, NC',
    type: 'Farmhouse',
    stats: [
      { label: 'Contract price', value: '$50k' },
      { label: 'Assignment (buyer) price', value: '$90k' },
      { label: 'Rehab budget', value: '$100k' },
      { label: 'ARV', value: '$380k' },
    ],
    result: 'Under contract at $50k and assigned to a GC buyer at $90k against a $380k ARV.',
  },
];

export default function RealDeals({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const dark = theme === 'dark';
  const section = dark ? 'border-y border-white/10 bg-[#0a1428]' : 'border-y border-stone-200 bg-stone-50';
  const heading = dark ? 'text-white' : 'text-[#08111d]';
  const intro = dark ? 'text-white/75' : 'text-stone-600';
  const strong = dark ? 'text-white' : 'text-[#08111d]';
  const label = dark ? 'text-white/50' : 'text-stone-500';
  const result = dark ? 'text-white/70' : 'text-stone-600';
  const cardBg = dark ? 'bg-white/[0.04]' : 'bg-white';
  const divider = dark ? 'border-white/12' : 'border-stone-200';
  const note = dark ? 'text-white/45' : 'text-stone-500';
  const btn = dark
    ? 'border border-white/25 bg-white/5 text-white hover:border-[#fa8c41] hover:text-[#fa8c41]'
    : 'border border-stone-300 bg-white text-[#08111d] hover:border-[#fa8c41] hover:text-[#fa8c41]';
  const cardBorder = (featured: boolean) =>
    featured ? 'border-[#fa8c41]/55' : dark ? 'border-white/12' : 'border-stone-200';

  return (
    <section className={`${section} py-20 sm:py-24`}>
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Real deals</p>
          <h2 className={`mt-3 text-4xl font-black tracking-[-0.03em] sm:text-5xl ${heading}`}>
            Real NC deals. Committed prices we stood behind.
          </h2>
          <p className={`mt-4 text-lg leading-relaxed ${intro}`}>
            Actual NC properties. Each deal shows contract price, assignment (buyer) price, rehab budget,
            and ARV — the four numbers a buyer or lender needs to see the math.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {deals.map((d) => (
            <article key={d.location} className={`flex flex-col rounded-2xl border ${cardBg} ${cardBorder(!!d.featured)} p-6`}>
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#fa8c41]">{d.location}</p>
              <h3 className={`mt-1 text-lg font-extrabold tracking-tight ${strong}`}>{d.type}</h3>
              <dl className={`mt-5 grid grid-cols-2 gap-x-4 gap-y-5 border-t ${divider} pt-5`}>
                {d.stats.map((s) => (
                  <div key={s.label} className="min-w-0">
                    <dt className={`text-[11px] font-bold uppercase tracking-[0.08em] leading-snug ${label}`}>{s.label}</dt>
                    <dd className={`mt-1 text-[1.65rem] font-black tracking-tight leading-none ${strong}`}>{s.value}</dd>
                  </div>
                ))}
              </dl>
              <p className={`mt-5 flex-1 text-[14px] leading-relaxed ${result}`}>{d.result}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${btn}`}
          >
            See our reviews on Google <span aria-hidden="true">→</span>
          </Link>
          <p className={`max-w-md text-[12.5px] leading-relaxed ${note}`}>
            Real past projects across North Carolina. Numbers are deal-specific; results vary by property and market.
          </p>
        </div>
      </div>
    </section>
  );
}
