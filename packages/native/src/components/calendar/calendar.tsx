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
import type { CalendarProps, CalendarView } from './calendar.type'

/** The years a boundless calendar offers, each way of this one: legacy's ladder. */
const DEFAULT_YEAR_SPAN = 50

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
    view: controlledView,
    defaultView,
    onViewChange,
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

  // The panel on screen — a third piece of state, separate from the month and the value
  // the way those two are separate from each other. The pickers step it; a caller with a
  // title button of its own controls it.
  const [view, setView] = useControllableState<CalendarView>({
    value: controlledView,
    defaultValue: defaultView ?? 'grid',
    onChange: onViewChange,
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

  // The month of the year is the caller's — a header that said "septembre 2026" and turned
  // into a year list goes back to the same month, in another year.
  const currentYear = month.getFullYear()
  const goToYear = useCallback(
    (year: number) => {
      goToMonth((year - currentYear) * 12)
    },
    [goToMonth, currentYear]
  )

  // The year is kept, the month replaced — the month grid drills the year picker landed on.
  const currentMonthIndex = month.getMonth()
  const goToMonthInYear = useCallback(
    (monthIndex: number) => {
      goToMonth(monthIndex - currentMonthIndex)
    },
    [goToMonth, currentMonthIndex]
  )

  // Legacy's answer, kept: fifty years each way when the calendar is unbounded, and the
  // bounds' own years when it is not — a picker that offers 2025 when `minValue` says 2027
  // is a row that can never be pressed.
  const yearRange = useMemo(() => {
    const now = new Date().getFullYear()

    return {
      first: bounds.min?.getFullYear() ?? now - DEFAULT_YEAR_SPAN,
      last: bounds.max?.getFullYear() ?? now + DEFAULT_YEAR_SPAN,
    }
  }, [bounds.min, bounds.max])

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
      yearPickerStyle: styles.yearPicker,
      yearStyle: styles.year,
      yearSelectedStyle: tint
        ? [styles.yearSelected, tint.yearSelected]
        : styles.yearSelected,
      yearLabelStyle: styles.yearLabel,
      yearLabelSelectedStyle: tint
        ? [styles.yearLabelSelected, tint.yearLabelSelected]
        : styles.yearLabelSelected,
      monthPickerStyle: styles.monthPicker,
      monthStyle: styles.month,
      monthSelectedStyle: tint
        ? [styles.monthSelected, tint.monthSelected]
        : styles.monthSelected,
      monthLabelStyle: styles.monthLabel,
      monthLabelSelectedStyle: tint
        ? [styles.monthLabelSelected, tint.monthLabelSelected]
        : styles.monthLabelSelected,
      glyph: {
        size: title.fontSize,
        color: typeof title.color === 'string' ? title.color : undefined,
      },
      month,
      value,
      locale: resolvedLocale,
      firstDayOfWeek: weekStart,
      isDisabled,
      view,
      setView,
      isDayEnabled,
      select,
      goToMonth,
      canGoToMonth,
      goToYear,
      goToMonthInYear,
      yearRange,
    }
  }, [
    styles,
    tint,
    month,
    value,
    resolvedLocale,
    weekStart,
    isDisabled,
    view,
    setView,
    isDayEnabled,
    select,
    goToMonth,
    canGoToMonth,
    goToYear,
    goToMonthInYear,
    yearRange,
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
