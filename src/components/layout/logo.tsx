import Image from 'next/image'
import { mediaUrl } from '@/components/media/cms-image'
import type { Media } from '@/payload-types'
import { cn } from '@/lib/utils'

/**
 * Official logo when uploaded in Site settings; otherwise a provisional,
 * clearly replaceable monogram.
 */
export function Logo({
  logo,
  shortName = 'ACIEA',
  tagline,
  tone = 'light',
  className,
  compact = false,
}: {
  compact?: boolean
  logo?: Media | number | null
  shortName?: string
  tagline?: string
  tone?: 'light' | 'dark'
  className?: string
}) {
  const url = mediaUrl(logo, 'thumbnail')
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-soft ring-1 ring-black/5">
        {url ? (
          <Image
            src={url}
            alt=""
            width={88}
            height={88}
            className="size-full object-contain p-0.5"
            priority
          />
        ) : (
          <svg viewBox="0 0 44 44" aria-hidden="true" className="size-full">
            <circle cx="22" cy="22" r="21" fill="#103D30" />
            <path
              d="M22 9c6 5 8 11 4 18-2 3-4 5-4 8 0-3-2-5-4-8-4-7-2-13 4-18Z"
              fill="#00BA89"
              opacity=".9"
            />
            <circle cx="22" cy="22" r="17" fill="none" stroke="#D5AE62" strokeWidth=".8" />
          </svg>
        )}
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-lg font-bold tracking-[0.12em]',
            tone === 'light' ? 'text-white' : 'text-forest',
          )}
        >
          {shortName}
        </span>
        {tagline && (
          <span
            className={cn(
              'mt-1 hidden max-w-[13rem] text-[0.625rem] leading-tight tracking-wide sm:block',
              compact && 'xl:hidden 2xl:block',
              tone === 'light' ? 'text-white/65' : 'text-ink-muted',
            )}
          >
            {tagline}
          </span>
        )}
      </span>
    </span>
  )
}
