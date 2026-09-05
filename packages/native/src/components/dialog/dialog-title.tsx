import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useDialog } from './dialog.context'
import type { DialogTitleProps } from './dialog.type'

/** The question. A `header` for a screen reader, so the dialog announces as one. */
export const DialogTitle = forwardRef<Text, DialogTitleProps>(function DialogTitle(
  { children, accessibilityRole = 'header', style, ...props },
  ref
) {
  const { titleStyle } = useDialog()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text
      ref={ref}
      accessibilityRole={accessibilityRole}
      {...rest}
      style={[titleStyle, styleProps, style]}
    >
      {children}
    </Text>
  )
})

DialogTitle.displayName = 'XAUI.Dialog.Title'
