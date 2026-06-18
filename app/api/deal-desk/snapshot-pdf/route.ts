import { NextRequest, NextResponse } from 'next/server';
import { tryGetServiceClient } from '@/lib/supabase';
import { verifyAccessToken } from '@/lib/deal-desk/token';
import { getMemberByEmail, getSnapshotForMember } from '@/lib/deal-desk/members';
import { renderSnapshotPdf } from '@/lib/rehab-snapshot/pdf';
import type {
  RehabSnapshotLeadInput,
  RehabSnapshotProjectInput,
  EstimateComputation,
} from '@/lib/rehab-snapshot/types';
import type { MaoResult } from '@/lib/avm';

export const runtime = 'nodejs';

// Regenerate a stored run's PDF on demand (token-gated, scoped to the member).
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  const id = url.searchParams.get('id');
  const verified = token ? verifyAccessToken(token) : null;
  if (!verified || !id) {
    return NextResponse.json({ error: 'invalid' }, { status: 401 });
  }

  const supabase = tryGetServiceClient();
  if (!supabase) return NextResponse.json({ error: 'unavailable' }, { status: 500 });

  const member = await getMemberByEmail(supabase, verified.email);
  if (!member) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  const snap = await getSnapshotForMember(supabase, member.id, id);
  if (!snap || !snap.project || !snap.estimate) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  const lead: RehabSnapshotLeadInput = {
    first_name: snap.lead_first || 'Member',
    last_name: snap.lead_last || '',
    email: member.email,
    phone: '',
    company_name: null,
    investor_type: 'wholesaler',
    source: 'deal-desk',
  };

  const pdf = await renderSnapshotPdf({
    lead,
    project: snap.project as RehabSnapshotProjectInput,
    estimate: snap.estimate as EstimateComputation,
    mao: (snap.mao_payload as MaoResult | null) ?? null,
  });

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="deal-desk-snapshot.pdf"',
    },
  });
}
