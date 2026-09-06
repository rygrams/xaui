import { Children, forwardRef, useEffect } from 'react'
import type { LayoutChangeEvent, ScrollView } from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'
import { useMergedRef } from '../../hooks/use-merged-ref'
import { useStyleProps } from '../../system/style-props'
import { indexFromOffset } from '../../utils/carousel'
import { useCarousel } from './carousel.context'
import type { CarouselViewSlotProps } from './carousel.type'

/**
 * The track: the slides, and the scrolling of them.
 *
 * **It snaps.** `snapToInterval` is one step — a slide plus its gap — so a flick lands on a
 * slide rather than between two, and `decelerationRate="fast"` is what makes that landing
 * feel like a page turn instead of a stop.
 *
 * **It counts its own children**, which is how the dots, the counter and the arrows know how
 * many slides there are without the caller passing a number that can go stale. The count is
 * published upwards rather than downwards because those three are the track's *siblings*,
 * not its children.
 *
 * **It reports its offset on the UI thread**, and the settled index from the same handler.
 * Nothing re-renders while a finger is down except at the moment the nearest slide changes,
 * which is once per slide crossed.
 */
export const CarouselContent = forwardRef<ScrollView, CarouselViewSlotProps>(
  function CarouselContent({ children, style, onLayout, ...props }, ref) {
    const {
      contentStyle,
      metrics,
      width,
      count,
      setCount,
      offset,
      trackRef,
      isDisabled,
      onInteract,
      onSettle,
      setTrackHeight,
    } = useCarousel()
    const [styleProps, rest] = useStyleProps(props)
    // The caller's ref and the root's animated one, both fed from the one callback (R9).
    const track = useMergedRef<ScrollView>(ref, trackRef)

    const given = Children.count(children)
    useEffect(() => {
      if (given !== count) setCount(given)
    }, [count, given, setCount])

    // The arrows are centred on the track, not on the root — the root also holds the dots,
    // and centring on it would put the arrows below the middle of the slides.
    const handleLayout = (event: LayoutChangeEvent) => {
      onLayout?.(event)
      setTrackHeight(event.nativeEvent.layout.height)
    }

    // What the last frame reported, so the crossing is detected on the UI thread and the
    // hop to JS happens once per slide rather than sixty times a second.
    const settled = useSharedValue(0)

    const { step } = metrics
    const scroll = useAnimatedScrollHandler(event => {
      offset.set(event.contentOffset.x)

      // The index changes as the track *crosses* the halfway point, not when it stops.
      //
      // `onMomentumScrollEnd` would be the obvious place and it is the wrong one twice: it
      // never fires for a wheel or a trackpad, so on the web the index would never move at
      // all; and it lands after the fact, so the arrows and the thumbnails would sit on the
      // previous slide for the length of the deceleration. `indexFromOffset` rounds, so the
      // crossing is the moment the nearest slide changes, which is what "which slide am I
      // on" means while a finger is still down.
      const next = indexFromOffset(event.contentOffset.x, step, count)
      if (next !== settled.get()) {
        settled.set(next)
        runOnJS(onSettle)(next)
      }
    })

    return (
      <Animated.ScrollView
        ref={track}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={!isDisabled}
        snapToInterval={metrics.step}
        decelerationRate="fast"
        disableIntervalMomentum
        scrollEventThrottle={16}
        {...rest}
        contentContainerStyle={[
          { gap: metrics.gap },
          // R13 — the inset is the same at both ends, so one key rather than two, and no
          // side to get the wrong way round in a right-to-left layout.
          { paddingHorizontal: metrics.inset },
        ]}
        style={[contentStyle, styleProps, style]}
        onLayout={handleLayout}
        onScroll={scroll}
        onScrollBeginDrag={onInteract}
      >
        {/* Nothing is drawn before the track has been measured: a slide at zero width would
            flash at the start of the row, and every snap point would be at the same place. */}
        {width > 0 ? children : null}
      </Animated.ScrollView>
    )
  }
)

CarouselContent.displayName = 'XAUI.Carousel.Content'
