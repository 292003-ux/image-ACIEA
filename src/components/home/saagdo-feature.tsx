import NextLink from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Reveal } from '@/components/motion/reveal'
import { SaagdoMockup } from '@/components/saagdo/mockup'
import { SaagdoScreens } from '@/components/saagdo/screens'
import { Badge } from '@/components/ui/badge'
import { ArrowGlyph, buttonVariants } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/section-heading'
import type { Locale } from '@/i18n/routing'
import { pathFor } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import type { Media } from '@/payload-types'

export async function SaagdoFeature({
  locale,
  title,
  text,
  screens,
}: {
  locale: Locale
  title?: string | null
  text?: string | null
  /** Real screenshots; the illustrative mock-up is shown until they are set. */
  screens?: { platform: Media | null; app: Media | null }
}) {
  const t = await getTranslations({ locale, namespace: 'home' })
  const tc = await getTranslations({ locale, namespace: 'common' })
  const fr = locale === 'fr'
  return (
    <section
      className="relative isolate overflow-hidden bg-night py-24 text-white md:py-32"
      aria-labelledby="saagdo-home-title"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
      <div
        aria-hidden="true"
        className="absolute top-1/3 -left-40 -z-10 size-[36rem] rounded-full bg-digital/12 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-20 bottom-0 -z-10 size-[28rem] rounded-full bg-leaf/20 blur-[120px]"
      />
      <div className="container-page grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            id="saagdo-home-title"
            tone="dark"
            eyebrow={t('saagdoEyebrow')}
            title={
              title ? (
                title
              ) : (
                <>
                  <span className="text-digital">SAAGDO</span> —{' '}
                  {fr
                    ? 'l’innovation numérique au service de la surveillance environnementale.'
                    : 'digital innovation for environmental monitoring.'}
                </>
              )
            }
            description={text}
          />
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <NextLink
              href={pathFor('/saagdo', locale)}
              className={cn(buttonVariants({ variant: 'digital', size: 'lg' }))}
            >
              {t('saagdoCta')}
              <ArrowGlyph />
            </NextLink>
            <Badge tone="night">
              {fr ? 'Partenariat GWP-AO · 3 juillet 2026' : 'GWP-WA partnership · 3 July 2026'}
            </Badge>
          </div>
        </div>
        <Reveal className="lg:col-span-6" delay={0.1}>
          {screens?.platform ? (
            <SaagdoScreens platform={screens.platform} app={screens.app} />
          ) : (
            <SaagdoMockup label={tc('fictitious')} locale={locale} />
          )}
        </Reveal>
      </div>
    </section>
  )
}
