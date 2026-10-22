import type { CollectionConfig } from 'payload'
import { editorialFields, sourceField } from '@/fields/editorial'
import { seoField } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { contentGroup, editorialCollection } from './_shared'

export const PROJECT_STATUSES = ['planned', 'ongoing', 'completed'] as const
export type ProjectStatus = (typeof PROJECT_STATUSES)[number]

const latitude = (v: unknown) =>
  v === null ||
  v === undefined ||
  (typeof v === 'number' && v >= -90 && v <= 90) ||
  'Latitude invalide'
const longitude = (v: unknown) =>
  v === null ||
  v === undefined ||
  (typeof v === 'number' && v >= -180 && v <= 180) ||
  'Longitude invalide'

export const Projects: CollectionConfig = {
  slug: 'projects',
  ...editorialCollection,
  labels: {
    singular: { fr: 'Projet', en: 'Project' },
    plural: { fr: 'Projets', en: 'Projects' },
  },
  defaultSort: '-startDate',
  admin: {
    useAsTitle: 'title',
    group: contentGroup,
    defaultColumns: ['title', 'status', 'startDate', '_status', 'reviewStatus'],
    listSearchableFields: ['title', 'excerpt', 'slug'],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { fr: 'Présentation', en: 'Overview' },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
              label: { fr: 'Titre', en: 'Title' },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              localized: true,
              maxLength: 400,
              label: { fr: 'Résumé exécutif', en: 'Executive summary' },
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              label: { fr: 'Image de couverture', en: 'Cover image' },
            },
            {
              name: 'context',
              type: 'richText',
              localized: true,
              label: { fr: 'Contexte et justification', en: 'Context and rationale' },
            },
            {
              name: 'objectives',
              type: 'array',
              localized: true,
              label: { fr: 'Objectifs', en: 'Objectives' },
              fields: [
                { name: 'text', type: 'text', required: true, label: { fr: 'Texte', en: 'Text' } },
              ],
            },
            {
              name: 'targetAudience',
              type: 'textarea',
              localized: true,
              label: { fr: 'Public cible', en: 'Target audience' },
            },
            {
              name: 'domains',
              type: 'relationship',
              relationTo: 'domains',
              hasMany: true,
              label: { fr: 'Domaines d’intervention', en: 'Focus areas' },
            },
          ],
        },
        {
          label: { fr: 'Calendrier & lieu', en: 'Timeline & location' },
          fields: [
            {
              name: 'status',
              type: 'select',
              // Avoid a clash with the `_status` (draft/published) enum.
              enumName: 'enum_projects_project_status',
              required: true,
              defaultValue: 'ongoing',
              label: { fr: 'Statut', en: 'Status' },
              options: [
                { value: 'planned', label: { fr: 'En préparation', en: 'Planned' } },
                { value: 'ongoing', label: { fr: 'En cours', en: 'Ongoing' } },
                { value: 'completed', label: { fr: 'Achevé', en: 'Completed' } },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'startDate',
                  type: 'date',
                  label: { fr: 'Date de lancement', en: 'Start date' },
                },
                { name: 'endDate', type: 'date', label: { fr: 'Date de fin', en: 'End date' } },
              ],
            },
            {
              name: 'location',
              type: 'group',
              label: { fr: 'Localisation', en: 'Location' },
              fields: [
                {
                  name: 'scope',
                  type: 'select',
                  defaultValue: 'local',
                  label: { fr: 'Échelle', en: 'Scale' },
                  options: [
                    { value: 'local', label: { fr: 'Locale', en: 'Local' } },
                    { value: 'national', label: { fr: 'Nationale', en: 'National' } },
                    { value: 'regional', label: { fr: 'Afrique de l’Ouest', en: 'West Africa' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'locality',
                      type: 'text',
                      label: { fr: 'Commune / localité', en: 'Municipality / locality' },
                    },
                    { name: 'region', type: 'text', label: { fr: 'Région', en: 'Region' } },
                    {
                      name: 'country',
                      type: 'text',
                      defaultValue: 'Burkina Faso',
                      label: { fr: 'Pays', en: 'Country' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'latitude', type: 'number', validate: latitude, label: 'Latitude' },
                    { name: 'longitude', type: 'number', validate: longitude, label: 'Longitude' },
                  ],
                },
                {
                  name: 'coordinatesVerified',
                  type: 'checkbox',
                  defaultValue: false,
                  label: {
                    fr: 'Coordonnées vérifiées (requis pour afficher sur la carte)',
                    en: 'Coordinates verified (required to appear on the map)',
                  },
                },
              ],
            },
          ],
        },
        {
          label: { fr: 'Activités & résultats', en: 'Activities & results' },
          fields: [
            {
              name: 'activities',
              type: 'array',
              localized: true,
              label: { fr: 'Activités', en: 'Activities' },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  label: { fr: 'Activité', en: 'Activity' },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: { fr: 'Description', en: 'Description' },
                },
              ],
            },
            {
              name: 'achievements',
              type: 'array',
              localized: true,
              label: { fr: 'Réalisations vérifiées', en: 'Verified achievements' },
              admin: {
                description: {
                  fr: 'Seules les réalisations cochées « vérifiée » sont affichées publiquement.',
                  en: 'Only achievements marked “verified” are displayed publicly.',
                },
              },
              fields: [
                { name: 'text', type: 'text', required: true, label: { fr: 'Texte', en: 'Text' } },
                {
                  name: 'verified',
                  type: 'checkbox',
                  defaultValue: false,
                  label: { fr: 'Vérifié', en: 'Verified' },
                },
                sourceField,
              ],
            },
            {
              name: 'indicators',
              type: 'array',
              localized: true,
              label: { fr: 'Indicateurs', en: 'Indicators' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      label: { fr: 'Libellé', en: 'Label' },
                    },
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                      label: { fr: 'Valeur', en: 'Value' },
                    },
                    { name: 'unit', type: 'text', label: { fr: 'Unité', en: 'Unit' } },
                  ],
                },
                {
                  name: 'verified',
                  type: 'checkbox',
                  defaultValue: false,
                  label: { fr: 'Vérifié', en: 'Verified' },
                },
                sourceField,
              ],
            },
          ],
        },
        {
          label: { fr: 'Partenaires & ressources', en: 'Partners & resources' },
          fields: [
            {
              name: 'partners',
              type: 'relationship',
              relationTo: 'partners',
              hasMany: true,
              label: { fr: 'Partenaires', en: 'Partners' },
            },
            {
              name: 'gallery',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              label: { fr: 'Galerie photo', en: 'Photo gallery' },
            },
            {
              name: 'documents',
              type: 'upload',
              relationTo: 'documents',
              hasMany: true,
              label: { fr: 'Documents', en: 'Documents' },
            },
            {
              name: 'links',
              type: 'array',
              localized: true,
              label: { fr: 'Liens associés', en: 'Related links' },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: { fr: 'Libellé', en: 'Label' },
                },
                { name: 'url', type: 'text', required: true, label: 'URL' },
              ],
            },
            {
              name: 'relatedNews',
              type: 'relationship',
              relationTo: 'news',
              hasMany: true,
              label: { fr: 'Actualités liées', en: 'Related news' },
            },
          ],
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: { fr: 'Mettre en avant sur l’accueil', en: 'Feature on homepage' },
      admin: { position: 'sidebar' },
    },
    slugField(),
    seoField,
    ...editorialFields,
  ],
}
