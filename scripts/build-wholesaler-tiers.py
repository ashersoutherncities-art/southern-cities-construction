#!/usr/bin/env python3
"""
"Which wholesaler are you?" — 3-tier avatar ladder.
$8K Guesser -> $15K Diligent -> $25-40K+ The Standard (GC-verified Deal Pack).

Generates BOTH 1:1 (1080x1080) for Feed and 9:16 (1080x1920) for Stories/Reels.
"""
import os
from PIL import Image, ImageDraw, ImageFont

NAVY = (19, 36, 82)
ORANGE = (250, 140, 65)
CREAM = (246, 242, 236)
WHITE = (255, 255, 255)
INK = (28, 32, 44)
RED = (193, 60, 55)
AMBER = (196, 132, 38)
MUTED = (96, 104, 120)
MUTED_NAVY = (188, 198, 224)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "meta-ad-creatives")
F = "/System/Library/Fonts/Supplemental/"
LOGO = os.path.join(ROOT, "public", "sc-construction-logo.png")
BLACK, BOLD, REG = "Arial Black.ttf", "Arial Bold.ttf", "Arial.ttf"


def font(n, s):
    return ImageFont.truetype(F + n, s)


def tw(d, s, f):
    b = d.textbbox((0, 0), s, font=f)
    return b[2] - b[0]


def wrap(d, s, f, mw):
    out, cur = [], ""
    for w in s.split():
        t = (cur + " " + w).strip()
        if tw(d, t, f) <= mw:
            cur = t
        else:
            out.append(cur) if cur else None
            cur = w
    if cur:
        out.append(cur)
    return out


# Tier definitions — used by both renders
TIERS = [
    {"amt": "$8K", "label": "THE GUESSER",
     "line": "Hyped about the assignment — then the buyer chopped him on value and rehab cost he couldn't defend.",
     "bg": (250, 238, 236), "accent": RED, "amt_color": RED, "label_color": RED, "line_color": INK, "win": False},
    {"amt": "$15K", "label": "THE DILIGENT ONE",
     "line": "Real comps, a careful rehab estimate — but it's still his number, so buyers still talk it down.",
     "bg": (250, 243, 230), "accent": AMBER, "amt_color": AMBER, "label_color": AMBER, "line_color": INK, "win": False},
    {"amt": "$25–40K+", "label": "THE STANDARD",
     "line": "A GC-verified Deal Pack on every property. Buyers can't argue the number. Closes at the top.",
     "bg": NAVY, "accent": ORANGE, "amt_color": WHITE, "label_color": ORANGE, "line_color": MUTED_NAVY, "win": True},
]


def render_tier_band(d, t, lx0, lx1, y0, band_h):
    """Render one tier band — amount on left, label+description on right."""
    y1 = y0 + band_h
    width = lx1 - lx0
    # rounded rect bg
    d.rounded_rectangle([lx0, y0, lx1, y1], radius=22, fill=t["bg"])
    if t["win"]:
        d.rounded_rectangle([lx0, y0, lx1, y1], radius=22, outline=ORANGE, width=4)
    # left accent stripe
    d.rounded_rectangle([lx0, y0, lx0 + 10, y1], radius=5, fill=t["accent"])
    # amount text (left zone)
    amt = t["amt"]
    fa = font(BLACK, 72 if len(amt) <= 4 else 50)
    left_zone_w = int(width * 0.35)
    az_cx = lx0 + left_zone_w // 2
    d.text((az_cx - tw(d, amt, fa) / 2, y0 + band_h / 2 - (fa.size / 2) - 6),
           amt, font=fa, fill=t["amt_color"])
    # divider line
    div_x = lx0 + left_zone_w + 8
    d.line([div_x, y0 + 36, div_x, y1 - 36],
           fill=(t["accent"] if not t["win"] else WHITE), width=2)
    # right zone: label + description
    rx = div_x + 26
    rw = lx1 - rx - 28
    fl = font(BLACK, 30)
    d.text((rx, y0 + 34), t["label"], font=fl, fill=t["label_color"])
    fn = font(REG, 26)
    lines = wrap(d, t["line"], fn, rw)
    yy = y0 + 80
    for ln in lines:
        d.text((rx, yy), ln, font=fn, fill=t["line_color"])
        yy += 34


