/**
 * FICTITIOUS DEMO DATA — generated for illustration only.
 * Never mix with real data; never present as measurements.
 */
export type DemoSite = {
  id: string
  name: string
  x: number
  y: number
  kind: 'water' | 'report'
  risk: 'low' | 'medium' | 'high'
}

export const DEMO_SITES: DemoSite[] = [
  { id: 'D-01', name: 'Point fictif A', x: 18, y: 32, kind: 'water', risk: 'low' },
  { id: 'D-02', name: 'Point fictif B', x: 34, y: 58, kind: 'water', risk: 'high' },
  { id: 'D-03', name: 'Point fictif C', x: 52, y: 26, kind: 'water', risk: 'medium' },
  { id: 'D-04', name: 'Point fictif D', x: 66, y: 64, kind: 'water', risk: 'low' },
  { id: 'D-05', name: 'Point fictif E', x: 81, y: 38, kind: 'water', risk: 'medium' },
  { id: 'R-11', name: 'Signalement fictif 1', x: 41, y: 47, kind: 'report', risk: 'high' },
  { id: 'R-12', name: 'Signalement fictif 2', x: 58, y: 78, kind: 'report', risk: 'medium' },
  { id: 'R-13', name: 'Signalement fictif 3', x: 26, y: 76, kind: 'report', risk: 'low' },
]

/** Deterministic pseudo-random series (no Math.random to keep SSR/CSR identical). */
function series(seed: number, base: number, amp: number, n = 12) {
  return Array.from({ length: n }, (_, i) => {
    const v = base + amp * Math.sin((i + seed) * 0.9) + (amp / 2) * Math.cos((i * seed) % 7)
    return Math.round(v * 10) / 10
  })
}

export function monitoringSeries(siteIndex: number) {
  const turbidity = series(siteIndex + 2, 18 + siteIndex * 3, 6)
  const ph = series(siteIndex + 5, 7.1, 0.35)
  return turbidity.map((t, i) => ({ week: `S${i + 1}`, turbidity: t, ph: ph[i] }))
}

export function forecastSeries() {
  const observed = series(3, 42, 9, 8)
  const projected = series(4, 50, 8, 5)
  return [
    ...observed.map((v, i) => ({
      week: `S${i + 1}`,
      observed: v,
      forecast: null as number | null,
    })),
    ...projected.map((v, i) => ({
      week: `S${i + 9}`,
      observed: null as number | null,
      forecast: v,
    })),
  ].map((d, i) => (i === 7 ? { ...d, forecast: d.observed } : d))
}

export const DEMO_RISK_BY_ZONE = [
  { zone: 'Zone A', value: 28 },
  { zone: 'Zone B', value: 64 },
  { zone: 'Zone C', value: 47 },
  { zone: 'Zone D', value: 19 },
  { zone: 'Zone E', value: 55 },
]

export type DemoReport = {
  id: string
  type: 'waste' | 'wastewater' | 'colour' | 'latrine'
  status: 'open' | 'review' | 'done'
  ago: number
}

export const DEMO_REPORTS: DemoReport[] = [
  { id: 'R-13', type: 'waste', status: 'done', ago: 26 },
  { id: 'R-12', type: 'wastewater', status: 'review', ago: 9 },
  { id: 'R-11', type: 'colour', status: 'open', ago: 2 },
]
