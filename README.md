# ACIEA — site institutionnel et plateforme éditoriale

Site web bilingue (FR/EN) de l’**ACIEA — Alliance for Climate Innovation and Ecological Action**
(Alliance pour l’innovation climatique et l’action écologique), organisation à but non lucratif basée
à Ouagadougou (Burkina Faso).

Le projet réunit dans une seule application :

- un **site public** premium (accueil immersif, À propos, domaines d’intervention, catalogue de projets
  avec carte, page SAAGDO interactive, actualités, événements, publications, galerie, partenaires, contact) ;
- une **interface d’administration** complète (Payload CMS) : contenus bilingues, brouillons, relecture,
  publication programmée, médias, demandes reçues, rôles et journal d’audit ;
- des **formulaires sécurisés** (contact, partenariat avec pièce jointe, newsletter).

| Domaine         | Technologies                                                               |
| --------------- | -------------------------------------------------------------------------- |
| Application     | Next.js 16 (App Router), React 19, TypeScript strict                       |
| CMS & API       | Payload CMS 3 (intégré à Next.js), PostgreSQL 16, migrations versionnées   |
| Interface       | Tailwind CSS 4, primitives Radix (style shadcn/ui), Lucide, animations CSS |
| i18n            | next-intl (URL localisées `/fr/...`, `/en/...`, hreflang)                  |
| Formulaires     | React Hook Form + Zod (validation client **et** serveur)                   |
| Carte / graphes | Leaflet (contours Natural Earth auto-hébergés), Recharts                   |
| Qualité         | ESLint, Prettier, Vitest (unitaires + intégration), Playwright + axe       |
| Déploiement     | Docker (image standalone), Docker Compose, Caddy (HTTPS automatique)       |

## Démarrage rapide (local)

```bash
cp .env.example .env              # puis renseigner DATABASE_URL et PAYLOAD_SECRET
docker compose -f docker-compose.dev.yml up -d   # PostgreSQL local (ou un Postgres existant)
pnpm install
PAYLOAD_DB_PUSH=true pnpm seed    # schéma + contenus vérifiés + premier super administrateur
pnpm dev                          # http://localhost:3000  — administration : /admin
```

Le premier compte est créé par le seed si `SEED_ADMIN_EMAIL` et `SEED_ADMIN_PASSWORD` sont définis,
sinon via l’écran de création de compte de `/admin`.

## Documentation

| Document                                                 | Contenu                                                                         |
| -------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [docs/INSTALLATION.md](docs/INSTALLATION.md)             | Installation locale, variables d’environnement, commandes                       |
| [docs/DEPLOIEMENT.md](docs/DEPLOIEMENT.md)               | VPS Ubuntu + Docker + Caddy, migrations, sauvegarde, restauration, mises à jour |
| [docs/ADMINISTRATION.md](docs/ADMINISTRATION.md)         | Guide de l’interface d’administration et des rôles                              |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)             | Architecture, routes, modèle de données, design system                          |
| [docs/SECURITE.md](docs/SECURITE.md)                     | Mesures de sécurité et de confidentialité                                       |
| [docs/CONTENUS-A-VALIDER.md](docs/CONTENUS-A-VALIDER.md) | Contenus publiés, sources, éléments à valider ou compléter                      |
| [docs/QUALITE-ET-LIMITES.md](docs/QUALITE-ET-LIMITES.md) | Résultats des tests réellement exécutés, services externes, limites connues     |

## Principes éditoriaux appliqués

- **Aucun contenu inventé** : seuls des faits documentés sont publiés (page Facebook officielle de l’ACIEA,
  annonce officielle du GWP Afrique de l’Ouest). Chaque fait daté renvoie à sa source.
- **Pas de faux chiffres** : les indicateurs d’impact ne s’affichent que s’ils sont publiés **avec** une
  date de vérification et un responsable de validation (règle appliquée côté serveur).
- **Démonstration SAAGDO** clairement étiquetée « données fictives ».
- **Traductions anglaises** signalées comme non validées tant que l’ACIEA ne les a pas approuvées.
