import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useTextField } from './text-field.context'
import type { TextFieldDescriptionProps } from './text-field.type'

/**
 * The hint under the field, in the muted ink — invalid or not. It carries an id the field
 * points at with `aria-describedby`, so it is read after the label.
 */
export const TextFieldDescription = forwardRef<Text, TextFieldDescriptionProps>(
  function TextFieldDescription({ children, style, nativeID, ...props }, ref) {
    const { descriptionStyle, descriptionId } = useTextField()
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
  }
)

TextFieldDescription.displayName = 'XAUI.Tram.TextField.Description'
