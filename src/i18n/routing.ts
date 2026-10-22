import { defineRouting } from 'next-intl/routing'

export const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'fr'

/**
 * Localised, SEO-friendly public URLs.
 * Keys are the internal routes (folder structure under app/(frontend)/[locale]);
 * values are the public paths per language.
 */
export const pathnames = {
  '/': '/',
  '/about': { fr: '/a-propos', en: '/about' },
  '/about/history': { fr: '/a-propos/notre-histoire', en: '/about/our-history' },
  '/about/mission': { fr: '/a-propos/mission-vision-valeurs', en: '/about/mission-vision-values' },
  '/about/governance': { fr: '/a-propos/gouvernance', en: '/about/governance' },
  '/about/team': { fr: '/a-propos/equipe', en: '/about/team' },
  '/domains': { fr: '/domaines-intervention', en: '/focus-areas' },
  '/domains/[slug]': { fr: '/domaines-intervention/[slug]', en: '/focus-areas/[slug]' },
  '/projects': { fr: '/projets', en: '/projects' },
  '/projects/ongoing': { fr: '/projets/en-cours', en: '/projects/ongoing' },
  '/projects/completed': { fr: '/projets/acheves', en: '/projects/completed' },
  '/projects/[slug]': { fr: '/projets/[slug]', en: '/projects/[slug]' },
  '/saagdo': '/saagdo',
  '/news': { fr: '/actualites', en: '/news' },
  '/news/[slug]': { fr: '/actualites/[slug]', en: '/news/[slug]' },
  '/events': { fr: '/evenements', en: '/events' },
  '/events/[slug]': { fr: '/evenements/[slug]', en: '/events/[slug]' },
  '/publications': '/publications',
  '/publications/reports': {
    fr: '/publications/rapports-et-documents',
    en: '/publications/reports-and-documents',
  },
  '/publications/[slug]': '/publications/[slug]',
  '/gallery': { fr: '/galerie', en: '/gallery' },
  '/partners': { fr: '/partenaires', en: '/partners' },
  '/partners/become': { fr: '/partenaires/devenir-partenaire', en: '/partners/become-a-partner' },
  '/join': { fr: '/rejoindre-aciea', en: '/join-aciea' },
  '/contact': '/contact',
  '/search': { fr: '/recherche', en: '/search' },
  '/legal': { fr: '/mentions-legales', en: '/legal-notice' },
  '/privacy': { fr: '/politique-de-confidentialite', en: '/privacy-policy' },
  '/terms': { fr: '/conditions-utilisation', en: '/terms-of-use' },
  '/newsletter/unsubscribe': {
    fr: '/newsletter/desinscription',
    en: '/newsletter/unsubscribe',
  },
  '/pages/[slug]': '/pages/[slug]',
} as const

export type AppPathname = keyof typeof pathnames
export type StaticPathname = Exclude<AppPathname, `${string}[slug]${string}`>

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  pathnames,
})

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value)
}
