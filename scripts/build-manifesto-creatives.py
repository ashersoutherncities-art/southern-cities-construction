#!/usr/bin/env python3
"""
Manifesto / POV static ads — Southern Cities "The Standard" brand belief.
Two angles: (1) the standard for every home, (2) the small guy / first flip.
#107724 on every piece.
"""
import os
from PIL import Image, ImageDraw, ImageFont

NAVY = (19, 36, 82)
ORANGE = (250, 140, 65)
CREAM = (246, 242, 236)
WHITE = (255, 255, 255)
MUTED_NAVY = (188, 198, 224)
MUTED_CREAM = (96, 104, 120)

SIZE = 1080
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "meta-ad-creatives")
F = "/System/Library/Fonts/Supplemental/"
LOGO = os.path.join(ROOT, "public", "sc-construction-logo.png")
LOGO_REV = os.path.join(ROOT, "public", "sc-construction-logo-reversed.png")

BLACK = "Arial Black.ttf"
BOLD = "Arial Bold.ttf"
REG = "Arial.ttf"
ITAL = "Arial Italic.ttf"


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
            if cur:
                out.append(cur)
            cur = w
    if cur:
        out.append(cur)
    return out


def block(d, lines, f, y, fill, lh, cw=None, ax=0, x=None):
    for ln in lines:
        dx = (ax + (cw - tw(d, ln, f)) / 2) if cw is not None else x
        d.text((dx, y), ln, font=f, fill=fill)
        y += lh
    return y


def paste(img, path, w, x, y):
    im = Image.open(path).convert("RGBA")
    r = w / im.width
    im = im.resize((w, int(im.height * r)), Image.LANCZOS)
    img.paste(im, (x, y), im)
    return im.height


def accent(d, cx, y, w=120, h=8, color=ORANGE):
    d.rounded_rectangle([cx - w // 2, y, cx + w // 2, y + h], radius=h // 2, fill=color)


def license_line(d, fill, y=None):
    label = "Southern Cities Construction · NC GC License #107724"
    f = font(BOLD, 22)
    if y is None:
        y = SIZE - 54
    d.text((SIZE / 2 - tw(d, label, f) / 2, y), label, font=f, fill=fill)


# ---------------------------------------------------------------------------
# 1. THE STANDARD (navy)
# ---------------------------------------------------------------------------
def standard():
    img = Image.new("RGB", (SIZE, SIZE), NAVY)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, SIZE, 14], fill=ORANGE)
    cx = SIZE // 2
    paste(img, LOGO_REV, 230, cx - 115, 64)

    eb = font(BOLD, 27)
    d.text((cx - tw(d, "WHAT WE STAND FOR", eb) / 2, 226), "WHAT WE STAND FOR", font=eb, fill=ORANGE)

    fh = font(BLACK, 52)
    y = block(d, wrap(d, "A home is where someone lives their life.", fh, 900),
              fh, 286, WHITE, 64, cw=900, ax=90)
    accent(d, cx, y + 20)

    body = ("It deserves a standard — not a half-finished flip thrown back on the market, "
            "and not overpriced “luxury” nobody can afford. The standard is simple: "
            "process, planning, execution, and management, done right.")
    fb = font(REG, 31)
    y = block(d, wrap(d, body, fb, 860), fb, y + 56, MUTED_NAVY, 44, cw=860, ax=110)

    close = "Do right by the house. Make money. Both."
    fc = font(BLACK, 38)
    y = block(d, wrap(d, close, fc, 860), fc, y + 36, ORANGE, 48, cw=860, ax=110)

    license_line(d, MUTED_NAVY)
    img.save(os.path.join(OUT, "manifesto-standard.png"))


# ---------------------------------------------------------------------------
# 2. THE SMALL GUY (cream)
# ---------------------------------------------------------------------------
def small_guy():
    img = Image.new("RGB", (SIZE, SIZE), CREAM)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, SIZE, 14], fill=NAVY)
    cx = SIZE // 2
    paste(img, LOGO, 220, cx - 110, 70)

    eb = font(BOLD, 27)
    d.text((cx - tw(d, "FIRST DEAL OR FIFTIETH", eb) / 2, 236), "FIRST DEAL OR FIFTIETH", font=eb, fill=ORANGE)

    fh = font(BLACK, 56)
    y = block(d, wrap(d, "Big fund or first flip —", fh, 920), fh, 296, NAVY, 68, cw=920, ax=80)
    y = block(d, wrap(d, "the standard doesn’t change.", fh, 920), fh, y, NAVY, 68, cw=920, ax=80)
    accent(d, cx, y + 20)

    body = ("We’re here for the small guys too. The same process, planning, and disciplined "
            "execution we’d put on a big project — because the family moving in doesn’t care "
            "how many deals you’ve done. They care that it was done right.")
    fb = font(REG, 31)
    y = block(d, wrap(d, body, fb, 860), fb, y + 54, MUTED_CREAM, 44, cw=860, ax=110)

    close = "Quality places. A price people can live with."
    fc = font(BLACK, 36)
    y = block(d, wrap(d, close, fc, 880), fc, y + 34, ORANGE, 46, cw=880, ax=100)

    license_line(d, MUTED_CREAM)
    img.save(os.path.join(OUT, "manifesto-smallguy.png"))


for fn in (standard, small_guy):
    fn()
    print("built", fn.__name__)
print("->", OUT)
