import { Quote } from 'lucide-react'
import NextLink from 'next/link'
import { getTranslations } from 'next-intl/server'
import { CmsImage } from '@/components/media/cms-image'
import { ArrowGlyph } from '@/components/ui/button'
import type { Locale } from '@/i18n/routing'
import { pathFor } from '@/lib/navigation'
import type { AboutPage, TeamMember } from '@/payload-types'
import { cn } from '@/lib/utils'

/**
 * The president's message, signed with the signatory's portrait.
 * `excerpt` shows the first paragraph and links to the full text on the governance page.
 */
export async function PresidentMessage({
  message,
  locale,
  variant = 'full',
  className,
}: {
  message: AboutPage['presidentMessage'] | undefined
  locale: Locale
  variant?: 'full' | 'excerpt'
  className?: string
}) {
  const t = await getTranslations({ locale, namespace: 'about' })
  const author =
    message?.author && typeof message.author === 'object' ? (message.author as TeamMember) : null
  const paragraphs = (message?.enabled && message.text ? message.text : '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
  const shown = variant === 'excerpt' ? paragraphs.slice(0, 1) : paragraphs

  return (
    <div className={cn('relative rounded-[1.75rem] p-8 ring-1 ring-forest/5 md:p-10', className)}>
      <Quote className="size-10 text-gold" aria-hidden="true" />
      <h2 className="mt-6 eyebrow text-leaf">{t('presidentTitle')}</h2>
      {shown.length ? (
        <figure className="mt-5">
          <blockquote
            className={cn(
              'space-y-5 font-serif leading-relaxed text-forest',
              variant === 'excerpt' ? 'text-xl' : 'text-lg',
            )}
          >
            {shown.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </blockquote>
          {author && (
            <figcaption className="mt-8 flex items-center gap-4">
              {author.photo && typeof author.photo === 'object' && (
                <CmsImage
                  media={author.photo}
                  size="thumbnail"
                  sizes="56px"
                  className="size-14 shrink-0 rounded-full ring-2 ring-gold/40"
                  imgClassName="origin-top scale-[1.15]"
                  showProvenance={false}
                />
              )}
              <span className="text-sm">
                <span className="block font-semibold text-forest">{author.name}</span>
                {author.position && (
                  <span className="text-ink-muted">
                    {t('presidentSignature', { position: author.position })}
                  </span>
                )}
              </span>
            </figcaption>
          )}
          {variant === 'excerpt' && paragraphs.length > 1 && (
            <NextLink
              href={pathFor('/about/governance', locale)}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-leaf hover:text-forest"
            >
              {t('presidentReadFull')}
              <ArrowGlyph className="size-4" />
            </NextLink>
          )}
        </figure>
      ) : (
        <p className="mt-4 text-ink-muted">{t('presidentPending')}</p>
      )}
    </div>
  )
}
