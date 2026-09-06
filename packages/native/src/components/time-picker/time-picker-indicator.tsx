import { View } from 'react-native'
import { Icon, useIconContext } from '../../system/icon'
import type { IconProps } from '../../system/icon'

/** The two hands of the built-in clock, at ten past ten — where a clock is always drawn. */
const HOUR_ANGLE = '-60deg'
const MINUTE_ANGLE = '60deg'

/**
 * The mark on the trailing edge of the field.
 *
 * With no `as` and no children it draws a clock — a ring with two hands — from three views.
 * The `CloseButton`'s cross settles what to do about an icon set the library does not ship:
 * a component whose affordance is a glyph draws its own, so it works in a project that has
 * installed none.
 *
 * Every measurement is a fraction of the size the field chose, which reaches here through
 * `IconContext` — so an `Icon` passed instead takes the same size and colour without being
 * told either.
 *
 * **It reads that context rather than the picker's**, which is what lets another field render
 * it: `DateTimePicker.Indicator` is this component, because the two fields do the same thing
 * and a second clock glyph would be a second thing to keep in step with the first.
 */
export function TimePickerIndicator(props: IconProps) {
  const glyph = useIconContext()

  if (props.as || props.children || props.source) return <Icon {...props} />

  const size = props.size ?? glyph.size ?? 18
  const color = props.color ?? glyph.color
  const stroke = Math.max(1, Math.round(size / 12))

  return (
    <View
      style={{
        width: size,
        height: size,
        borderWidth: stroke,
        borderColor: color,
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Both hands grow from the middle of the face outwards, so the origin is the bottom
          of the bar rather than its centre — the dial's hand, at a twelfth of the size. */}
      {[
        { height: size * 0.28, rotate: HOUR_ANGLE },
        { height: size * 0.36, rotate: MINUTE_ANGLE },
      ].map(hand => (
        <View
          key={hand.rotate}
          style={{
            position: 'absolute',
            width: stroke,
            height: hand.height,
            backgroundColor: color,
            borderRadius: stroke,
            bottom: size / 2 - stroke,
            transformOrigin: 'bottom',
            transform: [{ rotate: hand.rotate }],
          }}
        />
      ))}
    </View>
  )
}

TimePickerIndicator.displayName = 'XAUI.TimePicker.Indicator'
