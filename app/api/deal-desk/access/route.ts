import { NextRequest, NextResponse } from 'next/server';
import { tryGetServiceClient } from '@/lib/supabase';
import { getMemberByEmail } from '@/lib/construction-department/members';
import { signAccessToken } from '@/lib/construction-department/token';
import { sendMagicLinkEmail } from '@/lib/construction-department/email';
import { CD_TIERS } from '@/lib/construction-department/tiers';

export const runtime = 'nodejs';

/**
 * Member requests their magic link by email. Always returns { ok: true } so the
 * endpoint can't be used to enumerate who is/isn't a member. The link is only
 * actually emailed when an active membership exists for that address.
 */
export async function POST(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: true });
  }

  const email = (body.email || '').trim();
  const supabase = tryGetServiceClient();

  if (email && supabase) {
    const member = await getMemberByEmail(supabase, email);
    if (member && (member.status === 'active' || member.status === 'trialing')) {
      const token = signAccessToken(member.email);
      const link = `${baseUrl}/construction-department/app?token=${encodeURIComponent(token)}`;
      try {
        await sendMagicLinkEmail({ email: member.email, link, tierName: CD_TIERS[member.tier].name });
      } catch {
        // swallow — never reveal send failures (or membership) to the caller
      }
    }
  }

  return NextResponse.json({ ok: true });
}
