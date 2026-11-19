import { useCallback, useMemo, useRef, useState } from 'react'
import type { RefObject } from 'react'
import type { TextInput } from 'react-native'
import { useControllableState } from '@xaui/native'
import type { InputOTPHandle, InputOTPPattern } from './input-otp.type'
import { buildSlots, nextCode } from './input-otp.utils'
import type { OTPSlotState } from './input-otp.utils'

export type UseInputOTPArgs = {
  maxLength: number
  value?: string
  defaultValue?: string
  onChangeText?: (value: string) => void
  onComplete?: (value: string) => void
  pattern?: InputOTPPattern
  placeholder?: string
}

export type UseInputOTPResult = {
  value: string
  slots: readonly OTPSlotState[]
  isFocused: boolean
  inputRef: RefObject<TextInput | null>
  handle: InputOTPHandle
  onChangeText: (text: string) => void
  onFocus: () => void
  onBlur: () => void
}

/**
 * Everything the component knows that is not a style: one string for the whole code, the
 * boxes derived from it, the hidden input's handlers and its handle.
 *
 * One string, so a paste, a backspace and an autofilled code take the same path — six
 * boxes holding six characters would need six updates to stay in step.
 */
export function useInputOTPState({
  maxLength,
  value: valueProp,
  defaultValue = '',
  onChangeText: onChangeTextProp,
  onComplete,
  pattern,
  placeholder,
}: UseInputOTPArgs): UseInputOTPResult {
  const [value, setValue] = useControllableState<string>({
    value: valueProp,
    defaultValue,
    onChange: onChangeTextProp,
  })
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<TextInput | null>(null)

  // Compiled once, not per keystroke; a `RegExp` the caller built is used as it is.
  const regexp = useMemo(() => {
    if (!pattern) return null
    return typeof pattern === 'string' ? new RegExp(pattern) : pattern
  }, [pattern])

  const slots = useMemo(
    () => buildSlots({ value, maxLength, isFocused, placeholder }),
    [value, maxLength, isFocused, placeholder]
  )

  // Read through a ref so the handlers keep their identity across renders.
  const latest = useRef({ value, maxLength, regexp, onComplete, setValue })
  latest.current = { value, maxLength, regexp, onComplete, setValue }

  const onChangeText = useCallback((text: string) => {
    const current = latest.current
    const next = nextCode(text, current.value, current.maxLength, current.regexp)
    if (next === null) return

    current.setValue(next)
    if (next.length === current.maxLength) current.onComplete?.(next)
  }, [])

  const onFocus = useCallback(() => setIsFocused(true), [])
  const onBlur = useCallback(() => setIsFocused(false), [])

  const handle = useMemo<InputOTPHandle>(
    () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      // Both halves: the native buffer and the value, or a cleared code comes back.
      clear: () => {
        inputRef.current?.clear()
        latest.current.setValue('')
      },
    }),
    []
  )

  return { value, slots, isFocused, inputRef, handle, onChangeText, onFocus, onBlur }
}
