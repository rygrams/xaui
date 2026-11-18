import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useToastContext } from './toast.context'
import { useSpokenActions, useSpokenPart } from './toast.hook'
import type { ToastDescriptionProps } from './toast.type'

/**
 * The detail: the body role in the toast's ink, on what the title left of the line, and
 * cut at the end rather than wrapped — a toast is one line read at a glance.
 */
export const ToastDescription = forwardRef<Text, ToastDescriptionProps>(
  function ToastDescription({ children, style, ...props }, ref) {
    const { descriptionStyle } = useToastContext()
    const [styleProps, rest] = useStyleProps(props)
    const actions = useSpokenActions()
    useSpokenPart('description', children)

    return (
      <Text
        ref={ref}
        numberOfLines={1}
        ellipsizeMode="tail"
        {...actions}
        {...rest}
        style={[descriptionStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

ToastDescription.displayName = 'XAUI.Tram.Toast.Description'
