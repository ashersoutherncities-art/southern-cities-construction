import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#132452',
          50: '#f0f3fa',
          100: '#d9deee',
          200: '#b3bddd',
          300: '#8d9ccc',
          400: '#5b72b4',
          500: '#3b5ea8',
          600: '#2d4a8a',
          700: '#1f376b',
          800: '#132452',
          900: '#0a1530',
          950: '#060d20',
        },
        orange: {
          DEFAULT: '#fa8c41',
          50: '#fff4eb',
          100: '#ffe4cc',
          200: '#ffc999',
          300: '#ffae66',
          400: '#fa8c41',
          500: '#e87520',
          600: '#c45e10',
          700: '#9c4a0d',
          800: '#74370a',
          900: '#4c2507',
        },
        gold: '#d4a843',
        stone: {
          50: '#fafaf8',
          100: '#f5f4f1',
          200: '#e8e7e1',
          300: '#d4d2c9',
          400: '#a8a49a',
          500: '#78746a',
          600: '#565349',
          700: '#3c3a33',
          800: '#26251f',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        tightest: '-0.03em',
        eyebrow: '0.22em',
      },
      boxShadow: {
        'elev-1': '0 1px 2px rgba(19,36,82,0.04), 0 1px 3px rgba(19,36,82,0.06)',
        'elev-2': '0 4px 12px -4px rgba(19,36,82,0.08), 0 8px 20px -8px rgba(19,36,82,0.1)',
        'elev-3': '0 14px 40px -12px rgba(19,36,82,0.18)',
        'elev-nav': '0 10px 30px -10px rgba(10,21,48,0.55)',
        'glow-orange': '0 8px 24px -8px rgba(250,140,65,0.45)',
      },
      backgroundImage: {
        'grain': "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.2s linear infinite',
        'hero-rise': 'heroRise 1.1s cubic-bezier(.2,.7,.2,1) both',
        'aurora-a': 'auroraA 22s ease-in-out infinite',
        'aurora-b': 'auroraB 28s ease-in-out infinite',
        'aurora-c': 'auroraC 34s ease-in-out infinite',
        'gradient-pan': 'gradientPan 24s ease-in-out infinite',
        'rule-grow': 'ruleGrow 0.9s cubic-bezier(.2,.7,.2,1) 0.15s both',
        'glow-pulse': 'glowPulse 4.5s ease-in-out infinite',
        'hairline-pan': 'hairlinePan 14s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        heroRise: {
          '0%': { opacity: '0', transform: 'translateY(18px)', filter: 'blur(6px)' },
          '60%': { filter: 'blur(0)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        auroraA: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)', opacity: '0.55' },
          '50%': { transform: 'translate3d(40px,30px,0) scale(1.12)', opacity: '0.75' },
        },
        auroraB: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)', opacity: '0.5' },
          '50%': { transform: 'translate3d(-50px,-22px,0) scale(1.08)', opacity: '0.7' },
        },
        auroraC: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)', opacity: '0.35' },
          '50%': { transform: 'translate3d(24px,-32px,0) scale(1.18)', opacity: '0.55' },
        },
        gradientPan: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        ruleGrow: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 8px 24px -8px rgba(250,140,65,0.45)' },
          '50%': { boxShadow: '0 14px 38px -8px rgba(250,140,65,0.65)' },
        },
        hairlinePan: {
          '0%': { backgroundPosition: '-50% 0' },
          '100%': { backgroundPosition: '150% 0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
