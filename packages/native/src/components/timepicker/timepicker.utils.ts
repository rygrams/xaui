import type { TimeValue, TimePeriod } from './timepicker.type'

/**
 * Convert 24-hour time to 12-hour format with period
 */
export const to12HourFormat = (hours: number): { hours: number; period: TimePeriod } => {
  if (hours === 0) {
    return { hours: 12, period: 'AM' }
  }

  if (hours < 12) {
    return { hours, period: 'AM' }
  }

  if (hours === 12) {
    return { hours: 12, period: 'PM' }
  }

  return { hours: hours - 12, period: 'PM' }
}

/**
 * Convert 12-hour time with period to 24-hour format
 */
export const to24HourFormat = (hours: number, period: TimePeriod): number => {
  if (period === 'AM') {
    return hours === 12 ? 0 : hours
  }

  return hours === 12 ? 12 : hours + 12
}

/**
 * Format time value to display string
 */
export const formatTimeValue = (time: TimeValue, is24Hour: boolean): string => {
  const { hours, minutes } = time

  if (is24Hour) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  const { hours: displayHours, period } = to12HourFormat(hours)
  return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`
}

/**
 * Calculate angle for hour hand on clock face
 */
export const getHourAngle = (hour: number, is24Hour: boolean): number => {
  const displayHour = is24Hour ? hour % 12 : hour
  return (displayHour * 30) % 360
}

/**
 * Calculate angle for minute hand on clock face
 */
export const getMinuteAngle = (minute: number): number => {
  return (minute * 6) % 360
}

/**
 * Convert angle to hour value
 */
export const angleToHour = (angle: number, _is24Hour: boolean): number => {
  const normalizedAngle = ((angle % 360) + 360) % 360
  const hour = Math.round(normalizedAngle / 30) % 12

  return hour === 0 ? 12 : hour
}

/**
 * Convert angle to minute value
 */
export const angleToMinute = (angle: number): number => {
  const normalizedAngle = ((angle % 360) + 360) % 360
  return Math.round(normalizedAngle / 6) % 60
}

/**
 * Calculate angle from touch position on clock face
 */
export const calculateAngleFromPosition = (
  centerX: number,
  centerY: number,
  touchX: number,
  touchY: number
): number => {
  const deltaX = touchX - centerX
  const deltaY = touchY - centerY
  const radians = Math.atan2(deltaY, deltaX)
  const degrees = (radians * 180) / Math.PI

  return (degrees + 90 + 360) % 360
}

/**
 * Validate if time is within min/max range
 */
export const isTimeInRange = (
  time: TimeValue,
  minTime?: TimeValue,
  maxTime?: TimeValue
): boolean => {
  if (!minTime && !maxTime) return true

  const timeInMinutes = time.hours * 60 + time.minutes

  if (minTime) {
    const minInMinutes = minTime.hours * 60 + minTime.minutes
    if (timeInMinutes < minInMinutes) return false
  }

  if (maxTime) {
    const maxInMinutes = maxTime.hours * 60 + maxTime.minutes
    if (timeInMinutes > maxInMinutes) return false
  }

  return true
}

/**
 * Get current time as TimeValue
 */
export const getCurrentTime = (): TimeValue => {
  const now = new Date()
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
  }
}

/**
 * Clamp hour value to valid range
 */
export const clampHour = (hour: number, is24Hour: boolean): number => {
  if (is24Hour) {
    return Math.max(0, Math.min(23, hour))
  }

  return Math.max(1, Math.min(12, hour))
}

/**
 * Clamp minute value to valid range
 */
export const clampMinute = (minute: number): number => {
  return Math.max(0, Math.min(59, minute))
}
