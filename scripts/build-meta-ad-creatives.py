#!/usr/bin/env python3
"""
Three wholesaler-hook static AD creatives for the $25-40K Assignment Playbook.
1080x1080. Each leads with a different hook so they can be A/B tested.
"""
import os
from PIL import Image, ImageDraw, ImageFont

NAVY = (19, 36, 82)
ORANGE = (250, 140, 65)
CREAM = (246, 242, 236)
WHITE = (255, 255, 255)
MUTED_ON_NAVY = (188, 198, 224)
MUTED_ON_CREAM = (96, 104, 120)

SIZE = 1080
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "meta-ad-creatives")
os.makedirs(OUT, exist_ok=True)
F = "/System/Library/Fonts/Supplemental/"
LOGO = os.path.join(ROOT, "public", "sc-construction-logo.png")
LOGO_REV = os.path.join(ROOT, "public", "sc-construction-logo-reversed.png")

BLACK = "Arial Black.ttf"
BOLD = "Arial Bold.ttf"
REG = "Arial.ttf"


def font(name, size):
    return ImageFont.truetype(F + name, size)


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


def block(d, lines, f, y, fill, lh, cw, ax):
    for ln in lines:
        w = tw(d, ln, f)
        d.text((ax + (cw - w) / 2, y), ln, font=f, fill=fill)
        y += lh
    return y


def logo(img, rev, w, y):
    lg = Image.open(LOGO_REV if rev else LOGO).convert("RGBA")
    r = w / lg.width
    lg = lg.resize((w, int(lg.height * r)), Image.LANCZOS)
    x = int((SIZE - lg.width) / 2)
    img.paste(lg, (x, y), lg)
    return y + lg.height


def accent(d, cx, y, w=120, h=8, color=ORANGE):
    d.rounded_rectangle([cx - w // 2, y, cx + w // 2, y + h], radius=h // 2, fill=color)


def cta_pill(d, text, cx, y, bg=ORANGE, fg=NAVY, fs=32):
    f = font(BLACK, fs)
    w = tw(d, text, f) + 84
    h = 84
    x = int((SIZE - w) / 2)
    d.rounded_rectangle([x, y, x + w, y + h], radius=h // 2, fill=bg)
    d.text((cx - tw(d, text, f) / 2, y + (h - fs) / 2 - 6), text, font=f, fill=fg)
    return y + h


def license_chip(d, dark=True, y=None):
    label = "NC GENERAL CONTRACTOR LICENSE #107724"
    f = font(BOLD, 23)
    w = tw(d, label, f)
    cw, ch = w + 64, 60
    x = int((SIZE - cw) / 2)
    if y is None:
        y = SIZE - ch - 50
    d.rounded_rectangle([x, y, x + cw, y + ch], radius=ch // 2,
                        fill=ORANGE if dark else NAVY)
    d.text((x + 32, y + 17), label, font=f, fill=NAVY if dark else WHITE)


def eyebrow(d, text, cx, y, color=ORANGE):
    f = font(BOLD, 27)
    d.text((cx - tw(d, text, f) / 2, y), text, font=f, fill=color)


# ---------------------------------------------------------------------------
# AD A — Pain / identity hook (navy)
# ---------------------------------------------------------------------------
def ad_a():
    img = Image.new("RGB", (SIZE, SIZE), NAVY)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, SIZE, 14], fill=ORANGE)
    cx = SIZE // 2
    logo(img, True, 240, 70)
    eyebrow(d, "FOR NC WHOLESALERS", cx, 232)

    hook = "Your buyer isn't lowballing your deal —"
    hook2 = "they're lowballing your rehab number."
    fh = font(BLACK, 60)
    y = 300
    y = block(d, wrap(d, hook, fh, 920), fh, y, WHITE, 72, 920, 80)
    y = block(d, wrap(d, hook2, fh, 920), fh, y, ORANGE, 72, 920, 80)
    accent(d, cx, y + 22)

    sub = "The $25–40K Assignment Playbook — a free guide to attaching a GC-verified budget so buyers stop negotiating against your spread."
    fs = font(REG, 30)
    y = block(d, wrap(d, sub, fs, 840), fs, y + 60, MUTED_ON_NAVY, 42, 840, 120)

    cta_pill(d, "Tap Download → Get the free guide", cx, y + 40)
    license_chip(d, dark=True)
    img.save(os.path.join(OUT, "ad-a-pain.png"))


# ---------------------------------------------------------------------------
# AD B — Mechanism hook (cream)
# ---------------------------------------------------------------------------
def ad_b():
    img = Image.new("RGB", (SIZE, SIZE), CREAM)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, SIZE, 14], fill=NAVY)
    cx = SIZE // 2
    logo(img, False, 230, 70)
    eyebrow(d, "FOR NC WHOLESALERS", cx, 250)

    hook = "Cash buyers don't negotiate your assignment fee."
    hook2 = "They negotiate your rehab estimate."
    fh = font(BLACK, 56)
    y = 320
    y = block(d, wrap(d, hook, fh, 920), fh, y, NAVY, 68, 920, 80)
    y += 8
    fh2 = font(BLACK, 56)
    y = block(d, wrap(d, hook2, fh2, 920), fh2, y, ORANGE, 68, 920, 80)
    accent(d, cx, y + 22)

    sub = "Most wholesalers hand them the ammo. The $25–40K Assignment Playbook shows you how to attach a GC-verified budget — free."
    fs = font(REG, 30)
    y = block(d, wrap(d, sub, fs, 840), fs, y + 60, MUTED_ON_CREAM, 42, 840, 120)

    cta_pill(d, "Tap Download → Get the free guide", cx, y + 40, bg=NAVY, fg=WHITE)
    license_chip(d, dark=False)
    img.save(os.path.join(OUT, "ad-b-mechanism.png"))


