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
import Animated, {
  Easing,
  useAnimatedRef,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated'
import type { AnimatedRef } from 'react-native-reanimated'
import { useControllableState } from '@xaui/native'
import {
  Slot,
  carouselMetrics,
  stepIndex,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { duration, ease } from '../../motion/motion-tokens'
import { flatPaint } from '../../system/flat-paint'
import { CarouselProvider } from './carousel.context'
import {
  CAROUSEL_GEOMETRY,
  DEFAULT_SIZE,
  carouselControlBox,
  carouselRecipe,
} from './carousel.recipe'
import type { CarouselProps } from './carousel.type'
import { NO_TARGET } from './carousel.utils'

/**
 * Put the track at `x` this frame, no animation of its own. Through the scroller's own
 * `scrollTo`, reached with `useAnimatedRef`: Reanimated's `scrollTo` worklet does nothing
 * on the web, and the DOM's `scrollTo` needs its `y` or stays where it is.
 */
function setTrackOffset(track: AnimatedRef<Animated.ScrollView>, x: number): void {
  track.current?.scrollTo({ x, y: 0, animated: false })
}

const [X1, Y1, X2, Y2] = ease.metro

/** The Metro curve as a plain function of time: off fast, braking hard onto the slide. */
const METRO = Easing.bezierFn(X1, Y1, X2, Y2)

/** One display frame at 60 Hz: what the glide is stepped on. */
const FRAME_MS = 16

/**
 * A series of slides, one or a few at a time — the Native `Carousel`'s API, drawn in
 * Metro: the slides are the caller's, the arrows squares of the page's ground, the
 * indicator a row of squares whose chosen one stretches into a bar of the accent.
 *
 * ```tsx
 * <Carousel autoPlayInterval={3200}>
 *   <Carousel.Content>
 *     {photos.map(photo => (
 *       <Carousel.Item key={photo.id}>
 *         <Image source={photo.source} style={{ width: '100%', height: 176 }} />
 *       </Carousel.Item>
 *     ))}
 *   </Carousel.Content>
 *   <Carousel.Previous accessibilityLabel="photo précédente" />
 *   <Carousel.Next accessibilityLabel="photo suivante" />
 *   <Carousel.Indicator />
 * </Carousel>
 * ```
 *
 * A drag is the platform's — a snap per slide and a fast deceleration. An arrow, a
 * square, a thumbnail or an autoplay tick carries the track on the Metro curve over
 * `slow`; with motion reduced it is there at once. Autoplay always wraps and stops at the
 * first interaction for good.
 */
export const CarouselRoot = forwardRef<View, CarouselProps>(function Carousel(
  {
    children,
    size = DEFAULT_SIZE,
    accent,
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
  const isReduced = useReducedMotion()
  const isStill = useAnimationDisabled()

  const [index, setIndex] = useControllableState({
    value: indexProp,
    defaultValue: defaultIndex,
    onChange: onIndexChange,
  })

  const [width, setWidth] = useState(0)
  const [trackHeight, setTrackHeight] = useState(0)
  const [count, setCount] = useState(0)
  // Not state: nothing renders differently once it is true, and the render would land in
  // the middle of the reader's own drag.
  const hasInteracted = useRef(false)
  const trackRef = useAnimatedRef<Animated.ScrollView>()
  const offset = useSharedValue(0)
  // The slide a programmatic move is carrying the track to, or `NO_TARGET`. While it is
  // set the track does not settle on the slides it crosses: an autoplay wrap from the
  // last slide to the first would otherwise report every one in between.
  const glideTarget = useSharedValue(NO_TARGET)
  // The glide in flight, so a second press mid-travel takes over rather than racing it.
  const glideTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  // The slide the track is on or headed for; `null` until it has been placed. What the
  // index is compared with to know whether the track has to move.
  const trackIndex = useRef<number | null>(null)

  const selection = { size, radius }
  const styles = carouselRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled },
  })

  // The bar is a flat fill, so a named accent is its true colour and a raw `color` wins.
  // Disabled, it is the recipe's grey whatever was asked.
  const paint = isDisabled ? undefined : flatPaint({ accent, color })
  const dotInk = useMemo(() => {
    const atRest = StyleSheet.flatten<ViewStyle>([styles.dot])
    const chosen = StyleSheet.flatten<ViewStyle>([styles.dotActive])
    const recipeActive =
      typeof chosen.backgroundColor === 'string'
        ? chosen.backgroundColor
        : theme.colors.accent

    return {
      rest:
        typeof atRest.backgroundColor === 'string'
          ? atRest.backgroundColor
          : theme.colors.muted,
      active: paint ?? recipeActive,
      size: typeof atRest.width === 'number' ? atRest.width : 0,
    }
  }, [styles, paint, theme])

  const resolvedGap = gap ?? CAROUSEL_GEOMETRY[size].gap
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
   * Carry the track to slide `target` on the Metro curve, over `slow`, a frame at a time.
   * From the live offset, so a press mid-fling eases on from the real position. A
   * hand-run tween because `scrollTo({ animated: true })` is the platform's curve, close
   * to linear, and cannot be replaced. With motion reduced — or under `disable-all` — the
   * track is simply there: a scroll has no fade to fall back on.
   */
  const glideTo = useCallback(
    (target: number) => {
      stopGlide()
      const x = target * metrics.step
      const from = offset.get()
      const distance = x - from
      trackIndex.current = target

      // A jump crosses nothing: the one offset it reports is the target's.
      if (isReduced || isStill || Math.abs(distance) < 1) {
        setTrackOffset(trackRef, x)
        return
      }

      glideTarget.set(target)
      const start = Date.now()
      glideTimer.current = setInterval(() => {
        const t = Math.min(1, (Date.now() - start) / duration.slow)
        setTrackOffset(trackRef, from + distance * METRO(t))
        if (t >= 1) stopGlide()
      }, FRAME_MS)
    },
    [glideTarget, isReduced, isStill, metrics.step, offset, stopGlide, trackRef]
  )

  // What `placeTrack` reads. It is called from the track's own layout event, which can
  // arrive before or after the render that counted the slides; a ref synced at commit is
  // never a render behind.
  const latest = useRef({ index, count, step: metrics.step })
  useLayoutEffect(() => {
    latest.current = { index, count, step: metrics.step }
  })

  /**
   * Put the track on the index at once — once its slides are laid out, and again
   * whenever they are re-measured. This is how `defaultIndex` and a first controlled
   * `index` reach the track: a scroll view starts at zero whatever the index says.
   */
  const placeTrack = useCallback(() => {
    const { index: at, count: slides, step } = latest.current
    if (step <= 0 || slides === 0) return

    stopGlide()
    const target = stepIndex(at, 0, slides, false)
    trackIndex.current = target
    setTrackOffset(trackRef, target * step)
  }, [stopGlide, trackRef])

  // The slides may be counted after the track has reported its size: placed then too.
  useEffect(() => {
    if (trackIndex.current === null) placeTrack()
  }, [count, metrics.step, placeTrack])

  // The index leads and the track follows. Whatever moved the index — an arrow, a square,
  // autoplay, or a controlled parent — the track glides there, and a controlled parent
  // that refuses a change leaves the track where it was. A slide the track settled on by
  // itself is already where the index says, so nothing moves.
  useEffect(() => {
    if (trackIndex.current === null || count === 0) return

    const target = stepIndex(index, 0, count, false)
    if (target !== trackIndex.current) glideTo(target)
  }, [count, glideTo, index])

  const goTo = useCallback((next: number) => setIndex(next), [setIndex])

  const moveBy = useCallback(
    (delta: number) => goTo(stepIndex(index, delta, count, hasLoop)),
    [count, goTo, hasLoop, index]
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
    // A finger on the track wins over a glide that has not landed, and settles as it goes.
    stopGlide()
  }, [stopGlide])

  useEffect(() => stopGlide, [stopGlide])

  useEffect(() => {
    if (!autoPlayInterval || isDisabled || count < 2) return

    const timer = setInterval(() => {
      if (hasInteracted.current) {
        clearInterval(timer)
        return
      }
      // Always wrapping, whatever `hasLoop` says: that prop is about the arrows, and an
      // autoplay that stops at the last slide is one that quietly dies. Through the index
      // like every other move, so a controlled parent can still refuse it.
      goTo(stepIndex(index, 1, count, true))
    }, autoPlayInterval)

    return () => clearInterval(timer)
  }, [autoPlayInterval, count, goTo, index, isDisabled])

  const context = useMemo(
    () => ({
      contentStyle: styles.content,
      itemStyle: styles.item,
      controlStyle: styles.control,
      controlInactiveStyle: [styles.control, styles.controlInactive],
      chevronStyle: styles.chevron,
      chevronInactiveStyle: [styles.chevron, styles.chevronInactive],
      indicatorStyle: styles.indicator,
      dotStyle: styles.dot,
      dotInk,
      counterStyle: styles.counter,
      counterTotalStyle: styles.counterTotal,
      thumbnailsStyle: styles.thumbnails,
      thumbnailsContentStyle: styles.thumbnailsContent,
      thumbnailStyle: styles.thumbnail,
      ringStyle: styles.ring,
      ringOnStyle: [styles.ring, styles.ringOn],
      ringLineStyle: styles.ringLine,
      ringLineOnStyle: [styles.ringLine, styles.ringLineOn],
      index,
      count,
      setCount,
      metrics,
      width,
      trackHeight,
      setTrackHeight,
      controlBox,
      thumbnailSize: CAROUSEL_GEOMETRY[size].key,
      hasLoop,
      isDisabled,
      isStill,
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
      dotInk,
      index,
      count,
      metrics,
      width,
      trackHeight,
      controlBox,
      size,
      hasLoop,
      isDisabled,
      isStill,
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

  // Most general to most specific: the cached recipe, the style props, `style`.
  const rootStyle = [styles.root, styleProps, style]

  return (
    <CarouselProvider value={context}>
      {/* Under `asChild` the caller's element is the root: one child, theirs. */}
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

CarouselRoot.displayName = 'XAUI.Tram.Carousel.Root'
