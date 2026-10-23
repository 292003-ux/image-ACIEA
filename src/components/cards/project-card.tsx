import { MapPin } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { CmsImage } from '@/components/media/cms-image'
import { Badge } from '@/components/ui/badge'
import { ArrowGlyph } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import type { Domain, Project } from '@/payload-types'
import type { WithFallback } from '@/lib/queries'
import { cn } from '@/lib/utils'

export const STATUS_TONE = { planned: 'gold', ongoing: 'leaf', completed: 'forest' } as const

export async function ProjectCard({
  project,
  layout = 'grid',
  priority,
  linked = true,
}: {
  project: WithFallback<Project>
  layout?: 'grid' | 'list'
  priority?: boolean
  /** false: a plain card showing the whole summary, with no link to the project sheet. */
  linked?: boolean
}) {
  const t = await getTranslations('projects')
  const tc = await getTranslations('common')
  const domain = project.domains?.find((d): d is Domain => typeof d === 'object')
  const place = [project.location?.locality, project.location?.region].filter(Boolean).join(', ')
  const list = layout === 'list'
  return (
    <article
      className={cn(
        'group relative flex overflow-hidden rounded-[var(--radius-card)] bg-white shadow-soft ring-1 ring-forest/5',
        linked && 'transition-all duration-500 hover:-translate-y-1 hover:shadow-lift',
        list ? 'flex-col sm:flex-row' : 'flex-col',
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          list ? 'aspect-[16/10] sm:aspect-auto sm:w-72 sm:shrink-0' : 'aspect-[16/10]',
        )}
      >
        <CmsImage
          media={project.coverImage}
          className="absolute inset-0"
          imgClassName={
            linked ? 'transition-transform duration-700 group-hover:scale-[1.04]' : undefined
          }
          placeholderSeed={project.slug}
          priority={priority}
          sizes={list ? '288px' : '(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw'}
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge tone={STATUS_TONE[project.status]} dot className="bg-white/95 backdrop-blur">
            {t(`status.${project.status}`)}
          </Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {domain && <span className="eyebrow text-leaf">{domain.title}</span>}
          {project._isFallback && <Badge tone="neutral">{tc('fallbackBadge')}</Badge>}
        </div>
        <h3 className="mt-3 font-display text-xl leading-snug font-semibold text-forest">
          {linked ? (
            <Link
              href={{ pathname: '/projects/[slug]', params: { slug: project.slug } }}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>
        <p
          className={cn(
            'mt-3 text-[0.95rem] leading-relaxed text-ink-muted',
            linked && 'line-clamp-3',
          )}
        >
          {project.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          {place ? (
            <span className="flex items-center gap-1.5 text-sm text-ink-muted">
              <MapPin className="size-4 text-gold-600" aria-hidden="true" />
              {place}
            </span>
          ) : (
            <span />
          )}
          {linked && (
            <span
              className="group/btn flex items-center gap-1.5 text-sm font-semibold text-leaf"
              aria-hidden="true"
            >
              {t('viewProject')}
              <ArrowGlyph className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          )}
        </div>
      </div>
      <span
        aria-hidden="true"
        hidden={!linked}
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-gold to-digital transition-transform duration-500 group-hover:scale-x-100"
      />
    </article>
  )
}
