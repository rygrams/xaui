import { createSlotContext } from '../../system/slot'
import type { RangeCalendarContextValue } from './range-calendar.type'

/**
 * R10 — the band's styles and the range.
 *
 * It sits **beside** the `Calendar`'s context rather than replacing it: a day below reads its
 * shape, its type and its bounds from that one and its place in the range from this one,
 * which is what lets the calendar around it stay the component it already is.
 */
export const [RangeCalendarProvider, useRangeCalendar] =
  createSlotContext<RangeCalendarContextValue>('RangeCalendar')
