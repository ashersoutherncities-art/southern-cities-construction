#!/usr/bin/env python3
"""
build-lead-magnet-pdf.py

Generates the branded SCC lead-magnet PDF:
"The 9 Execution Risks Killing NC Investor Deals in 2026"

Branded with SCC navy + orange + cream palette and the SC logo (variant 02
reversed white-on-dark for the cover; variant 01 navy/orange for content).

Output: public/resources/nc-execution-risks-investor.pdf
"""

import os
from pathlib import Path

from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
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

PROJECT_ROOT = Path("/Users/ashborn/.openclaw/workspace/southern-cities-construction")
LOGO_REVERSED = str(PROJECT_ROOT / "public" / "sc-construction-logo-reversed.png")
LOGO_STANDARD = str(PROJECT_ROOT / "public" / "sc-construction-logo.png")
OUTPUT_PDF = str(PROJECT_ROOT / "public" / "resources" / "nc-execution-risks-investor.pdf")

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

styles = {
    "cover_eyebrow": ParagraphStyle(
        "cover_eyebrow",
        fontName="Helvetica-Bold",
        fontSize=10,
        textColor=ORANGE,
        leading=14,
        alignment=TA_LEFT,
        spaceBefore=0,
        spaceAfter=12,
    ),
    "cover_title": ParagraphStyle(
        "cover_title",
        fontName="Helvetica-Bold",
        fontSize=32,
        textColor=white,
        leading=38,
        alignment=TA_LEFT,
        spaceAfter=18,
    ),
    "cover_subtitle": ParagraphStyle(
        "cover_subtitle",
        fontName="Helvetica",
        fontSize=16,
        textColor=HexColor("#D6D6D6"),
        leading=22,
        alignment=TA_LEFT,
        spaceAfter=40,
    ),
    "cover_author": ParagraphStyle(
        "cover_author",
        fontName="Helvetica-Bold",
        fontSize=11,
        textColor=ORANGE,
        leading=15,
        alignment=TA_LEFT,
    ),
    "cover_credentials": ParagraphStyle(
        "cover_credentials",
        fontName="Helvetica",
        fontSize=10,
        textColor=HexColor("#B8C0CC"),
        leading=14,
        alignment=TA_LEFT,
    ),
    "page_eyebrow": ParagraphStyle(
        "page_eyebrow",
        fontName="Helvetica-Bold",
        fontSize=9,
        textColor=ORANGE,
        leading=12,
        spaceAfter=6,
    ),
    "h1": ParagraphStyle(
        "h1",
        fontName="Helvetica-Bold",
        fontSize=20,
        textColor=NAVY,
        leading=26,
        spaceBefore=4,
        spaceAfter=14,
    ),
    "h2": ParagraphStyle(
        "h2",
        fontName="Helvetica-Bold",
        fontSize=14,
        textColor=NAVY,
        leading=18,
        spaceBefore=8,
        spaceAfter=6,
    ),
    "callout_label": ParagraphStyle(
        "callout_label",
        fontName="Helvetica-Bold",
        fontSize=8.5,
        textColor=ORANGE,
        leading=11,
        spaceAfter=3,
    ),
    "body": ParagraphStyle(
        "body",
        fontName="Helvetica",
        fontSize=10.5,
        textColor=TEXT_DARK,
        leading=15,
        spaceAfter=8,
        alignment=TA_LEFT,
    ),
    "body_muted": ParagraphStyle(
        "body_muted",
        fontName="Helvetica",
        fontSize=10,
        textColor=TEXT_MUTED,
        leading=14,
        spaceAfter=6,
    ),
    "cost_value": ParagraphStyle(
        "cost_value",
        fontName="Helvetica-Bold",
        fontSize=11,
        textColor=NAVY,
        leading=14,
    ),
    "closing_h1": ParagraphStyle(
        "closing_h1",
        fontName="Helvetica-Bold",
        fontSize=22,
        textColor=NAVY,
        leading=28,
        spaceAfter=14,
    ),
    "cta_value": ParagraphStyle(
        "cta_value",
        fontName="Helvetica-Bold",
        fontSize=14,
        textColor=white,
        leading=18,
        alignment=TA_LEFT,
    ),
    "cta_body": ParagraphStyle(
        "cta_body",
        fontName="Helvetica",
        fontSize=10.5,
        textColor=HexColor("#FFE9D4"),
        leading=15,
        alignment=TA_LEFT,
    ),
    "signature": ParagraphStyle(
        "signature",
        fontName="Helvetica-Oblique",
        fontSize=11,
        textColor=NAVY,
        leading=15,
    ),
}


