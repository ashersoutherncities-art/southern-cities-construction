#!/usr/bin/env python3
"""
End-card v2 — editorial, no button, headline-driven.

Design philosophy (per ad-creative skill + The Standard brand brief):
  - No commercial buttons — Meta's native CTA button handles the action
  - The end card's job is to LAND the message in the 3-sec freeze
  - Wall Street Journal magazine aesthetic: serif headline + tracked eyebrow
  - Editorial decorative element: orange embossed seal (echoes Deal Pack)
  - License compliance: always visible
  - Build to a standard

Output: public/marketing/end-cards/end-card-hook-XX.png (1080x1080)
"""
import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

NAVY = (19, 36, 82)
NAVY_DEEP = (12, 22, 50)
NAVY_INK = (8, 14, 32)
ORANGE = (250, 140, 65)
ORANGE_DEEP = (220, 110, 45)
CREAM = (248, 244, 237)
WHITE = (255, 255, 255)
MUTED = (175, 185, 210)
PAPER_RULE = (140, 95, 50)

ROOT = "/Users/ashborn/.openclaw/workspace/southern-cities-construction"
OUT_DIR = os.path.join(ROOT, "public/marketing/end-cards")
os.makedirs(OUT_DIR, exist_ok=True)

F = "/System/Library/Fonts/Supplemental/"
GEORGIA_BOLD = "Georgia Bold.ttf"
GEORGIA = "Georgia.ttf"
GEORGIA_ITALIC = "Georgia Italic.ttf"
BLACK = "Arial Black.ttf"
BOLD = "Arial Bold.ttf"
REG = "Arial.ttf"

W, H = 1080, 1080
GUT = 80


# ============================================================================
# THE 7 END CARDS — copy per hook
# ============================================================================
END_CARDS = [
    {
        "n": 11,
        "eyebrow": "STOP GETTING CHOPPED",
        "headline_lines": ["Get a licensed", "NC GC behind", "your number."],
        "tagline": "FREE PLAYBOOK  ·  NC WHOLESALERS ONLY",
    },
    {
        "n": 21,
        "eyebrow": "SAME DEAL · DIFFERENT PAYDAYS",
        "headline_lines": ["Get the", "playbook."],
        "tagline": "FREE  ·  FOR NC WHOLESALERS ONLY",
    },
    {
        "n": 23,
        "eyebrow": "WHAT THE $40K WHOLESALER DOES",
        "headline_lines": ["Write a number", "buyers can't", "argue with."],
        "tagline": "FREE PLAYBOOK  ·  NC WHOLESALERS ONLY",
    },
    {
        "n": 24,
        "eyebrow": "THE FOLDER THAT ENDS THE FIGHT",
        "headline_lines": ["GC-Verified", "Deal Pack."],
        "tagline": "BUILT INTO A FREE PLAYBOOK  ·  NC WHOLESALERS",
    },
    {
        "n": 25,
        "eyebrow": "FROM A LICENSED NC GC",
        "headline_lines": ["Book a", "Deal Pack."],
        "tagline": "START WITH THE FREE PLAYBOOK  ·  NC WHOLESALERS",
    },
    {
        "n": 26,
        "eyebrow": "THE PROCESS THAT CLOSED $42K",
        "headline_lines": ["How I did it.", "Free playbook."],
        "tagline": "NC WHOLESALERS ONLY",
    },
    {
        "n": 32,
        "eyebrow": "WE WRITE IT.  WE BUILD IT.",
        "headline_lines": ["Get a", "Deal Pack."],
        "tagline": "START WITH THE FREE PLAYBOOK  ·  NC WHOLESALERS",
    },
]


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


def tracked_width(d, text, f, spacing=2):
    return sum(tw(d, ch, f) for ch in text) + spacing * (len(text) - 1)


