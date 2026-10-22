import { Download, ExternalLink, FileText } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { Badge } from '@/components/ui/badge'
import { Link } from '@/i18n/navigation'
import type { Document, Publication } from '@/payload-types'
import { formatDate, formatFileSize, isSafeExternalUrl } from '@/lib/utils'

export async function PublicationCard({ publication }: { publication: Publication }) {
  const t = await getTranslations('publications')
  const tc = await getTranslations('common')
  const locale = await getLocale()
  const file = publication.file && typeof publication.file === 'object' ? publication.file : null
  const ext = file?.filename?.split('.').pop()?.toUpperCase()
  return (
    <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-soft ring-1 ring-forest/5 transition-all hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-xl bg-forest text-gold">
          <FileText className="size-6" aria-hidden="true" />
        </span>
        <Badge tone="leaf">{t(`types.${publication.type}`)}</Badge>
      </div>
      <h3 className="mt-5 font-display text-lg leading-snug font-semibold text-forest">
        <Link
          href={{ pathname: '/publications/[slug]', params: { slug: publication.slug } }}
          className="hover:text-leaf"
        >
          {publication.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
        {publication.description}
      </p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-forest/8 pt-5 text-xs text-ink-muted">
        <time dateTime={publication.publishedAt}>
          {formatDate(publication.publishedAt, locale)}
        </time>
        {file?.url ? (
          <a
            href={file.url}
            download
            className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3.5 py-2 font-semibold text-white hover:bg-forest-700"
          >
            <Download className="size-3.5" aria-hidden="true" />
            {tc('download')} {ext && `· ${ext}`}{' '}
            {file.filesize ? `· ${formatFileSize(file.filesize, locale)}` : ''}
          </a>
        ) : isSafeExternalUrl(publication.externalUrl) ? (
          <a
            href={publication.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-leaf"
          >
            {t('consult')} <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  )
}

export async function DocumentLink({ document }: { document: Document }) {
  const locale = await getLocale()
  const tc = await getTranslations('common')
  const ext = document.filename?.split('.').pop()?.toUpperCase()
  if (!document.url) return null
  return (
    <a
      href={document.url}
      download
      className="group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-forest/5 transition-all hover:shadow-lift"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-leaf-50 text-leaf">
        <FileText className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium text-forest">{document.title}</span>
        <span className="text-xs text-ink-muted">
          {ext} {document.filesize ? `· ${formatFileSize(document.filesize, locale)}` : ''}
        </span>
      </span>
      <Download
        className="size-4 text-ink-muted transition-colors group-hover:text-forest"
        aria-hidden="true"
      />
      <span className="sr-only">{tc('download')}</span>
    </a>
  )
}
