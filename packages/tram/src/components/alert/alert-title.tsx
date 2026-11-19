import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useAlert } from './alert.context'
import type { AlertTitleProps } from './alert.type'

/** What it is about, on the Tram role the size chose. */
export const AlertTitle = forwardRef<Text, AlertTitleProps>(function AlertTitle(
  { children, style, ...props },
  ref
) {
  const { titleStyle } = useAlert()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text ref={ref} {...rest} style={[titleStyle, styleProps, style]}>
      {children}
    </Text>
  )
})

AlertTitle.displayName = 'XAUI.Tram.Alert.Title'
