import { forwardRef, useCallback, useMemo } from 'react'
import { Text, View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { isSameDay, isSameMonth, monthLabel } from '../../utils/dates'
import { useCalendar } from './calendar.context'
import type { CalendarDayProps } from './calendar.type'

/**
 * One day.
 *
 * ```tsx
 * <Calendar.Day date={date} />
 * <Calendar.Day date={date}>{date.getDate()}</Calendar.Day>
 * ```
 *
 * **Everything it is, it reads off its `date`**: whether it is the chosen day, whether it
 * belongs to the month on screen, whether the bounds allow it, whether it is today. That is
 * what lets a caller render their own cells in `Calendar.Grid` without wiring any of it —
 * a day is a date plus the calendar around it, and nothing else.
 *
 * Written with no children it draws the number, and the dot under it when the day is today
 * without being the chosen one. The dot is **positioned absolutely** so the number does not
 * shift down the day it appears.
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
    daySelectedStyle,
    dayLabelStyle,
    dayLabelSelectedStyle,
    dayLabelMutedStyle,
    dotStyle,
    dotSelectedStyle,
    month,
    value,
    locale,
    isDayEnabled,
    select,
  } = useCalendar()

  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const isSelected = value !== undefined && isSameDay(date, value)
  const isOutside = !isSameMonth(date, month)
  // `new Date()` per render rather than hoisted: a calendar left open across midnight has
  // to move its dot, and the cost of asking is a comparison of three numbers.
  const isToday = isSameDay(date, new Date())
  const disabled = isDisabled ?? !isDayEnabled(date)

  const handlePress = useCallback(
    (event: Parameters<NonNullable<CalendarDayProps['onPress']>>[0]) => {
      select(date)
      // Composed, never replaced: a caller's `onPress` is what closes a picker around it.
      onPress?.(event)
    },
    [date, onPress, select]
  )

  const label = useMemo(() => fullDate(date, locale), [date, locale])

  const content = children ?? (
    <>
      <Text
        style={[
          dayLabelStyle,
          // Order is the reading order: muted for a day that is not this month's or is
          // out of bounds, then the chosen colour, which outranks both — a chosen day
          // outside the month is still the chosen day.
          (isOutside || disabled) && dayLabelMutedStyle,
          isSelected && dayLabelSelectedStyle,
        ]}
      >
        {date.getDate()}
      </Text>
      {isToday ? <View style={isSelected ? dotSelectedStyle : dotStyle} /> : null}
    </>
  )

  return (
    <PressableFeedback
      ref={ref}
      isPressed={isPressed}
      isDisabled={disabled}
      accessibilityRole={accessibilityRole ?? 'button'}
      // The number alone says "6"; a screen reader needs the day it is.
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{
        disabled,
        selected: isSelected,
        ...accessibilityState,
      }}
      {...rest}
      style={[
        dayStyle,
        isSelected && daySelectedStyle,
        styleProps,
        // R9 — `style` may be `Pressable`'s function form. This slot owns the press state,
        // so it resolves the function here rather than forwarding it and losing the rest.
        typeof style === 'function' ? style({ pressed: isPressed }) : style,
      ]}
      onPress={handlePress}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      {content}
    </PressableFeedback>
  )
})

CalendarDay.displayName = 'XAUI.Calendar.Day'

/** "Sunday 6 September 2026", or the month label plus the number where `Intl` cannot. */
function fullDate(date: Date, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  } catch {
    return `${date.getDate()} ${monthLabel(date, locale)}`
  }
}
