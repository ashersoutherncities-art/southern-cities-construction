#!/usr/bin/env python3
"""
export_call_list.py — export a ready-to-dial CSV of vetted subcontractors.

Pulls from the Supabase `subcontractors` master and writes a clean call list.
Default = license-verified subs that have a phone (the commit-ready, dial-ready set),
ordered by region then trade.

Usage:
  python3 export_call_list.py                      # verified + has phone (default)
  python3 export_call_list.py --all-reachable      # any sub with a phone OR email
  python3 export_call_list.py --out /path/file.csv
"""
import os, json, csv, argparse, urllib.request

ENV = os.path.expanduser("~/.openclaw/workspace/.env.supabase")


def load_env():
    e = {}
    for line in open(ENV):
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            e[k.strip()] = v.strip()
    return e


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--all-reachable", action="store_true",
                    help="export any sub with a phone or email (not just license-verified)")
    ap.add_argument("--out", default=os.path.expanduser("~/.openclaw/workspace/data/sub_call_list.csv"))
    args = ap.parse_args()

    env = load_env()
    base, key = env["SUPABASE_URL"].rstrip("/"), env["SUPABASE_SERVICE_ROLE_KEY"]
    r = urllib.request.Request(
        f"{base}/rest/v1/subcontractors?select=company_name,trade,regions,home_base_city,"
        f"phone,email,license_number,license_verified,status,website&limit=5000",
        headers={"apikey": key, "Authorization": f"Bearer {key}"})
    rows = json.load(urllib.request.urlopen(r, timeout=60))

    def has(v):
        return bool(v and str(v).strip())

    if args.all_reachable:
        keep = [x for x in rows if has(x.get("phone")) or has(x.get("email"))]
    else:
        keep = [x for x in rows if x.get("license_verified") and has(x.get("phone"))]

    keep.sort(key=lambda x: ((x.get("regions") or ["~"])[0], x.get("trade") or "", x.get("company_name") or ""))

    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    cols = ["Company", "Trade", "Region", "City", "Phone", "Email", "License #",
            "License Verified", "Status", "Website"]
    with open(args.out, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(cols)
        for x in keep:
            w.writerow([
                x.get("company_name", ""), x.get("trade", ""),
                "; ".join(x.get("regions") or []), x.get("home_base_city", ""),
                x.get("phone", ""), x.get("email", ""), x.get("license_number", ""),
                "yes" if x.get("license_verified") else "no",
                x.get("status", ""), x.get("website", ""),
            ])
    print(f"Wrote {len(keep)} rows -> {args.out}")
    # quick breakdown
    from collections import Counter
    by = Counter((x.get("regions") or ["?"])[0] for x in keep)
    for reg, n in by.most_common():
        print(f"  {n:3}  {reg}")


if __name__ == "__main__":
    main()
