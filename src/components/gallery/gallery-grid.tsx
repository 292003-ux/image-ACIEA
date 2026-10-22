import { mediaUrl } from '@/components/media/cms-image'
import type { Media } from '@/payload-types'
import { GalleryLightbox, type GalleryItem } from './gallery-lightbox'

export function GalleryGrid({ items, columns = 3 }: { items: Media[]; columns?: 2 | 3 | 4 }) {
  const data: GalleryItem[] = items
    .map((m) => ({
      id: String(m.id),
      thumb: mediaUrl(m, 'card') ?? '',
      full: mediaUrl(m, 'hero') ?? mediaUrl(m) ?? '',
      alt: m.alt,
      caption: m.caption ?? null,
      width: m.width ?? 1200,
      height: m.height ?? 800,
    }))
    .filter((m) => m.thumb)
  return <GalleryLightbox items={data} columns={columns} />
}
