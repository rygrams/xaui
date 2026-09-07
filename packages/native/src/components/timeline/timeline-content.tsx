import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTimeline } from './timeline.context'
import type { TimelineViewProps } from './timeline.type'

/**
 * What happened, beside the rail.
 *
 * It takes the rest of the row, so a long description wraps rather than pushing the rail off
 * the screen — and anything at all goes in it: a `Chip`, a thumbnail, a nested list.
 */
export const TimelineContent = forwardRef<View, TimelineViewProps>(
  function TimelineContent({ children, style, ...props }, ref) {
    const { contentStyle } = useTimeline()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[contentStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

TimelineContent.displayName = 'XAUI.Timeline.Content'
