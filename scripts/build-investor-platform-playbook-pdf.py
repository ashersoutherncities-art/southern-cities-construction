#!/usr/bin/env python3
"""
build-investor-platform-playbook-pdf.py

Generates the internal SCC operations playbook:
"Investor Execution Platform — Operations Playbook · 2026 Edition"

Comprehensive walkthrough of the funnel from lead magnet through CO1-CO5
closing. Includes nurture sequence, ad creative, KPIs, refund mechanics,
and Meta launch plan.

Output: docs/platform/investor-platform-operations-playbook.pdf
"""

import os
from pathlib import Path

from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    KeepTogether,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
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
BAND_NAVY_LIGHT = HexColor("#1F3470")

PROJECT_ROOT = Path("/Users/ashborn/.openclaw/workspace/southern-cities-construction")
LOGO_REVERSED = str(PROJECT_ROOT / "public" / "sc-construction-logo-reversed.png")
LOGO_STANDARD = str(PROJECT_ROOT / "public" / "sc-construction-logo.png")
OUTPUT_PDF = str(PROJECT_ROOT / "docs" / "platform" / "investor-platform-operations-playbook.pdf")

PAGE_W, PAGE_H = LETTER
MARGIN_L = 0.85 * inch
MARGIN_R = 0.85 * inch
MARGIN_T = 1.0 * inch
MARGIN_B = 1.0 * inch
FRAME_W = PAGE_W - MARGIN_L - MARGIN_R
FRAME_H = PAGE_H - MARGIN_T - MARGIN_B


# ============================================================
# Styles
# ============================================================

S = {
    "cover_eyebrow": ParagraphStyle(
        "cover_eyebrow", fontName="Helvetica-Bold", fontSize=10,
        textColor=ORANGE, leading=14, alignment=TA_LEFT, spaceAfter=12,
    ),
    "cover_title": ParagraphStyle(
        "cover_title", fontName="Helvetica-Bold", fontSize=30,
        textColor=white, leading=36, alignment=TA_LEFT, spaceAfter=18,
    ),
    "cover_subtitle": ParagraphStyle(
        "cover_subtitle", fontName="Helvetica", fontSize=15,
        textColor=HexColor("#D6D6D6"), leading=22, alignment=TA_LEFT, spaceAfter=40,
    ),
    "cover_author": ParagraphStyle(
        "cover_author", fontName="Helvetica-Bold", fontSize=11,
        textColor=ORANGE, leading=15, alignment=TA_LEFT,
    ),
    "cover_credentials": ParagraphStyle(
        "cover_credentials", fontName="Helvetica", fontSize=10,
        textColor=HexColor("#B8C0CC"), leading=14, alignment=TA_LEFT,
    ),
    "eyebrow": ParagraphStyle(
        "eyebrow", fontName="Helvetica-Bold", fontSize=9,
        textColor=ORANGE, leading=12, spaceAfter=6,
    ),
    "h1": ParagraphStyle(
        "h1", fontName="Helvetica-Bold", fontSize=22,
        textColor=NAVY, leading=28, spaceBefore=4, spaceAfter=14,
    ),
    "h2": ParagraphStyle(
        "h2", fontName="Helvetica-Bold", fontSize=14,
        textColor=NAVY, leading=18, spaceBefore=10, spaceAfter=6,
    ),
    "h3": ParagraphStyle(
        "h3", fontName="Helvetica-Bold", fontSize=11,
        textColor=NAVY, leading=14, spaceBefore=6, spaceAfter=4,
    ),
    "body": ParagraphStyle(
        "body", fontName="Helvetica", fontSize=10.5,
        textColor=TEXT_DARK, leading=15, spaceAfter=8, alignment=TA_LEFT,
    ),
    "body_muted": ParagraphStyle(
        "body_muted", fontName="Helvetica", fontSize=9.5,
        textColor=TEXT_MUTED, leading=13.5, spaceAfter=6,
    ),
    "callout_label": ParagraphStyle(
        "callout_label", fontName="Helvetica-Bold", fontSize=8.5,
        textColor=ORANGE, leading=11, spaceAfter=3,
    ),
    "stat_big": ParagraphStyle(
        "stat_big", fontName="Helvetica-Bold", fontSize=28,
        textColor=ORANGE, leading=32, alignment=TA_CENTER,
    ),
    "stat_label": ParagraphStyle(
        "stat_label", fontName="Helvetica-Bold", fontSize=8.5,
        textColor=NAVY, leading=11, alignment=TA_CENTER,
    ),
    "tbl_head": ParagraphStyle(
        "tbl_head", fontName="Helvetica-Bold", fontSize=9,
        textColor=white, leading=11, alignment=TA_LEFT,
    ),
    "tbl_cell": ParagraphStyle(
        "tbl_cell", fontName="Helvetica", fontSize=9,
        textColor=TEXT_DARK, leading=12.5, alignment=TA_LEFT,
    ),
    "tbl_cell_bold": ParagraphStyle(
        "tbl_cell_bold", fontName="Helvetica-Bold", fontSize=9,
        textColor=NAVY, leading=12.5, alignment=TA_LEFT,
    ),
    "cta_value": ParagraphStyle(
        "cta_value", fontName="Helvetica-Bold", fontSize=14,
        textColor=white, leading=18, alignment=TA_LEFT,
    ),
    "cta_body": ParagraphStyle(
        "cta_body", fontName="Helvetica", fontSize=10.5,
        textColor=HexColor("#FFE9D4"), leading=15, alignment=TA_LEFT,
    ),
}


