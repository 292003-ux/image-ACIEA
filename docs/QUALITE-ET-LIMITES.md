# Qualité, résultats des tests et limites connues

Toutes les valeurs ci-dessous ont été **réellement mesurées** le 22/10/2026 dans l’environnement de
développement (conteneur Linux 4 vCPU, PostgreSQL 16 local, build de production Next.js en mode
`standalone`, Chromium headless). Elles ne préjugent pas des mesures sur le serveur de production.

## Vérifications automatiques

| Vérification                                       | Commande                    | Résultat                  |
| -------------------------------------------------- | --------------------------- | ------------------------- |
| Lint (ESLint, règles Next + TS)                    | `pnpm lint`                 | 0 erreur, 0 avertissement |
| Types (TypeScript strict)                          | `pnpm typecheck`            | 0 erreur                  |
| Build de production                                | `pnpm build`                | réussi (55 routes)        |
| Tests unitaires (Vitest)                           | `pnpm test`                 | **23 / 23** réussis       |
| Tests d’intégration (Payload + PostgreSQL)         | `pnpm test:integration`     | **15 / 15** réussis       |
| Tests end-to-end (Playwright, build de production) | `pnpm test:e2e`             | **69 / 69** réussis       |
| Migration initiale sur base vierge + seed          | `pnpm migrate && pnpm seed` | réussis                   |

### Couverture des parcours demandés

| Parcours                                            | Test                                                                                                                                                                      |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Naviguer entre toutes les pages                  | `navigation.spec.ts` (24 pages FR, H1 unique, `lang`)                                                                                                                     |
| 2. Ouvrir le menu mobile                            | `mobile.spec.ts` (ouverture, navigation, fermeture clavier)                                                                                                               |
| 3. Changer de langue                                | `i18n.spec.ts` (page conservée, bandeau de traduction)                                                                                                                    |
| 4–6. Rechercher, filtrer, consulter un projet       | `projects.spec.ts` (recherche, statut, domaine, fiche, carte sans requête tierce, gabarit non public)                                                                     |
| 7. Lire une actualité                               | `content.spec.ts` (lecture, source, JSON-LD, filtres)                                                                                                                     |
| 8. Télécharger une publication                      | `content.spec.ts` (PDF réel créé puis supprimé par les tests)                                                                                                             |
| 9. Formulaire de contact                            | `forms.spec.ts` (validation, enregistrement vérifié via l’API admin, honeypot)                                                                                            |
| 10. Demande de partenariat                          | `forms.spec.ts` (pièce jointe PDF stockée en privé, non accessible publiquement ; fichier déguisé refusé)                                                                 |
| 11. Connexion à l’administration                    | `admin.spec.ts` (interface de connexion)                                                                                                                                  |
| 12–13. Créer un brouillon, publier avec le bon rôle | `admin.spec.ts` (contributeur → brouillon non public ; publication refusée ; éditeur publie)                                                                              |
| 14. Modification non autorisée impossible           | `admin.spec.ts` + `permissions.test.ts` (anonyme, contributeur, réglages, données personnelles)                                                                           |
| 15. Rendu sur les tailles d’écran                   | `mobile.spec.ts` (aucun défilement horizontal à 320, 375, 430, 768, 1024, 1440, 1920 px sur 5 pages)                                                                      |
| Accessibilité                                       | `a11y.spec.ts` (axe WCAG 2.0/2.1/2.2 A-AA : 0 violation sérieuse ou critique sur 8 pages ; lien d’évitement) — audit manuel axe complémentaire sur 20 pages : 0 violation |
| Sécurité                                            | `permissions.test.ts`, `retention.test.ts`, en-têtes HTTP (`navigation.spec.ts`)                                                                                          |

Défauts trouvés **et corrigés** grâce à ces tests : horodatage anti-spam non transmis (messages
légitimes rejetés), identifiants HTML dupliqués, menu desktop refermé par un clic après survol,
débordement horizontal à 320 px (page SAAGDO), contrastes insuffisants (or foncé, mentions « facultatif »),
listes de définitions invalides, codes HTTP 200 sur les pages 404 (streaming), boucle de redirection
avec `HOSTNAME` fixé sur une IP.

## Lighthouse (build de production, mesure locale)

