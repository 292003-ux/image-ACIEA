import { Mail } from 'lucide-react'
import { SocialIcon } from '@/components/layout/social-icon'

/** Plain share links (no third-party scripts). */
export function ShareLinks({ url, title, label }: { url: string; title: string; label: string }) {
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  const links = [
    {
      name: 'LinkedIn',
      icon: <SocialIcon platform="linkedin" className="size-4" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    },
    {
      name: 'Facebook',
      icon: <SocialIcon platform="facebook" className="size-4" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    },
    {
      name: 'WhatsApp',
      icon: <SocialIcon platform="whatsapp" className="size-4" />,
      href: `https://wa.me/?text=${t}%20${u}`,
    },
    {
      name: 'Email',
      icon: <Mail className="size-4" aria-hidden="true" />,
      href: `mailto:?subject=${t}&body=${u}`,
    },
  ]
  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm text-ink-muted">{label}</span>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="grid size-10 place-items-center rounded-full bg-white text-forest shadow-soft ring-1 ring-forest/8 transition-colors hover:bg-forest hover:text-white"
        >
          {l.icon}
          <span className="sr-only">{l.name}</span>
        </a>
      ))}
    </div>
  )
}