# ============================================================
# Page templates
# ============================================================


def draw_cover_page(canvas, doc):
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
        canvas.drawImage(
            LOGO_REVERSED, MARGIN_L, PAGE_H - 1.7 * inch,
            width=2.4 * inch, height=0.7 * inch,
            preserveAspectRatio=True, mask="auto",
        )
    canvas.restoreState()


def draw_content_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(CREAM)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setFillColor(ORANGE)
    canvas.rect(0, PAGE_H - 0.04 * inch, PAGE_W, 0.04 * inch, fill=1, stroke=0)
    if os.path.exists(LOGO_STANDARD):
        canvas.drawImage(
            LOGO_STANDARD, MARGIN_L, PAGE_H - 0.65 * inch,
            width=1.5 * inch, height=0.45 * inch,
            preserveAspectRatio=True, mask="auto",
        )
    canvas.setFont("Helvetica-Bold", 7.5)
    canvas.setFillColor(NAVY)
    canvas.drawRightString(
        PAGE_W - MARGIN_R, PAGE_H - 0.4 * inch,
        "INVESTOR PLATFORM · OPERATIONS PLAYBOOK · 2026",
    )
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawRightString(
        PAGE_W - MARGIN_R, PAGE_H - 0.55 * inch, "NC GC License #107724"
    )
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(NAVY)
    canvas.drawCentredString(PAGE_W / 2, 0.45 * inch, f"{doc.page - 1}")
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawString(MARGIN_L, 0.45 * inch, "© Southern Cities Construction · INTERNAL")
    canvas.drawRightString(
        PAGE_W - MARGIN_R, 0.45 * inch, "southerncitiesconstruction.com"
    )
    canvas.restoreState()


# ============================================================
# Helpers
# ============================================================


def callout(label_text, body_text, bg=ACCENT_LIGHT, bar=ORANGE):
    inner = [
        Paragraph(f'<font color="#fa8c41"><b>{label_text}</b></font>', S["callout_label"]),
        Paragraph(body_text, S["body"]),
    ]
    tbl = Table([[inner]], colWidths=[FRAME_W])
    tbl.setStyle(
        TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), bg),
            ("LEFTPADDING", (0, 0), (-1, -1), 12),
            ("RIGHTPADDING", (0, 0), (-1, -1), 12),
            ("TOPPADDING", (0, 0), (-1, -1), 10),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ("LINEBEFORE", (0, 0), (0, -1), 3, bar),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ])
    )
    return tbl


def cta_box(headline, body, bg=NAVY):
    inner = [
        Paragraph(headline, S["cta_value"]),
        Paragraph(body, S["cta_body"]),
    ]
    tbl = Table([[inner]], colWidths=[FRAME_W])
    tbl.setStyle(
        TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), bg),
            ("LEFTPADDING", (0, 0), (-1, -1), 16),
            ("RIGHTPADDING", (0, 0), (-1, -1), 16),
            ("TOPPADDING", (0, 0), (-1, -1), 14),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
            ("LINEBEFORE", (0, 0), (0, -1), 4, ORANGE),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ])
    )
    return tbl


