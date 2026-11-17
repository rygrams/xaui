import { SelectContent } from './select-content'
import { SelectDescription } from './select-description'
import { SelectError } from './select-error'
import { SelectGroupLabel } from './select-group-label'
import { SelectIndicator } from './select-indicator'
import { SelectItem } from './select-item'
import { SelectItemDescription } from './select-item-description'
import { SelectItemIndicator } from './select-item-indicator'
import { SelectItemLabel } from './select-item-label'
import { SelectLabel } from './select-label'
import { SelectOverlay } from './select-overlay'
import { SelectTrigger } from './select-trigger'
import { SelectValue } from './select-value'
import { SelectRoot } from './select'

export const Select = Object.assign(SelectRoot, {
  Label: SelectLabel,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Indicator: SelectIndicator,
  Overlay: SelectOverlay,
  Content: SelectContent,
  GroupLabel: SelectGroupLabel,
  Item: SelectItem,
  ItemLabel: SelectItemLabel,
  ItemDescription: SelectItemDescription,
  ItemIndicator: SelectItemIndicator,
  Description: SelectDescription,
  Error: SelectError,
})

export { useSelect, useSelectItem } from './select.context'
export { selectRecipe } from './select.recipe'
export type {
  SelectContentProps,
  SelectContextValue,
  SelectDescriptionProps,
  SelectErrorProps,
  SelectGroupLabelProps,
  SelectIndicatorProps,
  SelectItemContextValue,
  SelectItemDescriptionProps,
  SelectItemIndicatorProps,
  SelectItemLabelProps,
  SelectItemProps,
  SelectItemRenderState,
  SelectLabelProps,
  SelectMode,
  SelectOverlayProps,
  SelectProps,
  SelectSize,
  SelectSlot,
  SelectTriggerProps,
  SelectValueProps,
} from './select.type'
