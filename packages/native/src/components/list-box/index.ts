import { ListBoxGroupFooter } from './list-box-group-footer'
import { ListBoxGroupHeader } from './list-box-group-header'
import { ListBoxGroupRoot } from './list-box-group'
import { ListBoxGroupSection } from './list-box-group-section'
import { ListBoxItem } from './list-box-item'
import { ListBoxItemButton } from './list-box-item-button'
import { ListBoxItemContent } from './list-box-item-content'
import { ListBoxItemDescription } from './list-box-item-description'
import { ListBoxItemPrefix } from './list-box-item-prefix'
import { ListBoxItemSuffix } from './list-box-item-suffix'
import { ListBoxItemTitle } from './list-box-item-title'
import { ListBoxRoot } from './list-box'

export const ListBoxGroup = Object.assign(ListBoxGroupRoot, {
  Section: ListBoxGroupSection,
  Header: ListBoxGroupHeader,
  Footer: ListBoxGroupFooter,
})

export const ListBox = Object.assign(ListBoxRoot, {
  Item: ListBoxItem,
  ItemButton: ListBoxItemButton,
  ItemPrefix: ListBoxItemPrefix,
  ItemContent: ListBoxItemContent,
  ItemTitle: ListBoxItemTitle,
  ItemDescription: ListBoxItemDescription,
  ItemSuffix: ListBoxItemSuffix,
})

export { ListBoxRoot } from './list-box'
export { ListBoxGroupRoot } from './list-box-group'
export { ListBoxGroupFooter } from './list-box-group-footer'
export { ListBoxGroupHeader } from './list-box-group-header'
export { ListBoxGroupSection } from './list-box-group-section'
export { ListBoxItem } from './list-box-item'
export { ListBoxItemButton } from './list-box-item-button'
export { ListBoxItemContent } from './list-box-item-content'
export { ListBoxItemDescription } from './list-box-item-description'
export { ListBoxItemPrefix } from './list-box-item-prefix'
export { ListBoxItemSuffix } from './list-box-item-suffix'
export { ListBoxItemTitle } from './list-box-item-title'
export { useListBox } from './list-box.context'
export { useListBoxGroup } from './list-box-group.context'
export { listBoxRecipe } from './list-box.recipe'
export { listBoxGroupRecipe } from './list-box-group.recipe'
export type {
  ListBoxContextValue,
  ListBoxItemButtonProps,
  ListBoxItemContentProps,
  ListBoxItemDescriptionProps,
  ListBoxItemPrefixProps,
  ListBoxItemProps,
  ListBoxItemSuffixProps,
  ListBoxItemTitleProps,
  ListBoxProps,
  ListBoxSize,
  ListBoxSlot,
  ListBoxVariant,
} from './list-box.type'
export type {
  ListBoxGroupContextValue,
  ListBoxGroupProps,
  ListBoxGroupSectionProps,
  ListBoxGroupSlot,
  ListBoxGroupTextSlotProps,
} from './list-box-group.type'
