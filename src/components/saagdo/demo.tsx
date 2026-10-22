'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Activity, BarChart3, FlaskConical, Map as MapIcon, Plus, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { cn } from '@/lib/utils'
import {
  DEMO_REPORTS,
  DEMO_RISK_BY_ZONE,
  DEMO_SITES,
  type DemoReport,
  forecastSeries,
  monitoringSeries,
} from './demo-data'

const RISK_COLOR = { low: '#00BA89', medium: '#D5AE62', high: '#E0705A' }
const axis = { stroke: 'rgba(255,255,255,0.35)', fontSize: 11, tickLine: false, axisLine: false }
const tooltipStyle = {
  contentStyle: { background: '#15262F', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, color: '#fff', fontSize: 12 },
  labelStyle: { color: '#D5AE62' },
}

function FictitiousTag() {
  const t = useTranslations('common')
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wider text-gold uppercase ring-1 ring-gold/30">
      <FlaskConical className="size-3" aria-hidden="true" />
      {t('fictitious')}
    </span>
  )
}

function Panel({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-2xl bg-white/[0.035] p-5 ring-1 ring-white/8', className)}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold tracking-wider text-white/60 uppercase">{title}</p>
        <FictitiousTag />
      </div>
      {children}
    </div>
  )
}

function DemoMap({
  layers,
  selected,
  onSelect,
}: {
  layers: { water: boolean; reports: boolean; risk: boolean }
  selected?: string
  onSelect?: (id: string) => void
}) {
  const tc = useTranslations('common')
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#0b161b] ring-1 ring-white/8">
      <svg viewBox="0 0 100 62.5" className="absolute inset-0 size-full" aria-hidden="true">
        {Array.from({ length: 10 }, (_, i) => (
          <path key={i} d={`M0 ${6 + i * 6.5} Q 28 ${1 + i * 6.5} 50 ${9 + i * 6.5} T 100 ${5 + i * 6.5}`} fill="none" stroke="#00BA89" strokeOpacity=".1" strokeWidth=".3" />
        ))}
        <path d="M5 50 C 20 42, 30 46, 42 32 S 66 16, 96 14" fill="none" stroke="#3aa0d8" strokeOpacity=".6" strokeWidth="1" />
        <path d="M24 62 C 32 52, 38 44, 42 32" fill="none" stroke="#3aa0d8" strokeOpacity=".4" strokeWidth=".7" />
        {layers.risk && (
          <>
            <ellipse cx="36" cy="34" rx="12" ry="8" fill="#E0705A" fillOpacity=".14" stroke="#E0705A" strokeOpacity=".4" strokeWidth=".3" strokeDasharray="1 1" />
            <ellipse cx="80" cy="24" rx="9" ry="6" fill="#D5AE62" fillOpacity=".12" stroke="#D5AE62" strokeOpacity=".4" strokeWidth=".3" strokeDasharray="1 1" />
          </>
        )}
      </svg>
      {DEMO_SITES.filter((s) => (s.kind === 'water' ? layers.water : layers.reports)).map((s) => {
        const isSel = s.id === selected
        const Comp = onSelect ? 'button' : 'span'
        return (
          <Comp
            key={s.id}
            {...(onSelect ? { type: 'button' as const, onClick: () => onSelect(s.id), 'aria-pressed': isSel, 'aria-label': `${s.name} (${s.id})` } : {})}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            {s.kind === 'water' ? (
              <span className={cn('block size-3 rounded-full ring-2 ring-[#0b161b] transition-transform', isSel && 'scale-150 ring-white')} style={{ background: RISK_COLOR[s.risk] }} />
            ) : (
              <span className={cn('block size-3 rotate-45 rounded-[2px] ring-2 ring-[#0b161b] transition-transform', isSel && 'scale-150 ring-white')} style={{ background: RISK_COLOR[s.risk] }} />
            )}
          </Comp>
        )
      })}
      <span className="absolute right-3 bottom-3 rounded-md bg-night/80 px-2 py-1 text-[0.6rem] text-white/60">
        {tc('fictitious')}
      </span>
    </div>
  )
}

