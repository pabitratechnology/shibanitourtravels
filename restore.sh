#!/usr/bin/env bash
# ==============================================================================
# Shibani Tour & Travels - Database Restore Tool
# Usage: ./restore.sh [path_to_backup_file.sqlite]
# ==============================================================================

set -e

APP_DIR="/var/www/shibanitourtravels"
BACKUP_DIR="$APP_DIR/backups/db"

if [ -z "$1" ]; then
    echo "Usage: ./restore.sh <backup_filename.sqlite>"
    echo "Available backups in $BACKUP_DIR:"
    ls -lh "$BACKUP_DIR"
    exit 1
fi

BACKUP_FILE="$1"
if [ ! -f "$BACKUP_FILE" ]; then
    BACKUP_FILE="$BACKUP_DIR/$1"
fi

if [ ! -f "$BACKUP_FILE" ]; then
    echo "Error: Backup file $BACKUP_FILE not found!"
    exit 1
fi

echo "Restoring database from: $BACKUP_FILE"
cp "$BACKUP_FILE" "$APP_DIR/backend/database.sqlite"
pm2 restart shibani-travels --update-env
echo "✓ Database successfully restored and PM2 restarted!"
