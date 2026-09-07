import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTimeline, TimelineItemProvider } from './timeline.context'
import { useTimelinePosition } from './timeline-position'
import type { TimelineItemProps } from './timeline.type'

/**
 * One entry: a time, a rail and what happened.
 *
 * A row, in JSX order (R4): `Timeline.Leading` first when there is one, then the rail, then
 * the content. Nothing here reorders them, so a timeline whose times sit on the right is
 * that JSX written the other way round.
 *
 * Its bottom padding is `density`'s, and the connector fills it — which is why the air
 * between two entries lives *inside* the one above rather than in a gap on the root.
 */
export const TimelineItem = forwardRef<View, TimelineItemProps>(
  function TimelineItem(
    { children, status = 'default', align, style, ...props },
    ref
  ) {
    const { itemStyle, align: rootAlign } = useTimeline()
    const { isFirst, isLast } = useTimelinePosition()
    const [styleProps, rest] = useStyleProps(props)

    const context = useMemo(
      () => ({ status, align: align ?? rootAlign, isFirst, isLast }),
      [status, align, rootAlign, isFirst, isLast]
    )

    return (
      <TimelineItemProvider value={context}>
        <View ref={ref} {...rest} style={[itemStyle, styleProps, style]}>
          {children}
        </View>
      </TimelineItemProvider>
    )
  }
)

TimelineItem.displayName = 'XAUI.Timeline.Item'