def build_square():
    """Original 1080x1080 for Feed placement."""
    W = H = 1080
    img = Image.new("RGB", (W, H), WHITE)
    d = ImageDraw.Draw(img)
    cx = W // 2
    d.rectangle([0, 0, W, 12], fill=ORANGE)

    # logo
    lg = Image.open(LOGO).convert("RGBA")
    r = 190 / lg.width
    lg = lg.resize((190, int(lg.height * r)), Image.LANCZOS)
    img.paste(lg, (int((W - lg.width) / 2), 48), lg)

    # eyebrow + headline
    eb = font(BOLD, 25)
    d.text((cx - tw(d, "FOR NC WHOLESALERS", eb) / 2, 168), "FOR NC WHOLESALERS", font=eb, fill=ORANGE)
    fh = font(BLACK, 52)
    d.text((cx - tw(d, "Which wholesaler are you?", fh) / 2, 208), "Which wholesaler are you?", font=fh, fill=NAVY)

    # tier bands
    top = 300
    band_h = 198
    gap = 18
    lx0, lx1 = 56, W - 56
    for i, t in enumerate(TIERS):
        render_tier_band(d, t, lx0, lx1, top + i * (band_h + gap), band_h)

    # footer + license
    ff = font(BOLD, 24)
    foot = "The free $25–40K Assignment Playbook shows you how to be #3."
    d.text((cx - tw(d, foot, ff) / 2, H - 86), foot, font=ff, fill=NAVY)
    fl2 = font(BOLD, 21)
    lic = "Southern Cities Construction · NC GC License #107724"
    d.text((cx - tw(d, lic, fl2) / 2, H - 50), lic, font=fl2, fill=MUTED)

    img.save(os.path.join(OUT, "wholesaler-tiers.png"))
    print("built wholesaler-tiers.png")


def build_vertical():
    """1080x1920 for Stories / Reels placement."""
    W, H = 1080, 1920
    img = Image.new("RGB", (W, H), WHITE)
    d = ImageDraw.Draw(img)
    cx = W // 2
    d.rectangle([0, 0, W, 14], fill=ORANGE)

    # logo (positioned below Stories top UI overlay)
    lg = Image.open(LOGO).convert("RGBA")
    r = 260 / lg.width
    lg = lg.resize((260, int(lg.height * r)), Image.LANCZOS)
    img.paste(lg, (int((W - lg.width) / 2), 200), lg)

    # eyebrow
    eb = font(BOLD, 30)
    d.text((cx - tw(d, "FOR NC WHOLESALERS", eb) / 2, 400), "FOR NC WHOLESALERS", font=eb, fill=ORANGE)

    # headline — split across two lines for impact
    fh = font(BLACK, 72)
    d.text((cx - tw(d, "Which wholesaler", fh) / 2, 460), "Which wholesaler", font=fh, fill=NAVY)
    d.text((cx - tw(d, "are you?", fh) / 2, 545), "are you?", font=fh, fill=NAVY)

    # tier bands — bigger, more vertical room
    top = 700
    band_h = 340
    gap = 28
    lx0, lx1 = 56, W - 56
    for i, t in enumerate(TIERS):
        render_tier_band(d, t, lx0, lx1, top + i * (band_h + gap), band_h)

    # footer + license (above Stories bottom UI overlay)
    ff = font(BOLD, 28)
    foot = "The free $25–40K Assignment Playbook shows you how to be #3."
    d.text((cx - tw(d, foot, ff) / 2, H - 110), foot, font=ff, fill=NAVY)
    fl2 = font(BOLD, 24)
    lic = "Southern Cities Construction · NC GC License #107724"
    d.text((cx - tw(d, lic, fl2) / 2, H - 60), lic, font=fl2, fill=MUTED)

    img.save(os.path.join(OUT, "wholesaler-tiers-vertical.png"))
    print("built wholesaler-tiers-vertical.png")


if __name__ == "__main__":
    build_square()
    build_vertical()
    print(f"\n-> {OUT}")
