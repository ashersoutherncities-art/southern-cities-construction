#!/usr/bin/env python3
"""
enrich_contacts.py — fill missing phone/email on subs by scraping their own website.

95% of directory subs have a website but most lack a phone/email. This firecrawl-
scrapes each sub's homepage (and, with --deep, a /contact fallback), extracts a
phone + email, and writes them back to the Supabase `subcontractors` row — BLANK
fields only, never overwriting existing data.

Reads keys from ~/.openclaw/workspace/.env.supabase. Uses /opt/homebrew/bin/firecrawl.

Usage:
  python3 enrich_contacts.py                 # backlog: all subs missing phone or email
  python3 enrich_contacts.py --recent        # only subs created in the last 2 days (daily use)
  python3 enrich_contacts.py --deep          # also scrape a /contact page when still missing
  python3 enrich_contacts.py --limit 50      # cap how many subs to work this run
  python3 enrich_contacts.py --dry-run       # find + print, write nothing
"""
import os, re, json, subprocess, urllib.request, urllib.parse, argparse, datetime, time

ENV = os.path.expanduser("~/.openclaw/workspace/.env.supabase")
FIRECRAWL = "/opt/homebrew/bin/firecrawl" if os.path.exists("/opt/homebrew/bin/firecrawl") else "firecrawl"

PHONE = re.compile(r"\(?\b\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b")
EMAIL = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
BAD_EMAIL = ("noreply", "no-reply", "example", "sentry", "wixpress", "godaddy",
             "cloudflare", "domain.com", "email.com", "yourdomain", "your-email",
             "sentry.io", "wix.com", "squarespace", "schema.org", "w3.org",
             "test@", "user@", "name@", "@2x")
BAD_EMAIL_EXT = (".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif")


def load_env():
    e = {}
    for line in open(ENV):
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
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


def scrape(url, _retry=True):
    # Throttle: firecrawl rate-limits rapid sequential calls, returning empty (which
    # silently loses the sub). Space calls out, and retry once with backoff if the
    # response comes back suspiciously short (a throttled/failed scrape, not a thin site).
    try:
        txt = subprocess.run([FIRECRAWL, "scrape", url, "-f", "markdown"],
                             capture_output=True, text=True, timeout=60).stdout or ""
    except Exception:
        txt = ""
    if len(txt) < 100 and _retry:
        time.sleep(4)
        return scrape(url, _retry=False)
    return txt


def extract(text, site_url):
    ph = PHONE.search(text)
    phone = ph.group(0).strip() if ph else None
    emails = []
    for e in EMAIL.findall(text):
        el = e.lower()
        if any(b in el for b in BAD_EMAIL) or el.endswith(BAD_EMAIL_EXT):
            continue
        emails.append(e)
    # prefer an email on the site's own domain, else first plausible
    host = urllib.parse.urlparse(site_url).netloc.lower().lstrip("www.")
    dom = ".".join(host.split(".")[-2:]) if host else ""
    email = next((e for e in emails if dom and e.lower().endswith(dom)), emails[0] if emails else None)
    return phone, email


def contact_urls(site_url):
    p = urllib.parse.urlparse(site_url)
    base = f"{p.scheme}://{p.netloc}"
    return [base + s for s in ("/contact", "/contact-us", "/contact.html")]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--recent", action="store_true", help="only subs from the last 2 days")
    ap.add_argument("--deep", action="store_true", help="also try a /contact page when still missing")
    ap.add_argument("--limit", type=int, default=100000)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    env = load_env()
    base, key = env["SUPABASE_URL"].rstrip("/"), env["SUPABASE_SERVICE_ROLE_KEY"]

    q = "subcontractors?select=id,company_name,website,phone,email&website=not.is.null&order=created_at.desc&limit=4000"
    if args.recent:
        since = (datetime.date.today() - datetime.timedelta(days=2)).isoformat()
        q += f"&created_at=gte.{since}"
    rows = rest("GET", f"{base}/rest/v1/{q}", key) or []
    todo = [r for r in rows if not (r.get("phone") and str(r["phone"]).strip())
            or not (r.get("email") and str(r["email"]).strip())]
    # phone is the primary outreach channel — work subs missing a phone first
    todo.sort(key=lambda r: 0 if not (r.get("phone") and str(r["phone"]).strip()) else 1)
    todo = todo[:args.limit]
    print(f"{len(todo)} subs to enrich (missing phone and/or email, have website)"
          + (" [DRY RUN]" if args.dry_run else ""))

    got_ph = got_em = 0
    for i, r in enumerate(todo, 1):
        need_phone = not (r.get("phone") and str(r["phone"]).strip())
        need_email = not (r.get("email") and str(r["email"]).strip())
        text = scrape(r["website"])
        phone, email = extract(text, r["website"])
        if args.deep and ((need_phone and not phone) or (need_email and not email)):
            for cu in contact_urls(r["website"]):
                t2 = scrape(cu)
                if t2:
                    p2, e2 = extract(t2, r["website"])
                    phone = phone or p2
                    email = email or e2
                    if (not need_phone or phone) and (not need_email or email):
                        break
        patch = {}
        if need_phone and phone:
            patch["phone"] = phone; got_ph += 1
        if need_email and email:
            patch["email"] = email; got_em += 1
        if patch and not args.dry_run:
            rest("PATCH", f"{base}/rest/v1/subcontractors?id=eq.{r['id']}", key, patch)
        mark = "✎" if patch else " "
        print(f"  {mark} [{i}/{len(todo)}] {r['company_name'][:34]:34} {patch or ''}")
        time.sleep(1.3)  # pace requests so firecrawl doesn't throttle us to empty responses

    print(f"\nDone. Phones added: {got_ph} | Emails added: {got_em} | of {len(todo)} worked.")


if __name__ == "__main__":
    main()
