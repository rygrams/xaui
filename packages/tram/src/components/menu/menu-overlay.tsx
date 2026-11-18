import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react'
import {
  I18nManager,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useTramEase } from '../../motion/use-tram-ease'
import { useMenu } from './menu.context'
import { sideBands } from './menu.place'
import type { MenuRect } from './menu.place'
import type { MenuAnchor, MenuOverlayProps } from './menu.type'

/**
 * The page behind the menu: dimmed — flat black at the theme's `backdrop` strength, no
 * blur — everywhere but over the trigger, and stepped back when it is a `Page`. It dims
 * as the panel turns in and lightens on the exit curve; the page recedes and comes back
 * on the Metro curve. A touch anywhere outside the panel closes the menu.
 *
 * `isDismissable={false}` for a menu that must be answered: then neither a touch outside
 * nor the system's back closes it.
 *
 * It is drawn inside the panel's `Modal`, not where it is written: it hands its node to
 * `Menu.Content`. Optional, as in Native: omitted, nothing is dimmed, nothing recedes and
 * a touch outside closes nothing. With motion reduced the ground fades and the page stays
 * where it is.
 */
export const MenuOverlay = forwardRef<View, MenuOverlayProps>(function MenuOverlay(
  { isDismissable = true, ...props },
  ref
) {
  const { backdrop, setDismissable, isOpen, isStill, anchor, motion } = useMenu()
  const glide = useTramEase()
  const isReduced = useReducedMotion()
  const shade = useSharedValue(0)
  const { depth } = motion

  useEffect(() => {
    setDismissable(isDismissable)

    return () => setDismissable(true)
  }, [isDismissable, setDismissable])

  useEffect(() => {
    const isShown = isOpen && anchor !== null
    const to = isShown ? 1 : 0
    // The page recedes only when there is one, and never with motion reduced.
    const page = isReduced ? null : (anchor?.stage ?? null)

    if (isStill) {
      shade.value = to
      depth.value = page ? to : 0
      if (page) page.depth.value = to
      return
    }

    shade.value = isShown ? glide(1) : glide(0, 'exit')
    if (!page) return

    depth.value = glide(to)
    page.depth.value = glide(to)
  }, [isOpen, anchor, isStill, isReduced, glide, shade, depth])

  // A menu taken away while it is open — its row deleted — leaves no page stepped back.
  const last = useRef<MenuAnchor | null>(null)
  last.current = anchor
  useEffect(
    () => () => {
      const page = last.current?.stage
      if (page) page.depth.value = 0
    },
    []
  )

  // Handed over on every render: publishing re-renders the panel, never this slot.
  useLayoutEffect(() => {
    backdrop.set(<MenuBackdrop ref={ref} shade={shade} {...props} />)
  })
  useLayoutEffect(() => () => backdrop.set(null), [backdrop])

  return null
})

MenuOverlay.displayName = 'XAUI.Tram.Menu.Overlay'

type MenuBackdropProps = Omit<MenuOverlayProps, 'isDismissable'> & {
  shade: SharedValue<number>
}

const MenuBackdrop = forwardRef<View, MenuBackdropProps>(function MenuBackdrop(
  { children, shade, style, ...props },
  ref
) {
  const { overlayStyle, anchor, isDismissable, close } = useMenu()
  const [styleProps, rest] = useStyleProps(props)
  const { width } = useWindowDimensions()

  const dimmed = useAnimatedStyle(() => {
    'worklet'
    return { opacity: shade.value }
  }, [shade])

  const rect: MenuRect = anchor?.rect ?? NOWHERE
  const sides = sideBands(rect, width, I18nManager.isRTL)
  const band = [overlayStyle, styleProps, style]
  const below = rect.y + rect.height

  return (
    <View ref={ref} {...rest} style={layer.fill}>
      {/* Not a button: it is the absence of the menu, and a screen reader announcing
          "button" over the whole screen is worse than announcing nothing. Under the
          bands, so a touch over the trigger closes the menu too. */}
      <Pressable
        accessibilityRole="none"
        importantForAccessibility="no"
        tabIndex={-1}
        onPress={isDismissable ? close : undefined}
        style={layer.fill}
      />
      {/* The dimming comes last: it is the one opacity the menu owns. */}
      <Animated.View style={[layer.fill, layer.through, dimmed]}>
        <View style={[band, { top: 0, height: rect.y, start: 0, end: 0 }]} />
        <View style={[band, { top: below, bottom: 0, start: 0, end: 0 }]} />
        <View
          style={[
            band,
            { top: rect.y, height: rect.height, start: 0, width: sides.start },
          ]}
        />
        <View
          style={[
            band,
            { top: rect.y, height: rect.height, end: 0, width: sides.end },
          ]}
        />
      </Animated.View>
      {children}
    </View>
  )
})

MenuBackdrop.displayName = 'XAUI.Tram.Menu.Backdrop'

const NOWHERE: MenuRect = { x: 0, y: 0, width: 0, height: 0 }

const layer = StyleSheet.create({
  fill: { ...StyleSheet.absoluteFillObject },
  // The touch goes through the bands to what closes the menu.
  through: { pointerEvents: 'none' },
})
