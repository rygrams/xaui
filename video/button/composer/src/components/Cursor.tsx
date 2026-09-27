import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { project, type Camera, type ScreenBox } from '../camera'
import { colors, timing } from '../theme'
import type { Tap } from '../types'

/** macOS-style pointing hand. The fingertip is at (17, 3) in its 44×52 box. */
function Hand({ pressed }: { pressed: boolean }) {
  return (
    <svg
      width={44}
      height={52}
      viewBox="0 0 22 26"
      style={{
        transform: `scale(${pressed ? 0.88 : 1})`,
        transformOrigin: '17px 3px',
        filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.25))',
      }}
    >
      <path
        d="M8.5 1.5c1.1 0 2 .9 2 2V11l.3-.1c1-.3 2 .3 2.2 1.3l.1.3.4-.1c1-.3 2 .3 2.2 1.3l.1.4.3-.1c1-.2 2 .5 2.1 1.5l.3 3.2c.2 2.3-.4 4.5-1.8 6.3l-.4.5H9.3l-3.9-5.3L2.6 15c-.6-.8-.4-1.9.4-2.4.8-.5 1.8-.3 2.3.4l1.2 1.6V3.5c0-1.1.9-2 2-2z"
        fill="#FFFFFF"
        stroke="#111111"
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
      <path
        d="M10.5 11v5M13 12.2v3.8M15.6 13.6v2.6"
        stroke="#111111"
        strokeWidth={0.9}
        strokeLinecap="round"
      />
    </svg>
  )
}

const TIP = { x: 17, y: 3 }
const REST_OFFSET = { x: 150, y: 190 }
const HOLD_AFTER = 18
const FADE = 8

/**
 * Glides to each tap with a soft spring (~12 frames), presses on the tap frame, and
 * leaves once the last result is on screen. Targets are re-projected every frame, so the
 * hand follows its button through a zoom.
 */
export function Cursor({
  taps,
  box,
  camera,
}: {
  taps: Tap[]
  box: ScreenBox
  camera: Camera
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  if (!taps.length) return null

  const first = taps[0].frame
  const last = taps[taps.length - 1].frame
  const start = first - timing.cursorLeadFrames
  const end = last + HOLD_AFTER + FADE
  if (frame < start || frame > end) return null

  const points = taps.map(t => project(box, camera, t.rx, t.ry))
  const rest = { x: points[0].x + REST_OFFSET.x, y: points[0].y + REST_OFFSET.y }

  const next = taps.findIndex(t => frame < t.frame)
  let position = points[points.length - 1]
  if (next >= 0) {
    const from = next === 0 ? rest : points[next - 1]
    const glideStart = taps[next].frame - timing.cursorGlideFrames
    const progress = spring({
      frame: frame - glideStart,
      fps,
      config: { damping: 22, stiffness: 180, mass: 0.7 },
      durationInFrames: timing.cursorGlideFrames,
    })
    const p = frame < glideStart ? 0 : Math.min(1, progress)
    position = {
      x: from.x + (points[next].x - from.x) * p,
      y: from.y + (points[next].y - from.y) * p,
    }
  }

  const opacity = interpolate(
    frame,
    [start, start + 6, end - FADE, end],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  )
  const pressed = taps.some(t => Math.abs(frame - t.frame) <= 2)

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x - TIP.x,
        top: position.y - TIP.y,
        opacity,
      }}
    >
      <Hand pressed={pressed} />
    </div>
  )
}

/** A translucent grey circle with a thin ring, 0 → 44 px, gone in 10 frames. */
export function TapRipples({
  taps,
  box,
  camera,
}: {
  taps: Tap[]
  box: ScreenBox
  camera: Camera
}) {
  const frame = useCurrentFrame()
  return (
    <>
      {taps.map(tap => {
        const age = frame - tap.frame
        if (age < 0 || age >= timing.rippleFrames) return null
        const p = age / timing.rippleFrames
        const size = timing.rippleSizePx * (1 - (1 - p) ** 3)
        const at = project(box, camera, tap.rx, tap.ry)
        return (
          <div
            key={`${tap.target}-${tap.frame}`}
            style={{
              position: 'absolute',
              left: at.x - size / 2,
              top: at.y - size / 2,
              width: size,
              height: size,
              borderRadius: '50%',
              background: colors.ripple,
              border: `1.5px solid ${colors.rippleStroke}`,
              opacity: 1 - p,
            }}
          />
        )
      })}
    </>
  )
}
