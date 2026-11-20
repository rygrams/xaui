import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useTimeline, useTimelineItem } from './timeline.context'
import type { TimelineViewProps } from './timeline.type'

const FLUSH = { paddingBottom: 0 } as const

/**
 * What happened, 16 from the tile: the rest of the row, with `density`'s air under it —
 * which the line runs through. The last entry takes it back.
 */
export const TimelineContent = forwardRef<View, TimelineViewProps>(
  function TimelineContent({ children, style, ...props }, ref) {
    const { contentStyle } = useTimeline()
    const { isLast } = useTimelineItem()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View
        ref={ref}
        {...rest}
        style={[contentStyle, isLast ? FLUSH : null, styleProps, style]}
      >
        {children}
      </View>
    )
  }
)

TimelineContent.displayName = 'XAUI.Tram.Timeline.Content'
