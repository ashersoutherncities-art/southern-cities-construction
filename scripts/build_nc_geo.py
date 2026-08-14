#!/usr/bin/env python3
"""
build_nc_geo.py — regenerate nc_geo.json (the farmer's statewide target map).

Embeds the authoritative assignment of all 100 NC counties to the 8 canonical
NC_REGIONS (kept in sync with sc-platform/lib/vendors.ts), plus each county's seat
and the state's largest municipalities. Output nc_geo.json drives farm_subs.py.

Edit REGION_COUNTIES / COUNTY_SEAT / MAJOR_MUNIS below, then: python3 build_nc_geo.py
"""
import json, os

REGION_COUNTIES = {
 "Charlotte Metro": [
  "Mecklenburg",
  "Cabarrus",
  "Union",
  "Gaston",
  "Iredell",
  "Rowan",
  "Lincoln",
  "Cleveland",
  "Stanly",
  "Anson"
 ],
 "Triangle (Raleigh–Durham)": [
  "Wake",
  "Durham",
  "Orange",
  "Chatham",
  "Johnston",
  "Franklin",
  "Granville",
  "Person",
  "Vance",
  "Warren",
  "Lee",
  "Harnett"
 ],
 "Triad (Greensboro–Winston-Salem)": [
  "Guilford",
  "Forsyth",
  "Alamance",
  "Davidson",
  "Randolph",
  "Rockingham",
  "Surry",
  "Stokes",
  "Yadkin",
  "Davie",
  "Caswell",
  "Montgomery"
 ],
 "Fayetteville / Sandhills": [
  "Cumberland",
  "Hoke",
  "Robeson",
  "Scotland",
  "Richmond",
  "Moore",
  "Bladen",
  "Sampson"
 ],
 "Wilmington / Coastal": [
  "New Hanover",
  "Brunswick",
  "Pender",
  "Columbus",
  "Onslow",
  "Carteret"
 ],
 "Eastern NC": [
  "Pitt",
  "Nash",
  "Edgecombe",
  "Wilson",
  "Beaufort",
  "Martin",
  "Halifax",
  "Northampton",
  "Craven",
  "Lenoir",
  "Wayne",
  "Jones",
  "Pamlico",
  "Greene",
  "Duplin",
  "Hyde"
 ],
 "Northeastern NC": [
  "Pasquotank",
  "Camden",
  "Currituck",
  "Dare",
  "Chowan",
  "Perquimans",
  "Gates",
  "Hertford",
  "Bertie",
  "Tyrrell",
  "Washington"
 ],
 "Western NC (Asheville)": [
  "Buncombe",
  "Henderson",
  "Haywood",
  "Transylvania",
  "Madison",
  "Yancey",
  "Mitchell",
  "Avery",
  "Watauga",
  "Ashe",
  "Alleghany",
  "Wilkes",
  "McDowell",
  "Rutherford",
  "Polk",
  "Jackson",
  "Macon",
  "Swain",
  "Graham",
  "Cherokee",
  "Clay",
  "Catawba",
  "Burke",
  "Caldwell",
  "Alexander"
 ]
}

COUNTY_SEAT = {
 "Mecklenburg": "Charlotte",
 "Cabarrus": "Concord",
 "Union": "Monroe",
 "Gaston": "Gastonia",
 "Iredell": "Statesville",
 "Rowan": "Salisbury",
 "Lincoln": "Lincolnton",
 "Cleveland": "Shelby",
 "Stanly": "Albemarle",
 "Anson": "Wadesboro",
 "Wake": "Raleigh",
 "Durham": "Durham",
 "Orange": "Hillsborough",
 "Chatham": "Pittsboro",
 "Johnston": "Smithfield",
 "Franklin": "Louisburg",
 "Granville": "Oxford",
 "Person": "Roxboro",
 "Vance": "Henderson",
 "Warren": "Warrenton",
 "Lee": "Sanford",
 "Harnett": "Lillington",
 "Guilford": "Greensboro",
 "Forsyth": "Winston-Salem",
 "Alamance": "Graham",
 "Davidson": "Lexington",
 "Randolph": "Asheboro",
 "Rockingham": "Wentworth",
 "Surry": "Dobson",
 "Stokes": "Danbury",
 "Yadkin": "Yadkinville",
 "Davie": "Mocksville",
 "Caswell": "Yanceyville",
 "Montgomery": "Troy",
 "Cumberland": "Fayetteville",
 "Hoke": "Raeford",
 "Robeson": "Lumberton",
 "Scotland": "Laurinburg",
 "Richmond": "Rockingham",
 "Moore": "Carthage",
 "Bladen": "Elizabethtown",
 "Sampson": "Clinton",
 "New Hanover": "Wilmington",
 "Brunswick": "Bolivia",
 "Pender": "Burgaw",
 "Columbus": "Whiteville",
 "Onslow": "Jacksonville",
 "Carteret": "Beaufort",
 "Pitt": "Greenville",
 "Nash": "Nashville",
 "Edgecombe": "Tarboro",
 "Wilson": "Wilson",
 "Beaufort": "Washington",
 "Martin": "Williamston",
 "Halifax": "Halifax",
 "Northampton": "Jackson",
 "Craven": "New Bern",
 "Lenoir": "Kinston",
 "Wayne": "Goldsboro",
 "Jones": "Trenton",
 "Pamlico": "Bayboro",
 "Greene": "Snow Hill",
 "Duplin": "Kenansville",
 "Hyde": "Swan Quarter",
 "Pasquotank": "Elizabeth City",
 "Camden": "Camden",
 "Currituck": "Currituck",
 "Dare": "Manteo",
 "Chowan": "Edenton",
 "Perquimans": "Hertford",
 "Gates": "Gatesville",
 "Hertford": "Winton",
 "Bertie": "Windsor",
 "Tyrrell": "Columbia",
 "Washington": "Plymouth",
 "Buncombe": "Asheville",
 "Henderson": "Hendersonville",
 "Haywood": "Waynesville",
 "Transylvania": "Brevard",
 "Madison": "Marshall",
 "Yancey": "Burnsville",
 "Mitchell": "Bakersville",
 "Avery": "Newland",
 "Watauga": "Boone",
 "Ashe": "Jefferson",
 "Alleghany": "Sparta",
 "Wilkes": "Wilkesboro",
 "McDowell": "Marion",
 "Rutherford": "Rutherfordton",
 "Polk": "Columbus",
 "Jackson": "Sylva",
 "Macon": "Franklin",
 "Swain": "Bryson City",
 "Graham": "Robbinsville",
 "Cherokee": "Murphy",
 "Clay": "Hayesville",
 "Catawba": "Newton",
 "Burke": "Morganton",
 "Caldwell": "Lenoir",
 "Alexander": "Taylorsville"
}