# ============================================================
# Page templates
# ============================================================


def draw_cover_page(canvas, doc):
    """Full-bleed navy background + logo."""
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    # Orange accent bar across the top
    canvas.setFillColor(ORANGE)
    canvas.rect(0, PAGE_H - 0.08 * inch, PAGE_W, 0.08 * inch, fill=1, stroke=0)
    # Footer band
    canvas.setFillColor(HexColor("#0A1530"))
    canvas.rect(0, 0, PAGE_W, 0.5 * inch, fill=1, stroke=0)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(ORANGE)
    canvas.drawString(MARGIN_L, 0.2 * inch, "NC GC LICENSE #107724")
    canvas.setFillColor(HexColor("#B8C0CC"))
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(PAGE_W - MARGIN_R, 0.2 * inch, "southerncitiesconstruction.com")
    # Logo (reversed/white version) top-left
    if os.path.exists(LOGO_REVERSED):
        canvas.drawImage(
            LOGO_REVERSED,
            MARGIN_L,
            PAGE_H - 1.7 * inch,
            width=2.4 * inch,
            height=0.7 * inch,
            preserveAspectRatio=True,
            mask="auto",
        )
    canvas.restoreState()


def draw_content_page(canvas, doc):
    """Light cream background + header/footer with logo + page number."""
    canvas.saveState()
    canvas.setFillColor(CREAM)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    # Top orange thin rule
    canvas.setFillColor(ORANGE)
    canvas.rect(0, PAGE_H - 0.04 * inch, PAGE_W, 0.04 * inch, fill=1, stroke=0)
    # Header text — logo + tagline
    if os.path.exists(LOGO_STANDARD):
        canvas.drawImage(
            LOGO_STANDARD,
            MARGIN_L,
            PAGE_H - 0.65 * inch,
            width=1.5 * inch,
            height=0.45 * inch,
            preserveAspectRatio=True,
            mask="auto",
        )
    canvas.setFont("Helvetica-Bold", 7.5)
    canvas.setFillColor(NAVY)
    canvas.drawRightString(
        PAGE_W - MARGIN_R, PAGE_H - 0.4 * inch, "THE 9 EXECUTION RISKS · 2026 NC INVESTOR DEALS"
    )
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawRightString(
        PAGE_W - MARGIN_R, PAGE_H - 0.55 * inch, "NC GC License #107724"
    )
    # Footer page number
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(NAVY)
    canvas.drawCentredString(PAGE_W / 2, 0.45 * inch, f"{doc.page - 1}")
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawString(MARGIN_L, 0.45 * inch, "© Southern Cities Construction")
    canvas.drawRightString(
        PAGE_W - MARGIN_R, 0.45 * inch, "southerncitiesconstruction.com"
    )
    canvas.restoreState()


# ============================================================
# Story builders
# ============================================================


def cover_story():
    story = []
    # Spacer to push title down below the logo
    story.append(Spacer(1, 2.1 * inch))
    story.append(Paragraph("A LICENSED NC GC FIELD GUIDE", styles["cover_eyebrow"]))
    story.append(
        Paragraph(
            "The 9 Execution Risks Killing NC Investor Deals in 2026",
            styles["cover_title"],
        )
    )
    story.append(
        Paragraph(
            "How to spot each one in 5 seconds — and what each one costs to discover too late.",
            styles["cover_subtitle"],
        )
    )
    story.append(Spacer(1, 2.5 * inch))
    story.append(Paragraph("DARIUS T. WALTON", styles["cover_author"]))
    story.append(
        Paragraph(
            "Founder · Southern Cities Construction<br/>"
            "NC General Contractor License #107724<br/>"
            "2026 edition",
            styles["cover_credentials"],
        )
    )
    story.append(NextPageTemplate("content"))
    story.append(PageBreak())
    return story


