import test from 'node:test';
import assert from 'node:assert/strict';
import { authorized, campaign, midnight, report, validDay } from '../lib/marketing/model.mjs';
import { collectDay, metaAccount } from '../lib/marketing/sources.mjs';
import { dashboard } from '../lib/marketing/dashboard.mjs';

test('validates dates, account-day DST boundaries and credentials', () => {
  assert.equal(validDay('2026-02-30'), false);
  assert.equal(validDay('2026-02-28'), true);
  assert.equal(midnight('2026-03-08', 'America/New_York'), '2026-03-08T05:00:00.000Z');
  assert.equal(midnight('2026-03-09', 'America/New_York'), '2026-03-09T04:00:00.000Z');
  assert.equal(authorized(null, 'secret'), false);
  assert.equal(authorized('wrong', 'secret'), false);
  assert.equal(authorized('secret', 'secret'), true);
});

test('only resolves explicit campaign IDs and verified paid aliases', () => {
  const aliases = { readiness: '12345' };
  assert.equal(campaign('99999', '', '', aliases), '99999');
  assert.equal(campaign(null, 'Meta', 'readiness', aliases), '12345');
  assert.equal(campaign(null, 'Google', 'readiness', aliases), '');
  assert.equal(campaign(null, 'Meta', '__proto__', aliases), '');
});

test('collects paid media, website and CRM data without duplicating bookings or exposing CRM records', async (t) => {
  const cfg = {
    account: '123', version: 'v99.0', metaToken: 'meta-token', ghlToken: 'ghl-token',
    phToken: 'ph-token', phProject: '10', phHost: 'https://us.posthog.com',
    location: 'location', idKey: 'example-id-key', qualifiedTag: 'qualified', aliases: {},
  };
  t.mock.method(globalThis, 'fetch', async (input, options) => {
    const url = new URL(input);
    if (url.hostname === 'graph.facebook.com') {
      assert.equal(url.searchParams.has('access_token'), false);
      if (!url.pathname.endsWith('/insights')) {
        return Response.json({ currency: 'USD', timezone_name: 'America/New_York' });
      }
      if (url.searchParams.has('after')) return Response.json({ data: [] });
      return Response.json({
        data: [{ campaign_id: '12345', campaign_name: '<script>unsafe</script>', spend: '42.10', clicks: '12' }],
        paging: { next: 'https://unexpected.example', cursors: { after: 'page-2' } },
      });
    }
    if (url.hostname === 'us.posthog.com') {
      assert.doesNotMatch(options.body, /appointment_booked|confirmation_page/);
      return Response.json({ results: [['12345', 'meta', '', 8]] });
    }
    if (url.pathname === '/contacts/search') {
      const body = JSON.parse(options.body);
      assert.equal(options.headers.Version, 'v3');
      assert.equal(body.locationId, 'location');
      assert.equal(body.filters[0].value.gte, '2026-11-01T04:00:00.000Z');
      return Response.json({ contacts: [{
        id: 'contact-123', dateAdded: '2026-11-01T10:00:00Z', type: 'lead',
        attributionSource: { campaignId: '12345' }, tags: ['Qualified'], email: 'private@example.com',
      }] });
    }
    assert.fail('Unexpected request to ' + url.hostname);
  });
  const account = await metaAccount(cfg);
  const collect = () => collectDay(cfg, account, '2026-11-01', async (start, end) => {
    assert.equal(start, '2026-11-01T04:00:00.000Z');
    assert.equal(end, '2026-11-02T05:00:00.000Z');
    return [
      { appointment_id: 'booking-1', contact_id: 'contact-123' },
      { appointment_id: 'booking-1', contact_id: 'contact-123' },
      { appointment_id: 'booking-2', contact_id: 'contact-123' },
      { appointment_id: 'cancelled', contact_id: 'contact-123', status: 'cancelled' },
    ];
  });
  const snapshot = await collect();
  assert.deepEqual(snapshot, await collect());
  assert.doesNotMatch(JSON.stringify(snapshot), /private@example|contact-123|booking-1/);
  assert.deepEqual(report([snapshot]).map(({ clicks, leads, appointments, converted, qualified }) =>
    [clicks, leads, appointments, converted, qualified]), [[12, 1, 2, 1, 2]]);
  const html = dashboard([{ snapshot }], '2026-11-01', '2026-11-02', 2);
  assert.match(html, /1 of 2 days synced/);
  assert.match(html, /\$21\.05/);
  assert.match(html, /100%/);
  assert.match(html, /&lt;script&gt;unsafe/);
  assert.doesNotMatch(html, /<script>/);
});

test('fails the entire day when a source fails', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => Response.json({}, { status: 403 }));
  await assert.rejects(collectDay({ phHost: 'https://us.posthog.com' },
    { zone: 'UTC', root: 'https://graph.facebook.com' }, '2026-11-01', async () => []),
  /HTTP 403/);
});
