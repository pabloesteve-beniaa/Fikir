#!/bin/bash
# SessionStart hook: provision the video-use video-cut toolchain.
# Runs only in Claude Code on the web (remote) sessions, where the container
# is ephemeral and needs the skill + ffmpeg installed on every cold start.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

bash "${CLAUDE_PROJECT_DIR:-.}/scripts/video-use/setup.sh"