def section_header(eyebrow, title):
    return [
        Paragraph(eyebrow, S["eyebrow"]),
        Paragraph(title, S["h1"]),
    ]


def data_table(headers, rows, col_widths=None):
    """A banded table with navy header + alternating cream rows."""
    cw = col_widths or [FRAME_W / len(headers)] * len(headers)
    data = [[Paragraph(h, S["tbl_head"]) for h in headers]]
    for row in rows:
        data.append([Paragraph(str(c), S["tbl_cell"]) for c in row])
    tbl = Table(data, colWidths=cw, repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEABOVE", (0, 1), (-1, 1), 0.5, ORANGE),
    ]
    for i in range(1, len(data)):
        if i % 2 == 0:
            style.append(("BACKGROUND", (0, i), (-1, i), LIGHT_GRAY))
        else:
            style.append(("BACKGROUND", (0, i), (-1, i), white))
    tbl.setStyle(TableStyle(style))
    return tbl


# ============================================================
# Story builders
# ============================================================


def cover_story():
    s = []
    s.append(Spacer(1, 2.1 * inch))
    s.append(Paragraph("OPERATIONS PLAYBOOK · INTERNAL", S["cover_eyebrow"]))
    s.append(Paragraph(
        "Investor Execution Platform: From Lead Magnet to Close",
        S["cover_title"],
    ))
    s.append(Paragraph(
        "The end-to-end build: funnel architecture, nurture, "
        "offer stack, ads, refund mechanics, and KPIs.",
        S["cover_subtitle"],
    ))
    s.append(Spacer(1, 2.0 * inch))
    s.append(Paragraph("DARIUS T. WALTON", S["cover_author"]))
    s.append(Paragraph(
        "Founder · Southern Cities Construction<br/>"
        "NC General Contractor License #107724<br/>"
        "2026 edition · v1.0",
        S["cover_credentials"],
    ))
    s.append(NextPageTemplate("content"))
    s.append(PageBreak())
    return s


def intro_story():
    s = []
    s += section_header("HOW TO READ THIS", "The platform, end to end")
    s.append(Paragraph(
        "This playbook is the operating system for the Southern Cities Construction investor funnel. "
        "It documents every stage from the first cold-ad impression to the final invoice on a CO5 full-GC build. "
        "It is the single source of truth for: what each product sells, what it costs, what its refund mechanic is, "
        "how leads move between stages, and what KPIs trigger the next bet.",
        S["body"],
    ))
    s.append(Paragraph("Positioning anchor", S["h2"]))
    s.append(Paragraph(
        "<b>Southern Cities Construction is an execution-intelligence platform for NC real estate investors.</b> "
        "We do not lead with construction services. We lead with the question: <i>can this deal actually be executed at the budget you ran?</i> "
        "Construction is the back-end. Intelligence is the wedge.",
        S["body"],
    ))
    s.append(Paragraph("Three guarantee buckets", S["h2"]))
    s.append(callout(
        "DIAGNOSIS · find the problem",
        "LM1 (9-Risk PDF) and CO1 (Execution Review). We promise to find specific dollarized risks. "
        "If we cannot produce a decision-grade output we refund — SCC controls the trigger.",
    ))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout(
        "PERFORMANCE · solve the problem",
        "CO2, CO3, CO4. We promise specific execution outcomes — scope locked, subs vetted, draws "
        "documented, risk eliminated on a per-deal basis. Refund if we cannot perform our scope.",
    ))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout(
        "DELIVERY · solve it well",
        "CO5 Full GC. We promise quality, schedule, and accountability under a full GC contract — "
        "the standard NC GC delivery promise, backed by the license.",
    ))
    s.append(PageBreak())
    return s


