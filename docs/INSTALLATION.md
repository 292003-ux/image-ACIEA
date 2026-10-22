# Installation locale

## Prérequis

- Node.js ≥ 20.9 (22 recommandé) et pnpm 10 (`corepack enable`)
- PostgreSQL 16 (local, ou via `docker compose -f docker-compose.dev.yml up -d`)

## Étapes

```bash
pnpm install
cp .env.example .env
```

Renseigner au minimum dans `.env` :

| Variable                                   | Exemple / rôle                                                    |
| ------------------------------------------ | ----------------------------------------------------------------- |
| `DATABASE_URL`                             | `postgres://aciea:aciea_dev@localhost:5432/aciea`                 |
| `PAYLOAD_SECRET`                           | chaîne aléatoire ≥ 32 caractères (`openssl rand -hex 32`)         |
| `NEXT_PUBLIC_SERVER_URL`                   | `http://localhost:3000`                                           |
| `PAYLOAD_DB_PUSH`                          | `true` en local uniquement (synchronise le schéma sans migration) |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | premier super administrateur créé par le seed                     |

Puis :

```bash
pnpm seed      # crée le schéma (mode push), importe les contenus vérifiés et les photos
pnpm dev       # http://localhost:3000 (site) — http://localhost:3000/admin (administration)
```

Le seed est **idempotent** : il peut être relancé pour réinitialiser les contenus d’origine sans créer de doublons.

## Commandes utiles

| Commande                    | Description                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| `pnpm dev`                  | serveur de développement                                                                   |
| `pnpm build` / `pnpm start` | build de production / serveur de production                                                |
| `pnpm lint` / `pnpm format` | ESLint / Prettier                                                                          |
| `pnpm typecheck`            | génération des types de routes + `tsc --noEmit`                                            |
| `pnpm test`                 | tests unitaires (Vitest)                                                                   |
| `pnpm test:integration`     | tests d’intégration Payload sur une base dédiée (`TEST_DATABASE_URL`, défaut `aciea_test`) |
| `pnpm test:e2e`             | tests end-to-end Playwright (+ audits axe)                                                 |
| `pnpm generate:types`       | régénère `src/payload-types.ts` après modification du schéma                               |
| `pnpm generate:importmap`   | régénère l’import map de l’admin Payload                                                   |
| `pnpm migrate:create <nom>` | crée une migration après modification du schéma                                            |
| `pnpm migrate`              | applique les migrations                                                                    |
| `pnpm geo:build`            | régénère `public/geo/west-africa.json` (contours Natural Earth)                            |

## Tests end-to-end

```bash
pnpm build && pnpm start &                       # ou pnpm dev
E2E_BASE_URL=http://localhost:3000 pnpm test:e2e
```

Les tests créent puis suppriment leurs propres données (comptes éditeur/contributeur, publication PDF,
messages de test). Ils nécessitent le super administrateur du seed (`SEED_ADMIN_*`).
Pour utiliser un Chromium déjà installé : `PLAYWRIGHT_CHROMIUM_PATH=/chemin/vers/chrome`.

## Modifier le schéma de données

1. Modifier une collection dans `src/collections/` ou un global dans `src/globals/`.
2. `pnpm generate:types` puis `pnpm generate:importmap` si des composants admin changent.
3. `pnpm migrate:create description-du-changement` et committer le fichier généré dans `src/migrations/`.
4. En production, `pnpm migrate` est exécuté automatiquement par le service `migrate` de Docker Compose.

> Note : quand `pnpm seed` est lancé alors que le site tourne déjà, les pages publiques se mettent à jour
> dans les 5 minutes (cache), ou immédiatement après n’importe quel enregistrement dans l’administration.
