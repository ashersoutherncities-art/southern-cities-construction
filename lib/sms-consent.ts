/**
 * A2P 10DLC consent — single source of truth for the SCC site.
 *
 * Carriers reviewing a 10DLC campaign want the EXACT opt-in wording a contact
 * agreed to, identical everywhere a number is collected. The text lives here
 * once, is rendered by <SmsConsent>, and is stored verbatim with the lead.
 *
 * Two purposes exist because a subcontractor applying to the partner network
 * is not making a purchase, and "consent is not a condition of purchase" reads
 * as boilerplate nobody wrote for them. Only the purpose clause and the closing
 * "condition of" clause differ — the carrier-scanned boilerplate (rates,
 * frequency, STOP, HELP) is byte-identical across both.
 *
 * Keep this module dependency-free — it is imported by client components, and
 * pulling in anything server-side breaks the client bundle at runtime.
 *
 * Bump CONSENT_VERSION whenever any CONSENT_LANGUAGE changes so historic
 * records stay attributable to the wording actually shown.
 */

export const CONSENT_VERSION = '2026-08-21.v2';

/** Carrier-scanned boilerplate. Identical in every variant, by design. */
const BOILERPLATE =
  'Msg & data rates may apply. Message frequency varies. Reply STOP to opt out, HELP for help.';

export type ConsentPurpose = 'default' | 'partner';

export const CONSENT_LANGUAGE_BY_PURPOSE: Record<ConsentPurpose, string> = {
  default:
    'I agree to receive calls and texts from Southern Cities Construction about my request, ' +
    `my project, scheduling, and coordination. ${BOILERPLATE} Consent is not a condition of purchase.`,
  partner:
    'I agree to receive calls and texts from Southern Cities Construction about my partner ' +
    `application, scheduling, and job coordination. ${BOILERPLATE} Consent is not a condition of approval.`,
};

export function consentLanguage(purpose: ConsentPurpose = 'default'): string {
  return CONSENT_LANGUAGE_BY_PURPOSE[purpose] ?? CONSENT_LANGUAGE_BY_PURPOSE.default;
}

/** Back-compat alias for the customer-facing wording. */
export const CONSENT_LANGUAGE = CONSENT_LANGUAGE_BY_PURPOSE.default;

export type SmsConsentRecord = {
  granted: boolean;
  version: string;
  language: string;
  phone: string | null;
  method: string;
  granted_at: string | null;
};

/** Build the stored proof-of-consent record. Server-side only — a
 *  browser-supplied timestamp is not evidence. */
export function smsConsentRecord(
  granted: unknown,
  phone: unknown,
  method: string,
  purpose: ConsentPurpose = 'default'
): SmsConsentRecord {
  const ok = granted === true;
  const num = typeof phone === 'string' && phone.trim() ? phone.trim() : null;
  return {
    granted: ok,
    version: CONSENT_VERSION,
    language: consentLanguage(purpose),
    phone: num,
    method,
    granted_at: ok ? new Date().toISOString() : null,
  };
}

export function smsConsentTag(granted: unknown): string {
  return granted === true ? 'sms-consent-yes' : 'sms-consent-no';
}
