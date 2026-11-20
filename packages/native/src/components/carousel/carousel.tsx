import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { StyleSheet, View } from 'react-native'
import type { LayoutChangeEvent, ViewStyle } from 'react-native'
import type { AnimatedRef } from 'react-native-reanimated'
import Animated, { useAnimatedRef, useSharedValue } from 'react-native-reanimated'
import { useControllableState } from '../../hooks/use-controllable-state'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import {
  carouselMetrics,
  carouselStops,
  stepIndex,
} from '../../system/carousel/carousel'
import { CarouselProvider, NO_TARGET } from './carousel.context'
import { carouselControlBox, carouselGap, carouselRecipe } from './carousel.recipe'
import type { CarouselProps } from './carousel.type'

/**
 * A series of slides, one or a few at a time, with the controls to move between them.
 *
 * ```tsx
 * <Carousel autoPlayInterval={2500}>
 *   <Carousel.Content>
 *     {photos.map(photo => (
 *       <Carousel.Item key={photo.id}>
 *         <Image source={photo.source} style={{ width: '100%', height: 200 }} />
 *       </Carousel.Item>
 *     ))}
 *   </Carousel.Content>
 *
 *   <Carousel.Previous />
 *   <Carousel.Next />
 *   <Carousel.Indicator />
 * </Carousel>
 * ```
 *
 * **The slides are yours and the controls are the library's.** `variant`, `color` and the
 * palette reach the arrows, the dots and the counter; nothing here paints what is inside a
 * `Carousel.Item`, because a carousel of photographs and a carousel of cards want opposite
 * things there and the caller is the one who knows which this is.
 *
 * **A slide's width comes from the track's, never from a prop.** `itemsPerView` and `peek`
 * say how it is divided and `carouselMetrics` divides it — a carousel whose slide width is
 * given in points is a carousel that is wrong on the next screen size.
 *
 * **Every control is optional and none of them is a prop.** An arrow, a row of dots, a
 * counter and a strip of thumbnails are four slots, so a carousel that wants dots and no
 * arrows leaves the arrows out rather than passing `showArrows={false}`.
 *
 * **`autoPlayInterval` stops at the first interaction and does not come back.** A carousel
 * that resumes moving under a reader who has taken hold of it is a carousel fighting them.
 */
/**
 * Put the track at `x` this frame, no animation of its own.
 *
 * The primitive the glide below is built from, and written out because there are two wrong
 * ones either side of it. Reanimated's own `scrollTo` worklet is a no-op under the web
 * renderer, so a carousel whose arrows are written that way does nothing on the web and
 * everything on a device. And `scrollTo` **needs its `y`**: React Native Web hands the
 * object straight to the DOM's own `scrollTo`, where a missing `top` means "stay where you
 * are" — and a horizontal scroll with no vertical component is exactly the call that looks
 * like it should be fine.
 *
 * The ref is `useAnimatedRef`'s, which is what reaches the scroller's own methods; the ref
 * `Animated.ScrollView` hands a plain `useRef` is the wrapper Reanimated built around it.
 */
function setTrackOffset(track: AnimatedRef<Animated.ScrollView>, x: number): void {
  track.current?.scrollTo({ x, y: 0, animated: false })
}

/** How long an arrow, a dot or an autoplay tick takes to travel one step, and the frame it
 *  is stepped on — 16ms is one display frame at 60Hz. */
const GLIDE_MS = 420
const GLIDE_FRAME_MS = 16

/**
 * Off fast, braking into the settle.
 *
 * The native `scrollTo({ animated: true })` and the DOM's smooth scroll are close to
 * linear — the track leaves and arrives at the same speed, and the move reads as a jump
 * cut rather than a page turn. An ease-*out* is what makes a press feel answered: the
 * track jumps after the finger and eases down onto the next slide.
 */
function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

