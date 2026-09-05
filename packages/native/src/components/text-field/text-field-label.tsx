import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTextField } from './text-field.context'
import type { TextFieldLabelProps } from './text-field.type'

/**
 * What the field is for. It turns `danger` with `isInvalid`, so the field that is wrong is
 * findable on a long form without reading every message.
 *
 * It carries the id the field points at, which is what makes a screen reader announce
 * "Courriel, champ de saisie" instead of reading the placeholder and hoping.
 *
 * Its colour comes from the theme's `foreground` rather than the variant's: the label sits
 * outside the box, on the screen behind it, so a tinted field does not tint it.
 */
export const TextFieldLabel = forwardRef<Text, TextFieldLabelProps>(
  function TextFieldLabel({ children, style, nativeID, ...props }, ref) {
    const { labelStyle, labelId } = useTextField()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        nativeID={nativeID ?? labelId}
        style={[labelStyle, styleProps, style]}
        {...rest}
      >
        {children}
      </Text>
    )
  }
)

TextFieldLabel.displayName = 'XAUI.TextField.Label'
