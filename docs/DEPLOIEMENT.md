# Déploiement en production (VPS Ubuntu + Docker)

Architecture cible : un VPS (par ex. OVHcloud, Ubuntu Server 24.04) exécutant Docker Compose avec
quatre services :

```
Internet ──► caddy (80/443, HTTPS Let’s Encrypt) ──► app (Next.js + Payload, port 3000)
                                                       │
                                     migrate (one-shot) ┤──► db (PostgreSQL 16, réseau interne)
                                                       │
                     volumes persistants : db-data, media, private-uploads, caddy-data
```

## 1. Préparer le serveur

```bash
# Utilisateur non-root avec sudo, clés SSH uniquement
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl ufw fail2ban unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades

# Pare-feu : SSH + HTTP/HTTPS uniquement
sudo ufw allow OpenSSH && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw allow 443/udp
sudo ufw enable

# Docker Engine + plugin compose (dépôt officiel Docker)
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker "$USER"
```

Recommandations : désactiver l’authentification SSH par mot de passe (`PasswordAuthentication no`),
désactiver la connexion root SSH, garder le système à jour, surveiller l’espace disque.

## 2. DNS

Créer des enregistrements `A` (et `AAAA` si IPv6) pour `aciea-burkina.org` et `www.aciea-burkina.org`
vers l’IP du VPS. Caddy obtient et renouvelle automatiquement les certificats TLS.

## 3. Installer l’application

```bash
sudo mkdir -p /opt/aciea && sudo chown "$USER" /opt/aciea
git clone <URL_DU_DEPOT> /opt/aciea && cd /opt/aciea
cp .env.production.example .env.production && chmod 600 .env.production
```

Renseigner `.env.production` :

| Variable                                                 | Valeur                                                     |
| -------------------------------------------------------- | ---------------------------------------------------------- |
| `SITE_DOMAIN`                                            | `aciea-burkina.org`                                        |
| `NEXT_PUBLIC_SERVER_URL`                                 | `https://aciea-burkina.org`                                |
| `ACME_EMAIL`                                             | email de contact pour Let’s Encrypt                        |
| `POSTGRES_PASSWORD`                                      | mot de passe fort (`openssl rand -base64 32`)              |
| `PAYLOAD_SECRET`, `IP_HASH_SALT`                         | `openssl rand -hex 32` (valeurs différentes)               |
| `SMTP_*`                                                 | fournisseur d’emails transactionnels (facultatif, voir §7) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | anti-spam Cloudflare (facultatif)                          |
| `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`                | premier déploiement uniquement, à retirer ensuite          |

## 4. Premier lancement

```bash
docker compose --env-file .env.production up -d --build
# Le service "migrate" applique les migrations puis s’arrête ; "app" démarre ensuite.
# Contenus initiaux + super admin. Les volumes de médias doivent être montés, sinon les
# photos importées restent dans le conteneur jetable et le site les sert en erreur 500.
docker compose --env-file .env.production run --rm \
  -e MEDIA_DIR=/app/media -e DOCUMENTS_DIR=/app/media/documents -e PRIVATE_UPLOADS_DIR=/app/uploads/private \
  -v aciea_media:/app/media -v aciea_private-uploads:/app/uploads/private \
  migrate pnpm seed
curl -fsS https://aciea-burkina.org/api/health
```

Retirer ensuite `SEED_ADMIN_*` de `.env.production`, se connecter à `/admin`, changer le mot de passe
et créer les comptes nominatifs (un compte par personne).

## 5. Mises à jour

```bash
cd /opt/aciea
./scripts/backup.sh                      # toujours sauvegarder avant
git pull
docker compose --env-file .env.production up -d --build
docker compose logs -f app               # vérifier le démarrage
```

Les migrations ajoutées au dépôt (`src/migrations/`) sont appliquées automatiquement par le service
`migrate` avant le démarrage de l’application. En cas d’échec, l’application n’est pas redémarrée
sur un schéma incohérent (`depends_on: service_completed_successfully`).

## 6. Sauvegardes et restauration

- `scripts/backup.sh` : dump PostgreSQL (`pg_dump --format=custom`) + archive des médias et pièces
  jointes privées, rotation à 30 jours (`BACKUP_KEEP_DAYS`).
- Planifier quotidiennement : `crontab -e` →
  `15 2 * * * cd /opt/aciea && ./scripts/backup.sh >> backups/backup.log 2>&1`
- **Copier les sauvegardes hors du serveur** (ex. OVHcloud Object Storage avec `rclone sync backups remote:aciea-backups`),
  les chiffrer si elles contiennent des données personnelles, et tester une restauration chaque trimestre.
- Restauration : `./scripts/restore.sh backups/db-AAAAMMJJ-HHMMSS.dump backups/files-AAAAMMJJ-HHMMSS.tar.gz`
  (demande une confirmation explicite, arrête l’application, restaure, redémarre).

## 7. Services externes

| Service                     | Nécessaire pour                                                           | Sans configuration                                                        |
| --------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| SMTP (Brevo, Mailjet, OVH…) | notifications des formulaires, emails de réinitialisation de mot de passe | les demandes sont **enregistrées** dans l’admin, aucun email n’est envoyé |
| Cloudflare Turnstile        | anti-spam renforcé                                                        | honeypot + délai minimal + limitation de débit restent actifs             |
| Fond de carte (tuiles)      | fond OpenStreetMap sous la carte                                          | carte vectorielle auto-hébergée (aucune requête tierce)                   |

## 8. Santé et supervision

- Sonde : `GET /api/health` (vérifie l’accès base de données) — utilisée par le `HEALTHCHECK` Docker.
- Journaux : `docker compose logs app`, accès HTTP dans le volume Caddy (`/data/access.log`).
- Publication programmée et purge RGPD : exécutées par l’application (tâches Payload `autoRun`) ;
  une seule instance doit tourner (déploiement mono-serveur).

## 9. Sécurité serveur (rappel)

- Ne jamais exposer PostgreSQL (aucun port publié dans `docker-compose.yml`).
- Secrets uniquement dans `.env.production` (droits 600), jamais dans Git.
- Mises à jour : `docker compose pull` pour les images de base, `pnpm outdated` / Dependabot pour les dépendances.
- Activer l’authentification à deux facteurs sur les comptes d’hébergement, de DNS et de messagerie.

## 10. Point d’attention : variable `HOSTNAME`

Le serveur Next.js doit écouter sur `HOSTNAME=0.0.0.0` (valeur définie dans le `Dockerfile`).
Fixer `HOSTNAME` sur une adresse IP précise (ex. `127.0.0.1`) fait considérer les réécritures
d’URL localisées (`/fr/projets` → route interne) comme des requêtes externes et provoque une boucle
de redirection. Ce comportement a été constaté et vérifié lors des tests du build de production.
