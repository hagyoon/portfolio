#!/usr/bin/env bash
set -euo pipefail

OBSIDIAN_REPO="https://github.com/hagyoon/obsidian-secondbrain.git"
OBSIDIAN_CONTENT_PATH="Portfolio/content"
PORTFOLIO_DIR="/home/workspace/Projects/portfolio"
SYNC_CACHE="/tmp/obsidian-sync-cache"

echo "[sync] Starting Obsidian → portfolio sync at $(date)"

# Pull latest obsidian vault
if [ -d "$SYNC_CACHE/.git" ]; then
  echo "[sync] Updating cached vault..."
  git -C "$SYNC_CACHE" pull --quiet
else
  echo "[sync] Cloning vault (first run)..."
  git clone --depth=1 "$OBSIDIAN_REPO" "$SYNC_CACHE" --quiet
fi

# Check if Portfolio/content exists in the vault
if [ ! -d "$SYNC_CACHE/$OBSIDIAN_CONTENT_PATH" ]; then
  echo "[sync] No '$OBSIDIAN_CONTENT_PATH' folder found in obsidian-secondbrain."
  echo "[sync] Create it in Obsidian and it will sync on the next run."
  exit 0
fi

# Sync content
rsync -av --delete \
  "$SYNC_CACHE/$OBSIDIAN_CONTENT_PATH/" \
  "$PORTFOLIO_DIR/content/"

# Commit and push if anything changed
cd "$PORTFOLIO_DIR"
git add content/

if git diff --staged --quiet; then
  echo "[sync] No changes — portfolio is already up to date."
  exit 0
fi

git -c user.name="Obsidian Sync" -c user.email="sync@hakyun.com" \
  commit -m "sync: update content from Obsidian vault"

git push origin main
echo "[sync] Done — portfolio updated and pushed."
