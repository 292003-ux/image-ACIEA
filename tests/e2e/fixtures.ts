import fs from 'node:fs'
import path from 'node:path'

export const STATE_FILE = path.resolve('test-results/e2e-state.json')

export type E2EState = {
  superToken: string
  editor: { id: number; email: string; password: string }
  contributor: { id: number; email: string; password: string }
  publication?: { id: number; slug: string; documentId: number }
}

export function readState(): E2EState {
  return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')) as E2EState
}

export const ADMIN = {
  email: process.env.SEED_ADMIN_EMAIL || 'admin@aciea.local',
  password: process.env.SEED_ADMIN_PASSWORD || 'Admin-Demo-2026!',
}

/** Minimal but structurally valid one-page PDF (correct xref offsets) used for upload tests. */
export function tinyPdf(): Buffer {
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] /Contents 4 0 R /Resources << >> >>',
    '<< /Length 0 >>\nstream\n\nendstream',
  ]
  let body = '%PDF-1.4\n'
  const offsets: number[] = []
  objects.forEach((obj, i) => {
    offsets.push(Buffer.byteLength(body))
    body += `${i + 1} 0 obj\n${obj}\nendobj\n`
  })
  const xref = Buffer.byteLength(body)
  body += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  for (const o of offsets) body += `${String(o).padStart(10, '0')} 00000 n \n`
  body += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`
  return Buffer.from(body)
}
