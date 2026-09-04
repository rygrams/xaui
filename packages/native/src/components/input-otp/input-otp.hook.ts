import { useCallback, useMemo, useRef, useState } from 'react'
import type { RefObject } from 'react'
import type { TextInput } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import type { InputOTPHandle, InputOTPPattern } from './input-otp.type'
import { buildSlots, extractPastedCode, isPaste } from './input-otp.utils'
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
 * Everything the component knows that is not a style. It is a hook rather than lines in
 * the root because there is real logic here — a paste, a pattern and a completion — and
 * a root that also resolves a recipe and renders seven slots is where that logic goes to
 * hide.
 *
 * The state is deliberately *one string*. Six boxes holding six characters would need
 * six updates to stay in step with a paste, and the first bug in every OTP component is
 * the one where they do not.
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

  // A string pattern is compiled once rather than on every keystroke — and a `RegExp`
  // the caller built is used as it is, so a sticky or global flag stays theirs.
  const regexp = useMemo(() => {
    if (!pattern) return null
    return typeof pattern === 'string' ? new RegExp(pattern) : pattern
  }, [pattern])

  const slots = useMemo(
    () => buildSlots({ value, maxLength, isFocused, placeholder }),
    [value, maxLength, isFocused, placeholder]
  )

  // Read through a ref so the handler below keeps its identity: it is passed to the
  // hidden `TextInput` and to the imperative handle, and both would rebuild every render.
  const latest = useRef({ value, maxLength, regexp, onComplete, setValue })
  latest.current = { value, maxLength, regexp, onComplete, setValue }

  const onChangeText = useCallback((text: string) => {
    const current = latest.current
    // The platform reports a paste and a keystroke through the same event, so the length
    // jump is the only signal there is. `maxLength` is not set on the input either —
    // setting it would truncate a pasted message before we could look inside it.
    const candidate = isPaste(text, current.value)
      ? extractPastedCode(text, current.maxLength)
      : text
    const next = candidate.slice(0, current.maxLength)

    // The pattern guards the whole value, not the last character: a rule about the shape
    // of a code is a rule a single character cannot be judged against.
    if (next.length > 0 && current.regexp && !current.regexp.test(next)) return

    current.setValue(next)
    if (next.length === current.maxLength) current.onComplete?.(next)
  }, [])

  const onFocus = useCallback(() => setIsFocused(true), [])
  const onBlur = useCallback(() => setIsFocused(false), [])

  const handle = useMemo<InputOTPHandle>(
    () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      // Both halves: the native buffer and our value. Clearing one and not the other is
      // how a cleared field comes back on the next keystroke.
      clear: () => {
        inputRef.current?.clear()
        latest.current.setValue('')
      },
    }),
    []
  )

  return { value, slots, isFocused, inputRef, handle, onChangeText, onFocus, onBlur }
}
