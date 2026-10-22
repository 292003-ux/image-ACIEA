import { mediaUrl } from '@/components/media/cms-image'
import type { Media } from '@/payload-types'
import { cn } from '@/lib/utils'

/**
 * Self-hosted CMS video: nothing is downloaded until the visitor presses play
 * (light on mobile data), with a poster image and the video's caption.
 */
export function VideoPlayer({
  video,
  poster,
  className,
  videoClassName,
  captionClassName,
}: {
  video: Media
  poster?: Media | null
  className?: string
  videoClassName?: string
  captionClassName?: string
}) {
  const src = mediaUrl(video)
  if (!src) return null
  return (
    <figure className={className}>
      <video
        controls
        playsInline
        preload="none"
        poster={mediaUrl(poster ?? null, 'card') ?? undefined}
        aria-label={video.alt}
        className={cn('w-full bg-night object-cover', videoClassName)}
      >
        <source src={src} type={video.mimeType ?? 'video/mp4'} />
      </video>
      {video.caption && <figcaption className={captionClassName}>{video.caption}</figcaption>}
    </figure>
  )
}
