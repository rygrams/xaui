import { forwardRef } from 'react'
import { Modal } from 'react-native'
import type { View, ViewProps } from 'react-native'
import Animated from 'react-native-reanimated'
import { ToastOutlet } from './toast-outlet'
import { useSwivel } from './use-swivel'

export type SwivelPageProps = ViewProps & {
  isOpen: boolean
  /** An ancestor asked for no animation at all: the page is there or it is not. */
  isStill: boolean
  /** The system's back, and a screen reader's escape gesture. */
  onBack: () => void
}

/**
 * A page that takes the screen and swivels in on its top edge — `useSwivel` — and out the
 * same way. A `Modal`, so it covers the navigation, keeps the theme it was written under,
 * and hears the system's back, which calls `onBack`. It mounts on opening and unmounts once
 * the way out has ended.
 *
 * `style` is the page's; the turn is laid after it, the one transform the swivel owns. A
 * `Modal` covers the app's pile of toasts, so while the page is up the pile is drawn here.
 *
 * The `Select`'s page, the `WheelField`'s and the `ColorPicker`'s are this one.
 */
export const SwivelPage = forwardRef<View, SwivelPageProps>(function SwivelPage(
  { isOpen, isStill, onBack, style, children, ...props },
  ref
) {
  const swivel = useSwivel(isOpen, isStill)

  if (!swivel.isMounted) return null

  return (
    <Modal
      visible
      transparent
      animationType="none"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onBack}
    >
      <Animated.View
        ref={ref}
        accessibilityViewIsModal
        onAccessibilityEscape={onBack}
        {...props}
        style={[style, swivel.style]}
      >
        {children}
      </Animated.View>
      <ToastOutlet />
    </Modal>
  )
})

SwivelPage.displayName = 'XAUI.Tram.SwivelPage'
