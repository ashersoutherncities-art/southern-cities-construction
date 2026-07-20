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

def band(title, sub):
    return Table([[Paragraph(f'<font color="#132452"><b>&#9670; {title}</b></font>&nbsp;&nbsp; <font size=8.5 color="#5b6270">{sub}</font>', ParagraphStyle("bd", leading=13))]],
        colWidths=[W], style=TableStyle([("BACKGROUND",(0,0),(-1,-1),colors.HexColor("#ffe9d6")),
            ("LINEBELOW",(0,0),(-1,-1),2,ORANGE),("LINEABOVE",(0,0),(-1,-1),2,ORANGE),
            ("LEFTPADDING",(0,0),(-1,-1),12),("RIGHTPADDING",(0,0),(-1,-1),10),("TOPPADDING",(0,0),(-1,-1),7),("BOTTOMPADDING",(0,0),(-1,-1),7)]))

def product(name, price, meta, bullets, note=None):
    head = Table([[Paragraph(name, name_s), Paragraph(price, price_s)]], colWidths=[W-130, 130],
        style=TableStyle(NOPAD + [("VALIGN",(0,0),(-1,-1),"TOP"),("BOTTOMPADDING",(0,0),(-1,-1),1)]))
    fl = [head]
    if meta: fl.append(Paragraph(meta, meta_s))
    fl.append(Spacer(1, 2))
    for b in bullets:
        fl.append(Paragraph(f"•&nbsp; {b}", bul_s))
    if note: fl.append(Paragraph(note, note_s))
    fl.append(Spacer(1, 9))
    return KeepTogether(fl)

class ValueLadder(Flowable):
    def __init__(self, width, height):
        Flowable.__init__(self); self.width = width; self.height = height
    def draw(self):
        c = self.canv
        steps = [
            ("1", "GET THE READ", "Fast GC eyes before you commit.", "Quick Read (+rush) · Inspected GC Read · Pre-Listing Audit", "START FREE"),
            ("2", "GET THE REPORT", "Find the true source — then a number we commit to.", "Diagnosis · Inspection + GC Budget Report", "from $199"),
            ("3", "WIN THE NEGOTIATION", "Turn findings into leverage + a clean close.", "Credit / Scope / Appraisal Letters · Verification", "from $249"),
            ("4", "WE DO THE REPAIRS", "We fix it — at the number we wrote.", "Licensed crew · Mandatory-first · verified", "Scoped"),
        ]
        n = len(steps); bw = self.width * 0.66; bh = 84
        gy = (self.height - bh) / (n - 1); gx = (self.width - bw) / (n - 1)
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
            c.setFillColor(ORANGE); c.setFont("Helvetica-Bold", 22); c.drawString(tx, y + bh - 34, num)
            c.setFillColor(colors.white); c.setFont("Helvetica-Bold", 12); c.drawString(tx + 34, y + bh - 26, title)
            c.setFillColor(FAINT); c.setFont("Helvetica-Oblique", 8.5); c.drawString(tx + 34, y + bh - 41, tag)
            c.setFillColor(colors.HexColor("#e7ebf3")); c.setFont("Helvetica", 8); c.drawString(tx + 34, y + 16, prods)
            c.setFillColor(ORANGE); c.setFont("Helvetica-Bold", 11); c.drawRightString(x + bw - 16, y + bh - 26, price)

