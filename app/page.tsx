'use client';

import { useState, useEffect, useRef } from 'react';
import CartNavLink from '@/components/CartNavLink';

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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// SVG Icons as components
const icons = {
  construction: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
    </svg>
  ),
  renovation: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
    </svg>
  ),
  site: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
    </svg>
  ),
  permit: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  management: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
    </svg>
  ),
  team: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  shield: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  bolt: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  clipboard: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.049 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
    </svg>
  ),
  currency: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  users: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  eye: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  ),
  mail: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  location: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  document: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  externalLink: (
    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  ),
  menu: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
  close: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
    <div className="group card-hover rounded-2xl overflow-hidden bg-white border border-gray-100">
      <div
        ref={containerRef}
        className="relative h-64 sm:h-72 select-none cursor-col-resize overflow-hidden"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={onTouchMove}
      >
        {/* After image (base) */}
        <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
        {/* Before image (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
          <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ width: containerRef.current?.offsetWidth || 800 }} />
        </div>
        {/* Divider line */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-20" style={{ left: `${sliderPos}%` }}>
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center z-30">
            <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
            </svg>
          </div>
        </div>
        {/* Labels */}
        <div className="absolute top-3 left-3 z-10 bg-black/50 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">BEFORE</div>
        <div className="absolute top-3 right-3 z-10 bg-orange/90 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">AFTER</div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold text-navy tracking-tight">{title}</h3>
          <span className="text-xs font-semibold text-orange bg-orange/10 px-3 py-1 rounded-full">{year}</span>
        </div>
        <p className="text-sm text-gray-400">North Carolina</p>
        <p className="text-sm text-gray-500 font-medium mt-0.5">{type}</p>
        <p className="text-xs text-gray-400 mt-2 italic">Drag to compare</p>
      </div>
    </div>
  );
}

