import { forwardRef } from 'react'
import { ScrollView, View } from 'react-native'
import { usePressState } from '@xaui/native'
import { PressableFeedback, useStyleProps } from '@xaui/native/system'
import { scale } from '../../motion/motion-tokens'
import { PressTilt } from '../../system/press-tilt'
import { touchReach } from '../../system/touch-reach'
import { useTramHaptic } from '../../theme/tram-haptics'
import { useCarousel } from './carousel.context'
import type {
  CarouselScrollSlotProps,
  CarouselThumbnailProps,
} from './carousel.type'

/**
 * A strip of small versions of the slides, four apart. It scrolls on its own and does not
 * snap: it is being read, not paged.
 */
export const CarouselThumbnails = forwardRef<ScrollView, CarouselScrollSlotProps>(
  function CarouselThumbnails(
    { children, style, contentContainerStyle, ...props },
    ref
  ) {
    const { thumbnailsStyle, thumbnailsContentStyle } = useCarousel()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <ScrollView
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        {...rest}
        style={[thumbnailsStyle, styleProps, style]}
        contentContainerStyle={[thumbnailsContentStyle, contentContainerStyle]}
      >
        {children}
      </ScrollView>
    )
  }
)

CarouselThumbnails.displayName = 'XAUI.Tram.Carousel.Thumbnails'

/**
 * One thumbnail: a square the size of a key. Pressing it goes to its slide.
 *
 * The chosen one is ringed as a `ColorPicker` swatch is — a band of the ground 3 wide at
 * its edge, then a line of ink 2 wide. The ring is **always drawn and only its colour
 * moves**, over what the thumbnail holds, so choosing one resizes nothing. A press leans
 * it toward the finger.
 *
 * It says "3/12" through `accessibilityValue`; an image inside it with its own
 * `accessibilityLabel` is how it says what it shows.
 */
export const CarouselThumbnail = forwardRef<View, CarouselThumbnailProps>(
  function CarouselThumbnail(
    {
      index,
      children,
      accessibilityState,
      hitSlop,
      style,
      onPress,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) {
    const {
      thumbnailStyle,
      ringStyle,
      ringOnStyle,
      ringLineStyle,
      ringLineOnStyle,
      thumbnailSize,
      index: current,
      count,
      isDisabled,
      isStill,
      goTo,
      onInteract,
    } = useCarousel()
    const [styleProps, rest] = useStyleProps(props)
    const haptic = useTramHaptic()
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const isActive = index === current
    const Root = isStill ? PressableFeedback : PressTilt
    const lean = isStill ? undefined : { depth: scale.row }
    // Only above and below: across, the next thumbnail is four points away.
    const reach = touchReach(thumbnailSize)

    return (
      <Root
        ref={ref}
        isPressed={isPressed}
        isDisabled={isDisabled}
        // Native's scale, highlight and ripple stay off: the press is the tilt alone.
        animation={isStill ? 'disable-all' : false}
        accessibilityRole="button"
        accessibilityState={{
          selected: isActive,
          disabled: isDisabled,
          ...accessibilityState,
        }}
        // `text` too: iOS reads a bare range as a percentage. Figures need no language.
        accessibilityValue={{
          now: index + 1,
          min: 1,
          max: count,
          text: `${index + 1}/${count}`,
        }}
        hitSlop={hitSlop ?? { top: reach, bottom: reach }}
        {...lean}
        {...rest}
        style={[thumbnailStyle, styleProps, style]}
        // Composed: the caller's handlers run inside these.
        onPress={event => {
          onPress?.(event)
          haptic('selection')
          onInteract()
          goTo(index)
        }}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {children}
        <View pointerEvents="none" style={isActive ? ringOnStyle : ringStyle}>
          <View style={isActive ? ringLineOnStyle : ringLineStyle} />
        </View>
      </Root>
    )
  }
)

CarouselThumbnail.displayName = 'XAUI.Tram.Carousel.Thumbnail'