class DiagLadder(Flowable):
    def __init__(self, width, height):
        Flowable.__init__(self); self.width = width; self.height = height
    def draw(self):
        c = self.canv
        rungs = [
            ("1", "HYPOTHESIS", "GC Quick Read · $299", "GC reads your report / photos — flags + rough ranges.", "Opinion, not verified."),
            ("2", "DOCUMENTED", "Inspected GC Read · $649", "Licensed inspector on-site — symptoms documented + GC's read.", "Visual only — symptoms, not causes."),
            ("3", "DIAGNOSED", "Diagnosis · from $199", "Targeted diagnostics find the true source on the big-swing items.", "Sewer scope · moisture/thermal · engineer eval · inspection port."),
            ("4", "FIRM & FIXED", "Inspection + GC Budget Report · $899  →  we fix it", "Root-cause scope + a firm number, then we do the work.", "Held by allowances + concealed-condition terms."),
        ]
        n = len(rungs); bw = self.width * 0.68; bh = 92
        gy = (self.height - bh) / (n - 1); gx = (self.width - bw) / (n - 1)
        c.setStrokeColor(ORANGE); c.setLineWidth(1.4); c.setDash(2, 3)
        for i in range(n - 1):
            x1 = i * gx + bw * 0.5; y1 = (n - 1 - i) * gy
            x2 = (i + 1) * gx + bw * 0.5; y2 = (n - 2 - i) * gy + bh
            c.line(x1, y1, x2, y2)
        c.setDash()
        for i, (num, cert, prod, tells, lim) in enumerate(rungs):
            x = i * gx; y = (n - 1 - i) * gy
            c.setFillColor(NAVY if i % 2 == 0 else NAVY2); c.roundRect(x, y, bw, bh, 9, fill=1, stroke=0)
            c.setFillColor(ORANGE); c.roundRect(x, y, 7, bh, 3, fill=1, stroke=0)
            tx = x + 20
            c.setFillColor(ORANGE); c.setFont("Helvetica-Bold", 20); c.drawString(tx, y + bh - 30, num)
            c.setFillColor(colors.white); c.setFont("Helvetica-Bold", 12.5); c.drawString(tx + 32, y + bh - 24, cert)
            c.setFillColor(ORANGE); c.setFont("Helvetica-Bold", 9.5); c.drawString(tx + 32, y + bh - 40, prod)
            c.setFillColor(colors.HexColor("#e7ebf3")); c.setFont("Helvetica", 8.3); c.drawString(tx + 32, y + bh - 57, tells)
            c.setFillColor(FAINT); c.setFont("Helvetica-Oblique", 7.8); c.drawString(tx + 32, y + 15, lim)

story = [header_band("REALTOR PRODUCT CATALOGUE &nbsp;·&nbsp; Licensed NC GC #107724"), Spacer(1, 12)]
story.append(Paragraph('<b>Relevant fees credit forward — pay for a step and it rolls into the next step up on the same deal.</b>  '
    'Get a GC read → the real number → win the negotiation → we make the repairs (Quick Read → Report → the job). '
    'The same licensed GC who prices the job <b>does it</b>; Support Plans keep that on every deal.', intro_s))
story.append(Spacer(1, 14))
story.append(ValueLadder(W, 470))
story.append(Spacer(1, 12))
story.append(band("ON EVERY DEAL", "Support Plans (retainer) + done-for-you packages wrap the whole path — get all of it on every transaction."))
story.append(PageBreak())

# ---- Page 2: the diagnosis ladder (how we get to a number we can commit to) ----
story.append(header_band("HOW WE KNOW WHAT'S REALLY WRONG — the diagnosis ladder"))
story.append(Spacer(1, 12))
story.append(Paragraph('<b>An inspection shows symptoms, not causes.</b>  A ceiling stain could be roof, flashing, plumbing, or condensation — same symptom, four different repair bills. '
    'Because we <b>commit to the price</b>, we climb only as far up this ladder as the risk demands — then hold the number honestly.', intro_s))
story.append(Spacer(1, 16))
story.append(DiagLadder(W, 460))
story.append(Spacer(1, 14))
story.append(Table([[Paragraph('<font color="#132452"><b>&#9670; HOW THE PRICE HOLDS</b></font>&nbsp;&nbsp; so the commitment isn\'t a guess: '
    '<b>Assumptions &amp; exclusions</b> stated up front · <b>Allowances</b> for unknown-scope items (reconciled to actual) · '
    '<b>Concealed-conditions clause</b> — open-and-find that wasn\'t reasonably visible = a defined change order, not your loss · '
    'Diagnostics only where the cause is uncertain <i>and</i> the cost swing is big.',
    ParagraphStyle("hph", fontName="Helvetica", fontSize=8.5, textColor=colors.HexColor("#2b2f38"), leading=12.5))]],
    colWidths=[W], style=TableStyle([("BACKGROUND",(0,0),(-1,-1),colors.HexColor("#ffe9d6")),
        ("LINEBELOW",(0,0),(-1,-1),2,ORANGE),("LINEABOVE",(0,0),(-1,-1),2,ORANGE),
        ("LEFTPADDING",(0,0),(-1,-1),12),("RIGHTPADDING",(0,0),(-1,-1),12),("TOPPADDING",(0,0),(-1,-1),9),("BOTTOMPADDING",(0,0),(-1,-1),9)])))
story.append(PageBreak())

story.append(header_band("THE DETAIL — every product &amp; exactly what you get"))
story.append(Spacer(1, 8))
story.append(band("CREDITS FORWARD", "Pay for a step and its fee credits toward the next step up on the same deal — Quick Read → Report → the job. Relevant credits only."))
story.append(Spacer(1, 10))

