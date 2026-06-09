#!/usr/bin/env python3
"""
SCC-Hook-Scripts-v2.pdf — 7 talking-head wholesaler hooks
WITH verbal CTAs integrated into the spoken script (recording-ready).

Each script now has:
  1. HOOK CARD (silent text overlay, 3 sec)
  2. TALK TO CAMERA (continuous spoken text, ~22-30 sec)
     — Original talk + verbal CTA closer woven into one block
  3. CTA CARD (silent text overlay, 3 sec)
"""
import os
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak,
    KeepTogether,
)

NAVY = HexColor("#132452")
ORANGE = HexColor("#FA8C41")
CREAM = HexColor("#F8F4ED")
INK = HexColor("#1E2330")
GRAY = HexColor("#6E7280")
LIGHT_NAVY = HexColor("#E6EBF3")
LIGHT_ORANGE = HexColor("#FDF1E9")

OUT_PATH = "/Users/ashborn/.openclaw/workspace/southern-cities-construction/public/marketing/SCC-Hook-Scripts-v2.pdf"

# ============================================================================
# HOOK DATA — original talk + verbal CTA appended
# ============================================================================
HOOKS = [
    {
        "n": 11,
        "title": "Wholesaling isn't a numbers business. It's a construction business.",
        "vibe": "~28 sec · confident, counter-intuitive · Asher / Darius / any NC GC voice",
        "hook_card": ["Wholesaling isn't a", "numbers business.", "It's a construction business."],
        "talk": [
            "You think you found a deal? Cool. You ran comps? Great. None of that matters at the closing table. The buyer is going to walk the property and ask construction questions. The panel. The foundation. The roof. If you can't answer them, your rehab number doesn't hold — and your assignment doesn't hold.",
            "You're not in the numbers game. You're in the construction game. You just don't have a construction partner yet. The wholesalers who do? They walk in with as-built floorplans, elevations, a sworn budget, AND a GC ready to build it at that price. The buyer doesn't argue with that.",
        ],
        "verbal_cta": "Free playbook — what every NC wholesaler should know about putting a GC behind their number. Link below.",
        "cta_card": ["Get a licensed NC GC behind your number.", "Free playbook → NC wholesalers only", "NC GC License #107724"],
    },
    {
        "n": 21,
        "title": "Why does the same deal pay $8K to one wholesaler and $40K to another?",
        "vibe": "~28 sec · investigative tone · pairs well with 3-tier visual b-roll",
        "hook_card": ["Why does the same deal", "pay $8K to one wholesaler", "and $40K to another?"],
        "talk": [
            "Same Charlotte property. Same buyer pool. Same week. The first wholesaler walks out with eight grand. The third walks out with forty.",
            "What's different? Not the deal. Not the comps. Not the buyers. The only thing that's different is what's in the package on the closing table.",
            "Napkin number from the wholesaler gets chopped. Licensed GC who delivers as-built floorplans, elevations, an itemized budget, AND commits to do the work at that price? Buyer signs at the top of the range.",
        ],
        "verbal_cta": "That's the whole playbook. It's free. NC wholesalers only — link below.",
        "cta_card": ["GET THE PLAYBOOK →", "Free · NC wholesalers only", "NC GC License #107724"],
    },
    {
        "n": 23,
        "title": "What separates a $5K wholesaler from a $40K one?",
        "vibe": "~24 sec · identity hook · direct to camera, tight",
        "hook_card": ["What separates a $5K wholesaler", "from a $40K one?"],
        "talk": [
            "Not the deals they find. Not the lists they pull. Not their market.",
            "It's what's in the package. If you wrote the rehab number yourself, the buyer can argue. If a licensed GC wrote it, drew up as-built plans, and is going to build it for that price? The argument's over.",
            "That's the whole gap. Five grand to forty grand on the same property.",
        ],
        "verbal_cta": "How to write a number buyers can't argue with. Free playbook — link below.",
        "cta_card": ["How to write a number buyers can't argue with.", "Free playbook ↓", "NC GC License #107724"],
    },
    {
        "n": 24,
        "title": "What if the buyer COULDN'T argue with your rehab number?",
        "vibe": "~25 sec · aspirational, sets the desired state",
        "hook_card": ["What if the buyer", "COULDN'T argue with", "your rehab number?"],
        "talk": [
            "Imagine you walk into closing. You hand the buyer your assignment plus a folder that has as-built floorplans, elevations, an itemized rehab scope, and a licensed GC's signature committing to do the build at that price. He opens it. Reads it. Signs.",
            "No back-and-forth. No 'meet me at $5K.' No sharpie.",
            "The buyer isn't being asked to trust YOU. He's being asked to trust the builder who's going to do the build. That's different.",
        ],
        "verbal_cta": "It's called a GC-Verified Deal Pack. Whole framework's in the free playbook. Link below.",
        "cta_card": ["GC-Verified Deal Pack — built into a playbook.", "Free → NC wholesalers only", "NC GC License #107724"],
    },
    {
        "n": 25,
        "title": "I'm a licensed NC GC. Here's what I see at closing tables.",
        "vibe": "~30 sec · authority position · PERFECT for Asher / Darius as speaker",
        "hook_card": ["I'm a licensed NC GC.", "Here's what I see", "at closing tables."],
        "talk": [
            "A wholesaler brings a deal with a $35K rehab number. The buyer walks it. Sees the panel needs an upgrade. Sees the roof line is shot. Turns to the wholesaler: 'Your number's wrong. I'll do this at $5K assignment, not $25.'",
            "Wholesaler can't defend the number — he's not a contractor. He takes the $5K.",
            "Here's what changes when we get involved: we walk the property, deliver as-built floorplans and elevations, write the rehab budget, AND commit to do the work at that number. Now when the buyer pushes back, the answer is: 'we'll do it for this. That's how real it is.' He signs.",
        ],
        "verbal_cta": "You can book a Deal Pack. Or start with the free playbook. Link below — NC wholesalers only.",
        "cta_card": ["BOOK A DEAL PACK →", "Free playbook to start.", "NC GC License #107724"],
    },
    {
        "n": 26,
        "title": "Real talk — I lost $35K guessing the rehab.",
        "vibe": "~32 sec · testimonial confession · IDEAL: real wholesaler, not founder",
        "hook_card": ["Real talk —", "I lost $35K guessing the rehab."],
        "talk": [
            "I had a Charlotte property under contract. Did my comps. Ran my math. $45K rehab, I thought. Brought it to a cash buyer.",
            "He walked it ONCE. Started pointing at stuff I'd never looked at — the panel, the foundation, the roof tie-ins. By the time we got to the table he had me at $5K assignment instead of $25K.",
            "That happened three more times before I figured it out. The problem wasn't the deal. The problem was I was speaking the wrong language at the table.",
            "Now I bring a licensed NC GC to walk the property. They give me as-built floorplans, elevations, an itemized scope, and write the budget. AND they commit to do the work at that price. Buyer can argue with them or sign the check. They sign. Last three closings: $32K, $38K, $42K.",
        ],
        "verbal_cta": "I put the whole process in a free playbook. Link below — NC wholesalers only.",
        "cta_card": ["How I did it — in a free playbook.", "NC wholesalers only.", "NC GC License #107724"],
    },
    {
        "n": 32,
        "title": "We're a licensed NC GC. We'll write your rehab number AND build it.",
        "vibe": "~28 sec · brand-direct · founder voice (Asher/Darius)",
        "hook_card": ["We're a licensed NC GC.", "We'll write your rehab number", "AND build it."],
        "talk": [
            "Here's the offer. You bring us a wholesale deal. We walk the property. We deliver as-built floorplans and elevations. We write the rehab budget. We commit to do the work at that price.",
            "You walk into closing with a folder a buyer can't argue with — because the people who drew the plans and wrote the number are the people who'll show up Monday morning with the tools.",
            "Buyer signs. Deal closes at the top. Same property the next wholesaler walked away from with eight grand.",
        ],
        "verbal_cta": "Get a Deal Pack. Or grab the free playbook first. Link below — NC wholesalers only.",
        "cta_card": ["GET A DEAL PACK →", "Or grab the free playbook first.", "NC GC License #107724"],
    },
]

