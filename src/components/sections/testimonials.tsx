import { Quote } from 'lucide-react'
import { CmsImage } from '@/components/media/cms-image'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import type { Testimonial } from '@/payload-types'

/** Rendered only when approved testimonials (with written consent) are published. */
export function Testimonials({
  items,
  eyebrow,
  title,
}: {
  items: Testimonial[]
  eyebrow: string
  title: string
}) {
  if (!items.length) return null
  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal as="li" key={t.id} delay={i * 0.06}>
              <figure className="flex h-full flex-col rounded-[var(--radius-card)] bg-white p-8 shadow-soft">
                <Quote className="size-8 text-gold" aria-hidden="true" />
                <blockquote className="mt-5 flex-1 font-serif text-lg leading-relaxed text-forest">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  {t.photo && typeof t.photo === 'object' && (
                    <CmsImage
                      media={t.photo}
                      size="thumbnail"
                      className="size-12 rounded-full"
                      sizes="48px"
                      showProvenance={false}
                    />
                  )}
                  <span>
                    <span className="block font-semibold text-forest">{t.authorName}</span>
                    {t.authorRole && <span className="text-sm text-ink-muted">{t.authorRole}</span>}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
