#!/usr/bin/env python3
"""
build-wholesaler-assignment-lm-pdf.py

LM #1 — "The $25–40K Assignment Playbook"
Sells: Deal Pack (Bid-Ready, Build-Ready, Site Scan, Pro Subscription)
Audience: NC wholesalers who want to stay wholesalers but capture bigger fees

Output: public/resources/consistent-assignment-wholesaler-lm.pdf
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

PROJECT_ROOT = Path("/Users/ashborn/.openclaw/workspace/southern-cities-construction")
LOGO_REVERSED = str(PROJECT_ROOT / "public" / "sc-construction-logo-reversed.png")
LOGO_STANDARD = str(PROJECT_ROOT / "public" / "sc-construction-logo.png")
OUTPUT_PDF = str(PROJECT_ROOT / "public" / "resources" / "consistent-assignment-wholesaler-lm.pdf")

PAGE_W, PAGE_H = LETTER
MARGIN_L = 0.85 * inch
MARGIN_R = 0.85 * inch
MARGIN_T = 1.0 * inch
MARGIN_B = 1.0 * inch
FRAME_W = PAGE_W - MARGIN_L - MARGIN_R
FRAME_H = PAGE_H - MARGIN_T - MARGIN_B

S = {
    "cover_eyebrow": ParagraphStyle("cover_eyebrow", fontName="Helvetica-Bold", fontSize=10, textColor=ORANGE, leading=14, alignment=TA_LEFT, spaceAfter=12),
    "cover_title": ParagraphStyle("cover_title", fontName="Helvetica-Bold", fontSize=28, textColor=white, leading=34, alignment=TA_LEFT, spaceAfter=18),
    "cover_subtitle": ParagraphStyle("cover_subtitle", fontName="Helvetica", fontSize=15, textColor=HexColor("#D6D6D6"), leading=22, alignment=TA_LEFT, spaceAfter=40),
    "cover_author": ParagraphStyle("cover_author", fontName="Helvetica-Bold", fontSize=11, textColor=ORANGE, leading=15, alignment=TA_LEFT),
    "cover_credentials": ParagraphStyle("cover_credentials", fontName="Helvetica", fontSize=10, textColor=HexColor("#B8C0CC"), leading=14, alignment=TA_LEFT),
    "eyebrow": ParagraphStyle("eyebrow", fontName="Helvetica-Bold", fontSize=9, textColor=ORANGE, leading=12, spaceAfter=6),
    "h1": ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=22, textColor=NAVY, leading=28, spaceBefore=4, spaceAfter=12),
    "h2": ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=14, textColor=NAVY, leading=18, spaceBefore=10, spaceAfter=6),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=10.5, textColor=TEXT_DARK, leading=15, spaceAfter=8, alignment=TA_LEFT),
    "body_muted": ParagraphStyle("body_muted", fontName="Helvetica", fontSize=9.5, textColor=TEXT_MUTED, leading=13.5, spaceAfter=6),
    "callout_label": ParagraphStyle("callout_label", fontName="Helvetica-Bold", fontSize=8.5, textColor=ORANGE, leading=11, spaceAfter=3),
    "stat_big": ParagraphStyle("stat_big", fontName="Helvetica-Bold", fontSize=32, textColor=ORANGE, leading=36, alignment=TA_CENTER),
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
    canvas.drawRightString(PAGE_W - MARGIN_R, PAGE_H - 0.4 * inch, "THE $25–40K ASSIGNMENT STANDARD · 2026")
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawRightString(PAGE_W - MARGIN_R, PAGE_H - 0.55 * inch, "NC GC License #107724")
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(NAVY)
    canvas.drawCentredString(PAGE_W / 2, 0.45 * inch, f"{doc.page - 1}")
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawString(MARGIN_L, 0.45 * inch, "© Southern Cities Construction")
    canvas.drawRightString(PAGE_W - MARGIN_R, 0.45 * inch, "southerncitiesconstruction.com/deal-pack")
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


# ============================================================
# Content
# ============================================================

def cover_story():
    s = []
    s.append(Spacer(1, 2.1 * inch))
    s.append(Paragraph("FOR NC WHOLESALERS · 2026 PLAYBOOK", S["cover_eyebrow"]))
    s.append(Paragraph("The $25–40K Assignment Playbook", S["cover_title"]))
    s.append(Paragraph(
        "How NC wholesalers are consistently closing $25–40K+ "
        "assignments to real investors — without becoming flippers, and "
        "without learning construction themselves.",
        S["cover_subtitle"],
    ))
    s.append(Spacer(1, 1.8 * inch))
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


def problem_story():
    s = []
    s += section_header("THE PROBLEM", "Your assignment fee isn't capped by your deals. It's capped by who you're selling them to.")
    s.append(Paragraph(
        "If you're wholesaling NC deals right now and your assignment fees keep landing in the "
        "$5K–$15K range, the deals aren't the problem. The buyer pool is.",
        S["body"],
    ))
    s.append(Paragraph(
        "You're selling unverified contracts — an option to buy a house. That product only "
        "attracts one kind of buyer: another wholesaler chaining the deal, or a low-tier flipper "
        "who has to do their own GC validation and lowballs you accordingly.",
        S["body"],
    ))
    s.append(Paragraph(
        "The real end buyers — flippers with capital, BRRRR operators, out-of-state investors "
        "with DSCR loans pre-approved — won't touch unverified wholesale deals. They've been "
        "burned. Their lenders require verified scope. Their capital partners require documentation.",
        S["body"],
    ))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout(
        "THE TWO-LAYER PROBLEM",
        "<b>Layer 1:</b> You're capturing 15–25% of the spread on every deal. Your buyer captures the rest by "
        "flipping the same property.<br/><br/>"
        "<b>Layer 2 (the real one):</b> Real investors won't even consider your assignment. So you can only "
        "sell to other wholesalers and low-tier flippers — the buyer pool that pays the least.",
    ))
    s.append(PageBreak())
    return s


def why_story():
    s = []
    s += section_header("WHY $10K IS YOUR CEILING", "Three reasons real investors skip your assignments today")
    rows = [
        ["1. LENDER VETO",
         "DSCR and hard-money lenders require a verified scope of work before approving a construction loan. Your buyer can't get financing without it — so they either skip your deal entirely or grind you on price to cover the cost of getting their own GC verification."],
        ["2. CAPITAL PARTNER VETO",
         "Out-of-state investors don't wire $250K based on listing photos. They need license-backed documentation. Without it, you're invisible to the most aggressive buyers in NC."],
        ["3. DUPLICATE DD WORK",
         "Even local flippers won't pay top-of-market for an assignment if they have to bring their own GC, run their own takeoffs, and validate every scope item. They'd rather wait for a verified deal — even from someone else."],
    ]
    s.append(data_table(
        ["REASON", "WHY IT KILLS YOUR ASSIGNMENT FEE"],
        rows,
        col_widths=[1.7 * inch, FRAME_W - 1.7 * inch],
    ))
    s.append(Spacer(1, 0.15 * inch))
    s.append(callout(
        "THE BRUTAL DIAGNOSIS",
        "Until you can put a licensed GC's stamp on your assignment, you are competing for "
        "the same low-end buyer pool as every other wholesaler in NC. That pool has a hard "
        "ceiling around $10–15K per assignment. It's not your hustle. It's the product.",
    ))
    s.append(PageBreak())
    return s


def solution_story():
    s = []
    s += section_header("THE BUILD-READY STANDARD", "What changes when you sell a verified deal instead of an option to buy")
    s.append(Paragraph(
        "A GC-Verified Deal Pack is not paperwork. It's a buyer-pool switch. The same property, "
        "marketed with a licensed NC GC's verification, attracts a completely different set of buyers:",
        S["body"],
    ))
    rows = [
        ["BUYER POOL", "Before: 70% wholesalers + 25% low-tier flippers + 5% real investors", "After: 15% wholesalers + 25% flippers + 60% real investors with capital ready"],
        ["AVG ASSIGNMENT", "$5K–$15K", "$25K–$40K consistently · $50K+ on premium deals"],
        ["AVG TIME TO CLOSE", "14–21 days", "5–9 days"],
        ["LENDER FRICTION", "Buyer must source own GC + scope + quotes", "Lender accepts SCC-verified package on the spot"],
        ["MARKETING ANGLE", "\"Off-market deal, motivated seller\"", "\"GC-Verified Build-Ready Investment · NC License #107724\""],
        ["REPEAT BUYERS", "Rare — each buyer is one-off", "Common — verified-deal buyers come back for more"],
    ]
    s.append(data_table(
        ["DIMENSION", "WITHOUT DEAL PACK", "WITH DEAL PACK"],
        rows,
        col_widths=[1.4 * inch, (FRAME_W - 1.4 * inch) / 2, (FRAME_W - 1.4 * inch) / 2],
    ))
    s.append(Spacer(1, 0.12 * inch))
    s.append(Paragraph(
        "<b>Same deals. Different buyer pool. 2–4× the assignment fee.</b>",
        S["h2"],
    ))
    s.append(PageBreak())
    return s


def sample_intro():
    s = []
    s += section_header("THE SAMPLE", "This is exactly what your buyer sees when you order a Deal Pack.")
    s.append(Paragraph(
        "On the next three pages: an anonymized excerpt from a real Bid-Ready Deal Pack we delivered "
        "to a NC wholesaler in 2026. Address has been redacted; all numbers are verbatim from the actual report.",
        S["body"],
    ))
    s.append(Spacer(1, 0.1 * inch))
    s.append(callout(
        "WHAT YOU'RE LOOKING AT",
        "This is the document the wholesaler attached to their assignment marketing. The buyer "
        "received this PDF along with the contract. The buyer's lender accepted this document as "
        "verified scope. Assignment fee on this deal: <b>$32,500</b>.",
    ))
    s.append(PageBreak())
    return s


def sample_p1():
    s = []
    s.append(Paragraph("SAMPLE · BID-READY DEAL PACK · PAGE 1", S["eyebrow"]))
    s.append(Paragraph("Property Snapshot · 1950s ranch · Charlotte NC [address redacted]", S["h2"]))
    rows = [
        ["Property type", "Single-family, 1,420 sf, 3BR/1BA, 0.21 acre lot"],
        ["Year built", "1956"],
        ["Current condition", "Vacant, original kitchen + bath, 1990s mechanicals, soft soffit at southwest corner"],
        ["Verified ARV range (GC-est)", "$372K–$398K"],
        ["Total verified rehab budget", "$84,200–$112,800 (tiered, see below)"],
        ["Project category", "Cosmetic + targeted systems (Tier 2 of 4)"],
        ["Lender-killer flags", "Open permit from 2014 (water heater) — close-out required pre-close"],
        ["Estimated days to flip", "75–110 days from acquisition"],
    ]
    s.append(data_table(
        ["FIELD", "VALUE"],
        rows,
        col_widths=[2.2 * inch, FRAME_W - 2.2 * inch],
    ))
    s.append(Spacer(1, 0.12 * inch))
    s.append(callout(
        "GC-CERTIFIED BUDGET TIERS",
        "<b>Tier 1 · Lender-Pass ($84,200):</b> Minimum to pass appraisal + inspection. List at $358K.<br/>"
        "<b>Tier 2 · Market-Standard ($96,800):</b> Mid-market buyer expectations. List at $382K.<br/>"
        "<b>Tier 3 · Premium List ($112,800):</b> Top-of-comp finishes. List at $398K.",
    ))
    s.append(PageBreak())
    return s


def sample_p2():
    s = []
    s.append(Paragraph("SAMPLE · BID-READY DEAL PACK · PAGE 2", S["eyebrow"]))
    s.append(Paragraph("Scope Snapshot · Tier 2 Market-Standard Build", S["h2"]))
    rows = [
        ["Demo + dumpster", "$2,400–$3,200"],
        ["Roof (replace, GAF arch shingle)", "$8,600–$11,200"],
        ["HVAC (replace 3-ton condenser + furnace)", "$8,800–$10,400"],
        ["Plumbing (re-line + 1 bath rebuild)", "$9,200–$12,400"],
        ["Electrical (200A panel upgrade + fixtures)", "$4,800–$6,600"],
        ["Kitchen (full reno, mid-market cabinets + quartz)", "$18,200–$22,800"],
        ["Bathroom (mid-market tile + plumbing fixtures)", "$6,800–$9,200"],
        ["Flooring (LVP throughout, refinish 2 BRs)", "$7,200–$9,400"],
        ["Paint (interior + exterior)", "$5,400–$6,800"],
        ["Punch + closeout + staging", "$2,400–$3,200"],
        ["Contingency (10%)", "$8,800–$10,200"],
        ["TOTAL · TIER 2", "$84,600–$105,400"],
    ]
    s.append(data_table(
        ["LINE ITEM", "VERIFIED COST RANGE"],
        rows,
        col_widths=[FRAME_W - 1.8 * inch, 1.8 * inch],
    ))
    s.append(Spacer(1, 0.1 * inch))
    s.append(Paragraph(
        "<i>Every line item independently verified by a licensed NC General Contractor. Sub-trade pricing "
        "validated against 2026 Charlotte-area subcontractor quotes. NC GC License #107724.</i>",
        S["body_muted"],
    ))
    s.append(PageBreak())
    return s


def sample_p3():
    s = []
    s.append(Paragraph("SAMPLE · BID-READY DEAL PACK · PAGE 3", S["eyebrow"]))
    s.append(Paragraph("Execution Risk Snapshot", S["h2"]))
    s.append(callout(
        "RISK 1 · OPEN PERMIT (HIGH)",
        "Water heater permit pulled 2014, never closed. Will block closing if not resolved. "
        "<b>Cost to cure:</b> $325 + 5 business days. <b>Action:</b> SCC can handle close-out as Deal Pack Pro add-on.",
    ))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout(
        "RISK 2 · POLYBUTYLENE SUPPLY LINES (MEDIUM)",
        "Visible polybutylene at hot water heater. Flagged by FHA, VA, and most DSCR lenders. "
        "<b>Cost to cure:</b> $4,500–$7,200 (re-pipe with PEX). Already in Tier 2 budget above.",
    ))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout(
        "RISK 3 · SOFFIT ROT AT SW CORNER (LOW)",
        "Active moisture penetration. <b>Cost to cure:</b> $850–$1,400. Cosmetic-priority, but inspector will flag.",
    ))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout(
        "BUYER'S LENDER VERIFICATION",
        "This document has been formatted to meet DSCR, hard-money, and most institutional construction-loan "
        "underwriting standards. Submit alongside the assignment contract for fastest closing approval.",
    ))
    s.append(PageBreak())
    return s


def framework_story():
    s = []
    s += section_header("THE 5-QUESTION FRAMEWORK", "What real investors check before paying a $25K+ assignment fee")
    s.append(Paragraph(
        "Want to validate your next deal in 15 minutes — without becoming a contractor? These are the five "
        "checks every serious investor runs (and what the Deal Pack does at scale).",
        S["body"],
    ))
    questions = [
        ("1. VINTAGE CHECK",
         "What decade was the home built? Pre-1978 means lead paint protocols. Pre-1985 means asbestos risk. Pre-1995 means polybutylene plumbing risk. The vintage alone tells you 60% of the execution-risk story."),
        ("2. SYSTEM AGE CHECK",
         "HVAC, roof, water heater: when were they last replaced? Listing photos usually show stickers, model plates, or visible age. Any system past 75% of its useful life is a lender-comment magnet."),
        ("3. POLYBUTYLENE / ALUMINUM WIRING SCAN",
         "5-second visual at the water heater (poly = gray plastic, copper or PEX = clean). 5-second visual at the panel (aluminum branch circuits visible as silver wires on breakers). Either kills 20%+ of NC deals at appraisal."),
        ("4. FOUNDATION + DRAINAGE CHECK",
         "Three listing photos tell you 90% of the story: foundation perimeter, exterior corners, gutter terminations. Active drainage failure = $4–$12K to fix or deal-killer."),
        ("5. PERMIT + CODE VIOLATION PULL",
         "Free at every NC county portal. Search the address. Any open permits older than 60 days will block closing. Any active code violation requires cure before transfer. Takes 10 minutes."),
    ]
    for label, body in questions:
        s.append(callout(label, body))
        s.append(Spacer(1, 0.07 * inch))
    s.append(PageBreak())
    return s


def gap_story():
    s = []
    s += section_header("THE 4 THINGS YOU CAN'T DO ALONE", "Why investors pay top-of-market for a Deal Pack, not a do-it-yourself checklist")
    s.append(Paragraph(
        "The framework on the previous page is one step of a five-step process. You can run that step "
        "yourself in 15 minutes. The other four steps require a licensed GC, a vetted sub network, and "
        "documentation an out-of-state lender will accept. Here's what end-investors expect to see in a verified package:",
        S["body"],
    ))
    rows = [
        ["1. VETTED SUB-QUOTES",
         "Three independent NC sub-trade quotes per major trade (plumbing, electrical, HVAC, roofing). Investors and lenders verify these are real subs at real prices, not napkin estimates."],
        ["2. PLANS + DESIGN RENDERINGS",
         "Floor plans + design renderings on the Build-Ready tier. End-investors use these to market the future property to THEIR buyer pool before they even close."],
        ["3. PRE-CLOSING OPEN PERMIT SWEEP",
         "Documented sweep of open permits, code violations, and lien searches. Lenders require this for construction loans. Buyers walk away from deals where this isn't documented."],
        ["4. LICENSE-BACKED VERIFICATION STAMP",
         "The NC GC License #107724 stamp on every page of the package. Out-of-state capital partners require this signature before wiring funds."],
    ]
    s.append(data_table(
        ["WHAT", "WHY INVESTORS DEMAND IT"],
        rows,
        col_widths=[2.2 * inch, FRAME_W - 2.2 * inch],
    ))
    s.append(Spacer(1, 0.12 * inch))
    s.append(Paragraph(
        "<b>This is the Deal Pack. The framework is yours to use forever. The four pieces above are what we sell.</b>",
        S["h2"],
    ))
    s.append(PageBreak())
    return s


def cta_story():
    s = []
    s += section_header("YOUR NEXT DEAL", "Four doors. Pick one.")
    s.append(callout(
        "DOOR 1 · FREE SF-BASED BALLPARK",
        "Submit your next deal at <b>southerncitiesconstruction.com/deal-pack</b>. Get a free ballpark "
        "rehab range based on square footage and vintage. No commitment. Takes 24 hours.",
    ))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout(
        "DOOR 2 · BID-READY DEAL PACK · $599",
        "Full GC-Certified budget, scope snapshot, lender-killer flags, execution risk report. "
        "Branded PDF you attach to your assignment marketing. 3–7 day turnaround. Required input: "
        "existing plans, dimensions, OR add Site Scan + As-Built for $499.",
    ))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout(
        "DOOR 3 · BUILD-READY DEAL PACK · $1,997",
        "Everything in Door 2 PLUS plans + design renderings + 3 vetted sub-quotes per trade + draw "
        "schedule template + pre-closing sweep. The package end-investors expect for $40K+ assignment fees. "
        "7–14 day turnaround.",
    ))
    s.append(Spacer(1, 0.08 * inch))
    s.append(callout(
        "DOOR 4 · DEAL PACK PRO · $897/MO",
        "For wholesalers doing 2+ deals/month. Includes 2 Bid-Ready credits/mo + 25% off Build-Ready upgrades + "
        "priority 5-day turnaround + \"GC-Verified by SCC\" co-marketing badge for every listing.",
    ))
    s.append(Spacer(1, 0.15 * inch))
    s.append(cta_box(
        "Limited 2026 capacity. Pioneer pricing locks in for the first 25 NC wholesalers.",
        "We accept 25 new Deal Pack orders per month. First 25 NC wholesalers in 2026 lock in current "
        "pricing forever — after that, Build-Ready moves to $2,497. Order at "
        "southerncitiesconstruction.com/deal-pack.",
    ))
    s.append(PageBreak())
    return s


def trust_story():
    s = []
    s += section_header("WHY YOU SHOULD TRUST THIS", "Anti-guru. License-backed. Across NC.")
    s.append(Paragraph(
        "I'm not a real estate guru. I'm Darius T. Walton — a licensed NC General Contractor and the founder "
        "of Southern Cities Construction. I built this platform because I lost over $100K on my own real "
        "estate investing deals when I first got into the industry 8 years ago, before I had my license, "
        "before I had a sub network, before I knew what I was doing.",
        S["body"],
    ))
    s.append(Paragraph(
        "The mistakes I made on those deals — under-budgeting rehabs, picking the wrong subs, missing "
        "open permits, getting blindsided at appraisal — are the exact mistakes I now help NC wholesalers "
        "and investors avoid. That's the entire reason the Deal Pack exists.",
        S["body"],
    ))
    s.append(Paragraph(
        "Most GCs won't review a deal you don't own yet. We do. That's the wedge. Combined with the "
        "license stamp and the verified-package format, it's why end-investors are willing to pay you "
        "$25–40K+ assignment fees instead of $10K.",
        S["body"],
    ))
    s.append(Spacer(1, 0.1 * inch))
    s.append(cta_box(
        "Order your first Deal Pack today",
        "Three doors are open right now. Pick the one that fits your next deal at "
        "<b>southerncitiesconstruction.com/deal-pack</b>. Free SF-based ballpark estimates "
        "are running at 24-hour turnaround.",
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
        title="The $25-40K Assignment Playbook",
        author="Darius T. Walton · Southern Cities Construction",
        subject="NC Wholesaler Lead Magnet · Deal Pack",
    )
    cover_frame = Frame(MARGIN_L, MARGIN_B, FRAME_W, FRAME_H, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, id="cover_frame")
    content_frame = Frame(MARGIN_L, MARGIN_B, FRAME_W, FRAME_H, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, id="content_frame")
    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[cover_frame], onPage=draw_cover_page),
        PageTemplate(id="content", frames=[content_frame], onPage=draw_content_page),
    ])
    story = []
    story += cover_story()
    story += problem_story()
    story += why_story()
    story += solution_story()
    story += sample_intro()
    story += sample_p1()
    story += sample_p2()
    story += sample_p3()
    story += framework_story()
    story += gap_story()
    story += cta_story()
    story += trust_story()
    doc.build(story)
    print(f"✓ Wrote {OUTPUT_PDF}")
    print(f"  Size: {os.path.getsize(OUTPUT_PDF) / 1024:.1f} KB")


if __name__ == "__main__":
    build()
