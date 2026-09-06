import { forwardRef, useCallback, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import {
  addDays,
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
import type { AgendaCalendarProps } from './agenda-calendar.type'

const DAYS_IN_WEEK = 7

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

    const goToToday = useCallback(() => setWeek(startOfDay(new Date())), [setWeek])

    const isOnToday = useMemo(
      () =>
        isSameDay(startOfWeek(week, weekStart), startOfWeek(new Date(), weekStart)),
      [week, weekStart]
    )

    const context = useMemo(() => {
      const title = StyleSheet.flatten<TextStyle>([cells.title])

      return {
        headerStyle: styles.header,
        navStyle: styles.nav,
        navButtonStyle: styles.navButton,
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
        hasEvent,
        isDayEnabled,
        select,
        goByWeeks,
        canGoByWeeks,
        goToToday,
        isOnToday,
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
      hasEvent,
      isDayEnabled,
      select,
      goByWeeks,
      canGoByWeeks,
      goToToday,
      isOnToday,
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
