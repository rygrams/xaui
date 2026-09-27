import { Easing, interpolate, useCurrentFrame } from 'remotion'
import { colors, fonts, layout, timing, type } from '../theme'
import type { SceneData } from '../types'

const TITLE_BAR = 64
const PADDING_X = 44
const PADDING_Y = 30

/**
 * A white window with three grey dots, the snippet coloured by shiki (github-light), its
 * lines arriving one by one, and the prop's line lit when the voice names it.
 */
export function CodeCard({ code }: { code: NonNullable<SceneData['code']> }) {
  const frame = useCurrentFrame()
  const lineHeight = type.codeSize * type.codeLineHeight
  const lit = interpolate(
    frame,
    [code.highlightFrame, code.highlightFrame + timing.highlightEnterFrames],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  )

  return (
    <div
      style={{
        width: layout.codeCardWidth,
        background: colors.card,
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: layout.codeCardRadius,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: TITLE_BAR,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: `0 ${PADDING_X - 16}px`,
          borderBottom: `1px solid ${colors.cardBorder}`,
        }}
      >
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              width: 13,
              height: 13,
              borderRadius: 7,
              background: colors.shape2,
            }}
          />
        ))}
        <div
          style={{
            marginLeft: 14,
            fontFamily: fonts.mono,
            fontSize: 20,
            color: colors.textSecondary,
          }}
        >
          {code.label}
        </div>
      </div>
      <div style={{ padding: `${PADDING_Y}px 0` }}>
        {code.lines.map((tokens, i) => {
          const appear = code.firstLineFrame + i * code.lineStagger
          const t = interpolate(
            frame,
            [appear, appear + timing.codeLineEnterFrames],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            }
          )
          const highlighted = code.highlightLines.includes(i + 1)
          return (
            <div
              key={i}
              style={{
                position: 'relative',
                height: lineHeight,
                display: 'flex',
                alignItems: 'center',
                padding: `0 ${PADDING_X}px`,
                fontFamily: fonts.mono,
                fontSize: type.codeSize,
                // `</` and `/>` stay two characters: the code must read as typed.
                fontVariantLigatures: 'none',
                whiteSpace: 'pre',
                opacity: t,
                transform: `translateY(${(1 - t) * 8}px)`,
              }}
            >
              {highlighted ? (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: colors.codeHighlight,
                      opacity: lit,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 4,
                      background: colors.accent,
                      transform: `scaleY(${lit})`,
                    }}
                  />
                </>
              ) : null}
              <span style={{ position: 'relative' }}>
                {tokens.map((token, j) => (
                  <span key={j} style={{ color: token.color ?? colors.text }}>
                    {token.content}
                  </span>
                ))}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
