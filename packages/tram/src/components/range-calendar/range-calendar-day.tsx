import { forwardRef, useCallback, useMemo } from 'react'
import { Text } from 'react-native'
import type { View } from 'react-native'
import { usePressState } from '@xaui/native'
import { isSameDay, isSameMonth } from '@xaui/native/system'
import {
  PressableFeedback,
  resolveAnimation,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { PressRow } from '../../system/press-row'
import { useCalendar } from '../calendar/calendar.context'
import { fullDate } from '../calendar/calendar.utils'
import { useRangeCalendar } from './range-calendar.context'
import type { RangeCalendarDayProps } from './range-calendar.type'

/**
 * One day, and its place in the period: an end is the calendar's chosen square, a day
 * between them the soft slice, filling the cell to its edges so the period reads as one
 * strip. It reads the calendar for its shape and bounds, and the range for its place.
 */
export const RangeCalendarDay = forwardRef<View, RangeCalendarDayProps>(
  function RangeCalendarDay(
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
      locale,
      isDayEnabled,
    } = useCalendar()
    const { bandStyle, positionOf, select } = useRangeCalendar()

    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })
    const motion = resolveAnimation(undefined, useAnimationDisabled())
    const Press = motion.scale ? PressRow : PressableFeedback

    const position = positionOf(date)
    const isEnd = position === 'start' || position === 'end' || position === 'single'
    const isOutside = !isSameMonth(date, month)
    const isToday = isSameDay(date, new Date())
    const disabled = isDisabled ?? !isDayEnabled(date)

    const handlePress = useCallback(
      (event: Parameters<NonNullable<RangeCalendarDayProps['onPress']>>[0]) => {
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
        accessibilityState={{
          disabled,
          selected: position !== 'none',
          ...accessibilityState,
        }}
        {...rest}
        style={[
          dayStyle,
          position === 'middle' && bandStyle,
          isEnd && daySelectedStyle,
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
              isEnd && dayLabelSelectedStyle,
            ]}
          >
            {date.getDate()}
          </Text>
        )}
      </Press>
    )
  }
)

RangeCalendarDay.displayName = 'XAUI.Tram.RangeCalendar.Day'
