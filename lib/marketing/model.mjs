import { createHash, timingSafeEqual } from 'node:crypto';

export function authorized(provided, expected) {
  if (!provided || !expected) return false;
  const digest = value => createHash('sha256').update(value).digest();
  return timingSafeEqual(digest(provided), digest(expected));
}

export function shiftDay(day, amount) {
  const date = new Date(day + 'T00:00:00Z');
  date.setUTCDate(date.getUTCDate() + amount);
  return date.toISOString().slice(0, 10);
}

export function validDay(day) {
  return typeof day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(day) &&
    Number.isFinite(Date.parse(day)) && shiftDay(day, 0) === day;
}

export function dayInZone(date, zone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date);
  const value = type => parts.find(part => part.type === type).value;
  return [value('year'), value('month'), value('day')].join('-');
}

export function midnight(day, zone) {
  const utc = Date.parse(day + 'T00:00:00Z');
  let low = utc - 86_400_000;
  let high = utc + 86_400_000;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (dayInZone(new Date(mid), zone) < day) low = mid + 1;
    else high = mid;
  }
  return new Date(low).toISOString();
}

export function campaign(id, source, utm, aliases) {
  if (typeof id === 'string' && /^\d{5,30}$/.test(id)) return id;
  if (!/^(meta|facebook|fb|ig|instagram|an|msg)$/i.test(source ?? '')) return '';
  const alias = Object.hasOwn(aliases, utm ?? '') ? aliases[utm] : '';
  return typeof alias === 'string' && /^\d{5,30}$/.test(alias) ? alias : '';
}

export function report(snapshots) {
  const rows = new Map();
  const leads = new Map();
  const bookedContacts = new Set();
  const appointments = new Set();
  const row = (id) => {
    if (!rows.has(id)) rows.set(id, {
      id, name: id ? 'Campaign ' + id : 'Unattributed / other', spend: 0,
      clicks: 0, views: 0, leads: 0, appointments: 0, qualified: 0, converted: 0,
    });
    return rows.get(id);
  };
  for (const { meta, site, contacts, bookings } of snapshots) {
    for (const item of meta) {
      const entry = row(item.campaign);
      entry.name = item.name;
      entry.spend += item.spend;
      entry.clicks += item.clicks;
    }
    for (const item of site) row(item.campaign).views += item.views;
    for (const item of contacts) {
      if (leads.has(item.id)) continue;
      leads.set(item.id, item);
      row(item.campaign).leads++;
    }
    for (const item of bookings) {
      if (appointments.has(item.id)) continue;
      appointments.add(item.id);
      const entry = row(item.campaign);
      entry.appointments++;
      if (item.qualified) entry.qualified++;
      if (item.contact) bookedContacts.add(item.contact);
    }
  }
  for (const id of bookedContacts) {
    const lead = leads.get(id);
    if (lead) row(lead.campaign).converted++;
  }
  return [...rows.values()].sort((a, b) => b.spend - a.spend || b.leads - a.leads);
}
