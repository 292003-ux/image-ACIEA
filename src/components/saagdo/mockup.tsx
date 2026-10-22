import { cn } from '@/lib/utils'

/** Fictitious points used purely for illustration (normalised 0–100 coordinates). */
const POINTS = [
  { x: 22, y: 30, level: 'low' },
  { x: 38, y: 55, level: 'high' },
  { x: 55, y: 28, level: 'medium' },
  { x: 68, y: 62, level: 'low' },
  { x: 80, y: 40, level: 'medium' },
  { x: 47, y: 74, level: 'low' },
  { x: 30, y: 80, level: 'medium' },
] as const

const COLORS = { low: '#00BA89', medium: '#D5AE62', high: '#E0705A' }

/** Visual mock-up of the SAAGDO interface. Decorative and explicitly labelled as fictitious. */
export function SaagdoMockup({ label, locale, className }: { label: string; locale: string; className?: string }) {
  const fr = locale === 'fr'
  return (
    <div className={cn('relative mx-auto w-full max-w-xl', className)} role="img" aria-label={fr ? 'Maquette illustrative de l’interface SAAGDO avec des données fictives' : 'Illustrative mock-up of the SAAGDO interface with fictitious data'}>
      {/* Dashboard window */}
      <div className="relative overflow-hidden rounded-[1.75rem] bg-night-800 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="ml-3 font-display text-xs font-semibold tracking-[0.2em] text-white/70">SAAGDO</span>
          </div>
          <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-gold uppercase ring-1 ring-gold/30">
            {label}
          </span>
        </div>
        <div className="grid grid-cols-5 gap-0">
          <div className="relative col-span-3 aspect-[4/3.4] overflow-hidden border-r border-white/8 bg-[#0c181e]">
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" preserveAspectRatio="none" aria-hidden="true">
              {Array.from({ length: 8 }, (_, i) => (
                <path
                  key={i}
                  d={`M0 ${15 + i * 11} Q 30 ${5 + i * 11} 50 ${18 + i * 11} T 100 ${12 + i * 11}`}
                  fill="none"
                  stroke="#00BA89"
                  strokeOpacity=".12"
                  strokeWidth=".4"
                />
              ))}
              <path d="M10 70 C 25 60, 35 66, 48 52 S 70 30, 92 26" fill="none" stroke="#3aa0d8" strokeOpacity=".55" strokeWidth="1.3" />
              <path d="M30 95 C 40 80, 44 72, 48 52" fill="none" stroke="#3aa0d8" strokeOpacity=".4" strokeWidth=".9" />
              <circle cx="38" cy="55" r="14" fill="#E0705A" fillOpacity=".09" stroke="#E0705A" strokeOpacity=".35" strokeDasharray="1.5 1.5" strokeWidth=".4" />
            </svg>
            <div aria-hidden="true" className="absolute top-1/2 left-1/2 size-[140%] -translate-x-1/2 -translate-y-1/2 animate-sweep rounded-full bg-[conic-gradient(from_0deg,rgba(0,186,137,0.22),transparent_18%)] motion-reduce:hidden" />
            {POINTS.map((p, i) => (
              <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                <span className="absolute inset-0 -m-1.5 animate-pulse-dot rounded-full" style={{ background: COLORS[p.level], animationDelay: `${i * 0.35}s` }} />
                <span className="relative block size-2.5 rounded-full ring-2 ring-night-800" style={{ background: COLORS[p.level] }} />
              </span>
            ))}
          </div>
          <div className="col-span-2 flex flex-col gap-3 p-4">
            <div className="rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/8">
              <p className="text-[0.6rem] tracking-wider text-white/50 uppercase">{fr ? 'Indice de risque' : 'Risk index'}</p>
              <div className="mt-2 flex items-end gap-1" aria-hidden="true">
                {[30, 45, 38, 60, 52, 72, 48].map((h, i) => (
                  <span key={i} className="flex-1 rounded-sm" style={{ height: `${h * 0.5}px`, background: h > 58 ? '#E0705A' : h > 44 ? '#D5AE62' : '#00BA89' }} />
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/8">
              <p className="text-[0.6rem] tracking-wider text-white/50 uppercase">{fr ? 'Signalements' : 'Reports'}</p>
              <ul className="mt-2 space-y-1.5" aria-hidden="true">
                {['#E0705A', '#D5AE62', '#00BA89'].map((c, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full" style={{ background: c }} />
                    <span className="h-1.5 flex-1 rounded bg-white/10" style={{ maxWidth: `${80 - i * 18}%` }} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto rounded-xl bg-digital/10 p-3 ring-1 ring-digital/25">
              <p className="text-[0.6rem] tracking-wider text-digital-300 uppercase">{fr ? 'Aide à la décision' : 'Decision support'}</p>
              <span aria-hidden="true" className="mt-2 block h-1.5 w-3/4 rounded bg-digital/40" />
              <span aria-hidden="true" className="mt-1.5 block h-1.5 w-1/2 rounded bg-digital/25" />
            </div>
          </div>
        </div>
      </div>
      {/* Phone */}
      <div className="absolute -bottom-10 -left-4 w-36 rotate-[-6deg] overflow-hidden rounded-[1.6rem] bg-night p-1.5 shadow-2xl ring-1 ring-white/15 sm:-left-10 sm:w-40">
        <div className="overflow-hidden rounded-[1.25rem] bg-[#0c181e]">
          <div className="mx-auto mt-1.5 h-1 w-10 rounded-full bg-white/15" />
          <div className="p-3">
            <p className="font-display text-[0.6rem] font-semibold tracking-[0.18em] text-white/80">SAAGDO</p>
            <div className="mt-2 aspect-square rounded-lg bg-[radial-gradient(circle_at_40%_45%,rgba(0,186,137,0.35),transparent_60%)] ring-1 ring-white/10" aria-hidden="true">
              <span className="relative top-[44%] left-[38%] block size-2 rounded-full bg-gold ring-2 ring-night" />
            </div>
            <span aria-hidden="true" className="mt-2 block h-1.5 w-4/5 rounded bg-white/15" />
            <span aria-hidden="true" className="mt-1.5 block h-1.5 w-3/5 rounded bg-white/10" />
            <span aria-hidden="true" className="mt-3 block rounded-md bg-digital py-1.5 text-center text-[0.55rem] font-semibold text-night">
              {fr ? 'Signaler' : 'Report'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
