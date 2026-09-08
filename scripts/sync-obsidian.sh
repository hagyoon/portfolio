#!/usr/bin/env bash
set -euo pipefail

OBSIDIAN_REPO="https://github.com/hagyoon/obsidian-secondbrain.git"
OBSIDIAN_CONTENT_PATH="Portfolio/content"
PORTFOLIO_DIR="/home/workspace/Projects/portfolio"
SYNC_CACHE="/tmp/obsidian-sync-cache"

echo "[sync] Starting Obsidian → portfolio sync at $(date)"

# Pull latest vault (read-only — never pushes back to the vault repo)
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

# Mirror content into the live portfolio checkout.
# site.md is excluded: it holds hand-tuned hero/nav copy edited directly on
# Zo, and the vault's copy is stale — syncing it would clobber live copy
# changes. Edit hero/tagline copy via /admin or directly in this repo.
rsync -av --delete --exclude="site.md" \
  "$SYNC_CACHE/$OBSIDIAN_CONTENT_PATH/" \
  "$PORTFOLIO_DIR/content/"

# Commit locally so history reflects what's live — never pushed to GitHub
cd "$PORTFOLIO_DIR"
git add content/

if git diff --staged --quiet; then
  echo "[sync] No changes — portfolio content is already up to date."
  exit 0
fi

git -c user.name="Obsidian Sync" -c user.email="sync@hakyun.com" \
  commit -m "sync: update content from Obsidian vault" --quiet

echo "[sync] CONTENT_CHANGED — new content synced from vault, restart the live service to publish it."
