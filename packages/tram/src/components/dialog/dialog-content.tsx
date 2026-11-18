import {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
} from 'react'
import type { ReactNode } from 'react'
import { Modal, Platform, StyleSheet } from 'react-native'
import type { LayoutChangeEvent, View } from 'react-native'
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { useMergedRef } from '@xaui/native'
import { useStyleProps } from '@xaui/native/system'
import { duration } from '../../motion/motion-tokens'
import { cascadeRank } from '../../system/list-picker'
import { useCascade } from '../../system/use-cascade'
import { useDialog } from './dialog.context'
import { moveFocusTo } from './dialog.focus'
import { useSwipeAway } from './dialog.hook'
import type { DialogContentProps } from './dialog.type'

/**
 * The banner: the discreet surface across the top of the screen, from one edge to the
 * other — no line, no shadow, no corner. It swivels in on its top edge, and its children
 * arrive in cascade once it is flat, each in the order written. A swipe sends it back up.
 *
 * A `Modal` rather than the portal: it keeps the theme it was written under, covers the
 * navigation, and hears the system's back — which closes it unless `Dialog.Overlay` said
 * `isDismissable={false}`. The pan is `react-native-gesture-handler`'s, an optional peer
 * imported here and in the dialog's hook.
 *
 * It reads no safe area: `paddingTop` is the app's inset. A screen reader stops at it,
 * is told its title and its description, and the focus goes to it as it opens.
 */
export const DialogContent = forwardRef<View, DialogContentProps>(
  function DialogContent(
    { children, accessibilityViewIsModal = true, style, onLayout, ...props },
    ref
  ) {
    const {
      contentStyle,
      motion,
      isDismissable,
      isStill,
      close,
      backdrop,
      titleId,
      descriptionId,
    } = useDialog()
    const [styleProps, rest] = useStyleProps(props)
    const dim = useSyncExternalStore(backdrop.subscribe, backdrop.get, backdrop.get)
    const banner = useRef<View>(null)
    const refs = useMergedRef(banner, ref)
    const swipe = useSwipeAway({ motion, isDismissable, isStill, close })
    const { isMounted } = motion

    useEffect(() => {
      if (isMounted) moveFocusTo(banner.current)
    }, [isMounted])

    const back = useCallback(() => {
      if (isDismissable) close()
    }, [isDismissable, close])

    const handleLayout = (event: LayoutChangeEvent) => {
      swipe.measure(event.nativeEvent.layout.height)
      onLayout?.(event)
    }

    if (!isMounted) return null

    return (
      <Modal
        visible
        transparent
        animationType="none"
        statusBarTranslucent
        navigationBarTranslucent
        onRequestClose={back}
      >
        {/* A `Modal` is a root of its own on Android: gestures need one inside it. */}
        <GestureHandlerRootView style={layer.fill}>
          {dim}
          <GestureDetector gesture={swipe.gesture}>
            <Animated.View
              ref={refs}
              // One that must be answered is an alert to a browser; a phone has no such role.
              role={
                isDismissable || Platform.OS !== 'web' ? 'dialog' : 'alertdialog'
              }
              aria-modal
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              accessibilityViewIsModal={accessibilityViewIsModal}
              onAccessibilityEscape={back}
              tabIndex={-1}
              {...rest}
              onLayout={handleLayout}
              // The turn comes last: it is the one transform the swivel owns.
              style={[contentStyle, styleProps, style, motion.turned]}
            >
              {Children.toArray(children).map((child, index) => (
                <DialogArrival key={keyOf(child, index)} rank={index}>
                  {child}
                </DialogArrival>
              ))}
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      </Modal>
    )
  }
)

DialogContent.displayName = 'XAUI.Tram.Dialog.Content'

function keyOf(child: ReactNode, index: number) {
  return isValidElement(child) && child.key !== null ? child.key : index
}

type DialogArrivalProps = { rank: number; children: ReactNode }

/** One step of the banner's cascade: a child that arrives after the swivel, in its turn. */
function DialogArrival({ rank, children }: DialogArrivalProps) {
  const { isOpen, isStill } = useDialog()
  const arriving = useCascade({
    isOpen,
    rank: cascadeRank(rank, -1),
    isKept: false,
    after: duration.swivel,
    isStill,
    isStaying: true,
  })

  return <Animated.View style={arriving}>{children}</Animated.View>
}

const layer = StyleSheet.create({ fill: { flex: 1 } })
