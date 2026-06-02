#!/usr/bin/env python3
"""
build-wholesale-to-flip-lm-pdf.py

LM #2 — "From $10K to $104K in 9 Months: The NC Wholesaler-to-Flipper Transformation"
Sells: CO1 Execution Review + CO3/CO4 + Build Desk subscription
Audience: NC wholesalers who feel they've outgrown wholesaling and want to convert to flipping

Output: public/resources/wholesale-to-flip-9-month-lm.pdf
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

# Brand
NAVY = HexColor("#132452")
ORANGE = HexColor("#fa8c41")
CREAM = HexColor("#F6F2EC")
LIGHT_GRAY = HexColor("#E8E0D2")
TEXT_DARK = HexColor("#1A1A1A")
TEXT_MUTED = HexColor("#5A6470")
ACCENT_LIGHT = HexColor("#FFF1E4")
BAND_DARK = HexColor("#0A1530")
ACCENT_GREEN = HexColor("#1F8A3A")

PROJECT_ROOT = Path("/Users/ashborn/.openclaw/workspace/southern-cities-construction")
LOGO_REVERSED = str(PROJECT_ROOT / "public" / "sc-construction-logo-reversed.png")
LOGO_STANDARD = str(PROJECT_ROOT / "public" / "sc-construction-logo.png")
OUTPUT_PDF = str(PROJECT_ROOT / "public" / "resources" / "wholesale-to-flip-9-month-lm.pdf")

PAGE_W, PAGE_H = LETTER
MARGIN_L = 0.85 * inch
MARGIN_R = 0.85 * inch
MARGIN_T = 1.0 * inch
MARGIN_B = 1.0 * inch
FRAME_W = PAGE_W - MARGIN_L - MARGIN_R
FRAME_H = PAGE_H - MARGIN_T - MARGIN_B

S = {
    "cover_eyebrow": ParagraphStyle("cover_eyebrow", fontName="Helvetica-Bold", fontSize=10, textColor=ORANGE, leading=14, alignment=TA_LEFT, spaceAfter=12),
    "cover_title": ParagraphStyle("cover_title", fontName="Helvetica-Bold", fontSize=30, textColor=white, leading=36, alignment=TA_LEFT, spaceAfter=18),
    "cover_subtitle": ParagraphStyle("cover_subtitle", fontName="Helvetica", fontSize=15, textColor=HexColor("#D6D6D6"), leading=22, alignment=TA_LEFT, spaceAfter=40),
    "cover_author": ParagraphStyle("cover_author", fontName="Helvetica-Bold", fontSize=11, textColor=ORANGE, leading=15, alignment=TA_LEFT),
    "cover_credentials": ParagraphStyle("cover_credentials", fontName="Helvetica", fontSize=10, textColor=HexColor("#B8C0CC"), leading=14, alignment=TA_LEFT),
    "eyebrow": ParagraphStyle("eyebrow", fontName="Helvetica-Bold", fontSize=9, textColor=ORANGE, leading=12, spaceAfter=6),
    "month_eyebrow": ParagraphStyle("month_eyebrow", fontName="Helvetica-Bold", fontSize=10, textColor=ORANGE, leading=13, spaceAfter=4),
    "h1": ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=22, textColor=NAVY, leading=28, spaceBefore=4, spaceAfter=12),
    "h2": ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=14, textColor=NAVY, leading=18, spaceBefore=10, spaceAfter=6),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=10.5, textColor=TEXT_DARK, leading=15, spaceAfter=8, alignment=TA_LEFT),
    "body_muted": ParagraphStyle("body_muted", fontName="Helvetica", fontSize=9.5, textColor=TEXT_MUTED, leading=13.5, spaceAfter=6),
    "callout_label": ParagraphStyle("callout_label", fontName="Helvetica-Bold", fontSize=8.5, textColor=ORANGE, leading=11, spaceAfter=3),
    "stat_big": ParagraphStyle("stat_big", fontName="Helvetica-Bold", fontSize=36, textColor=ORANGE, leading=40, alignment=TA_CENTER),
    "stat_big_navy": ParagraphStyle("stat_big_navy", fontName="Helvetica-Bold", fontSize=36, textColor=NAVY, leading=40, alignment=TA_CENTER),
    "stat_label": ParagraphStyle("stat_label", fontName="Helvetica-Bold", fontSize=9, textColor=NAVY, leading=11, alignment=TA_CENTER),
    "tbl_head": ParagraphStyle("tbl_head", fontName="Helvetica-Bold", fontSize=9, textColor=white, leading=11),
    "tbl_cell": ParagraphStyle("tbl_cell", fontName="Helvetica", fontSize=9, textColor=TEXT_DARK, leading=12.5),
    "cta_value": ParagraphStyle("cta_value", fontName="Helvetica-Bold", fontSize=14, textColor=white, leading=18),
    "cta_body": ParagraphStyle("cta_body", fontName="Helvetica", fontSize=10.5, textColor=HexColor("#FFE9D4"), leading=15),
}


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
        canvas.drawImage(LOGO_REVERSED, MARGIN_L, PAGE_H - 1.7 * inch, width=2.4 * inch, height=0.7 * inch, preserveAspectRatio=True, mask="auto")
    canvas.restoreState()


def draw_content_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(CREAM)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setFillColor(ORANGE)
    canvas.rect(0, PAGE_H - 0.04 * inch, PAGE_W, 0.04 * inch, fill=1, stroke=0)
    if os.path.exists(LOGO_STANDARD):
        canvas.drawImage(LOGO_STANDARD, MARGIN_L, PAGE_H - 0.65 * inch, width=1.5 * inch, height=0.45 * inch, preserveAspectRatio=True, mask="auto")
    canvas.setFont("Helvetica-Bold", 7.5)
    canvas.setFillColor(NAVY)
    canvas.drawRightString(PAGE_W - MARGIN_R, PAGE_H - 0.4 * inch, "WHOLESALER-TO-FLIPPER · 9 MONTH TRANSFORMATION · 2026")
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawRightString(PAGE_W - MARGIN_R, PAGE_H - 0.55 * inch, "NC GC License #107724")
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(NAVY)
    canvas.drawCentredString(PAGE_W / 2, 0.45 * inch, f"{doc.page - 1}")
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawString(MARGIN_L, 0.45 * inch, "© Southern Cities Construction")
    canvas.drawRightString(PAGE_W - MARGIN_R, 0.45 * inch, "southerncitiesconstruction.com/platform")
    canvas.restoreState()


def callout(label, body, bg=ACCENT_LIGHT, bar=ORANGE):
    inner = [
        Paragraph(f'<font color="#fa8c41"><b>{label}</b></font>', S["callout_label"]),
        Paragraph(body, S["body"]),
    ]
    tbl = Table([[inner]], colWidths=[FRAME_W])
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LINEBEFORE", (0, 0), (0, -1), 3, bar),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return tbl


def cta_box(headline, body, bg=NAVY):
    inner = [Paragraph(headline, S["cta_value"]), Paragraph(body, S["cta_body"])]
    tbl = Table([[inner]], colWidths=[FRAME_W])
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("LEFTPADDING", (0, 0), (-1, -1), 16),
        ("RIGHTPADDING", (0, 0), (-1, -1), 16),
        ("TOPPADDING", (0, 0), (-1, -1), 14),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
        ("LINEBEFORE", (0, 0), (0, -1), 4, ORANGE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return tbl


def data_table(headers, rows, col_widths=None):
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
    ]
    for i in range(1, len(data)):
        if i % 2 == 0:
            style.append(("BACKGROUND", (0, i), (-1, i), LIGHT_GRAY))
        else:
            style.append(("BACKGROUND", (0, i), (-1, i), white))
    tbl.setStyle(TableStyle(style))
    return tbl


def section_header(eyebrow, title):
    return [Paragraph(eyebrow, S["eyebrow"]), Paragraph(title, S["h1"])]


def big_stat_strip(items):
    """Display 2-3 big stat callouts in a row."""
    cells = []
    for value, label in items:
        inner = [
            Paragraph(value, S["stat_big_navy"]),
            Paragraph(label, S["stat_label"]),
        ]
        cells.append(inner)
    while len(cells) < 3:
        cells.append([Paragraph("", S["body"])])
    col_w = FRAME_W / len(items)
    tbl = Table([cells], colWidths=[col_w] * len(items))
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), ACCENT_LIGHT),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 16),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 16),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    return tbl


# ============================================================
# Content
# ============================================================

def cover_story():
    s = []
    s.append(Spacer(1, 2.1 * inch))
    s.append(Paragraph("FOR NC WHOLESALERS READY TO LEVEL UP · 2026", S["cover_eyebrow"]))
    s.append(Paragraph(
        "From $10K to $104K<br/>in 9 Months",
        S["cover_title"],
    ))
    s.append(Paragraph(
        "The NC wholesaler-to-flipper transformation — how one Charlotte "
        "wholesaler stopped giving away his best deals and started keeping "
        "them, using a licensed GC's execution stack instead of learning "
        "construction himself.",
        S["cover_subtitle"],
    ))
    s.append(Spacer(1, 1.6 * inch))
    s.append(Paragraph("DARIUS T. WALTON", S["cover_author"]))
    s.append(Paragraph(
        "Founder · Southern Cities Construction<br/>"
        "NC General Contractor License #107724<br/>"
        "2026 edition",
        S["cover_credentials"],
    ))
    s.append(NextPageTemplate("content"))
    s.append(PageBreak())
    return s


def ceiling_story():
    s = []
    s += section_header("THE WHOLESALER CEILING", "Even $40K assignments have a hard ceiling. Here's where it sits.")
    s.append(Paragraph(
        "If you've leveled up to $25–40K assignments, you've already done the hard work — "
        "you've fixed your buyer pool, you've stopped chaining deals to other wholesalers, "
        "you're attracting real investors with verified packages. Congrats.",
        S["body"],
    ))
    s.append(Paragraph(
        "Now look at what your buyers are doing on those same deals.",
        S["body"],
    ))
    s.append(Spacer(1, 0.1 * inch))
    s.append(big_stat_strip([
        ("$10K", "PURE WHOLESALER · YEAR 1"),
        ("$25K", "WITH DEAL PACK · YEAR 2"),
        ("$104K", "WHOLESALE-TO-FLIP · YEAR 3"),
    ]))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout(
        "THE BRUTAL MATH",
        "You assign a deal for $30K. Your buyer closes it, executes the rehab with their own GC, sells it 90 days later for "
        "$130K in flip profit. They made <b>4×</b> what you made on the property you found, negotiated, and contracted. "
        "Same deal. They just kept it.",
    ))
    s.append(Spacer(1, 0.1 * inch))
    s.append(Paragraph(
        "The only reason most wholesalers don't keep their best deals is execution risk — "
        "they don't have a sub network, they don't have the GC license, they don't have the "
        "draw-schedule literacy, and they've heard too many flip-gone-wrong stories. So they "
        "assign and take the smaller, faster check.",
        S["body"],
    ))
    s.append(Paragraph(
        "But what if you could keep your best 2–3 deals per year — the ones with the cleanest "
        "spreads — and let a licensed NC GC handle the entire execution side? That's the path "
        "this playbook documents.",
        S["body"],
    ))
    s.append(PageBreak())
    return s


def overview_story():
    s = []
    s += section_header("THE 9-MONTH PATH", "What Marcus's transformation actually looked like")
    s.append(Paragraph(
        "Marcus is a Charlotte NC wholesaler. End of 2025, he was a year and a half into "
        "Deal Pack usage, doing 8–10 deals a year at $25–30K average assignment fees. Solid "
        "business. But every quarter he watched a buyer flip one of his deals for $90–120K and "
        "felt the same gut punch.",
        S["body"],
    ))
    s.append(Paragraph(
        "In January 2026 he decided to keep one. Nine months later, he closed his first flip — "
        "<b>$104K net profit</b> — using SCC's execution stack. He didn't pick up a hammer. He didn't "
        "learn construction. He underwrote the deal, approved the milestones, and signed the checks. "
        "SCC ran the build.",
        S["body"],
    ))
    s.append(Spacer(1, 0.1 * inch))
    rows = [
        ["MONTH 1", "DISCOVERY", "Marcus has a contract on a deal he'd normally assign. Instead, he books a CO1 Execution Review with SCC."],
        ["MONTH 2", "DECISION", "CO1 report comes back clean. Marcus pulls his hard-money loan, closes on the property, signs CO3 oversight agreement."],
        ["MONTHS 3–7", "EXECUTION", "SCC manages subs, draws, inspections, schedule. Marcus visits site twice. Total Marcus hours: ~20 across 5 months."],
        ["MONTH 8", "LIST + SELL", "Property hits MLS at top of comp band. Multiple offers within 14 days."],
        ["MONTH 9", "CLOSE + COUNT", "Closing day: $104K net profit. Marcus keeps the relationship — books CO1 on his next deal."],
    ]
    s.append(data_table(
        ["MONTH", "PHASE", "WHAT HAPPENED"],
        rows,
        col_widths=[0.7 * inch, 0.9 * inch, FRAME_W - 1.6 * inch],
    ))
    s.append(PageBreak())
    return s


def month_1_story():
    s = []
    s.append(Paragraph("MONTH 1 · DISCOVERY", S["month_eyebrow"]))
    s.append(Paragraph("Marcus stops the assignment habit and books a CO1 instead.", S["h1"]))
    s.append(Paragraph(
        "Marcus has a 1960s ranch under contract in southeast Charlotte. ARV $385K. He's already gotten "
        "two assignment offers ($28K and $31K). The Deal Pack he ran shows a Tier 2 rehab budget of $94K. "
        "His usual move: assign and pocket $30K. Take the win.",
        S["body"],
    ))
    s.append(Paragraph(
        "This time he runs the other math. <b>$385K ARV minus $94K rehab minus $185K acquisition minus "
        "$28K holding/financing/sale costs = $78–112K projected net.</b> Even at the conservative end, "
        "he'd net 2.5× his assignment fee — and he'd still own the GC relationship for next time.",
        S["body"],
    ))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout(
        "WHAT HE DID",
        "Booked a CO1 Execution Review with SCC. CO1 is a deep-walk of the property by a licensed NC GC "
        "with a written written risk report — every execution risk that could blow the budget, every line "
        "item that needs sub validation, every lender-killer that could derail the project.",
    ))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout(
        "WHY THIS IS THE FIRST STEP",
        "CO1 doesn't commit him to anything. It just tells him whether the deal he's been about to assign "
        "is actually the deal worth keeping. If CO1 surfaces $25K+ of hidden risk, he assigns it as planned. "
        "If CO1 shows the deal is clean, he has the green light to close on it himself.",
    ))
    s.append(PageBreak())
    return s


def month_2_story():
    s = []
    s.append(Paragraph("MONTH 2 · DECISION", S["month_eyebrow"]))
    s.append(Paragraph("CO1 comes back clean. Marcus commits.", S["h1"]))
    s.append(Paragraph(
        "The CO1 report flags one open permit from 2018 (close-out cost: $325) and notes a soft soffit at "
        "the southwest corner ($950 to repair). Otherwise: structurally clean, mechanicals at 60% useful "
        "life, foundation dry, no surprises.",
        S["body"],
    ))
    s.append(Paragraph(
        "Marcus pulls a hard-money loan through one of SCC's vetted lender intros — DSCR-style construction "
        "loan, 80% LTV, 10% holdback for rehab draws. Closes on the property 18 days later. Same day he "
        "signs SCC's CO3 (Active Project Oversight) agreement, scoped at the Standard tier for this project.",
        S["body"],
    ))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout(
        "WHAT HE SIGNED UP FOR",
        "<b>CO3 Active Oversight:</b> SCC manages weekly site walks, draw-release approvals, sub coordination, "
        "schedule defense, issue escalation, and final closeout. Marcus stays in his investor role. He never "
        "becomes the project manager. He approves milestones; SCC runs the build.",
    ))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout(
        "WHY HE DIDN'T GO FULL GC (CO5)",
        "Marcus owns the property himself — that's the whole point. He wanted the profit upside of being "
        "the owner of record, the appraisal control of being the borrower, and the resale relationship of "
        "being the seller. CO3 lets him do all that while SCC owns the execution side.",
    ))
    s.append(PageBreak())
    return s


def months_3_7_story():
    s = []
    s.append(Paragraph("MONTHS 3–7 · EXECUTION", S["month_eyebrow"]))
    s.append(Paragraph("SCC runs the build. Marcus runs his wholesale book.", S["h1"]))
    s.append(Paragraph(
        "This is the period where most wholesalers-turned-flippers get destroyed — managing subs, "
        "chasing draws, fighting schedule slippage, mediating change orders. Marcus skipped all of it.",
        S["body"],
    ))
    s.append(Spacer(1, 0.08 * inch))
    rows = [
        ["Site visits Marcus made", "2 (one demo walk, one before-paint walk)"],
        ["Time Marcus spent on construction questions", "~20 hours total across 5 months"],
        ["Subs Marcus had to manage directly", "0 — SCC handled all coordination"],
        ["Draws Marcus approved", "4 — all delivered to him in lender-ready format"],
        ["Change orders that surprised him", "0 — every change was reviewed + signed before work began"],
        ["Wholesale deals Marcus did in parallel", "3 (kept his pipeline running through Q2/Q3)"],
        ["Wholesale assignment revenue during this window", "$78K (avg $26K × 3 deals)"],
    ]
    s.append(data_table(
        ["METRIC", "VALUE"],
        rows,
        col_widths=[2.6 * inch, FRAME_W - 2.6 * inch],
    ))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout(
        "THE INSIGHT",
        "Marcus didn't trade his wholesale business for a flip business. He <b>ran both in parallel.</b> "
        "His wholesale book funded his life through the rehab period. The flip was the upside, not the bet.",
    ))
    s.append(PageBreak())
    return s


def month_8_9_story():
    s = []
    s.append(Paragraph("MONTHS 8–9 · LIST + CLOSE", S["month_eyebrow"]))
    s.append(Paragraph("The flip closes. The math lands.", S["h1"]))
    s.append(Paragraph(
        "Property hit MLS at $389K on the strength of mid-market finishes, lender-friendly mechanicals, "
        "and a clean inspection package. Multiple offers within two weeks. Sold $394K — slightly above "
        "list. Here's the full P&L.",
        S["body"],
    ))
    rows = [
        ["Sale price", "$394,000"],
        ["Acquisition cost", "($185,000)"],
        ["Hard money loan interest + points (9 months)", "($12,400)"],
        ["Rehab budget (verified, Tier 2)", "($94,000)"],
        ["CO1 fee", "($499)"],
        ["CO3 Standard tier oversight (full project)", "($12,500)"],
        ["Holding costs (taxes, insurance, utilities)", "($4,800)"],
        ["Listing agent commission (3%)", "($11,820)"],
        ["Buyer agent commission (3%)", "($11,820)"],
        ["Closing costs + transfer", "($2,600)"],
        ["Contingency used (sub overrun on plumbing)", "($3,800)"],
        ["<b>NET PROFIT</b>", "<b>$104,761</b>"],
    ]
    s.append(data_table(
        ["LINE ITEM", "AMOUNT"],
        rows,
        col_widths=[FRAME_W - 1.5 * inch, 1.5 * inch],
    ))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout(
        "THE COMPARISON",
        "Had Marcus assigned this same deal for $30K: he'd be $30K richer, full stop. By keeping it and "
        "using SCC's execution stack: he netted $104,761 — <b>$74,761 more</b> than the assignment path. "
        "All while running his wholesale business in parallel.",
    ))
    s.append(PageBreak())
    return s


def honest_math_story():
    s = []
    s += section_header("THE HONEST MATH", "What this requires from you — and what it doesn't")
    s.append(Paragraph(
        "Not every wholesaler is ready for this path. Here's the honest scorecard:",
        S["body"],
    ))
    s.append(Spacer(1, 0.08 * inch))
    rows = [
        ["Capital required",
         "$25K–$60K cash (down payment + reserves). The rest is leveraged via construction loan."],
        ["Credit profile",
         "650+ for hard money / DSCR construction. Or partner with someone who has it."],
        ["Time commitment per project",
         "~20 hours total across 9 months. Not a full-time job. Less than half your existing wholesale workload."],
        ["Construction expertise needed",
         "Zero. SCC owns the construction side end-to-end."],
        ["Risk you carry",
         "Market risk, holding-cost risk, sale-timing risk. Same risks as your buyer carries today — but now you keep the upside."],
        ["Risk SCC carries",
         "Execution risk. Budget overruns. Sub performance. Schedule integrity. That's our job, our license, our reputation."],
    ]
    s.append(data_table(
        ["WHAT YOU NEED", "REALITY"],
        rows,
        col_widths=[2.2 * inch, FRAME_W - 2.2 * inch],
    ))
    s.append(Spacer(1, 0.12 * inch))
    s.append(callout(
        "WHO THIS IS NOT FOR",
        "Wholesalers under $20K avg assignment fees should stay on the Deal Pack track first — get to "
        "$25–40K assignments consistently before you start keeping deals. The first flip should NOT be your "
        "Hail Mary.",
    ))
    s.append(PageBreak())
    return s


def role_story():
    s = []
    s += section_header("HOW SCC RUNS THE EXECUTION", "What we actually do across CO1 → CO3 → CO4")
    s.append(Paragraph(
        "There are three products that power the wholesale-to-flipper conversion. You don't need all "
        "three — you pick the level of involvement based on the deal and your comfort.",
        S["body"],
    ))
    s.append(Spacer(1, 0.1 * inch))
    rows = [
        ["CO1 · INVESTOR EXECUTION REVIEW",
         "60-min deal walkthrough by a licensed NC GC. Written risk report. Recommended downstream path. The cheapest possible green-light decision before you commit to keeping a deal."],
        ["CO3 · ACTIVE PROJECT OVERSIGHT",
         "Weekly site walks, draw releases, sub management, schedule defense, issue escalation in writing, final punch-list closeout. You stay GC-of-record (or co-record); we run the project."],
        ["CO4 · GC-SUPPORTED OWNER BUILD",
         "Owner-builder structure with SCC standing behind the license-level risk. You're the GC of record on paper; we're the inspector-facing accountability."],
    ]
    s.append(data_table(
        ["PRODUCT", "WHAT IT DOES"],
        rows,
        col_widths=[2.4 * inch, FRAME_W - 2.4 * inch],
    ))
    s.append(Spacer(1, 0.1 * inch))
    s.append(Paragraph(
        "Marcus used CO1 + CO3. That's the most common path for first-time wholesale-to-flippers. "
        "Once he has 3+ projects under his belt, he'll likely move to CO4 to capture more margin while "
        "still letting SCC carry the license-level risk.",
        S["body"],
    ))
    s.append(PageBreak())
    return s


def decision_story():
    s = []
    s += section_header("THE DECISION FRAMEWORK", "Which deals to keep · which deals to assign")
    s.append(Paragraph(
        "Not every wholesale deal should become a flip. Most shouldn't. Here are the five filters Marcus "
        "now runs on every contract before he decides whether to assign or keep:",
        S["body"],
    ))
    rules = [
        ("1. SPREAD AT LEAST 3× ASSIGNMENT FEE",
         "Projected net flip profit must be ≥ 3× what you'd capture by assigning. If your typical assignment is $30K, you only keep deals with $90K+ projected net. Below that, the risk premium isn't worth it."),
        ("2. CO1 CLEAN OR LIGHT-RISK",
         "If CO1 surfaces more than 1 medium-severity execution risk per $50K of budget, assign the deal. Clean diagnoses are the only ones worth keeping."),
        ("3. MARKET-COMPATIBLE EXIT",
         "ARV based on at least 3 recent comps within 0.5 miles, sold in last 6 months, comparable beds/baths/sqft. No speculative exits."),
        ("4. CAPITAL + RESERVES IN PLACE",
         "Down payment + 6 months of holding costs in cash before you commit. Never deploy your last dollar on a flip."),
        ("5. EXIT TIMELINE FITS THE SEASON",
         "NC selling season is March–October. If your projected completion is November or later, assign and re-deploy capital in Q1."),
    ]
    for label, body in rules:
        s.append(callout(label, body))
        s.append(Spacer(1, 0.06 * inch))
    s.append(PageBreak())
    return s


def cta_story():
    s = []
    s += section_header("YOUR NEXT 9 MONTHS", "Three doors. Pick one.")
    s.append(callout(
        "DOOR 1 · CO1 INVESTOR EXECUTION REVIEW · $499",
        "If you have a deal you've been thinking about keeping instead of assigning, this is the starting "
        "line. A licensed NC GC walks the deal, delivers a written execution risk report within 7 days, "
        "and tells you whether the deal is keep-worthy. Refund if we cannot produce the report. "
        "<b>Book at southerncitiesconstruction.com/platform.</b>",
    ))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout(
        "DOOR 2 · BUILD DESK MEMBERSHIP · $97/MO STARTER",
        "Not ready for a specific deal yet, but want a licensed NC GC on retainer for your portfolio "
        "decisions? Build Desk gives you 2 reviews per month, project intelligence reports on any active "
        "build, vetted sub directory, and member-rate CO1 pricing. <b>Apply at "
        "southerncitiesconstruction.com/build-desk.</b>",
    ))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout(
        "DOOR 3 · BOOK A 30-MIN CALL WITH DARIUS",
        "Want to talk it through before you commit to anything? Book a 30-minute strategy call directly "
        "with the founder. Free for serious NC wholesalers. Limited to 8 calls per week. <b>Book at "
        "southerncitiesconstruction.com/strategy-call.</b>",
    ))
    s.append(Spacer(1, 0.15 * inch))
    s.append(cta_box(
        "2026 capacity is capped. First 10 wholesale-to-flipper conversions get founder oversight.",
        "We're accepting 10 wholesale-to-flipper conversion clients in 2026 with direct founder involvement "
        "(Darius personally on every CO1 + weekly check-ins through Month 9). After that, conversion clients "
        "are routed to our senior PM. Book your CO1 to claim a founder-oversight spot.",
    ))
    s.append(PageBreak())
    return s


def trust_story():
    s = []
    s += section_header("WHY YOU SHOULD TRUST THIS", "I lost over $100K being on the wrong side of this exact transition.")
    s.append(Paragraph(
        "I'm Darius T. Walton. I'm a licensed NC General Contractor (License #107724) and the founder "
        "of Southern Cities Construction. I built this entire platform — CO1 through CO5, Deal Pack, "
        "Build Desk — because I lost over $100K on my own real estate investing deals when I first got "
        "into the industry 8 years ago.",
        S["body"],
    ))
    s.append(Paragraph(
        "Specifically: I tried to do what Marcus did, but without a GC license, without a vetted sub "
        "network, without draw-schedule literacy, without the execution stack that SCC now provides. I "
        "got destroyed on three projects in a row before I got my license and figured out the actual "
        "playbook.",
        S["body"],
    ))
    s.append(Paragraph(
        "The reason I built CO1, CO3, CO4, and Build Desk is because I knew the moment I had a license "
        "and a working sub network, there were hundreds of NC wholesalers in the exact spot I was in 8 "
        "years ago — ready to keep their best deals, but missing the execution muscle. That's the entire "
        "purpose of this platform: be the execution muscle for people who already have the deal flow.",
        S["body"],
    ))
    s.append(Paragraph(
        "<b>Most GCs won't review a deal you don't own yet.</b> We will. Most GCs won't co-pilot your "
        "first flip. We will. That's the wedge — and it's the entire reason a wholesaler-to-flipper "
        "conversion takes 9 months with SCC instead of 3 years on your own.",
        S["body"],
    ))
    s.append(Spacer(1, 0.12 * inch))
    s.append(cta_box(
        "Book your CO1 Execution Review today",
        "The fastest path from this PDF to your first $100K flip starts with a $499 CO1. Refund if we "
        "cannot produce the written report. Book at <b>southerncitiesconstruction.com/platform</b>.",
    ))
    s.append(Spacer(1, 0.12 * inch))
    s.append(Paragraph(
        "<i>Darius T. Walton · Southern Cities Construction · NC GC License #107724 · 2026 · "
        "Serving wholesalers and investors across NC.</i>",
        S["body_muted"],
    ))
    return s


def build():
    os.makedirs(os.path.dirname(OUTPUT_PDF), exist_ok=True)
    doc = BaseDocTemplate(
        OUTPUT_PDF, pagesize=LETTER,
        leftMargin=MARGIN_L, rightMargin=MARGIN_R,
        topMargin=MARGIN_T, bottomMargin=MARGIN_B,
        title="From $10K to $104K in 9 Months",
        author="Darius T. Walton · Southern Cities Construction",
        subject="NC Wholesaler-to-Flipper Transformation · CO1-CO3 Path",
    )
    cover_frame = Frame(MARGIN_L, MARGIN_B, FRAME_W, FRAME_H, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, id="cover_frame")
    content_frame = Frame(MARGIN_L, MARGIN_B, FRAME_W, FRAME_H, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, id="content_frame")
    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[cover_frame], onPage=draw_cover_page),
        PageTemplate(id="content", frames=[content_frame], onPage=draw_content_page),
    ])
    story = []
    story += cover_story()
    story += ceiling_story()
    story += overview_story()
    story += month_1_story()
    story += month_2_story()
    story += months_3_7_story()
    story += month_8_9_story()
    story += honest_math_story()
    story += role_story()
    story += decision_story()
    story += cta_story()
    story += trust_story()
    doc.build(story)
    print(f"✓ Wrote {OUTPUT_PDF}")
    print(f"  Size: {os.path.getsize(OUTPUT_PDF) / 1024:.1f} KB")


if __name__ == "__main__":
    build()
