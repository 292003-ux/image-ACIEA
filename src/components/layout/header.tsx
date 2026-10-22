import type { Locale } from '@/i18n/routing'
import { pathFor, resolveHeaderNav } from '@/lib/navigation'
import { getDomains, getNavigation, getSiteSettings } from '@/lib/queries'
import { HeaderClient } from './header-client'
import { Logo } from './logo'

export async function Header({ locale }: { locale: Locale }) {
  const [settings, nav, domains] = await Promise.all([
    getSiteSettings(locale),
    getNavigation(locale),
    getDomains(locale),
  ])
  const items = await resolveHeaderNav(locale, nav, domains)
  const logoProps = {
    logo: settings?.logo,
    shortName: settings?.shortName || 'ACIEA',
    tagline: settings?.organizationName,
  }
  return (
    <HeaderClient
      items={items}
      logo={<Logo {...logoProps} tone="light" compact />}
      logoDark={<Logo {...logoProps} tone="dark" compact />}
      homeHref={pathFor('/', locale)}
      ctaHref={pathFor('/partners/become', locale)}
      searchHref={pathFor('/search', locale)}
    />
  )
}
