#!/usr/bin/env python3
"""
4 angle-specific static ads following the ad-creative skill's 5-angle framework.
Each ad targets a distinct motivation to click — same offer, different doors in.

Angles built here:
  1. PAIN — "Stop getting chopped at the table." (sharpie/chop emphasis)
  2. AUTHORITY — Quote from a licensed NC GC (insider voice)
  3. CONTRARIAN — "Wholesaling isn't a numbers business." (reframe poster)
  4. ASPIRATIONAL — "Buyer can't argue with this." (resolution moment)

(The OUTCOME angle is already covered by wholesaler-tiers.png.)

Each generates 1:1 (Feed) and 9:16 (Stories/Reels).
"""
import os
from PIL import Image, ImageDraw, ImageFont

# Brand palette — restrained
NAVY = (19, 36, 82)
ORANGE = (250, 140, 65)
CREAM = (248, 244, 237)
PAPER = (251, 249, 245)
WHITE = (255, 255, 255)
INK = (24, 28, 38)
MUTED = (118, 122, 134)
HAIRLINE = (210, 206, 196)
RED = (193, 60, 55)
RED_BG = (252, 240, 238)
HIGHLIGHT_BG = (244, 240, 230)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "meta-ad-creatives")
F = "/System/Library/Fonts/Supplemental/"
LOGO = os.path.join(ROOT, "public", "sc-construction-logo.png")

GEORGIA_BOLD = "Georgia Bold.ttf"
GEORGIA_ITAL = "Georgia Italic.ttf"
BLACK = "Arial Black.ttf"
BOLD = "Arial Bold.ttf"
REG = "Arial.ttf"


def font(name, size):
    return ImageFont.truetype(F + name, size)


def tw(d, s, f):
    b = d.textbbox((0, 0), s, font=f)
    return b[2] - b[0]


def tracked(d, x, y, text, f, fill, spacing=2):
    cur_x = x
    for ch in text:
        d.text((cur_x, y), ch, font=f, fill=fill)
        cur_x += tw(d, ch, f) + spacing
    return cur_x


def tracked_width(d, text, f, spacing=2):
    return sum(tw(d, ch, f) for ch in text) + spacing * (len(text) - 1)


def wrap_text(d, text, f, max_w):
    """Wrap text to fit max width, returning list of lines."""
    out, cur = [], ""
    for word in text.split():
        candidate = (cur + " " + word).strip()
        if tw(d, candidate, f) <= max_w:
            cur = candidate
        else:
            if cur:
                out.append(cur)
            cur = word
    if cur:
        out.append(cur)
    return out


