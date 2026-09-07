import { forwardRef, useCallback, useMemo } from 'react'
import { Text, View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { isSameDay, monthLabel } from '../../utils/dates'
import { useAgendaCalendar } from './agenda-calendar.context'
import type { AgendaCalendarDayProps } from './agenda-calendar.type'

/**
 * One day of the strip, and the mark under it.
 *
 * **The mark means "something is on this day"**, where the `Calendar`'s means "today". That
 * is the one difference between the two cells, and it is the whole difference between a
 * week of numbers and an agenda.
 *
 * **No day here is ever outside.** All seven are on screen, so there is no muted state for
 * belonging to another month — only the bounds can make a day inert.
 */
export const AgendaCalendarDay = forwardRef<View, AgendaCalendarDayProps>(
  function AgendaCalendarDay(
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
      value,
      locale,
      hasEvent,
      isDayEnabled,
      select,
    } = useAgendaCalendar()

    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const isSelected = value !== undefined && isSameDay(date, value)
    const disabled = isDisabled ?? !isDayEnabled(date)
    const marked = hasEvent(date)

    const handlePress = useCallback(
      (event: Parameters<NonNullable<AgendaCalendarDayProps['onPress']>>[0]) => {
        select(date)
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
            disabled && dayLabelMutedStyle,
            isSelected && dayLabelSelectedStyle,
          ]}
        >
          {date.getDate()}
        </Text>
        {marked ? <View style={isSelected ? dotSelectedStyle : dotStyle} /> : null}
      </>
    )

    return (
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        isDisabled={disabled}
        accessibilityRole={accessibilityRole ?? 'button'}
        // The number alone says "6", and the mark says nothing at all to a screen reader
        // unless the label carries it.
        accessibilityLabel={
          accessibilityLabel ?? (marked ? `${label} — ${MARKED_SUFFIX}` : label)
        }
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
          typeof style === 'function' ? style({ pressed: isPressed }) : style,
        ]}
        onPress={handlePress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {content}
      </PressableFeedback>
    )
  }
)

AgendaCalendarDay.displayName = 'XAUI.AgendaCalendar.Day'

/**
 * What the mark is called when it is read out.
 *
 * A word, in one language, and that is the honest limit: this component knows the day's
 * locale and not the caller's copy. A caller with two languages passes
 * `accessibilityLabel`, which is why that prop wins over everything here.
 */
const MARKED_SUFFIX = 'has events'

/** "Sunday 6 September 2026", or the number and the month where `Intl` cannot. */
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
