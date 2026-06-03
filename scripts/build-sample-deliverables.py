#!/usr/bin/env python3
"""
build-sample-deliverables.py

Reusable generator for BRANDED SAMPLE DELIVERABLES — anonymized example copies
of what a customer receives for each product. Each sample is clearly watermarked
"SAMPLE" so it can't be mistaken for a real report.

Shared branding (navy / orange / cream) matches the SCC PDF system. Add a new
deliverable by writing one `build_<name>()` function and registering it in MAIN.

Outputs to: public/resources/samples/<slug>-sample.pdf
"""

import os
from pathlib import Path

from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate, Frame, NextPageTemplate, PageBreak,
    PageTemplate, Paragraph, Spacer, Table, TableStyle,
)

# ============================================================
# Brand
# ============================================================
NAVY = HexColor("#132452")
ORANGE = HexColor("#fa8c41")
CREAM = HexColor("#F6F2EC")
LIGHT_GRAY = HexColor("#E8E0D2")
TEXT_DARK = HexColor("#1A1A1A")
TEXT_MUTED = HexColor("#5A6470")
ACCENT_LIGHT = HexColor("#FFF1E4")
BAND_DARK = HexColor("#0A1530")
GO_GREEN = HexColor("#1F8A3A")
WARN = HexColor("#C9531A")

PROJECT_ROOT = Path("/Users/ashborn/.openclaw/workspace/southern-cities-construction")
LOGO_REVERSED = str(PROJECT_ROOT / "public" / "sc-construction-logo-reversed.png")
LOGO_STANDARD = str(PROJECT_ROOT / "public" / "sc-construction-logo.png")
OUT_DIR = PROJECT_ROOT / "public" / "resources" / "samples"

PAGE_W, PAGE_H = LETTER
MARGIN_L = 0.85 * inch
MARGIN_R = 0.85 * inch
MARGIN_T = 1.0 * inch
MARGIN_B = 1.0 * inch
FRAME_W = PAGE_W - MARGIN_L - MARGIN_R
FRAME_H = PAGE_H - MARGIN_T - MARGIN_B

S = {
    "cover_eyebrow": ParagraphStyle("ce", fontName="Helvetica-Bold", fontSize=10, textColor=ORANGE, leading=14, spaceAfter=12),
    "cover_title": ParagraphStyle("ct", fontName="Helvetica-Bold", fontSize=30, textColor=white, leading=36, spaceAfter=16),
    "cover_sub": ParagraphStyle("cs", fontName="Helvetica", fontSize=15, textColor=HexColor("#D6D6D6"), leading=22, spaceAfter=36),
    "cover_meta_label": ParagraphStyle("cml", fontName="Helvetica-Bold", fontSize=9, textColor=ORANGE, leading=13),
    "cover_meta": ParagraphStyle("cm", fontName="Helvetica", fontSize=10.5, textColor=HexColor("#B8C0CC"), leading=15),
    "eyebrow": ParagraphStyle("eb", fontName="Helvetica-Bold", fontSize=9, textColor=ORANGE, leading=12, spaceAfter=6),
    "h1": ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=20, textColor=NAVY, leading=26, spaceBefore=4, spaceAfter=12),
    "h2": ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=13, textColor=NAVY, leading=17, spaceBefore=8, spaceAfter=5),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=10.5, textColor=TEXT_DARK, leading=15, spaceAfter=8),
    "muted": ParagraphStyle("muted", fontName="Helvetica", fontSize=9.5, textColor=TEXT_MUTED, leading=13.5, spaceAfter=6),
    "callout_label": ParagraphStyle("cl", fontName="Helvetica-Bold", fontSize=8.5, textColor=ORANGE, leading=11, spaceAfter=3),
    "verdict": ParagraphStyle("vd", fontName="Helvetica-Bold", fontSize=26, textColor=white, leading=30, alignment=TA_CENTER),
    "verdict_sub": ParagraphStyle("vds", fontName="Helvetica", fontSize=11, textColor=white, leading=15, alignment=TA_CENTER),
    "th": ParagraphStyle("th", fontName="Helvetica-Bold", fontSize=9, textColor=white, leading=11),
    "td": ParagraphStyle("td", fontName="Helvetica", fontSize=9, textColor=TEXT_DARK, leading=12.5),
    "tdb": ParagraphStyle("tdb", fontName="Helvetica-Bold", fontSize=9, textColor=NAVY, leading=12.5),
}


def _sample_watermark(canvas):
    canvas.saveState()
    canvas.setFont("Helvetica-Bold", 80)
    canvas.setFillColor(HexColor("#132452"))
    canvas.setFillAlpha(0.05)
    canvas.translate(PAGE_W / 2, PAGE_H / 2)
    canvas.rotate(38)
    canvas.drawCentredString(0, 0, "SAMPLE")
    canvas.restoreState()


def draw_cover(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setFillColor(ORANGE)
    canvas.rect(0, PAGE_H - 0.08 * inch, PAGE_W, 0.08 * inch, fill=1, stroke=0)
    canvas.setFillColor(BAND_DARK)
    canvas.rect(0, 0, PAGE_W, 0.5 * inch, fill=1, stroke=0)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(ORANGE)
    canvas.drawString(MARGIN_L, 0.2 * inch, "NC GC LICENSE #107724")
    canvas.setFillColor(HexColor("#B8C0CC"))
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(PAGE_W - MARGIN_R, 0.2 * inch, "southerncitiesconstruction.com")
    if os.path.exists(LOGO_REVERSED):
        canvas.drawImage(LOGO_REVERSED, MARGIN_L, PAGE_H - 1.7 * inch, width=2.4 * inch, height=0.7 * inch, preserveAspectRatio=True, mask="auto")
    # SAMPLE ribbon top-right
    canvas.setFillColor(ORANGE)
    canvas.rect(PAGE_W - 2.2 * inch, PAGE_H - 1.5 * inch, 2.2 * inch, 0.42 * inch, fill=1, stroke=0)
    canvas.setFillColor(white)
    canvas.setFont("Helvetica-Bold", 13)
    canvas.drawCentredString(PAGE_W - 1.1 * inch, PAGE_H - 1.36 * inch, "SAMPLE REPORT")
    canvas.restoreState()


def draw_content(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(CREAM)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    _sample_watermark(canvas)
    canvas.setFillColor(ORANGE)
    canvas.rect(0, PAGE_H - 0.04 * inch, PAGE_W, 0.04 * inch, fill=1, stroke=0)
    if os.path.exists(LOGO_STANDARD):
        canvas.drawImage(LOGO_STANDARD, MARGIN_L, PAGE_H - 0.65 * inch, width=1.5 * inch, height=0.45 * inch, preserveAspectRatio=True, mask="auto")
    canvas.setFont("Helvetica-Bold", 7.5)
    canvas.setFillColor(NAVY)
    canvas.drawRightString(PAGE_W - MARGIN_R, PAGE_H - 0.4 * inch, doc._sample_header)
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawRightString(PAGE_W - MARGIN_R, PAGE_H - 0.55 * inch, "SAMPLE · anonymized example · NC GC #107724")
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(NAVY)
    canvas.drawCentredString(PAGE_W / 2, 0.45 * inch, f"{doc.page - 1}")
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawString(MARGIN_L, 0.45 * inch, "© Southern Cities Construction · SAMPLE")
    canvas.drawRightString(PAGE_W - MARGIN_R, 0.45 * inch, "southerncitiesconstruction.com")
    canvas.restoreState()


def callout(label, body, bg=ACCENT_LIGHT, bar=ORANGE):
    inner = [
        Paragraph(f'<font color="#fa8c41"><b>{label}</b></font>', S["callout_label"]),
        Paragraph(body, S["body"]),
    ]
    t = Table([[inner]], colWidths=[FRAME_W])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("LEFTPADDING", (0, 0), (-1, -1), 12), ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 10), ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LINEBEFORE", (0, 0), (0, -1), 3, bar), ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return t


def data_table(headers, rows, col_widths=None):
    cw = col_widths or [FRAME_W / len(headers)] * len(headers)
    data = [[Paragraph(h, S["th"]) for h in headers]]
    for row in rows:
        data.append([Paragraph(str(c), S["td"]) for c in row])
    t = Table(data, colWidths=cw, repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), NAVY), ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 7), ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEABOVE", (0, 1), (-1, 1), 0.5, ORANGE),
    ]
    for i in range(1, len(data)):
        style.append(("BACKGROUND", (0, i), (-1, i), LIGHT_GRAY if i % 2 == 0 else white))
    t.setStyle(TableStyle(style))
    return t


def verdict_box(verdict, sub, color):
    inner = [Paragraph(verdict, S["verdict"]), Paragraph(sub, S["verdict_sub"])]
    t = Table([[inner]], colWidths=[FRAME_W])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), color),
        ("LEFTPADDING", (0, 0), (-1, -1), 16), ("RIGHTPADDING", (0, 0), (-1, -1), 16),
        ("TOPPADDING", (0, 0), (-1, -1), 16), ("BOTTOMPADDING", (0, 0), (-1, -1), 16),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    return t


def make_doc(out_path, header, title):
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    doc = BaseDocTemplate(out_path, pagesize=LETTER, leftMargin=MARGIN_L, rightMargin=MARGIN_R,
                          topMargin=MARGIN_T, bottomMargin=MARGIN_B, title=title,
                          author="Southern Cities Construction")
    doc._sample_header = header
    cover_frame = Frame(MARGIN_L, MARGIN_B, FRAME_W, FRAME_H, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, id="cf")
    content_frame = Frame(MARGIN_L, MARGIN_B, FRAME_W, FRAME_H, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, id="cof")
    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[cover_frame], onPage=draw_cover),
        PageTemplate(id="content", frames=[content_frame], onPage=draw_content),
    ])
    return doc


# ============================================================
# DELIVERABLE: Investor Execution Review (sample report)
# ============================================================

