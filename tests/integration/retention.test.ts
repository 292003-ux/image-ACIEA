import { describe, expect, it } from 'vitest'
import { purgeExpiredSubmissions } from '@/jobs/purgeExpiredSubmissions'
import { payload } from './helpers'

describe('data retention', () => {
  it('deletes submissions older than the configured period only', async () => {
    const p = await payload()
    await p.updateGlobal({
      slug: 'site-settings',
      data: { organizationName: 'ACIEA', shortName: 'ACIEA', dataRetentionMonths: 12 },
    })
    const old = await p.create({
      collection: 'contact-submissions',
      data: {
        name: 'Ancien',
        email: 'old@test.local',
        subject: 'general',
        message: 'Message ancien à purger.',
      },
    })
    const recent = await p.create({
      collection: 'contact-submissions',
      data: {
        name: 'Récent',
        email: 'new@test.local',
        subject: 'general',
        message: 'Message récent à conserver.',
      },
    })
    // Backdate one record (createdAt is managed by Payload, so update it at the DB level).
    const twoYearsAgo = new Date()
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2)
    await p.db.updateOne({
      collection: 'contact-submissions',
      id: old.id,
      data: { createdAt: twoYearsAgo.toISOString() },
    })

    await purgeExpiredSubmissions(p)

    const remaining = await p.find({
      collection: 'contact-submissions',
      where: { id: { in: [old.id, recent.id] } },
    })
    expect(remaining.docs.map((d) => d.id)).toEqual([recent.id])
  })
})
