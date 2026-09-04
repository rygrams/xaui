import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useAlert } from './alert.context'
import type { AlertTitleProps } from './alert.type'

/**
 * The heading — what happened, in a few words.
 *
 * It wraps, where `Button.Label` truncates: an alert has no fixed height to deform, and a
 * message the reader cannot finish is worse than a taller box. `numberOfLines` is still a
 * prop for a title that has to fit a row.
 */
export const AlertTitle = forwardRef<Text, AlertTitleProps>(function AlertTitle(
  { children, style, ...props },
  ref
) {
  const { titleStyle } = useAlert()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text ref={ref} style={[titleStyle, styleProps, style]} {...rest}>
      {children}
    </Text>
  )
})

AlertTitle.displayName = 'XAUI.Alert.Title'
