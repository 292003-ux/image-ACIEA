import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ContactForm } from '@/components/forms/contact-form'
import { PLATFORM_NAMES, SocialIcon } from '@/components/layout/social-icon'
import { PageHero } from '@/components/sections/page-hero'
import { Section } from '@/components/ui/container'
import type { Locale } from '@/i18n/routing'
import { CONTACT_SUBJECTS } from '@/lib/constants'
import { getSiteSettings } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { isSafeExternalUrl } from '@/lib/utils'

type Props = { params: Promise<{ locale: Locale }>; searchParams: Promise<{ subject?: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return buildMetadata({ locale, href: '/contact', title: t('title'), description: t('intro') })
}

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const { subject } = await searchParams
  const [t, tc, settings] = await Promise.all([
    getTranslations({ locale, namespace: 'contact' }),
    getTranslations({ locale, namespace: 'common' }),
    getSiteSettings(locale),
  ])
  const socials = (settings?.socials ?? []).filter((s) => s.verified && isSafeExternalUrl(s.url))
  const defaultSubject = CONTACT_SUBJECTS.includes(subject as never)
    ? (subject as (typeof CONTACT_SUBJECTS)[number])
    : 'general'
  return (
    <>
      <PageHero title={t('title')} description={t('intro')} crumbs={[{ label: t('title') }]} />
      <Section tone="ivory">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-[1.5rem] bg-forest p-7 text-white">
              <h2 className="eyebrow text-gold">{t('details')}</h2>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-digital" aria-hidden="true" />
                  <div>
                    <p className="text-white/55">{t('address')}</p>
                    <p className="whitespace-pre-line">
                      {settings?.address || 'Ouagadougou, Burkina Faso'}
                    </p>
                  </div>
                </li>
                {settings?.email && (
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 size-5 shrink-0 text-digital" aria-hidden="true" />
                    <div>
                      <p className="text-white/55">{t('email')}</p>
                      <a href={`mailto:${settings.email}`} className="break-all hover:text-gold">
                        {settings.email}
                      </a>
                    </div>
                  </li>
                )}
                {settings?.phone && (
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 size-5 shrink-0 text-digital" aria-hidden="true" />
                    <div>
                      <p className="text-white/55">{t('phone')}</p>
                      <a
                        href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}
                        className="hover:text-gold"
                      >
                        {settings.phone}
                      </a>
                    </div>
                  </li>
                )}
              </ul>
              {socials.length > 0 && (
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-sm text-white/55">{t('socials')}</p>
                  <ul className="mt-3 flex gap-2">
                    {socials.map((s) => (
                      <li key={s.url}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="grid size-11 place-items-center rounded-full bg-white/8 hover:bg-gold hover:text-forest-900"
                        >
                          <SocialIcon platform={s.platform} className="size-4" />
                          <span className="sr-only">
                            {PLATFORM_NAMES[s.platform]} {tc('openInNewTab')}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <p className="flex gap-3 rounded-2xl bg-white p-5 text-sm leading-relaxed text-ink-muted shadow-soft">
              <ShieldCheck className="size-5 shrink-0 text-leaf" aria-hidden="true" />
              {t('responseNote')}
            </p>
          </aside>
          <div className="rounded-[1.75rem] bg-white p-6 shadow-soft md:p-10 lg:col-span-8">
            <h2 className="mb-8 font-display text-h3 font-semibold text-forest">
              {t('formTitle')}
            </h2>
            <ContactForm defaultSubject={defaultSubject} />
          </div>
        </div>
      </Section>
    </>
  )
}
