#!/usr/bin/env python3
"""
Additional static-ad frameworks (2026 Meta playbook) for Southern Cities:
  - Us vs. Them comparison chart
  - Native Tweet / social-proof hot take
  - 4-card Carousel storyboard (Problem -> Why -> Proof -> CTA)
Brand-accurate: licensed GC is the ASSET. #107724 on every piece.
"""
import os
from PIL import Image, ImageDraw, ImageFont

NAVY = (19, 36, 82)
ORANGE = (250, 140, 65)
CREAM = (246, 242, 236)
WHITE = (255, 255, 255)
INK = (24, 28, 38)
GREEN = (34, 160, 90)
RED = (210, 64, 64)
MUTED_NAVY = (188, 198, 224)
MUTED_CREAM = (96, 104, 120)
TWEET_GRAY = (83, 100, 113)
TWEET_BLUE = (29, 155, 240)

SIZE = 1080
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "meta-ad-creatives")
os.makedirs(OUT, exist_ok=True)
F = "/System/Library/Fonts/Supplemental/"
CORE = "/System/Library/Fonts/"
LOGO = os.path.join(ROOT, "public", "sc-construction-logo.png")
LOGO_REV = os.path.join(ROOT, "public", "sc-construction-logo-reversed.png")
LOGO_NAVY = os.path.join(ROOT, "public", "sc-construction-logo-navy.png")
ICON = os.path.join(ROOT, "public", "sc-construction-icon.png")

BLACK = "Arial Black.ttf"
BOLD = "Arial Bold.ttf"
REG = "Arial.ttf"


def font(name, size, core=False):
    return ImageFont.truetype((CORE if core else F) + name, size)


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
        if cw is not None:
            w = tw(d, ln, f)
            dx = ax + (cw - w) / 2
        else:
            dx = x
        d.text((dx, y), ln, font=f, fill=fill)
        y += lh
    return y


def paste(img, path, w, x, y):
    im = Image.open(path).convert("RGBA")
    r = w / im.width
    im = im.resize((w, int(im.height * r)), Image.LANCZOS)
    img.paste(im, (x, y), im)
    return im.width, im.height


def license_line(d, text_fill, y=None, center=True, x=40):
    label = "Southern Cities Construction · NC GC License #107724"
    f = font(BOLD, 22)
    if y is None:
        y = SIZE - 56
    if center:
        d.text((SIZE / 2 - tw(d, label, f) / 2, y), label, font=f, fill=text_fill)
    else:
        d.text((x, y), label, font=f, fill=text_fill)


def check(d, x, y, s=34, color=GREEN):
    d.ellipse([x, y, x + s, y + s], fill=color)
    d.line([x + s * 0.26, y + s * 0.52, x + s * 0.44, y + s * 0.70], fill=WHITE, width=5)
    d.line([x + s * 0.44, y + s * 0.70, x + s * 0.74, y + s * 0.30], fill=WHITE, width=5)


def cross(d, x, y, s=34, color=RED):
    d.ellipse([x, y, x + s, y + s], fill=color)
    p = s * 0.30
    d.line([x + p, y + p, x + s - p, y + s - p], fill=WHITE, width=5)
    d.line([x + s - p, y + p, x + p, y + s - p], fill=WHITE, width=5)


