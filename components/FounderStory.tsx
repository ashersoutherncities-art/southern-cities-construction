import Link from 'next/link';

type FounderStoryProps = {
  /** Visual theme. 'dark' = navy section w/ white text; 'light' = white/cream section. */
  theme?: 'dark' | 'light';
  /** What the founder built — fills "I built {productName} because…". Default "this platform". */
  productName?: string;
  /** The wedge line's product verb, e.g. "underwrite a deal" / "review a deal". */
  wedge?: string;
  /** Optional primary CTA. */
  cta?: { label: string; href: string };
  /** Optional eyebrow override. */
  eyebrow?: string;
  /** Optional headline override. */
  heading?: string;
};

/**
 * Canonical license-backed "Most GCs won't" trust story (company voice).
 * Single source of truth — replaces the block that was copy-pasted across
 * /deal-pack, /services/wholesalers, /services/realtors, /services/investors.
 * NC GC License #107724 is included here to satisfy the every-piece rule.
 */
export default function FounderStory({
  theme = 'dark',
  productName = 'this platform',
  wedge = 'review a deal you don’t own yet',
  cta,
  eyebrow = 'Why trust this',
  heading = 'License-backed. Built across North Carolina.',
}: FounderStoryProps) {
  const dark = theme === 'dark';
  const bodyColor = dark ? 'text-white/80' : 'text-stone-700';
  const strongColor = dark ? 'text-white' : 'text-navy';

  return (
    <div className="max-w-3xl">
      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">{eyebrow}</p>
      <h2 className={`mt-4 text-3xl font-black tracking-[-0.025em] sm:text-4xl ${strongColor}`}>{heading}</h2>
      <div className={`mt-8 space-y-5 text-[16px] leading-[1.65] ${bodyColor}`}>
        <p>
          Southern Cities Construction is a licensed North Carolina General Contractor &mdash; License #107724 &mdash;
          not a coaching brand or a course. Every number is backed by an active license and real jobsites across North
          Carolina.
        </p>
        <p>
          We built {productName} out of hard-won execution experience: the budget assumptions, sub-network gaps, and
          permit timelines that quietly sink real estate deals. Those are exactly the execution mistakes we now help NC
          wholesalers, realtors, and investors avoid.
        </p>
        <p>
          <strong className={strongColor}>Most GCs won&rsquo;t {wedge}.</strong> We will. That&rsquo;s the wedge &mdash;
          a licensed GC&rsquo;s verification opens buyer pools and outcomes that an unverified deal can&rsquo;t reach.
        </p>
      </div>
      {cta && (
        <div className="mt-10">
          <Link
            href={cta.href}
            className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-[#fa8c41] px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(250,140,65,0.5)] transition hover:bg-[#ffa463] hover:-translate-y-0.5"
          >
            {cta.label}
          </Link>
        </div>
      )}
    </div>
  );
}
