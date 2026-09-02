import { describe, it, expect } from 'vitest'
import {
  to12HourFormat,
  to24HourFormat,
  formatTimeValue,
  getHourAngle,
  getMinuteAngle,
  angleToHour,
  angleToMinute,
  isTimeInRange,
  clampHour,
  clampMinute,
} from '../../../components/timepicker/timepicker.utils'
import type { TimeValue } from '../../../components/timepicker/timepicker.type'

describe('TimePicker Utils', () => {
  describe('to12HourFormat', () => {
    it('converts 0 hours to 12 AM', () => {
      const result = to12HourFormat(0)
      expect(result).toEqual({ hours: 12, period: 'AM' })
    })

    it('converts morning hours correctly', () => {
      const result = to12HourFormat(9)
      expect(result).toEqual({ hours: 9, period: 'AM' })
    })

    it('converts 12 to 12 PM', () => {
      const result = to12HourFormat(12)
      expect(result).toEqual({ hours: 12, period: 'PM' })
    })

    it('converts afternoon hours correctly', () => {
      const result = to12HourFormat(15)
      expect(result).toEqual({ hours: 3, period: 'PM' })
    })
  })

  describe('to24HourFormat', () => {
    it('converts 12 AM to 0', () => {
      const result = to24HourFormat(12, 'AM')
      expect(result).toBe(0)
    })

    it('converts AM hours correctly', () => {
      const result = to24HourFormat(9, 'AM')
      expect(result).toBe(9)
    })

    it('converts 12 PM to 12', () => {
      const result = to24HourFormat(12, 'PM')
      expect(result).toBe(12)
    })

    it('converts PM hours correctly', () => {
      const result = to24HourFormat(3, 'PM')
      expect(result).toBe(15)
    })
  })

  describe('formatTimeValue', () => {
    it('formats 24-hour time correctly', () => {
      const time: TimeValue = { hours: 14, minutes: 30 }
      const result = formatTimeValue(time, true)
      expect(result).toBe('14:30')
    })

    it('formats 12-hour time correctly', () => {
      const time: TimeValue = { hours: 14, minutes: 30 }
      const result = formatTimeValue(time, false)
      expect(result).toBe('02:30 PM')
    })

    it('pads single digits with zero', () => {
      const time: TimeValue = { hours: 9, minutes: 5 }
      const result = formatTimeValue(time, true)
      expect(result).toBe('09:05')
    })
  })

  describe('getHourAngle', () => {
    it('returns correct angle for 3 oclock', () => {
      const result = getHourAngle(3, false)
      expect(result).toBe(90)
    })

    it('returns correct angle for 6 oclock', () => {
      const result = getHourAngle(6, false)
      expect(result).toBe(180)
    })

    it('returns correct angle for 12 oclock', () => {
      const result = getHourAngle(12, false)
      expect(result).toBe(0)
    })
  })

  describe('getMinuteAngle', () => {
    it('returns correct angle for 15 minutes', () => {
      const result = getMinuteAngle(15)
      expect(result).toBe(90)
    })

    it('returns correct angle for 30 minutes', () => {
      const result = getMinuteAngle(30)
      expect(result).toBe(180)
    })

    it('returns correct angle for 0 minutes', () => {
      const result = getMinuteAngle(0)
      expect(result).toBe(0)
    })
  })

  describe('angleToHour', () => {
    it('converts 90 degrees to 3', () => {
      const result = angleToHour(90, false)
      expect(result).toBe(3)
    })

    it('converts 0 degrees to 12', () => {
      const result = angleToHour(0, false)
      expect(result).toBe(12)
    })
  })

  describe('angleToMinute', () => {
    it('converts 90 degrees to 15 minutes', () => {
      const result = angleToMinute(90)
      expect(result).toBe(15)
    })

    it('converts 180 degrees to 30 minutes', () => {
      const result = angleToMinute(180)
      expect(result).toBe(30)
    })
  })

  describe('isTimeInRange', () => {
    it('returns true when no range specified', () => {
      const time: TimeValue = { hours: 12, minutes: 30 }
      const result = isTimeInRange(time)
      expect(result).toBe(true)
    })

    it('returns true when time is within range', () => {
      const time: TimeValue = { hours: 12, minutes: 30 }
      const minTime: TimeValue = { hours: 10, minutes: 0 }
      const maxTime: TimeValue = { hours: 14, minutes: 0 }
      const result = isTimeInRange(time, minTime, maxTime)
      expect(result).toBe(true)
    })

    it('returns false when time is before min', () => {
      const time: TimeValue = { hours: 9, minutes: 30 }
      const minTime: TimeValue = { hours: 10, minutes: 0 }
      const result = isTimeInRange(time, minTime)
      expect(result).toBe(false)
    })

    it('returns false when time is after max', () => {
      const time: TimeValue = { hours: 15, minutes: 30 }
      const maxTime: TimeValue = { hours: 14, minutes: 0 }
      const result = isTimeInRange(time, undefined, maxTime)
      expect(result).toBe(false)
    })
  })

  describe('clampHour', () => {
    it('clamps hour to 0-23 for 24-hour format', () => {
      expect(clampHour(25, true)).toBe(23)
      expect(clampHour(-1, true)).toBe(0)
      expect(clampHour(12, true)).toBe(12)
    })

    it('clamps hour to 1-12 for 12-hour format', () => {
      expect(clampHour(13, false)).toBe(12)
      expect(clampHour(0, false)).toBe(1)
      expect(clampHour(6, false)).toBe(6)
    })
  })

  describe('clampMinute', () => {
    it('clamps minute to 0-59', () => {
      expect(clampMinute(60)).toBe(59)
      expect(clampMinute(-1)).toBe(0)
      expect(clampMinute(30)).toBe(30)
    })
  })
})
