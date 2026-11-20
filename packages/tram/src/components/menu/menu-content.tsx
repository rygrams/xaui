import {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import type { ReactNode } from 'react'
import { Modal, ScrollView, StyleSheet, View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import Animated from 'react-native-reanimated'
import { useMergedRef } from '@xaui/native'
import { useStyleProps } from '@xaui/native/system'
import { swivel } from '../../motion/motion-tokens'
import { cascadeRank } from '../../system/list-picker'
import { moveFocusTo } from '../../system/move-focus'
import { useCascade } from '../../system/use-cascade'
import { useSwivel } from '../../system/use-swivel'
import { useTramSafeArea } from '../../theme/tram-safe-area'
import { ToastOutlet } from '../../system/toast-outlet'
import { useMenu } from './menu.context'
import { hingeOf, menuPlace } from './menu.place'
import type { MenuContentProps } from './menu.type'

/**
 * The panel: the theme's contrast — white on dark, black on light — from one edge of the screen to the other, against
 * its trigger — under it, or over it when there is no room below. It swivels in on the
 * edge it shares with the trigger, and its children arrive in cascade as soon as it
 * reads as flat, each in the order written. Taller than the room on either side, it
 * takes the roomier one and scrolls.
 *
 * It is measured once before it is shown, at its full height, out of sight. It keeps
 * clear of the safe area handed to `TramProvider`.
 *
 * A `Modal` rather than the portal: it keeps the theme it was written under, covers the
 * navigation, and hears the system's back — which closes it unless `Menu.Overlay` said
 * `isDismissable={false}`. A screen reader stops at it, and the focus goes to it as it
 * opens.
 */
export const MenuContent = forwardRef<View, MenuContentProps>(function MenuContent(
  {
    children,
    placement = 'bottom',
    accessibilityViewIsModal = true,
    style,
    onLayout,
    ...props
  },
  ref
) {
  const { contentStyle, isOpen, isStill, anchor, isDismissable, close, backdrop } =
    useMenu()
  const [styleProps, rest] = useStyleProps(props)
  const dim = useSyncExternalStore(backdrop.subscribe, backdrop.get, backdrop.get)
  const insets = useTramSafeArea()
  const panel = useRef<View>(null)
  const refs = useMergedRef(panel, ref)
  const [screen, setScreen] = useState(0)
  const [natural, setNatural] = useState(0)

  const isAnchored = isOpen && anchor !== null
  const place =
    anchor !== null && screen > 0 && natural > 0
      ? menuPlace({
          anchor: anchor.rect,
          panel: natural,
          screen,
          insets,
          preferred: placement,
        })
      : null
  const isShown = isAnchored && place !== null
  const hinge = hingeOf(place?.side ?? placement)
  const { isMounted, style: turned } = useSwivel(isShown, isStill, hinge)

  // Measured again on the next opening: the rows may have changed in between.
  useEffect(() => {
    if (!isOpen && !isMounted) setNatural(0)
  }, [isOpen, isMounted])

  useEffect(() => {
    if (isMounted) moveFocusTo(panel.current)
  }, [isMounted])

  const back = useCallback(() => {
    if (isDismissable) close()
  }, [isDismissable, close])

  const handleScreen = (event: LayoutChangeEvent) => {
    setScreen(event.nativeEvent.layout.height)
  }

  // Only the measuring pass is the panel's own height; once placed it is the room's.
  const handleLayout = (event: LayoutChangeEvent) => {
    if (place === null) setNatural(event.nativeEvent.layout.height)
    onLayout?.(event)
  }

  if (!isMounted && !isAnchored) return null

  const placed =
    place === null
      ? panelAt.measuring
      : { top: place.top, maxHeight: place.maxHeight }

  return (
    <Modal
      visible
      transparent
      animationType="none"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={back}
    >
      <View style={panelAt.fill} onLayout={handleScreen}>
        {dim}
        <Animated.View
          ref={refs}
          role="menu"
          aria-modal
          accessibilityViewIsModal={accessibilityViewIsModal}
          onAccessibilityEscape={back}
          tabIndex={-1}
          {...rest}
          onLayout={handleLayout}
          // The turn comes last: it is the one transform the swivel owns.
          style={[contentStyle, placed, styleProps, style, turned]}
        >
          <ScrollView bounces={false} overScrollMode="never">
            {Children.toArray(children).map((child, index) => (
              <MenuArrival key={keyOf(child, index)} rank={index} isShown={isShown}>
                {child}
              </MenuArrival>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
      {/* A `Modal` covers the app's pile of toasts: while the menu is up, it is drawn
          here — over the ground, and over the panel. */}
      <ToastOutlet />
    </Modal>
  )
})

MenuContent.displayName = 'XAUI.Tram.Menu.Content'

function keyOf(child: ReactNode, index: number) {
  return isValidElement(child) && child.key !== null ? child.key : index
}

type MenuArrivalProps = { rank: number; isShown: boolean; children: ReactNode }

/**
 * One step of the panel's cascade: a child that arrives once the panel is flat — counted
 * from when it is shown, not from the measuring pass before.
 */
function MenuArrival({ rank, isShown, children }: MenuArrivalProps) {
  const { isStill } = useMenu()
  const arriving = useCascade({
    isOpen: isShown,
    rank: cascadeRank(rank, -1),
    after: swivel.flat,
    isStill,
    isStaying: true,
  })

  return <Animated.View style={arriving}>{children}</Animated.View>
}

const panelAt = StyleSheet.create({
  fill: { flex: 1 },
  // Out of sight, at its full height: what the placement is computed from.
  measuring: { top: 0, opacity: 0 },
})
