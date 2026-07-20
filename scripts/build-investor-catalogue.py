from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, KeepTogether, PageBreak, Flowable
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_RIGHT
import sys

OUT = sys.argv[1]
NAVY = colors.HexColor("#132452"); NAVY2 = colors.HexColor("#1c3468"); ORANGE = colors.HexColor("#fa8c41")
INK = colors.HexColor("#2b2f38"); GRAY = colors.HexColor("#5b6270"); LIGHT = colors.HexColor("#f5f6f8"); FAINT = colors.HexColor("#c7cede")

name_s  = ParagraphStyle("n", fontName="Helvetica-Bold", fontSize=11, textColor=NAVY, leading=13)
price_s = ParagraphStyle("p", fontName="Helvetica-Bold", fontSize=9.5, textColor=ORANGE, leading=12, alignment=TA_RIGHT)
meta_s  = ParagraphStyle("m", fontName="Helvetica-Oblique", fontSize=8.5, textColor=GRAY, leading=11)
bul_s   = ParagraphStyle("b", fontName="Helvetica", fontSize=9, textColor=INK, leading=12, leftIndent=10)
sect_s  = ParagraphStyle("s", fontName="Helvetica-Bold", fontSize=10.5, textColor=colors.white, leading=13)
subq_s  = ParagraphStyle("sq", fontName="Helvetica-Oblique", fontSize=9, textColor=FAINT, leading=12)
note_s  = ParagraphStyle("no", fontName="Helvetica-Oblique", fontSize=8.5, textColor=ORANGE, leading=11, leftIndent=10)
intro_s = ParagraphStyle("i", fontName="Helvetica", fontSize=9.5, textColor=INK, leading=13)

W = 554
NOPAD = [("LEFTPADDING",(0,0),(-1,-1),0),("RIGHTPADDING",(0,0),(-1,-1),0),("TOPPADDING",(0,0),(-1,-1),0),("BOTTOMPADDING",(0,0),(-1,-1),0)]

def header_band(sub):
    return Table([[Paragraph(f'<font size=15 color="#ffffff"><b>SOUTHERN CITIES</b></font> <font size=15 color="#fa8c41"><b>CONSTRUCTION</b></font><br/>'
        f'<font size=8 color="#c7cede">{sub}</font>', ParagraphStyle("h", leading=17))]],
        colWidths=[W], style=TableStyle([("BACKGROUND",(0,0),(-1,-1),NAVY),("LEFTPADDING",(0,0),(-1,-1),12),
            ("RIGHTPADDING",(0,0),(-1,-1),12),("TOPPADDING",(0,0),(-1,-1),10),("BOTTOMPADDING",(0,0),(-1,-1),10)]))

