'use client';

import { consentLanguage, type ConsentPurpose } from '@/lib/sms-consent';

/**
 * A2P 10DLC opt-in checkbox. Render on every form that collects a phone number.
 * Unchecked by default, never required to submit, never bundled with terms
 * acceptance — all three are things carriers check.
 *
 * `name` lets a form that reads values via FormData pick the value up directly.
 * `purpose` selects the wording variant (see lib/sms-consent).
 */
export default function SmsConsent({
  checked,
  onChange,
  name = 'smsConsent',
  tone = 'light',
  purpose = 'default',
}: {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  name?: string;
  tone?: 'light' | 'dark';
  purpose?: ConsentPurpose;
}) {
  const text = tone === 'dark' ? 'text-white/70' : 'text-stone-600';
  const box =
    tone === 'dark'
      ? 'border-white/25 bg-transparent text-orange focus:ring-orange focus:ring-offset-0'
      : 'border-stone-300 text-orange focus:ring-orange';
  const link = tone === 'dark' ? 'underline hover:text-white' : 'underline hover:text-orange';

  return (
    <label className="flex cursor-pointer items-start gap-3 px-1">
      <input
        type="checkbox"
        name={name}
        {...(onChange ? { checked: !!checked, onChange: (e) => onChange(e.target.checked) } : {})}
        value="true"
        className={`mt-0.5 h-4 w-4 shrink-0 rounded ${box}`}
      />
      <span className={`text-[12.5px] leading-relaxed ${text}`}>
        {consentLanguage(purpose)} See our{' '}
        <a href="/terms" className={link}>
          Terms
        </a>{' '}
        and{' '}
        <a href="/privacy" className={link}>
          Privacy Policy
        </a>
        .
      </span>
    </label>
  );
}
