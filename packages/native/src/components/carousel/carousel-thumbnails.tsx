import { forwardRef } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useCarousel } from './carousel.context'
import type { CarouselThumbnailProps, CarouselViewSlotProps } from './carousel.type'

/**
 * A strip of small versions of the slides, under the carousel.
 *
 * It is an indicator that **shows what it points at**, which is the one thing dots cannot
 * do: on a series of photographs a reader picks the one they want rather than counting
 * across to it.
 *
 * It scrolls on its own, because a strip long enough to be worth having is longer than the
 * screen. Unlike the track it does not snap: it is being read, not paged.
 */
export const CarouselThumbnails = forwardRef<ScrollView, CarouselViewSlotProps>(
  function CarouselThumbnails({ children, style, ...props }, ref) {
    const { thumbnailsStyle } = useCarousel()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <ScrollView
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        {...rest}
        style={[thumbnailsStyle, styleProps, style]}
        contentContainerStyle={CONTENT}
      >
        {children}
      </ScrollView>
    )
  }
)

CarouselThumbnails.displayName = 'XAUI.Carousel.Thumbnails'

/**
 * The strip's own gap lives on its content rather than on itself: a horizontal `ScrollView`
 * lays out its children in the content view, and a `gap` on the scroller does nothing.
 */
const CONTENT = { flexDirection: 'row' as const, gap: 8 }

/**
 * One thumbnail. Pressing it goes to its slide.
 *
 * The ring around the chosen one is **always drawn and only its colour moves**, so choosing
 * a thumbnail does not resize it — a border that appears on selection nudges every
 * thumbnail after it along the strip.
 *
 * Like `Carousel.Dot`, it says "3 of 12" through `accessibilityValue` rather than through a
 * label this library would have to invent a language for. What is *in* it is yours, so an
 * image with its own `accessibilityLabel` is how a thumbnail says what it shows.
 */
export const CarouselThumbnail = forwardRef<View, CarouselThumbnailProps>(
  function CarouselThumbnail({ index, children, style, ...props }, ref) {
    const {
      thumbnailStyle,
      thumbnailActiveStyle,
      index: current,
      count,
      isDisabled,
      goTo,
      onInteract,
    } = useCarousel()
    const [styleProps, rest] = useStyleProps(props)

    const isActive = index === current

    return (
      <Pressable
        ref={ref}
        accessibilityRole="button"
        accessibilityState={{ selected: isActive, disabled: isDisabled }}
        accessibilityValue={{ now: index + 1, min: 1, max: count }}
        disabled={isDisabled}
        {...rest}
        style={[isActive ? thumbnailActiveStyle : thumbnailStyle, styleProps, style]}
        onPress={() => {
          onInteract()
          goTo(index)
        }}
      >
        {children}
      </Pressable>
    )
  }
)

CarouselThumbnail.displayName = 'XAUI.Carousel.Thumbnail'
