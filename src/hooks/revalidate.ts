import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

/** Single cache tag for every public CMS read (see src/lib/queries.ts). */
export const CMS_CACHE_TAG = 'cms'

/**
 * Expires the public cache whenever editorial content changes, so publications
 * are visible immediately. Outside a Next.js request (seed script, background jobs)
 * the call is a no-op and the time-based revalidation of the cache applies.
 */
async function expireCmsCache() {
  try {
    const { revalidateTag } = await import('next/cache')
    revalidateTag(CMS_CACHE_TAG, { expire: 0 })
  } catch {
    // Not running inside a Next.js request context.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc }) => {
  await expireCmsCache()
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await expireCmsCache()
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc }) => {
  await expireCmsCache()
  return doc
}