def callout_box(label_text, body_text, color=ACCENT_LIGHT, label_color=ORANGE):
    """A boxed callout with an orange label + body paragraph."""
    inner = [
        Paragraph(f'<font color="#fa8c41"><b>{label_text}</b></font>', styles["callout_label"]),
        Paragraph(body_text, styles["body"]),
    ]
    tbl = Table([[inner]], colWidths=[FRAME_W])
    tbl.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), color),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ("LINEBEFORE", (0, 0), (0, -1), 3, ORANGE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return tbl


def risk_page(num, title, what_is, how_to_spot, what_it_costs, lender_cares, extra=None):
    """One risk per page with the canonical 4-callout structure."""
    story = []
    # Big orange number + title
    badge = Paragraph(
        f'<font color="#fa8c41" size="32"><b>RISK {num}</b></font>',
        ParagraphStyle("badge", fontName="Helvetica-Bold", fontSize=32, leading=36, spaceAfter=2),
    )
    story.append(badge)
    story.append(Paragraph(title, styles["h1"]))
    if extra:
        story.append(Paragraph(extra, styles["body_muted"]))
        story.append(Spacer(1, 0.08 * inch))
    story.append(callout_box("WHAT IT IS", what_is))
    story.append(Spacer(1, 0.08 * inch))
    story.append(callout_box("HOW TO SPOT IT IN 5 SECONDS", how_to_spot))
    story.append(Spacer(1, 0.08 * inch))
    story.append(callout_box("WHAT IT COSTS", what_it_costs))
    story.append(Spacer(1, 0.08 * inch))
    story.append(callout_box("WHY YOUR BUYER'S LENDER CARES", lender_cares))
    story.append(PageBreak())
    return story


def intro_story():
    story = []
    story.append(Paragraph("WHY THIS EXISTS", styles["page_eyebrow"]))
    story.append(
        Paragraph(
            "Most NC investor deals don't fail at acquisition. They fail at execution.",
            styles["h1"],
        )
    )
    story.append(
        Paragraph(
            "You ran the numbers. The deal works on paper. ARV, rehab budget, holding cost, "
            "exit strategy — all in your spreadsheet. You bought it. Then 8 weeks in, you discover "
            "the supply lines are polybutylene and the buyer's lender flags the property at appraisal. "
            "You're suddenly $14K over budget and 6 weeks behind.",
            styles["body"],
        )
    )
    story.append(
        Paragraph(
            "This pattern is so consistent that it's the entire reason <b>Southern Cities Construction</b> "
            "built the Investor Execution Platform. We're a licensed NC GC who reviews investor deals for "
            "execution risk <i>before</i> earnest money goes hard.",
            styles["body"],
        )
    )
    story.append(
        Paragraph(
            "This PDF documents the 9 risks we've seen kill more NC investor deals in 2026 "
            "than any other category. For each one, you get:",
            styles["body"],
        )
    )
    bullet_items = [
        ("WHAT IT IS", "the construction reality"),
        ("HOW TO SPOT IT IN 5 SECONDS", "visual or contextual tells from listing photos / drive-by / inspection"),
        ("WHAT IT COSTS", "dollar range based on actual Charlotte / Triangle / Wilmington jobs in 2025–2026"),
        ("WHY YOUR BUYER'S LENDER CARES", "for the BRRRR or flip-to-FHA folks"),
    ]
    bullet_data = [
        [
            Paragraph(f'<font color="#fa8c41"><b>{label}</b></font>', styles["callout_label"]),
            Paragraph(text, styles["body"]),
        ]
        for label, text in bullet_items
    ]
    bullet_tbl = Table(bullet_data, colWidths=[1.9 * inch, FRAME_W - 1.9 * inch])
    bullet_tbl.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    story.append(bullet_tbl)
    story.append(Spacer(1, 0.15 * inch))
    story.append(
        Paragraph(
            "<b>Your next deal probably has 2 or 3 of these. The question is which.</b>",
            styles["body"],
        )
    )
    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph("— Darius T. Walton · NC GC License #107724", styles["signature"]))
    story.append(PageBreak())
    return story


def jurisdiction_table():
    data = [
        ["JURISDICTION", "TYPICAL PERMIT REVIEW TIME"],
        ["Mecklenburg County (Charlotte)", "8 – 11 weeks for residential alteration"],
        ["Wake County (Raleigh)", "6 – 9 weeks"],
        ["Durham County", "5 – 8 weeks"],
        ["New Hanover (Wilmington)", "7 – 10 weeks"],
        ["Cumberland (Fayetteville)", "4 – 7 weeks"],
    ]
    tbl = Table(data, colWidths=[2.8 * inch, FRAME_W - 2.8 * inch])
    tbl.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), NAVY),
                ("TEXTCOLOR", (0, 0), (-1, 0), white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, 0), 8),
                ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 1), (-1, -1), 10),
                ("TEXTCOLOR", (0, 1), (-1, -1), TEXT_DARK),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [CREAM, LIGHT_GRAY]),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LINEBELOW", (0, 0), (-1, 0), 1.5, ORANGE),
            ]
        )
    )
    return tbl


