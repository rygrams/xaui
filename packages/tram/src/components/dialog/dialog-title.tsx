import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useDialog } from './dialog.context'
import type { DialogTitleProps } from './dialog.type'

/**
 * The question, in `title` and in the page's ink. A `header` for a screen reader, and
 * the id the banner is labelled by.
 */
export const DialogTitle = forwardRef<Text, DialogTitleProps>(function DialogTitle(
  { children, accessibilityRole = 'header', nativeID, style, ...props },
  ref
) {
  const { titleStyle, titleId } = useDialog()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text
      ref={ref}
      nativeID={nativeID ?? titleId}
      accessibilityRole={accessibilityRole}
      {...rest}
      style={[titleStyle, styleProps, style]}
    >
      {children}
    </Text>
  )
})

DialogTitle.displayName = 'XAUI.Tram.Dialog.Title'
