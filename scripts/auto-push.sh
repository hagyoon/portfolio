#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# auto-push.sh — auto-deploys edits to /content/ only.
#
# STRICT SCOPE: This script will ONLY ever touch files inside content/.
# It will hard-abort if anything outside content/ is somehow staged.
# No other files, folders, env vars, or sensitive data are ever committed.
# ─────────────────────────────────────────────────────────────────────────────

REPO="/Users/ryu/Desktop/portfolio"
ALLOWED_DIR="content"        # ← ONLY this folder is ever touched
LOG="$REPO/scripts/auto-push.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')

cd "$REPO" || exit 1

# ── Guard 1: main branch only ─────────────────────────────────────────────
BRANCH=$(git branch --show-current 2>/dev/null)
if [ "$BRANCH" != "main" ]; then
  echo "[$TIMESTAMP] SKIP: not on main (on $BRANCH)" >> "$LOG"
  exit 0
fi

# ── Guard 2: reset any staged files before we touch anything ─────────────
# Ensures nothing accidentally pre-staged from outside content/ gets in
git reset HEAD --quiet 2>/dev/null

# ── Guard 3: check for actual changes inside content/ only ────────────────
HAS_CHANGES=$(git diff --name-only "$ALLOWED_DIR/" && git ls-files --others --exclude-standard "$ALLOWED_DIR/")
if [ -z "$HAS_CHANGES" ]; then
  exit 0
fi

# ── Stage ONLY the content/ directory — nothing else ─────────────────────
git add "$ALLOWED_DIR/"

# ── Guard 4: verify every staged file is inside content/ — hard abort if not
STAGED=$(git diff --cached --name-only)
if [ -z "$STAGED" ]; then
  exit 0
fi

OUTSIDE=$(echo "$STAGED" | grep -v "^$ALLOWED_DIR/")
if [ -n "$OUTSIDE" ]; then
  echo "[$TIMESTAMP] ABORTED: staged file(s) outside $ALLOWED_DIR/ detected — $OUTSIDE" >> "$LOG"
  git reset HEAD --quiet   # unstage everything, touch nothing
  exit 1
fi

# ── Pull latest to avoid conflicts ────────────────────────────────────────
git pull origin main --rebase --quiet 2>>"$LOG"

# ── Commit and push ────────────────────────────────────────────────────────
FILES=$(echo "$STAGED" | sed "s|$ALLOWED_DIR/||g" | tr '\n' '  ')

git commit -m "auto: content update — $TIMESTAMP

Files: $FILES" --quiet

git push origin main --quiet

echo "[$TIMESTAMP] pushed: $FILES" >> "$LOG"
