import { report } from './model.mjs';

const escape = value => String(value).replace(/[&<>"']/g,
  character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const count = new Intl.NumberFormat('en-US');
const percent = new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 1 });

export function dashboard(days, from, to, expected) {
  const snapshots = days.map(day => day.snapshot);
  const currency = snapshots[0]?.currency;
  const zone = snapshots[0]?.zone;
  const consistent = snapshots.every(day => day.currency === currency && day.zone === zone);
  const rows = consistent ? report(snapshots) : [];
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: currency ?? 'USD' });
  const totals = rows.reduce((total, row) => {
    for (const field of Object.keys(total)) total[field] += row[field];
    return total;
  }, { spend: 0, clicks: 0, views: 0, leads: 0, appointments: 0, qualified: 0, converted: 0 });
  const paid = rows.filter(row => row.id && row.spend > 0);
  const paidQualified = paid.reduce((sum, row) => sum + row.qualified, 0);
  const ratio = row => row.leads ? percent.format(row.converted / row.leads) : '—';
  const cost = (spend, qualified) => spend > 0 && qualified ? money.format(spend / qualified) : '—';
  const cards = [
    ['Meta spend', money.format(totals.spend)], ['Meta clicks', count.format(totals.clicks)],
    ['Consultation views', count.format(totals.views)], ['New leads', count.format(totals.leads)],
    ['Appointments booked', count.format(totals.appointments)], ['Booking conversion', ratio(totals)],
    ['Qualified bookings', count.format(totals.qualified)],
    ['Cost per qualified consultation', cost(totals.spend, paidQualified)],
  ];
  const latest = days.map(day => day.synced_at).sort().at(-1);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
  <title>Campaign performance | Southern Cities Construction</title>
  <style>
  *{box-sizing:border-box}body{margin:0;background:#f3f2ed;color:#172820;font:16px/1.5 system-ui,sans-serif}
  main{max-width:1320px;margin:auto;padding:clamp(1rem,4vw,3rem)}header{border-bottom:1px solid #ced3c9;padding-bottom:1rem}
  h1{font-size:clamp(2rem,5vw,3.5rem);line-height:1.1;margin:.5rem 0}h2{font-size:1.2rem}
  .eyebrow{color:#456752;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:.75rem}
  form,.cards{display:flex;flex-wrap:wrap;gap:.75rem;margin:1.25rem 0}form{align-items:end}
  label{display:grid;gap:.3rem}input,button{font:inherit;padding:.45rem .65rem;border:1px solid #8b9b8f;border-radius:.25rem}
  button{background:#173a2b;color:white;cursor:pointer}.card{background:white;border:1px solid #d9ded5;padding:1rem;flex:1 1 185px}
  .card strong{display:block;font-size:1.6rem}.scroll{overflow:auto;background:white}
  table{border-collapse:collapse;width:100%;font-size:.9rem;font-variant-numeric:tabular-nums}
  th,td{padding:.65rem;text-align:right;border-bottom:1px solid #d9ded5;white-space:nowrap}
  th:first-child,td:first-child{text-align:left}thead{background:#e1e9df}small{display:block;color:#3c5445}
  .notice{padding:.75rem;background:#faeac6;border-left:4px solid #9c6924}
  </style></head><body><main>
  <header><div class="eyebrow">Southern Cities Construction · Admin</div><h1>Campaign performance</h1>
  <div>${escape(zone ?? 'Meta account time zone')}${currency ? ' · ' + escape(currency) : ''}</div></header>
  <form><label>From<input name="from" type="date" required value="${escape(from)}"></label>
  <label>Through<input name="to" type="date" required value="${escape(to)}"></label><button>Update report</button></form>
  <p>${days.length} of ${expected} days synced${latest ? ' · Last successful sync ' + escape(latest) : ''}</p>
  ${days.length < expected ? '<p class="notice">Missing dates are excluded. Totals cover synced dates only.</p>' : ''}
  ${!consistent ? '<p class="notice">This date range contains different Meta account currencies or time zones. Select a consistent range.</p>' : ''}
  ${!days.length ? '<p>No campaign data has been synced for this range.</p>' : ''}
  ${days.length && consistent ? `<section class="cards" aria-label="Summary">${cards.map(([label, value]) =>
    `<div class="card">${escape(label)}<strong>${escape(value)}</strong></div>`).join('')}</section>
  <h2>Campaign breakdown</h2><div class="scroll" tabindex="0" aria-label="Campaign breakdown">
  <table><thead><tr>${['Campaign', 'Spend', 'Clicks', 'Views', 'Leads', 'Appointments', 'Booking rate', 'Qualified', 'Cost / qualified']
    .map(label => '<th scope="col">' + label + '</th>').join('')}</tr></thead>
  <tbody>${rows.map(row => `<tr><th scope="row">${escape(row.name)}<small>${escape(row.id)}</small></th>
  ${[money.format(row.spend), row.clicks, row.views, row.leads, row.appointments, ratio(row), row.qualified, cost(row.spend, row.qualified)]
    .map(value => '<td>' + escape(value) + '</td>').join('')}</tr>`).join('')}</tbody></table></div>` : ''}
  <p>Booking conversion measures new leads with a recorded booking in the selected dates. Qualified bookings use the configured CRM tag. Cost per qualified consultation uses bookings attributed to campaigns with spend in the selected dates.</p>
  <p>Appointments are booking events from the configured calendar. PostHog landing views measure tracked page visits.</p>
  </main></body></html>`;
}
