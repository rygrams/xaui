import { forwardRef, useImperativeHandle, useMemo } from 'react'
import { TextInput, View } from 'react-native'
import { useAnimationDisabled, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { lineInk } from '../../system/line-ink'
import { InputOTPProvider } from './input-otp.context'
import { useInputOTPState } from './input-otp.hook'
import { DEFAULT_SIZE, DEFAULT_VARIANT, inputOTPRecipe } from './input-otp.recipe'
import { inputOTPSheet } from './input-otp.style'
import type { InputOTPHandle, InputOTPProps } from './input-otp.type'

/**
 * A one-time code, one character to a box — the Native `InputOTP`'s API, drawn as a row
 * of Tram fields one character wide: a faint line while a box is empty, the ink once it
 * holds a character, the accent on the box being typed in.
 *
 * ```tsx
 * <InputOTP maxLength={6} onComplete={verify}>
 *   <InputOTP.Group>
 *     {({ slots }) => slots.map(slot => <InputOTP.Box key={slot.index} index={slot.index} />)}
 *   </InputOTP.Group>
 * </InputOTP>
 * ```
 *
 * There is one input, and it is hidden: it covers the row, holds the whole code as one
 * string, and the boxes are a drawing of it. The `ref` is `focus`, `blur` and `clear`.
 */
export const InputOTPRoot = forwardRef<InputOTPHandle, InputOTPProps>(
  function InputOTP(
    {
      children,
      maxLength,
      variant = DEFAULT_VARIANT,
      size = DEFAULT_SIZE,
      radius,
      accent,
      color,
      value: valueProp,
      defaultValue,
      onChangeText,
      onComplete,
      pattern,
      placeholder,
      isInvalid = false,
      isDisabled = false,
      inputMode = 'numeric',
      textInputProps,
      style,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()
    const [styleProps, rest] = useStyleProps(props)
    const isStill = useAnimationDisabled()

    const state = useInputOTPState({
      maxLength,
      value: valueProp,
      defaultValue,
      onChangeText,
      onComplete,
      pattern,
      placeholder,
    })

    useImperativeHandle(ref, () => state.handle, [state.handle])

    const styles = inputOTPRecipe.resolve({
      theme,
      selection: {
        variant,
        size,
        radius,
        isInvalid: isInvalid ? ('true' as const) : undefined,
      },
      states: { disabled: isDisabled },
    })

    // The active line and the caret in a named accent, read as ink on the ground — or a
    // raw `color` as written. Dropped while invalid or disabled: neither has an accent.
    const ink =
      isInvalid || isDisabled
        ? undefined
        : lineInk({ accent, color }, theme.colors.background)

    // Three box styles, built once per resolution: each box picks one by reference.
    const context = useMemo(
      () => ({
        groupStyle: styles.group,
        boxStyle: styles.box,
        boxFilledStyle: [styles.box, styles.filled],
        boxActiveStyle: [
          styles.box,
          styles.active,
          ink ? { borderColor: ink } : null,
        ],
        valueStyle: styles.value,
        placeholderStyle: styles.placeholder,
        caretStyle: [styles.caret, ink ? { backgroundColor: ink } : null],
        separatorStyle: styles.separator,
        slots: state.slots,
        value: state.value,
        maxLength,
        isFocused: state.isFocused,
        isDisabled,
        isInvalid,
        isStill,
        inputRef: state.inputRef,
      }),
      [
        styles,
        ink,
        state.slots,
        state.value,
        state.isFocused,
        state.inputRef,
        maxLength,
        isDisabled,
        isInvalid,
        isStill,
      ]
    )

    return (
      <InputOTPProvider value={context}>
        <View style={[styles.root, styleProps, style]} {...rest}>
          {children}
          {/* Last, so it sits over the boxes and takes the touch anywhere on the row. */}
          <TextInput
            ref={state.inputRef}
            style={inputOTPSheet.hiddenInput}
            value={state.value}
            onChangeText={state.onChangeText}
            onFocus={state.onFocus}
            onBlur={state.onBlur}
            editable={!isDisabled}
            inputMode={inputMode}
            // Not `maxLength`: the platform would cut a pasted message before the code in
            // it could be found.
            caretHidden
            autoComplete="one-time-code"
            textContentType="oneTimeCode"
            accessibilityLabel={`${maxLength}-character code`}
            accessibilityState={{ disabled: isDisabled }}
            accessibilityValue={{
              text: `${state.value.length} of ${maxLength} entered`,
            }}
            {...textInputProps}
          />
        </View>
      </InputOTPProvider>
    )
  }
)

InputOTPRoot.displayName = 'XAUI.Tram.InputOTP.Root'
