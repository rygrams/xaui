import { forwardRef } from 'react'
import { Text } from 'react-native'
import type { GestureResponderEvent } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useTextField } from './text-field.context'
import type { TextFieldLabelProps } from './text-field.type'

/**
 * What the field is for, in the page's ink — an invalid field leaves it alone. It carries
 * the id the field points at, and a touch on it gives the field the focus.
 *
 * The case is the app's: Tram draws what it is given.
 */
export const TextFieldLabel = forwardRef<Text, TextFieldLabelProps>(
  function TextFieldLabel({ children, style, nativeID, onPress, ...props }, ref) {
    const { labelStyle, labelId, fieldRef, isDisabled } = useTextField()
    const [styleProps, rest] = useStyleProps(props)

    const handlePress = (event: GestureResponderEvent) => {
      fieldRef.current?.focus()
      onPress?.(event)
    }

    return (
      <Text
        ref={ref}
        nativeID={nativeID ?? labelId}
        style={[labelStyle, styleProps, style]}
        // A press gives the focus and changes no colour, as everywhere in Tram.
        suppressHighlighting
        {...rest}
        // A disabled field has no focus to take: the label is plain text again.
        onPress={isDisabled ? onPress : handlePress}
      >
        {children}
      </Text>
    )
  }
)

TextFieldLabel.displayName = 'XAUI.Tram.TextField.Label'
