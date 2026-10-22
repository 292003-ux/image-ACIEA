import type { Field } from 'payload'

/** Curated subset of Lucide icons offered to editors. Keep in sync with components/icon.tsx. */
export const ICON_OPTIONS = [
  'thermometer-sun',
  'droplets',
  'leaf',
  'trees',
  'cpu',
  'brain-circuit',
  'microscope',
  'graduation-cap',
  'users',
  'map',
  'satellite',
  'sprout',
  'recycle',
  'sun',
  'shield-check',
  'handshake',
  'globe',
  'line-chart',
  'megaphone',
  'lightbulb',
  'scale',
  'eye',
  'heart-handshake',
  'flask-conical',
] as const

export type IconName = (typeof ICON_OPTIONS)[number]

export const iconField = (name = 'icon'): Field => ({
  name,
  type: 'select',
  label: { fr: 'Icône', en: 'Icon' },
  options: ICON_OPTIONS.map((value) => ({ value, label: value })),
})
