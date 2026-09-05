import { forwardRef } from 'react'
import { Pressable } from 'react-native'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Portal } from '../../system/portal'
import { useStyleProps } from '../../system/style-props'
import { SelectProvider, useSelect } from './select.context'
import { overlayEntering, overlayExiting } from './select.animation'
import type { SelectOverlayProps } from './select.type'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

/**
 * The backdrop, and what closes the list when the choice is made elsewhere.
 *
 * **Optional, and that is the point.** Written, it captures the press outside and dims
 * nothing unless a `backgroundColor` says so; omitted, the list has no backdrop and only
 * a choice closes it. A select inside a sheet that already dims its own background is the
 * case that needs the second behaviour.
 *
 * It renders into the portal rather than where it is written, so it covers navigation
 * instead of being clipped by the screen the trigger happens to sit in.
 */
export const SelectOverlay = forwardRef<View, SelectOverlayProps>(
  function SelectOverlay({ children, isDismissable = true, style, ...props }, ref) {
    // Re-provided below for the same reason `Select.Content` does it: the portal copies
    // this subtree into the host, which sits above the root's provider.
    const context = useSelect()
    const { overlayStyle, isOpen, close } = context
    const [styleProps, rest] = useStyleProps(props)

    if (!isOpen) return null

    return (
      <Portal>
        <SelectProvider value={context}>
          <AnimatedPressable
            ref={ref}
            entering={overlayEntering}
            exiting={overlayExiting}
            // Not a button: it is the absence of the list, and a screen reader announcing
            // "button" over the whole screen is worse than announcing nothing.
            accessibilityRole="none"
            importantForAccessibility="no"
            onPress={isDismissable ? close : undefined}
            {...rest}
            style={[overlayStyle, styleProps, style]}
          >
            {children}
          </AnimatedPressable>
        </SelectProvider>
      </Portal>
    )
  }
)

SelectOverlay.displayName = 'XAUI.Select.Overlay'
