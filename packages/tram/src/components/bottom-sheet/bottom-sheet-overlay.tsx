import { forwardRef, useEffect, useLayoutEffect } from 'react'
import { Pressable } from 'react-native'
import type { View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useBottomSheet } from './bottom-sheet.context'
import { sheetShade } from './bottom-sheet.utils'
import type { BottomSheetOverlayProps } from './bottom-sheet.type'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

/**
 * The page's ground, dimmed — flat black at the theme's `backdrop` strength, no blur —
 * and what closes the sheet on a touch outside the band. It dims as the band rises, and
 * lightens at the pace of a finger sending it back down.
 *
 * `isDismissable={false}` for a band that must be answered: then neither this touch nor
 * the system's back closes it. The drag is refused separately, on the content.
 *
 * It is drawn inside the band's `Modal`, not where it is written: it hands its node to
 * `BottomSheet.Content`. Optional, as in Native: omitted, the page is not dimmed and a
 * touch outside closes nothing.
 */
export const BottomSheetOverlay = forwardRef<View, BottomSheetOverlayProps>(
  function BottomSheetOverlay({ isDismissable = true, ...props }, ref) {
    const { backdrop, setDismissable } = useBottomSheet()

    useEffect(() => {
      setDismissable(isDismissable)

      return () => setDismissable(true)
    }, [isDismissable, setDismissable])

    // Handed over on every render: publishing re-renders the band, never this slot.
    useLayoutEffect(() => {
      backdrop.set(<BottomSheetBackdrop ref={ref} {...props} />)
    })
    useLayoutEffect(() => () => backdrop.set(null), [backdrop])

    return null
  }
)

BottomSheetOverlay.displayName = 'XAUI.Tram.BottomSheet.Overlay'

type BottomSheetBackdropProps = Omit<BottomSheetOverlayProps, 'isDismissable'>

const BottomSheetBackdrop = forwardRef<View, BottomSheetBackdropProps>(
  function BottomSheetBackdrop({ children, style, ...props }, ref) {
    const { overlayStyle, motion, isDismissable, close } = useBottomSheet()
    const [styleProps, rest] = useStyleProps(props)
    const { offset, height, presence } = motion

    const dimmed = useAnimatedStyle(() => {
      'worklet'
      return {
        opacity: presence.value * sheetShade(offset.value, height.value),
      }
    }, [offset, height, presence])

    return (
      <AnimatedPressable
        ref={ref}
        // Not a button: it is the absence of the sheet, and a screen reader announcing
        // "button" over the whole screen is worse than announcing nothing.
        accessibilityRole="none"
        importantForAccessibility="no"
        tabIndex={-1}
        onPress={isDismissable ? close : undefined}
        {...rest}
        // The dimming comes last: it is the one opacity the sheet owns.
        style={[overlayStyle, styleProps, style, dimmed]}
      >
        {children}
      </AnimatedPressable>
    )
  }
)

BottomSheetBackdrop.displayName = 'XAUI.Tram.BottomSheet.Backdrop'
