from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
import sys

OUT = sys.argv[1]

NAVY  = colors.HexColor("#132452")
ORANGE= colors.HexColor("#fa8c41")
INK   = colors.HexColor("#2b2f38")
GRAY  = colors.HexColor("#5b6270")
LIGHT = colors.HexColor("#f5f6f8")
FAINT = colors.HexColor("#c7cede")

name_s  = ParagraphStyle("name",  fontName="Helvetica-Bold", fontSize=9.3, textColor=NAVY, leading=10.5)
price_s = ParagraphStyle("price", fontName="Helvetica-Bold", fontSize=8.3, textColor=ORANGE, leading=10, alignment=TA_RIGHT)
desc_s  = ParagraphStyle("desc",  fontName="Helvetica", fontSize=8, textColor=INK, leading=9.6)
get_s   = ParagraphStyle("get",   fontName="Helvetica", fontSize=7.5, textColor=GRAY, leading=9)
sect_s  = ParagraphStyle("sect",  fontName="Helvetica-Bold", fontSize=8.2, textColor=colors.white, leading=10)
intro_s = ParagraphStyle("intro", fontName="Helvetica", fontSize=8.6, textColor=INK, leading=11)
foot_s  = ParagraphStyle("foot",  fontName="Helvetica", fontSize=7.3, textColor=GRAY, leading=8.8)
footh_s = ParagraphStyle("footh", fontName="Helvetica-Bold", fontSize=7.6, textColor=NAVY, leading=9.2)
bottom_s= ParagraphStyle("bottom",fontName="Helvetica", fontSize=7.2, textColor=GRAY, leading=9, alignment=TA_LEFT)

COLW = 269
NOPAD = [("LEFTPADDING",(0,0),(-1,-1),0),("RIGHTPADDING",(0,0),(-1,-1),0),
         ("TOPPADDING",(0,0),(-1,-1),0),("BOTTOMPADDING",(0,0),(-1,-1),0)]

def money(name, price):
    return Table([[Paragraph(name, name_s), Paragraph(price, price_s)]],
        colWidths=[COLW-86, 86],
        style=TableStyle(NOPAD + [("VALIGN",(0,0),(-1,-1),"TOP"),("BOTTOMPADDING",(0,0),(-1,-1),1)]))

def product(name, price, desc, get=None):
    fl = [money(name, price), Paragraph(desc, desc_s)]
    if get:
        fl.append(Paragraph("<b>You get:</b> " + get, get_s))
    fl.append(Spacer(1, 7))
    return fl

def section(title):
    t = Table([[Paragraph(title, sect_s)]], colWidths=[COLW],
        style=TableStyle([("BACKGROUND",(0,0),(-1,-1),NAVY),
            ("LEFTPADDING",(0,0),(-1,-1),6),("RIGHTPADDING",(0,0),(-1,-1),6),
            ("TOPPADDING",(0,0),(-1,-1),3.5),("BOTTOMPADDING",(0,0),(-1,-1),3.5)]))
    return [t, Spacer(1, 5)]

# ---------- LEFT COLUMN ----------
left = []
left += section("FOR INVESTORS &amp; WHOLESALERS — SCREEN, ANALYZE, PACKAGE")
left += product("Rehab Budget Snapshot", "Free",
    "A ballpark renovation cost for any NC property before you spend a dollar.",
    "Instant on-screen low-to-high cost, market-adjusted $/SF, top budget risks, timeline, next step.")
left += product("Deal Desk (membership)", '$79 / $199 / $399 mo<br/><font size=6.8 color="#5b6270">+ $99 one-time setup</font>',
    "Prices the rehab and the right offer on every deal you look at, monthly.",
    "A set number of properties/mo (5/15/unlimited); each gets a written budget, an independent value estimate, and the most you can offer. Pro adds a monthly market analysis.")
left += product("Investor Execution Review", "$499 · credit applies",
    "A GC finds the construction risks that wreck returns — before you commit.",
    "A 48-hour written risk report + realistic permit timelines + vetted-sub intros + walk-away point. Refundable; $499 credits toward any deeper level.")
