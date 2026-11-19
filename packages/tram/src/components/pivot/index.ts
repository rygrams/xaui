import { PivotRoot } from './pivot'
import { PivotHeader } from './pivot-header'
import { PivotSection } from './pivot-section'
import { PivotTitle } from './pivot-title'

export const Pivot = Object.assign(PivotRoot, {
  Title: PivotTitle,
  Header: PivotHeader,
  Section: PivotSection,
})

export { PivotRoot } from './pivot'
export { PivotHeader } from './pivot-header'
export { PivotSection } from './pivot-section'
export { PivotTitle } from './pivot-title'
export { usePivot } from './pivot.context'
export { pivotRecipe } from './pivot.recipe'
export type {
  PivotContextValue,
  PivotHeaderProps,
  PivotProps,
  PivotSectionProps,
  PivotSlot,
  PivotTitleProps,
} from './pivot.type'
