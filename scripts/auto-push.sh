#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# auto-push.sh — watches /content/ for unsaved edits and pushes to GitHub.
# Vercel deploys automatically on every push to main (~2 min to live).
#
# Run via cron every 5 minutes:
#   */5 * * * * /Users/ryu/Desktop/portfolio/scripts/auto-push.sh
# ─────────────────────────────────────────────────────────────────────────────

REPO="/Users/ryu/Desktop/portfolio"
LOG="$REPO/scripts/auto-push.log"

cd "$REPO" || exit 1

# Only run on main — never auto-push from a feature branch
BRANCH=$(git branch --show-current 2>/dev/null)
[ "$BRANCH" = "main" ] || exit 0

# Check for any unstaged or untracked changes inside content/
HAS_CHANGES=$(git diff --name-only content/ && git ls-files --others --exclude-standard content/)
[ -n "$HAS_CHANGES" ] || exit 0

# Pull latest first so we don't create a conflict
git pull origin main --rebase --quiet 2>>"$LOG"

# Stage everything in content/
git add content/

# Bail if nothing actually staged (e.g. only whitespace diff)
STAGED=$(git diff --cached --name-only)
[ -n "$STAGED" ] || exit 0

# Build a readable commit message
FILES=$(echo "$STAGED" | sed 's|content/||g' | tr '\n' '  ')
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')

git commit -m "auto: update content — $TIMESTAMP

Files: $FILES" --quiet

git push origin main --quiet

echo "[$TIMESTAMP] pushed: $FILES" >> "$LOG"
