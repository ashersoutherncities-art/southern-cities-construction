'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAVY = '#132452';
const ORANGE = '#fa8c41';

// ─── Types ───────────────────────────────────────────────────────────────────

interface PricingCard {
  title: string;
  price: string;
  features: string[];
  cta: string;
  badge?: string;
  ctaHref?: string;
}

// ─── Service options per audience ────────────────────────────────────────────

const SERVICE_OPTIONS: Record<string, string[]> = {
  'General Contractor': [
    'Permit Management Service',
    'Sub Network Access ($349/mo)',
    'Overflow Project Partner',
  ],
  Investor: [
    'Buy Box Review',
    'Deal Audit',
    'Operator Strategy Call',
    'Southern Cities Investors Advisory Services',
  ],
  Subcontractor: ['Sub Network Membership ($149/mo)'],
  Homeowner: [
    'Home Assessment ($299)',
    'Starter Renovation',
    'Mid Renovation',
    'Home Maintenance Plan ($199/mo)',
  ],
  Realtor: [
    'Pre-Listing Renovation',
    'Inspection Response Service ($299)',
    'Referral Partner Program',
  ],
};

// ─── Pricing card component ───────────────────────────────────────────────────

function Card({
  card,
  onCTAClick,
}: {
  card: PricingCard;
  onCTAClick?: () => void;
}) {
  return (
    <div
      className="relative flex flex-col bg-white rounded-2xl shadow-md overflow-hidden h-full"
      style={{ borderTop: `4px solid ${NAVY}` }}
    >
      {card.badge && (
        <span
          className="absolute top-4 right-4 text-xs font-bold text-white px-3 py-1 rounded-full"
          style={{ backgroundColor: ORANGE }}
        >
          {card.badge}
        </span>
      )}

      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-xl font-extrabold mb-1" style={{ color: NAVY }}>
          {card.title}
        </h3>
        <p
          className="text-2xl font-bold mb-6"
          style={{ color: ORANGE }}
        >
          {card.price}
        </p>

        <ul className="space-y-2 flex-1 mb-8">
          {card.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-gray-600 text-[15px]">
              <svg
                className="flex-shrink-0 mt-0.5 w-4 h-4"
                style={{ color: ORANGE }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        {card.ctaHref ? (
          <a
            href={card.ctaHref}
            target={card.ctaHref.startsWith('http') ? '_blank' : undefined}
            rel={card.ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="w-full py-3 rounded-full text-white font-semibold text-sm transition-all duration-300 hover:opacity-90 hover:shadow-lg text-center"
            style={{ backgroundColor: ORANGE, display: 'inline-block' }}
          >
            {card.cta}
          </a>
        ) : (
          <button
            onClick={onCTAClick}
            className="w-full py-3 rounded-full text-white font-semibold text-sm transition-all duration-300 hover:opacity-90 hover:shadow-lg"
            style={{ backgroundColor: ORANGE }}
          >
            {card.cta}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  id,
  bg,
  children,
}: {
  id?: string;
  bg?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="py-20 sm:py-28"
      style={{ backgroundColor: bg ?? '#fff' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">{children}</div>
    </section>
  );
}

function SectionHeader({
  tag,
  headline,
  sub,
  light = false,
}: {
  tag: string;
  headline: string;
  sub: string;
  light?: boolean;
}) {
  return (
    <div className="mb-14 sm:mb-16">
      <span
        className="block text-sm font-bold tracking-widest uppercase mb-3"
        style={{ color: ORANGE }}
      >
        {tag}
      </span>
      <h2
        className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
        style={{ color: light ? '#fff' : NAVY }}
      >
        {headline}
      </h2>
      <div className="w-12 h-1 rounded mb-4" style={{ backgroundColor: ORANGE }} />
      <p
        className="text-lg max-w-2xl"
        style={{ color: light ? 'rgba(255,255,255,0.6)' : '#6b7280' }}
      >
        {sub}
      </p>
    </div>
  );
}

// ─── Cards grid ──────────────────────────────────────────────────────────────

function CardsGrid({
  cards,
  cols = 3,
  onCTAClick,
}: {
  cards: PricingCard[];
  cols?: number;
  onCTAClick?: () => void;
}) {
  const gridCols =
    cols === 1
      ? 'grid-cols-1 max-w-md mx-auto'
      : cols === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid gap-6 ${gridCols}`}>
      {cards.map((c) => (
        <Card key={c.title} card={c} onCTAClick={onCTAClick} />
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    audience_type: '',
    service: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // reset service when audience changes
      ...(name === 'audience_type' ? { service: '' } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', audience_type: '', service: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ─── GC Cards ───────────────────────────────────────────────────────────────
  const gcCards: PricingCard[] = [
    {
      title: 'Permit Management Service',
      price: '$1,500–$3,500/permit',
      features: [
        'Full permit application + submission',
        'Inspection coordination',
        'Follow-up until approval',
        'Status tracking via Client Portal',
      ],
      cta: 'Get Started',
    },
    {
      title: 'Sub Network Access',
      price: '$349/mo',
      features: [
        'Access to vetted subcontractor network',
        'Priority scheduling on overflow work',
        'Digital task + invoice management',
        'Dedicated project coordinator',
      ],
      cta: 'Subscribe',
    },
    {
      title: 'Overflow Project Partner',
      price: '15–20% of project',
      features: [
        'We take your overflow projects',
        'Full project management',
        'Your brand, our execution',
        'Weekly progress reports',
      ],
      cta: "Let's Talk",
    },
  ];

  // ─── Investor Cards ──────────────────────────────────────────────────────────
  const investorCards: PricingCard[] = [
    {
      title: 'Buy Box Review',
      price: '$147',
      features: [
        'Clear feedback on your acquisition criteria',
        'Practical guidance on market fit and deal selection',
        'Designed for investors tightening their buy box',
        'Fast turnaround with direct recommendations',
      ],
      cta: 'View Service',
      ctaHref: 'https://southerncitiesinvestors.com/services/buy-box-review',
    },
    {
      title: 'Deal Audit',
      price: '$297',
      features: [
        'Second-look review before you commit',
        'Buyer-facing analysis on risk, scope, and next steps',
        'Built for active investors evaluating real opportunities',
        'Delivered with clear action-oriented feedback',
      ],
      cta: 'View Service',
      badge: 'Popular',
      ctaHref: 'https://southerncitiesinvestors.com/services/deal-audit',
    },
    {
      title: 'Operator Strategy Call',
      price: '$97',
      features: [
        'Focused conversation around your next acquisition move',
        'Get clarity on priorities, obstacles, and execution',
        'Ideal for investors who want direct guidance now',
        'Simple starting point before deeper advisory work',
      ],
      cta: 'View Service',
      ctaHref: 'https://southerncitiesinvestors.com/services/operator-strategy-call',
    },
    {
      title: 'Southern Cities Investors Advisory Services',
      price: 'See full offers',
      features: [
        'Access the full investor services platform',
        'Explore reviews, advisory offers, and ongoing support',
        'Submit deals and see current investor-focused services',
        'Visit the dedicated investor site for full details',
      ],
      cta: 'Visit Southern Cities Investors',
      ctaHref: 'https://southerncitiesinvestors.com',
    },
  ];

  // ─── Sub Cards ───────────────────────────────────────────────────────────────
  const subCards: PricingCard[] = [
    {
      title: 'Sub Network Membership',
      price: '$149/mo',
      features: [
        'Get matched to jobs in your trade area',
        'Digital task management via Sub Portal',
        'Faster payment processing',
        'Invoice submission + tracking',
        'Priority consideration for all SC projects',
      ],
      cta: 'Join the Network',
    },
  ];

  // ─── Homeowner Cards ──────────────────────────────────────────────────────────
  const homeownerCards: PricingCard[] = [
    {
      title: 'Home Assessment',
      price: '$299',
      features: [
        'Full property walkthrough',
        'Detailed scope + cost report',
        'AI-powered condition analysis',
        'No obligation',
      ],
      cta: 'Book Assessment',
    },
    {
      title: 'Starter Renovation',
      price: 'Starting at $12,000',
      features: [
        'Kitchen OR bathroom OR single room',
        'Licensed + insured work',
        'Permit handling included',
        '30-day typical timeline',
      ],
      cta: 'Get a Quote',
    },
    {
      title: 'Mid Renovation',
      price: 'Starting at $30,000',
      features: [
        'Multiple rooms or major systems',
        'Full project management',
        'Sub coordination included',
        '60-90 day typical timeline',
      ],
      cta: 'Get a Quote',
    },
    {
      title: 'Home Maintenance Plan',
      price: '$199/mo',
      features: [
        'Quarterly property inspection + report',
        'Priority scheduling on all repairs',
        '10% discount on all work',
        'Emergency response within 48 hours',
      ],
      cta: 'Subscribe',
      badge: 'Best Value',
    },
  ];

  const serviceOptions = formData.audience_type
    ? SERVICE_OPTIONS[formData.audience_type] ?? []
    : [];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 border-b border-white/10"
        style={{ backgroundColor: NAVY }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex justify-between items-center h-20">
          <Link href="/">
            <img
              src="/sc-construction-logo.png"
              alt="Southern Cities Construction"
              className="h-11 w-auto"
            />
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="text-white/70 hover:text-white text-sm font-medium transition-colors hidden sm:block"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-white font-semibold text-sm border-b-2 pb-0.5"
              style={{ borderColor: ORANGE }}
            >
              Services
            </Link>
            <a
              href="https://clients.southerncitiesconstruction.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:opacity-90"
              style={{ backgroundColor: ORANGE }}
            >
              Client Portal
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section
        className="relative py-24 sm:py-32 overflow-hidden"
        style={{ backgroundColor: NAVY }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: `${ORANGE}10` }} />

        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 border border-white/10 rounded-full px-5 py-2 mb-8"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: ORANGE }} />
            <span className="text-white/70 text-sm font-medium tracking-wide">
              Fully Licensed & Insured General Contractor
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Construction Services &amp;{' '}
            <span style={{ color: ORANGE }}>Subscriptions</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            Tailored solutions for General Contractors, Investors, Subcontractors, and Homeowners
          </p>

          {/* Audience anchor pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: '#gc', label: 'For GCs' },
              { href: '#investors', label: 'For Investors' },
              { href: '#subs', label: 'For Subs' },
              { href: '#homeowners', label: 'For Homeowners' },
              { href: '#realtors', label: 'For Realtors' },
            ].map((pill) => (
              <a
                key={pill.href}
                href={pill.href}
                className="group inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-white/10 transition-all duration-300 hover:brightness-110 hover:border-white/20"
                style={{ backgroundColor: NAVY }}
              >
                <span className="text-white font-semibold text-[15px]">{pill.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── TURNKEY BANNER ──────────────────────────────────────────────────── */}
      <Section id="turnkey" bg="#ffffff">
        <div className="max-w-3xl mb-10">
          <span className="block text-sm font-bold tracking-widest uppercase mb-3" style={{ color: ORANGE }}>Full-Service Construction</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-5" style={{ color: NAVY }}>
            Turnkey from Start to Finish
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-4">
            Southern Cities Construction handles everything from ground-up new construction to full-scale renovations. Whether you&apos;re managing an investment property rehab, a custom new build, or a complete home renovation — we are your single point of contact from permit to punch list.
          </p>
          <p className="text-gray-500 text-lg leading-relaxed">
            Our turnkey approach means no coordinating multiple contractors, no missed deadlines, no surprises.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { title: 'Ground-Up Construction', desc: 'New builds from foundation to finish' },
            { title: 'Full Renovations', desc: 'Complete rehabs, additions, and remodels' },
            { title: 'Turnkey Delivery', desc: 'Permits, subs, inspections — all managed for you' },
          ].map((stat) => (
            <div key={stat.title} className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 bg-gray-50">
              <div>
                <p className="font-bold text-base mb-1" style={{ color: NAVY }}>{stat.title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── SECTION 1: GCs ─────────────────────────────────────────────────── */}
      <Section id="gc" bg="#ffffff">
        <SectionHeader
          tag="General Contractors"
          headline="Built for general contractors who need real execution support"
          sub="Use Southern Cities when permitting, trade coverage, or project load starts breaking the schedule"
        />
        <CardsGrid cards={gcCards} onCTAClick={scrollToContact} />
      </Section>

      {/* ── SECTION 2: Investors ────────────────────────────────────────────── */}
      <Section id="investors" bg="#f8f9fa">
        <SectionHeader
          tag="Investors"
          headline="Investor services routed through the Southern Cities Investors platform"
          sub="If you need deal review, operator guidance, or acquisition support, start on the dedicated investor side"
        />
        <div className="mb-8 rounded-2xl border border-orange/20 bg-white p-6 sm:p-8">
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Construction-side investor conversations usually start when someone is deciding whether to improve, reposition, renovate, or hand execution to an operator. Those buyer-facing reviews and advisory offers now live at{' '}
            <a
              href="https://southerncitiesinvestors.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#132452] underline decoration-[#fa8c41] underline-offset-4"
            >
              SouthernCitiesInvestors.com
            </a>
            , so the offers below link directly into the current investor platform.
          </p>
        </div>
        <CardsGrid cards={investorCards} onCTAClick={scrollToContact} />
      </Section>

      {/* ── SECTION 3: Subcontractors ───────────────────────────────────────── */}
      <Section id="subs" bg="#ffffff">
        <SectionHeader
          tag="Subcontractors"
          headline="Built for subs who want cleaner handoffs and repeat work"
          sub="Join the network if you want structured scopes, documented communication, and a contractor who is trying to run jobs properly"
        />
        <CardsGrid cards={subCards} cols={1} onCTAClick={scrollToContact} />
      </Section>

      {/* ── SECTION 4: Homeowners ───────────────────────────────────────────── */}
      <Section id="homeowners" bg="#f8f9fa">
        <SectionHeader
          tag="Homeowners"
          headline="For homeowners who want a real plan, not contractor chaos"
          sub="Best fit for projects that need scope clarity, documented coordination, and a cleaner path from estimate to completion"
        />
        <CardsGrid cards={homeownerCards} cols={2} onCTAClick={scrollToContact} />
      </Section>

      {/* ── FOR REALTORS ────────────────────────────────────────────────────── */}
      <Section id="realtors" bg="#f8f9fc">
        <SectionHeader tag="Realtors" headline="For real estate agents trying to keep deals moving" sub="Use Southern Cities when inspection items, listing prep, or renovation scope is threatening timeline, price, or close probability." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {([
            { title: 'Pre-Listing Renovation', price: '$5,000–$15,000', badge: null, cta: 'Get a Quote', features: ['Kitchen + bath refresh before listing', 'Paint, flooring, curb appeal', 'Fast 2–3 week turnaround', 'Helps listings sell faster & for more', 'Coordinated around your timeline'], link: '/realtor?service=pre_listing' },
            { title: 'Inspection Response Service', price: '$299 assessment', badge: 'Fast Turnaround', cta: 'Submit Inspection', features: ['Buyer receives inspection report', 'We assess all repair requests within 24hrs', 'Fixed-price repairs quoted upfront', 'Helps deals close instead of fall apart', 'Serving clients across North Carolina'], link: '/realtor?service=inspection_response' },
            { title: 'Referral Partner Program', price: '5–10% referral fee', badge: null, cta: 'Become a Partner', features: ['Refer clients needing renovation work', 'Earn 5–10% of every completed project', 'No cost to you or your client', 'We handle everything after intro', 'Monthly referral tracking dashboard'], link: '/realtor' },
          ] as (PricingCard & { link?: string })[]).map((card) => (
            <Card key={card.title} card={card} onCTAClick={() => window.location.href = card.link || '/realtor'} />
          ))}
        </div>
      </Section>

      {/* ── GET STARTED FORM ────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-20 sm:py-28"
        style={{ backgroundColor: NAVY }}
      >
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <span
              className="block text-sm font-bold tracking-widest uppercase mb-3"
              style={{ color: ORANGE }}
            >
              Get Started
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Let&apos;s Talk About Your Project
            </h2>
            <div className="w-12 h-1 rounded mx-auto mb-4" style={{ backgroundColor: ORANGE }} />
            <p className="text-white/60 text-lg">
              Fill out the form below and we&apos;ll review the project, the service fit, and the fastest next step.
            </p>
          </div>

          {submitted ? (
            <div
              className="rounded-2xl p-10 text-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: `1px solid ${ORANGE}` }}
            >

              <h3 className="text-2xl font-bold text-white mb-2">
                We&apos;ve received your inquiry!
              </h3>
              <p className="text-white/60">
                Our team will reach out within 24 hours to discuss your project.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm font-semibold underline"
                style={{ color: ORANGE }}
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 sm:p-10 space-y-5"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {/* Name */}
              <div>
                <label className="block text-white/80 font-semibold text-sm mb-2">
                  Name <span style={{ color: ORANGE }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl text-white text-[15px] focus:outline-none transition-all"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                />
              </div>

              {/* Email + Phone */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/80 font-semibold text-sm mb-2">
                    Email <span style={{ color: ORANGE }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@email.com"
                    className="w-full px-4 py-3 rounded-xl text-white text-[15px] focus:outline-none transition-all"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                  />
                </div>
                <div>
                  <label className="block text-white/80 font-semibold text-sm mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(704) 000-0000"
                    className="w-full px-4 py-3 rounded-xl text-white text-[15px] focus:outline-none transition-all"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                  />
                </div>
              </div>

              {/* Audience */}
              <div>
                <label className="block text-white/80 font-semibold text-sm mb-2">
                  I am a...
                </label>
                <select
                  name="audience_type"
                  value={formData.audience_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl text-white text-[15px] focus:outline-none transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  <option value="" style={{ color: '#000' }}>Select one...</option>
                  <option value="General Contractor" style={{ color: '#000' }}>General Contractor</option>
                  <option value="Investor" style={{ color: '#000' }}>Investor</option>
                  <option value="Subcontractor" style={{ color: '#000' }}>Subcontractor</option>
                  <option value="Homeowner" style={{ color: '#000' }}>Homeowner</option>
                  <option value="Realtor" style={{ color: '#000' }}>Real Estate Agent / Realtor</option>
                </select>
              </div>

              {/* Service (conditional) */}
              {formData.audience_type && (
                <div>
                  <label className="block text-white/80 font-semibold text-sm mb-2">
                    Service interested in
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl text-white text-[15px] focus:outline-none transition-all appearance-none cursor-pointer"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    <option value="" style={{ color: '#000' }}>Select a service...</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} style={{ color: '#000' }}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-white/80 font-semibold text-sm mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your project or question..."
                  className="w-full px-4 py-3 rounded-xl text-white text-[15px] focus:outline-none transition-all resize-none"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-full text-white font-bold text-lg transition-all duration-300 hover:opacity-90 hover:shadow-xl disabled:opacity-60"
                style={{ backgroundColor: ORANGE }}
              >
                {submitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer
        className="py-8 border-t border-white/5 text-center"
        style={{ backgroundColor: NAVY }}
      >
        <p className="text-white/30 text-sm">
          © {new Date().getFullYear()} Southern Cities Construction LLC — Fully Licensed & Insured General Contractor
        </p>
        <p className="text-white/20 text-xs mt-1">North Carolina · Licensed &amp; Insured · Powered by Southern Cities Enterprises</p>
      </footer>
    </div>
  );
}
