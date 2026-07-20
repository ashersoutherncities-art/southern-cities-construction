from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Flowable
from reportlab.lib.styles import ParagraphStyle
import sys

OUT = sys.argv[1]
NAVY = colors.HexColor("#132452"); NAVY2 = colors.HexColor("#1c3468"); ORANGE = colors.HexColor("#fa8c41")
GRAY = colors.HexColor("#5b6270"); LIGHT = colors.HexColor("#f5f6f8"); FAINT = colors.HexColor("#c7cede")
intro_s = ParagraphStyle("i", fontName="Helvetica", fontSize=10, textColor=colors.HexColor("#2b2f38"), leading=14)
W = 554

def header_band(sub):
    return Table([[Paragraph(f'<font size=15 color="#ffffff"><b>SOUTHERN CITIES</b></font> <font size=15 color="#fa8c41"><b>CONSTRUCTION</b></font><br/>'
        f'<font size=8 color="#c7cede">{sub}</font>', ParagraphStyle("h", leading=17))]],
        colWidths=[W], style=TableStyle([("BACKGROUND",(0,0),(-1,-1),NAVY),("LEFTPADDING",(0,0),(-1,-1),12),
            ("RIGHTPADDING",(0,0),(-1,-1),12),("TOPPADDING",(0,0),(-1,-1),10),("BOTTOMPADDING",(0,0),(-1,-1),10)]))

class DiagLadder(Flowable):
    def __init__(self, width, height):
        Flowable.__init__(self); self.width = width; self.height = height
    def draw(self):
        c = self.canv
        rungs = [
            ("1", "HYPOTHESIS", "GC Quick Read · $299", "GC reads your report / photos — flags + rough ranges.", "Opinion, not verified."),
            ("2", "DOCUMENTED", "Inspection + GC Read · ~$599", "Licensed inspector on-site — symptoms documented + GC's read.", "Visual only — symptoms, not causes."),
            ("3", "DIAGNOSED", "Diagnosis · scoped", "Targeted diagnostics find the true source on the big-swing items.", "Sewer scope · moisture/thermal · engineer eval · inspection port."),
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

story = [header_band("HOW WE KNOW WHAT'S REALLY WRONG — the diagnosis ladder  ·  NC GC #107724"), Spacer(1, 12)]
story.append(Paragraph('<b>An inspection shows symptoms, not causes.</b>  A ceiling stain could be roof, flashing, plumbing, or condensation — same symptom, four different repair bills. '
    'Because we <b>commit to the price</b>, we climb only as far up this ladder as the risk demands — then hold the number honestly.', intro_s))
story.append(Spacer(1, 16))
story.append(DiagLadder(W, 470))
story.append(Spacer(1, 14))
story.append(Table([[Paragraph('<font color="#132452"><b>&#9670; HOW THE PRICE HOLDS</b></font> &nbsp; so the commitment isn\'t a guess: '
    '<b>Assumptions &amp; exclusions</b> stated up front · <b>Allowances</b> for unknown-scope items (reconciled to actual) · '
    '<b>Concealed-conditions clause</b> — open-and-find that wasn\'t reasonably visible = a defined change order, not your loss · '
    'Diagnostics only where the cause is uncertain <i>and</i> the cost swing is big.',
    ParagraphStyle("b", fontName="Helvetica", fontSize=8.5, textColor=colors.HexColor("#2b2f38"), leading=12.5))]],
    colWidths=[W], style=TableStyle([("BACKGROUND",(0,0),(-1,-1),colors.HexColor("#ffe9d6")),
        ("LINEBELOW",(0,0),(-1,-1),2,ORANGE),("LINEABOVE",(0,0),(-1,-1),2,ORANGE),
        ("LEFTPADDING",(0,0),(-1,-1),12),("RIGHTPADDING",(0,0),(-1,-1),12),("TOPPADDING",(0,0),(-1,-1),9),("BOTTOMPADDING",(0,0),(-1,-1),9)])))

doc = SimpleDocTemplate(OUT, pagesize=letter, topMargin=28, bottomMargin=24, leftMargin=29, rightMargin=29,
    title="Southern Cities — The Diagnosis Ladder")
doc.build(story)
print("built:", OUT)
