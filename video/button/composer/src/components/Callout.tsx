import { interpolate, useCurrentFrame } from 'remotion'
import { project, type Camera, type ScreenBox } from '../camera'
import { colors, easeInOutCubic, WIDTH, HEIGHT } from '../theme'
import type { CalloutData } from '../types'

const DRAW = 14
const FADE = 8

/** A 2 px accent ring drawn around an element, or a small accent arrow above it. */
export function Callout({
  callout,
  box,
  camera,
}: {
  callout: CalloutData
  box: ScreenBox
  camera: Camera
}) {
  const frame = useCurrentFrame()
  const { fromFrame, toFrame } = callout
  if (frame < fromFrame || frame > toFrame) return null

  const at = project(box, camera, callout.x, callout.y)
  const opacity = interpolate(
    frame,
    [fromFrame, fromFrame + 4, toFrame - FADE, toFrame],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  )
  const drawn = interpolate(frame, [fromFrame, fromFrame + DRAW], [0, 1], {
    easing: easeInOutCubic,
    extrapolateRight: 'clamp',
  })

  if (callout.type === 'circle') {
    const r = (callout.r ?? 0.08) * box.width * camera.scale
    const length = 2 * Math.PI * r
    return (
      <svg
        width={WIDTH}
        height={HEIGHT}
        style={{ position: 'absolute', inset: 0, opacity }}
      >
        <circle
          cx={at.x}
          cy={at.y}
          r={r}
          fill="none"
          stroke={colors.accent}
          strokeWidth={2}
          strokeDasharray={length}
          strokeDashoffset={length * (1 - drawn)}
          transform={`rotate(-90 ${at.x} ${at.y})`}
        />
      </svg>
    )
  }

  const bob = Math.sin(((frame - fromFrame) / 30) * Math.PI * 2) * 4
  const tipY = at.y - 34 * camera.scale + bob
  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      style={{ position: 'absolute', inset: 0, opacity: opacity * drawn }}
    >
      <path
        d={`M ${at.x} ${tipY - 56} L ${at.x} ${tipY} M ${at.x - 14} ${tipY - 16} L ${at.x} ${tipY} L ${at.x + 14} ${tipY - 16}`}
        fill="none"
        stroke={colors.accent}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