story.append(section("1", "GET THE READ", "Fast GC eyes before you commit."))
story.append(Spacer(1, 6))
story.append(product("GC-Certified Checklists", "Free", "Instant download · lead magnet",
    ["Pre-listing &amp; inspection reference sheets — GC-certified, client-ready"]))
story.append(product("GC Quick Read", "$299 · rush $399 (same-day)", "1–2 business days (or same-day rush) · desk read · buyer-side or seller-side",
    ["Critical-vs-cosmetic triage · loan-killer flags · rough cost · plain-English GC verdict (go / no-go)",
     "<b>Item-by-item severity</b> on your inspection report + repair-scope notes",
     "<b>Paste-ready repair-request language</b> + a client-shareable PDF",
     "Offer- or listing-strategy note — we read your inspection report or property details/photos"],
    note="Desk read — no inspector dispatched (for that, step up to the Inspected GC Read). Credits the GC-read value toward the budget."))
story.append(product("Inspected GC Read", "$649", "Licensed inspection + GC read · when there's no inspection yet",
    ["Licensed third-party inspector on-site &rarr; full standard inspection report",
     "GC Quick Read layered on the findings — real-vs-cosmetic, loan-killers, rough cost, GC call"],
    note="The bridge into the budget. Credits the $299 GC-read value forward — the inspection is a pass-through cost, so only our own service value rolls forward."))
story.append(product("Pre-Listing Audit", "$649", "Licensed inspection + GC seller analysis · the GC portion credits if SC handles repairs over $1,000",
    ["<b>Licensed inspector on-site</b> — advice grounded in real condition, not photos",
     "Fix / skip / disclose call per item · condition-adjusted price band",
     "Top value-drag items (cost-to-fix vs cost-to-leave) · pricing-strategy recommendation"],
    note="The seller-side sibling of the Inspected GC Read: inspection ($400) + GC analysis ($249)."))

story.append(section("2", "GET THE REPORT", "Find the true source — then a number we commit to."))
story.append(Spacer(1, 6))
story.append(product("Diagnosis", "from $199 + test cost", "GC coordinates the right test + reads the result",
    ["We scope which test the symptom needs, dispatch the vetted specialist/sub, and translate the finding into your budget",
     "Tests (all coordinated, not self-performed): inspection port + borescope · sewer scope · moisture/thermal · structural-engineer eval (licensed PE)",
     "Run only where the cause is uncertain AND the cost swing is big"],
    note="You're paying for GC judgment — which test, and what it means for the repair. Turns a symptom into a known cause so the committed number holds."))
story.append(product("GC Budget (on your inspection)", "$599", "The GC budget built on the inspection you already have · no new inspection",
    ["Full 3-tier budget — Mandatory / High-ROI / Disclose &amp; Skip — on your existing inspection",
     "Paste-ready repair-request language · <b>the GC commits to do the work at the budget we write</b>"],
    note="Priced like an investor Bid-Ready ($599) — the GC budget, consistent across audiences. Quick Read credits in; add our inspection (+$400) to make it the full $899 Report."))
story.append(product("Inspection + GC Budget Report", "$899 · rush $1,199", "3–5 business days (rush 24–48 hrs) · flagship",
    ["<b>Licensed third-party inspector</b> on-site + full inspection report",
     "The <b>GC</b> layers on the 3-tier budget: <b>Mandatory / High-ROI / Disclose &amp; Skip</b>",
     "Paste-ready repair-request language · negotiation framing memo", "<b>The same GC commits to do the work at the budget we write</b>",
     "5–7 day Mandatory-fix speed guarantee (when SC handles the repairs)"],
    note="A licensed inspector inspects; our GC prices it — firm for the assumed scope, held by allowances + concealed-condition terms. $899 credits toward the job."))
story.append(product("Year-1 Priority Repair Plan", "$299", "2 business days",
    ["Items prioritized into 0–3 / 3–6 / 6–12 month timeframes", "Rough budget + recommended trade per item · maintenance-vs-renovation flagging · client PDF"]))
story.append(product("Construction Confidence Sheet", "$99", "1 business day · free when bundled with a Pre-Listing Audit",
    ["MLS-ready brand-neutral one-pager: condition highlights, recent updates, known items framed honestly"]))

story.append(section("3", "WIN THE NEGOTIATION", "Turn findings into leverage + a clean close."))
story.append(Spacer(1, 6))
story.append(product("Negotiation Strategy Read", "$299", "1 business day",
    ["Review of the buyer's repair/concession asks · per-issue reasonableness assessment", "Recommended counter range per issue · written negotiation talking points"]))
