import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { usePager } from './pager.context'
import type { PagerViewSlotProps } from './pager.type'

/**
 * One page.
 *
 * Its size is the **track's**, on both axes, measured rather than given — which is the whole
 * difference between this and a `Carousel.Item`, whose width is a *division* of the track by
 * `itemsPerView` and the gaps. A page given a size in points is a page that is wrong on the
 * next screen.
 *
 * It clips, so content drawn to its edges stops at them instead of bleeding onto the page
 * beside it while the track is mid-travel.
 */
export const PagerPage = forwardRef<View, PagerViewSlotProps>(function PagerPage(
  { children, style, ...props },
  ref
) {
  const { pageStyle, track } = usePager()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <View
      ref={ref}
      {...rest}
      style={[
        pageStyle,
        { width: track.width, height: track.height },
        styleProps,
        style,
      ]}
    >
      {children}
    </View>
  )
})

PagerPage.displayName = 'XAUI.Pager.Page'
