import { forwardRef } from 'react'
import { Pressable } from 'react-native'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { overlayEntering, overlayExiting } from '../../system/anchored'
import { Portal } from '../../system/portal'
import { useStyleProps } from '../../system/style-props'
import { AutocompleteProvider, useAutocomplete } from './autocomplete.context'
import type { AutocompleteOverlayProps } from './autocomplete.type'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

/**
 * The backdrop, and what closes the panel when the choice is made elsewhere.
 *
 * Optional, like the `Select`'s: written, it captures the press outside; omitted, only a
 * choice closes the panel. It renders into the portal rather than where it is written, so
 * it covers navigation instead of being clipped by the screen the trigger sits in.
 */
export const AutocompleteOverlay = forwardRef<View, AutocompleteOverlayProps>(
  function AutocompleteOverlay({ children, style, ...props }, ref) {
    // Re-provided below because the portal copies this subtree into the host, which sits
    // above the root's provider.
    const context = useAutocomplete()
    const { overlayStyle, isOpen, close } = context
    const [styleProps, rest] = useStyleProps(props)

    if (!isOpen) return null

    return (
      <Portal>
        <AutocompleteProvider value={context}>
          <AnimatedPressable
            ref={ref}
            entering={overlayEntering}
            exiting={overlayExiting}
            // Not a button: it is the absence of the panel, and a screen reader announcing
            // "button" over the whole screen is worse than announcing nothing.
            accessibilityRole="none"
            importantForAccessibility="no"
            onPress={close}
            {...rest}
            style={[overlayStyle, styleProps, style]}
          >
            {children}
          </AnimatedPressable>
        </AutocompleteProvider>
      </Portal>
    )
  }
)

AutocompleteOverlay.displayName = 'XAUI.Autocomplete.Overlay'