# ---------------------------------------------------------------------------
# 1. US vs THEM comparison chart
# ---------------------------------------------------------------------------
def vs_chart():
    img = Image.new("RGB", (SIZE, SIZE), WHITE)
    d = ImageDraw.Draw(img)
    cx = SIZE // 2
    paste(img, LOGO, 230, cx - 115, 56)

    eb = font(BOLD, 26)
    d.text((cx - tw(d, "FOR NC WHOLESALERS", eb) / 2, 196), "FOR NC WHOLESALERS", font=eb, fill=ORANGE)
    fh = font(BLACK, 58)
    d.text((cx - tw(d, "Two rehab numbers.", fh) / 2, 240), "Two rehab numbers.", font=fh, fill=NAVY)
    d.text((cx - tw(d, "One actually closes.", fh) / 2, 304), "One actually closes.", font=fh, fill=NAVY)

    # panels
    top, bot = 410, 880
    lx0, lx1 = 60, 528
    rx0, rx1 = 552, 1020
    d.rounded_rectangle([lx0, top, lx1, bot], radius=24, fill=(252, 240, 240))
    d.rounded_rectangle([rx0, top, rx1, bot], radius=24, fill=NAVY)

    ft = font(BLACK, 30)
    d.text((lx0 + (lx1 - lx0) / 2 - tw(d, "Your napkin number", ft) / 2, top + 30),
           "Your napkin number", font=ft, fill=RED)
    d.text((rx0 + (rx1 - rx0) / 2 - tw(d, "Licensed GC Estimate", ft) / 2, top + 30),
           "Licensed GC Estimate", font=ft, fill=ORANGE)

    left_items = ["Guessed off comps", "Buyers chop it down", "“Rehab’s way more”", "Deal falls through", "Closes at the bottom"]
    right_items = ["Licensed GC budget", "Buyers can’t argue", "Backed by a scope", "Deal holds together", "Closes at the TOP"]
    fi = font(BOLD, 26)
    y = top + 100
    for li, ri in zip(left_items, right_items):
        cross(d, lx0 + 28, y, 32)
        block(d, wrap(d, li, fi, 360), fi, y - 2, INK, 32, x=lx0 + 78)
        check(d, rx0 + 28, y, 32)
        block(d, wrap(d, ri, fi, 360), fi, y - 2, WHITE, 32, x=rx0 + 78)
        y += 72

    license_line(d, MUTED_CREAM)
    img.save(os.path.join(OUT, "framework-vs-chart.png"))


# ---------------------------------------------------------------------------
# 1b. US vs THEM comparison — VERTICAL 9:16 (Stories / Reels placements)
# ---------------------------------------------------------------------------
def vs_chart_vertical():
    W, H = 1080, 1920
    img = Image.new("RGB", (W, H), WHITE)
    d = ImageDraw.Draw(img)
    cx = W // 2

    # logo (sits below Stories top UI overlay zone ~250px)
    paste(img, LOGO, 260, cx - 130, 200)

    # eyebrow + headline
    eb = font(BOLD, 30)
    d.text((cx - tw(d, "FOR NC WHOLESALERS", eb) / 2, 400), "FOR NC WHOLESALERS", font=eb, fill=ORANGE)
    fh = font(BLACK, 68)
    d.text((cx - tw(d, "Two rehab numbers.", fh) / 2, 460), "Two rehab numbers.", font=fh, fill=NAVY)
    d.text((cx - tw(d, "One actually closes.", fh) / 2, 540), "One actually closes.", font=fh, fill=NAVY)

    # panels — stacked vertically
    px0, px1 = 60, 1020  # full-width panels with side margins
    # red (top) panel
    rt, rb = 680, 1180
    d.rounded_rectangle([px0, rt, px1, rb], radius=24, fill=(252, 240, 240))
    # navy (bottom) panel — slightly taller for "winner" emphasis
    nt, nb = 1240, 1760
    d.rounded_rectangle([px0, nt, px1, nb], radius=24, fill=NAVY)

    # panel headers
    ft = font(BLACK, 36)
    d.text((cx - tw(d, "Your napkin number", ft) / 2, rt + 36),
           "Your napkin number", font=ft, fill=RED)
    d.text((cx - tw(d, "Licensed GC Estimate", ft) / 2, nt + 36),
           "Licensed GC Estimate", font=ft, fill=ORANGE)

    left_items = ["Guessed off comps", "Buyers chop it down", "“Rehab’s way more”", "Deal falls through", "Closes at the bottom"]
    right_items = ["Licensed GC budget", "Buyers can’t argue", "Backed by a scope", "Deal holds together", "Closes at the TOP"]
    fi = font(BOLD, 32)

    # red panel items
    y = rt + 120
    for li in left_items:
        cross(d, px0 + 60, y, 38)
        d.text((px0 + 120, y - 2), li, font=fi, fill=INK)
        y += 76

    # navy panel items — give bottom panel slightly more room
    y = nt + 120
    for ri in right_items:
        check(d, px0 + 60, y, 38)
        d.text((px0 + 120, y - 2), ri, font=fi, fill=WHITE)
        y += 80

    # license line at bottom (above Stories bottom UI overlay zone ~120px)
    fl = font(BOLD, 24)
    label = "Southern Cities Construction · NC GC License #107724"
    d.text((cx - tw(d, label, fl) / 2, 1820), label, font=fl, fill=MUTED_CREAM)

    img.save(os.path.join(OUT, "framework-vs-chart-vertical.png"))


