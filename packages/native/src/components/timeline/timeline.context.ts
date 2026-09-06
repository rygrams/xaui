import { createSlotContext } from '../../system/slot'
import type { TimelineContextValue, TimelineItemContextValue } from './timeline.type'

/** R10 — the resolved styles and the rail's measurements. */
export const [TimelineProvider, useTimeline] =
  createSlotContext<TimelineContextValue>('Timeline')

/**
 * What one entry publishes, and the reason there are two contexts rather than one.
 *
 * A rail needs to know its entry's status and whether that entry is at either end; the root
 * cannot say, because it is the same root for every entry. The position comes from the root
 * all the same — it is the only thing that can count — and this is where it lands.
 */
export const [TimelineItemProvider, useTimelineItem] =
  createSlotContext<TimelineItemContextValue>('Timeline.Item')
