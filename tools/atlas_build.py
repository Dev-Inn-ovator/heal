#!/usr/bin/env python3
"""Build HEAL muscle-atlas figures.

Source art (tools/atlas-src/*.jpg) is text-free: every labelled muscle is painted
in its own flat hue on grey anatomy. This script finds each hue region, picks the
most interior pixel as the pointer target, lays out non-overlapping labels in the
white side margins and writes:

  assets/muscles/atlas/<id>.jpg        padded web image (labels are drawn by the site)
  assets/muscles/atlas/<id>-thumb.jpg  small square thumbnail for region cards
  js/atlas.js                          window.ATLAS label/pointer data
  .qa/<id>-preview.png                 preview with pointers burned in, for review

Pure Pillow (no numpy) so it runs on the stock system Python:
    python3 tools/atlas_build.py
"""
import json
import os
from collections import deque

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "tools", "atlas-src")
OUT = os.path.join(ROOT, "assets", "muscles", "atlas")
QA = os.path.join(ROOT, ".qa")
VERSION = "atlas7"

SRC_SIZE = 1024               # hue-segmented figures are square
AN = 512                      # analysis resolution
K = SRC_SIZE / AN
PAD = 288                     # default white label margin added on each side
MARGIN_Y, GAP = 70, 92

# Pillow HSV hue is 0-255.
HUES = {
    "red": [(0, 12), (238, 255)],
    "yellow": [(22, 48)],
    "green": [(55, 110)],
    "cyan": [(118, 141)],
    "blue": [(142, 178)],
    "magenta": [(190, 237)],
}
MIN_SAT, MIN_VAL, MIN_AREA = 80, 70, 120