# ---------------------------------------------------------------------------
# 2. Native TWEET / social-proof hot take
# ---------------------------------------------------------------------------
def tweet():
    img = Image.new("RGB", (SIZE, SIZE), WHITE)
    d = ImageDraw.Draw(img)
    # card
    cx0, cy0, cx1, cy1 = 70, 150, 1010, 930
    d.rounded_rectangle([cx0, cy0, cx1, cy1], radius=28, outline=(220, 225, 230), width=2)

    # avatar (logo icon in navy circle)
    ax, ay, asz = cx0 + 46, cy0 + 46, 92
    d.ellipse([ax, ay, ax + asz, ay + asz], fill=NAVY)
    iw, ih = paste(img, ICON, 60, ax + 16, ay + 16)

    # name + verified + handle
    fn = font(BOLD, 32)
    name = "Southern Cities Construction"
    d.text((ax + asz + 26, ay + 6), name, font=fn, fill=INK)
    # verified check
    vx = ax + asz + 26 + tw(d, name, fn) + 14
    d.ellipse([vx, ay + 10, vx + 30, ay + 40], fill=TWEET_BLUE)
    d.line([vx + 8, ay + 25, vx + 13, ay + 31], fill=WHITE, width=4)
    d.line([vx + 13, ay + 31, vx + 23, ay + 17], fill=WHITE, width=4)
    fh = font(REG, 26)
    d.text((ax + asz + 26, ay + 50), "@southerncities · NC GC #107724", font=fh, fill=TWEET_GRAY)

    # hot take body
    body = "Unpopular opinion: your assignments aren’t getting chopped at the closing table because of the deal."
    body2 = "It’s because your rehab number is a guess — and cash buyers know it."
    body3 = "A licensed GC’s budget ends the negotiation."
    fb = font(BOLD, 40)
    y = cy0 + 190
    y = block(d, wrap(d, body, fb, cx1 - cx0 - 92), fb, y, INK, 52, x=cx0 + 46)
    y += 14
    y = block(d, wrap(d, body2, fb, cx1 - cx0 - 92), fb, y, INK, 52, x=cx0 + 46)
    y += 14
    y = block(d, wrap(d, body3, fb, cx1 - cx0 - 92), fb, y, NAVY, 52, x=cx0 + 46)

    # timestamp
    ft = font(REG, 24)
    d.text((cx0 + 46, cy1 - 150), "9:41 AM · Jun 4, 2026", font=ft, fill=TWEET_GRAY)
    d.line([cx0 + 46, cy1 - 100, cx1 - 46, cy1 - 100], fill=(230, 233, 236), width=2)

    # engagement row
    fe = font(BOLD, 26)
    fem = font(REG, 26)
    items = [("312", "Reposts"), ("1,204", "Likes"), ("87", "Replies")]
    ex = cx0 + 46
    for num, lbl in items:
        d.text((ex, cy1 - 76), num, font=fe, fill=INK)
        w = tw(d, num, fe)
        d.text((ex + w + 8, cy1 - 76), lbl, font=fem, fill=TWEET_GRAY)
        ex += w + 8 + tw(d, lbl, fem) + 44

    license_line(d, MUTED_CREAM, y=SIZE - 56)
    img.save(os.path.join(OUT, "framework-tweet.png"))


