import { afterEach, describe, expect, it, vi } from 'vitest'
import { rateLimit, resetRateLimits } from '@/lib/rate-limit'

afterEach(() => {
  resetRateLimits()
  vi.useRealTimers()
})

describe('rateLimit', () => {
  it('allows up to the limit then blocks', () => {
    const opts = { limit: 3, windowMs: 60_000 }
    expect(rateLimit('k', opts).ok).toBe(true)
    expect(rateLimit('k', opts).ok).toBe(true)
    expect(rateLimit('k', opts).ok).toBe(true)
    const blocked = rateLimit('k', opts)
    expect(blocked.ok).toBe(false)
    expect(blocked.retryAfterMs).toBeGreaterThan(0)
  })

  it('isolates keys', () => {
    const opts = { limit: 1, windowMs: 60_000 }
    expect(rateLimit('a', opts).ok).toBe(true)
    expect(rateLimit('b', opts).ok).toBe(true)
    expect(rateLimit('a', opts).ok).toBe(false)
  })

  it('resets after the window', () => {
    vi.useFakeTimers()
    const opts = { limit: 1, windowMs: 1000 }
    expect(rateLimit('w', opts).ok).toBe(true)
    expect(rateLimit('w', opts).ok).toBe(false)
    vi.advanceTimersByTime(1001)
    expect(rateLimit('w', opts).ok).toBe(true)
  })
})
