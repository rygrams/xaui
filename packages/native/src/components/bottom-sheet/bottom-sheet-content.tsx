import { useCallback, useEffect, useState } from 'react'
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
import { DISMISS_VELOCITY, SHEET_SPRING } from './bottom-sheet.animation'
import { BottomSheetProvider, useBottomSheet } from './bottom-sheet.context'
import type { BottomSheetContentProps } from './bottom-sheet.type'

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
 * Downward only. A sheet dragged upward has nowhere to go — it is already against the
 * top of its own content — and letting it stretch there is a rubber-band nobody asked for.
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
  const { contentStyle, isOpen, dismissThreshold, close } = context
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

  useEffect(() => {
    if (height === 0) return
    offset.set(withSpring(isOpen ? 0 : height, SHEET_SPRING))
  }, [height, isOpen, offset])

  const pan = Gesture.Pan()
    .enabled(isSwipeable)
    .onUpdate(event => {
      // Downward only: a sheet dragged up has nowhere to go.
      offset.set(Math.max(event.translationY, 0))
    })
    .onEnd(event => {
      const farEnough = event.translationY > height * dismissThreshold
      // Or fast enough, whatever the distance: a quick flick from the top of a tall sheet
      // has not covered a third of it, however clearly it meant to throw the thing away.
      const fastEnough = event.velocityY > DISMISS_VELOCITY

      if (farEnough || fastEnough) {
        offset.set(withSpring(height, SHEET_SPRING))
        runOnJS(close)()
        return
      }

      offset.set(withSpring(0, SHEET_SPRING))
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
