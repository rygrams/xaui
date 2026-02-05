import { useCallback, useState } from 'react'
import type { CalendarViewMode } from './datepicker.type'

type UseDatePickerStateProps = {
  value?: Date | null
  defaultValue?: Date
  onChange?: (date: Date | null) => void
}

export const useDatePickerState = ({
  value,
  defaultValue,
  onChange,
}: UseDatePickerStateProps) => {
  const [internalValue, setInternalValue] = useState<Date | null>(
    defaultValue ?? null
  )
  const selectedDate = value !== undefined ? value : internalValue

  const updateDate = useCallback(
    (date: Date | null) => {
      if (value === undefined) {
        setInternalValue(date)
      }
      onChange?.(date)
    },
    [value, onChange]
  )

  return { selectedDate, updateDate }
}

type UseDatePickerOpenStateProps = {
  isDisabled: boolean
  onOpenChange?: (isOpen: boolean) => void
  onOpen?: () => void
  onClose?: () => void
}

export const useDatePickerOpenState = ({
  isDisabled,
  onOpenChange,
  onOpen,
  onClose,
}: UseDatePickerOpenStateProps) => {
  const [isOpen, setInternalOpen] = useState(false)

  const setOpen = useCallback(
    (open: boolean) => {
      if (isDisabled) return

      setInternalOpen(open)
      onOpenChange?.(open)

      if (open) {
        onOpen?.()
      } else {
        onClose?.()
      }
    },
    [isDisabled, onOpenChange, onOpen, onClose]
  )

  return { isOpen, setOpen }
}

export const useDatePickerViewState = (initialDate?: Date | null) => {
  const now = new Date()
  const [viewDate, setViewDate] = useState<Date>(initialDate ?? now)
  const [viewMode, setViewMode] = useState<CalendarViewMode>('calendar')

  const goToPreviousMonth = useCallback(() => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }, [])

  const goToNextMonth = useCallback(() => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }, [])

  const goToYear = useCallback((year: number) => {
    setViewDate(prev => new Date(year, prev.getMonth(), 1))
    setViewMode('month')
  }, [])

  const goToMonth = useCallback((month: number) => {
    setViewDate(prev => new Date(prev.getFullYear(), month, 1))
    setViewMode('calendar')
  }, [])

  const goToToday = useCallback(() => {
    setViewDate(new Date())
    setViewMode('calendar')
  }, [])

  const toggleYearPicker = useCallback(() => {
    setViewMode(prev => (prev === 'year' ? 'calendar' : 'year'))
  }, [])

  const syncViewToDate = useCallback((date: Date) => {
    setViewDate(date)
  }, [])

  return {
    viewDate,
    viewMode,
    goToPreviousMonth,
    goToNextMonth,
    goToYear,
    goToMonth,
    goToToday,
    toggleYearPicker,
    syncViewToDate,
  }
}
