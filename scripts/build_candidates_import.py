#!/usr/bin/env python3
"""
build_candidates_import.py

Phase 3 sub-farming: turn sourced candidate subs (JSON) into paste-ready SQL that
upserts them into public.subcontractors. Reusable for any sourcing run — web,
NC license-board rosters, permit records — as long as candidates match the shape:

  { "company_name", "contact_name", "trade", "region", "city",
    "phone", "email", "website", "specialties", "source_url" }

Candidates land as source='sourced-web', status='new', unvetted (license_verified=false,
availability_status='unknown') — same lifecycle as the original 119 seed, ready for the
VendorBoard vetting workflow. Idempotent via ON CONFLICT (lower(company_name), trade).

Usage:  python3 build_candidates_import.py candidates.json > /dev/null
        (writes ../supabase/candidates_import.sql)
"""
import sys, os, json, html

HERE = os.path.dirname(os.path.abspath(__file__))
IN = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, 'candidates.json')
OUT = os.path.normpath(os.path.join(HERE, '..', 'supabase', 'candidates_import.sql'))

COMMON_TRADES = {
    "General / Framing", "Roofing", "Siding / Exterior", "Windows & Doors", "Drywall / Painting",
    "Flooring", "Tile / Stone", "Kitchen & Bath / Cabinetry", "Electrical", "Plumbing",
    "Mechanical / HVAC", "Foundation / Concrete", "Masonry", "Insulation / Weatherization",
    "Demolition", "Landscape / Site", "Cleaning / Turnover", "Other",
}
NC_REGIONS = {
    "Charlotte Metro", "Triangle (Raleigh–Durham)", "Triad (Greensboro–Winston-Salem)",
    "Fayetteville / Sandhills", "Wilmington / Coastal", "Eastern NC", "Western NC (Asheville)",
}


def s(v):
    if v is None or (isinstance(v, str) and v.strip() == ""):
        return "NULL"
    return "'" + str(v).strip().replace("'", "''") + "'"


def main():
    rows = json.load(open(IN))
    # Decode HTML entities web-sourced data often carries (&amp; -> &) so trades/names
    # match the canonical values exactly.
    rows = [{k: (html.unescape(v) if isinstance(v, str) else v) for k, v in r.items()} for r in rows]
    lines, skipped, seen = [], [], set()
    lines.append("-- Phase 3 sourced candidates -> public.subcontractors (source='sourced-web', unvetted).")
    lines.append("-- Idempotent via ON CONFLICT (lower(company_name), trade).")
    lines.append("")

    for r in rows:
        company = (r.get("company_name") or "").strip()
        trade = (r.get("trade") or "").strip()
        region = (r.get("region") or "").strip()
        phone = r.get("phone")
        website = r.get("website")
        # Guards: must have a name, a valid trade+region, and at least one contact method.
        if not company or trade not in COMMON_TRADES or region not in NC_REGIONS:
            skipped.append((company, trade, region, "invalid trade/region/name"))
            continue
        if not (phone or website):
            skipped.append((company, trade, region, "no phone or website"))
            continue
        key = (company.lower(), trade)
        if key in seen:
            continue
        seen.add(key)

        note = f"Sourced via web. Source: {r.get('source_url') or 'n/a'}"
        vals = [
            s(company), s(r.get("contact_name")), s(r.get("email")), s(phone), s(website),
            s(trade), s(trade), s(r.get("specialties")),
            f"ARRAY[{s(region)}]::text[]", s((r.get('city') or '') + ' / ' + region), s(r.get("city")),
            s(note),
        ]
        lines.append(
            "insert into public.subcontractors "
            "(company_name, contact_name, email, phone, website, trade, source_trade, specialties, "
            "regions, source_service_area, home_base_city, notes, source, status, license_verified, availability_status) "
            "values (" + ", ".join(vals) +
            ", 'sourced-web', 'new', false, 'unknown') on conflict (lower(company_name), trade) do nothing;"
        )

    lines.append("")
    lines.append(f"-- {len(seen)} candidates written; {len(skipped)} skipped.")
    with open(OUT, "w") as f:
        f.write("\n".join(lines) + "\n")

    print(f"Wrote {OUT}: {len(seen)} candidates, {len(skipped)} skipped.")
    for c, t, rg, why in skipped:
        print(f"  SKIP [{why}]: {c} / {t} / {rg}")


if __name__ == "__main__":
    main()
