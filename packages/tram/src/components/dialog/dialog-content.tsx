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
import { Modal, Platform, StyleSheet, View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { useMergedRef } from '@xaui/native'
import { useStyleProps } from '@xaui/native/system'
import { swivel } from '../../motion/motion-tokens'
import { cascadeRank } from '../../system/list-picker'
import { useCascade } from '../../system/use-cascade'
import { useDialog } from './dialog.context'
import { moveFocusTo } from './dialog.focus'
import { useSwipeAway } from './dialog.hook'
import type { DialogContentProps } from './dialog.type'

/**
 * The banner: the discreet surface across the top of the screen, from one edge to the
 * other — no line, no shadow, no corner. It swivels in on its top edge, and its children
 * arrive in cascade as soon as it reads as flat, each in the order written. A swipe
 * sends it back up. Under `placement="bottom"` it is the same banner against the foot
 * of the screen, turning on its bottom edge and swiped back down.
 *
 * A `Modal` rather than the portal: it keeps the theme it was written under, covers the
 * navigation, and hears the system's back — which closes it unless `Dialog.Overlay` said
 * `isDismissable={false}`. The pan is `react-native-gesture-handler`'s, an optional peer
 * imported here and in the dialog's hook.
 *
 * It reads no safe area: `paddingTop` — `paddingBottom` at the bottom — is the app's
 * inset. A screen reader stops at it,
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
      placement,
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
    const swipe = useSwipeAway({ placement, motion, isDismissable, isStill, close })
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
          {/* A plane of its own: turned as a sibling of the dimmed ground, the banner
              sinks behind it for the length of the swivel and is dimmed with the page. */}
          <View
            style={placement === 'bottom' ? layer.foot : layer.plane}
            // Kept as a node: flattened away, it is no plane at all.
            collapsable={false}
          >
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
          </View>
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

/** One step of the banner's cascade: a child that arrives once the banner is flat. */
function DialogArrival({ rank, children }: DialogArrivalProps) {
  const { isOpen, isStill } = useDialog()
  const arriving = useCascade({
    isOpen,
    rank: cascadeRank(rank, -1),
    isKept: false,
    after: swivel.flat,
    isStill,
    isStaying: true,
  })

  return <Animated.View style={arriving}>{children}</Animated.View>
}

const layer = StyleSheet.create({
  fill: { flex: 1 },
  // Touches go through it to the ground: only the banner is there to be touched.
  plane: { ...StyleSheet.absoluteFillObject, pointerEvents: 'box-none' },
  foot: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'box-none',
    justifyContent: 'flex-end',
  },
})
