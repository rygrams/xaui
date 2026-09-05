import { TabsContent } from './tabs-content'
import { TabsIndicator } from './tabs-indicator'
import { TabsLabel } from './tabs-label'
import { TabsList } from './tabs-list'
import { TabsTrigger } from './tabs-trigger'
import { TabsRoot } from './tabs'

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Label: TabsLabel,
  Indicator: TabsIndicator,
  Content: TabsContent,
})

export { TabsRoot } from './tabs'
export { TabsContent } from './tabs-content'
export { TabsIndicator } from './tabs-indicator'
export { TabsLabel } from './tabs-label'
export { TabsList } from './tabs-list'
export { TabsTrigger } from './tabs-trigger'
export { useTabs, useTabsTrigger } from './tabs.context'
export { tabsRecipe } from './tabs.recipe'
export type {
  TabRect,
  TabsContentProps,
  TabsContextValue,
  TabsIndicatorProps,
  TabsLabelProps,
  TabsListProps,
  TabsProps,
  TabsSize,
  TabsSlot,
  TabsTriggerContextValue,
  TabsTriggerProps,
  TabsTriggerRenderState,
  TabsVariant,
} from './tabs.type'