def funnel_story():
    s = []
    s += section_header("THE FUNNEL", "Lead magnet to close, in one diagram")
    s.append(Paragraph(
        "Every paid dollar enters at the top and exits at one of five rungs. The 9-Risk PDF is the entry. "
        "CO1 is the router. CO2 through CO5 are the destinations.",
        S["body"],
    ))
    rows = [
        ["TOP", "Meta Ads (cold)", "$60/day starting budget. 6 ad variants. Goal: drive PDF downloads."],
        ["LM1", "9-Risk PDF (free)", "Email capture. Branded PDF, 9 dollarized risks, $60K–$119.5K exposure callout."],
        ["NURTURE", "7-Email Sequence", "Day 0 → Day 28. Origin story, anti-guru framing, CO1 offer, soft + hard closes."],
        ["CO1", "Investor Execution Review · $499", "Live walk of a real deal. Routes to CO2/CO3/CO4/CO5 based on type."],
        ["CO2", "Project Setup", "Scope + sub-vetting + draw schedule. Investor stays GC of record."],
        ["CO3", "Active Project Oversight", "Tiered $6.5K–$28.5K. We oversee, investor still owns."],
        ["CO4", "GC-Supported Owner Build", "$5K + 4% of budget. Owner-builder structure, SCC backs the license-level risk."],
        ["CO5", "Full GC", "% of project budget. Standard full GC contract under our license."],
    ]
    s.append(Spacer(1, 0.05 * inch))
    s.append(data_table(
        ["STAGE", "NAME", "WHAT IT DOES"],
        rows,
        col_widths=[0.7 * inch, 2.1 * inch, FRAME_W - 2.8 * inch],
    ))
    s.append(Spacer(1, 0.15 * inch))
    s.append(Paragraph("Why CO1 is the router, not just a rung", S["h2"]))
    s.append(Paragraph(
        "Most platforms try to sell the biggest product first. We deliberately do the opposite. "
        "The $499 Execution Review qualifies the investor (real deal + real capital + real timeline), "
        "lets us see the property type, and routes them to the right downstream product. A flipper with a "
        "$120K rehab budget routes to CO3. A wholesaler with no construction appetite routes to CO4. "
        "A capital-rich owner-builder with a clean lot routes to CO5. CO1 is the diagnostic that earns "
        "the right to recommend.",
        S["body"],
    ))
    s.append(PageBreak())
    return s


def stage_page(stage_code, name, price, promise, audience, deliverables, refund, kpis):
    s = []
    s.append(Paragraph(f"STAGE · {stage_code}", S["eyebrow"]))
    s.append(Paragraph(name, S["h1"]))
    # Price strip
    price_tbl = Table(
        [[Paragraph(f'<font color="#FFFFFF"><b>PRICE</b></font>', S["callout_label"]),
          Paragraph(f'<font color="#FFFFFF"><b>{price}</b></font>', S["cta_value"])]],
        colWidths=[1.0 * inch, FRAME_W - 1.0 * inch],
    )
    price_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), NAVY),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    s.append(price_tbl)
    s.append(Spacer(1, 0.12 * inch))
    s.append(callout("PROMISE", promise))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout("AUDIENCE", audience))
    s.append(Spacer(1, 0.08 * inch))
    # Deliverables as a list
    deliv_html = "<br/>".join(f"&bull;&nbsp;&nbsp;{d}" for d in deliverables)
    s.append(callout("DELIVERABLES", deliv_html))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout("REFUND MECHANIC", refund))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout("KPIs / TRIGGER TO ADVANCE", kpis))
    s.append(PageBreak())
    return s


def nurture_story():
    s = []
    s += section_header("THE 7-EMAIL NURTURE", "Day 0 to Day 28 — PDF download to CO1 purchase")
    s.append(Paragraph(
        "The PDF earns the email. The nurture earns the $499. Every email has one job: move the lead one "
        "step closer to clicking the CO1 checkout. No email pitches CO2-CO5. CO1 is the only purchase "
        "decision until the lead is on a call.",
        S["body"],
    ))
    rows = [
        ["Day 0", "PDF Delivery + Hello", "Deliver the PDF. Introduce Darius. State the origin: '$100K lost in my first 8 years.'"],
        ["Day 2", "The $100K Lesson", "Specific story of a deal that lost money on execution. Tease CO1 as the antidote."],
        ["Day 5", "Why Most GCs Won't", "The moat: most GCs won't review a deal you don't own yet. Open CO1 link."],
        ["Day 10", "Risk #7 Deep Dive", "Pick one risk from the PDF, go deeper, show what the CO1 review would catch."],
        ["Day 16", "Soft CO1 Pitch", "Reframe: $499 vs. the $14K average miss. Math first. Refund mechanic disclosed."],
        ["Day 22", "Hard CO1 Pitch", "Direct ask. Deadline-anchored (next-deal window). Single CTA: book the review."],
        ["Day 28", "Final / Long Tail", "Last email. Reframe as 'I'll be here when you have the deal.' Tag for long-tail nurture."],
    ]
    s.append(data_table(
        ["DAY", "EMAIL", "JOB"],
        rows,
        col_widths=[0.75 * inch, 2.1 * inch, FRAME_W - 2.85 * inch],
    ))
    s.append(Spacer(1, 0.15 * inch))
    s.append(Paragraph("GHL implementation notes", S["h2"]))
    s.append(Paragraph(
        "Trigger tag: <b>lead-magnet-nc-execution-risks-investor</b>. "
        "Stop tags: <b>purchased-platform-co1-execution-review</b>, "
        "<b>platform-co2-purchased</b>, <b>platform-co3-purchased</b>, "
        "<b>platform-co4-purchased</b>, <b>platform-co5-purchased</b>. "
        "All emails are written and live in <i>docs/platform/pdf-lead-to-co1-nurture-sequence.md</i>. "
        "Copy/paste into GHL workflow builder; do not rewrite — the tone is calibrated.",
        S["body"],
    ))
    s.append(PageBreak())
    return s


