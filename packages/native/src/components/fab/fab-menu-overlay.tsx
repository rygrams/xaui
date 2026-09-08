import { forwardRef } from 'react'
import { Pressable } from 'react-native'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { overlayEntering, overlayExiting } from '../../system/anchored'
import { Portal } from '../../system/portal'
import { useStyleProps } from '../../system/style-props'
import { FabMenuProvider, useFabMenu } from './fab-menu.context'
import type { FabMenuOverlayProps } from './fab-menu.type'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

/**
 * The backdrop, and what closes the menu on a press outside it.
 *
 * **Optional, and it dims nothing unless told to.** Written, it captures the press outside;
 * a `backgroundColor` on it is what dims the page behind — which is the usual thing to want
 * here, because a FAB's actions float over content rather than out of a field.
 */
export const FabMenuOverlay = forwardRef<View, FabMenuOverlayProps>(
  function FabMenuOverlay({ children, isDismissable = true, style, ...props }, ref) {
    // Re-provided below: our `Portal` copies this subtree into the host, which sits above
    // the root's provider, so anything inside it would be outside the context.
    const context = useFabMenu()
    const { overlayStyle, isOpen, close } = context
    const [styleProps, rest] = useStyleProps(props)

    if (!isOpen) return null

    return (
      <Portal>
        <FabMenuProvider value={context}>
          <AnimatedPressable
            ref={ref}
            entering={overlayEntering}
            exiting={overlayExiting}
            // Not a button: it is the absence of the menu, and a screen reader announcing
            // "button" over the whole screen is worse than announcing nothing.
            accessibilityRole="none"
            importantForAccessibility="no"
            onPress={isDismissable ? close : undefined}
            {...rest}
            style={[overlayStyle, styleProps, style]}
          >
            {children}
          </AnimatedPressable>
        </FabMenuProvider>
      </Portal>
    )
  }
)

FabMenuOverlay.displayName = 'XAUI.Fab.Menu.Overlay'
