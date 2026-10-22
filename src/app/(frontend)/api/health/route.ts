import { NextResponse } from 'next/server'
import { getPayload } from '@/lib/payload'

export const dynamic = 'force-dynamic'

/** Liveness + database readiness probe for Docker / reverse proxy health checks. */
export async function GET() {
  const started = Date.now()
  try {
    const payload = await getPayload()
    await payload.count({ collection: 'domains', overrideAccess: true })
    return NextResponse.json(
      { status: 'ok', db: 'ok', latencyMs: Date.now() - started },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  } catch {
    return NextResponse.json(
      { status: 'error', db: 'unreachable' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}
