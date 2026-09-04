import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useAlert } from './alert.context'
import type { AlertDescriptionProps } from './alert.type'

/**
 * The message itself — what it means and what to do about it.
 *
 * It sits behind the title on a fraction of the title's own colour rather than on the
 * `muted` token, which is what keeps it readable on a `danger` alert where the text is
 * white on red and a fixed grey would disappear.
 *
 * It is also what a string child of the alert becomes (R3): `<Alert>Le fichier est trop
 * lourd.</Alert>` is a sentence, not a heading.
 */
export const AlertDescription = forwardRef<Text, AlertDescriptionProps>(
  function AlertDescription({ children, style, ...props }, ref) {
    const { descriptionStyle } = useAlert()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} style={[descriptionStyle, styleProps, style]} {...rest}>
        {children}
      </Text>
    )
  }
)

AlertDescription.displayName = 'XAUI.Alert.Description'
