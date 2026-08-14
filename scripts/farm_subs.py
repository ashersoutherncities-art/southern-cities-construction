#!/usr/bin/env python3
"""
farm_subs.py — the constant sub-farming loop.

Each run: computes the worst trade x region coverage gaps in public.subcontractors,
firecrawl-searches those gaps (rotating across the region's cities) for real
contractor websites, filters out directory aggregators, dedupes against the
directory, and inserts the new ones (unvetted, source='sourced-web-auto') via the
Supabase Data API. Then Telegrams a summary.

Deterministic + cheap (web search, no LLM). Everything lands status='new' for human
vetting in /directory. Reads keys from ~/.openclaw/workspace/.env.supabase.

Coverage design:
- Each NC region has a LIST of cities (REGION_CITIES). A region isn't "covered" by
  one town, so each run rotates through the region's cities (CITIES_PER_GAP per run,
  the window advancing by the calendar day) — over a week or two it sweeps the whole
  region instead of hammering a single anchor city.
- A dry-run guard (subfarmer_state.json) tracks cells that returned nothing new. A
  cell that comes up empty DRY_LIMIT runs in a row is deprioritized, so exhausted
  trade x region cells stop occupying the top slots and starving the rest of the state.

Run daily via launchd (com.scc.subfarmer). Manual: python3 farm_subs.py
"""
import os, re, json, subprocess, urllib.request, datetime, argparse

ENV = os.path.expanduser("~/.openclaw/workspace/.env.supabase")
OPENCLAW = "/Users/ashborn/.openclaw/openclaw.json"
STATE_FILE = os.path.expanduser("~/.openclaw/workspace/logs/subfarmer_state.json")
GEO_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "nc_geo.json")
FIRECRAWL = "/opt/homebrew/bin/firecrawl" if os.path.exists("/opt/homebrew/bin/firecrawl") else "firecrawl"

TRADE_QUERY = {
    "General / Framing": "framing contractor",
    "Roofing": "roofing contractor",
    "Siding / Exterior": "siding contractor",
    "Windows & Doors": "window and door contractor",
    "Drywall / Painting": "drywall and painting contractor",
    "Flooring": "flooring contractor",
    "Tile / Stone": "tile contractor",
    "Kitchen & Bath / Cabinetry": "cabinet and kitchen remodeling contractor",
    "Electrical": "electrical contractor",
    "Plumbing": "plumbing contractor",
    "Mechanical / HVAC": "HVAC contractor",
    "Foundation / Concrete": "concrete foundation contractor",
    "Masonry": "masonry contractor",
    "Insulation / Weatherization": "insulation contractor",
    "Demolition": "demolition contractor",
    "Landscape / Site": "landscaping site contractor",
    "Cleaning / Turnover": "construction cleaning service",
}

# Region -> the cities the farmer rotates through, loaded from nc_geo.json:
# every NC county (all 100) is assigned to one of the 8 canonical regions, and each
# region's search-city list = its county seats + the state's largest municipalities.
# That gives complete statewide coverage (every county reachable) instead of a
# hand-picked handful of metros. Regenerate nc_geo.json from build_nc_geo.py.
with open(GEO_FILE, encoding="utf-8") as _gf:
    REGION_CITIES = json.load(_gf)["region_cities"]
