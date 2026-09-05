import { useCallback, useEffect, useMemo, useState } from 'react'
import type { LayoutChangeEvent } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { Portal } from '../../system/portal'
import { useStyleProps } from '../../system/style-props'
import {
  DISMISS_VELOCITY,
  SHEET_SPRING,
  THROW_PROJECTION,
} from './bottom-sheet.animation'
import { BottomSheetProvider, useBottomSheet } from './bottom-sheet.context'
import type { BottomSheetContentProps } from './bottom-sheet.type'
import { nextSheetState, sheetOffset } from './bottom-sheet.utils'

/**
 * The sheet itself.
 *
 * **It measures its own height, then slides that far.** A sheet is as tall as what is in
 * it, and nothing else on the screen knows that number — so the first layout is what tells
 * the animation how far "down" is. Until it has one the sheet sits off-screen at a
 * pessimistic distance rather than flashing at its resting place.
 *
 * The drag runs on `react-native-gesture-handler`, an **optional** peer of this package.
 * It is imported here and in the `Slider`, so an app that uses neither never pays for it.
 *
 * **Downward only, unless the sheet can be reduced.** A sheet at full height dragged up has
 * nowhere to go and letting it stretch there is a rubber-band nobody asked for; a reduced
 * one has the rest of itself up there, so the drag opens it.
 */
export function BottomSheetContent({
  children,
  isSwipeable = true,
  accessibilityViewIsModal = true,
  style,
  onLayout,
  ...props
}: BottomSheetContentProps) {
  const context = useBottomSheet()
  const {
    contentStyle,
    isOpen,
    dismissThreshold,
    collapsedHeight,
    isExpanded,
    close,
    expand,
    collapse,
  } = context
  const [styleProps, rest] = useStyleProps(props)
  const [height, setHeight] = useState(0)

  // Off-screen by a pessimistic distance until the first layout says how tall the sheet
  // actually is. A zero here would show the sheet at its resting place for one frame.
  const offset = useSharedValue(OFFSCREEN)

  const measure = useCallback(
    (event: LayoutChangeEvent) => {
      onLayout?.(event)
      setHeight(event.nativeEvent.layout.height)
    },
    [onLayout]
  )

  const geometry = useMemo(
    () => ({ height, collapsedHeight }),
    [height, collapsedHeight]
  )
  const resting = isOpen ? (isExpanded ? 'expanded' : 'collapsed') : 'closed'

  // One effect for both disclosures. Opening, closing, expanding and reducing are all the
  // same move to a different resting offset, so the state the sheet should be in is the
  // only thing this has to watch.
  useEffect(() => {
    if (height === 0) return
    offset.set(withSpring(sheetOffset(resting, geometry), SHEET_SPRING))
  }, [geometry, height, offset, resting])

  /**
   * Where the sheet goes when the finger lifts — decided **on the JS thread**, because
   * `nextSheetState` is a plain function and a worklet may only call another worklet. The
   * gesture hands over two numbers and nothing else; this is the same arrangement the
   * `Slider` has with its own arithmetic, and it keeps the rule testable without a
   * `'worklet'` directive that would have to survive the build.
   *
   * Two owners, one case each. A drag that changed the state sets it and lets the effect
   * above spring the sheet; a drag that did not has nothing to notify, so it puts the sheet
   * back itself.
   */
  const release = useCallback(
    (translationY: number, velocityY: number) => {
      const next = nextSheetState(
        {
          from: isExpanded ? 'expanded' : 'collapsed',
          translationY,
          velocityY,
          projection: THROW_PROJECTION,
          dismissThreshold,
          dismissVelocity: DISMISS_VELOCITY,
        },
        geometry
      )

      if (next === resting) {
        offset.set(withSpring(sheetOffset(resting, geometry), SHEET_SPRING))
        return
      }

      if (next === 'closed') return close()
      if (next === 'collapsed') return collapse()
      expand()
    },
    [
      close,
      collapse,
      dismissThreshold,
      expand,
      geometry,
      isExpanded,
      offset,
      resting,
    ]
  )

  const restingOffset = sheetOffset(resting, geometry)

  const pan = Gesture.Pan()
    .enabled(isSwipeable)
    .onUpdate(event => {
      // Never above the full height: a sheet at the top has nowhere to go, whether it got
      // there by opening or by being pulled open.
      offset.set(Math.max(restingOffset + event.translationY, 0))
    })
    .onEnd(event => {
      runOnJS(release)(event.translationY, event.velocityY)
    })

  const slide = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.get() }],
  }))

  if (!isOpen) return null

  return (
    <Portal>
      <BottomSheetProvider value={context}>
        <GestureDetector gesture={pan}>
          <Animated.View
            // A screen reader stops at the sheet rather than reading the page behind it,
            // which is the spoken half of what the backdrop says visually.
            accessibilityViewIsModal={accessibilityViewIsModal}
            onLayout={measure}
            {...rest}
            style={[contentStyle, slide, styleProps, style]}
          >
            {children}
          </Animated.View>
        </GestureDetector>
      </BottomSheetProvider>
    </Portal>
  )
}

/** Further than any sheet is tall, for the frame before the first layout. */
const OFFSCREEN = 2000

BottomSheetContent.displayName = 'XAUI.BottomSheet.Content'
