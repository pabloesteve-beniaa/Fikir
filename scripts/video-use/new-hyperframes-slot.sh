#!/usr/bin/env bash
# Scaffold an on-brand HyperFrames overlay slot for a video-use edit.
#
# video-use builds animation overlays in <videos_dir>/edit/animations/slot_<id>/
# and points the EDL overlay at the rendered file. This helper scaffolds that
# slot pre-wired with the @estevestevesteve brand system from ./my-video, so
# overlays match the "Padre en modo cine" identity (palette, fonts, grain,
# the installed registry catalog conventions) instead of a blank default.
#
# Usage: scripts/video-use/new-hyperframes-slot.sh <slot_id> [videos_dir]
#   slot_id     identifier for this overlay (e.g. 1, intro, stat-card)
#   videos_dir  the footage folder video-use is editing (default: cwd)
set -euo pipefail

SLOT_ID="${1:?usage: new-hyperframes-slot.sh <slot_id> [videos_dir]}"
VIDEOS_DIR="${2:-$PWD}"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
BRAND_DIR="$REPO_DIR/my-video"
SLOT="$VIDEOS_DIR/edit/animations/slot_${SLOT_ID}"

if [ ! -d "$BRAND_DIR" ]; then
  echo "error: brand project not found at $BRAND_DIR" >&2
  exit 1
fi

mkdir -p "$SLOT"
echo "Scaffolding HyperFrames slot: $SLOT" >&2
npx --yes hyperframes@0.6.64 init "$SLOT" --example blank --non-interactive --skip-skills >/dev/null

# Inherit the brand system so the overlay is on-identity from the first frame.
cp "$BRAND_DIR/design.md" "$SLOT/design.md"
mkdir -p "$SLOT/fonts"
cp "$BRAND_DIR"/fonts/*.woff2 "$SLOT/fonts/" 2>/dev/null || true
cp "$BRAND_DIR/gsap.min.js" "$SLOT/gsap.min.js" 2>/dev/null || true

cat >&2 <<EOF
Slot ready: $SLOT
  - design.md   inherited from my-video (@estevestevesteve brand)
  - fonts/      Caveat .woff2 (Bebas Neue + Inter auto-resolve)
  - gsap.min.js vendored for offline render

Next:
  1. Author the overlay HTML in $SLOT (9:16, transparent bg for WebM alpha).
  2. Verify:  npx hyperframes lint "$SLOT" && npx hyperframes validate "$SLOT"
  3. Render:  npx hyperframes render "$SLOT" --format webm -o "$SLOT/render.webm"
  4. Point the video-use EDL overlay 'file' at $SLOT/render.webm
EOF