# ---------------------------------------------------------------------------
# 3. CAROUSEL storyboard — 4 cards
# ---------------------------------------------------------------------------
def carousel_card(idx, total, bg, eyebrow_text, headline, sub, accent_fill, head_fill,
                  sub_fill, rev_logo, license_fill, swipe=True, cta=False, logo_path=None):
    img = Image.new("RGB", (SIZE, SIZE), bg)
    d = ImageDraw.Draw(img)
    cx = SIZE // 2
    d.rectangle([0, 0, SIZE, 12], fill=accent_fill)
    paste(img, logo_path or (LOGO_REV if rev_logo else LOGO), 210, cx - 105, 70)

    # step counter
    fc = font(BLACK, 28)
    counter = f"{idx}/{total}"
    d.text((cx - tw(d, counter, fc) / 2, 250), counter, font=fc, fill=accent_fill)

    if eyebrow_text:
        fe = font(BOLD, 26)
        d.text((cx - tw(d, eyebrow_text, fe) / 2, 300), eyebrow_text, font=fe, fill=accent_fill)

    fh = font(BLACK, 60)
    y = block(d, wrap(d, headline, fh, 900), fh, 360, head_fill, 72, cw=900, ax=90)

    if sub:
        fs = font(REG, 32)
        y = block(d, wrap(d, sub, fs, 840), fs, y + 30, sub_fill, 44, cw=840, ax=120)

    if cta:
        pill = "Tap to get the free guide"
        fp = font(BLACK, 32)
        pw = tw(d, pill, fp) + 84
        px = int((SIZE - pw) / 2)
        py = y + 50
        d.rounded_rectangle([px, py, px + pw, py + 84], radius=42, fill=NAVY)
        d.text((cx - tw(d, pill, fp) / 2, py + 24), pill, font=fp, fill=WHITE)

    if swipe:
        fsw = font(BOLD, 28)
        d.text((SIZE - 200, SIZE - 110), "swipe →", font=fsw, fill=accent_fill)

    license_line(d, license_fill, y=SIZE - 54)
    img.save(os.path.join(OUT, f"framework-carousel-{idx}.png"))


def carousel():
    # Card 1 — Problem
    carousel_card(1, 4, NAVY, "THE PROBLEM",
                  "Your $35K assignment keeps shrinking at the table.",
                  "Every buyer walk-through ends with the same line: “the rehab’s gonna run more than that.”",
                  ORANGE, WHITE, MUTED_NAVY, True, MUTED_NAVY)
    # Card 2 — Why
    carousel_card(2, 4, CREAM, "WHY IT HAPPENS",
                  "Because your rehab number is a guess.",
                  "It’s pulled off comps, not the property. Cash buyers know it — so they negotiate against it.",
                  ORANGE, NAVY, MUTED_CREAM, False, MUTED_CREAM)
    # Card 3 — Proof / Fix
    carousel_card(3, 4, NAVY, "THE FIX",
                  "A GC-verified Deal Pack.",
                  "Licensed-GC budget, trade-by-trade scope. A real $32K assignment closed at the top of the range.",
                  ORANGE, WHITE, MUTED_NAVY, True, MUTED_NAVY)
    # Card 4 — CTA (orange bg → navy mono logo for contrast)
    carousel_card(4, 4, ORANGE, "YOUR MOVE",
                  "Get your next deal GC-verified.",
                  "Start with the free $25–40K Assignment Playbook.",
                  NAVY, NAVY, (70, 46, 22), True, NAVY, swipe=False, cta=True,
                  logo_path=LOGO_NAVY)


for fn in (vs_chart, vs_chart_vertical, tweet, carousel):
    fn()
    print("built", fn.__name__)
print("\n->", OUT)
