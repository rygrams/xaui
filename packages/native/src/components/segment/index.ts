import { SegmentRoot } from './segment'
import { SegmentItem } from './segment-item'
import { SegmentLabel } from './segment-label'

export const Segment = Object.assign(SegmentRoot, {
  Item: SegmentItem,
  Label: SegmentLabel,
})

export { SegmentRoot } from './segment'
export { SegmentItem } from './segment-item'
export { SegmentLabel } from './segment-label'
export { useSegment, useSegmentItem } from './segment.context'
export { segmentRecipe } from './segment.recipe'
export type {
  SegmentContextValue,
  SegmentItemContextValue,
  SegmentItemProps,
  SegmentItemRenderState,
  SegmentLabelProps,
  SegmentProps,
  SegmentRect,
  SegmentSize,
  SegmentSlot,
  SegmentVariant,
} from './segment.type'
