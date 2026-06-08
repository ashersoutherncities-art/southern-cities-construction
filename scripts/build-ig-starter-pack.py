#!/usr/bin/env python3
"""
Build a 6-post Instagram starter pack for Southern Cities Construction.
1080x1080 branded squares + license line. Captions live in captions.md.
"""
import os
from PIL import Image, ImageDraw, ImageFont

# ---- Brand ----
NAVY = (19, 36, 82)        # #132452
ORANGE = (250, 140, 65)    # #fa8c41
CREAM = (246, 242, 236)    # #F6F2EC
WHITE = (255, 255, 255)
INK = (28, 32, 44)
MUTED_ON_NAVY = (188, 198, 224)
MUTED_ON_CREAM = (96, 104, 120)

SIZE = 1080
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "ig-starter-pack")
os.makedirs(OUT, exist_ok=True)

F = "/System/Library/Fonts/Supplemental/"
LOGO = os.path.join(ROOT, "public", "sc-construction-logo.png")
LOGO_REV = os.path.join(ROOT, "public", "sc-construction-logo-reversed.png")
LOGO_NAVY = os.path.join(ROOT, "public", "sc-construction-logo-navy.png")


def font(name, size):
    return ImageFont.truetype(F + name, size)


BLACK = "Arial Black.ttf"
BOLD = "Arial Bold.ttf"
REG = "Arial.ttf"
ITAL = "Arial Italic.ttf"


def text_w(draw, s, fnt):
    b = draw.textbbox((0, 0), s, font=fnt)
    return b[2] - b[0]


