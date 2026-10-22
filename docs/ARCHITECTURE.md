# Architecture

## Vue d’ensemble

Une seule application Next.js 16 héberge le site public et Payload CMS 3 (admin + API REST),
adossés à PostgreSQL. Le rendu est dynamique côté serveur (contenus toujours à jour dès publication) ;
les requêtes au CMS passent par l’API locale de Payload (in-process, sans aller-retour HTTP).

```
src/
├── app/
│   ├── (frontend)/[locale]/…   pages publiques (FR/EN), layout, 404, erreurs
│   ├── (frontend)/api/…        santé, prévisualisation des brouillons
│   ├── (payload)/…             admin Payload et API REST (/admin, /api/*)
│   ├── actions/forms.ts        server actions des formulaires (validation, anti-spam, stockage)
│   ├── sitemap.ts, robots.ts
├── collections/ globals/       schéma CMS (19 collections, 5 globals)
├── access/ hooks/ fields/ jobs/ règles d’accès, audit, flux éditorial, champs réutilisables, tâches planifiées
├── components/                 design system et sections (ui, layout, cards, sections, saagdo, map, forms…)
├── i18n/ messages/             routage localisé (next-intl) et libellés d’interface FR/EN
├── lib/                        requêtes CMS, SEO, navigation, validation, sécurité
├── proxy.ts                    redirection de langue + limitation des tentatives de connexion
└── payload.config.ts
scripts/                        seed (contenus vérifiés), génération géographique, sauvegarde/restauration
tests/                          unit, integration (Payload + Postgres), e2e (Playwright + axe)
```

Le choix d’un ORM unique a été fait volontairement : **Payload gère le schéma et les migrations
PostgreSQL (Drizzle)**. Ajouter Prisma en parallèle aurait dupliqué le modèle et les migrations.

## Routes publiques

| FR                                                                                         | EN                                                                               |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| `/fr`                                                                                      | `/en`                                                                            |
| `/fr/a-propos` (+ `/notre-histoire`, `/mission-vision-valeurs`, `/gouvernance`, `/equipe`) | `/en/about` (+ `/our-history`, `/mission-vision-values`, `/governance`, `/team`) |
| `/fr/domaines-intervention/[slug]`                                                         | `/en/focus-areas/[slug]`                                                         |
| `/fr/projets` (+ `/en-cours`, `/acheves`, `/[slug]`)                                       | `/en/projects` (+ `/ongoing`, `/completed`, `/[slug]`)                           |
| `/fr/saagdo`                                                                               | `/en/saagdo`                                                                     |
| `/fr/actualites/[slug]`                                                                    | `/en/news/[slug]`                                                                |
| `/fr/evenements/[slug]`                                                                    | `/en/events/[slug]`                                                              |
| `/fr/publications` (+ `/rapports-et-documents`, `/[slug]`)                                 | `/en/publications` (+ `/reports-and-documents`)                                  |
| `/fr/galerie`                                                                              | `/en/gallery`                                                                    |
| `/fr/partenaires` (+ `/devenir-partenaire`)                                                | `/en/partners` (+ `/become-a-partner`)                                           |
| `/fr/rejoindre-aciea`, `/fr/contact`, `/fr/recherche`                                      | `/en/join-aciea`, `/en/contact`, `/en/search`                                    |
| `/fr/mentions-legales`, `/fr/politique-de-confidentialite`, `/fr/conditions-utilisation`   | `/en/legal-notice`, `/en/privacy-policy`, `/en/terms-of-use`                     |
| `/fr/pages/[slug]` (pages libres)                                                          | `/en/pages/[slug]`                                                               |

Le sélecteur de langue conserve la page courante (les slugs sont communs aux deux langues).

## Modèle de données (Payload)

| Brief                                                         | Implémentation                                                                                               |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| User, Role / permissions                                      | `users` (rôle) + `src/access/roles.ts` + hooks                                                               |
| Page, Navigation                                              | `pages`, globals `homepage`, `about-page`, `saagdo-page`, `navigation`                                       |
| Project, ProjectCategory, ProjectLocation                     | `projects` (relation `domains`, groupe `location` avec coordonnées vérifiées)                                |
| ImpactMetric                                                  | `impact-metrics`                                                                                             |
| Partner, TeamMember                                           | `partners`, `team-members`                                                                                   |
| NewsArticle, Publication, Event                               | `news`, `publications`, `events`                                                                             |
| Media                                                         | `media` (images/vidéos, tailles WebP), `documents` (publics), `submission-files` (privés)                    |
| ContactSubmission, PartnershipRequest, NewsletterSubscription | `contact-submissions`, `partnership-requests`, `newsletter-subscriptions`                                    |
| SiteSettings                                                  | global `site-settings`                                                                                       |
| Translation                                                   | localisation native Payload (champs `localized`, locales `fr`/`en`) + `src/messages/*.json` pour l’interface |
| AuditLog                                                      | `audit-logs` (append-only)                                                                                   |
| (en plus) FAQ, témoignages                                    | `faqs`, `testimonials`                                                                                       |

Contenus éditoriaux : brouillons, versions (30 par document), autosave, publication programmée,
champ `createdBy` et statut de relecture.

## Design system

Tokens définis dans `src/app/(frontend)/globals.css` (`@theme`) : palette (vert forêt `#103D30`,
vert naturel `#237A57`, vert digital `#00BA89`, or `#D5AE62`, ivoire `#F6F7F2`, bleu nuit `#101E25`,
anthracite `#202C28`), couleurs sémantiques (succès, erreur, info, avertissement), échelle
typographique fluide (`text-display`, `text-h1`…`text-lead`), ombres et rayons.
Typographies auto-hébergées : Sora (titres), Inter (texte), Playfair Display (citations).

Composants réutilisables : `Button`, `Badge`, `SectionHeading`, `Section`, `Breadcrumbs` (+ JSON-LD),
`Accordion`, onglets, `EmptyState`, `Skeleton`, `Pagination`, `FilterChips`, champs de formulaire,
cartes (projet, actualité, partenaire, équipe, document, événement, domaine), `PageHero`, `CtaBanner`,
`Milestones`, `KpiCard`, `GalleryGrid` (lightbox), carte Leaflet, maquette et démo SAAGDO.
