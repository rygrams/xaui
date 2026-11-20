import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useCarousel } from './carousel.context'
import type { CarouselTextSlotProps } from './carousel.type'

/**
 * How far along, in figures: `3 / 12`, tabular on the `body` role — the figure in the
 * page's ink, " / 12" in the muted one.
 *
 * Children are how it says something else in the same type; `useCarousel()` has the two
 * numbers.
 */
export const CarouselCounter = forwardRef<Text, CarouselTextSlotProps>(
  function CarouselCounter({ children, style, ...props }, ref) {
    const { counterStyle, counterTotalStyle, index, count } = useCarousel()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[counterStyle, styleProps, style]}>
        {children ?? (
          <>
            {count === 0 ? 0 : index + 1}
            <Text style={counterTotalStyle}>{` / ${count}`}</Text>
          </>
        )}
      </Text>
    )
  }
)

CarouselCounter.displayName = 'XAUI.Tram.Carousel.Counter'
