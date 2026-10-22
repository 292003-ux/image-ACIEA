import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const isDev = process.env.NODE_ENV !== 'production'
const turnstile = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)

/**
 * Content-Security-Policy.
 * - 'unsafe-inline' scripts are required by Next.js hydration without nonces (documented trade-off).
 * - Map tiles come from OpenStreetMap; extend TILE_HOSTS if another provider is configured.
 */
const tileHosts = (process.env.MAP_TILE_HOSTS || 'https://*.tile.openstreetmap.org').split(',')
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}${turnstile ? ' https://challenges.cloudflare.com' : ''}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${tileHosts.join(' ')}`,
  "font-src 'self' data:",
  "media-src 'self' blob:",
  `connect-src 'self'${isDev ? ' ws: wss:' : ''}`,
  `frame-src 'self'${turnstile ? ' https://challenges.cloudflare.com' : ''}`,
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  ...(isDev ? [] : [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }]),
]

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/brand/**' }, { pathname: '/images/**' }],
  },
  experimental: {
    serverActions: { bodySizeLimit: '6mb' },
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  async redirects() {
    // Legacy / convenience URLs.
    return [
      { source: '/admin/login/', destination: '/admin/login', permanent: true },
    ]
  },
}

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false })
