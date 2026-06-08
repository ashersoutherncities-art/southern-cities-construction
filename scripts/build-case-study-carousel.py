#!/usr/bin/env python3
"""
Organic case-study carousel — real novation deal ($50K -> $78,100, $28,100 spread).
Branded cards; the user inserts their own cropped deposit screenshot as the "receipt" card.
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
OUT = os.path.join(ROOT, "case-study-carousel")
os.makedirs(OUT, exist_ok=True)
F = "/System/Library/Fonts/Supplemental/"
LOGO = os.path.join(ROOT, "public", "sc-construction-logo.png")
LOGO_REV = os.path.join(ROOT, "public", "sc-construction-logo-reversed.png")
LOGO_NAVY = os.path.join(ROOT, "public", "sc-construction-logo-navy.png")
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


def block(d, lines, f, y, fill, lh, cw=None, ax=0, x=None):
    for ln in lines:
        dx = (ax + (cw - tw(d, ln, f)) / 2) if cw is not None else x
        d.text((dx, y), ln, font=f, fill=fill)
        y += lh
    return y


def logo(img, path, w, y):
    lg = Image.open(path).convert("RGBA")
    r = w / lg.width
    lg = lg.resize((w, int(lg.height * r)), Image.LANCZOS)
    img.paste(lg, (int((SIZE - lg.width) / 2), y), lg)


def accent(d, cx, y, w=120, h=8, c=ORANGE):
    d.rounded_rectangle([cx - w // 2, y, cx + w // 2, y + h], radius=h // 2, fill=c)


def swipe(d, c=ORANGE):
    f = font(BOLD, 28)
    d.text((SIZE - 200, SIZE - 110), "swipe →", font=f, fill=c)


def counter(d, idx, total, cx, y, c=ORANGE):
    f = font(BLACK, 26)
    t = f"{idx}/{total}"
    d.text((cx - tw(d, t, f) / 2, y), t, font=f, fill=c)


def eyebrow(d, t, cx, y, c=ORANGE):
    f = font(BOLD, 26)
    d.text((cx - tw(d, t, f) / 2, y), t, font=f, fill=c)


def license_line(d, fill, y=None):
    label = "Southern Cities Construction · NC GC #107724"
    f = font(BOLD, 22)
    if y is None:
        y = SIZE - 54
    d.text((SIZE / 2 - tw(d, label, f) / 2, y), label, font=f, fill=fill)


TOTAL = 5


def card1():
    img = Image.new("RGB", (SIZE, SIZE), NAVY); d = ImageDraw.Draw(img); cx = SIZE // 2
    d.rectangle([0, 0, SIZE, 12], fill=ORANGE)
    logo(img, LOGO_REV, 210, 70)
    counter(d, 1, TOTAL, cx, 250); eyebrow(d, "REAL NC DEAL", cx, 300)
    fb = font(BLACK, 96)
    d.text((cx - tw(d, "$50K → $78,100", fb) / 2, 380), "$50K → $78,100", font=fb, fill=WHITE)
    accent(d, cx, 510)
    sub = "One novation. A $28,100 spread. No rehab, no hammer, no holding costs."
    y = block(d, wrap(d, sub, font(REG, 32), 840), font(REG, 32), 560, MUTED_NAVY, 44, cw=840, ax=120)
    swipe(d); license_line(d, MUTED_NAVY)
    img.save(os.path.join(OUT, "case-1-hook.png"))


def card2():
    img = Image.new("RGB", (SIZE, SIZE), CREAM); d = ImageDraw.Draw(img); cx = SIZE // 2
    d.rectangle([0, 0, SIZE, 12], fill=ORANGE)
    logo(img, LOGO, 210, 70)
    counter(d, 2, TOTAL, cx, 250); eyebrow(d, "THE DEAL", cx, 300)
    head = "900 sq ft. Rough shape. Just outside Charlotte."
    y = block(d, wrap(d, head, font(BLACK, 56), 900), font(BLACK, 56), 360, NAVY, 68, cw=900, ax=90)
    accent(d, cx, y + 20)
    body = "Locked under contract at $50,000 — the kind of beat-up property most buyers lowball the second they walk it."
    block(d, wrap(d, body, font(REG, 32), 840), font(REG, 32), y + 56, MUTED_CREAM, 44, cw=840, ax=120)
    swipe(d, NAVY); license_line(d, MUTED_CREAM)
    img.save(os.path.join(OUT, "case-2-deal.png"))


def card3():
    img = Image.new("RGB", (SIZE, SIZE), NAVY); d = ImageDraw.Draw(img); cx = SIZE // 2
    d.rectangle([0, 0, SIZE, 12], fill=ORANGE)
    logo(img, LOGO_REV, 210, 70)
    counter(d, 3, TOTAL, cx, 250); eyebrow(d, "THE RESULT", cx, 300)
    fb = font(BLACK, 150)
    d.text((cx - tw(d, "$28,100", fb) / 2, 360), "$28,100", font=fb, fill=WHITE)
    fs = font(BOLD, 40)
    d.text((cx - tw(d, "wired on one deal", fs) / 2, 540), "wired on one deal", font=fs, fill=ORANGE)
    accent(d, cx, 620)
    body = "The spread between a $50K contract and a $78,100 exit — paid straight to closing."
    block(d, wrap(d, body, font(REG, 31), 820), font(REG, 31), 670, MUTED_NAVY, 44, cw=820, ax=130)
    swipe(d); license_line(d, MUTED_NAVY)
    img.save(os.path.join(OUT, "case-3-result.png"))


def card4():
    img = Image.new("RGB", (SIZE, SIZE), CREAM); d = ImageDraw.Draw(img); cx = SIZE // 2
    d.rectangle([0, 0, SIZE, 12], fill=ORANGE)
    logo(img, LOGO, 210, 70)
    counter(d, 4, TOTAL, cx, 250); eyebrow(d, "WHY IT CLOSED AT THE TOP", cx, 300)
    head = "I knew the real rehab number."
    y = block(d, wrap(d, head, font(BLACK, 58), 900), font(BLACK, 58), 360, NAVY, 70, cw=900, ax=90)
    accent(d, cx, y + 20)
    body = ("I'm a licensed NC GC — so I knew exactly what this property needed. That number is "
            "what lets a beat-up 900 sq ft house exit at $78,100 instead of getting chopped.")
    block(d, wrap(d, body, font(REG, 31), 840), font(REG, 31), y + 56, MUTED_CREAM, 44, cw=840, ax=120)
    swipe(d, NAVY); license_line(d, MUTED_CREAM)
    img.save(os.path.join(OUT, "case-4-why.png"))


def card5():
    img = Image.new("RGB", (SIZE, SIZE), ORANGE); d = ImageDraw.Draw(img); cx = SIZE // 2
    d.rectangle([0, 0, SIZE, 12], fill=NAVY)
    logo(img, LOGO_NAVY, 210, 70)
    counter(d, 5, TOTAL, cx, 250, c=NAVY); eyebrow(d, "YOUR MOVE", cx, 300, c=NAVY)
    head = "Want that number on YOUR deals?"
    y = block(d, wrap(d, head, font(BLACK, 58), 900), font(BLACK, 58), 360, NAVY, 70, cw=900, ax=90)
    body = "The free $25–40K Assignment Playbook shows you how to attach a GC-verified rehab number buyers can't argue with."
    y = block(d, wrap(d, body, font(BOLD, 31), 840), font(BOLD, 31), y + 30, (70, 46, 22), 44, cw=840, ax=120)
    pill = "Link in bio → grab the Playbook"
    fp = font(BLACK, 32); pw = tw(d, pill, fp) + 84; px = int((SIZE - pw) / 2); py = y + 44
    d.rounded_rectangle([px, py, px + pw, py + 84], radius=42, fill=NAVY)
    d.text((cx - tw(d, pill, fp) / 2, py + 24), pill, font=fp, fill=WHITE)
    lic = "NC General Contractor License #107724"
    d.text((cx - tw(d, lic, font(BOLD, 24)) / 2, SIZE - 66), lic, font=font(BOLD, 24), fill=NAVY)
    img.save(os.path.join(OUT, "case-5-cta.png"))


for fn in (card1, card2, card3, card4, card5):
    fn(); print("built", fn.__name__)
print("->", OUT)