# ============================================================================
# STYLES
# ============================================================================
styles = getSampleStyleSheet()

H1 = ParagraphStyle("H1", parent=styles["Heading1"], fontName="Helvetica-Bold",
                    fontSize=20, textColor=NAVY, leading=24, spaceAfter=4, spaceBefore=0)
SUB = ParagraphStyle("SUB", parent=styles["Normal"], fontName="Helvetica",
                     fontSize=11, textColor=ORANGE, leading=14, spaceAfter=18, spaceBefore=0)
HOOK_NUM = ParagraphStyle("HOOK_NUM", parent=styles["Normal"], fontName="Helvetica-Bold",
                          fontSize=12, textColor=ORANGE, leading=15, spaceAfter=2)
HOOK_TITLE = ParagraphStyle("HOOK_TITLE", parent=styles["Heading2"], fontName="Helvetica-Bold",
                            fontSize=17, textColor=NAVY, leading=21, spaceAfter=3)
HOOK_VIBE = ParagraphStyle("HOOK_VIBE", parent=styles["Normal"], fontName="Helvetica",
                           fontSize=10, textColor=GRAY, leading=13, spaceAfter=14, italic=True)
SECTION_LABEL = ParagraphStyle("SECTION_LABEL", parent=styles["Normal"], fontName="Helvetica-Bold",
                               fontSize=10, textColor=ORANGE, leading=14, spaceAfter=5, spaceBefore=10)
