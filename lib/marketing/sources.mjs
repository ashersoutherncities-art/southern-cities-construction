import { createHmac } from 'node:crypto';
import { campaign, midnight, shiftDay } from './model.mjs';

function required(env, key, pattern = /\S/) {
  const value = env[key];
  if (!value || !pattern.test(value)) throw new Error('Configure ' + key);
  return value;
}

export function config(env) {
  const aliases = JSON.parse(env.MARKETING_CAMPAIGN_ALIASES || '{}');
  if (!aliases || Array.isArray(aliases) || typeof aliases !== 'object') {
    throw new Error('Configure MARKETING_CAMPAIGN_ALIASES');
  }
  return {
    account: required(env, 'MARKETING_META_ACCOUNT_ID', /^\d+$/),
    version: required(env, 'MARKETING_META_API_VERSION', /^v\d+\.0$/),
    metaToken: required(env, 'MARKETING_META_TOKEN'),
    location: required(env, 'MARKETING_GHL_LOCATION_ID', /^[\w-]+$/),
    calendar: required(env, 'MARKETING_GHL_CALENDAR_ID', /^[\w-]+$/),
    ghlToken: required(env, 'MARKETING_GHL_TOKEN'),
    qualifiedTag: required(env, 'MARKETING_QUALIFIED_TAG').toLowerCase(),
    leadTag: env.MARKETING_LEAD_TAG?.toLowerCase(),
    campaignField: env.MARKETING_GHL_CAMPAIGN_FIELD_ID,
    phProject: required(env, 'MARKETING_POSTHOG_PROJECT_ID', /^\d+$/),
    phHost: required(env, 'MARKETING_POSTHOG_HOST', /^https:\/\/(us|eu)\.posthog\.com$/),
    phToken: required(env, 'MARKETING_POSTHOG_QUERY_KEY'),
    idKey: required(env, 'MARKETING_ID_KEY', /^.{32,}$/),
    aliases,
  };
}

async function request(source, url, token, { body, version, missing } = {}) {
  const response = await fetch(url, {
    method: body ? 'POST' : 'GET', redirect: 'error', cache: 'no-store',
    headers: {
      Authorization: 'Bearer ' + token,
      ...(version && { Version: version }),
      ...(body && { 'Content-Type': 'application/json' }),
    },
    body: body && JSON.stringify(body),
    signal: AbortSignal.timeout(12_000),
  });
  if (missing && response.status === 404) return null;
  if (!response.ok) throw new Error(source + ' HTTP ' + response.status);
  return response.json();
}

export async function metaAccount(cfg) {
  const root = 'https://graph.facebook.com/' + cfg.version + '/act_' + cfg.account;
  const account = await request('Meta', root + '?fields=currency,timezone_name', cfg.metaToken);
  if (!/^[A-Z]{3}$/.test(account.currency) || !account.timezone_name) {
    throw new Error('Meta account metadata unavailable');
  }
  return { root, currency: account.currency, zone: account.timezone_name };
}

async function metaDay(cfg, account, day) {
  const params = new URLSearchParams({
    level: 'campaign', fields: 'campaign_id,campaign_name,spend,clicks',
    time_range: JSON.stringify({ since: day, until: day }), limit: '250',
  });
  const campaigns = new Map();
  for (let page = 0; page < 40; page++) {
    const result = await request('Meta', account.root + '/insights?' + params, cfg.metaToken);
    if (!Array.isArray(result.data)) throw new Error('Unexpected Meta response');
    for (const row of result.data) {
      const spend = Number(row.spend);
      const clicks = Number(row.clicks);
      if (!campaign(row.campaign_id, '', '', {}) || !Number.isFinite(spend) ||
          !Number.isSafeInteger(clicks) || spend < 0 || clicks < 0 ||
          row.spend == null || row.clicks == null || campaigns.has(row.campaign_id)) {
        throw new Error('Unexpected Meta insights row');
      }
      campaigns.set(row.campaign_id, { campaign: row.campaign_id, name: row.campaign_name, spend, clicks });
    }
    if (!result.paging?.next) return [...campaigns.values()];
    const cursor = result.paging.cursors?.after;
    if (!cursor || cursor === params.get('after')) break;
    params.set('after', cursor);
  }
  throw new Error('Meta pagination incomplete');
}

const ghlRoot = 'https://services.leadconnectorhq.com';