| Page      | Mode    | Performance | Accessibilité | Bonnes pratiques | SEO | LCP   | CLS   | TBT      |
| --------- | ------- | ----------- | ------------- | ---------------- | --- | ----- | ----- | -------- |
| Accueil   | desktop | 94          | 100           | 96*              | 100 | 1,2 s | 0     | 130 ms   |
| SAAGDO    | desktop | 98          | 100           | 96*              | 100 | 0,9 s | 0     | 70 ms    |
| Projets   | desktop | 99          | 99            | 96*              | 100 | 0,9 s | 0,038 | 20 ms    |
| À propos  | desktop | 94          | 100           | 96*              | 100 | 1,3 s | 0     | 90 ms    |
| Actualité | desktop | 99          | 100           | 96*              | 100 | 0,9 s | 0     | 20 ms    |
| Accueil   | mobile  | 53          | 100           | 100              | 100 | 5,2 s | 0     | 1 440 ms |
| Projets   | mobile  | 74          | 99            | 100              | 100 | 3,9 s | 0     | 590 ms   |
| SAAGDO    | mobile  | 62          | 100           | 100              | 100 | 3,9 s | 0     | 1 430 ms |

\* mesures desktop réalisées avant la dernière série d’optimisations (bonnes pratiques à 100 ensuite en mobile).

**Lecture honnête** : les objectifs (≥ 90 / 95 / 95 / 95) sont atteints en desktop. En mobile
(émulation Moto G4 : 4G lente + CPU ÷4), l’accessibilité, les bonnes pratiques et le SEO sont atteints
et le CLS est nul, mais la **performance mobile (53–74) reste sous l’objectif de 90** dans cet
environnement : le temps de rendu est dominé par l’exécution du runtime React/Next.js sur un CPU
fortement bridé (indice de performance de la machine de test : 1 226, inférieur à un poste courant).

Optimisations déjà appliquées : cache des lectures CMS avec invalidation à la publication (TTFB
0,8 s → 0,05–0,1 s), polices auto-hébergées préchargées avec métriques de repli (CLS 0,2 → 0),
suppression de la librairie d’animation (~150 Ko), formulaire newsletter sans dépendance,
carte chargée à la demande, démo SAAGDO et sa librairie de graphiques retirées, animations décoratives gelées sur mobile, images WebP/AVIF responsives.

Pistes suivantes (non réalisées) : rendu statique/ISR des pages publiques (le cache par tags est déjà
en place), réduction du nombre de composants client sur l’accueil, CDN devant Caddy, image du hero
en haute définition optimisée. À re-mesurer sur le serveur de production avec PageSpeed Insights.

## Fonctionnalités dépendant de services externes

| Fonctionnalité                                                              | Service                            | État sans configuration                                                                                             |
| --------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Notifications email des formulaires, réinitialisation de mot de passe admin | SMTP                               | demandes enregistrées dans l’admin, pas d’email (statut « Service email non configuré » visible sur chaque demande) |
| Envoi de la lettre d’information                                            | outil d’emailing (Brevo, Mailjet…) | inscriptions et consentements enregistrés, export possible depuis l’admin ; **aucun envoi n’est implémenté**        |
| Anti-spam renforcé                                                          | Cloudflare Turnstile               | honeypot + délai + limitation de débit actifs                                                                       |
| Fond de carte                                                               | fournisseur de tuiles              | carte vectorielle auto-hébergée                                                                                     |
| Plateforme SAAGDO                                                           | URL officielle                     | bouton désactivé et mention explicite                                                                               |

## Limites connues

- **Contenus** : indicateurs d’impact, publications, coordonnées des
  projets et traductions anglaises restent à fournir/valider (voir `CONTENUS-A-VALIDER.md`).
- **Photos** : résolution d’origine 600–1 080 px ; prévoir des visuels HD pour les grands écrans.
- **Site actuel** `aciea-burkina.org` non consulté (inaccessible depuis l’environnement) : aucune
  redirection d’anciennes URL n’a pu être définie (à ajouter dans `next.config.ts › redirects` si besoin).
- **Mise à l’échelle** : limitation de débit et tâches planifiées prévues pour une instance unique.
- **CSP** avec `'unsafe-inline'` pour les scripts (voir `SECURITE.md`).
- **Slugs** communs FR/EN (choix volontaire pour conserver la page lors du changement de langue).
- **Publication programmée** : l’invalidation du cache après une publication automatique se fait
  au plus tard en 5 minutes (filet de sécurité temporel), les publications manuelles sont immédiates.
- Le dépôt GitHub n’a pas pu recevoir les commits depuis cet environnement (droits de l’application
  GitHub à accorder) : le code est commité localement sur la branche `claude/funny-noether-42yeuo`.
