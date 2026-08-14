#!/usr/bin/env python3
"""
coi_expiry_check.py — daily insurance guard.

Certificates of Insurance (COIs) are the only way to "verify" insurance (no public DB).
This flags COIs that are expired or expiring within 30 days so they get re-requested
before they lapse, and reports how many license-verified subs still have no COI (the
gap to full commit-ready). Telegrams only when there's something to act on.

Reads keys from ~/.env.supabase. Part of the daily pipeline.
"""
import os, json, urllib.request
from datetime import datetime, timezone

SB_ENV = os.path.expanduser("~/.openclaw/workspace/.env.supabase")


def env(keyname):
    for line in open(SB_ENV):
        s = line.strip()
        if s and not s.startswith("#") and s.startswith(keyname + "="):
            return s.split("=", 1)[1].strip()
    raise KeyError(keyname)


def rest(url, key):
    r = urllib.request.Request(url, headers={"apikey": key, "Authorization": f"Bearer {key}"})
    with urllib.request.urlopen(r, timeout=45) as resp:
        return json.loads(resp.read().decode())


def days_left(iso):
    try:
        d = datetime.fromisoformat(iso[:10]).replace(tzinfo=timezone.utc)
        return (d - datetime.now(timezone.utc)).days
    except Exception:
        return None


def main():
    base, key = env("SUPABASE_URL").rstrip("/"), env("SUPABASE_SERVICE_ROLE_KEY")

    coi = rest(f"{base}/rest/v1/subcontractors?select=company_name,trade,insurance_expiry,insurance_carrier"
               f"&coi_on_file=is.true", key)
    lapsing = []
    for s in coi:
        exp = s.get("insurance_expiry")
        if not exp:
            lapsing.append((s["company_name"], "no expiry recorded"))
            continue
        d = days_left(exp)
        if d is not None and d <= 30:
            lapsing.append((s["company_name"], f"expired {-d}d ago" if d < 0 else f"expires in {d}d"))

    # license-verified but no COI = one step from commit-ready
    verified_no_coi = rest(f"{base}/rest/v1/subcontractors?select=id"
                           f"&license_verified=is.true&coi_on_file=is.false", key)

    lines = [f"COIs on file: {len(coi)} | license-verified without COI: {len(verified_no_coi)}"]
    if lapsing:
        lines.append("⚠️ COIs needing action:")
        lines += [f"  • {name}: {why}" for name, why in lapsing]
    summary = "\n".join(lines)
    print(summary)

    # Only ping Telegram when there's something to act on.
    if lapsing:
        try:
            tok = json.load(open("/Users/ashborn/.openclaw/openclaw.json"))["channels"]["telegram"]["botToken"]
            data = json.dumps({"chat_id": "8753570909", "text": "🛡️ Insurance check\n" + summary}).encode()
            urllib.request.urlopen(urllib.request.Request(
                f"https://api.telegram.org/bot{tok}/sendMessage", data=data,
                headers={"Content-Type": "application/json"}), timeout=20)
        except Exception:
            pass


if __name__ == "__main__":
    main()
