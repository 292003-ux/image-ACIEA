import { FileText } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { DocumentLink } from '@/components/cards/document-card'
import { RichText } from '@/components/rich-text'
import { PageHero } from '@/components/sections/page-hero'
import { PresidentMessage } from '@/components/sections/president-message'
import { Section } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import type { Locale } from '@/i18n/routing'
import { getAboutPage } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import type { Document } from '@/payload-types'

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
          <div className="lg:col-span-5">
            <RichText data={about?.governance} />
          </div>
          <aside className="lg:col-span-7">
            <PresidentMessage
              message={about?.presidentMessage}
              locale={locale}
              className="bg-white shadow-soft"
            />
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
