'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

// Intersection Observer hook for scroll animations
function useAnimateOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

const icons = {
  construction: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
    </svg>
  ),
  renovation: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
    </svg>
  ),
  site: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
    </svg>
  ),
  permit: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  management: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
    </svg>
  ),
  team: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  shield: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  clipboard: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
    </svg>
  ),
  currency: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  users: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  eye: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  arrow: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  ),
  phone: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  ),
  mail: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  location: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  document: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  externalLink: (
    <svg className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  ),
};

// Before/After Slider Component
function BeforeAfterSlider({ before, after, title, type, year }: { before: string; after: string; title: string; type: string; year: string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateSlider = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const onMouseDown = () => { isDragging.current = true; };
  const onMouseMove = (e: React.MouseEvent) => { if (isDragging.current) updateSlider(e.clientX); };
  const onMouseUp = () => { isDragging.current = false; };
  const onTouchMove = (e: React.TouchEvent) => { updateSlider(e.touches[0].clientX); };

  return (
    <div className="group card-hover rounded-2xl overflow-hidden bg-white border border-stone-200">
      <div
        ref={containerRef}
        className="relative h-72 sm:h-80 select-none cursor-col-resize overflow-hidden"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={onTouchMove}
      >
        <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
          <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ width: containerRef.current?.offsetWidth || 800 }} />
        </div>
        <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl z-20" style={{ left: `${sliderPos}%` }}>
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white shadow-2xl ring-1 ring-black/5 flex items-center justify-center z-30">
            <svg className="w-4 h-4 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
            </svg>
          </div>
        </div>
        <div className="absolute top-3 left-3 z-10 bg-navy-900/75 text-white text-[10px] tracking-[0.18em] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm uppercase">Before</div>
        <div className="absolute top-3 right-3 z-10 bg-orange text-white text-[10px] tracking-[0.18em] font-semibold px-2.5 py-1 rounded-full uppercase">After</div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-lg font-bold text-navy tracking-tight">{title}</h3>
          <span className="text-[11px] tracking-wider font-semibold text-orange bg-orange/10 px-2.5 py-1 rounded-full">{year}</span>
        </div>
        <p className="text-sm text-stone-500">{type} · North Carolina</p>
        <p className="text-[11px] text-stone-400 mt-2 tracking-wider uppercase">Drag to compare</p>
      </div>
    </div>
  );
}

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useAnimateOnScroll();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] mb-4 ${light ? 'text-white/55' : 'text-orange'}`}>
      <span className={`w-6 h-px ${light ? 'bg-white/30' : 'bg-orange/50'}`} />
      {children}
    </span>
  );
}

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', audience_type: '', service: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          audience_type: formData.audience_type || 'Website lead',
          service: formData.service || 'General inquiry',
          message: `Project Address: ${formData.address}\n\n${formData.message}`,
        }),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', address: '', audience_type: '', service: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <SiteNav />

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center bg-navy-900 overflow-hidden pt-28 md:pt-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950" />
          <div className="absolute top-1/4 -right-40 w-[560px] h-[560px] rounded-full bg-orange/[0.07] blur-[140px]" />
          <div className="absolute -bottom-40 -left-32 w-[460px] h-[460px] rounded-full bg-blue-500/[0.06] blur-[120px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '44px 44px' }} />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.035] hidden lg:block">
          <img
            src="/sc-construction-icon.png"
            alt=""
            className="h-[640px] w-auto"
          />
        </div>

        <div className="relative z-10 container-pro w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 mb-8 animation-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
              Charlotte General Contractor
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-extrabold text-white leading-[1.04] mb-7 animation-fade-in">
              Permit administration.<br />
              Construction oversight.
              <span className="block mt-2 gradient-text">Real project execution.</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed animation-fade-in">
              Southern Cities Construction helps owners, operators, and project managers keep residential projects moving through permits, inspections, documentation, oversight, and contractor coordination. Built for real projects that need structure, not vague consulting.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 animation-fade-in">
              <Link
                href="#contact"
                className="btn-glow inline-flex items-center justify-center bg-orange hover:bg-orange-500 text-white px-8 py-4 rounded-full text-[15px] font-semibold transition-all duration-300 shadow-glow-orange hover:-translate-y-0.5 gap-2"
              >
                Start Permit + Oversight
                {icons.arrow}
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white px-8 py-4 rounded-full text-[15px] font-medium transition-all duration-300 hover:-translate-y-0.5"
              >
                View Services & Pricing
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-14 pt-8 border-t border-white/10 animation-fade-in">
              <dl className="grid grid-cols-3 gap-6 sm:gap-10 max-w-2xl">
                {[
                  { label: 'Permits', value: 'Handled', sub: 'Submission through closeout support' },
                  { label: 'Oversight', value: 'Structured', sub: 'Clear tracking, updates, and next steps' },
                  { label: 'Execution', value: 'Real jobs', sub: 'Built for active residential project work' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-[10px] font-semibold text-white/45 tracking-[0.18em] uppercase mb-1.5">{stat.label}</dt>
                    <dd className="text-xl sm:text-2xl font-bold text-white tracking-tight">{stat.value}</dd>
                    <dd className="text-[12px] text-white/40 mt-0.5">{stat.sub}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Service */}
      <section id="flagship-service" className="py-24 sm:py-32 bg-stone-50 relative">
        <div className="container-pro">
          <AnimatedSection>
            <div className="max-w-3xl mb-14">
              <Eyebrow>Flagship Service</Eyebrow>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight leading-[1.08]">
                Permit Administration + Construction Oversight
              </h2>
              <p className="mt-5 text-lg text-stone-600 leading-relaxed">
                For owners who need permit administration, milestone compliance, inspection coordination, and structured project oversight — without guessing what happens next.
              </p>
              <p className="mt-3 text-[15px] text-stone-500 leading-relaxed">
                The day-to-day project manager can be the owner or a third-party representative, but the job has to stay inside our required documentation, inspection, and compliance workflow to remain active.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-5 mb-12">
            {[
              {
                title: 'What Southern Cities handles',
                items: [
                  'Permit administration and submission support',
                  'Scope and compliance kickoff review',
                  'Milestone tracking and inspection checkpoints',
                  'Issue escalation when work drifts from plan',
                ],
              },
              {
                title: 'What the project manager handles',
                items: [
                  'Day-to-day site coordination',
                  'Trade scheduling and field communication',
                  'Required progress-photo uploads',
                  'Response to correction requests and milestone approvals',
                ],
              },
              {
                title: 'What the purchase includes',
                items: [
                  'Structured onboarding after payment',
                  'Portal access and required document checklist',
                  'Contract package ready for e-signature',
                  'Invoice/receipt confirmation and compliance start sequence',
                ],
              },
            ].map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 80}>
                <div className="h-full rounded-2xl bg-white border border-stone-200 p-7 shadow-elev-1 card-hover">
                  <h3 className="text-[17px] font-bold text-navy mb-5 tracking-tight">{card.title}</h3>
                  <ul className="space-y-3">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-stone-600 text-[14.5px] leading-relaxed">
                        <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-orange/10 text-orange flex items-center justify-center">
                          {icons.clipboard}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="rounded-3xl bg-navy-900 p-8 sm:p-10 lg:p-14 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-orange/[0.08] blur-[120px]" />
              <div className="relative grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] border border-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75 mb-6">
                    <span className="text-orange">{icons.shield}</span>
                    Compliance-first delivery
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-5 leading-[1.1]">
                    Designed for owners who want control without losing structure.
                  </h3>
                  <p className="text-white/65 text-[17px] leading-relaxed mb-7">
                    This is not a paper-only permit pull. The service is built around required oversight, documentation, inspections, and formal client obligations.
                  </p>
                  <ul className="space-y-2.5 text-white/70 text-[14.5px]">
                    {[
                      'Required progress-photo uploads at defined milestones',
                      'Major inspections must be scheduled and paid as required',
                      'Support can be paused if the project falls outside the compliance process',
                      'Final responsibilities defined in the signed client agreement',
                    ].map((line) => (
                      <li key={line} className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-white p-7 sm:p-9 shadow-2xl">
                  <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-orange mb-3">Post-purchase flow</p>
                  <h4 className="text-2xl font-bold text-navy mb-6 tracking-tight">What happens after someone buys</h4>
                  <ol className="space-y-4 text-stone-600 text-[14.5px] leading-relaxed">
                    {[
                      'Buyer enters project, owner, billing, and project-manager details during checkout.',
                      'Payment confirmation is issued and the order routes to orders@southerncitiesconstruction.com.',
                      'Buyer receives receipt/invoice and portal login instructions.',
                      'Contract and supporting documents wait in the portal for e-signature.',
                      'Once signed, the compliance checklist and milestone workflow begin.',
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <Link href="/portal" className="mt-8 inline-flex items-center justify-center w-full sm:w-auto gap-2 bg-orange hover:bg-orange-500 text-white px-7 py-3.5 rounded-full text-[14.5px] font-semibold transition-all duration-300 shadow-glow-orange">
                    Start Onboarding {icons.arrow}
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services grid */}
      <section id="services" className="py-24 sm:py-32 bg-white relative">
        <div className="container-pro">
          <AnimatedSection>
            <div className="max-w-2xl mb-16">
              <Eyebrow>Where we help</Eyebrow>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight leading-[1.08]">
                Construction services built around real project bottlenecks
              </h2>
              <p className="mt-5 text-lg text-stone-500 leading-relaxed">
                We are most useful when a project needs permits, oversight, scheduling discipline, inspections, or a stronger execution structure to get from scope to closeout.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: icons.construction, title: 'Ground-Up & Major Residential', desc: 'For projects that need a licensed contractor, documented coordination, and a real path from pre-construction to closeout.' },
              { icon: icons.renovation, title: 'Renovations & Repositioning', desc: 'For owners improving a property before sale, refinance, hold, or occupancy — with scope clarity and execution structure.' },
              { icon: icons.site, title: 'Site & Scope Readiness', desc: 'Useful when a project is stuck on early logistics, coordination gaps, or readiness issues before trades can move cleanly.' },
              { icon: icons.permit, title: 'Permit Administration', desc: 'Application support, submission coordination, correction handling, and inspection sequencing tied to the actual project workflow.' },
              { icon: icons.management, title: 'Construction Oversight', desc: 'Milestone tracking, compliance checkpoints, issue escalation, and structured oversight so the project does not drift.' },
              { icon: icons.team, title: 'Subcontractor Coordination', desc: 'Trade coordination and contractor communication built around schedule discipline, documentation, and fewer avoidable breakdowns.' },
            ].map((service, i) => (
              <AnimatedSection key={i} delay={i * 60}>
                <div className="group card-hover h-full bg-white rounded-2xl p-7 border border-stone-200 hover:border-orange/30 hover:shadow-elev-2">
                  <div className="w-12 h-12 rounded-xl bg-navy/[0.04] text-navy group-hover:bg-orange group-hover:text-white flex items-center justify-center mb-5 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2 tracking-tight">{service.title}</h3>
                  <p className="text-stone-500 leading-relaxed text-[14.5px]">{service.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="mt-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 p-7 rounded-2xl bg-stone-50 border border-stone-200">
              <div>
                <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-orange mb-1">Ready to price something</p>
                <p className="text-navy font-semibold text-lg">See all services with transparent starting prices.</p>
              </div>
              <Link href="/services" className="inline-flex items-center gap-2 bg-navy hover:bg-navy-700 text-white px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-300">
                Browse Services & Pricing {icons.arrow}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24 sm:py-32 bg-navy-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-orange/[0.06] blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[340px] h-[340px] rounded-full bg-blue-500/[0.05] blur-[80px]" />

        <div className="container-pro relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mb-16">
              <Eyebrow light>How it works</Eyebrow>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.08]">
                From inquiry to closeout — on a documented workflow
              </h2>
              <p className="mt-5 text-lg text-white/55 leading-relaxed">
                Every project moves through the same structured sequence so nothing gets lost between intake, payment, compliance, and handoff.
              </p>
            </div>
          </AnimatedSection>

          {/* Desktop timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute top-12 left-[6%] right-[6%] h-px bg-gradient-to-r from-orange/0 via-orange/50 to-orange/0" />
              <div className="grid grid-cols-5 gap-5">
                {[
                  { num: '01', title: 'Submit Project', desc: 'Digital intake form with project details, scope, and constraints.' },
                  { num: '02', title: 'Scope & Budget Review', desc: 'We review what is in scope, flag the gaps, and align on a direction.' },
                  { num: '03', title: 'Permit & Compliance', desc: 'Permit application, correction responses, and inspection scheduling.' },
                  { num: '04', title: 'Construction Oversight', desc: 'Milestone tracking and documented checkpoints through the build.' },
                  { num: '05', title: 'Final Handoff', desc: 'Final inspection, punch list, and closeout documentation.' },
                ].map((step, i) => (
                  <AnimatedSection key={i} delay={i * 100}>
                    <div className="relative text-left group">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange to-orange-600 flex items-center justify-center mb-6 shadow-glow-orange group-hover:scale-[1.03] transition-transform duration-300">
                        <span className="text-2xl font-extrabold text-white tracking-tight">{step.num}</span>
                      </div>
                      <h3 className="text-[17px] font-bold text-white mb-2 tracking-tight">{step.title}</h3>
                      <p className="text-white/45 text-[13px] leading-relaxed">{step.desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile timeline */}
          <div className="lg:hidden space-y-6">
            {[
              { num: '01', title: 'Submit Project', desc: 'Digital intake form with project details, scope, and constraints.' },
              { num: '02', title: 'Scope & Budget Review', desc: 'We review what is in scope, flag the gaps, and align on a direction.' },
              { num: '03', title: 'Permit & Compliance', desc: 'Permit application, correction responses, and inspection scheduling.' },
              { num: '04', title: 'Construction Oversight', desc: 'Milestone tracking and documented checkpoints through the build.' },
              { num: '05', title: 'Final Handoff', desc: 'Final inspection, punch list, and closeout documentation.' },
            ].map((step, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-orange to-orange-600 flex items-center justify-center shadow-glow-orange">
                    <span className="text-[15px] font-extrabold text-white">{step.num}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1 tracking-tight">{step.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured project */}
      <section className="py-24 sm:py-32 bg-stone-50 relative overflow-hidden">
        <div className="container-pro">
          <AnimatedSection>
            <div className="mb-12 max-w-3xl">
              <Eyebrow>Featured project</Eyebrow>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight leading-[1.08] mb-5">
                1930s Mill House — Turnkey Airbnb Rehab
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed">
                Gutted and rebuilt as a modern, income-producing short-term rental. Walls demolished and rebuilt, foundation leveled, all flooring replaced, and complete kitchen and bathroom remodels from scratch. Historic character preserved, modern finishes throughout.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {[
                  'Walls demo & rebuild',
                  'Foundation leveling',
                  'Full floor replacement',
                  'Kitchen remodel',
                  'All baths remodeled',
                  'Turnkey STR ready',
                ].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 bg-white border border-stone-200 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium text-stone-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { img: '/airbnb-exterior.jpg', label: 'Exterior' },
                { img: '/airbnb-kitchen.jpg', label: 'Kitchen' },
                { img: '/airbnb-living-2.jpg', label: 'Living' },
                { img: '/airbnb-dining.jpg', label: 'Dining' },
                { img: '/airbnb-bath-1.jpg', label: 'Bathroom' },
                { img: '/airbnb-bedroom-3.jpg', label: 'Bedroom' },
                { img: '/airbnb-living-1.jpg', label: 'Living' },
                { img: '/airbnb-bedroom-1.jpg', label: 'Bedroom' },
                { img: '/airbnb-bath-2.jpg', label: 'Bathroom' },
              ].map((item, i) => (
                <div key={i} className="relative group rounded-2xl overflow-hidden aspect-[4/3] bg-stone-200">
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-[13px] font-semibold tracking-wide">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects portfolio */}
      <section id="projects" className="py-24 sm:py-32 bg-white">
        <div className="container-pro">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <Eyebrow>Our work</Eyebrow>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight">
                Recent projects
              </h2>
              <p className="mt-5 text-lg text-stone-500 leading-relaxed">
                Real transformations across North Carolina. Drag the slider to see before and after.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <BeforeAfterSlider before="/before-1.jpg" after="/project-real-1.jpg" title="Full Exterior Renovation" type="Residential Rehab" year="2026" />
              <BeforeAfterSlider before="/before-2.jpg" after="/project-real-2.jpg" title="Siding & Porch Rebuild" type="Exterior Renovation" year="2026" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <BeforeAfterSlider before="/before-3.jpg" after="/project-real-5.jpg" title="Farmhouse Full Rehab" type="Full Rehabilitation" year="2025" />
              <BeforeAfterSlider before="/before-4.jpg" after="/after-4.jpg" title="Historic Home Restoration" type="Full Rehabilitation" year="2025" />
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="mt-10 pt-10 border-t border-stone-200">
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-[0.22em] mb-5">Additional project photos</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['/project-real-3.jpg', '/project-real-4.jpg', '/project-real-6.jpg', '/project-real-1.jpg'].map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden aspect-square bg-stone-100">
                    <img src={img} alt="Project" className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 sm:py-32 bg-stone-50 relative">
        <div className="container-pro">
          <AnimatedSection>
            <div className="max-w-2xl mb-14">
              <Eyebrow>Why Southern Cities</Eyebrow>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight leading-[1.08]">
                Structured, documented, and accountable — from the first phone call
              </h2>
              <p className="mt-5 text-lg text-stone-500 leading-relaxed">
                We run jobs on a real workflow: licensed, documented at every milestone, and traceable end to end. No black-box consulting, no vague promises.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: icons.shield, title: 'Licensed & insured', desc: 'NC General Contractor License L.107724 · Qualifier Q.108200. Fully bonded and insured.' },
              { icon: icons.permit, title: 'Full permit administration', desc: 'Applications, correction responses, inspection scheduling, and closeout tracking handled in one workflow.' },
              { icon: icons.management, title: 'Milestone-based oversight', desc: 'Progress-photo requirements, inspection checkpoints, and documented issue escalation at each milestone.' },
              { icon: icons.currency, title: 'Transparent draws', desc: 'Clear payment schedules tied to verified progress. Every draw connects back to a milestone.' },
              { icon: icons.users, title: 'Vetted subcontractors', desc: 'A network of trades we already work with. Coordination is structured, not improvised.' },
              { icon: icons.eye, title: 'Documented handoff', desc: 'Final inspection, punch list, and a written closeout package so the project ends cleanly.' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 60}>
                <div className="flex gap-4 p-6 rounded-2xl bg-white border border-stone-200 hover:border-orange/25 hover:shadow-elev-2 transition-all duration-300 group h-full">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-orange/10 group-hover:bg-orange group-hover:text-white text-orange flex items-center justify-center transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-navy mb-1.5 tracking-tight">{item.title}</h3>
                    <p className="text-stone-500 text-[14.5px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-28 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-orange/[0.06] blur-[120px]" />
        </div>
        <div className="container-pro relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                Ready to put structure on your project?
              </h2>
              <p className="text-lg text-white/55 mb-10 max-w-2xl mx-auto leading-relaxed">
                Tell us what the project is and what stage it is in. We will review and follow up with a clear next step within one business day.
              </p>
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
                <Link
                  href="#contact"
                  className="btn-glow inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-500 text-white px-9 py-4 rounded-full text-[15px] font-semibold transition-all duration-300 shadow-glow-orange hover:-translate-y-0.5"
                >
                  Request a Quote
                  {icons.arrow}
                </Link>
                <a
                  href="tel:+12523396146"
                  className="inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white px-9 py-4 rounded-full text-[15px] font-medium transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="text-orange">{icons.phone}</span>
                  (252) 339-6146
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 sm:py-32 bg-white">
        <div className="container-pro max-w-6xl">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <Eyebrow>Contact</Eyebrow>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight">
                Let&apos;s build together
              </h2>
              <p className="mt-5 text-lg text-stone-500 leading-relaxed">
                Reach out for a free consultation, a project estimate, or to start the Permit Administration + Construction Oversight onboarding flow.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            <AnimatedSection className="lg:col-span-2">
              <div className="space-y-6">
                {[
                  { icon: icons.phone, label: 'Phone', value: '(252) 339-6146', href: 'tel:+12523396146' },
                  { icon: icons.mail, label: 'Orders', value: 'orders@southerncitiesconstruction.com', href: 'mailto:orders@southerncitiesconstruction.com' },
                  { icon: icons.mail, label: 'General inquiries', value: 'info@southerncitiesconstruction.com', href: 'mailto:info@southerncitiesconstruction.com' },
                  { icon: icons.location, label: 'Based in', value: 'Charlotte, NC · Serving North Carolina', href: null },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-navy/[0.04] text-navy flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-stone-400 font-semibold tracking-[0.18em] uppercase mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-navy hover:text-orange font-semibold transition-colors text-[15px] break-all">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-navy font-semibold text-[15px]">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="pt-6 border-t border-stone-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-navy/[0.04] text-navy flex items-center justify-center">
                      {icons.document}
                    </div>
                    <div>
                      <p className="text-[11px] text-stone-400 font-semibold tracking-[0.18em] uppercase mb-1">License</p>
                      <p className="text-navy font-semibold text-[15px]">NC General Contractor L.107724</p>
                      <p className="text-stone-500 text-sm mt-1">Qualifier Q.108200 · Fully licensed & insured</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="lg:col-span-3" delay={120}>
              <form className="space-y-5 p-7 sm:p-8 rounded-3xl bg-stone-50 border border-stone-200" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-navy font-semibold text-[13px] mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-[15px]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-navy font-semibold text-[13px] mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-[15px]"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-navy font-semibold text-[13px] mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-[15px]"
                    placeholder="(704) 000-0000"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-navy font-semibold text-[13px] mb-2">Service type</label>
                    <select
                      value={formData.service}
                      onChange={e => setFormData(p => ({ ...p, service: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-[15px]"
                    >
                      <option value="">Select service</option>
                      <option value="Permit Administration + Construction Oversight">Permit Administration + Construction Oversight</option>
                      <option value="General Contracting Quote">General Contracting Quote</option>
                      <option value="Permit Management Service">Permit Management Service</option>
                      <option value="Realtor / Listing Support">Realtor / Listing Support</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-navy font-semibold text-[13px] mb-2">Project manager role</label>
                    <select
                      value={formData.audience_type}
                      onChange={e => setFormData(p => ({ ...p, audience_type: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-[15px]"
                    >
                      <option value="">Select one</option>
                      <option value="Client will act as project manager">Client will act as project manager</option>
                      <option value="Third-party PM will manage the project">Third-party PM will manage the project</option>
                      <option value="Need Southern Cities guidance on structure">Need Southern Cities guidance on structure</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-navy font-semibold text-[13px] mb-2">Project address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={e => setFormData(p => ({ ...p, address: e.target.value }))}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-[15px]"
                    placeholder="Street address, city, NC"
                  />
                </div>
                <div>
                  <label className="block text-navy font-semibold text-[13px] mb-2">Project details</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-[15px] resize-none"
                    placeholder="Tell us about the project scope, timeline, and whether you want the Permit Administration + Construction Oversight service..."
                  />
                </div>
                {formStatus === 'success' && (
                  <div className="rounded-xl bg-green-50 border border-green-200 px-5 py-4 text-green-800 font-medium text-sm">
                    Message sent. We review inquiries through orders@southerncitiesconstruction.com and will be in touch within one business day.
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="rounded-xl bg-red-50 border border-red-200 px-5 py-4 text-red-700 font-medium text-sm">
                    Something went wrong. Email us directly at orders@southerncitiesconstruction.com for purchases or info@southerncitiesconstruction.com for general inquiries.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={formStatus === 'loading' || formStatus === 'success'}
                  className="btn-glow w-full bg-navy hover:bg-navy-700 disabled:opacity-60 text-white px-8 py-4 rounded-xl font-semibold text-[15px] transition-all duration-300 shadow-elev-2 flex items-center justify-center gap-2"
                >
                  {formStatus === 'loading' ? 'Sending...' : formStatus === 'success' ? 'Sent' : 'Send Message'}
                  {formStatus !== 'loading' && formStatus !== 'success' && icons.arrow}
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
