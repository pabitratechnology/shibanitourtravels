#!/usr/bin/env bash
# ==============================================================================
# Shibani Tour & Travels - 1-Click Zero-Downtime Update Script
# Usage: ./update.sh
# Website: https://www.shibanitourtravels.com
# Port: 5050
# ==============================================================================

set -e

# Terminal Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

APP_DIR="/var/www/shibanitourtravels"
TARGET_PORT=5050
PM2_APP_NAME="shibani-travels"

echo -e "${BLUE}================================================================${NC}"
echo -e "${GREEN}    🚀 Starting Shibani Tour & Travels Advanced Update 🚀    ${NC}"
echo -e "${BLUE}================================================================${NC}"

cd "$APP_DIR" || { echo -e "${RED}Error: Cannot cd into $APP_DIR${NC}"; exit 1; }

# 1. Pull Latest Code from GitHub
echo -e "\n${YELLOW}[1/5] Fetching latest changes from GitHub...${NC}"
git fetch origin main
git pull origin main

# 2. Check & Update Frontend
echo -e "\n${YELLOW}[2/5] Building Frontend production assets...${NC}"
cd "$APP_DIR/frontend"
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi
npm run build
echo -e "${GREEN}✓ Frontend build completed successfully!${NC}"

# 3. Check & Update Backend
echo -e "\n${YELLOW}[3/5] Updating Backend dependencies...${NC}"
cd "$APP_DIR/backend"
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

# Ensure uploads directory exists
mkdir -p "$APP_DIR/backend/uploads"
chmod -R 755 "$APP_DIR/backend/uploads"

# Ensure .env exists with JWT_SECRET
if [ ! -f "$APP_DIR/backend/.env" ]; then
    echo "Creating backend .env file..."
    echo "JWT_SECRET=shibani_travels_secret_key_2026" > "$APP_DIR/backend/.env"
fi

# 4. Reload PM2 Process (Zero Downtime)
echo -e "\n${YELLOW}[4/5] Reloading application on Port $TARGET_PORT with PM2...${NC}"
if pm2 list | grep -q "$PM2_APP_NAME"; then
    PORT=$TARGET_PORT NODE_ENV=production pm2 restart "$PM2_APP_NAME" --update-env
else
    PORT=$TARGET_PORT NODE_ENV=production pm2 start "npx tsx server.ts" --name "$PM2_APP_NAME" --update-env
fi
pm2 save

# 5. Health Check
echo -e "\n${YELLOW}[5/5] Running Health Check on http://127.0.0.1:$TARGET_PORT ...${NC}"
sleep 2
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:$TARGET_PORT || true)

if [ "$HTTP_STATUS" == "200" ]; then
    echo -e "${GREEN}================================================================${NC}"
    echo -e "${GREEN}  ✅ SUCCESS! Website updated & healthy (HTTP $HTTP_STATUS).${NC}"
    echo -e "${GREEN}  🌐 Live URL:  https://www.shibanitourtravels.com${NC}"
    echo -e "${GREEN}  🧭 Sitemap:   https://www.shibanitourtravels.com/sitemap.xml${NC}"
    echo -e "${GREEN}  🤖 Robots:    https://www.shibanitourtravels.com/robots.txt${NC}"
    echo -e "${BLUE}================================================================${NC}"
    pm2 status "$PM2_APP_NAME"
else
    echo -e "${RED}⚠️ Warning: Received HTTP status $HTTP_STATUS on port $TARGET_PORT.${NC}"
    echo "Checking recent logs:"
    pm2 logs "$PM2_APP_NAME" --lines 15 --nostream
fi
