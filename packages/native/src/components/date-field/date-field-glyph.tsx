import { View } from 'react-native'
import { useTextField } from '../text-field'

/**
 * A calendar, drawn from four views.
 *
 * The library ships no icon set, and the `CloseButton`'s cross settles what to do about it:
 * a component whose whole affordance *is* a glyph draws its own, so it works in a project
 * that has installed none. Pass an `Icon` as the trigger's children and this is not used.
 *
 * Every number below is a fraction of the size the field chose, so the mark scales with the
 * type rather than sitting at a hard-coded 16 beside it.
 */
export function DateFieldGlyph() {
  const { icon } = useTextField()

  const size = icon.size ?? 18
  const color = icon.color ?? undefined
  const stroke = Math.max(1, Math.round(size / 12))
  // The two rings hang above the body, so the body is shorter than the box by their height.
  const ringHeight = Math.round(size * 0.16)
  const bodyTop = ringHeight
  const bodyHeight = size - ringHeight

  return (
    <View style={{ width: size, height: size }}>
      {[0.28, 0.72].map(at => (
        <View
          key={at}
          style={{
            position: 'absolute',
            top: 0,
            // R13 — `start`, so the pair mirrors with the writing direction rather than
            // staying put while everything around them moves.
            start: size * at - stroke / 2,
            width: stroke,
            height: ringHeight * 2,
            borderRadius: stroke,
            backgroundColor: color,
          }}
        />
      ))}

      <View
        style={{
          position: 'absolute',
          top: bodyTop,
          width: size,
          height: bodyHeight,
          borderWidth: stroke,
          borderColor: color,
          borderRadius: Math.round(size * 0.14),
          borderCurve: 'continuous',
          overflow: 'hidden',
        }}
      >
        {/* The filled band under the top edge — what tells a calendar from a picture frame
            at sixteen points, where a grid of days would be a smudge. */}
        <View
          style={{
            height: Math.max(stroke, Math.round(bodyHeight * 0.26)),
            backgroundColor: color,
          }}
        />
      </View>
    </View>
  )
}

DateFieldGlyph.displayName = 'XAUI.DateField.Glyph'
