import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTimeline, useTimelineItem } from './timeline.context'
import type { TimelineConnectorProps } from './timeline.type'

/**
 * Half the line, above the marker or below it.
 *
 * **Two halves rather than one line, and that is what makes `align` work.** Below the marker
 * both are a share of the height, so it centres; above it the upper half is a fixed inset —
 * half the title's line — so it sits level with the first line of the text. One connector
 * could do neither.
 *
 * **The end segments are left off.** The first entry has nothing above it and the last has
 * nothing below it, and a line running off the top of a list is a list that has been cut.
 * `force` draws one anyway, for a timeline that continues past what is on screen.
 */
export const TimelineConnector = forwardRef<View, TimelineConnectorProps>(
  function TimelineConnector(
    { edge = 'below', force = false, style, ...props },
    ref
  ) {
    const { connectorStyle, rail } = useTimeline()
    const { align, isFirst, isLast } = useTimelineItem()
    const [styleProps, rest] = useStyleProps(props)

    const atEnd = edge === 'above' ? isFirst : isLast
    if (atEnd && !force) {
      // A spacer rather than nothing at all: the marker's place in the rail is decided by
      // what is above it, so removing the upper half on the first entry would lift its dot
      // to the top and put it out of line with every other one.
      return edge === 'above' ? <View style={upperSpace(align, rail.inset)} /> : null
    }

    return (
      <View
        ref={ref}
        {...rest}
        style={[
          connectorStyle,
          edge === 'above' ? upperSpace(align, rail.inset) : null,
          styleProps,
          style,
        ]}
      />
    )
  }
)

TimelineConnector.displayName = 'XAUI.Timeline.Connector'

/**
 * The upper half's height: a share of the entry when the marker is centred, and a fixed
 * inset when it is level with the title's first line.
 *
 * `flexGrow: 0` with a height is what pins it; the lower half keeps the `flexGrow: 1` the
 * recipe gave both, so it takes whatever is left either way.
 */
function upperSpace(align: 'start' | 'center', inset: number) {
  return align === 'center' ? null : { flexGrow: 0, height: inset }
}
