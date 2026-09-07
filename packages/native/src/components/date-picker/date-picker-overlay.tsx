import { forwardRef } from 'react'
import { Pressable } from 'react-native'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { overlayEntering, overlayExiting } from '../../system/anchored'
import { Portal } from '../../system/portal'
import { useStyleProps } from '../../system/style-props'
import { DatePickerProvider, useDatePicker } from './date-picker.context'
import type { DatePickerOverlayProps } from './date-picker.type'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

/**
 * The backdrop, and what closes the month when the answer is given elsewhere.
 *
 * **Optional**, for the `Select`'s reason: a picker inside a sheet that already dims its own
 * background is the case that needs no second backdrop. It renders into the portal rather
 * than where it is written, so it covers navigation instead of being clipped by the screen
 * the trigger sits in.
 */
export const DatePickerOverlay = forwardRef<View, DatePickerOverlayProps>(
  function DatePickerOverlay(
    { children, isDismissable = true, style, ...props },
    ref
  ) {
    // Re-provided below for `Select.Overlay`'s reason: the portal copies this subtree into
    // the host, which sits above the root's provider.
    const context = useDatePicker()
    const { overlayStyle, isOpen, close } = context
    const [styleProps, rest] = useStyleProps(props)

    if (!isOpen) return null

    return (
      <Portal>
        <DatePickerProvider value={context}>
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
        </DatePickerProvider>
      </Portal>
    )
  }
)

DatePickerOverlay.displayName = 'XAUI.DatePicker.Overlay'
