import { forwardRef, useCallback, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle, ViewStyle } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import {
  addDays,
  addMonths,
  firstDayOfWeekFor,
  isSameDay,
  isWithinBounds,
  startOfDay,
  startOfWeek,
  weekGrid,
} from '../../utils/dates'
import { calendarRecipe } from '../calendar'
import { AgendaCalendarProvider } from './agenda-calendar.context'
import { agendaCalendarRecipe } from './agenda-calendar.recipe'
import type { AgendaCalendarProps, AgendaCalendarView } from './agenda-calendar.type'

const DAYS_IN_WEEK = 7
const MONTHS_IN_YEAR = 12

/** The years the strip offers each way when it is unbounded — the `Calendar`'s ladder. */
const DEFAULT_YEAR_SPAN = 50

/**
 * One week, and what is on it.
 *
 * ```tsx
 * <AgendaCalendar value={day} onValueChange={setDay} events={dates}>
 *   <AgendaCalendar.Header>
 *     <AgendaCalendar.Title />
 *     <AgendaCalendar.Nav>
 *       <AgendaCalendar.PreviousButton accessibilityLabel="Semaine précédente" />
 *       <AgendaCalendar.TodayButton>Today</AgendaCalendar.TodayButton>
 *       <AgendaCalendar.NextButton accessibilityLabel="Semaine suivante" />
 *     </AgendaCalendar.Nav>
 *   </AgendaCalendar.Header>
 *   <AgendaCalendar.Weekdays />
 *   <AgendaCalendar.Week />
 * </AgendaCalendar>
 * ```
 *
 * **It is a `Calendar` folded down to the week you are on**, and the row of dots is the
 * whole difference: a strip of seven numbers is a date picker, and a strip of seven numbers
 * with marks under some of them is an agenda.
 *
 * **The cells are the `Calendar`'s style**, resolved through `calendarRecipe` rather than a
 * second table. A strip and a month showing two different discs for the same chosen day is
 * what that sharing exists to prevent — and the two sit one above the other the moment a
 * caller expands one into the other, which is what the chevron beside the title is for.
 *
 * **It steps by weeks, not by months**, which is why it is a component rather than a layout
 * prop on the `Calendar`: the thing being paged is different, so the state under it is too.
 *
 * **No day is ever "outside".** Every one of the seven is on screen and choosable; a strip
 * that greyed out the two days belonging to next month would be greying out days it is
 * showing.
 */
