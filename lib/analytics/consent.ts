'use client';

/**
 * Consent is scoped specifically to session replay. Anonymous behavioral
 * events (pageviews, scroll depth, video progress, etc.) carry no PII and
 * start immediately — that's standard first-party analytics, not something
 * that needs a gate. Session replay is a materially more sensitive capture
 * mode (it can show a visitor's actual on-screen behavior), so it never
 * starts until the visitor explicitly opts in via ConsentBanner.
 */

const CONSENT_KEY = 'scc_analytics_consent';

export type ConsentValue = 'accepted' | 'declined';

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'accepted' || v === 'declined' ? v : null;
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  return getStoredConsent() === 'accepted';
}

export function setConsent(value: ConsentValue): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // ignore — worst case the banner reappears next visit
  }
}
