#!/usr/bin/env bash
# ==============================================================================
# Shibani Tour & Travels - Production Deployment Script
# Domain: https://www.shibanitourtravels.com
# Server IP: 82.25.108.132
# ==============================================================================

set -e

APP_DIR="/var/www/shibanitourtravels"
TARGET_PORT=${1:-5050}

echo "=========================================================="
echo " Starting Deployment for Shibani Tour & Travels"
echo " Target Port: $TARGET_PORT"
echo " Directory:   $APP_DIR"
echo "=========================================================="

# 1. Ensure Node.js & PM2 are available
if ! command -v node &> /dev/null; then
    echo "Installing Node.js 20 LTS..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi

if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2 globally..."
    npm install -g pm2
fi

# 2. Build Frontend
echo "Building Frontend production assets..."
cd "$APP_DIR/frontend"
npm install
npm run build

# 3. Setup Backend
echo "Setting up Backend & dependencies..."
cd "$APP_DIR/backend"
npm install

# 4. Start / Restart with PM2 on the specified port
echo "Starting application with PM2 on port $TARGET_PORT..."
PORT=$TARGET_PORT NODE_ENV=production pm2 start "npx tsx server.ts" --name "shibani-travels" --update-env || pm2 restart "shibani-travels" --update-env
pm2 save

echo "=========================================================="
echo " Backend & Frontend is running on http://127.0.0.1:$TARGET_PORT"
echo "=========================================================="
