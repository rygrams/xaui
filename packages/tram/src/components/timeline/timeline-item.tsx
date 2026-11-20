import { forwardRef, useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import {
  TimelineItemProvider,
  useTimeline,
  useTimelinePosition,
} from './timeline.context'
import type { TimelineItemProps } from './timeline.type'

const PLACED = { position: 'relative' } as const

/** The least line between two tiles, so a short entry never lets them touch. */
const LEAST_LINE = 24

/**
 * One entry: a row of the tile, the rail and what happened, in JSX order. It is the box
 * the rail is laid in — under the tile, down to the entry's foot — and it learns from its
 * `Leading` whether a tile opens it at all.
 */
export const TimelineItem = forwardRef<View, TimelineItemProps>(
  function TimelineItem({ children, status = 'default', style, ...props }, ref) {
    const { itemStyle, tile } = useTimeline()
    const { isFirst, isLast } = useTimelinePosition()
    const [styleProps, rest] = useStyleProps(props)

    const [leadings, setLeadings] = useState(0)
    const registerLeading = useCallback(() => {
      setLeadings(count => count + 1)
      return () => setLeadings(count => count - 1)
    }, [])

    const context = useMemo(
      () => ({ status, isFirst, isLast, hasLeading: leadings > 0, registerLeading }),
      [status, isFirst, isLast, leadings, registerLeading]
    )

    const reach = useMemo(
      () => (leadings > 0 && !isLast ? { minHeight: tile + LEAST_LINE } : null),
      [leadings, isLast, tile]
    )

    return (
      <TimelineItemProvider value={context}>
        <View
          ref={ref}
          {...rest}
          style={[itemStyle, PLACED, reach, styleProps, style]}
        >
          {children}
        </View>
      </TimelineItemProvider>
    )
  }
)

TimelineItem.displayName = 'XAUI.Tram.Timeline.Item'
