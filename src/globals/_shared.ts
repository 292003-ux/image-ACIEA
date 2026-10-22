import type { Field, GlobalConfig } from 'payload'
import { adminsOnly, anyone, editorsOnly } from '@/access/roles'
import { auditGlobalAfterChange } from '@/hooks/audit'

export const pageGlobal = {
  access: { read: anyone, update: editorsOnly },
  hooks: { afterChange: [auditGlobalAfterChange] },
  admin: { group: { fr: 'Pages du site', en: 'Site pages' } },
  versions: { drafts: true, max: 20 },
} satisfies Partial<GlobalConfig>

export const settingsGlobal = {
  access: { read: anyone, update: adminsOnly },
  hooks: { afterChange: [auditGlobalAfterChange] },
  admin: { group: { fr: 'Paramètres', en: 'Settings' } },
} satisfies Partial<GlobalConfig>

export const localizedText = (name: string, label: { fr: string; en: string }, extra: Partial<Field> = {}): Field =>
  ({ name, type: 'text', localized: true, label, ...extra }) as Field

export const localizedTextarea = (name: string, label: { fr: string; en: string }, extra: Partial<Field> = {}): Field =>
  ({ name, type: 'textarea', localized: true, label, ...extra }) as Field

export const heroGroup = (name = 'hero'): Field => ({
  name,
  type: 'group',
  label: { fr: 'En-tête de page', en: 'Page header' },
  fields: [
    localizedText('eyebrow', { fr: 'Surtitre', en: 'Eyebrow' }),
    localizedText('title', { fr: 'Titre', en: 'Title' }),
    localizedTextarea('subtitle', { fr: 'Sous-titre', en: 'Subtitle' }),
    { name: 'image', type: 'upload', relationTo: 'media', label: { fr: 'Image', en: 'Image' } },
  ],
})