def wrap(draw, s, fnt, max_w):
    words = s.split()
    lines, cur = [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if text_w(draw, t, fnt) <= max_w:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def draw_block(draw, lines, fnt, x, y, fill, lh, center_w=None, anchor_x=None):
    for ln in lines:
        if center_w is not None:
            w = text_w(draw, ln, fnt)
            dx = anchor_x + (center_w - w) / 2
        else:
            dx = x
        draw.text((dx, y), ln, font=fnt, fill=fill)
        y += lh
    return y


def paste_logo(img, reversed_=False, navy=False, target_w=300, xy=None, center_x=None, y=64):
    logo_path = LOGO_NAVY if navy else (LOGO_REV if reversed_ else LOGO)
    logo = Image.open(logo_path).convert("RGBA")
    ratio = target_w / logo.width
    logo = logo.resize((target_w, int(logo.height * ratio)), Image.LANCZOS)
    if center_x is not None:
        x = int((SIZE - logo.width) / 2)
    else:
        x = xy[0]
        y = xy[1]
    img.paste(logo, (x, y), logo)
    return y + logo.height


def license_chip(draw, img, dark_bg=True, y=None):
    """License pill at bottom — compliance requirement on every marketing piece."""
    label = "NC GENERAL CONTRACTOR LICENSE #107724"
    fnt = font(BOLD, 24)
    w = text_w(draw, label, fnt)
    pad_x, pad_y = 34, 18
    chip_w = w + pad_x * 2
    chip_h = 24 + pad_y * 2
    x = int((SIZE - chip_w) / 2)
    if y is None:
        y = SIZE - chip_h - 56
    fill = ORANGE
    draw.rounded_rectangle([x, y, x + chip_w, y + chip_h], radius=chip_h // 2, fill=fill)
    draw.text((x + pad_x, y + pad_y - 2), label, font=fnt, fill=NAVY)


def base(bg):
    img = Image.new("RGB", (SIZE, SIZE), bg)
    return img, ImageDraw.Draw(img)


def accent_rule(draw, cx, y, w=120, color=ORANGE, h=8):
    draw.rounded_rectangle([cx - w // 2, y, cx + w // 2, y + h], radius=h // 2, fill=color)


# ---------------------------------------------------------------------------
# POST 1 — Intro / Who we are  (navy)
# ---------------------------------------------------------------------------
def post1():
    img, d = base(NAVY)
    # subtle corner accent
    d.rectangle([0, 0, SIZE, 14], fill=ORANGE)
    paste_logo(img, reversed_=True, target_w=420, center_x=True, y=150)
    cx = SIZE // 2
    eyebrow = "GENERAL CONTRACTOR · NORTH CAROLINA"
    fe = font(BOLD, 26)
    d.text((cx - text_w(d, eyebrow, fe) / 2, 410), eyebrow, font=fe, fill=ORANGE)

    head = "We build the execution layer real estate investors are missing."
    fh = font(BLACK, 58)
    lines = wrap(d, head, fh, 880)
    y = 470
    y = draw_block(d, lines, fh, 0, y, WHITE, 70, center_w=880, anchor_x=100)

    sub = "GC-verified budgets, scopes, and project oversight across NC."
    fs = font(REG, 30)
    sl = wrap(d, sub, fs, 820)
    y += 24
    draw_block(d, sl, fs, 0, y, MUTED_ON_NAVY, 42, center_w=820, anchor_x=130)

    license_chip(d, img, dark_bg=True)
    img.save(os.path.join(OUT, "01-intro.png"))


# ---------------------------------------------------------------------------
# POST 2 — Lead magnet  (cream)
# ---------------------------------------------------------------------------
def post2():
    img, d = base(CREAM)
    d.rectangle([0, 0, SIZE, 14], fill=NAVY)
    paste_logo(img, reversed_=False, target_w=300, center_x=True, y=88)
    cx = SIZE // 2

    eyebrow = "FREE GUIDE · FOR NC WHOLESALERS & INVESTORS"
    fe = font(BOLD, 25)
    d.text((cx - text_w(d, eyebrow, fe) / 2, 300), eyebrow, font=fe, fill=ORANGE)

    head = "The $25–40K Assignment Playbook"
    fh = font(BLACK, 64)
    lines = wrap(d, head, fh, 900)
    y = draw_block(d, lines, fh, 0, 360, NAVY, 76, center_w=900, anchor_x=90)

    accent_rule(d, cx, y + 18)

    sub = "How to attach a GC-verified budget so your deals close at the top of the range — without leaving spread on the table."
    fs = font(REG, 30)
    sl = wrap(d, sub, fs, 820)
    y = draw_block(d, sl, fs, 0, y + 56, MUTED_ON_CREAM, 42, center_w=820, anchor_x=130)

    # CTA bar
    cta = "DM “PLAYBOOK” or tap the link in bio"
    fc = font(BOLD, 30)
    cw = text_w(d, cta, fc) + 80
    bx = int((SIZE - cw) / 2)
    by = y + 40
    d.rounded_rectangle([bx, by, bx + cw, by + 78], radius=39, fill=NAVY)
    d.text((cx - text_w(d, cta, fc) / 2, by + 22), cta, font=fc, fill=WHITE)

    license_chip(d, img, dark_bg=False)
    img.save(os.path.join(OUT, "02-lead-magnet.png"))


# ---------------------------------------------------------------------------
# POST 3 — Proof stat  (navy, big number)
# ---------------------------------------------------------------------------
def post3():
    img, d = base(NAVY)
    d.rectangle([0, 0, SIZE, 14], fill=ORANGE)
    cx = SIZE // 2
    paste_logo(img, reversed_=True, target_w=260, center_x=True, y=80)

    eyebrow = "CASE STUDY · EXECUTION DONE RIGHT"
    fe = font(BOLD, 26)
    d.text((cx - text_w(d, eyebrow, fe) / 2, 250), eyebrow, font=fe, fill=ORANGE)

    big = "$10K → $104K"
    fb = font(BLACK, 118)
    d.text((cx - text_w(d, big, fb) / 2, 330), big, font=fb, fill=WHITE)

    sub = "in 9 months"
    fsb = font(BOLD, 48)
    d.text((cx - text_w(d, sub, fsb) / 2, 470), sub, font=fsb, fill=ORANGE)

    body = "One property, one disciplined scope, one verified budget. The difference between a wholesale spread and a real flip is the execution layer."
    fs = font(REG, 31)
    sl = wrap(d, body, fs, 840)
    draw_block(d, sl, fs, 0, 590, MUTED_ON_NAVY, 44, center_w=840, anchor_x=120)

    license_chip(d, img, dark_bg=True)
    img.save(os.path.join(OUT, "03-proof.png"))


# ---------------------------------------------------------------------------
# POST 4 — Process / execution  (cream, 3 steps)
# ---------------------------------------------------------------------------
def post4():
    img, d = base(CREAM)
    d.rectangle([0, 0, SIZE, 14], fill=ORANGE)
    cx = SIZE // 2
    paste_logo(img, reversed_=False, target_w=260, center_x=True, y=80)

    head = "From deal to finished flip"
    fh = font(BLACK, 60)
    d.text((cx - text_w(d, head, fh) / 2, 250), head, font=fh, fill=NAVY)
    accent_rule(d, cx, 340)

    steps = [
        ("1", "Verify", "A GC-grade budget & scope on the actual property — not a guess."),
        ("2", "Plan", "Trade-by-trade sequencing, costs, and timeline you can fund against."),
        ("3", "Oversee", "We become the execution layer so the project finishes on scope."),
    ]
    y = 410
    for num, title, desc in steps:
        # number circle
        r = 44
        d.ellipse([110, y, 110 + r * 2, y + r * 2], fill=ORANGE)
        fn = font(BLACK, 46)
        d.text((110 + r - text_w(d, num, fn) / 2, y + r - 34), num, font=fn, fill=NAVY)
        ft = font(BLACK, 40)
        d.text((232, y - 4), title, font=ft, fill=NAVY)
        fd = font(REG, 27)
        dl = wrap(d, desc, fd, 700)
        draw_block(d, dl, fd, 232, y + 48, MUTED_ON_CREAM, 36)
        y += 168

    license_chip(d, img, dark_bg=False)
    img.save(os.path.join(OUT, "04-process.png"))


# ---------------------------------------------------------------------------
# POST 5 — Educational  (navy, checklist of what a number misses)
# ---------------------------------------------------------------------------
def post5():
    img, d = base(NAVY)
    d.rectangle([0, 0, SIZE, 14], fill=ORANGE)
    cx = SIZE // 2
    paste_logo(img, reversed_=True, target_w=250, center_x=True, y=72)

    head = "What a wholesaler's number misses"
    fh = font(BLACK, 52)
    lines = wrap(d, head, fh, 900)
    y = draw_block(d, lines, fh, 0, 230, WHITE, 62, center_w=900, anchor_x=90)
    accent_rule(d, cx, y + 14)

    items = [
        "Permit-triggering work hiding behind cosmetic scope",
        "Mechanical, electrical & plumbing the comps don’t show",
        "Structural and moisture issues that blow the timeline",
        "Real labor costs by trade in today’s NC market",
        "The contingency that keeps the deal from going upside down",
    ]
    fi = font(REG, 31)
    y += 64
    for it in items:
        # orange check
        d.ellipse([130, y + 4, 130 + 34, y + 4 + 34], outline=ORANGE, width=4)
        d.line([139, y + 22, 146, y + 30], fill=ORANGE, width=5)
        d.line([146, y + 30, 159, y + 13], fill=ORANGE, width=5)
        il = wrap(d, it, fi, 760)
        draw_block(d, il, fi, 192, y - 2, WHITE, 38)
        y += max(64, 38 * len(il) + 26)

    license_chip(d, img, dark_bg=True)
    img.save(os.path.join(OUT, "05-educational.png"))


# ---------------------------------------------------------------------------
# POST 6 — CTA  (orange field, bold)
# ---------------------------------------------------------------------------
def post6():
    img, d = base(ORANGE)
    cx = SIZE // 2
    paste_logo(img, navy=True, target_w=300, center_x=True, y=140)

    eyebrow = "DEAL PACK · GC-VERIFIED"
    fe = font(BOLD, 28)
    d.text((cx - text_w(d, eyebrow, fe) / 2, 360), eyebrow, font=fe, fill=NAVY)

    head = "Get your next deal GC-verified."
    fh = font(BLACK, 66)
    lines = wrap(d, head, fh, 900)
    y = draw_block(d, lines, fh, 0, 420, NAVY, 78, center_w=900, anchor_x=90)

    sub = "Bid-ready budgets, build-ready scopes, and on-site verification across North Carolina."
    fs = font(BOLD, 30)
    sl = wrap(d, sub, fs, 800)
    y = draw_block(d, sl, fs, 0, y + 24, (60, 40, 20), 42, center_w=800, anchor_x=140)

    cta = "Link in bio  →  Build your Deal Pack"
    fc = font(BLACK, 34)
    cw = text_w(d, cta, fc) + 90
    bx = int((SIZE - cw) / 2)
    by = y + 46
    d.rounded_rectangle([bx, by, bx + cw, by + 86], radius=43, fill=NAVY)
    d.text((cx - text_w(d, cta, fc) / 2, by + 24), cta, font=fc, fill=WHITE)

    # license in navy text on orange (chip would clash) -> small caption
    lic = "NC General Contractor License #107724"
    fl = font(BOLD, 24)
    d.text((cx - text_w(d, lic, fl) / 2, SIZE - 70), lic, font=fl, fill=NAVY)
    img.save(os.path.join(OUT, "06-cta.png"))


for fn in (post1, post2, post3, post4, post5, post6):
    fn()
    print("built", fn.__name__)

print("\nAll 6 posts ->", OUT)
