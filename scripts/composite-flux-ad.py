#!/usr/bin/env python3
"""
Composite a complete ad: Flux photographic background + PIL text overlay.

This is the production workflow per the ad-creative skill:
  - AI handles the visual richness PIL can't (real photography, depth, texture)
  - PIL handles license-critical exact text (compliance-safe)
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

NAVY = (19, 36, 82)
ORANGE = (250, 140, 65)
CREAM = (248, 244, 237)
WHITE = (255, 255, 255)
INK = (24, 28, 38)
MUTED = (118, 122, 134)

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


def composite_pain_overlay():
    """Pain angle: Flux photography + 'Stop getting chopped at the table.' headline."""
    src = os.path.join(OUT, "ai", "dealpack-hero-flux.png")
    if not os.path.exists(src):
        print(f"ERROR: source not found: {src}")
        return

    bg = Image.open(src).convert("RGB")
    # Resize to 1080x1080 if needed
    if bg.size != (1080, 1080):
        bg = bg.resize((1080, 1080), Image.LANCZOS)

    W, H = bg.size
    img = bg.copy()

    # Add a soft cream gradient overlay at top for headline legibility
    overlay = Image.new("RGBA", (W, 380), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for y in range(380):
        alpha = int(220 * (1 - y / 380) ** 1.5)
        od.rectangle([0, y, W, y + 1], fill=(*CREAM, alpha))
    img.paste(overlay, (0, 0), overlay)

    # Bottom gradient for CTA + license legibility
    bottom_overlay = Image.new("RGBA", (W, 220), (0, 0, 0, 0))
    bd = ImageDraw.Draw(bottom_overlay)
    for y in range(220):
        alpha = int(220 * (y / 220) ** 1.5)
        bd.rectangle([0, y, W, y + 1], fill=(*NAVY, alpha))
    img.paste(bottom_overlay, (0, H - 220), bottom_overlay)

    d = ImageDraw.Draw(img)
    GUT = 60

    # Top: tracked eyebrow
    eb = font(BOLD, 18)
    tracked(d, GUT, 40, "FOR NC WHOLESALERS  ·  ASSIGNMENT DEFENSE", eb, NAVY, spacing=3)

    # Headline — Georgia serif on top of the cream gradient
    fh = font(GEORGIA_BOLD, 68)
    d.text((GUT, 80), "Stop getting", font=fh, fill=NAVY)
    d.text((GUT, 168), "chopped at the table.", font=fh, fill=NAVY)

    # Subhead micro-line
    fk = font(REG, 18)
    d.text((GUT, 260), "Same property. Same buyers. Three different paydays.",
           font=fk, fill=INK)

    # Bottom CTA on navy gradient
    fc = font(BLACK, 28)
    cta = "GET THE PLAYBOOK"
    cta_w = tracked_width(d, cta, fc, spacing=3)
    tracked(d, GUT, H - 130, cta, fc, WHITE, spacing=3)
    d.text((GUT + cta_w + 16, H - 134), "→", font=font(BLACK, 32), fill=ORANGE)

    fh2 = font(REG, 17)
    helper = "Free  ·  NC wholesalers only"
    d.text((W - GUT - tw(d, helper, fh2), H - 124), helper, font=fh2, fill=CREAM)

    # License footer
    fc2 = font(BOLD, 13)
    txt = "SOUTHERN CITIES CONSTRUCTION  ·  NC GC LICENSE #107724"
    w = tracked_width(d, txt, fc2, spacing=2)
    tracked(d, (W - w) // 2, H - 45, txt, fc2, CREAM, spacing=2)

    out_path = os.path.join(OUT, "ad-flux-pain.png")
    img.save(out_path)
    print(f"built {out_path}")


if __name__ == "__main__":
    composite_pain_overlay()
