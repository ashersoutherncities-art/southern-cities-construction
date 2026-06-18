import { NextRequest, NextResponse } from 'next/server';
import { tryGetServiceClient } from '@/lib/supabase';
import { verifyAccessToken } from '@/lib/deal-desk/token';
import { getMemberByEmail, getMemberSnapshots } from '@/lib/deal-desk/members';

export const runtime = 'nodejs';

// Token-gated: returns the member's past runs for the history sidebar.
export async function POST(req: NextRequest) {
  let body: { token?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }
  const verified = body.token ? verifyAccessToken(body.token) : null;
  if (!verified) return NextResponse.json({ error: 'invalid_or_expired_link' }, { status: 401 });

  const supabase = tryGetServiceClient();
  if (!supabase) return NextResponse.json({ error: 'unavailable' }, { status: 500 });

  const member = await getMemberByEmail(supabase, verified.email);
  if (!member) return NextResponse.json({ snapshots: [] });

  const snapshots = await getMemberSnapshots(supabase, member.id);
  return NextResponse.json({ snapshots });
}
