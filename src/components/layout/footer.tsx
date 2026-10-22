import { Mail, MapPin, Phone } from 'lucide-react'
import NextLink from 'next/link'
import { getTranslations } from 'next-intl/server'
import { NewsletterForm } from '@/components/forms/newsletter-form'
import type { Locale } from '@/i18n/routing'
import { pathFor, pathForSlug, resolveFooterColumns } from '@/lib/navigation'
import { getDomains, getNavigation, getSiteSettings } from '@/lib/queries'
import { isSafeExternalUrl } from '@/lib/utils'
import { LanguageSwitcher } from './language-switcher'
import { Logo } from './logo'
import { PLATFORM_NAMES, SocialIcon } from './social-icon'

export async function Footer({ locale }: { locale: Locale }) {
  const [settings, nav, domains, t, tn, tc] = await Promise.all([
    getSiteSettings(locale),
    getNavigation(locale),
    getDomains(locale),
    getTranslations({ locale, namespace: 'footer' }),
    getTranslations({ locale, namespace: 'nav' }),
    getTranslations({ locale, namespace: 'common' }),
  ])
  const columns = await resolveFooterColumns(locale, nav)
  const socials = (settings?.socials ?? []).filter((s) => s.verified && isSafeExternalUrl(s.url))
  const year = new Date().getFullYear()
  const linkClass = 'text-sm text-white/70 transition-colors hover:text-gold'

  return (
    <footer className="relative overflow-hidden bg-forest-900 text-white">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30" />
      <div aria-hidden="true" className="absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-leaf/20 blur-[120px]" />
      <div className="container-page relative pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo logo={settings?.logo} shortName={settings?.shortName || 'ACIEA'} tagline={settings?.organizationName} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">{settings?.description || t('about')}</p>
            {settings?.tagline && (
              <p className="mt-5 font-serif text-lg text-gold italic">« {settings.tagline} »</p>
            )}
            {socials.length > 0 && (
              <div className="mt-8">
                <p className="eyebrow mb-3 text-white/50">{t('follow')}</p>
                <ul className="flex gap-2">
                  {socials.map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid size-11 place-items-center rounded-full bg-white/6 ring-1 ring-white/10 transition-all hover:bg-gold hover:text-forest-900"
                      >
                        <SocialIcon platform={s.platform} className="size-[1.05rem]" />
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

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow mb-4 text-gold">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      {l.external ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                          {l.label}
                        </a>
                      ) : (
                        <NextLink href={l.href} className={linkClass}>
                          {l.label}
                        </NextLink>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="eyebrow mb-4 text-gold">{t('domains')}</p>
              <ul className="space-y-2.5">
                {domains.map((d) => (
                  <li key={d.id}>
                    <NextLink href={pathForSlug('/domains/[slug]', d.slug, locale)} className={linkClass}>
                      {d.title}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-4 text-gold">{t('contact')}</p>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-digital" aria-hidden="true" />
                <span className="whitespace-pre-line">{settings?.address || `${settings?.city ?? 'Ouagadougou'}, ${settings?.country ?? 'Burkina Faso'}`}</span>
              </li>
              {settings?.email && (
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-digital" aria-hidden="true" />
                  <a href={`mailto:${settings.email}`} className="break-all hover:text-gold">
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.phone && (
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-digital" aria-hidden="true" />
                  <a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`} className="hover:text-gold">
                    {settings.phone}
                  </a>
                </li>
              )}
            </ul>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="font-display font-semibold">{t('newsletterTitle')}</p>
              <p className="mt-1 mb-4 text-xs text-white/60">{t('newsletterText')}</p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/55">
            © {year} {settings?.shortName || 'ACIEA'} — {settings?.organizationName}. {t('rights')} · {t('madeIn')}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-white/60">
            <NextLink href={pathFor('/legal', locale)} className="hover:text-gold">{tn('legal')}</NextLink>
            <NextLink href={pathFor('/privacy', locale)} className="hover:text-gold">{tn('privacy')}</NextLink>
            <NextLink href={pathFor('/terms', locale)} className="hover:text-gold">{tn('terms')}</NextLink>
            <a href="/admin" className="hover:text-gold" rel="nofollow">{t('admin')}</a>
            <LanguageSwitcher tone="light" />
          </div>
        </div>
      </div>
    </footer>
  )
}
