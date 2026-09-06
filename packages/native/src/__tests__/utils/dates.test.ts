import { describe, expect, it } from 'vitest'
import {
  addDays,
  addMonths,
  firstDayOfWeekFor,
  isSameDay,
  isSameMonth,
  isWithinBounds,
  monthGrid,
  monthLabel,
  monthNames,
  startOfDay,
  startOfWeek,
  weekGrid,
  weekdayNames,
} from '../../utils/dates'

describe('startOfDay', () => {
  it('drops the time', () => {
    const noon = new Date(2026, 8, 6, 12, 34, 56, 789)
    const start = startOfDay(noon)

    expect(start.getHours()).toBe(0)
    expect(start.getMinutes()).toBe(0)
    expect(start.getDate()).toBe(6)
  })
})

describe('isSameDay', () => {
  it('compares the square on the grid, not the instant', () => {
    expect(isSameDay(new Date(2026, 8, 6, 1), new Date(2026, 8, 6, 23))).toBe(true)
    expect(isSameDay(new Date(2026, 8, 6, 23), new Date(2026, 8, 7, 0))).toBe(false)
  })

  it('does not confuse the same day of two months or two years', () => {
    expect(isSameDay(new Date(2026, 8, 6), new Date(2026, 9, 6))).toBe(false)
    expect(isSameDay(new Date(2025, 8, 6), new Date(2026, 8, 6))).toBe(false)
  })
})

describe('isSameMonth', () => {
  it('ignores the day but not the year', () => {
    expect(isSameMonth(new Date(2026, 8, 1), new Date(2026, 8, 30))).toBe(true)
    expect(isSameMonth(new Date(2025, 8, 6), new Date(2026, 8, 6))).toBe(false)
  })
})

describe('addDays', () => {
  it('rolls over the end of a month', () => {
    expect(isSameDay(addDays(new Date(2026, 0, 31), 1), new Date(2026, 1, 1))).toBe(
      true
    )
  })

  it('goes backwards', () => {
    expect(
      isSameDay(addDays(new Date(2026, 0, 1), -1), new Date(2025, 11, 31))
    ).toBe(true)
  })
})

describe('addMonths', () => {
  it('clamps to the last day of the target month', () => {
    // The bug this exists for: `new Date(2026, 0, 31)` plus a month is the 3rd of March.
    expect(
      isSameDay(addMonths(new Date(2026, 0, 31), 1), new Date(2026, 1, 28))
    ).toBe(true)
  })

  it('keeps the day when the month is long enough', () => {
    expect(
      isSameDay(addMonths(new Date(2026, 0, 15), 1), new Date(2026, 1, 15))
    ).toBe(true)
  })

  it('crosses a year in either direction', () => {
    expect(
      isSameDay(addMonths(new Date(2026, 11, 1), 1), new Date(2027, 0, 1))
    ).toBe(true)
    expect(
      isSameDay(addMonths(new Date(2026, 0, 1), -1), new Date(2025, 11, 1))
    ).toBe(true)
  })

  it('lands on the 29th of a leap February', () => {
    expect(
      isSameDay(addMonths(new Date(2028, 0, 31), 1), new Date(2028, 1, 29))
    ).toBe(true)
  })
})

describe('startOfWeek', () => {
  it('goes back to Sunday by default', () => {
    // 6 September 2026 is a Sunday, so it is already the start of its own week.
    expect(isSameDay(startOfWeek(new Date(2026, 8, 9)), new Date(2026, 8, 6))).toBe(
      true
    )
  })

  it('goes back to Monday when the week starts there', () => {
    expect(
      isSameDay(startOfWeek(new Date(2026, 8, 9), 1), new Date(2026, 8, 7))
    ).toBe(true)
  })

  it('does not move a day that already starts its week', () => {
    expect(
      isSameDay(startOfWeek(new Date(2026, 8, 7), 1), new Date(2026, 8, 7))
    ).toBe(true)
  })
})