export const CarouselRoot = forwardRef<View, CarouselProps>(function Carousel(
  {
    children,
    variant,
    size = 'md',
    color,
    radius,
    index: indexProp,
    defaultIndex = 0,
    onIndexChange,
    itemsPerView = 1,
    peek = 0,
    gap,
    hasLoop = false,
    autoPlayInterval,
    isDisabled = false,
    asChild = false,
    style,
    onLayout,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const [index, setIndex] = useControllableState({
    value: indexProp,
    defaultValue: defaultIndex,
    onChange: onIndexChange,
  })

  const [width, setWidth] = useState(0)
  const [trackHeight, setTrackHeight] = useState(0)
  const [count, setCount] = useState(0)
  // Not state: nothing renders differently once it is true, and the render it would cause
  // would land in the middle of the reader's own drag.
  const hasInteracted = useRef(false)
  const trackRef = useAnimatedRef<Animated.ScrollView>()
  const offset = useSharedValue(0)
  // The handle of the glide in flight, so a second arrow press mid-travel takes over rather
  // than racing the first.
  const glideTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  // The slide a glide is carrying the track to, or `NO_TARGET`. While it is set the track
  // settles on nothing it crosses: an autoplay wrap from the last slide to the first would
  // otherwise report every slide in between.
  const glideTarget = useSharedValue(NO_TARGET)
  // The slide the track is on or headed for; `null` until it has been placed. What the
  // index is compared with to know whether the track has to move.
  const trackIndex = useRef<number | null>(null)

  const selection = { variant, size, radius }
  const styles = carouselRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled },
  })
  const tint = color ? carouselRecipe.tint({ theme, color, selection }) : undefined

  const dotInk = useMemo(() => {
    const at = StyleSheet.flatten<ViewStyle>([styles.dot])
    const on = StyleSheet.flatten<ViewStyle>([styles.dotActive, tint?.dotActive])

    return {
      rest:
        typeof at.backgroundColor === 'string'
          ? at.backgroundColor
          : theme.colors.default,
      active:
        typeof on.backgroundColor === 'string'
          ? on.backgroundColor
          : theme.colors.accent,
      width: typeof at.width === 'number' ? at.width : 0,
      pill: typeof on.width === 'number' ? on.width : 0,
    }
  }, [styles, tint, theme])

  const resolvedGap = gap ?? carouselGap(theme, size)
  const controlBox = useMemo(() => carouselControlBox(theme, size), [theme, size])
  const metrics = useMemo(
    () => carouselMetrics({ width, itemsPerView, gap: resolvedGap, peek }),
    [width, itemsPerView, resolvedGap, peek]
  )

  const handleLayout = (event: LayoutChangeEvent) => {
    onLayout?.(event)
    setWidth(event.nativeEvent.layout.width)
  }

  const stopGlide = useCallback(() => {
    if (glideTimer.current !== null) {
      clearInterval(glideTimer.current)
      glideTimer.current = null
    }
    glideTarget.set(NO_TARGET)
  }, [glideTarget])

  /**
   * Carry the track from where it is now to slide `target` over `GLIDE_MS`, a frame at a
   * time against `easeOutCubic`.
   *
   * `offset` is where it *is* — the scroll handler keeps it live — so a press mid-fling
   * eases on from the real position rather than from the slide it was last resting on. A
   * hand-run tween rather than `scrollTo({ animated: true })` because that call's curve is
   * the platform's, it is close to linear, and it cannot be replaced.
   */
  const glideTo = useCallback(
    (target: number) => {
      stopGlide()
      const x = target * metrics.step
      const from = offset.get()
      const distance = x - from
      trackIndex.current = target

      // A jump this short crosses nothing: the one offset it reports is the target's.
      if (Math.abs(distance) < 1) {
        setTrackOffset(trackRef, x)
        return
      }

      glideTarget.set(target)
      const start = Date.now()
      glideTimer.current = setInterval(() => {
        const t = Math.min(1, (Date.now() - start) / GLIDE_MS)
        setTrackOffset(trackRef, from + distance * easeOutCubic(t))
        if (t >= 1) stopGlide()
      }, GLIDE_FRAME_MS)
    },
    [glideTarget, metrics.step, offset, stopGlide, trackRef]
  )

  // What `placeTrack` reads. It is called from the track's own layout event, which can
  // arrive before or after the render that counted the slides; a ref synced at commit is
  // never a render behind.
  // Where the track can rest: with several slides in view it stops a view short of the
  // end, and every move is held to those positions rather than to the slide count.
  const stops = carouselStops(count, itemsPerView)

  const latest = useRef({ index, stops, step: metrics.step })
  useLayoutEffect(() => {
    latest.current = { index, stops, step: metrics.step }
  })

  /**
   * Put the track on the index at once — once its slides are laid out, and again whenever
   * they are re-measured. This is how `defaultIndex` and a first controlled `index` reach
   * the track: a scroll view starts at zero whatever the index says.
   */
  const placeTrack = useCallback(() => {
    const { index: at, stops: places, step } = latest.current
    if (step <= 0 || places === 0) return

    stopGlide()
    const target = stepIndex(at, 0, places, false)
    trackIndex.current = target
    setTrackOffset(trackRef, target * step)
  }, [stopGlide, trackRef])

  // The slides may be counted after the track has reported its size: placed then too.
  useEffect(() => {
    if (trackIndex.current === null) placeTrack()
  }, [stops, metrics.step, placeTrack])

  // The index leads and the track follows. Whatever moved the index — an arrow, a dot, a
  // thumbnail, autoplay or a controlled parent — the track glides there, and a controlled
  // parent that refuses a change leaves the track where it was. A slide the track settled
  // on by itself is already where the index says, so nothing moves.
  useEffect(() => {
    if (trackIndex.current === null || stops === 0) return

    const target = stepIndex(index, 0, stops, false)
    if (target !== trackIndex.current) glideTo(target)
  }, [stops, glideTo, index])

  // A square or a thumbnail past the last position asks for the last position.
  const goTo = useCallback(
    (next: number) => setIndex(stepIndex(next, 0, stops, false)),
    [setIndex, stops]
  )

  const moveBy = useCallback(
    (delta: number) => goTo(stepIndex(index, delta, stops, hasLoop)),
    [stops, goTo, hasLoop, index]
  )

  /** The track settled on a slide by itself — a drag. Recorded first, so it is not chased. */
  const onSettle = useCallback(
    (next: number) => {
      trackIndex.current = next
      setIndex(next)
    },
    [setIndex]
  )

  const onInteract = useCallback(() => {
    hasInteracted.current = true
    // A finger on the track wins over a glide that has not landed — otherwise the two set
    // the offset on alternate frames and the slide judders — and it settles as it goes.
    stopGlide()
  }, [stopGlide])

  useEffect(() => stopGlide, [stopGlide])

  useEffect(() => {
    if (!autoPlayInterval || isDisabled || stops < 2) return

    const timer = setInterval(() => {
      if (hasInteracted.current) {
        clearInterval(timer)
        return
      }
      // Always wrapping, whatever `hasLoop` says: that prop is about what an *arrow* does
      // at the last slide, and an autoplay that stops there is one that quietly dies.
      // Through the index like every other move, so a controlled parent can refuse it.
      goTo(stepIndex(index, 1, stops, true))
    }, autoPlayInterval)

    return () => clearInterval(timer)
  }, [autoPlayInterval, stops, goTo, index, isDisabled])

  const context = useMemo(
    () => ({
      contentStyle: styles.content,
      itemStyle: styles.item,
      controlStyle: [styles.control, tint?.control],
      controlInactiveStyle: [styles.control, tint?.control, styles.controlInactive],
      chevronStyle: [styles.chevron, tint?.chevron],
      indicatorStyle: styles.indicator,
      dotStyle: styles.dot,
      dotInk,
      counterStyle: styles.counter,
      thumbnailsStyle: styles.thumbnails,
      thumbnailStyle: styles.thumbnail,
      thumbnailActiveStyle: [styles.thumbnailActive, tint?.thumbnailActive],
      index,
      count,
      stops,
      setCount,
      metrics,
      width,
      trackHeight,
      setTrackHeight,
      controlBox,
      hasLoop,
      isDisabled,
      offset,
      glideTarget,
      trackRef,
      placeTrack,
      goTo,
      moveBy,
      onInteract,
      onSettle,
    }),
    [
      styles,
      tint,
      dotInk,
      index,
      count,
      stops,
      metrics,
      width,
      trackHeight,
      setTrackHeight,
      controlBox,
      hasLoop,
      isDisabled,
      offset,
      glideTarget,
      trackRef,
      placeTrack,
      goTo,
      moveBy,
      onInteract,
      onSettle,
    ]
  )

  const rootStyle = [styles.root, styleProps, style]

  return (
    <CarouselProvider value={context}>
      {asChild ? (
        <Slot ref={ref} {...rest} onLayout={handleLayout} style={rootStyle}>
          {children}
        </Slot>
      ) : (
        <View ref={ref} {...rest} onLayout={handleLayout} style={rootStyle}>
          {children}
        </View>
      )}
    </CarouselProvider>
  )
})

CarouselRoot.displayName = 'XAUI.Carousel.Root'