DIRECTORY_DOMAINS = {
    # review / lead-gen / social directories
    "bbb.org", "yelp.com", "angi.com", "angieslist.com", "thumbtack.com", "houzz.com",
    "facebook.com", "mapquest.com", "yellowpages.com", "buildzoom.com", "porch.com",
    "homeadvisor.com", "nextdoor.com", "indeed.com", "linkedin.com", "google.com",
    "instagram.com", "manta.com", "chamberofcommerce.com", "expertise.com", "birdeye.com",
    "networx.com", "trustpilot.com", "apple.com", "reddit.com", "youtube.com",
    "wikipedia.org", "tiktok.com", "yellowbook.com", "superpages.com", "dnb.com", "glassdoor.com",
    "homeyou.com", "procore.com", "networx.com", "houzz.com", "buildertrend.com",
    "yellow.place", "cylex.us.com", "loc8nearme.com", "elocal.com", "opendi.us",
    # big-box / retailer service pages (they list "installers" but aren't the sub)
    "homedepot.com", "lowes.com", "menards.com", "acehardware.com", "costco.com",
    # manufacturer / franchise dealer-locators (a locator page, not a local sub)
    "jeld-wen.com", "owenscorning.com", "gaf.com", "certainteed.com", "jameshardie.com",
    "andersenwindows.com", "pella.com", "marvin.com", "windowworld.com", "ecoview.com",
    "renewalbyandersen.com", "leaffilter.com", "mastic.com", "ply-gem.com", "carrier.com",
    "trane.com", "lennox.com", "rheem.com", "goodmanmfg.com", "bryant.com",
    # utility / chamber / gov referral lists
    "blueridgeenergy.com", "duke-energy.com", "ncchamber.com", "energystar.gov",
}
# Generic words that, on their own, do NOT identify a specific company.
_GENERIC = {
    "contractor", "contractors", "service", "services", "installer", "installers",
    "installation", "replacement", "repair", "repairs", "remodeling", "remodel",
    "construction", "builder", "builders", "building", "company", "co", "llc", "inc",
    "home", "homes", "improvement", "improvements", "near", "me", "you", "best", "top",
    "rated", "star", "dealers", "dealer", "find", "referral", "list", "reviews", "quote",
    "free", "estimate", "professional", "professionals", "local", "trusted", "affordable",
    "nc", "north", "carolina", "county", "the", "and", "of", "in", "for", "your", "we",
    "general", "residential", "commercial", "pros", "pro", "expert", "experts", "solutions",
}
_TRADES = {
    "window", "windows", "siding", "roofing", "roof", "roofer", "roofers", "framing",
    "frame", "electrical", "electric", "electrician", "electricians", "plumbing", "plumber",
    "plumbers", "hvac", "heating", "cooling", "air", "flooring", "floor", "floors", "tile",
    "masonry", "mason", "concrete", "foundation", "foundations", "insulation", "demolition",
    "painting", "painter", "painters", "paint", "cabinet", "cabinets", "cabinetry", "kitchen",
    "bath", "bathroom", "drywall", "gutter", "gutters", "glass", "landscaping", "landscape",
    "cleaning", "weatherization", "exterior", "doors", "door", "deck", "decks", "fencing",
    "hardwood", "vinyl", "laminate", "ceramic", "porcelain", "asphalt", "shingle",
    "carpet", "hardscaping", "hardscape",
}
# NC place words (all region cities + region descriptors), treated like generic tokens:
# a name made only of trade + generic + place words ("Window Replacement Charlotte")
# is a service-page title, not a company — but a distinctive brand token keeps it
# ("Venture Concrete Charlotte", "Griffin Masonry" survive).
_PLACES = {"metro", "triangle", "triad", "sandhills", "coastal", "eastern",
           "northeastern", "western", "piedmont", "area", "greater", "outer", "banks"}
for _cs in REGION_CITIES.values():
    for _c in _cs:
        _PLACES.update(re.findall(r"[a-z']+", _c.lower()))
GAP_MAX = 6          # a trade x region cell with < this many subs is a gap
TOP_GAPS = 6         # gaps to work per run
CITIES_PER_GAP = 2   # cities to search per gap per run (rotates by day across the region)
PER_GAP = 8          # search results per city
DRY_LIMIT = 2        # a cell returning 0 new this many runs in a row gets deprioritized
PHONE_RE = re.compile(r"\(?\b\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b")


def load_env():
    e = {}
    for line in open(ENV):
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            e[k.strip()] = v.strip()
    return e


def load_state():
    try:
        return json.load(open(STATE_FILE))
    except Exception:
        return {}


def save_state(state):
    try:
        os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
        json.dump(state, open(STATE_FILE, "w"), indent=0)
    except Exception:
        pass


