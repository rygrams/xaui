import { forwardRef } from 'react'
import { View } from 'react-native'
import { IconContext } from '../../system/icon'
import { useStyleProps } from '../../system/style-props'
import { useTimeline, useTimelineItem } from './timeline.context'
import type { TimelineViewProps } from './timeline.type'

/**
 * The dot, in its entry's status.
 *
 * It **picks** a resolved style rather than resolving one: the root resolved all six once,
 * which is what keeps a fifty-entry list at six cache hits (R5).
 *
 * With children it is a container for them instead — an `Icon`, a number — and it publishes
 * the glyph's size and colour through `IconContext` so what goes inside takes both without
 * being told.
 */
export const TimelineMarker = forwardRef<View, TimelineViewProps>(
  function TimelineMarker({ children, style, ...props }, ref) {
    const { markerStyles, icon } = useTimeline()
    const { status } = useTimelineItem()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <IconContext.Provider value={icon}>
        <View ref={ref} {...rest} style={[markerStyles[status], styleProps, style]}>
          {children}
        </View>
      </IconContext.Provider>
    )
  }
)

TimelineMarker.displayName = 'XAUI.Timeline.Marker'
