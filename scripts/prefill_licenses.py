#!/usr/bin/env python3
"""
prefill_licenses.py [limit]

Best-effort license PREFILL: for licensed-trade subs that have a website, firecrawl-scrape
the site and pull any published license number / license context ("NC License #..."), then
write it to the sub as a CANDIDATE (license_number + a notes line) so a human can confirm it
against the official board in /directory with one glance instead of a full lookup.

Does NOT set license_verified — a human still certifies. Reads keys from ~/.env.supabase.
Uses ~1 firecrawl credit per site. Pass a limit to cap the batch (default 5 for a test).
"""
import os, re, sys, json, subprocess, urllib.request

ENV = os.path.expanduser("~/.openclaw/workspace/.env.supabase")
FIRECRAWL = "/opt/homebrew/bin/firecrawl" if os.path.exists("/opt/homebrew/bin/firecrawl") else "firecrawl"
LIMIT = int(sys.argv[1]) if len(sys.argv) > 1 else 5

LICENSED_TRADES = {
    "Electrical", "Plumbing", "Mechanical / HVAC", "General / Framing",
    "Foundation / Concrete", "Masonry", "Roofing", "Siding / Exterior",
}
# "license"/"lic" mention, then a nearby alphanumeric license token.
CTX_RE = re.compile(r"(licen[cs]e[^\n]{0,80})", re.I)
NUM_RE = re.compile(r"\b([A-Z]{0,3}[-.]?\d{3,7}[A-Z]?)\b")


def load_env():
    e = {}
    for line in open(ENV):
        s = line.strip()
        if s and not s.startswith("#") and "=" in s:
            k, v = s.split("=", 1)
            e[k.strip()] = v.strip()
    return e


def rest(method, url, key, body=None):
    data = json.dumps(body).encode() if body is not None else None
    r = urllib.request.Request(url, data=data, method=method, headers={
        "apikey": key, "Authorization": f"Bearer {key}",
        "Content-Type": "application/json", "Prefer": "return=minimal",
    })
    with urllib.request.urlopen(r, timeout=45) as resp:
        raw = resp.read().decode()
        return json.loads(raw) if raw.strip() else None


def scrape_md(url):
    try:
        out = subprocess.run([FIRECRAWL, "scrape", url, "--only-main-content", "--json"],
                             capture_output=True, text=True, timeout=90).stdout
        d = json.loads(out)
        data = d.get("data") or {}
        return data.get("markdown") or data.get("content") or ""
    except Exception:
        return ""


def find_license(md):
    for m in CTX_RE.finditer(md or ""):
        ctx = re.sub(r"\s+", " ", m.group(1)).strip()
        num = NUM_RE.search(ctx)
        if num:
            return num.group(1), ctx[:120]
    return None, None


def main():
    env = load_env()
    base, key = env["SUPABASE_URL"].rstrip("/"), env["SUPABASE_SERVICE_ROLE_KEY"]

    subs = rest("GET", f"{base}/rest/v1/subcontractors"
                f"?select=id,company_name,trade,website,license_number,notes"
                f"&license_number=is.null&limit=500", key) or []
    targets = [s for s in subs if s["trade"] in LICENSED_TRADES and s.get("website")][:LIMIT]

    found = 0
    for s in targets:
        md = scrape_md(s["website"])
        num, ctx = find_license(md)
        if num:
            found += 1
            note = (s.get("notes") or "") + f" | License candidate from site: {ctx}"
            rest("PATCH", f"{base}/rest/v1/subcontractors?id=eq.{s['id']}", key,
                 {"license_number": num, "notes": note.strip(" |")})
            print(f"  ✓ {s['company_name']} ({s['trade']}): {num}  — {ctx}")
        else:
            print(f"  · {s['company_name']} ({s['trade']}): no license # on site")

    print(f"\nPrefilled {found}/{len(targets)} scanned (of licensed subs with a website).")


if __name__ == "__main__":
    main()
