import { forwardRef, useCallback, useRef } from 'react'
import { Platform, StyleSheet, TextInput } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useTramMotion } from '../../motion/use-tram-motion'
import { useTextField } from './text-field.context'
import type {
  FieldBlurEvent,
  FieldFocusEvent,
  TextFieldFieldProps,
} from './text-field.type'

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

/**
 * The `TextInput` itself — the one node the user types into. It takes everything
 * `TextInput` takes: `value`, `defaultValue`, `keyboardType`, `secureTextEntry`,
 * `readOnly`… but not `editable`, which is `isDisabled` on the root. A read-only field
 * greys nothing and keeps its selection: its text can be copied, not changed.
 *
 * ```tsx
 * <TextField.Field value={email} onChangeText={setEmail} placeholder="nom@exemple.fr" />
 * ```
 *
 * The focus is the border and nothing else: the line goes from the page's ink to the
 * accent's and back, through `useTramMotion` — a spring, or a short fade when the user
 * reduced motion. It is kept here, as a shared value, so a focus re-renders nothing. A
 * `borderColor` written on the field replaces that line, focused or not.
 */
export const TextFieldField = forwardRef<TextInput, TextFieldFieldProps>(
  function TextFieldField(
    {
      style,
      onFocus,
      onBlur,
      onChange,
      onChangeText,
      placeholderTextColor,
      hitSlop,
      accessibilityState,
      readOnly = false,
      ...props
    },
    ref
  ) {
    const {
      fieldStyle,
      placeholderTextColor: resolvedPlaceholder,
      border,
      reach,
      fieldRef,
      labelId,
      descriptionId,
      errorId,
      isDisabled,
      isInvalid,
      isRequired,
      isStill,
    } = useTextField()
    const [styleProps, rest] = useStyleProps(props)
    const animate = useTramMotion()

    const focus = useSharedValue(0)

    const moveFocus = useCallback(
      (to: number) => {
        // Arrives and stops: a colour that bounces past its end has nowhere to go.
        focus.value = isStill ? to : animate(to, 'navigation')
      },
      [focus, isStill, animate]
    )

    // Composed, never replaced: a caller's handler runs, and the border still moves.
    const handleFocus = useCallback(
      (event: FieldFocusEvent) => {
        moveFocus(1)
        onFocus?.(event)
      },
      [moveFocus, onFocus]
    )

    const handleBlur = useCallback(
      (event: FieldBlurEvent) => {
        moveFocus(0)
        onBlur?.(event)
      },
      [moveFocus, onBlur]
    )

    // What was typed, kept for the day the field is held: nobody else has it when the
    // caller passes no `value`.
    const typed = useRef(rest.defaultValue ?? '')
    const handleChangeText = useCallback(
      (text: string) => {
        typed.current = text
        onChangeText?.(text)
      },
      [onChangeText]
    )

    const { rest: atRest, focus: focused } = border
    const line = useAnimatedStyle(() => {
      'worklet'
      return {
        borderColor: interpolateColor(focus.value, [0, 1], [atRest, focused]),
      }
    }, [focus, atRest, focused])

    // On a phone `readOnly` is `editable={false}`, which also takes the selection away. So
    // the field stays editable and its text is held instead: it takes the focus, its text
    // is selected and copied, and nothing typed stays. The web's `readonly` already is that.
    const isHeld = readOnly && Platform.OS !== 'web'
    const held = isHeld
      ? { value: rest.value ?? typed.current, showSoftInputOnFocus: false }
      : undefined

    // A `borderColor` the caller wrote is theirs in every state: an animated style
    // outranks a static one wherever it sits in the array, so the line steps aside.
    const isLineOverridden =
      StyleSheet.flatten([styleProps, style])?.borderColor !== undefined

    // One node, two holders: the caller's ref, and the root's — which is how a touch on
    // the label reaches the input.
    const setRef = useCallback(
      (node: TextInput | null) => {
        fieldRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      },
      [fieldRef, ref]
    )

    return (
      <AnimatedTextInput
        ref={setRef}
        // The label names the field; the description and the error explain it.
        aria-labelledby={labelId}
        aria-describedby={`${descriptionId} ${errorId}`}
        aria-invalid={isInvalid}
        // Left out rather than `false`: on the web the mere presence of `aria-required`
        // or `aria-readonly` makes the input required, or read-only.
        aria-required={isRequired || undefined}
        aria-disabled={isDisabled}
        editable={!isDisabled}
        // Merged, not spread over: a caller naming another state must not drop this one.
        accessibilityState={{ disabled: isDisabled, ...accessibilityState }}
        placeholderTextColor={placeholderTextColor ?? resolvedPlaceholder}
        // `sm` is drawn under the 48 touch target; the slop makes it up.
        hitSlop={hitSlop ?? reach}
        readOnly={readOnly && !isHeld}
        aria-readonly={readOnly || undefined}
        {...rest}
        {...held}
        // The moving line comes last: it is the one colour the focus owns.
        style={[fieldStyle, styleProps, style, isLineOverridden ? undefined : line]}
        // A held field reports no change: there is none.
        onChange={isHeld ? undefined : onChange}
        onChangeText={isHeld ? undefined : handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    )
  }
)

TextFieldField.displayName = 'XAUI.Tram.TextField.Field'
