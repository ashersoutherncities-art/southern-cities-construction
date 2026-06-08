#!/usr/bin/env python3
"""
"Same deal. Three outcomes." — 3-tier avatar ladder.
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
    {"amt": "$8K", "label": "GUESSED IT",
     "line": "Napkin off comps. Buyer cut 70% at the table.",
     "bg": (250, 238, 236), "accent": RED, "amt_color": RED, "label_color": RED, "line_color": INK, "win": False},
    {"amt": "$15K", "label": "ESTIMATED IT",
     "line": "Did the homework. Buyer still cut 40%.",
     "bg": (250, 243, 230), "accent": AMBER, "amt_color": AMBER, "label_color": AMBER, "line_color": INK, "win": False},
    {"amt": "$25–40K+", "label": "GC-VERIFIED IT",
     "line": "Licensed GC wrote the number. Buyer signed. Closed at the top.",
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


def draw_pill_cta(d, cx, y, label, padding_x=44, padding_y=22, font_size=28):
    """Draw an orange pill-style CTA button with white bold text."""
    f = font(BLACK, font_size)
    text_w = tw(d, label, f)
    pill_w = text_w + padding_x * 2
    pill_h = font_size + padding_y * 2
    x0 = cx - pill_w // 2
    y0 = y
    x1 = x0 + pill_w
    y1 = y0 + pill_h
    d.rounded_rectangle([x0, y0, x1, y1], radius=pill_h // 2, fill=ORANGE)
    d.text((cx - text_w / 2, y0 + padding_y - 2), label, font=f, fill=WHITE)
    return y1


def build_square():
    """1080x1080 for Feed placement — winner-band-dominant layout."""
    W = H = 1080
    img = Image.new("RGB", (W, H), WHITE)
    d = ImageDraw.Draw(img)
    cx = W // 2
    d.rectangle([0, 0, W, 12], fill=ORANGE)

    # logo
    lg = Image.open(LOGO).convert("RGBA")
    r = 180 / lg.width
    lg = lg.resize((180, int(lg.height * r)), Image.LANCZOS)
    img.paste(lg, (int((W - lg.width) / 2), 38), lg)

    # eyebrow + headline (two-line punch)
    eb = font(BOLD, 25)
    d.text((cx - tw(d, "FOR NC WHOLESALERS", eb) / 2, 152), "FOR NC WHOLESALERS", font=eb, fill=ORANGE)
    fh = font(BLACK, 58)
    d.text((cx - tw(d, "$8K. $15K. $40K.", fh) / 2, 188), "$8K. $15K. $40K.", font=fh, fill=NAVY)
    fh2 = font(BLACK, 44)
    d.text((cx - tw(d, "Same property.", fh2) / 2, 256), "Same property.", font=fh2, fill=NAVY)

    # tier bands — winner gets ~1.4x height
    base_h = 168
    win_h = 235
    gap = 16
    top = 326
    lx0, lx1 = 56, W - 56

    y = top
    for i, t in enumerate(TIERS):
        h = win_h if t["win"] else base_h
        render_tier_band(d, t, lx0, lx1, y, h)
        y += h + gap

    # CTA pill — center horizontally above license
    cta_y = H - 130
    draw_pill_cta(d, cx, cta_y, "Get the free playbook  →", font_size=24)

    # license footer
    fl2 = font(BOLD, 19)
    lic = "Southern Cities Construction · NC GC License #107724"
    d.text((cx - tw(d, lic, fl2) / 2, H - 36), lic, font=fl2, fill=MUTED)

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

    # headline — punchy dollar line + setup
    fh = font(BLACK, 84)
    d.text((cx - tw(d, "$8K. $15K. $40K.", fh) / 2, 450), "$8K. $15K. $40K.", font=fh, fill=NAVY)
    fh2 = font(BLACK, 62)
    d.text((cx - tw(d, "Same property.", fh2) / 2, 555), "Same property.", font=fh2, fill=NAVY)

    # tier bands — winner gets ~1.3x height
    base_h = 290
    win_h = 380
    gap = 26
    top = 700
    lx0, lx1 = 56, W - 56

    y = top
    for t in TIERS:
        h = win_h if t["win"] else base_h
        render_tier_band(d, t, lx0, lx1, y, h)
        y += h + gap

    # CTA pill button (breathing room above)
    cta_y = H - 170
    draw_pill_cta(d, cx, cta_y, "Get the free playbook  →", font_size=30)

    # license footer
    fl2 = font(BOLD, 22)
    lic = "Southern Cities Construction · NC GC License #107724"
    d.text((cx - tw(d, lic, fl2) / 2, H - 50), lic, font=fl2, fill=MUTED)

    img.save(os.path.join(OUT, "wholesaler-tiers-vertical.png"))
    print("built wholesaler-tiers-vertical.png")


if __name__ == "__main__":
    build_square()
    build_vertical()
    print(f"\n-> {OUT}")
