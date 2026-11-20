import type { ReactNode } from 'react'
import type { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native'
import type { DateRange, RangePosition } from '@xaui/native'
import type { PressableFeedbackProps } from '@xaui/native/system'
import type { CalendarProps } from '../calendar'

type RangeCalendarOwnProps = {
  /** The period chosen. Controlled — leave it out and the calendar holds its own. */
  value?: DateRange
  defaultValue?: DateRange
  onValueChange?: (value: DateRange) => void
  children?: ReactNode
}

/** The Tram `Calendar`'s props, less the single-day pair it replaces. */
export type RangeCalendarProps = RangeCalendarOwnProps &
  Omit<CalendarProps, 'value' | 'defaultValue' | 'onValueChange' | 'children'>

export type RangeCalendarDayProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'style' | 'children'
> & {
  date: Date
  children?: ReactNode
  isDisabled?: boolean
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
}

export type RangeCalendarContextValue = {
  /** The soft slice behind a day inside the period. */
  bandStyle: StyleProp<ViewStyle>
  value: DateRange
  /** Where a day falls, which is the whole of what a cell needs. */
  positionOf: (date: Date) => RangePosition
  select: (date: Date) => void
}