export function SaagdoDemo() {
  const t = useTranslations('saagdo')
  const td = useTranslations('saagdo.demo')
  const [site, setSite] = React.useState('D-02')
  const [layers, setLayers] = React.useState({ water: true, reports: true, risk: true })
  const [reports, setReports] = React.useState<DemoReport[]>(DEMO_REPORTS)
  const [added, setAdded] = React.useState(false)
  const siteIndex = Math.max(0, DEMO_SITES.findIndex((s) => s.id === site))
  const data = React.useMemo(() => monitoringSeries(siteIndex), [siteIndex])
  const forecast = React.useMemo(() => forecastSeries(), [])
  const waterSites = DEMO_SITES.filter((s) => s.kind === 'water')

  const tabs = [
    { value: 'monitoring', icon: Activity },
    { value: 'mapping', icon: MapIcon },
    { value: 'analysis', icon: BarChart3 },
    { value: 'participation', icon: Users },
  ] as const

  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-night-800 ring-1 ring-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
      <Tabs.Root defaultValue="monitoring">
        <div className="flex flex-col gap-4 border-b border-white/8 p-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-semibold tracking-[0.2em] text-white">SAAGDO</span>
            <span className="text-xs text-white/40">demo</span>
          </div>
          <Tabs.List aria-label={t('demoTitle')} className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 md:pb-0">
            {tabs.map(({ value, icon: I }) => (
              <Tabs.Trigger
                key={value}
                value={value}
                className="flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium text-white/65 transition-colors hover:text-white data-[state=active]:bg-digital data-[state=active]:text-night"
              >
                <I className="size-4" aria-hidden="true" />
                {t(`tabs.${value}`)}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>

        <div className="p-4 md:p-6">
          <Tabs.Content value="monitoring" className="grid gap-4 outline-none lg:grid-cols-3">
            <Panel title={td('selectSite')} className="lg:col-span-1">
              <ul className="space-y-2">
                {waterSites.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setSite(s.id)}
                      aria-pressed={s.id === site}
                      className={cn(
                        'flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-sm transition-colors',
                        s.id === site ? 'bg-white/10 text-white ring-1 ring-digital/40' : 'text-white/70 hover:bg-white/5',
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="size-2.5 rounded-full" style={{ background: RISK_COLOR[s.risk] }} />
                        {s.name}
                      </span>
                      <span className="font-mono text-xs text-white/40">{s.id}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel title={`${td('turbidity')} · ${td('ph')}`} className="lg:col-span-2">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 10, left: -18, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="week" {...axis} />
                    <YAxis yAxisId="t" {...axis} />
                    <YAxis yAxisId="p" orientation="right" domain={[6, 8.5]} {...axis} />
                    <Tooltip {...tooltipStyle} />
                    <Line yAxisId="t" type="monotone" dataKey="turbidity" name={td('turbidity')} stroke="#00BA89" strokeWidth={2.2} dot={false} />
                    <Line yAxisId="p" type="monotone" dataKey="ph" name={td('ph')} stroke="#D5AE62" strokeWidth={2} dot={false} strokeDasharray="5 4" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-xs text-white/60">
                <span className="flex items-center gap-2"><span className="h-0.5 w-5 bg-digital" />{td('turbidity')}</span>
                <span className="flex items-center gap-2"><span className="h-0.5 w-5 border-t-2 border-dashed border-gold" />{td('ph')}</span>
              </div>
            </Panel>
          </Tabs.Content>

          <Tabs.Content value="mapping" className="grid gap-4 outline-none lg:grid-cols-3">
            <Panel title={t('tabs.mapping')} className="lg:col-span-2">
              <DemoMap layers={layers} selected={site} onSelect={setSite} />
            </Panel>
            <Panel title="Couches / Layers">
              <fieldset className="space-y-2">
                <legend className="sr-only">Layers</legend>
                {(
                  [
                    ['water', td('layerWater')],
                    ['reports', td('layerReports')],
                    ['risk', td('layerRisk')],
                  ] as const
                ).map(([key, label]) => (
                  <label key={key} className="flex min-h-11 cursor-pointer items-center justify-between rounded-xl px-3 text-sm text-white/80 hover:bg-white/5">
                    {label}
                    <input
                      type="checkbox"
                      checked={layers[key]}
                      onChange={(e) => setLayers((l) => ({ ...l, [key]: e.target.checked }))}
                      className="size-5 accent-[#00BA89]"
                    />
                  </label>
                ))}
              </fieldset>
              <div className="mt-5 space-y-2 border-t border-white/8 pt-4 text-xs text-white/60">
                {(['low', 'medium', 'high'] as const).map((r) => (
                  <p key={r} className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ background: RISK_COLOR[r] }} />
                    {td(r === 'low' ? 'riskLow' : r === 'medium' ? 'riskMedium' : 'riskHigh')}
                  </p>
                ))}
              </div>
            </Panel>
          </Tabs.Content>

          <Tabs.Content value="analysis" className="grid gap-4 outline-none lg:grid-cols-2">
            <Panel title={td('riskIndex')}>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DEMO_RISK_BY_ZONE} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="zone" {...axis} />
                    <YAxis {...axis} domain={[0, 100]} />
                    <Tooltip {...tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                    <Bar dataKey="value" name={td('riskIndex')} radius={[6, 6, 0, 0]}>
                      {DEMO_RISK_BY_ZONE.map((z) => (
                        <Cell key={z.zone} fill={z.value > 55 ? '#E0705A' : z.value > 35 ? '#D5AE62' : '#00BA89'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Panel>
            <Panel title={td('forecast')}>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecast} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="obs" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#00BA89" stopOpacity={0.45} />
                        <stop offset="1" stopColor="#00BA89" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="week" {...axis} />
                    <YAxis {...axis} />
                    <Tooltip {...tooltipStyle} />
                    <Area type="monotone" dataKey="observed" name={td('observed')} stroke="#00BA89" fill="url(#obs)" strokeWidth={2} connectNulls={false} />
                    <Area type="monotone" dataKey="forecast" name={td('forecast')} stroke="#D5AE62" fill="transparent" strokeDasharray="6 4" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Panel>
          </Tabs.Content>

          <Tabs.Content value="participation" className="grid gap-4 outline-none lg:grid-cols-5">
            <Panel title={td('reports')} className="lg:col-span-3">
              <ul className="divide-y divide-white/8">
                {reports.map((r) => (
                  <li key={r.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs text-white/40">{r.id}</span>
                      <span className="text-white/85">{td(`reportTypes.${r.type}`)}</span>
                    </span>
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-1 text-[0.7rem] font-semibold',
                        r.status === 'open' && 'bg-[#E0705A]/15 text-[#f3a493]',
                        r.status === 'review' && 'bg-gold/15 text-gold',
                        r.status === 'done' && 'bg-digital/15 text-digital-300',
                      )}
                    >
                      {td(r.status === 'open' ? 'statusOpen' : r.status === 'review' ? 'statusReview' : 'statusDone')}
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel title={td('contribute')} className="lg:col-span-2">
              <p className="text-sm leading-relaxed text-white/65">{td('contributeHelp')}</p>
              <button
                type="button"
                onClick={() => {
                  setReports((rs) => {
                    const next: DemoReport = { id: `R-${14 + rs.length - 3}`, type: 'latrine', status: 'open', ago: 0 }
                    return [next, ...rs].slice(0, 6)
                  })
                  setAdded(true)
                }}
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-digital px-5 text-sm font-semibold text-night transition-colors hover:bg-digital-300"
              >
                <Plus className="size-4" aria-hidden="true" />
                {td('contribute')}
              </button>
              <p aria-live="polite" className="mt-3 text-xs text-digital-300">
                {added ? td('added') : ''}
              </p>
            </Panel>
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  )
}
