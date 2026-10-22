import { TeamCard } from '@/components/cards/team-card'
import { Reveal } from '@/components/motion/reveal'
import type { TeamMember } from '@/payload-types'
import { cn } from '@/lib/utils'

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <ul
      className={cn(
        'grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3',
        // A small office (e.g. the three officers) stays in one balanced row.
        members.length > 3 ? 'lg:grid-cols-4' : 'max-w-4xl',
      )}
    >
      {members.map((m, i) => (
        <Reveal as="li" key={m.id} delay={(i % 4) * 0.05}>
          <TeamCard member={m} />
        </Reveal>
      ))}
    </ul>
  )
}