FIGURES = [
    {
        "id": "arm-anterior",
        "src": "arm-anterior.jpg",
        "title": "Right arm — front (anterior) view",
        "alt": "Anterior view of the right arm: biceps long head red, biceps short head blue, brachialis yellow, brachioradialis green, forearm flexors magenta.",
        "labels": [
            {"key": "biceps-long", "name": "Biceps\nlong head", "color": "red", "side": "L"},
            {"key": "brachialis", "name": "Brachialis", "color": "yellow", "side": "L", "multi": True},
            {"key": "brachioradialis", "name": "Brachioradialis", "color": "green", "side": "L"},
            {"key": "biceps-short", "name": "Biceps\nshort head", "color": "blue", "side": "R"},
            {"key": "flexors", "name": "Forearm\nflexors", "color": "magenta", "side": "R"},
        ],
    },
    {
        "id": "arm-posterior",
        "src": "arm-posterior.jpg",
        "title": "Right arm — back (posterior) view",
        "alt": "Posterior view of the right arm: triceps long head red, lateral head blue, medial head yellow, forearm extensors cyan.",
        "labels": [
            {"key": "triceps-long", "name": "Triceps\nlong head", "color": "red", "side": "L"},
            {"key": "triceps-medial", "name": "Triceps\nmedial head", "color": "yellow", "side": "L"},
            {"key": "triceps-lateral", "name": "Triceps\nlateral head", "color": "blue", "side": "R"},
            {"key": "extensors", "name": "Forearm\nextensors", "color": "cyan", "side": "R"},
        ],
    },
    {
        "id": "chest",
        "src": "chest.jpg",
        "title": "Pectoralis major — front view",
        "alt": "Front view of the chest: pectoralis major clavicular head red, sternocostal head blue, inferior fibres yellow.",
        "labels": [
            {"key": "pec-clavicular", "name": "Clavicular\nhead", "color": "red", "side": "R", "pick": "rightmost"},
            {"key": "pec-sternocostal", "name": "Sternocostal\nhead", "color": "blue", "side": "R", "pick": "rightmost"},
            {"key": "pec-abdominal", "name": "Inferior\nfibres", "color": "yellow", "side": "R", "pick": "rightmost"},
        ],
    },
    {
        "id": "shoulder-anterior",
        "src": "shoulder-anterior.jpg",
        "title": "Deltoid — front view",
        "alt": "Front view of both shoulders: anterior deltoid red, lateral deltoid blue.",
        "labels": [
            {"key": "delt-anterior", "name": "Anterior\ndeltoid", "color": "red", "side": "L", "pick": "leftmost"},
            {"key": "delt-lateral", "name": "Lateral\ndeltoid", "color": "blue", "side": "L", "pick": "leftmost"},
        ],
    },
    {
        "id": "shoulder-posterior",
        "src": "shoulder-posterior.jpg",
        "title": "Deltoid — back view",
        "alt": "Back view of both shoulders: posterior deltoid yellow, lateral deltoid blue.",
        "labels": [
            {"key": "delt-posterior", "name": "Posterior\ndeltoid", "color": "yellow", "side": "R", "pick": "rightmost"},
            {"key": "delt-lateral", "name": "Lateral\ndeltoid", "color": "blue", "side": "R", "pick": "rightmost"},
        ],
    },
    {
        "id": "core",
        "src": "core.jpg",
        "title": "Abdominal wall — front view",
        "alt": "Front view of the abdomen: rectus abdominis red (upper and lower regions marked), external obliques blue.",
        "labels": [
            {"key": "rectus-upper", "name": "Rectus abdominis\n(upper region)", "color": "red", "side": "L",
             "region": {"xmax": 512, "ymax": 690}},
            {"key": "rectus-lower", "name": "Rectus abdominis\n(lower region)", "color": "red", "side": "L",
             "region": {"xmax": 512, "ymin": 740}},
            {"key": "external-oblique", "name": "External\noblique", "color": "blue", "side": "R", "pick": "rightmost"},
        ],
    },
    {
        "id": "overview-front",
        "src": "overview-front.jpg",
        "crop": (150, 0, 714, 1152),
        "pad": 280,
        "thumb": False,
        "title": "Whole body — front view",
        "alt": "Front view of the whole body with the main muscle groups in red: deltoid, pectoralis major, biceps, forearm, rectus abdominis, quadriceps and tibialis anterior.",
        "labels": [
            {"key": "shoulders", "name": "Deltoid\n(shoulder)", "at": [(312, 253)], "side": "L", "snap": False},
            {"key": "biceps", "name": "Biceps", "at": [(282, 330)], "side": "L"},
            {"key": "forearms", "name": "Forearm\nmuscles", "at": [(262, 432)], "side": "L"},
            {"key": "quadriceps", "name": "Quadriceps", "at": [(351, 646)], "side": "L", "snap": False},
            {"key": "tibialis", "name": "Tibialis anterior\n(shin)", "at": [(340, 870)], "side": "L"},
            {"key": "chest", "name": "Pectoralis major\n(chest)", "at": [(500, 245)], "side": "R"},
            {"key": "abdominals", "name": "Rectus abdominis\n(abs)", "at": [(460, 371)], "side": "R", "snap": False},
        ],
    },
    {
        "id": "overview-back",
        "src": "overview-back.jpg",
        "crop": (150, 0, 714, 1152),
        "pad": 280,
        "thumb": False,
        "title": "Whole body — back view",
        "alt": "Back view of the whole body with the main muscle groups in red: trapezius, deltoid, triceps, latissimus dorsi, gluteus maximus, hamstrings and calves; the lower-back area over the erector spinae is grey.",
        "labels": [
            {"key": "traps", "name": "Trapezius\n(upper)", "at": [(350, 195)], "side": "L"},
            {"key": "shoulders", "name": "Deltoid\n(shoulder)", "at": [(311, 250)], "side": "L", "snap": False},
            {"key": "triceps", "name": "Triceps", "at": [(265, 330)], "side": "L"},
            {"key": "lats", "name": "Latissimus\ndorsi (lats)", "at": [(500, 340)], "side": "R"},
            {"key": "lower back", "name": "Lower back\n(erector spinae)", "at": [(432, 440)], "side": "R", "snap": False},
            {"key": "glutes", "name": "Gluteus\nmaximus", "at": [(480, 530)], "side": "R"},
            {"key": "hamstrings", "name": "Hamstrings", "at": [(485, 680)], "side": "R"},
            {"key": "calves", "name": "Calves", "at": [(480, 850)], "side": "R"},
        ],
    },
]


def classify(img):
    """Return {color: L-mask} at analysis resolution."""
    small = img.resize((AN, AN), Image.BILINEAR)
    hsv = small.convert("HSV").load()
    masks = {c: Image.new("L", (AN, AN), 0) for c in HUES}
    px = {c: m.load() for c, m in masks.items()}
    for y in range(AN):
        for x in range(AN):
            h, s, v = hsv[x, y]
            if s < MIN_SAT or v < MIN_VAL:
                continue
            for c, ranges in HUES.items():
                if any(lo <= h <= hi for lo, hi in ranges):
                    px[c][x, y] = 255
                    break
    clean = {c: m.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3)) for c, m in masks.items()}
    return small, clean