export const AgendaCalendarRoot = forwardRef<View, AgendaCalendarProps>(
  function AgendaCalendar(
    {
      children,
      variant,
      size = 'md',
      radius,
      color,
      value: controlledValue,
      defaultValue,
      onValueChange,
      week: controlledWeek,
      defaultWeek,
      onWeekChange,
      view: controlledView,
      defaultView,
      onViewChange,
      events,
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

    // Once, not per render: `new Date()` is a different value every call, and a default
    // that changed identity would walk the strip back to this week on any re-render.
    const [fallbackWeek] = useState(() => startOfDay(defaultValue ?? new Date()))

    const [week, setWeek] = useControllableState<Date>({
      value: controlledWeek,
      defaultValue: defaultWeek ?? fallbackWeek,
      onChange: onWeekChange,
    })

    // The strip on screen — the days, the months, or the years. A third piece of state,
    // for the reason the week is one: paging months is not choosing a day either.
    const [view, setView] = useControllableState<AgendaCalendarView>({
      value: controlledView,
      defaultValue: defaultView ?? 'week',
      onChange: onViewChange,
    })

    const resolvedLocale = locale ?? deviceLocale()
    const weekStart = firstDayOfWeek ?? firstDayOfWeekFor(resolvedLocale)

    // The cells, from the calendar's own table. Two recipes, and the cache makes the
    // second resolution of the shared one free.
    const cellSelection = { variant, size, radius }
    const cells = calendarRecipe.resolve({
      theme,
      selection: cellSelection,
      states: { disabled: isDisabled },
    })
    const cellTint = color
      ? calendarRecipe.tint({ theme, color, selection: cellSelection })
      : undefined

    const selection = { size, radius }
    const styles = agendaCalendarRecipe.resolve({
      theme,
      selection,
      states: { disabled: isDisabled },
    })
    const tint = color
      ? agendaCalendarRecipe.tint({ theme, color, selection })
      : undefined

    const days = useMemo(() => weekGrid(week, weekStart), [week, weekStart])

    /**
     * The marked days, as a set of day keys.
     *
     * A `Set` rather than a scan per cell: seven cells against a month of events is 210
     * comparisons a render, and the events change far less often than the strip does.
     */
    const marked = useMemo(() => {
      const keys = new Set<number>()
      for (const event of events ?? []) keys.add(startOfDay(event).getTime())
      return keys
    }, [events])

    const bounds = useMemo(
      () => ({ min: minValue, max: maxValue }),
      [minValue, maxValue]
    )

    const hasEvent = useCallback(
      (date: Date) => marked.has(startOfDay(date).getTime()),
      [marked]
    )

    const isDayEnabled = useCallback(
      (date: Date) => !isDisabled && isWithinBounds(date, bounds),
      [bounds, isDisabled]
    )

    const select = useCallback(
      (date: Date) => {
        if (!isWithinBounds(date, bounds)) return
        setValue(startOfDay(date))
      },
      [bounds, setValue]
    )

    const goByWeeks = useCallback(
      (step: number) => {
        if (step === 0) return
        setWeek(current => addDays(current, step * DAYS_IN_WEEK))
      },
      [setWeek]
    )

    /**
     * Whether that step leaves a day to choose.
     *
     * It asks about the **week**, not about one day: a week that falls entirely outside the
     * bounds has nothing in it, so the chevron that would take you there is dead rather
     * than merely disappointing — the `Calendar`'s rule, one unit down.
     */
    const canGoByWeeks = useCallback(
      (step: number) => {
        const target = weekGrid(addDays(week, step * DAYS_IN_WEEK), weekStart)
        return target.some(day => isWithinBounds(day, bounds))
      },
      [bounds, week, weekStart]
    )

    // Months and years move the same underlying day; `addMonths` clamps the day-of-month,
    // so stepping off the 31st lands on the last of the shorter month rather than rolling
    // over. `canGo…` asks the same question as `canGoByWeeks`, of the week it would land on.
    const goByMonths = useCallback(
      (step: number) => {
        if (step === 0) return
        setWeek(current => addMonths(current, step))
      },
      [setWeek]
    )

    const canGoByMonths = useCallback(
      (step: number) => {
        const target = weekGrid(addMonths(week, step), weekStart)
        return target.some(day => isWithinBounds(day, bounds))
      },
      [bounds, week, weekStart]
    )

    const goByYears = useCallback(
      (step: number) => {
        if (step === 0) return
        setWeek(current => addMonths(current, step * MONTHS_IN_YEAR))
      },
      [setWeek]
    )

    const canGoByYears = useCallback(
      (step: number) => {
        const target = weekGrid(addMonths(week, step * MONTHS_IN_YEAR), weekStart)
        return target.some(day => isWithinBounds(day, bounds))
      },
      [bounds, week, weekStart]
    )

    // One pair of chevrons for all three strips: they step whatever `view` is showing.
    const page = useCallback(
      (step: number) => {
        if (view === 'year') goByYears(step)
        else if (view === 'month') goByMonths(step)
        else goByWeeks(step)
      },
      [view, goByYears, goByMonths, goByWeeks]
    )

    const canPage = useCallback(
      (step: number) => {
        if (view === 'year') return canGoByYears(step)
        if (view === 'month') return canGoByMonths(step)
        return canGoByWeeks(step)
      },
      [view, canGoByYears, canGoByMonths, canGoByWeeks]
    )

    // Pressing a year is not the end of it — the months of that year are — so the strip
    // steps on to the month row, the way legacy's dialog walked year → month → day.
    const goToYear = useCallback(
      (year: number) => {
        setWeek(current =>
          addMonths(current, (year - current.getFullYear()) * MONTHS_IN_YEAR)
        )
        setView('month')
      },
      [setWeek, setView]
    )

    const goToMonthInYear = useCallback(
      (monthIndex: number) => {
        setWeek(current => addMonths(current, monthIndex - current.getMonth()))
        setView('week')
      },
      [setWeek, setView]
    )

    const yearRange = useMemo(() => {
      const now = new Date().getFullYear()

      return {
        first: bounds.min?.getFullYear() ?? now - DEFAULT_YEAR_SPAN,
        last: bounds.max?.getFullYear() ?? now + DEFAULT_YEAR_SPAN,
      }
    }, [bounds.min, bounds.max])

    // Today is one press, not two: it brings today's week on screen, closes any picker,
    // **and chooses today** — legacy's `handleTodayPress` did the same, and a "Today" that
    // left you to hunt for the day once its week arrived is a button half-finished. `select`
    // still honours the bounds, so an out-of-range today moves the strip without choosing.
    const goToToday = useCallback(() => {
      const today = startOfDay(new Date())
      setWeek(today)
      setView('week')
      select(today)
    }, [setWeek, setView, select])

    const isOnToday = useMemo(
      () =>
        isSameDay(startOfWeek(week, weekStart), startOfWeek(new Date(), weekStart)),
      [week, weekStart]
    )

    // Whether there is nothing left for `Today` to do: its week is showing, the strip is
    // the view, and today is the chosen day. Change any one of those — page away, open a
    // picker, pick another day — and the button comes back to life.
    const isTodayResolved = useMemo(
      () =>
        view === 'week' &&
        isOnToday &&
        value !== undefined &&
        isSameDay(value, new Date()),
      [view, isOnToday, value]
    )

    const context = useMemo(() => {
      const title = StyleSheet.flatten<TextStyle>([cells.title])
      // The picker's current-month/year pill wears the chosen day's disc colour, so the
      // strip and its picker never show two different accents for the same aim. Only the
      // colour is lifted off the flattened disc — the shape is the recipe's pill, because
      // a month name does not fit the day's circle.
      const disc = StyleSheet.flatten<ViewStyle>([
        cells.daySelected,
        cellTint?.daySelected,
      ])

      return {
        headerStyle: styles.header,
        navStyle: styles.nav,
        navButtonStyle: styles.navButton,
        pickerStyle: styles.picker,
        pickerItemStyle: styles.pickerItem,
        pickerItemSelectedStyle: { backgroundColor: disc.backgroundColor },
        pickerItemLabelStyle: cells.dayLabel,
        pickerItemLabelSelectedStyle: cellTint
          ? [cells.dayLabelSelected, cellTint.dayLabelSelected]
          : cells.dayLabelSelected,
        todayStyle: styles.today,
        todayDisabledStyle: styles.todayDisabled,
        todayLabelStyle: tint
          ? [styles.todayLabel, tint.todayLabel]
          : styles.todayLabel,
        weekStyle: styles.week,
        // The four below are the calendar's own slots, unchanged: same title, same column
        // headings, same cell, same mark.
        titleStyle: cells.title,
        weekdaysStyle: cells.weekdays,
        weekdayStyle: cells.weekday,
        dayStyle: cells.day,
        daySelectedStyle: cellTint
          ? [cells.daySelected, cellTint.daySelected]
          : cells.daySelected,
        dayLabelStyle: cells.dayLabel,
        dayLabelSelectedStyle: cellTint
          ? [cells.dayLabelSelected, cellTint.dayLabelSelected]
          : cells.dayLabelSelected,
        dayLabelMutedStyle: cells.dayLabelMuted,
        dotStyle: cells.dot,
        // `dot` first, because the size axis puts the mark's width and corner there and a
        // `dotSelected` handed over alone is a coloured node with no size.
        dotSelectedStyle: [
          cells.dot,
          cellTint ? cellTint.dotSelected : cells.dotSelected,
        ],
        glyph: {
          size: title.fontSize,
          color: typeof title.color === 'string' ? title.color : undefined,
        },
        days,
        value,
        locale: resolvedLocale,
        isDisabled,
        view,
        setView,
        hasEvent,
        isDayEnabled,
        select,
        goByWeeks,
        canGoByWeeks,
        goByMonths,
        canGoByMonths,
        goByYears,
        canGoByYears,
        page,
        canPage,
        goToYear,
        goToMonthInYear,
        yearRange,
        goToToday,
        isOnToday,
        isTodayResolved,
      }
    }, [
      styles,
      tint,
      cells,
      cellTint,
      days,
      value,
      resolvedLocale,
      isDisabled,
      view,
      setView,
      hasEvent,
      isDayEnabled,
      select,
      goByWeeks,
      canGoByWeeks,
      goByMonths,
      canGoByMonths,
      goByYears,
      canGoByYears,
      page,
      canPage,
      goToYear,
      goToMonthInYear,
      yearRange,
      goToToday,
      isOnToday,
      isTodayResolved,
    ])

    const rootStyle = [styles.root, styleProps, style]

    return (
      <AgendaCalendarProvider value={context}>
        {asChild ? (
          <Slot ref={ref} {...rest} style={rootStyle}>
            {children}
          </Slot>
        ) : (
          <View ref={ref} {...rest} style={rootStyle}>
            {children}
          </View>
        )}
      </AgendaCalendarProvider>
    )
  }
)

AgendaCalendarRoot.displayName = 'XAUI.AgendaCalendar.Root'

/** The device's locale, or English. The `Calendar` says why the `try` is there. */
function deviceLocale(): string {
  try {
    return new Intl.DateTimeFormat().resolvedOptions().locale
  } catch {
    return 'en'
  }
}