async function contactsForDay(cfg, start, end) {
  const contacts = new Map();
  let searchAfter;
  for (let page = 0; page < 40; page++) {
    const result = await request('GoHighLevel', ghlRoot + '/contacts/search', cfg.ghlToken, {
      version: 'v3',
      body: {
        locationId: cfg.location, pageLimit: 250, ...(searchAfter && { searchAfter }),
        filters: [{ field: 'dateAdded', operator: 'range', value: { gte: start, lt: end } }],
        sort: [{ field: 'dateAdded', direction: 'asc' }],
      },
    });
    if (!Array.isArray(result.contacts)) throw new Error('Unexpected GoHighLevel contacts response');
    for (const contact of result.contacts) {
      if (typeof contact.id !== 'string' || !Number.isFinite(Date.parse(contact.dateAdded))) {
        throw new Error('Unexpected GoHighLevel contact');
      }
      if (Date.parse(contact.dateAdded) >= Date.parse(start) &&
          Date.parse(contact.dateAdded) < Date.parse(end)) contacts.set(contact.id, contact);
    }
    if (result.contacts.length < 250) return contacts;
    const cursor = result.contacts.at(-1)?.searchAfter;
    if (!Array.isArray(cursor) || !cursor.length || JSON.stringify(cursor) === JSON.stringify(searchAfter)) break;
    searchAfter = cursor;
  }
  throw new Error('GoHighLevel pagination incomplete');
}

function contactCampaign(contact, cfg) {
  const field = contact?.customFields?.find(field => field.id === cfg.campaignField)?.value;
  const touch = contact?.attributionSource;
  return campaign(field || touch?.campaignId, touch?.utmSource ?? touch?.utm_source,
    touch?.utmCampaign ?? touch?.utm_campaign, cfg.aliases);
}

function hasTag(contact, tag) {
  return contact?.tags?.some(value => value.toLowerCase() === tag) ?? false;
}

export function landingQuery(start, end) {
  return `SELECT properties.campaign_id, properties.utm_source, properties.utm_campaign, uniqExact(uuid)
    FROM events WHERE event = 'scc_landing_viewed'
    AND timestamp >= parseDateTimeBestEffort('${start}')
    AND timestamp < parseDateTimeBestEffort('${end}')
    GROUP BY 1, 2, 3 LIMIT 5000`;
}

async function siteDay(cfg, start, end) {
  const data = await request('PostHog', cfg.phHost + '/api/projects/' + cfg.phProject + '/query/', cfg.phToken, {
    body: { query: { kind: 'HogQLQuery', name: 'SCC daily campaign landing views', query: landingQuery(start, end) } },
  });
  if (!Array.isArray(data.results) || data.results.length >= 5000 || data.hasMore) {
    throw new Error('PostHog results incomplete');
  }
  return data.results.map(([id, source, utm, views]) => {
    if (!Number.isSafeInteger(views) || views < 0) throw new Error('Unexpected PostHog count');
    return { campaign: campaign(id, source, utm, cfg.aliases), views };
  });
}

export async function collectDay(cfg, account, day, readBookings) {
  const start = midnight(day, account.zone);
  const end = midnight(shiftDay(day, 1), account.zone);
  const [meta, site, contacts, events] = await Promise.all([
    metaDay(cfg, account, day), siteDay(cfg, start, end),
    contactsForDay(cfg, start, end), readBookings(start, end),
  ]);
  const hash = (kind, id) => createHmac('sha256', cfg.idKey).update(kind + ':' + id).digest('hex');
  const leads = [...contacts.values()].filter(contact => contact.type === 'lead' &&
    (!cfg.leadTag || hasTag(contact, cfg.leadTag))).map(contact => ({
    id: hash('contact', contact.id), campaign: contactCampaign(contact, cfg),
  }));
  const bookings = [];
  for (const event of events) {
    if (/^(cancelled|canceled|invalid)$/i.test(event.status ?? '')) continue;
    if (event.contact_id && !contacts.has(event.contact_id)) {
      const data = await request('GoHighLevel', ghlRoot + '/contacts/' + encodeURIComponent(event.contact_id),
        cfg.ghlToken, { version: '2021-07-28', missing: true });
      if (data && (!data.contact || data.contact.locationId !== cfg.location)) {
        throw new Error('GoHighLevel contact location mismatch');
      }
      contacts.set(event.contact_id, data?.contact ?? null);
    }
    const contact = contacts.get(event.contact_id);
    const payload = event.payload;
    bookings.push({
      id: hash('appointment', event.appointment_id),
      contact: event.contact_id ? hash('contact', event.contact_id) : '',
      campaign: campaign(payload?.customData?.campaign_id ?? payload?.campaign_id, '', '', {}) ||
        contactCampaign(contact, cfg),
      qualified: hasTag(contact, cfg.qualifiedTag),
    });
  }
  return { currency: account.currency, zone: account.zone, meta, site, contacts: leads, bookings };
}
