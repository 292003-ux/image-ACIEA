import { CmsImage } from '@/components/media/cms-image'
import type { TeamMember } from '@/payload-types'
import { isSafeExternalUrl } from '@/lib/utils'
import { SocialIcon } from '@/components/layout/social-icon'

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-forest/5">
        <CmsImage
          media={member.photo}
          className="absolute inset-0"
          imgClassName="grayscale-[20%] transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
          sizes="(min-width: 1024px) 280px, 50vw"
          placeholderSeed={member.name}
          showProvenance={false}
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-forest">{member.name}</h3>
      {member.position && <p className="text-sm text-ink-muted">{member.position}</p>}
      {member.bio && <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-ink-muted">{member.bio}</p>}
      {isSafeExternalUrl(member.linkedin) && (
        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex text-leaf hover:text-forest" aria-label={`LinkedIn — ${member.name}`}>
          <SocialIcon platform="linkedin" className="size-4" />
        </a>
      )}
    </article>
  )
}
