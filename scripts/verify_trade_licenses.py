#!/usr/bin/env python3
"""
verify_trade_licenses.py — bulk-verify ELECTRICAL and PLUMBING/HVAC subs against their
NC boards (NCBEEC, SBPHFSC) via memo23 Apify actors that take company names and return
license-verified records (licenseNumber, licenseStatus, isActive, expirationDate).

For each sub: run its name through the right board actor, fuzzy-match the returned
businessName back to the sub (normalized brand tokens), and auto-set license_verified=true
+ status=approved on a confident name match with an ACTIVE license. Everything gets a
notes trail (matched name + license# + status + expiry) for human sanity-check.

Companion to verify_gc_licenses.py (NCLBGC / GC-scope). Reads ~/.env.supabase + ~/.env.apify.
Cost: ~$0.004 per returned record (pennies total).
"""
import os, re, sys, json, urllib.request
from datetime import datetime, timedelta

SB_ENV = os.path.expanduser("~/.openclaw/workspace/.env.supabase")
AP_ENV = os.path.expanduser("~/.openclaw/workspace/.env.apify")
CHUNK = 20
# --recent: only check subs added in the last 2 days (daily chain, keeps credit cost tiny).
RECENT = "--recent" in sys.argv

BOARDS = [
    {"key": "NCBEEC", "actor": "memo23~north-carolina-electrical-contractor-leads-scraper",
     "trades": {"Electrical"}},
    {"key": "SBPHFSC", "actor": "memo23~north-carolina-plumbing-hvac-contractor-leads-scraper",
     "trades": {"Plumbing", "Mechanical / HVAC"}},
]

STOP = {"llc", "inc", "co", "company", "corp", "corporation", "services", "service", "the",
        "of", "and", "electric", "electrical", "plumbing", "heating", "air", "conditioning",
        "cooling", "hvac", "mechanical", "contractors", "contractor", "systems", "system",
        "group", "enterprises", "solutions"}


def env(path, keyname):
    for line in open(path):
        s = line.strip()
        if s and not s.startswith("#") and s.startswith(keyname + "="):
            return s.split("=", 1)[1].strip()
    raise KeyError(keyname)


def sb_req(method, url, key, body=None):
    data = json.dumps(body).encode() if body is not None else None
    r = urllib.request.Request(url, data=data, method=method, headers={
        "apikey": key, "Authorization": f"Bearer {key}",
        "Content-Type": "application/json", "Prefer": "return=minimal",
    })
    with urllib.request.urlopen(r, timeout=45) as resp:
        raw = resp.read().decode()
        return json.loads(raw) if raw.strip() else None


def run_actor(actor, names, token):
    body = json.dumps({
        "companyNames": [n.replace("&", "and") for n in names],
        "activeOnly": False, "maxItems": 200, "maxConcurrency": 5,
    }).encode()
    url = f"https://api.apify.com/v2/acts/{actor}/run-sync-get-dataset-items?token={token}"
    r = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(r, timeout=290) as resp:
        return json.loads(resp.read().decode())


def core(name):
    toks = [t for t in re.findall(r"[a-z0-9]+", (name or "").lower()) if t not in STOP]
    return set(toks)


def matches(a, b):
    if not a or not b:
        return False
    return a == b or a <= b or b <= a


def main():
    base = env(SB_ENV, "SUPABASE_URL").rstrip("/")
    sbkey = env(SB_ENV, "SUPABASE_SERVICE_ROLE_KEY")
    token = env(AP_ENV, "APIFY_TOKEN")
    grand = {"verified": 0, "review": 0, "nomatch": 0, "n": 0}

    recent_filter = f"&created_at=gte.{(datetime.utcnow() - timedelta(days=2)).isoformat()}" if RECENT else ""
    unverified = sb_req("GET", f"{base}/rest/v1/subcontractors"
                        f"?select=id,company_name,trade&license_verified=is.false{recent_filter}&limit=1000", sbkey) or []

    for board in BOARDS:
        subs = [s for s in unverified if s["trade"] in board["trades"]]
        if not subs:
            continue
        names = sorted({s["company_name"] for s in subs})
        print(f"[{board['key']}] {len(subs)} subs, {len(names)} names")

        records = []
        for i in range(0, len(names), CHUNK):
            batch = names[i:i + CHUNK]
            try:
                items = run_actor(board["actor"], batch, token)
                records.extend(items or [])
                print(f"  batch {i//CHUNK + 1}: {len(batch)} names -> {len(items or [])} records")
            except Exception as e:
                print(f"  batch {i//CHUNK + 1} failed: {e}")
        rec_cores = [(core(r.get("businessName")), r) for r in records]

        for s in subs:
            grand["n"] += 1
            sc = core(s["company_name"])
            cands = [r for (rc, r) in rec_cores if matches(sc, rc)]
            active = [r for r in cands if r.get("isActive")]
            rec = (active[0] if active else (cands[0] if cands else None))
            if not rec:
                grand["nomatch"] += 1
                sb_req("PATCH", f"{base}/rest/v1/subcontractors?id=eq.{s['id']}", sbkey,
                       {"notes": f"{board['key']}: no license record matched by name — confirm manually."})
                continue
            note = (f"{board['key']} match '{rec.get('businessName')}': {rec.get('licenseStatus')}; "
                    f"lic {rec.get('licenseNumber')}; exp {rec.get('expirationDate')}")
            patch = {"license_number": rec.get("licenseNumber"), "notes": note}
            if rec.get("isActive"):
                patch["license_verified"] = True
                patch["status"] = "approved"
                grand["verified"] += 1
            else:
                grand["review"] += 1
            sb_req("PATCH", f"{base}/rest/v1/subcontractors?id=eq.{s['id']}", sbkey, patch)

    total = len(sb_req("GET", f"{base}/rest/v1/subcontractors?select=id&license_verified=is.true", sbkey) or [])
    summary = (f"⚡🔧 Trade license verify (electrical + plumbing/HVAC): {grand['verified']} auto-verified, "
               f"{grand['review']} found-needs-review, {grand['nomatch']} no match, of {grand['n']} subs. "
               f"Directory now {total} license-verified total.")
    print(summary)
    try:
        tok = json.load(open("/Users/ashborn/.openclaw/openclaw.json"))["channels"]["telegram"]["botToken"]
        d = json.dumps({"chat_id": "8753570909", "text": summary}).encode()
        urllib.request.urlopen(urllib.request.Request(
            f"https://api.telegram.org/bot{tok}/sendMessage", data=d,
            headers={"Content-Type": "application/json"}), timeout=20)
    except Exception:
        pass


if __name__ == "__main__":
    main()
