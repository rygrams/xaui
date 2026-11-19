import { forwardRef, useEffect } from 'react'
import { Text } from 'react-native'
import type { GestureResponderEvent } from 'react-native'
import { childrenToString, useStyleProps } from '@xaui/native/system'
import { useWheelField } from './wheel-field.context'
import type { WheelFieldTextProps } from './wheel-field.type'

/**
 * What the field is for, in the page's ink — an invalid picker leaves it alone. It
 * carries the id the trigger points at, a touch on it opens the page, and its text
 * titles the page — the Metro "choose date".
 */
export function makeLabel(name: string) {
  const Label = forwardRef<Text, WheelFieldTextProps>(function Label(
    { children, style, nativeID, onPress, ...props },
    ref
  ) {
    const { labelStyle, labelId, isDisabled, open, setTitle } = useWheelField()
    const [styleProps, rest] = useStyleProps(props)

    const text = childrenToString(children) ?? undefined
    useEffect(() => {
      setTitle(text)

      return () => setTitle(undefined)
    }, [text, setTitle])

    const handlePress = (event: GestureResponderEvent) => {
      open()
      onPress?.(event)
    }

    return (
      <Text
        ref={ref}
        nativeID={nativeID ?? labelId}
        style={[labelStyle, styleProps, style]}
        // A press opens the page and changes no colour, as everywhere in Tram.
        suppressHighlighting
        {...rest}
        // A disabled picker has nothing to open: the label is plain text again.
        onPress={isDisabled ? onPress : handlePress}
      >
        {children}
      </Text>
    )
  })

  Label.displayName = `XAUI.Tram.${name}.Label`

  return Label
}

/** The hint under the field, in the muted ink — invalid or not. The trigger reads it. */
export function makeDescription(name: string) {
  const Description = forwardRef<Text, WheelFieldTextProps>(function Description(
    { children, style, nativeID, ...props },
    ref
  ) {
    const { descriptionStyle, descriptionId } = useWheelField()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        nativeID={nativeID ?? descriptionId}
        style={[descriptionStyle, styleProps, style]}
        {...rest}
      >
        {children}
      </Text>
    )
  })

  Description.displayName = `XAUI.Tram.${name}.Description`

  return Description
}

/**
 * What is wrong with the chosen moment, under the field, in `danger` read as ink. It
 * renders what it is given — mounting it stays the caller's condition — and carries the
 * second id the trigger is described by.
 */
export function makeError(name: string) {
  const ErrorText = forwardRef<Text, WheelFieldTextProps>(function ErrorText(
    { children, style, nativeID, ...props },
    ref
  ) {
    const { errorStyle, errorId } = useWheelField()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        nativeID={nativeID ?? errorId}
        style={[errorStyle, styleProps, style]}
        {...rest}
      >
        {children}
      </Text>
    )
  })

  ErrorText.displayName = `XAUI.Tram.${name}.Error`

  return ErrorText
}
