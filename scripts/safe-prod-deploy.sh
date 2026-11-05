#!/usr/bin/env bash
# Refuses a production deploy from a dirty working tree, so prod can never
# again serve a page git has no record of (see the 2026-11-05 /consultation
# 404 incident — a page deployed straight from local disk vanished on the
# next clean rebuild because it was never committed).
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ -n "$(git status --porcelain)" ]]; then
  if [[ "${1:-}" == "--allow-dirty" ]]; then
    echo "WARNING: deploying with uncommitted changes (--allow-dirty passed)." >&2
    git status --short >&2
  else
    echo "Refusing to deploy: working tree is dirty." >&2
    echo "Commit and push first, or re-run with --allow-dirty if you really mean it." >&2
    git status --short >&2
    exit 1
  fi
fi

/opt/homebrew/bin/vercel --prod --yes
