import type { SOCIAL_PLATFORMS } from '@/globals/SiteSettings'

type Platform = (typeof SOCIAL_PLATFORMS)[number]

const PATHS: Record<Platform, string> = {
  facebook: 'M14 8.5V6.6c0-.8.2-1.3 1.4-1.3H17V2.2C16.7 2.1 15.7 2 14.6 2 12.2 2 10.6 3.4 10.6 6.1v2.4H8v3.4h2.6V22H14v-10.1h2.7l.4-3.4H14Z',
  linkedin: 'M6.9 21H3.3V9h3.6v12ZM5.1 7.4A2.1 2.1 0 1 1 5.1 3.2a2.1 2.1 0 0 1 0 4.2ZM21 21h-3.6v-5.8c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1V21H9.6V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5V21Z',
  x: 'M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z',
  youtube: 'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.7 2 12 2 12s0 3.3.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.5.4-4.8.4-4.8s0-3.3-.4-4.8ZM10 15V9l5.2 3L10 15Z',
  instagram: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4ZM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM12 2c-2.7 0-3.1 0-4.1.1C3.6 2.3 2.3 3.6 2.1 7.9 2 8.9 2 9.3 2 12s0 3.1.1 4.1c.2 4.3 1.5 5.6 5.8 5.8 1 .1 1.4.1 4.1.1s3.1 0 4.1-.1c4.3-.2 5.6-1.5 5.8-5.8.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c-.2-4.3-1.5-5.6-5.8-5.8C15.1 2 14.7 2 12 2Z',
  tiktok: 'M16.6 2h-3.2v13.1a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9a6.2 6.2 0 1 0 5.2 6.1V8.6a7.6 7.6 0 0 0 4.4 1.4V6.8A4.4 4.4 0 0 1 16.6 2Z',
  whatsapp: 'M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3.1s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.1.1.7-.1 1.3Z',
}

export function SocialIcon({ platform, className }: { platform: string; className?: string }) {
  const d = PATHS[platform as Platform]
  if (!d) return null
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d={d} />
    </svg>
  )
}

export const PLATFORM_NAMES: Record<string, string> = {
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  x: 'X',
  youtube: 'YouTube',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  whatsapp: 'WhatsApp',
}
