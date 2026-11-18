import { StyleSheet, View } from 'react-native'
import type { IconComponentProps } from '@xaui/native/system'

/** The App Bar's stroke: the circle's line. */
const STROKE = 2
const DEFAULT_GLYPH = 20

/**
 * A stroke of a glyph, as fractions of the glyph's box: its length, how far its middle
 * lies from the box's, and its angle. Placed by a transform rather than by `start`, so
 * a glyph is never mirrored in a right-to-left layout — a ✓ does not turn round.
 */
type Stroke = { length: number; x: number; y: number; angle: string }

/** The ✓: a short stroke down to the bottom, and a long one up to the far corner. */
const CHECK: Stroke[] = [
  { length: 0.36, x: -0.22, y: 0.12, angle: '45deg' },
  { length: 0.66, x: 0.12, y: 0.02, angle: '-45deg' },
]

/** The ✕: two strokes crossed at the middle. */
const CROSS: Stroke[] = [
  { length: 0.9, x: 0, y: 0, angle: '45deg' },
  { length: 0.9, x: 0, y: 0, angle: '-45deg' },
]

function Strokes({
  strokes,
  size = DEFAULT_GLYPH,
  color,
}: IconComponentProps & { strokes: Stroke[] }) {
  return (
    <View style={[glyphs.box, { width: size, height: size }]}>
      {strokes.map(({ length, x, y, angle }) => (
        <View
          key={`${x}${angle}`}
          style={[
            glyphs.stroke,
            {
              width: size * length,
              backgroundColor: color,
              transform: [
                { translateX: size * x },
                { translateY: size * y },
                { rotate: angle },
              ],
            },
          ]}
        />
      ))}
    </View>
  )
}

/** The App Bar's ✓ — drawn with views: Tram depends on no SVG library. */
export function CheckGlyph(props: IconComponentProps) {
  return <Strokes strokes={CHECK} {...props} />
}

CheckGlyph.displayName = 'XAUI.Tram.CheckGlyph'

/** The App Bar's ✕. */
export function CrossGlyph(props: IconComponentProps) {
  return <Strokes strokes={CROSS} {...props} />
}

CrossGlyph.displayName = 'XAUI.Tram.CrossGlyph'

const glyphs = StyleSheet.create({
  box: { alignItems: 'center', justifyContent: 'center' },
  stroke: { position: 'absolute', height: STROKE, borderRadius: STROKE / 2 },
})
