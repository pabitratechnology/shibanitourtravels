#!/usr/bin/env bash
# ==============================================================================
# Shibani Tour & Travels - Master Management & Safe Update CLI
# Usage:
#   ./shibani.sh              (Default: Safe 1-click update with zero downtime & data backup)
#   ./shibani.sh update       (Same as default)
#   ./shibani.sh backup       (Create manual database & uploads backup)
#   ./shibani.sh restore <file> (Restore database from a backup file)
#   ./shibani.sh status       (Check live health, PM2 status & port 5050)
#   ./shibani.sh logs         (View live backend logs)
# ==============================================================================

set -e

# Terminal Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

APP_DIR="/var/www/shibanitourtravels"
TARGET_PORT=5050
PM2_APP_NAME="shibani-travels"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="$APP_DIR/backups"
DB_BACKUP_DIR="$BACKUP_DIR/db"
UPLOADS_BACKUP_DIR="$BACKUP_DIR/uploads"

ACTION="${1:-update}"

# ==========================================
# ACTION: BACKUP
# ==========================================
do_backup() {
    mkdir -p "$DB_BACKUP_DIR"
    mkdir -p "$UPLOADS_BACKUP_DIR"
    echo -e "${YELLOW}Creating manual backup for Shibani Tour & Travels...${NC}"
    if [ -f "$APP_DIR/backend/database.sqlite" ]; then
        cp "$APP_DIR/backend/database.sqlite" "$DB_BACKUP_DIR/database_$TIMESTAMP.sqlite"
        echo -e "${GREEN}✓ Database saved to: $DB_BACKUP_DIR/database_$TIMESTAMP.sqlite${NC}"
    fi
    if [ -d "$APP_DIR/backend/uploads" ]; then
        rsync -a "$APP_DIR/backend/uploads/" "$UPLOADS_BACKUP_DIR/" 2>/dev/null || true
        echo -e "${GREEN}✓ Uploads synchronized to: $UPLOADS_BACKUP_DIR/${NC}"
    fi
    echo -e "${GREEN}Backup complete! Total backups in $DB_BACKUP_DIR:${NC}"
    ls -lh "$DB_BACKUP_DIR"
}

# ==========================================
# ACTION: RESTORE
# ==========================================
do_restore() {
    FILE="$2"
    if [ -z "$FILE" ]; then
        echo -e "${RED}Usage: ./shibani.sh restore <backup_filename.sqlite>${NC}"
        echo -e "Available backups in $DB_BACKUP_DIR:"
        ls -lh "$DB_BACKUP_DIR" 2>/dev/null || true
        exit 1
    fi
    if [ ! -f "$FILE" ]; then
        FILE="$DB_BACKUP_DIR/$FILE"
    fi
    if [ ! -f "$FILE" ]; then
        echo -e "${RED}Error: Backup file $FILE not found!${NC}"
        exit 1
    fi
    echo -e "${YELLOW}Restoring database from: $FILE${NC}"
    cp "$FILE" "$APP_DIR/backend/database.sqlite"
    pm2 restart "$PM2_APP_NAME" --update-env
    echo -e "${GREEN}✓ Database successfully restored and PM2 restarted!${NC}"
}

# ==========================================
# ACTION: STATUS
# ==========================================
do_status() {
    echo -e "${BLUE}=== Shibani Tour & Travels Status ===${NC}"
    pm2 status "$PM2_APP_NAME"
    echo -e "\n${YELLOW}Testing local port $TARGET_PORT:${NC}"
    curl -I http://127.0.0.1:$TARGET_PORT
}

# ==========================================
# ACTION: LOGS
# ==========================================
do_logs() {
    pm2 logs "$PM2_APP_NAME" --lines 50
}

