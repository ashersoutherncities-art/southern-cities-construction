#!/usr/bin/env python3
"""
verify_gc_licenses.py — bulk-verify GC-scope subs against the NC Licensing Board for
General Contractors (NCLBGC), via the Apify actor that scrapes portal.nclbgc.org.

For each GC-scope sub (framing/roofing/siding/foundation/masonry) not yet verified:
run its company name through the actor, take the best matching record, write the
license number + status/address into the sub, and set license_verified=true ONLY when
the record is active + valid + has a NC address (guards against out-of-state name
collisions). Everything gets a notes trail for human sanity-check.

Does NOT touch electrical/plumbing/HVAC (different boards — NCBEEC / SBPHFSC).
Reads keys from ~/.env.supabase and ~/.env.apify.
"""
import os, re, sys, json, urllib.request
from datetime import datetime, timedelta

SB_ENV = os.path.expanduser("~/.openclaw/workspace/.env.supabase")
AP_ENV = os.path.expanduser("~/.openclaw/workspace/.env.apify")
ACTOR = "automation-lab~north-carolina-contractor-license-lookup-scraper"
# --recent: only check subs added in the last 2 days (daily chain, keeps credit cost tiny).
RECENT = "--recent" in sys.argv
GC_TRADES = {"General / Framing", "Foundation / Concrete", "Masonry", "Roofing", "Siding / Exterior"}
CHUNK = 15


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


def run_actor(names, token):
    body = json.dumps({
        "searches": [{"companyName": n.replace("&", "and")} for n in names],
        "activeOnly": False, "maxItems": 50, "maxConcurrency": 5,
    }).encode()
    url = f"https://api.apify.com/v2/acts/{ACTOR}/run-sync-get-dataset-items?token={token}"
    r = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(r, timeout=290) as resp:
        return json.loads(resp.read().decode())


def main():
    base = env(SB_ENV, "SUPABASE_URL").rstrip("/")
    sbkey = env(SB_ENV, "SUPABASE_SERVICE_ROLE_KEY")
    token = env(AP_ENV, "APIFY_TOKEN")

    recent_filter = f"&created_at=gte.{(datetime.utcnow() - timedelta(days=2)).isoformat()}" if RECENT else ""
    subs = sb_req("GET", f"{base}/rest/v1/subcontractors"
                  f"?select=id,company_name,trade&license_verified=is.false{recent_filter}", sbkey) or []
    targets = [s for s in subs if s["trade"] in GC_TRADES]
    names = sorted({s["company_name"] for s in targets})
    print(f"{len(targets)} GC-scope subs to check ({len(names)} unique names).")

    # Run the actor in chunks, collect best record per searched name.
    best = {}  # searched company name -> record
    for i in range(0, len(names), CHUNK):
        batch = names[i:i + CHUNK]
        try:
            items = run_actor(batch, token)
        except Exception as e:
            print(f"  actor batch {i//CHUNK} failed: {e}")
            continue
        for rec in items or []:
            q = (rec.get("search") or {}).get("companyName")
            if not q:
                continue
            cur = best.get(q)
            # prefer an active+valid record over an archived one
            score = (1 if rec.get("isActive") and rec.get("isValid") else 0)
            if cur is None or score > cur[0]:
                best[q] = (score, rec)
        print(f"  batch {i//CHUNK + 1}: {len(batch)} names -> {len(items or [])} records")

    verified = found_invalid = no_match = 0
    for s in targets:
        rec = best.get(s["company_name"])
        rec = rec[1] if rec else None
        if not rec:
            no_match += 1
            sb_req("PATCH", f"{base}/rest/v1/subcontractors?id=eq.{s['id']}", sbkey,
                   {"notes": "NCLBGC: no record found by name — confirm manually (may be unlicensed for GC scope or name differs)."})
            continue
        addr = rec.get("address") or ""
        active = bool(rec.get("isActive") and rec.get("isValid"))
        nc = bool(re.search(r"\bNC\b", addr))
        ok = active and nc
        note = (f"NCLBGC {rec.get('status')}; lic {rec.get('accountNumber')}; "
                f"exp {rec.get('expirationDate')}; {addr}")
        patch = {"license_number": rec.get("accountNumber"), "notes": note}
        if ok:
            patch["license_verified"] = True
            patch["status"] = "approved"
            verified += 1
        else:
            found_invalid += 1  # found a record but not auto-verifiable (inactive / out-of-state)
        sb_req("PATCH", f"{base}/rest/v1/subcontractors?id=eq.{s['id']}", sbkey, patch)

    total = len(sb_req("GET", f"{base}/rest/v1/subcontractors?select=id&license_verified=is.true", sbkey) or [])
    summary = (f"⚖️ GC license verify: {verified} auto-verified (active+valid+NC), "
               f"{found_invalid} found-but-needs-review, {no_match} no NCLBGC match, "
               f"of {len(targets)} GC-scope subs. Directory now {total} license-verified.")
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