def restrict(mask, region):
    if not region:
        return mask
    m = mask.copy()
    d = ImageDraw.Draw(m)
    s = lambda v: int(v / K)
    if "xmin" in region:
        d.rectangle([0, 0, s(region["xmin"]), AN], fill=0)
    if "xmax" in region:
        d.rectangle([s(region["xmax"]), 0, AN, AN], fill=0)
    if "ymin" in region:
        d.rectangle([0, 0, AN, s(region["ymin"])], fill=0)
    if "ymax" in region:
        d.rectangle([0, s(region["ymax"]), AN, AN], fill=0)
    return m


def components(mask):
    px = mask.load()
    seen = bytearray(AN * AN)
    comps = []
    for y0 in range(AN):
        for x0 in range(AN):
            if px[x0, y0] == 0 or seen[y0 * AN + x0]:
                continue
            q = deque([(x0, y0)])
            seen[y0 * AN + x0] = 1
            pts = []
            while q:
                x, y = q.popleft()
                pts.append((x, y))
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < AN and 0 <= ny < AN and not seen[ny * AN + nx] and px[nx, ny]:
                        seen[ny * AN + nx] = 1
                        q.append((nx, ny))
            if len(pts) >= MIN_AREA:
                comps.append(pts)
    return comps


def interior_point(pts):
    """Deepest pixel of a component (survives the most 3x3 erosions), nearest the core centroid."""
    m = Image.new("L", (AN, AN), 0)
    mp = m.load()
    for x, y in pts:
        mp[x, y] = 255
    last = m
    for _ in range(120):
        nxt = last.filter(ImageFilter.MinFilter(3))
        if not nxt.getbbox():
            break
        last = nxt
    lp = last.load()
    bx = last.getbbox()
    core = [(x, y) for y in range(bx[1], bx[3]) for x in range(bx[0], bx[2]) if lp[x, y]]
    cx = sum(p[0] for p in core) / len(core)
    cy = sum(p[1] for p in core) / len(core)
    return min(core, key=lambda p: (p[0] - cx) ** 2 + (p[1] - cy) ** 2)


def mean_hex(small, pts):
    sp = small.load()
    step = max(1, len(pts) // 4000)
    sample = pts[::step]
    r = g = b = 0
    for x, y in sample:
        pr, pg, pb = sp[x, y]
        r += pr; g += pg; b += pb
    n = len(sample)
    return "#%02x%02x%02x" % (round(r / n), round(g / n), round(b / n))


def pick_components(comps, label):
    how = label.get("pick", "largest")
    if label.get("multi"):
        return sorted(comps, key=len, reverse=True)[:3]
    cen = lambda c: sum(p[0] for p in c) / len(c)
    if how == "leftmost":
        return [min(comps, key=cen)]
    if how == "rightmost":
        return [max(comps, key=cen)]
    return [max(comps, key=len)]


def layout(labels, w, h, pad):
    top, bottom = MARGIN_Y, h - MARGIN_Y
    badge_x = {"L": pad - 36, "R": w - pad + 36}
    for side in ("L", "R"):
        items = sorted([l for l in labels if l["side"] == side], key=lambda l: l["anchors"][0][1])
        ys = [min(max(l["anchors"][0][1], top), bottom) for l in items]
        for i in range(1, len(ys)):
            ys[i] = max(ys[i], ys[i - 1] + GAP)
        if ys and ys[-1] > bottom:
            ys[-1] = bottom
            for i in range(len(ys) - 2, -1, -1):
                ys[i] = min(ys[i], ys[i + 1] - GAP)
        for l, y in zip(items, ys):
            l["lx"], l["ly"] = badge_x[side], round(y)
    # Figure definitions list labels in their intended educational order.
    for n, l in enumerate(labels, 1):
        l["n"] = n


SNAP_R = 45                   # px (source) search radius around a hand-placed hint


def red_depth(img):
    """Half-res map of how many 3x3 erosions each red-muscle pixel survives."""
    w, h = img.width // 2, img.height // 2
    hsv = img.resize((w, h), Image.BILINEAR).convert("HSV")
    mask = Image.new("L", (w, h), 0)
    mp, hp = mask.load(), hsv.load()
    for y in range(h):
        for x in range(w):
            hh, sat, v = hp[x, y]
            if sat > 80 and v > 70 and (hh < 15 or hh > 235):
                mp[x, y] = 255
    mask = mask.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3))
    depth = [[0] * w for _ in range(h)]
    cur = mask
    for i in range(1, 40):
        cp = cur.load()
        any_on = False
        for y in range(h):
            row = depth[y]
            for x in range(w):
                if cp[x, y]:
                    row[x] = i
                    any_on = True
        if not any_on:
            break
        cur = cur.filter(ImageFilter.MinFilter(3))
    return depth


