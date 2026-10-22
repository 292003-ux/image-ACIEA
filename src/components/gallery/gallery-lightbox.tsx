'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { cn } from '@/lib/utils'

export type GalleryItem = {
  id: string
  thumb: string
  full: string
  alt: string
  caption: string | null
  width: number
  height: number
}

export function GalleryLightbox({
  items,
  columns = 3,
}: {
  items: GalleryItem[]
  columns?: 2 | 3 | 4
}) {
  const t = useTranslations('gallery')
  const tc = useTranslations('common')
  const [index, setIndex] = React.useState<number | null>(null)
  const current = index !== null ? items[index] : null
  const go = (delta: number) =>
    setIndex((i) => (i === null ? i : (i + delta + items.length) % items.length))

  return (
    <>
      <ul
        className={cn(
          'grid gap-3 sm:gap-4',
          columns === 2 && 'grid-cols-2',
          columns === 3 && 'grid-cols-2 md:grid-cols-3',
          columns === 4 && 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        )}
      >
        {items.map((item, i) => (
          <li
            key={item.id}
            className={cn(i % 5 === 0 && columns >= 3 && 'md:col-span-2 md:row-span-2')}
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-forest/5"
              aria-label={t('openImage', { alt: item.alt })}
            >
              <Image
                src={item.thumb}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              {item.caption && (
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/80 to-transparent p-3 pt-10 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {item.caption}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      <Dialog.Root open={index !== null} onOpenChange={(o) => !o && setIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-night/92 backdrop-blur-sm" />
          <Dialog.Content
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 outline-none md:p-10"
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') go(1)
              if (e.key === 'ArrowLeft') go(-1)
            }}
          >
            <Dialog.Title className="sr-only">{current?.alt}</Dialog.Title>
            <Dialog.Description className="sr-only">
              {index !== null && t('imageOf', { index: index + 1, total: items.length })}
            </Dialog.Description>
            {current && (
              <figure className="relative flex max-h-full w-full max-w-5xl flex-col items-center">
                <Image
                  src={current.full}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  sizes="100vw"
                  className="max-h-[78vh] w-auto rounded-xl object-contain"
                />
                <figcaption className="mt-4 text-center text-sm text-white/80">
                  {current.caption}
                  <span className="ml-3 text-white/65">
                    {index! + 1} / {items.length}
                  </span>
                </figcaption>
              </figure>
            )}
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={tc('previous')}
                  className="absolute top-1/2 left-3 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <ChevronLeft className="size-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={tc('next')}
                  className="absolute top-1/2 right-3 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <ChevronRight className="size-6" aria-hidden="true" />
                </button>
              </>
            )}
            <Dialog.Close
              className="absolute top-4 right-4 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label={tc('close')}
            >
              <X className="size-6" aria-hidden="true" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
