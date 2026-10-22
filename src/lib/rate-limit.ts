/**
 * Minimal fixed-window rate limiter kept in process memory.
 * Adequate for a single-instance deployment (Docker on one VPS). For several
 * instances, swap the store for Redis while keeping this interface.
 */
type Bucket = { count: number; resetAt: number }

const store = new Map<string, Bucket>()
let lastSweep = Date.now()

export type RateLimitResult = { ok: boolean; remaining: number; retryAfterMs: number }

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now()
  if (now - lastSweep > 60_000) {
    for (const [k, b] of store) if (b.resetAt <= now) store.delete(k)
    lastSweep = now
  }
  const bucket = store.get(key)
  if (!bucket || bucket.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, remaining: limit - 1, retryAfterMs: 0 }
  }
  bucket.count += 1
  if (bucket.count > limit) return { ok: false, remaining: 0, retryAfterMs: bucket.resetAt - now }
  return { ok: true, remaining: limit - bucket.count, retryAfterMs: 0 }
}

export function resetRateLimits() {
  store.clear()
}
