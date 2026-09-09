import { PagerContent } from './pager-content'
import { PagerDot, PagerIndicator } from './pager-indicator'
import { PagerPage } from './pager-page'
import { PagerRoot } from './pager'

export const Pager = Object.assign(PagerRoot, {
  Content: PagerContent,
  Page: PagerPage,
  Indicator: PagerIndicator,
  Dot: PagerDot,
})

export { PagerRoot } from './pager'
export { PagerContent } from './pager-content'
export { PagerDot, PagerIndicator } from './pager-indicator'
export { PagerPage } from './pager-page'
export { usePager } from './pager.context'
export { pagerRecipe } from './pager.recipe'
export type {
  PagerContentProps,
  PagerContextValue,
  PagerDotInk,
  PagerDotProps,
  PagerOrientation,
  PagerProps,
  PagerSize,
  PagerSlot,
  PagerTrackSize,
  PagerVariant,
  PagerViewSlotProps,
} from './pager.type'
