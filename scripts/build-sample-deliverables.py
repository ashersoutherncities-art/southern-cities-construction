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

    # Page 1 — Verdict + deal snapshot
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

    # Page 2 — Scope feasibility + budget range
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

    # Page 3 — Execution risk callouts
    s.append(Paragraph("EXECUTION RISK CALLOUTS", S["eyebrow"]))
    s.append(Paragraph("The risks worth pricing before earnest money goes hard", S["h1"]))
    s.append(callout("RISK 1 · OPEN PERMIT (HIGH)",
        "Water-heater permit pulled 2014, never closed. Blocks clean title transfer until resolved. "
        "<b>Cost to cure:</b> ~$325 + 5 business days. <b>Action:</b> make seller close it pre-close, or escrow for it."))
    s.append(Spacer(1, 0.07 * inch))
    s.append(callout("RISK 2 · POLYBUTYLENE SUPPLY LINES (MEDIUM)",
        "Gray poly visible at the water heater in listing photos. Flagged by FHA, VA, and most DSCR lenders. "
        "<b>Cost to cure:</b> $4,500 – $7,200 (re-pipe to PEX). Already inside the Tier 2 range above."))
    s.append(Spacer(1, 0.07 * inch))
    s.append(callout("RISK 3 · HVAC AT END OF LIFE (MEDIUM)",
        "Condenser date plate reads 2006. Past expected useful life; a buyer's inspector will flag it. "
        "<b>Cost to cure:</b> $8,800 – $10,400 (replace 3-ton + furnace). The single biggest swing in the budget."))
    s.append(Spacer(1, 0.07 * inch))
    s.append(callout("RISK 4 · SOFFIT ROT, SW CORNER (LOW)",
        "Active moisture penetration visible at the southwest corner. <b>Cost to cure:</b> $850 – $1,400. "
        "Cosmetic priority, but an inspector will call it."))
    s.append(PageBreak())

    # Page 4 — Timeline + walk-away trigger + next step
    s.append(Paragraph("TIMELINE + WALK-AWAY TRIGGER", S["eyebrow"]))
    s.append(Paragraph("Pace the deal and protect your downside", S["h1"]))
    s.append(data_table(["PHASE", "REALISTIC WINDOW"], [
        ["Close + permit close-out", "Weeks 1–2"],
        ["Demo + systems (HVAC, re-pipe, panel)", "Weeks 3–6"],
        ["Kitchen / bath / finishes", "Weeks 7–11"],
        ["Punch + list + sell", "Weeks 12–16"],
        ["Total to resale", "75 – 110 days from acquisition"],
    ], col_widths=[FRAME_W - 1.9 * inch, 1.9 * inch]))
    s.append(Spacer(1, 0.14 * inch))
    s.append(callout("WALK-AWAY TRIGGER",
        "If the seller won't move below <b>$178K</b> AND won't close the open permit, walk. Below that line the "
        "Tier 2 margin compresses under 10% once you carry holding + selling costs — not enough cushion for a "
        "1950s systems rehab where surprises are likely behind the walls.", bg=HexColor("#FDE9E2"), bar=WARN))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout("YOUR NEXT STEP",
        "Take the $172K re-trade to the seller with this report attached — it gives your number a licensed-GC "
        "basis instead of a feeling. If you move forward, the Execution Review fee credits forward against "
        "Active Oversight on the build. NC GC License #107724."))
    s.append(Spacer(1, 0.12 * inch))
    s.append(Paragraph("<i>This is an anonymized sample of the Investor Execution Review deliverable. Your "
                       "report covers your specific deal. Southern Cities Construction · NC GC #107724.</i>", S["muted"]))
    doc.build(s)
    print(f"  ✓ {out}  ({os.path.getsize(out)/1024:.0f} KB)")


SAMPLES = {
    "investor-execution-review": build_execution_review,
}


def main():
    print("Building branded sample deliverables…")
    for name, fn in SAMPLES.items():
        fn()
    print("Done.")


if __name__ == "__main__":
    main()
