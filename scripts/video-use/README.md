# video-use integration

[browser-use/video-use](https://github.com/browser-use/video-use) wired into this
repo as a Claude Code skill for **transcript-driven video cuts** — removing
filler words and dead space, color grading, audio fades, burned subtitles, and
animation overlays — with overlays rendered on-brand through our HyperFrames
`my-video` system.

## What's here

| File | Purpose |
|------|---------|
| `setup.sh` | Idempotent installer: clones video-use, installs Python deps, provisions `ffmpeg`/`ffprobe`, symlinks the skill, configures the ElevenLabs key. |
| `new-hyperframes-slot.sh` | Scaffolds an on-brand HyperFrames overlay slot seeded from `my-video`. |
| `../../.claude/hooks/session-start.sh` | SessionStart hook that runs `setup.sh` on web sessions. |
| `../../.claude/settings.json` | Registers the hook (synchronous, 600 s timeout). |

The video-use repo itself is **not** vendored — it's cloned to
`~/Developer/video-use` (outside this repo) and re-provisioned on each cold
container by the hook. Nothing secret is committed.

## How it runs

On a Claude Code on the web session, the SessionStart hook fires and runs
`setup.sh`, which:

1. Clones/updates video-use to `~/Developer/video-use`.
2. `pip install -e .` its deps into the active interpreter (so the agent can
   call `python3 helpers/*.py` directly — no venv dance).
3. Provisions `ffmpeg` + `ffprobe` via the `static-ffmpeg` PyPI package
   (apt is blocked in the sandbox) and links them into `~/.local/bin`.
4. Symlinks the skill into `~/.claude/skills/video-use`.
5. Writes `ELEVENLABS_API_KEY` to `~/Developer/video-use/.env` **if** the env
   var is set; otherwise transcription stays disabled until a key is added.

The hook is gated on `$CLAUDE_CODE_REMOTE` so it's a no-op locally. Run the
installer by hand any time:

```bash
bash scripts/video-use/setup.sh
```

## ElevenLabs key (transcription)

Transcript-driven cuts need an ElevenLabs (Scribe) key. It is **not** configured
yet — until then, transcription helpers no-op and the rest of the toolchain
(grading, fades, overlays, render) still works. To enable it, set
`ELEVENLABS_API_KEY` in the environment (web env var or shell) and re-run the
hook/`setup.sh`.

## On-brand overlays: video-use → HyperFrames → my-video

video-use authors animation overlays as **slots** under
`<footage>/edit/animations/slot_<id>/`, renders each to a file, and points its
EDL overlay at that file. We wire those slots to the `@estevestevesteve`
identity in [`my-video`](../../my-video) so overlays match the "Padre en modo
cine" brand instead of a blank default:

```bash
# from the footage folder you're editing:
scripts/video-use/new-hyperframes-slot.sh intro
```

This scaffolds `edit/animations/slot_intro/` with HyperFrames and copies in
`my-video/design.md`, the brand fonts, and vendored GSAP. Author the overlay
HTML, then:

```bash
npx hyperframes lint     edit/animations/slot_intro
npx hyperframes validate edit/animations/slot_intro
npx hyperframes render   edit/animations/slot_intro --format webm -o edit/animations/slot_intro/render.webm
```

Use `--format webm` when the overlay needs alpha over the footage. Finally point
the video-use EDL overlay `file` at `render.webm`.
