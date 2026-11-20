import { createSlotContext } from '@xaui/native/system'
import type { TimelineContextValue, TimelineItemContextValue } from './timeline.type'

/** The resolved styles and the six tile paints. Outside a `<Timeline>` it throws. */
export const [TimelineProvider, useTimeline] =
  createSlotContext<TimelineContextValue>('Tram.Timeline')

/** One entry's status, its place in the list, and whether a tile opens it. */
export const [TimelineItemProvider, useTimelineItem] =
  createSlotContext<TimelineItemContextValue>('Tram.Timeline.Item')

/** Where an entry sits — the one thing the root can count and the entry cannot. */
export const [TimelinePositionProvider, useTimelinePosition] = createSlotContext<{
  isFirst: boolean
  isLast: boolean
}>('Tram.Timeline')
