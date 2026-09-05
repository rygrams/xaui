import { forwardRef, useImperativeHandle, useMemo } from 'react'
import { TextInput, View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { InputOTPProvider } from './input-otp.context'
import { useInputOTPState } from './input-otp.hook'
import { inputOTPRecipe } from './input-otp.recipe'
import { inputOTPSheet } from './input-otp.style'
import type { InputOTPHandle, InputOTPProps } from './input-otp.type'

/**
 * A one-time code, one character to a box.
 *
 * ```tsx
 * <InputOTP maxLength={6} onComplete={verify}>
 *   <InputOTP.Group>
 *     {({ slots }) => slots.map(slot => <InputOTP.Box key={slot.index} index={slot.index} />)}
 *   </InputOTP.Group>
 * </InputOTP>
 * ```
 *
 * **There is one input, and it is hidden.** Six focusable boxes is the design every OTP
 * component starts with and every one of them abandons: the caret has to be moved by
 * hand, a backspace at the start of a box has to jump backwards, and a paste arrives in
 * one box out of six. Here a single `TextInput` covers the row, holds the whole code as
 * one string, and the boxes are a rendering of it — so a paste, a backspace and an
 * autofilled `one-time-code` all take the same path.
 *
 * The `ref` is not the view: it is `focus`, `blur` and `clear`, which are the three
 * things only the hidden input can do.
 */
export const InputOTPRoot = forwardRef<InputOTPHandle, InputOTPProps>(
  function InputOTP(
    {
      children,
      maxLength,
      variant,
      size,
      radius,
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

    const state = useInputOTPState({
      maxLength,
      value: valueProp,
      defaultValue,
      onChangeText,
      onComplete,
      pattern,
      placeholder,
    })

    // R9's shape, inverted on purpose: the useful handle here is not the view but the
    // three imperative actions, so that is what `ref` gets.
    useImperativeHandle(ref, () => state.handle, [state.handle])

    const selection = {
      variant,
      size,
      radius,
      isInvalid: isInvalid ? ('true' as const) : undefined,
    }
    const states = { disabled: isDisabled }

    // Twice, and both cached: exactly one box is active at a time, and a box that
    // resolved its own styles would run the recipe once per box on every keystroke (R5).
    // An invalid code takes no active ring — the danger border is already on every box,
    // and a seventh colour on one of them says nothing the red did not.
    const styles = inputOTPRecipe.resolve({ theme, selection, states })
    const activeStyles = isInvalid
      ? styles
      : inputOTPRecipe.resolve({
          theme,
          selection,
          states: { ...states, focused: true },
        })

    // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
    // letting one into the key would grow the table with the colours users invent.
    const tint = color
      ? inputOTPRecipe.tint({ theme, color, selection, states })
      : undefined
    const activeTint =
      color && !isInvalid
        ? inputOTPRecipe.tint({
            theme,
            color,
            selection,
            states: { ...states, focused: true },
          })
        : tint

    const context = useMemo(
      () => ({
        groupStyle: styles.group,
        boxStyle: tint ? [styles.box, tint.box] : styles.box,
        boxActiveStyle: activeTint
          ? [activeStyles.box, activeTint.box]
          : activeStyles.box,
        valueStyle: tint ? [styles.value, tint.value] : styles.value,
        placeholderStyle: styles.placeholder,
        caretStyle: styles.caret,
        separatorStyle: styles.separator,
        slots: state.slots,
        value: state.value,
        maxLength,
        isFocused: state.isFocused,
        isDisabled,
        isInvalid,
        inputRef: state.inputRef,
      }),
      [
        styles,
        activeStyles,
        tint,
        activeTint,
        state.slots,
        state.value,
        state.isFocused,
        state.inputRef,
        maxLength,
        isDisabled,
        isInvalid,
      ]
    )

    return (
      <InputOTPProvider value={context}>
        <View style={[styles.root, tint?.root, styleProps, style]} {...rest}>
          {children}
          {/* Last, so it sits *over* the boxes and takes the touch anywhere on the row —
              which is what opens the keyboard without a `Pressable` wrapping everything.
              It therefore swallows touches on the boxes too: a control that has to stay
              pressable goes beside the `InputOTP`, not inside it. */}
          <TextInput
            ref={state.inputRef}
            style={inputOTPSheet.hiddenInput}
            value={state.value}
            onChangeText={state.onChangeText}
            onFocus={state.onFocus}
            onBlur={state.onBlur}
            editable={!isDisabled}
            inputMode={inputMode}
            // Not `maxLength`: the platform would truncate a pasted message before
            // `extractPastedCode` could look inside it for the code.
            caretHidden
            // The suggestion strip above the keyboard, and the reason the input cannot be
            // hidden by size or display (see `input-otp.style.ts`).
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

InputOTPRoot.displayName = 'XAUI.InputOTP.Root'
