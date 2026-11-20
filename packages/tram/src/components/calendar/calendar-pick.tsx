import { Text } from 'react-native'
import { usePressState } from '@xaui/native'
import {
  PressableFeedback,
  resolveAnimation,
  useAnimationDisabled,
} from '@xaui/native/system'
import { PressRow } from '../../system/press-row'
import { useCalendar } from './calendar.context'

type CalendarPickProps = {
  label: string
  isSelected: boolean
  isDisabled: boolean
  onPress: () => void
}

/**
 * One month or one year in a picker: a third of the row, 56 tall, the name at the start —
 * the day's square, wider. The one on screen is the accent's fill; one the bounds refuse
 * is grey and dead. Shared by the two pickers so they cannot drift apart.
 */
export function CalendarPick({
  label,
  isSelected,
  isDisabled,
  onPress,
}: CalendarPickProps) {
  const {
    pickStyle,
    pickSelectedStyle,
    pickLabelStyle,
    pickLabelSelectedStyle,
    dayLabelDisabledStyle,
  } = useCalendar()
  const [isPressed, press] = usePressState({})
  const motion = resolveAnimation(undefined, useAnimationDisabled())
  const Press = motion.scale ? PressRow : PressableFeedback

  return (
    <Press
      isPressed={isPressed}
      isDisabled={isDisabled}
      animation={motion.disableAll ? 'disable-all' : false}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: isSelected, disabled: isDisabled }}
      style={[pickStyle, isSelected && pickSelectedStyle]}
      onPress={onPress}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      <Text
        numberOfLines={1}
        style={[
          pickLabelStyle,
          isDisabled && dayLabelDisabledStyle,
          isSelected && pickLabelSelectedStyle,
        ]}
      >
        {label}
      </Text>
    </Press>
  )
}
