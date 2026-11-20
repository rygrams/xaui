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
import type { WeekDay } from '@xaui/native/system'
import type {
  PressableFeedbackProps,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type CalendarSlot =
  | 'root'
  | 'header'
  | 'title'
  | 'nav'
  | 'weekdays'
  | 'weekday'
  | 'grid'
  | 'day'
  | 'dayToday'
  | 'daySelected'
  | 'dayLabel'
  | 'dayLabelMuted'
  | 'dayLabelDisabled'
  | 'dayLabelSelected'
  | 'picker'
  | 'pick'
  | 'pickSelected'
  | 'pickLabel'
  | 'pickLabelSelected'

/** The days, the years to aim at, or the months of the year just aimed at. */
export type CalendarView = 'grid' | 'year' | 'month'

export type CalendarSize = TramSize

type CalendarOwnProps = {
  /** The cell's height — 36, 42, 48 — and the type in it. The grid spans its parent. */
  size?: CalendarSize
  /**
   * One of the twenty named accents, for the chosen day of a calendar that is not in the
   * theme's accent. `color` wins when both are set.
   */
  accent?: TramAccentName
  /** A raw tint for the chosen day. */
  color?: string
  /** The chosen day. Controlled — leave it out and the calendar holds its own. */
  value?: Date
  defaultValue?: Date
  /** Fired with the day that was pressed, at midnight local time. */
  onValueChange?: (value: Date) => void
  /** The month on screen — state of its own, separate from the chosen day. */
  month?: Date
  defaultMonth?: Date
  onMonthChange?: (month: Date) => void
  /** The earliest day that can be chosen. Days before it are grey and inert. */
  minValue?: Date
  maxValue?: Date
  /** Which day a week starts on. Read from `locale` when unset. */
  firstDayOfWeek?: WeekDay
  /** Names the months and the weekdays. @default the device's */
  locale?: string
  /** Which panel is on screen. The title and the pickers step it. */
  view?: CalendarView
  /** @default 'grid' */
  defaultView?: CalendarView
  onViewChange?: (view: CalendarView) => void
  /** Greys the calendar and stops every day. */
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/**
 * Its own props, `View`'s, and its `ViewStyle` keys. **No `variant` and no `radius`**: the
 * chosen day is the accent's flat square, and a Tram cell has no corner to round.
 */
export type CalendarProps = CalendarOwnProps &
  Omit<ViewProps, keyof CalendarOwnProps> &
  Omit<ViewStyleProps, keyof CalendarOwnProps | keyof ViewProps>

export type CalendarViewSlotProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

export type CalendarTextSlotProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

type CalendarNavButtonOwnProps = {
  /** Replaces the chevron. */
  children?: ReactNode
  /** How many months one press moves. Negative goes back. @default ±1 */
  step?: number
}

export type CalendarNavButtonProps = CalendarNavButtonOwnProps &
  Omit<PressableFeedbackProps, keyof CalendarNavButtonOwnProps | 'isPressed'>

type CalendarGridOwnProps = {
  /** A function renders each of the forty-two days; nothing renders the built-in day. */
  children?: ReactNode | ((date: Date) => ReactNode)
}

export type CalendarGridProps = CalendarGridOwnProps &
  Omit<ViewProps, keyof CalendarGridOwnProps> &
  Omit<ViewStyleProps, keyof CalendarGridOwnProps | keyof ViewProps>

export type CalendarYearPickerProps = {
  /** First year on the list. @default fifty back, or `minValue`'s year */
  firstYear?: number
  /** Last year on the list. @default fifty forward, or `maxValue`'s year */
  lastYear?: number
} & ScrollViewProps

export type CalendarMonthPickerProps = {
  /** `'long'` is "septembre", `'short'` "sept.". @default 'short' */
  format?: 'long' | 'short'
} & Omit<ViewProps, 'children'> &
  Omit<ViewStyleProps, keyof ViewProps>

type CalendarDayOwnProps = {
  /** Which day this cell is. Everything else about it is read off the calendar. */
  date: Date
  /** Replaces the number. */
  children?: ReactNode
  /** Stops this one day, whatever the bounds say. */
  isDisabled?: boolean
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
}

export type CalendarDayProps = CalendarDayOwnProps &
  Omit<PressableFeedbackProps, keyof CalendarDayOwnProps | 'isPressed'> &
  Omit<ViewStyleProps, keyof CalendarDayOwnProps>

/** Resolved styles, decided once on the root, and the moves no slot can make alone. */
export type CalendarContextValue = {
  headerStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  navStyle: StyleProp<ViewStyle>
  weekdaysStyle: StyleProp<ViewStyle>
  weekdayStyle: StyleProp<TextStyle>
  gridStyle: StyleProp<ViewStyle>
  dayStyle: StyleProp<ViewStyle>
  dayTodayStyle: StyleProp<ViewStyle>
  daySelectedStyle: StyleProp<ViewStyle>
  dayLabelStyle: StyleProp<TextStyle>
  dayLabelMutedStyle: StyleProp<TextStyle>
  dayLabelDisabledStyle: StyleProp<TextStyle>
  dayLabelSelectedStyle: StyleProp<TextStyle>
  pickerStyle: StyleProp<ViewStyle>
  pickStyle: StyleProp<ViewStyle>
  pickSelectedStyle: StyleProp<ViewStyle>
  pickLabelStyle: StyleProp<TextStyle>
  pickLabelSelectedStyle: StyleProp<TextStyle>
  /** What an `Icon` in a nav button takes: the chevron's size, live and dead. */
  glyph: { size: number; color: string | undefined; dead: string | undefined }
  /** The soft slice of the chosen day's colour: what a range draws between its ends. */
  band: string
  /** The month on screen, at its first day. */
  month: Date
  value: Date | undefined
  locale: string
  firstDayOfWeek: WeekDay
  isDisabled: boolean
  view: CalendarView
  setView: (next: CalendarView | ((current: CalendarView) => CalendarView)) => void
  /** Whether a day can be chosen at all — the bounds, and nothing else. */
  isDayEnabled: (date: Date) => boolean
  select: (date: Date) => void
  goToMonth: (step: number) => void
  canGoToMonth: (step: number) => boolean
  /** Whether any day of that year is within the bounds — the whole year, not one month of it. */
  isYearEnabled: (year: number) => boolean
  goToYear: (year: number) => void
  goToMonthInYear: (monthIndex: number) => void
  yearRange: { first: number; last: number }
}
