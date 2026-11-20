import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { TimelineConnector } from './timeline-connector'
import { TimelineMarker } from './timeline-marker'
import { MARKER_TOP } from './timeline.recipe'
import { useTimeline, useTimelineItem } from './timeline.context'
import type { TimelineViewProps } from './timeline.type'

/** The line's width, as the recipe draws it. */
const LINE = 2

/** In the row's flow, a mark's width: for an entry with no tile. */
const BARE = {
  position: 'relative',
  width: 12,
  alignItems: 'center',
  paddingTop: MARKER_TOP,
} as const

/**
 * The line from this entry's tile to the next one. Laid **under** the tile rather than
 * beside it — out of the row's flow, from the tile's foot to the entry's — so the words
 * sit 16 from the tile and the line runs through the air beneath them.
 *
 * An entry with no `Leading` has no tile to hang from: the rail then stands in the row,
 * a square mark of its status at the top and the line under it.
 */
export const TimelineRail = forwardRef<View, TimelineViewProps>(
  function TimelineRail({ children, style, ...props }, ref) {
    const { railStyle, tile } = useTimeline()
    const { hasLeading } = useTimelineItem()
    const [styleProps, rest] = useStyleProps(props)

    // Under the tile's middle, from its foot to the entry's.
    const hung = useMemo(
      () => ({ start: tile / 2 - LINE / 2, top: tile, bottom: 0 }),
      [tile]
    )

    return (
      <View
        ref={ref}
        pointerEvents="none"
        {...rest}
        style={[railStyle, hasLeading ? hung : BARE, styleProps, style]}
      >
        {children ?? (
          <>
            {hasLeading ? null : <TimelineMarker />}
            <TimelineConnector />
          </>
        )}
      </View>
    )
  }
)

TimelineRail.displayName = 'XAUI.Tram.Timeline.Rail'
