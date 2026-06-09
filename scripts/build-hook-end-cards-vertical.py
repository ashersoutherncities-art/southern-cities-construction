#!/usr/bin/env python3
"""
End-card 9:16 vertical for Stories/Reels (1080x1920).

Respects platform safe zones:
  - Top ~200px reserved for username / platform UI
  - Bottom ~280px reserved for reply / sponsored / CTA button
  - Effective content zone: ~1440px tall in middle

Same design language as the square version:
  - No commercial button
  - Editorial WSJ aesthetic
  - Embossed wax seal (echoes Deal Pack)
  - License compliance footer
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

NAVY = (19, 36, 82)
NAVY_DEEP = (12, 22, 50)
NAVY_INK = (8, 14, 32)
ORANGE = (250, 140, 65)
CREAM = (248, 244, 237)
WHITE = (255, 255, 255)
MUTED = (175, 185, 210)

ROOT = "/Users/ashborn/.openclaw/workspace/southern-cities-construction"
OUT_DIR = os.path.join(ROOT, "public/marketing/end-cards")
os.makedirs(OUT_DIR, exist_ok=True)

F = "/System/Library/Fonts/Supplemental/"
GEORGIA_BOLD = "Georgia Bold.ttf"
BLACK = "Arial Black.ttf"
BOLD = "Arial Bold.ttf"
REG = "Arial.ttf"

W, H = 1080, 1920
GUT = 80

# Safe-zone anchors
TOP_SAFE = 240        # don't put critical content above this
BOT_SAFE = 1640       # don't put critical content below this (1920 - 280)

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
    seal = Image.new("RGBA", (radius * 3, radius * 3), (0, 0, 0, 0))
    sd = ImageDraw.Draw(seal)

    # Soft outer glow shadow
    shadow = Image.new("RGBA", (radius * 3, radius * 3), (0, 0, 0, 0))
    shd = ImageDraw.Draw(shadow)
    shd.ellipse([radius // 2 + 8, radius // 2 + 14, radius * 5 // 2 + 8, radius * 5 // 2 + 14],
                fill=(0, 0, 0, 120))
    shadow = shadow.filter(ImageFilter.GaussianBlur(18))
    seal.paste(shadow, (0, 0), shadow)

    # Wax seal body
    for r in range(radius, 0, -2):
        a = max(opacity - (radius - r) * 2, 30)
        if r > radius - 6:
            c = (180, 80, 30, a)
        elif r > radius - 14:
            c = (215, 105, 45, a)
        else:
            c = (*color, a)
        sd.ellipse([radius * 3 // 2 - r, radius * 3 // 2 - r,
                    radius * 3 // 2 + r, radius * 3 // 2 + r], fill=c)

    # Inner ring
    sd.ellipse([radius * 3 // 2 - radius + 22, radius * 3 // 2 - radius + 22,
                radius * 3 // 2 + radius - 22, radius * 3 // 2 + radius - 22],
               outline=(120, 60, 25, 180), width=2)

    # Center text
    try:
        sf = ImageFont.truetype(F + "Arial Bold.ttf", 16)
        for line, dy in [("NC GC", -16), ("#107724", 8)]:
            bbox = sd.textbbox((0, 0), line, font=sf)
            tw_, th_ = bbox[2] - bbox[0], bbox[3] - bbox[1]
            sd.text((radius * 3 // 2 - tw_ // 2, radius * 3 // 2 - th_ // 2 + dy),
                    line, font=sf, fill=CREAM)
    except Exception:
        pass

    img.paste(seal, (cx - radius * 3 // 2, cy - radius * 3 // 2), seal)


def build_card(card):
    n = card["n"]

    # ============== BACKGROUND ==============
    img = Image.new("RGB", (W, H), NAVY_DEEP)

    # Warm spotlight from bottom right (matches video hero)
    spotlight = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(spotlight)
    cx, cy = W - 50, H - 50
    for r in range(900, 0, -8):
        a = max(0, int(38 - r * 0.04))
        if a == 0:
            continue
        sd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 195, 130, a))
    spotlight = spotlight.filter(ImageFilter.GaussianBlur(80))
    img.paste(spotlight, (0, 0), spotlight)

    d = ImageDraw.Draw(img)

    # ============== TOP EYEBROW (inside top safe zone) ==============
    eb_y = TOP_SAFE + 40
    d.ellipse([GUT, eb_y - 1, GUT + 14, eb_y + 13], fill=ORANGE)
    fe = font(BOLD, 22)
    eyebrow = f"FOR NC WHOLESALERS  ·  {card['eyebrow']}"
    tracked(d, GUT + 28, eb_y - 4, eyebrow, fe, ORANGE, spacing=3)

    # Thin orange rule under eyebrow
    rule_y = eb_y + 36
    d.line([GUT, rule_y, GUT + 110, rule_y], fill=ORANGE, width=3)

    # ============== HEADLINE ==============
    n_lines = len(card["headline_lines"])
    if n_lines >= 3:
        hl_size = 116
        hl_lead = 132
    else:
        hl_size = 140
        hl_lead = 160

    fh = font(GEORGIA_BOLD, hl_size)
    # Center the headline block in the content zone (between eyebrow and seal)
    content_top = rule_y + 100
    content_bot = 1280  # leave room for seal + tagline below
    block_h = n_lines * hl_lead
    headline_y_start = content_top + ((content_bot - content_top) - block_h) // 2

    for i, line in enumerate(card["headline_lines"]):
        d.text((GUT, headline_y_start + i * hl_lead), line, font=fh, fill=CREAM)

    # ============== EMBOSSED SEAL ==============
    # Lower-right of content zone, well above tagline
    draw_embossed_seal(img, W - 220, 1380, radius=110, color=ORANGE, opacity=210)

    # Re-grab draw context (paste may have changed underlying image)
    d = ImageDraw.Draw(img)

    # ============== TAGLINE (above bottom safe zone) ==============
    tagline_y = BOT_SAFE - 200
    ft = font(BOLD, 26)
    tagline_w = tracked_width(d, card["tagline"], ft, spacing=3)
    tracked(d, GUT, tagline_y, card["tagline"], ft, ORANGE, spacing=3)

    # Helper line below tagline
    fsub = font(REG, 20)
    sub = "↓  Tap below to grab it"
    d.text((GUT + 2, tagline_y + 40), sub, font=fsub, fill=MUTED)

    # ============== LICENSE FOOTER BAND (bottom, persistent) ==============
    band_h = 84
    band_y0 = H - band_h
    d.rectangle([0, band_y0, W, H], fill=NAVY_INK)
    # Orange rule on top of footer
    d.rectangle([0, band_y0 - 3, W, band_y0], fill=ORANGE)
    fl = font(BOLD, 18)
    txt = "SOUTHERN CITIES CONSTRUCTION  ·  NC GC LICENSE #107724"
    txt_w = tracked_width(d, txt, fl, spacing=2)
    tracked(d, (W - txt_w) // 2, H - 52, txt, fl, CREAM, spacing=2)

    out_path = os.path.join(OUT_DIR, f"end-card-hook-{n}-vertical.png")
    img.save(out_path)
    print(f"✓ wrote {out_path}")
    return out_path


def main():
    for card in END_CARDS:
        build_card(card)


if __name__ == "__main__":
    main()
