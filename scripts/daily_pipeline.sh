#!/usr/bin/env bash
# Daily Value-Engine pipeline (launchd com.scc.subfarmer, 7:30am):
#   1. Farm new subs into the worst coverage gaps
#   2. Auto-verify the freshly-added subs' licenses against all 3 NC boards
#      (--recent = only subs from the last 2 days, so Apify credit cost stays tiny)
export PATH="/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
DIR="/Users/ashborn/.openclaw/workspace/southern-cities-construction/scripts"
# Use Homebrew's python3 explicitly — Apple's /usr/bin/python3 (CommandLineTools)
# is not installed on this machine and only triggers an xcode-select install prompt.
PY="/opt/homebrew/bin/python3"

"$PY" "$DIR/farm_subs.py"
"$PY" "$DIR/verify_trade_licenses.py" --recent
"$PY" "$DIR/verify_gc_licenses.py" --recent
"$PY" "$DIR/enrich_contacts.py" --recent
"$PY" "$DIR/coi_expiry_check.py"