def rest(method, url, key, body=None):
    data = json.dumps(body).encode() if body is not None else None
    r = urllib.request.Request(url, data=data, method=method, headers={
        "apikey": key, "Authorization": f"Bearer {key}",
        "Content-Type": "application/json", "Prefer": "return=minimal",
    })
    with urllib.request.urlopen(r, timeout=45) as resp:
        raw = resp.read().decode()
        return json.loads(raw) if raw.strip() else None


def domain(url):
    m = re.match(r"https?://([^/]+)", url or "")
    if not m:
        return ""
    return m.group(1).lower().lstrip("www.").split(":")[0]


def is_directory(url):
    d = domain(url)
    return any(d == bad or d.endswith("." + bad) for bad in DIRECTORY_DOMAINS)


def is_junk_name(name, city=""):
    """True if `name` reads like an SEO page title / generic service phrase, not a company."""
    n = name.lower().strip()
    if len(n) < 3:
        return True
    if city and n == city.lower():
        return True
    if re.search(r"\b\d{5}\b", n):                      # a ZIP code in the "name"
        return True
    # location phrasing: "Roofing Contractor in Lenoir", "... near Raleigh", "serving X"
    if re.search(r"\b(in|near|serving|around)\b", n) and any(w in n for w in _TRADES):
        return True
    for bad in ("dealers near you", "near you", "near me", "referral list", "find contractors",
                "5 star", "5-star", "service area", "service areas", "get a quote",
                "free estimate", "best ", "top ", "...", "»", "coming soon", "for sale",
                "pdf", "opens ", " category", "click here", "learn more", "read more",
                "privacy", "sitemap", "sign in", "log in", "how to", "cost of",
                "cost to", " vs ", "what is", "guide to", "permit"):
        if bad in n:
            return True
    words = re.findall(r"[a-z0-9']+", n)
    # whole "name" is just website nav / page words, not a business
    _PAGEWORDS = {"about", "us", "contact", "home", "services", "service", "inspections",
                  "inspection", "gallery", "projects", "project", "reviews", "testimonials",
                  "blog", "faq", "faqs", "menu", "welcome", "overview", "resources",
                  "category", "categories", "listings", "directory", "search", "results"}
    if words and all(w in _PAGEWORDS for w in words):
        return True
    # every token is a trade or generic word => not a real company name
    # ("Window Installers", "Roofing Contractor", "General Contractor Lenoir")
    if words and all(w in _GENERIC or w in _TRADES or w in _PLACES for w in words):
        return True
    return False


def clean_name(title, city=""):
    """Extract a real company name from a search-result title, or None if it's junk."""
    t = re.split(r"\s[|\-–—:·»]\s", title or "")[0].strip()
    t = re.sub(r",?\s*(NC|N\.C\.|North Carolina)\b.*$", "", t, flags=re.I).strip(" -–—,")
    t = t[:90].strip()
    if not t or is_junk_name(t, city):
        return None
    return t


def firecrawl(query, location):
    try:
        out = subprocess.run(
            [FIRECRAWL, "search", query, "--limit", str(PER_GAP), "--location", location, "--json"],
            capture_output=True, text=True, timeout=90,
        ).stdout
        d = json.loads(out)
        data = d.get("data")
        if isinstance(data, dict):
            data = data.get("web") or data.get("results") or []
        return [x for x in (data or []) if isinstance(x, dict)]
    except Exception:
        return []


def telegram(msg):
    try:
        token = json.load(open(OPENCLAW))["channels"]["telegram"]["botToken"]
        data = json.dumps({"chat_id": "8753570909", "text": msg}).encode()
        r = urllib.request.Request(f"https://api.telegram.org/bot{token}/sendMessage",
                                   data=data, headers={"Content-Type": "application/json"})
        urllib.request.urlopen(r, timeout=20)
    except Exception:
        pass


def rotating_cities(cities, day, k):
    """k cities from the region, window advancing by calendar day."""
    n = len(cities)
    start = day % n
    k = min(k, n)
    return [cities[(start + i) % n] for i in range(k)]


