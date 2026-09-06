import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useCarousel } from './carousel.context'
import type { CarouselTextSlotProps } from './carousel.type'

/**
 * How far along, in figures: `3 / 12`.
 *
 * With no children it prints the position over the total, which is what it is for. Children
 * are how it says something else with the same style — `useCarousel()` has the two numbers.
 *
 * A counter is what a long series needs and a row of dots cannot give: twenty dots is a
 * texture, not a position. It also reads aloud, which the dots deliberately do not.
 */
export const CarouselCounter = forwardRef<Text, CarouselTextSlotProps>(
  function CarouselCounter({ children, style, ...props }, ref) {
    const { counterStyle, index, count } = useCarousel()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[counterStyle, styleProps, style]}>
        {children ?? `${count === 0 ? 0 : index + 1} / ${count}`}
      </Text>
    )
  }
)

CarouselCounter.displayName = 'XAUI.Carousel.Counter'
