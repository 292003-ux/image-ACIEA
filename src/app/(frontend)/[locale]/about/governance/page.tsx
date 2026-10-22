import { FileText, Quote } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { DocumentLink } from '@/components/cards/document-card'
import { RichText } from '@/components/rich-text'
import { PageHero } from '@/components/sections/page-hero'
import { Section } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import type { Locale } from '@/i18n/routing'
import { getAboutPage } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import type { Document, TeamMember } from '@/payload-types'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  return buildMetadata({ locale, href: '/about/governance', title: t('governanceTitle') })
}

export default async function GovernancePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, about] = await Promise.all([
    getTranslations({ locale, namespace: 'about' }),
    getAboutPage(locale),
  ])
  const docs = (about?.institutionalDocuments ?? []).filter(
    (d): d is Document => typeof d === 'object',
  )
  const president = about?.presidentMessage
  const author =
    president?.author && typeof president.author === 'object'
      ? (president.author as TeamMember)
      : null
  return (
    <>
      <PageHero
        eyebrow={t('title')}
        title={t('governanceTitle')}
        crumbs={[
          { label: t('title'), href: '/about', url: '/about' },
          { label: t('governanceTitle') },
        ]}
      />
      <Section tone="ivory">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RichText data={about?.governance} />
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-[1.75rem] bg-white p-8 shadow-soft">
              <Quote className="size-9 text-gold" aria-hidden="true" />
              <h2 className="mt-5 eyebrow text-leaf">{t('presidentTitle')}</h2>
              {president?.enabled && president.text ? (
                <>
                  <blockquote className="mt-4 font-serif text-lg leading-relaxed whitespace-pre-line text-forest">
                    {president.text}
                  </blockquote>
                  {author && (
                    <p className="mt-5 text-sm font-semibold text-forest">{author.name}</p>
                  )}
                </>
              ) : (
                <p className="mt-3 text-ink-muted">{t('presidentPending')}</p>
              )}
            </div>
          </aside>
        </div>
      </Section>
      <Section tone="white">
        <h2 className="font-display text-h3 font-semibold text-forest">{t('documentsTitle')}</h2>
        <div className="mt-8">
          {docs.length ? (
            <ul className="grid gap-4 md:grid-cols-2">
              {docs.map((d) => (
                <li key={d.id}>
                  <DocumentLink document={d} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              icon={<FileText className="size-7" aria-hidden="true" />}
              title={t('documentsTitle')}
              description={t('documentsEmpty')}
            />
          )}
        </div>
      </Section>
    </>
  )
}
