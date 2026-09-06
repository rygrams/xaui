import { createSlotContext } from '../../system/slot'
import type { SegmentContextValue, SegmentItemContextValue } from './segment.type'

/**
 * R10 — `useSegment` is exported so a third party can write its own option against the
 * same resolved values the built-in ones read. Outside a `<Segment>` it throws by name.
 */
export const [SegmentProvider, useSegment] =
  createSlotContext<SegmentContextValue>('Segment')

/** One option's own state, for the label inside it. */
export const [SegmentItemProvider, useSegmentItem] =
  createSlotContext<SegmentItemContextValue>('Segment.Item')
