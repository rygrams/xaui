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
import type { AsChildProps } from '../../system/slot'
import type { PressableFeedbackProps } from '../../system/pressable-feedback'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'
import type { WeekDay } from '../../utils/dates'

export type CalendarSlot =
  | 'root'
  | 'header'
  | 'title'
  | 'nav'
  | 'weekdays'
  | 'weekday'
  | 'grid'
  | 'day'
  | 'daySelected'
  | 'dayLabel'
  | 'dayLabelSelected'
  | 'dayLabelMuted'
  | 'dot'
  | 'dotSelected'
  | 'yearPicker'
  | 'year'
  | 'yearSelected'
  | 'yearLabel'
  | 'yearLabelSelected'
  | 'monthPicker'
  | 'month'
  | 'monthSelected'
  | 'monthLabel'
  | 'monthLabelSelected'

/**
 * Which panel is on screen: the six weeks of days, the years to aim at, or the months of
 * the year just aimed at. `'grid'` is the calendar as it opens; the other two are what the
 * title turns into when it is pressed.
 *
 * The picker components move it — pressing a year steps it to `'month'`, pressing a month
 * back to `'grid'` — the way legacy's dialog walked year → month → day. The caller reads it
 * to decide which of the three to render, and controls it with `view` / `onViewChange` when
 * a title button of its own is the switch.
 */
export type CalendarView = 'grid' | 'year' | 'month'

/**
 * Four emphasis levels and no intent — a date is neither a success nor a danger. What the
 * variant names is **the chosen day**: the disc under the number.
 */
export type CalendarVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

/** Three. `size` is the cell's box and the type in it. Never the grid's width. */
export type CalendarSize = Exclude<Size, 'xs'>

