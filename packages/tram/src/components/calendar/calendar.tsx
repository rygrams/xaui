import { forwardRef, useCallback, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { useControllableState } from '@xaui/native'
import { firstDayOfWeekFor, isWithinBounds, startOfDay } from '@xaui/native/system'
import { useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { faintFill } from '../../system/faint-fill'
import { flatPaint, inkOn } from '../../system/flat-paint'
import { colorOf } from '../../system/style-values'
import { softSlice } from '../../theme/accent-ink'
import { isHex } from '../../theme/on-accent'
import { useTramHaptic } from '../../theme/tram-haptics'
import { CalendarProvider } from './calendar.context'
import { CALENDAR_SIZES, DEFAULT_SIZE, calendarRecipe } from './calendar.recipe'
import type { CalendarProps, CalendarView } from './calendar.type'
import { deviceLocale, firstOfMonth } from './calendar.utils'

/**
 * How much of the chosen colour a range's band lays on the ground: twice the `flat` box's
 * slice, which on black is too dark to read as one strip across a week.
 */
const BAND_SHARE = 0.3

/** The years a boundless calendar offers, each way of this one. */
const DEFAULT_YEAR_SPAN = 50

/**
 * A month, and the day chosen in it — the Native `Calendar`'s API, drawn as the Windows
 * calendar: a grid of flat squares, the chosen one in the accent, today lined in the ink.
 *
 * ```tsx
 * <Calendar value={date} onValueChange={setDate}>
 *   <Calendar.Header>
 *     <Calendar.Title />
 *     <View style={{ flexDirection: 'row' }}>
 *       <Calendar.PreviousButton accessibilityLabel="Mois précédent" />
 *       <Calendar.NextButton accessibilityLabel="Mois suivant" />
 *     </View>
 *   </Calendar.Header>
 *   <Calendar.Weekdays />
 *   <Calendar.Grid />
 * </Calendar>
 * ```
 *
 * The month on screen, the chosen day and the panel are three pieces of state, each
 * controllable without the others — Native's arithmetic, from its root entrypoint. **The
 * months page up and down**: the chevrons point up and down and the next month rises
 * from below. Each choice is felt as a `selection`.
 */
export const CalendarRoot = forwardRef<View, CalendarProps>(function Calendar(
  {
    children,
    size = DEFAULT_SIZE,
    accent,
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
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const haptic = useTramHaptic()
  const [styleProps, rest] = useStyleProps(props)

  const [value, setValue] = useControllableState<Date | undefined>({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange as ((next: Date | undefined) => void) | undefined,
  })

  // Once, not per render: `new Date()` changes identity on every call.
  const [fallbackMonth] = useState(() => firstOfMonth(defaultValue ?? new Date()))

  const [month, setMonth] = useControllableState<Date>({
    value: controlledMonth,
    defaultValue: defaultMonth ? firstOfMonth(defaultMonth) : fallbackMonth,
    onChange: onMonthChange,
  })

  const [view, setView] = useControllableState<CalendarView>({
    value: controlledView,
    defaultValue: defaultView ?? 'grid',
    onChange: onViewChange,
  })

  const resolvedLocale = locale ?? deviceLocale()
  const weekStart = firstDayOfWeek ?? firstDayOfWeekFor(resolvedLocale)

  const styles = calendarRecipe.resolve({
    theme,
    selection: { size },
    states: { disabled: isDisabled },
  })
  // The chosen day is a fill, so a named accent is its true colour.
  const fill = isDisabled ? undefined : flatPaint({ accent, color })

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
      haptic('selection')
      setValue(startOfDay(date))
    },
    [bounds, haptic, setValue]
  )

  const goToMonth = useCallback(
    (step: number) => {
      if (step === 0) return
      setMonth(
        current => new Date(current.getFullYear(), current.getMonth() + step, 1)
      )
    },
    [setMonth]
  )

  /** Whether a step lands on a month with a day left to choose in it. */
  const canGoToMonth = useCallback(
    (step: number) => {
      const target = new Date(month.getFullYear(), month.getMonth() + step, 1)
      const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0)

      return (
        isWithinBounds(target, { max: bounds.max }) &&
        isWithinBounds(lastDay, { min: bounds.min })
      )
    },
    [bounds, month]
  )

  /**
   * A year is open when any of its days is: its first day not after the upper bound, its
   * last not before the lower one. Judged on the whole year, so a bound in November still
   * leaves that year's November and December to reach through the month picker.
   */
  const isYearEnabled = useCallback(
    (year: number) =>
      isWithinBounds(new Date(year, 0, 1), { max: bounds.max }) &&
      isWithinBounds(new Date(year, 11, 31), { min: bounds.min }),
    [bounds]
  )

  const currentYear = month.getFullYear()
  const goToYear = useCallback(
    (year: number) => goToMonth((year - currentYear) * 12),
    [goToMonth, currentYear]
  )

  const currentMonthIndex = month.getMonth()
  const goToMonthInYear = useCallback(
    (monthIndex: number) => goToMonth(monthIndex - currentMonthIndex),
    [goToMonth, currentMonthIndex]
  )

  const yearRange = useMemo(() => {
    const now = new Date().getFullYear()

    return {
      first: bounds.min?.getFullYear() ?? now - DEFAULT_YEAR_SPAN,
      last: bounds.max?.getFullYear() ?? now + DEFAULT_YEAR_SPAN,
    }
  }, [bounds.min, bounds.max])

  const context = useMemo(() => {
    const chosen = fill ?? theme.colors.accent
    const painted = fill ? { backgroundColor: fill } : undefined
    const ink = fill
      ? { color: inkOn(fill, theme.colors.accentForeground) }
      : undefined
    const title = StyleSheet.flatten<TextStyle>(styles.title)
    const ground = theme.colors.background

    return {
      headerStyle: styles.header,
      titleStyle: styles.title,
      navStyle: styles.nav,
      weekdaysStyle: styles.weekdays,
      weekdayStyle: styles.weekday,
      gridStyle: styles.grid,
      dayStyle: styles.day,
      dayTodayStyle: styles.dayToday,
      daySelectedStyle: painted ? [styles.daySelected, painted] : styles.daySelected,
      dayLabelStyle: styles.dayLabel,
      dayLabelMutedStyle: styles.dayLabelMuted,
      dayLabelDisabledStyle: styles.dayLabelDisabled,
      dayLabelSelectedStyle: ink
        ? [styles.dayLabelSelected, ink]
        : styles.dayLabelSelected,
      pickerStyle: styles.picker,
      pickStyle: styles.pick,
      pickSelectedStyle: painted
        ? [styles.pickSelected, painted]
        : styles.pickSelected,
      pickLabelStyle: styles.pickLabel,
      pickLabelSelectedStyle: ink
        ? [styles.pickLabelSelected, ink]
        : styles.pickLabelSelected,
      glyph: {
        size: CALENDAR_SIZES[size].glyph,
        color: colorOf(title, 'color'),
        dead: faintFill(theme.colors.foreground, ground) ?? theme.colors.muted,
      },
      band:
        isHex(chosen) && isHex(ground)
          ? softSlice(chosen, ground, BAND_SHARE)
          : theme.colors.accentSoft,
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
      isYearEnabled,
      goToYear,
      goToMonthInYear,
      yearRange,
    }
  }, [
    styles,
    fill,
    theme,
    size,
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
    isYearEnabled,
    goToYear,
    goToMonthInYear,
    yearRange,
  ])

  return (
    <CalendarProvider value={context}>
      <View ref={ref} {...rest} style={[styles.root, styleProps, style]}>
        {children}
      </View>
    </CalendarProvider>
  )
})

CalendarRoot.displayName = 'XAUI.Tram.Calendar.Root'
