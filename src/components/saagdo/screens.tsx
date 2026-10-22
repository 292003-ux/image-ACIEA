import { CmsImage } from '@/components/media/cms-image'
import type { Media } from '@/payload-types'
import { cn } from '@/lib/utils'

/** Real SAAGDO screenshots: the management platform in a browser frame, the app in a phone. */
export function SaagdoScreens({
  platform,
  app,
  className,
}: {
  platform: Media
  app?: Media | null
  className?: string
}) {
  const ratio = (m: Media, fallback: string) =>
    m.width && m.height ? `${m.width} / ${m.height}` : fallback
  return (
    <div className={cn('relative mx-auto w-full max-w-2xl pb-10 sm:pb-0', className)}>
      <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-white/15">
        <div aria-hidden="true" className="flex items-center gap-1.5 bg-night-700 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-white/25" />
          <span className="size-2.5 rounded-full bg-white/25" />
          <span className="size-2.5 rounded-full bg-white/25" />
        </div>
        <CmsImage
          media={platform}
          size="hero"
          sizes="(min-width: 1024px) 640px, 100vw"
          fill={false}
          className="w-full"
          imgClassName="h-auto w-full"
          showProvenance={false}
        />
      </div>
      {app && (
        <div className="absolute right-2 -bottom-2 w-[24%] max-w-36 rounded-[1.6rem] bg-night p-1.5 shadow-2xl ring-1 ring-white/20 sm:-right-6 sm:-bottom-12">
          <div
            className="relative overflow-hidden rounded-[1.25rem] bg-white"
            style={{ aspectRatio: ratio(app, '9 / 19') }}
          >
            <CmsImage
              media={app}
              size="card"
              sizes="160px"
              className="absolute inset-0"
              showProvenance={false}
            />
          </div>
        </div>
      )}
    </div>
  )
}
