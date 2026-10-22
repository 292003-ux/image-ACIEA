#!/usr/bin/env bash
# Daily backup of the database and uploaded files (run from the project directory on the VPS).
#   crontab: 15 2 * * * cd /opt/aciea && ./scripts/backup.sh >> backups/backup.log 2>&1
set -euo pipefail
cd "$(dirname "$0")/.."
set -a; source .env.production; set +a

STAMP=$(date +%Y%m%d-%H%M%S)
DEST=${BACKUP_DIR:-./backups}
KEEP_DAYS=${BACKUP_KEEP_DAYS:-30}
mkdir -p "$DEST"

echo "[$(date)] Database dump"
docker compose exec -T db pg_dump -U "${POSTGRES_USER:-aciea}" -d "${POSTGRES_DB:-aciea}" --format=custom --no-owner \
  > "$DEST/db-$STAMP.dump"

echo "[$(date)] Media and private uploads"
docker run --rm -v aciea_media:/media:ro -v aciea_private-uploads:/private:ro -v "$(realpath "$DEST")":/backup alpine \
  tar czf "/backup/files-$STAMP.tar.gz" -C / media private

echo "[$(date)] Pruning backups older than $KEEP_DAYS days"
find "$DEST" -name 'db-*.dump' -mtime +"$KEEP_DAYS" -delete
find "$DEST" -name 'files-*.tar.gz' -mtime +"$KEEP_DAYS" -delete
echo "[$(date)] Done: db-$STAMP.dump, files-$STAMP.tar.gz"
# Copy $DEST off-site (e.g. OVHcloud Object Storage with rclone) — see docs/DEPLOIEMENT.md.
