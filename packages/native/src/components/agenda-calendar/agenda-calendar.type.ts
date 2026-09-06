import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
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

/** The `Calendar`'s four, because the chosen day is the same day. */
export type AgendaCalendarVariant = CalendarVariant

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
  /** How many weeks one press moves. @default ±1 */
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
  glyph: { size?: number; color?: string }
  /** The seven days on screen. */
  days: Date[]
  value: Date | undefined
  locale: string
  isDisabled: boolean
  /** Whether that day carries a mark. */
  hasEvent: (date: Date) => boolean
  isDayEnabled: (date: Date) => boolean
  select: (date: Date) => void
  /** Moves the strip by whole weeks. */
  goByWeeks: (step: number) => void
  canGoByWeeks: (step: number) => boolean
  /** Brings today's week on screen. It does **not** choose today. */
  goToToday: () => void
  /** Whether today's week is already the one on screen. */
  isOnToday: boolean
}
