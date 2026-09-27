import { Easing, interpolate, useCurrentFrame } from 'remotion'
import type { CSSProperties } from 'react'
import { colors, fonts, timing, type } from '../theme'
import type { SceneData } from '../types'

/**
 * The scene's caption: fades in while rising 16 px, a few frames before the voice. The
 * keyword (between asterisks in the storyboard) takes the accent, nothing else does.
 */
export function Caption({
  caption,
  size = type.captionSize,
  color = colors.text,
  style,
}: {
  caption: SceneData['caption']
  size?: number
  color?: string
  style?: CSSProperties
}) {
  const frame = useCurrentFrame()
  const t = interpolate(
    frame,
    [caption.enterFrame, caption.enterFrame + timing.captionEnterFrames],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  )

  return (
    <div
      style={{
        fontFamily: fonts.sans,
        fontWeight: type.captionWeight,
        fontSize: size,
        lineHeight: type.captionLineHeight,
        letterSpacing: '-0.02em',
        color,
        opacity: t,
        transform: `translateY(${(1 - t) * timing.captionRisePx}px)`,
        ...style,
      }}
    >
      {caption.parts.map((part, i) => (
        <span key={i} style={part.accent ? { color: colors.accent } : undefined}>
          {part.text}
        </span>
      ))}
    </div>
  )
}
