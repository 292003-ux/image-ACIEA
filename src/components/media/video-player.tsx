import { AutoplayVideo } from '@/components/media/autoplay-video'
import { mediaUrl } from '@/components/media/cms-image'
import type { Media } from '@/payload-types'
import { cn } from '@/lib/utils'

/** Self-hosted CMS video with its poster image and caption. */
export function VideoPlayer({
  video,
  poster,
  className,
  videoClassName,
  captionClassName,
  showCaption = true,
}: {
  video: Media
  poster?: Media | null
  className?: string
  videoClassName?: string
  captionClassName?: string
  showCaption?: boolean
}) {
  const src = mediaUrl(video)
  if (!src) return null
  return (
    <figure className={className}>
      <AutoplayVideo
        src={src}
        type={video.mimeType ?? 'video/mp4'}
        poster={mediaUrl(poster ?? null, 'card') ?? undefined}
        label={video.alt}
        className={cn('w-full bg-night object-cover', videoClassName)}
      />
      {showCaption && video.caption && (
        <figcaption className={captionClassName}>{video.caption}</figcaption>
      )}
    </figure>
  )
}
