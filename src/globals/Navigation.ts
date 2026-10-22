import type { Field, GlobalConfig } from 'payload'
import { settingsGlobal } from './_shared'

/** Internal routes editors may link to (keys of src/i18n/routing.ts pathnames). */
export const NAV_ROUTES = [
  '/',
  '/about',
  '/about/history',
  '/about/mission',
  '/about/governance',
  '/about/team',
  '/domains',
  '/projects',
  '/projects/ongoing',
  '/projects/completed',
  '/saagdo',
  '/news',
  '/events',
  '/publications',
  '/publications/reports',
  '/gallery',
  '/partners',
  '/partners/become',
  '/join',
  '/contact',
  '/search',
  '/legal',
  '/privacy',
  '/terms',
] as const

const linkFields: Field[] = [
  { name: 'label', type: 'text', required: true, localized: true, label: { fr: 'Libellé', en: 'Label' } },
  {
    type: 'row',
    fields: [
      {
        name: 'route',
        type: 'select',
        label: { fr: 'Page interne', en: 'Internal page' },
        options: NAV_ROUTES.map((value) => ({ value, label: value })),
      },
      { name: 'url', type: 'text', label: { fr: 'ou URL externe', en: 'or external URL' } },
    ],
  },
  { name: 'description', type: 'text', localized: true, label: { fr: 'Description (sous-menu)', en: 'Description (submenu)' } },
]

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  ...settingsGlobal,
  label: { fr: 'Menus', en: 'Menus' },
  admin: {
    ...settingsGlobal.admin,
    description: {
      fr: 'Laissez vide pour utiliser la navigation par défaut du site.',
      en: 'Leave empty to use the default site navigation.',
    },
  },
  fields: [
    {
      name: 'header',
      type: 'array',
      label: { fr: 'Menu principal', en: 'Main menu' },
      maxRows: 9,
      fields: [
        ...linkFields,
        { name: 'children', type: 'array', label: { fr: 'Sous-menu', en: 'Submenu' }, fields: linkFields },
      ],
    },
    {
      name: 'footerColumns',
      type: 'array',
      label: { fr: 'Colonnes du pied de page', en: 'Footer columns' },
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'links', type: 'array', fields: linkFields },
      ],
    },
  ],
}
