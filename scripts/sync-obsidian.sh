#!/usr/bin/env bash
set -euo pipefail

VAULT_CONTENT_PATH="/home/workspace/obsidian_llmwiki/vault/Portfolio/content"
PORTFOLIO_DIR="/home/workspace/Projects/portfolio"

echo "[sync] Starting Obsidian → portfolio sync at $(date)"

# The vault folder is kept up to date by an rsync push from the Mac
# (over the existing ssh-openclaw-agent service), not by a git pull.
# See README.md "How content flows" for the Mac-side setup.
if [ ! -d "$VAULT_CONTENT_PATH" ]; then
  echo "[sync] No '$VAULT_CONTENT_PATH' folder found."
  echo "[sync] Make sure the Mac-side rsync has run at least once."
  exit 0
fi

# Mirror content into the live portfolio checkout.
# site.md is excluded: it holds hand-tuned hero/nav copy edited directly on
# Zo, and the vault's copy is stale — syncing it would clobber live copy
# changes. Edit hero/tagline copy via /admin or directly in this repo.
rsync -av --delete --exclude="site.md" \
  "$VAULT_CONTENT_PATH/" \
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
