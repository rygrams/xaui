import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useButton } from './button.context'
import type { ButtonLabelProps } from './button.type'

/**
 * The text of a button, single-line by default: the height is fixed, so a long label
 * truncates rather than pushing the button out of shape.
 *
 * The case is the app's. Metro wrote its labels in lower case; Tram does not rewrite
 * what it is given.
 */
export const ButtonLabel = forwardRef<Text, ButtonLabelProps>(function ButtonLabel(
  { children, style, numberOfLines = 1, ...props },
  ref
) {
  const { labelStyle } = useButton()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text
      ref={ref}
      numberOfLines={numberOfLines}
      style={[labelStyle, styleProps, style]}
      {...rest}
    >
      {children}
    </Text>
  )
})

ButtonLabel.displayName = 'XAUI.Tram.Button.Label'
