import { forwardRef, useCallback, useMemo } from 'react'
import { Text, View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { isSameDay, isSameMonth, monthLabel } from '../../utils/dates'
import { useCalendar } from '../calendar'
import { useRangeCalendar } from './range-calendar.context'
import type { RangeCalendarDayProps } from './range-calendar.type'

/**
 * One day, with its place in the range behind it.
 *
 * It reads **two contexts**: the `Calendar`'s for its shape, its type, its bounds and the
 * month it belongs to, and the `RangeCalendar`'s for where it falls in the period. That is
 * what lets the calendar around it stay the component it already is.
 *
 * The band is drawn **behind and outside the cell**: out of flow so nothing about the day's
 * own layout moves when it appears, and a point wider on each side so seven separate cells
 * read as one unbroken strip on a screen whose width does not divide by seven.
 *
 * The two ends carry the chosen day's own fill on top of the band, so a range reads as two
 * marks with a strip between them rather than as a strip with two darker squares in it.
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
      daySelectedStyle,
      dayLabelStyle,
      dayLabelSelectedStyle,
      dayLabelMutedStyle,
      dotStyle,
      dotSelectedStyle,
      month,
      locale,
      isDayEnabled,
    } = useCalendar()
    const { bandStyle, bandStartStyle, bandEndStyle, positionOf, select } =
      useRangeCalendar()

    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const position = positionOf(date)
    // An end of the range wears the chosen day's fill; a day between them wears the band.
    const isEnd = position === 'start' || position === 'end' || position === 'single'
    const isOutside = !isSameMonth(date, month)
    // `new Date()` per render rather than hoisted: a calendar left open across midnight has
    // to move its dot, and the cost of asking is a comparison of three numbers.
    const isToday = isSameDay(date, new Date())
    const disabled = isDisabled ?? !isDayEnabled(date)

    const handlePress = useCallback(
      (event: Parameters<NonNullable<RangeCalendarDayProps['onPress']>>[0]) => {
        select(date)
        // Composed, never replaced: a caller's `onPress` is what closes a picker around it.
        onPress?.(event)
      },
      [date, onPress, select]
    )

    const label = useMemo(() => fullDate(date, locale), [date, locale])

    // `single` has no band at all — one day is a mark, and a strip under a single cell would
    // read as a range of one that is somehow wider than the day it contains.
    const band =
      position === 'middle'
        ? bandStyle
        : position === 'start'
          ? bandStartStyle
          : position === 'end'
            ? bandEndStyle
            : null

    return (
      <>
        {band === null ? null : <View pointerEvents="none" style={band} />}

        <PressableFeedback
          ref={ref}
          isPressed={isPressed}
          isDisabled={disabled}
          accessibilityRole={accessibilityRole ?? 'button'}
          // The number alone says "6"; a screen reader needs the day it is.
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityState={{
            disabled,
            selected: position !== 'none',
            ...accessibilityState,
          }}
          {...rest}
          style={[
            dayStyle,
            isEnd && daySelectedStyle,
            styleProps,
            // R9 — `style` may be `Pressable`'s function form. This slot owns the press
            // state, so it resolves the function here rather than forwarding it.
            typeof style === 'function' ? style({ pressed: isPressed }) : style,
          ]}
          onPress={handlePress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {children ?? (
            <>
              <Text
                style={[
                  dayLabelStyle,
                  // Order is the reading order: muted for a day that is not this month's or
                  // is out of bounds, then the chosen colour, which outranks both.
                  (isOutside || disabled) && dayLabelMutedStyle,
                  isEnd && dayLabelSelectedStyle,
                ]}
              >
                {date.getDate()}
              </Text>
              {isToday ? <View style={isEnd ? dotSelectedStyle : dotStyle} /> : null}
            </>
          )}
        </PressableFeedback>
      </>
    )
  }
)

RangeCalendarDay.displayName = 'XAUI.RangeCalendar.Day'

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
