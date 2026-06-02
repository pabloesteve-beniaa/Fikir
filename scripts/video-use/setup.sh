#!/usr/bin/env bash
# Idempotent installer for browser-use/video-use, wired for this repo.
#
# Installs the video-use Claude Code skill (transcript-driven video cuts:
# filler/dead-space removal, color grading, audio fades, burned subtitles,
# animation overlays) and everything it needs to run in a sandbox:
#   - clones/updates the repo to a stable path
#   - installs its Python deps into the active interpreter
#   - provisions ffmpeg + ffprobe in userspace (no apt in this sandbox)
#   - symlinks the skill into ~/.claude/skills/video-use
#   - configures the ElevenLabs key from $ELEVENLABS_API_KEY if present
#
# Safe to run repeatedly. Logs go to stderr so a SessionStart hook keeps a
# clean stdout. Run manually any time: bash scripts/video-use/setup.sh
set -euo pipefail

VU_DIR="${VIDEO_USE_DIR:-$HOME/Developer/video-use}"
VU_REPO="https://github.com/browser-use/video-use"
SKILLS_DIR="$HOME/.claude/skills"
LOCAL_BIN="$HOME/.local/bin"

log() { printf '[video-use] %s\n' "$*" >&2; }

# 1. Clone or update the skill repo (outside this repo; never committed).
if [ -d "$VU_DIR/.git" ]; then
  log "updating $VU_DIR"
  git -C "$VU_DIR" pull --ff-only --quiet 2>/dev/null || log "pull skipped (offline or diverged)"
else
  log "cloning video-use -> $VU_DIR"
  mkdir -p "$(dirname "$VU_DIR")"
  git clone --depth 1 "$VU_REPO" "$VU_DIR" --quiet
fi

# 2. Python deps into the active interpreter (so `python3 helpers/*.py` works
#    for the agent without a venv activation step). Skip if already satisfied.
if ! python3 -c "import requests, librosa, numpy, PIL, matplotlib" >/dev/null 2>&1; then
  log "installing python deps (pip install -e .)"
  (cd "$VU_DIR" && pip install -q -e .)
else
  log "python deps already satisfied"
fi

# 3. ffmpeg + ffprobe. apt is blocked in this sandbox, so use the static-ffmpeg
#    PyPI package (ships both binaries) and link them onto PATH.
if ! command -v ffmpeg >/dev/null 2>&1 || ! command -v ffprobe >/dev/null 2>&1; then
  log "provisioning static ffmpeg/ffprobe"
  pip install -q static-ffmpeg
  python3 - "$LOCAL_BIN" <<'PY'
import os, shutil, sys
import static_ffmpeg
static_ffmpeg.add_paths()  # downloads binaries on first run, prepends to PATH
bindir = sys.argv[1]
os.makedirs(bindir, exist_ok=True)
for name in ("ffmpeg", "ffprobe"):
    src = shutil.which(name)
    if not src:
        print(f"WARN: {name} not found after static-ffmpeg", file=sys.stderr)
        continue
    dst = os.path.join(bindir, name)
    if os.path.islink(dst) or os.path.exists(dst):
        os.remove(dst)
    os.symlink(src, dst)
    print(f"linked {name} -> {src}", file=sys.stderr)
PY
else
  log "ffmpeg/ffprobe already on PATH"
fi
export PATH="$LOCAL_BIN:$PATH"

# 4. Register the skill (symlink the whole repo dir — helpers sit next to SKILL.md).
mkdir -p "$SKILLS_DIR"
ln -sfn "$VU_DIR" "$SKILLS_DIR/video-use"
log "skill linked: $SKILLS_DIR/video-use -> $VU_DIR"

# 5. ElevenLabs (Scribe) key — required for transcript-driven cuts.
#    Use the env var if the session provides it; never write a committed key.
if [ -n "${ELEVENLABS_API_KEY:-}" ]; then
  printf 'ELEVENLABS_API_KEY=%s\n' "$ELEVENLABS_API_KEY" > "$VU_DIR/.env"
  chmod 600 "$VU_DIR/.env"
  log "ELEVENLABS_API_KEY written to $VU_DIR/.env"
else
  log "ELEVENLABS_API_KEY not set — transcription disabled until provided"
fi

# 6. Persist PATH for the rest of the session (SessionStart hook contract).
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo "export PATH=\"$LOCAL_BIN:\$PATH\"" >> "$CLAUDE_ENV_FILE"
fi

# 7. Verify.
if ffprobe -version >/dev/null 2>&1; then log "ffprobe OK"; else log "WARN ffprobe missing"; fi
if python3 "$VU_DIR/helpers/timeline_view.py" --help >/dev/null 2>&1; then
  log "helpers OK"
else
  log "WARN helpers check failed"
fi
log "done"
