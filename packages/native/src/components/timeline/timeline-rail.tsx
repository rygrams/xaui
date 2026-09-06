import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { TimelineConnector } from './timeline-connector'
import { TimelineMarker } from './timeline-marker'
import { useTimeline } from './timeline.context'
import type { TimelineViewProps } from './timeline.type'

/**
 * The column the line and the dot live in.
 *
 * With no children it is the arrangement every timeline is: the upper half of the line, the
 * marker, the lower half. Children replace all three, which is how a rail carries a second
 * dot, a bracket, or a marker of your own — `Timeline.Connector` takes `edge` for that.
 *
 * ```tsx
 * <Timeline.Rail>
 *   <Timeline.Connector edge="above" />
 *   <Timeline.Marker><Icon as={CheckIcon} /></Timeline.Marker>
 *   <Timeline.Connector edge="below" />
 * </Timeline.Rail>
 * ```
 *
 * It runs the **full height of its entry**, which is what makes one continuous line out of
 * an entry's own bottom padding and the next entry's top.
 */
export const TimelineRail = forwardRef<View, TimelineViewProps>(
  function TimelineRail({ children, style, ...props }, ref) {
    const { railStyle } = useTimeline()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[railStyle, styleProps, style]}>
        {children ?? (
          <>
            <TimelineConnector edge="above" />
            <TimelineMarker />
            <TimelineConnector edge="below" />
          </>
        )}
      </View>
    )
  }
)

TimelineRail.displayName = 'XAUI.Timeline.Rail'
