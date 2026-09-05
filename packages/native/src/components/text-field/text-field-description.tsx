import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTextField } from './text-field.context'
import type { TextFieldDescriptionProps } from './text-field.type'

/**
 * The hint under the field — the format expected, what the value is used for.
 *
 * It carries the id the field points at with `aria-describedby`, so it is read after the
 * label rather than skipped. It turns `danger` with `isInvalid`, like the label.
 *
 * It sits inset by half the field's padding, so the column reads as one block rather than
 * as a label, a box and a stray line.
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

TextFieldDescription.displayName = 'XAUI.TextField.Description'
