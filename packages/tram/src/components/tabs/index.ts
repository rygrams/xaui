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

export { useTabs, useTabsTrigger } from './tabs.context'
export { tabsRecipe } from './tabs.recipe'
export type {
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
} from './tabs.type'
