import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { getRentCastValue } from '@/lib/avm/rentcast';
import { getHouseCanaryValue } from '@/lib/avm/housecanary';
import type { PropertyValueQuery } from '@/lib/avm/types';

// TEMPORARY internal diagnostic — returns raw RentCast + HouseCanary AVM values
// for calibration. Internal-secret gated; NOT customer-facing. Remove after use.
export const runtime = 'nodejs';

function authed(req: NextRequest): boolean {
  const expected = process.env.INTERNAL_API_SECRET;
  if (!expected) return false;
  const provided = req.headers.get('x-internal-secret') || '';
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  let body: {
    address?: string; city?: string; state?: string; zip?: string;
    propertyType?: string; bedrooms?: number; bathrooms?: number; squareFeet?: number;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }
  const address = (body.address || '').trim();
  const zip = (body.zip || '').trim();
  if (!address || !zip) return NextResponse.json({ error: 'missing_address_or_zip' }, { status: 400 });
  const query: PropertyValueQuery = {
    address,
    city: body.city,
    state: body.state,
    zipcode: zip,
    propertyType: body.propertyType,
    bedrooms: body.bedrooms,
    bathrooms: body.bathrooms,
    squareFeet: body.squareFeet,
  };
  const [rentcast, housecanary] = await Promise.all([
    getRentCastValue(query),
    getHouseCanaryValue(query),
  ]);
  return NextResponse.json({ rentcast, housecanary });
}
