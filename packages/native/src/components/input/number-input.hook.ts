import { useCallback, useMemo, useState } from 'react'

type UseNumberInputStateParams = {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number | undefined) => void
  minValue?: number
  maxValue?: number
  step: number
  formatOptions?: Intl.NumberFormatOptions
  locale: string
}

export const useNumberInputState = ({
  value,
  defaultValue,
  onValueChange,
  minValue,
  maxValue,
  step,
  formatOptions,
  locale,
}: UseNumberInputStateParams) => {
  const isControlled = typeof value === 'number'
  const [internalValue, setInternalValue] = useState<number | undefined>(
    defaultValue
  )
  const [isEditing, setIsEditing] = useState(false)
  const [rawText, setRawText] = useState('')

  const currentValue = isControlled ? value : internalValue

  const formatter = useMemo(() => {
    if (!formatOptions) return null
    return new Intl.NumberFormat(locale, formatOptions)
  }, [formatOptions, locale])

  const displayValue = useMemo(() => {
    if (isEditing) return rawText
    if (currentValue === undefined) return ''
    if (formatter) return formatter.format(currentValue)
    return String(currentValue)
  }, [currentValue, formatter, isEditing, rawText])

  const updateValue = useCallback(
    (newValue: number | undefined) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    },
    [isControlled, onValueChange]
  )

  const clamp = useCallback(
    (num: number): number => {
      let clamped = num
      if (minValue !== undefined && clamped < minValue) clamped = minValue
      if (maxValue !== undefined && clamped > maxValue) clamped = maxValue
      return clamped
    },
    [minValue, maxValue]
  )

  const handleTextChange = useCallback(
    (text: string) => {
      setRawText(text)

      if (text === '' || text === '-') return

      const parsed = parseFloat(text)
      if (isNaN(parsed)) return

      updateValue(parsed)
    },
    [updateValue]
  )

  const handleFocus = useCallback(() => {
    setIsEditing(true)
    setRawText(currentValue !== undefined ? String(currentValue) : '')
  }, [currentValue])

  const handleBlur = useCallback(() => {
    setIsEditing(false)

    if (rawText === '' || rawText === '-') {
      updateValue(undefined)
      return
    }

    const parsed = parseFloat(rawText)
    if (isNaN(parsed)) {
      updateValue(undefined)
      return
    }

    updateValue(clamp(parsed))
  }, [rawText, clamp, updateValue])

  const handleClear = useCallback(() => {
    setRawText('')
    updateValue(undefined)
  }, [updateValue])

  const canIncrement = maxValue === undefined || (currentValue ?? 0) + step <= maxValue
  const canDecrement = minValue === undefined || (currentValue ?? 0) - step >= minValue

  const handleIncrement = useCallback(() => {
    const base = currentValue ?? 0
    const newValue = clamp(base + step)
    updateValue(newValue)
  }, [currentValue, step, clamp, updateValue])

  const handleDecrement = useCallback(() => {
    const base = currentValue ?? 0
    const newValue = clamp(base - step)
    updateValue(newValue)
  }, [currentValue, step, clamp, updateValue])

  return {
    displayValue,
    handleTextChange,
    handleFocus,
    handleBlur,
    handleClear,
    handleIncrement,
    handleDecrement,
    canIncrement,
    canDecrement,
  }
}
