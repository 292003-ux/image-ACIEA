#!/usr/bin/env bash
# Restore a backup produced by scripts/backup.sh.
#   ./scripts/restore.sh backups/db-YYYYMMDD-HHMMSS.dump [backups/files-YYYYMMDD-HHMMSS.tar.gz]
set -euo pipefail
cd "$(dirname "$0")/.."
set -a; source .env.production; set +a
DB_DUMP=${1:?Usage: restore.sh <db.dump> [files.tar.gz]}
FILES=${2:-}

read -r -p "This will REPLACE the current database. Type 'restore' to continue: " confirm
[ "$confirm" = "restore" ] || { echo "Aborted."; exit 1; }

docker compose stop app
docker compose exec -T db pg_restore -U "${POSTGRES_USER:-aciea}" -d "${POSTGRES_DB:-aciea}" --clean --if-exists --no-owner < "$DB_DUMP"
if [ -n "$FILES" ]; then
  docker run --rm -v aciea_media:/media -v aciea_private-uploads:/private -v "$(realpath "$(dirname "$FILES")")":/backup alpine \
    sh -c "rm -rf /media/* /private/* && tar xzf /backup/$(basename "$FILES") -C /"
fi
docker compose up -d app
echo "Restore complete. Check https://${SITE_DOMAIN}/api/health"
