import { ExternalLink, FileSignature, Landmark } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { CmsImage } from '@/components/media/cms-image'
import { Badge } from '@/components/ui/badge'
import type { Partner } from '@/payload-types'
import { formatDate, isSafeExternalUrl } from '@/lib/utils'

export async function PartnerCard({
  partner,
  detailed = false,
}: {
  partner: Partner
  detailed?: boolean
}) {
  const t = await getTranslations('partners')
  const tc = await getTranslations('common')
  const locale = await getLocale()
  return (
    <article className="flex h-full flex-col rounded-[var(--radius-card)] bg-white p-7 shadow-soft ring-1 ring-forest/5">
      <div className="flex items-start gap-5">
        <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-ivory ring-1 ring-forest/8">
          {partner.logo && typeof partner.logo === 'object' ? (
            <CmsImage
              media={partner.logo}
              size="thumbnail"
              className="size-full"
              imgClassName="object-contain p-2"
              sizes="80px"
              showProvenance={false}
            />
          ) : partner.acronym ? (
            <span className="px-1 text-center font-display text-sm leading-tight font-bold text-forest">
              {partner.acronym}
            </span>
          ) : (
            <Landmark className="size-8 text-forest/70" aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0">
          <Badge tone="leaf">{t(`categories.${partner.category}`)}</Badge>
          <h3 className="mt-3 font-display text-lg leading-snug font-semibold text-forest">
            {partner.name}
            {partner.acronym && <span className="text-ink-muted"> ({partner.acronym})</span>}
          </h3>
        </div>
      </div>
      {(partner.agreementType || partner.agreementDate) && (
        <p className="mt-5 flex items-center gap-2 text-sm text-forest">
          <FileSignature className="size-4 text-gold-600" aria-hidden="true" />
          <span>
            {partner.agreementType}
            {partner.agreementDate &&
              ` · ${t('signedOn', { date: formatDate(partner.agreementDate, locale) })}`}
          </span>
        </p>
      )}
      {partner.description && (
        <p className="mt-4 leading-relaxed text-ink-muted">{partner.description}</p>
      )}
      {detailed && partner.collaborationAreas && partner.collaborationAreas.length > 0 && (
        <div className="mt-5">
          <p className="mb-3 eyebrow text-leaf">{t('areas')}</p>
          <ul className="space-y-2">
            {partner.collaborationAreas.map((a) => (
              <li key={a.id} className="flex gap-2.5 text-sm text-ink">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rotate-45 bg-gold" />
                {a.text}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-sm font-semibold">
        {isSafeExternalUrl(partner.website) && (
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-leaf hover:underline"
          >
            {t('visitWebsite')}
            <ExternalLink className="size-3.5" aria-hidden="true" />
            <span className="sr-only">{tc('openInNewTab')}</span>
          </a>
        )}
        {isSafeExternalUrl(partner.sourceUrl) && (
          <a
            href={partner.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-ink-muted hover:text-forest hover:underline"
          >
            {tc('officialSource')}
            <ExternalLink className="size-3.5" aria-hidden="true" />
            <span className="sr-only">{tc('openInNewTab')}</span>
          </a>
        )}
      </div>
    </article>
  )
}
