import { Children, forwardRef, useCallback, useEffect } from 'react'
import type {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { useMergedRef } from '@xaui/native'
import { trackIndexFromOffset, useStyleProps } from '@xaui/native/system'
import { useCarousel } from './carousel.context'
import { NO_TARGET } from './carousel.utils'
import type { CarouselScrollSlotProps } from './carousel.type'

/**
 * The track: the slides, and the scrolling of them.
 *
 * It snaps — `snapToInterval` is one slide plus its gap and `decelerationRate="fast"` makes
 * the landing a page turn rather than a stop. It counts its own children, which is how the
 * squares, the counter and the arrows know how many slides there are. It reports its
 * offset on the UI thread, and the index from the same handler, as the track **crosses**
 * the halfway point — `onMomentumScrollEnd` never fires for a wheel and lands after the
 * fact. During a glide it settles on nothing it crosses: the index already says where it
 * is going.
 *
 * The caller's `onScroll`, `onScrollBeginDrag`, `onContentSizeChange` and
 * `contentContainerStyle` are composed with the track's own, never replaced.
 */
export const CarouselContent = forwardRef<ScrollView, CarouselScrollSlotProps>(
  function CarouselContent(
    {
      children,
      style,
      contentContainerStyle,
      onLayout,
      onScroll,
      onScrollBeginDrag,
      onContentSizeChange,
      ...props
    },
    ref
  ) {
    const {
      contentStyle,
      metrics,
      width,
      count,
      stops,
      setCount,
      offset,
      glideTarget,
      trackRef,
      isDisabled,
      placeTrack,
      onInteract,
      onSettle,
      setTrackHeight,
    } = useCarousel()
    const [styleProps, rest] = useStyleProps(props)
    // The caller's ref and the root's animated one, both fed from one callback (R9).
    const track = useMergedRef<ScrollView>(ref, trackRef)

    const given = Children.count(children)
    useEffect(() => {
      if (given !== count) setCount(given)
    }, [count, given, setCount])

    // The arrows are centred on the track, not on the root, which also holds the squares.
    const handleLayout = (event: LayoutChangeEvent) => {
      onLayout?.(event)
      setTrackHeight(event.nativeEvent.layout.height)
    }

    // The slides are laid out — or re-measured: the track goes where the index says.
    const handleContentSizeChange = (
      contentWidth: number,
      contentHeight: number
    ) => {
      onContentSizeChange?.(contentWidth, contentHeight)
      placeTrack()
    }

    const handleScrollBeginDrag = (
      event: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
      onScrollBeginDrag?.(event)
      onInteract()
    }

    // The worklet hands the caller the event's payload; `nativeEvent` is all a scroll
    // event carries that a handler reads, so it is rebuilt around it on this side.
    const forwardScroll = useCallback(
      (event: NativeScrollEvent) => {
        onScroll?.({ nativeEvent: event } as NativeSyntheticEvent<NativeScrollEvent>)
      },
      [onScroll]
    )
    const hasOwnScroll = onScroll !== undefined

    // What the last frame reported, so the hop to JS happens once per slide crossed.
    const settled = useSharedValue(0)

    const { step } = metrics
    const scroll = useAnimatedScrollHandler(
      event => {
        'worklet'
        offset.set(event.contentOffset.x)
        if (hasOwnScroll) scheduleOnRN(forwardScroll, event)

        // A glide in flight: the slides it crosses are not where the reader is going.
        const target = glideTarget.get()
        if (target !== NO_TARGET) {
          settled.set(target)
          return
        }

        const next = trackIndexFromOffset(event.contentOffset.x, step, stops)
        if (next !== settled.get()) {
          settled.set(next)
          scheduleOnRN(onSettle, next)
        }
      },
      [
        offset,
        glideTarget,
        settled,
        step,
        stops,
        onSettle,
        hasOwnScroll,
        forwardScroll,
      ]
    )

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
        // R13 — the inset is the same at both ends: one key, no side to get wrong in RTL.
        contentContainerStyle={[
          { gap: metrics.gap, paddingHorizontal: metrics.inset },
          contentContainerStyle,
        ]}
        style={[contentStyle, styleProps, style]}
        onLayout={handleLayout}
        onContentSizeChange={handleContentSizeChange}
        onScroll={scroll}
        onScrollBeginDrag={handleScrollBeginDrag}
      >
        {/* Nothing before the track is measured: a slide at zero width would flash, and
            every snap point would be at the same place. */}
        {width > 0 ? children : null}
      </Animated.ScrollView>
    )
  }
)

CarouselContent.displayName = 'XAUI.Tram.Carousel.Content'