// Animated section wrapper
function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useAnimateOnScroll();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#flagship-service', label: 'Flagship Service' },
    { href: '#services', label: 'Services' },
    { href: '#process', label: 'Process' },
    { href: '#tools', label: 'Tools' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  const pricingLink = { href: '/services', label: 'Services & Pricing' };
  const realtorLink = { href: '/realtor', label: 'Realtor Services' };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-navy/95 backdrop-blur-md shadow-2xl shadow-navy/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20 lg:h-24">
            <div className="flex items-center">
              <img
                src="/sc-construction-logo.png"
                alt="Southern Cities Construction"
                className="h-12 w-auto md:h-14 lg:h-16"
              />
            </div>
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/90 hover:text-orange px-4 py-2 rounded-lg text-[15px] font-medium tracking-wide transition-colors duration-200 hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={pricingLink.href}
                className="text-white/90 hover:text-orange px-4 py-2 rounded-lg text-[15px] font-medium tracking-wide transition-colors duration-200 hover:bg-white/5"
              >
                {pricingLink.label}
              </a>
              <a
                href={realtorLink.href}
                className="text-white/90 hover:text-orange px-4 py-2 rounded-lg text-[15px] font-medium tracking-wide transition-colors duration-200 hover:bg-white/5"
              >
                {realtorLink.label}
              </a>
              <CartNavLink className="ml-2 text-white/90 hover:text-orange px-4 py-2 rounded-lg text-[15px] font-medium tracking-wide transition-colors duration-200 hover:bg-white/5 hidden lg:block" />
              <a
                href="https://clients.southerncitiesconstruction.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 bg-orange hover:bg-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange/30 flex items-center gap-1.5"
              >
                Client Portal
                {icons.externalLink}
              </a>
              <a
                href="#contact"
                className="ml-2 bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
              >
                Get a Quote
              </a>
            </div>
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {mobileMenuOpen ? icons.close : icons.menu}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-navy/98 backdrop-blur-lg border-t border-white/10">
            <div className="px-5 py-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white/90 hover:text-orange px-4 py-3 rounded-lg text-lg font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={pricingLink.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white/90 hover:text-orange px-4 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                {pricingLink.label}
              </a>
              <a
                href={realtorLink.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white/90 hover:text-orange px-4 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                {realtorLink.label}
              </a>
              <a
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white/90 hover:text-orange px-4 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                Cart
              </a>
              <a
                href="https://clients.southerncitiesconstruction.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="block mt-4 bg-orange text-white text-center px-6 py-3.5 rounded-full text-lg font-semibold"
              >
                Client Portal
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block mt-2 bg-white/[0.08] border border-white/15 text-white text-center px-6 py-3.5 rounded-full text-lg font-semibold"
              >
                Get a Quote
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-navy overflow-hidden">
        {/* Background gradient mesh */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-navy via-navy-800 to-navy-900" />
          <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-orange/5 blur-[120px]" />
          <div className="absolute -bottom-20 -left-32 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
        </div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        {/* Large icon watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] hidden lg:block">
          <img
            src="/sc-construction-icon.png"
            alt=""
            className="h-[600px] w-auto"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <div className="max-w-3xl pt-24 lg:pt-0">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.05] tracking-tight mb-8 animation-fade-in">
              Permit Administration.<br />
              Construction Oversight.
              <span className="block mt-2 gradient-text">Real project execution.</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/60 max-w-3xl mb-12 leading-relaxed animation-fade-in font-light">
              Southern Cities Construction helps owners, operators, and project managers keep residential projects moving through permits, inspections, documentation, oversight, and contractor coordination. This is built for real projects that need structure, not vague consulting.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animation-fade-in">
              <a
                href="#contact"
                className="btn-glow inline-flex items-center justify-center bg-orange hover:bg-orange-500 text-white px-10 py-4.5 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-orange/25 hover:-translate-y-0.5"
              >
                Start Permit + Oversight
                <span className="ml-2">{icons.arrow}</span>
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-sm border border-white/15 text-white px-10 py-4.5 rounded-full text-lg font-medium transition-all duration-300 hover:-translate-y-0.5"
              >
                View Our Work
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-white/10 animation-fade-in">
              {[
                { num: 'NC', label: 'Licensed & Insured' },
                { num: '24h', label: 'Target initial response window' },
                { num: 'Portal', label: 'Documented intake and milestone flow' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-orange">{stat.num}</span>
                  <span className="text-sm text-white/50 mt-1 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>



      </section>

      {/* Flagship Service */}
      <section id="flagship-service" className="py-24 sm:py-32 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <AnimatedSection>
            <div className="max-w-3xl mb-14">
              <span className="text-orange font-semibold text-sm tracking-widest uppercase mb-4 block">Flagship Service</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight">
                Permit Administration + Construction Oversight
              </h2>
              <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                This service is for owners who need permit administration, milestone compliance, inspection coordination, and structured project oversight without guessing what happens next.
              </p>
              <p className="mt-4 text-base text-gray-500 leading-relaxed">
                The day-to-day project manager can be the owner or a third-party representative, but the job has to stay inside our required documentation, inspection, and compliance workflow to remain active.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: 'What Southern Cities Handles',
                items: [
                  'Permit administration and submission support',
                  'Scope and compliance kickoff review',
                  'Milestone tracking and inspection checkpoints',
                  'Issue escalation when work drifts from plan',
                ],
              },
              {
                title: 'What the Project Manager Handles',
                items: [
                  'Day-to-day site coordination',
                  'Trade scheduling and field communication',
                  'Required progress-photo uploads',
                  'Prompt response to correction requests and milestone approvals',
                ],
              },
              {
                title: 'What the Purchase Includes',
                items: [
                  'Structured onboarding after payment',
                  'Portal access and required document checklist',
                  'Contract package ready for e-signature',
                  'Invoice/receipt confirmation and compliance start sequence',
                ],
              },
            ].map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 100}>
                <div className="h-full rounded-2xl bg-white border border-gray-100 p-8 shadow-sm">
                  <h3 className="text-xl font-bold text-navy mb-5">{card.title}</h3>
                  <ul className="space-y-3">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-gray-600 text-[15px] leading-relaxed">
                        <span className="mt-1 text-orange">{icons.clipboard}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="rounded-3xl bg-navy p-8 sm:p-10 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-10 items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 mb-5">
                    <span className="text-orange">{icons.shield}</span>
                    Compliance-first delivery model
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-5">
                    Designed for owners who want control without losing structure.
                  </h3>
                  <p className="text-white/65 text-lg leading-relaxed mb-6">
                    We are not marketing this as a paper-only permit pull. This service is built around required oversight, documentation, inspections, and formal client obligations.
                  </p>
                  <div className="space-y-3 text-white/70 text-[15px]">
                    <p>- Required progress-photo uploads at defined milestones</p>
                    <p>- Major inspections must be scheduled and paid as required</p>
                    <p>- Support can be paused if the project falls outside the compliance process</p>
                    <p>- Final responsibilities are defined in the signed client agreement for each project</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-8">
                  <p className="text-sm font-semibold tracking-widest uppercase text-orange mb-3">Post-purchase flow</p>
                  <h4 className="text-2xl font-bold text-navy mb-5">What happens after someone buys</h4>
                  <ol className="space-y-4 text-gray-600 text-[15px] leading-relaxed">
                    <li><strong className="text-navy">1.</strong> Buyer enters project, owner, billing, and project-manager details during checkout.</li>
                    <li><strong className="text-navy">2.</strong> Payment confirmation is issued and the order routes to <strong>orders@southerncitiesconstruction.com</strong>.</li>
                    <li><strong className="text-navy">3.</strong> Buyer receives receipt/invoice plus portal login instructions.</li>
                    <li><strong className="text-navy">4.</strong> Contract and any supporting documents wait in the portal for e-signature.</li>
                    <li><strong className="text-navy">5.</strong> Once signed, the compliance checklist and milestone workflow begin.</li>
                  </ol>
                  <a href="#contact" className="mt-8 inline-flex items-center justify-center bg-orange hover:bg-orange-500 text-white px-7 py-3.5 rounded-full text-base font-semibold transition-all duration-300">
                    Build My Permit + Oversight Plan
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 sm:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
              <span className="text-orange font-semibold text-sm tracking-widest uppercase mb-4 block">Where We Help</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight">
                Construction services built around real project bottlenecks
              </h2>
              <p className="mt-5 text-lg text-gray-500 leading-relaxed">
                We are most useful when a project needs permits, oversight, scheduling discipline, inspections, or a stronger execution structure to get from scope to closeout.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: icons.construction, title: 'Ground-Up and Major Residential Work', desc: 'Built for projects that need a licensed contractor, documented coordination, and a real path from pre-construction to closeout.', accent: 'from-navy to-navy-700' },
              { icon: icons.renovation, title: 'Renovations and Repositioning', desc: 'For owners improving a property before sale, refinance, hold, or occupancy, with scope clarity and execution structure.', accent: 'from-orange to-orange-600' },
              { icon: icons.site, title: 'Site and Scope Readiness', desc: 'Useful when a project is stuck on early logistics, coordination gaps, or readiness issues before trades can move cleanly.', accent: 'from-navy-700 to-blue-800' },
              { icon: icons.permit, title: 'Permit Administration', desc: 'Application support, submission coordination, correction handling, and inspection sequencing tied to the actual project workflow.', accent: 'from-orange-600 to-orange-700' },
              { icon: icons.management, title: 'Construction Oversight', desc: 'Milestone tracking, compliance checkpoints, issue escalation, and structured oversight so the project does not drift.', accent: 'from-navy to-navy-600' },
              { icon: icons.team, title: 'Subcontractor Coordination', desc: 'Trade coordination and contractor communication built around schedule discipline, documentation, and fewer avoidable breakdowns.', accent: 'from-orange to-orange-500' },
            ].map((service, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="group card-hover bg-white rounded-2xl p-8 border border-gray-100 hover:border-orange/20 h-full">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.accent} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-[15px]">{service.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section — Modern Timeline */}
      <section id="process" className="py-24 sm:py-32 bg-navy relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-orange/5 blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-blue-500/5 blur-[60px]" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
              <span className="text-orange font-semibold text-sm tracking-widest uppercase mb-4 block">How It Works</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                From Inquiry to Completion
              </h2>
              <p className="mt-5 text-lg text-white/50 leading-relaxed">
                Our streamlined 5-step process ensures every project runs smoothly from day one.
              </p>
            </div>
          </AnimatedSection>

          {/* Desktop timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-orange/20 via-orange/40 to-orange/20" />

              <div className="grid grid-cols-5 gap-6">
                {[
                  { num: '01', title: 'Submit Project', desc: 'Fill out our digital intake form with your project details and requirements.' },
                  { num: '02', title: 'AI Budget Analysis', desc: 'Our AI engine generates an accurate preliminary estimate within hours.' },
                  { num: '03', title: 'Permit Coordination', desc: 'We handle all permit applications, reviews, and inspections.' },
                  { num: '04', title: 'Construction', desc: 'Expert oversight with real-time progress tracking via your dashboard.' },
                  { num: '05', title: 'Final Handoff', desc: 'Final inspection, punch list, and keys in hand. Project complete.' },
                ].map((step, i) => (
                  <AnimatedSection key={i} delay={i * 150}>
                    <div className="relative text-center group">
                      {/* Step number node */}
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange to-orange-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange/20 group-hover:scale-105 transition-transform duration-300">
                        <span className="text-2xl font-extrabold text-white">{step.num}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{step.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile timeline */}
          <div className="lg:hidden space-y-8">
            {[
              { num: '01', title: 'Submit Project', desc: 'Fill out our digital intake form with your project details and requirements.' },
              { num: '02', title: 'AI Budget Analysis', desc: 'Our AI engine generates an accurate preliminary estimate within hours.' },
              { num: '03', title: 'Permit Coordination', desc: 'We handle all permit applications, reviews, and inspections.' },
              { num: '04', title: 'Construction', desc: 'Expert oversight with real-time progress tracking via your dashboard.' },
              { num: '05', title: 'Final Handoff', desc: 'Final inspection, punch list, and keys in hand. Project complete.' },
            ].map((step, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-orange to-orange-600 flex items-center justify-center shadow-lg shadow-orange/20">
                    <span className="text-lg font-extrabold text-white">{step.num}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Portals Section */}
      <section id="tools" className="py-24 sm:py-32 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
              <span className="text-orange font-semibold text-sm tracking-widest uppercase mb-4 block">Client Access</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight">
                Tools & Portals
              </h2>
              <p className="mt-5 text-lg text-gray-500 leading-relaxed">
                Real-time access to your project data, permits, and financials — all in one place.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: 'Client Portal', desc: 'Submit permits, track status & manage projects', url: 'https://clients.southerncitiesconstruction.com', icon: icons.shield },

              { name: 'Construction Manager', desc: 'Real-time project progress dashboard', url: 'https://sce-construction-manager.vercel.app', icon: icons.management },
              { name: 'Draw Manager', desc: 'Payment schedules and draw tracking', url: 'https://construction-draw-manager-mu.vercel.app', icon: icons.currency },
              { name: 'Subcontractor Portal', desc: 'Subcontractor login, task tracking & invoicing', url: 'https://sub-portal-nine.vercel.app', icon: icons.users },
            ].map((tool, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group card-hover flex items-start gap-5 bg-white rounded-2xl p-7 border border-gray-100 hover:border-orange/20"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-navy/5 group-hover:bg-orange/10 flex items-center justify-center text-navy group-hover:text-orange transition-colors duration-300">
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-navy mb-1 group-hover:text-orange transition-colors duration-200 flex items-center">
                      {tool.name}
                      {icons.externalLink}
                    </h3>
                    <p className="text-gray-400 text-sm">{tool.desc}</p>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Permit Portal CTA Section */}
      <section className="py-20 sm:py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-orange/5 blur-[100px]" />
        </div>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <AnimatedSection>
            <div className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-3xl p-10 sm:p-14 flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="text-orange font-semibold text-sm tracking-widest uppercase mb-4 block">Online Access</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Submit &amp; Track Your Permits Online
                </h2>
                <p className="text-white/50 text-lg leading-relaxed mb-8">
                  Our Client Portal gives you real-time visibility into permit status, inspection schedules, and project milestones — all from one dashboard.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://clients.southerncitiesconstruction.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow inline-flex items-center justify-center bg-orange hover:bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-orange/25 hover:-translate-y-0.5 gap-2"
                  >
                    Open Client Portal
                    {icons.externalLink}
                  </a>
                </div>
              </div>
              <div className="flex-shrink-0 hidden lg:flex w-48 h-48 rounded-2xl bg-gradient-to-br from-orange/20 to-orange/5 items-center justify-center">
                <div className="text-orange scale-[3]">
                  {icons.document}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services & Pricing Banner */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <AnimatedSection>
            <div className="rounded-3xl p-10 sm:p-14 flex flex-col lg:flex-row items-center gap-8 border-2" style={{ backgroundColor: '#132452', borderColor: '#132452' }}>
              <div className="flex-1 text-center lg:text-left">
                <span className="block text-sm font-bold tracking-widest uppercase mb-3" style={{ color: '#fa8c41' }}>Services &amp; Pricing</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Solutions for Every Client Type
                </h2>
                <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-xl">
                  GCs, investors, subcontractors, and homeowners — we have tailored packages with transparent pricing for all.
                </p>
                <a
                  href="/services"
                  className="inline-flex items-center justify-center text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5 gap-2"
                  style={{ backgroundColor: '#fa8c41' }}
                >
                  View Services &amp; Pricing
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </a>
              </div>
              <div className="flex-shrink-0 hidden lg:grid grid-cols-2 gap-3">
                {[
                  { label: 'For GCs' },
                  { label: 'For Investors' },
                  { label: 'For Subs' },
                  { label: 'For Homeowners' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href="/services"
                    className="inline-flex items-center gap-3 rounded-xl px-5 py-3 border border-white/10 transition-all duration-200 hover:brightness-110 hover:border-white/20"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                  >
                    <span className="text-white font-semibold text-sm">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Turnkey Section */}
      <section className="py-20 sm:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <AnimatedSection>
            <div className="max-w-3xl mb-10">
              <span className="text-orange font-semibold text-sm tracking-widest uppercase mb-4 block">Full-Service Construction</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-5">
                Turnkey from Start to Finish
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Southern Cities Construction handles everything from ground-up new construction to full-scale renovations. Whether you&apos;re managing an investment property rehab, a custom new build, or a complete home renovation — we are your single point of contact from permit to punch list. Our turnkey approach means no coordinating multiple contractors, no missed deadlines, no surprises.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: 'Ground-Up Construction', desc: 'New builds from foundation to finish' },
              { title: 'Full Renovations', desc: 'Complete rehabs, additions, and remodels' },
              { title: 'Turnkey Delivery', desc: 'Permits, subs, inspections — all managed for you' },
            ].map((stat, i) => (
              <AnimatedSection key={stat.title} delay={i * 100}>
                <div className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-md transition-shadow">
                  <div>
                    <p className="font-bold text-base text-navy mb-1">{stat.title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{stat.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Airbnb Rehab Feature Section */}
      <section className="py-24 sm:py-32 bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-orange/5 blur-[100px]" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <AnimatedSection>
            <div className="mb-12">
              <span className="text-orange font-semibold text-sm tracking-widest uppercase mb-4 block">Featured Project</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
                1930s Mill House — Turnkey Airbnb Rehab
              </h2>
              <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-8">
                A 1930s mill house — fully gutted and upgraded to a modern, income-producing short-term rental. Every inch of this property was touched: walls demolished and rebuilt, foundation leveled, all flooring replaced, and complete kitchen and bathroom remodels from scratch. Historic character preserved, modern finishes throughout. Turnkey STR setup, ready to earn from day one.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl">
                {[
                  'Walls Demolished & Rebuilt',
                  'Foundation Leveled',
                  'All Floors Replaced',
                  'Full Kitchen Remodel',
                  'All Bathrooms Remodeled',
                  'Turnkey STR Ready',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3">
                    <div className="w-2 h-2 rounded-full bg-orange flex-shrink-0" />
                    <span className="text-white/80 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Interior photo grid */}
          <AnimatedSection>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Finished &amp; Furnished</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { img: '/airbnb-exterior.jpg', label: 'Living Room' },
                { img: '/airbnb-kitchen.jpg', label: 'Dining Room' },
                { img: '/airbnb-living-2.jpg', label: 'Living Room' },
                { img: '/airbnb-dining.jpg', label: 'Bathroom' },
                { img: '/airbnb-bath-1.jpg', label: 'Bedroom' },
                { img: '/airbnb-bedroom-3.jpg', label: 'Living Room' },
                { img: '/airbnb-living-1.jpg', label: 'Kitchen' },
                { img: '/airbnb-bedroom-1.jpg', label: 'Bathroom' },
                { img: '/airbnb-bedroom-2.jpg', label: 'Living Room' },
                { img: '/airbnb-bath-2.jpg', label: 'Bedroom' },
              ].map((item, i) => (
                <div key={i} className="relative group rounded-xl overflow-hidden aspect-[4/3]">
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-white text-sm font-semibold">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>

          </AnimatedSection>
        </div>
      </section>

      {/* Projects Portfolio Section */}
      <section id="projects" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="text-orange font-semibold text-sm tracking-widest uppercase mb-4 block">Our Work</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight">
                Recent Projects
              </h2>
              <p className="mt-5 text-lg text-gray-500 leading-relaxed">
                Real transformations across North Carolina. Drag the slider to see before and after.
              </p>
            </div>
          </AnimatedSection>

          {/* Before/After Sliders */}
          <AnimatedSection className="mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <BeforeAfterSlider
                before="/before-1.jpg"
                after="/project-real-1.jpg"
                title="Full Exterior Renovation"
                type="Residential Rehab"
                year="2026"
              />
              <BeforeAfterSlider
                before="/before-2.jpg"
                after="/project-real-2.jpg"
                title="Siding & Porch Rebuild"
                type="Exterior Renovation"
                year="2026"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <BeforeAfterSlider
                before="/before-3.jpg"
                after="/project-real-5.jpg"
                title="Farmhouse Full Rehab"
                type="Full Rehabilitation"
                year="2025"
              />
              <BeforeAfterSlider
                before="/before-4.jpg"
                after="/after-4.jpg"
                title="Historic Home Restoration"
                type="Full Rehabilitation"
                year="2025"
              />
            </div>
          </AnimatedSection>

          {/* Additional project photos */}
          <AnimatedSection>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-5">More Project Photos</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                '/project-real-3.jpg',
                '/project-real-4.jpg',
                '/project-real-6.jpg',
                '/project-real-1.jpg',
              ].map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-square">
                  <img src={img} alt="Project" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 sm:py-32 bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-orange/5 blur-[80px]" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
              <span className="text-orange font-semibold text-sm tracking-widest uppercase mb-4 block">Client Feedback</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                What Clients Say
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: 'Southern Cities handled our full gut rehab from permits to punch list. Communication was excellent and they delivered on time.', name: 'Real Estate Investor', location: 'Charlotte, NC' },
              { quote: 'As a realtor, I refer Southern Cities to my investor clients regularly. Their permit management alone saves weeks on every deal.', name: 'Licensed Realtor', location: 'Mecklenburg County' },
              { quote: 'Transparent draw process, vetted subs, and a team that actually shows up. Exactly what you want in a GC partner.', name: 'Multifamily Developer', location: 'Charlotte, NC' },
            ].map((t, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-8 flex flex-col h-full">
                  <div className="text-orange text-4xl font-serif leading-none mb-4">&ldquo;</div>
                  <p className="text-white/70 text-[15px] leading-relaxed flex-1 mb-6">{t.quote}</p>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs mt-0.5">{t.location}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 sm:py-32 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
              <span className="text-orange font-semibold text-sm tracking-widest uppercase mb-4 block">Why Us</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight">
                Built Different
              </h2>
              <p className="mt-5 text-lg text-gray-500 leading-relaxed">
                Technology-forward construction management that sets us apart from every other GC.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: icons.shield, title: 'Licensed & Insured', desc: 'Fully licensed, bonded, and insured. Complete peace of mind.' },
              { icon: icons.bolt, title: 'AI-Powered Estimates', desc: 'Fast, accurate budget analysis using cutting-edge technology. No more guesswork.' },
              { icon: icons.clipboard, title: 'Full Permit Management', desc: 'We handle all permitting, inspections, and code compliance. Zero hassle for you.' },
              { icon: icons.currency, title: 'Transparent Draws', desc: 'Clear payment schedules with real-time progress tracking. See where every dollar goes.' },
              { icon: icons.users, title: 'Vetted Subcontractors', desc: 'Experienced professionals we trust, rigorously screened and performance-tracked.' },
              { icon: icons.eye, title: 'Daily Oversight', desc: 'Hands-on project management with daily quality control and progress reporting.' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="flex gap-5 p-6 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-navy/5 transition-all duration-300 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-orange/10 group-hover:bg-orange flex items-center justify-center text-orange group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy mb-2 tracking-tight">{item.title}</h3>
                    <p className="text-gray-500 text-[15px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 sm:py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange/5 blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">
              Get a free estimate today. Our AI-powered analysis delivers accurate budget projections faster than any traditional GC.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="btn-glow inline-flex items-center justify-center bg-orange hover:bg-orange-500 text-white px-10 py-4.5 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-orange/25 hover:-translate-y-0.5"
              >
                Get Your Free Quote
                <span className="ml-2">{icons.arrow}</span>
              </a>
              <a
                href="mailto:info@southerncitiesconstruction.com"
                className="inline-flex items-center justify-center bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-sm border border-white/15 text-white px-10 py-4.5 rounded-full text-lg font-medium transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="mr-2">{icons.mail}</span>
                Email Us
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 sm:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
              <span className="text-orange font-semibold text-sm tracking-widest uppercase mb-4 block">Contact</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight">
                Let&apos;s Build Together
              </h2>
              <p className="mt-5 text-lg text-gray-500 leading-relaxed">
                Reach out for a free consultation, a project estimate, or to start the Permit Administration + Construction Oversight onboarding flow.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact info */}
            <AnimatedSection className="lg:col-span-2">
              <div className="space-y-8">
                {[
                  { icon: icons.phone, label: 'Phone', value: '(252) 339-6146', href: 'tel:+12523396146' },
                  { icon: icons.mail, label: 'Orders', value: 'orders@southerncitiesconstruction.com', href: 'mailto:orders@southerncitiesconstruction.com' },
                  { icon: icons.mail, label: 'General', value: 'info@southerncitiesconstruction.com', href: 'mailto:info@southerncitiesconstruction.com' },
                  { icon: icons.location, label: 'Location', value: 'Charlotte, NC', href: null },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center text-navy">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-navy hover:text-orange font-semibold transition-colors text-[15px]">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-navy font-semibold text-[15px]">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center text-navy">
                      {icons.document}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium mb-0.5">License</p>
                      <p className="text-navy font-semibold text-[15px]">NC General Contractor License L.107724</p>
                      <p className="text-gray-500 text-sm mt-1">Qualifier Q.108200 · Fully Licensed &amp; Insured</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact form */}
            <AnimatedSection className="lg:col-span-3" delay={200}>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-navy font-semibold text-sm mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange focus:bg-white transition-all text-[15px]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-navy font-semibold text-sm mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange focus:bg-white transition-all text-[15px]"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-navy font-semibold text-sm mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange focus:bg-white transition-all text-[15px]"
                    placeholder="(704) 000-0000"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-navy font-semibold text-sm mb-2">Service Type</label>
                    <select
                      value={formData.service}
                      onChange={e => setFormData(p => ({ ...p, service: e.target.value }))}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange focus:bg-white transition-all text-[15px]"
                    >
                      <option value="">Select service</option>
                      <option value="Permit Administration + Construction Oversight">Permit Administration + Construction Oversight</option>
                      <option value="General Contracting Quote">General Contracting Quote</option>
                      <option value="Permit Management Service">Permit Management Service</option>
                      <option value="Realtor / Listing Support">Realtor / Listing Support</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-navy font-semibold text-sm mb-2">Who will act as project manager?</label>
                    <select
                      value={formData.audience_type}
                      onChange={e => setFormData(p => ({ ...p, audience_type: e.target.value }))}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange focus:bg-white transition-all text-[15px]"
                    >
                      <option value="">Select one</option>
                      <option value="Client will act as project manager">Client will act as project manager</option>
                      <option value="Third-party PM will manage the project">Third-party PM will manage the project</option>
                      <option value="Need Southern Cities guidance on structure">Need Southern Cities guidance on structure</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-navy font-semibold text-sm mb-2">Project Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={e => setFormData(p => ({ ...p, address: e.target.value }))}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange focus:bg-white transition-all text-[15px]"
                    placeholder="Start typing address..."
                  />
                </div>
                <div>
                  <label className="block text-navy font-semibold text-sm mb-2">Project Details</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange focus:bg-white transition-all text-[15px] resize-none"
                    placeholder="Tell us about your project, scope, timeline, and whether you want the Permit Administration + Construction Oversight service..."
                  />
                </div>
                {formStatus === 'success' && (
                  <div className="rounded-xl bg-green-50 border border-green-200 px-5 py-4 text-green-800 font-medium text-sm">
                    Message sent. Orders and onboarding requests are reviewed through orders@southerncitiesconstruction.com, and we will be in touch within 24 hours.
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="rounded-xl bg-red-50 border border-red-200 px-5 py-4 text-red-700 font-medium text-sm">
                    Something went wrong. Please email us directly at orders@southerncitiesconstruction.com for purchases or info@southerncitiesconstruction.com for general inquiries
                  </div>
                )}
                <button
                  type="submit"
                  disabled={formStatus === 'loading' || formStatus === 'success'}
                  className="btn-glow w-full bg-navy hover:bg-navy-700 disabled:opacity-60 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-navy/20 flex items-center justify-center gap-2"
                >
                  {formStatus === 'loading' ? 'Sending...' : formStatus === 'success' ? 'Sent' : 'Send Message'}
                  {formStatus !== 'loading' && formStatus !== 'success' && <span>{icons.arrow}</span>}
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy pt-16 pb-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <img
                src="/sc-construction-logo.png"
                alt="Southern Cities Construction"
                className="h-12 w-auto mb-5"
              />
              <p className="text-white/40 text-sm leading-relaxed mb-5">
                A Division of Southern Cities Enterprises. Licensed general contracting serving North Carolina.
              </p>
            <p className="text-white/30 text-xs">
                NC General Contractor License L.107724 · Qualifier Q.108200
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wide mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-white/40 hover:text-orange text-sm transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wide mb-5">Client Portals</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Client Portal', url: 'https://clients.southerncitiesconstruction.com' },

                  { name: 'Construction Manager', url: 'https://sce-construction-manager.vercel.app' },
                  { name: 'Draw Manager', url: 'https://construction-draw-manager-mu.vercel.app' },
                ].map((tool) => (
                  <li key={tool.url}>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-orange text-sm transition-colors duration-200">
                      {tool.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wide mb-5">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a href="tel:+12523396146" className="text-white/40 hover:text-orange text-sm transition-colors duration-200 flex items-center gap-2">
                    <span className="text-orange">{icons.phone}</span>
                    (252) 339-6146
                  </a>
                </li>
                <li>
                  <a href="mailto:orders@southerncitiesconstruction.com" className="text-white/40 hover:text-orange text-sm transition-colors duration-200 flex items-center gap-2">
                    <span className="text-orange">{icons.mail}</span>
                    orders@southerncitiesconstruction.com
                  </a>
                </li>
                <li>
                  <a href="mailto:info@southerncitiesconstruction.com" className="text-white/40 hover:text-orange text-sm transition-colors duration-200 flex items-center gap-2">
                    <span className="text-orange">{icons.mail}</span>
                    info@southerncitiesconstruction.com
                  </a>
                </li>
                <li className="flex items-center gap-2 text-white/40 text-sm">
                  <span className="text-orange">{icons.location}</span>
                  Charlotte, NC
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/25 text-sm">
              © {new Date().getFullYear()} Southern Cities Construction LLC. All rights reserved.
            </p>
            <p className="text-white/20 text-xs">
              NC General Contractor License L.107724 · Qualifier Q.108200 · Fully Licensed & Insured
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
