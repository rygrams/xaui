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
import { useMergedRef } from '../../hooks/use-merged-ref'
import { useStyleProps } from '../../system/style-props'
import { trackIndexFromOffset } from '../../system/carousel/carousel'
import { NO_TARGET, usePager } from './pager.context'
import type { PagerContentProps } from './pager.type'

/**
 * The track: the pages, and the swiping of them.
 *
 * **It pages.** `pagingEnabled` is React Native's own whole-viewport paging — the thing this
 * component is, and the thing the `Carousel` cannot use because its slides are a division of
 * the track rather than the whole of it.
 *
 * **It measures itself**, and that is why the measurement is here rather than on the root:
 * the indicator sits in the flow under the pages, so the root is taller than the box a page
 * has to fill by exactly the height of the dots.
 *
 * **It counts its own children**, which is how the dots know how many pages there are
 * without the caller passing a number that can go stale. The count is published upwards
 * because the indicator is the track's *sibling*, not its child.
 *
 * **It reports its offset on the UI thread**, and the settled index from the same handler.
 * Nothing re-renders while a finger is down except at the moment the nearest page changes,
 * which is once per page crossed — by a finger. **A programmatic scroll settles nothing it
 * crosses**: `goTo` has already moved the index to where the track is going, and reporting
 * each page on the way would walk the index back through them. It settles on arrival.
 *
 * **It places itself.** Once its pages are laid out it jumps to the index, which is how
 * `defaultIndex` reaches a scroll view that starts at zero.
 */
export const PagerContent = forwardRef<ScrollView, PagerContentProps>(
  function PagerContent(
    {
      children,
      style,
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
      orientation,
      step,
      track,
      setTrack,
      count,
      setCount,
      offset,
      glideTarget,
      trackRef,
      isDisabled,
      placeTrack,
      onSettle,
      onInteract,
    } = usePager()
    const [styleProps, rest] = useStyleProps(props)
    // The caller's ref and the root's animated one, both fed from the one callback (R9).
    const scroller = useMergedRef<ScrollView>(ref, trackRef)

    const given = Children.count(children)
    useEffect(() => {
      if (given !== count) setCount(given)
    }, [count, given, setCount])

    const handleLayout = (event: LayoutChangeEvent) => {
      onLayout?.(event)
      const { width, height } = event.nativeEvent.layout
      if (width !== track.width || height !== track.height)
        setTrack({ width, height })
    }

    // The pages are laid out — or re-measured: the track goes where the index says.
    const handleContentSizeChange = (
      contentWidth: number,
      contentHeight: number
    ) => {
      onContentSizeChange?.(contentWidth, contentHeight)
      placeTrack()
    }

    // Composed: the caller's runs, and a finger still takes over from a scroll in flight.
    const handleScrollBeginDrag = (
      event: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
      onScrollBeginDrag?.(event)
      onInteract()
    }

    // The worklet hands the caller the event's payload; `nativeEvent` is all a scroll event
    // carries that a handler reads, so it is rebuilt around it on this side.
    const forwardScroll = useCallback(
      (event: NativeScrollEvent) => {
        onScroll?.({ nativeEvent: event } as NativeSyntheticEvent<NativeScrollEvent>)
      },
      [onScroll]
    )
    const hasOwnScroll = onScroll !== undefined

    // What the last frame reported, so the crossing is detected on the UI thread and the hop
    // to JS happens once per page rather than sixty times a second.
    const settled = useSharedValue(0)
    const isHorizontal = orientation === 'horizontal'

    const scroll = useAnimatedScrollHandler(
      event => {
        'worklet'
        const travelled = isHorizontal
          ? event.contentOffset.x
          : event.contentOffset.y
        offset.set(travelled)
        if (hasOwnScroll) scheduleOnRN(forwardScroll, event)

        // A programmatic scroll in flight: the pages it crosses are not where the index is
        // going. Held until the track arrives there, then cleared.
        const target = glideTarget.get()
        if (target !== NO_TARGET) {
          settled.set(target)
          if (Math.abs(travelled - target * step) < 1) glideTarget.set(NO_TARGET)
          return
        }

        // The index changes as the track *crosses* the halfway point rather than when it
        // stops. `onMomentumScrollEnd` never fires for a wheel or a trackpad, so on the web
        // the index would never move at all — and it lands after the fact, so a "Next" button
        // would sit on the previous page for the length of the deceleration.
        const next = trackIndexFromOffset(travelled, step, count)
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
        count,
        onSettle,
        isHorizontal,
        hasOwnScroll,
        forwardScroll,
      ]
    )

    return (
      <Animated.ScrollView
        ref={scroller}
        horizontal={isHorizontal}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isDisabled}
        decelerationRate="fast"
        scrollEventThrottle={16}
        {...rest}
        style={[contentStyle, styleProps, style]}
        onLayout={handleLayout}
        onContentSizeChange={handleContentSizeChange}
        onScroll={scroll}
        onScrollBeginDrag={handleScrollBeginDrag}
      >
        {/* Nothing is drawn before the track has been measured: a page at zero size would
            flash at the start of the run, and every page would be at the same place. */}
        {step > 0 ? children : null}
      </Animated.ScrollView>
    )
  }
)

PagerContent.displayName = 'XAUI.Pager.Content'
