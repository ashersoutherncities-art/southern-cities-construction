import { AvmEstimate, PropertyValueQuery } from '@/lib/avm/types';

// RentCast AVM — the cheap screening valuation, run on every deal.
// Docs: https://developers.rentcast.io/ — GET /v1/avm/value, auth via X-Api-Key.
// Free Developer tier = 50 req/mo; Foundation = $74/mo for 1,000.

const RENTCAST_BASE = 'https://api.rentcast.io/v1';
const TIMEOUT_MS = 8000;

// RentCast gives no native confidence score, so infer one from the range width:
// a tight range relative to the estimate => high confidence.
function inferConfidence(value: number, low: number | null, high: number | null): number | null {
  if (!value || low == null || high == null || high <= low) return null;
  const spread = (high - low) / value; // e.g. 0.08 == ±4%
  // Map spread 0..0.30 onto confidence 1..0 (clamped).
  return Math.max(0, Math.min(1, 1 - spread / 0.3));
}

export async function getRentCastValue(
  query: PropertyValueQuery
): Promise<AvmEstimate | null> {
  const apiKey = process.env.RENTCAST_API_KEY;
  if (!apiKey) return null; // not configured — caller treats as "no source"

  const fullAddress = [query.address, query.city, query.state, query.zipcode]
    .filter(Boolean)
    .join(', ');

  const params = new URLSearchParams({ address: fullAddress });
  if (query.propertyType) params.set('propertyType', query.propertyType);
  if (query.bedrooms != null) params.set('bedrooms', String(query.bedrooms));
  if (query.bathrooms != null) params.set('bathrooms', String(query.bathrooms));
  if (query.squareFeet != null) params.set('squareFootage', String(query.squareFeet));

  type RentCastResponse = {
    price?: number;
    priceRangeLow?: number;
    priceRangeHigh?: number;
    comparables?: unknown[];
  };

  let json: RentCastResponse;
  try {
    const res = await fetch(`${RENTCAST_BASE}/avm/value?${params.toString()}`, {
      headers: { 'X-Api-Key': apiKey, Accept: 'application/json' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return null;
    json = (await res.json()) as RentCastResponse;
  } catch {
    return null; // network/timeout — degrade gracefully, same as the engine's other integrations
  }

  const value = Number(json?.price);
  if (!value || Number.isNaN(value)) return null;
  const low = json?.priceRangeLow != null ? Number(json.priceRangeLow) : null;
  const high = json?.priceRangeHigh != null ? Number(json.priceRangeHigh) : null;

  return {
    source: 'rentcast',
    value,
    low,
    high,
    confidence: inferConfidence(value, low, high),
    compCount: Array.isArray(json?.comparables) ? json.comparables.length : null,
    raw: json,
  };
}
