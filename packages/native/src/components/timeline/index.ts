import { TimelineConnector } from './timeline-connector'
import { TimelineContent } from './timeline-content'
import { TimelineDescription, TimelineTitle } from './timeline-text'
import { TimelineItem } from './timeline-item'
import { TimelineLeading } from './timeline-leading'
import { TimelineMarker } from './timeline-marker'
import { TimelineRail } from './timeline-rail'
import { TimelineRoot } from './timeline'

export const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
  Leading: TimelineLeading,
  Rail: TimelineRail,
  Marker: TimelineMarker,
  Connector: TimelineConnector,
  Content: TimelineContent,
  Title: TimelineTitle,
  Description: TimelineDescription,
})

export { TimelineRoot } from './timeline'
export { TimelineConnector } from './timeline-connector'
export { TimelineContent } from './timeline-content'
export { TimelineItem } from './timeline-item'
export { TimelineLeading } from './timeline-leading'
export { TimelineMarker } from './timeline-marker'
export { TimelineRail } from './timeline-rail'
export { TimelineDescription, TimelineTitle } from './timeline-text'
export { useTimeline, useTimelineItem } from './timeline.context'
export { timelineRecipe } from './timeline.recipe'
export type {
  TimelineAlign,
  TimelineConnectorProps,
  TimelineContextValue,
  TimelineDensity,
  TimelineItemContextValue,
  TimelineItemProps,
  TimelineProps,
  TimelineSize,
  TimelineSlot,
  TimelineStatus,
  TimelineTextProps,
  TimelineViewProps,
} from './timeline.type'
