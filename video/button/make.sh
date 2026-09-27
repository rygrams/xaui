#!/usr/bin/env bash
# The Button video, end to end. Each stage can run alone, so a changed voice line only
# re-runs what depends on it.
#
#   ./make.sh --only capture   # snippets + flows + Release build + simulator recordings
#   ./make.sh --only capture --scene s07-variants-live --skip-build
#   ./make.sh --only voice     # voice/input/ → cleaned, cut, aligned, storyboard timed
#   ./make.sh --only render    # composer/ → final/button-16x9.mp4, -nosound.mp4, .srt, qa/
#   ./make.sh --only render --frames 0-299   # a 10 s style test in composer/out/
#   ./make.sh --all            # capture, voice, render
#
# Re-record one line of voice: drop voice/input/<sceneId>.wav, then
#   ./make.sh --only voice && ./make.sh --only render
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
cd "$here"

only=""
passthrough=()
while [[ $# -gt 0 ]]; do
  case "$1" in
    --only) only="$2"; shift 2 ;;
    --all) only="all"; shift ;;
    *) passthrough+=("$1"); shift ;;
  esac
done

require() {
  command -v "$1" >/dev/null 2>&1 || { echo "missing: $1 — $2" >&2; exit 1; }
}

capture() {
  export PATH="$HOME/.maestro/bin:/opt/homebrew/opt/openjdk@17/bin:$PATH"
  require node "Node 20+"
  require xcrun "Xcode command line tools"
  require ffmpeg "brew install ffmpeg"
  require maestro 'curl -Ls "https://get.maestro.mobile.dev" | bash'
  require java "brew install openjdk@17"

  node scripts/sync-snippets.mjs
  node scripts/gen-flows.mjs >/dev/null
  node scripts/capture.mjs ${passthrough[@]+"${passthrough[@]}"}
}

voice() {
  require ffmpeg "brew install ffmpeg"
  local venv="$here/../.venv"
  if [[ ! -x "$venv/bin/python" ]]; then
    python3 -m venv "$venv"
    "$venv/bin/pip" install -q --upgrade pip mlx-whisper
  fi
  HF_HUB_DISABLE_TELEMETRY=1 "$venv/bin/python" scripts/voice_import.py
  node scripts/sync-snippets.mjs >/dev/null
}

render() {
  require ffmpeg "brew install ffmpeg"
  require pnpm "corepack enable"
  if [[ ! -d composer/node_modules ]]; then
    (cd composer && pnpm install --ignore-workspace)
  fi
  # The bed this video uses; MUSIC_PATH=… ./make.sh --only render tries another one.
  export MUSIC_PATH="${MUSIC_PATH:-$here/../assets/background-advertising.mp3}"
  node composer/scripts/render.mjs ${passthrough[@]+"${passthrough[@]}"}
}

case "$only" in
  capture) capture ;;
  voice | voice-import) voice ;;
  render) render ;;
  all | "") capture && voice && render ;;
  *) echo "unknown stage: $only (available: capture, voice, render, --all)" >&2; exit 1 ;;
esac
