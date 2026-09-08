import { forwardRef } from 'react'
import { Pressable } from 'react-native'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { overlayEntering, overlayExiting } from '../../system/anchored'
import { Portal } from '../../system/portal'
import { useStyleProps } from '../../system/style-props'
import { FabDiscoveryProvider, useFabDiscovery } from './fab-discovery.context'
import type { FabDiscoveryOverlayProps } from './fab-discovery.type'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

/**
 * The dimmed page behind the disc, and what takes the mark down on a press anywhere else.
 *
 * A coach mark's backdrop is not optional in the way a `Menu`'s is — a mark with nothing
 * behind it is a coloured circle floating over a live screen — but the slot still is,
 * because a tour that drives its own dismissal from a "next" button wants no press outside
 * at all.
 */
export const FabDiscoveryOverlay = forwardRef<View, FabDiscoveryOverlayProps>(
  function FabDiscoveryOverlay(
    { children, isDismissable = true, style, ...props },
    ref
  ) {
    // Re-provided below: our `Portal` copies this subtree into the host, which sits above
    // the root's provider, so anything inside it would be outside the context.
    const context = useFabDiscovery()
    const { overlayStyle, isOpen, close } = context
    const [styleProps, rest] = useStyleProps(props)

    if (!isOpen) return null

    return (
      <Portal>
        <FabDiscoveryProvider value={context}>
          <AnimatedPressable
            ref={ref}
            entering={overlayEntering}
            exiting={overlayExiting}
            // Not a button: it is the absence of the mark, and a screen reader announcing
            // "button" over the whole screen is worse than announcing nothing.
            accessibilityRole="none"
            importantForAccessibility="no"
            onPress={isDismissable ? close : undefined}
            {...rest}
            style={[overlayStyle, styleProps, style]}
          >
            {children}
          </AnimatedPressable>
        </FabDiscoveryProvider>
      </Portal>
    )
  }
)

FabDiscoveryOverlay.displayName = 'XAUI.Fab.Discovery.Overlay'
