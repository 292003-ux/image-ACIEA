'use client'

import { Volume2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Starts muted on its own (the only autoplay browsers allow), with the usual
 * controls to pause or seek and a button to turn the sound on. Pauses when
 * scrolled out of view; stays still for reduced-motion or data-saver users.
 */
export function AutoplayVideo({
  src,
  type,
  poster,
  label,
  className,
}: {
  src: string
  type: string
  poster?: string
  label: string
  className?: string
}) {
  const t = useTranslations('common')
  const ref = React.useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = React.useState(true)
  // The sound button needs JavaScript: it only appears once the page is interactive.
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    const video = ref.current
    if (!video) return
    setReady(true)
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData
    if (saveData || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause()
      return
    }
    // Only the autoplay is managed here: a pause chosen by the visitor is kept.
    let pausedByScroll = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (!entry.isIntersecting && !video.paused) {
          pausedByScroll = true
          video.pause()
        } else if (entry.isIntersecting && pausedByScroll) {
          pausedByScroll = false
          void video.play().catch(() => {})
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(video)
    const onVolume = () => setMuted(video.muted)
    video.addEventListener('volumechange', onVolume)
    return () => {
      observer.disconnect()
      video.removeEventListener('volumechange', onVolume)
    }
  }, [])

  const unmute = () => {
    const video = ref.current
    if (!video) return
    video.muted = false
    if (video.paused) void video.play().catch(() => {})
  }

  return (
    <div className="relative">
      <video
        ref={ref}
        autoPlay
        muted
        controls
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        className={className}
      >
        <source src={src} type={type} />
      </video>
      {ready && muted && (
        <button
          type="button"
          onClick={unmute}
          className={cn(
            'absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-night/80 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-forest',
          )}
        >
          <Volume2 className="size-4" aria-hidden="true" />
          {t('unmute')}
        </button>
      )}
    </div>
  )
}
