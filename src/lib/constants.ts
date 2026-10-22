/** Constants shared by the CMS schema, server actions and client components (no server imports here). */
export const CONTACT_SUBJECTS = ['general', 'partnership', 'saagdo', 'media', 'join', 'other'] as const

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