left += product("Deal Pack — Bid-Ready", "$599 / deal",
    "Makes your wholesale deal credible to serious investor-buyers.",
    "A branded PDF signed under #107724 — repair budget, line-by-line dollarized scope, budget-blowers, and loan-killer flags. 2-3 days.")
left += product("Deal Pack — Build-Ready", "$1,997 / deal",
    "A shovel-ready package — with a written GC commitment to the price.",
    "Everything in Bid-Ready, plus floor plans, renderings, 3 sub quotes/trade, a draw schedule, an open-permit + lien sweep, a permit path (every permit the project will require), and a finance-partner referral. 3-4 days.")
left += product("Site Scan + As-Built", "$499 · add-on",
    "Measured plans of the property when none exist.",
    "A field agent captures a full 3D scan; a designer turns it into a measured floor plan (PDF + editable file).")
left += product("Deal Pack Pro", "$897 / mo",
    "For wholesalers doing 2+ deals a month — better pricing + a verification seal.",
    "2 Bid-Readys/mo, more at the $399 verified-member rate, 25% off Build-Ready, 2-day priority, and a “GC-Verified #107724” listing seal.")

# ---------- RIGHT COLUMN ----------
right = []
right += section("BUILD IT — INVESTOR EXECUTION &amp; FULL GC")
right += [Paragraph('Every execution engagement starts with a <b>$99 consultancy fee</b> — credited toward your project.', get_s), Spacer(1, 6)]
right += product("Project Setup &amp; Contractor Coordination", "Starting at $2,500",
    "We structure the whole project so contractors bid identical scope and the build never drifts.")
right += product("Active Project Oversight", "From $6,500",
    "We run the execution layer as your project manager — you keep the permits, the funding, and the upside.")
right += product("Owner-Controlled Build", "From $5,000 + 4%",
    "We pull the permits and own compliance; you keep daily control of the build.")
# Full-Service GC — CORRECTED: two contract structures, cost-plus-fixed-fee preferred
right += [
    money("Full-Service General Contracting", "Cost-Plus or GMP"),
    Paragraph("You bring capital, we deliver keys. Two ways to contract:", desc_s),
    Paragraph("<b>&bull; Cost-Plus a Fixed Fee</b> <i>(our preference)</i> — open-book: you pay the actual cost of the work plus a set contractor fee (a fixed dollar amount, not a percentage). Full transparency, aligned incentives.", get_s),
    Paragraph("<b>&bull; Guaranteed Max / Fixed Price (GMP)</b> — a locked number with an on-schedule penalty; we absorb overruns above it.", get_s),
    Paragraph("Scoped to your file.", get_s),
    Spacer(1, 7),
]
right += section("FOR REALTORS")
right += product("GC Quick Read", "$299",
    "A fast, plain-English GC read before you pay for a full inspection.",
    "Real-vs-cosmetic, anything that stops a loan, a rough total, and a clear call. 1-2 days; credits to the Full Report.")
right += product("GC Inspection + Budget Report", "$899 · rush $1,199",
    "The real repair number — and the same GC commits to do the work at it.",
    "Inspector on-site + a 3-tier budget (must-fix / high-return / optional), paste-ready repair wording, and the build commitment.")
right += product("Realtor Support Plans", '$299 / $649 / $2,499 mo<br/><font size=6.8 color="#5b6270">+ $75 one-time setup</font>',
    "A monthly GC on call for the construction questions across your deals.",
    "Monthly inspection/listing reviews + pricing answers with a response SLA. Solo / team / brokerage.")
right += [Paragraph("&raquo; Realtors can also use Deal Packs — attach a GC-Verified Deal Pack to a rehab-needed or investor listing to pull investor-buyers who pay top of market.", get_s)]

