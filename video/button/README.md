# Button, component of the week

Everything that makes the Button video: capture, voice-over, montage. The visual rules are
in [`../prompts/01-direction-artistique.md`](../prompts/01-direction-artistique.md).

This folder is tooling, not a workspace of the monorepo: pnpm and Turbo do not see it, and
`composer/` installs its own dependencies with `--ignore-workspace`.

```bash
./make.sh --only capture   # Release build, then one simulator take per scene
./make.sh --only capture --scene s07-variants-live --skip-build
./make.sh --only voice     # voice/input/ → cleaned, cut per scene, storyboard timed
./make.sh --only render    # final/button-16x9.mp4, -nosound.mp4, .srt, qa/
./make.sh --only render --frames 0-299   # a 10 s style test in composer/out/
./make.sh --all
```

Re-record one line of voice: drop `voice/input/<sceneId>.wav`, then `--only voice` and
`--only render`.

## Files

| Path                 | What it is                                                                      |
| -------------------- | ------------------------------------------------------------------------------- |
| `storyboard.json`    | The scenes, in order. The source of truth for the flows, the voice and the edit |
| `flows/<id>.yaml`    | Generated from the storyboard by `scripts/gen-flows.mjs`                        |
| `flows/_open.yaml`   | Cold-starts the app on a scene's deep link                                      |
| `raw/<id>.mp4`       | The take, trimmed to 0.5 s around the action, 60 fps constant (not committed)   |
| `raw/<id>.taps.json` | Where and when each tap landed in that clip                                     |
| `voice/A-LIRE.md`    | The sheet read at the microphone, generated from `voice/script.json`            |
| `voice/input/`       | The recordings you drop (not committed)                                         |
| `voice/words.json`   | Word timings of each cut segment                                                |
| `composer/`          | The Remotion project; `scripts/prepare.mjs` takes every timing decision         |
| `final/`             | The rendered videos (not committed), the subtitles and the description          |

The demo screens live in `apps/demo/demo/button/`, one per `screenState`, reachable at
`demo://demo/button?scene=<screenState>`. Dark mode is the `final` screen recorded with the
simulator's appearance set to dark (`"appearance": "dark"` on the scene).

The music bed is `video/assets/background-advertising.mp3`, kept out of the repo until its
licence is written in `video/music/CREDITS.md`. Without it the video renders with no music.

## Conventions

- **Caption**: the word between `*…*` takes the accent. `captionOnScreen: false` (the
  `hero` scene) means the caption is a voice-over cue, not text in the frame.
- **Coordinates**: `x`, `y` in `camera` and `callouts` are relative to the phone's screen,
  0–1 from its top-left. `frame` is at 30 fps from the start of the scene.
- **Code**: never edited here. `scripts/sync-snippets.mjs` copies each
  `#region snippet:<codeRef>` of the demo screens into the scene, `testID`s removed, and
  fails if a caption, a duration or a code line breaks the brief. `highlightLines` is
  1-based.
- **`taps.json`**: `tSec` is from the start of the trimmed clip; `x`, `y` are in points and
  `rx`, `ry` relative to `screen`. The editor places the cursor and the ripple from these,
  not from the storyboard's intended `atSec`.
- **Voice**: never re-synthesised, sped up or re-pitched. When it does not fit, the scene
  grows.
