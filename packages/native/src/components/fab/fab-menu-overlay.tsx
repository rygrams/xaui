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
 * **Optional, but it dims** — unlike a `Menu`'s or a `Select`'s, which leave the page alone
 * because the page is still the context for the answer they are asking for. A FAB floats
 * over everything and its actions replace the screen's one thing to do with three, which is
 * a `Dialog`'s situation and takes a `Dialog`'s backdrop. It is also what puts the pills on
 * a dimmed ground, where a white pill reads as white.
 *
 * Omitted, there is no backdrop and no press to close on — the caller's own state, or an
 * action, is what closes the menu. `backgroundColor="transparent"` keeps the press and
 * drops the dimming.
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