def draw_top_bar(img, d, W, license_text="NC GC LICENSE #107724"):
    bar_h = 76
    d.rectangle([0, 0, W, bar_h], fill=NAVY)
    lg = Image.open(LOGO).convert("RGBA")
    r = 44 / lg.height
    lg = lg.resize((int(lg.width * r), 44), Image.LANCZOS)
    chip_pad = 8
    chip = Image.new("RGB", (lg.width + chip_pad * 2, lg.height + chip_pad * 2), CREAM)
    img.paste(chip, (28, (bar_h - chip.height) // 2))
    img.paste(lg, (28 + chip_pad, (bar_h - chip.height) // 2 + chip_pad), lg)
    fl = font(BOLD, 16)
    label_w = tracked_width(d, license_text, fl, spacing=2)
    tracked(d, W - label_w - 32, (bar_h - 16) // 2, license_text, fl, CREAM, spacing=2)


def draw_bottom_credit(d, W, H, fill=MUTED):
    fc = font(BOLD, 15)
    txt = "SOUTHERN CITIES CONSTRUCTION  ·  LICENSED NC GENERAL CONTRACTOR  ·  #107724"
    w = tracked_width(d, txt, fc, spacing=2)
    tracked(d, (W - w) // 2, H - 44, txt, fc, fill, spacing=2)


def draw_text_cta(d, x, y, label, helper, W, label_size=26, helper_size=18):
    """Editorial text CTA — tracked all-caps + small helper line."""
    fc = font(BLACK, label_size)
    cta_w = tracked_width(d, label, fc, spacing=3)
    tracked(d, x, y, label, fc, NAVY, spacing=3)
    d.text((x + cta_w + 16, y - 4), "→", font=font(BLACK, label_size + 8), fill=ORANGE)
    if helper:
        fh = font(REG, helper_size)
        d.text((W - 80 - tw(d, helper, fh), y + 8), helper, font=fh, fill=MUTED)


# ============================================================================
# ANGLE 1: PAIN — "Stop getting chopped at the table."
# ============================================================================

def build_pain_square():
    W = H = 1080
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)
    draw_top_bar(img, d, W)
    GUT = 80

    # eyebrow
    eb = font(BOLD, 20)
    tracked(d, GUT, 144, "FOR NC WHOLESALERS  ·  ASSIGNMENT DEFENSE", eb, ORANGE, spacing=3)

    # Massive serif headline (4-line)
    fh = font(GEORGIA_BOLD, 78)
    d.text((GUT, 196), "Stop getting", font=fh, fill=NAVY)
    d.text((GUT, 290), "chopped", font=fh, fill=RED)
    d.text((GUT, 384), "at the table.", font=fh, fill=NAVY)

    # Stat callout — red callout box
    callout_y = 530
    cw, ch = W - GUT * 2, 96
    d.rounded_rectangle([GUT, callout_y, GUT + cw, callout_y + ch], radius=12, fill=RED_BG)
    d.rounded_rectangle([GUT, callout_y, GUT + 6, callout_y + ch], radius=3, fill=RED)
    fs = font(BLACK, 38)
    stat = "$32,000"
    d.text((GUT + 28, callout_y + 22), stat, font=fs, fill=RED)
    fst = font(REG, 18)
    d.text((GUT + 28, callout_y + 64),
           "leaves the NC closing table every week.",
           font=fst, fill=INK)

    # Body explanation — small editorial line
    d.line([GUT, 680, W - GUT, 680], fill=HAIRLINE, width=1)
    fk = font(REG, 22)
    d.text((GUT, 706),
           "The wholesalers keeping it have a licensed NC GC walk the",
           font=fk, fill=MUTED)
    d.text((GUT, 736),
           "property, deliver as-built plans, and commit to build at that",
           font=fk, fill=MUTED)
    d.text((GUT, 766),
           "price. The buyer can't argue with a number a builder backs.",
           font=fk, fill=MUTED)

    # CTA
    d.line([GUT, 900, W - GUT, 900], fill=NAVY, width=2)
    draw_text_cta(d, GUT, 932, "END THE NEGOTIATION",
                  "Free  ·  NC wholesalers only", W)

    draw_bottom_credit(d, W, H)
    img.save(os.path.join(OUT, "ad-pain.png"))
    print("built ad-pain.png")


def build_pain_vertical():
    W, H = 1080, 1920
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)
    draw_top_bar(img, d, W)
    GUT = 80

    eb = font(BOLD, 22)
    tracked(d, GUT, 230, "FOR NC WHOLESALERS  ·  ASSIGNMENT DEFENSE", eb, ORANGE, spacing=3)

    fh = font(GEORGIA_BOLD, 104)
    d.text((GUT, 290), "Stop", font=fh, fill=NAVY)
    d.text((GUT, 410), "getting", font=fh, fill=NAVY)
    d.text((GUT, 530), "chopped", font=fh, fill=RED)
    d.text((GUT, 650), "at the table.", font=fh, fill=NAVY)

    # Red callout box
    callout_y = 880
    cw, ch = W - GUT * 2, 150
    d.rounded_rectangle([GUT, callout_y, GUT + cw, callout_y + ch], radius=14, fill=RED_BG)
    d.rounded_rectangle([GUT, callout_y, GUT + 6, callout_y + ch], radius=3, fill=RED)
    fs = font(BLACK, 54)
    d.text((GUT + 32, callout_y + 28), "$32,000", font=fs, fill=RED)
    fst = font(REG, 24)
    d.text((GUT + 32, callout_y + 96),
           "leaves the NC closing table every week.",
           font=fst, fill=INK)

    d.line([GUT, 1110, W - GUT, 1110], fill=HAIRLINE, width=1)
    fk = font(REG, 28)
    d.text((GUT, 1146),
           "The wholesalers keeping it have a licensed NC",
           font=fk, fill=MUTED)
    d.text((GUT, 1184),
           "GC walk the property, deliver as-built plans,",
           font=fk, fill=MUTED)
    d.text((GUT, 1222),
           "and commit to build at that price.",
           font=fk, fill=MUTED)
    d.text((GUT, 1260),
           "The buyer can't argue with what a builder backs.",
           font=fk, fill=MUTED)

    d.line([GUT, 1680, W - GUT, 1680], fill=NAVY, width=2)
    draw_text_cta(d, GUT, 1720, "END THE NEGOTIATION",
                  "Free  ·  NC wholesalers only", W,
                  label_size=32, helper_size=22)

    draw_bottom_credit(d, W, H)
    img.save(os.path.join(OUT, "ad-pain-vertical.png"))
    print("built ad-pain-vertical.png")


# ============================================================================
# ANGLE 3: AUTHORITY — "From a licensed NC GC"
# ============================================================================

def build_authority_square():
    W = H = 1080
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)
    draw_top_bar(img, d, W)
    GUT = 80

    eb = font(BOLD, 20)
    tracked(d, GUT, 144, "FROM A LICENSED NC GENERAL CONTRACTOR", eb, ORANGE, spacing=3)

    # Big opening quote mark
    fq = font(GEORGIA_BOLD, 200)
    d.text((GUT - 8, 175), "“", font=fq, fill=ORANGE)

    # The pull quote (Georgia italic for editorial feel)
    fpq = font(GEORGIA_ITAL, 44)
    quote_lines = [
        "I watch wholesalers get",
        "their assignments cut by",
        "70% at closing tables.",
        "Every. Single. Week.",
    ]
    qy = 280
    for ln in quote_lines:
        d.text((GUT, qy), ln, font=fpq, fill=NAVY)
        qy += 56

    # Closing quote
    d.text((qy - 60, qy - 60), "”", font=font(GEORGIA_BOLD, 80), fill=ORANGE)

    # Byline / attribution
    d.line([GUT, 590, GUT + 200, 590], fill=NAVY, width=2)
    fba = font(BOLD, 18)
    d.text((GUT, 606), "ASHER WALTON  ·  LICENSED NC GC #107724", font=fba, fill=INK)
    fbs = font(REG, 16)
    d.text((GUT, 632), "Southern Cities Construction  ·  Charlotte, NC", font=fbs, fill=MUTED)

    # Subhead
    d.line([GUT, 710, W - GUT, 710], fill=HAIRLINE, width=1)
    fk = font(BOLD, 24)
    d.text((GUT, 736), "Here's what stops it:", font=fk, fill=NAVY)

    # 4 deliverables stack
    items = [
        "A licensed NC GC walks the property",
        "As-built floorplans + elevations delivered",
        "Itemized rehab budget written",
        "GC commits to do the work at that price",
    ]
    fitem = font(REG, 19)
    yy = 776
    for i, item in enumerate(items, 1):
        # numbered badge
        d.ellipse([GUT, yy, GUT + 26, yy + 26], fill=ORANGE)
        d.text((GUT + 9, yy + 4), str(i), font=font(BOLD, 16), fill=WHITE)
        d.text((GUT + 42, yy + 3), item, font=fitem, fill=INK)
        yy += 32

    d.line([GUT, 920, W - GUT, 920], fill=NAVY, width=2)
    draw_text_cta(d, GUT, 952, "GET THE PLAYBOOK",
                  "Free  ·  NC wholesalers only", W, label_size=22)

    draw_bottom_credit(d, W, H)
    img.save(os.path.join(OUT, "ad-authority.png"))
    print("built ad-authority.png")


def build_authority_vertical():
    W, H = 1080, 1920
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)
    draw_top_bar(img, d, W)
    GUT = 80

    eb = font(BOLD, 22)
    tracked(d, GUT, 220, "FROM A LICENSED NC GENERAL CONTRACTOR", eb, ORANGE, spacing=3)

    fq = font(GEORGIA_BOLD, 260)
    d.text((GUT - 10, 250), "“", font=fq, fill=ORANGE)

    fpq = font(GEORGIA_ITAL, 58)
    quote_lines = [
        "I watch wholesalers",
        "get their assignments",
        "cut by 70% at closing",
        "tables. Every. Single.",
        "Week.",
    ]
    qy = 460
    for ln in quote_lines:
        d.text((GUT, qy), ln, font=fpq, fill=NAVY)
        qy += 76

    d.line([GUT, 900, GUT + 250, 900], fill=NAVY, width=2)
    fba = font(BOLD, 22)
    d.text((GUT, 920), "ASHER WALTON  ·  LICENSED NC GC #107724", font=fba, fill=INK)
    fbs = font(REG, 19)
    d.text((GUT, 952), "Southern Cities Construction  ·  Charlotte, NC", font=fbs, fill=MUTED)

    d.line([GUT, 1050, W - GUT, 1050], fill=HAIRLINE, width=1)
    fk = font(BOLD, 30)
    d.text((GUT, 1080), "Here's what stops it:", font=fk, fill=NAVY)

    items = [
        "A licensed NC GC walks the property",
        "As-built floorplans + elevations delivered",
        "Itemized rehab budget written",
        "GC commits to do the work at that price",
    ]
    fitem = font(REG, 25)
    yy = 1140
    for i, item in enumerate(items, 1):
        d.ellipse([GUT, yy, GUT + 36, yy + 36], fill=ORANGE)
        d.text((GUT + 13, yy + 6), str(i), font=font(BOLD, 22), fill=WHITE)
        d.text((GUT + 52, yy + 4), item, font=fitem, fill=INK)
        yy += 46

    d.line([GUT, 1680, W - GUT, 1680], fill=NAVY, width=2)
    draw_text_cta(d, GUT, 1720, "GET THE PLAYBOOK",
                  "Free  ·  NC wholesalers only", W, label_size=30, helper_size=22)

    draw_bottom_credit(d, W, H)
    img.save(os.path.join(OUT, "ad-authority-vertical.png"))
    print("built ad-authority-vertical.png")


# ============================================================================
# ANGLE 4: CONTRARIAN — "Wholesaling isn't a numbers business"
# ============================================================================

def build_contrarian_square():
    W = H = 1080
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)
    draw_top_bar(img, d, W)
    GUT = 80

    eb = font(BOLD, 20)
    tracked(d, GUT, 144, "FOR NC WHOLESALERS  ·  HOT TAKE", eb, ORANGE, spacing=3)

    # Headline — strikethrough effect via two overlay lines
    fh = font(GEORGIA_BOLD, 60)
    line1_text = "Wholesaling isn't a"
    line1_x, line1_y = GUT, 200
    d.text((line1_x, line1_y), line1_text, font=fh, fill=NAVY)

    strike_text = "numbers business."
    sx, sy = GUT, 268
    d.text((sx, sy), strike_text, font=fh, fill=MUTED)
    # strikethrough
    sw = tw(d, strike_text, fh)
    d.line([sx - 4, sy + 38, sx + sw + 4, sy + 38], fill=RED, width=5)

    # Resolution line — in orange, bigger
    fh2 = font(GEORGIA_BOLD, 76)
    d.text((GUT, 380), "It's a", font=fh2, fill=NAVY)
    d.text((GUT, 472), "construction", font=fh2, fill=ORANGE)
    d.text((GUT, 564), "business.", font=fh2, fill=NAVY)

    # Subhead body
    d.line([GUT, 720, W - GUT, 720], fill=HAIRLINE, width=1)
    fk = font(REG, 22)
    d.text((GUT, 746),
           "You ran comps. You did the math. None of that matters at",
           font=fk, fill=MUTED)
    d.text((GUT, 776),
           "closing — the buyer asks construction questions. If you",
           font=fk, fill=MUTED)
    d.text((GUT, 806),
           "can't answer them, your assignment doesn't hold.",
           font=fk, fill=MUTED)

    d.line([GUT, 900, W - GUT, 900], fill=NAVY, width=2)
    draw_text_cta(d, GUT, 932, "GET THE PLAYBOOK",
                  "Free  ·  NC wholesalers only", W)

    draw_bottom_credit(d, W, H)
    img.save(os.path.join(OUT, "ad-contrarian.png"))
    print("built ad-contrarian.png")


def build_contrarian_vertical():
    W, H = 1080, 1920
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)
    draw_top_bar(img, d, W)
    GUT = 80

    eb = font(BOLD, 22)
    tracked(d, GUT, 220, "FOR NC WHOLESALERS  ·  HOT TAKE", eb, ORANGE, spacing=3)

    fh = font(GEORGIA_BOLD, 84)
    d.text((GUT, 290), "Wholesaling", font=fh, fill=NAVY)
    d.text((GUT, 386), "isn't a", font=fh, fill=NAVY)
    strike_text = "numbers"
    sx, sy = GUT, 482
    d.text((sx, sy), strike_text, font=fh, fill=MUTED)
    sw = tw(d, strike_text, fh)
    d.line([sx - 6, sy + 52, sx + sw + 6, sy + 52], fill=RED, width=7)
    strike_text2 = "business."
    sy2 = 578
    d.text((sx, sy2), strike_text2, font=fh, fill=MUTED)
    sw2 = tw(d, strike_text2, fh)
    d.line([sx - 6, sy2 + 52, sx + sw2 + 6, sy2 + 52], fill=RED, width=7)

    # The resolution
    fh2 = font(GEORGIA_BOLD, 100)
    d.text((GUT, 720), "It's a", font=fh2, fill=NAVY)
    d.text((GUT, 840), "construction", font=fh2, fill=ORANGE)
    d.text((GUT, 960), "business.", font=fh2, fill=NAVY)

    d.line([GUT, 1180, W - GUT, 1180], fill=HAIRLINE, width=1)
    fk = font(REG, 28)
    d.text((GUT, 1216),
           "You ran comps. You did the math.",
           font=fk, fill=MUTED)
    d.text((GUT, 1254),
           "None of that matters at closing — the buyer",
           font=fk, fill=MUTED)
    d.text((GUT, 1292),
           "asks construction questions.",
           font=fk, fill=MUTED)
    d.text((GUT, 1330),
           "If you can't answer them,",
           font=fk, fill=MUTED)
    d.text((GUT, 1368),
           "your assignment doesn't hold.",
           font=fk, fill=MUTED)

    d.line([GUT, 1680, W - GUT, 1680], fill=NAVY, width=2)
    draw_text_cta(d, GUT, 1720, "GET THE PLAYBOOK",
                  "Free  ·  NC wholesalers only", W, label_size=30, helper_size=22)

    draw_bottom_credit(d, W, H)
    img.save(os.path.join(OUT, "ad-contrarian-vertical.png"))
    print("built ad-contrarian-vertical.png")


