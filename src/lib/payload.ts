import 'server-only'
import config from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload as getPayloadInstance } from 'payload'
import { cache } from 'react'

export const getPayload = cache(async () => getPayloadInstance({ config }))

/** True when an editor is previewing drafts (enabled via /api/preview). */
export const isDraft = cache(async () => {
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
})
