#!/usr/bin/env python3
"""
Unified AI image-generation CLI wrapper.

Supports three providers per the marketingskills ad-creative skill:
  - gemini   (Nano Banana Pro via Google Gemini API)
  - ideogram (best for text-in-image)
  - flux     (best for photorealism, via Replicate API)

Usage:
  python3 gen-image.py gemini --prompt "..." --out out.png
  python3 gen-image.py gemini --prompt "..." --out out.png --aspect 1:1
  python3 gen-image.py ideogram --prompt "..." --out out.png
  python3 gen-image.py flux --prompt "..." --out out.png --model flux-1.1-pro

Reads API keys from ~/.openclaw/workspace/.env (and ~/.env, env vars).
"""
import argparse
import base64
import json
import os
import sys
import urllib.request
import urllib.error
from pathlib import Path


def load_env():
    """Load API keys from .env files in priority order."""
    paths = [
        Path.home() / ".openclaw" / "workspace" / ".env",
        Path.home() / ".env",
    ]
    env = dict(os.environ)
    for p in paths:
        if not p.exists():
            continue
        try:
            for line in p.read_text().splitlines():
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                k, v = line.split("=", 1)
                v = v.strip().strip('"').strip("'")
                if k not in env or not env[k]:
                    env[k] = v
        except Exception:
            pass
    return env


# ============================================================================
# GEMINI (Nano Banana Pro)
# ============================================================================