def cost_summary_story():
    story = []
    story.append(Paragraph("COST SUMMARY", styles["page_eyebrow"]))
    story.append(Paragraph("What each risk costs to discover late.", styles["h1"]))
    story.append(
        Paragraph(
            "These are the cost ranges from actual 2025–2026 Charlotte / Triangle / Wilmington jobs. "
            "Most investor deals carry 2 or 3 of these risks unaddressed at acquisition.",
            styles["body_muted"],
        )
    )
    story.append(Spacer(1, 0.15 * inch))
    data = [
        ["#", "RISK", "TYPICAL COST IF DISCOVERED LATE"],
        ["1", "Stale labor multiplier", "$12K – $16K (depending on scope size)"],
        ["2", "Permit timeline drift", "$2.5K – $8.5K in holding cost + lost income"],
        ["3", "Galvanized plumbing", "$8K – $15K"],
        ["4", "Federal Pacific / Zinsco panel", "$4K – $7K"],
        ["5", "Aluminum wiring", "$2.5K – $15K"],
        ["6", "Polybutylene supply lines", "$10K – $14K"],
        ["7", "Roof past useful life", "$12K – $18K"],
        ["8", "Clay / Orangeburg sewer line", "$6K – $18K"],
        ["9", "HVAC sequencing trap", "$3K – $8K + schedule cascade"],
    ]
    tbl = Table(data, colWidths=[0.4 * inch, 2.6 * inch, FRAME_W - 3.0 * inch])
    tbl.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), NAVY),
                ("TEXTCOLOR", (0, 0), (-1, 0), white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, 0), 8.5),
                ("FONTNAME", (0, 1), (0, -1), "Helvetica-Bold"),
                ("TEXTCOLOR", (0, 1), (0, -1), ORANGE),
                ("FONTNAME", (1, 1), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 1), (-1, -1), 10),
                ("TEXTCOLOR", (1, 1), (-1, -1), TEXT_DARK),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [CREAM, LIGHT_GRAY]),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LINEBELOW", (0, 0), (-1, 0), 1.5, ORANGE),
                ("ALIGN", (0, 0), (0, -1), "CENTER"),
            ]
        )
    )
    story.append(tbl)
    story.append(Spacer(1, 0.2 * inch))
    # Total exposure call-out
    total_box = Table(
        [
            [
                Paragraph(
                    '<font color="#fa8c41"><b>TOTAL POTENTIAL EXPOSURE PER DEAL</b></font>',
                    ParagraphStyle("totexp", fontName="Helvetica-Bold", fontSize=9, textColor=ORANGE),
                ),
                Paragraph(
                    '<font color="#FFFFFF"><b>$60,000 – $119,500</b></font>',
                    ParagraphStyle("toth", fontName="Helvetica-Bold", fontSize=18, textColor=white, alignment=TA_RIGHT),
                ),
            ]
        ],
        colWidths=[FRAME_W * 0.5, FRAME_W * 0.5],
    )
    total_box.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), NAVY),
                ("LEFTPADDING", (0, 0), (-1, -1), 14),
                ("RIGHTPADDING", (0, 0), (-1, -1), 14),
                ("TOPPADDING", (0, 0), (-1, -1), 14),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        )
    )
    story.append(total_box)
    story.append(Spacer(1, 0.15 * inch))
    story.append(
        Paragraph(
            "Most investor deals carry 2 to 3 of these risks unaddressed. "
            "If you're underwriting a deal in NC right now and you didn't check for all 9, "
            "your real rehab budget is probably <b>$20,000 – $50,000 higher</b> than what's in your spreadsheet.",
            styles["body"],
        )
    )
    story.append(PageBreak())
    return story