def ads_story():
    s = []
    s += section_header("AD CREATIVE", "Six variants, one target audience")
    s.append(Paragraph(
        "All six variants target active NC investors — flippers, wholesalers, BRRRR operators. "
        "Each variant attacks a different pain. Rotate three at a time in $20/day cells. Kill any cell "
        "over $25 CPL at Day 3. Scale the winner at Day 7.",
        S["body"],
    ))
    rows = [
        ["#1", "Stop Being the GC", "Flippers running jobs themselves; bottlenecked at 2 deals/year."],
        ["#2A", "Wholesaler Two Paths", "NC wholesalers losing deals at the buyer's lender due to execution risk."],
        ["#2B", "Stop the $50K Giveaway", "Wholesalers leaving full-flip spread on the table — convert to investor."],
        ["#3", "Scale BRRRR to 8/Year", "BRRRR operators capped by bad rehabs; killing cash-out refis."],
        ["#4", "Find. Hand Off. Collect.", "Generalist investors who want the cleanest possible value prop."],
        ["#5", "Flip the 60/40 Ratio", "Investors spending 60% of their time on execution, 40% on deals."],
    ]
    s.append(data_table(
        ["VARIANT", "HOOK", "AUDIENCE"],
        rows,
        col_widths=[0.85 * inch, 2.0 * inch, FRAME_W - 2.85 * inch],
    ))
    s.append(Spacer(1, 0.15 * inch))
    s.append(Paragraph("Meta targeting", S["h2"]))
    s.append(Paragraph(
        "<b>Geographic:</b> NC statewide. <b>Age:</b> 28–55. <b>Interests:</b> BiggerPockets, "
        "DealMachine, PropStream, Privy, Carrot, REI Pro, Roofstock, REtipster, Pace Morby, Brent Daniels. "
        "<b>Behaviors:</b> small business owners, real estate professionals, recent home buyers. "
        "<b>Lookalikes:</b> seed with PDF downloaders once 200+ leads acquired; refresh every 30 days.",
        S["body"],
    ))
    s.append(Paragraph("Launch sequence", S["h2"]))
    s.append(Paragraph(
        "<b>Phase 1 (Days 1–14):</b> Lead magnet only, $60/day, rotate #1 / #2B / #4. Target CPL &lt; $15. "
        "<b>Phase 2 (Days 15–30):</b> Add a $20/day retargeting cell — show CO1 direct to PDF-downloaders who opened "
        "the nurture 2+ times. <b>Phase 3 (Day 30+):</b> Only after Meta pixel has 50+ CO1 purchases, test "
        "cold-direct-to-CO1 ads against lookalikes of paid buyers.",
        S["body"],
    ))
    s.append(PageBreak())
    return s