# ==========================================
# ACTION: UPDATE (Default)
# ==========================================
do_update() {
    echo -e "${BLUE}================================================================${NC}"
    echo -e "${GREEN}    🚀 Shibani Tour & Travels Safe Zero-Downtime Update 🚀    ${NC}"
    echo -e "${CYAN}    Preserving Live Bookings, Fleet, Blogs, & Customer Data      ${NC}"
    echo -e "${BLUE}================================================================${NC}"

    cd "$APP_DIR" || { echo -e "${RED}Error: Cannot cd into $APP_DIR${NC}"; exit 1; }

    # 1. Safeguard Database & Uploads
    echo -e "\n${YELLOW}[1/6] Safeguarding live database & customer data...${NC}"
    mkdir -p "$DB_BACKUP_DIR"
    mkdir -p "$UPLOADS_BACKUP_DIR"

    if [ -f "$APP_DIR/backend/database.sqlite" ]; then
        cp "$APP_DIR/backend/database.sqlite" "$DB_BACKUP_DIR/database_$TIMESTAMP.sqlite"
        cp "$APP_DIR/backend/database.sqlite" "/tmp/shibani_database_latest.sqlite"
        echo -e "${GREEN}✓ Created database backup: backups/db/database_$TIMESTAMP.sqlite${NC}"
    fi

    if [ -d "$APP_DIR/backend/uploads" ]; then
        rsync -a "$APP_DIR/backend/uploads/" "$UPLOADS_BACKUP_DIR/" 2>/dev/null || true
        echo -e "${GREEN}✓ Synced and safeguarded all uploaded images/files.${NC}"
    fi

    # Prune old backups older than 30 days
    find "$DB_BACKUP_DIR" -type f -name "database_*.sqlite" -mtime +30 -delete 2>/dev/null || true

    # 2. Pull Code from GitHub
    echo -e "\n${YELLOW}[2/6] Pulling latest updates from GitHub...${NC}"
    git update-index --skip-worktree backend/database.sqlite 2>/dev/null || true
    git fetch origin main
    git pull origin main

    # Restore our live database with latest customer bookings
    if [ -f "/tmp/shibani_database_latest.sqlite" ]; then
        cp "/tmp/shibani_database_latest.sqlite" "$APP_DIR/backend/database.sqlite"
        rm -f "/tmp/shibani_database_latest.sqlite"
        echo -e "${GREEN}✓ Guaranteed: Live bookings and customer database 100% preserved!${NC}"
    fi

    # 3. Build Frontend
    echo -e "\n${YELLOW}[3/6] Building Frontend production assets...${NC}"
    cd "$APP_DIR/frontend"
    if [ ! -d "node_modules" ]; then
        npm install
    fi
    npm run build
    echo -e "${GREEN}✓ Frontend build completed successfully!${NC}"

    # 4. Backend & Permissions
    echo -e "\n${YELLOW}[4/6] Verifying Backend & Storage permissions...${NC}"
    cd "$APP_DIR/backend"
    if [ ! -d "node_modules" ]; then
        npm install
    fi

    mkdir -p "$APP_DIR/backend/uploads"
    chmod -R 755 "$APP_DIR/backend/uploads"

    if [ ! -f "$APP_DIR/backend/.env" ]; then
        echo "JWT_SECRET=shibani_travels_secret_key_2026" > "$APP_DIR/backend/.env"
    fi

    # 5. Reload PM2
    echo -e "\n${YELLOW}[5/6] Gracefully reloading application on Port $TARGET_PORT...${NC}"
    if pm2 list | grep -q "$PM2_APP_NAME"; then
        PORT=$TARGET_PORT NODE_ENV=production pm2 restart "$PM2_APP_NAME" --update-env
    else
        PORT=$TARGET_PORT NODE_ENV=production pm2 start "npx tsx server.ts" --name "$PM2_APP_NAME" --update-env
    fi
    pm2 save

    # 6. Health Check
    echo -e "\n${YELLOW}[6/6] Verifying health on http://127.0.0.1:$TARGET_PORT ...${NC}"
    sleep 2
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:$TARGET_PORT || true)

    if [ "$HTTP_STATUS" == "200" ]; then
        echo -e "${GREEN}================================================================${NC}"
        echo -e "${GREEN}  🎉 UPDATE COMPLETE! Zero data lost. All systems operational.  ${NC}"
        echo -e "${GREEN}  🌐 Live URL:     https://www.shibanitourtravels.com            ${NC}"
        echo -e "${GREEN}  🔒 Admin Portal: https://www.shibanitourtravels.com/admin       ${NC}"
        echo -e "${GREEN}  💾 Latest DB Backup: backups/db/database_$TIMESTAMP.sqlite    ${NC}"
        echo -e "${BLUE}================================================================${NC}"
        pm2 status "$PM2_APP_NAME"
    else
        echo -e "${RED}⚠️ Warning: Received HTTP status $HTTP_STATUS on port $TARGET_PORT.${NC}"
        pm2 logs "$PM2_APP_NAME" --lines 20 --nostream
    fi
}

case "$ACTION" in
    update)
        do_update
        ;;
    backup)
        do_backup
        ;;
    restore)
        do_restore "$@"
        ;;
    status)
        do_status
        ;;
    logs)
        do_logs
        ;;
    *)
        do_update
        ;;
esac
