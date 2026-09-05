import { forwardRef } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Portal } from '../../system/portal'
import { useStyleProps } from '../../system/style-props'
import { contentEntering, contentExiting } from './dialog.animation'
import { DialogProvider, useDialog } from './dialog.context'
import type { DialogContentProps } from './dialog.type'

/**
 * The panel, centred on the screen and inset from its edges.
 *
 * Two layers, and the outer one is not decoration: a centred box cannot also be the thing
 * that centres it. The panel fills the portal and does the centring; the content is the
 * box. The outer layer takes no touches, so a press that misses the panel reaches the
 * overlay under it and closes the dialog.
 */
export const DialogContent = forwardRef<View, DialogContentProps>(
  function DialogContent(
    { children, accessibilityViewIsModal = true, style, ...props },
    ref
  ) {
    const context = useDialog()
    const { panelStyle, contentStyle, isOpen } = context
    const [styleProps, rest] = useStyleProps(props)

    if (!isOpen) return null

    return (
      <Portal>
        <DialogProvider value={context}>
          <View pointerEvents="box-none" style={panelStyle}>
            <Animated.View
              ref={ref}
              entering={contentEntering}
              exiting={contentExiting}
              // A screen reader stops at the dialog rather than reading the page behind it,
              // which is the spoken half of what the backdrop says visually.
              accessibilityViewIsModal={accessibilityViewIsModal}
              accessibilityRole="alert"
              {...rest}
              style={[contentStyle, styleProps, style]}
            >
              {children}
            </Animated.View>
          </View>
        </DialogProvider>
      </Portal>
    )
  }
)

DialogContent.displayName = 'XAUI.Dialog.Content'
