import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useTimeline, useTimelineItem } from './timeline.context'
import type { TimelineConnectorProps } from './timeline.type'

/**
 * The line, 2 wide in the faint grey, filling the rail. Under the last entry it is left
 * off — a line running past the last tile is a list that has been cut — unless `force`.
 * `edge="above"` draws nothing: the tile is the top of the entry.
 */
export const TimelineConnector = forwardRef<View, TimelineConnectorProps>(
  function TimelineConnector(
    { edge = 'below', force = false, style, ...props },
    ref
  ) {
    const { connectorStyle } = useTimeline()
    const { isLast } = useTimelineItem()
    const [styleProps, rest] = useStyleProps(props)

    if (edge === 'above' || (isLast && !force)) return null

    return <View ref={ref} {...rest} style={[connectorStyle, styleProps, style]} />
  }
)

TimelineConnector.displayName = 'XAUI.Tram.Timeline.Connector'