def gen_gemini(prompt: str, out_path: str, aspect: str = "1:1",
               model: str = "gemini-2.5-flash-image", env=None) -> bool:
    """Generate via Google Gemini API. Returns True on success."""
    env = env or load_env()
    key = env.get("GEMINI_API_KEY")
    if not key:
        print("ERROR: GEMINI_API_KEY not set.", file=sys.stderr)
        return False

    aspect_str = f"\n\nAspect ratio: {aspect}." if aspect else ""
    full_prompt = prompt + aspect_str

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
    payload = {
        "contents": [{"parts": [{"text": full_prompt}]}],
        "generationConfig": {"responseModalities": ["IMAGE"]},
    }
    data = json.dumps(payload).encode()
    req = urllib.request.Request(
        url, data=data, method="POST",
        headers={
            "Content-Type": "application/json",
            "x-goog-api-key": key,
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            body = json.loads(r.read())
    except urllib.error.HTTPError as e:
        err_body = e.read().decode()[:600]
        print(f"ERROR: Gemini HTTP {e.code}\n{err_body}", file=sys.stderr)
        return False
    except Exception as e:
        print(f"ERROR: Gemini call failed: {e}", file=sys.stderr)
        return False

    # extract image data
    try:
        candidates = body.get("candidates", [])
        if not candidates:
            print(f"ERROR: no candidates in response. Body: {json.dumps(body)[:400]}",
                  file=sys.stderr)
            return False
        parts = candidates[0].get("content", {}).get("parts", [])
        for part in parts:
            inline = part.get("inlineData") or part.get("inline_data")
            if inline and "data" in inline:
                img_bytes = base64.b64decode(inline["data"])
                with open(out_path, "wb") as f:
                    f.write(img_bytes)
                print(f"✓ wrote {out_path} ({len(img_bytes):,} bytes) via Gemini")
                return True
        # if no image found, show what came back
        text_parts = [p.get("text", "") for p in parts if p.get("text")]
        if text_parts:
            print(f"ERROR: Gemini returned text instead of image:\n{text_parts[0][:400]}",
                  file=sys.stderr)
        else:
            print(f"ERROR: No image in Gemini response. Body: {json.dumps(body)[:400]}",
                  file=sys.stderr)
        return False
    except Exception as e:
        print(f"ERROR: parsing Gemini response failed: {e}", file=sys.stderr)
        return False


# ============================================================================
# IDEOGRAM
# ============================================================================

def gen_ideogram(prompt: str, out_path: str, aspect: str = "ASPECT_1_1",
                 model: str = "V_2", env=None) -> bool:
    """Generate via Ideogram API. Requires IDEOGRAM_API_KEY."""
    env = env or load_env()
    key = env.get("IDEOGRAM_API_KEY")
    if not key:
        print("ERROR: IDEOGRAM_API_KEY not set. Get one at https://developer.ideogram.ai/",
              file=sys.stderr)
        return False

    # Normalize aspect
    aspect_map = {
        "1:1": "ASPECT_1_1",
        "9:16": "ASPECT_9_16",
        "16:9": "ASPECT_16_9",
        "4:5": "ASPECT_4_5",
        "5:4": "ASPECT_5_4",
        "3:4": "ASPECT_3_4",
        "4:3": "ASPECT_4_3",
    }
    aspect_norm = aspect_map.get(aspect, aspect)

    url = "https://api.ideogram.ai/generate"
    payload = {
        "image_request": {
            "prompt": prompt,
            "aspect_ratio": aspect_norm,
            "model": model,
            "magic_prompt_option": "AUTO",
        }
    }
    data = json.dumps(payload).encode()
    req = urllib.request.Request(
        url, data=data, method="POST",
        headers={
            "Api-Key": key,
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            body = json.loads(r.read())
    except urllib.error.HTTPError as e:
        print(f"ERROR: Ideogram HTTP {e.code}\n{e.read().decode()[:400]}", file=sys.stderr)
        return False
    except Exception as e:
        print(f"ERROR: Ideogram call failed: {e}", file=sys.stderr)
        return False

    # response has "data" array with "url" pointing to generated image
    images = body.get("data", [])
    if not images:
        print(f"ERROR: no images returned. Body: {json.dumps(body)[:400]}", file=sys.stderr)
        return False
    img_url = images[0].get("url")
    if not img_url:
        print(f"ERROR: no image url. Body: {json.dumps(body)[:400]}", file=sys.stderr)
        return False
    try:
        dl_req = urllib.request.Request(
            img_url,
            headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"})
        with urllib.request.urlopen(dl_req, timeout=60) as r:
            img_bytes = r.read()
        with open(out_path, "wb") as f:
            f.write(img_bytes)
        print(f"✓ wrote {out_path} ({len(img_bytes):,} bytes) via Ideogram")
        return True
    except Exception as e:
        print(f"ERROR: downloading Ideogram image failed: {e}", file=sys.stderr)
        return False


# ============================================================================
# FLUX (via Replicate)
# ============================================================================

def gen_flux(prompt: str, out_path: str, aspect: str = "1:1",
             model: str = "black-forest-labs/flux-1.1-pro", env=None) -> bool:
    """Generate via Replicate API. Requires REPLICATE_API_TOKEN."""
    env = env or load_env()
    key = env.get("REPLICATE_API_TOKEN") or env.get("REPLICATE_API_KEY")
    if not key:
        print("ERROR: REPLICATE_API_TOKEN not set. Get one at https://replicate.com/account/api-tokens",
              file=sys.stderr)
        return False

    # Map aspect to width/height (Flux pro uses width/height, not aspect)
    aspect_dims = {
        "1:1": (1024, 1024),
        "9:16": (768, 1344),
        "16:9": (1344, 768),
        "4:5": (1024, 1280),
        "5:4": (1280, 1024),
    }
    width, height = aspect_dims.get(aspect, (1024, 1024))

    # Create prediction
    url = f"https://api.replicate.com/v1/models/{model}/predictions"
    payload = {
        "input": {
            "prompt": prompt,
            "width": width,
            "height": height,
            "output_format": "png",
            "safety_tolerance": 2,
        }
    }
    data = json.dumps(payload).encode()
    req = urllib.request.Request(
        url, data=data, method="POST",
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Prefer": "wait",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            body = json.loads(r.read())
    except urllib.error.HTTPError as e:
        print(f"ERROR: Replicate HTTP {e.code}\n{e.read().decode()[:400]}", file=sys.stderr)
        return False
    except Exception as e:
        print(f"ERROR: Replicate call failed: {e}", file=sys.stderr)
        return False

    # Output format: "output" can be a URL string or list
    output = body.get("output")
    if not output:
        # might still be processing — poll if status is starting/processing
        get_url = body.get("urls", {}).get("get")
        status = body.get("status")
        if get_url and status in ("starting", "processing"):
            import time
            for _ in range(60):
                time.sleep(2)
                try:
                    pr = urllib.request.Request(get_url,
                        headers={"Authorization": f"Bearer {key}"})
                    with urllib.request.urlopen(pr, timeout=30) as r:
                        body = json.loads(r.read())
                    output = body.get("output")
                    if output:
                        break
                    if body.get("status") in ("failed", "canceled"):
                        print(f"ERROR: Flux failed: {body.get('error', '')}",
                              file=sys.stderr)
                        return False
                except Exception:
                    continue
        if not output:
            print(f"ERROR: no output from Flux. Body: {json.dumps(body)[:400]}",
                  file=sys.stderr)
            return False

    img_url = output[0] if isinstance(output, list) else output
    try:
        with urllib.request.urlopen(img_url, timeout=60) as r:
            img_bytes = r.read()
        with open(out_path, "wb") as f:
            f.write(img_bytes)
        print(f"✓ wrote {out_path} ({len(img_bytes):,} bytes) via Flux")
        return True
    except Exception as e:
        print(f"ERROR: downloading Flux image failed: {e}", file=sys.stderr)
        return False


# ============================================================================
# CLI
# ============================================================================

PROVIDERS = {
    "gemini": gen_gemini,
    "ideogram": gen_ideogram,
    "flux": gen_flux,
}


def main():
    ap = argparse.ArgumentParser(description="AI image generation CLI")
    ap.add_argument("provider", choices=list(PROVIDERS.keys()))
    ap.add_argument("--prompt", required=True, help="Image prompt")
    ap.add_argument("--out", required=True, help="Output file path")
    ap.add_argument("--aspect", default="1:1",
                    help="Aspect ratio: 1:1, 9:16, 16:9, 4:5, etc.")
    ap.add_argument("--model", default=None, help="Provider-specific model")
    args = ap.parse_args()

    fn = PROVIDERS[args.provider]
    kwargs = {"aspect": args.aspect}
    if args.model:
        kwargs["model"] = args.model

    ok = fn(args.prompt, args.out, **kwargs)
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
