import { describe, it, expect } from 'vitest'
import {
  formatDate,
  getCalendarDays,
  getFirstDayOfWeek,
  getMonthName,
  getMonthNames,
  getWeekdayNames,
  getYearRange,
  isDateInRange,
  isSameDay,
  isToday,
} from '../../../components/datepicker/datepicker.utils'

describe('datepicker.utils', () => {
  describe('isSameDay', () => {
    it('returns true for same day', () => {
      const a = new Date(2024, 5, 15)
      const b = new Date(2024, 5, 15)
      expect(isSameDay(a, b)).toBe(true)
    })

    it('returns false for different days', () => {
      const a = new Date(2024, 5, 15)
      const b = new Date(2024, 5, 16)
      expect(isSameDay(a, b)).toBe(false)
    })

    it('returns false for different months', () => {
      const a = new Date(2024, 5, 15)
      const b = new Date(2024, 6, 15)
      expect(isSameDay(a, b)).toBe(false)
    })

    it('returns false for different years', () => {
      const a = new Date(2024, 5, 15)
      const b = new Date(2025, 5, 15)
      expect(isSameDay(a, b)).toBe(false)
    })
  })

  describe('isToday', () => {
    it('returns true for today', () => {
      expect(isToday(new Date())).toBe(true)
    })

    it('returns false for yesterday', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      expect(isToday(yesterday)).toBe(false)
    })
  })

  describe('isDateInRange', () => {
    it('returns true when no bounds', () => {
      expect(isDateInRange(new Date(2024, 5, 15))).toBe(true)
    })

    it('returns true when within range', () => {
      const min = new Date(2024, 0, 1)
      const max = new Date(2024, 11, 31)
      expect(isDateInRange(new Date(2024, 5, 15), min, max)).toBe(true)
    })

    it('returns false when before minDate', () => {
      const min = new Date(2024, 5, 1)
      expect(isDateInRange(new Date(2024, 4, 31), min)).toBe(false)
    })

    it('returns false when after maxDate', () => {
      const max = new Date(2024, 5, 30)
      expect(
        isDateInRange(new Date(2024, 6, 1), undefined, max)
      ).toBe(false)
    })
  })

  describe('getCalendarDays', () => {
    it('returns 42 days (6 weeks)', () => {
      const days = getCalendarDays(2024, 0, 0)
      expect(days).toHaveLength(42)
    })

    it('marks current month days correctly', () => {
      const days = getCalendarDays(2024, 0, 0)
      const currentMonthDays = days.filter(d => d.isCurrentMonth)
      expect(currentMonthDays).toHaveLength(31)
    })

    it('marks disabled days outside range', () => {
      const min = new Date(2024, 0, 10)
      const max = new Date(2024, 0, 20)
      const days = getCalendarDays(2024, 0, 0, min, max)
      const enabledDays = days.filter(d => !d.isDisabled && d.isCurrentMonth)
      expect(enabledDays).toHaveLength(11)
    })

    it('respects firstDayOfWeek = 1 (Monday)', () => {
      const days = getCalendarDays(2024, 0, 1)
      expect(days).toHaveLength(42)
    })
  })

  describe('getWeekdayNames', () => {
    it('returns 7 day names', () => {
      const names = getWeekdayNames('en', 0)
      expect(names).toHaveLength(7)
    })

    it('returns short names (max 2 chars)', () => {
      const names = getWeekdayNames('en', 0)
      names.forEach(name => {
        expect(name.length).toBeLessThanOrEqual(2)
      })
    })
  })

  describe('getMonthNames', () => {
    it('returns 12 month names', () => {
      const names = getMonthNames('en')
      expect(names).toHaveLength(12)
    })

    it('returns localized names for French', () => {
      const names = getMonthNames('fr')
      expect(names).toHaveLength(12)
      expect(names[0].toLowerCase()).toContain('janv')
    })
  })

  describe('getMonthName', () => {
    it('returns correct month name', () => {
      const name = getMonthName(0, 'en')
      expect(name.toLowerCase()).toContain('jan')
    })
  })

  describe('formatDate', () => {
    it('formats date in english locale', () => {
      const date = new Date(2024, 0, 15)
      const formatted = formatDate(date, 'en')
      expect(formatted).toContain('2024')
      expect(formatted).toContain('15')
    })

    it('formats date in french locale', () => {
      const date = new Date(2024, 0, 15)
      const formatted = formatDate(date, 'fr')
      expect(formatted).toContain('2024')
      expect(formatted).toContain('15')
    })
  })

  describe('getYearRange', () => {
    it('returns range around current year by default', () => {
      const years = getYearRange()
      const currentYear = new Date().getFullYear()
      expect(years).toContain(currentYear)
      expect(years.length).toBeGreaterThan(50)
    })

    it('respects minDate and maxDate bounds', () => {
      const min = new Date(2020, 0, 1)
      const max = new Date(2030, 0, 1)
      const years = getYearRange(min, max)
      expect(years[0]).toBe(2020)
      expect(years[years.length - 1]).toBe(2030)
      expect(years).toHaveLength(11)
    })
  })

  describe('getFirstDayOfWeek', () => {
    it('returns 0 (Sunday) for en locale', () => {
      expect(getFirstDayOfWeek('en')).toBe(0)
    })

    it('returns 1 (Monday) for fr locale', () => {
      expect(getFirstDayOfWeek('fr')).toBe(1)
    })

    it('returns 1 (Monday) for de locale', () => {
      expect(getFirstDayOfWeek('de')).toBe(1)
    })

    it('handles locale with region code', () => {
      expect(getFirstDayOfWeek('en-US')).toBe(0)
      expect(getFirstDayOfWeek('fr-FR')).toBe(1)
    })
  })
})