HOOK_TEXT = ParagraphStyle("HOOK_TEXT", parent=styles["Normal"], fontName="Helvetica-Bold",
                           fontSize=16, textColor=NAVY, leading=22, spaceAfter=2)
TALK_TEXT = ParagraphStyle("TALK_TEXT", parent=styles["Normal"], fontName="Helvetica-Oblique",
                           fontSize=11.5, textColor=INK, leading=17, spaceAfter=10, spaceBefore=0)
TALK_CTA_TEXT = ParagraphStyle("TALK_CTA_TEXT", parent=styles["Normal"], fontName="Helvetica-BoldOblique",
                               fontSize=12, textColor=NAVY, leading=17, spaceAfter=6, spaceBefore=4,
                               leftIndent=8, borderColor=ORANGE, borderWidth=0,
                               borderPadding=0)
CTA_LINE = ParagraphStyle("CTA_LINE", parent=styles["Normal"], fontName="Helvetica-Bold",
                          fontSize=12, textColor=INK, leading=16, spaceAfter=2)
INTRO = ParagraphStyle("INTRO", parent=styles["Normal"], fontName="Helvetica",
                       fontSize=10.5, textColor=INK, leading=15, spaceAfter=10)
FOOT = ParagraphStyle("FOOT", parent=styles["Normal"], fontName="Helvetica",
                      fontSize=8, textColor=GRAY, leading=10, alignment=TA_LEFT)


# ============================================================================
# COMPONENTS
# ============================================================================
def header_band(canvas, doc):
    canvas.saveState()
    # Navy header band
    canvas.setFillColor(NAVY)
    canvas.rect(0, LETTER[1] - 70, LETTER[0], 70, fill=1, stroke=0)
    # Title
    canvas.setFillColor(CREAM)
    canvas.setFont("Helvetica-Bold", 13)
    canvas.drawString(0.5 * inch, LETTER[1] - 35, "SOUTHERN CITIES CONSTRUCTION")
    canvas.setFillColor(ORANGE)
    canvas.setFont("Helvetica", 10)
    canvas.drawString(0.5 * inch, LETTER[1] - 52, "Wholesaler Hook Scripts v2 · Recording-ready · 7 talking-head shoots")
    # License pill
    canvas.setFillColor(ORANGE)
    canvas.roundRect(LETTER[0] - 1.6 * inch, LETTER[1] - 47, 1.1 * inch, 22, 4, fill=1, stroke=0)
    canvas.setFillColor(CREAM)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawCentredString(LETTER[0] - 1.05 * inch, LETTER[1] - 40, "NC GC #107724")
    # Footer
    canvas.setFillColor(GRAY)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(0.5 * inch, 0.5 * inch,
        "Southern Cities Construction  ·  NC GC License #107724")
    canvas.drawRightString(LETTER[0] - 0.5 * inch, 0.5 * inch, f"Page {doc.page}")
    canvas.drawString(0.5 * inch, 0.36 * inch,
        "v2 — verbal CTAs integrated. Read the bold italic line at the end of each TALK to close the video.")
    canvas.restoreState()


def hook_card_block(lines):
    """Light navy block showing the silent hook card text."""
    text = "<br/>".join(lines)
    p = Paragraph(text, HOOK_TEXT)
    t = Table([[p]], colWidths=[6.8 * inch])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), LIGHT_NAVY),
        ("LEFTPADDING", (0, 0), (-1, -1), 18),
        ("RIGHTPADDING", (0, 0), (-1, -1), 18),
        ("TOPPADDING", (0, 0), (-1, -1), 14),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
        ("LINEBEFORE", (0, 0), (0, 0), 3, NAVY),
    ]))
    return t