describe('isWithinBounds', () => {
  it('is unbounded with no bounds', () => {
    expect(isWithinBounds(new Date(2026, 8, 6))).toBe(true)
  })

  it('compares by day rather than by instant', () => {
    // A `max` written as `new Date()` carries a time, and an instant comparison would
    // refuse the rest of that same day.
    const max = new Date(2026, 8, 6, 9, 30)
    expect(isWithinBounds(new Date(2026, 8, 6, 23, 59), { max })).toBe(true)
    expect(isWithinBounds(new Date(2026, 8, 7), { max })).toBe(false)
  })

  it('takes either end alone', () => {
    const min = new Date(2026, 8, 6)
    expect(isWithinBounds(new Date(2026, 8, 5), { min })).toBe(false)
    expect(isWithinBounds(new Date(2026, 8, 6), { min })).toBe(true)
  })
})

describe('monthGrid', () => {
  it('is always forty-two days', () => {
    expect(monthGrid(new Date(2026, 1, 1)).length).toBe(42)
    expect(monthGrid(new Date(2026, 7, 1)).length).toBe(42)
  })

  it('starts on the first day of the week the month opens in', () => {
    // September 2026 opens on a Tuesday, so a Sunday-first grid starts on 30 August.
    const grid = monthGrid(new Date(2026, 8, 1))
    expect(isSameDay(grid[0], new Date(2026, 7, 30))).toBe(true)
    expect(grid[0].getDay()).toBe(0)
  })

  it('starts on Monday when the week does', () => {
    const grid = monthGrid(new Date(2026, 8, 1), 1)
    expect(grid[0].getDay()).toBe(1)
    expect(isSameDay(grid[0], new Date(2026, 7, 31))).toBe(true)
  })

  it('runs without a gap', () => {
    const grid = monthGrid(new Date(2026, 8, 1))
    for (let index = 1; index < grid.length; index += 1) {
      expect(isSameDay(grid[index], addDays(grid[index - 1], 1))).toBe(true)
    }
  })
})

describe('weekGrid', () => {
  it('is seven days from the start of the week', () => {
    const week = weekGrid(new Date(2026, 8, 9))
    expect(week.length).toBe(7)
    expect(isSameDay(week[0], new Date(2026, 8, 6))).toBe(true)
    expect(isSameDay(week[6], new Date(2026, 8, 12))).toBe(true)
  })
})

describe('weekdayNames', () => {
  it('is seven names starting on the right day', () => {
    const sunday = weekdayNames('en-US', 0)
    const monday = weekdayNames('en-US', 1)

    expect(sunday.length).toBe(7)
    expect(sunday[0]).toMatch(/^Sun/)
    expect(monday[0]).toMatch(/^Mon/)
  })

  it('takes the format it is given', () => {
    expect(weekdayNames('en-US', 0, 'narrow')[0]).toBe('S')
  })
})

describe('monthLabel', () => {
  it('names the month and the year', () => {
    expect(monthLabel(new Date(2026, 8, 6), 'en-US')).toMatch(/September.*2026/)
  })

  it('falls back to numbers when the locale is not one', () => {
    expect(monthLabel(new Date(2026, 8, 6), 'not a locale')).toBe('9/2026')
  })
})

describe('monthNames', () => {
  it('names all twelve months in order', () => {
    const names = monthNames('en-US')
    expect(names).toHaveLength(12)
    expect(names[0]).toBe('January')
    expect(names[11]).toBe('December')
  })

  it('follows the locale', () => {
    expect(monthNames('fr-FR')[8]).toBe('septembre')
  })

  it('shortens when asked', () => {
    expect(monthNames('en-US', 'short')[0]).toBe('Jan')
  })

  it('falls back to English names when the locale is not one', () => {
    expect(monthNames('not a locale')[8]).toBe('September')
  })
})

describe('firstDayOfWeekFor', () => {
  it('is Sunday in the United States and Monday in France', () => {
    expect(firstDayOfWeekFor('en-US')).toBe(0)
    expect(firstDayOfWeekFor('fr-FR')).toBe(1)
  })

  it('answers for a bare language tag', () => {
    expect(firstDayOfWeekFor('de')).toBe(1)
  })

  it('falls back rather than throwing on nonsense', () => {
    expect([0, 1]).toContain(firstDayOfWeekFor('not a locale'))
  })
})
