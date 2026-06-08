#!/usr/bin/env python3
"""
"Same property. Three numbers at the table." — editorial / financial-document
style B2B ad for NC wholesalers.

Generates BOTH 1:1 (1080x1080) for Feed and 9:16 (1080x1920) for Stories/Reels.
"""
import os
from PIL import Image, ImageDraw, ImageFont

# Restrained palette — cream/navy/orange only, no red/amber alert colors
NAVY = (19, 36, 82)
ORANGE = (250, 140, 65)
CREAM = (248, 244, 237)
PAPER = (251, 249, 245)   # background
WHITE = (255, 255, 255)
INK = (24, 28, 38)
MUTED = (118, 122, 134)
HAIRLINE = (210, 206, 196)
HIGHLIGHT_BG = (244, 240, 230)  # subtle cream highlight for winner row

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "meta-ad-creatives")
F = "/System/Library/Fonts/Supplemental/"
LOGO_NAVY = os.path.join(ROOT, "public", "sc-construction-logo.png")

# Editorial typography: Georgia serif for the headline (newspaper feel),
# Arial sans for everything else (clean, modern brand DNA preserved)
GEORGIA_BOLD = "Georgia Bold.ttf"
BLACK = "Arial Black.ttf"
BOLD = "Arial Bold.ttf"
REG = "Arial.ttf"


def font(name, size):
    return ImageFont.truetype(F + name, size)


def tw(d, s, f):
    b = d.textbbox((0, 0), s, font=f)
    return b[2] - b[0]


def th(f):
    return f.size


def tracked(d, x, y, text, f, fill, spacing=2):
    """Render text with letter-spacing (tracking) for the editorial eyebrow."""
    cur_x = x
    for ch in text:
        d.text((cur_x, y), ch, font=f, fill=fill)
        cur_x += tw(d, ch, f) + spacing
    return cur_x  # return final x for chaining


def tracked_width(d, text, f, spacing=2):
    """Width of a tracked string."""
    w = sum(tw(d, ch, f) for ch in text) + spacing * (len(text) - 1)
    return w


# Three tiers — sharper descriptions, buyer-perspective
TIERS = [
    {"slot": "THE GUESS",     "desc": "Napkin off comps. Buyer brought a sharpie.",   "amt": "$8K",       "win": False},
    {"slot": "THE ESTIMATE",  "desc": "Comps + walk-through. Still his number.",      "amt": "$15K",      "win": False},
    {"slot": "THE STANDARD",  "desc": "GC walked it. GC signed it.", "amt": "$25–40K+", "win": True},
]


