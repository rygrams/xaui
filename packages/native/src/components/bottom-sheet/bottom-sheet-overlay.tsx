import { forwardRef } from 'react'
import { Pressable } from 'react-native'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { overlayEntering, overlayExiting } from '../../system/anchored'
import { Portal } from '../../system/portal'
import { useStyleProps } from '../../system/style-props'
import { BottomSheetProvider, useBottomSheet } from './bottom-sheet.context'
import type { BottomSheetOverlayProps } from './bottom-sheet.type'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

/**
 * The backdrop.
 *
 * **It dims.** A sheet takes the screen over, and the page behind it is not available until
 * the sheet is gone — the dimming is what says so.
 *
 * `isDismissable={false}` for a sheet that has to be answered rather than escaped. The drag
 * is a separate refusal: `isSwipeable={false}` on the content.
 */
export const BottomSheetOverlay = forwardRef<View, BottomSheetOverlayProps>(
  function BottomSheetOverlay(
    { children, isDismissable = true, style, ...props },
    ref
  ) {
    // Re-provided below: our `Portal` copies this subtree into the host, which sits above
    // the root's provider, so anything inside it would be outside the context.
    const context = useBottomSheet()
    const { overlayStyle, isOpen, close } = context
    const [styleProps, rest] = useStyleProps(props)

    if (!isOpen) return null

    return (
      <Portal>
        <BottomSheetProvider value={context}>
          <AnimatedPressable
            ref={ref}
            entering={overlayEntering}
            exiting={overlayExiting}
            accessibilityRole="none"
            importantForAccessibility="no"
            onPress={isDismissable ? close : undefined}
            {...rest}
            style={[overlayStyle, styleProps, style]}
          >
            {children}
          </AnimatedPressable>
        </BottomSheetProvider>
      </Portal>
    )
  }
)

BottomSheetOverlay.displayName = 'XAUI.BottomSheet.Overlay'
