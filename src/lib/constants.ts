/** Constants shared by the CMS schema, server actions and client components (no server imports here). */
export const CONTACT_SUBJECTS = [
  'general',
  'partnership',
  'saagdo',
  'media',
  'join',
  'other',
] as const

export const COLLABORATION_TYPES = [
  'institutional',
  'technical',
  'scientific',
  'financial',
  'technological',
  'community',
  'saagdo',
  'other',
] as const

export const SUBMISSION_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const

export const SUBMISSION_FILE_MAX_BYTES = 5 * 1024 * 1024

export const TEAM_GROUPS = ['board', 'executive', 'team', 'advisors'] as const

export const NEWS_CATEGORIES = [
  'institutional',
  'partnership',
  'field',
  'event',
  'statement',
  'innovation',
] as const

export const PUBLICATION_TYPES = [
  'report',
  'study',
  'technical-note',
  'guide',
  'scientific',
  'press-release',
  'public-document',
] as const
