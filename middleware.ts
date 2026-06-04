import { NextRequest, NextResponse } from 'next/server';

// Edge-safe portal auth bootstrap. When someone opens a /portal/* page with
// `?key=SECRET`, validate it (constant-time) against the configured admin
// keys; if valid, set an httpOnly session cookie and redirect to the same URL
// WITHOUT the key. After that the portal pages authenticate from the cookie,
// so the secret never lingers in the URL / history / logs.
//
// NOTE: runs on the Edge runtime — no node:crypto. Uses a manual constant-time
// compare and stores the matched key in an httpOnly + Secure + SameSite=Strict
// cookie (never readable by client JS, never in a URL).

const PORTAL_COOKIE = 'sc_portal';

function ctEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

function matchKey(provided: string): string | null {
  const keys = [process.env.MARKETING_PORTAL_ACCESS_KEY, process.env.REHAB_SNAPSHOT_ADMIN_KEY].filter(
    (k): k is string => !!k,
  );
  for (const k of keys) if (ctEqual(provided, k)) return k;
  return null;
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const key = url.searchParams.get('key');
  if (!key) return NextResponse.next();

  // Always strip ?key from the visible URL.
  const clean = url.clone();
  clean.searchParams.delete('key');
  const res = NextResponse.redirect(clean);

  const matched = matchKey(key);
  if (matched) {
    res.cookies.set(PORTAL_COOKIE, matched, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/portal',
      maxAge: 60 * 60 * 8, // 8-hour session
    });
  }
  return res;
}

export const config = {
  matcher: ['/portal/:path*'],
};