def draw_embossed_seal(img, cx, cy, radius=110, color=ORANGE, opacity=215):
    """Subtle embossed wax seal — echoes the Deal Pack folder seal in the video."""
    seal = Image.new("RGBA", (radius * 3, radius * 3), (0, 0, 0, 0))
    sd = ImageDraw.Draw(seal)

    # Soft outer glow shadow
    shadow = Image.new("RGBA", (radius * 3, radius * 3), (0, 0, 0, 0))
    shd = ImageDraw.Draw(shadow)
    shd.ellipse([radius // 2 + 8, radius // 2 + 14, radius * 5 // 2 + 8, radius * 5 // 2 + 14],
                fill=(0, 0, 0, 120))
    shadow = shadow.filter(ImageFilter.GaussianBlur(18))
    seal.paste(shadow, (0, 0), shadow)

    # Seal body — soft gradient circle (orange wax look)
    for r in range(radius, 0, -2):
        a = max(opacity - (radius - r) * 2, 30)
        if r > radius - 6:
            c = (180, 80, 30, a)  # darker rim
        elif r > radius - 14:
            c = (215, 105, 45, a)
        else:
            c = (*color, a)
        sd.ellipse([radius * 3 // 2 - r, radius * 3 // 2 - r,
                    radius * 3 // 2 + r, radius * 3 // 2 + r], fill=c)

    # Small inner ring
    sd.ellipse([radius * 3 // 2 - radius + 22, radius * 3 // 2 - radius + 22,
                radius * 3 // 2 + radius - 22, radius * 3 // 2 + radius - 22],
               outline=(120, 60, 25, 180), width=2)

    # Tiny center text (NC GC license number — micro detail)
    try:
        sf = ImageFont.truetype(F + "Arial Bold.ttf", 14)
        seal_text = "NC GC"
        bbox = sd.textbbox((0, 0), seal_text, font=sf)
        tw_, th_ = bbox[2] - bbox[0], bbox[3] - bbox[1]
        sd.text((radius * 3 // 2 - tw_ // 2, radius * 3 // 2 - th_ // 2 - 14),
                seal_text, font=sf, fill=CREAM)
        seal_text2 = "#107724"
        bbox2 = sd.textbbox((0, 0), seal_text2, font=sf)
        tw2_, th2_ = bbox2[2] - bbox2[0], bbox2[3] - bbox2[1]
        sd.text((radius * 3 // 2 - tw2_ // 2, radius * 3 // 2 - th2_ // 2 + 6),
                seal_text2, font=sf, fill=CREAM)
    except Exception:
        pass

    # Paste seal onto main image
    img.paste(seal, (cx - radius * 3 // 2, cy - radius * 3 // 2), seal)


def build_card(card):
    n = card["n"]

    # ============== BACKGROUND ==============
    img = Image.new("RGB", (W, H), NAVY_DEEP)

    # Subtle warm glow from bottom right (matches video hero spotlight)
    spotlight = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(spotlight)
    cx, cy = W - 50, H - 50
    for r in range(800, 0, -8):
        a = max(0, int(40 - r * 0.045))
        if a == 0:
            continue
        sd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 195, 130, a))
    spotlight = spotlight.filter(ImageFilter.GaussianBlur(70))
    img.paste(spotlight, (0, 0), spotlight)

    # Even more subtle film grain noise for editorial feel
    # (skip implementation — extra weight)

    d = ImageDraw.Draw(img)

    # ============== TOP EYEBROW BAND ==============
    # Tracked all-caps with orange dot — Wall Street Journal magazine style
    eb_y = 110
    d.ellipse([GUT, eb_y - 1, GUT + 13, eb_y + 12], fill=ORANGE)
    fe = font(BOLD, 17)
    eyebrow = f"FOR NC WHOLESALERS  ·  {card['eyebrow']}"
    tracked(d, GUT + 26, eb_y - 4, eyebrow, fe, ORANGE, spacing=3)

    # Thin orange rule under eyebrow (editorial separator)
    rule_y = eb_y + 28
    d.line([GUT, rule_y, GUT + 90, rule_y], fill=ORANGE, width=2)

    # ============== HEADLINE — massive Georgia serif ==============
    # Adjust headline size based on number of lines (smaller for 3 lines)
    n_lines = len(card["headline_lines"])
    if n_lines >= 3:
        hl_size = 86
        hl_lead = 100
    else:
        hl_size = 108
        hl_lead = 124

    fh = font(GEORGIA_BOLD, hl_size)
    # Position headline so the BLOCK is roughly centered vertically
    block_height = n_lines * hl_lead
    headline_y_start = (H - block_height) // 2 - 100  # bias up slightly

    for i, line in enumerate(card["headline_lines"]):
        d.text((GUT, headline_y_start + i * hl_lead), line, font=fh, fill=CREAM)

    # ============== EMBOSSED SEAL (lower right decorative) ==============
    # Echoes the orange wax seal on the Deal Pack folder in the video
    draw_embossed_seal(img, W - 175, H - 280, radius=85, color=ORANGE, opacity=210)

    # Re-grab draw context (the paste may have changed underlying image)
    d = ImageDraw.Draw(img)

    # ============== TAGLINE — tracked orange ==============
    # Sits below headline, anchored to bottom-third of the card
    ft = font(BOLD, 21)
    tagline_y = H - 195
    tagline_w = tracked_width(d, card["tagline"], ft, spacing=3)
    tracked(d, GUT, tagline_y, card["tagline"], ft, ORANGE, spacing=3)

    # Tiny tracked sub-tagline below
    fsub = font(REG, 16)
    sub = "↓  Tap below to grab it"
    d.text((GUT + 2, tagline_y + 32), sub, font=fsub, fill=MUTED)

    # ============== LICENSE FOOTER BAND ==============
    # Persistent navy band with cream tracked license
    band_h = 70
    band_y0 = H - band_h
    d.rectangle([0, band_y0, W, H], fill=NAVY_INK)
    # Thin orange rule on top of footer
    d.rectangle([0, band_y0 - 2, W, band_y0], fill=ORANGE)
    fl = font(BOLD, 15)
    txt = "SOUTHERN CITIES CONSTRUCTION  ·  NC GC LICENSE #107724"
    txt_w = tracked_width(d, txt, fl, spacing=2)
    tracked(d, (W - txt_w) // 2, H - 44, txt, fl, CREAM, spacing=2)

    out_path = os.path.join(OUT_DIR, f"end-card-hook-{n}.png")
    img.save(out_path)
    print(f"✓ wrote {out_path}")
    return out_path


def main():
    for card in END_CARDS:
        build_card(card)


if __name__ == "__main__":
    main()
