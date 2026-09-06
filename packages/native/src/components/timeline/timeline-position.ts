import { createSlotContext } from '../../system/slot'

/** Where an entry sits in the list. The only thing the root can say and the entry cannot. */
export type TimelinePosition = { isFirst: boolean; isLast: boolean }

/**
 * The root's count, one entry at a time.
 *
 * Separate from `Timeline.Item`'s own context because it is published by the **root**: an
 * entry reads it and republishes it alongside its status, so a rail below reads one context
 * rather than two.
 */
export const [TimelinePositionProvider, useTimelinePosition] =
  createSlotContext<TimelinePosition>('Timeline')
