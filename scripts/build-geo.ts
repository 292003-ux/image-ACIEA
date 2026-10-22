/**
 * Generates public/geo/west-africa.json (country outlines) from Natural Earth
 * data distributed by the `world-atlas` package (public domain).
 *   pnpm tsx scripts/build-geo.ts
 */
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { feature } from 'topojson-client'
import type { Topology } from 'topojson-specification'

const require = createRequire(import.meta.url)
const topo = require('world-atlas/countries-50m.json') as Topology

// ISO 3166-1 numeric codes of West African countries.
const WEST_AFRICA: Record<string, string> = {
  '204': 'Bénin',
  '854': 'Burkina Faso',
  '132': 'Cabo Verde',
  '384': 'Côte d’Ivoire',
  '270': 'Gambie',
  '288': 'Ghana',
  '324': 'Guinée',
  '624': 'Guinée-Bissau',
  '430': 'Liberia',
  '466': 'Mali',
  '478': 'Mauritanie',
  '562': 'Niger',
  '566': 'Nigeria',
  '686': 'Sénégal',
  '694': 'Sierra Leone',
  '768': 'Togo',
}

const all = feature(topo, topo.objects.countries as never) as unknown as GeoJSON.FeatureCollection
const round = (c: unknown): unknown =>
  Array.isArray(c)
    ? typeof c[0] === 'number'
      ? c.map((n: number) => Math.round(n * 1000) / 1000)
      : c.map(round)
    : c
const features = all.features
  .filter((f) => WEST_AFRICA[String(f.id)])
  .map((f) => ({
    type: 'Feature' as const,
    id: String(f.id),
    properties: { name: WEST_AFRICA[String(f.id)], focus: String(f.id) === '854' },
    geometry: { ...f.geometry, coordinates: round((f.geometry as GeoJSON.Polygon).coordinates) },
  }))

const out = path.resolve(process.cwd(), 'public/geo/west-africa.json')
fs.writeFileSync(out, JSON.stringify({ type: 'FeatureCollection', features }))
console.info(
  `Wrote ${features.length} features to ${out} (${(fs.statSync(out).size / 1024).toFixed(0)} KB)`,
)
