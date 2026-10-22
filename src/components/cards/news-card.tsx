import { getLocale, getTranslations } from 'next-intl/server'
import { CmsImage } from '@/components/media/cms-image'
import { Badge } from '@/components/ui/badge'
import { Link } from '@/i18n/navigation'
import type { News } from '@/payload-types'
import type { WithFallback } from '@/lib/queries'
import { cn, formatDate } from '@/lib/utils'

export async function NewsCard({
  article,
  variant = 'default',
  priority,
}: {
  article: WithFallback<News>
  variant?: 'default' | 'featured' | 'compact'
  priority?: boolean
}) {
  const locale = await getLocale()
  const t = await getTranslations('news')
  const tc = await getTranslations('common')
  const featured = variant === 'featured'
  const compact = variant === 'compact'
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-soft ring-1 ring-forest/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift',
        featured && 'lg:flex-row',
      )}
    >
      {!compact && (
        <div
          className={cn(
            'relative overflow-hidden',
            featured ? 'aspect-[16/10] lg:aspect-auto lg:w-[55%]' : 'aspect-[16/10]',
          )}
        >
          <CmsImage
            media={article.coverImage}
            className="absolute inset-0"
            imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
            placeholderSeed={article.slug}
            priority={priority}
            sizes={
              featured ? '(min-width: 1024px) 640px, 100vw' : '(min-width: 1024px) 400px, 100vw'
            }
          />
        </div>
      )}
      <div className={cn('flex flex-1 flex-col p-6', featured && 'lg:p-10')}>
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <Badge tone="gold">{t(`categories.${article.category}`)}</Badge>
          <time dateTime={article.publishedAt} className="text-ink-muted">
            {formatDate(article.publishedAt, locale)}
          </time>
          {article._isFallback && <Badge tone="neutral">{tc('fallbackBadge')}</Badge>}
        </div>
        <h3
          className={cn(
            'mt-4 font-display leading-snug font-semibold text-forest',
            featured ? 'text-h3' : 'text-lg',
          )}
        >
          <Link
            href={{ pathname: '/news/[slug]', params: { slug: article.slug } }}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {article.title}
          </Link>
        </h3>
        <p
          className={cn(
            'mt-3 leading-relaxed text-ink-muted',
            featured ? 'line-clamp-5 text-lead' : 'line-clamp-3 text-[0.95rem]',
          )}
        >
          {article.excerpt}
        </p>
        <span className="mt-auto pt-6 text-sm font-semibold text-leaf" aria-hidden="true">
          {tc('readMore')} →
        </span>
      </div>
    </article>
  )
}
