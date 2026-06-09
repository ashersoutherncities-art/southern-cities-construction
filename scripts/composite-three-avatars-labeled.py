#!/usr/bin/env python3
"""
Composite three-avatars ad with EXPLICIT tier labels:
  - Big $8K / $15K / $25-40K+ amount labels over each grouping
  - Small THE GUESS / ESTIMATE / STANDARD tier name labels
  - Headline at top, CTA at bottom

Uses the v2 Flux image (which has all three groupings visible) as base.
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

NAVY = (19, 36, 82)
ORANGE = (250, 140, 65)
CREAM = (248, 244, 237)
WHITE = (255, 255, 255)
INK = (24, 28, 38)
MUTED = (175, 165, 150)
RED = (193, 60, 55)
AMBER = (196, 132, 38)

ROOT = "/Users/ashborn/.openclaw/workspace/southern-cities-construction"
OUT = os.path.join(ROOT, "meta-ad-creatives")
F = "/System/Library/Fonts/Supplemental/"

GEORGIA_BOLD = "Georgia Bold.ttf"
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


def tracked_width(d, text, f, spacing=2):
    return sum(tw(d, ch, f) for ch in text) + spacing * (len(text) - 1)


def draw_tier_label(d, cx, cy, amount, tier_name, amount_color, name_color=CREAM,
                    amount_size=44, name_size=14):
    """Draw a big dollar amount + small tier name centered at (cx, cy).

    Layout:
       $8K        ← amount_size
      THE GUESS   ← name_size (tracked)
    """
    # Amount on top
    fa = font(BLACK, amount_size)
    amt_w = tw(d, amount, fa)
    # Background pill behind amount for readability
    pad_x, pad_y = 16, 8
    pill_x0 = cx - amt_w // 2 - pad_x
    pill_y0 = cy - amount_size // 2 - pad_y
    pill_x1 = cx + amt_w // 2 + pad_x
    pill_y1 = cy + amount_size // 2 + pad_y
    # semi-transparent dark pill
    overlay = Image.new("RGBA", (pill_x1 - pill_x0, pill_y1 - pill_y0), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.rounded_rectangle([0, 0, pill_x1 - pill_x0, pill_y1 - pill_y0],
                          radius=(pill_y1 - pill_y0) // 2, fill=(8, 12, 20, 200))
    # Apply slight blur to soften
    overlay = overlay.filter(ImageFilter.GaussianBlur(0.8))
    d._image.paste(overlay, (pill_x0, pill_y0), overlay)
    d.text((cx - amt_w // 2, pill_y0 + pad_y), amount, font=fa, fill=amount_color)

    # Tier name below the pill
    fn = font(BOLD, name_size)
    name_w = tracked_width(d, tier_name, fn, spacing=2)
    tracked(d, cx - name_w // 2, pill_y1 + 8, tier_name, fn, name_color, spacing=2)


def composite():
    src = os.path.join(OUT, "ai", "three-avatars-v2-flux.png")
    bg = Image.open(src).convert("RGB")
    if bg.size != (1080, 1080):
        bg = bg.resize((1080, 1080), Image.LANCZOS)

    W, H = bg.size
    img = bg.copy()

    # Top dark gradient
    top_overlay = Image.new("RGBA", (W, 280), (0, 0, 0, 0))
    od = ImageDraw.Draw(top_overlay)
    for y in range(280):
        alpha = int(195 * (1 - y / 280) ** 1.6)
        od.rectangle([0, y, W, y + 1], fill=(8, 12, 20, alpha))
    img.paste(top_overlay, (0, 0), top_overlay)

    # Bottom dark gradient
    bot_overlay = Image.new("RGBA", (W, 240), (0, 0, 0, 0))
    bd = ImageDraw.Draw(bot_overlay)
    for y in range(240):
        alpha = int(210 * (y / 240) ** 1.6)
        bd.rectangle([0, y, W, y + 1], fill=(8, 12, 20, alpha))
    img.paste(bot_overlay, (0, H - 240), bot_overlay)

    d = ImageDraw.Draw(img)
    GUT = 60

    # Top eyebrow with dot
    d.ellipse([GUT, 50, GUT + 11, 61], fill=ORANGE)
    eb = font(BOLD, 17)
    tracked(d, GUT + 22, 50, "FOR NC WHOLESALERS  ·  SAME PROPERTY, THREE PAYDAYS",
            eb, ORANGE, spacing=3)

    # Headline
    fh = font(GEORGIA_BOLD, 64)
    d.text((GUT, 92), "Same property.", font=fh, fill=CREAM)
    d.text((GUT, 174), "Three checks.", font=fh, fill=CREAM)

    # === BIG TIER LABELS OVERLAID OVER EACH GROUPING ===
    # v2 image layout: left grouping ~x=240, center ~x=540, right ~x=840
    # All groupings sit roughly in vertical middle of image
    label_y = 590

    # Left: $8K — THE GUESS (red color)
    draw_tier_label(d, 220, label_y, "$8K", "THE GUESS",
                    amount_color=(245, 110, 100), name_color=CREAM,
                    amount_size=48, name_size=13)

    # Center: $15K — THE ESTIMATE (amber)
    draw_tier_label(d, 540, label_y, "$15K", "THE ESTIMATE",
                    amount_color=(225, 175, 80), name_color=CREAM,
                    amount_size=48, name_size=13)

    # Right: $25-40K+ — THE STANDARD (orange, slightly bigger)
    draw_tier_label(d, 860, label_y, "$25–40K+", "THE STANDARD",
                    amount_color=ORANGE, name_color=ORANGE,
                    amount_size=56, name_size=14)

    # Bottom CTA
    fc = font(BLACK, 28)
    cta = "GET THE PLAYBOOK"
    cta_w = tracked_width(d, cta, fc, spacing=3)
    tracked(d, GUT, H - 142, cta, fc, WHITE, spacing=3)
    d.text((GUT + cta_w + 18, H - 146), "→", font=font(BLACK, 34), fill=ORANGE)

    fh2 = font(REG, 16)
    helper = "Free  ·  NC wholesalers only"
    d.text((W - GUT - tw(d, helper, fh2), H - 134), helper, font=fh2, fill=CREAM)

    # License footer
    fc2 = font(BOLD, 13)
    txt = "SOUTHERN CITIES CONSTRUCTION  ·  NC GC LICENSE #107724"
    w = tracked_width(d, txt, fc2, spacing=2)
    tracked(d, (W - w) // 2, H - 50, txt, fc2, CREAM, spacing=2)

    out_path = os.path.join(OUT, "ad-three-avatars-labeled.png")
    img.save(out_path)
    print(f"built {out_path}")


if __name__ == "__main__":
    composite()
