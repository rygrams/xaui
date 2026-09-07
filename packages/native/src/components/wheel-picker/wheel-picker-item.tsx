import { forwardRef } from 'react'
import { Text } from 'react-native'
import type { TextStyle } from 'react-native'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { useWheelPicker, useWheelPickerColumn } from './wheel-picker.context'
import type { WheelPickerItemProps } from './wheel-picker.type'

const AnimatedText = Animated.createAnimatedComponent(Text)

/**
 * How far from the middle a row still shows at all. Two rows out is the last one legible on
 * a five-row wheel; anything further is the drum turning away.
 */
const FADE_DISTANCE = 2

/** Opacity and scale at that distance, and the angle the row has turned by. */
const FAR_OPACITY = 0.25
const FAR_SCALE = 0.82
const FAR_ANGLE = 55

/** Nearer than a real drum's, which at this size reads as a fisheye rather than a wheel. */
const PERSPECTIVE = 600

/**
 * One row of a column.
 *
 * **It fades and turns away from the middle**, and that is not decoration: it is the whole
 * of what tells a reader that this is a drum with more of it out of sight, rather than a
 * list that happens to have stopped. The row at the middle is upright, full strength and in
 * the band's own colour; the rest lean back.
 *
 * The turn is read from the column's shared scroll offset **on the UI thread**, so it tracks
 * the finger rather than the render loop. A row is therefore an `Animated.Text` and not a
 * pressable: the scroll is the control, and a row you could tap would be a second way to
 * choose that the band does not describe.
 */
export const WheelPickerItem = forwardRef<Text, WheelPickerItemProps>(
  function WheelPickerItem({ value, children, style, ...props }, ref) {
    const { itemStyle, itemSelectedStyle } = useWheelPicker()
    const { offset, rowHeight, selectedIndex, indexOf } = useWheelPickerColumn()
    const [styleProps, rest] = useStyleProps(props)

    const index = indexOf(value)
    const isSelected = index === selectedIndex

    const animatedStyle = useAnimatedStyle(() => {
      'worklet'
      // Where this row sits relative to the middle, in rows: 0 while it is the choice,
      // negative above, positive below.
      const distance = index - offset.value / rowHeight
      const range = [-FADE_DISTANCE, 0, FADE_DISTANCE]

      return {
        opacity: interpolate(
          distance,
          range,
          [FAR_OPACITY, 1, FAR_OPACITY],
          'clamp'
        ),
        transform: [
          { perspective: PERSPECTIVE },
          {
            rotateX: `${interpolate(distance, range, [FAR_ANGLE, 0, -FAR_ANGLE], 'clamp')}deg`,
          },
          {
            scale: interpolate(distance, range, [FAR_SCALE, 1, FAR_SCALE], 'clamp'),
          },
        ],
      }
    }, [index, offset, rowHeight])

    return (
      <AnimatedText
        ref={ref}
        // Not a control: the band says which row is chosen, and a screen reader is told by
        // the column. A row announcing itself would announce every row in the drum.
        accessibilityElementsHidden={!isSelected}
        {...rest}
        style={[
          itemStyle,
          // The selected colour rides on the resting style rather than replacing it, so a
          // row that is only *becoming* the choice does not flash a second colour mid-turn.
          isSelected && (itemSelectedStyle as TextStyle),
          styleProps,
          style,
          animatedStyle,
        ]}
      >
        {children}
      </AnimatedText>
    )
  }
)

WheelPickerItem.displayName = 'XAUI.WheelPicker.Item'
