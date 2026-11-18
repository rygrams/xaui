import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useToastContext } from './toast.context'
import { useSpokenActions, useSpokenPart } from './toast.hook'
import type { ToastTitleProps } from './toast.type'

/**
 * What happened, or who says so: the body role, heavier, in the toast's ink, on one line.
 * It is also where a screen reader finds the toast's "close" action.
 */
export const ToastTitle = forwardRef<Text, ToastTitleProps>(function ToastTitle(
  { children, style, ...props },
  ref
) {
  const { titleStyle } = useToastContext()
  const [styleProps, rest] = useStyleProps(props)
  const actions = useSpokenActions()
  useSpokenPart('title', children)

  return (
    <Text
      ref={ref}
      numberOfLines={1}
      {...actions}
      {...rest}
      style={[titleStyle, styleProps, style]}
    >
      {children}
    </Text>
  )
})

ToastTitle.displayName = 'XAUI.Tram.Toast.Title'