def kpi_story():
    s = []
    s += section_header("KPIs & BENCHMARKS", "What 'working' looks like — by phase")
    s.append(Paragraph(
        "If you don't hit the Phase 1 numbers, do not scale. If you do, scale aggressively. "
        "The whole funnel is gated by lead cost and CO1 conversion rate; everything downstream "
        "(CO2-CO5) is a function of those two numbers.",
        S["body"],
    ))
    rows = [
        ["CPL (cost per lead)", "<$15", "PDF download + email capture"],
        ["Lead → CO1 buyer", "2.0%", "Nurture conversion rate over 30 days"],
        ["CO1 → CO2/3/4/5", "35%", "Of CO1 buyers who book a CO1, this % progresses"],
        ["Average deal value (downstream)", "$11.5K", "Weighted across CO2-CO5"],
        ["LTV per lead", "$85", "CPL × conversion × avg ticket"],
        ["Target CAC payback", "<60 days", "Days from ad spend to net-positive"],
    ]
    s.append(data_table(
        ["METRIC", "TARGET", "DEFINITION"],
        rows,
        col_widths=[2.2 * inch, 1.0 * inch, FRAME_W - 3.2 * inch],
    ))
    s.append(Spacer(1, 0.15 * inch))
    s.append(Paragraph("Stop / Scale rules", S["h2"]))
    s.append(callout(
        "STOP",
        "If CPL &gt; $25 after Day 3 of a cell, kill the cell. If lead → CO1 &lt; 0.8% after 100 leads, "
        "rebuild the nurture. If CO1 → CO2-5 &lt; 15%, the CO1 walk-through is failing to route — "
        "rebuild the CO1 deliverable, not the nurture.",
    ))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout(
        "SCALE",
        "If CPL &lt; $12 and lead → CO1 &gt; 2.5% over a 14-day window, double the daily budget. "
        "If a single CO1 buyer routes to CO5, that one customer pays back ~6 months of ad spend at $60/day.",
    ))
    s.append(PageBreak())
    return s


def refund_story():
    s = []
    s += section_header("REFUND MECHANICS", "Promise structure across every paid stage")
    s.append(Paragraph(
        "Every paid stage has a refund mechanic. The mechanic is always controlled by SCC — never "
        "by an outcome the buyer can manipulate (e.g., 'I didn't make the projected ROI'). "
        "We refund when WE cannot perform our deliverable. This is the 'refund if we cannot perform' "
        "model.",
        S["body"],
    ))
    rows = [
        ["LM1 · 9-Risk PDF", "FREE", "No refund — no charge. Built for top-of-funnel education."],
        ["CO1 · Execution Review", "$499", "Refund if we cannot produce a written risk report within 7 days of the call."],
        ["CO2 · Project Setup", "Scoped", "Refund of setup fee if scope + sub list + draw schedule isn't delivered in agreed window."],
        ["CO3 · Project Oversight", "$6.5K–$28.5K", "Refund of unearned portion if SCC withdraws from active oversight."],
        ["CO4 · Owner Build Support", "$5K + 4%", "Refund of upfront if SCC cannot stand up the owner-builder structure within 30 days."],
        ["CO5 · Full GC", "% of budget", "Standard NC GC contract — refund mechanic per contract milestones."],
    ]
    s.append(data_table(
        ["STAGE", "PRICE", "REFUND TRIGGER"],
        rows,
        col_widths=[2.0 * inch, 1.0 * inch, FRAME_W - 3.0 * inch],
    ))
    s.append(Spacer(1, 0.15 * inch))
    s.append(Paragraph("Why this model wins", S["h2"]))
    s.append(Paragraph(
        "Outcome-based guarantees (e.g., '$10K saved or your money back') invite gaming and adverse selection — "
        "the buyer is incentivized to under-cooperate to trigger the refund. Performance-based guarantees "
        "('refund if WE cannot perform') keep the trigger on our side, which forces us to be honest about what "
        "we can deliver, and protects margin. Buyers still get the psychological safety of 'risk-reversal' without "
        "creating moral-hazard incentives.",
        S["body"],
    ))
    s.append(PageBreak())
    return s


