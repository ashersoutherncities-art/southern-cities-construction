#!/usr/bin/env python3
"""
supabase_apply_candidates.py [candidates.json]

Inserts sourced candidate subs into public.subcontractors via the Supabase Data API
(service key — no DDL needed, this is a data write). Pre-filters against existing rows
by (lower(company_name), trade) so nothing conflicts with the unique index. Then runs a
match_subcontractors RPC as a live smoke test.

Reads keys from ~/.openclaw/workspace/.env.supabase (never hardcoded/printed).
"""
import sys, os, json, html, urllib.request, urllib.parse

ENV = os.path.expanduser("~/.openclaw/workspace/.env.supabase")
HERE = os.path.dirname(os.path.abspath(__file__))
CAND = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "candidates.json")


def load_env():
    env = {}
    for line in open(ENV):
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip()
    return env


def req(method, url, key, body=None):
    data = json.dumps(body).encode() if body is not None else None
    r = urllib.request.Request(url, data=data, method=method, headers={
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
    })
    with urllib.request.urlopen(r, timeout=30) as resp:
        raw = resp.read().decode()
        return json.loads(raw) if raw.strip() else None


def main():
    env = load_env()
    base = env["SUPABASE_URL"].rstrip("/")
    key = env["SUPABASE_SERVICE_ROLE_KEY"]

    # 1) connection test + existing (company,trade)
    existing = req("GET", f"{base}/rest/v1/subcontractors?select=company_name,trade", key) or []
    have = {(str(r["company_name"]).lower(), r["trade"]) for r in existing}
    print(f"Connected. Existing subs in directory: {len(existing)}")

    # 2) load + clean candidates, filter dupes
    rows = json.load(open(CAND))
    rows = [{k: (html.unescape(v) if isinstance(v, str) else v) for k, v in r.items()} for r in rows]
    payload, skipped, batch_seen = [], 0, set()
    for r in rows:
        company, trade, region = r.get("company_name", ""), r.get("trade", ""), r.get("region", "")
        city = r.get("city") or ""
        keypair = (company.lower(), trade)
        if not company or not trade or not region:
            skipped += 1; continue
        if keypair in have or keypair in batch_seen:
            skipped += 1; continue
        if not (r.get("phone") or r.get("website")):
            skipped += 1; continue
        batch_seen.add(keypair)
        payload.append({
            "company_name": company, "contact_name": r.get("contact_name"),
            "email": r.get("email"), "phone": r.get("phone"), "website": r.get("website"),
            "trade": trade, "source_trade": trade, "specialties": r.get("specialties"),
            "regions": [region], "source_service_area": f"{city} / {region}", "home_base_city": city,
            "notes": f"Sourced via web. Source: {r.get('source_url') or 'n/a'}",
            "source": "sourced-web", "status": "new", "license_verified": False,
            "availability_status": "unknown",
        })

    # 3) insert new rows
    if payload:
        req("POST", f"{base}/rest/v1/subcontractors", key, payload)
    print(f"Inserted {len(payload)} new subs; skipped {skipped} (dupes/incomplete).")

    # 4) new total + live match smoke test
    total = req("GET", f"{base}/rest/v1/subcontractors?select=id", key) or []
    print(f"Directory now holds {len(total)} subs.")

    demo = req("POST", f"{base}/rest/v1/rpc/match_subcontractors", key,
               {"p_zip": "28202", "p_trades": ["Electrical", "Roofing"]}) or []
    print(f"\nLive engine test — match_subcontractors('28202', [Electrical, Roofing]) -> {len(demo)} matches:")
    for m in demo[:6]:
        print(f"  [{m['match_type']}] {m['trade']}: {m['company_name']} ({m.get('phone') or m.get('website') or 'no contact'})")


if __name__ == "__main__":
    main()
