import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { TimelineConnector } from './timeline-connector'
import { TimelineMarker } from './timeline-marker'
import { TimelineProvider, useTimeline } from './timeline.context'
import { timelineInset } from './timeline.recipe'
import type { TimelineRailProps } from './timeline.type'

/**
 * The column the line and the dot live in.
 *
 * With no children it is the arrangement every timeline is: the upper half of the line, the
 * marker, the lower half. Children replace all three, which is how a rail carries a second
 * dot, a bracket, or a marker of your own — `Timeline.Connector` takes `edge` for that.
 *
 * ```tsx
 * <Timeline.Rail marker={28}>
 *   <Timeline.Connector edge="above" />
 *   <Timeline.Marker><Icon as={CheckIcon} /></Timeline.Marker>
 *   <Timeline.Connector edge="below" />
 * </Timeline.Rail>
 * ```
 *
 * **`marker` is how a composed rail says how tall its marker is**, and a rail carrying one
 * bigger than the dot needs to: the upper half of the line is a height, so a rail that still
 * thinks it holds a 12pt dot puts a 28pt ring eight points below the title it labels. The
 * number is republished rather than passed down, because the connectors are children this
 * component does not own (R1).
 *
 * It runs the **full height of its entry**, which is what makes one continuous line out of
 * an entry's own bottom padding and the next entry's top.
 */
export const TimelineRail = forwardRef<View, TimelineRailProps>(
  function TimelineRail({ children, marker, style, ...props }, ref) {
    const context = useTimeline()
    const [styleProps, rest] = useStyleProps(props)

    const placed = useMemo(() => {
      if (marker === undefined || marker === context.rail.marker) return context

      // Only the inset moves. `rail.marker` stays the dot's size because that is what a
      // marker of your own measures itself against — overwriting it would make a ring that
      // sizes itself off the dot grow every time it was told how big it had become.
      const { line } = context.rail
      const rail = { ...context.rail, inset: timelineInset(line, marker) }

      return { ...context, rail }
    }, [context, marker])

    return (
      <TimelineProvider value={placed}>
        <View ref={ref} {...rest} style={[context.railStyle, styleProps, style]}>
          {children ?? (
            <>
              <TimelineConnector edge="above" />
              <TimelineMarker />
              <TimelineConnector edge="below" />
            </>
          )}
        </View>
      </TimelineProvider>
    )
  }
)

TimelineRail.displayName = 'XAUI.Timeline.Rail'
