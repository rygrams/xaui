import { useCallback, useMemo, useRef, useState } from 'react'
import { TextInput as RNTextInput } from 'react-native'
import type { TextInputSize } from './input.type'

type OTPSegmentSize = {
  width: number
  height: number
  fontSize: number
}

const segmentSizeMap: Record<TextInputSize, OTPSegmentSize> = {
  sm: { width: 40, height: 40, fontSize: 16 },
  md: { width: 48, height: 48, fontSize: 20 },
  lg: { width: 56, height: 56, fontSize: 24 },
}

export const useOTPSegmentSizeStyles = (size: TextInputSize) => {
  return useMemo(() => segmentSizeMap[size], [size])
}

type UseOTPInputStateParams = {
  length: number
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onComplete?: (value: string) => void
  allowedKeys: RegExp
}

export const useOTPInputState = ({
  length,
  value,
  defaultValue,
  onValueChange,
  onComplete,
  allowedKeys,
}: UseOTPInputStateParams) => {
  const isControlled = typeof value === 'string'
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const [activeIndex, setActiveIndex] = useState(-1)
  const refs = useRef<(RNTextInput | null)[]>([])

  const currentValue = isControlled ? value : internalValue
  const segments = useMemo(() => {
    const chars = currentValue.split('')
    return Array.from({ length }, (_, i) => chars[i] ?? '')
  }, [currentValue, length])

  const updateValue = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
      if (newValue.length === length) {
        onComplete?.(newValue)
      }
    },
    [isControlled, length, onValueChange, onComplete]
  )

  const handleSegmentChange = useCallback(
    (index: number, text: string) => {
      if (!text) return
      const char = text.slice(-1)
      if (!allowedKeys.test(char)) return

      const chars = currentValue.split('')
      while (chars.length < length) chars.push('')
      chars[index] = char
      const newValue = chars.join('').replace(/\s+$/, '')
      updateValue(newValue)

      if (index < length - 1) {
        refs.current[index + 1]?.focus()
      }
    },
    [allowedKeys, currentValue, length, updateValue]
  )

  const handleSegmentKeyPress = useCallback(
    (index: number, key: string) => {
      if (key !== 'Backspace') return

      const chars = currentValue.split('')
      while (chars.length < length) chars.push('')

      if (chars[index]) {
        chars[index] = ''
        updateValue(chars.join('').replace(/\s+$/, ''))
        return
      }

      if (index > 0) {
        chars[index - 1] = ''
        updateValue(chars.join('').replace(/\s+$/, ''))
        refs.current[index - 1]?.focus()
      }
    },
    [currentValue, length, updateValue]
  )

  const handleSegmentFocus = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const handleSegmentBlur = useCallback(() => {
    setActiveIndex(-1)
  }, [])

  return {
    segments,
    activeIndex,
    refs,
    handleSegmentChange,
    handleSegmentKeyPress,
    handleSegmentFocus,
    handleSegmentBlur,
  }
}
