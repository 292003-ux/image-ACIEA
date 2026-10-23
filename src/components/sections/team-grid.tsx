import { TeamCard } from '@/components/cards/team-card'
import { Reveal } from '@/components/motion/reveal'
import type { TeamMember } from '@/payload-types'
import { cn } from '@/lib/utils'

export function TeamGrid({ members }: { members: TeamMember[] }) {
  // A small office (e.g. the three officers) stays centred, with an odd last card in the middle.
  const small = members.length <= 3
  return (
    <ul
      className={cn(
        small
          ? 'mx-auto flex max-w-4xl flex-wrap justify-center gap-x-5 gap-y-10 text-center'
          : 'grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4',
      )}
    >
      {members.map((m, i) => (
        <Reveal
          as="li"
          key={m.id}
          delay={(i % 4) * 0.05}
          className={small ? 'w-[calc(50%-0.625rem)] md:w-[calc((100%-2.5rem)/3)]' : undefined}
        >
          <TeamCard member={m} />
        </Reveal>
      ))}
    </ul>
  )
}
