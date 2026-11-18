import { forwardRef, useEffect, useLayoutEffect } from 'react'
import { Pressable } from 'react-native'
import type { View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useDialog } from './dialog.context'
import type { DialogOverlayProps } from './dialog.type'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

/**
 * The page's ground, dimmed — flat black at the theme's `backdrop` strength, no blur —
 * and what closes the dialog on a touch outside the banner. It dims as the banner turns
 * in, and lightens at the pace of a finger sending it back up.
 *
 * `isDismissable={false}` for a banner that must be answered: then neither this touch,
 * nor a swipe, nor the system's back closes it.
 *
 * It is drawn inside the banner's `Modal`, not where it is written: it hands its node to
 * `Dialog.Content`. Optional, as in Native: omitted, the page is not dimmed and a touch
 * outside closes nothing.
 */
export const DialogOverlay = forwardRef<View, DialogOverlayProps>(
  function DialogOverlay({ isDismissable = true, ...props }, ref) {
    const { backdrop, setDismissable } = useDialog()

    useEffect(() => {
      setDismissable(isDismissable)

      return () => setDismissable(true)
    }, [isDismissable, setDismissable])

    // Handed over on every render: publishing re-renders the banner, never this slot.
    useLayoutEffect(() => {
      backdrop.set(<DialogBackdrop ref={ref} {...props} />)
    })
    useLayoutEffect(() => () => backdrop.set(null), [backdrop])

    return null
  }
)

DialogOverlay.displayName = 'XAUI.Tram.Dialog.Overlay'

type DialogBackdropProps = Omit<DialogOverlayProps, 'isDismissable'>

const DialogBackdrop = forwardRef<View, DialogBackdropProps>(function DialogBackdrop(
  { children, style, ...props },
  ref
) {
  const { overlayStyle, motion, isDismissable, close } = useDialog()
  const [styleProps, rest] = useStyleProps(props)
  const { shade } = motion

  const dimmed = useAnimatedStyle(() => {
    'worklet'
    return { opacity: shade.value }
  }, [shade])

  return (
    <AnimatedPressable
      ref={ref}
      // Not a button: it is the absence of the dialog, and a screen reader announcing
      // "button" over the whole screen is worse than announcing nothing.
      accessibilityRole="none"
      importantForAccessibility="no"
      tabIndex={-1}
      onPress={isDismissable ? close : undefined}
      {...rest}
      // The dimming comes last: it is the one opacity the dialog owns.
      style={[overlayStyle, styleProps, style, dimmed]}
    >
      {children}
    </AnimatedPressable>
  )
})

DialogBackdrop.displayName = 'XAUI.Tram.Dialog.Backdrop'
