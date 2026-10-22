import type { Field, TextField } from 'payload'
import { fieldEditorsOnly } from '@/access/roles'

export const createdByField: Field = {
  name: 'createdBy',
  type: 'relationship',
  relationTo: 'users',
  label: { fr: 'Créé par', en: 'Created by' },
  access: { update: () => false },
  admin: { position: 'sidebar', readOnly: true },
}

/** Lightweight editorial workflow, visible in list views. */
export const reviewStatusField: Field = {
  name: 'reviewStatus',
  type: 'select',
  defaultValue: 'draft',
  label: { fr: 'Validation éditoriale', en: 'Editorial review' },
  options: [
    { value: 'draft', label: { fr: 'Brouillon', en: 'Draft' } },
    { value: 'in-review', label: { fr: 'Soumis à relecture', en: 'In review' } },
    { value: 'changes-requested', label: { fr: 'Modifications demandées', en: 'Changes requested' } },
    { value: 'approved', label: { fr: 'Validé', en: 'Approved' } },
  ],
  admin: {
    position: 'sidebar',
    description: {
      fr: 'Les contributeurs soumettent à relecture ; un éditeur valide et publie.',
      en: 'Contributors submit for review; an editor approves and publishes.',
    },
  },
}

export const reviewNotesField: Field = {
  name: 'reviewNotes',
  type: 'textarea',
  label: { fr: 'Notes de relecture (internes)', en: 'Review notes (internal)' },
  access: { update: fieldEditorsOnly },
  admin: { position: 'sidebar' },
}

export const editorialFields: Field[] = [createdByField, reviewStatusField, reviewNotesField]

/** Source / verification metadata — required for facts presented as documented. */
export const sourceField: TextField = {
  name: 'sourceUrl',
  type: 'text',
  label: { fr: 'Source de vérification (URL)', en: 'Verification source (URL)' },
  admin: {
    description: {
      fr: 'Lien public ou référence interne attestant l’information.',
      en: 'Public link or internal reference supporting the information.',
    },
  },
  validate: (value: unknown) => {
    if (!value) return true
    try {
      const url = new URL(String(value))
      return url.protocol === 'https:' || url.protocol === 'http:' ? true : 'URL invalide'
    } catch {
      return 'URL invalide'
    }
  },
}