# ---------- HEADER ----------
htitle = Paragraph('<font size=13 color="#ffffff"><b>SOUTHERN CITIES</b></font> <font size=13 color="#fa8c41"><b>CONSTRUCTION</b></font><br/>'
                   '<font size=7 color="#c7cede">LICENSED NORTH CAROLINA GENERAL CONTRACTOR &nbsp;·&nbsp; #107724</font>',
                   ParagraphStyle("ht", leading=15))
hsub = Paragraph('<para align="right"><font size=11 color="#ffffff"><b>Product Guide</b></font><br/>'
                 '<font size=7 color="#c7cede">Value &amp; Deliverables</font></para>',
                 ParagraphStyle("hs", leading=13))
header = Table([[htitle, hsub]], colWidths=[360, 194],
    style=TableStyle([("BACKGROUND",(0,0),(-1,-1),NAVY),("VALIGN",(0,0),(-1,-1),"MIDDLE"),
        ("LEFTPADDING",(0,0),(-1,-1),12),("RIGHTPADDING",(0,0),(-1,-1),12),
        ("TOPPADDING",(0,0),(-1,-1),9),("BOTTOMPADDING",(0,0),(-1,-1),9)]))

intro = Paragraph("<b>One licensed GC, one ladder:</b> screen the deal, get the number, attach the verification, and have us build it at the price we write. "
                  "Every product is priced and stands on its own — fees credit forward as you move up.", intro_s)

body = Table([[left, right]], colWidths=[COLW, COLW],
    style=TableStyle([("VALIGN",(0,0),(-1,-1),"TOP"),
        ("LEFTPADDING",(0,0),(0,0),0),("RIGHTPADDING",(0,0),(0,0),8),
        ("LEFTPADDING",(1,0),(1,0),8),("RIGHTPADDING",(1,0),(1,0),0),
        ("TOPPADDING",(0,0),(-1,-1),0),("BOTTOMPADDING",(0,0),(-1,-1),0)]))

# ---------- FOOTER ----------
ladder = Paragraph('<font name="Helvetica-Bold" color="#132452">How the ladder works</font><br/>'
    "Start free with a Snapshot. Pay for clarity (Quick Read, Execution Review, Deal Desk). Pay for a verified, sellable report (Deal Pack). Then we build it — and each fee credits toward the next step.", foot_s)
guar = Paragraph('<font name="Helvetica-Bold" color="#132452">Every paid level, guaranteed</font><br/>'
    "We evaluate your project before we accept it. If we can't deliver at our standard, full refund. Once we accept, we deliver — you're paying for our commitment, not gambling on the outcome.", foot_s)
buy = Paragraph('<font name="Helvetica-Bold" color="#132452">How to buy</font><br/>'
    "Fixed-price products check out online — no quote, no call. Memberships are month-to-month. Deeper build levels are scoped to your file. Backed by NC GC License #107724.", foot_s)
footer = Table([[ladder, guar, buy]], colWidths=[184, 185, 185],
    style=TableStyle([("BACKGROUND",(0,0),(-1,-1),LIGHT),("VALIGN",(0,0),(-1,-1),"TOP"),
        ("LEFTPADDING",(0,0),(-1,-1),8),("RIGHTPADDING",(0,0),(-1,-1),8),
        ("TOPPADDING",(0,0),(-1,-1),7),("BOTTOMPADDING",(0,0),(-1,-1),7),
        ("LINEAFTER",(0,0),(1,0),0.5,colors.HexColor("#d9dce3"))]))

bottom = Paragraph('<font name="Helvetica-Bold" color="#132452">Southern Cities Construction · NC GC #107724</font>'
    '&nbsp;&nbsp;—&nbsp;&nbsp;Fixed-price products check out online · deeper levels scoped to your project · southerncitiesconstruction.com', bottom_s)

doc = SimpleDocTemplate(OUT, pagesize=letter, topMargin=26, bottomMargin=22, leftMargin=29, rightMargin=29,
    title="Southern Cities Construction — Product Guide")
story = [header, Spacer(1,8), intro, Spacer(1,9), body, Spacer(1,9), footer, Spacer(1,6), bottom]
doc.build(story)
print("built:", OUT)
