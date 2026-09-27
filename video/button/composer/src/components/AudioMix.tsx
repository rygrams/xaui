import { useMemo } from 'react'
import { Audio, Sequence, staticFile, useVideoConfig } from 'remotion'
import { audio, dbToGain } from '../theme'
import type { VideoData, VideoProps } from '../types'

/**
 * Per-frame music gain: -28 dB under the voice, -20 dB in the gaps, 8-frame ramps between
 * the two, 1 s fade in, 1.5 s fade out on the outro.
 */
function musicCurve(data: VideoData, fps: number, ducked: boolean): number[] {
  const total = data.durationInFrames
  const speaking = new Uint8Array(total)
  // With no voice in the mix there is nothing to make room for: the bed stays level.
  for (const scene of ducked ? data.scenes : []) {
    if (!scene.voice) continue
    const start = scene.from + scene.voice.startFrame
    for (
      let f = start;
      f < Math.min(total, start + scene.voice.durationInFrames);
      f++
    )
      speaking[f] = 1
  }
  const target = Array.from(speaking, s =>
    dbToGain(s ? audio.musicUnderVoiceDb : audio.musicInGapsDb)
  )
  const half = audio.musicRampFrames / 2
  const fadeIn = audio.musicFadeInSec * fps
  const fadeOut = audio.musicFadeOutSec * fps
  return target.map((_, f) => {
    let sum = 0
    let n = 0
    for (let k = f - half; k <= f + half; k++) {
      if (k < 0 || k >= total) continue
      sum += target[k]
      n++
    }
    const fade = Math.min(1, f / fadeIn, (total - 1 - f) / fadeOut)
    return (sum / n) * Math.max(0, fade)
  })
}

/** Voice first; music under it; a soft tick on each ripple; a breath of air on each fade. */
export function AudioMix({
  data,
  withVoice,
  withSfx,
}: { data: VideoData } & VideoProps) {
  const { fps } = useVideoConfig()
  const curve = useMemo(
    () => musicCurve(data, fps, withVoice),
    [data, fps, withVoice]
  )

  return (
    <>
      {data.music ? (
        <Audio
          src={staticFile(data.music.src)}
          loop
          volume={f => curve[Math.min(f, curve.length - 1)] ?? 0}
        />
      ) : null}

      {withVoice
        ? data.scenes.map(scene =>
            scene.voice ? (
              <Sequence
                key={`voice-${scene.id}`}
                from={scene.from + scene.voice.startFrame}
                durationInFrames={scene.voice.durationInFrames + 2}
              >
                <Audio src={staticFile(scene.voice.src)} />
              </Sequence>
            ) : null
          )
        : null}

      {withSfx
        ? data.scenes.flatMap(scene =>
            scene.taps.map(tap => (
              <Sequence
                key={`tick-${scene.id}-${tap.frame}`}
                from={scene.from + tap.frame}
                durationInFrames={6}
              >
                <Audio
                  src={staticFile('sfx/tick.wav')}
                  volume={dbToGain(audio.tickDb)}
                />
              </Sequence>
            ))
          )
        : null}

      {withSfx
        ? data.transitions.map(frame => (
            <Sequence
              key={`whoosh-${frame}`}
              from={Math.max(0, frame - 3)}
              durationInFrames={12}
            >
              <Audio
                src={staticFile('sfx/whoosh.wav')}
                volume={dbToGain(audio.whooshDb)}
              />
            </Sequence>
          ))
        : null}
    </>
  )
}
