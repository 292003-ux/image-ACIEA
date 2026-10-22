import { APIError, type CollectionConfig } from 'payload'
import { editorialFields, sourceField } from '@/fields/editorial'
import { iconField } from '@/fields/icon'
import { editorialCollection, institutionGroup } from './_shared'

export const ImpactMetrics: CollectionConfig = {
  slug: 'impact-metrics',
  ...editorialCollection,
  hooks: {
    ...editorialCollection.hooks,
    beforeChange: [
      ...editorialCollection.hooks.beforeChange,
      ({ data }) => {
        // A public figure must be traceable.
        if (data?._status === 'published' && (!data.verificationDate || !data.verifiedBy)) {
          throw new APIError(
            'Un indicateur ne peut être publié sans date de vérification ni responsable de validation.',
            400,
            undefined,
            true,
          )
        }
        return data
      },
    ],
  },
  labels: {
    singular: { fr: 'Indicateur d’impact', en: 'Impact metric' },
    plural: { fr: 'Indicateurs d’impact', en: 'Impact metrics' },
  },
  defaultSort: 'order',
  admin: {
    useAsTitle: 'label',
    group: institutionGroup,
    defaultColumns: ['label', 'value', 'verificationDate', '_status'],
    description: {
      fr: 'Seuls les indicateurs publiés, vérifiés et datés apparaissent sur le site.',
      en: 'Only published, verified and dated metrics appear on the website.',
    },
  },
  fields: [
    { name: 'label', type: 'text', required: true, localized: true, label: { fr: 'Libellé', en: 'Label' } },
    {
      type: 'row',
      fields: [
        { name: 'value', type: 'number', required: true, label: { fr: 'Valeur', en: 'Value' } },
        { name: 'unit', type: 'text', localized: true, label: { fr: 'Unité / suffixe', en: 'Unit / suffix' } },
      ],
    },
    { name: 'description', type: 'textarea', localized: true, label: { fr: 'Précision', en: 'Details' } },
    { name: 'period', type: 'text', localized: true, label: { fr: 'Période couverte', en: 'Period covered' } },
    iconField(),
    {
      type: 'row',
      fields: [
        { name: 'verifiedBy', type: 'text', label: { fr: 'Validé par', en: 'Verified by' } },
        { name: 'verificationDate', type: 'date', label: { fr: 'Date de vérification', en: 'Verification date' } },
      ],
    },
    sourceField,
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    ...editorialFields,
  ],
}
