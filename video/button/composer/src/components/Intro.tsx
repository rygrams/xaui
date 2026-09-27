import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import type { ReactNode } from 'react'
import { colors, fonts, type } from '../theme'
import { Background } from './Stage'

/** A shape that springs in, then drifts a few pixels so the frame never sits still. */
function Shape({
  delay,
  x,
  y,
  children,
}: {
  delay: number
  x: number
  y: number
  children: ReactNode
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 120 },
  })
  const drift = Math.sin((frame + delay * 7) / 38) * 6
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) translateY(${drift}px) scale(${s})`,
        opacity: Math.min(1, s * 1.4),
      }}
    >
      {children}
    </div>
  )
}

function Hatched({ width, height }: { width: number; height: number }) {
  return (
    <svg width={width} height={height}>
      <defs>
        <pattern
          id="hatch"
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="18" height="18" fill={colors.shape3} />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="18"
            stroke={colors.shape1}
            strokeWidth="5"
          />
        </pattern>
      </defs>
      <rect width={width} height={height} rx="22" fill="url(#hatch)" />
    </svg>
  )
}

/**
 * ≈ 3 s of brand: grey geometry with a single blue circle, the over-title in spaced small
 * caps, the component's name, and a dotted accent stroke drawing itself underneath.
 */
export function Intro({ name }: { name: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const over = interpolate(frame, [6, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const title = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 110 },
  })
  const stroke = interpolate(frame, [22, 52], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  })
  const strokeWidth = 520

  return (
    <Background>
      <Shape delay={0} x={330} y={270}>
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: colors.shape1,
          }}
        />
      </Shape>
      <Shape delay={4} x={1600} y={290}>
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: '50%',
            border: `8px solid ${colors.shape2}`,
          }}
        />
      </Shape>
      <Shape delay={7} x={1500} y={790}>
        <Hatched width={280} height={170} />
      </Shape>
      <Shape delay={10} x={380} y={830}>
        <div
          style={{
            width: 340,
            height: 30,
            borderRadius: 15,
            background: colors.shape2,
          }}
        />
      </Shape>
      <Shape delay={13} x={1330} y={210}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: '50%',
            background: colors.accent,
          }}
        />
      </Shape>

      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontFamily: fonts.sans,
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: '0.32em',
            color: colors.textSecondary,
            opacity: over,
            marginBottom: 18,
          }}
        >
          XAUI · COMPONENT OF THE WEEK
        </div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontWeight: type.captionWeight,
            fontSize: 190,
            letterSpacing: '-0.035em',
            lineHeight: 1,
            color: colors.text,
            opacity: Math.min(1, title * 1.5),
            transform: `translateY(${(1 - title) * 24}px)`,
          }}
        >
          {name}
        </div>
        <svg width={strokeWidth} height={24} style={{ marginTop: 34 }}>
          <line
            x1={6}
            y1={12}
            x2={6 + (strokeWidth - 12) * stroke}
            y2={12}
            stroke={colors.accent}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray="0.1 22"
          />
        </svg>
      </AbsoluteFill>
    </Background>
  )
}