def render_tier_row(d, t, row_x0, row_x1, row_y, row_h, slot_w, amt_w, slot_size, desc_size, amt_size, is_highlighted):
    """Render one tier row in editorial financial-document style.

    Layout:  | THE SLOT    description text                         $AMT |
    Winner row has subtle cream highlight + orange amount.
    """
    if is_highlighted:
        d.rounded_rectangle([row_x0 - 16, row_y - 8, row_x1 + 16, row_y + row_h + 8],
                            radius=8, fill=HIGHLIGHT_BG)
    # slot column (left)
    fs = font(BOLD, slot_size)
    slot_color = ORANGE if t["win"] else NAVY
    d.text((row_x0, row_y + (row_h - slot_size) // 2 - 2), t["slot"], font=fs, fill=slot_color)
    # description column (middle, between slot and amount)
    fd = font(REG, desc_size)
    desc_x = row_x0 + slot_w + 28
    d.text((desc_x, row_y + (row_h - desc_size) // 2 - 1), t["desc"], font=fd, fill=INK if t["win"] else MUTED)
    # amount column (right-aligned, financial-document convention)
    fa = font(BLACK, amt_size)
    amt_w_actual = tw(d, t["amt"], fa)
    amt_color = ORANGE if t["win"] else NAVY
    d.text((row_x1 - amt_w_actual, row_y + (row_h - amt_size) // 2 - 4), t["amt"], font=fa, fill=amt_color)


def draw_top_bar(img, d, W, logo_size=44, license_text="NC GC LICENSE #107724"):
    """Slim navy header bar with logo + license — establishes authority."""
    bar_h = 76
    d.rectangle([0, 0, W, bar_h], fill=NAVY)
    # logo on left (need white/reverse — but we have navy logo so paste it differently)
    # use orange brand mark instead — just a small triangle or use existing logo
    lg = Image.open(LOGO_NAVY).convert("RGBA")
    r = logo_size / lg.height
    lg = lg.resize((int(lg.width * r), logo_size), Image.LANCZOS)
    # Logo on dark bg — keep navy/orange parts visible (it's a navy+orange logo on white,
    # which doesn't render great on navy bg). Use a cream backing chip:
    chip_pad = 8
    chip = Image.new("RGB", (lg.width + chip_pad * 2, lg.height + chip_pad * 2), CREAM)
    chip_draw = ImageDraw.Draw(chip)
    img.paste(chip, (28, (bar_h - chip.height) // 2))
    img.paste(lg, (28 + chip_pad, (bar_h - chip.height) // 2 + chip_pad), lg)
    # license text on right
    fl = font(BOLD, 16)
    label_w = tracked_width(d, license_text, fl, spacing=2)
    tracked(d, W - label_w - 32, (bar_h - 16) // 2, license_text, fl, CREAM, spacing=2)


def draw_bottom_credit(d, W, H, fill=MUTED):
    """Bottom editorial credit line."""
    fc = font(BOLD, 15)
    txt = "SOUTHERN CITIES CONSTRUCTION  ·  LICENSED NC GENERAL CONTRACTOR  ·  #107724"
    w = tracked_width(d, txt, fc, spacing=2)
    tracked(d, (W - w) // 2, H - 44, txt, fc, fill, spacing=2)


# -------- SQUARE (1080 x 1080) for Feed --------

def build_square():
    W = H = 1080
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)

    # navy top bar with logo + license
    draw_top_bar(img, d, W)

    # left/right gutter
    GUT = 80

    # ---- HOOK: targeting tag + giant dollar gap ----
    eb = font(BOLD, 22)
    eb_text = "FOR NC WHOLESALERS"
    tracked(d, GUT, 144, eb_text, eb, ORANGE, spacing=3)

    # The hook — biggest type on the canvas, the scroll-stopper
    fh = font(GEORGIA_BOLD, 86)
    d.text((GUT, 196), "$8K. $40K.", font=fh, fill=NAVY)
    d.text((GUT, 296), "Same property.", font=fh, fill=NAVY)

    # ---- BODY: the 3-tier comparison ----
    row_x0 = GUT
    row_x1 = W - GUT
    rows_top = 470
    row_h = 100
    row_gap = 28
    slot_w = 230

    for i, t in enumerate(TIERS):
        y = rows_top + i * (row_h + row_gap)
        if i > 0:
            d.line([row_x0, y - row_gap // 2, row_x1, y - row_gap // 2], fill=HAIRLINE, width=1)
        render_tier_row(
            d, t, row_x0, row_x1, y, row_h,
            slot_w=slot_w, amt_w=200,
            slot_size=28, desc_size=23, amt_size=48,
            is_highlighted=t["win"],
        )

    # ---- CTA: clear single action ----
    d.line([GUT, 900, W - GUT, 900], fill=NAVY, width=2)
    fc = font(BLACK, 28)
    cta = "GET THE PLAYBOOK"
    cta_w = tracked_width(d, cta, fc, spacing=3)
    cta_x = GUT
    tracked(d, cta_x, 932, cta, fc, NAVY, spacing=3)
    arrow_x = cta_x + cta_w + 18
    d.text((arrow_x, 926), "→", font=font(BLACK, 34), fill=ORANGE)
    # right-aligned helper
    fh2 = font(REG, 18)
    helper = "Free  ·  NC wholesalers only"
    d.text((W - GUT - tw(d, helper, fh2), 940), helper, font=fh2, fill=MUTED)

    # bottom credit line
    draw_bottom_credit(d, W, H)

    img.save(os.path.join(OUT, "wholesaler-tiers.png"))
    print("built wholesaler-tiers.png")


# -------- VERTICAL (1080 x 1920) for Stories / Reels --------

def build_vertical():
    W, H = 1080, 1920
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)

    # navy top bar with logo + license
    draw_top_bar(img, d, W, logo_size=48)

    GUT = 80

    # ---- HOOK: targeting tag + massive dollar gap ----
    eb = font(BOLD, 24)
    eb_text = "FOR NC WHOLESALERS"
    tracked(d, GUT, 220, eb_text, eb, ORANGE, spacing=3)

    # The hook — biggest type on the canvas
    fh = font(GEORGIA_BOLD, 108)
    d.text((GUT, 280), "$8K. $40K.", font=fh, fill=NAVY)
    fh2 = font(GEORGIA_BOLD, 96)
    d.text((GUT, 420), "Same property.", font=fh2, fill=NAVY)

    # ---- BODY: 3-tier comparison (stacked layout for vertical width) ----
    row_x0 = GUT
    row_x1 = W - GUT
    rows_top = 730
    row_h = 150
    row_gap = 60

    for i, t in enumerate(TIERS):
        y = rows_top + i * (row_h + row_gap)
        if i > 0:
            d.line([row_x0, y - row_gap // 2, row_x1, y - row_gap // 2], fill=HAIRLINE, width=1)
        if t["win"]:
            d.rounded_rectangle([row_x0 - 16, y - 14, row_x1 + 16, y + row_h + 14],
                                radius=10, fill=HIGHLIGHT_BG)
        fs = font(BOLD, 34)
        slot_color = ORANGE if t["win"] else NAVY
        d.text((row_x0, y + 6), t["slot"], font=fs, fill=slot_color)
        fd = font(REG, 28)
        desc_color = INK if t["win"] else MUTED
        d.text((row_x0, y + 56), t["desc"], font=fd, fill=desc_color)
        fa = font(BLACK, 64)
        amt_w = tw(d, t["amt"], fa)
        amt_color = ORANGE if t["win"] else NAVY
        d.text((row_x1 - amt_w, y + (row_h - 64) // 2 - 4), t["amt"], font=fa, fill=amt_color)

    # thicker rule before CTA
    d.line([GUT, 1680, W - GUT, 1680], fill=NAVY, width=2)

    # ---- CTA: single clear action ----
    fc = font(BLACK, 34)
    cta = "GET THE PLAYBOOK"
    cta_w = tracked_width(d, cta, fc, spacing=3)
    cta_x = GUT
    tracked(d, cta_x, 1720, cta, fc, NAVY, spacing=3)
    arrow_x = cta_x + cta_w + 22
    d.text((arrow_x, 1714), "→", font=font(BLACK, 42), fill=ORANGE)
    # helper sub-line
    fh2 = font(REG, 22)
    helper = "Free  ·  NC wholesalers only"
    d.text((GUT, 1782), helper, font=fh2, fill=MUTED)

    # bottom credit line
    draw_bottom_credit(d, W, H)

    img.save(os.path.join(OUT, "wholesaler-tiers-vertical.png"))
    print("built wholesaler-tiers-vertical.png")


if __name__ == "__main__":
    build_square()
    build_vertical()
    print(f"\n-> {OUT}")
