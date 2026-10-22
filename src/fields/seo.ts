import type { Field } from 'payload'

export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: { fr: 'Référencement (SEO)', en: 'SEO' },
  admin: {
    description: {
      fr: 'Facultatif : remplace le titre et le résumé dans les moteurs de recherche et réseaux sociaux.',
      en: 'Optional: overrides title and summary for search engines and social networks.',
    },
  },
  fields: [
    { name: 'metaTitle', type: 'text', localized: true, maxLength: 70, label: 'Meta title' },
    {
      name: 'metaDescription',
      type: 'textarea',
      localized: true,
      maxLength: 170,
      label: 'Meta description',
    },
    { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'Image Open Graph' },
    {
      name: 'noIndex',
      type: 'checkbox',
      defaultValue: false,
      label: { fr: 'Exclure des moteurs de recherche', en: 'Exclude from search engines' },
    },
  ],
}