def closing_story():
    story = []
    # WHY TRUST THIS block — surfaces credibility right before the offer.
    story.append(Paragraph("WHY TRUST THIS", styles["page_eyebrow"]))
    trust_rows = [
        [
            Paragraph(
                '<font color="#fa8c41"><b>NOT A GURU</b></font>',
                styles["callout_label"],
            ),
            Paragraph(
                "I'm not a real estate guru. I'm a licensed NC General Contractor "
                "(<b>#107724</b>) running actual jobsites across NC. "
                "My name is on the license — if the work's wrong, NC can pull it. "
                "Coaches don't have that downside.",
                styles["body"],
            ),
        ],
        [
            Paragraph(
                '<font color="#fa8c41"><b>I PAID TUITION YOU DON\'T HAVE TO</b></font>',
                styles["callout_label"],
            ),
            Paragraph(
                "I built this because I lost <b>over $100K on my own investing deals</b> when "
                "I first got into real estate 8 years ago — bad budget assumptions, wrong labor "
                "multipliers, missed permit timelines. The 9 risks in this PDF are what that "
                "$100K bought me.",
                styles["body"],
            ),
        ],
        [
            Paragraph(
                '<font color="#fa8c41"><b>NO ONE ELSE WILL DO THIS</b></font>',
                styles["callout_label"],
            ),
            Paragraph(
                "Most GCs won't review a property you don't own yet. <b>We will</b>, "
                "because we know exactly what costs investors money.",
                styles["body"],
            ),
        ],
    ]
    trust_tbl = Table(trust_rows, colWidths=[2.0 * inch, FRAME_W - 2.0 * inch])
    trust_tbl.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), ACCENT_LIGHT),
                ("LEFTPADDING", (0, 0), (-1, -1), 14),
                ("RIGHTPADDING", (0, 0), (-1, -1), 14),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LINEBEFORE", (0, 0), (0, -1), 3, ORANGE),
            ]
        )
    )
    story.append(trust_tbl)
    story.append(Spacer(1, 0.25 * inch))
    story.append(Paragraph("HOW TO KNOW IF YOUR DEAL IS EXPOSED", styles["page_eyebrow"]))
    story.append(Paragraph("Two paths.", styles["closing_h1"]))
    story.append(
        Paragraph(
            "<b>Path 1 — Run it yourself.</b> Use this PDF as a checklist. Walk every property "
            "you're underwriting and physically check for each of the 9 risks. This works if "
            "you have the construction background to spot them and the time to be thorough.",
            styles["body"],
        )
    )
    story.append(Spacer(1, 0.1 * inch))
    story.append(
        Paragraph(
            "<b>Path 2 — Have a licensed NC GC do it for you.</b> The <b>Investor Execution Review (CO1)</b> "
            "is what Southern Cities Construction does to check every single one of these on your specific "
            "deal — plus market-current labor pricing, permit-jurisdiction reality, and a structured risk "
            "score you can use to underwrite.",
            styles["body"],
        )
    )
    story.append(Spacer(1, 0.12 * inch))

    # CO1 CTA box — navy with orange accent
    co1_lines = [
        ('<font color="#fa8c41"><b>$499 FLAT FEE</b></font>',
         '<font color="#FFFFFF">Refundable as credit against any deeper engagement (Project Setup, Active Oversight, GC-Supported Build, or Full-Service GC).</font>'),
        ('<font color="#fa8c41"><b>48-HOUR TURNAROUND</b></font>',
         '<font color="#FFFFFF">Submit Friday morning, get the report by Tuesday.</font>'),
        ('<font color="#fa8c41"><b>PERFORMANCE GUARANTEE</b></font>',
         '<font color="#FFFFFF">If after our 24-hour intake we determine we cannot perform the standard review on your deal, full refund — no questions. Once we accept, we deliver.</font>'),
        ('<font color="#fa8c41"><b>NC GC LICENSE #107724</b></font>',
         '<font color="#FFFFFF">Real contractor, real liability. Not a coach, not a course.</font>'),
    ]
    cta_rows = []
    for label, body in co1_lines:
        cta_rows.append([
            Paragraph(label, styles["callout_label"]),
            Paragraph(body, styles["cta_body"]),
        ])
    cta_tbl = Table(cta_rows, colWidths=[2.0 * inch, FRAME_W - 2.0 * inch])
    cta_tbl.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), NAVY),
                ("LEFTPADDING", (0, 0), (-1, -1), 16),
                ("RIGHTPADDING", (0, 0), (-1, -1), 16),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    story.append(cta_tbl)
    story.append(Spacer(1, 0.2 * inch))
    story.append(
        Paragraph(
            "The only investors who pay $499 net are the ones who run the review <b>and</b> "
            "walk away from the deal — because the review found a $20K+ problem they didn't see, "
            "and the math no longer worked. In which case the $499 just saved them $5K – $50K.",
            styles["body"],
        )
    )
    story.append(Spacer(1, 0.15 * inch))
    story.append(
        Paragraph(
            "Get the Execution Review on your next deal:",
            styles["body"],
        )
    )
    url_para = Paragraph(
        '<font color="#fa8c41"><b>southerncitiesconstruction.com/platform/co1</b></font>',
        ParagraphStyle("url", fontName="Helvetica-Bold", fontSize=14, textColor=ORANGE, leading=18),
    )
    story.append(url_para)
    story.append(Spacer(1, 0.15 * inch))
    story.append(
        Paragraph(
            "Or reply to the email this PDF came in. We read every reply.",
            styles["body_muted"],
        )
    )
    story.append(Spacer(1, 0.3 * inch))
    story.append(
        Paragraph(
            "— Darius T. Walton<br/>"
            "<i>Founder, Southern Cities Construction</i><br/>"
            "<i>NC General Contractor License #107724</i><br/>"
            "southerncitiesconstruction.com · (980) 473-7249",
            styles["signature"],
        )
    )
    return story


