import Link from 'next/link';

const trustItems = [
  { label: 'NC GC License #107724', href: 'https://portal.nclbgc.org/Public/Search' },
  { label: 'Fully Insured' },
  { label: '5 Years in Business' },
  { label: '15+ Projects Completed' },
  { label: 'Charlotte HQ · Statewide NC' },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-stone-200 bg-stone-50">
      <div className="container-pro py-3">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[12px] font-medium tracking-[0.01em] text-stone-700 sm:text-[12.5px]">
          {trustItems.map((item, index) => (
            <div key={item.label} className="inline-flex items-center gap-3">
              {item.href ? (
                <Link href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
              {index < trustItems.length - 1 ? <span className="text-stone-400">·</span> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