type CalendarOwnProps = {
  variant?: CalendarVariant
  /** The cell's box and its type. The grid spans its parent either way. */
  size?: CalendarSize
  /** The chosen day's corner, which is a circle by default. */
  radius?: RadiusKey
  /** A raw tint (`'#7c3aed'`), never a token (R7). It lands on the chosen day. */
  color?: string
  /** The chosen day. Controlled — leave it out and the calendar holds its own. */
  value?: Date
  /** The day chosen at first mount. */
  defaultValue?: Date
  /** Fired with the day that was pressed, at midnight local time. */
  onValueChange?: (value: Date) => void
  /**
   * The month on screen. Controlled **separately from the value**, because paging through
   * months is not choosing a day: a calendar that jumped back to the chosen month every
   * time you looked at the next one would be unusable, and one that chose a day because you
   * paged past it would be worse.
   */
  month?: Date
  /** The month shown at first mount. Defaults to the chosen day's, or to this one. */
  defaultMonth?: Date
  onMonthChange?: (month: Date) => void
  /** The earliest day that can be chosen. Days before it are dimmed and inert. */
  minValue?: Date
  /** The latest day that can be chosen. */
  maxValue?: Date
  /**
   * Which day a week starts on. Read from `locale` when unset — `Intl` answers it properly
   * where it exists, and a list of Monday-first languages is the fallback.
   */
  firstDayOfWeek?: WeekDay
  /** Names the months and the weekdays. @default the device's */
  locale?: string
  /**
   * Which panel is on screen — the days, the years, or the months. Controlled **separately
   * from the month and the value**, the same way they are separate from each other: the
   * picker components step it, and the caller reads it to render one of the three.
   */
  view?: CalendarView
  /** The panel shown at first mount. @default 'grid' */
  defaultView?: CalendarView
  onViewChange?: (view: CalendarView) => void
  /** Dims the calendar and stops every day. */
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/** R14 — the calendar's own props, `View`'s, and every `ViewStyle` key neither claims. */
export type CalendarProps = CalendarOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof CalendarOwnProps> &
  Omit<ViewStyleProps, keyof CalendarOwnProps | keyof ViewProps>

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type CalendarViewSlotProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type CalendarTextSlotProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

type CalendarNavButtonOwnProps = {
  /** Replaces the built-in chevron. */
  children?: ReactNode
  /** How many months one press moves. Negative goes back. @default ±1 */
  step?: number
}

export type CalendarNavButtonProps = CalendarNavButtonOwnProps &
  Omit<PressableFeedbackProps, keyof CalendarNavButtonOwnProps | 'isPressed'>

type CalendarGridOwnProps = {
  /**
   * A **function**, and the one place in this library that takes one: forty-two cells are
   * generated from a month rather than written, so there is nothing for a caller to compose
   * against. Given one, it renders each day; given nothing, it renders the built-in day.
   */
  children?: ReactNode | ((date: Date) => ReactNode)
}

export type CalendarGridProps = CalendarGridOwnProps &
  Omit<ViewProps, keyof CalendarGridOwnProps> &
  Omit<ViewStyleProps, keyof CalendarGridOwnProps | keyof ViewProps>

type CalendarYearPickerOwnProps = {
  /**
   * First year on the list. Defaults to fifty back — from `minValue`'s year when the
   * calendar has one.
   */
  firstYear?: number
  /**
   * Last year on the list. Defaults to fifty forward — from `maxValue`'s year when the
   * calendar has one.
   */
  lastYear?: number
}

/**
 * The years a calendar can be aimed at, laid in a scroll.
 *
 * It is composed, not configured: the caller renders it **instead of** the weekdays and
 * the grid — inside one of their own view, or an `Animated` one — and the header's title
 * wears `asChild` into a `PressableFeedback` to become the button that swaps them. One
 * `useCalendar()` has the whole arithmetic.
 */
export type CalendarYearPickerProps = CalendarYearPickerOwnProps &
  ScrollViewProps &
  Omit<ViewStyleProps, keyof ScrollViewProps | keyof ViewProps>

type CalendarMonthPickerOwnProps = {
  /**
   * How the month names read. `'long'` is "septembre", `'short'` is "sept." — the grid
   * clips either to one line rather than reflowing, so a long name in a narrow column is a
   * truncation, not a broken row.
   *
   * @default 'long'
   */
  format?: 'long' | 'short'
  children?: ReactNode
}

/**
 * The twelve months of the year on screen, laid in a grid.
 *
 * The mirror of `Calendar.YearPicker`: it mounts **instead of** the weekdays and the grid,
 * the year picker steps to it when a year is pressed, and pressing a month here steps back
 * to the days. One `useCalendar()` has the whole of it.
 */
export type CalendarMonthPickerProps = CalendarMonthPickerOwnProps &
  Omit<ViewProps, keyof CalendarMonthPickerOwnProps> &
  Omit<ViewStyleProps, keyof CalendarMonthPickerOwnProps | keyof ViewProps>

type CalendarDayOwnProps = {
  /** Which day this cell is. Everything else about it is read off the calendar. */
  date: Date
  /** Replaces the number and the dot. */
  children?: ReactNode
  /** Stops this one day, whatever the bounds say. */
  isDisabled?: boolean
  /** R9 — `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
}

export type CalendarDayProps = CalendarDayOwnProps &
  Omit<PressableFeedbackProps, keyof CalendarDayOwnProps | 'isPressed'> &
  Omit<ViewStyleProps, keyof CalendarDayOwnProps>

/**
 * R5 — resolved styles, plus the four things no slot can compute for itself: which month is
 * on screen, which day is chosen, what a day is called, and how to move.
 */
export type CalendarContextValue = {
  headerStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  navStyle: StyleProp<ViewStyle>
  weekdaysStyle: StyleProp<ViewStyle>
  weekdayStyle: StyleProp<TextStyle>
  gridStyle: StyleProp<ViewStyle>
  dayStyle: StyleProp<ViewStyle>
  daySelectedStyle: StyleProp<ViewStyle>
  dayLabelStyle: StyleProp<TextStyle>
  dayLabelSelectedStyle: StyleProp<TextStyle>
  dayLabelMutedStyle: StyleProp<TextStyle>
  dotStyle: StyleProp<ViewStyle>
  dotSelectedStyle: StyleProp<ViewStyle>
  yearPickerStyle: StyleProp<ViewStyle>
  yearStyle: StyleProp<ViewStyle>
  yearSelectedStyle: StyleProp<ViewStyle>
  yearLabelStyle: StyleProp<TextStyle>
  yearLabelSelectedStyle: StyleProp<TextStyle>
  monthPickerStyle: StyleProp<ViewStyle>
  monthStyle: StyleProp<ViewStyle>
  monthSelectedStyle: StyleProp<ViewStyle>
  monthLabelStyle: StyleProp<TextStyle>
  monthLabelSelectedStyle: StyleProp<TextStyle>
  /** What an `Icon` in a nav button inherits, so the chevrons match the header's type. */
  glyph: { size?: number; color?: string }
  /** The month on screen, at its first day. */
  month: Date
  /** The chosen day, or `undefined` while none is. */
  value: Date | undefined
  locale: string
  firstDayOfWeek: WeekDay
  isDisabled: boolean
  /** Which panel is on screen. `Calendar.YearPicker` / `.MonthPicker` step it. */
  view: CalendarView
  /** Sets the panel on screen. Takes the next value or an updater, like a `setState`. */
  setView: (next: CalendarView | ((current: CalendarView) => CalendarView)) => void
  /** Whether a day can be chosen at all — the bounds, and nothing else. */
  isDayEnabled: (date: Date) => boolean
  select: (date: Date) => void
  /** Moves the month on screen. `goToMonth(0)` is a no-op rather than a reset. */
  goToMonth: (step: number) => void
  /** Whether stepping that far would leave every day out of bounds. */
  canGoToMonth: (step: number) => boolean
  /** Lays the month on screen in `year`, keeping the month of the year it was showing. */
  goToYear: (year: number) => void
  /** Lays the month on screen on `monthIndex` (0–11), keeping the year. */
  goToMonthInYear: (monthIndex: number) => void
  /** The ends of the year list the picker shows. */
  yearRange: { first: number; last: number }
}
