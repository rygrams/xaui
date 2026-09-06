import { forwardRef, useCallback, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import {
  addMonths,
  firstDayOfWeekFor,
  isWithinBounds,
  startOfDay,
} from '../../utils/dates'
import { CalendarProvider } from './calendar.context'
import { calendarRecipe } from './calendar.recipe'
import type { CalendarProps } from './calendar.type'

/**
 * A month, and the day chosen in it.
 *
 * ```tsx
 * <Calendar value={date} onValueChange={setDate}>
 *   <Calendar.Header>
 *     <Calendar.PreviousButton />
 *     <Calendar.Title />
 *     <Calendar.NextButton />
 *   </Calendar.Header>
 *   <Calendar.Weekdays />
 *   <Calendar.Grid />
 * </Calendar>
 * ```
 *
 * **The month on screen is state of its own**, separate from the chosen day. Paging through
 * months is not choosing: a calendar that jumped back to the chosen month every time you
 * looked at the next one would be unusable, and one that chose a day because you paged past
 * it would be worse. `month` / `defaultMonth` / `onMonthChange` control it, and the day
 * props control the answer.
 *
 * **The grid is always six weeks**, never five for a short month: a grid that changed height
 * between March and April would move everything under it twice a year.
 *
 * **The week starts where the locale says.** `Intl` answers it properly where it exists —
 * Saturday-first locales are real, and a hand-kept list of Monday-first languages has never
 * included them — and `firstDayOfWeek` overrides it outright.
 */
export const CalendarRoot = forwardRef<View, CalendarProps>(function Calendar(
  {
    children,
    variant,
    size,
    radius,
    color,
    value: controlledValue,
    defaultValue,
    onValueChange,
    month: controlledMonth,
    defaultMonth,
    onMonthChange,
    minValue,
    maxValue,
    firstDayOfWeek,
    locale,
    isDisabled = false,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const [value, setValue] = useControllableState<Date | undefined>({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange as ((next: Date | undefined) => void) | undefined,
  })

  // Computed once rather than per render: `new Date()` is a different value every time it
  // is called, and a default that changed identity would put the calendar back to this
  // month on any re-render that happened to fall after midnight.
  const [fallbackMonth] = useState(() => firstOfMonth(defaultValue ?? new Date()))

  const [month, setMonth] = useControllableState<Date>({
    value: controlledMonth,
    defaultValue: defaultMonth ? firstOfMonth(defaultMonth) : fallbackMonth,
    onChange: onMonthChange,
  })

  const resolvedLocale = locale ?? deviceLocale()
  const weekStart = firstDayOfWeek ?? firstDayOfWeekFor(resolvedLocale)

  const selection = { variant, size, radius }
  const styles = calendarRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled },
  })
  const tint = color ? calendarRecipe.tint({ theme, color, selection }) : undefined

  const bounds = useMemo(
    () => ({ min: minValue, max: maxValue }),
    [minValue, maxValue]
  )

  const isDayEnabled = useCallback(
    (date: Date) => !isDisabled && isWithinBounds(date, bounds),
    [bounds, isDisabled]
  )

  const select = useCallback(
    (date: Date) => {
      if (!isWithinBounds(date, bounds)) return
      // Midnight, always: a `Date` carrying the moment it was pressed would compare unequal
      // to the same day written by the caller, and the cell would not read as chosen.
      setValue(startOfDay(date))
    },
    [bounds, setValue]
  )

  const goToMonth = useCallback(
    (step: number) => {
      if (step === 0) return
      setMonth(current => firstOfMonth(addMonths(current, step)))
    },
    [setMonth]
  )

  /**
   * Whether stepping that far leaves anything to choose. It asks about the **month**, not
   * about a day: a step that lands entirely before `minValue` has nothing in it, so the
   * button that would take you there is dead rather than merely disappointing.
   */
  const canGoToMonth = useCallback(
    (step: number) => {
      const target = firstOfMonth(addMonths(month, step))
      const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0)

      return (
        isWithinBounds(target, { max: bounds.max }) &&
        isWithinBounds(lastDay, { min: bounds.min })
      )
    },
    [bounds, month]
  )

  const context = useMemo(() => {
    // An `Icon` in a nav button takes the title's scale and the chevron's own colour, so
    // the header's marks match its type without being told to.
    const title = StyleSheet.flatten<TextStyle>([styles.title])

    return {
      headerStyle: styles.header,
      titleStyle: styles.title,
      navStyle: styles.nav,
      weekdaysStyle: styles.weekdays,
      weekdayStyle: styles.weekday,
      gridStyle: styles.grid,
      dayStyle: styles.day,
      daySelectedStyle: tint
        ? [styles.daySelected, tint.daySelected]
        : styles.daySelected,
      dayLabelStyle: styles.dayLabel,
      dayLabelSelectedStyle: tint
        ? [styles.dayLabelSelected, tint.dayLabelSelected]
        : styles.dayLabelSelected,
      dayLabelMutedStyle: styles.dayLabelMuted,
      dotStyle: styles.dot,
      // `dot` first in both branches, and that is not tidiness: the size axis puts the
      // mark's width, height and corner on `dot` alone, so a `dotSelected` handed over on
      // its own is a coloured node with no size — which renders nothing at all.
      dotSelectedStyle: [styles.dot, tint ? tint.dotSelected : styles.dotSelected],
      glyph: {
        size: title.fontSize,
        color: typeof title.color === 'string' ? title.color : undefined,
      },
      month,
      value,
      locale: resolvedLocale,
      firstDayOfWeek: weekStart,
      isDisabled,
      isDayEnabled,
      select,
      goToMonth,
      canGoToMonth,
    }
  }, [
    styles,
    tint,
    month,
    value,
    resolvedLocale,
    weekStart,
    isDisabled,
    isDayEnabled,
    select,
    goToMonth,
    canGoToMonth,
  ])

  const rootStyle = [styles.root, styleProps, style]

  return (
    <CalendarProvider value={context}>
      {asChild ? (
        <Slot ref={ref} {...rest} style={rootStyle}>
          {children}
        </Slot>
      ) : (
        <View ref={ref} {...rest} style={rootStyle}>
          {children}
        </View>
      )}
    </CalendarProvider>
  )
})

CalendarRoot.displayName = 'XAUI.Calendar.Root'

/** The month a date is in, at its first day — the only form the grid is built from. */
function firstOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
 * The device's locale, or English.
 *
 * `Intl.DateTimeFormat().resolvedOptions()` is the one way to ask that does not need a
 * platform module, and it is absent on a Hermes build with no ICU — where a locale is
 * exactly what cannot be resolved anyway.
 */
function deviceLocale(): string {
  try {
    return new Intl.DateTimeFormat().resolvedOptions().locale
  } catch {
    return 'en'
  }
}
