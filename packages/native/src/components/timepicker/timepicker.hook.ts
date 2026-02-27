import { useMemo, useState } from 'react'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import type { TimePickerMode, TimePeriod, TimeValue } from './timepicker.type'
import { to12HourFormat, to24HourFormat, getCurrentTime } from './timepicker.utils'

export const useTimePickerState = (
  initialValue?: TimeValue,
  is24Hour: boolean = false,
  onChange?: (time: TimeValue) => void
) => {
  const [time, setTime] = useState<TimeValue>(initialValue || getCurrentTime())
  const [mode, setMode] = useState<TimePickerMode>('hour')

  const { hours: displayHours, period } = useMemo(
    () =>
      is24Hour
        ? { hours: time.hours, period: 'AM' as TimePeriod }
        : to12HourFormat(time.hours),
    [time.hours, is24Hour]
  )

  const handleHourChange = (hour: number) => {
    const newTime: TimeValue = {
      ...time,
      hours: hour,
    }
    setTime(newTime)
    onChange?.(newTime)
    setMode('minute')
  }

  const handleMinuteChange = (minute: number) => {
    const newTime: TimeValue = {
      ...time,
      minutes: minute,
    }
    setTime(newTime)
    onChange?.(newTime)
  }

  const handlePeriodToggle = (newPeriod: TimePeriod) => {
    if (is24Hour) return

    const newHours = to24HourFormat(displayHours, newPeriod)
    const newTime: TimeValue = {
      ...time,
      hours: newHours,
    }
    setTime(newTime)
    onChange?.(newTime)
  }

  const handleManualInput = (hours: number, minutes: number) => {
    const newTime: TimeValue = { hours, minutes }
    setTime(newTime)
    onChange?.(newTime)
  }

  const toggleMode = () => {
    setMode(prev => (prev === 'hour' ? 'minute' : 'hour'))
  }

  return {
    time,
    displayHours,
    period,
    mode,
    handleHourChange,
    handleMinuteChange,
    handlePeriodToggle,
    handleManualInput,
    toggleMode,
    setMode,
  }
}

export const useTimePickerColors = (themeColor: ThemeColor) => {
  const theme = useXUITheme()
  const colorScheme = theme.colors[getSafeThemeColor(themeColor)]

  return useMemo(() => {
    return {
      background: theme.colors.background,
      surface: withOpacity(colorScheme.main, 0.12),
      primary: colorScheme.main,
      onPrimary: colorScheme.onMain,
      text: theme.colors.foreground,
      textSecondary: withOpacity(theme.colors.foreground, 0.6),
      border: withOpacity(theme.colors.foreground, 0.12),
      clockFace: withOpacity(colorScheme.main, 0.08),
      selectedDigit: withOpacity(colorScheme.main, 0.12),
    }
  }, [
    colorScheme.main,
    colorScheme.onMain,
    theme.colors.background,
    theme.colors.foreground,
  ])
}
