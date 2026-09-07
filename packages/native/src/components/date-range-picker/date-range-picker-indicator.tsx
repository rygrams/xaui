import { useEffect } from 'react'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { INDICATOR_ROTATION, INDICATOR_SPRING } from '../../system/anchored'
import { ChevronDownIcon, Icon } from '../../system/icon'
import { useDateRangePicker } from './date-range-picker.context'

/**
 * The chevron, turning with the sheet — the `Select`'s, on the same spring.
 *
 * The `DatePicker`'s indicator exactly, and it is written again rather than shared because
 * the only line the two do not have in common is which context they read, and a shared one
 * would have to take the picker's state as props to avoid reading either.
 */
export function DateRangePickerIndicator(props: { as?: typeof ChevronDownIcon }) {
  const { as = ChevronDownIcon } = props
  const { indicatorStyle, isOpen } = useDateRangePicker()
  const progress = useSharedValue(isOpen ? 1 : 0)

  useEffect(() => {
    progress.set(withSpring(isOpen ? 1 : 0, INDICATOR_SPRING))
  }, [isOpen, progress])

  const rotation = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(progress.get(), [0, 1], [INDICATOR_ROTATION[0], INDICATOR_ROTATION[1]])}deg`,
      },
    ],
  }))

  return (
    <Animated.View style={[indicatorStyle, rotation]}>
      <Icon as={as} />
    </Animated.View>
  )
}

DateRangePickerIndicator.displayName = 'XAUI.DateRangePicker.Indicator'
