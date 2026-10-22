import { getPayload, type Payload } from 'payload'
import config from '@/payload.config'

let instance: Payload | null = null

export async function payload(): Promise<Payload> {
  if (!instance) instance = await getPayload({ config })
  return instance
}

export async function makeUser(role: 'superadmin' | 'admin' | 'editor' | 'contributor') {
  const p = await payload()
  const email = `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}@test.local`
  const user = await p.create({
    collection: 'users',
    data: { email, password: 'Test-Password-123!', name: role, role },
  })
  return { ...user, collection: 'users' as const }
}
