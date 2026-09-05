import { forwardRef } from 'react'
import { Pressable } from 'react-native'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { overlayEntering, overlayExiting } from '../../system/anchored'
import { Portal } from '../../system/portal'
import { useStyleProps } from '../../system/style-props'
import { MenuProvider, useMenu } from './menu.context'
import type { MenuOverlayProps } from './menu.type'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

/**
 * The backdrop, and what closes the panel on a press outside it.
 *
 * **Optional, and that is the point.** Written, it captures the press outside and dims
 * nothing unless a `backgroundColor` says so; omitted, the panel has no backdrop and a
 * `Menu.Close` or the caller's own state is what closes it.
 */
export const MenuOverlay = forwardRef<View, MenuOverlayProps>(function MenuOverlay(
  { children, isDismissable = true, style, ...props },
  ref
) {
  // Re-provided below: our `Portal` copies this subtree into the host, which sits above
  // the root's provider, so anything inside it would be outside the context.
  const context = useMenu()
  const { overlayStyle, isOpen, close } = context
  const [styleProps, rest] = useStyleProps(props)

  if (!isOpen) return null

  return (
    <Portal>
      <MenuProvider value={context}>
        <AnimatedPressable
          ref={ref}
          entering={overlayEntering}
          exiting={overlayExiting}
          // Not a button: it is the absence of the panel, and a screen reader announcing
          // "button" over the whole screen is worse than announcing nothing.
          accessibilityRole="none"
          importantForAccessibility="no"
          onPress={isDismissable ? close : undefined}
          {...rest}
          style={[overlayStyle, styleProps, style]}
        >
          {children}
        </AnimatedPressable>
      </MenuProvider>
    </Portal>
  )
})

MenuOverlay.displayName = 'XAUI.Menu.Overlay'
