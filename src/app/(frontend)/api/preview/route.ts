import { draftMode } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'
import { isStaff } from '@/access/roles'
import { getPayload } from '@/lib/payload'

/** Enables draft preview for authenticated staff only, then redirects to the requested page. */
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') ?? '/fr'
  if (!/^\/(fr|en)(\/[a-z0-9\-/]*)?$/.test(path)) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
  }
  const payload = await getPayload()
  const { user } = await payload.auth({ headers: request.headers })
  if (!isStaff(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  ;(await draftMode()).enable()
  return NextResponse.redirect(new URL(path, request.url))
}