# ---------------------------------------------------------------------------
# AD C — Outcome hook, big numbers (navy)
# ---------------------------------------------------------------------------
def ad_c():
    img = Image.new("RGB", (SIZE, SIZE), NAVY)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, SIZE, 14], fill=ORANGE)
    cx = SIZE // 2
    logo(img, True, 230, 70)
    eyebrow(d, "FOR NC WHOLESALERS", cx, 244)

    # Big contrast numbers
    fb = font(BLACK, 120)
    left = "$18K"
    mid = "or"
    right = "$38K?"
    fm = font(BOLD, 56)
    total = tw(d, left, fb) + tw(d, mid, fm) + tw(d, right, fb) + 60
    x = int((SIZE - total) / 2)
    yb = 320
    d.text((x, yb), left, font=fb, fill=MUTED_ON_NAVY)
    x += tw(d, left, fb) + 30
    d.text((x, yb + 44), mid, font=fm, fill=ORANGE)
    x += tw(d, mid, fm) + 30
    d.text((x, yb), right, font=fb, fill=WHITE)

    sub1 = "The difference usually isn't the deal."
    sub2 = "It's whether your rehab number is verified."
    fs = font(BOLD, 36)
    y = block(d, [sub1], fs, yb + 170, WHITE, 48, SIZE, 0)
    y = block(d, [sub2], fs, y, ORANGE, 48, SIZE, 0)
    accent(d, cx, y + 24)

    sub = "Get The $25–40K Assignment Playbook — a free GC-verified budget guide for NC wholesalers."
    fr = font(REG, 30)
    y = block(d, wrap(d, sub, fr, 820), fr, y + 60, MUTED_ON_NAVY, 42, 820, 130)

    cta_pill(d, "Tap Download → Get the free guide", cx, y + 40)
    license_chip(d, dark=True)
    img.save(os.path.join(OUT, "ad-c-outcome.png"))


for fn in (ad_a, ad_b, ad_c):
    fn()
    print("built", fn.__name__)
print("\n->", OUT)