# ============================================================
# Build
# ============================================================


def build():
    doc = BaseDocTemplate(
        OUTPUT_PDF,
        pagesize=LETTER,
        leftMargin=MARGIN_L,
        rightMargin=MARGIN_R,
        topMargin=MARGIN_T,
        bottomMargin=MARGIN_B,
        title="The 9 Execution Risks Killing NC Investor Deals in 2026",
        author="Darius T. Walton — Southern Cities Construction — NC GC License #107724",
        subject="A free GC-grade field guide for NC real estate investors",
    )

    cover_frame = Frame(0.85 * inch, 0.7 * inch, PAGE_W - 1.7 * inch, PAGE_H - 1.5 * inch, showBoundary=0)
    content_frame = Frame(MARGIN_L, MARGIN_B, FRAME_W, FRAME_H - 0.5 * inch, showBoundary=0)

    doc.addPageTemplates(
        [
            PageTemplate(id="cover", frames=[cover_frame], onPage=draw_cover_page),
            PageTemplate(id="content", frames=[content_frame], onPage=draw_content_page),
        ]
    )

    story = []
    story.extend(cover_story())
    story.extend(intro_story())

    # 9 risk pages
    story.extend(
        risk_page(
            1,
            "Labor market spike outpaced your per-sqft math",
            "Labor costs in North Carolina's metro submarkets have surged faster than national averages. "
            "Charlotte rough trade rates jumped roughly 28% from early 2024 to early 2026. Raleigh-Durham about 22%. "
            "Wilmington 18%. Most investors use a per-sqft rehab multiplier they wrote down on their last deal "
            "or learned from a national real estate podcast. That number is now stale by tens of thousands of dollars.",
            "Look at your most recent rehab budget. Was it built using a per-sqft number from a deal you did in "
            "2023 or 2024, or from a national source? If yes, it's stale.",
            "A 1,400 sqft cosmetic rehab that priced at $42K in 2024 is closer to <b>$54K – $58K</b> in early 2026. "
            "Same scope, same submarket. The investor who didn't update the multiplier is now <b>$12K – $16K over budget</b> "
            "before the first sub touches the property.",
            "Not directly — but your appraisal will. If you under-budgeted the rehab and the ARV doesn't actually "
            "materialize because you cut corners, the refi falls apart.",
        )
    )

    # Risk 2 — needs the jurisdiction table inline so handle specially
    story.append(
        Paragraph(
            '<font color="#fa8c41" size="32"><b>RISK 2</b></font>',
            ParagraphStyle("badge2", fontName="Helvetica-Bold", fontSize=32, leading=36, spaceAfter=2),
        )
    )
    story.append(Paragraph("Permit path is longer than you think", styles["h1"]))
    story.append(
        callout_box(
            "WHAT IT IS",
            "The classification of your rehab assumes a normal permit cycle. NC jurisdictions vary "
            "wildly — and the differences can blow your timeline by 6 to 12 weeks of additional holding cost.",
        )
    )
    story.append(Spacer(1, 0.1 * inch))
    story.append(jurisdiction_table())
    story.append(Spacer(1, 0.12 * inch))
    story.append(
        Paragraph(
            "If the work touches the structural envelope, has prior unpermitted work, or is in a backlogged "
            "jurisdiction, add 3 – 6 weeks.",
            styles["body_muted"],
        )
    )
    story.append(
        callout_box(
            "HOW TO SPOT IT IN 5 SECONDS",
            "Pull the property's permit history. If there's any structural work, addition, or square footage "
            "change in the last 30 years that doesn't have a permit, your moderate rehab classification was "
            "wrong from the start.",
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        callout_box(
            "WHAT IT COSTS",
            "6 weeks of additional holding cost on a $200K loan at 11% hard money interest = roughly <b>$2,500</b>. "
            "That's just carrying cost. Add lost weekly rent income for a BRRRR (<b>$6,000+</b>) and the impact "
            "on flip timeline (delayed sale = price reduction risk).",
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        callout_box(
            "WHY YOUR BUYER'S LENDER CARES",
            "Lenders won't extend draw deadlines indefinitely. Permit delays can force re-underwriting or "
            "higher carrying costs.",
        )
    )
    story.append(PageBreak())

    story.extend(
        risk_page(
            3,
            "Galvanized plumbing throughout",
            "Older NC properties built before roughly 1965 often have galvanized steel supply lines. "
            "They look intact from the outside but corrode internally. Water flow drops, leaks emerge, "
            "and any home inspector will flag them.",
            "Check under the kitchen sink or in the basement / crawl space. If the supply lines are dull, "
            "grayish-silver, threaded steel pipes (not shiny copper, not PEX, not white PVC) it's galvanized. "
            "Visible rust at the joints is the smoking gun. In listing photos, look at the basement / crawl "
            "space photos for any visible pipework.",
            "Full repipe of a 1,400-sqft single-family in Charlotte: <b>$8,000 – $15,000</b>. Includes labor, "
            "materials, drywall patch and paint where access was cut, and basic fixture reconnection.",
            "FHA and VA loans flag galvanized plumbing as a material defect. Most conventional lenders will "
            "require resolution before close. If your buyer is using FHA / VA financing, this single issue "
            "can kill your sale unless you repipe.",
        )
    )

    story.extend(
        risk_page(
            4,
            "Federal Pacific Stab-Lok or Zinsco electrical panel",
            "Two specific electrical panel brands are well-known fire hazards. <b>Federal Pacific Electric (FPE) "
            "Stab-Lok</b> panels have a documented history of breakers failing to trip under overload. "
            "<b>Zinsco</b> panels suffer from corrosion at the bus bar. Both are commonly found in NC homes "
            "built between roughly 1955 and 1985.",
            "Look at the listing photos for any image of the electrical panel. Federal Pacific panels say "
            "<b>Federal Pacific Electric</b> or <b>FPE</b> on the cover, often with red Stab-Lok branding inside. "
            "Zinsco panels say <b>Zinsco</b> or Sylvania (after the acquisition). Zinsco breakers are often "
            "distinctive multi-color (red, blue, green handles).",
            "Panel replacement in Charlotte: <b>$4,000 – $7,000</b> including service upgrade if needed "
            "(most older panels are 100-amp; modern 200-amp service is the standard target).",
            "Insurance companies refuse to underwrite homes with these panels. No insurance = no mortgage. "
            "FHA / VA / conventional all require resolution before close.",
        )
    )

    story.extend(
        risk_page(
            5,
            "Aluminum branch-circuit wiring",
            "Homes built roughly 1965 – 1975 in NC sometimes used aluminum wire for branch circuits instead "
            "of copper. Aluminum expands and contracts with temperature, loosening connections at outlets and "
            "switches. This causes overheating and is a documented fire hazard.",
            "Pull off any outlet cover plate. If the wires entering the outlet are dull silver-gray (instead "
            "of copper / orange-brown), it's aluminum branch-circuit wiring. In listing photos, look for the "
            "panel — if it's an older (1965 – 1975) panel, assume aluminum branch wiring is likely until verified.",
            "Two options:<br/>"
            "<b>Pigtailing</b> (copper-aluminum approved connectors at every outlet / switch): "
            "<b>$2,500 – $4,500</b> for a typical 3-bedroom home.<br/>"
            "<b>Full rewire</b> (replacing all branch circuits with copper): <b>$8,000 – $15,000</b>.<br/>"
            "Most buyers' lenders require at minimum pigtailing.",
            "Same as Risk 4 — insurance refuses to underwrite. Plus FHA flagging. The pigtail solution often "
            "satisfies lender requirements; full rewire is sometimes overkill but always safe.",
        )
    )

    story.extend(
        risk_page(
            6,
            "Polybutylene supply lines",
            "Polybutylene pipe was widely used for residential water supply in the US from roughly 1978 to 1995, "
            "including thousands of NC homes. It degrades from contact with chlorinated water. Failure is sudden — "
            "pipes burst with no warning. Class-action settlements ended decades ago, so the cost is fully on the owner.",
            "Polybutylene supply lines are <b>gray plastic</b> (sometimes blue or black). Look at the connections "
            "to the water heater, exposed pipes in the basement / crawl space, and connections under sinks. They look "
            "like gray plastic tubing with metal crimp rings. If you see this, it's polybutylene.",
            "Full repipe of a 1,400-sqft single-family in Charlotte: <b>$10,000 – $14,000</b>. Cost varies based on "
            "whether the existing PB is in walls (requiring drywall patch) or in accessible crawl space (cheaper).",
            "Polybutylene is flagged by most lenders and insurance companies. Often shows up on inspection reports "
            "as a material defect requiring resolution. A BRRRR refi where the appraiser sees PB and notes it on "
            "the report can force you to repipe before the refi clears.",
        )
    )

    story.extend(
        risk_page(
            7,
            "Roof past useful life when you budgeted partial repair",
            "You walked the property and the roof looks OK. You budgeted $3K – $5K for partial repair or patch. "
            "The inspection comes back saying the roof has 2 years of remaining life and the buyer's lender requires "
            "full replacement before close.",
            "Find the year the home was built. Asphalt shingle roofs typically last 20 – 25 years in NC's climate. "
            "If the home was built in 2000 and the current roof is original, it needs replacement. Look at the "
            "listing photos for an aerial / drone shot — granular loss, missing shingles, sagging ridges, and dark "
            "streaks (algae) all indicate end-of-life.",
            "Full roof replacement, 1,400-sqft single-family in Charlotte: <b>$12,000 – $18,000</b>. Varies based on "
            "roof complexity, decking condition, and material grade.",
            "Conventional lenders typically require a roof with at least 3 – 5 years of remaining life. FHA / VA "
            "require 2+ years. If the inspector calls it under, repairs or full replacement is required before close. "
            "You cannot close around it.",
        )
    )

    story.extend(
        risk_page(
            8,
            "Clay sewer line with root intrusion or collapse",
            "NC homes built before roughly 1980 often have <b>clay or Orangeburg (compressed tar paper)</b> sewer "
            "lines from house to street. Tree roots invade through joints. Sections collapse. You don't know it's "
            "an issue until a camera scope or until the line backs up. Often missed on standard home inspection "
            "because it requires specialty scope equipment.",
            "Look at the property's mature tree placement. If there are 20+ year-old trees within 30 feet of the "
            "sewer line (which typically runs from the house to the street at the front), assume there's potential. "
            "Ask the listing agent if a sewer scope was done. Listing photos rarely show this risk.",
            "Trenchless sewer line replacement (best case): <b>$6,000 – $9,000</b>. Full excavation replacement "
            "(worse case): <b>$10,000 – $18,000</b>. If the line runs under a driveway or hardscape that needs to "
            "be cut and replaced, add $3K – $8K.",
            "Sewer line issues that surface during the inspection period kill deals. Buyers can use this as a "
            "price-reduction lever or a walk-away trigger. If you discover it during your rehab, you eat it.",
        )
    )

    story.extend(
        risk_page(
            9,
            "HVAC sequencing trap",
            "The classification of your rehab assumes a normal trade sequence. HVAC is supposed to be roughed-in "
            "<b>before</b> drywall goes up. If you sequenced wrong — drywall first, then realized the HVAC needs "
            "additional ductwork — you're paying to cut, drop, and patch drywall, AND paying the HVAC crew a "
            "second mobilization fee. This is the most common sequencing error I see on investor rehabs in 2026.",
            "Look at your project schedule. If HVAC is scheduled AFTER drywall, it's wrong. If you're doing a "
            "kitchen relocation, basement build-out, or addition — any of these may require running new ductwork "
            "through existing wall cavities. That work has to happen BEFORE drywall is closed up.",
            "Rework: <b>$3,000 – $8,000</b> in patched drywall, repainting, and HVAC re-mobilization. Plus 1 – 2 "
            "weeks of additional schedule and the cascade impact on every downstream trade.",
            "They don't see the rework directly. But the schedule slip cascades into your draw schedule, holding "
            "costs, and potentially appraisal timing for BRRRR refi.",
        )
    )

    story.extend(cost_summary_story())
    story.extend(closing_story())

    doc.build(story)
    print(f"✓ PDF written: {OUTPUT_PDF}")
    print(f"  Size: {os.path.getsize(OUTPUT_PDF) / 1024:.1f}KB")


if __name__ == "__main__":
    build()