def cta_card_block(lines):
    """Light orange block showing the silent CTA card text."""
    cta_para = Paragraph(lines[0], CTA_LINE)
    sub = Paragraph(f"<font color='#6E7280' size='10'>{lines[1]}</font>", CTA_LINE)
    lic = Paragraph(f"<font color='#6E7280' size='9'>{lines[2]}</font>", CTA_LINE)
    t = Table([[cta_para], [sub], [lic]], colWidths=[6.8 * inch])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), LIGHT_ORANGE),
        ("LEFTPADDING", (0, 0), (-1, -1), 18),
        ("RIGHTPADDING", (0, 0), (-1, -1), 18),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LINEBEFORE", (0, 0), (0, -1), 3, ORANGE),
    ]))
    t._argW = [6.8 * inch]
    return t


def verbal_cta_block(text):
    """Bold-italic line in a light orange band — the spoken CTA."""
    p = Paragraph(f"<b>{text}</b>", TALK_CTA_TEXT)
    t = Table([[p]], colWidths=[6.8 * inch])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), LIGHT_ORANGE),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ("LINEBEFORE", (0, 0), (0, 0), 3, ORANGE),
    ]))
    return t


# ============================================================================
# BUILD
# ============================================================================
def build():
    doc = SimpleDocTemplate(
        OUT_PATH, pagesize=LETTER,
        leftMargin=0.5 * inch, rightMargin=0.5 * inch,
        topMargin=0.95 * inch, bottomMargin=0.7 * inch,
    )
    story = []

    # Intro page
    story.append(Spacer(1, 0.1 * inch))
    story.append(Paragraph(
        "Seven talking-head scripts — <b>v2 with integrated verbal CTAs</b>. Each script now has the spoken CTA woven into the TALK block as a bold-italic closer. Read it naturally at the end; it lands just before the silent CTA card.",
        INTRO))
    story.append(Paragraph(
        "<b>The thread —</b> every script lands the same idea: a licensed NC GC writes the rehab budget AND commits to do the work at that price. That commitment makes the buyer sign without negotiating.",
        INTRO))
    story.append(Paragraph(
        "<b>Production tip —</b> shoot all 7 in one session. Same setup, same shirt, same window. ~45 min if you don't over-rehearse. Improvise around the script. <b>The bold-italic verbal CTA at the end is the only line you should land verbatim</b> — every other word is yours.",
        INTRO))
    story.append(Paragraph(
        "<b>Total spoken time per video:</b> ~22–32 seconds talk + 3 seconds silent CTA card = ~25–35 sec finished video.",
        INTRO))
    story.append(Spacer(1, 0.2 * inch))

    # Quick reference table
    ref_data = [["FORMAT", "SHOOT TIME", "GEAR", "SPEAKER"]]
    ref_data.append(["Talking head, 25–35 sec", "~10 min per video", "iPhone + lavalier", "Founder + 1 real wholesaler"])
    ref_table = Table(ref_data, colWidths=[1.8 * inch, 1.5 * inch, 1.5 * inch, 2.0 * inch])
    ref_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), CREAM),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("ALIGN", (0, 0), (-1, -1), "LEFT"),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [LIGHT_NAVY]),
        ("LINEABOVE", (0, 1), (-1, 1), 0.5, GRAY),
    ]))
    story.append(ref_table)
    story.append(PageBreak())

    # Each hook
    for h in HOOKS:
        block = []
        block.append(Paragraph(f"HOOK #{h['n']}", HOOK_NUM))
        block.append(Paragraph(h["title"], HOOK_TITLE))
        block.append(Paragraph(h["vibe"], HOOK_VIBE))

        block.append(Paragraph("① HOOK CARD · text on screen, 3 seconds, no voice", SECTION_LABEL))
        block.append(hook_card_block(h["hook_card"]))

        block.append(Paragraph("② TALK TO CAMERA · spoken naturally", SECTION_LABEL))
        for para in h["talk"]:
            block.append(Paragraph(f'"{para}"', TALK_TEXT))

        block.append(Paragraph("→ VERBAL CTA · read this verbatim (lands the action)", SECTION_LABEL))
        block.append(verbal_cta_block(h["verbal_cta"]))

        block.append(Paragraph("③ CTA CARD · text on screen, 3 seconds", SECTION_LABEL))
        block.append(cta_card_block(h["cta_card"]))

        story.append(KeepTogether(block))
        story.append(PageBreak())

    doc.build(story, onFirstPage=header_band, onLaterPages=header_band)
    print(f"✓ Built {OUT_PATH}")


if __name__ == "__main__":
    build()
