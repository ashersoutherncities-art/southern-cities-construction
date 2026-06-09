#!/usr/bin/env python3
"""
Composite the three-avatars ad: Flux photo + PIL text overlay.
"""
import os
from PIL import Image, ImageDraw, ImageFont

NAVY = (19, 36, 82)
ORANGE = (250, 140, 65)
CREAM = (248, 244, 237)
WHITE = (255, 255, 255)
INK = (24, 28, 38)
MUTED = (165, 155, 140)

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


def composite_three_avatars():
    src = os.path.join(OUT, "ai", "three-avatars-v2-flux.png")
    bg = Image.open(src).convert("RGB")
    if bg.size != (1080, 1080):
        bg = bg.resize((1080, 1080), Image.LANCZOS)

    W, H = bg.size
    img = bg.copy()

    # Top dark gradient for headline legibility
    top_overlay = Image.new("RGBA", (W, 320), (0, 0, 0, 0))
    od = ImageDraw.Draw(top_overlay)
    for y in range(320):
        alpha = int(195 * (1 - y / 320) ** 1.6)
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

    # Top eyebrow
    d.ellipse([GUT, 50, GUT + 11, 61], fill=ORANGE)
    eb = font(BOLD, 17)
    tracked(d, GUT + 22, 50, "FOR NC WHOLESALERS  ·  ASSIGNMENT ECONOMICS",
            eb, ORANGE, spacing=3)

    # Massive headline
    fh = font(GEORGIA_BOLD, 72)
    d.text((GUT, 92), "$8K. $40K.", font=fh, fill=CREAM)
    d.text((GUT, 184), "Same property.", font=fh, fill=CREAM)

    # Small subhead
    fk = font(REG, 17)
    d.text((GUT, 280), "Three NC wholesalers ran the same deal. Three different checks.",
           font=fk, fill=MUTED)

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

    out_path = os.path.join(OUT, "ad-three-avatars.png")
    img.save(out_path)
    print(f"built {out_path}")


if __name__ == "__main__":
    composite_three_avatars()
