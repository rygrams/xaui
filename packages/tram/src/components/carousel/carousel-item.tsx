import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useCarousel } from './carousel.context'
import type { CarouselViewSlotProps } from './carousel.type'

/**
 * One slide. Nothing paints inside it: what it holds is the caller's.
 *
 * Its width is the track's, divided by `itemsPerView` less the gaps and the peeks —
 * never a prop. It clips, so an image drawn to its edges takes the slide's corner when
 * `radius` gives it one. Its height is whatever is inside it.
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

CarouselItem.displayName = 'XAUI.Tram.Carousel.Item'
