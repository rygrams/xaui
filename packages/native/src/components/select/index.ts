import { SelectContent } from './select-content'
import { SelectIndicator } from './select-indicator'
import { SelectItem } from './select-item'
import { SelectItemDescription } from './select-item-description'
import { SelectItemIndicator } from './select-item-indicator'
import { SelectItemLabel } from './select-item-label'
import { SelectLabel } from './select-label'
import { SelectOverlay } from './select-overlay'
import { SelectTrigger } from './select-trigger'
import { SelectValue } from './select-value'
import { Select as SelectRoot } from './select'

export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Value: SelectValue,
  Indicator: SelectIndicator,
  Overlay: SelectOverlay,
  Content: SelectContent,
  Label: SelectLabel,
  Item: SelectItem,
  ItemLabel: SelectItemLabel,
  ItemDescription: SelectItemDescription,
  ItemIndicator: SelectItemIndicator,
})

export { Select as SelectRoot } from './select'
export { SelectContent } from './select-content'
export { SelectIndicator } from './select-indicator'
export { SelectItem } from './select-item'
export { SelectItemDescription } from './select-item-description'
export { SelectItemIndicator } from './select-item-indicator'
export { SelectItemLabel } from './select-item-label'
export { SelectLabel } from './select-label'
export { SelectOverlay } from './select-overlay'
export { SelectTrigger } from './select-trigger'
export { SelectValue } from './select-value'
export { CheckIcon } from './check-icon'
export { ChevronDownIcon } from './chevron-down-icon'
export { useSelect, useSelectItem } from './select.context'
export { selectRecipe } from './select.recipe'
export type {
  SelectAlign,
  SelectAnchor,
  SelectContentProps,
  SelectContextValue,
  SelectIndicatorProps,
  SelectInsets,
  SelectItemContextValue,
  SelectItemDescriptionProps,
  SelectItemIndicatorProps,
  SelectItemLabelProps,
  SelectItemProps,
  SelectItemRenderState,
  SelectLabelProps,
  SelectOverlayProps,
  SelectPlacement,
  SelectProps,
  SelectSize,
  SelectSlot,
  SelectTriggerProps,
  SelectValueProps,
  SelectVariant,
  SelectWidth,
} from './select.type'
