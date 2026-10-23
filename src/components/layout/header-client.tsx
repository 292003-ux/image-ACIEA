'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { ChevronDown, Menu, X } from 'lucide-react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { Icon } from '@/components/icon'
import { ArrowGlyph, buttonVariants } from '@/components/ui/button'
import type { ResolvedLink } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './language-switcher'

type Props = {
  items: ResolvedLink[]
  logo: React.ReactNode
  logoDark: React.ReactNode
  homeHref: string
  ctaHref: string
}

function isActive(pathname: string, href: string) {
  if (href.split('/').length <= 2) return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

function NavLink({
  link,
  className,
  onNavigate,
}: {
  link: ResolvedLink
  className?: string
  onNavigate?: () => void
}) {
  const t = useTranslations('common')
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {link.label}
        <span className="sr-only"> {t('openInNewTab')}</span>
      </a>
    )
  }
  return (
    <NextLink href={link.href} className={className} onClick={onNavigate}>
      {link.label}
    </NextLink>
  )
}

function DesktopItem({
  item,
  pathname,
  solid,
}: {
  item: ResolvedLink
  pathname: string
  solid: boolean
}) {
  const tc = useTranslations('common')
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLLIElement>(null)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  // A mouse user's hover already opened the menu: the following click must not close it.
  const openedByHover = React.useRef(false)
  const id = React.useId()
  const active =
    isActive(pathname, item.href) || !!item.children?.some((c) => isActive(pathname, c.href))
  const mega = (item.children?.length ?? 0) > 5 || item.children?.some((c) => c.icon)

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onClick = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  // Close the menu when the route changes (state reset during render, no effect needed).
  const [prevPath, setPrevPath] = React.useState(pathname)
  if (prevPath !== pathname) {
    setPrevPath(pathname)
    setOpen(false)
  }

  const base = cn(
    'relative inline-flex h-10 items-center gap-1 rounded-full px-2.5 text-[0.875rem] font-medium whitespace-nowrap transition-colors 2xl:px-3',
    solid
      ? 'text-ink hover:bg-forest/6 hover:text-forest'
      : 'text-white/85 hover:bg-white/10 hover:text-white',
    active && (solid ? 'text-forest' : 'text-white'),
  )
  const indicator = active && (
    <span
      aria-hidden="true"
      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold"
    />
  )

  if (!item.children?.length) {
    return (
      <li>
        <NavLink link={item} className={base} />
        {indicator}
      </li>
    )
  }

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        if (closeTimer.current) clearTimeout(closeTimer.current)
        setOpen(true)
        openedByHover.current = true
      }}
      onMouseLeave={() => {
        openedByHover.current = false
        closeTimer.current = setTimeout(() => setOpen(false), 140)
      }}
    >
      <button
        type="button"
        className={base}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          if (openedByHover.current) {
            openedByHover.current = false
            setOpen(true)
            return
          }
          setOpen((o) => !o)
        }}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={cn('size-3.5 transition-transform duration-300', open && 'rotate-180')}
        />
        {indicator}
      </button>
      <div
        id={id}
        className={cn(
          'absolute top-full left-1/2 z-50 pt-3 transition-all duration-300 ease-[var(--ease-out-soft)]',
          mega ? 'w-[min(46rem,90vw)]' : 'w-80',
          open
            ? 'visible -translate-x-1/2 translate-y-0 opacity-100'
            : 'invisible -translate-x-1/2 -translate-y-1 opacity-0',
        )}
      >
        <div className="overflow-hidden rounded-2xl border border-forest/8 bg-white/98 p-2 shadow-lift backdrop-blur-xl">
          <ul className={cn('grid gap-1', mega && 'grid-cols-2')}>
            {item.children.map((child) => (
              <li key={child.href}>
                <NextLink
                  href={child.href}
                  className={cn(
                    'group flex gap-3 rounded-xl p-3 transition-colors hover:bg-ivory focus-visible:bg-ivory',
                    isActive(pathname, child.href) && 'bg-ivory',
                  )}
                >
                  {child.icon && (
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-leaf-50 text-leaf transition-colors group-hover:bg-forest group-hover:text-gold">
                      <Icon name={child.icon} className="size-5" />
                    </span>
                  )}
                  <span>
                    <span className="block font-display text-sm font-semibold text-forest">
                      {child.label}
                    </span>
                    {child.description && (
                      <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink-muted">
                        {child.description}
                      </span>
                    )}
                  </span>
                </NextLink>
              </li>
            ))}
          </ul>
          {!item.children!.some((c) => c.href === item.href) && (
            <div className="mt-1 flex items-center justify-between rounded-xl bg-forest px-4 py-3 text-white">
              <span className="text-xs text-white/70">{item.label}</span>
              <NextLink
                href={item.href}
                className="group/btn inline-flex items-center gap-1.5 text-sm font-semibold text-gold"
              >
                <span>{tc('seeAll')}</span>
                <ArrowGlyph className="size-3.5" />
              </NextLink>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export function HeaderClient({ items, logo, logoDark, homeHref, ctaHref }: Props) {
  const pathname = usePathname()
  const t = useTranslations('nav')
  const tc = useTranslations('common')
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [expanded, setExpanded] = React.useState<string | null>(null)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const [prevPath, setPrevPath] = React.useState(pathname)
  if (prevPath !== pathname) {
    setPrevPath(pathname)
    setMobileOpen(false)
  }

  const solid = scrolled

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-500',
        solid
          ? 'border-b border-forest/8 bg-ivory/85 shadow-[0_8px_30px_-20px_rgb(16_61_48/0.35)] backdrop-blur-xl'
          : 'bg-gradient-to-b from-night/55 to-transparent',
      )}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
        <NextLink href={homeHref} className="shrink-0 rounded-full" aria-label="ACIEA — accueil">
          {solid ? logoDark : logo}
        </NextLink>

        <nav aria-label={t('mainNav')} className="hidden xl:block">
          <ul className="flex items-center">
            {items.map((item) => (
              <DesktopItem
                key={item.href + item.label}
                item={item}
                pathname={pathname}
                solid={solid}
              />
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher tone={solid ? 'dark' : 'light'} className="hidden sm:flex" />
          <NextLink
            href={ctaHref}
            className={cn(
              buttonVariants({ variant: solid ? 'primary' : 'gold', size: 'sm' }),
              'hidden md:inline-flex',
            )}
          >
            {t('collaborate')}
            <ArrowGlyph />
          </NextLink>

          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger
              className={cn(
                'grid size-11 place-items-center rounded-full xl:hidden',
                solid
                  ? 'bg-forest text-white'
                  : 'bg-white/10 text-white ring-1 ring-white/20 backdrop-blur',
              )}
              aria-label={t('openMenu')}
            >
              <Menu className="size-5" aria-hidden="true" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="data-[state=open]:animate-in fixed inset-0 z-50 bg-night/60 backdrop-blur-sm" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col overflow-hidden bg-forest text-white shadow-2xl outline-none">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-grid opacity-40"
                />
                <div className="relative flex h-[4.5rem] items-center justify-between px-5">
                  <Dialog.Title className="sr-only">{t('mainNav')}</Dialog.Title>
                  <Dialog.Description className="sr-only">ACIEA</Dialog.Description>
                  {logo}
                  <Dialog.Close
                    className="grid size-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/20"
                    aria-label={t('closeMenu')}
                  >
                    <X className="size-5" aria-hidden="true" />
                  </Dialog.Close>
                </div>
                <nav
                  aria-label={t('mainNav')}
                  className="relative flex-1 overflow-y-auto px-5 pb-8"
                >
                  <ul className="divide-y divide-white/10 border-y border-white/10">
                    {items.map((item) => {
                      const hasChildren = !!item.children?.length
                      const isOpen = expanded === item.href
                      return (
                        <li key={item.href + item.label}>
                          {hasChildren ? (
                            <>
                              <button
                                type="button"
                                className="flex min-h-14 w-full items-center justify-between py-3 text-left font-display text-lg font-semibold"
                                aria-expanded={isOpen}
                                onClick={() => setExpanded(isOpen ? null : item.href)}
                              >
                                {item.label}
                                <ChevronDown
                                  aria-hidden="true"
                                  className={cn(
                                    'size-5 text-gold transition-transform',
                                    isOpen && 'rotate-180',
                                  )}
                                />
                              </button>
                              <div
                                className={cn(
                                  'grid transition-all duration-300',
                                  isOpen ? 'grid-rows-[1fr] pb-3' : 'grid-rows-[0fr]',
                                )}
                              >
                                <ul className="overflow-hidden">
                                  {(item.children!.some((c) => c.href === item.href)
                                    ? item.children!
                                    : [{ label: tc('seeAll'), href: item.href }, ...item.children!]
                                  ).map((child) => (
                                    <li key={child.href}>
                                      <NextLink
                                        href={child.href}
                                        className={cn(
                                          'flex min-h-11 items-center rounded-lg px-3 text-[0.95rem] text-white/80 hover:bg-white/8 hover:text-white',
                                          pathname === child.href && 'bg-white/8 text-white',
                                        )}
                                        tabIndex={isOpen ? 0 : -1}
                                      >
                                        {child.label}
                                      </NextLink>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          ) : (
                            <NavLink
                              link={item}
                              className={cn(
                                'flex min-h-14 items-center py-3 font-display text-lg font-semibold',
                                isActive(pathname, item.href) && 'text-gold',
                              )}
                            />
                          )}
                        </li>
                      )
                    })}
                  </ul>
                  <div className="mt-8 flex flex-col gap-4">
                    <NextLink
                      href={ctaHref}
                      className={cn(buttonVariants({ variant: 'gold', size: 'lg' }), 'w-full')}
                    >
                      {t('collaborate')}
                      <ArrowGlyph />
                    </NextLink>
                    <LanguageSwitcher tone="light" className="self-center" />
                  </div>
                </nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  )
}
