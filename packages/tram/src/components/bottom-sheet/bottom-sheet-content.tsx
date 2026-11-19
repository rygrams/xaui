import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { useMergedRef } from '@xaui/native'
import { useStyleProps } from '@xaui/native/system'
import { ThemeContext, useXAUITheme } from '@xaui/native/theme'
import { swipe } from '../../motion/motion-tokens'
import { useTramMotion } from '../../motion/use-tram-motion'
import { themeInContrast } from '../../theme/theme-in-contrast'
import { moveFocusTo } from '../../system/move-focus'
import { useTramSafeArea } from '../../theme/tram-safe-area'
import { ToastOutlet } from '../toast/toast.outlet'
import { useBottomSheet } from './bottom-sheet.context'
import {
  THROW_PROJECTION,
  draggedOffset,
  nextSheetState,
  paddingUnderSeam,
  sheetOffset,
} from './bottom-sheet.utils'
import type { BottomSheetContentProps } from './bottom-sheet.type'

/** A drag has to be this much more vertical than not before it is the band's. */
const SLOP = 8

/**
 * The band: the theme's contrast from one edge of the screen to the other, against its
 * foot — no line, no shadow, no corner. It rises from below on the Metro curve, and a
 * drag sends it back down: past `dismissThreshold` of its height, or flung, it goes;
 * short of both it springs back. On a band that can be reduced the same drag stops at the
 * reduced height first, and a drag up restores it.
 *
 * **It measures its own height, then slides that far**: a band is as tall as what is in
 * it, and nothing else on the screen knows that number. Its bottom padding takes the safe
 * area handed to `TramProvider`, so the last line clears the home indicator.
 *
 * **What is put on it reads the other mode.** The band is that mode's page — white on the
 * dark theme is the light theme's ground — so its children are handed the light theme on
 * a dark app, and the dark one on a light app: a `NumberField` or an `outline` `Button`
 * on the band draws in the band's ink with nothing said. The sheet's own slots keep the
 * styles the root resolved. A theme `createTramTheme` did not build has no other mode to
 * find, and its children keep the page's.
 *
 * A `Modal` rather than the portal, as the `Dialog`'s banner: it keeps the theme it was
 * written under, covers the navigation, and hears the system's back — which closes it
 * unless `BottomSheet.Overlay` said `isDismissable={false}`. The pan is
 * `react-native-gesture-handler`'s, an optional peer. A screen reader stops at the band,
 * is told its title and description, and the focus goes to it as it opens.
 */
export const BottomSheetContent = forwardRef<View, BottomSheetContentProps>(
  function BottomSheetContent(
    {
      children,
      isSwipeable = true,
      accessibilityViewIsModal = true,
      style,
      onLayout,
      ...props
    },
    ref
  ) {
    const {
      contentStyle,
      motion,
      resting,
      isExpanded,
      isDismissable,
      dismissThreshold,
      collapsedHeight,
      backdrop,
      titleId,
      descriptionId,
      close,
      expand,
      collapse,
      setHeight,
      setPaddingBottom,
    } = useBottomSheet()
    const [styleProps, rest] = useStyleProps(props)
    const animate = useTramMotion()
    const contrast = themeInContrast(useXAUITheme())
    const insets = useTramSafeArea()
    const dim = useSyncExternalStore(backdrop.subscribe, backdrop.get, backdrop.get)
    // Where the band was when the finger took it: mid-way in, or at rest.
    const grabbed = useSharedValue(0)
    const band = useRef<View>(null)
    const refs = useMergedRef(band, ref)
    const { isMounted, offset, height } = motion

    // The padding the band ends with, the caller's own if they set one, plus the home
    // indicator. It is also what a reduced band keeps under a `Summary`'s seam.
    const paddingBottom = useMemo(
      () =>
        paddingUnderSeam(StyleSheet.flatten([contentStyle, styleProps, style])) +
        insets.bottom,
      [contentStyle, styleProps, style, insets.bottom]
    )

    useEffect(() => {
      setPaddingBottom(paddingBottom)
    }, [paddingBottom, setPaddingBottom])

    useEffect(() => {
      if (isMounted) moveFocusTo(band.current)
    }, [isMounted])

    const back = useCallback(() => {
      if (isDismissable) close()
    }, [isDismissable, close])

    const handleLayout = (event: LayoutChangeEvent) => {
      setHeight(event.nativeEvent.layout.height)
      onLayout?.(event)
    }

    /**
     * Where the band goes when the finger lifts — decided on the JS thread, because
     * `nextSheetState` is a plain function. The band sets off back to its resting place
     * first, so that a controlled sheet whose owner refuses the change is not left where
     * the finger let go; a change of state then takes the move over.
     */
    const release = useCallback(
      (translationY: number, velocityY: number) => {
        const measured = { height: height.value, collapsedHeight }
        const next = nextSheetState(
          {
            from: isExpanded ? 'expanded' : 'collapsed',
            translationY,
            velocityY,
            projection: THROW_PROJECTION,
            dismissThreshold,
            dismissVelocity: swipe.velocity,
          },
          measured
        )

        offset.value = animate(sheetOffset(resting, measured), 'navigation')

        if (next === resting) return
        if (next === 'closed') return close()
        if (next === 'collapsed') return collapse()
        expand()
      },
      [
        animate,
        close,
        collapse,
        collapsedHeight,
        dismissThreshold,
        expand,
        height,
        isExpanded,
        offset,
        resting,
      ]
    )

    const pan = useMemo(
      () =>
        Gesture.Pan()
          .enabled(isSwipeable)
          .activeOffsetY([-SLOP, SLOP])
          .failOffsetX([-SLOP * 2, SLOP * 2])
          .onStart(() => {
            'worklet'
            grabbed.value = offset.value
          })
          .onUpdate(event => {
            'worklet'
            offset.value = draggedOffset(
              grabbed.value,
              event.translationY,
              height.value
            )
          })
          .onEnd(event => {
            'worklet'
            scheduleOnRN(release, event.translationY, event.velocityY)
          }),
      [isSwipeable, offset, height, grabbed, release]
    )

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
          <View style={layer.foot} collapsable={false}>
            <GestureDetector gesture={pan}>
              <Animated.View
                ref={refs}
                role="dialog"
                aria-modal
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                accessibilityViewIsModal={accessibilityViewIsModal}
                onAccessibilityEscape={back}
                tabIndex={-1}
                {...rest}
                onLayout={handleLayout}
                // The slide comes last: it is the one transform the sheet owns.
                style={[
                  contentStyle,
                  styleProps,
                  style,
                  { paddingBottom },
                  motion.slid,
                ]}
              >
                {contrast ? (
                  <ThemeContext.Provider value={contrast}>
                    {children}
                  </ThemeContext.Provider>
                ) : (
                  children
                )}
              </Animated.View>
            </GestureDetector>
          </View>
        </GestureHandlerRootView>
        {/* A `Modal` covers the app's pile of toasts: while the band is up, it is drawn
            here — over the dimmed ground, and over the band. */}
        <ToastOutlet />
      </Modal>
    )
  }
)

BottomSheetContent.displayName = 'XAUI.Tram.BottomSheet.Content'

const layer = StyleSheet.create({
  fill: { flex: 1 },
  // Touches go through it to the ground: only the band is there to be touched.
  foot: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'box-none',
    justifyContent: 'flex-end',
  },
})