def section(num, title, question):
    return Table([[Paragraph(f"{num}", ParagraphStyle("num", fontName="Helvetica-Bold", fontSize=17, textColor=ORANGE)),
                   Paragraph(f'<font color="#ffffff"><b>{title}</b></font><br/><font size=8.5 color="#c7cede"><i>{question}</i></font>', ParagraphStyle("st", leading=13))]],
        colWidths=[34, W-34],
        style=TableStyle([("BACKGROUND",(0,0),(-1,-1),NAVY),("VALIGN",(0,0),(-1,-1),"MIDDLE"),
            ("LEFTPADDING",(0,0),(0,0),12),("LEFTPADDING",(1,0),(1,0),2),("RIGHTPADDING",(0,0),(-1,-1),10),
            ("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6)]))

def product(name, price, meta, bullets, note=None):
    head = Table([[Paragraph(name, name_s), Paragraph(price, price_s)]], colWidths=[W-120, 120],
        style=TableStyle(NOPAD + [("VALIGN",(0,0),(-1,-1),"TOP"),("BOTTOMPADDING",(0,0),(-1,-1),1)]))
    fl = [head]
    if meta: fl.append(Paragraph(meta, meta_s))
    fl.append(Spacer(1, 2))
    for b in bullets:
        fl.append(Paragraph(f"•&nbsp; {b}", bul_s))
    if note: fl.append(Paragraph(note, note_s))
    fl.append(Spacer(1, 9))
    return KeepTogether(fl)

# ---------- Page 1: the visual value ladder ----------
class ValueLadder(Flowable):
    def __init__(self, width, height):
        Flowable.__init__(self); self.width = width; self.height = height
    def draw(self):
        c = self.canv
        steps = [
            ("1", "KNOW YOUR NUMBER", "Should I do this deal — and what do I offer?", "Budget Snapshot · Deal Desk · CMA", "START FREE"),
            ("2", "LOCK THE PLAN", "Exactly what gets built, and for how much.", "Deal Packs · Budget Review · Plans · Site Scan", "from $599"),
            ("3", "SET IT UP", "Get it ready to build.", "$99 Consult · Project Setup · Contractor Fit + Match", "from $99"),
            ("4", "BUILD IT", "Get it built.", "Active Oversight · Owner-Controlled · Full GC", "from $6,500"),
        ]
        n = len(steps); bw = self.width * 0.66; bh = 84
        gy = (self.height - bh) / (n - 1); gx = (self.width - bw) / (n - 1)
        # connectors first (behind boxes)
        c.setStrokeColor(ORANGE); c.setLineWidth(1.4); c.setDash(2, 3)
        for i in range(n - 1):
            x1 = i * gx + bw * 0.5; y1 = (n - 1 - i) * gy
            x2 = (i + 1) * gx + bw * 0.5; y2 = (n - 2 - i) * gy + bh
            c.line(x1, y1, x2, y2)
        c.setDash()
        for i, (num, title, tag, prods, price) in enumerate(steps):
            x = i * gx; y = (n - 1 - i) * gy
            c.setFillColor(NAVY if i % 2 == 0 else NAVY2)
            c.roundRect(x, y, bw, bh, 9, fill=1, stroke=0)
            c.setFillColor(ORANGE); c.roundRect(x, y, 7, bh, 3, fill=1, stroke=0)
            tx = x + 20
            c.setFillColor(ORANGE); c.setFont("Helvetica-Bold", 22)
            c.drawString(tx, y + bh - 34, num)
            c.setFillColor(colors.white); c.setFont("Helvetica-Bold", 12.5)
            c.drawString(tx + 34, y + bh - 26, title)
            c.setFillColor(FAINT); c.setFont("Helvetica-Oblique", 8.5)
            c.drawString(tx + 34, y + bh - 41, tag)
            c.setFillColor(colors.HexColor("#e7ebf3")); c.setFont("Helvetica", 8)
            c.drawString(tx + 34, y + 16, prods)
            c.setFillColor(ORANGE); c.setFont("Helvetica-Bold", 11)
            c.drawRightString(x + bw - 16, y + bh - 26, price)

story = [header_band("INVESTOR PRODUCT CATALOGUE &nbsp;·&nbsp; Licensed NC GC #107724"), Spacer(1, 12)]
story.append(Paragraph('<b>One path, four stages — every fee credits forward.</b>  A deal climbs from "is this worth doing?" to "it\'s built." '
    'Add an <b>SC Realty CMA ($99 members / $149 non-members)</b> to any budget product, standalone, or inside Deal Desk.', intro_s))
story.append(Spacer(1, 14))
story.append(ValueLadder(W, 540))
story.append(PageBreak())

# ---------- Pages 2+: detailed catalogue by stage ----------
story.append(header_band("THE DETAIL — every product &amp; exactly what you get"))
story.append(Spacer(1, 10))

story.append(section("1", "KNOW YOUR NUMBER", "Should I do this deal — and what do I offer?"))
story.append(Spacer(1, 6))
story.append(product("Budget Snapshot", "Free", "Instant · automated · branded PDF emailed",
    ["Preliminary budget range, timeline range, confidence level, risk flags", "Likely project category (cosmetic → full gut / structural)"]))
story.append(product("Deal Desk (membership)", "$79 / $199 / $399 mo", "+ $99 one-time setup · recurring",
    ["GC-verified rehab + <b>Max Allowable Offer</b> on every deal (5 / 15 / unlimited snapshots/mo)",
     "Active+ adds a 2nd independent valuation; Pro adds priority + 1 SC Realty CMA credit/mo"], note="CMA suggested here."))
story.append(product("SC Realty CMA", "$99 members / $149 non-members", "Licensed-broker opinion of value (not an appraisal)",
    ["Comparative market analysis / ARV — the value side of your deal math", "Add to any budget product, buy standalone, or 1/mo free on Deal Desk Pro"]))

story.append(section("2", "LOCK THE PLAN", "Exactly what gets built, and for how much."))
story.append(Spacer(1, 6))
story.append(product("Deal Pack — Bid-Ready", "$599 / deal", "2–3 business days · branded #107724 PDF",
    ["GC-certified 3-tier budget range", "Dollarized line-item scope of work", "Top execution risks with cost-to-cure", "Loan-killer flags"],
    note="Suggest a CMA. No plans? Add Site Scan."))
story.append(product("Deal Pack — Build-Ready", "$1,997 / deal", "3–4 business days · shovel-ready package",
    ["Everything in Bid-Ready + the GC's <b>written commitment to build at that price</b>",
     "Future-state floor plans + 2–3 renderings · room-by-room scope", "<b>Materials / quantity takeoff</b> · <b>mood board</b> · <b>targeted materials vendors &amp; suppliers</b>",
     "3 sub quotes/trade · lender draw schedule · open-permit + lien sweep · permit path · finance-partner referral · license-stamped covers"],
    note="Suggest a CMA. Add Site Scan if no existing plans."))
story.append(product("Budget &amp; Scope Review", "$399", "2 business days · you bring the budget, we pressure-test it",
    ["Line-by-line review, scope-gap analysis, market-rate corrections, contingency/reserve recommendation, bid-grade summary number"],
    note="Also useful pre-offer to validate seller or contractor numbers."))
story.append(product("As-Built Plans", "$349", "Measured existing-condition floor plan · 1 revision", ["PDF + editable file"]))
story.append(product("Future-State Plans", "$699", "Proposed design floor plan · 2 revisions", ["PDF + editable file"]))
story.append(product("Renderings (photoreal)", "$199 ea / 3 for $499", "1 revision each · extra revision $99", ["Photoreal 3D of the proposed design"]))
story.append(product("Site Scan + As-Built + Inspection", "$699", "Field visit · 5 business days",
    ["NC field agent + full 3D property scan", "Designer-built as-built floorplan (PDF + native file)", "<b>Licensed third-party inspector service</b> included"]))

story.append(section("3", "SET IT UP", "Get it ready to build."))
story.append(Spacer(1, 6))
story.append(product("Execution Consultation", "$99", "Credits toward your project · scoping call",
    ["Paid consult that maps the right execution path. Every execution engagement starts here."]))
story.append(product("Project Setup &amp; Pre-Construction Management", "$3,500 / mo", "Min: &lt;$40k = 1 mo · $40–65k = 2 mo · &gt;$65k = 3 mo",
    ["Project timeline · cash-expenditure projections + plan · draw-schedule alignment",
     "Contractor + subcontractor bench · permit &amp; inspection admin", "<b>Contractor Fit + Match Bundle included</b> · best vendor options for materials"],
    note="Gets the project ready &amp; launched, then rolls into Active Oversight for the build."))
story.append(product("Contractor Fit Consultation", "$349", "Scheduled consultation",
    ["The contractor <b>types</b> the project requires · recommended mix + wrong-fit to avoid", "<b>Outlined next steps</b> · <b>contractor plug-ins tailored to your terms &amp; needs</b>"]))
story.append(product("Contractor Match &amp; Bid Coordination", "$1,499", "7–10 business days",
    ["Source 3–5 vetted candidates/trade · structured bid intake · leveled comparison · risk/gap callouts · written award recommendation"]))
story.append(product("Contractor Fit + Match Bundle", "$1,899", "Bundle",
    ["Contractor Fit Consultation", "Contractor Match &amp; Bid Coordination", "<b>Permit &amp; Local Compliance Review</b>"]))
story.append(product("Permit &amp; Local Compliance Review", "$399", "2 business days · standalone",
    ["Permit-path review · local compliance notes · risk callouts · recommended next step"]))
story.append(product("Permit Admin", "$1,499", "Standalone permit administration",
    ["Permit submission + correction handling · inspection coordination · status tracking",
     "For when you just need the permits pulled and run — not a full Project Setup engagement"]))

story.append(section("4", "BUILD IT", "Get it built."))
story.append(Spacer(1, 6))
story.append(product("Active Oversight — Project Management tier", "from $6,500", "Flat per project: Light $6,500 / Standard $12,500 / Heavy $19,500 / Complex $28,500",
    ["We coordinate <b>labor, materials logistics, inspections, and draws</b>", "Progress + budget + schedule tracking · written change log · weekly reports · issue escalation"],
    note="Project management / coordination. QA is NOT included at this tier (that's Owner-Controlled Build / Full GC)."))
story.append(product("Owner-Controlled Build", "from $5,000 + 4%/mo", "Engagement $5–15k + 4% of budget/mo during construction",
    ["Permits pulled under Southern Cities' license · GC oversight + authority structure", "AHJ inspection coordination · compliance · execution-control · budget visibility · field validation — you keep daily control"]))
story.append(product("Full-Service General Contracting", "Scoped", "Cost-Plus a Fixed Fee (preferred) or GMP · no minimum size",
    ["The entire build: planning, permits, sub management, procurement, scheduling, site supervision, budget admin, draws, inspections, QC, delivery, punch list, warranty",
     "Single point of accountability"]))
story.append(product("Draw Management", "$599 one-time", "Manage ALL draws for a project",
    ["We run every draw · inspection photos as required <i>(separate fee)</i>", "We submit draws for you (can take your logins) · we collect all receipts + proof of payment"]))

story.append(Spacer(1, 6))
story.append(Table([[Paragraph('<font color="#132452"><b>Retired:</b></font> Investor Execution Review, Due Diligence Bundle, Contractor-Grade Budget. '
    '&nbsp; Southern Cities Construction &middot; NC GC #107724 &middot; southerncitiesconstruction.com',
    ParagraphStyle("f", fontName="Helvetica", fontSize=8, textColor=GRAY, leading=11))]],
    colWidths=[W], style=TableStyle([("BACKGROUND",(0,0),(-1,-1),LIGHT),("LEFTPADDING",(0,0),(-1,-1),8),
        ("RIGHTPADDING",(0,0),(-1,-1),8),("TOPPADDING",(0,0),(-1,-1),7),("BOTTOMPADDING",(0,0),(-1,-1),7)])))

doc = SimpleDocTemplate(OUT, pagesize=letter, topMargin=28, bottomMargin=24, leftMargin=29, rightMargin=29,
    title="Southern Cities — Investor Product Catalogue")
doc.build(story)
print("built:", OUT)
