#!/usr/bin/env python3
"""Fetch reaction GIFs / memes from the Tenor API as overlay-ready clips.

Searches the official Tenor v2 API (tenor.googleapis.com) and downloads the
matching media into an assets folder so video-use can drop them in as cutaways
or picture-in-picture overlays. Prefers .mp4 (clean for ffmpeg); falls back to
.gif when mp4 isn't offered.

Needs a free key in $TENOR_API_KEY (https://developers.google.com/tenor).
No key -> the tool no-ops with a clear message (rest of the toolchain works).

Usage:
  fetch_tenor.py "padre orgulloso" --limit 5 --out assets/memes
  fetch_tenor.py "mind blown" -n 1 --format gif --content-filter high

Tenor's API terms require attribution ("Powered by Tenor") wherever the GIFs
are shown publicly; see scripts/video-use/README.md.
"""
import argparse
import json
import os
import sys
import urllib.parse

import requests

API = "https://tenor.googleapis.com/v2/search"


def log(msg: str) -> None:
    print(f"[tenor] {msg}", file=sys.stderr)


def main() -> int:
    p = argparse.ArgumentParser(description="Download memes/GIFs from Tenor for video overlays.")
    p.add_argument("query", help="search terms, e.g. 'mind blown'")
    p.add_argument("-n", "--limit", type=int, default=5, help="how many results (default 5)")
    p.add_argument("-o", "--out", default="assets/memes", help="download dir (default assets/memes)")
    p.add_argument("--format", choices=["mp4", "gif", "webm", "tinymp4", "tinygif"],
                   default="mp4", help="preferred media format (default mp4)")
    p.add_argument("--content-filter", choices=["off", "low", "medium", "high"],
                   default="high", help="SFW strictness (default high)")
    p.add_argument("--locale", default="es_ES", help="result locale (default es_ES)")
    p.add_argument("--json", action="store_true", help="print machine-readable JSON to stdout")
    args = p.parse_args()

    key = os.environ.get("TENOR_API_KEY")
    if not key:
        log("TENOR_API_KEY not set — Tenor disabled. Add the key and re-run "
            "(plumbing is installed). See scripts/video-use/README.md.")
        return 0

    os.makedirs(args.out, exist_ok=True)
    # Ask only for the formats we may need to keep the payload small.
    want = [args.format] + [f for f in ("mp4", "gif") if f != args.format]
    params = {
        "q": args.query,
        "key": key,
        "client_key": "fikir-video-use",
        "limit": args.limit,
        "media_filter": ",".join(dict.fromkeys(want)),
        "contentfilter": args.content_filter,
        "locale": args.locale,
    }
    try:
        r = requests.get(API, params=params, timeout=20)
        r.raise_for_status()
    except requests.RequestException as e:
        log(f"request failed: {e}")
        return 1

    results = r.json().get("results", [])
    if not results:
        log(f"no results for {args.query!r}")
        return 0

    downloaded = []
    for item in results:
        formats = item.get("media_formats", {})
        fmt = next((f for f in want if f in formats), None)
        if not fmt:
            continue
        url = formats[fmt]["url"]
        ext = "gif" if "gif" in fmt else ("webm" if "webm" in fmt else "mp4")
        dest = os.path.join(args.out, f"tenor_{item['id']}.{ext}")
        try:
            with requests.get(url, timeout=30, stream=True) as mr:
                mr.raise_for_status()
                with open(dest, "wb") as fh:
                    for chunk in mr.iter_content(8192):
                        fh.write(chunk)
        except (requests.RequestException, OSError) as e:
            log(f"skip {item['id']}: {e}")
            continue
        rec = {
            "path": dest,
            "format": fmt,
            "description": item.get("content_description", ""),
            "dims": formats[fmt].get("dims"),
            "duration": formats[fmt].get("duration"),
            "tenor_url": item.get("itemurl"),
        }
        downloaded.append(rec)
        log(f"saved {dest}  ({rec['description']!r})")

    if args.json:
        print(json.dumps(downloaded, ensure_ascii=False, indent=2))
    else:
        for rec in downloaded:
            print(rec["path"])
    log(f"done — {len(downloaded)} file(s) in {args.out}. Attribution: 'Powered by Tenor'.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
