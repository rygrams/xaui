import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useDialog } from './dialog.context'
import type { DialogDescriptionProps } from './dialog.type'

/** What the question costs. It wraps — that is what it exists to carry. */
export const DialogDescription = forwardRef<Text, DialogDescriptionProps>(
  function DialogDescription({ children, style, ...props }, ref) {
    const { descriptionStyle } = useDialog()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[descriptionStyle, styleProps, style]}>
        {children}
      </Text>
    )
  }
)

DialogDescription.displayName = 'XAUI.Dialog.Description'
