import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { Media } from '@/payload-types'
import { cn } from '@/lib/utils'
import { CoverPlaceholder } from './cover-placeholder'

type Size = 'thumbnail' | 'card' | 'hero'

/** Payload returns absolute URLs; serve our own files as local paths (optimised by next/image). */
function toLocalPath(url: string): string {
  if (url.startsWith('/')) return url
  try {
    const parsed = new URL(url)
    const own = new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000')
    return parsed.host === own.host ? `${parsed.pathname}${parsed.search}` : url
  } catch {
    return url
  }
}

export function mediaUrl(media: Media | number | null | undefined, size?: Size): string | null {
  if (!media || typeof media === 'number') return null
  const sized = size ? media.sizes?.[size]?.url : null
  const url = sized || media.url
  return url ? toLocalPath(url) : null
}

/** Renders a CMS image with focal point, optional illustrative label and a graceful placeholder. */
export async function CmsImage({
  media,
  size = 'card',
  className,
  imgClassName,
  priority,
  sizes = '(min-width: 1024px) 33vw, 100vw',
  fill = true,
  placeholderSeed,
  showProvenance = true,
}: {
  media: Media | number | null | undefined
  size?: Size
  className?: string
  imgClassName?: string
  priority?: boolean
  sizes?: string
  fill?: boolean
  placeholderSeed?: string
  showProvenance?: boolean
}) {
  const url = mediaUrl(media, size)
  if (!url || !media || typeof media === 'number') {
    return <CoverPlaceholder seed={placeholderSeed} className={className} />
  }
  const t = await getTranslations('common')
  const focal = `${media.focalX ?? 50}% ${media.focalY ?? 50}%`
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {fill ? (
        <Image
          src={url}
          alt={media.alt || ''}
          fill
          sizes={sizes}
          priority={priority}
          className={cn('object-cover', imgClassName)}
          style={{ objectPosition: focal }}
        />
      ) : (
        <Image
          src={url}
          alt={media.alt || ''}
          width={media.width ?? 1200}
          height={media.height ?? 800}
          sizes={sizes}
          priority={priority}
          className={imgClassName}
        />
      )}
      {showProvenance && media.provenance === 'illustrative' && (
        <span className="absolute bottom-2 left-2 rounded-full bg-night/75 px-2.5 py-1 text-[0.6875rem] font-medium text-white/90 backdrop-blur">
          {t('illustrative')}
        </span>
      )}
    </div>
  )
}
