import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/deal-desk/token';
import { getRentCastProperty } from '@/lib/avm/rentcast';

export const runtime = 'nodejs';

// Map the property-data provider's type to our enum.
function mapPropertyType(t?: string): string {
  switch ((t || '').toLowerCase()) {
    case 'multi-family':
    case 'multifamily':
      return 'multifamily';
    case 'manufactured':
    case 'mobile':
      return 'manufactured';
    case 'single family':
    case 'condo':
    case 'townhouse':
    case 'apartment':
    default:
      return 'single_family';
  }
}

// Token-gated: auto-fill beds/baths/sqft/year/type for an address.
export async function POST(req: NextRequest) {
  let body: { token?: string; address?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }
  if (!body.token || !verifyAccessToken(body.token)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const address = (body.address || '').trim();
  if (!address) return NextResponse.json({ error: 'missing_address' }, { status: 400 });

  const rec = await getRentCastProperty(address);
  if (!rec) return NextResponse.json({ found: false });

  return NextResponse.json({
    found: true,
    property: {
      formattedAddress: rec.formattedAddress,
      city: rec.city,
      state: rec.state,
      zip: rec.zip,
      bedrooms: rec.bedrooms,
      bathrooms: rec.bathrooms,
      squareFeet: rec.squareFeet,
      yearBuilt: rec.yearBuilt,
      propertyType: mapPropertyType(rec.propertyType),
    },
  });
}