def closing_story():
    s = []
    s += section_header("WHAT TO DO THIS WEEK", "The 7-day action list")
    rows = [
        ["1", "Save ad variants to disk", "Lock the 6 variants in docs/marketing/active-investor-execution-handoff-ads.md"],
        ["2", "Build 7-email nurture in GHL", "Paste from pdf-lead-to-co1-nurture-sequence.md into GHL workflow"],
        ["3", "Configure GHL trigger tag", "Confirm lead-magnet-nc-execution-risks-investor fires on PDF download"],
        ["4", "Launch Phase 1 Meta ads", "$60/day, rotate #1 / #2B / #4, $20/day each, NC statewide"],
        ["5", "Wire CO1 checkout test", "End-to-end test: PDF → email → nurture link → CO1 Stripe checkout"],
        ["6", "Set Day-3 review", "Calendar reminder. Kill cells over $25 CPL. Keep budget on winner."],
        ["7", "Set Day-14 phase gate", "If CPL &lt; $15 and 80+ leads: advance to Phase 2 retargeting."],
    ]
    s.append(data_table(
        ["#", "TASK", "DETAILS"],
        rows,
        col_widths=[0.4 * inch, 2.4 * inch, FRAME_W - 2.8 * inch],
    ))
    s.append(Spacer(1, 0.2 * inch))
    s.append(cta_box(
        "The platform compounds. The ads don't.",
        "Every PDF download is an asset. Every CO1 buyer routes downstream. Every CO3/CO4/CO5 "
        "client is a 6–12 month revenue tail. Ads are the input — the platform is the output. "
        "Build the platform; measure the platform; scale the platform.",
    ))
    s.append(Spacer(1, 0.15 * inch))
    s.append(Paragraph(
        "<i>Darius T. Walton · Southern Cities Construction · NC GC License #107724 · 2026</i>",
        S["body_muted"],
    ))
    return s


# ============================================================
# Build
# ============================================================