# (municipality, region) for the state's largest cities beyond the county seats.
MAJOR_MUNIS = [
 [
  "Apex",
  "Triangle (Raleigh–Durham)"
 ],
 [
  "Burlington",
  "Triad (Greensboro–Winston-Salem)"
 ],
 [
  "Carrboro",
  "Triangle (Raleigh–Durham)"
 ],
 [
  "Cary",
  "Triangle (Raleigh–Durham)"
 ],
 [
  "Chapel Hill",
  "Triangle (Raleigh–Durham)"
 ],
 [
  "Clayton",
  "Triangle (Raleigh–Durham)"
 ],
 [
  "Clemmons",
  "Triad (Greensboro–Winston-Salem)"
 ],
 [
  "Cornelius",
  "Charlotte Metro"
 ],
 [
  "Fuquay-Varina",
  "Triangle (Raleigh–Durham)"
 ],
 [
  "Garner",
  "Triangle (Raleigh–Durham)"
 ],
 [
  "Harrisburg",
  "Charlotte Metro"
 ],
 [
  "Hickory",
  "Western NC (Asheville)"
 ],
 [
  "High Point",
  "Triad (Greensboro–Winston-Salem)"
 ],
 [
  "Holly Springs",
  "Triangle (Raleigh–Durham)"
 ],
 [
  "Huntersville",
  "Charlotte Metro"
 ],
 [
  "Indian Trail",
  "Charlotte Metro"
 ],
 [
  "Kannapolis",
  "Charlotte Metro"
 ],
 [
  "Kernersville",
  "Triad (Greensboro–Winston-Salem)"
 ],
 [
  "Knightdale",
  "Triangle (Raleigh–Durham)"
 ],
 [
  "Leland",
  "Wilmington / Coastal"
 ],
 [
  "Matthews",
  "Charlotte Metro"
 ],
 [
  "Mebane",
  "Triad (Greensboro–Winston-Salem)"
 ],
 [
  "Mint Hill",
  "Charlotte Metro"
 ],
 [
  "Mooresville",
  "Charlotte Metro"
 ],
 [
  "Morrisville",
  "Triangle (Raleigh–Durham)"
 ],
 [
  "Rocky Mount",
  "Eastern NC"
 ],
 [
  "Thomasville",
  "Triad (Greensboro–Winston-Salem)"
 ],
 [
  "Wake Forest",
  "Triangle (Raleigh–Durham)"
 ],
 [
  "Waxhaw",
  "Charlotte Metro"
 ]
]

def main():
    county_region = {c: reg for reg, cs in REGION_COUNTIES.items() for c in cs}
    region_cities = {reg: set() for reg in REGION_COUNTIES}
    for c, reg in county_region.items():
        if COUNTY_SEAT.get(c):
            region_cities[reg].add(COUNTY_SEAT[c])
    for name, reg in MAJOR_MUNIS:
        if reg in region_cities:
            region_cities[reg].add(name)
    geo = {
        "county_region": county_region,
        "county_seat": COUNTY_SEAT,
        "region_cities": {reg: sorted(v) for reg, v in region_cities.items()},
    }
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "nc_geo.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(geo, f, indent=1, ensure_ascii=False)
    print("counties:", len(county_region), "| regions:", len(region_cities))
    print("wrote", out)

if __name__ == "__main__":
    main()
