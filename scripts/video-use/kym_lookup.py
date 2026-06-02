#!/usr/bin/env python3
"""KnowYourMeme reference lookup (no scraping).

KnowYourMeme has no public API and blocks automated requests (HTTP 403 via
Cloudflare), so this is a *reference* helper: given a query it prints the
KnowYourMeme search URL — and a guessed direct entry URL — to open in a browser
when you need a meme's origin, name, year, or usage context before deciding
whether to use it as a visual aid. It does not download anything.

For downloadable overlay media use fetch_tenor.py instead.

Usage:
  kym_lookup.py "distracted boyfriend"
  kym_lookup.py drake hotline bling
"""
import sys
import urllib.parse

BASE = "https://knowyourmeme.com"


def main(argv: list[str]) -> int:
    if not argv:
        print("usage: kym_lookup.py <meme name or terms>", file=sys.stderr)
        return 2
    query = " ".join(argv)
    search_url = f"{BASE}/search?q={urllib.parse.quote(query)}"
    slug = "-".join(query.lower().split())
    guess_url = f"{BASE}/memes/{urllib.parse.quote(slug)}"

    print(f"KnowYourMeme reference for: {query!r}")
    print(f"  search: {search_url}")
    print(f"  likely entry: {guess_url}")
    print()
    print("Open in a browser for origin / year / usage context. KYM blocks")
    print("automated access, so nothing is fetched here. Need a downloadable")
    print("clip? -> fetch_tenor.py \"" + query + "\"")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
