import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type { LayoutChangeEvent, ViewStyle } from 'react-native'
import type { AnimatedRef } from 'react-native-reanimated'
import Animated, { useAnimatedRef, useSharedValue } from 'react-native-reanimated'
import { useControllableState } from '../../hooks/use-controllable-state'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { carouselMetrics, stepIndex } from '../../utils/carousel'
import { CarouselProvider } from './carousel.context'
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
 * Move the track, in the one way that works on both renderers.
 *
 * Written out because there are two wrong ones either side of it. Reanimated's own
 * `scrollTo` worklet is a no-op under the web renderer, so a carousel whose arrows are
 * written that way does nothing on the web and everything on a device. And `scrollTo`
 * **needs its `y`**: React Native Web hands the object straight to the DOM's own
 * `scrollTo`, where a missing `top` means "stay where you are" — and a horizontal scroll
 * with no vertical component is exactly the call that looks like it should be fine.
 *
 * The ref is `useAnimatedRef`'s, which is what reaches the scroller's own methods; the ref
 * `Animated.ScrollView` hands a plain `useRef` is the wrapper Reanimated built around it.
 */
function scrollTrack(track: AnimatedRef<Animated.ScrollView>, x: number): void {
  track.current?.scrollTo({ x, y: 0, animated: true })
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

  const goTo = useCallback(
    (next: number) => {
      // The track is the source of truth for where the carousel is: telling it to move and
      // letting its own settle report back is what keeps a controlled index, a dragged
      // index and an autoplayed one on one path instead of three.
      scrollTrack(trackRef, next * metrics.step)
      setIndex(next)
    },
    [metrics.step, setIndex, trackRef]
  )

  const moveBy = useCallback(
    (delta: number) => goTo(stepIndex(index, delta, count, hasLoop)),
    [count, goTo, hasLoop, index]
  )

  const onInteract = useCallback(() => {
    hasInteracted.current = true
  }, [])

  useEffect(() => {
    if (!autoPlayInterval || isDisabled || count < 2) return

    const timer = setInterval(() => {
      if (hasInteracted.current) {
        clearInterval(timer)
        return
      }
      // Always wrapping, whatever `hasLoop` says: that prop is about what an *arrow* does
      // at the last slide, and an autoplay that stops there is one that quietly dies.
      setIndex(current => {
        const next = stepIndex(current, 1, count, true)
        scrollTrack(trackRef, next * metrics.step)
        return next
      })
    }, autoPlayInterval)

    return () => clearInterval(timer)
  }, [autoPlayInterval, count, isDisabled, metrics.step, setIndex, trackRef])

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
      setCount,
      metrics,
      width,
      trackHeight,
      setTrackHeight,
      controlBox,
      hasLoop,
      isDisabled,
      offset,
      trackRef,
      goTo,
      moveBy,
      onInteract,
      onSettle: setIndex,
    }),
    [
      styles,
      tint,
      dotInk,
      index,
      count,
      metrics,
      width,
      trackHeight,
      setTrackHeight,
      controlBox,
      hasLoop,
      isDisabled,
      offset,
      goTo,
      moveBy,
      onInteract,
      setIndex,
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
