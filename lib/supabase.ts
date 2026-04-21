import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

export class SupabaseConfigError extends Error {
  constructor() {
    super('Supabase is not configured');
    this.name = 'SupabaseConfigError';
  }
}

export function getServiceClient(): SupabaseClient {
  if (cachedClient) return cachedClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new SupabaseConfigError();
  }
  cachedClient = createClient(url, key, {
    auth: { persistSession: false },
  });
  return cachedClient;
}

export function tryGetServiceClient(): SupabaseClient | null {
  try {
    return getServiceClient();
  } catch {
    return null;
  }
}
