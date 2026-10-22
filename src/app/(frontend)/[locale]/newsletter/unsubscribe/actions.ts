'use server'

import { redirect } from 'next/navigation'
import { getPayload } from '@/lib/payload'

const TOKEN = /^[a-f0-9]{48}$/

/** POST-only unsubscribe: link scanners that prefetch GET URLs cannot unsubscribe people. */
export async function confirmUnsubscribe(formData: FormData) {
  const token = String(formData.get('token') ?? '')
  const back = String(formData.get('back') ?? '/fr')
  const safeBack = back.startsWith('/') && !back.startsWith('//') ? back : '/fr'
  if (!TOKEN.test(token)) redirect(`${safeBack}?status=invalid`)
  const payload = await getPayload()
  const found = await payload.find({
    collection: 'newsletter-subscriptions',
    where: { and: [{ unsubscribeToken: { equals: token } }, { status: { equals: 'subscribed' } }] },
    limit: 1,
    overrideAccess: true,
    depth: 0,
  })
  const sub = found.docs[0]
  if (!sub) redirect(`${safeBack}?status=invalid`)
  await payload.update({
    collection: 'newsletter-subscriptions',
    id: sub.id,
    data: {
      status: 'unsubscribed',
      unsubscribedAt: new Date().toISOString(),
      unsubscribeToken: null,
    },
    overrideAccess: true,
  })
  redirect(`${safeBack}?status=done`)
}
