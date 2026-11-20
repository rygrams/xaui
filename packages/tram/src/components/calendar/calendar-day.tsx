import { forwardRef, useCallback, useMemo } from 'react'
import { Text } from 'react-native'
import type { View } from 'react-native'
import { isSameDay, isSameMonth, usePressState } from '@xaui/native'
import {
  PressableFeedback,
  resolveAnimation,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { PressRow } from '../../system/press-row'
import { useCalendar } from './calendar.context'
import type { CalendarDayProps } from './calendar.type'
import { fullDate } from './calendar.utils'

/**
 * One day: a square as wide as its column, the number centred in it. Chosen, it is the
 * accent's flat fill; today, it is lined in the page's ink — both at once when today is
 * the chosen day. A day of another month is grey and still choosable, one out of bounds
 * the faint grey and inert. A press shrinks it a little and leaves its colours alone.
 *
 * Everything it is, it reads off its `date`, so a cell of one's own needs no wiring.
 */
export const CalendarDay = forwardRef<View, CalendarDayProps>(function CalendarDay(
  {
    date,
    children,
    isDisabled,
    accessibilityRole,
    accessibilityState,
    accessibilityLabel,
    style,
    onPress,
    onPressIn,
    onPressOut,
    ...props
  },
  ref
) {
  const {
    dayStyle,
    dayTodayStyle,
    daySelectedStyle,
    dayLabelStyle,
    dayLabelMutedStyle,
    dayLabelDisabledStyle,
    dayLabelSelectedStyle,
    month,
    value,
    locale,
    isDayEnabled,
    select,
  } = useCalendar()

  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })
  const motion = resolveAnimation(undefined, useAnimationDisabled())
  const Press = motion.scale ? PressRow : PressableFeedback

  const isSelected = value !== undefined && isSameDay(date, value)
  const isOutside = !isSameMonth(date, month)
  // Per render: a calendar left open across midnight moves its line.
  const isToday = isSameDay(date, new Date())
  const disabled = isDisabled ?? !isDayEnabled(date)

  const handlePress = useCallback(
    (event: Parameters<NonNullable<CalendarDayProps['onPress']>>[0]) => {
      select(date)
      onPress?.(event)
    },
    [date, onPress, select]
  )

  const label = useMemo(() => fullDate(date, locale), [date, locale])

  return (
    <Press
      ref={ref}
      isPressed={isPressed}
      isDisabled={disabled}
      animation={motion.disableAll ? 'disable-all' : false}
      accessibilityRole={accessibilityRole ?? 'button'}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled, selected: isSelected, ...accessibilityState }}
      {...rest}
      style={[
        dayStyle,
        isSelected && daySelectedStyle,
        isToday && dayTodayStyle,
        styleProps,
        typeof style === 'function' ? style({ pressed: isPressed }) : style,
      ]}
      onPress={handlePress}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      {children ?? (
        <Text
          style={[
            dayLabelStyle,
            isOutside && dayLabelMutedStyle,
            disabled && dayLabelDisabledStyle,
            isSelected && dayLabelSelectedStyle,
          ]}
        >
          {date.getDate()}
        </Text>
      )}
    </Press>
  )
})

CalendarDay.displayName = 'XAUI.Tram.Calendar.Day'
