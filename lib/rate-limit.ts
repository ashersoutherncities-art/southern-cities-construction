// Simple per-key sliding-window rate limiter shared by the site's public
// lead-capture and inquiry endpoints. In-memory only (per server instance) —
// fine for the traffic these forms see today.
export function createRateLimiter(maxRequestsPerWindow: number, windowMs = 60_000) {
  const requestLog = new Map<string, number[]>();
  return function isRateLimited(key: string): boolean {
    const now = Date.now();
    const recent = (requestLog.get(key) || []).filter((timestamp) => now - timestamp < windowMs);
    if (recent.length >= maxRequestsPerWindow) {
      requestLog.set(key, recent);
      return true;
    }
    recent.push(now);
    requestLog.set(key, recent);
    return false;
  };
}
