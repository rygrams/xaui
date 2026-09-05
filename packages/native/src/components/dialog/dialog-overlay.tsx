import { forwardRef } from 'react'
import { Pressable } from 'react-native'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { overlayEntering, overlayExiting } from '../../system/anchored'
import { Portal } from '../../system/portal'
import { useStyleProps } from '../../system/style-props'
import { DialogProvider, useDialog } from './dialog.context'
import type { DialogOverlayProps } from './dialog.type'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

/**
 * The backdrop, and what closes the dialog on a press outside it.
 *
 * **It dims**, where the `Popover`'s paints nothing. A popover is an aside you read the
 * page around; a dialog is a question, and the page behind it is not available until it is
 * answered — the dimming is what says so.
 *
 * `isDismissable={false}` for one that must be answered rather than escaped.
 */
export const DialogOverlay = forwardRef<View, DialogOverlayProps>(
  function DialogOverlay({ children, isDismissable = true, style, ...props }, ref) {
    // Re-provided below: our `Portal` copies this subtree into the host, which sits above
    // the root's provider, so anything inside it would be outside the context.
    const context = useDialog()
    const { overlayStyle, isOpen, close } = context
    const [styleProps, rest] = useStyleProps(props)

    if (!isOpen) return null

    return (
      <Portal>
        <DialogProvider value={context}>
          <AnimatedPressable
            ref={ref}
            entering={overlayEntering}
            exiting={overlayExiting}
            // Not a button: it is the absence of the dialog, and a screen reader announcing
            // "button" over the whole screen is worse than announcing nothing.
            accessibilityRole="none"
            importantForAccessibility="no"
            onPress={isDismissable ? close : undefined}
            {...rest}
            style={[overlayStyle, styleProps, style]}
          >
            {children}
          </AnimatedPressable>
        </DialogProvider>
      </Portal>
    )
  }
)

DialogOverlay.displayName = 'XAUI.Dialog.Overlay'
