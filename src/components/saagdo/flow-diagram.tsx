'use client'

import * as React from 'react'
import { Icon } from '@/components/icon'
import { cn } from '@/lib/utils'

type Step = { title: string; description?: string | null; icon?: string | null }

/** Interactive explanatory diagram (not an audited architecture). */
export function FlowDiagram({ steps, disclaimer }: { steps: Step[]; disclaimer: string }) {
  const [active, setActive] = React.useState(0)
  const current = steps[active]
  return (
    <div>
      <div role="tablist" aria-label="SAAGDO" className="relative grid gap-3 md:grid-cols-5">
        <span
          aria-hidden="true"
          className="absolute top-9 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-digital/10 via-digital/60 to-gold/50 md:block"
        />
        {steps.map((s, i) => {
          const selected = i === active
          return (
            <button
              key={s.title}
              role="tab"
              type="button"
              id={`flow-tab-${i}`}
              aria-selected={selected}
              aria-controls="flow-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                  e.preventDefault()
                  const n = (i + 1) % steps.length
                  setActive(n)
                  document.getElementById(`flow-tab-${n}`)?.focus()
                }
                if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                  e.preventDefault()
                  const n = (i - 1 + steps.length) % steps.length
                  setActive(n)
                  document.getElementById(`flow-tab-${n}`)?.focus()
                }
              }}
              className={cn(
                'group relative flex items-center gap-4 rounded-2xl p-4 text-left transition-all md:flex-col md:text-center',
                selected ? 'bg-white/[0.07] ring-1 ring-digital/50' : 'hover:bg-white/[0.04]',
              )}
            >
              <span
                className={cn(
                  'relative grid size-12 shrink-0 place-items-center rounded-2xl transition-all md:size-14',
                  selected
                    ? 'bg-digital text-night shadow-glow'
                    : 'bg-white/8 text-digital ring-1 ring-white/10',
                )}
              >
                <Icon name={s.icon} className="size-6" />
                <span className="absolute -top-2 -right-2 grid size-5 place-items-center rounded-full bg-night text-[0.6rem] font-bold text-gold ring-1 ring-gold/40">
                  {i + 1}
                </span>
              </span>
              <span
                className={cn(
                  'font-display text-sm font-semibold',
                  selected ? 'text-white' : 'text-white/70',
                )}
              >
                {s.title}
              </span>
            </button>
          )
        })}
      </div>
      <div
        id="flow-panel"
        role="tabpanel"
        aria-labelledby={`flow-tab-${active}`}
        className="mt-6 min-h-28 rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10 md:p-8"
      >
        <div key={active} className="animate-fade-in">
          <p className="eyebrow text-gold">
            {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
          </p>
          <p className="mt-2 font-display text-xl font-semibold text-white">{current?.title}</p>
          {current?.description && (
            <p className="mt-2 max-w-3xl leading-relaxed text-white/70">{current.description}</p>
          )}
        </div>
      </div>
      <p className="mt-4 text-xs text-white/50 italic">{disclaimer}</p>
    </div>
  )
}
