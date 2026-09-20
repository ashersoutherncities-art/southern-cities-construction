import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Browser-side Supabase client — ANON key only, never the service role key.
// Used exclusively for the signed-URL direct-to-Storage upload flow (Bid
// Package documents), which needs to run client-side to bypass the Next.js
// serverless 4.5MB request-body limit that every other upload route in this
// repo hits. Requires NEXT_PUBLIC_SUPABASE_ANON_KEY to be set (Supabase
// dashboard -> Settings -> API -> anon/public key) — not present in this
// repo's .env.local as of this writing; the upload widget no-ops with a
// clear message until it's added.
let cached: SupabaseClient | null = null;

export function getBrowserSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  if (!cached) cached = createClient(url, anonKey);
  return cached;
}