def snap(depth, x, y):
    """Deepest red pixel within SNAP_R of the hint (ties -> closest to hint)."""
    hx, hy, r = x // 2, y // 2, SNAP_R // 2
    best = None
    for yy in range(max(0, hy - r), min(len(depth), hy + r + 1)):
        for xx in range(max(0, hx - r), min(len(depth[0]), hx + r + 1)):
            d2 = (xx - hx) ** 2 + (yy - hy) ** 2
            if d2 > r * r:
                continue
            key = (depth[yy][xx], -d2)
            if best is None or key > best[0]:
                best = (key, xx, yy)
    if not best or best[0][0] < 3:
        raise SystemExit(f"no red muscle near hint ({x},{y})")
    return best[1] * 2 + 1, best[2] * 2 + 1


COMPACT_M = 110               # white margin kept around the art in the compact (phone) crop


def compact_layout(canvas, labels, w, h):
    """Crop to the artwork plus a small margin and place badges just outside it."""
    gray = canvas.convert("L").point(lambda v: 255 if v < 235 else 0)
    bx0, by0, bx1, by1 = gray.getbbox()
    x0, x1 = max(0, bx0 - COMPACT_M), min(w, bx1 + COMPACT_M)
    y0, y1 = max(0, by0 - 30), min(h, by1 + 30)
    pos = {}
    for side in ("L", "R"):
        items = sorted([l for l in labels if l["side"] == side], key=lambda l: l["anchors"][0][1])
        top, bottom = y0 + 50, y1 - 50
        ys = [min(max(l["anchors"][0][1], top), bottom) for l in items]
        for i in range(1, len(ys)):
            ys[i] = max(ys[i], ys[i - 1] + GAP)
        if ys and ys[-1] > bottom:
            ys[-1] = bottom
            for i in range(len(ys) - 2, -1, -1):
                ys[i] = min(ys[i], ys[i + 1] - GAP)
        bx = x0 + 48 if side == "L" else x1 - 48
        for l, y in zip(items, ys):
            pos[l["key"]] = [bx, round(y)]
    return {"x": x0, "y": y0, "w": x1 - x0, "h": y1 - y0, "pos": pos}


def font(size, bold=False):
    name = "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"
    try:
        return ImageFont.truetype(os.path.join("/usr/share/fonts/truetype/dejavu", name), size)
    except OSError:
        return ImageFont.load_default()


def render_preview(canvas, fig):
    im = canvas.copy()
    d = ImageDraw.Draw(im)
    f, fb = font(24), font(22, True)
    for l in fig["labels"]:
        bx, by = l["lx"], l["ly"]
        for ax, ay in l["anchors"]:
            d.line([(bx, by), (ax, ay)], fill="#16201b", width=3)
            d.ellipse([ax - 8, ay - 8, ax + 8, ay + 8], fill="white", outline="#16201b", width=3)
        d.ellipse([bx - 20, by - 20, bx + 20, by + 20], fill=l["hex"], outline="#16201b", width=2)
        d.text((bx, by), str(l["n"]), fill="white", font=fb, anchor="mm")
        lines = l["name"].split("\n")
        for i, t in enumerate(lines):
            ty = by + (i - (len(lines) - 1) / 2) * 28
            if l["side"] == "L":
                d.text((bx - 30, ty), t, fill="#16201b", font=f, anchor="rm")
            else:
                d.text((bx + 30, ty), t, fill="#16201b", font=f, anchor="lm")
    im.save(os.path.join(QA, fig["id"] + "-preview.png"))


