import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  ScrollViewProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { PressableFeedbackProps } from '../../system/pressable-feedback'
import type { AsChildProps } from '../../system/slot'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'
import type { WeekDay } from '../../utils/dates'
import type { CalendarVariant } from '../calendar'

export type AgendaCalendarSlot =
  | 'root'
  | 'header'
  | 'nav'
  | 'navButton'
  | 'today'
  | 'todayDisabled'
  | 'todayLabel'
  | 'week'
  | 'picker'
  | 'pickerItem'

/** The `Calendar`'s four, because the chosen day is the same day. */
export type AgendaCalendarVariant = CalendarVariant

/**
 * Which strip is on screen: the week of days, the months of the year, or the years.
 *
 * `'week'` is the strip as it opens. The other two are **rows in its place**, not a grid
 * over it — the months of the year scroll sideways where the days were, and a year picked
 * there steps on to the months. The chevrons page whichever unit is showing, and `Today`
 * always lands back on `'week'`.
 */
export type AgendaCalendarView = 'week' | 'month' | 'year'

export type AgendaCalendarSize = Exclude<Size, 'xs'>

type AgendaCalendarOwnProps = {
  variant?: AgendaCalendarVariant
  /** The cell's box and the type around it. The strip spans its parent either way. */
  size?: AgendaCalendarSize
  /** The chosen day's corner, which is a circle by default. */
  radius?: RadiusKey
  /** A raw tint (`'#7c3aed'`), never a token (R7). It lands on the chosen day. */
  color?: string
  /** The chosen day. Controlled — leave it out and the strip holds its own. */
  value?: Date
  defaultValue?: Date
  onValueChange?: (value: Date) => void
  /**
   * Any day in the week on screen. Controlled separately from the value, for the
   * `Calendar`'s reason: scrolling through weeks is not choosing a day.
   */
  week?: Date
  defaultWeek?: Date
  onWeekChange?: (week: Date) => void
  /**
   * Which strip is on screen — the days, the months, or the years. Controlled separately
   * again: the picker components step it, and a title button of the caller's opens it.
   */
  view?: AgendaCalendarView
  /** The strip shown at first mount. @default 'week' */
  defaultView?: AgendaCalendarView
  onViewChange?: (view: AgendaCalendarView) => void
  /**
   * The days that have something on them. Each one gets a mark under its number, which is
   * the whole of what makes this an *agenda* rather than a week of numbers.
   *
   * A list rather than a predicate because that is what a caller has: a month of events
   * mapped to their dates. It is read by day, so the time each one carries is ignored.
   */
  events?: ReadonlyArray<Date>
  minValue?: Date
  maxValue?: Date
  firstDayOfWeek?: WeekDay
  /** Names the month and the weekdays. @default the device's */
  locale?: string
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/** R14 — its own props, `View`'s, and every `ViewStyle` key neither claims. */
export type AgendaCalendarProps = AgendaCalendarOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof AgendaCalendarOwnProps> &
  Omit<ViewStyleProps, keyof AgendaCalendarOwnProps | keyof ViewProps>

export type AgendaCalendarViewSlotProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

export type AgendaCalendarTextSlotProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

type AgendaCalendarNavButtonOwnProps = {
  children?: ReactNode
  /** How many units one press moves — weeks, months or years, by the strip on screen. @default ±1 */
  step?: number
}

export type AgendaCalendarNavButtonProps = AgendaCalendarNavButtonOwnProps &
  Omit<PressableFeedbackProps, keyof AgendaCalendarNavButtonOwnProps | 'isPressed'>

type AgendaCalendarDayOwnProps = {
  date: Date
  children?: ReactNode
  isDisabled?: boolean
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
}

export type AgendaCalendarDayProps = AgendaCalendarDayOwnProps &
  Omit<PressableFeedbackProps, keyof AgendaCalendarDayOwnProps | 'isPressed'> &
  Omit<ViewStyleProps, keyof AgendaCalendarDayOwnProps>

type AgendaCalendarWeekOwnProps = {
  /** The `Calendar.Grid`'s escape hatch, for the same reason: seven cells from a date. */
  children?: ReactNode | ((date: Date) => ReactNode)
}

export type AgendaCalendarWeekProps = AgendaCalendarWeekOwnProps &
  Omit<ViewProps, keyof AgendaCalendarWeekOwnProps> &
  Omit<ViewStyleProps, keyof AgendaCalendarWeekOwnProps | keyof ViewProps>

type AgendaCalendarMonthPickerOwnProps = {
  /**
   * How the month names read. `'long'` is "septembre", `'short'` is "sept." — a row that
   * scrolls sideways, so a long name is a wider pill rather than a wrapped one.
   *
   * @default 'short'
   */
  format?: 'long' | 'short'
  children?: ReactNode
}

/**
 * The twelve months of the year on screen, in a row where the days were. It mounts while
 * `view` is `'month'`; the year picker steps to it, and a month pressed here steps back to
 * the week that holds it.
 */
export type AgendaCalendarMonthPickerProps = AgendaCalendarMonthPickerOwnProps &
  Omit<ScrollViewProps, keyof AgendaCalendarMonthPickerOwnProps> &
  Omit<
    ViewStyleProps,
    keyof AgendaCalendarMonthPickerOwnProps | keyof ScrollViewProps
  >

type AgendaCalendarYearPickerOwnProps = {
  /** First year in the row. Defaults to fifty back — from `minValue`'s year when bounded. */
  firstYear?: number
  /** Last year in the row. Defaults to fifty on — from `maxValue`'s year when bounded. */
  lastYear?: number
  children?: ReactNode
}

/**
 * The years the strip can be aimed at, in a row where the days were. It mounts while `view`
 * is `'year'`; a year pressed here steps on to that year's months.
 */
export type AgendaCalendarYearPickerProps = AgendaCalendarYearPickerOwnProps &
  Omit<ScrollViewProps, keyof AgendaCalendarYearPickerOwnProps> &
  Omit<
    ViewStyleProps,
    keyof AgendaCalendarYearPickerOwnProps | keyof ScrollViewProps
  >

/** R5 — resolved styles, plus the week, the chosen day and the three moves. */
export type AgendaCalendarContextValue = {
  headerStyle: StyleProp<ViewStyle>
  navStyle: StyleProp<ViewStyle>
  navButtonStyle: StyleProp<ViewStyle>
  todayStyle: StyleProp<ViewStyle>
  /** Laid over the pill while it has nowhere to go. */
  todayDisabledStyle: StyleProp<ViewStyle>
  todayLabelStyle: StyleProp<TextStyle>
  weekStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  weekdaysStyle: StyleProp<ViewStyle>
  weekdayStyle: StyleProp<TextStyle>
  dayStyle: StyleProp<ViewStyle>
  daySelectedStyle: StyleProp<ViewStyle>
  dayLabelStyle: StyleProp<TextStyle>
  dayLabelSelectedStyle: StyleProp<TextStyle>
  dayLabelMutedStyle: StyleProp<TextStyle>
  dotStyle: StyleProp<ViewStyle>
  dotSelectedStyle: StyleProp<ViewStyle>
  pickerStyle: StyleProp<ViewStyle>
  pickerItemStyle: StyleProp<ViewStyle>
  pickerItemSelectedStyle: StyleProp<ViewStyle>
  pickerItemLabelStyle: StyleProp<TextStyle>
  pickerItemLabelSelectedStyle: StyleProp<TextStyle>
  glyph: { size?: number; color?: string }
  /** The seven days on screen. */
  days: Date[]
  value: Date | undefined
  locale: string
  isDisabled: boolean
  /** Which strip is on screen. `AgendaCalendar.YearPicker` / `.MonthPicker` step it. */
  view: AgendaCalendarView
  /** Sets the strip on screen. Takes the next value or an updater, like a `setState`. */
  setView: (
    next: AgendaCalendarView | ((current: AgendaCalendarView) => AgendaCalendarView)
  ) => void
  /** Whether that day carries a mark. */
  hasEvent: (date: Date) => boolean
  isDayEnabled: (date: Date) => boolean
  select: (date: Date) => void
  /** Moves the strip by whole weeks. */
  goByWeeks: (step: number) => void
  canGoByWeeks: (step: number) => boolean
  /** Moves the strip by whole months, and whether that month has a day left to choose. */
  goByMonths: (step: number) => void
  canGoByMonths: (step: number) => boolean
  /** Moves the strip by whole years, and whether that year has a day left to choose. */
  goByYears: (step: number) => void
  canGoByYears: (step: number) => boolean
  /**
   * Steps the strip by one unit of **whatever `view` is showing** — a week, a month, or a
   * year. This is what the chevrons call, so one pair of arrows pages all three.
   */
  page: (step: number) => void
  canPage: (step: number) => boolean
  /** Lays the strip on `year`, keeping the month and day, then opens that year's months. */
  goToYear: (year: number) => void
  /** Lays the strip on `monthIndex` (0–11), keeping the year, then back to the week. */
  goToMonthInYear: (monthIndex: number) => void
  /** The ends of the year row the picker shows. */
  yearRange: { first: number; last: number }
  /** Brings today's week on screen, returns to `'week'`, and chooses today (bounds allowing). */
  goToToday: () => void
  /** Whether today's week is already the one on screen. */
  isOnToday: boolean
  /**
   * Whether there is nothing left for `Today` to do — its week is showing, the strip is the
   * view, and today is the chosen day. This is what greys the button; page away, open a
   * picker, or pick another day and it goes back to `false`.
   */
  isTodayResolved: boolean
}
