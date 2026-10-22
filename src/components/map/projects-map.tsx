'use client'

import 'leaflet/dist/leaflet.css'
import type { LatLngBoundsExpression, PathOptions } from 'leaflet'
import * as React from 'react'
import {
  CircleMarker,
  GeoJSON,
  MapContainer,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from 'react-leaflet'

export type MapMarker = {
  id: string
  title: string
  href?: string
  lat: number
  lng: number
  kind: 'project' | 'hq'
  subtitle?: string | null
}

type View = 'bf' | 'wa'

const BOUNDS: Record<View, LatLngBoundsExpression> = {
  bf: [
    [9.3, -5.6],
    [15.2, 2.5],
  ],
  wa: [
    [4.0, -17.8],
    [24.5, 15.5],
  ],
}

function FitBounds({ view }: { view: View }) {
  const map = useMap()
  React.useEffect(() => {
    map.fitBounds(BOUNDS[view], { padding: [12, 12] })
  }, [map, view])
  return null
}

const countryStyle = (feature?: GeoJSON.Feature): PathOptions => {
  const focus = feature?.properties?.focus
  return {
    color: focus ? '#D5AE62' : 'rgba(0,186,137,0.45)',
    weight: focus ? 1.6 : 0.8,
    fillColor: focus ? '#237A57' : '#15262F',
    fillOpacity: focus ? 0.55 : 0.6,
  }
}

export default function ProjectsMap({
  markers,
  labels,
}: {
  markers: MapMarker[]
  labels: { bf: string; wa: string; view: string; open: string }
}) {
  const [geo, setGeo] = React.useState<GeoJSON.FeatureCollection | null>(null)
  const [view, setView] = React.useState<View>('bf')
  const tileUrl = process.env.NEXT_PUBLIC_MAP_TILE_URL
  const attribution = process.env.NEXT_PUBLIC_MAP_ATTRIBUTION

  React.useEffect(() => {
    let cancelled = false
    fetch('/geo/west-africa.json')
      .then((r) => r.json())
      .then((data) => !cancelled && setGeo(data))
      .catch(() => undefined)
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="relative">
      <div
        role="group"
        aria-label={labels.view}
        className="absolute top-3 right-3 z-[500] flex rounded-full bg-night/85 p-1 text-xs font-semibold ring-1 ring-white/15 backdrop-blur"
      >
        {(['bf', 'wa'] as const).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={view === v}
            onClick={() => setView(v)}
            className={`min-h-9 rounded-full px-3 transition-colors ${view === v ? 'bg-digital text-night' : 'text-white/75 hover:text-white'}`}
          >
            {labels[v]}
          </button>
        ))}
      </div>
      <MapContainer
        bounds={BOUNDS.bf}
        scrollWheelZoom={false}
        className="z-0 h-[26rem] w-full rounded-[1.5rem] md:h-[32rem]"
        style={{ background: '#0c181e' }}
        attributionControl={!!tileUrl}
      >
        <FitBounds view={view} />
        {tileUrl && <TileLayer url={tileUrl} attribution={attribution} opacity={0.35} />}
        {geo && (
          <GeoJSON
            data={geo}
            style={countryStyle}
            onEachFeature={(f, layer) =>
              layer.bindTooltip(String(f.properties?.name ?? ''), { sticky: true })
            }
          />
        )}
        {markers.map((m) => (
          <CircleMarker
            key={m.id}
            center={[m.lat, m.lng]}
            radius={m.kind === 'hq' ? 9 : 8}
            pathOptions={{
              color: m.kind === 'hq' ? '#D5AE62' : '#ffffff',
              weight: 2,
              fillColor: m.kind === 'hq' ? '#103D30' : '#00BA89',
              fillOpacity: 1,
            }}
          >
            <Tooltip direction="top" offset={[0, -8]}>
              {m.title}
            </Tooltip>
            <Popup>
              <p className="font-display text-sm font-semibold text-forest">{m.title}</p>
              {m.subtitle && <p className="mt-1 text-xs text-ink-muted">{m.subtitle}</p>}
              {m.href && (
                <a
                  href={m.href}
                  className="mt-2 inline-block text-xs font-semibold text-leaf underline"
                >
                  {labels.open}
                </a>
              )}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
