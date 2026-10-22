import type { Payload, TaskConfig } from 'payload'

const INBOX_COLLECTIONS = ['contact-submissions', 'partnership-requests'] as const

/** Deletes form submissions older than the retention period configured in Site settings. */
export async function purgeExpiredSubmissions(payload: Payload): Promise<number> {
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
  const months = settings.dataRetentionMonths ?? 24
  const cutoff = new Date()
  cutoff.setMonth(cutoff.getMonth() - months)
  let deleted = 0
  for (const collection of INBOX_COLLECTIONS) {
    const result = await payload.delete({
      collection,
      where: { createdAt: { less_than: cutoff.toISOString() } },
      overrideAccess: true,
    })
    deleted += result.docs.length
  }
  if (deleted > 0) payload.logger.info(`Retention: ${deleted} submission(s) older than ${months} months deleted.`)
  return deleted
}

export const purgeExpiredSubmissionsTask: TaskConfig<{ input: object; output: { deleted: number } }> = {
  slug: 'purgeExpiredSubmissions',
  label: 'Purge expired form submissions',
  schedule: [{ cron: '30 3 * * *', queue: 'maintenance' }],
  handler: async ({ req }) => {
    const deleted = await purgeExpiredSubmissions(req.payload)
    return { output: { deleted } }
  },
}