def build():
    os.makedirs(os.path.dirname(OUTPUT_PDF), exist_ok=True)
    doc = BaseDocTemplate(
        OUTPUT_PDF,
        pagesize=LETTER,
        leftMargin=MARGIN_L,
        rightMargin=MARGIN_R,
        topMargin=MARGIN_T,
        bottomMargin=MARGIN_B,
        title="Investor Execution Platform — Operations Playbook (2026)",
        author="Darius T. Walton · Southern Cities Construction",
        subject="Funnel architecture, nurture, offers, ads, KPIs, refund mechanics",
    )
    cover_frame = Frame(
        MARGIN_L, MARGIN_B, FRAME_W, FRAME_H,
        leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
        id="cover_frame",
    )
    content_frame = Frame(
        MARGIN_L, MARGIN_B, FRAME_W, FRAME_H,
        leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
        id="content_frame",
    )
    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[cover_frame], onPage=draw_cover_page),
        PageTemplate(id="content", frames=[content_frame], onPage=draw_content_page),
    ])

    story = []
    story += cover_story()
    story += intro_story()
    story += funnel_story()

    # Stage detail pages
    story += stage_page(
        "LM1",
        "Lead Magnet — The 9-Risk PDF",
        "$0 · free",
        "Deliver a decision-grade rehab budget range, timeline, project category, and execution risk "
        "snapshot for any NC deal — a contractor-grade underwriting foundation, before one missed risk becomes ten.",
        "Active NC investors (flippers, wholesalers, BRRRR), capital-light and capital-rich. The hook "
        "is 'keep $10K+ in your pocket on your next deal.'",
        [
            "9 dollarized execution risks specific to NC investor deals in 2026",
            "Total exposure callout: $60K–$119.5K per deal",
            "Anti-guru founder story (Darius lost $100K+ early on)",
            "Two-path CTA: hand off the deal or learn how SCC underwrites it",
            "Branded PDF, 12 pages, navy/orange palette, NC GC License #107724 on every page",
        ],
        "Free — no refund mechanic. The cost is one email address.",
        "Goal: 80–100 PDF downloads in first 14 days at &lt; $15 CPL. Advance to Phase 2 retargeting once hit.",
    )

    story += nurture_story()

    story += stage_page(
        "CO1",
        "Investor Execution Review",
        "$499 · one-time",
        "Eliminate $5,000+ of execution risk on your next deal — or confirm the deal is clean and "
        "let you move forward with documentation that protects your downside.",
        "Investors with a specific deal under contract (or about to be) who want a licensed GC to "
        "underwrite the execution side before earnest money goes hard.",
        [
            "60-minute live deal walkthrough (Zoom or in-person where geography permits)",
            "Written execution-risk report with dollarized findings",
            "Sub-trade list with line-item budget ranges",
            "Recommended downstream path: CO2 / CO3 / CO4 / CO5",
            "Right of first refusal on whichever downstream product is recommended",
        ],
        "Refund if SCC cannot produce a written risk report within 7 days of the call. SCC controls the trigger.",
        "Goal: 2% nurture conversion. 35% of CO1 buyers should advance to CO2-CO5 within 90 days.",
    )

    story += stage_page(
        "CO2",
        "Project Setup",
        "Scoped per project",
        "Build the execution backbone of the deal — full scope, sub list, draw schedule, and permit "
        "strategy — so the investor or their existing GC can run a deal that doesn't fall apart at draw 3.",
        "Investors who want to remain GC of record (or self-perform) but lack the scope/sub/draw infrastructure "
        "to do it without leaking money.",
        [
            "Full written scope of work (room-by-room, finish-by-finish)",
            "Vetted sub list with 2-3 quotes per trade",
            "Bank-grade draw schedule",
            "Permit + inspection roadmap",
            "Handoff call to align investor + lender + subs",
        ],
        "Refund of setup fee if scope + sub list + draw schedule are not delivered within the agreed window.",
        "Goal: 60% of CO2 buyers should also retain SCC for CO3 oversight on the same project.",
    )

    story += stage_page(
        "CO3",
        "Active Project Oversight",
        "$6.5K · $12.5K · $19.5K · $28.5K (tiered, scoped)",
        "Run the active oversight layer of your project — site visits, draw releases, sub management, "
        "schedule defense — without you having to be on-site or fielding sub calls.",
        "Investors who own the deal but don't want to be the project manager. Tiered by project size / "
        "complexity: Light ($6.5K), Standard ($12.5K), Heavy ($19.5K), Complex ($28.5K).",
        [
            "Weekly on-site walks with photo + video documentation",
            "Draw release approvals (lender-ready)",
            "Sub management — calls, change orders, schedule defense",
            "Issue escalation in writing, within 24 hours",
            "Final punch-list closeout + lender turnover docs",
        ],
        "Refund of unearned portion if SCC withdraws from active oversight before project completion.",
        "Goal: 25% of CO3 clients return for a second project within 12 months.",
    )

    story += stage_page(
        "CO4",
        "GC-Supported Owner Build",
        "$5,000 + 4% of project budget",
        "Stand up the owner-builder structure so you (the investor) hold the GC-of-record position legally, "
        "while SCC backs the license-level risk, paperwork, and inspector-facing accountability.",
        "Capital-rich investors who want to own the deal at the GC level — keeping the full spread — "
        "without taking on the personal license exposure of being unlicensed GC of record.",
        [
            "Owner-builder filing + permit pull under owner-builder framework",
            "Inspector-facing point-of-contact (SCC handles all inspections)",
            "License-level risk umbrella (we stand behind the license, not the labor)",
            "Weekly check-in calls",
            "Final closeout + certificate-of-occupancy paperwork",
        ],
        "Refund of $5K upfront if SCC cannot stand up the owner-builder structure within 30 days.",
        "Goal: 10% of CO4 clients advance to CO5 on their second project (they get tired of owning the seat).",
    )

    story += stage_page(
        "CO5",
        "Full GC",
        "% of project budget · standard NC GC contract",
        "Full general contractor engagement — SCC owns the license, the schedule, the subs, the budget, "
        "and the delivery. Investor underwrites the deal and approves milestones; SCC runs the build.",
        "Investors who don't want to touch construction at all — capital-rich, time-poor, or out-of-state. "
        "Also returning CO3/CO4 clients who decide they'd rather hand it all over.",
        [
            "Full GC contract under NC GC License #107724",
            "Fixed-budget or cost-plus structure (negotiated per project)",
            "Schedule + milestone reporting",
            "All subs, materials, permits, inspections under SCC",
            "Standard NC GC warranty + closeout",
        ],
        "Standard NC GC contract — refund mechanic per contract milestones, governed by NC law.",
        "Goal: this is the LTV peak. One CO5 client = 6+ months of ad spend paid back.",
    )

    story += ads_story()
    story += kpi_story()
    story += refund_story()
    story += closing_story()

    doc.build(story)
    print(f"✓ Wrote {OUTPUT_PDF}")
    print(f"  Size: {os.path.getsize(OUTPUT_PDF) / 1024:.1f} KB")


if __name__ == "__main__":
    build()
