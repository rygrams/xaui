import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useDialog } from './dialog.context'
import type { DialogDescriptionProps } from './dialog.type'

/**
 * What the question costs, in `body` and in the muted ink. It wraps — that is what it
 * exists to carry — and it is the id the banner is described by.
 */
export const DialogDescription = forwardRef<Text, DialogDescriptionProps>(
  function DialogDescription({ children, nativeID, style, ...props }, ref) {
    const { descriptionStyle, descriptionId } = useDialog()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        nativeID={nativeID ?? descriptionId}
        {...rest}
        style={[descriptionStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

DialogDescription.displayName = 'XAUI.Tram.Dialog.Description'
