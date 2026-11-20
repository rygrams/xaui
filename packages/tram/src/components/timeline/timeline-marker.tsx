import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useTimeline, useTimelineItem } from './timeline.context'
import type { TimelineViewProps } from './timeline.type'

/**
 * A square of the entry's status, 12 a side, level with the title's first line — the
 * mark of an entry with no tile. Kept for Native's markup; with a tile it is not drawn.
 */
export const TimelineMarker = forwardRef<View, TimelineViewProps>(
  function TimelineMarker({ children, style, ...props }, ref) {
    const { markerStyle, paints } = useTimeline()
    const { status } = useTimelineItem()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View
        ref={ref}
        {...rest}
        style={[
          markerStyle,
          { backgroundColor: paints[status].fill },
          styleProps,
          style,
        ]}
      >
        {children}
      </View>
    )
  }
)

TimelineMarker.displayName = 'XAUI.Tram.Timeline.Marker'