# ============================================================================
# ANGLE 5: ASPIRATIONAL — "Buyer can't argue with this"
# ============================================================================

def build_aspirational_square():
    W = H = 1080
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)
    draw_top_bar(img, d, W)
    GUT = 80

    eb = font(BOLD, 20)
    tracked(d, GUT, 144, "THE GC-VERIFIED DEAL PACK", eb, ORANGE, spacing=3)

    # Headline
    fh = font(GEORGIA_BOLD, 62)
    d.text((GUT, 196), "Hand him a folder.", font=fh, fill=NAVY)
    d.text((GUT, 276), "He signs.", font=fh, fill=ORANGE)

    # Subhead
    d.line([GUT, 388, W - GUT, 388], fill=HAIRLINE, width=1)
    fk = font(REG, 22)
    d.text((GUT, 414),
           "The wholesalers closing $25–40K+ assignments don't",
           font=fk, fill=MUTED)
    d.text((GUT, 444),
           "negotiate. They hand the buyer a 4-piece Deal Pack.",
           font=fk, fill=MUTED)

    # 4 deliverables in card-like layout
    card_x = GUT
    card_y = 510
    card_w = W - GUT * 2
    cell_h = 90

    items = [
        ("01", "AS-BUILT FLOORPLANS", "Stamped architectural drawings of the property as it stands."),
        ("02", "AS-BUILT ELEVATIONS", "All four sides. What the buyer can reference for permits."),
        ("03", "ITEMIZED REHAB BUDGET", "Line-by-line scope from a licensed NC GC. Sworn budget range."),
        ("04", "BUILD COMMITMENT", "We do the work at that price. The GC stamp is on the build."),
    ]

    yy = card_y
    for num, title, body in items:
        # number badge
        d.rounded_rectangle([card_x, yy, card_x + 60, yy + 60], radius=8, fill=NAVY)
        fn = font(BLACK, 22)
        d.text((card_x + 14, yy + 16), num, font=fn, fill=ORANGE)
        # title + body
        ftitle = font(BOLD, 18)
        d.text((card_x + 80, yy + 8), title, font=ftitle, fill=NAVY)
        fbody = font(REG, 16)
        d.text((card_x + 80, yy + 36), body, font=fbody, fill=MUTED)
        yy += 80

    d.line([GUT, 880, W - GUT, 880], fill=NAVY, width=2)
    draw_text_cta(d, GUT, 912, "GET THE DEAL PACK",
                  "Free playbook  ·  NC wholesalers only", W, label_size=24)

    draw_bottom_credit(d, W, H)
    img.save(os.path.join(OUT, "ad-aspirational.png"))
    print("built ad-aspirational.png")