def build_execution_review():
    out = str(OUT_DIR / "investor-execution-review-sample.pdf")
    doc = make_doc(out, "INVESTOR EXECUTION REVIEW · SAMPLE", "Investor Execution Review — Sample Report")
    s = []
    # Cover
    s.append(Spacer(1, 2.1 * inch))
    s.append(Paragraph("WHAT YOU RECEIVE · ANONYMIZED EXAMPLE", S["cover_eyebrow"]))
    s.append(Paragraph("Investor Execution Review", S["cover_title"]))
    s.append(Paragraph(
        "A decision-grade underwriting read on a deal you don't own yet — "
        "scope feasibility, a budget range you can underwrite with, the execution "
        "risks worth knowing, and a clear go / renegotiate / walk recommendation.",
        S["cover_sub"]))
    s.append(Spacer(1, 1.6 * inch))
    s.append(Paragraph("PREPARED FOR", S["cover_meta_label"]))
    s.append(Paragraph("Sample Investor · 1950s ranch · Charlotte NC [address redacted]<br/>"
                       "Delivered in 2 business days · NC GC License #107724", S["cover_meta"]))
    s.append(NextPageTemplate("content"))
    s.append(PageBreak())

    # Page 1 — How to read this report (methodology + confidence)
    s.append(Paragraph("HOW TO READ THIS REPORT", S["eyebrow"]))
    s.append(Paragraph("What this is — and how we got here", S["h1"]))
    s.append(Paragraph(
        "The Investor Execution Review is a decision-grade underwriting read by a licensed NC General "
        "Contractor on a deal you do not own yet. It is built to answer one question before earnest money "
        "goes hard: <b>does this deal execute at the budget your spreadsheet assumes?</b> It is not a "
        "line-item bid and it is not a home inspection — it is the construction-side opinion you take into "
        "the buy decision.", S["body"]))
    s.append(Paragraph("What we reviewed", S["h2"]))
    s.append(data_table(["DATA SOURCE", "USED FOR"], [
        ["MLS listing + 38 photos", "Condition read, finish level, visible system age"],
        ["County GIS + tax records", "Year built, square footage, lot, prior permits"],
        ["Mecklenburg permit portal", "Open/closed permits, code violations"],
        ["Drive-by (street + aerial)", "Roof, grading, exterior envelope, block context"],
        ["3 recent comparable sales", "Verified ARV range (see ARV basis)"],
        ["2026 NC trade-network unit costs", "Budget ranges by trade"],
    ], col_widths=[2.3 * inch, FRAME_W - 2.3 * inch]))
    s.append(Spacer(1, 0.12 * inch))
    s.append(callout("HOW TO READ OUR CONFIDENCE LEVELS",
        "<b>High</b> = interior access or strong photo coverage; budget ±5%. <b>Medium-High</b> = good photos + "
        "records, no interior walk; budget ±8%. <b>Medium</b> = limited photos; budget ±12%. This deal is "
        "<b>Medium-High</b>. An on-site walk (Active Oversight intake) moves it to High before you commit subs."))
    s.append(PageBreak())

    # Page 2 — Verdict + deal snapshot
    s.append(Paragraph("THE BOTTOM LINE", S["eyebrow"]))
    s.append(Paragraph("Recommendation", S["h1"]))
    s.append(verdict_box("RENEGOTIATE", "Deal works at $172K acquisition — not the $185K on the table. Specific basis below.", WARN))
    s.append(Spacer(1, 0.14 * inch))
    s.append(Paragraph("Deal snapshot", S["h2"]))
    s.append(data_table(["FIELD", "VALUE"], [
        ["Property", "Single-family, 1,420 sf, 3BR/1BA, 0.21-acre lot"],
        ["Year built", "1956"],
        ["Asking / under contract", "$185,000"],
        ["Verified ARV range (GC-est)", "$372,000 – $398,000"],
        ["Project category", "Cosmetic + targeted systems (Tier 2 of 4)"],
        ["Confidence level", "Medium-High (drive-by + listing photos + public records)"],
    ], col_widths=[2.1 * inch, FRAME_W - 2.1 * inch]))
    s.append(Spacer(1, 0.12 * inch))
    s.append(callout("WHY RENEGOTIATE, NOT WALK",
        "The bones are good and the comp ceiling is real. But two systems (HVAC, plumbing) and one open "
        "permit push the realistic all-in past where the spread holds at $185K. Re-trade to ~$172K and the "
        "deal clears a 15%+ margin at the Tier 2 finish level."))
    s.append(PageBreak())

    # Page 3 — ARV & comparable sales
    s.append(Paragraph("VERIFIED ARV BASIS", S["eyebrow"]))
    s.append(Paragraph("Where the after-repair value comes from", S["h1"]))
    s.append(Paragraph(
        "Three closed sales within 0.5 miles, last 6 months, comparable beds/baths/size and finish. "
        "Adjusted to this property's lot and condition-at-completion.", S["body"]))
    s.append(data_table(["COMP", "DIST / SOLD", "SF · BR/BA", "SALE PRICE", "$/SF"], [
        ["Comp A (renovated)", "0.2 mi · 41d ago", "1,510 · 3/2", "$391,000", "$259"],
        ["Comp B (renovated)", "0.3 mi · 78d ago", "1,380 · 3/2", "$372,500", "$270"],
        ["Comp C (renovated)", "0.4 mi · 95d ago", "1,605 · 4/2", "$405,000", "$252"],
    ], col_widths=[1.5 * inch, 1.4 * inch, 1.1 * inch, 1.1 * inch, FRAME_W - 5.1 * inch]))
    s.append(Spacer(1, 0.12 * inch))
    s.append(callout("RECONCILED ARV RANGE: $372,000 – $398,000",
        "At ~1,420 sf and a Tier 2 finish, we weight toward Comp B (closest size/finish) and cap near Comp A. "
        "Underwrite to <b>$382,000</b> as the working ARV; treat $398K as a stretch that requires Tier 3 finishes "
        "the block does not reliably support."))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout("COMP RISK NOTE",
        "Comp C is a 4-bedroom — its higher absolute price does not transfer without adding a bedroom (not in "
        "this scope). We excluded two larger 'flipped' sales over 1,800 sf as non-comparable."))
    s.append(PageBreak())

    # Page 4 — Scope feasibility + budget range
    s.append(Paragraph("SCOPE FEASIBILITY + BUDGET RANGE", S["eyebrow"]))
    s.append(Paragraph("What it realistically takes to execute", S["h1"]))
    s.append(Paragraph(
        "This is a decision-grade range, not a line-item bid. It is what a licensed NC GC would expect "
        "the work to land at in this submarket today, at three finish levels.", S["body"]))
    s.append(data_table(["FINISH LEVEL", "REHAB RANGE", "TARGET LIST", "MARGIN AT $185K / $172K"], [
        ["Tier 1 · Lender-Pass", "$78K – $88K", "$358K", "Thin / OK"],
        ["Tier 2 · Market-Standard", "$92K – $106K", "$382K", "Tight / Clears 15%+"],
        ["Tier 3 · Premium", "$108K – $122K", "$398K", "Over-improved for block"],
    ], col_widths=[1.7 * inch, 1.3 * inch, 1.1 * inch, FRAME_W - 4.1 * inch]))
    s.append(Spacer(1, 0.12 * inch))
    s.append(callout("RECOMMENDED PATH",
        "Tier 2 (Market-Standard). It hits the comp band buyers expect on this street without over-improving. "
        "Budget to the top of the range ($106K) and treat anything under as upside."))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout("CONFIDENCE NOTE",
        "Ranges widen ~8% without interior access. An on-site walk (Active Oversight intake) tightens these to "
        "±5% before you commit subs."))
    s.append(PageBreak())

    # Page 5 — Line-item budget detail (Tier 2)
    s.append(Paragraph("LINE-ITEM BUDGET DETAIL", S["eyebrow"]))
    s.append(Paragraph("Tier 2 (Market-Standard) by trade", S["h1"]))
    s.append(data_table(["TRADE / SCOPE", "RANGE"], [
        ["Demo + dumpster + protection", "$2,400 – $3,200"],
        ["Roof (replace, architectural shingle)", "$8,600 – $11,200"],
        ["HVAC (3-ton condenser + furnace)", "$8,800 – $10,400"],
        ["Plumbing (PEX re-pipe + 1 bath rebuild)", "$9,200 – $12,400"],
        ["Electrical (200A panel + fixtures + devices)", "$4,800 – $6,600"],
        ["Kitchen (mid cabinets + quartz + appliances)", "$18,200 – $22,800"],
        ["Bath (mid tile + plumbing fixtures)", "$6,800 – $9,200"],
        ["Flooring (LVP throughout, refinish 2 BR)", "$7,200 – $9,400"],
        ["Interior + exterior paint", "$5,400 – $6,800"],
        ["Windows (partial replace) + exterior doors", "$4,200 – $6,000"],
        ["Punch + closeout + light staging", "$2,400 – $3,200"],
        ["Contingency (10%)", "$8,400 – $10,200"],
        ["<b>TOTAL · TIER 2</b>", "<b>$92,000 – $106,400</b>"],
    ], col_widths=[FRAME_W - 1.8 * inch, 1.8 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(Paragraph("<i>Ranges reflect 2026 Charlotte-area sub pricing. Validated against current "
                       "trade-network quotes; not a contractor bid. NC GC #107724.</i>", S["muted"]))
    s.append(PageBreak())

    # Page 6 — Execution risk register (summary + risks 1-3)
    s.append(Paragraph("EXECUTION RISK REGISTER", S["eyebrow"]))
    s.append(Paragraph("The risks worth pricing before earnest money goes hard", S["h1"]))
    s.append(data_table(["#", "RISK", "SEVERITY", "EXPOSURE"], [
        ["1", "Open water-heater permit (2014)", "High", "$325 + delay"],
        ["2", "Polybutylene supply lines", "Medium", "$4.5K – $7.2K"],
        ["3", "HVAC at end of life", "Medium", "$8.8K – $10.4K"],
        ["4", "Soffit rot, SW corner", "Low", "$850 – $1.4K"],
        ["5", "Federal Pacific panel", "High", "$2.2K – $3.4K"],
        ["6", "Clay sewer lateral (age)", "Medium", "$0 – $9K (scope risk)"],
    ], col_widths=[0.4 * inch, FRAME_W - 3.0 * inch, 1.0 * inch, 1.6 * inch]))
    s.append(Spacer(1, 0.12 * inch))
    s.append(callout("RISK 1 · OPEN PERMIT (HIGH)",
        "Water-heater permit pulled 2014, never closed. Blocks clean title transfer until resolved. "
        "<b>Cost to cure:</b> ~$325 + 5 business days. <b>Action:</b> make seller close it pre-close, or escrow for it."))
    s.append(Spacer(1, 0.07 * inch))
    s.append(callout("RISK 2 · POLYBUTYLENE SUPPLY LINES (MEDIUM)",
        "Gray poly visible at the water heater in listing photos. Flagged by FHA, VA, and most DSCR lenders. "
        "<b>Cost to cure:</b> $4,500 – $7,200 (re-pipe to PEX). Already inside the Tier 2 range."))
    s.append(Spacer(1, 0.07 * inch))
    s.append(callout("RISK 3 · HVAC AT END OF LIFE (MEDIUM)",
        "Condenser date plate reads 2006. Past expected useful life; a buyer's inspector will flag it. "
        "<b>Cost to cure:</b> $8,800 – $10,400. The single biggest swing in the budget."))
    s.append(PageBreak())

    # Page 7 — Risk register cont. (risks 4-6)
    s.append(Paragraph("EXECUTION RISK REGISTER (CONTINUED)", S["eyebrow"]))
    s.append(Paragraph("The two that catch people late", S["h1"]))
    s.append(callout("RISK 4 · SOFFIT ROT, SW CORNER (LOW)",
        "Active moisture penetration visible at the southwest corner. <b>Cost to cure:</b> $850 – $1,400. "
        "Cosmetic priority, but an inspector will call it — fix it during the exterior paint phase."))
    s.append(Spacer(1, 0.07 * inch))
    s.append(callout("RISK 5 · FEDERAL PACIFIC PANEL (HIGH)",
        "Panel photo shows a Federal Pacific Stab-Lok — a known fire-risk panel most insurers and lenders will "
        "not accept. <b>Cost to cure:</b> $2,200 – $3,400 (200A replacement, included in the electrical line). "
        "Non-negotiable for a clean resale."))
    s.append(Spacer(1, 0.07 * inch))
    s.append(callout("RISK 6 · CLAY SEWER LATERAL (MEDIUM — SCOPE RISK)",
        "1956 build almost certainly has a clay sewer lateral. We could not verify condition without a scope. "
        "<b>Exposure:</b> $0 if intact, up to $9,000 if collapsed/root-intruded. <b>Action:</b> $250 sewer scope "
        "during inspection contingency — the single cheapest way to retire a five-figure surprise."))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("TOTAL DOWNSIDE IF EVERYTHING BREAKS",
        "Worst-case stacked exposure beyond the Tier 2 base budget: ~<b>$11K</b> (mostly the sewer + permit + "
        "soffit, since HVAC/poly/panel are already in the budget). This is why the re-trade target carries a "
        "cushion.", bg=HexColor("#FDE9E2"), bar=WARN))
    s.append(PageBreak())

    # Page 8 — Deal math / margin scenarios
    s.append(Paragraph("DEAL MATH", S["eyebrow"]))
    s.append(Paragraph("Margin at three acquisition prices", S["h1"]))
    s.append(Paragraph(
        "All scenarios: Tier 2 rehab at the top of range ($106K), ARV $382K, 9-month hold, hard-money "
        "financing, 6% selling cost. This is why the recommendation is renegotiate.", S["body"]))
    s.append(data_table(["LINE", "AT $185K", "AT $178K", "AT $172K"], [
        ["Sale price (ARV)", "$382,000", "$382,000", "$382,000"],
        ["Acquisition", "($185,000)", "($178,000)", "($172,000)"],
        ["Rehab (Tier 2, top)", "($106,400)", "($106,400)", "($106,400)"],
        ["Financing (pts + 9 mo)", "($12,400)", "($12,100)", "($11,800)"],
        ["Holding (tax/ins/util)", "($4,800)", "($4,800)", "($4,800)"],
        ["Selling cost (6%)", "($22,920)", "($22,920)", "($22,920)"],
        ["Closing + contingency", "($6,400)", "($6,400)", "($6,400)"],
        ["<b>NET PROFIT</b>", "<b>$44,080</b>", "<b>$51,380</b>", "<b>$57,680</b>"],
        ["<b>Margin on cost</b>", "<b>~9.6%</b>", "<b>~11.3%</b>", "<b>~12.9%</b>"],
    ], col_widths=[FRAME_W - 4.2 * inch, 1.4 * inch, 1.4 * inch, 1.4 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("READ THE TABLE",
        "At $185K the margin sits under 10% — too thin for a 1950s systems rehab where surprises hide behind "
        "walls. Every $1K you re-trade drops almost straight to your net. The $172K target is where the deal "
        "earns its risk."))
    s.append(PageBreak())

    # Page 9 — Timeline + draw alignment
    s.append(Paragraph("EXECUTION TIMELINE", S["eyebrow"]))
    s.append(Paragraph("Phase-by-phase, aligned to lender draws", S["h1"]))
    s.append(data_table(["PHASE", "WINDOW", "DRAW MILESTONE"], [
        ["Close + permit close-out", "Weeks 1–2", "Acquisition draw"],
        ["Demo + rough systems (HVAC, re-pipe, panel)", "Weeks 3–6", "Draw 1 — rough-in"],
        ["Insulation, drywall, paint", "Weeks 6–8", "Draw 2 — close-up"],
        ["Kitchen / bath / flooring / finishes", "Weeks 8–11", "Draw 3 — finishes"],
        ["Punch, closeout, stage", "Weeks 12–13", "Final draw"],
        ["List + sell", "Weeks 13–16", "Payoff at sale"],
        ["Total to resale", "75 – 110 days", "—"],
    ], col_widths=[FRAME_W - 3.4 * inch, 1.5 * inch, 1.9 * inch]))
    s.append(Spacer(1, 0.12 * inch))
    s.append(callout("SEQUENCING NOTE",
        "Pull the panel + HVAC permits in week 1 — Mecklenburg rough-electrical inspection is the usual "
        "bottleneck on 1950s rewires and can add 5–10 days if it slips behind drywall scheduling."))
    s.append(PageBreak())

    # Page 10 — Walk-away trigger + next step + scope + disclaimer
    s.append(Paragraph("WALK-AWAY TRIGGER + NEXT STEPS", S["eyebrow"]))
    s.append(Paragraph("Protect your downside, then move", S["h1"]))
    s.append(callout("WALK-AWAY TRIGGER",
        "If the seller won't move below <b>$178K</b> AND won't close the open permit, walk. Below that line the "
        "Tier 2 margin compresses under 10% once you carry holding + selling costs — not enough cushion for a "
        "1950s systems rehab where surprises are likely behind the walls.", bg=HexColor("#FDE9E2"), bar=WARN))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout("YOUR NEXT STEP",
        "Take the $172K re-trade to the seller with this report attached — it gives your number a licensed-GC "
        "basis instead of a feeling. Order a $250 sewer scope inside your inspection contingency. If you move "
        "forward, this Execution Review fee credits forward against Active Oversight on the build."))
    s.append(Spacer(1, 0.1 * inch))
    s.append(Paragraph("Scope of this engagement", S["h2"]))
    s.append(data_table(["INCLUDED", "NOT INCLUDED"], [
        ["Decision-grade scope + budget range", "Line-item contractor bid"],
        ["Verified ARV basis + comps", "Formal appraisal or BPO"],
        ["Execution risk register", "On-site / interior inspection"],
        ["Deal-math scenarios", "Structural / engineering sign-off"],
        ["Walk-away trigger + next step", "Permit pulling or filing"],
    ], col_widths=[FRAME_W / 2, FRAME_W / 2]))
    s.append(Spacer(1, 0.12 * inch))
    s.append(Paragraph(
        "<i>This is an anonymized sample of the Investor Execution Review deliverable; figures are "
        "illustrative. Your report covers your specific deal. A construction-side opinion by a licensed NC "
        "General Contractor — not a home inspection, appraisal, or guarantee of resale value. "
        "Southern Cities Construction · NC GC License #107724.</i>", S["muted"]))
    doc.build(s)
    print(f"  ✓ {out}  ({os.path.getsize(out)/1024:.0f} KB)")


# ============================================================
# Shared cover + closing helpers (all samples are >= 8 pages)
# ============================================================

def cover_block(s, eyebrow, title, sub, meta):
    s.append(Spacer(1, 2.1 * inch))
    s.append(Paragraph(eyebrow, S["cover_eyebrow"]))
    s.append(Paragraph(title, S["cover_title"]))
    s.append(Paragraph(sub, S["cover_sub"]))
    s.append(Spacer(1, 1.45 * inch))
    s.append(Paragraph("PREPARED FOR", S["cover_meta_label"]))
    s.append(Paragraph(meta, S["cover_meta"]))
    s.append(NextPageTemplate("content"))
    s.append(PageBreak())


def closing(s, text):
    s.append(Spacer(1, 0.12 * inch))
    s.append(Paragraph(f"<i>{text}</i>", S["muted"]))


DISCLAIMER = ("This is an anonymized sample; figures are illustrative. Your deliverable covers your specific "
              "project. Work performed by a licensed NC General Contractor. Southern Cities Construction · "
              "NC GC License #107724.")


# ============================================================
# DELIVERABLE: Budget Snapshot (LM1, free)
# ============================================================

def build_budget_snapshot():
    out = str(OUT_DIR / "budget-snapshot-sample.pdf")
    doc = make_doc(out, "REHAB BUDGET SNAPSHOT · SAMPLE", "Rehab Budget Range & Execution Risk Snapshot — Sample")
    s = []
    cover_block(s, "WHAT YOU RECEIVE · FREE TOOL",
        "Rehab Budget Range &amp; Execution Risk Snapshot",
        "A decision-grade rehab budget range, project category, timeline, and risk flags — generated "
        "from your inputs by a licensed NC GC's underwriting rules. Free. Emailed in minutes.",
        "Sample Investor · 1,420 sf ranch · Charlotte NC<br/>Auto-generated · NC GC License #107724")

    s.append(Paragraph("HOW TO READ THIS SNAPSHOT", S["eyebrow"]))
    s.append(Paragraph("A fast read to keep $10K+ in your pocket", S["h1"]))
    s.append(Paragraph(
        "The Snapshot is a free, preliminary read — enough to decide whether a deal is worth pursuing and "
        "to anchor your offer. It is generated from the inputs you submit (address, square footage, vintage, "
        "scope intent) run through a licensed NC GC's budget rules. It is not a bid and not an inspection. "
        "When you need a decision-grade read on a specific deal, that's the Execution Review.", S["body"]))
    s.append(callout("YOUR INPUTS",
        "1,420 sf · built 1956 · 3BR/1BA · scope intent: \"cosmetic + light systems\" · Charlotte (Mecklenburg)."))
    s.append(PageBreak())

    s.append(Paragraph("YOUR BUDGET RANGE", S["eyebrow"]))
    s.append(Paragraph("Preliminary rehab range", S["h1"]))
    s.append(verdict_box("$92K – $112K", "Classification-based range for a Tier 2 (cosmetic + targeted systems) rehab at this size and vintage.", NAVY))
    s.append(Spacer(1, 0.14 * inch))
    s.append(data_table(["BASIS", "VALUE"], [
        ["Square footage", "1,420 sf"],
        ["Vintage band", "Pre-1960 (systems-risk multiplier applied)"],
        ["Base $/sf (Tier 2)", "$58 – $72 /sf"],
        ["Vintage + systems adjustment", "+ $9,800 (HVAC/plumbing/electrical likelihood)"],
        ["Preliminary range", "$92,000 – $112,000"],
    ], col_widths=[2.4 * inch, FRAME_W - 2.4 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("WHAT MOVES THE NUMBER", "Pre-1960 builds carry HVAC, plumbing, and panel risk that a square-footage rule alone misses. The range above already prices the likelihood; an Execution Review confirms which actually apply on your deal."))
    s.append(PageBreak())

    s.append(Paragraph("PROJECT CATEGORY", S["eyebrow"]))
    s.append(Paragraph("Where this deal lands", S["h1"]))
    s.append(data_table(["CATEGORY", "TYPICAL $/SF", "THIS DEAL"], [
        ["Cosmetic", "$25 – $45", ""],
        ["Rental turn", "$18 – $35", ""],
        ["Cosmetic + targeted systems (Tier 2)", "$58 – $72", "◀ YOU ARE HERE"],
        ["Heavy rehab", "$80 – $110", ""],
        ["Full gut", "$120 – $160", ""],
        ["Structural", "$160+", ""],
    ], col_widths=[2.6 * inch, 1.4 * inch, FRAME_W - 4.0 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("WHY THIS CATEGORY", "Original kitchen/bath + aged systems but sound structure and envelope put this squarely in Tier 2. If a sewer scope or foundation issue surfaces, it can shift to Heavy — flagged below."))
    s.append(PageBreak())

    s.append(Paragraph("TIMELINE + CONFIDENCE", S["eyebrow"]))
    s.append(Paragraph("How long, and how sure", S["h1"]))
    s.append(data_table(["PHASE", "RANGE"], [
        ["Permitting + mobilization", "1 – 3 weeks"],
        ["Construction (Tier 2)", "8 – 11 weeks"],
        ["List + sell", "3 – 5 weeks"],
        ["Total to resale", "75 – 110 days"],
    ], col_widths=[FRAME_W - 1.8 * inch, 1.8 * inch]))
    s.append(Spacer(1, 0.12 * inch))
    s.append(callout("CONFIDENCE: MEDIUM",
        "This is a rules-based estimate from your inputs — no photos or site data reviewed. Expect ±12%. "
        "An Execution Review (with photos, records, and comps) tightens it to ±5–8% and confirms the risk flags."))
    s.append(PageBreak())

    s.append(Paragraph("RISK FLAGS", S["eyebrow"]))
    s.append(Paragraph("What your inputs surfaced", S["h1"]))
    s.append(callout("FLAG · PRE-1960 SYSTEMS (LIKELY)", "Vintage strongly predicts aged HVAC, galvanized or polybutylene plumbing, and an outdated panel. Budget assumes replacement; confirm on the Execution Review."))
    s.append(Spacer(1, 0.07 * inch))
    s.append(callout("FLAG · SEWER LATERAL (UNKNOWN)", "1950s builds often have clay laterals. A $250 scope retires up to $9K of surprise. Recommended inside your inspection contingency."))
    s.append(Spacer(1, 0.07 * inch))
    s.append(callout("FLAG · PERMIT HISTORY (CHECK)", "Pull the county permit record before you commit — open permits from prior owners can block a clean closing."))
    s.append(PageBreak())

    s.append(Paragraph("TURN THIS INTO AN OFFER", S["eyebrow"]))
    s.append(Paragraph("From range to a number you can write", S["h1"]))
    s.append(Paragraph("A simple way to back into a max offer from this snapshot, using a conservative ARV and "
                       "a target margin. Plug your own ARV and exit costs to tighten it.", S["body"]))
    s.append(data_table(["LINE", "AMOUNT"], [
        ["Conservative ARV", "$372,000"],
        ["Less rehab (top of range)", "($112,000)"],
        ["Less holding + financing (est.)", "($17,000)"],
        ["Less selling cost (~6%)", "($22,300)"],
        ["Less target profit (15%)", "($55,800)"],
        ["Indicated max offer", "≈ $164,900"],
    ], col_widths=[FRAME_W - 1.9 * inch, 1.9 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("HOW TO USE IT", "This is a back-of-napkin ceiling, not a verified number. If the asking price is well above this, the deal likely doesn't pencil at a cosmetic budget. If it's near or below, it's worth a $499 Execution Review to verify before you commit."))
    s.append(PageBreak())

    s.append(Paragraph("WHAT THIS SNAPSHOT CAN'T SEE", S["eyebrow"]))
    s.append(Paragraph("The limits of a free, input-based read", S["h1"]))
    s.append(data_table(["THE SNAPSHOT GIVES YOU", "THE EXECUTION REVIEW ADDS"], [
        ["Rules-based budget range", "Verified range from photos + records (±5–8%)"],
        ["Project category", "Line-item budget by trade"],
        ["Timeline range", "Verified ARV from real comps"],
        ["Input-based risk flags", "Confirmed risk register with cost-to-cure"],
        ["—", "Go / renegotiate / walk recommendation + walk-away trigger"],
    ], col_widths=[FRAME_W / 2, FRAME_W / 2]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("YOUR NEXT STEP",
        "Use this range to decide if the deal is worth pursuing and to anchor an offer. When you have one under "
        "contract, order the $499 Execution Review — it credits forward against build oversight if you proceed."))
    closing(s, DISCLAIMER)
    doc.build(s)
    print(f"  ✓ {out}  ({os.path.getsize(out)/1024:.0f} KB)")


# ============================================================
# DELIVERABLE: Project Setup Package (CO2)
# ============================================================

def build_project_setup():
    out = str(OUT_DIR / "project-setup-sample.pdf")
    doc = make_doc(out, "PROJECT SETUP PACKAGE · SAMPLE", "Project Setup & Contractor Coordination — Sample")
    s = []
    cover_block(s, "WHAT YOU RECEIVE",
        "Project Setup Package",
        "Your project structured end-to-end before a single sub swings a hammer — locked scope, vetted bids "
        "leveled apples-to-apples, a draw schedule your lender accepts, and a procurement + schedule plan.",
        "Sample Investor · 1,420 sf ranch rehab · Charlotte NC<br/>Starting at $2,500 · NC GC License #107724")

    s.append(Paragraph("PACKAGE OVERVIEW", S["eyebrow"]))
    s.append(Paragraph("What's in this package", S["h1"]))
    s.append(Paragraph("Project Setup eliminates the chaos that costs investors $10K+ mid-build — the missing "
                       "scope items, the bids that priced different assumptions, the draw that doesn't match the "
                       "schedule. Everything below is delivered before construction starts.", S["body"]))
    s.append(data_table(["#", "DELIVERABLE"], [
        ["1", "Locked scope of work (every bid prices the same thing)"],
        ["2", "Subcontractor fit analysis (trade complexity vs capability)"],
        ["3", "Vetted sub shortlist from the Southern Cities network"],
        ["4", "Leveled bid comparison (normalized apples-to-apples)"],
        ["5", "Lender-aligned draw schedule"],
        ["6", "Procurement + materials plan"],
        ["7", "Schedule + permit coordination"],
        ["8", "Handoff call + single point of contact"],
    ], col_widths=[0.5 * inch, FRAME_W - 0.5 * inch]))
    s.append(PageBreak())

    s.append(Paragraph("LOCKED SCOPE OF WORK", S["eyebrow"]))
    s.append(Paragraph("The scope every bid prices against", S["h1"]))
    s.append(data_table(["AREA", "SCOPE SUMMARY"], [
        ["Kitchen", "Full reno — mid cabinets, quartz, tile backsplash, SS appliances"],
        ["Bath", "Gut + rebuild — tub/shower, vanity, tile floor, fixtures"],
        ["Systems", "Replace HVAC (3-ton), PEX re-pipe, 200A panel"],
        ["Flooring", "LVP throughout main, refinish 2 BR hardwood"],
        ["Paint", "Full interior + exterior"],
        ["Envelope", "Roof replace, soffit repair, partial windows"],
    ], col_widths=[1.5 * inch, FRAME_W - 1.5 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("WHY THIS MATTERS", "When every sub bids the exact same scope, the bids are comparable and the low number isn't hiding a missing trade. This single document prevents the most common change-order trap."))
    s.append(PageBreak())

    s.append(Paragraph("SUBCONTRACTOR FIT ANALYSIS", S["eyebrow"]))
    s.append(Paragraph("Right trade complexity to the right crew", S["h1"]))
    s.append(data_table(["TRADE", "COMPLEXITY", "CREW FIT"], [
        ["General / carpentry", "Medium", "Crew A — strong on 1950s framing"],
        ["Plumbing (re-pipe)", "High", "Licensed P — poly/PEX specialist"],
        ["Electrical (panel + rewire)", "High", "Licensed E — Mecklenburg-experienced"],
        ["HVAC", "Medium", "Crew C — fast turn, financing-friendly"],
        ["Tile / finish", "Medium", "Crew D — quality finish, photographs well"],
    ], col_widths=[2.0 * inch, 1.2 * inch, FRAME_W - 3.2 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("FIT LOGIC", "Matching trade complexity to crew capability is where rehabs are won or lost. A cheap generalist on a 1950s rewire costs you twice — once on the work, once on the re-do."))
    s.append(PageBreak())

    s.append(Paragraph("LEVELED BID COMPARISON", S["eyebrow"]))
    s.append(Paragraph("Three bids, same scope, normalized", S["h1"]))
    s.append(Paragraph("Sample trade: plumbing (PEX re-pipe + 1 bath rebuild). Bids normalized so exclusions "
                       "and assumptions are apples-to-apples.", S["body"]))
    s.append(data_table(["SUB", "RAW BID", "ADJUSTMENTS", "LEVELED"], [
        ["Sub 1", "$9,400", "+ permit (excl.) + fixtures", "$11,900"],
        ["Sub 2", "$11,200", "incl. permit, incl. fixtures", "$11,200"],
        ["Sub 3", "$12,800", "incl. all + 1-yr warranty", "$12,800"],
    ], col_widths=[1.0 * inch, 1.3 * inch, FRAME_W - 3.6 * inch, 1.3 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("RECOMMENDATION: SUB 2", "Sub 1 looks cheapest raw but excludes permit + fixtures — leveled, it's the most expensive. Sub 2 is the real low bid with full scope. This is exactly the trap leveling catches."))
    s.append(PageBreak())

    s.append(Paragraph("DRAW SCHEDULE", S["eyebrow"]))
    s.append(Paragraph("Lender-aligned, milestone-based", S["h1"]))
    s.append(data_table(["DRAW", "MILESTONE", "% OF BUDGET", "AMOUNT"], [
        ["1", "Demo + rough-in complete", "30%", "$31,800"],
        ["2", "Close-up (drywall + paint)", "25%", "$26,500"],
        ["3", "Finishes (kitchen/bath/floor)", "30%", "$31,800"],
        ["4", "Punch + final inspection", "15%", "$15,900"],
        ["", "TOTAL", "100%", "$106,000"],
    ], col_widths=[0.6 * inch, FRAME_W - 3.6 * inch, 1.3 * inch, 1.7 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("WHY IT'S LENDER-READY", "Draws tied to inspectable milestones (not calendar dates) are what hard-money and DSCR lenders release against without friction. This schedule is built to their standard."))
    s.append(PageBreak())

    s.append(Paragraph("PROCUREMENT + SCHEDULE", S["eyebrow"]))
    s.append(Paragraph("Long-lead items + the build calendar", S["h1"]))
    s.append(data_table(["ITEM", "LEAD TIME", "ORDER BY"], [
        ["Cabinets (semi-custom)", "4 – 6 weeks", "Week 1 — before demo"],
        ["Windows (partial)", "3 – 4 weeks", "Week 1"],
        ["HVAC equipment", "1 – 2 weeks", "Week 2"],
        ["Tile + LVP", "In stock", "Week 4"],
        ["Appliances", "1 – 3 weeks", "Week 6"],
    ], col_widths=[2.2 * inch, 1.4 * inch, FRAME_W - 3.6 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("SEQUENCING NOTE", "Cabinets are the critical path — order in week 1 against the locked scope, not after demo, or finishes stall and your holding clock keeps running."))
    s.append(PageBreak())

    s.append(Paragraph("HANDOFF + NEXT STEP", S["eyebrow"]))
    s.append(Paragraph("You're set up to execute clean", S["h1"]))
    s.append(callout("WHAT YOU NOW HAVE", "A locked scope, leveled bids with a clear award, a lender-ready draw schedule, a procurement plan, and a build calendar — the infrastructure most investors only assemble after the first mid-build crisis."))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout("KEEP IT ON RAILS", "Project Setup gets you to day one clean. Active Oversight keeps it there — weekly tracking, draw approvals, and slippage flags so the plan you just bought actually holds."))
    closing(s, DISCLAIMER)
    doc.build(s)
    print(f"  ✓ {out}  ({os.path.getsize(out)/1024:.0f} KB)")


# ============================================================
# DELIVERABLE: Active Oversight — Weekly Report (CO3)
# ============================================================

def build_active_oversight():
    out = str(OUT_DIR / "active-oversight-sample.pdf")
    doc = make_doc(out, "ACTIVE OVERSIGHT · WEEKLY REPORT · SAMPLE", "Active Project Oversight — Sample Weekly Report")
    s = []
    cover_block(s, "WHAT YOU RECEIVE · WEEKLY",
        "Active Project Oversight",
        "We become your project manager. You provide the funding and hold the permits; a licensed NC GC runs "
        "the execution layer — tracking progress, budget, and schedule, logging changes, and releasing draws "
        "clean. This is one week's report.",
        "Sample Investor · Week 5 of 13 · Charlotte NC<br/>From $6,500 scoped per project · NC GC License #107724")

    s.append(Paragraph("HOW THIS WORKS", S["eyebrow"]))
    s.append(Paragraph("We run execution. You keep the seat.", S["h1"]))
    s.append(Paragraph("On Active Oversight, Southern Cities effectively becomes your project manager — we run "
                       "the execution layer week to week so the job moves without you managing it. Each week you "
                       "get this report: where the build actually is, where the money actually is, what's "
                       "slipping, and what needs your decision.", S["body"]))
    s.append(data_table(["WE TRACK", "YOU SEE"], [
        ["Progress vs schedule", "% complete by trade, on/behind"],
        ["Budget vs baseline", "Spent vs approved, variance flags"],
        ["Schedule slippage", "Early warning, not draw-day surprise"],
        ["Changes", "Logged + priced before work proceeds"],
        ["Issues", "Escalated to you in writing within 24h"],
    ], col_widths=[2.2 * inch, FRAME_W - 2.2 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("WHO HOLDS WHAT",
        "<b>You provide:</b> funding, and — where permits are required — you remain the GC of record holding the "
        "permits and the liability that comes with them. <b>We provide:</b> the execution layer — coordinating "
        "the subs and materials you have in place. <b>We do NOT pull permits</b> (that's GC-Supported Build) and "
        "<b>base scope does not source your crews</b> — if you need us to find or recommend labor, that's an "
        "add-on priced per trade.", bg=ACCENT_LIGHT, bar=ORANGE))
    s.append(PageBreak())

    s.append(Paragraph("WHO THIS IS FOR", S["eyebrow"]))
    s.append(Paragraph("Ideal across the investor avatars", S["h1"]))
    s.append(data_table(["AVATAR", "WHY IT FITS"], [
        ["Active flippers with crews", "Subs lined up, too many projects to PM each one yourself"],
        ["BRRRR operators scaling", "Outgrown what you can personally oversee"],
        ["Out-of-state / remote investors", "Own NC property, can't be on-site — we're your control on the ground"],
        ["Wholesalers who kept a deal", "Can fund + hold permits, never run a build"],
        ["Capital-rich, time-poor", "Want the deal's upside without becoming the PM"],
        ["Owner-builders of record", "Can legally pull permits; want a licensed GC operating the job"],
    ], col_widths=[2.3 * inch, FRAME_W - 2.3 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("NOT THE RIGHT FIT?",
        "If you need crews sourced from scratch, start with Project Setup. If you'd rather we pull the permits "
        "and carry the license-level risk, that's GC-Supported Build. If you want zero involvement and full "
        "risk transfer, that's Full GC."))
    s.append(PageBreak())

    s.append(Paragraph("WEEK 5 · PROGRESS REPORT", S["eyebrow"]))
    s.append(Paragraph("Where the build is", S["h1"]))
    s.append(verdict_box("ON TRACK", "Week 5 of 13. Rough-in complete and inspected. One change logged, schedule intact.", GO_GREEN))
    s.append(Spacer(1, 0.12 * inch))
    s.append(data_table(["TRADE", "STATUS", "% COMPLETE"], [
        ["Demo", "Complete", "100%"],
        ["Plumbing rough", "Complete + inspected ✓", "100%"],
        ["Electrical rough", "Complete + inspected ✓", "100%"],
        ["HVAC rough", "Complete", "90%"],
        ["Framing changes", "Complete", "100%"],
        ["Insulation / drywall", "Starting week 6", "0%"],
    ], col_widths=[2.0 * inch, FRAME_W - 3.4 * inch, 1.4 * inch]))
    s.append(PageBreak())

    s.append(Paragraph("BUDGET vs BASELINE", S["eyebrow"]))
    s.append(Paragraph("Where the money is", S["h1"]))
    s.append(data_table(["TRADE", "BASELINE", "COMMITTED", "VARIANCE"], [
        ["Demo", "$2,800", "$2,650", "-$150 ✓"],
        ["Plumbing", "$11,200", "$11,200", "$0 ✓"],
        ["Electrical", "$5,600", "$6,150", "+$550 ⚠"],
        ["HVAC", "$9,600", "$9,600", "$0 ✓"],
        ["Spent to date (of $106K)", "$34,200", "$34,750", "+$550"],
    ], col_widths=[2.0 * inch, 1.3 * inch, 1.3 * inch, FRAME_W - 4.6 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("VARIANCE EXPLAINED", "Electrical +$550: panel feed required an unforeseen mast replacement (code). Pre-approved by you on Tue via the change log. Still inside the 10% contingency — no margin impact."))
    s.append(PageBreak())

    s.append(Paragraph("SCHEDULE + SLIPPAGE", S["eyebrow"]))
    s.append(Paragraph("Are we still on the clock", S["h1"]))
    s.append(data_table(["MILESTONE", "PLANNED", "FORECAST", "STATUS"], [
        ["Rough-in done", "End wk 5", "End wk 5", "Met ✓"],
        ["Close-up done", "End wk 8", "End wk 8", "On track"],
        ["Finishes done", "End wk 11", "End wk 11", "On track"],
        ["List", "Wk 13", "Wk 13", "On track"],
    ], col_widths=[1.9 * inch, 1.2 * inch, 1.2 * inch, FRAME_W - 4.3 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("WATCH ITEM", "Cabinet delivery confirmed for week 8 — the one long-lead item that could move the finish date. Tracking weekly; vendor on schedule as of this report."))
    s.append(PageBreak())

    s.append(Paragraph("CHANGE LOG", S["eyebrow"]))
    s.append(Paragraph("Every change, priced and approved", S["h1"]))
    s.append(data_table(["#", "CHANGE", "COST", "APPROVED"], [
        ["CO-1", "Electrical mast replacement (code)", "+$550", "Yes — Tue"],
        ["CO-2", "Add bath exhaust fan (inspector)", "+$180", "Yes — Wed"],
        ["—", "Net change to date", "+$730", "Within contingency"],
    ], col_widths=[0.6 * inch, FRAME_W - 3.4 * inch, 1.1 * inch, 1.7 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("THE POINT OF THE LOG", "No change happens without a price and your sign-off first. This is how a $730 documented adjustment stays a $730 adjustment instead of becoming a $6K 'we found some stuff' invoice at the end."))
    s.append(PageBreak())

    s.append(Paragraph("DRAW HISTORY + DOCUMENTATION", S["eyebrow"]))
    s.append(Paragraph("The paper trail that protects you", S["h1"]))
    s.append(data_table(["DRAW", "MILESTONE", "STATUS", "RELEASED"], [
        ["Acquisition", "Close", "Complete", "$31,800"],
        ["Draw 1", "Rough-in + inspected", "Recommend this week", "Pending"],
        ["Draw 2", "Close-up", "Forecast wk 8", "—"],
        ["Draw 3", "Finishes", "Forecast wk 11", "—"],
    ], col_widths=[1.0 * inch, FRAME_W - 3.9 * inch, 1.6 * inch, 1.3 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("DOCUMENTATION ON FILE", "Every period: date-stamped photos, inspection sign-offs, the change log, and a budget-vs-baseline export — all in your portal. This is the package a lender releases against and the trail that protects you if a sub disputes scope later."))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout("WITHOUT THIS", "The investors who get hurt are the ones who find out at draw time — or at sale — that the work and the money drifted apart weeks ago. Weekly documentation is how you never get that surprise."))
    s.append(PageBreak())

    s.append(Paragraph("SITE INSPECTION + DRAW", S["eyebrow"]))
    s.append(Paragraph("This week's walk + draw recommendation", S["h1"]))
    s.append(callout("SITE WALK NOTES (WK 5)", "Rough-in clean, both inspections passed. Plumbing pressure-tested. One framing detail at the new bath wall corrected on-site. 14 date-stamped photos attached to your portal."))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout("DRAW 1 RECOMMENDATION: RELEASE", "Milestone 'demo + rough-in complete' met and inspected. Recommend releasing Draw 1 ($31,800). Lender-ready photo + inspection package attached."))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout("YOUR DECISIONS THIS WEEK", "1) Approve Draw 1 release. 2) Confirm cabinet finish selection (needed by Friday to hold the week-8 delivery). Everything else is handled."))
    closing(s, DISCLAIMER)
    doc.build(s)
    print(f"  ✓ {out}  ({os.path.getsize(out)/1024:.0f} KB)")


# ============================================================
# DELIVERABLE: GC-Supported Owner Build (CO4)
# ============================================================

def build_gc_supported_build():
    out = str(OUT_DIR / "gc-supported-build-sample.pdf")
    doc = make_doc(out, "GC-SUPPORTED OWNER BUILD · SAMPLE", "GC-Supported Owner Build — Sample Package")
    s = []
    cover_block(s, "WHAT YOU RECEIVE",
        "GC-Supported Owner Build",
        "You own the deal and keep daily control. Southern Cities pulls permits under licensed authority, "
        "owns compliance, and faces the inspectors — so you carry the upside, not the license-level risk.",
        "Sample Investor · 1,420 sf ranch rehab · Charlotte NC<br/>From $5,000 + 4% of budget · NC GC License #107724")

    s.append(Paragraph("THE STRUCTURE", S["eyebrow"]))
    s.append(Paragraph("Who holds what", S["h1"]))
    s.append(data_table(["RESPONSIBILITY", "YOU (OWNER)", "SOUTHERN CITIES"], [
        ["Capital + deal ownership", "✓", ""],
        ["Daily decisions + control", "✓", ""],
        ["Permits (pulled under license)", "", "✓"],
        ["Code compliance ownership", "", "✓"],
        ["Inspector-facing accountability", "", "✓"],
        ["License-level risk", "", "✓"],
    ], col_widths=[FRAME_W - 3.0 * inch, 1.5 * inch, 1.5 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("WHY THIS STRUCTURE EXISTS", "It lets a capital-rich investor own the project at the GC level — keeping the full spread — without taking on the personal license exposure of being an unlicensed GC of record."))
    s.append(PageBreak())

    s.append(Paragraph("PERMIT PACKAGE", S["eyebrow"]))
    s.append(Paragraph("Pulled under Southern Cities' license", S["h1"]))
    s.append(data_table(["PERMIT", "JURISDICTION", "STATUS"], [
        ["Building (alteration)", "Mecklenburg County", "Issued"],
        ["Electrical (panel + rewire)", "Mecklenburg County", "Issued"],
        ["Plumbing (re-pipe)", "Mecklenburg County", "Issued"],
        ["Mechanical (HVAC)", "Mecklenburg County", "Issued"],
        ["Prior open permit (2014)", "Mecklenburg County", "Closed ✓"],
    ], col_widths=[2.2 * inch, 2.0 * inch, FRAME_W - 4.2 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("WHAT WE HANDLED", "All four permits pulled under our license, plus the prior owner's open 2014 water-heater permit closed out — the kind of legacy issue that blocks a clean resale if it isn't caught."))
    s.append(PageBreak())

    s.append(Paragraph("AHJ INSPECTION SCHEDULE", S["eyebrow"]))
    s.append(Paragraph("We coordinate + face the inspectors", S["h1"]))
    s.append(data_table(["INSPECTION", "PHASE", "RESULT"], [
        ["Rough plumbing", "Week 5", "Pass ✓"],
        ["Rough electrical", "Week 5", "Pass ✓"],
        ["Rough mechanical", "Week 5", "Pass ✓"],
        ["Framing", "Week 5", "Pass ✓"],
        ["Insulation", "Week 6", "Scheduled"],
        ["Final (all trades)", "Week 12", "Scheduled"],
    ], col_widths=[2.0 * inch, 1.4 * inch, FRAME_W - 3.4 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("YOU DON'T MEET THE INSPECTOR", "We schedule, attend, and resolve every AHJ inspection. If something gets flagged, we own the correction path — that's the license-level accountability you're buying."))
    s.append(PageBreak())

    s.append(Paragraph("COMPLIANCE CHECKLIST", S["eyebrow"]))
    s.append(Paragraph("What we own on the code side", S["h1"]))
    s.append(data_table(["ITEM", "STATUS"], [
        ["Egress / bedroom window compliance", "Verified ✓"],
        ["Smoke + CO detector placement (NC code)", "Verified ✓"],
        ["GFCI / AFCI protection", "Verified ✓"],
        ["Panel labeling + grounding", "Verified ✓"],
        ["Energy code (2018 NCECC) insulation", "On schedule"],
        ["Stair / rail compliance (if applicable)", "N/A"],
    ], col_widths=[FRAME_W - 1.8 * inch, 1.8 * inch]))
    s.append(PageBreak())

    s.append(Paragraph("FIELD VALIDATION VISIT", S["eyebrow"]))
    s.append(Paragraph("Sample visit report", S["h1"]))
    s.append(callout("VISIT 3 · WEEK 5", "On-site validation of rough-in quality ahead of inspection. Plumbing pressure verified, panel bonding checked, framing corrections from visit 2 confirmed complete. 12 date-stamped photos in your portal."))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout("RISK MONITORING", "No open compliance risks this period. Watch item: energy-code insulation inspection (week 6) must pass before drywall — scheduled and on track."))
    s.append(PageBreak())

    s.append(Paragraph("IF AN INSPECTION GETS FLAGGED", S["eyebrow"]))
    s.append(Paragraph("We own the correction path", S["h1"]))
    s.append(Paragraph("The whole point of this structure is what happens when something doesn't pass. You're "
                       "not the one standing in front of the inspector — we are. Here's how a flag is handled.", S["body"]))
    s.append(data_table(["STEP", "WHO", "WHAT HAPPENS"], [
        ["1. Flag received", "Southern Cities", "We take the correction notice, not you"],
        ["2. Root cause", "Southern Cities", "Diagnose + scope the fix, priced"],
        ["3. You're informed", "→ Owner", "Written summary + cost, before work"],
        ["4. Correction", "Southern Cities", "Coordinate the sub + re-inspection"],
        ["5. Re-inspect", "Southern Cities", "We attend; close the item"],
    ], col_widths=[1.7 * inch, 1.6 * inch, FRAME_W - 3.3 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("THE VALUE", "An unlicensed owner-builder facing a failed inspection alone is where deals stall for weeks and budgets blow. Here, the license-level accountability — and the inspector relationship — is ours."))
    s.append(PageBreak())

    s.append(Paragraph("CLOSEOUT PATH + NEXT STEP", S["eyebrow"]))
    s.append(Paragraph("To certificate of occupancy", S["h1"]))
    s.append(data_table(["CLOSEOUT ITEM", "WHEN"], [
        ["Final inspections (all trades)", "Week 12"],
        ["Certificate of occupancy filing", "Week 12 – 13"],
        ["Permit closeout package (for resale)", "Week 13"],
        ["Warranty + lien-waiver docs", "At completion"],
    ], col_widths=[FRAME_W - 1.8 * inch, 1.8 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("READY FOR RESALE", "You finish with every permit closed, a CO in hand, and a clean compliance trail — the documentation a buyer's lender and a title company need to close fast."))
    closing(s, DISCLAIMER)
    doc.build(s)
    print(f"  ✓ {out}  ({os.path.getsize(out)/1024:.0f} KB)")


# ============================================================
# DELIVERABLE: Full-Service GC (CO5)
# ============================================================

def build_full_gc():
    out = str(OUT_DIR / "full-gc-sample.pdf")
    doc = make_doc(out, "FULL-SERVICE GC · PROJECT EXECUTION PLAN · SAMPLE", "Full-Service General Contracting — Sample Plan")
    s = []
    cover_block(s, "WHAT YOU RECEIVE",
        "Full-Service General Contracting",
        "You bring capital and approve milestones. Southern Cities executes end-to-end on a fixed-price "
        "contract with an on-schedule penalty — so budget and schedule risk transfer entirely to us.",
        "Sample Investor · 1,420 sf ranch rehab · Charlotte NC<br/>Fixed-price · NC GC License #107724")

    s.append(Paragraph("EXECUTION PLAN OVERVIEW", S["eyebrow"]))
    s.append(Paragraph("You bring capital. We deliver keys.", S["h1"]))
    s.append(verdict_box("FIXED PRICE · $106,000", "On-schedule penalty applies. Budget + schedule risk transfer to Southern Cities.", NAVY))
    s.append(Spacer(1, 0.12 * inch))
    s.append(Paragraph("Full GC means we own the whole build — planning, engineering, permits, subs, "
                       "procurement, scheduling, supervision, draws, inspections, QC, turnover, and warranty. "
                       "Your role: underwrite the deal, approve milestones, sign the checks.", S["body"]))
    s.append(PageBreak())

    s.append(Paragraph("CONTRACT + RISK TRANSFER", S["eyebrow"]))
    s.append(Paragraph("What the structure protects", S["h1"]))
    s.append(data_table(["MECHANISM", "WHAT IT MEANS FOR YOU"], [
        ["Fixed-price contract", "Budget overruns are our problem, not yours"],
        ["On-schedule penalty", "Daily credit against fee for missed milestones"],
        ["Single point of accountability", "One licensed GC owns the whole result"],
        ["Lien-waiver discipline", "Subs paid + waived; no surprise liens at sale"],
        ["Standard NC GC warranty", "Defined warranty on delivered work"],
    ], col_widths=[2.1 * inch, FRAME_W - 2.1 * inch]))
    s.append(PageBreak())

    s.append(Paragraph("MASTER SCHEDULE", S["eyebrow"]))
    s.append(Paragraph("Phase plan to delivery", S["h1"]))
    s.append(data_table(["PHASE", "WEEKS", "MILESTONE"], [
        ["Mobilize + permits", "1 – 2", "Permits issued"],
        ["Demo + rough systems", "3 – 6", "Rough inspections pass"],
        ["Close-up", "6 – 8", "Drywall + paint"],
        ["Finishes", "8 – 11", "Kitchen/bath/floor"],
        ["Punch + final", "12", "CO issued"],
        ["Turnover", "13", "Keys delivered"],
    ], col_widths=[2.2 * inch, 1.0 * inch, FRAME_W - 3.2 * inch]))
    s.append(PageBreak())

    s.append(Paragraph("DRAW SCHEDULE", S["eyebrow"]))
    s.append(Paragraph("Milestone-based, lender-ready", S["h1"]))
    s.append(data_table(["DRAW", "MILESTONE", "AMOUNT"], [
        ["1", "Rough-in complete + inspected", "$31,800"],
        ["2", "Close-up complete", "$26,500"],
        ["3", "Finishes complete", "$31,800"],
        ["4", "CO + turnover", "$15,900"],
        ["", "TOTAL (fixed)", "$106,000"],
    ], col_widths=[0.7 * inch, FRAME_W - 2.7 * inch, 2.0 * inch]))
    s.append(PageBreak())

    s.append(Paragraph("SITE SUPERVISION REPORT", S["eyebrow"]))
    s.append(Paragraph("Sample weekly supervision summary", S["h1"]))
    s.append(callout("WEEK 7 SUMMARY", "Drywall complete, primer up. Cabinets staged for week 8 set. Two subs on-site (tile, trim). Zero safety incidents. Schedule on plan; no penalty exposure. 18 photos in your portal."))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout("QUALITY CONTROL", "Pre-finish QC walk complete: drywall finish level verified, plumbing rough re-checked behind tile walls before close, electrical device boxes set to depth. Punch items logged for trades."))
    s.append(PageBreak())

    s.append(Paragraph("BUDGET ADMINISTRATION", S["eyebrow"]))
    s.append(Paragraph("Commitments vs the fixed price", S["h1"]))
    s.append(data_table(["CATEGORY", "BUDGET", "COMMITTED", "STATUS"], [
        ["Systems", "$24,000", "$24,550", "Absorbed (fixed)"],
        ["Kitchen / bath", "$30,000", "$29,400", "On budget"],
        ["Finishes", "$22,000", "$21,800", "On budget"],
        ["Envelope", "$18,000", "$18,000", "On budget"],
        ["Your price (fixed)", "$106,000", "—", "Unchanged ✓"],
    ], col_widths=[1.9 * inch, 1.3 * inch, 1.3 * inch, FRAME_W - 4.5 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("THE POINT", "Systems came in $550 over. On a fixed-price contract, that's our absorption — your number stayed $106,000. That's the risk transfer you paid for."))
    s.append(PageBreak())

    s.append(Paragraph("TURNOVER + WARRANTY", S["eyebrow"]))
    s.append(Paragraph("How the project ends", S["h1"]))
    s.append(data_table(["TURNOVER ITEM", "DELIVERED"], [
        ["Certificate of occupancy", "✓"],
        ["All permits closed", "✓"],
        ["Final lien waivers (all subs)", "✓"],
        ["Warranty documentation", "✓"],
        ["Appliance + systems manuals", "✓"],
        ["Photo + closeout package", "✓"],
    ], col_widths=[FRAME_W - 1.6 * inch, 1.6 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("KEYS DELIVERED", "You underwrote the deal and approved milestones. We delivered a finished, inspected, warrantied property with a clean document trail — ready to list. That's full GC."))
    closing(s, DISCLAIMER)
    doc.build(s)
    print(f"  ✓ {out}  ({os.path.getsize(out)/1024:.0f} KB)")


# ============================================================
# DELIVERABLE: Budget & Scope Review ($399 — you bring numbers, we audit)
# ============================================================

def build_budget_scope_review():
    out = str(OUT_DIR / "budget-scope-review-sample.pdf")
    doc = make_doc(out, "BUDGET & SCOPE REVIEW · SAMPLE", "Budget & Scope Review — Sample")
    s = []
    cover_block(s, "WHAT YOU RECEIVE",
        "Budget &amp; Scope Review",
        "You bring the numbers — we pressure-test them. A licensed NC GC audits your existing budget and "
        "scope line by line against current market costs, finds the gaps, and hands back a number you can "
        "take to contractors and lenders.",
        "Sample Investor · budget audit · Charlotte NC<br/>$399 flat · 2 business days · NC GC License #107724")

    s.append(Paragraph("HOW TO READ THIS AUDIT", S["eyebrow"]))
    s.append(Paragraph("What we pressure-tested", S["h1"]))
    s.append(Paragraph("You sent us a budget — a pro-forma, a spreadsheet, or a contractor bid. We audited every "
                       "line against 2026 NC trade-network costs, checked the scope for missing items, and "
                       "flagged the numbers that won't survive contractor pricing or lender review. This is the "
                       "corrected, bid-grade version.", S["body"]))
    s.append(callout("WHAT YOU SENT", "1,420 sf cosmetic-plus rehab pro-forma · total budget submitted: <b>$78,500</b> · 22 line items · prepared from a wholesaler's marketing sheet."))
    s.append(PageBreak())

    s.append(Paragraph("THE VERDICT", S["eyebrow"]))
    s.append(Paragraph("Your budget vs. reality", S["h1"]))
    s.append(verdict_box("UNDER BY ~$24K", "Submitted $78,500 · realistic $98,000–$104,000. Three missing trades + four off-market lines.", WARN))
    s.append(Spacer(1, 0.12 * inch))
    s.append(callout("THE HEADLINE", "Your budget isn't wrong on the items it includes — it's wrong on the items it's missing. A rehab budget that pencils at $78.5K here gets you to drywall and then stalls when the systems and contingency you didn't price show up."))
    s.append(PageBreak())

    s.append(Paragraph("SCOPE GAP ANALYSIS", S["eyebrow"]))
    s.append(Paragraph("What your budget left out", S["h1"]))
    s.append(data_table(["MISSING ITEM", "WHY IT'S REQUIRED", "ADD"], [
        ["Panel replacement", "Federal Pacific — uninsurable, will fail", "$2,800"],
        ["Sewer lateral allowance", "1956 clay line, unknown condition", "$4,500"],
        ["Permit + inspection fees", "Not a line in your sheet", "$1,400"],
        ["Dumpster / disposal", "Underpriced at $400", "$2,200"],
        ["Contingency (10%)", "Zero contingency budgeted", "$9,000"],
    ], col_widths=[1.9 * inch, FRAME_W - 3.1 * inch, 1.2 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("THE BIG ONE", "Zero contingency on a 1950s systems rehab is the single most expensive assumption in this budget. Behind-the-wall surprises aren't a maybe at this vintage — they're a when."))
    s.append(PageBreak())

    s.append(Paragraph("MARKET-RATE CORRECTIONS", S["eyebrow"]))
    s.append(Paragraph("Lines that are off-market", S["h1"]))
    s.append(data_table(["LINE ITEM", "YOUR NUMBER", "MARKET", "DELTA"], [
        ["Kitchen (full reno)", "$12,000", "$18,200 – $22,800", "+$8,200"],
        ["HVAC replacement", "$6,500", "$8,800 – $10,400", "+$3,000"],
        ["Roof", "$6,000", "$8,600 – $11,200", "+$3,200"],
        ["Plumbing re-pipe", "$5,000", "$9,200 – $12,400", "+$5,400"],
    ], col_widths=[2.0 * inch, 1.3 * inch, 1.5 * inch, FRAME_W - 4.8 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("WHY THESE DRIFT", "Marketing sheets carry last cycle's numbers. Kitchen and plumbing are where 2026 NC pricing has moved most — these two lines alone account for $13.6K of the gap."))
    s.append(PageBreak())

    s.append(Paragraph("CONTINGENCY + RESERVES", S["eyebrow"]))
    s.append(Paragraph("What to hold back", S["h1"]))
    s.append(data_table(["RESERVE", "RECOMMENDATION", "BASIS"], [
        ["Construction contingency", "10% of hard costs", "1950s systems risk"],
        ["Sewer scope reserve", "$250 (scope) + $9K (if bad)", "Unverified clay lateral"],
        ["Holding-cost buffer", "+2 weeks", "Permit timeline variance"],
    ], col_widths=[2.0 * inch, FRAME_W - 3.6 * inch, 1.6 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("RULE OF THUMB", "On pre-1970 NC rehabs we recommend a hard 10% contingency, not the 5% most spreadsheets carry. It's the difference between absorbing a surprise and re-trading the deal mid-build."))
    s.append(PageBreak())

    s.append(Paragraph("CORRECTED BID-GRADE BUDGET", S["eyebrow"]))
    s.append(Paragraph("The number you can actually use", S["h1"]))
    s.append(data_table(["CATEGORY", "YOUR BUDGET", "CORRECTED"], [
        ["Systems (HVAC/plumb/elec)", "$11,500", "$24,000"],
        ["Kitchen / bath", "$16,000", "$28,000"],
        ["Finishes", "$18,000", "$19,400"],
        ["Envelope (roof/paint/ext)", "$14,000", "$17,200"],
        ["Permits / disposal / misc", "$2,000", "$4,400"],
        ["Contingency", "$0", "$9,000"],
        ["TOTAL", "$78,500", "$102,000"],
    ], col_widths=[2.2 * inch, 1.5 * inch, FRAME_W - 3.7 * inch]))
    s.append(PageBreak())

    s.append(Paragraph("NEXT STEP", S["eyebrow"]))
    s.append(Paragraph("Take a real number into the deal", S["h1"]))
    s.append(callout("WHAT THIS CHANGES", "Re-run your deal math at $102K, not $78.5K. If it still pencils, you have a budget contractors will price against and lenders will fund. If it doesn't, you just avoided a deal that would have gone upside-down at drywall."))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout("IF YOU NEED THE BUDGET BUILT, NOT AUDITED", "This product audits a budget you have. If you're starting from scratch, the Contractor-Grade Budget builds one from full takeoffs."))
    closing(s, DISCLAIMER)
    doc.build(s)
    print(f"  ✓ {out}  ({os.path.getsize(out)/1024:.0f} KB)")


# ============================================================
# DELIVERABLE: Contractor-Grade Budget ($1,799 — built from scratch)
# ============================================================

def build_contractor_grade_budget():
    out = str(OUT_DIR / "contractor-grade-budget-sample.pdf")
    doc = make_doc(out, "CONTRACTOR-GRADE BUDGET · SAMPLE", "Contractor-Grade Budget — Sample")
    s = []
    cover_block(s, "WHAT YOU RECEIVE",
        "Contractor-Grade Budget",
        "No budget yet? We build one from scratch — full takeoffs, real 2026 NC trade-network unit costs, "
        "written assumptions, and a bid-ready spreadsheet. The number you'd otherwise pay a GC to assemble, "
        "without hiring one.",
        "Sample Investor · budget built from scratch · Charlotte NC<br/>$1,799 · NC GC License #107724")

    s.append(Paragraph("HOW THIS WAS BUILT", S["eyebrow"]))
    s.append(Paragraph("Takeoffs, not guesses", S["h1"]))
    s.append(Paragraph("This budget was built the way a GC builds a bid: measured quantities (takeoffs) for each "
                       "trade, priced against current NC trade-network unit costs, with every assumption written "
                       "down so you can defend the number to a contractor or a lender.", S["body"]))
    s.append(data_table(["INPUT", "SOURCE"], [
        ["Quantities (sf, lf, counts)", "Takeoff from plans + photos"],
        ["Unit costs", "2026 NC trade-network pricing"],
        ["Labor multipliers", "Charlotte submarket, current cycle"],
        ["Allowances", "Finish level: Market-Standard (Tier 2)"],
    ], col_widths=[2.2 * inch, FRAME_W - 2.2 * inch]))
    s.append(PageBreak())

    s.append(Paragraph("BUDGET SUMMARY", S["eyebrow"]))
    s.append(Paragraph("The number, by category", S["h1"]))
    s.append(verdict_box("$104,200", "Bid-ready total · Market-Standard finish · 1,420 sf · 2026 Charlotte pricing.", NAVY))
    s.append(Spacer(1, 0.12 * inch))
    s.append(data_table(["CATEGORY", "AMOUNT", "% OF TOTAL"], [
        ["Demo + site", "$3,000", "3%"],
        ["Systems (HVAC/plumb/elec)", "$24,400", "23%"],
        ["Kitchen / bath", "$30,100", "29%"],
        ["Finishes (floor/paint/trim)", "$21,300", "20%"],
        ["Envelope (roof/window/ext)", "$16,200", "16%"],
        ["GC + permits + contingency", "$9,200", "9%"],
    ], col_widths=[2.3 * inch, 1.5 * inch, FRAME_W - 3.8 * inch]))
    s.append(PageBreak())

    s.append(Paragraph("LINE-ITEM DETAIL (1 OF 2)", S["eyebrow"]))
    s.append(Paragraph("Quantity × unit cost", S["h1"]))
    s.append(data_table(["ITEM", "QTY", "UNIT", "TOTAL"], [
        ["Demo + dumpster", "1,420 sf", "$2.10/sf", "$2,982"],
        ["Roof — arch shingle", "18 sq", "$525/sq", "$9,450"],
        ["HVAC — 3-ton + furnace", "1 ea", "$9,600", "$9,600"],
        ["Plumbing re-pipe (PEX)", "1,420 sf", "$5.40/sf", "$7,668"],
        ["Bath rebuild", "1 ea", "$8,200", "$8,200"],
        ["Electrical — 200A + devices", "1 ea", "$5,600", "$5,600"],
        ["LVP flooring", "1,050 sf", "$5.20/sf", "$5,460"],
    ], col_widths=[2.2 * inch, 1.1 * inch, 1.2 * inch, FRAME_W - 4.5 * inch]))
    s.append(PageBreak())

    s.append(Paragraph("LINE-ITEM DETAIL (2 OF 2)", S["eyebrow"]))
    s.append(Paragraph("Quantity × unit cost", S["h1"]))
    s.append(data_table(["ITEM", "QTY", "UNIT", "TOTAL"], [
        ["Kitchen cabinets (mid)", "18 lf", "$420/lf", "$7,560"],
        ["Quartz counters", "42 sf", "$78/sf", "$3,276"],
        ["Appliances (SS package)", "1 ea", "$4,200", "$4,200"],
        ["Interior paint", "1,420 sf", "$2.80/sf", "$3,976"],
        ["Exterior paint", "1 ea", "$3,400", "$3,400"],
        ["Trim + interior doors", "1 ea", "$3,800", "$3,800"],
        ["Windows (partial)", "8 ea", "$520/ea", "$4,160"],
    ], col_widths=[2.2 * inch, 1.1 * inch, 1.2 * inch, FRAME_W - 4.5 * inch]))
    s.append(PageBreak())

    s.append(Paragraph("ASSUMPTIONS + EXCLUSIONS", S["eyebrow"]))
    s.append(Paragraph("What this number assumes", S["h1"]))
    s.append(data_table(["ASSUMED", "EXCLUDED (priced separately if found)"], [
        ["Sound foundation + framing", "Structural repair"],
        ["Clay sewer intact", "Sewer lateral replacement"],
        ["No asbestos / lead remediation", "Hazmat abatement"],
        ["Standard Mecklenburg permit path", "Variance / rezoning"],
        ["Market-Standard finish level", "Premium / custom upgrades"],
    ], col_widths=[FRAME_W / 2, FRAME_W / 2]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("WHY THIS MATTERS", "A budget without written assumptions is a number you can't defend. When a contractor's bid comes in different, this page tells you whether it's a real difference or a scope misunderstanding."))
    s.append(PageBreak())

    s.append(Paragraph("ALLOWANCES + CONTINGENCY", S["eyebrow"]))
    s.append(Paragraph("Where flexibility is built in", S["h1"]))
    s.append(data_table(["ALLOWANCE", "INCLUDED", "NOTE"], [
        ["Cabinet allowance", "$7,560", "Semi-custom; upgrade swaps net to budget"],
        ["Fixture allowance", "$2,400", "Mid-grade; itemized in spreadsheet"],
        ["Flooring allowance", "$5,460", "LVP; hardwood refinish priced separate"],
        ["Contingency", "$5,200", "5% — raise to 10% for pre-1970 risk"],
    ], col_widths=[1.9 * inch, 1.3 * inch, FRAME_W - 3.8 * inch]))
    s.append(PageBreak())

    s.append(Paragraph("HOW TO USE THIS BUDGET", S["eyebrow"]))
    s.append(Paragraph("From spreadsheet to execution", S["h1"]))
    s.append(callout("BID AGAINST IT", "Hand contractors the scope + this line-item budget so every bid prices the same thing. The bids that come back wildly off are telling you something — usually a scope gap, not a better price."))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout("FUND AGAINST IT", "The category breakdown maps to a lender draw schedule. This is the document that gets a construction loan released without back-and-forth."))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout("DELIVERED AS A LIVE SPREADSHEET", "You also receive the editable spreadsheet — adjust finishes, quantities, or allowances and the totals recompute. The PDF is the snapshot; the spreadsheet is the working file."))
    closing(s, DISCLAIMER)
    doc.build(s)
    print(f"  ✓ {out}  ({os.path.getsize(out)/1024:.0f} KB)")


# ============================================================
# DELIVERABLE: Permit & Compliance Review
# ============================================================

def build_permit_compliance_review():
    out = str(OUT_DIR / "permit-compliance-review-sample.pdf")
    doc = make_doc(out, "PERMIT & COMPLIANCE REVIEW · SAMPLE", "Permit & Compliance Review — Sample")
    s = []
    cover_block(s, "WHAT YOU RECEIVE",
        "Permit &amp; Compliance Review",
        "Before you close, a licensed NC GC reads the permit path and local compliance picture — required "
        "permits, open permits, code and zoning exposure — so the rehab path can't become an expensive "
        "surprise after closing.",
        "Sample Investor · pre-close review · Charlotte NC<br/>$399 · 2 business days · NC GC License #107724")

    s.append(Paragraph("WHAT WE REVIEWED", S["eyebrow"]))
    s.append(Paragraph("The permit + compliance picture", S["h1"]))
    s.append(Paragraph("We pulled the county permit history, checked the parcel's zoning and code exposure, and "
                       "mapped the permit path your intended scope will require — before earnest money goes hard.", S["body"]))
    s.append(data_table(["SOURCE", "REVIEWED FOR"], [
        ["Mecklenburg permit portal", "Open / closed / expired permits"],
        ["County GIS + zoning", "Use, setbacks, overlay districts"],
        ["Tax + parcel records", "Unpermitted additions vs. record sf"],
        ["Scope of work (your inputs)", "Permits the rehab will require"],
    ], col_widths=[2.3 * inch, FRAME_W - 2.3 * inch]))
    s.append(PageBreak())

    s.append(Paragraph("THE VERDICT", S["eyebrow"]))
    s.append(Paragraph("Permit path summary", S["h1"]))
    s.append(verdict_box("CLEAR — WITH ONE FIX", "Path is straightforward for your scope. One open permit must be closed before resale. Details below.", WARN))
    s.append(Spacer(1, 0.12 * inch))
    s.append(callout("BOTTOM LINE", "Nothing here kills the deal — but the open 2014 permit and a record-square-footage discrepancy both need handling, and both are cheaper to fix now than to discover at your resale closing."))
    s.append(PageBreak())

    s.append(Paragraph("REQUIRED PERMITS", S["eyebrow"]))
    s.append(Paragraph("What your scope will need", S["h1"]))
    s.append(data_table(["PERMIT", "TRIGGERED BY", "EST. TIMELINE"], [
        ["Building (alteration)", "Kitchen/bath reconfig", "1 – 2 weeks"],
        ["Electrical", "Panel + rewire", "Same submittal"],
        ["Plumbing", "Re-pipe + bath", "Same submittal"],
        ["Mechanical", "HVAC replacement", "Same submittal"],
    ], col_widths=[1.8 * inch, FRAME_W - 3.2 * inch, 1.4 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("GOOD NEWS", "Your scope stays within the existing footprint — no variance, no rezoning, no engineered drawings required. This is the fast permit path."))
    s.append(PageBreak())

    s.append(Paragraph("OPEN PERMITS + VIOLATIONS", S["eyebrow"]))
    s.append(Paragraph("What's on the record now", S["h1"]))
    s.append(data_table(["FINDING", "SEVERITY", "ACTION"], [
        ["Open water-heater permit (2014)", "High", "Close before resale — $325 + 5d"],
        ["No active code violations", "—", "Clean ✓"],
        ["Record sf vs actual (+180 sf)", "Medium", "Likely unpermitted sunroom"],
    ], col_widths=[2.6 * inch, 1.1 * inch, FRAME_W - 3.7 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("THE SQUARE-FOOTAGE FLAG", "Tax record shows 180 sf less than the listing. Usually an unpermitted sunroom or enclosed porch. Options: permit it retroactively, disclose it, or exclude it from advertised sf — but don't get surprised by it at appraisal."))
    s.append(PageBreak())

    s.append(Paragraph("COMPLIANCE RISKS", S["eyebrow"]))
    s.append(Paragraph("Zoning + code exposure", S["h1"]))
    s.append(data_table(["AREA", "STATUS"], [
        ["Zoning use (single-family)", "Conforming ✓"],
        ["Setbacks (existing footprint)", "Conforming ✓"],
        ["Overlay / historic district", "None ✓"],
        ["Egress / bedroom windows", "Verify during permit"],
        ["Unpermitted addition (sunroom)", "Resolve — see above"],
    ], col_widths=[FRAME_W - 1.8 * inch, 1.8 * inch]))
    s.append(PageBreak())

    s.append(Paragraph("JURISDICTION NOTES", S["eyebrow"]))
    s.append(Paragraph("How Mecklenburg runs this", S["h1"]))
    s.append(callout("SUBMITTAL", "Mecklenburg accepts a combined trade submittal for a single-family alteration — building, electrical, plumbing, mechanical on one application. Plan review on this scope typically runs 5–10 business days."))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout("THE USUAL BOTTLENECK", "Rough-electrical inspection on a panel + rewire is the item that slips schedules on 1950s homes. Pull early and schedule the inspection before drywall is booked."))
    s.append(PageBreak())

    s.append(Paragraph("RECOMMENDED NEXT STEPS", S["eyebrow"]))
    s.append(Paragraph("Before you close", S["h1"]))
    s.append(data_table(["STEP", "WHEN", "WHY"], [
        ["Require seller close 2014 permit", "Pre-close", "Blocks clean title at resale"],
        ["Decide sunroom path", "Pre-close", "Avoid appraisal/sf surprise"],
        ["Budget the fast permit path", "Underwriting", "1–2 wk submittal, no variance"],
    ], col_widths=[2.4 * inch, 1.2 * inch, FRAME_W - 3.6 * inch]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("NET", "This is a clean permit path with two housekeeping items. Handle both as seller conditions or pre-close tasks and you close without a compliance cloud over the resale."))
    closing(s, DISCLAIMER)
    doc.build(s)
    print(f"  ✓ {out}  ({os.path.getsize(out)/1024:.0f} KB)")


SAMPLES = {
    "investor-execution-review": build_execution_review,
    "budget-snapshot": build_budget_snapshot,
    "project-setup": build_project_setup,
    "active-oversight": build_active_oversight,
    "gc-supported-build": build_gc_supported_build,
    "full-gc": build_full_gc,
    "budget-scope-review": build_budget_scope_review,
    "contractor-grade-budget": build_contractor_grade_budget,
    "permit-compliance-review": build_permit_compliance_review,
}


def main():
    print("Building branded sample deliverables…")
    for name, fn in SAMPLES.items():
        fn()
    print("Done.")


if __name__ == "__main__":
    main()
