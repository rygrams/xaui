import { describe, expect, it } from 'vitest'
import {
  firstOfMonth,
  pageDirection,
  weekdayInitials,
} from '../../../components/calendar/calendar.utils'

describe('firstOfMonth', () => {
  it('lands on the first day, at midnight', () => {
    expect(firstOfMonth(new Date(2026, 10, 20, 9, 41))).toEqual(
      new Date(2026, 10, 1)
    )
  })
})

describe('pageDirection', () => {
  it('is forward for a later month, back for an earlier one', () => {
    expect(pageDirection(new Date(2026, 10, 1), new Date(2026, 11, 1))).toBe(1)
    expect(pageDirection(new Date(2026, 10, 1), new Date(2026, 9, 1))).toBe(-1)
  })

  it('counts across a year, both ways', () => {
    expect(pageDirection(new Date(2026, 11, 1), new Date(2027, 0, 1))).toBe(1)
    expect(pageDirection(new Date(2027, 0, 1), new Date(2025, 11, 1))).toBe(-1)
  })

  it('is still for the same month, and on the first render', () => {
    expect(pageDirection(new Date(2026, 10, 1), new Date(2026, 10, 30))).toBe(0)
    expect(pageDirection(undefined, new Date(2026, 10, 1))).toBe(0)
  })
})

describe('weekdayInitials', () => {
  it('keeps two letters and drops the full stop', () => {
    expect(weekdayInitials('lun.')).toBe('lu')
    expect(weekdayInitials('Mon')).toBe('Mo')
    expect(weekdayInitials('di')).toBe('di')
  })
})
