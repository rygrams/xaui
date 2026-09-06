import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useCarousel } from './carousel.context'
import type { CarouselViewSlotProps } from './carousel.type'

/**
 * One slide.
 *
 * Its **width is the track's**, divided by `itemsPerView` and less the gaps and the peeks —
 * never a prop. A slide given a width in points is a slide that is wrong on the next screen
 * size, and the arithmetic is in `carouselMetrics` where it can be read and tested.
 *
 * It clips, so an image drawn to its edges takes the slide's corner rather than overhanging
 * it. Its height is whatever is inside it: a carousel is as tall as its content.
 */
export const CarouselItem = forwardRef<View, CarouselViewSlotProps>(
  function CarouselItem({ children, style, ...props }, ref) {
    const { itemStyle, metrics } = useCarousel()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View
        ref={ref}
        {...rest}
        style={[itemStyle, { width: metrics.itemWidth }, styleProps, style]}
      >
        {children}
      </View>
    )
  }
)

CarouselItem.displayName = 'XAUI.Carousel.Item'
