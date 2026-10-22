import { Compass } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { TopoLines } from '@/components/decor/topo-lines'
import { ArrowGlyph, buttonVariants } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export default async function NotFound() {
  const t = await getTranslations('notFound')
  return (
    <section className="relative flex min-h-[85dvh] items-center overflow-hidden bg-night pt-28 pb-20 text-white">
      <TopoLines className="absolute inset-0 opacity-50" />
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative container-page text-center">
        <p className="text-gradient-gold font-display text-[clamp(5rem,18vw,11rem)] leading-none font-bold">
          404
        </p>
        <div className="mx-auto mt-4 grid size-14 place-items-center rounded-2xl bg-white/8 text-digital">
          <Compass className="size-7" aria-hidden="true" />
        </div>
        <h1 className="mt-6 text-h2 font-semibold">{t('title')}</h1>
        <p className="mx-auto mt-4 max-w-md text-lead text-white/70">{t('text')}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className={cn(buttonVariants({ variant: 'gold', size: 'lg' }))}>
            {t('home')}
            <ArrowGlyph />
          </Link>
          <Link href="/search" className={cn(buttonVariants({ variant: 'light', size: 'lg' }))}>
            {t('search')}
          </Link>
        </div>
      </div>
    </section>
  )
}