def build(fig):
    img = Image.open(os.path.join(SRC, fig["src"])).convert("RGB")
    pad = fig.get("pad", PAD)
    cx0, cy0 = 0, 0
    report = []
    if any("at" not in l for l in fig["labels"]):
        assert img.size == (SRC_SIZE, SRC_SIZE), fig["src"]
        small, masks = classify(img)
    if "crop" in fig:
        cx0, cy0 = fig["crop"][:2]
    depth = red_depth(img) if any(l.get("snap", True) and "at" in l for l in fig["labels"]) else None
    for l in fig["labels"]:
        if "at" in l:
            pts = [snap(depth, x, y) if l.get("snap", True) else (x, y) for x, y in l["at"]]
            l["anchors"] = [(x - cx0 + pad, y - cy0) for x, y in pts]
            l["hex"] = l.get("hex", "#c8463f")
            report.append(f"  {l['key']:<18} manual   anchors={l['anchors']}")
            continue
        comps = components(restrict(masks[l["color"]], l.get("region")))
        if not comps:
            raise SystemExit(f"{fig['id']}: no '{l['color']}' region for {l['key']}")
        chosen = pick_components(comps, l)
        l["anchors"] = []
        for c in chosen:
            x, y = interior_point(c)
            l["anchors"].append((round(x * K + K / 2 + pad), round(y * K + K / 2)))
        l["hex"] = mean_hex(small, chosen[0])
        report.append(f"  {l['key']:<18} {l['color']:<8} comps={len(comps)} anchors={l['anchors']} {l['hex']}")

    if "crop" in fig:
        img = img.crop(fig["crop"])
    sw, sh = img.size
    W, H = sw + 2 * pad, sh
    layout(fig["labels"], W, H, pad)

    # Whiten the faint off-white generator background so the padding is seamless.
    px = img.load()
    for y in range(sh):
        for x in range(sw):
            r, g, b = px[x, y]
            if r > 238 and g > 238 and b > 238:
                px[x, y] = (255, 255, 255)
    canvas = Image.new("RGB", (W, H), "white")
    canvas.paste(img, (pad, 0))
    canvas.save(os.path.join(OUT, fig["id"] + ".jpg"), quality=84, optimize=True, progressive=True)
    if fig.get("thumb", True):
        art = img.convert("L").point(lambda v: 255 if v < 235 else 0).getbbox()
        m = 24
        thumb = img.crop((max(0, art[0] - m), max(0, art[1] - m), min(sw, art[2] + m), min(sh, art[3] + m)))
        thumb.thumbnail((480, 480), Image.LANCZOS)
        thumb.save(os.path.join(OUT, fig["id"] + "-thumb.jpg"), quality=80, optimize=True, progressive=True)
    render_preview(canvas, fig)
    compact = compact_layout(canvas, fig["labels"], W, H)

    print(fig["id"])
    print("\n".join(report))
    return {
        "src": f"assets/muscles/atlas/{fig['id']}.jpg",
        "thumb": f"assets/muscles/atlas/{fig['id']}-thumb.jpg" if fig.get("thumb", True) else None,
        "w": W, "h": H,
        "title": fig["title"],
        "alt": fig["alt"],
        "compact": compact,
        "labels": [
            {"n": l["n"], "key": l["key"], "name": l["name"].replace("\n", " "), "lines": l["name"].split("\n"),
             "side": l["side"], "color": l["hex"], "lx": l["lx"], "ly": l["ly"],
             "anchors": [list(a) for a in l["anchors"]]}
            for l in sorted(fig["labels"], key=lambda l: l["n"])
        ],
    }


def build_leg_crops():
    """Keep the approved Legs source untouched, but exclude its incorrect front-shin callouts."""
    src = Image.open(os.path.join(ROOT, "assets", "muscles", "parts-quads.jpg")).convert("RGB")
    crops = {
        "legs-front-thighs.jpg": (0, 76, 590, 395),
        "legs-posterior.jpg": (550, 76, 1024, 682),
    }
    for name, box in crops.items():
        src.crop(box).save(
            os.path.join(ROOT, "assets", "muscles", name),
            quality=86,
            optimize=True,
            progressive=True,
        )


def main():
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(QA, exist_ok=True)
    build_leg_crops()
    data = {"version": VERSION, "figures": {f["id"]: build(f) for f in FIGURES}}
    js = ("/* Generated by tools/atlas_build.py — do not edit by hand. */\n"
          "window.ATLAS = " + json.dumps(data, indent=1, ensure_ascii=False) + ";\n")
    with open(os.path.join(ROOT, "js", "atlas.js"), "w", encoding="utf-8") as fh:
        fh.write(js)
    print("wrote js/atlas.js")


if __name__ == "__main__":
    main()