def build_aspirational_vertical():
    W, H = 1080, 1920
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)
    draw_top_bar(img, d, W)
    GUT = 80

    eb = font(BOLD, 22)
    tracked(d, GUT, 220, "THE GC-VERIFIED DEAL PACK", eb, ORANGE, spacing=3)

    fh = font(GEORGIA_BOLD, 92)
    d.text((GUT, 290), "Hand him a", font=fh, fill=NAVY)
    d.text((GUT, 400), "folder.", font=fh, fill=NAVY)
    d.text((GUT, 540), "He signs.", font=fh, fill=ORANGE)

    d.line([GUT, 720, W - GUT, 720], fill=HAIRLINE, width=1)
    fk = font(REG, 28)
    d.text((GUT, 756),
           "The wholesalers closing $25–40K+",
           font=fk, fill=MUTED)
    d.text((GUT, 794),
           "assignments don't negotiate.",
           font=fk, fill=MUTED)
    d.text((GUT, 832),
           "They hand the buyer a 4-piece Deal Pack:",
           font=fk, fill=MUTED)

    items = [
        ("01", "AS-BUILT FLOORPLANS", "Stamped architectural drawings."),
        ("02", "AS-BUILT ELEVATIONS", "All four sides for permits."),
        ("03", "ITEMIZED REHAB BUDGET", "Sworn line-by-line GC scope."),
        ("04", "BUILD COMMITMENT", "We do the work at that price."),
    ]

    yy = 940
    for num, title, body in items:
        d.rounded_rectangle([GUT, yy, GUT + 80, yy + 80], radius=10, fill=NAVY)
        fn = font(BLACK, 28)
        d.text((GUT + 18, yy + 22), num, font=fn, fill=ORANGE)
        ftitle = font(BOLD, 24)
        d.text((GUT + 100, yy + 12), title, font=ftitle, fill=NAVY)
        fbody = font(REG, 20)
        d.text((GUT + 100, yy + 46), body, font=fbody, fill=MUTED)
        yy += 110

    d.line([GUT, 1680, W - GUT, 1680], fill=NAVY, width=2)
    draw_text_cta(d, GUT, 1720, "GET THE DEAL PACK",
                  "Free playbook  ·  NC wholesalers only", W, label_size=30, helper_size=22)

    draw_bottom_credit(d, W, H)
    img.save(os.path.join(OUT, "ad-aspirational-vertical.png"))
    print("built ad-aspirational-vertical.png")


# ============================================================================

if __name__ == "__main__":
    build_pain_square()
    build_pain_vertical()
    build_authority_square()
    build_authority_vertical()
    build_contrarian_square()
    build_contrarian_vertical()
    build_aspirational_square()
    build_aspirational_vertical()
    print(f"\n-> {OUT}")