def parse_args():
    ap = argparse.ArgumentParser(description="Farm NC subcontractors into coverage gaps.")
    ap.add_argument("--regions", default="",
                    help="Comma-separated NC_REGIONS to restrict to (default: all). "
                         "Use to force-fill a specific market, e.g. --regions 'Northeastern NC'")
    ap.add_argument("--top", type=int, default=TOP_GAPS, help=f"gaps to work this run (default {TOP_GAPS})")
    ap.add_argument("--cities", type=int, default=CITIES_PER_GAP,
                    help=f"cities to search per gap (default {CITIES_PER_GAP})")
    return ap.parse_args()


def main():
    args = parse_args()
    only = [r.strip() for r in args.regions.split(",") if r.strip()]
    for r in only:
        if r not in REGION_CITIES:
            raise SystemExit(f"Unknown region {r!r}. Valid: {list(REGION_CITIES)}")

    env = load_env()
    base, key = env["SUPABASE_URL"].rstrip("/"), env["SUPABASE_SERVICE_ROLE_KEY"]
    state = load_state()
    day = datetime.date.today().toordinal()

    rows = rest("GET", f"{base}/rest/v1/subcontractors?select=company_name,trade,regions", key) or []
    have = {(str(r["company_name"]).lower(), r["trade"]) for r in rows}
    cell_count = {}
    for r in rows:
        for reg in (r.get("regions") or []):
            cell_count[(reg, r["trade"])] = cell_count.get((reg, r["trade"]), 0) + 1

    # Build gap list: every region x trade cell below GAP_MAX. Sort worst-first, but
    # push cells that have been dry DRY_LIMIT+ runs to the back so exhausted cells
    # don't permanently occupy the top slots and starve un-worked gaps.
    gaps = []
    for reg in REGION_CITIES:
        if only and reg not in only:
            continue
        for trade in TRADE_QUERY:
            c = cell_count.get((reg, trade), 0)
            if c < GAP_MAX:
                dry = state.get(f"{reg}|{trade}", {}).get("dry", 0)
                gaps.append((1 if dry >= DRY_LIMIT else 0, c, reg, trade))
    gaps.sort(key=lambda x: (x[0], x[1]))
    targets = gaps[:args.top]

    payload, seen, hit_cells = [], set(), []
    for _, c, reg, trade in targets:
        cities = rotating_cities(REGION_CITIES[reg], day, args.cities)
        added_here = 0
        for city in cities:
            results = firecrawl(f"{TRADE_QUERY[trade]} in {city} North Carolina",
                                f"{city},North Carolina,United States")
            for res in results:
                url = res.get("url") or ""
                if not url or is_directory(url):
                    continue
                name = clean_name(res.get("title") or "", city)
                if not name:
                    continue
                keypair = (name.lower(), trade)
                if keypair in have or keypair in seen:
                    continue
                seen.add(keypair)
                ph = PHONE_RE.search(res.get("description") or "")
                payload.append({
                    "company_name": name, "phone": ph.group(0) if ph else None, "website": url,
                    "trade": trade, "source_trade": trade, "regions": [reg],
                    "source_service_area": f"{city} / {reg}", "home_base_city": city,
                    "notes": f"Auto-farmed {city} gap. Source: {url}",
                    "source": "sourced-web-auto", "status": "new",
                    "license_verified": False, "availability_status": "unknown",
                })
                added_here += 1
        # dry-run bookkeeping: reset on a hit, increment on an empty run
        prev = state.get(f"{reg}|{trade}", {}).get("dry", 0)
        state[f"{reg}|{trade}"] = {"dry": 0 if added_here > 0 else prev + 1}
        label = f"{trade.split(' / ')[0]}×{reg.split(' (')[0].split(' / ')[0]}(+{added_here})"
        hit_cells.append(label)

    if payload:
        rest("POST", f"{base}/rest/v1/subcontractors", key, payload)
    save_state(state)
    total = len(rest("GET", f"{base}/rest/v1/subcontractors?select=id", key) or [])

    summary = (f"🔧 Sub farmer: +{len(payload)} new subs → directory now {total}.\n"
               f"Gaps worked: {', '.join(hit_cells) if hit_cells else 'none'}")
    print(summary)
    telegram(summary)


if __name__ == "__main__":
    main()
