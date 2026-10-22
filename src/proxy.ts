import createIntlMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'
import { rateLimit } from './lib/rate-limit'

const intl = createIntlMiddleware(routing)

/** Brute-force protection for the admin login endpoint (complements account lockout). */
const LOGIN_PATHS = new Set(['/api/users/login', '/api/users/forgot-password'])

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (request.method === 'POST' && LOGIN_PATHS.has(pathname)) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const result = rateLimit(`login:${ip}`, { limit: 10, windowMs: 15 * 60 * 1000 })
    if (!result.ok) {
      return NextResponse.json(
        { errors: [{ message: 'Trop de tentatives. Réessayez plus tard.' }] },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(result.retryAfterMs / 1000)) } },
      )
    }
    return NextResponse.next()
  }

  if (pathname.startsWith('/api') || pathname.startsWith('/admin')) return NextResponse.next()

  return intl(request)
}

export const config = {
  // Everything except Next internals and files with an extension.
  matcher: ['/((?!_next|_vercel|.*\\..*).*)', '/api/users/login', '/api/users/forgot-password'],
}