story.append(product("Repair Credit Calculation Letter", "$349", "1 business day",
    ["GC-signed single-page letter · itemized repair costs per finding", "Recommended total credit figure with rationale · PDF on SC letterhead, forward-ready"]))
story.append(product("Repair Scope Letter", "$349", "1 business day",
    ["Named scope per inspection item · definition of “fixed correctly” per item", "Fair-market dollar figure per item · required trades + permit notes · GC-signed PDF"]))
story.append(product("Appraisal Response Letter", "$449", "1–2 business days",
    ["Point-by-point response to each appraiser finding · photo documentation", "Code references + habitability standards · licensed NC GC sign-off · submitted-with-appraisal format"]))
story.append(product("Repair Verification Visit", "$249", "1–3 business days",
    ["On-site GC visit · verification against the agreed scope of repair", "Quality + code-compliance check · written confirmation or punch-list · photo documentation"]))

story.append(section("4", "WE DO THE REPAIRS", "We fix it — at the number we wrote."))
story.append(Spacer(1, 6))
story.append(product("Repair Execution", "Scoped from the Report", "The GC actually does the work — Mandatory fixes first",
    ["SCC's licensed crew + vetted subs execute the repair list",
     "Mandatory fixes prioritized — 5–7 day speed guarantee",
     "Permits pulled where required · repair-verification + photo documentation", "Ready-to-list / ready-to-close handoff"],
    note="Fulfills the Full Report's build commitment — the Quick Read / Report fees credit toward the work."))

story.append(Spacer(1, 6))
story.append(band("ON EVERY DEAL", "The retainer + done-for-you packages that wrap the whole path above."))
story.append(Spacer(1, 8))
story.append(product("Realtor Support Plans", "$299 / $649 / $2,499 mo", "+ $75 one-time setup · Solo / Team / Brokerage",
    ["<b>Solo $299</b> — GC Support Specialist on call · 2 reviews + 1 pricing question/mo · 24-hr SLA · unused reviews bank up to 2",
     "<b>Team $649</b> — 4 reviews + 2 pricing questions/mo · same-day triage · written summaries · shared access (3–10 agents)",
     "<b>Brokerage $2,499</b> — unlimited reviews + pricing direction · dedicated GC Support Specialist · 4-hr SLA · quarterly review · white-label · agency-wide (10+)"]))
story.append(product("Listing Transaction Package", "$2,299 / listing", "Seller side · 7 products sequenced · single point of contact",
    ["Inspection + GC Budget Report · Pre-Listing Valuation · Construction Confidence Sheet (free)",
     "Listing-prep PM coordination · GC Quick Read · Repair Credit Letter · Repair Verification Visit"]))
story.append(product("Buyer Transaction Package", "$1,999 / deal", "Buyer side · 6 products sequenced · single point of contact",
    ["Inspection + GC Budget Report · Negotiation Strategy Read · GC Quick Read",
     "Repair Scope Letter · Repair Verification Visit · Year-1 Priority Repair Plan"]))
story.append(product("Per-Deal Construction Co-Pilot", "$1,499 / deal", "For agents who already have their own inspection",
    ["Construction co-pilot for the whole deal (listing or buying) — the analytical + negotiation products", "Excludes the GC Inspection (buy separately if needed)"]))

story.append(Spacer(1, 6))
story.append(Table([[Paragraph('<font color="#132452"><b>The wedge:</b></font> the free checklists &amp; Quick Read get you in the door; the Full Report — with the GC’s commitment to do the work — '
    'is what turns a realtor into a repeat channel. &nbsp; Southern Cities Construction &middot; NC GC #107724 &middot; southerncitiesconstruction.com',
    ParagraphStyle("f", fontName="Helvetica", fontSize=8, textColor=GRAY, leading=11))]],
    colWidths=[W], style=TableStyle([("BACKGROUND",(0,0),(-1,-1),LIGHT),("LEFTPADDING",(0,0),(-1,-1),8),
        ("RIGHTPADDING",(0,0),(-1,-1),8),("TOPPADDING",(0,0),(-1,-1),7),("BOTTOMPADDING",(0,0),(-1,-1),7)])))

doc = SimpleDocTemplate(OUT, pagesize=letter, topMargin=28, bottomMargin=24, leftMargin=29, rightMargin=29,
    title="Southern Cities — Realtor Product Catalogue")
doc.build(story)
print("built:", OUT)
