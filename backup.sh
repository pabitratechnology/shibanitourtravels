#!/usr/bin/env bash
# ==============================================================================
# Shibani Tour & Travels - Manual Database & Uploads Backup Tool
# Usage: ./backup.sh
# ==============================================================================

set -e

APP_DIR="/var/www/shibanitourtravels"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="$APP_DIR/backups"
DB_BACKUP_DIR="$BACKUP_DIR/db"
UPLOADS_BACKUP_DIR="$BACKUP_DIR/uploads"

mkdir -p "$DB_BACKUP_DIR"
mkdir -p "$UPLOADS_BACKUP_DIR"

echo "Creating backup for Shibani Tour & Travels..."

if [ -f "$APP_DIR/backend/database.sqlite" ]; then
    cp "$APP_DIR/backend/database.sqlite" "$DB_BACKUP_DIR/database_$TIMESTAMP.sqlite"
    echo "✓ Database saved to: $DB_BACKUP_DIR/database_$TIMESTAMP.sqlite"
fi

if [ -d "$APP_DIR/backend/uploads" ]; then
    rsync -a "$APP_DIR/backend/uploads/" "$UPLOADS_BACKUP_DIR/" 2>/dev/null || true
    echo "✓ Uploads saved to: $UPLOADS_BACKUP_DIR/"
fi

echo "Backup complete! Total backups in $DB_BACKUP_DIR:"
ls -lh "$DB_BACKUP_DIR"
