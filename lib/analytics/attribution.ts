'use client';

/**
 * First-party attribution capture — UTM/campaign params, first-touch vs
 * last-touch, device/browser/traffic-source classification, new-vs-
 * returning. No PII: nothing here reads or stores email, phone, name, or IP.
 *
 * First touch is written once and never overwritten. Last touch is only
 * updated when the current URL actually carries a campaign signal (a UTM
 * param or fbclid) — a plain internal navigation with no params does not
 * overwrite it, so clicking around the site doesn't erase "how they
 * actually got here."
 */

const CAMPAIGN_PARAM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'campaign_id',
  'adset_id',
  'ad_id',
  'fbclid',
] as const;

type CampaignParamKey = (typeof CAMPAIGN_PARAM_KEYS)[number];
type CampaignParams = Partial<Record<CampaignParamKey, string>>;

export type AttributionTouch = CampaignParams & {
  referrer: string;
  landing_path: string;
  traffic_source: string;
  captured_at: string;
};

const FIRST_TOUCH_KEY = 'scc_attr_first_touch';
const LAST_TOUCH_KEY = 'scc_attr_last_touch';
const RETURNING_KEY = 'scc_attr_seen_before';

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // storage unavailable (private mode, quota, etc.) — attribution just
    // won't persist across visits; non-fatal.
  }
}

function readCampaignParamsFromUrl(): CampaignParams {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const out: CampaignParams = {};
  for (const key of CAMPAIGN_PARAM_KEYS) {
    const v = params.get(key);
    if (v) out[key] = v;
  }
  return out;
}

function hasCampaignSignal(params: CampaignParams): boolean {
  return Object.keys(params).length > 0;
}

export function classifyTrafficSource(params: CampaignParams, referrer: string): string {
  const source = (params.utm_source || '').toLowerCase();
  const medium = (params.utm_medium || '').toLowerCase();

  if (source || params.fbclid) {
    if (source.includes('fb') || source.includes('facebook') || source.includes('meta') || medium.includes('paid_social')) {
      return 'paid_social';
    }
    if (medium.includes('cpc') || medium.includes('paid')) return 'paid';
    if (params.fbclid) return 'paid_social';
    return 'campaign';
  }

  if (!referrer) return 'direct';

  try {
    const refHost = new URL(referrer).hostname.replace(/^www\./, '');
    const selfHost = typeof window !== 'undefined' ? window.location.hostname.replace(/^www\./, '') : '';
    if (refHost === selfHost) return 'internal';
    if (/google\.|bing\.|duckduckgo\./.test(refHost)) return 'organic_search';
    if (/facebook\.com|instagram\.com|tiktok\.com|linkedin\.com|twitter\.com|x\.com/.test(refHost)) {
      return 'organic_social';
    }
    return 'referral';
  } catch {
    return 'unknown';
  }
}

export function classifyDeviceCategory(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent;
  if (/iPad|Tablet(?!.*Mobile)/i.test(ua)) return 'tablet';
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return 'mobile';
  return 'desktop';
}

export function classifyBrowserCategory(): string {
  if (typeof window === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return 'edge';
  if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) return 'chrome';
  if (/Safari\//.test(ua) && !/Chrome/.test(ua)) return 'safari';
  if (/Firefox\//.test(ua)) return 'firefox';
  return 'other';
}

function buildTouch(params: CampaignParams): AttributionTouch {
  const referrer = typeof document !== 'undefined' ? document.referrer : '';
  const landingPath = typeof window !== 'undefined' ? window.location.pathname : '';
  return {
    ...params,
    referrer,
    landing_path: landingPath,
    traffic_source: classifyTrafficSource(params, referrer),
    captured_at: new Date().toISOString(),
  };
}

/**
 * Call once on initial app mount (e.g. from the root layout's client
 * tracker). Reads the current URL, establishes first-touch if this is a
 * genuinely new visitor, updates last-touch only if this load carries a
 * real campaign signal, and marks the visitor as "seen" for future loads.
 */
export function captureAttributionOnLoad(): {
  firstTouch: AttributionTouch;
  lastTouch: AttributionTouch;
  isReturning: boolean;
} {
  const urlParams = readCampaignParamsFromUrl();
  const isReturning = safeGet(RETURNING_KEY) !== null;

  const existingFirstRaw = safeGet(FIRST_TOUCH_KEY);
  let firstTouch: AttributionTouch;
  if (existingFirstRaw) {
    try {
      firstTouch = JSON.parse(existingFirstRaw);
    } catch {
      firstTouch = buildTouch(urlParams);
      safeSet(FIRST_TOUCH_KEY, JSON.stringify(firstTouch));
    }
  } else {
    firstTouch = buildTouch(urlParams);
    safeSet(FIRST_TOUCH_KEY, JSON.stringify(firstTouch));
  }

  const existingLastRaw = safeGet(LAST_TOUCH_KEY);
  let lastTouch: AttributionTouch;
  if (hasCampaignSignal(urlParams) || !existingLastRaw) {
    lastTouch = buildTouch(urlParams);
    safeSet(LAST_TOUCH_KEY, JSON.stringify(lastTouch));
  } else {
    try {
      lastTouch = JSON.parse(existingLastRaw);
    } catch {
      lastTouch = buildTouch(urlParams);
      safeSet(LAST_TOUCH_KEY, JSON.stringify(lastTouch));
    }
  }

  safeSet(RETURNING_KEY, '1');

  return { firstTouch, lastTouch, isReturning };
}

/** Best-known current attribution — last touch if one exists, else first touch, else a fresh read of the URL. */
export function getCurrentAttribution(): AttributionTouch {
  const lastRaw = safeGet(LAST_TOUCH_KEY);
  if (lastRaw) {
    try {
      return JSON.parse(lastRaw);
    } catch {
      /* fall through */
    }
  }
  return buildTouch(readCampaignParamsFromUrl());
}

/**
 * Query string built from the best-known attribution, intended to be
 * appended to the embedded GHL booking widget's iframe src so the campaign
 * data reaches GHL even though it's a cross-origin iframe. Landing this on
 * the actual contact record still requires matching custom fields to exist
 * in GHL (see the booking-webhook route's doc comment) — appending the
 * params is the safe, verifiable part we control; whether GHL stores them
 * on the contact is a GHL-side configuration dependency.
 */
export function buildGhlAttributionQueryString(): string {
  const attr = getCurrentAttribution();
  const params = new URLSearchParams();
  for (const key of CAMPAIGN_PARAM_KEYS) {
    const v = attr[key];
    if (v) params.set(key, v);
  }
  const qs = params.toString();
  return qs;
}
