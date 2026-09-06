import type { ReactNode } from 'react'
import type { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native'
import type { CalendarProps } from '../calendar'
import type { PressableFeedbackProps } from '../../system/pressable-feedback'
import type { DateRange, RangePosition } from '../../utils/date-range'

type RangeCalendarOwnProps = {
  /** The period chosen. Controlled — leave it out and the calendar holds its own. */
  value?: DateRange
  /** The period chosen at first mount. */
  defaultValue?: DateRange
  onValueChange?: (value: DateRange) => void
  children?: ReactNode
}

/**
 * The `Calendar`'s props, less the single-day pair it replaces.
 *
 * Everything else — `variant`, `size`, `radius`, `color`, `month`, `minValue`, `maxValue`,
 * `firstDayOfWeek`, `locale`, `isDisabled` — is the `Calendar`'s, because the calendar below
 * **is** one.
 */
export type RangeCalendarProps = RangeCalendarOwnProps &
  Omit<CalendarProps, 'value' | 'defaultValue' | 'onValueChange' | 'children'>

/** R14 — a day renders a `PressableFeedback`, so it carries that node's style keys. */
export type RangeCalendarDayProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'style' | 'children'
> & {
  /** The day this cell is. Everything else it reads off that. */
  date: Date
  children?: ReactNode
  /** R9 — `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
}

/** R5 — the band's resolved styles, and the range itself. */
export type RangeCalendarContextValue = {
  /** The band behind a day inside the range, and its two rounded ends. */
  bandStyle: StyleProp<ViewStyle>
  bandStartStyle: StyleProp<ViewStyle>
  bandEndStyle: StyleProp<ViewStyle>
  value: DateRange
  /** Where a day falls, which is the whole of what a cell needs. */
  positionOf: (date: Date) => RangePosition
  select: (date: Date) => void
}
