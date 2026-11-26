#!/usr/bin/env bash
# Shibani Update Launcher
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
"$SCRIPT_DIR/shibani.sh" update "$@"
