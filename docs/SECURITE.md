# Sécurité et confidentialité

| Risque / exigence               | Mesure en place                                                                                                                                                                                                |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Permissions                     | Contrôle d’accès Payload au niveau collection **et** champ, côté serveur ; hooks interdisant la publication aux contributeurs et l’élévation de rôle (testé : `tests/integration/permissions.test.ts`)         |
| Données personnelles            | Collections de demandes lisibles par les admins uniquement ; création publique impossible via l’API (uniquement via server action validée) ; pièces jointes dans un stockage privé servi avec contrôle d’accès |
| Validation des entrées          | Schémas Zod partagés client/serveur, enums stricts, longueurs bornées, normalisation                                                                                                                           |
| Injections SQL                  | Requêtes paramétrées (Drizzle/Payload) ; caractères joker échappés dans les recherches                                                                                                                         |
| XSS                             | Rendu React échappé ; contenu riche via le sérialiseur Lexical (pas de HTML brut) ; JSON-LD échappé ; emails de notification en texte brut ; CSP                                                               |
| CSRF                            | Server actions protégées par vérification d’origine (Next.js) ; liste `csrf` Payload pour l’authentification par cookie                                                                                        |
| Sessions                        | Cookies `HttpOnly`, `SameSite=Lax`, `Secure` en production ; sessions Payload révocables ; expiration 8 h                                                                                                      |
| Force brute                     | Verrouillage de compte (5 essais / 15 min) + limitation par IP sur `/api/users/login`                                                                                                                          |
| Spam                            | Champ piège (honeypot), délai minimal de saisie, limitation de débit par empreinte IP hachée, Cloudflare Turnstile optionnel                                                                                   |
| Fichiers téléversés             | Liste blanche MIME, taille max (5 Mo formulaires, 15 Mo admin), vérification de la signature binaire (PDF/DOCX), nom de fichier aléatoire côté serveur, validation PDF par Payload                             |
| En-têtes HTTP                   | CSP, HSTS (prod), `X-Frame-Options: DENY`, `frame-ancestors 'none'`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `COOP`, `X-Powered-By` retiré                                                         |
| Secrets                         | Variables d’environnement uniquement ; démarrage refusé en production si `PAYLOAD_SECRET` < 32 caractères                                                                                                      |
| Journalisation                  | Journal d’audit append-only (création, mise à jour, publication, suppression, connexions, formulaires), IP tronquée                                                                                            |
| Erreurs                         | Pages d’erreur génériques, aucune trace exposée ; GraphQL désactivé (surface réduite)                                                                                                                          |
| Conservation                    | Purge quotidienne automatique des demandes selon la durée configurée (24 mois par défaut) ; suppression en cascade des pièces jointes                                                                          |
| Vie privée des visiteurs        | Aucun cookie publicitaire ni traceur ; polices et carte auto-hébergées ; liens de partage sans script tiers                                                                                                    |
| Prévisualisation des brouillons | Réservée aux comptes authentifiés de l’équipe                                                                                                                                                                  |
| Désinscription newsletter       | Jeton aléatoire + confirmation par POST (les scanners de liens ne désinscrivent pas)                                                                                                                           |

## Compromis documenté

La CSP autorise `'unsafe-inline'` pour les scripts car l’hydratation Next.js sans nonce l’exige.
Passer à une CSP à nonce est possible (middleware générant un nonce par requête) au prix d’un rendu
entièrement dynamique — c’est déjà le cas ici, l’évolution est donc envisageable sans refonte.

## Limitation de débit

Le limiteur est en mémoire : adapté à un déploiement mono-instance (cas prévu). Pour plusieurs
instances, remplacer le stockage de `src/lib/rate-limit.ts` par Redis (interface inchangée).

## À faire par l’ACIEA

- Valider la politique de confidentialité et la durée de conservation au regard de la réglementation
  applicable au Burkina Faso.
- Utiliser des comptes nominatifs, des mots de passe forts et retirer les comptes inutilisés.
- Configurer un fournisseur SMTP disposant de SPF/DKIM/DMARC sur le domaine officiel.
