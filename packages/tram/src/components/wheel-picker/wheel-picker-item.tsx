import { forwardRef } from 'react'
import type { View } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import { PressableFeedback, useStyleProps } from '@xaui/native/system'
import { scale } from '../../motion/motion-tokens'
import { PressTilt } from '../../system/press-tilt'
import { squareDistance, squareOpacity } from '../../system/wheel'
import { useWheelPicker, useWheelPickerColumn } from './wheel-picker.context'
import type { WheelPickerItemProps } from './wheel-picker.type'

/** From the fill at the middle to a neighbour one square out — and no further. */
const MIX = [0, 1]

/** Not a control: the column is, and it is where a keyboard and a reader land. */
const UNREACHABLE = { focusable: false, tabIndex: -1 } as const
const UNREAD = {
  accessibilityElementsHidden: true,
  importantForAccessibility: 'no-hide-descendants',
  'aria-hidden': true,
} as const

/**
 * One square of a column: its text at the bottom, at the start.
 *
 * ```tsx
 * <WheelPicker.Item value="12">12</WheelPicker.Item>
 * <WheelPicker.Item value="12">
 *   12{'\n'}
 *   <TextSpan variant="caption">déc.</TextSpan>
 * </WheelPicker.Item>
 * ```
 *
 * **Its colours follow its distance from the middle**, read off the column's shared
 * offset on the UI thread: the accent and the text that reads on it at the middle, the
 * ground inside a grey line one square out, and every mix between — no threshold, so
 * nothing snaps while the wheel turns. A second line is the caller's composition: a
 * nested `Text` takes the same colour.
 *
 * A press leans the square toward the finger and changes no colour. Touching a neighbour
 * brings it to the middle, which is the column's gesture; `onPress` stays the caller's.
 * `ref`, `style` and the style props are the square's.
 */
export const WheelPickerItem = forwardRef<View, WheelPickerItemProps>(
  function WheelPickerItem(
    { value, children, style, onPressIn, onPressOut, ...props },
    ref
  ) {
    const { cellStyle, itemStyle, fillStyle, labelStyle, isStill } = useWheelPicker()
    const { offset, awake, shape, selectedIndex, indexOf, paint, isDisabled } =
      useWheelPickerColumn()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const index = indexOf(value)
    const { step } = shape
    const { fill, ink, ground, line, text } = paint

    const distance = useDerivedValue(() => {
      'worklet'
      return squareDistance(index, offset.value, shape)
    }, [index, offset, shape])

    const placed = useAnimatedStyle(() => {
      'worklet'
      return {
        opacity: squareOpacity(distance.value, awake.value),
        transform: [{ translateY: distance.value * step }],
      }
    }, [distance, awake, step])

    const painted = useAnimatedStyle(() => {
      'worklet'
      const out = Math.min(Math.abs(distance.value), 1)

      return {
        backgroundColor: interpolateColor(out, MIX, [fill, ground]),
        borderColor: interpolateColor(out, MIX, [fill, line]),
      }
    }, [distance, fill, ground, line])

    const inked = useAnimatedStyle(() => {
      'worklet'
      const out = Math.min(Math.abs(distance.value), 1)

      return { color: interpolateColor(out, MIX, [ink, text]) }
    }, [distance, ink, text])

    // Under an ancestor's `disable-all` the square does not lean either.
    const Square = isStill ? PressableFeedback : PressTilt
    const lean = isStill ? undefined : { depth: scale.row }
    // A reader is told the current square by the column; the others are not announced.
    const unread = index === selectedIndex ? undefined : UNREAD

    return (
      <Animated.View style={[cellStyle, placed]}>
        <Square
          ref={ref}
          isPressed={isPressed}
          isDisabled={isDisabled}
          // Native's scale, highlight and ripple stay off: the press is the tilt alone.
          animation={isStill ? 'disable-all' : false}
          {...UNREACHABLE}
          {...unread}
          {...lean}
          {...rest}
          style={[itemStyle, styleProps, style]}
          // After `rest`, and composed: the caller's handlers run inside these.
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          <Animated.View style={[fillStyle, painted]} />
          <Animated.Text style={[labelStyle, inked]}>{children}</Animated.Text>
        </Square>
      </Animated.View>
    )
  }
)

WheelPickerItem.displayName = 'XAUI.Tram.WheelPicker.Item'
