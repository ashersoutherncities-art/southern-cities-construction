import { describe, it, expect, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from '@/middleware';

beforeEach(() => {
  process.env.MARKETING_PORTAL_ACCESS_KEY = 'marketing-key';
  process.env.REHAB_SNAPSHOT_ADMIN_KEY = 'rehab-key';
  process.env.CD_PROCUREMENT_ADMIN_KEY = 'procurement-key';
});

function req(url: string) {
  return new NextRequest(new URL(url));
}

describe('middleware ?key= exchange (finding #10)', () => {
  it('exchanges CD_PROCUREMENT_ADMIN_KEY for an sc_portal cookie', async () => {
    const res = middleware(req('http://localhost/portal/bid-packages/abc?key=procurement-key'));
    const setCookie = res.cookies.get('sc_portal');
    expect(setCookie?.value).toBe('procurement-key');
    expect(setCookie?.httpOnly).toBe(true);
  });

  it('still accepts MARKETING_PORTAL_ACCESS_KEY (backwards compatible)', async () => {
    const res = middleware(req('http://localhost/portal/bid-packages/abc?key=marketing-key'));
    expect(res.cookies.get('sc_portal')?.value).toBe('marketing-key');
  });

  it('still accepts REHAB_SNAPSHOT_ADMIN_KEY (backwards compatible)', async () => {
    const res = middleware(req('http://localhost/portal/bid-packages/abc?key=rehab-key'));
    expect(res.cookies.get('sc_portal')?.value).toBe('rehab-key');
  });

  it('does NOT set a cookie for an unknown key (and still strips the param)', async () => {
    const res = middleware(req('http://localhost/portal/bid-packages/abc?key=nope'));
    expect(res.cookies.get('sc_portal')).toBeUndefined();
    // Redirect strips the key regardless
    expect(res.headers.get('location')).not.toContain('key=');
  });

  it('passes through when no ?key is present', async () => {
    const res = middleware(req('http://localhost/portal/bid-packages/abc'));
    // NextResponse.next() returns a response without redirect headers.
    expect(res.headers.get('location')).toBeNull();
  });
});
