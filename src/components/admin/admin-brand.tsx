/* Branding for the Payload admin (login screen, navigation and dashboard). */
import type { ServerProps } from 'payload'

const Mark = ({ size }: { size: number }) => (
  <svg viewBox="0 0 44 44" width={size} height={size} aria-hidden="true">
    <circle cx="22" cy="22" r="21" fill="#103D30" />
    <path d="M22 9c6 5 8 11 4 18-2 3-4 5-4 8 0-3-2-5-4-8-4-7-2-13 4-18Z" fill="#00BA89" />
    <circle cx="22" cy="22" r="17" fill="none" stroke="#D5AE62" strokeWidth=".8" />
  </svg>
)

type Copy = { fr: string; en: string }
const t = (props: ServerProps, copy: Copy) => (props.i18n?.language === 'en' ? copy.en : copy.fr)

export function AdminLogo() {
  return (
    <div className="aciea-logo">
      <Mark size={52} />
      <div>
        <div className="aciea-logo__name">ACIEA</div>
        <div className="aciea-logo__tagline">Administration du site</div>
      </div>
    </div>
  )
}

export function AdminIcon() {
  return <Mark size={28} />
}

/** Branded side panel and heading on the login screen (the panel is hidden on small screens). */
export function AdminLoginPanel(props: ServerProps) {
  return (
    <>
      <aside className="aciea-login-panel" aria-hidden="true">
        <div className="aciea-login-panel__brand">
          <Mark size={44} />
          <span>ACIEA</span>
        </div>
        <div className="aciea-login-panel__text">
          <p className="aciea-login-panel__title">
            {t(props, { fr: 'Espace d’administration', en: 'Administration area' })}
          </p>
          <p>
            {t(props, {
              fr: 'Gérez les actualités, projets, événements et demandes reçues de l’association.',
              en: 'Manage the association’s news, projects, events and incoming requests.',
            })}
          </p>
        </div>
        <p className="aciea-login-panel__foot">
          Alliance for Climate Innovation and Ecological Action
        </p>
      </aside>
      <h1 className="aciea-login-heading">{t(props, { fr: 'Connexion', en: 'Sign in' })}</h1>
    </>
  )
}

/** Logo at the top of the navigation. */
export function AdminNavBrand() {
  return (
    <div className="aciea-nav-brand">
      <Mark size={32} />
      <span>ACIEA</span>
    </div>
  )
}

/** "View site" link at the bottom of the navigation. */
export function AdminViewSiteLink(props: ServerProps) {
  return (
    <a className="aciea-view-site" href="/" target="_blank" rel="noopener">
      {t(props, { fr: 'Voir le site', en: 'View site' })} ↗
    </a>
  )
}

const shortcuts: { slug: string; create: boolean; icon: string; label: Copy }[] = [
  {
    slug: 'news',
    create: true,
    icon: '＋',
    label: { fr: 'Publier une actualité', en: 'Publish a news item' },
  },
  {
    slug: 'events',
    create: true,
    icon: '＋',
    label: { fr: 'Ajouter un événement', en: 'Add an event' },
  },
  {
    slug: 'media',
    create: true,
    icon: '＋',
    label: { fr: 'Ajouter des photos', en: 'Upload photos' },
  },
  {
    slug: 'contact-submissions',
    create: false,
    icon: '✉',
    label: { fr: 'Lire les messages reçus', en: 'Read incoming messages' },
  },
]

/** Greeting and shortcuts to the most common tasks, shown above the dashboard cards. */
export function AdminWelcome(props: ServerProps) {
  const { user, permissions, payload } = props
  const adminRoute = payload.config.routes.admin
  const name = typeof user?.name === 'string' ? user.name.trim().split(/\s+/)[0] : ''
  const allowed = shortcuts.filter((s) => {
    const p = permissions?.collections?.[s.slug]
    return s.create ? p?.create : p?.read
  })

  return (
    <section className="aciea-welcome">
      <div className="aciea-welcome__hero">
        <div>
          <h1 className="aciea-welcome__title">
            {t(props, { fr: 'Bonjour', en: 'Hello' })}
            {name ? ` ${name}` : ''}
          </h1>
          <p className="aciea-welcome__lead">
            {t(props, {
              fr: 'Que voulez-vous faire aujourd’hui ?',
              en: 'What would you like to do today?',
            })}
          </p>
        </div>
        <a className="aciea-welcome__site" href="/" target="_blank" rel="noopener">
          {t(props, { fr: 'Voir le site', en: 'View site' })} ↗
        </a>
      </div>
      {allowed.length > 0 && (
        <ul className="aciea-welcome__shortcuts">
          {allowed.map((s) => (
            <li key={s.slug}>
              <a
                className="aciea-shortcut"
                href={`${adminRoute}/collections/${s.slug}${s.create ? '/create' : ''}`}
              >
                <span className="aciea-shortcut__icon" aria-hidden="true">
                  {s.icon}
                </span>
                {t(props, s.label)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
